import { DeleteRoulette as IDeleteRoulette } from "../domain/DeleteRoulette"
import { DeleteRoulette} from "../../roulettes/application/DeleteRoulette"

export class DeleteRouletteApplication implements IDeleteRoulette {

	constructor(private deleteRoulette: DeleteRoulette) {}

    async delete(id: string): Promise<void> {
        return await this.deleteRoulette.run({ id })
    }
	
}
