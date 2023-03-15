# fwjs-cache-defense
Fun With JavaScript Presents Cache Defense

## Design

The objective of the game is to defend your cache against an ever increasing
horde of fantasy looters.

## Basic Rules

1. A home base will be defended by the player
2. The home base will be attacked by a variety of enemies
3. The player will have structures which can be placed on the game board which automatically fires at the enemies.
4. When an enemy takes enough damage, they disappear
5. When an enemy reaches the cache, the cache loses points.
6. When the cache has no more points, the game is over.

## Features


### The Server
The server is responsible for starting, managing, and ending the game.

1. Launches the Player worker
2. Launches the GUI worker
3. Launches the Cache worker
4. Launches the Field worker
5. Launches the Structure worker
6. Launches the Enemy worker
7. Starts the Game
8. Receive messages from the Player
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
15. Sent Messages to the GUI
16. Sent Messages to the Cache
    1. Hit by an Enemy
17. Sent Messages to the Field
    1. Movement of an Enemy?
    2. Placement of a Structure
18. Sent Messages to the Structure
    1. Upgrade
    2. Damage from Enemy
19. Sent Messages to the Enemy
    1. Hit from Structure


### The Player

1. The player begins with a certain number of points.
2. Points can be distributed amongst existing structures to upgrade them.
3. Points can be used to purchase new structures
4. Points increase with the elimination of enemies
5. Points increase at the end of each turn based upon the number of points associated with the Cache

### The Cache

1. The cache begins with a certain number of points.
2. During the game, the cache increases in points with the elimination of an enemy
3. When an enemy connects with the Cache, the cache loses significant points
4. When there are no more points in the cache, the game ends.
5. At the end of each turn, the Cache contributes points to the Player

### The Structures
1. A Structure fires at enemies approaching the Cache
2. A Structure always hits an enemy.
3. A Structure does a certain amount of damage to the enemy.
4. A Structure can be upgraded at the end of each turn to do more damage.
5. A Structure can lose strength, but never be destroyed
6. There are a set number of structures that do different types of damage.

### The Enemy
1. The Enemy goal is to reach the Cache.
2. The Enemy has a set number of hit points and will take hits from Structures.
3. When the enemy hit points reaches 0, points are awarded both to the player and to the cache
4. The number and strength of enemies increases with each turn.

### The Playing Field
1. Playing field contains location of cache and structures.
2. Playing field is three spaces to either side of road.
3. Playing field grows at the end of each turn.
4. The Enemy starts on the entrance
5. Each enemy appears at the entrance and marches towards the cache.
6. At the end of the turn the entrance expands.

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
