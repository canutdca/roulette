import { Routes } from './routes'
import { Header } from '_core/components/Header'
import { Footer } from '_core/components/Footer'
import styled from '@emotion/styled'
import './app.css'

function App() {

	return (
		<RootContainer>
			<HeaderContainer>
				<Header />
			</HeaderContainer>
			<MainContainer>
				<Routes />
			</MainContainer>
			<FooterContainer>
				<Footer />
			</FooterContainer>
		</RootContainer>
	)
}

export default App

const RootContainer = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		'header'
		'main'
		'footer';
`

const HeaderContainer = styled.header`
	grid-area: header;
`

const MainContainer = styled.main`
	grid-area: main;
	max-width: 1200px;
	margin: 0 10%;
`

const FooterContainer = styled.footer`
	grid-area: footer;
`
