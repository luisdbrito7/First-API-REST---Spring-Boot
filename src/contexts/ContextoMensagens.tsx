"use client";
import { createContext, useState, ReactNode } from "react";

export interface ContextoMensagensProps {
	mensagens: string[];
	adicionarMensagem: (mensagem: string) => void;
	limparMensagens: () => void;
	removerMensagem: (index: number) => void;
}

export const ContextoMensagens = createContext<
	ContextoMensagensProps | undefined
>(undefined);

export const MensagensProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [mensagens, setMensagens] = useState<string[]>([]);

	const adicionarMensagem = (mensagem: string) => {
		setMensagens((prevMensagens) => [...prevMensagens, mensagem]);
	};

	const removerMensagem = (index: number) => {
		setMensagens((prevMensagens) => [
			...prevMensagens.slice(0, index),
			...prevMensagens.slice(index + 1),
		]);
	};

	const limparMensagens = () => {
		setMensagens([]);
	};

	return (
		<ContextoMensagens.Provider
			value={{ mensagens, adicionarMensagem, limparMensagens, removerMensagem }}
		>
			{children}
		</ContextoMensagens.Provider>
	);
};
