import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Card } from '_shared/components/Card'
import { Group } from '../_shared/group.model'
import { useGroupsList } from './groups-lists.hook'

export function GroupsList() {

	const [groups, setGroups] = useState<Group[]>([])

	const {
		getGroups
	} = useGroupsList()
	useEffect(() => {
		const fetchData = async () => {
			setGroups(await getGroups())
		}

		fetchData()
	}, [])

	return (
		<Section>
			{groups.map((group) => (
				<div key={group.id}>
					<Article>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}
			{groups.map((group) => (
				<div key={group.id}>
					<Article>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}
			{groups.map((group) => (
				<div key={group.id}>
					<Article>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}
			{groups.map((group) => (
				<div key={group.id}>
					<Article>
						<Card>
							{group.name}
						</Card>
					</Article>
				</div>
			))}
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
