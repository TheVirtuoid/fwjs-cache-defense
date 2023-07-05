describe('the game', () => {

	describe('creation', () => {
		let cacheDefensePublicData;
		beforeEach(() => {
			cy.visit('localhost:5173/index.html');
		});
		it('should display "Ready" flag', () => {
			cy.get('#loading').should('not.be.visible');
			cy.get('#game-ready').should('be.visible');
		})
	});
});