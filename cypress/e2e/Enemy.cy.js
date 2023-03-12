/*
### The Enemy
1. The Enemy goal is to reach the Cache.
2. The Enemy has a set number of hit points and will take hits from Structures.
3. When the enemy hit points reaches 0, points are awarded both to the player and to the cache
4. The number and strength of enemies increases with each turn.
 */

describe('Enemy: ', () => {
	/*
			new Enemy();
	 */
	describe('creation', () => {});

	/*
			enemy.move();

	 */
	describe('move: ', () => {
		it('should increase enemy position relative of movement speed', () => {});
		it('should report current position to server', () => {});
	});

	/*
			addEventListener('enemy-hit', (payload) => {});
	 */
	describe('enemy hit event: ', () => {
		it('should receive the event', () => {});
		it('should throw error if event is not the correct payload', () => {});
		it('should process the event particular to the enemy', () => {});
	});
})