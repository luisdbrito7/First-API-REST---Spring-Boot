"use client";
import { useMensagens } from "@/hooks/useMensagens";
import { Botao } from "./template/Botao";
import { cn } from "@/utils";

export function MensagensComponent() {
	const { mensagens, removerMensagem } = useMensagens();

	return (
		<div className="fixed top-4 right-4 w-80 z-50">
			<ul className="space-y-2 bg-transparent">
				{mensagens.map((mensagem, index) => (
					<li
						key={index}
						className={cn(
							"bg-red-500 text-white p-3",
							"rounded-lg flex justify-between items-center"
						)}
					>
						<span>{mensagem}</span>
						<Botao
							onClick={() => removerMensagem(index)}
							className={cn(
								"flex items-center justify-center",
								"bg-red-700 hover:bg-red-800 text-white",
								"ml-4 p-3 w-8 h-8",
								"font-bold rounded-full text-sm"
							)}
						>
							<span>X</span>
						</Botao>
					</li>
				))}
			</ul>
		</div>
	);
}
