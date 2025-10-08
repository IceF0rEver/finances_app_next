import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SubscriptionParams } from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calendarCheckDate(item: SubscriptionParams, dateValue: Date) {
	const executionDate = new Date(item.executionDate);
	const date = new Date(dateValue);

	return (
		(executionDate.getDate() === date.getDate() &&
			executionDate.getMonth() === date.getMonth() &&
			item.recurrence === "annually") ||
		(executionDate.getDate() === date.getDate() &&
			item.recurrence === "monthly")
	);
}
