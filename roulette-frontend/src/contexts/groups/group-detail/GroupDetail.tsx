import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { Group } from '../shared/group.model'
import { useGroupDetail } from './group-detail.hook'

export interface GroupDetailProps {
	id: string
}
export function GroupDetail({ id }: GroupDetailProps) {

	const [group, setGroup] = useState<Group>()

	const {
		getGroup
	} = useGroupDetail(id)
	useEffect(() => {
		const fetchData = async () => {
			setGroup(await getGroup())
		}

		fetchData()
	}, [])

	return (
		<Section>
			<Article>
				{group && (
					<Fragment>
						<Header>
							<h1>{group.name}</h1>
						</Header>
						<span>contenido</span>
					</Fragment>
				)}
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

const Header = styled.header`
	margin: 8px;
`

const H1 = styled.h1`
	margin: 8px;
`
