/*
1. The player begins with a certain number of points.
2. Points can be distributed amongst existing structures to upgrade them.
3. Points can be used to purchase new structures
4. Points increase with the elimination of enemies
5. Points increase at the end of each turn based upon the number of points associated with the Cache

 Receive messages from the Player
   1. Quit Game
   2. Pause Game?
   3. Restart Game
   4. Upgrade Structure
   5. Build Structure
   6. Place Structure
9. Receive messages from the GUI
10. Receive messages from the Cache
    1. End of Game
    2. End of Turn / Allocation of points to player
11. Receive messages from the Field
12. Receive Messages from the Structure
    1. Composition of New Structure
    2. List of supported Structures
    3. Notification of Destruction?
    4. Fire direction / damage
13. Received Message from the Enemy
    1. Movement
    2. Damage to Cache
    3. Damage to Structure
    4. Creation
    5. Elimination
14. Sent Messages to the Player
    1. Add Points
    2. End Game
    3. Available Structures to Build



 */

import Player from "../../src/Player.js";

describe('Player: ', () => {
	it('should create', () => {});
	it('should process GameQuit', () => {});
	it('should process GamePause', () => {});
	it('should process GameRestart', () => {});
})