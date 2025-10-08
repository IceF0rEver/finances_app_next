"use client";

import { Icon } from "@iconify/react";
import { enUS, fr } from "date-fns/locale";
import type {
	SubscriptionCalendarProps,
	SubscriptionParams,
} from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import { Calendar } from "@/components/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { calendarCheckDate, cn } from "@/lib/utils";
import { useCurrentLocale, useI18n } from "@/locales/client";

export default function SubscriptionCalendar({
	datas,
	date,
	setDate,
}: SubscriptionCalendarProps) {
	const t = useI18n();
	const locale = useCurrentLocale();

	return (
		<Card>
			<CardHeader>
				<div>
					<CardTitle className="text-xl font-medium">
						{t("subscription.components.subscriptionCalendar.title")}
					</CardTitle>
					<CardDescription>
						{t("subscription.components.subscriptionCalendar.description")}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 md:px-4">
				<Calendar
					utilitie="subscription"
					mode="single"
					locale={locale === "fr" ? fr : enUS}
					selected={date}
					onSelect={setDate}
					className="rounded-md border mx-auto"
					components={{
						DayContent: ({ date }) => {
							let items: SubscriptionParams[] = [];

							if (datas) {
								items = datas.filter((day: SubscriptionParams) =>
									calendarCheckDate(day, date),
								);
							}

							return (
								<div className="relative size-full">
									<span
										className={cn(
											"w-full aspect-square rounded-md flex items-start justify-end p-1",
										)}
									>
										{date.getDate()}
									</span>
									{items.length > 0 && (
										<div>
											{items
												.slice(0, 5)
												.map((item: SubscriptionParams, index: number) => (
													<div
														key={item.id}
														style={{ zIndex: 20 - index }}
														className="absolute w-full bottom-0 flex justify-start p-1 overflow-hidden"
													>
														<span
															style={{
																transform: `translateX(${index * 50}%)`,
																filter: `brightness(${200 - index * 30}%)`,
															}}
															className="bg-primary border border-black rounded-full p-1 max-w-xs md:max-w-sm aspect-square sm:flex items-center justify-center hidden"
														>
															<Icon icon={item.icon} />
														</span>
													</div>
												))}
										</div>
									)}
								</div>
							);
						},
					}}
				/>
			</CardContent>
		</Card>
	);
}
