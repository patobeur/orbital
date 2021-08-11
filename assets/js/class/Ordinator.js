"use strict";
class Ordinator {
	constructor() {
		this.DM = new DivManager()
		this.num = 0
		this.DM.appendChild_Cosmos()
		this.MF = new MobFactory(this.DM)
		this.MF.create_EveryBasics()
		this.gameOn = true
		this.pauseOn = false
		this.theta = this.get_theta()

		// if(){
		setInterval(this.renderScene, this.DM.IniDatas.renderinterval)
		// }

		// this.DM.create_EveryBasics()
		// console.log(this.MF.mobs)
		// console.log(this.MF.sobs)
		// this.DM.create_EveryBasics()
		// this.DM.appendChild_SolarSystem()
		// console.log(this.MF.mobs)
	}
	get_theta = () => {
		return [
			0,
			Math.PI / 6,
			Math.PI / 4,
			Math.PI / 3,
			Math.PI / 2,
			2 * (Math.PI / 3),
			3 * (Math.PI / 4),
			5 * (Math.PI / 6),
			Math.PI,
			7 * (Math.PI / 6),
			5 * (Math.PI / 4),
			4 * (Math.PI / 3),
			3 * (Math.PI / 2),
			5 * (Math.PI / 3),
			7 * (Math.PI / 4),
			11 * (Math.PI / 6)
		];
	}
	renderScene = () => {
		if (!this.pauseOn) {
			this.mobsIA()
			this.DM.redrawAllMobs(this.MF.mobs)
			this.DM.redrawAllSobs(this.MF.sobs)
			// this.EarthIA()
			// this.redrawAllMobs()
			// this.checkWin()
		}
	}
	EarthIA = () => {
		if (this.gameOn && !this.pauseOn) { // if game start
			for (let index = 0; index < this.MF.mobs.length; index++) {
				let obj = this.MF.mobs[index];
				if (obj.objname === 'earth') {
					// console.log(obj)
					// console.log(this.DM.aleaEntreBornes(-1, 1))
					// this.get_NewDirection(obj)
					// console.log(obj.objname, obj.posxyz.x, obj.posxyz.y)
					// console.log(this.MF.sobs[obj.parentimmat[0]].objname, this.MF.sobs[obj.parentimmat[0]].posxyz.x, this.MF.sobs[obj.parentimmat[0]].posxyz.y)
					// this.getNextOrbitPos({deg:22.5,orbiter:obj,center:this.MF.sobs[obj.parentimmat[0]]})
				}

			}
		}
	}
	getNextOrbitPos = (obj) => {
		if (obj.tetha[0] > 360) {
			obj.tetha[0] = 0
		}
		if (obj.parentimmat) {
			let Sun = this.MF.sobs[obj.parentimmat[0]]
			//let SunDiv = document.getElementById('center-' + obj.parentimmat[0]).getBoundingClientRect()
			// sun pos
			let SunX = Sun.posxyz.x + (obj.sizwhl.w / 2)
			let SunY = Sun.posxyz.y + (obj.sizwhl.h / 2)
			let SunW = Sun.gravity.range.w / 2
			let SunH = Sun.gravity.range.h / 2
			// new pos
			let x2 = SunX + Math.round(SunW * (Math.cos(obj.tetha[0])));
			let y2 = SunY + Math.round(SunH * (Math.sin(obj.tetha[0])));
			// saving new pos in obj
			obj.posxyz.x = x2 - (obj.sizwhl.w / 2)
			obj.posxyz.y = y2 - (obj.sizwhl.h / 2)
			if (obj.orbitdir > 0) {
				obj.tetha[0] = obj.tetha[0] + obj.tetha[2]
			}
			else {
				obj.tetha[0] = obj.tetha[0] - obj.tetha[2]
			}
		}
		else {
			console.log('no parent immat')
		}

	}
	// getNextOrbitPos = (obj) => {
	// 	if (obj.tetha[0] > 360) {
	// 		obj.tetha[0] = 0
	// 	}
	// 	if (obj.parentimmat) {

	// 		let Sun = this.MF.sobs[obj.parentimmat[0]]
	// 		let SunX = Sun.posxyz.x
	// 		let SunY = Sun.posxyz.y
	// 		let SunW = Sun.gravity.range.w / 2
	// 		let SunH = Sun.gravity.range.h / 2
	// 		let x2 = (SunX) + Math.round(SunW * (Math.cos(obj.tetha[0])));
	// 		let y2 = (SunY) + Math.round(SunH * (Math.sin(obj.tetha[0])));
	// 		obj.posxyz.x = x2// - (obj.sizwhl.w / 2)
	// 		obj.posxyz.y = y2// - (obj.sizwhl.h / 2)
	// 		obj.tetha[0] += .05
	// 	}
	// 	else {
	// 		console.log('no parent immat')
	// 	}

	// }
	getNextPos = (obj) => {
		let x = obj.posxyz.x
		let y = obj.posxyz.y
		let d = obj.direction.deg
		// console.log(obj.direction)

		// console.log(x, y, d)

		let x2 = (x * Math.cos(45)) - (y * Math.sin(45))
		let y2 = (x * Math.sin(45)) + (y * Math.cos(45))
		obj.posxyz.x = x2
		obj.posxyz.y = y2
		// obj.posxyz.x += 2
		// obj.posxyz.y -= 2
		// console.log(x2, y2)

	}
	//
	mobsIA = () => {
		if (this.gameOn && !this.pauseOn) { // if game start
			for (let index = 0; index < this.MF.mobs.length; index++) {
				let obj = this.MF.mobs[index];
				if (obj.ia) {
					// console.log(obj)
					// console.log(this.DM.aleaEntreBornes(-1, 1))
					this.get_NewDirection(obj)
					this.get_NewPosition(obj)
					this.checkpos(obj)
				}
				if (obj.objtype === 'player') {
					this.get_NewDirection(obj)
					// console.log(obj)
					// console.log(this.DM.aleaEntreBornes(-1, 1))
					// this.get_NewDirection(obj)

					// this.getNextPos(obj)
					// this.getNextOrbitPos(obj)
					this.get_NewDirection(obj)
					this.get_NewPosition(obj)
					this.checkpos(obj)
				}

			}
			for (let index = 0; index < this.MF.sobs.length; index++) {
				let obj = this.MF.sobs[index];
				if (obj.parentimmat) {//} || obj.objtype === 'satellite')) {
					// console.log(obj.parentimmat)
					this.getNextOrbitPos(obj)
				}

			}
		}
	}
	get_NewDirection = (obj) => {
		if (obj.direction.currentdelay < 1) {
			let marge = (360 / 8)
			let nex = this.DM.aleaEntreBornes(-obj.direction.agility, obj.direction.agility) * marge
			let nd = obj.direction.deg += nex
			// let nd = this.DM.aleaEntreBornes(0, 360)
			nd = nd > 360 ? 0 : nd
			nd = nd < 0 ? 360 : nd
			obj.direction.deg = nd
		}
		obj.direction.currentdelay += 1
		if (obj.direction.currentdelay > obj.direction.delay) {
			obj.direction.currentdelay = 0
		}
	}
	checkpos(obj) {
		if (obj.posxyz.x > this.DM.IniDatas.cosmosSize.w) { obj.posxyz.x = 1 - obj.sizwhl.w }
		if (obj.posxyz.x <= 0 - obj.sizwhl.w) { obj.posxyz.x = this.DM.IniDatas.cosmosSize.w }

		if (obj.posxyz.y <= 0 - obj.sizwhl.h) { obj.posxyz.y = this.DM.IniDatas.cosmosSize.h }
		if (obj.posxyz.y > this.DM.IniDatas.cosmosSize.h + obj.sizwhl.h) { obj.posxyz.y = 1 }
		// if (worldType === "mirrored") {
		// }
		// else if (worldType === "closed") {
		// 	if (obj.posxyz.x < 0) { obj.posxyz.x = 0; ant.state[1] = "recenter" }
		// 	if (obj.posxyz.x >= playGroundSize.w - (obj.sizwhl.w2[0])) { obj.posxyz.x = playGroundSize.w - (obj.sizwhl.w2[0]); ant.state[1] = "recenter" }
		// 	if (obj.posxyz.y < 0) { obj.posxyz.y = 0; ant.state[1] = "recenter" }
		// 	if (obj.posxyz.y >= playGroundSize.h - (obj.sizwhl.w2[1])) { obj.posxyz.y = playGroundSize.h - (obj.sizwhl.w2[1]); ant.state[1] = "recenter" }
		// }
	}
	get_NewPosition = (obj) => {
		let ratioDir = parseInt(obj.direction.deg / 360 * 1000) / 1000 // 0.0 to 1
		let velocityX = obj.velxyz.x
		let velocityY = obj.velxyz.y
		// let velocityZ = ant.velxyz[2]

		// console.log(obj.direction.deg, '+', ratioDir)
		// north
		if ((ratioDir > 0.9375 && ratioDir <= 1) || (ratioDir >= 0 && ratioDir <= 0.0625)) { obj.direction.compass = "N"; obj.posxyz.y -= velocityY }
		// north est
		if (ratioDir > 0.0625 && ratioDir <= 0.1875) { obj.direction.compass = "NE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y -= (velocityY / 2) }
		// est
		if (ratioDir > 0.1875 && ratioDir <= 0.3125) { obj.direction.compass = "E"; obj.posxyz.x += velocityX }
		//south est
		if (ratioDir > 0.3125 && ratioDir <= 0.4375) { obj.direction.compass = "SE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y += (velocityY / 2) }
		// south
		if (ratioDir > 0.4375 && ratioDir <= 0.5625) { obj.direction.compass = "S"; obj.posxyz.y += velocityY }
		// south west
		if (ratioDir > 0.5625 && ratioDir <= 0.6875) { obj.direction.compass = "SW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y += (velocityY / 2) }
		// west
		if (ratioDir > 0.6875 && ratioDir <= 0.8125) { obj.direction.compass = "W"; obj.posxyz.x -= velocityX }
		// north 
		if (ratioDir > 0.8125 && ratioDir <= 0.9375) { obj.direction.compass = "NW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y -= (velocityY / 2) }

		// if (ratioDir > 0.6875 && ratioDir < 0.9375) {
		// 	console.log(obj.direction.deg, obj.direction.compass)
		// }
		// is the mob running out playground

		this.checkpos(obj)
		this.num++
	}
	setPause() {
		if (this.pauseOn === true) {
			this.pauseOn = false
			document.getElementById('pause').classList.remove('active')
		} else {
			this.pauseOn = true
			document.getElementById('pause').classList.add('active')
			console.log('Game paused!!')
		}
	}
	dothat(doo) {
		console.log(this.num, doo.posxyz, doo.direction.compass)
	}


}
