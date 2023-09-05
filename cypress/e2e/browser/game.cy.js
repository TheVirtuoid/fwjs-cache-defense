import ControlPanel from "../../../src/classes/inGame/ControlPanel.js";
import WeaponType from "../../../src/classes/types/WeaponType.js";
import Game from "../../../src/classes/Game.js";

const indexPage = 'localhost:5173/index.html';

describe('starting the game', () => {
	beforeEach(() => {
		cy.visit(indexPage);
	});
	it('should display "Ready" flag', () => {
		cy.get('[data-cy="loading"]').should('not.be.visible');
		cy.get('[data-cy="game-ready"]').should('be.visible');
		cy.get('[data-cy="game-board"]').should('not.be.visible');
	});
	it('should click on new-game and display game', () => {
		cy.get('[data-cy="loading"]').should('not.be.visible');
		cy.get('[data-cy="new-game-button"]').click();
		cy.get('[data-cy="game-board"]').should('be.visible');
		cy.get('[data-cy="new-game-button"]').should('not.be.visible');
	});
});

describe('initialboard', () => {
	beforeEach( () => {
		cy.visit(indexPage);
		cy.get('[data-cy="loading"]').should('not.be.visible');
		cy.get('[data-cy="new-game-button"]').click();
	});
	it('should have the control panel', () => {
		cy.get('[data-cy="control-panel"]').should('be.visible');
	});
});

