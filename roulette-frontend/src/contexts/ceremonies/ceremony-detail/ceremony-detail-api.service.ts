import { httpGet, httpPutOrPost } from '_core/services/http.service'
import { CeremonyDetailApiDto } from './ceremony-detail-api.model'
import { Ceremony } from '../domain/ceremony.model'

const endpoint = '/ceremonies'

export async function getCeremonyApi<T>(id: string): Promise<Ceremony> {
	const response = await httpGet<CeremonyDetailApiDto>(`${endpoint}/${id}`)
	return Ceremony.fromPrimitives({
		id: response.id,
		groupId: response.groupId,
		name: response.name,
		members: response.members,
		current: response.current
	})
}

export async function saveCeremonyApi(Ceremony: Ceremony): Promise<void> {
	await httpPutOrPost<Ceremony>(endpoint, Ceremony)
}
