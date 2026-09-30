export class Requisicao {
    static headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    static getUrlBase(): string {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
        return url.endsWith("/") ? url : `${url}/`;
    }

    static async requisicaoGenerica(
        metodo: string,
        complementoURL: string,
        dadosBody?: any
    ) {
        if (complementoURL.startsWith("/")) {
            complementoURL = complementoURL.substring(1);
        }

        const urlFinal = `${Requisicao.getUrlBase()}${complementoURL}`;

        const config: RequestInit = {
            method: metodo,
            headers: { ...Requisicao.headers },
        };

        if (dadosBody !== undefined && metodo !== "GET" && metodo !== "HEAD") {
            config.body = JSON.stringify(dadosBody);
        }

        try {
            const resposta = await fetch(urlFinal, config);
            const resultado = await resposta.json();

            console.log(resultado);

            if (!resposta.ok) {
                const mensagemErro = resultado.mensagem || resultado.message || resultado.error || "Erro na requisição.";
                throw new Error(mensagemErro);
            }

            return resultado;
        } catch (error: any) {
            const failedToFetch = error.message && error.message.includes("Failed to fetch");
            const naoTemMensagem = !error.message;

            if (failedToFetch || naoTemMensagem) {
                throw new Error("Houve um problema, tente novamente mais tarde.");
            }

            console.error(error);
            throw new Error(error.message);
        }
    }

    static async get(complementoURL: string) {
        return await Requisicao.requisicaoGenerica("GET", complementoURL);
    }

    static async post(complementoURL: string, dadosBody: any) {
        return await Requisicao.requisicaoGenerica("POST", complementoURL, dadosBody);
    }

    static async put(complementoURL: string, dadosBody: any) {
        return await Requisicao.requisicaoGenerica("PUT", complementoURL, dadosBody);
    }

    static async patch(complementoURL: string, dadosBody: any) {
        return await Requisicao.requisicaoGenerica("PATCH", complementoURL, dadosBody);
    }

    static async delete(complementoURL: string) {
        return await Requisicao.requisicaoGenerica("DELETE", complementoURL);
    }

    static adicionarToken(token: string) {
        Requisicao.headers["Authorization"] = `Bearer ${token}`;
    }

    static removerToken() {
        delete Requisicao.headers["Authorization"];
    }
}