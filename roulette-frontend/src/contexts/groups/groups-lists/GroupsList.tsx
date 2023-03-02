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
						<Card containerName={'Squad 21'} title={group.name} />
					</Article>
				</div>
			))}

			<Article onClick={() => goToNewGroup()}>
			<div data-testid="new">
				<Card containerName={'Squad 21'} title={'New group'}/>
			</div>
			</Article>
			{/* <button onClick={() => setShow(!show)}>toggle</button>
			{show && <h3>contenido</h3>} */}
		</Section>

	)
}

const Section = styled.section`
	margin-top: 2rem;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`

const Article = styled.article`
	margin: 8px;
`
