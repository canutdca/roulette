import styled from '@emotion/styled'
import { Fragment, useEffect } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { InputText } from '_shared/components/InputText'
import { HOME_ROUTE } from '../../../routes'
import { useGroupDetail } from './group-detail.hook'

export interface GroupDetailProps {
	id: string | undefined
}
export function GroupDetail({ id }: GroupDetailProps) {

	const { goTo } = useNavigation()

	const {
		group,
		getGroup,
		setGroupName,
		deleteGroup,
	} = useGroupDetail(id)

	useEffect(() => {
		getGroup()
	}, [])

	const remove = async (): Promise<void> => {
		await deleteGroup()
		goTo(HOME_ROUTE)
	}
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
							<Delete onClick={remove}>Delete</Delete>
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
	max-width: 500px;
`

const Header = styled.header`
	margin: 8px;
	display: flex;
	justify-content: space-between;
`

const Delete = styled.button`

`

const H1 = styled.h1`
	margin: 8px;
`
