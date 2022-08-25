import { useState } from 'react'
import { Roulette } from '../domain/roulette.model'
import { getRouletteApi, saveRouletteApi } from './groups-detail-api.service'

export function useRouletteDetail(id: string) {

	const [roulette, setRoulette] = useState<Roulette>()
	const [rouletteAfterPlayBeforeConfirm, setRouletteAfterPlayBeforeConfirm] = useState<Roulette | null>(null)

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

	const play = (): void => {
		const roulettePlaying = roulette!.clone()
		roulettePlaying!.play()
		setRouletteAfterPlayBeforeConfirm(roulettePlaying)
	}

	const confirm = async (): Promise<void> => {
		rouletteAfterPlayBeforeConfirm?.confirm()
		setRoulette(rouletteAfterPlayBeforeConfirm!)
		setRouletteAfterPlayBeforeConfirm(null)
		
		await saveRouletteApi(rouletteAfterPlayBeforeConfirm!)
	}
	
	const cancelPlay = (): void => {
		setRouletteAfterPlayBeforeConfirm(null)
	}

	const reset = async (): Promise<void> => {
		const rouletteUpdating = roulette!.clone()
		rouletteUpdating.reset()
		setRoulette(rouletteUpdating)
		
		await saveRouletteApi(rouletteUpdating)
	}

	return {
		roulette,
		rouletteAfterPlayBeforeConfirm,
		getRoulette,
		setRouletteName,
		setStrikethroughMember,
		setActiveMember,
		play,
		confirm,
		cancelPlay,
		reset
	}
}
