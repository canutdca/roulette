import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { Card } from '_shared/components/Card'
import { GROUP_PAGE_ROUTE } from '../../../routes'
import { Group } from '../domain/group.model'
import { useGroupsList } from './groups-list.hook'

export function GroupsList() {
	const { goTo } = useNavigation()

	const {
		groups,
		getGroups
	} = useGroupsList()

	useEffect(() => {
		getGroups()
	}, [])

	const goToGroupDetail = (id: string) => {
		goTo(`${GROUP_PAGE_ROUTE}/${id}`)
	}
	const goToNewGroup = () => {
		goTo(GROUP_PAGE_ROUTE)
	}

	return (
		<Section>
			{groups.map((group) => (
				<div key={group.id}>
					<Article onClick={() => goToGroupDetail(group.id)}>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}

			<Article onClick={() => goToNewGroup()}>
			<div data-testid="new">
				<Card color={'secundary'}>
					New group
				</Card>
			</div>
			</Article>
			{/* <button onClick={() => setShow(!show)}>toggle</button>
			{show && <h3>contenido</h3>} */}

			<button onClick={goToNewGroup}>navigate</button>
		</Section>

	)
}

const Section = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`

const Article = styled.article`
	margin: 8px;
`
