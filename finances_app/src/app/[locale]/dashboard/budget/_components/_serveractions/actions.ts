"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import { PrismaClient, type User } from "@/generated/prisma";
import { Decimal } from "@/generated/prisma/runtime/library";
import { getUser } from "@/lib/auth/server";
import { budgetSchemas } from "@/lib/zod/budget-schemas";
import { getI18n } from "@/locales/server";
import type { sankeyParams } from "../_types/budget-types";

const prisma = new PrismaClient();

interface SankeyState {
	success?: boolean;
	error?: {
		code?: string;
		message?: string;
		status?: number;
		sankey?: string[];
	};
	message?: string;
}

export async function getBudgets(userId: User["id"]): Promise<{
	sankeyDatas: sankeyParams[];
}> {
	try {
		const validatedData = z
			.object({
				userId: z.string().min(1),
			})
			.safeParse({
				userId: userId,
			});

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
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		console.log(error);
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}

export async function createSankey(
	_prevState: SankeyState,
	formData: FormData,
): Promise<SankeyState> {
	try {
		const currentUser = await getUser();
		const t = await getI18n();
		if (!currentUser?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const sankeySchema = budgetSchemas(t).sankey;
		const parsedData = JSON.parse(formData.get("sankeyData") as string);

		const validatedData = sankeySchema.safeParse(parsedData);
		if (!validatedData.success) {
			return {
				error: {
					message: t("action.budget.form.validateField"),
					sankey: validatedData.error?.errors.map((e) => e.message),
				},
			};
		}

		const sankeyArray = validatedData.data.map((item) => ({
			id: item.id,
			from: item.from,
			to: item.to,
			amount: new Decimal(item.amount),
			type: item.type,
			parentId: item.parentId,
			userId: currentUser.id,
		}));

		const result = await prisma.sankey.createMany({
			data: sankeyArray,
		});
		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${currentUser.id}`);
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
	const currentUser = await getUser();
	const t = await getI18n();

	if (!currentUser?.id) {
		throw new Error("400 - BAD_REQUEST");
	}

	const sankeySchema = budgetSchemas(t).sankey;
	const parsedData = JSON.parse(formData.get("sankeyData") as string);

	try {
		const validatedData = sankeySchema.safeParse(parsedData);
		if (!validatedData.success) {
			return {
				error: {
					message: t("action.budget.form.validateField"),
					sankey: validatedData.error?.errors.map((e) => e.message),
				},
			};
		}

		await prisma.sankey.deleteMany({
			where: {
				userId: currentUser.id,
			},
		});

		const sankeyArray = validatedData.data.map((item) => ({
			id: item.id,
			from: item.from,
			to: item.to,
			amount: new Decimal(item.amount),
			type: item.type,
			parentId: item.parentId,
			userId: currentUser.id,
		}));

		const result = await prisma.sankey.createMany({
			data: sankeyArray,
		});

		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${currentUser.id}`);
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
	try {
		const currentUser = await getUser();

		const validatedData = z
			.object({
				userId: z.string().min(1),
			})
			.safeParse({
				userId: currentUser?.id,
			});

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const result = await prisma.sankey.deleteMany({
			where: {
				userId: currentUser?.id,
			},
		});

		if (result) {
			revalidatePath("[locale]/dashboard/budget", "page");
			revalidateTag(`budgets-${currentUser?.id}`);
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
