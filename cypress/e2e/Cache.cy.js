/*
1. The cache begins with a certain number of points.
2. During the game, the cache increases in points with the elimination of an enemy
3. When an enemy connects with the Cache, the cache loses significant points
4. When there are no more points in the cache, the game ends.
5. At the end of each turn, the Cache contributes points to the Player
 */

describe('Cache: ', () => {

	/*
			new Cache();
	 */
	describe('creation: ', () => {
		it('should create the Cache', () => {});
		it('should create with the default number of points', () => {});
	});

	/*
			cache.addPoints(points);
	 */
	describe('addPoints: ', () => {
		it('should throw error if points argument is invalid', () => {});
		it('should throw error if points is not integer', () => {});
		it('should throw error if points is less than 0', () => {});
		it('should add the number of points', () => {});
	});

	/*
			cache.removePoints(points);
	 */
	describe('removePoints: ', () => {
		it('should throw error if points argument is invalid', () => {});
		it('should throw error if points is not integer', () => {});
		it('should throw error if points is less than 0', () => {});
		it('should remove the number of points', () => {});
		it('if removed points greater than cache points, cache points will be 0', () => {});
		it('if cache points === 0, endGame is called.', () => {});
	});

	/*
			cache.endGame()

			This sends an event to a listener that the end of the game has been reached.
			This is called by removePoints;
	 */
	describe('endGame: ', () => {
		it('should throw error is cache points !== 0', () => {});
		it('should send the event to a listener', () => {});
	});

	/*
			cache.sendPointsToPlayer(points)

			This sends an event to a listener that the player needs points
	 */
	describe('sendPointsToPlayer: ', () => {
		it('should throw error if points argument is not valid', () => {});
		it('should throw error if points argument is not an integer', () => {});
		it('should throw error if points argument greater than cache points', () => {});
		it('should send the event to a listener with correct format', () => {});
	});
});