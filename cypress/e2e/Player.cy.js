/*
1. The player begins with a certain number of points.
2. Points can be distributed amongst existing structures to upgrade them.
3. Points can be used to purchase new structures
4. Points increase with the elimination of enemies
5. Points increase at the end of each turn based upon the number of points associated with the Cache

 */

describe('Player: ', () => {

	/*
			new Player();
	 */
	describe(' creation: ', () => {
		it('should create an instance.', () => {});
		it('should be immutable', () => {});
		it('should create with default number of points', () => {});
	});

	/*
			player.update(structure, points)
	 */
	describe('point usage (upgrade)', () => {
		it('should throw error if structure is an invalid argument', () => {});
		it('should throw error if structure is not present on playing field', () => {});
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