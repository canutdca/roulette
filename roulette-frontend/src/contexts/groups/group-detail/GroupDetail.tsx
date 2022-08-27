import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { InputText } from '_shared/components/InputText'
import { HOME_ROUTE } from '../../../routes'
import { useGroupDetail } from './group-detail.hook'
import { CEREMONY_PAGE_ROUTE } from '../../../routes/index';

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
		deleteMember,
		addCeremony,
		editCeremony,
		deleteCeremony
	} = useGroupDetail(id)

	const [showAddMember, setShowAddMember] = useState<boolean>(false)
	const [showAddCeremony, setShowAddCeremony] = useState<boolean>(false)

	useEffect(() => {
		getGroup()
	}, [])

	const addNewMember = async (newMember: string) => {
		await addMember(newMember)
		setShowAddMember(false)
	}

	const addNewCeremony = async (newMember: string) => {
		const newCeremonyId = await addCeremony(newMember)
		goToCeremony(newCeremonyId)
	}

	const goToCeremony = async (ceremonyId: string) => {
		goTo(`${CEREMONY_PAGE_ROUTE}/${ceremonyId}`)
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
						<Content>
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
							<section>
								<header><h4>Ceremonies</h4></header>
								<Ul className="list">
									{ group.ceremonies.map((ceremony) =>
										<li key={ceremony.id} onClick={() => goToCeremony(ceremony.id)}>
											<InputText
												value={ceremony.name}
												name={'ceremony_' + ceremony.name}
												placeholder={ceremony.name}
												showDeleteButton={true}
												onChange={(newName) => editCeremony(ceremony.id, newName)}
												onDelete={() => deleteCeremony(ceremony.id)}
												onClickDuringText={() => goToCeremony(ceremony.id)}
											/>
										</li>
									)}
									<li>
									{
										showAddCeremony
											? <InputText
												modeEditDefault={true}
												value={""}
												name="newCeremony"
												placeholder="New ceremony name"
												onChange={addNewCeremony}
											/>
											: <New onClick={() => setShowAddCeremony(true)}>
												Add new ceremony
											</New>
										}
									</li>
								</Ul>
							</section>
						</Content>
					</Fragment>
				)}
			</Article>
		</Section>

	)
}

const Content = styled.div`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
`

const Section = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`

const Article = styled.article`
	margin: 8px;
	max-width: 500px;
	width: 100%;
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