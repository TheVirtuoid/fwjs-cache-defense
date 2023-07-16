import ControlPanel from "../../../src/classes/inGame/ControlPanel.js";
import WeaponType from "../../../src/classes/types/WeaponType.js";
import Weapon from "../../../src/classes/Weapon.js";
import Game from "../../../src/classes/Game.js";

const indexPage = 'localhost:5173/index.html';

describe('control panel dom', () => {
	let controlPanel;
	beforeEach(() => {
		cy.visit(indexPage);
		cy.get('[data-cy="loading"]').should('not.be.visible');
		cy.get('[data-cy="new-game-button"]').click();
	});

	it('should set the coins value', function() {
		cy.get('#coins').should('have.text', `${Game.DEFAULT_COINS}`);
	});

	it('should set the round-number value', () => {
		cy.get('#round-number').should('have.text', `${Game.INITIAL_ROUND_NUMBER}`);
	});

	it('should set the health value', () => {
		cy.get('#health').should('have.text', `${Game.DEFAULT_HEALTH}`);
	});

	it('should have a listing of weapons', () => {
		cy.get('#weapons-selection').find('option')
				.should('have.length', 1)
				.should('have.text', `${WeaponType.SHOOTER.name}`);
	});

});