import type { Decimal } from "@prisma/client/runtime/library";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface subscriptionParams {
	id?: string;
	name: string;
	amount: number | Decimal;
	recurrence: string;
	executionDate: Date;
	icon: string;
	createdAt?: Date | null;
	updatedAt?: Date | null;
}

export interface SubscriptionPageProps {
	subscriptionDatas: Promise<{ subscriptions: subscriptionParams[] | [] }>;
}

export interface SubscriptionManageProps {
	sheetOpen: boolean;
	onSheetOpen: (sheetOpen: boolean) => void;
	status: boolean;
	data?: subscriptionParams;
}

export interface SubscriptionListProps {
	datas: subscriptionParams[];
	date: Date | undefined;
}

export interface SubscriptionListItemProps {
	item: subscriptionParams;
}

export interface SubscriptionCalendarProps {
	datas: subscriptionParams[];
	date: Date | undefined;
	setDate?: (date: Date | undefined) => void;
}

export interface SubscriptionFieldProps<T extends FieldValues> {
	label?: string;
	description?: string;
	placeholder?: string;
	type?: string;
	name: FieldPath<T>;
	control: Control<T>;
	datas?: { label: string; value: string }[];
	fieldType?: "radio" | "date" | "icon" | "default";
	className?: string;
}
