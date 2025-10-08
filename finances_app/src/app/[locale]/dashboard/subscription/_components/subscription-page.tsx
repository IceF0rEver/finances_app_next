"use client";

import { use, useEffect, useState } from "react";
import type {
	SubscriptionPageProps,
	SubscriptionParams,
} from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import SubscriptionCalendar from "@/app/[locale]/dashboard/subscription/_components/subscription-calendar";
import SubscriptionList from "@/app/[locale]/dashboard/subscription/_components/subscription-list";

export default function SubscriptionPage({
	subscriptionDatas,
}: SubscriptionPageProps) {
	const { subscriptions } = use(subscriptionDatas);
	const [date, setDate] = useState<Date | undefined>(new Date());
	const [data, setData] = useState<SubscriptionParams[]>([...subscriptions]);

	useEffect(() => {
		setData([...subscriptions]);
	}, [subscriptions]);

	return (
		<div className="flex flex-col xl:flex-row gap-6 pt-4">
			<div className="w-full xl:w-2/5">
				<SubscriptionCalendar datas={data} date={date} setDate={setDate} />
			</div>
			<div className="w-full xl:w-3/5">
				<SubscriptionList datas={data} date={date} />
			</div>
		</div>
	);
}
