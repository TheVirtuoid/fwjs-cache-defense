import Game from "../../../src/classes/Game.js";
import Round from "../../../src/classes/Round.js";
import Monster from "../../../src/classes/Monster.js";
import MonsterController from "../../../src/classes/controllers/MonsterController.js";
import RoadController from "../../../src/classes/controllers/RoadController.js";
import RoadType from "../../../src/classes/types/RoadType.js";
import ItemPosition from "../../../src/classes/ItemPosition.js";
import BoardController from "../../../src/classes/controllers/BoardController.js";
import RoadDirection from "../../../src/classes/types/RoadDirection.js";

describe('Round', () => {
	let monsterController;
	let roadController;
	let boardController;
	let controllers;
	beforeEach(() => {
		monsterController = new MonsterController();
		roadController = new RoadController();
		boardController = new BoardController();
		boardController.newBoard();
		controllers = { monsterController, roadController, boardController };
	});
	it('should create the instance', () => {
		const round = new Round({ round: 1, controllers });
		expect(round).to.be.an.instanceOf(Round);
	});
	it('should throw error if round property is not an integer', () => {
		expect(() => new Round({ round: 'bad', controllers })).to.throw(Round.ERROR_ROUND_NOT_INTEGER.message);
	});
	it('should throw error if round property is less than 1', () => {
		expect(() => new Round({ round: 0, controllers })).to.throw(Round.ERROR_ROUND_LESS_THAN_ONE.message);
	});
	it('should throw error if MonsterController is not part of controllers argument', () => {
		expect(() => new Round({ round: 1, controllers: {
			roadController, boardController
		} })).to.throw(Round.ERROR_ROUND_MISSING_MONSTERCONTROLLER.message);
	});
	it('should throw error if RoadController is not part of controllers argument', () => {
		expect(() => new Round({ round: 1, controllers: {
			monsterController, boardController
		} })).to.throw(Round.ERROR_ROUND_MISSING_ROADCONTROLLER.message);
	});
	it('should throw error if BoardController is not part of controllers argument', () => {
		expect(() => new Round({ round: 1, controllers: {
			monsterController, roadController
		} })).to.throw(Round.ERROR_ROUND_MISSING_BOARDCONTROLLER.message);
	});
	it('should set the round', () => {
		const round = new Round({ round: 1, controllers });
		expect(round.round).to.equal(1);
	});

	describe('numberOfMonstersToGenerate', () => {
		const generateRound = (round) => {
			return new Round({ round, controllers });
		};
		it('should return 1 when round is 1', () => {
			const round = generateRound(1);
			expect(round.numberOfMonstersToGenerate()).to.equal(1);
		});
		it('should return 3 when round is 2', () => {
			const round = generateRound(2);
			expect(round.numberOfMonstersToGenerate()).to.equal(3);
		});
		it('should return 7 when round is 3', () => {
			const round = generateRound(3);
			expect(round.numberOfMonstersToGenerate()).to.equal(7);
		});
		it('should return 91 when round is 10', () => {
			const round = generateRound(10);
			expect(round.numberOfMonstersToGenerate()).to.equal(91);
		});
		it('should return 381 when round is 20', () => {
			const round = generateRound(20);
			expect(round.numberOfMonstersToGenerate()).to.equal(381);
		});
	});

	describe('round functions', () => {
		let round;
		beforeEach(() => {
			round = new Round({ round: 3, controllers });
		});

		describe('generateMonsters', () => {
			it('should throw error if numberOfMonstersToGenerate argument is not an integer', () => {
				expect(() => round.generateMonsters('bad')).to.throw(Round.ERROR_GENERATEMONSTERS_ARGUMENT_NOT_INTEGER.message);
			});
			it('should throw error if numberOfMonstersToGenerate argument is less than 1', () => {
				expect(() => round.generateMonsters(0)).to.throw(Round.ERROR_GENERATEMONSTERS_ARGUMENT_LESS_THAN_ONE.message);
			});
			it('should generate the monsters', () => {
				const numberOfMonsters = round.numberOfMonstersToGenerate();
				const monsters = round.generateMonsters(numberOfMonsters);
				expect(monsters.length).to.equal(numberOfMonsters);
				monsters.forEach((monster) => expect(monster).to.be.an.instanceOf(Monster));
			});
		});

		describe('getRoadsToExpand', () => {
			it('should throw exception if position argument is not an ItemPosition', () => {
				expect(() => round.getRoadsToExpand({ position: 'bad', direction: RoadDirection.LEFT } )).to.throw(Round.ERROR_GETROADSTOEXPAND_POSITION_NOT_ITEMPOSITION.message);
			});
			it('should throw exception if direction argument is not a RoadDirection', () => {
				expect(() => round.getRoadsToExpand({ position: new ItemPosition({ x: 0, y: 0 }), direction: 'bad' } )).to.throw(Round.ERROR_GETROADSTOEXPAND_DIRECTION_NOT_ROADDIRECTION.message);
			});
			it('should get legal roads with only one road, one entrance', () => {
				console.log('-----------------------------------the road');
				const road = roadController.createRoad({ type: RoadType.HALF_LEFT });
				boardController.insertItem(road, new ItemPosition({ x: 0, y: 0 }));
				const roads = round.getRoadsToExpand({ position: new ItemPosition({ x: 0, y: 0 }), direction: RoadDirection.LEFT });
				expect(roads.length).to.equal(5);
			});
			it('should get legal roads with only one road, two entrances', () => {});
			it('should get legal roads with only one road, three entrances', () => {});
			it('should get legal roads with two roads, one covered', () => {});
			it('should get legal roads with three roads, one covered', () => {});
			it('should return no roads if there are no openings (should be impossible)', () => {});
		});
	});




	it('should determine what road to expand', () => {});
	it('should expand the road', () => {});
	it('should move a monster already in the BoardController', () => {});
	it('should place a monster into the BoardController', () => {});
	it('should fire from a weapon', () => {});
	it('should get the results of the animation frame', () => {});
	it('should signal no end of game when cache tower HP is greater than zero', () => {});
	it('should signal end of game when cache tower HP is zero', () => {});
	it('should signal end of round if cache tower HP is greater than zero and no more monsters are in the BoardController', () => {});
	it('should signal no end of round if at least one monster is in the BoardController or in the queue, and CT HP is greater than zero', () => {});
	it('should end the game', () => {});
	it('should end the round', () => {});

});