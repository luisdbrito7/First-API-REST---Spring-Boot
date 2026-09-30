import { Usuario } from "@/model/Usuario";

export function useLocalStorage() {
	const chaveLocalStorage = "dados-software";

	async function apagarDados() {
		if (typeof window === "undefined") {
			return;
		}
		localStorage.removeItem(chaveLocalStorage);
	}

	function pegarDados() {
		if (typeof window === "undefined") {
			return;
		}
		return JSON.parse(localStorage.getItem(chaveLocalStorage) || "{}");
	}

	function salvarDados(u: Usuario) {
		if (typeof window === "undefined") {
			return;
		}
		localStorage.setItem(chaveLocalStorage, JSON.stringify(u));
	}

	return {
		apagarDados,
		pegarDados,
		salvarDados,
	};
}
