export interface subscriptionParams {
    id?: number;
    name: string;
    amount: number;
    recurrence: 'monthly' | 'annually'
    executionDate: Date;
    icon: string;
}