import ManagePassword from "@/components/utils/manage-password";
import { 
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent
} from "@/components/ui/card";
import { getI18n } from "@/locales/server";

export default async function Page() {
	const t = await getI18n();
	return (
		<section className="flex h-screen justify-center items-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>{t('app.auth.resetPassword.page.title')}</CardTitle>
					<CardDescription>{t('app.auth.resetPassword.page.description')}</CardDescription>
				</CardHeader>
				<CardContent>
					<ManagePassword />
				</CardContent>
			</Card>
		</section>
	)
}