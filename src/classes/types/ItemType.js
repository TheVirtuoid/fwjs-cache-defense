import RoadDirection from "./RoadDirection.js";
import imgCacheBase from "../../img/assets/cache-base.png";
import imgMonsterAlien from "../../img/sprites/monster-alien.png";
import imgWeaponShooter from "../../img/assets/weapon-shooter.png";


export default class ItemType {
	static MONSTER = {
		ALIEN: {
			graphics: {
				image: imgMonsterAlien,
				key: 'monster-alien',
				frameWidth: 20,
				frameHeight: 20,
				type: 'sprite'
			}
		}
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
		SHOOTER: {
			graphics: {
				image: imgWeaponShooter,
				key: 'weapon-shooter'
			}
		}
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
