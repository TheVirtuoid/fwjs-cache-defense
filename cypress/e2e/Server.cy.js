/*
What does the Server say to the Player?
Create the Player
What do you do during this turn in the run?

What does the Server say to the Field?
Create the Field
Add onto the Field
Place a Structure on the Field
Place an Enemy on the Field
Move an Enemy on the Field
What do you do during this turn in the run?

What does the Server say to the Cache?
Create the Cache
Subtract points due to Enemy Hit
Add points due to Enemy Elimination
What do you do during this turn in the run?

What does the Server say to the Structure Factory?
Create a certain type of Structure
Subtract points due to Enemy Hit
Add points to a structure due to player upgrade
Remove a structure from list
What do you do during this turn in the run?

What does the Server say to the Enemy Factory?
Create a certain type of Enemy
Subtract points due to Structure hit
What do you do during this turn in the run?

 */

describe('Server: ', () => {
	describe('creation: ', () => {});
	describe('server to Player: ', () => {
		it('should create a Player', () => {});
		it('should throw error if creating a second player', () => {});
	});
	/*
	Create the Field
Add onto the Field
Place a Structure on the Field
Place an Enemy on the Field
Move an Enemy on the Field
	 */
	describe('server to Field: ', () => {
		it('should create a field', () => {});
		it('should throw error if creating a second field', () => {});
		describe('work with structures: ', () => {
			it('should place a structure on the field', () => {});
			it('should throw error if arguments are invalid', () => {});
		});
		describe('work with enemies: ', () => {
			it('should place a enemy on the field', () => {});
			it('should throw error if arguments are invalid', () => {});
			it('should be able to move an enemy', () => {});
		});
	});

	/*
	Create the Cache
Subtract points due to Enemy Hit
Add points due to Enemy Elimination

	 */
	describe('server to Cache', () => {
		it('should create the Cache', () => {});
		it('should throw error if a second cache is created', () => {});
		describe('work with enemies: ', () => {
			it('should subtract points due to enemy hit', () => {});
			it('should add points due to enemy elimination', () => {});
		});
	});

	/*
	Create a certain type of Structure
Subtract points due to Enemy Hit
Add points to a structure due to player upgrade
Remove a structure from list
	 */
	describe('server to StructureFactory', () => {
		it('should create the StructureFactory', () => {});
		it('should throw error if a second StructureFactory is created', () => {});
		it('should add points due to player upgrade', () => {});
		it('should remove structure from the list', () => {});
	});

	/*
	Create a certain type of Enemy
Subtract points due to Structure hit
	 */
	describe('server to EnemyFactory', () => {
		it('should create the EnemyFactory', () => {});
		it('should throw error if a second EnemyFactory is created', () => {});
		it('should remove points if a Structure is hit', () => {});
	});
});