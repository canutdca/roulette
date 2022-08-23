import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { InputText } from '_shared/components/InputText'
import { HOME_ROUTE } from '../../../routes'
import { useGroupDetail } from './group-detail.hook'
import { ROULETTE_PAGE_ROUTE } from '../../../routes/index';

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
		addRoulette,
		editRoulette,
		deleteRoulette
	} = useGroupDetail(id)

	const [showAddMember, setShowAddMember] = useState<boolean>(false)
	const [showAddRoulette, setShowAddRoulette] = useState<boolean>(false)

	useEffect(() => {
		getGroup()
	}, [])

	const addNewMember = async (newMember: string) => {
		await addMember(newMember)
		setShowAddMember(false)
	}

	const addNewRoulette = async (newMember: string) => {
		const newRouletteId = await addRoulette(newMember)
		goToRoulette(newRouletteId)
	}

	const goToRoulette = async (rouletteId: string) => {
		goTo(`${ROULETTE_PAGE_ROUTE}/${rouletteId}`)
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
								<header><h4>Roulettes</h4></header>
								<Ul className="list">
									{ group.roulettes.map((roulette) =>
										<li key={roulette.id} onClick={() => goToRoulette(roulette.id)}>
											<InputText
												value={roulette.name}
												name={'roulette_' + roulette.name}
												placeholder={roulette.name}
												showDeleteButton={true}
												onChange={(newName) => editRoulette(roulette.id, newName)}
												onDelete={() => deleteRoulette(roulette.id)}
												onClickDuringText={() => goToRoulette(roulette.id)}
											/>
										</li>
									)}
									<li>
									{
										showAddRoulette
											? <InputText
												modeEditDefault={true}
												value={""}
												name="newSoulette"
												placeholder="New roulette name"
												onChange={addNewRoulette}
											/>
											: <New onClick={() => setShowAddRoulette(true)}>
												Add new member
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