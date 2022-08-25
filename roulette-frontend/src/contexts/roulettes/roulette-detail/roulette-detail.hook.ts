import { useState } from 'react'
import { Roulette } from '../domain/roulette.model'
import { deleteRouletteApi, getRouletteApi, saveRouletteApi } from './groups-detail-api.service'

export function useRouletteDetail(id: string) {

	const [roulette, setRoulette] = useState<Roulette>()
	const getRoulette = async () => {
		setRoulette(await getRouletteApi(id))
	}

	const setRouletteName = (newName: string): Promise<void> => {
		if (!roulette) return Promise.resolve()
		const rouletteUpdating = roulette.clone()
		try {
			rouletteUpdating.name = newName
			setRoulette(rouletteUpdating)
			return saveRouletteApi(rouletteUpdating)
		} catch (error: any) {
			return error.message
		}
	}

	const deleteRoulette = async (): Promise<void> => {
		await deleteRouletteApi(roulette!.id)
	}

	const setStrikethroughMember = async (index: number): Promise<void> => {
		const rouletteUpdating = roulette!.clone()
		rouletteUpdating!.setStrikethroughMember(index)
		setRoulette(rouletteUpdating)
		await saveRouletteApi(rouletteUpdating)
	}
	const setActiveMember = async (index: number): Promise<void> => {
		const rouletteUpdating = roulette!.clone()
		rouletteUpdating!.setActiveMember(index)
		setRoulette(rouletteUpdating)
		await saveRouletteApi(rouletteUpdating)
	}

	const play = (): void => roulette!.play()
	

	return {
		roulette,
		getRoulette,
		setRouletteName,
		deleteRoulette,
		setStrikethroughMember,
		setActiveMember,
		play
	}
}
