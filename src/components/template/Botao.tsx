import { cn } from "@/utils/cn";

interface BotaoProps {
	vazado?: boolean;
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

export function Botao({ vazado, className, children, onClick }: BotaoProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"font-semibold rounded-lg",
				"my-2 px-4 py-2",
				{
					"border-2 border-emerald-600 text-emerald-600 bg-transparent": vazado,
					"hover:bg-emerald-600 hover:text-white": vazado,
					"text-white bg-emerald-500": !vazado,
					"hover:bg-emerald-700": !vazado,
				},
				className
			)}
		>
			{children}
		</button>
	);
}
