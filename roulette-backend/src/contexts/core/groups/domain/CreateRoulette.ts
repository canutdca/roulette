export interface CreateRoulette {
	create(id: string, name: string): Promise<void>
}
