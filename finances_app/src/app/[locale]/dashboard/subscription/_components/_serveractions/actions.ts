"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import z from "zod";
import type { SubscriptionParams } from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import type { Subscription, User } from "@/generated/prisma";
import { getCachedUser } from "@/lib/caches/auth-cache";
import prisma from "@/lib/prisma";
import { subscriptionTableSchema } from "@/lib/zod/subscription-schemas";

interface SubscriptionState {
	error?: {
		code?: string;
		message?: string;
		status?: number;
	};
	message?: string;
	success?: boolean;
}

export async function getSubscriptions(userId: User["id"]): Promise<{
	subscriptions: SubscriptionParams[];
}> {
	try {
		const subscriptionSchema = subscriptionTableSchema.pick({ userId: true });
		const validatedData = subscriptionSchema.safeParse({ userId: userId });

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const datas = await prisma.subscription.findMany({
			where: {
				userId: userId,
			},
		});
		const subscriptions = datas.map((item) => ({
			...item,
			executionDate: new Date(item.executionDate),
			amount: Number(item.amount),
		}));

		return { subscriptions: subscriptions ?? [] };
	} catch (error) {
		if (error instanceof Error && error.message.includes("network")) {
			throw new Error("503 - SERVICE_UNAVAILABLE");
		}
		console.log(error);
		throw new Error("500 - INTERNAL_SERVER_ERROR");
	}
}

export async function createSubscription(
	_prevState: SubscriptionState,
	formData: FormData,
): Promise<SubscriptionState> {
	try {
		const user = await getCachedUser();
		if (!user?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const parsedData = JSON.parse(formData.get("subscriptionData") as string);
		const subscriptionData = {
			...parsedData,
			userId: user.id,
		};
		const validatedData = subscriptionTableSchema.safeParse(subscriptionData);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}
		const { name, amount, recurrence, executionDate, icon, userId } = validatedData.data;
		const result = await prisma.subscription.create({
			data: {
				name: name,
				amount: amount,
				recurrence: recurrence,
				executionDate: executionDate,
				icon: icon,
				userId: userId,
			},
		});
		if (result) {
			revalidatePath(`[locale]/dashboard/subscription`, "page");
			revalidateTag(`subscriptions-${userId}`);
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

export async function updateSubscription(
	_prevState: SubscriptionState,
	formData: FormData,
): Promise<SubscriptionState> {
	try {
		const user = await getCachedUser();
		if (!user?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const parsedData = JSON.parse(formData.get("subscriptionData") as string);
		const subscriptionData = {
			...parsedData,
			userId: user.id,
		};
		const validatedData = subscriptionTableSchema.safeParse(subscriptionData);

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}

		const { id, name, amount, recurrence, executionDate, icon, userId } = validatedData.data;
		const result = await prisma.subscription.update({
			where: { id: id, userId: userId },
			data: {
				name: name,
				amount: amount,
				recurrence: recurrence,
				executionDate: executionDate,
				icon: icon,
			},
		});
		if (result) {
			revalidatePath(`[locale]/dashboard/subscription`, "page");
			revalidateTag(`subscriptions-${userId}`);
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

export async function deleteSubscription(
	_prevState: SubscriptionState,
	subscriptionId: Subscription["id"],
): Promise<SubscriptionState> {
	try {
		const user = await getCachedUser();
		if (!user?.id) {
			throw new Error("400 - BAD_REQUEST");
		}

		const deleteSubscriptionSchema = subscriptionTableSchema.pick({ id: true, userId: true });
		const validatedData = deleteSubscriptionSchema.safeParse({
			id: subscriptionId,
			userId: user.id,
		});

		if (!validatedData.success) {
			throw new Error("400 - BAD_REQUEST");
		}
		const { id, userId } = validatedData.data;
		const existingSubscription = await prisma.subscription.findFirst({
			where: {
				id: id,
				userId: userId,
			},
		});
		if (existingSubscription) {
			const result = await prisma.subscription.delete({
				where: { id: id },
			});
			if (result) {
				revalidatePath(`[locale]/dashboard/subscription`, "page");
				revalidateTag(`subscriptions-${userId}`);

				return {
					success: true,
				};
			}
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
