import { cn } from "@/utils";

interface TagProps {
	texto: string;
}

export function Tag({ texto }: TagProps) {
	return (
		<span
			className={cn(
				"inline-block bg-emerald-100 text-emerald-800",
				"text-sm font-semibold px-2.5 py-0.5 rounded-full"
			)}
		>
			{texto}
		</span>
	);
}
