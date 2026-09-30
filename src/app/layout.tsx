import type { Metadata } from "next";
import "./globals.css";
import { MensagensComponent as Mensagens } from "@/components";
import { AutenticacaoProvider, MensagensProvider } from "@/contexts";

export const metadata: Metadata = {
	title: "Gerenciador de Produtos",
	description: "Gerenciador de Produtos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className="min-h-screen">
				<MensagensProvider>
					<AutenticacaoProvider>
						<Mensagens />
						{children}
					</AutenticacaoProvider>
				</MensagensProvider>
			</body>
		</html>
	);
}
