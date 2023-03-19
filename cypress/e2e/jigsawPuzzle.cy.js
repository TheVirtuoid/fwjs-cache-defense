

describe('JigsawPuzzle', () => {
	it('should bring up the page', () => {
		cy.visit('localhost:4173');
		cy.get('#test').should('have.text', 'Hello World!');
	});
});