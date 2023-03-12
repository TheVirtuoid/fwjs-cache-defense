/*
### The Game Server
1. Spawns each game object
2. Controls communications with each object
3. Creates a starting Field
4. Creates a starting Cache
5. Creates the Player
6. Begins the turn
7. Allows the player to build and/or upgrade structures
8. Determines number and type of Enemies to create, and creates them.
9. Runs the turn
   1. Advances the enemies
   2. If enemy has reached Cache, damage the cache.
   3. End turn and End Game if cache.points === 0
   4. Fire at enemies
   5. Determine if enemy has been eliminated, allocate points to player
   6. Repeat until no more enemies.
10.
 */

describe('Server: ', () => {
	/*
			const server = new Server();
	 */
	describe('creation: ', () => {
		it('should create the instance.', () => {});
	});
	describe('starting a game: ', () => {
		it('should create the player', () => {});
		it('should create the cache', () => {});
		it('should create the initial field', () => {});
	});
	describe('ending the game: ', () => {
		it('after initialization, should run a turn then end', () => {});
		it('after initialization, should run two turns then end', () => {});
	});
	describe('running a turn', () => {
		it('should determine the correct number and type of enemies', () => {});
		it('should place the enemies at the entrance to the path', () => {});
		it('should advance the enemies one movement', () => {});
		it('should check to see if the cache has been breached', () => {});
		it('should fire at the enemies', () => {});
		it('should determine if a hit has been achieved', () => {});
		it('should allocate points if the enemy has been eliminated', () => {});
		it('should not end the game if the game has not ended', () => {});
		it('should end the game if the game has ended', () => {});
	});
});