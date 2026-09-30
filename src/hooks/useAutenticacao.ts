import { ContextoAutenticacao } from "@/contexts/ContextoAutenticacao";
import { useContext } from "react";

export function useAutenticacao() {
	const context = useContext(ContextoAutenticacao);
	if (!context) {
		throw new Error(
			"useAutenticacao precisa ser usado dentro de um AutenticacaoProvider"
		);
	}
	return context;
}
