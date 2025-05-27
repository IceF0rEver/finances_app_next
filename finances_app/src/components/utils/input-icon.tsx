"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/locales/client"
import { Search, X, } from "lucide-react";
import { Icon } from "@iconify/react"
import { icons as iconsLucide } from "@iconify-json/lucide";
import { icons as iconsSimple } from "@iconify-json/simple-icons";
import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';

type InputIconProps = {
    icon: string | null;
    onIcon: (icon: string) => void;
};

export default function InputIcon({icon, onIcon} : InputIconProps) {
    const t = useI18n();

    const simpleIcons = Object.entries(iconsSimple.icons).map(([name, icon]) => ({
        key: "simple-icons",
        name,
        path: icon.body,
    }));
    const LucideIcons = Object.entries(iconsLucide.icons).map(([name, icon]) => ({
        key: "lucide",
        name,
        path: icon.body,
    }));

    const allIcons = [...simpleIcons, ...LucideIcons];

    const [searchInput, setSearchInput] = useState<string>("");
    const [allIconsFiltred, setAllIconsFiltred] = useState([...allIcons]);

    const [selectedIcon, setselectdIcon]= useState<{ key: string; name: string  } | null>(null);

    useEffect(() => {
        if (icon) {
            setselectdIcon({
                key: icon.split(':')[0],
                name: icon.split(':')[1],
            });
        }
    }, [icon])

    const [searchQuery] = useDebounce(searchInput, 300);

    const filteredIcons = () => {
        if (searchQuery.trim() === "") {
            setAllIconsFiltred([...allIcons.slice(0, 24)]);
        }else {
            const query = searchQuery.toLowerCase();
            setAllIconsFiltred([...allIcons.filter(icon => icon.name.toLowerCase().includes(query)).slice(0, 24)]);
        }
    };

    useEffect(() => {
        filteredIcons();
    }, [searchQuery]);

    useEffect(() => {
        if (selectedIcon) {
            onIcon(`${selectedIcon?.key}:${selectedIcon?.name}`)
        }
    }, [selectedIcon])

    return (
        <div className="space-y-4">
            <div className="grid gap-2">
                <Label htmlFor="icon-search">{ t("components.utils.inputIcon.label") }</Label>
                {selectedIcon === null &&
                    <div 
                    className="relative"
                    >
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="size-4 text-muted-foreground" />
                        </div>
                        <Input 
                            id="icon-search"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)} 
                            className="pl-10"
                            />
                    </div>
                }
                {selectedIcon && 
                    <div className="flex items-center gap-2 p-1 h-[36px] border rounded-md">
                        <Icon 
                            icon={`${selectedIcon.key}:${selectedIcon.name}`} 
                            className="size-5 text-primary" 
                            />
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="ml-auto size-8" 
                            onClick={() => setselectdIcon(null)}
                            >
                            <X className="size-4" />
                        </Button>
                    </div>
                }
            </div>
            {allIcons.length > 0 &&
                <div className="border rounded-md h-32 overflow-y-auto p-2">
                    { allIconsFiltred.length === 0 ? 
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            { t("components.utils.inputIcon.noResults") }
                        </div>
                    : 
                        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
                            { allIconsFiltred.map((item : any, index) => (
                                <button
                                    key={index}
                                    className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-muted transition-colors"
                                    onClick={() => setselectdIcon({ key: item.key, name: item.name })}
                                >
                                    <Icon 
                                        icon={`${item.key}:${item.name}`} 
                                        className="size-6 text-primary" 
                                    />
                                </button>
                            ))}
                        </div>
                    }
                </div>
            }
        </div>
    )
}