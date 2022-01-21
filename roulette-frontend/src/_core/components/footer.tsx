import styled from '@emotion/styled'

export function Footer() {
	return (
		<footer>
			<Root>
				<H1>footer</H1>
			</Root>
		</footer>
	)
}

const FooterContainer = styled.footer`
	padding: .3rem 0;
	background-color: #0b0b0b;
	width: 100%;
	color: white;
	text-align: center;
`

const Root = styled.div`
	color: white;
	background-color: #0b0b0b;
	min-height: 64px;
	padding: .3em 24px;
`

const H1 = styled.h1`
	font-weight: 300;
	font-size: 3.75rem;
	line-height: 1.2;
	letter-spacing: -0.00833em;
	font-family: "Roboto","Helvetica","Arial",sans-serif;
	margin: 0;
`
