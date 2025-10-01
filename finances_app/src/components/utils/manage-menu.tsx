"use client";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/locales/client";

interface ManageMenuProps {
	title?: string;
	description?: string;
	onOpenAction?: () => void;
	onDialogAction?: () => void;
}

export default function ManageMenu({
	title,
	description,
	onOpenAction,
	onDialogAction,
}: ManageMenuProps) {
	const t = useI18n();
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

	return (
		<AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<MoreVertical />
						<span className="sr-only">{t("button.choose")}</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							if (onOpenAction) {
								onOpenAction();
							}
						}}
						className="flex items-center gap-2 cursor-pointer"
					>
						<Pencil />
						{t("button.update")}
					</DropdownMenuItem>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer">
							<Trash2 className="text-destructive" />
							{t("button.delete")}
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{t("button.cancel")}</AlertDialogCancel>
					<AlertDialogAction
						onClick={(e) => {
							e.preventDefault();
							if (onDialogAction) {
								onDialogAction();
							}
						}}
					>
						{t("button.delete")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
