export enum Categoria {
	ROUPA = "Roupa",
	ELETRONICO = "Eletrônico",
	ESCRITORIO = "Escritório",
	MOVEIS = "Móveis",
}

export interface Produto {
	id: number;
	nome: string;
	descricao: string;
	categoria: Categoria;
	inseridoEm: number;
	preco: number;
	idUsuario: number;
}
