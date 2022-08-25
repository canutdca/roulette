export interface GetRoulettesResponse {
	list: RouletteResponse[]
}

export interface RouletteResponse {
	id: string
	name: string
	members: { name: string, strikethrough: boolean }[]
	current: string | null
}
