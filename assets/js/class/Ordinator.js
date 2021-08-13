"use strict";
class Ordinator {
	constructor() {
		this.DM = new DivManager()
		this.num = 0
		this.DM.appendChild_Cosmos()
		this.MF = new MobFactory(this.DM)
		// this.theta = this.get_theta()

		// if(){
		// setInterval(this.renderScene, this.DM.IniDatas.renderinterval)
		// }
		this.animateCSS('#splash', 'fadeOut', true).then((message) => {
			// Do something after the animation
			this.start()
			this.animateCSS('.help', 'fadeOut', true).then((message) => {
				// Do something after the animation
			});
		});

	}
	start() {
		this.MF.create_EveryBasics()
		this.gameOn = true
		this.pauseOn = false
		setInterval(
			this.renderScene,
			this.DM.IniDatas.renderinterval
		)

	}
	//--
	// getNextPos = (obj) => {
	// 	let x = obj.posxyz.x
	// 	let y = obj.posxyz.y
	// 	obj.posxyz.x = (x * Math.cos(obj.direction.deg)) - (y * Math.sin(direction.deg))
	// 	obj.posxyz.y =(x * Math.sin(direction.deg)) + (y * Math.cos(direction.deg))
	// }
	//--
	// PlayerMooves = (obj) => {}
	//--
	// get_theta = () => {return [0,Math.PI / 6,Math.PI / 4,Math.PI / 3,Math.PI / 2,2 * (Math.PI / 3),3 * (Math.PI / 4),5 * (Math.PI / 6),Math.PI,7 * (Math.PI / 6),5 * (Math.PI / 4),4 * (Math.PI / 3),3 * (Math.PI / 2),5 * (Math.PI / 3),7 * (Math.PI / 4),11 * (Math.PI / 6)];}
	//--
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
	get_NextOrbitPos = (obj) => {
		let distance = false;
		if (obj.tetha[0] > 360) {
			obj.tetha[0] = obj.tetha[0] - 360
		}
		if (obj.parentimmat) {
			let center = this.MF.sobs[obj.parentimmat[0]]
			// sun pos
			let centerX = center.posxyz.x + (obj.sizwhl.w / 2)
			let centerY = center.posxyz.y + (obj.sizwhl.h / 2)
			let centerW = center.gravity.range.w / 2
			let centerH = center.gravity.range.h / 2
			// new pos
			let x2 = 0
			let y2 = 0
			if (obj.objtype === 'player') {
				distance = this.get_distance(obj, this.MF.sobs[obj.parentimmat[0]])
			}
			if (distance > 0) {
				console.log('player')
				x2 = centerX + Math.round((distance) * (Math.cos(obj.tetha[0])));
				y2 = centerY + Math.round((distance) * (Math.sin(obj.tetha[0])));
			}
			else {
				x2 = centerX + Math.round(centerW * (Math.cos(obj.tetha[0])));
				y2 = centerY + Math.round(centerH * (Math.sin(obj.tetha[0])));
			}
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
	mobsIA = () => {
		if (this.gameOn && !this.pauseOn) { // if game start
			for (let index = 0; index < this.MF.mobs.length; index++) {
				let obj = this.MF.mobs[index];
				if (obj.ia && !obj.parentimmat) {
					this.set_NiceDirection(obj)
					this.set_NicePosition_WithDegX(obj)
					this.check_PosOut(obj)
				}
				// else if (obj.objtype === 'player') {
				// 	this.set_NiceDirection(obj)
				// 	this.set_NicePosition_WithDegX(obj)
				// 	this.check_PosOut(obj)
				// }
				else if (obj.objtype === 'player') {//ia && obj.direction) {
					this.check_keyboardArrows(obj)
					this.set_NicePosition_WithDegX(obj)
					// console.log('C:' + obj.direction.compass, 'x:' + obj.posxyz.x, 'y:' + obj.posxyz.y, 'deg:' + obj.direction.deg)
					// obj.direction.compass = [0, 0, 0, 0]
					this.check_PosOut(obj)
				}
				// else if (obj.parentimmat && obj.direction) {
				// 	this.set_NiceDirection(obj)
				// 	this.set_NicePosition_WithDegX(obj)
				// 	this.get_NextOrbitPos(obj)
				// }

			}
			for (let index = 0; index < this.MF.sobs.length; index++) {
				let obj = this.MF.sobs[index];
				if (obj.parentimmat && obj.direction) {
					this.get_NextOrbitPos(obj)
				}
			}
		}
	}
	check_keyboardArrows = (obj) => {
		// ROTATION DEG
		if (obj.direction.way[0] === 1) { // up
			this.set_NiceDegrees(obj, 0)
		}
		if (obj.direction.way[1] === 1) { // right
			this.set_NiceDegrees(obj, 1)
		}
		if (obj.direction.way[2] === 1) { // down
			this.set_NiceDegrees(obj, 2)
		}
		if (obj.direction.way[3] === 1) { // left
			this.set_NiceDegrees(obj, 3)
		}
		// SPEED
		if (obj.direction.way[4] === 1) { // speed up
			this.set_NiceSpeed(obj, 4)
		}
		if (obj.direction.way[5] === 1) { // speed down
			this.set_NiceSpeed(obj, 5)
		}
		obj.direction.way = [0, 0, 0, 0, 0, 0] // reset to zero

	}
	set_NiceSpeed = (obj, type) => {
		if (type === 4) {//accelerate
			obj.velxyz.cx += obj.velxyz.cx >= 5 ? 0 : obj.velxyz.x
			obj.velxyz.cy += obj.velxyz.cy >= 5 ? 0 : obj.velxyz.y
			obj.velxyz.cz += obj.velxyz.cz >= 5 ? 0 : obj.velxyz.z
		}
		else if (type === 5) {// lower speed
			obj.velxyz.cx -= obj.velxyz.cx <= -2 ? 0 : obj.velxyz.x
			obj.velxyz.cy -= obj.velxyz.cy <= -2 ? 0 : obj.velxyz.y
			obj.velxyz.cz -= obj.velxyz.cz <= -2 ? 0 : obj.velxyz.z
		}
	}
	set_NiceDegrees = (obj, type) => {
		if (type === 3) {//left
			obj.direction.deg = (obj.direction.deg - obj.direction.agility) < 0 ? 360 - obj.direction.deg - obj.direction.agility : obj.direction.deg - obj.direction.agility
		}
		else if (type === 1) {//right
			obj.direction.deg = (obj.direction.deg + obj.direction.agility) >= 360 ? obj.direction.deg + obj.direction.agility - 360 : obj.direction.deg + obj.direction.agility
		}
		else if (type === 0) {//top
			// z rotation mean 3d ??
			obj.direction.degZ = (obj.direction.deg - obj.direction.agility) < 0 ? 360 - obj.direction.degZ - obj.direction.agility : obj.direction.degZ - obj.direction.agility
		}
		else if (type === 2) {//bottom
			// z rotation mean 3d ??
			obj.direction.degZ = (obj.direction.degZ + obj.direction.agility) >= 360 ? obj.direction.degZ + obj.direction.agility - 360 : obj.direction.degZ + obj.direction.agility
		}
	}
	set_NiceDirection = (obj) => {
		if (obj.direction.currentdelay < 1) {

			let marge = (360 / 8)
			let nex = this.DM.aleaEntreBornes(-obj.direction.agility, obj.direction.agility) * marge
			let nd = obj.direction.deg += nex

			nd = nd > 360 ? nd - 360 : nd
			nd = nd < 0 ? 360 - nd : nd
			obj.direction.deg = nd
		}
		obj.direction.currentdelay += 1
		if (obj.direction.currentdelay > obj.direction.delay) {
			obj.direction.currentdelay = 0
		}
	}
	get_distance = (a, b) => { // get hypotenus with pythaGore
		let AB = (a.posxyz.x + (a.sizwhl.w / 2)) - (b.posxyz.x + (b.sizwhl.w / 2))
		let AC = (a.posxyz.y + (a.sizwhl.h / 2)) - (b.posxyz.y + (b.sizwhl.h / 2))
		return Math.sqrt((AB * AB) + (AC * AC))
	}
	set_NicePosition_WithDegX = (obj) => {
		let ratioDir = parseInt(obj.direction.deg / 360 * 100000) / 100000 // 0.0 to 1
		let velocityX = obj.velxyz.cx
		let velocityY = obj.velxyz.cy
		// let velocityZ = obj.velxyz.cz

		// north
		if ((ratioDir > 0.9375 && ratioDir < 1) || (ratioDir >= 0 && ratioDir <= 0.0625)) { obj.direction.compass = "N"; obj.posxyz.y -= velocityY }
		// north est
		else if (ratioDir > 0.0625 && ratioDir <= 0.1875) { obj.direction.compass = "NE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y -= (velocityY / 2) }
		// est
		else if (ratioDir > 0.1875 && ratioDir <= 0.3125) { obj.direction.compass = "E"; obj.posxyz.x += velocityX }
		//south est
		else if (ratioDir > 0.3125 && ratioDir <= 0.4375) { obj.direction.compass = "SE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y += (velocityY / 2) }
		// south
		else if (ratioDir > 0.4375 && ratioDir <= 0.5625) { obj.direction.compass = "S"; obj.posxyz.y += velocityY }
		// south west
		else if (ratioDir > 0.5625 && ratioDir <= 0.6875) { obj.direction.compass = "SW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y += (velocityY / 2) }
		// west
		else if (ratioDir > 0.6875 && ratioDir <= 0.8125) { obj.direction.compass = "W"; obj.posxyz.x -= velocityX }
		// north 
		else if (ratioDir > 0.8125 && ratioDir <= 0.9375) { obj.direction.compass = "NW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y -= (velocityY / 2) }
		else {
			if (obj.objtype === 'player') {
				console.log(ratioDir)
				// console.log(ratioDir, 'C:'+obj.direction.compass, 'vx:' + obj.velxyz.cx, 'vy:' + obj.velxyz.cy)
				// console.log('C:' + obj.direction.compass, 'x:' + obj.posxyz.x, 'y:' + obj.posxyz.y, 'deg:' + obj.direction.deg, 'ratio:' + ratioDir)
			}
		}
		this.num++///??
	}
	check_PosOut(obj) {
		if (obj.posxyz.x > this.DM.IniDatas.cosmosSize.w) { obj.posxyz.x = 1 - obj.sizwhl.w }
		if (obj.posxyz.x <= 0 - obj.sizwhl.w) { obj.posxyz.x = this.DM.IniDatas.cosmosSize.w }
		if (obj.posxyz.y <= 0 - obj.sizwhl.h) { obj.posxyz.y = this.DM.IniDatas.cosmosSize.h }
		if (obj.posxyz.y > this.DM.IniDatas.cosmosSize.h + obj.sizwhl.h) { obj.posxyz.y = 1 }
		// else if (worldType === "closed") {
		// 	if (obj.posxyz.x < 0) { obj.posxyz.x = 0; ant.state[1] = "recenter" }
		// 	if (obj.posxyz.x >= playGroundSize.w - (obj.sizwhl.w2[0])) { obj.posxyz.x = playGroundSize.w - (obj.sizwhl.w2[0]); ant.state[1] = "recenter" }
		// 	if (obj.posxyz.y < 0) { obj.posxyz.y = 0; ant.state[1] = "recenter" }
		// 	if (obj.posxyz.y >= playGroundSize.h - (obj.sizwhl.w2[1])) { obj.posxyz.y = playGroundSize.h - (obj.sizwhl.w2[1]); ant.state[1] = "recenter" }
		// }
		// else if (worldType === "bounce") {
		// }
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

	// players
	getstars = (bnstars) => {
		let a = ""
		for (let ii = 0; ii < bnstars; ii++) {
			a += "⭐" //♥
		}
		return a
	}
	// keyboard

	PlayGo = (idx, dir) => {
		if (!this.pauseOn) {
			if (this.MF.mobs[idx].direction.way) {
				this.MF.mobs[idx].direction.way[dir] = 1;
			}
		}
	}
	animateCSS = (element, animation, remove = false, prefix = 'animate__') =>
		// thx to RainbowViking 
		// thx https://github.com/animate-css/animate.css/blob/main/docsSource/sections/04-javascript.md
		// We create a Promise and return it
		new Promise((resolve, reject) => {
			let animationName = `${prefix}${animation}`;
			let node = document.querySelector(element);
			node.classList.add(`${prefix}animated`, animationName);
			// When the animation ends, we clean the classes and resolve the Promise
			let handleAnimationEnd = (event) => {
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve('Animation ended');
				if (remove) { node.remove() }
			}
			node.addEventListener('animationend', handleAnimationEnd, { once: true });
		});

}
