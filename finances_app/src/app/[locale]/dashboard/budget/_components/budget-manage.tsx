"use client";

import { Loader2 } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import type {
	BudgetManageProps,
	sankeyParams,
} from "@/app/[locale]/dashboard/budget/_components/_types/budget-types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useGenericForm } from "@/hooks/use-form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { budgetSchemas } from "@/lib/zod/budget-schemas";
import { useI18n } from "@/locales/client";
import { createSankey, updateSankey } from "./_serveractions/actions";
import BudgetCard from "./form/budget-card";
import BudgetTab from "./form/budget-tab";

export default function BudgetManage({
	datas,
	status,
	onOpen,
}: BudgetManageProps) {
	const t = useI18n();
	const sankeySchema = budgetSchemas(t).sankeyArray;
	const formSchema = z.object({
		sankey: sankeySchema,
	});

	const [defaultValues, setDefaultValues] = useState<{
		sankey: sankeyParams[];
	}>({ sankey: [] });

	const [state, FormAction, isPending] = useActionState(
		status ? updateSankey : createSankey,
		{ success: false },
	);

	const { form, onSubmit } = useGenericForm<z.infer<typeof formSchema>>({
		schema: formSchema,
		defaultValues: defaultValues,
		resetTrigger: datas,
		onSubmit: (data: z.infer<typeof formSchema>) => {
			const processedData = data.sankey.map((item) => {
				const updatedItem = { ...item };

				if (
					updatedItem.from === updatedItem.id &&
					updatedItem.parentId !== undefined
				) {
					updatedItem.from =
						data.sankey.find((p) => p.id === updatedItem.parentId)?.to || "";
				}

				if (
					(updatedItem.parentId === null ||
						updatedItem.parentId === undefined) &&
					updatedItem.type === "expense" &&
					updatedItem.from === "budget"
				) {
					const total = data.sankey
						.filter((e) => e.parentId === updatedItem.id)
						.reduce((sum, e) => sum + e.amount, 0);
					updatedItem.amount = total;
				}

				return updatedItem;
			});

			const formData = new FormData();
			formData.append("sankeyData", JSON.stringify(processedData));
			startTransition(() => {
				FormAction(formData);
			});
		},
	});

	const { append, remove } = useFieldArray({
		control: form.control,
		name: "sankey",
	});

	useEffect(() => {
		setDefaultValues({
			sankey: datas.map((data) => ({
				...data,
				amount: Number(data.amount),
			})),
		});
	}, [datas]);

	useToast(state, isPending, {
		successMessage: status
			? t("toast.success.updateSankey")
			: t("toast.success.createSankey"),
		errorMessage: t("toast.error"),
		onSuccess: () => {
			if (onOpen) {
				onOpen(false);
			}
		},
	});

	const handleAdd = (
		type: "income" | "expense" | "category",
		parent_id?: string,
	) => {
		switch (type) {
			case "income":
				append({
					id: uuidv4(),
					from: "",
					to: "budget",
					amount: 0,
					type: "income" as const,
					parentId: undefined,
				});
				break;
			case "category":
				append({
					id: uuidv4(),
					from: "budget",
					to: "",
					amount: 0,
					type: "expense" as const,
					parentId: undefined,
				});
				break;
			case "expense":
				if (currentData.find((item) => item.id === parent_id)) {
					const id = uuidv4();
					append({
						id: id,
						from: id,
						to: "",
						amount: 0,
						type: "expense" as const,
						parentId: parent_id,
					});
				}
				break;
		}
	};

	const handleRemove = (type: "category" | "subCategory", id?: string) => {
		switch (type) {
			case "category": {
				const index = currentData.findIndex((item) => item.id === id);
				if (index !== -1) {
					remove(index);
				}
				break;
			}
			case "subCategory": {
				const subCategories = currentData
					.map((item, index) => ({ ...item, index }))
					.filter((item) => item.parentId === id);

				const mainCategoryIndex = currentData.findIndex(
					(item) => item.id === id,
				);

				[...subCategories, { index: mainCategoryIndex }]
					.sort((a, b) => b.index - a.index)
					.forEach((item) => {
						if (item.index !== -1) {
							remove(item.index);
						}
					});
				break;
			}
		}
	};

	const currentData = form.watch("sankey") as sankeyParams[];
	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className={cn(
					status
						? "overflow-y-auto max-h-screen"
						: "md:overflow-y-hidden md:max-h-full",
					"w-full",
				)}
			>
				<BudgetTab
					triggerData={[
						{
							label: t("budget.components.budgetManage.tabs.incomes"),
							value: "incomes",
						},
						{
							label: t("budget.components.budgetManage.tabs.expenses"),
							value: "expenses",
						},
					]}
					contentData={[
						{
							component: (
								<BudgetCard
									title={t("budget.components.budgetManage.title.income")}
									description={t(
										"budget.components.budgetManage.description.income",
									)}
									status={status}
									fields={currentData as sankeyParams[]}
									form={form}
									type={"income"}
									onAdd={handleAdd}
									onRemove={handleRemove}
									errors={state.error}
								/>
							),
							value: "incomes",
						},
						{
							component: (
								<BudgetCard
									title={t("budget.components.budgetManage.title.expense")}
									description={t(
										"budget.components.budgetManage.description.expense",
									)}
									status={status}
									fields={currentData as sankeyParams[]}
									form={form}
									type={"expense"}
									onAdd={handleAdd}
									onRemove={handleRemove}
									errors={state.error}
								/>
							),
							value: "expenses",
						},
					]}
				/>
				<div className="py-3 px-1 flex justify-end">
					<Button
						type="submit"
						variant="default"
						className="w-full"
						disabled={isPending}
					>
						{isPending ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							<span>
								{status ? t("button.saveChange") : t("button.discoverBudget")}
							</span>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
}
