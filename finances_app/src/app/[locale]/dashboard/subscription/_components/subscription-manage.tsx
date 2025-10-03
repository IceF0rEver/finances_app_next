"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type {
	SubscriptionManageProps,
	subscriptionParams,
} from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth/auth-client";
import { subscriptionSchemas } from "@/lib/zod/subscription-schemas";
import { useI18n } from "@/locales/client";
import {
	createSubscription,
	updateSubscription,
} from "./_serveractions/actions";
import SubscriptionField from "./form/subscription-field";

export default function SubscriptionManage({
	sheetOpen,
	onSheetOpen,
	status,
	data,
}: SubscriptionManageProps) {
	const t = useI18n();
	const { data: session } = useSession();

	const getDefaultValues = useCallback(
		(subscriptionData?: subscriptionParams) => ({
			id: subscriptionData?.id || "",
			name: subscriptionData?.name || "",
			amount: Number(subscriptionData?.amount || ""),
			recurrence: subscriptionData?.recurrence || "monthly",
			executionDate: subscriptionData?.executionDate || new Date(),
			icon: subscriptionData?.icon || "",
			userId: session?.user.id,
		}),
		[session?.user.id],
	);

	const [state, FormAction, isPending] = useActionState(
		status ? updateSubscription : createSubscription,
		{
			success: false,
		},
	);

	const subscriptionSchema = subscriptionSchemas(t).subscription;
	type SubscriptionType = z.infer<typeof subscriptionSchema>;
	const form = useForm<SubscriptionType>({
		resolver: zodResolver(subscriptionSchema),
		defaultValues: getDefaultValues(),
	});

	useEffect(() => {
		if (sheetOpen) {
			form.reset(getDefaultValues(data));
		}
	}, [sheetOpen, data, getDefaultValues, form]);

	useToast(state, isPending, {
		errorMessage: t("toast.error"),
		successMessage: status
			? t("toast.success.updateSubscription")
			: t("toast.success.createSubscription"),
		onSuccess: () => {
			onSheetOpen(false);
		},
	});

	const onSubmit = () => {
		const formData = new FormData();
		formData.append("subscriptionData", JSON.stringify(form.getValues()));
		startTransition(() => {
			FormAction(formData);
		});
	};

	return (
		<Sheet open={sheetOpen} onOpenChange={onSheetOpen}>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>
						{status === true
							? t("subscription.components.subscriptionManage.update.title")
							: t("subscription.components.subscriptionManage.add.title")}
					</SheetTitle>
					<SheetDescription>
						{status === true
							? t(
									"subscription.components.subscriptionManage.update.description",
								)
							: t("subscription.components.subscriptionManage.add.description")}
					</SheetDescription>
					<Separator className="my-2" />
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-6 px-4"
					>
						<SubscriptionField
							label={t(
								"subscription.components.subscriptionManage.form.name.label",
							)}
							control={form.control}
							name="name"
							type="text"
						/>
						<SubscriptionField
							label={t(
								"subscription.components.subscriptionManage.form.amount.label",
							)}
							control={form.control}
							name="amount"
							type="number"
						/>
						<SubscriptionField
							label={t(
								"subscription.components.subscriptionManage.form.recurrence.label",
							)}
							control={form.control}
							fieldType="radio"
							name="recurrence"
							className="flex gap-4"
							datas={[
								{
									label: t(
										"subscription.components.subscriptionManage.form.recurrence.monthly",
									),
									value: "monthly",
								},
								{
									label: t(
										"subscription.components.subscriptionManage.form.recurrence.annually",
									),
									value: "annually",
								},
							]}
						/>
						<SubscriptionField
							label={t(
								"subscription.components.subscriptionManage.form.executionDate.label",
							)}
							control={form.control}
							name="executionDate"
							fieldType="date"
						/>
						<SubscriptionField
							label={t("components.utils.inputIcon.label")}
							placeholder={t("components.utils.inputIcon.placeholder")}
							control={form.control}
							name="icon"
							fieldType="icon"
						/>
						<SheetFooter>
							<Button
								type="submit"
								variant="default"
								className="w-full"
								disabled={isPending}
							>
								{isPending ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									<span>{status ? t("button.update") : t("button.add")}</span>
								)}
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
