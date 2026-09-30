"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Categoria } from "@/model";
import { Botao, Entrada, Loader, Select } from "@/components";
import { useProdutos } from "@/hooks";

interface FormularioProps {
	produto?: any;
}

const camposFormulario = [
	{ tipo: "text", nome: "nome", texto: "Nome", placeholder: "Nome do produto" },
	{
		tipo: "text",
		nome: "descricao",
		texto: "Descrição",
		placeholder: "Descrição do produto",
	},
	{
		tipo: "select",
		nome: "categoria",
		texto: "Categoria",
		opcoes: Object.values(Categoria),
		placeholder: "Categoria do produto",
	},
	{
		tipo: "number",
		nome: "preco",
		texto: "Preço",
		placeholder: "Preço do produto",
	},
];

export function Formulario(props: FormularioProps) {
	const router = useRouter();
	const { salvar } = useProdutos();

	const [produto, setProduto] = useState<any>({
		...props.produto,
		categoria: Categoria[props.produto?.categoria as keyof typeof Categoria],
	});

	const handleChange = (nome: string, valor: any) => {
		setProduto((prev: any) => ({ ...prev, [nome]: valor }));
	};

	const renderCampo = (campo: any) => {
		switch (campo.tipo) {
			case "select":
				return (
					<Select
						key={campo.nome}
						selectedOption={produto[campo.nome] ?? campo.placeholder}
						texto={campo.texto}
						placeholder={campo.placeholder}
						opcoes={campo.opcoes}
						onSelect={(valor: any) => handleChange(campo.nome, valor)}
					/>
				);
			default:
				return (
					<Entrada
						tipo={campo.tipo}
						key={campo.nome}
						texto={campo.texto}
						valor={produto[campo.nome] || ""}
						valorMudou={(valor: any) => handleChange(campo.nome, valor)}
						placeholder={campo.placeholder}
					/>
				);
		}
	};

	return (
		<div className="flex flex-col gap-5">
			{!produto && <Loader />}
			{produto?.id && produto && (
				<Entrada somenteLeitura texto="Id" valor={produto.id} />
			)}
			{produto?.id && produto["inseridoEm"] && (
				<Entrada
					somenteLeitura
					texto="InseridoEm"
					valor={produto["inseridoEm"]}
				/>
			)}

			{produto && camposFormulario.map((campo) => renderCampo(campo))}

			<div className="flex justify-end mt-7">
				<Botao vazado className="mr-2">
					<Link href="/produtos" className="w-full h-full">
						Cancelar
					</Link>
				</Botao>
				<Botao
					onClick={async () => {
						const sucesso = await salvar({ id: produto.id, ...produto });
						if (!sucesso) return;
						router.push("/produtos");
					}}
				>
					Salvar Produto
				</Botao>
			</div>
		</div>
	);
}
