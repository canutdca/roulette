import styled from '@emotion/styled'
import { HOME_ROUTE } from '../../routes'
import { Link } from '_shared/components/Link'
import { maxWidth } from '../../styles.constants'
import Logo from './../../assets/images/Logo.svg'

export function Header() {
	return (
		<Root>
			<Nav>
				<Link href={HOME_ROUTE}>
					<img src={Logo}></img>
				</Link>
			</Nav>
		</Root>
	)
}

const Root = styled.div`
	background-color: #f1f8ff;
	min-height: 64px;
	padding: .3em 24px;
	box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`

const Nav = styled.nav`
	max-width: ${maxWidth}
`
