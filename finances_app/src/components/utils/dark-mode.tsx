"use client"

import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Sun, Moon, MonitorCog } from "lucide-react"
import { useTheme } from "next-themes"

export default function DarkMode() {
  const { theme, setTheme, systemTheme} = useTheme();
  return (
    <RadioGroup value={theme} onValueChange={setTheme} className="flex flex-row gap-1 border p-0.5 rounded-full">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="light" id="light" className="sr-only" />
        <Label
          htmlFor="light"
          className={`flex h-6 w-6 items-center justify-center rounded-full cursor-pointer  ${
            theme === "light" ? "bg-primary" : "hover:bg-primary/50"
          }`}
        >
          <Sun className="h-4 w-4" />
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="dark" id="dark" className="sr-only" />
        <Label
          htmlFor="dark"
          className={`flex h-6 w-6 items-center justify-center rounded-full cursor-pointer  ${
            theme === "dark" ? "bg-primary" : "hover:bg-primary/50"
          }`}
        >
          <Moon className="h-4 w-4" />
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="system" id="system" className="sr-only" />
        <Label
          htmlFor="system"
          className={`flex h-6 w-6 items-center justify-center rounded-full cursor-pointer ${
            theme === "system" ? "bg-primary" : "hover:bg-primary/50"
          }`}
        >
          <MonitorCog className="h-4 w-4" />
        </Label>
      </div>
    </RadioGroup>
  )
}
