"use strict";
class Ordinator {
	constructor() {
		this.DM = new DivManager()
		this.num = 0
		this.currentSoundName = 'none'
		this.DM.appendChild_Cosmos()
		this.MF = new MobFactory(this.DM)
		// this.theta = this.get_theta()

		// if(){
		// setInterval(this.renderScene, this.DM.IniDatas.renderinterval)
		// }
		this.addStartButtonListener()
		// this.animateCSS('#splash', 'fadeOut', true).then((message) => {
		// 	// Do something after the animation
		// 	this.start()
		// 	this.check_errors()
		// 	this.DM.appendChild_Board()
		// 	this.DM.appendChild_Board2()
		// });
	}
	check_errors() {
		// errors.push(['check_errors', 'test'])
		if (errors.length > 0) {
			console.log(errors.length + ' error' + (errors.length > 1 ? 's' : ''))
			for (let index = 0; index < errors.length; index++) {
				console.log(errors[index])
			}
			console.log('gameOn = false')
			this.gameOn = false
			this.pauseOn = false
		}
	}
	addStartButtonListener() {
		let startgame = document.getElementById('startgame')
		if (startgame) {
			startgame.addEventListener('click', () => {
				this.start()
				this.check_errors()
				this.DM.appendChild_Board()
				this.DM.appendChild_Board2()
				startgame.parentNode.remove();
			})
		}

	}
	start() {
		this.MF.create_EveryBasics()
		this.gameOn = true
		this.pauseOn = false
		setInterval(
			this.renderScene,
			this.DM.IniDatas.renderinterval
		)
		this.animateCSS('#help-0', 'fadeOut', true).then((message) => {// Do something after the animation
			console.log(message)
			this.set_NiceSpeed(this.MF.mobs[0], 4)
		});

	}
	get_xyzFromXYDeg = (obj) => { // get hypotenus with pythaGore
		let x = obj.posxyz.x
		let y = obj.posxyz.y
		let z = obj.posxyz.z
		let degx = obj.direction.deg
		let degz = obj.direction.degZ
		let distance = obj.velxyz.x
		let nextX = x + parseInt(((1 * Math.cos(degx))) * 10) / 10
		let nextY = y + parseInt(((1 * Math.cos(degx))) * 10) / 10
		// let nextZ = 
		obj.posxyz.x = nextX
		obj.posxyz.y = nextY
		// obj.posxyz.z = nextZ

		// console.log(nextX, nextY, nextZ)
	}
	set_NicePosition_WithDegX = (obj) => {
		let ratioDir = parseInt(obj.direction.deg / 360 * 100000) / 100000 // 0.0 to 1
		let velocityX = obj.velxyz.cx
		let velocityY = obj.velxyz.cy
		// let velocityZ = obj.velxyz.cz

		// if (obj.objtype === 'player') {
		// console.log('deg:' + obj.direction.deg + ' ratioDir:' + ratioDir)
		// console.log(ratioDir, 'C:'+obj.direction.compass, 'vx:' + obj.velxyz.cx, 'vy:' + obj.velxyz.cy)
		// console.log('C:' + obj.direction.compass, 'x:' + obj.posxyz.x, 'y:' + obj.posxyz.y, 'deg:' + obj.direction.deg, 'ratio:' + ratioDir)
		// }
		// north
		if ((ratioDir > 0.9375 && ratioDir <= 1) || (ratioDir >= 0 && ratioDir <= 0.0625)) { obj.direction.compass = "N"; obj.posxyz.y -= velocityY }
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
		else if (ratioDir > 0.8125 && ratioDir <= 0.9375) {
			obj.direction.compass = "NW";
			obj.posxyz.x -= (velocityX / 2);
			obj.posxyz.y -= (velocityY / 2)
		}
		else {
			console.log('bug coord deg & ratio', ratioDir, obj.direction.deg)
		}
		this.num++///??

	}
	//--
	getNextPos = (obj) => {
		// honestly !!! dont remember what that for ? orbital ?
		let x = obj.posxyz.x
		let y = obj.posxyz.y
		let nxX = (x * Math.cos(obj.direction.deg)) - (y * Math.sin(obj.direction.deg))
		let nxY = (x * Math.sin(obj.direction.deg)) + (y * Math.cos(obj.direction.deg))
		obj.posxyz.x = nxX
		obj.posxyz.y = nxY
		// obj.posxyz.z = (x * Math.sin(obj.direction.degZ)) + (z * Math.cos(obj.direction.degZ))
		// console.log(obj.posxyz.x, obj.posxyz.y)
		// console.log(x, nxX, y, nxY)
	}
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
				console.log('player check orbital force')
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
				let collide = false;

				if (obj.ia && !obj.parentimmat) {
					this.set_NewNiceDirection(obj)
					this.set_NicePosition_WithDegX(obj)
					this.check_PosOut(obj)
				}
				// else if (obj.objtype === 'player') {//ia && obj.direction) {
				// 	this.set_NewNiceDirection(obj)
				// 	this.set_NicePosition_WithDegX(obj)
				// 	this.check_PosOut(obj)
				// }
				else if (obj.objtype === 'player') {

					// CHECK COLLiSION with mobs
					this.MF.mobs.forEach(mobB => {
						if (mobB.immat != obj.immat) {
							// console.log(mobB.immat)
							collide = this.isOverlappingZone(obj, mobB)
							obj.collide = collide
							mobB.collide = collide

							if (collide) {
								// rangeacolorsave is temporary
								if (!mobB.rangeacolorsave) {
									mobB.rangeacolorsave = mobB.rangeacolor;
									console.log('OOOoups colliding with :', mobB)
									mobB.rangeacolor = '#FFFFFF33'
								}
							}
							else {
								if (!mobB.rangeacolorsave === false) {
									mobB.rangeacolor = mobB.rangeacolorsave
									mobB.rangeacolorsave = false
								}
							}
						}
					});

					this.check_keyboardArrows(obj)

					// this.get_xyzFromXYDeg(obj)
					// or
					this.set_NicePosition_WithDegX(obj)

					this.check_PosOut(obj)
				}
				// else if (obj.parentimmat && obj.direction) {
				// 	this.set_NewNiceDirection(obj)
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
			this.set_NiceDegrees_KeyPressed(obj, 0)
		}
		if (obj.direction.way[1] === 1) { // right
			this.set_NiceDegrees_KeyPressed(obj, 1)
		}
		if (obj.direction.way[2] === 1) { // down
			this.set_NiceDegrees_KeyPressed(obj, 2)
		}
		if (obj.direction.way[3] === 1) { // left
			this.set_NiceDegrees_KeyPressed(obj, 3)
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
	set_NiceDegrees_KeyPressed = (obj, type) => {
		if (type === 0) { //top
			// z rotation mean 3d ??
			obj.direction.degZ = (obj.direction.deg - obj.direction.agility) <= 0 ? 360 - obj.direction.degZ - obj.direction.agility : obj.direction.degZ - obj.direction.agility
		}
		else if (type === 1) { //right
			obj.direction.deg = (obj.direction.deg + obj.direction.agility) > 360 ? obj.direction.deg + obj.direction.agility - 360 : obj.direction.deg + obj.direction.agility
		}
		else if (type === 2) {//bottom
			// z rotation mean 3d ??
			obj.direction.degZ = (obj.direction.degZ + obj.direction.agility) > 360 ? obj.direction.degZ + obj.direction.agility - 360 : obj.direction.degZ + obj.direction.agility
		}
		else if (type === 3) { //left
			obj.direction.deg = (obj.direction.deg - obj.direction.agility) <= 0 ? 360 - obj.direction.deg - obj.direction.agility : obj.direction.deg - obj.direction.agility
		}
		// if errors
		if (obj.direction.deg < 0 || obj.direction.deg > 360) { errors.push(['set_NiceDegrees_KeyPressed', obj.direction.deg + ' out of range']) }
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
		if (obj.objtype === 'player') {
			//anime des moteurs à propulsion quantique
			let prop = document.getElementById('propulsion-' + obj.immat)
			if (prop) { prop.className = "propulsion prop" + obj.velxyz.cx }
			// anime speed meter
			let speedboard2 = document.getElementById('speedboard2')
			if (speedboard2) { speedboard2.className = "prop" + obj.velxyz.cx }
			// anime speed meter visual test
			let speedboard = document.getElementById('speedvisual')
			if (speedboard) { speedboard.className = "prop" + obj.velxyz.cx }
		}
	}
	set_NewNiceDirection = (obj) => {
		if (obj.direction.currentdelay < 1) {

			let marge = (360 / 8)
			let nex = this.DM.aleaEntreBornes(-obj.direction.agility, obj.direction.agility) + marge
			let nd = obj.direction.deg += nex

			nd = (nd > 360) ? (nd - 360) : nd;
			nd = (nd <= 0) ? (360 - nd) : nd;
			obj.direction.deg = nd;
			obj.direction.currentdelay += 1
			if (obj.direction.currentdelay > obj.direction.delay) {
				obj.direction.currentdelay = 0
			}
			if (obj.direction.deg < 0 || obj.direction.deg > 360) {
				errors.push('newdir set_NewNiceDirection : ' + obj.direction.deg + '-' + obj.objtype + '-' + ' immat:' + obj.immat)
			}
		}
	}
	get_distance = (a, b) => { // get hypotenus with pythaGore
		let AB = (a.posxyz.x + (a.sizwhl.w / 2)) - (b.posxyz.x + (b.sizwhl.w / 2))
		let AC = (a.posxyz.y + (a.sizwhl.h / 2)) - (b.posxyz.y + (b.sizwhl.h / 2))
		return Math.sqrt((AB * AB) + (AC * AC))
	}
	// check if obj xyz is out of cosmos to replace it or not
	// care with orbital that have to go out of cosmos
	// this will only check mobs and not sobs (obs ia dont call this)
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
		// todo 
		// reverse degrees
		// }
	}
	// Pause game
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
	// add className to div and remove it after animation end and delete tag or not 
	animateCSS = (element, animation, remove = false, consoletext, prefix = 'animate__') =>
		// thx to friends
		// & thx https://github.com/animate-css/animate.css/blob/main/docsSource/sections/04-javascript.md
		// We create a Promise and return it
		new Promise((resolve, reject) => {
			let animationName = `${prefix}${animation}`;
			let node = document.querySelector(element);
			node.classList.add(`${prefix}animated`, animationName);
			// When the animation ends, we clean the classes and resolve the Promise
			let handleAnimationEnd = (event) => {
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve('Propulsion on lv1 Captain !');
				if (remove) { node.remove() }
			}
			node.addEventListener('animationend', handleAnimationEnd, { once: true });
		});

	playSpeedSounds = (obj) => {
		let speed = obj.velxyz.x
		if (speed) {
			let speedsounds = {
				// thx to soundjay https://www.soundjay.com/beep-sounds-3.html
				'sound-2': ['beep-07a.mp3', false],
				'sound-1': ['beep-07a.mp3', false],
				'sound0': false,
				'sound1': false,
				'sound2': false,
				'sound3': false,
				'sound4': false,
				'sound5': false
			}
			if (speedsounds[speed] && speedsounds[speed][0]) {
				let soundName = 'sound' + speedsounds[speed][0]
				// if this is different from current sound
				if (soundName != this.currentSoundName) {
					var audio = new Audio(speedsounds[soundName]);
					audio.loop = speedsounds[speed][1] ?? false

					audio.oncanplaythrough = function () {
						audio.play();
					}
					audio.onended = function () {
						audio.play();
					}
					this.currentSoundName = soundName
				}
			}
		}
	}


	isOverlappingZone = (() => {
		// moins rapide
		function getAreaA(obj, range = "rangea") {
			let divZone = document.getElementById(range + obj.div + '-' + obj.immat).getBoundingClientRect()
			let area = [
				[
					parseInt(divZone.left),
					parseInt(divZone.left + divZone.width)
				], [
					parseInt(divZone.top),
					parseInt(divZone.top + divZone.height)
				]
			];
			return area
		}
		// plus rapide ??
		function getArea(obj) {
			let area = [
				[
					obj.posxyz.x,
					obj.posxyz.x + obj.sizwhl.w
				], [
					obj.posxyz.y,
					obj.posxyz.y + obj.sizwhl.h
				]
			];
			return area
		}
		// autre pour avoir un carcle 
		function getcenter(obj) {
			let center = [
				obj.posxyz.x + (obj.sizwhl.w / 2),
				obj.posxyz.y + (obj.sizwhl.h / 2)
			];
			return center
		}
		function compareAreas(areaA, areaB) {
			// var dist1 = areaA[0] < areaB[0] ? areaA : areaB;
			// var dist2 = areaA[0] < areaB[0] ? areaB : areaA;
			// console.log('+++++++++++++++++++++++++')
			// console.log('areaA ', areaA[0], areaA[1])
			// console.log('areaB ', areaB[0], areaB[1])
			let conditionX0in = (areaB[0][0] < areaA[0][0] && areaA[0][0] < areaB[0][1])
			let conditionX1in = (areaB[0][0] < areaA[0][1] && areaA[0][1] < areaB[0][1])
			let conditionY0in = (areaB[1][0] < areaA[1][0] && areaA[1][0] < areaB[1][1])
			let conditionY1in = (areaB[1][0] < areaA[1][1] && areaA[1][1] < areaB[1][1])
			let isin = (
				(conditionX0in && conditionY0in) ||
				(conditionX1in && conditionY0in) ||
				(conditionX0in && conditionY1in) ||
				(conditionX1in && conditionY1in)
			)
			if (isin) {
				console.log('hg:' + conditionX0in, 'hd:' + conditionX1in, 'bg:' + conditionY0in, 'bd:' + conditionY1in)
			}
			return isin
		}
		return function (mobA, mobB) {
			let isin = compareAreas(getAreaA(mobA, "rangea"), getAreaA(mobB, "rangea"))
			return isin
		};
	})(
		// ???
	);
}
