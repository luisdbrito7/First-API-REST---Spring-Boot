import { cn } from "@/utils/cn";

interface EntradaProps {
	tipo?: "text" | "number" | "calendar" | "password";
	texto: string;
	valor: any;
	nome?: string;
	somenteLeitura?: boolean;
	className?: string;
	valorMudou?: (valor: any) => void;
	placeholder?: string;
}

export function Entrada(props: EntradaProps) {
	return (
		<div className={cn("flex flex-col", props.className)}>
			<label
				className="mb-2 font-semibold text-emerald-950"
				htmlFor={props.nome}
			>
				{props.texto}
			</label>
			<input
				type={props.tipo ?? "text"}
				value={props.valor}
				name={props.nome}
				readOnly={props.somenteLeitura}
				onChange={(e) => props.valorMudou?.(e.target.value)}
				className={cn(
					`
                    border border-gray-200 rounded-lg
                    focus:outline-emerald-300 px-3 py-2 mb-2`,
					{
						"focus:bg-white": !props.somenteLeitura,
						"bg-gray-100": props.somenteLeitura,
					}
				)}
				placeholder={props.placeholder}
			/>
		</div>
	);
}
