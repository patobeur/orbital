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
			velxyz: objdatas.velxyz ?? { x: 1, y: 1, z: 1 },
			parentimmat: objdatas.parentimmat ?? false,
			// movement 
			direction: objdatas.direction ?? { ratio: 0, deg: this.aleaEntreBornes(-360, 360), delay: 50, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
			stock: { fuel: 100, air: 1000, water: 1000, food: 1000 },
			status: { dead: false, immune: false, immune1rd: false, shield: false, mooving: false, gravity: false },
			tetha: objdatas.tetha ?? false,
			gravity: objdatas.gravity ?? false,
			orbitdir: objdatas.orbitdir ?? false,
			rangecolor: objdatas.objtype ? this.get_ColorByType(objdatas.objtype, "range") : false
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
	get_ColorByType = (typename, zone) => {
		let colors = {
			range: {
				etoile: "rgba(255, 255, 255, 0.1);",
				planete: "rgba(255, 255, 255, 0.1)",
				satellite: "rgba(25, 0, 252, 0.1)",
				gravity: "rgba(255, 255, 255, 0.05)",
				fsaucer: "rgba(255,255, 0, 0.05)",
				neutral: "rgba(255,255, 0, 0.05)"
			}
		}
		return colors[zone][typename]
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
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }),
			sizwhl: { w: 24, h: 24, l: 24 },
			velxyz: { x: 2, y: 2, z: 1 },
			//parentimmat: [0],
			tetha: [0, 360, 0.03],
			direction: { ratio: 0, deg: 0, delay: 15, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 22.5 },
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
			direction: { ratio: 0, deg: this.aleaEntreBornes(0, 22.5), delay: 3, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 }
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: '🎈',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, deg: this.aleaEntreBornes(0, 22.5), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
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
}
