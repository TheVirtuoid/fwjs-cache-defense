import ControlPanel from "../../../src/classes/inGame/ControlPanel.js";
import WeaponType from "../../../src/classes/types/WeaponType.js";
import Weapon from "../../../src/classes/Weapon.js";
import Game from "../../../src/classes/Game.js";

import cacheDefenseConfig from "../../../src/cache-defense-config.js";
import GraphicsEngine from "../../../src/classes/inGame/GraphicsEngine.js";
import PhaserGraphicsEngine from "../../../src/classes/inGame/graphicEngines/phaser.js";

const indexPage = 'localhost:5173/index.html';

describe('graphics', () => {
	beforeEach(() => {
		cy.visit(indexPage);
		cy.get('[data-cy="loading"]').should('not.be.visible');
		cy.get('[data-cy="new-game-button"]').click();
	});

	it('should create the graphics engine', () => {
		expect(graphicsEngine instanceof GraphicsEngine).to.be.true;
		expect(graphicsEngine.ready).to.be.false;
	});

	it('should initialize the graphics system', () => {
		graphicsEngine.init();
		expect(graphicsEngine.ready).to.be.true;
		expect(graphicsEngine.engine).to.be.an('object');
	});

	describe ('game board', () => {

		beforeEach(() => {
			graphicsEngine.init();
		});

		it('should create the game board', () => {
			graphicsEngine.buildGameBoard();
			cy.get(`#${cacheDefenseConfig.board.parentDom}`).should('have.descendants');
		});

		xdescribe('adding the graphics', () => {
			beforeEach(() => {
				graphicsEngine.buildGameBoard();
			});
			describe('road tile placement', () => {
				it('should place a road tile', () => {});
			});
			describe('weapon placement', () => {
				it('should place a weapon', () => {});
			});
			describe('monster placement', () => {
				it('should place a monster', () => {});
				it('should move a monster', () => {});
				it('should remove a monster', () => {});
			});
			describe('cache tower placement', () => {
				it('should place a cache tower', () => {});
			});
		});


	});

/*

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
*/

});