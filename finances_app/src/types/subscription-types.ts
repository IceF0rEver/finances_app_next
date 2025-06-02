
export interface subscriptionParams {
    id?: string;
    name: string;
    amount: number;
    recurrence: string;
    executionDate: Date;
    icon: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}