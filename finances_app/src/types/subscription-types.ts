import type { FieldValues, Control, FieldPath, } from "react-hook-form";

export interface subscriptionParams {
    id?: string;
    name: string;
    amount: number;
    recurrence: string;
    executionDate: Date;
    icon: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
};

export interface SubscriptionPageProps {
    datas: subscriptionParams[];
};

export interface SubscriptionManageProps {
    sheetOpen: boolean;
    onSheetOpen: (sheetOpen: boolean) => void;
    status: boolean;
    data?: subscriptionParams
};

export interface SubscriptionList {
  datas: subscriptionParams[];
  date: Date | undefined;
};

export interface SubscriptionListItemProps {
    item: subscriptionParams;
};

export interface SubscriptionCalendarProps {
  datas: subscriptionParams[];
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

export interface SubscriptionFieldProps<T extends FieldValues> {
    label?: string,
    description?: string,
    placeholder?: string,
    type?: string,
    name: FieldPath<T>,
    control: Control<T>,
    datas?: any,
    fieldType?: "radio" | "date" | "icon" | "default",
    className?: string,
}