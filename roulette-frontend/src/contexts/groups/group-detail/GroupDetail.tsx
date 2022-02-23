import styled from '@emotion/styled'
import { Fragment, useEffect } from 'react'
import { InputText } from '_shared/components/InputText'
import { useGroupDetail } from './group-detail.hook'

export interface GroupDetailProps {
	id: string | undefined
}
export function GroupDetail({ id }: GroupDetailProps) {

	const {
		group,
		getGroup,
		setGroupName
	} = useGroupDetail(id)

	useEffect(() => {
		getGroup()
	}, [])

	return (
		<Section>
			<Article>
				{group && (
					<Fragment>
						<Header>
							<InputText
								modeEditDefault={!id}
								value={group.name}
								onChange={setGroupName}
								style={'title'}
							/>
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
