import { httpGet, httpPutOrPost } from '_core/services/http.service'
import { RouletteDetailApiDto } from './roulette-detail-api.model'
import { Roulette } from '../domain/roulette.model'

const endpoint = '/roulettes'

export async function getRouletteApi<T>(id: string): Promise<Roulette> {
	const response = await httpGet<RouletteDetailApiDto>(`${endpoint}/${id}`)
	return Roulette.fromPrimitives({
		id: response.id,
		groupId: response.groupId,
		name: response.name,
		members: response.members,
		current: response.current
	})
}

export async function saveRouletteApi(Roulette: Roulette): Promise<void> {
	await httpPutOrPost<Roulette>(endpoint, Roulette)
}
