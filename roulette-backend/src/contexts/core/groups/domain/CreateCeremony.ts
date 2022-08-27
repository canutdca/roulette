export interface CreateCeremony {
	create(id: string, groupId: string, name: string, members: string[]): Promise<void>
}
