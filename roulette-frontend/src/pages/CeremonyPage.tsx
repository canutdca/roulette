import { CeremonyDetail } from 'contexts/ceremonies/ceremony-detail/CeremonyDetail'
import { useRoute } from 'wouter'
import { CEREMONY_PAGE_ROUTE } from '../routes'

export default function CeremonyPage() {
	const [_, params] = useRoute(`${CEREMONY_PAGE_ROUTE}/:id`)
	return <CeremonyDetail id={params?.id} />
}
