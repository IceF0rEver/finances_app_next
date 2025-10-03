"use client";

import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { FieldValues } from "react-hook-form";
import type { SubscriptionFieldProps } from "@/app/[locale]/dashboard/subscription/_components/_types/subscription-types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputIcon from "@/components/utils/input-icon";
import { cn } from "@/lib/utils";
import { useCurrentLocale } from "@/locales/client";

export default function SubscriptionField<T extends FieldValues>({
	label,
	description,
	placeholder,
	type,
	name,
	control,
	datas,
	fieldType = "default",
	className,
}: SubscriptionFieldProps<T>) {
	const locale = useCurrentLocale();
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				if (fieldType === "radio") {
					return (
						<FormItem>
							{label && <FormLabel>{label}</FormLabel>}
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className={cn(className)}
								>
									{datas?.map((item: { label: string; value: string }) => (
										<FormItem
											className="flex items-center gap-1"
											key={item.value}
										>
											<FormControl>
												<RadioGroupItem value={item.value} />
											</FormControl>
											<FormLabel>{item.label}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							{description && <FormDescription>{description}</FormDescription>}
							<FormMessage />
						</FormItem>
					);
				} else if (fieldType === "date") {
					return (
						<FormItem>
							{label && <FormLabel>{label}</FormLabel>}
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											type="button"
											className="w-full text-start font-normal text-muted-foreground"
										>
											<span>
												{field.value ? format(field.value, "yyyy-MM-dd") : ""}
											</span>
											<CalendarIcon className="ms-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										locale={locale === "fr" ? fr : enUS}
										selected={field.value}
										onSelect={field.onChange}
										className="rounded-md border mx-auto"
										captionLayout="dropdown"
									/>
								</PopoverContent>
							</Popover>
							{description && <FormDescription>{description}</FormDescription>}
							<FormMessage />
						</FormItem>
					);
				} else if (fieldType === "icon") {
					return (
						<InputIcon
							value={field.value}
							onChange={field.onChange}
							label={label}
							description={description}
							placeholder={placeholder}
						/>
					);
				} else {
					return (
						<FormItem>
							{label && <FormLabel>{label}</FormLabel>}
							<FormControl>
								<Input
									placeholder={placeholder}
									type={type}
									{...field}
									className={cn(className)}
								/>
							</FormControl>
							{description && <FormDescription>{description}</FormDescription>}
							<FormMessage />
						</FormItem>
					);
				}
			}}
		/>
	);
}
