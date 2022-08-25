import { CreateRoulette as ICreateRoulette } from "../domain/CreateRoulette"
import { CreateRouletteFromGroup } from "../../roulettes/application/CreateRouletteFromGroup"

export class CreateRouletteApplication implements ICreateRoulette {

	constructor(private createRoulette: CreateRouletteFromGroup) {}

    async create(id: string, name: string): Promise<void> {
        return await this.createRoulette.run({id, name})
    }
	
}
