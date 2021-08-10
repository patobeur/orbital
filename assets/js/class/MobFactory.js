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
			div: objdatas.div ?? false,
			ia: objdatas.ia ?? false,
			objtype: objdatas.objtype ?? false,
			objname: objdatas.objname ?? false,
			classname: objdatas.classname ?? false,
			textcontent: objdatas.textcontent ?? false,
			posxyz: objdatas.posxyz ?? false,
			sizwhl: objdatas.sizwhl ?? false,
			velxyz: { x: 2, y: 2, z: 1 },
			parentimmat: objdatas.parentimmat ?? false,
			// movement 
			direction: { ratio: 0, deg: this.aleaEntreBornes(0, 360), delay: 120, currentdelay: 0, compass: [0, 0, 0, 0], agility: 1 },
			xp: 0,
			lv: 1,
			stock: { fuel: 100, air: 1000, water: 1000, food: 1000 },
			status: { dead: false, immune: false, immune1rd: false, shield: false, mooving: false, gravity: false },
			tetha: objdatas.tetha ?? false,
			gravity: objdatas.gravity ?? false,
			dir: objdatas.dir ?? false
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
			dir: 1
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
			gravity: { range: { w: 50, h: 50 }, force: 1 },
			dir: 0
		})
		this.add_obj({
			div: 'sob',
			objtype: 'satellite',
			objname: 'moon',
			classname: 'sob',
			textcontent: '🌑',
			posxyz: {
				x: 250,
				y: 250,
				z: 0
			},
			sizwhl: { w: 16, h: 16, l: 16 },
			parentimmat: [1],
			tetha: [0, 360, 0.03],
			dir: 1
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			objtype: 'player',
			objname: 'player',
			classname: 'mob',
			textcontent: '🚀',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: false,
			direction: { ratio: .75, deg: 45, delay: 120, currentdelay: 0, compass: [0, 0, 0, 0] },
		})
		for (let index = 0; index < 3; index++) {
			this.add_obj({
				div: 'mob', // mob is mobile or sob is static
				ia: true,
				objtype: 'fsaucer',
				objname: 'ennemy',
				classname: 'mob',
				textcontent: '🛸',
				posxyz: this.inidatas.get_randomPos(),
				sizwhl: { w: 24, h: 24, l: 24 },
				parentimmat: false
			})
		}

		this.inidatas.create_EveryBasics({ mobs: this.mobs, sobs: this.sobs })
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
}
