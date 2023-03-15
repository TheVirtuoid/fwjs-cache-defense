/*
1. The player begins with a certain number of points.
2. Points can be distributed amongst existing structures to upgrade them.
3. Points can be used to purchase new structures
4. Points increase with the elimination of enemies
5. Points increase at the end of each turn based upon the number of points associated with the Cache

 */

import Player from "../../src/Player.js";

describe('Player: ', () => {

	/*
			new Player();
	 */
	describe(' creation: ', () => {
		/*
				new Player();
		 */
		it('should create an instance.', () => {
			const player = new Player();
			expect(player instanceof Player).to.be.true;
		});
		it('should be immutable', () => {
			const player = new Player();
			try {
				player.id = 'badone';
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should create with default number of points', () => {});
	});

	/*
			player.update(structure, points)
	 */
	describe('point usage (upgrade)', () => {
		it('should throw error if structure is an invalid argument', () => {
			const player = new Player();
			try {
				player.update('badone', 0);
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error if structure is not present on playing field', () => {
			const player = new Player();
			try {
				player.id = 'badone';
				expect(true).to.be.false;
			} catch (err) {
				expect(err.name).to.equal('TypeError');
			}
		});
		it('should throw error is points is an invalid argument', () => {});
		it('should upgrade the structure', () => {});
	});

	/*
			player.purchaseStructure(structureType);
	 */
	describe('point usage (purchase): ', () => {
		it('should throw error is structureType is not a legal structure', () => {});
		it('should throw error is structure is too expensive', () => {});
		it('should be able to purchase a structure', () => {});
	});

	/*
			player.addPoints(points)
	 */
	describe('adding points', () => {
		it('should throw error if points argument is invalid', () => {});
		it ('should throw error if points is not integer', () => {});
		it('should throw error if points is less than 0', () => {});
		it('should add points to the player', () => {});
	});

})