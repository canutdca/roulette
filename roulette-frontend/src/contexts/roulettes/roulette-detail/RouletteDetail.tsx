import styled from '@emotion/styled'
import { Fragment, useEffect, useState } from 'react'
import { useNavigation } from '_core/hooks/useNavigation'
import { InputText } from '_shared/components/InputText'
import { GROUP_PAGE_ROUTE } from '../../../routes/index';
import { ModalToConfirm } from './ModalToConfirm';
import { useRouletteDetail } from './roulette-detail.hook';

export interface RouletteDetailProps {
	id: string
}
export function RouletteDetail({ id }: RouletteDetailProps) {

	const { goTo } = useNavigation()

	const {
		roulette,
		rouletteAfterPlayBeforeConfirm,
		getRoulette,
		setRouletteName,
		setActiveMember,
		setStrikethroughMember,
		play,
		confirm,
		cancelPlay,
		reset
	} = useRouletteDetail(id)

	useEffect(() => {
		getRoulette()
	}, [])

	const back = (groupId: string): void => goTo(`${GROUP_PAGE_ROUTE}/${groupId}`)

	const toggleMember = async (isStrikethrough: boolean, index: number): Promise<void> =>
		isStrikethrough ? await setActiveMember(index) : await setStrikethroughMember(index)

	const renderPlay = () => (
		<>
		<button onClick={play}>PLAY</button>
		{rouletteAfterPlayBeforeConfirm && rouletteAfterPlayBeforeConfirm.candidateToCurrent}
		{ rouletteAfterPlayBeforeConfirm &&
			<ModalToConfirm
				candidateName={rouletteAfterPlayBeforeConfirm.candidateToCurrent!}
				confirm={confirm}
				cancel={cancelPlay}
			/> }
		</>
	)

	const renderReset = () => <button onClick={reset}>RESET</button>
	return (
		<Section>
			<Article>
				{roulette && (
					<Fragment>
						<Header>
							<InputText
								modeEditDefault={!id}
								value={roulette.name}
								name="rouletteName"
								placeholder="Roulette name"
								onChange={setRouletteName}
								style={'title'}
								showDeleteButton={false}
							/>
							<Back onClick={() => back(roulette.groupId)}>Back to group</Back>
						</Header>
						<Content>
							<section>
								<header><h4>Members</h4></header>
								<Ul className="list">
									{ roulette.members.map((member, index) =>
										<li key={index} onClick={() => toggleMember(member.strikethrough, index)}>
											<Member isStrikethrough={member.strikethrough}>{member.name}</Member>
										</li>
									)}
								</Ul>
							</section>
							<section>
								<header><h4>Roulette</h4></header>
								{ roulette.current && <h3>Current: {roulette.current}</h3> }
								{
									roulette.availableToPlay ? renderPlay() : renderReset()
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