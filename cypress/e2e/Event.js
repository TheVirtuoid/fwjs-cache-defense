class Event {
	static GameQuit = 1;										// Quit Game
	static GamePause = 2;										// Pause Game?
	static GameRestart = 3;									// Restart Game
	static StructureUpgrade = 4;						// Upgrade Structure
	static StructureBuild = 5;							// Build Structure
	static StructurePlace = 6;							// Place Structure
	static GameEnd = 7;											// End of Game
	static TurnEnd = 8;											// End of Turn
	static StructureList = 9;								// List of supported Structures
	static StructureDescription = 10;				// Composition of New Structure
	static StructureUpdate = 11;						// Notification of Destruction?
	static StructureFire = 12;							// Fire direction / damage
	static EnemyMovement = 13;							// Movement
	static EnemyDamageToCache = 14;					// Cache
	static EnemyDamageToStructure = 15;			// Damage to Structure
	static EnemyNew = 16;										// Creation
	static EnemyEliminated = 17;						// Elimination
	static PlayerAddPoints = 18;						// Add Points
	static PlayerEndGame = 19;							// End Game
	static PlayerAvailableStructures = 20;	// Available Structures to Build
	static CacheHit = 21;										// Hit by an Enemy
	static FieldEnemyMovement = 22;					// Movement of an Enemy?
	static FieldPlaceStructure = 23;				// Placement of a Structure
	static StructureDamage = 24;						// Damage from Enemy
	static EnemyHit = 26;										// Hit from Structure
}

Object.seal(Event);

export { Event };