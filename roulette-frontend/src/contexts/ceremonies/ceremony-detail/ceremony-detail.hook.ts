import { useState } from 'react'
import { Ceremony } from '../domain/ceremony.model'
import { getCeremonyApi, saveCeremonyApi } from './ceremony-detail-api.service'

export function useCeremonyDetail(id: string) {

	const [ceremony, setCeremony] = useState<Ceremony>()
	const [ceremonyAfterPlayBeforeConfirm, setCeremonyAfterPlayBeforeConfirm] = useState<Ceremony | null>(null)

	const getCeremony = async () => {
		setCeremony(await getCeremonyApi(id))
	}

	const setCeremonyName = (newName: string): Promise<void> => {
		if (!ceremony) return Promise.resolve()
		const ceremonyUpdating = ceremony.clone()
		try {
			ceremonyUpdating.name = newName
			setCeremony(ceremonyUpdating)
			return saveCeremonyApi(ceremonyUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const setStrikethroughMember = async (index: number): Promise<void> => {
		const ceremonyUpdating = ceremony!.clone()
		ceremonyUpdating!.setStrikethroughMember(index)
		setCeremony(ceremonyUpdating)
		await saveCeremonyApi(ceremonyUpdating)
	}
	const setActiveMember = async (index: number): Promise<void> => {
		const ceremonyUpdating = ceremony!.clone()
		ceremonyUpdating!.setActiveMember(index)
		setCeremony(ceremonyUpdating)
		await saveCeremonyApi(ceremonyUpdating)
	}

	const play = (): void => {
		const ceremonyPlaying = ceremony!.clone()
		ceremonyPlaying!.play()
		setCeremonyAfterPlayBeforeConfirm(ceremonyPlaying)
	}

	const confirm = async (): Promise<void> => {
		ceremonyAfterPlayBeforeConfirm?.confirm()
		setCeremony(ceremonyAfterPlayBeforeConfirm!)
		setCeremonyAfterPlayBeforeConfirm(null)
		
		await saveCeremonyApi(ceremonyAfterPlayBeforeConfirm!)
	}
	
	const cancelPlay = (): void => {
		setCeremonyAfterPlayBeforeConfirm(null)
	}

	const reset = async (): Promise<void> => {
		const ceremonyUpdating = ceremony!.clone()
		ceremonyUpdating.reset()
		setCeremony(ceremonyUpdating)
		
		await saveCeremonyApi(ceremonyUpdating)
	}

	return {
		ceremony,
		ceremonyAfterPlayBeforeConfirm,
		getCeremony,
		setCeremonyName,
		setStrikethroughMember,
		setActiveMember,
		play,
		confirm,
		cancelPlay,
		reset
	}
}
