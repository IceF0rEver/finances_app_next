import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { subscriptionParams } from "@/types/subscription-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calendarCheckDate(item : subscriptionParams, dateValue : any) {
  const executionDate = new Date(item.executionDate);
  const date = new Date(dateValue);
              
  return (executionDate.getDate() === date.getDate() && executionDate.getMonth() === date.getMonth() && item.recurrence === 'annually') 
    || (executionDate.getDate() === date.getDate() && item.recurrence === 'monthly')
}
