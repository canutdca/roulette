import { CreateCeremony } from "../../../../../src/contexts/core/groups/domain/CreateCeremony"


export class CreateCeremonyMock implements CreateCeremony {
	private mockCreate = jest.fn()

	async create(id: string, groupId: string, name: string, members: string[]): Promise<void> {
		this.mockCreate({id, groupId, name, members})
	}

	assertCreatedIsCalled(numberOfTimes: number) {
		expect(this.mockCreate).toBeCalledTimes(numberOfTimes)
	}

}
