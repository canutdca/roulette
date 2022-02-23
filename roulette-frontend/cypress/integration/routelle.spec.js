describe('Roulette App', () => {
	it('frontpage can be open', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Roulette')
	})
	it('group can be created', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('New').click()
	})
})