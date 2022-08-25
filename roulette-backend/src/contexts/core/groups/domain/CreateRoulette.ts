export interface CreateRoulette {
	create(id: string, groupId: string,name: string, members: string[]): Promise<void>
}
