"use client";
import { Botao, IconeMais, Tabela, Titulo } from "@/components";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<div className="flex justify-between items-center mb-5">
				<Titulo>Produtos</Titulo>
				<div className="flex-1"></div>

				<Botao className="px-12 py-3">
					<Link className="w-full h-full flex gap-3" href="/produtos/criar">
						<IconeMais width={18} />
						<span>Adicionar Produto</span>
					</Link>
				</Botao>
			</div>

			<Tabela />
		</>
	);
}
