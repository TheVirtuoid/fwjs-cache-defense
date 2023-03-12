/*
### The Structures
1. A Structure fires at enemies approaching the Cache
2. A Structure always hits an enemy.
3. A Structure does a certain amount of damage to the enemy.
4. A Structure can be upgraded at the end of each turn to do more damage.
5. A Structure can lose strength, but never be destroyed
6. There are a set number of structures that do different types of damage.
 */

describe('Structure: ', () => {
	/*
			const structure = new Structure()
	 */
	describe('creation: ', () => {
		it('should create', () => {});
	});

	/*
			structure.fire()

			A generic method for a structure to fire at any enemy. The internals
			of .fire() determines which enemy is targeted and the amount of damage.
			If there are multiple enemies, the damage points are allocated evenly

			.fireAtEnemy() sends the event to fire at the targeted enemy with the points allocated.
	 */
	describe('fire: ', () => {
		it('should determine that there are no enemies in range', () => {});
		it('should determine that there are two enemies in range', () => {});
		it('should allocate the points evenly amongst the enemies', () => {});
		it('should send the correct event (fireAtEnemy)', () => {});
	});

	/*
			structure.upgrade(points, typeOfUpgrade)

			Upgrading is dependent upon the structure itself. 'typeOfUpgrade' is optional and is defined by
			the particular structure, so no checking of that is done here.

			Points are merely added to the structure's point total
	 */
	describe('upgrade: ', () => {
		it('should throw error if points argument is invalid', () => {});
		it('should throw error if points argument is not an integer', () => {});
		it('should throw error if points arguments is less than 0', () => {});
		it('should upgrade the structure', () => {});
	});

	/*
			structure.takeDamage(points)

			Each structure determines how point damage is taken.
	 */
	describe('takeDamage: ', () => {
		it('should throw error if points argument is invalid', () => {});
		it('should throw error if points argument is not an integer', () => {});
		it('should throw error if points arguments is less than 0', () => {});
		it('should apply damage to the structure', () => {});
	});

});