"use strict";
class Ordinator {
	constructor() {
		this.posTest = false // testing new coordinates
		this.tutorialNum = 1
		this.tutorialFinish = false
		this.DM = new DivManager()
		this.num = 0
		this.currentSoundName = 'none'
		this.DM.appendChild_Cosmos()
		this.MF = new MobFactory(this.DM)
		this.gameOn = false
		this.pauseOn = false
		this.gameOver = false
		this.collidingRangeAColor = '#FFFFFF33'
		// this.theta = this.get_theta()

		// if(){
		// setInterval(this.renderScene, this.DM.IniDatas.renderinterval)
		// }
		this.addStartButtonListener()
		// this.animateHelpCSS('#splash', 'fadeOut', true).then((message) => {
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
		}
	}
	addStartButtonListener() {
		let startgame = document.getElementById('startgame')
		if (startgame) {
			startgame.addEventListener('click', () => {
				startgame.parentNode.remove();
				this.start()
				this.check_errors()
				this.DM.appendChild_Board() // menu test one
				this.DM.appendChild_Board2() // menu test two 
			})
		}

	}
	start() {
		this.MF.create_EveryBasics()
		// this.MF.mobs[0].status.immune = true
		// this.MF.mobs[0].statusdelay.immune = [1, 4050] //time in msec
		this.gameOn = true
		this.pauseOn = false
		this.tutorialFinish = false
		this.set_tutorial(1)
		setInterval(
			this.renderScene,
			this.DM.IniDatas.renderinterval
		)

	}
	escapeKey = () => {
		if (!this.tutorialFinish) { this.tutorialNum = 999 }
	}
	set_tutorial = (num) => {
		switch (num) {
			case 1:
				this.animateHelpCSS(0, 'right', false, 'Hi & Welcome to Orbital One').then((message) => {
					this.set_NiceSpeed(this.MF.mobs[0], 4) // speed up
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 2:
				this.animateHelpCSS(0, 'left', false, this.tutorialNum + '/15 This is your ship !').then((message) => {
					this.set_NiceSpeed(this.MF.mobs[0], 5) // slower speed
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 3:
				this.animateHelpCSS(0, 'right', false, this.tutorialNum + '/15 Let run a short training !').then((message) => {
					this.set_NiceSpeed(this.MF.mobs[0], 4) // speed up
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 4:
				this.animateHelpCSS(0, 'fadeOut2', false, this.tutorialNum + '/15 up & down arrows for throttle !').then((message) => {
					this.set_NiceSpeed(this.MF.mobs[0], 5) // slower speed
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 1) // rot left
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 5:
				this.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + '/15 Left & right arrows to Rotate !').then((message) => {
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 3)// rot right
					this.MF.mobs[0].collide.colliderangea = true
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 6:
				this.animateHelpCSS(0, 'fadeOut2', false, this.tutorialNum + "/15 Orange mean Danger !!").then((message) => {
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 1) // rot left
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 1) // rot left
					this.MF.mobs[0].collide.collidealert = true
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 7:
				this.animateHelpCSS(0, 'right', false, this.tutorialNum + "/15 Background Red mean imminent Danger !!").then((message) => {
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 3)// rot right
					this.MF.mobs[0].collide.collidealert = false
					this.MF.mobs[0].collide.colliderangea = false
					this.MF.mobs[0].status.immune = true
					this.MF.mobs[0].statusdelay.immune = [1, 50]
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 8:
				this.animateHelpCSS(0, 'left', false, this.tutorialNum + "/15 Flashing blue range mean u are immune !!").then((message) => {
					this.set_NiceDegrees_KeyPressed(this.MF.mobs[0], 3)// rot right
					this.MF.mobs[0].collide.colliderangea = true
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 9:
				this.animateHelpCSS(0, 'stock', false, this.tutorialNum + "/15 This is all your Ressources !").then((message) => {

					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 10:
				this.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + "/15 You'll need to gather some to survive.").then((message) => {
					this.MF.mobs[0].contact.social = [0, 0]
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 11:
				this.animateHelpCSS(0, 'right', false, this.tutorialNum + "/15 Move nearest other to share some stoks.").then((message) => {
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 12:
				this.animateHelpCSS(0, 'left', false, this.tutorialNum + '/15 Green range mean u have contact with nearby object !').then((message) => {
					this.MF.mobs[0].contact.social = false
					this.tutorialNum += 1
					this.tutorialFinish = true
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 13:
				this.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + '/15 Your on your own now !').then((message) => {
					// this.set_NiceSpeed(this.MF.mobs[0], 5)
					this.tutorialNum += 1
					this.tutorialFinish = true
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 14:
				this.animateHelpCSS(0, 'empty', false, this.tutorialNum + '/15 What else ?').then((message) => {
					// this.set_NiceSpeed(this.MF.mobs[0], 5)
					this.tutorialNum += 1
					this.set_tutorial(this.tutorialNum)
				});
				break;
			case 15:
				this.animateHelpCSS(0, 'right', true, this.tutorialNum + '/15 Oh  !! Removing Immunity. WATCH OUT !!! ').then((message) => {
					this.MF.mobs[0].status.immune = false
					this.MF.mobs[0].statusdelay.immune = [0, 0]
					this.MF.mobs[0].lv += 1
					console.log(this.MF.mobs[0])
				});
				break;
			default:
				this.animateHelpCSS(0, 'empty', true, 'No training today !').then((message) => {
					this.MF.mobs[0].status.immune = false
					this.MF.mobs[0].statusdelay.immune = [0, 0]
					this.tutorialFinish = true
					console.log(this.MF.mobs[0])
				});
				break;
		}
	}
	set_NewNicePosition_testing = (obj) => { // get hypotenus with pythaGore
		obj.direction.deg = (obj.direction.deg === 0) ? 360 : obj.direction.deg

		let x = obj.posxyz.x
		let y = obj.posxyz.y
		let d = obj.direction.deg
		let v = obj.velxyz.x

		let nextX = (1 * Math.cos(d)) + (1 * Math.sin(d))
		let nextY = (1 * Math.sin(d)) - (1 * Math.cos(d))

		// let nextX = (v * Math.cos(d))
		// let nextY = (v * Math.sin(d))

		// let nextZ = 
		obj.posxyz.x = x + parseInt(((nextX)) * 10) / 10
		obj.posxyz.y = y + parseInt(((nextY)) * 10) / 10

		console.log('from deg:' + d, 'x:' + x, 'y:' + y, 'v:' + v)
		console.log('to - deg:' + d, 'x:' + obj.posxyz.x, 'y:' + obj.posxyz.y, 'v:' + v)
		// obj.posxyz.z = nextZ

		// console.log(nextX, nextY, nextZ)
	}
	set_NewNicePosition_broken = (obj) => {
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
		if (this.gameOn) {
			if (!this.pauseOn && !this.gameOver) {
				this.reset_obj_tmp(this.MF.sobs)
				this.reset_obj_tmp(this.MF.mobs)
				this.mobsIA()
				this.DM.redrawAllMobs(this.MF.mobs)
				this.DM.redrawAllSobs(this.MF.sobs)
				// this.EarthIA() // to think about -> mission dealer ???
				// this.checkWinOrLoose() // to doooooo
				this.MF.mobs[0].status.dead ? this.gameOver = true : ''
			}
		}
	}
	reset_obj_tmp = (objs) => {
		for (let index = 0; index < objs.length; index++) {
			if (objs[index].objtype != 'player') {
				objs[index].collide = {
					collidesocial: false,
					colliderangea: false,
					collideself: false,
					collidealert: false
				}
				if (objs[index].contact) {
					objs[index].contact.social = []
					objs[index].contact.exchange = []
				}
			}
			if (objs[index].objtype === 'player' && this.tutorialFinish) {
				objs[index].collide = {
					collidesocial: false,
					colliderangea: false,
					collideself: false,
					collidealert: false
				}
				if (objs[index].contact) {
					objs[index].contact.social = []
					objs[index].contact.exchange = []
				}
			}
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
			errors.push(['get_NextOrbitPos', 'object has no parent immat'])
		}
	}
	mobsIA = () => {
		if (this.gameOn && !this.pauseOn) { // if game start
			for (let index = 0; index < this.MF.mobs.length; index++) {

				let obj = this.MF.mobs[index];

				if (obj.ia && !obj.parentimmat) {
					this.set_NewNiceDirection(obj)
					this.set_NewNicePosition_broken(obj)
					this.check_IsPosOutScreen(obj)
					if (!obj.status.immune) {
						// CHECK COLLiSION with mobs
						this.check_collisions(obj, 'mobs')
						// this.check_collisions(obj, 'sobs')
					}
				}
				else if (obj.objtype === 'player') {
					if (this.tutorialFinish) {
						if (!obj.status.immune) {
							// CHECK COLLiSION with mobs
							this.check_collisions(obj, 'mobs')
							this.check_collisions(obj, 'sobs')
							this.check_contacts(obj, 'mobs')
							this.check_contacts(obj, 'sobs')
							this.check_keyboardArrows(obj)
						}
					}
					if (this.posTest) {
						this.set_NewNicePosition_testing(obj)
					} else {
						this.set_NewNicePosition_broken(obj)
					}
					this.check_IsPosOutScreen(obj)
				}

			}
			for (let index = 0; index < this.MF.sobs.length; index++) {
				let obj = this.MF.sobs[index];
				if (obj.parentimmat && obj.direction) {
					this.get_NextOrbitPos(obj)
				}
			}
		}
	}
	check_contacts = (obj, typeobj) => {
		// CHECK COLLiSION with mobs
		this.MF[typeobj].forEach(objB => {

			// contact: { social: [], exchange: [] }
			if (objB.immat != obj.immat && objB.contact) {
				let distance = this.get_distance(obj, objB)
				// if (objB.contact.social) {
				// social range test
				let test = ((obj.ranges.social.d / 2) + (objB.ranges.social.d / 2));
				if (distance < test) {
					obj.contact.social = [0, true];
					objB.contact.social = [0, true];
					console.log('contact with :', objB.immat, objB.objname)
					console.log('x', (test ? 'true' : 'false'), '<', ((obj.ranges.social.d / 2) + (objB.ranges.social.d / 2)))
				}
				// }
			}
		});
	}

	check_collisions = (obj, typeobj) => {
		let alertedistancebeforedie = 30
		// CHECK COLLiSION with mobs
		this.MF[typeobj].forEach(objB => {
			if (objB.immat != obj.immat) {
				let distance = this.get_distance(obj, objB);
				// die alert range test only for player right now
				if (obj.objtype === 'player') {
					// self range test (explode condition here)
					(distance < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2)))
						? obj.collide.collideself = true
						: '';
				}
				((distance - alertedistancebeforedie) < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2)))
					? obj.collide.collidealert = true
					: '';
				// rangea test
				(distance < ((obj.sizwhl.w * 2) + (objB.sizwhl.w)))
					? obj.collide.colliderangea = true
					: '';
				this.check_collisionsDirectives(obj, objB)
			}
		});
	}

	check_collisionsDirectives = (obj, objB) => {

		// if (obj.collide.collidesocial) {
		// }else 
		// if (obj.collide.colliderangea) {
		// 	// console.log('yes')
		// 	// rangeacolorsave is temporary
		// 	if (!objB.rangeacolorsave) {
		// 		objB.rangeacolorsave = objB.rangeacolor;
		// 		console.log(objB.objname + ' en approche... ' + objB.textcontent)
		// 		objB.rangeacolor = this.collidingRangeAColor
		// 	}
		// 	// rangeacolorsave is temporary
		// 	if (!obj.rangeacolorsave) {
		// 		obj.rangeacolorsave = obj.rangeacolor;
		// 		obj.rangeacolor = this.collidingRangeAColor
		// 	}
		// }
		// else {
		// 	// console.log('non')
		// 	if (!objB.rangeacolorsave === false) {
		// 		objB.rangeacolor = objB.rangeacolorsave
		// 		objB.rangeacolorsave = false
		// 	}
		// 	if (!obj.rangeacolorsave === false) {
		// 		obj.rangeacolor = obj.rangeacolorsave
		// 		obj.rangeacolorsave = false
		// 	}
		// }

		if (obj.collide.collideself) {
			obj.status.dead = true
			console.log('ooops ! Lost in spaaaaaace !!')
			console.log('obj.status.dead:' + obj.status.dead)
			// this.gameOn = false
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
		// if (type === 0) { //top
		// 	// z rotation mean 3d ??
		// 	obj.direction.degZ = (obj.direction.degZ - obj.direction.agility) <= 0 ? 360 - obj.direction.degZ - obj.direction.agility : obj.direction.degZ - obj.direction.agility
		// }
		if (type === 1) { //right
			obj.direction.deg = (obj.direction.deg + obj.direction.agility) > 360 ? obj.direction.deg + obj.direction.agility - 360 : obj.direction.deg + obj.direction.agility
		}
		// else if (type === 2) {//bottom
		// 	// z rotation mean 3d ??
		// 	obj.direction.degZ = (obj.direction.degZ + obj.direction.agility) > 360 ? obj.direction.degZ + obj.direction.agility - 360 : obj.direction.degZ + obj.direction.agility
		// }
		else if (type === 3) { //left
			obj.direction.deg = (obj.direction.deg - obj.direction.agility) <= 0 ? obj.direction.deg - obj.direction.agility + 360 : obj.direction.deg - obj.direction.agility
		}
		// if errors
		if (obj.direction.deg < 0 || obj.direction.deg > 360) {
			obj.direction.deg = 360
			errors.push(['set_NiceDegrees_KeyPressed', obj.direction.deg + ' out of range'])
		}
		// console.log(obj.direction.deg)
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

		if (obj.direction.currentdelay === 0) {
			// console.log('acting', obj.objtype, obj.direction)
			let newdir = this.DM.aleaEntreBornes(1, 2) === 1 ? 22.5 : -22.5;
			// let marge = (360 / 8)
			let nd = obj.direction.deg += newdir

			nd = (nd > 360) ? (nd - 360) : nd;
			nd = (nd <= 0) ? (360 - nd) : nd;
			obj.direction.deg = nd;
			if (obj.direction.deg < 0 || obj.direction.deg > 360) {
				obj.direction.deg = 360
				errors.push('newdir set_NewNiceDirection : ' + obj.direction.deg + '-' + obj.objtype + '-' + ' immat:' + obj.immat)
			}
			// console.log('sorting new direction : ' + obj.direction.deg)
		}
		obj.direction.currentdelay += 1
		if (obj.direction.currentdelay >= obj.direction.delay) {
			obj.direction.currentdelay = 0
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
	check_IsPosOutScreen(obj) {
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
		if (this.gameOn) {
			if (this.tutorialFinish === true) {
				if (this.pauseOn === true) {
					this.pauseOn = false
					document.getElementById('pause').classList.remove('active')
				} else {
					this.pauseOn = true
					document.getElementById('pause').classList.add('active')
					console.log('Game paused!!')
				}
			} else {
				console.log('No pause permited during tutorial !')
			}
		} else {
			console.log('Game not started')
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
	PlayGo = (idx, dir, help = false) => {
		if ((!this.pauseOn && this.gameOn && this.tutorialFinish)) {// || help
			if (this.MF.mobs[idx].direction.way) {
				this.MF.mobs[idx].direction.way[dir] = 1;
			}
		}
	}
	// add className to div and remove it after animation end and delete tag or not 
	animateHelpCSS = (immat, animation, remove = false, consoletext, prefix = 'animate__') =>
		// thx to friends
		// & thx https://github.com/animate-css/animate.css/blob/main/docsSource/sections/04-javascript.md
		// We create a Promise and return it
		new Promise((resolve, reject) => {
			let element = '#help-' + immat
			let animationName = `${prefix}${animation}`;
			let node = document.querySelector(element);
			node.classList.add(`${prefix}animated`, animationName);
			let elementcontent = '#helptxt-' + immat
			let txt = document.querySelector(elementcontent);
			consoletext ? txt.textContent = consoletext : 'Empty message ?'
			// When the animation ends, we clean the classes and resolve the Promise
			let handleAnimationEnd = (event) => {
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve('help done !');
				if (remove) { node.remove() }
			}
			node.addEventListener('animationend', handleAnimationEnd, { once: false });
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
}
