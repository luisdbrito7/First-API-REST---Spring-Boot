import { cn } from "@/utils";
import { MenuUsuario } from "./MenuUsuario";

export function Header() {
	return (
		<header
			className={cn(
				"flex flex-1 items-center justify-between",
				"relative p-5 border-gray-300 border-b-2"
			)}
		>
			<h1
				className={cn("text-3xl font-bold", "tracking-tight text-emerald-500")}
			>
				Gerenciador de Produtos
			</h1>
			<MenuUsuario />
		</header>
	);
}
