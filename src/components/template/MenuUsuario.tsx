"use client";
import { useAutenticacao } from "@/hooks/useAutenticacao";
import { IconeSair, IconeUsuario } from "./Icones";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";

export function MenuUsuario() {
	const { deslogar, usuario } = useAutenticacao();
	const router = useRouter();
	return (
		<div className="relative group">
			<div
				className={cn(
					"flex items-center justify-center gap-3",
					"min-w-fit mx-8 cursor-pointer"
				)}
			>
				<div
					className={cn(
						"bg-emerald-500 w-10 h-10 rounded-full",
						"flex justify-center items-center"
					)}
				>
					<IconeUsuario className="text-gray-50" />
				</div>
				<div className="flex-col ">
					<div className="font-bold text-md text-emerald-800">
						{usuario?.nome}
					</div>
					<div className="text-sm text-emerald-600">{usuario?.email}</div>
				</div>
			</div>

			<div
				className={cn(
					"absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl",
					"opacity-0 invisible group-hover:opacity-100 group-hover:visible",
					"transition-all duration-300 transform group-hover:translate-y-0 translate-y-[-10px]"
				)}
			>
				<div className="px-4 py-2 border-b border-gray-100">
					<div className="text-sm font-medium text-emerald-900">
						{usuario?.nome}
					</div>
					<div className="text-sm text-emerald-600">{usuario?.email}</div>
				</div>
				<button
					onClick={() => {
						deslogar();
						router.push("/");
					}}
					className={cn(
						"w-full px-4 py-2 text-left text-sm",
						"text-gray-700 hover:bg-red-50 hover:text-red-700",
						"flex items-center gap-2 transition-colors duration-200"
					)}
				>
					<IconeSair width={15} />
					Sair da conta
				</button>
			</div>
		</div>
	);
}
