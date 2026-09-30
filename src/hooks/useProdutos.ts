import { ContextoProdutos } from "@/contexts/ContextoProdutos";
import { useContext } from "react";

export function useProdutos() {
	const context = useContext(ContextoProdutos);
	if (!context) {
		throw new Error(
			"useProdutos precisa ser usado dentro de um ProdutosProvider"
		);
	}
	return context;
}
