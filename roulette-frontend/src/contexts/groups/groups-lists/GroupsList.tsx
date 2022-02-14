import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { Card } from '_shared/components/Card'
import { GROUP_PAGE_ROUTE } from '../../../routes'
import { Group } from '../shared/group.model'
import { useGroupsList } from './groups-list.hook'

export function GroupsList() {
	const [groups, setGroups] = useState<Group[]>([])
	const { goTo } = useNavigation()

	const {
		getGroups
	} = useGroupsList()
	useEffect(() => {
		const fetchData = async () => {
			setGroups(await getGroups())
		}

		fetchData()
	}, [])

	const goToDetail = (id: string) => {
		goTo(`${GROUP_PAGE_ROUTE}/${id}`)
	}

	return (
		<Section>
			{groups.map((group) => (
				<div key={group.id}>
					<Article onClick={() => goToDetail(group.id)}>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}

			<Article>
				<Card color={'secundary'}>
					New group
				</Card>
			</Article>
		</Section>

	)
}

const Section = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-center;
`

const Article = styled.article`
	margin: 8px;
`
