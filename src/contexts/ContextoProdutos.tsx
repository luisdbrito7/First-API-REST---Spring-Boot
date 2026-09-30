"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Categoria, Produto } from "@/model";
import { useMensagens, useAutenticacao } from "@/hooks";
import { Requisicao } from "@/utils/Requisicao";

export interface ContextoProdutosProps {
    produtos: Produto[];
    carregando: boolean;
    obterTodos: () => Promise<void>;
    obterPorId: (id: number) => Promise<Produto | null>;
    salvar: (produto: Produto) => Promise<boolean>;
    excluir: (id: number) => Promise<boolean>;
}

export const ContextoProdutos = createContext<
    ContextoProdutosProps | undefined
>(undefined);

export const ProdutosProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [carregando, setCarregando] = useState(false);
    const { adicionarMensagem } = useMensagens();
    const { usuario } = useAutenticacao();
    const endpoint = "produtos";

    useEffect(() => {
        (async function carregar() {
            if (!usuario) return;
            setCarregando(true);
            try {
                await obterTodos();
            } finally {
                setCarregando(false);
            }
        })();
    }, [usuario]);

    async function obterTodos() {
        try {
            const dados = await Requisicao.get(`/${endpoint}`);
            
            const produtosFormatados = (dados || []).map((item: any) => ({
                ...item,
                descricao: item.descricao ?? item["descrição"] ?? "",
                preco: Number(item.preco ?? item["preço"] ?? 0),
                inseridoEm: item.inseridoEm || item.inserido_em || item.createdAt,
                idUsuario: item.idUsuario || item.id_usuario || item.userId || item.id || 1,
            }));

            setProdutos(produtosFormatados);
        } catch (error: any) {
            adicionarMensagem(error.message);
        }
    }

    async function obterPorId(id: number) {
        try {
            const produto = await Requisicao.get(`/${endpoint}/${id}`);
            if (!produto) return null;

            return {
                ...produto,
                descricao: produto.descricao ?? produto["descrição"] ?? "",
                preco: Number(produto.preco ?? produto["preço"] ?? 0),
                inseridoEm: produto.inseridoEm || produto.inserido_em || produto.createdAt,
                idUsuario: produto.idUsuario || produto.id_usuario || produto.userId || produto.id || 1,
            } as Produto;
        } catch (error: any) {
            adicionarMensagem(error.message);
            return null;
        }
    }

    async function excluir(id: number) {
        try {
            await Requisicao.delete(`/${endpoint}/${id}`);
            await obterTodos();
            return true;
        } catch (error: any) {
            adicionarMensagem(error.message);
            return false;
        }
    }

    async function salvar(produto: Produto) {
        try {
            const id = (produto as any).id;

            const produtoParaEnviar = {
                ...produto,
                "descrição": produto.descricao,
                "preço": Number(produto.preco ?? 0),
                categoria: Object.entries(Categoria).find(
                    ([chave, valor]) => valor === produto.categoria
                )?.[0] as Categoria,
            };

            if (id) {
                await Requisicao.put(`/${endpoint}/${id}`, produtoParaEnviar);
            } else {
                await Requisicao.post(`/${endpoint}`, produtoParaEnviar);
            }
            await obterTodos();
            return true;
        } catch (error: any) {
            adicionarMensagem(error.message);
            return false;
        }
    }

    const value: ContextoProdutosProps = {
        produtos,
        carregando,
        obterTodos,
        obterPorId,
        salvar,
        excluir,
    };

    return (
        <ContextoProdutos.Provider value={value}>
            {children}
        </ContextoProdutos.Provider>
    );
}