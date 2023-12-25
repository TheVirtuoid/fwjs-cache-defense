import RoadDirection from "./RoadDirection.js";
import imgCacheBase from "../../img/cache.png";


export default class ItemType {
	static MONSTER = {
		ALIEN: 1
	};
	static CACHE = {
		BASE: {
			graphics: {
				image: imgCacheBase,
				key: 'cache'
			}
		}
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
