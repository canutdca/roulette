export interface DeleteCeremony {
	delete(id: string): Promise<void>
}
