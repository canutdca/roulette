import styled from "@emotion/styled"

export interface RouletteProps {
	members: string[]
}

export function Roulette({ members }: RouletteProps) {

	return (
		<span>hola</span>
	)

}
const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #33333333;
	display: flex;
	justify-content: center;
	align-items: center;
`
const Modal = styled.div`
	background-color: #fff;
	padding: 3em 2em;
	border-radius: 3px;
`

const CandidateName = styled.div`
	margin-top: 1rem;
	margin-bottom: 2rem;
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between
`