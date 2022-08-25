import { CreateRoulette as ICreateRoulette } from "../domain/CreateRoulette"
import { CreateRouletteFromGroup } from "../../roulettes/application/CreateRouletteFromGroup"

export class CreateRouletteApplication implements ICreateRoulette {

	constructor(private createRoulette: CreateRouletteFromGroup) {}

    async create(id: string, groupId: string, name: string, members: string[]): Promise<void> {
        return await this.createRoulette.run({ id, groupId, name, members })
    }
	
}
