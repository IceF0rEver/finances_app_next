export interface sankeyParams {
    id?: string;
    from: string;
    to: string;
    amount: number;
    type: "income" | "expense";
    parentId?: string;
}
