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
			console.log(groupUpdating)
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

	const addRoulette = async (newRoulleteName: string): Promise<string> => {
		if (!newRoulleteName) return Promise.resolve('')
		const groupUpdating = group!.clone()
		try {
			const newRouletteId = groupUpdating.addRoulette(newRoulleteName)
			setGroup(groupUpdating)
			await saveGroupApi(groupUpdating)
			return newRouletteId
		} catch (error: any) {
			return error.message
		}
	}

	const editRoulette = async (rouletteId: string, editedRouletteName: string): Promise<void> => {
		debugger
		if (!editedRouletteName) return Promise.resolve()
		const groupUpdating = group!.clone()
		try {
			groupUpdating.editRoulette(rouletteId, editedRouletteName)
			setGroup(groupUpdating)
			return saveGroupApi(groupUpdating)
		} catch (error: any) {
			return error.message
		}
	}
	
	const deleteRoulette = async (rouletteId: string): Promise<void> => {
		const groupUpdating = group!.clone()
		try {
			groupUpdating.deleteRoulette(rouletteId)
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
		addRoulette,
		editRoulette,
		deleteRoulette
	}
}
