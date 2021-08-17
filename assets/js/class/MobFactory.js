"use strict";

// -----------------------------



class MobFactory {
	constructor(IniDatas) {
		this.mobsImmat = [0]
		this.sobsImmat = [0]
		this.mobs = []
		this.sobs = []
		this.inidatas = IniDatas
		// console.log('MobFactory IniDatas', this.inidatas)
	}

	get_ColorByType = (typename, zone) => {
		let colors = {
			rangea: {
				etoile: "rgba(0, 0, 0, 1);",
				planete: "rgba(255, 255, 255, 0.05)",
				satellite: "rgba(255, 0, 252, 0.05)",
				fsaucer: "rgba(255,255, 0, 0.05)",
				neutral: "rgba(255,255, 0, 0.05)",
				fruits: "rgba(0,255, 0, 0.05)",
				player: "rgba(0,00, 255, 0.05)"
			}
		}
		return colors[zone][typename]
	}
	set_ObjDatasByZoneAndItemName = (obj, itemname) => {
		let categories = {
			sob: {
				etoile: {
					rangeacolor: "rgba(255, 255, 255, 0.05);",
					stock: {
						unknow: [this.aleaEntreBornes(0, 1000000), 10, 1, 1000000000],
					}
				},
				planete: {
					rangeacolor: "rgba(255, 255, 255, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					}
				},
				satellite: {
					rangeacolor: "rgba(255, 0, 252, 0.05)",
					// stock: {
					// 	water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					// 	air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					// }
				},
				meteorite: {
					rangeacolor: "rgba(255, 0, 252, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					}
				}
			},
			mob: {
				player: {
					rangeacolor: "rgba(0,255, 255, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 100), -.1, 0, 100],
						air: [this.aleaEntreBornes(0, 100), 0, -.1, 100],
						fuel: [this.aleaEntreBornes(0, 100), 0, -.5, 100],
						food: [this.aleaEntreBornes(0, 100), 0, -.5, 100],
					}
				},
				fsaucer: {
					rangeacolor: "rgba(255,255, 0, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					}
				},
				neutral: {
					rangeacolor: "rgba(255,255, 0, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						fuel: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					}
				},
				fruits: {
					rangeacolor: "rgba(0,255, 0, 0.05)",
					stock: {
						food: [this.aleaEntreBornes(0, 10)]
					}
				},
				meteorite: {
					rangeacolor: "rgba(255, 0, 252, 0.05)",
					stock: {
						water: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
						air: [this.aleaEntreBornes(0, 1000), .1, 50, 1000],
					}
				}
			},
		}
		// console.log(obj.div, obj.objtype, itemname)
		// console.log(categories)
		return categories[obj.div][obj.objtype][itemname]
	}
	add_obj = (objdatas) => {
		// obj completition
		let obj = {
			xp: 0,
			lv: 1,
			div: objdatas.div ?? false,
			ia: objdatas.ia ?? false,
			objtype: objdatas.objtype ?? false,
			objname: objdatas.objname ?? false,
			classname: objdatas.classname ?? false,
			textcontent: objdatas.textcontent ?? false,
			posxyz: objdatas.posxyz ?? false,
			sizwhl: objdatas.sizwhl ?? false,
			velxyz: objdatas.velxyz ?? { x: 1, y: 1, z: 1, cx: 1, cy: 1, cz: 1 },// own velocity statisticsactuals speeds
			parentimmat: objdatas.parentimmat ?? false,
			// movement 
			direction: objdatas.direction ?? { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(-360, 360), delay: 50, currentdelay: 0, way: [0, 0, 0, 0, 0, 0], compass: '', agility: 1 },
			status: {
				etheral: false,
				dead: false,
				immune: ((objdatas.status && objdatas.status.immune) ? objdatas.status.immune : false),
				immune1rd: false,
				shield: false,
				mooving: false,
				gravity: false,
				explose: false,
				alerte: false,
			},
			statusdelay: {
				etheral: [0, 0],
				dead: [0, 0],
				immune: [0, 0],
				immune1rd: [0, 0],
				shield: [0, 0],
				mooving: [0, 0],
				gravity: [0, 0],
				explose: [0, 0],
				alerte: [0, 0],
			},
			tetha: objdatas.tetha ?? false,
			gravity: objdatas.gravity ?? false,
			orbitdir: objdatas.orbitdir ?? false,
			stock: objdatas.stock ?? this.set_ObjDatasByZoneAndItemName(objdatas, 'stock'),
			rangeacolor: objdatas.objtype ? this.set_ObjDatasByZoneAndItemName(objdatas, 'rangeacolor') : false,
			selfr: objdatas.objtype ?? ((objdatas.sizwhl.w + objdatas.sizwhl.h) / 2),
			ranges: objdatas.ranges ?? {
				social: {
					d: 4 * ((objdatas.sizwhl.w + objdatas.sizwhl.h) / 2)
				},
				rangea: {
					d: 4 * ((objdatas.sizwhl.w + objdatas.sizwhl.h) / 2)
				}
			},
			collide: {
				collidesocial: false,
				colliderangea: false,
				collideself: false,
				collidealert: false
			}
		}
		if (obj.div === 'sob') {
			obj.immat = (objdatas.parentimmat) ? (objdatas.parentimmat === -1) ? (this.sobsImmat[0] - 1) : (this.sobsImmat[0] + 1) : this.sobsImmat[0];
			obj.parentimmat = objdatas.parentimmat ? objdatas.parentimmat : false;
			this.sobs[this.sobsImmat] = obj
			this.sobsImmat[0] += 1
		}
		else if (obj.div === 'mob') {
			obj.immat = this.mobsImmat[0]
			// obj.parentimmat = objdatas.parentimmat >= 0 ? objdatas.parentimmat : this.mobsImmat[0];
			this.mobs[this.mobsImmat] = obj
			this.mobsImmat[0] += 1
		}
		else {
			console.log('innexpected')
		}
	}
	create_EveryBasics() {
		this.add_obj({
			div: 'sob',
			objtype: 'etoile',
			objname: 'sun',
			classname: 'sob',
			textcontent: '🌞',
			posxyz: this.inidatas.get_centerPos({ w: 32, h: 32, l: 32 }),
			sizwhl: { w: 32, h: 32, l: 32 },
			parentimmat: false,
			gravity: { range: { w: 400, h: 400 }, force: 1 },
			orbitdir: 1
		})
		this.add_obj({
			div: 'sob',
			objtype: 'planete',
			objname: 'earth',
			classname: 'sob',
			textcontent: '🌎',
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [0, 360, 0.01],
			gravity: { range: { w: 100, h: 50 }, force: 1 },
			orbitdir: 0
		})
		this.add_obj({
			div: 'sob',
			objtype: 'satellite',
			objname: 'moon',
			classname: 'sob',
			textcontent: '🌑',
			posxyz: this.inidatas.get_centerPos({ w: 16, h: 16, l: 16 }),
			sizwhl: { w: 16, h: 16, l: 16 },
			parentimmat: [1],
			tetha: [0, 360, 0.03],
			orbitdir: 1
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: false,
			objtype: 'player',
			objname: 'player',
			classname: 'mob',
			textcontent: '🚀',
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }, { y: 'bottom' }),
			sizwhl: { w: 24, h: 24, l: 24 },
			velxyz: { x: 1, y: 1, z: 1, cx: 0, cy: 0, cz: 0 },
			//parentimmat: [0],
			tetha: [0, 360, 0.03],
			direction: { ratio: 0, degZ: 360, deg: 0, delay: 15, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 45 },
			status: { immune: false }
		})
		this.add_obj({
			div: 'sob', // mob is mobile or sob is static
			ia: false,
			objtype: 'satellite',
			objname: 'ennemy',
			classname: 'sob',
			textcontent: '🛰️',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [90, 360, 0.01]
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: '🛸',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 25, h: 25, l: 50 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 3, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 }
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: '🛸',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: '🛸',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fruits',
			objname: 'kiwi',
			classname: 'mob',
			textcontent: '🥝',
			stock: { food: [10, 0, 0] },
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		// for (let index = 0; index < 3; index++) {
		// 	this.add_obj({
		// 		div: 'mob', // mob is mobile or sob is static
		// 		ia: true,
		// 		objtype: 'fsaucer',
		// 		objname: 'ennemy',
		// 		classname: 'mob',
		// 		textcontent: '🛸',
		// 		posxyz: this.inidatas.get_randomPos(),
		// 		sizwhl: { w: 24, h: 24, l: 24 },
		// 		parentimmat: false
		// 	})
		// }

		this.inidatas.create_EveryBasics({ mobs: this.mobs, sobs: this.sobs })
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	givemeaniceico = () => {
		let temporarypersonalfun = [
			{ ico: "🕶", name: "sunglasses" },
			{ ico: "🎲", name: "Dice" },
			{ ico: "🌌", name: "milky way" },
			{ ico: "🪐", name: "ringed planet" },
			{ ico: "🌌", name: "milky way" },
			{ ico: "🩲", name: "sleep" },
			{ ico: "🍩", name: "Doughnut" },
			{ ico: "🥥", name: "Coconut" },
			{ ico: "🍎", name: "Red Apple" },
			{ ico: "🥝", name: "Kiwi Fruit" },
			{ ico: "🍆", name: "Eggplant" },
			{ ico: "🥑", name: "Avocado" },
			{ ico: "🥔", name: "Potato" },
			{ ico: "❤️", name: "Red Heart" },
			{ ico: "💥", name: "Collision" },
			{ ico: "🦠", name: "Microbe" },
			{ ico: "🌑", name: "New Moon Crescent Moon " },
			{ ico: "🌒", name: "Waxing Crescent Quarter Moon " },
			{ ico: "🌚", name: "New Moon Quarter Moon Face" },
			{ ico: "⭐", name: "Star  Star  " },
			{ ico: "🔥", name: "Fire" },
			{ ico: "💧", name: "Droplet  Wave  " }
		]
		let nbico = temporarypersonalfun.length
		let aleaico = this.aleaEntreBornes(0, nbico - 1)
		return temporarypersonalfun[aleaico].ico
	}
}
