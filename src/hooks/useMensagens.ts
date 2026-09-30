import { ContextoMensagens } from "@/contexts/ContextoMensagens";
import { useContext } from "react";

export function useMensagens() {
	const context = useContext(ContextoMensagens);
	if (!context) {
		throw new Error(
			"useMensagens precisa ser usado dentro de um MensagensProvider"
		);
	}
	return context;
}
