import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
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
		addMember,
		editMember,
		deleteMember
	} = useGroupDetail(id)

	const [showAddMember, setShowAddMember] = useState<boolean>(false)

	useEffect(() => {
		getGroup()
	}, [])

	const addNewMember = async (newMember: string) => {
		await addMember(newMember)
		setShowAddMember(false)
	}

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
								name="groupName"
								placeholder="Group name"
								onChange={setGroupName}
								onDelete={remove}
								style={'title'}
								showDeleteButton={!!group.name}
							/>
						</Header>
						<section>
							<header><h4>Members</h4></header>
							<Ul className="list">
								{ group.members.map((member, index) =>
									<li key={index}>
										<InputText
											value={member}
											name={'member_' + index}
											placeholder={member}
											showDeleteButton={true}
											onChange={(newName) => editMember(index, newName)}
											onDelete={() => deleteMember(index)}
										/>
									</li>
								)}
								<li>
									{
										showAddMember 
											? <InputText
												modeEditDefault={true}
												value={""}
												name="newMember"
												placeholder="New member"
												onChange={addNewMember}
											/>
											: <New onClick={() => setShowAddMember(true)}>
												Add new member
											</New>
									}
								</li>
							</Ul>
						</section>
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

const H1 = styled.h1`
	margin: 8px;
`

const Ul = styled.ul`
	margin-block: 0;
	padding-inline: 0;
	margin-inline: 0;
	list-style: none;
`

const New = styled.span`
	cursor: default;
	&:hover {
		color: red;
	}
`