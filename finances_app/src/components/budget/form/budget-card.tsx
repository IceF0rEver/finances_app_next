"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { BudgetCardProps } from "@/types/budget-types";
import BudgetField from "./budget-field";
import { useI18n } from "@/locales/client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function BudgetCard({
	title,
	description,
	status,
	fields,
	form,
	type,
	onAdd,
	onRemove,
	errors,
}: BudgetCardProps) {
	const t = useI18n();

	return (
		<Card className={cn(status ? "border-none shadow-none p-1" : "", "grid gap-4")}>
			<CardHeader className={cn(status ? "p-1" : "")}>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					{description}
					<Separator className="mt-3" />
					{errors?.message && <p className="text-sm text-destructive">{errors?.message}</p>}
				</CardDescription>
			</CardHeader>

			{type === "income" ? (
				<CardContent>
					{fields &&
						[...fields.filter((f) => f.type === "income")].map((field) => {
							const index = fields.findIndex((d) => d.id === field.id);
							return (
								<div
									className={cn(status ? "p-0" : "", "grid grid-cols-11 gap-3 mb-4 items-start")}
									key={field.id}
								>
									<div
										className={cn(status ? "col-span-6" : "col-span-6 md:col-span-5", "grid gap-1")}
									>
										<BudgetField
											label={t("app.dashboard.budget.components.budgetManage.form.name.label")}
											name={`sankey.${index}.from`}
											type="text"
											control={form.control}
										/>
									</div>
									<div
										className={cn(status ? "col-span-3" : "col-span-3 md:col-span-5", "grid gap-1")}
									>
										<BudgetField
											label={t("app.dashboard.budget.components.budgetManage.form.amount.label")}
											name={`sankey.${index}.amount`}
											type="number"
											control={form.control}
										/>
									</div>
									<div
										className={cn(
											status ? "col-span-2" : "col-span-2 md:col-span-1",
											"my-auto mt-5.5",
										)}
									>
										<Button
											type="button"
											variant="destructive"
											onClick={() => onRemove("category", field.id)}
											className="w-full p-2"
										>
											<Trash2 />
										</Button>
									</div>
								</div>
							);
						})}
				</CardContent>
			) : (
				<CardContent>
					{fields &&
						[...fields.filter((f) => f.type === "expense" && f.from === "budget")].map((fieldCategory) => {
							const index = fields.findIndex((d) => d.id === fieldCategory.id);

							return (
								<Card className={cn(status ? "mt-2" : "m-2", "p-0 grid gap-1")} key={fieldCategory.id}>
									<div className="relative">
										<div className="absolute right-0">
											<Button
												type="button"
												className="p-2 rounded-none rounded-bl-xl rounded-tr-xl"
												variant="secondary"
												onClick={() => onRemove("subCategory", fieldCategory.id)}
											>
												<Trash2 />
											</Button>
										</div>
									</div>

									<CardContent className={cn(status ? "p-1" : "p-4", "grid grid-cols-11 gap-3")}>
										<div
											className={cn(
												status ? "col-span-6" : "col-span-6 md:col-span-5",
												"grid gap-1",
											)}
										>
											<BudgetField
												label={t(
													"app.dashboard.budget.components.budgetManage.form.categoryName.label",
												)}
												name={`sankey.${index}.to`}
												type="text"
												control={form.control}
											/>
										</div>

										<div className="col-span-11 row-start-2">
											{[
												...fields.filter(
													(f) =>
														f.type === "expense" &&
														f.from !== "budget" &&
														f.parentId === fieldCategory.id,
												),
											].map((field) => {
												const subIndex = fields.findIndex((d) => d.id === field.id);
												return (
													<div
														className="grid grid-cols-11 gap-3 py-1 items-start"
														key={field.id}
													>
														<div
															className={cn(
																status ? "col-span-6" : "col-span-6 md:col-span-5",
																"grid gap-1",
															)}
														>
															<BudgetField
																label={t(
																	"app.dashboard.budget.components.budgetManage.form.name.label",
																)}
																name={`sankey.${subIndex}.to`}
																type="text"
																control={form.control}
															/>
														</div>
														<div
															className={cn(
																status ? "col-span-3" : "col-span-3 md:col-span-5",
																"grid gap-1",
															)}
														>
															<BudgetField
																label={t(
																	"app.dashboard.budget.components.budgetManage.form.amount.label",
																)}
																name={`sankey.${subIndex}.amount`}
																type="number"
																control={form.control}
															/>
														</div>
														<div
															className={cn(
																status ? "col-span-2" : "col-span-2 md:col-span-1",
																"my-auto mt-5.5",
															)}
														>
															<Button
																type="button"
																variant="destructive"
																onClick={() => onRemove("category", field.id)}
																className="w-full p-2"
															>
																<Trash2 />
															</Button>
														</div>
													</div>
												);
											})}
										</div>
									</CardContent>

									<CardFooter className={cn(status ? "p-2" : "flex justify-between px-4 pb-4")}>
										<Button
											type="button"
											variant="secondary"
											className={cn(status ? "w-full" : "")}
											onClick={() => onAdd("expense", fieldCategory.id)}
										>
											{t("app.dashboard.budget.components.budgetManage.button.addExpense")}
										</Button>
									</CardFooter>
								</Card>
							);
						})}
				</CardContent>
			)}

			<CardFooter className={cn(status ? "p-2" : "flex justify-between")}>
				<Button
					type="button"
					className={cn(status ? "w-full" : "")}
					variant="secondary"
					onClick={() => (type === "income" ? onAdd("income") : onAdd("category"))}
				>
					{type === "income"
						? t("app.dashboard.budget.components.budgetManage.button.addIncome")
						: t("app.dashboard.budget.components.budgetManage.button.addCategoryExpense")}
				</Button>
			</CardFooter>
		</Card>
	);
}
