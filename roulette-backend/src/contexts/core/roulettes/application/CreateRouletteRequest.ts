export interface CreateRouletteRequest {
	id: string
	name: string
	members?: { name: string, strikethrough: boolean }[]
	current?: string
}
