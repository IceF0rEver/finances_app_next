"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import type { User } from "@/generated/prisma";
import { Decimal } from "@/generated/prisma/runtime/library";
import { getUser } from "@/lib/auth/server";
import prisma from "@/lib/prisma";
import { authSchemas } from "@/lib/zod/auth-schemas";
import { budgetSchemas } from "@/lib/zod/budget-schemas";
import { getI18n } from "@/locales/server";
import type { sankeyParams } from "../_types/budget-types";

interface SankeyState {
	error?: {
		code?: string;
		message?: string;
		status?: number;
	};
	success?: boolean;
	message?: string;
}

export async function getBudgets(userId: User["id"]): Promise<{
	sankeyDatas: sankeyParams[];
}> {
	const t = await getI18n();

	try {
		const sankeySchema = authSchemas(t).getWithUserId.shape.userId;
		const validatedData = sankeySchema.safeParse(userId);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const datas = await prisma.sankey.findMany({
			where: {
				userId: userId,
			},
		});
		const sankeyDatas = datas.map((item) => ({
			...item,
			amount: Number(item.amount),
		}));

		return { sankeyDatas: sankeyDatas ?? [] };
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("400 - BAD_REQUEST");
		}
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}

export async function createSankey(
	_prevState: SankeyState,
	formData: FormData,
): Promise<SankeyState> {
	const t = await getI18n();

	try {
		const user = await getUser();
		if (!user?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const sankeySchema = budgetSchemas(t).sankey;
		const parsedData = JSON.parse(formData.get("sankeyData") as string);
		const validatedData = sankeySchema.safeParse(parsedData);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const sankeyArray = validatedData.data.map((item) => ({
			...item,
			amount: new Decimal(item.amount),
			userId: user.id,
		}));

		const result = await prisma.sankey.createMany({
			data: sankeyArray,
		});
		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${user.id}`);
			return {
				success: true,
			};
		}

		return {
			success: false,
			error: {
				code: "UNEXPECTED_ERROR",
				status: 500,
			},
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("400 - BAD_REQUEST");
		}
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}

export async function updateSankey(
	_prevState: SankeyState,
	formData: FormData,
): Promise<SankeyState> {
	const t = await getI18n();

	try {
		const user = await getUser();
		if (!user?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const sankeySchema = budgetSchemas(t).sankey;
		const parsedData = JSON.parse(formData.get("sankeyData") as string);
		const validatedData = sankeySchema.safeParse(parsedData);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		await prisma.sankey.deleteMany({
			where: {
				userId: user.id,
			},
		});

		const sankeyArray = validatedData.data.map((item) => ({
			id: item.id,
			from: item.from,
			to: item.to,
			amount: new Decimal(item.amount),
			type: item.type,
			parentId: item.parentId,
			userId: user.id,
		}));

		const result = await prisma.sankey.createMany({
			data: sankeyArray,
		});

		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${user.id}`);
			return {
				success: true,
			};
		}

		return {
			success: false,
			error: {
				code: "UNEXPECTED_ERROR",
				status: 500,
			},
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("400 - BAD_REQUEST");
		}
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}

export async function deleteSankey(
	_prevState: SankeyState,
): Promise<SankeyState> {
	const t = await getI18n();

	try {
		const user = await getUser();

		const sankeySchema = authSchemas(t).getWithUserId.shape.userId;
		const validatedData = sankeySchema.safeParse(user?.id);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const result = await prisma.sankey.deleteMany({
			where: {
				userId: user?.id,
			},
		});

		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${user?.id}`);
			return {
				success: true,
			};
		}

		return {
			success: false,
			error: {
				code: "UNEXPECTED_ERROR",
				status: 500,
			},
		};
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error("400 - BAD_REQUEST");
		}
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}
