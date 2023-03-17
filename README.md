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

### Communications

#### What does the Server say to the Player?
1. Create the Player
2. What do you do during this turn in the run?

#### What does the Server say to the Field?
1. Create the Field
2. Add onto the Field
3. Place a Structure on the Field
4. Place an Enemy on the Field
5. Move an Enemy on the Field
6. What do you do during this turn in the run?

#### What does the Server say to the Cache?
1. Create the Cache
2. Subtract points due to Enemy Hit
3. Add points due to Enemy Elimination
4. What do you do during this turn in the run?

#### What does the Server say to the Structure Factory?
1. Create a certain type of Structure
2. Subtract points due to Enemy Hit
3. Add points to a structure due to player upgrade
4. Remove a structure from list
5. What do you do during this turn in the run?

#### What does the Server say to the Enemy Factory?
1. Create a certain type of Enemy
2. Subtract points due to Structure hit
3. What do you do during this turn in the run?

#### What does the Player say to the Server?
1. I want to quit the game!
2. I want to pause the game.
3. I want to resume the game.
4. I have finished my turn.
5. I have upgraded a structure
6. I have created a new structure
7. I have placed a new structure
8. I have removed a structure
9. I have changed the point allocation for the cache.

#### What does the Field say to the Server?
1. I have created a new extension.

#### What does the Cache say to the Server?
1. Give points to the player
2. Research has been completed - here is the new research

#### What does the Structure Factory say to the Server?
1. Here is a new structure
2. I have fired upon the first available enemy

#### What does the Enemy Factory say to the Server?
1. I have moved certain number of spaces





### The Server
The Server is a singleton instance, responsible for starting, managing, and ending the game.

### The Player
The Player is a singleton instance representing the entity playing the game.

### The Cache
The Cache is a singleton instance representing the object that the Player
protects from losing all its points.

### The Structures (StructureFactory)
The StructureFactory is a singleton instance that delivers multiple 
instances of a variety of structures to the server.

### The Enemy
The EnemyFactory is a singleton instance that delivers multiple instances
of a variety of enemies to the server.

### The Playing Field
The Field is a singleton instance, responsible to maintaining and
managing the playing field.
