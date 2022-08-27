import { DeleteCeremony as IDeleteCeremony } from "../domain/DeleteCeremony"
import { DeleteSingleCeremony } from "../../ceremonies/application/DeleteSingleCeremony"

export class DeleteCeremonyApplication implements IDeleteCeremony {

	constructor(private deleteCeremony: DeleteSingleCeremony) {}

    async delete(id: string): Promise<void> {
        return await this.deleteCeremony.run({ id })
    }
	
}
