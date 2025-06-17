"use client"

import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce"
import { Search, X } from "lucide-react"
import { Icon } from "@iconify/react"
import { icons as iconsLucide } from "@iconify-json/lucide"
import { icons as iconsSimple } from "@iconify-json/simple-icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useI18n } from "@/locales/client"

interface InputIconProps {
    value?: string
    onChange?: (value: string) => void
    label?: string
    description?: string
    placeholder?: string
}

export default function InputIcon({
    value = "",
    onChange,
    label,
    description,
    placeholder,
}: InputIconProps) {
    const t = useI18n();
    const simpleIcons = Object.entries(iconsSimple.icons).map(([name, icon]) => ({
        key: "simple-icons",
        name,
        path: icon.body,
    }))

    const LucideIcons = Object.entries(iconsLucide.icons).map(([name, icon]) => ({
        key: "lucide",
        name,
        path: icon.body,
    }))

    const allIcons = [...simpleIcons, ...LucideIcons]

    const [searchInput, setSearchInput] = useState<string>("")
    const [allIconsFiltered, setAllIconsFiltered] = useState([...allIcons.slice(0, 24)])
    const [selectedIcon, setSelectedIcon] = useState<{ key: string; name: string } | null>(null)

    useEffect(() => {
        if (value && value.includes(":")) {
            const [key, name] = value.split(":")
            setSelectedIcon({ key, name })
        } else {
            setSelectedIcon(null)
        }
    }, [value])

    const [searchQuery] = useDebounce(searchInput, 300)

    const filteredIcons = () => {
        if (searchQuery.trim() === "") {
            setAllIconsFiltered([...allIcons.slice(0, 24)])
        } else {
            const query = searchQuery.toLowerCase()
            setAllIconsFiltered([...allIcons.filter((icon) => icon.name.toLowerCase().includes(query)).slice(0, 24)])
        }
    }

    useEffect(() => {
        filteredIcons()
    }, [searchQuery])

    const handleIconSelect = (icon: { key: string; name: string }) => {
        setSelectedIcon(icon)
        const iconValue = `${icon.key}:${icon.name}`
        onChange?.(iconValue)
    }

    const handleClearIcon = () => {
        setSelectedIcon(null)
        setSearchInput("")
        onChange?.("")
    }

  return (
    <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
            <div>
            {selectedIcon === null ? (
                <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="size-4 text-muted-foreground" />
                </div>
                <Input
                    id="icon-search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10"
                    placeholder={placeholder}
                />
                </div>
            ) : (
                <div className="flex items-center gap-2 p-1 h-[36px] border rounded-md">
                <Icon icon={`${selectedIcon.key}:${selectedIcon.name}`} className="size-5 text-primary" />
                <Button variant="ghost" size="icon" className="ml-auto size-8" onClick={handleClearIcon} type="button">
                    <X className="size-4" />
                </Button>
                </div>
            )}
            </div>
        </FormControl>

        {allIcons.length > 0 && (
            <div className="border rounded-md h-32 overflow-y-auto p-2">
            {allIconsFiltered.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">{ t("components.utils.inputIcon.noResults") }</div>
            ) : (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                {allIconsFiltered.map((item, index) => (
                    <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => handleIconSelect({ key: item.key, name: item.name })}
                    >
                    <Icon icon={`${item.key}:${item.name}`} className="size-6 text-primary" />
                    </button>
                ))}
                </div>
            )}
            </div>
        )}

        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
    </FormItem>
  )
}