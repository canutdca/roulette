import { CreateCeremony as ICreateCeremony } from "../domain/CreateCeremony"
import { CreateCeremonyFromGroup } from "../../ceremonies/application/CreateCeremonyFromGroup"

export class CreateCeremonyApplication implements ICreateCeremony {

	constructor(private createCeremony: CreateCeremonyFromGroup) {}

    async create(id: string, groupId: string, name: string, members: string[]): Promise<void> {
        return await this.createCeremony.run({ id, groupId, name, members })
    }
	
}
