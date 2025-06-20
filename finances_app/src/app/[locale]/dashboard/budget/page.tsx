import { getUser } from "@/lib/server";
import BudgetPage from "@/components/budget/budget-page";
import EmptyUser from "@/components/dashboard/page/empty-user";
import { getCachedBudgets } from "@/lib/caches/budget-cache";

export default async function Page() {
    const user = await getUser();
   
    if (!user?.id) {
        return <EmptyUser/>
    }
   
    const budgets = await getCachedBudgets(user?.id);
    
    return <BudgetPage datas={budgets}/>
}