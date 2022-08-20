import { GroupMother } from '../../domain/GroupMother'
import { GroupRepository } from '../../../../../../src/contexts/core/groups/domain/GroupRepository'
import container from '../../../../../../src/apps/core/backend/dependency-injection'
import { EnvironmentArranger } from '../../../../_shared/infrastructure/arranger/EnvironmentArranger'
import { PeristenceErrorBecauseNotExist } from '../../../../../../src/contexts/_shared/infrastructure/persistence/persistence-errors'

const repository: GroupRepository = container.get('Core.groups.domain.GroupRepository')
const environmentArrenger: Promise<EnvironmentArranger> = container.get('Core.EnvironmentArranger')

beforeEach(async () => {
	await (await environmentArrenger).arrange()
})

afterAll(async () => {
	await (await environmentArrenger).arrange()
	await (await environmentArrenger).close()
})

describe('MongoGroupRepository', () => {
	it('save() method', async () => {
		const group = GroupMother.random()
		await repository.save(group)
	})

	it('delete() method with existing group', async() => {
		const group = GroupMother.random()
		await repository.save(group)
		await repository.delete(group.id)
	})

	it('delete() method with not existing group', async() => {
		const group = GroupMother.random()
		await expect(repository.delete(group.id)).rejects.toThrow(PeristenceErrorBecauseNotExist)
	})

	it('getAll() method', async () => {
		const expectedGroups = [
			GroupMother.random(),
			GroupMother.random()
		]
		await repository.save(expectedGroups[0])
		await repository.save(expectedGroups[1])

		const results = await repository.getAll()

		results.forEach(group => {
			const expectedGroup = expectedGroups.find(g => g.id.value === group.id.value)
			expect(expectedGroup!.id.value).toBe(group.id.value)
			expect(expectedGroup!.name.value).toBe(group.name.value)
			group.members.forEach(member => {
				const expectedMember = expectedGroup!.members.find(m => m.value === member.value)
				expect(expectedMember!.value).toBe(member.value)
			})
		})

		expectedGroups.forEach(expectedGroup => {
			const group = results.find(g => g.id.value === expectedGroup.id.value)
			expect(expectedGroup.id.value).toBe(group!.id.value)
			expect(expectedGroup.name.value).toBe(group!.name.value)
			expectedGroup.members.forEach(expectedMember => {
				const member = group!.members.find(m => m.value === expectedMember.value)
				expect(expectedMember.value).toBe(member!.value)

			})
		})
	})

	it('getSingle() method', async () => {
		const expectedGroup = GroupMother.random()
		await repository.save(expectedGroup)

		const group = await repository.getSingle(expectedGroup.id)
		expect(group).not.toBeNull()
		expect(expectedGroup.id.value).toBe(group!.id.value)
		expect(expectedGroup.name.value).toBe(group!.name.value)
	})
})
