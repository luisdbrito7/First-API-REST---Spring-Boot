import { cn } from "@/utils";

interface TituloProps {
	children: React.ReactNode;
	centralizado?: boolean;
}

export function Titulo(props: TituloProps) {
	return (
		<div className="mx-auto">
			<h2
				className={cn("text-2xl font-bold tracking-tight text-emerald-950", {
					"text-center": props.centralizado,
				})}
			>
				{props.children}
			</h2>
		</div>
	);
}
