"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Usuario } from "@/model";
import { useMensagens, useLocalStorage } from "@/hooks";
import { Requisicao } from "@/utils/Requisicao";

export interface ContextoAutenticacaoProps {
    cadastrar: (nome: string, email: string, senha: string) => Promise<boolean>;
    logar: (email: string, senha: string) => Promise<boolean>;
    deslogar: () => Promise<void>;
    usuario: Usuario | null;
    carregando: boolean;
}

export const ContextoAutenticacao = createContext<
    ContextoAutenticacaoProps | undefined
>(undefined);

export const AutenticacaoProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const endpoint = "auth";
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);
    const { adicionarMensagem } = useMensagens();

    const { apagarDados, pegarDados, salvarDados } = useLocalStorage();

    useEffect(() => {
        setCarregando(true);
        const dados = pegarDados();
        
        if (dados && dados.token) {
            Requisicao.adicionarToken(dados.token);
            setUsuario(dados);
        }
        
        setCarregando(false);
    }, []);

    async function logar(email: string, senha: string) {
        try {
            const dados = await Requisicao.post(`${endpoint}/login`, {
                email,
                senha,
            });

            if (dados.token) {
                Requisicao.adicionarToken(dados.token);
            }

            const usuarioLogado = {
                nome: dados.nome,
                email: dados.email,
                token: dados.token,
            };

            salvarDados(usuarioLogado);
            setUsuario(usuarioLogado);
            return true;
        } catch (error: any) {
            adicionarMensagem(error.message);
            return false;
        }
    }

    async function cadastrar(nome: string, email: string, senha: string) {
        try {
            await Requisicao.post(`${endpoint}/cadastrar`, {
                nome,
                email,
                senha,
            });
            return await logar(email, senha);
        } catch (error: any) {
            adicionarMensagem(error.message);
            return false;
        }
    }

    async function deslogar() {
        Requisicao.removerToken();
        setUsuario(null);
        apagarDados();
    }

    return (
        <ContextoAutenticacao.Provider
            value={{
                logar,
                cadastrar,
                deslogar,
                usuario,
                carregando,
            }}
        >
            {children}
        </ContextoAutenticacao.Provider>
    );
};