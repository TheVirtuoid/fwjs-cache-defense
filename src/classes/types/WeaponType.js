export default class WeaponType {
	static SHOOTER = {
		id: 1,
		name: 'Shooter'
	};
	static SHOCKER = {
		id: 2,
		name: 'Shocker'
	};

	static WEAPON_TYPES = new Set([
		WeaponType.SHOOTER,
		WeaponType.SHOCKER
	]);
}