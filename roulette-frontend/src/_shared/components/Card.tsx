import styled from '@emotion/styled'
import { SlottableComponent } from '../../_core/slottable-component'

interface RCardProps extends SlottableComponent {
}

export function Card({ children }: RCardProps) {
	return (
		<Root>
			<span>
				{children}
			</span>
		</Root>
	)
}

const Root = styled.div`
	height: 150px;
	aspect-ratio: 1 / 1;
	background-color: #85b2d2;
	color: #323232;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition: all .05s ease-in-out;

	&:hover {
		background-color: #96c3e3;
		transform: scale(1.05);
	}
`
