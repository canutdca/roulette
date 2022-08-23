import { RouletteDetail } from 'contexts/roulettes/roulette-detail/RouletteDetail'
import { useRoute } from 'wouter'
import { ROULETTE_PAGE_ROUTE } from '../routes'

export default function RoulettePage() {
	const [_, params] = useRoute(`${ROULETTE_PAGE_ROUTE}/:id`)
	return <RouletteDetail id={params?.id} />
}
