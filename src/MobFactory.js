"use strict";

class MobFactory {
	constructor(IniDatas) {
		this.mobsImmat = 0; // Use a simple counter
		this.sobsImmat = 0; // Use a simple counter
		this.Data = new Data();
		this.mobs = [];
		this.sobs = [];
		this.inidatas = IniDatas;
	}

	add_obj = (objdatas) => {
		let obj = {
			xp: 0,
			lv: 1,
			div: objdatas.div ?? false,
			ia: objdatas.ia ?? false,
			objtype: objdatas.objtype ?? false,
			objname: objdatas.objname ?? false,
			name: objdatas.name ?? "unknown",
			classname: objdatas.classname ?? false,
			textcontent: objdatas.textcontent ?? false,
			posxyz: objdatas.posxyz ?? false,
			sizwhl: objdatas.sizwhl ?? false,
			velxyz: objdatas.velxyz ?? { x: 1, y: 1, z: 1, cx: 1, cy: 1, cz: 1 },
			parentimmat: objdatas.parentimmat ?? false,
			direction: objdatas.direction ?? {
				ratio: 0,
				degZ: 0,
				deg: aleaEntreBornes(-360, 360),
				delay: 50,
				currentdelay: 0,
				way: [0, 0, 0, 0, 0, 0],
				compass: "",
				agility: 22.5,
			},
			status: {
				etheral: false,
				dead: false,
				immune:
					objdatas.status && objdatas.status.immune
						? objdatas.status.immune
						: false,
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
			stock:
				objdatas.stock ??
				this.Data.set_ObjDatasByZoneAndItemName(objdatas, "stock"),
			rangeacolor: objdatas.objtype
				? this.Data.set_ObjDatasByZoneAndItemName(objdatas, "rangeacolor")
				: false,
			ranges: objdatas.ranges ?? {
				social: { d: 4 * ((objdatas.sizwhl.w + objdatas.sizwhl.h) / 2) },
				rangea: { d: 4 * ((objdatas.sizwhl.w + objdatas.sizwhl.h) / 2) },
			},
			collide: {
				collidesocial: false,
				colliderangea: false,
				collideself: false,
				collidealert: false,
			},
			contact: objdatas.contact
				? {
						social: objdatas.contact.social ?? false,
						exchange: objdatas.contact.exchange ?? false,
				  }
				: false,
			proxim: objdatas.proxim ?? false,
		};

		if (obj.div === "sob") {
			obj.immat = this.sobsImmat;
			this.sobs.push(obj);
			this.sobsImmat++;
		} else if (obj.div === "mob") {
			obj.immat = this.mobsImmat;
			this.mobs.push(obj);
			this.mobsImmat++;
		}
	};

	create_EveryBasics() {
		this.add_obj({
			div: "sob",
			objtype: "etoile",
			objname: "sun",
			classname: "sob",
			textcontent: "🌞",
			name: "The Sun",
			posxyz: this.inidatas.get_centerPos({ w: 32, h: 32, l: 32 }),
			sizwhl: { w: 32, h: 32, l: 32 },
			parentimmat: false,
			gravity: { range: { w: 400, h: 400 }, force: 1 },
			orbitdir: 1,
		});
		this.add_obj({
			div: "sob",
			objtype: "planete",
			objname: "earth",
			classname: "sob",
			textcontent: "🌎",
			name: "The Earth (the only one !!!)",
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [0, 360, 0.01],
			gravity: { range: { w: 100, h: 50 }, force: 1 },
			orbitdir: 0,
			contact: { social: [], exchange: [] },
		});
		this.add_obj({
			div: "mob", // mob is mobile or sob is static
			ia: false,
			objtype: "player",
			objname: "player",
			classname: "mob",
			textcontent: "🚀",
			name: "Alice & Bob Ship",
			posxyz: this.inidatas.get_centerPos(
				{ w: 24, h: 24, l: 24 },
				{ y: "bottom" }
			),
			sizwhl: { w: 24, h: 24, l: 24 },
			velxyz: { x: 1, y: 1, z: 1, cx: 0, cy: 0, cz: 0 },
			tetha: [0, 360, 0.03],
			direction: {
				ratio: 0,
				degZ: 360,
				deg: 0,
				delay: 1,
				currentdelay: 0,
				way: [0, 0, 0, 0],
				compass: "",
				agility: 45,
			},
			status: { immune: false },
			contact: { social: [], exchange: [] },
		});
		this.add_obj({
			div: "sob", // mob is mobile or sob is static
			ia: false,
			objtype: "satellite",
			objname: "ennemy",
			classname: "sob",
			textcontent: "🛰️",
			name: "SOLXIII (Sun Of Light earth Base ! )",
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [90, 360, 0.01],
			contact: { social: [], exchange: [] },
		});
		this.add_obj({
			div: "mob", // mob is mobile or sob is static
			ia: true,
			objtype: "fsaucer",
			objname: "ennemy",
			classname: "mob",
			textcontent: "🛸",
			name: "Billy Alien",
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 25, h: 25, l: 50 },
			parentimmat: false,
			direction: {
				ratio: 0,
				degZ: 0,
				deg: aleaEntreBornes(1, 360),
				delay: 400,
				currentdelay: 0,
				way: [0, 0, 0, 0],
				compass: "",
				agility: 45,
			},
			contact: { social: [], exchange: [] },
		});
		this.add_obj({
			div: "mob", // mob is mobile or sob is static
			ia: true,
			objtype: "fruits",
			objname: "kiwi",
			classname: "mob",
			textcontent: "🥝",
			name: "A SpaceFrozen kiwi",
			stock: { food: [10, 0, 0] },
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: {
				ratio: 0,
				degZ: 0,
				deg: aleaEntreBornes(1, 360),
				delay: 100,
				currentdelay: 0,
				way: [0, 0, 0, 0],
				compass: "",
				agility: 22.5,
			},
			contact: { social: [], exchange: [] },
		});

		this.inidatas.create_EveryBasics({ mobs: this.mobs, sobs: this.sobs });
	}
}
