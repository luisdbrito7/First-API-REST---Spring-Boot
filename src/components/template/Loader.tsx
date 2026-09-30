import { cn } from "@/utils";

export function Loader() {
	return (
		<div
			className={cn(
				"w-8 h-8 rounded-full animate-spin",
				"border-4 border-gray-200 border-t-emerald-500 "
			)}
		/>
	);
}
