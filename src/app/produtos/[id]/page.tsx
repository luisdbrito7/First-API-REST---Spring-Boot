"use client";
import { Formulario, Titulo } from "@/components";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProdutos } from "@/hooks";
import { useRouter } from "next/navigation";
export default function Produto() {
	const { id }: any = useParams();
	const [produto, setProduto] = useState<any>(null);
	const { obterPorId } = useProdutos();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (id !== "criar") {
				const p = await obterPorId(id);
				if (!p) {
					router.push("/produtos");
					return;
				}
				setProduto(p);
			}
		})();
	}, [id]);

	return (
		<div className="flex flex-col gap-5">
			<Titulo>
				{id !== "criar" ? `Editando ${produto?.nome}` : "Criando Produto"}
			</Titulo>

			{(id === "criar" || produto) && <Formulario produto={produto} />}
		</div>
	);
}
