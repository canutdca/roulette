import { DeleteCeremony as IDeleteCeremony } from "../domain/DeleteCeremony"
import { DeleteCeremony} from "../../ceremonies/application/DeleteCeremony"

export class DeleteCeremonyApplication implements IDeleteCeremony {

	constructor(private deleteCeremony: DeleteCeremony) {}

    async delete(id: string): Promise<void> {
        return await this.deleteCeremony.run({ id })
    }
	
}
