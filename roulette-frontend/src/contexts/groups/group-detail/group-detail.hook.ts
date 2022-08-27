import { useState } from 'react'
import { Group } from '../domain/group.model'
import { deleteGroupApi, getGroupApi, saveGroupApi } from '../shared/groups-api.service'

export function useGroupDetail(id: string | undefined) {

	const [group, setGroup] = useState<Group>()
	const getGroup = async () => {
		if (!id) return setGroup(new Group())
		setGroup(await getGroupApi(id))
	}

	const setGroupName = (newName: string): Promise<void> => {
		if (!group) return Promise.resolve()
		const groupUpdating = group.clone()
		try {
			groupUpdating.name = newName
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const deleteGroup = async (): Promise<void> => {
		await deleteGroupApi(group!.id)
	}

	const addMember = async (newMember: string): Promise<void> => {
		if (!newMember) return Promise.resolve()
		const groupUpdating = group!.clone()
		try {
			groupUpdating.addMember(newMember)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const editMember = async (indexMember: number, editedMember: string): Promise<void> => {
		if (!editedMember) return Promise.resolve()
		const groupUpdating = group!.clone()
		try {
			groupUpdating.editMember(indexMember, editedMember)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const deleteMember = async (indexMember: number): Promise<void> => {
		const groupUpdating = group!.clone()
		try {
			groupUpdating.deleteMember(indexMember)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const addCeremony = async (newRoulleteName: string): Promise<string> => {
		if (!newRoulleteName) return Promise.resolve('')
		const groupUpdating = group!.clone()
		try {
			const newCeremonyId = groupUpdating.addCeremony(newRoulleteName)
			setGroup(groupUpdating)
			await saveGroupApi(groupUpdating)
			return newCeremonyId
		} catch (error: any) {
			return error.message
		}
	}

	const editCeremony = async (ceremonyId: string, editedCeremonyName: string): Promise<void> => {
		if (!editedCeremonyName) return Promise.resolve()
		const groupUpdating = group!.clone()
		try {
			groupUpdating.editCeremony(ceremonyId, editedCeremonyName)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}
	
	const deleteCeremony = async (ceremonyId: string): Promise<void> => {
		const groupUpdating = group!.clone()
		try {
			groupUpdating.deleteCeremony(ceremonyId)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	return {
		group,
		getGroup,
		setGroupName,
		deleteGroup,
		addMember,
		editMember,
		deleteMember,
		addCeremony,
		editCeremony,
		deleteCeremony
	}
}
