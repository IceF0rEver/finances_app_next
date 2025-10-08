import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface SubscriptionParams {
	id?: string | undefined;
	name: string;
	amount: number;
	recurrence: string;
	executionDate: Date;
	icon: string;
	userId?: string | undefined;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface SubscriptionPageProps {
	subscriptionDatas: Promise<{ subscriptions: SubscriptionParams[] | [] }>;
}

export interface SubscriptionManageProps {
	sheetOpen: boolean;
	onSheetOpen: (sheetOpen: boolean) => void;
	status: boolean;
	data?: SubscriptionParams;
}

export interface SubscriptionListProps {
	datas: SubscriptionParams[];
	date: Date | undefined;
}

export interface SubscriptionListItemProps {
	item: SubscriptionParams;
}

export interface SubscriptionCalendarProps {
	datas: SubscriptionParams[];
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
