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


describe('build portion of the round', () => {
	it('should have the default screen', () => {

	});
	it('should allow for clicking on adding a weapon if there is enough money', () => {});
	it('should not allow for clicking on adding a weapon if there is not enough money', () => {});
	it('should allow for clicking on a weapon and bringing up a dialog for upgrade cost', () => {});
	it('should allow for upgrade if enough money', () => {});
	it('should not allow for upgrade if not enough money', () => {});
	it('should allow to press button to start the monster round', () => {});
	it('should not allow any upgrades or clicking once monster round started', () => {});
	it('should be able to place a weapon on the road somewhere', () => {});
});

describe('monster portion of the round', () => {
	it('should extend the path by creating a road', () => {});
	it('should spawn a monster at the end of the path', () => {});
	it('should spawn additional monsters until there are no more monsters', () => {});
	it('should auto-fire all the weapons', () => {});
	it('should register a hit on a monster', () => {});
	it('should remove a monster if it dies', () => {});
	it('should add money to the cache when a monster dies', () => {});
	it('should subtract health from the cache when a monster gets to the cache', () => {});
});

describe('end of round', () => {
	it('should be able to determine the end of the game', () => {});
	it('should end the game if cache health is zero', () => {});
	it('should end the round if cache health is greater than zero', () => {});
});