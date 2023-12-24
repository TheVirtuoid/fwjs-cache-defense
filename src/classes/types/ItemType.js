export default class ItemType {
	static MONSTER = {
		ALIEN: 1
	};
	static CACHE = {
		BASE: 1
	};
	static WEAPON = {
		SHOOTER: 1
	};

	static ITEM_TYPES = new Set([
		ItemType.MONSTER.ALIEN,
		ItemType.CACHE.BASE,
		ItemType.WEAPON.SHOOTER
	]);

	static MONSTER_TYPES = new Set([
		ItemType.MONSTER.ALIEN
	]);

	static CACHE_TYPES = new Set([
		ItemType.CACHE.BASE
	]);

	static WEAPON_TYPES = new Set([
		ItemType.WEAPON.SHOOTER
	]);
}
