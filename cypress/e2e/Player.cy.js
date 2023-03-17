/*
1. The player begins with a certain number of points.
2. Points can be distributed amongst existing structures to upgrade them.
3. Points can be used to purchase new structures
4. Points increase with the elimination of enemies
5. Points increase at the end of each turn based upon the number of points associated with the Cache

I want to quit the game!
I want to pause the game.
I want to resume the game.
I have finished my turn.
I have upgraded a structure
I have created a new structure
I have placed a new structure
I have removed a structure
I have changed the point allocation for the cache.


 */

import Player from "../../src/Player.js";

describe('Player: ', () => {
	it('should be asked to create', () => {});
	it('should throw error if attempting to create again', () => {});

	describe('dealing with the game: ', () => {
		it('should quit the game', () => {});
		it('should pause the game', () => {});
		it('should resume the game', () => {});
		it('should finish the top of the round', () => {});
	});

	describe('dealing with structures: ', () => {
		it('should upgrade a structure', () => {});
		it('should remove a structure', () => {});
		it('should create a new structure', () => {});
		it('should place a new structure', () => {});
	});

	describe('dealing with the cache', () => {
		it('should change the resource allocation of the cache', () => {});
	});

})