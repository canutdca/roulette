import { DeleteCeremony } from "../../../../../src/contexts/core/groups/domain/DeleteCeremony"


export class DeleteCeremonyMock implements DeleteCeremony {
	private mockDelete = jest.fn()

	async delete(id: string): Promise<void> {
		this.mockDelete(id)
	}

	assertDeleteIsCalled(numberOfTimes: number) {
		expect(this.mockDelete).toBeCalledTimes(numberOfTimes)
	}

}
