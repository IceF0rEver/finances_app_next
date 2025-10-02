import type { Decimal } from "@prisma/client/runtime/library";
import type {
	Control,
	FieldPath,
	FieldValues,
	UseFormReturn,
} from "react-hook-form";

export interface sankeyParams {
	id?: string;
	from: string;
	to: string;
	amount: number | Decimal;
	type: string;
	parentId?: string | null;
}

export interface BudgetSheetProps {
	sheetOpen: boolean;
	onSheetOpen: (sheetOpen: boolean) => void;
	data: sankeyParams[];
}

export interface BudgetPageProps {
	budgets: Promise<{ sankeyDatas: sankeyParams[] | [] }>;
}

export interface BudgetManageProps {
	datas: sankeyParams[];
	status: boolean;
	onOpen?: (arg0: boolean) => void;
}

export interface BudgetChartProps {
	datas: sankeyParams[];
}

export interface BudgetChartItemProps {
	datas: sankeyParams[];
}

export interface BudgetFieldProps<T extends FieldValues> {
	label?: string;
	description?: string;
	placeholder?: string;
	type?: string;
	name: FieldPath<T>;
	control: Control<T>;
	className?: string;
}

export interface BudgetCardProps<T extends FieldValues> {
	title: string;
	description: string;
	status: boolean;
	fields: sankeyParams[];
	form: UseFormReturn<T>;
	type: "income" | "expense";
	onAdd: (type: "income" | "expense" | "category", parentId?: string) => void;
	onRemove: (type: "category" | "subCategory", id?: string) => void;
	errors?:
		| {
				message?: string;
				sankey?: string[];
		  }
		| undefined;
}
