export interface CreateCeremonyRequest {
	id: string
	name: string
	groupId: string
	members?: { name: string, strikethrough: boolean }[]
	current?: string
}
