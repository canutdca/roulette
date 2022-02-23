import styled from '@emotion/styled'
import { SlottableComponent } from '../../_core/slottable-component'

interface RCardProps extends SlottableComponent {
	color?: 'primary' | 'secundary'
}

export function Card({ children, color = 'primary' }: RCardProps) {

	const Root = styled.div`
		height: 150px;
		aspect-ratio: 1 / 1;
		background-color: ${color === 'primary' ? '#85b2d2' : '#5ba6cd'};
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
	return (
		<Root>
			<span>
				{children}
			</span>
		</Root>
	)
}
