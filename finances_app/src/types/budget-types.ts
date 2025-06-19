import type { FieldValues, Control, FieldPath, } from "react-hook-form";

export interface sankeyParams {
    id?: string;
    from: string;
    to: string;
    amount: number;
    type: "income" | "expense";
    parentId?: string;
}

export interface BudgetSheetProps {
    sheetOpen: boolean;
    onSheetOpen: (sheetOpen: boolean) => void;
    status: boolean;
    data: sankeyParams[]
};

export interface BudgetPageProps {
    datas: sankeyParams[]
}

export interface BudgetManageProps {
    datas : sankeyParams[],
    status: boolean;
    onOpen?: (arg0: boolean) => void;
}

export interface BudgetChartProps {
    datas: sankeyParams[]
}

export interface BudgetChartItemProps {
    datas: sankeyParams[]
}

export interface BudgetFieldProps<T extends FieldValues> {
    label?: string,
    description?: string,
    placeholder?: string,
    type?: string,
    name: FieldPath<T>,
    control: Control<T>,
    className?: string,
}

export interface BudgetCardProps {
  title: string
  description: string
  status: boolean
  datas: sankeyParams[]
  allData: sankeyParams[]
  form: any
  type: "income" | "expense"
  onAdd: (type: "income" | "expense" | "category", parentId?: string) => void
  onRemove: (type: "category" | "subCategory", id?: string) => void
  errors?: any
}
