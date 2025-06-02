"use client";
import { useI18n } from "@/locales/client";
import { useState } from "react";
import { 
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { 
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,

} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";

type ManageMenuprops = {
    title?: string,
    description?: string,
    children: React.ReactNode,
    onSheetOpen: (value: boolean) => void,
    onEdit: (value: boolean) => void,
};

export default function ManageMenu({
title,
description,
children,
onSheetOpen,
onEdit,
}: ManageMenuprops) {

    const t = useI18n();
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);
    
    return (
        <AlertDialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical/>
                        <span className="sr-only">{ t('components.utils.manageMenu.button.menu') }</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                        onClick={() => {
                            onSheetOpen(true),
                            onEdit(true)
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <Pencil/>
                        { t('components.utils.manageMenu.button.update') }
                    </DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem
                            className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                            >
                            <Trash2 className="text-destructive"/>
                            { t('components.utils.manageMenu.button.delete') }
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{ title }</AlertDialogTitle>
                    <AlertDialogDescription>{ description }</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {children}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}