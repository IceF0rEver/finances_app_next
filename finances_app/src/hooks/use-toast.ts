"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface ToastState {
	success?: boolean;
	message?: string;
}

interface UseToastOptions {
	loadingMessage: string;
	successMessage: string;
	errorMessage: string;
}

export function useToast(
	state: ToastState,
	isPending: boolean,
	options: UseToastOptions,
) {
	const toastRef = useRef<string | number | null>(null);

	useEffect(() => {
		if (state.success) {
			if (toastRef.current) {
				toast.dismiss(toastRef.current);
				toastRef.current = null;
			}
			toast.success(options.successMessage);
		} else if (state.message && !state.success) {
			if (toastRef.current) {
				toast.dismiss(toastRef.current);
				toastRef.current = null;
			}
			toast.error(options.errorMessage);
		}
	}, [state, options]);

	useEffect(() => {
		if (isPending) {
			toastRef.current = toast.loading(options.loadingMessage);
		} else if (toastRef.current) {
			toast.dismiss(toastRef.current);
			toastRef.current = null;
		}
	}, [isPending, options]);
}
