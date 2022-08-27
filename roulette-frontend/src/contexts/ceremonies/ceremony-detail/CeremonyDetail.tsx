import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { InputText } from '_shared/components/InputText'
import { GROUP_PAGE_ROUTE } from '../../../routes/index';
import { ModalToConfirm } from './ModalToConfirm';
import { useCeremonyDetail } from './ceremony-detail.hook';

export interface CeremonyDetailProps {
	id: string
}
export function CeremonyDetail({ id }: CeremonyDetailProps) {

	const { goTo } = useNavigation()

	const {
		ceremony,
		ceremonyAfterPlayBeforeConfirm,
		getCeremony,
		setCeremonyName,
		setActiveMember,
		setStrikethroughMember,
		play,
		confirm,
		cancelPlay,
		reset
	} = useCeremonyDetail(id)

	useEffect(() => {
		getCeremony()
	}, [])

	const back = (groupId: string): void => goTo(`${GROUP_PAGE_ROUTE}/${groupId}`)

	const toggleMember = async (isStrikethrough: boolean, index: number): Promise<void> =>
		isStrikethrough ? await setActiveMember(index) : await setStrikethroughMember(index)

	const renderPlay = () => (
		<>
		<button onClick={play}>PLAY</button>
		{ceremonyAfterPlayBeforeConfirm && ceremonyAfterPlayBeforeConfirm.candidateToCurrent}
		{ ceremonyAfterPlayBeforeConfirm &&
			<ModalToConfirm
				candidateName={ceremonyAfterPlayBeforeConfirm.candidateToCurrent!}
				confirm={confirm}
				cancel={cancelPlay}
			/> }
		</>
	)

	const renderReset = () => <button onClick={reset}>RESET</button>
	return (
		<Section>
			<Article>
				{ceremony && (
					<Fragment>
						<Header>
							<InputText
								modeEditDefault={!id}
								value={ceremony.name}
								name="ceremonyName"
								placeholder="Ceremony name"
								onChange={setCeremonyName}
								style={'title'}
								showDeleteButton={false}
							/>
							<Back onClick={() => back(ceremony.groupId)}>Back to group</Back>
						</Header>
						<Content>
							<section>
								<header><h4>Members</h4></header>
								<Ul className="list">
									{ ceremony.members.map((member, index) =>
										<li key={index} onClick={() => toggleMember(member.strikethrough, index)}>
											<Member isStrikethrough={member.strikethrough}>{member.name}</Member>
										</li>
									)}
								</Ul>
							</section>
							<section>
								<header><h4>Ceremony</h4></header>
								{ ceremony.current && <h3>Current: {ceremony.current}</h3> }
								{
									ceremony.availableToPlay ? renderPlay() : renderReset()
								}
								
							</section>
						</Content>
					</Fragment>
				)}
			</Article>
		</Section>

	)
}

interface MemberStyleProps {
	isStrikethrough: boolean
} 
const Member = styled.span<MemberStyleProps>`
	text-decoration: ${({isStrikethrough}) => isStrikethrough ? 'line-through' : 'none'};
`
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

const Back = styled.div`
	color: blue;
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