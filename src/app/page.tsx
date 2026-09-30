"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAutenticacao } from "@/hooks";
import { Botao, Entrada, Titulo } from "@/components";
import { cn } from "@/utils";

export default function Login() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [registrar, setRegistrar] = useState(false);
	const { logar, cadastrar, usuario } = useAutenticacao();
	const router = useRouter();

	useEffect(() => {
		if (usuario) {
	 		router.push("/produtos");
	 	}
	 }, [usuario]);

	return (
		<div
			className={cn(
				"h-screen bg-emerald-100",
				"flex items-center justify-center"
			)}
		>
			<div
				className={cn("p-8 bg-white w-full max-w-md", "rounded-lg shadow-lg")}
			>
				<Titulo centralizado>{registrar ? "Registrar" : "Login"}</Titulo>
				{registrar && (
					<Entrada
						texto="Nome"
						nome="nome"
						valor={nome}
						valorMudou={setNome}
						className="mb-4"
					/>
				)}
				<Entrada
					texto="Email"
					nome="email"
					valor={email}
					valorMudou={setEmail}
					className="mb-4"
				/>
				<Entrada
					texto="Senha"
					nome="senha"
					tipo="password"
					valor={senha}
					valorMudou={setSenha}
					className="mb-4"
				/>
				<Botao
					className="w-full py-2 mb-4 "
					onClick={async () => {
						let sucesso: any;
						if (registrar) {
							sucesso = await cadastrar(nome, email, senha);
						} else {
							sucesso = await logar(email, senha);
						}
						if (!sucesso) return;
						router.push("/produtos");
					}}
				>
					{registrar ? "Cadastrar" : "Logar"}
				</Botao>
				<Botao
					className="w-full py-2 "
					onClick={() => setRegistrar(!registrar)}
				>
					{registrar ? "Já tem conta?" : "Não tem conta?"}
				</Botao>
			</div>
		</div>
	);
}
