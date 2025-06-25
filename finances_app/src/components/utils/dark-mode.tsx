"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, MonitorCog } from "lucide-react";
import { useTheme } from "next-themes";
import type { JSX } from "react";

export default function DarkMode() {
	const mods = [
		{ key: "light", icon: <Sun className="h-4 w-4" /> },
		{ key: "dark", icon: <Moon className="h-4 w-4" /> },
		{ key: "system", icon: <MonitorCog className="h-4 w-4" /> },
	];
	const { theme, setTheme } = useTheme();
	return (
		<RadioGroup value={theme} onValueChange={setTheme} className="flex flex-row gap-1 border p-0.5 rounded-full">
			{mods?.map((item: { key: string; icon: JSX.Element }) => (
				<div key={item.key} className="flex items-center space-x-2">
					<RadioGroupItem value={item.key} id={item.key} className="sr-only" />
					<Label
						htmlFor={item.key}
						className={`flex h-6 w-6 items-center justify-center rounded-full cursor-pointer ${
							theme === item.key ? "bg-primary" : "hover:bg-primary/50"
						}`}
					>
						{item.icon}
					</Label>
				</div>
			))}
		</RadioGroup>
	);
}
