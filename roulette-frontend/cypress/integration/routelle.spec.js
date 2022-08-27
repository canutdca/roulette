describe('Ceremony App', () => {
	it('frontpage can be open', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('Ceremony')
	})
	it('group can be created', () => {
		cy.visit('http://localhost:3000/')
		cy.get('[data-testid=new]').click()
		cy.get('input[name=groupName]').type('new group created')
		cy.get('input[type=submit][value=Save]').click()
	})
	it('group can be updated', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('new group created').click()
		cy.get('button').contains('Edit').click()
		cy.get('input[name=groupName]').type(' edit')
		cy.get('input[type=submit]').contains('Save').click()
		cy.go('back')
		cy.contains('new group created edit')
	})
	it('group can be deleted', () => {
		cy.visit('http://localhost:3000/')
		cy.contains('new group created edit').click()
		cy.get('button').contains('Delete').click()
		cy.contains('new group created edit').should('not.exist')
	})
	
})