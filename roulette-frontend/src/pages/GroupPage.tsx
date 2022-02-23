import { GroupDetail } from 'contexts/groups/group-detail/GroupDetail'
import { useRoute } from 'wouter'
import { GROUP_PAGE_ROUTE } from '../routes'

export default function GroupPage() {
	const [_, params] = useRoute(`${GROUP_PAGE_ROUTE}/:id`)
	return <GroupDetail id={params?.id} />
}
