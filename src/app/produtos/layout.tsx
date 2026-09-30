"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header, Loader } from "@/components";
import { useAutenticacao } from "@/hooks";
import { ProdutosProvider } from "@/contexts";

export default function ({ children }: any) {
	const { usuario, carregando } = useAutenticacao();
	const router = useRouter();
 useEffect(() => {
		if (!usuario && !carregando) {
			router.push("/");
 	}
 }, [usuario, carregando]);
 
	if (carregando) {
		return <Loader />;
	}

	

	return (
		<div className="bg-gray-50  min-h-screen">
			<ProdutosProvider>
				<Header />
				<main className="max-w-7xl m-auto py-10">{children}</main>
			</ProdutosProvider>
		</div>
	);
}
