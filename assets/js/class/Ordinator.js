"use strict";
class Ordinator {
	constructor() {
		this.posTest = false // testing new coordinates
		this.DM = new DivManager()
		this.MF = new MobFactory(this.DM)
		this.Physic = new Physic(this.MF, this.DM)
		this.Tutorial = new Tutorial(this)
		this.PlayerController = new PlayerController(this)
		this.num = 0
		this.currentSoundName = 'none'
		this.DM.appendChild_Cosmos()
		this.MF = new MobFactory(this.DM)
		this.gameOn = false
		this.pauseOn = false
		this.gameOver = false
		this.collidingRangeAColor = '#FFFFFF33'
		this.invertedscreencoolor = false
		this.mobiletouch = false
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
		let starter = document.getElementById('starter')
		if (startgame) {
			startgame.addEventListener('click', () => {
				// startgame.parentNode.remove();
				starter.textContent = ''
				this.start()
				this.check_errors()
				this.invertmobiletouch()
				// this.DM.appendChild_Board() // menu test one
				this.DM.appendChild_Board2() // menu test two 
				this.DM.appendChild_Bonus() // menu test two 
			})
		}

	}
	start() {
		this.MF.create_EveryBasics()
		this.gameOn = true
		this.pauseOn = false
		this.Tutorial.tutorialFinish = false
		this.Tutorial.set_tutorial(1)
		setInterval(
			this.renderScene,
			this.DM.IniDatas.renderinterval
		)

	}
	escapeKey = () => {
		this.Tutorial.tutorialNum = 999
	}
	invertScreenColor = () => {
		if (this.invertedscreencoolor) {
			this.invertedscreencoolor = false
			document.getElementById('lunar').classList.remove('invertedscreencoolor')
		} else {
			this.invertedscreencoolor = true
			document.getElementById('lunar').classList.add('invertedscreencoolor')
		}
	}
	invertmobiletouch = () => {
		let touchdir = document.getElementById('touchdir')
		if (this.mobiletouch) {
			this.mobiletouch = false
			touchdir.classList.remove('active')
		} else {
			this.mobiletouch = true
			touchdir.classList.add('active')
		}
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
	checkStatusDelay = (obj) => {
		if (obj.status.immune && obj.statusdelay.immune[1] > 0) {
			obj.statusdelay.immune[0] += 1
			if (obj.statusdelay.immune[0] >= obj.statusdelay.immune[1]) {
				obj.statusdelay.immune = [0, 0]
				obj.status.immune = false
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
			if (objs[index].objtype === 'player' && this.Tutorial.tutorialFinish) {
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
	mobsIA = () => {
		if (this.gameOn && !this.pauseOn) { // if game start
			for (let index = 0; index < this.MF.mobs.length; index++) {

				let obj = this.MF.mobs[index];


				if (obj.ia && !obj.parentimmat) {
					this.Physic.set_NewNiceDirection(obj)
					this.Physic.set_NewNicePosition_broken(obj)
					this.Physic.check_IsPosOutScreen(obj)
					if (!obj.status.immune) {
						// CHECK COLLiSION with mobs
						this.Physic.check_collisions(obj, 'mobs')
						// this.check_collisions(obj, 'sobs')
					}
				}
				else if (obj.objtype === 'player') {
					if (this.Tutorial.tutorialFinish) {
						if (!obj.status.immune) {
							// CHECK COLLiSION with mobs
							this.Physic.check_collisions(obj, 'mobs')
							this.Physic.check_collisions(obj, 'sobs')
						}
						this.check_contacts(obj, 'mobs')
						this.check_contacts(obj, 'sobs')
						this.PlayerController.check_keyboardArrows(obj)
					} else {
						// console.log('tuto not ended')
					}
					if (this.posTest) {
						this.Physic.set_NewNicePosition_testing(obj)
					} else {
						this.Physic.set_NewNicePosition_broken(obj)
					}
					this.Physic.check_IsPosOutScreen(obj)
				}

				this.checkStatusDelay(obj)
			}
			for (let index = 0; index < this.MF.sobs.length; index++) {
				let obj = this.MF.sobs[index];
				if (obj.parentimmat && obj.direction) {
					this.Physic.get_NextOrbitPos(obj)
				}
			}
		}
	}
	get_bonus = (type) => {
		if (this.gameOn && this.Tutorial.tutorialFinish && !this.gameOver && !this.MF.mobs[0].status.dead) {
			switch (type) {
				case 'immune':
					this.MF.mobs[0].status.immune = true
					this.MF.mobs[0].statusdelay.immune = [0, 1000]
					break;
				default:
					break;
			}
		}
	}
	check_contacts = (obj, typeobj) => {
		// CHECK COLLiSION with mobs
		this.MF[typeobj].forEach(objB => {

			// contact: { social: [], exchange: [] }
			if (objB.immat != obj.immat && objB.contact) {
				let distance = this.Physic.get_distance(obj, objB)
				// if (objB.contact.social) {
				// social range test
				let test = ((obj.ranges.social.d / 2) + (objB.ranges.social.d / 2));
				if (distance < test) {
					obj.contact.social = [0, objB.immat, objB.name];
					objB.contact.social = [0, 0, 0];
					// console.log('contact with :', objB.immat, objB.objname)
					// console.log('x', (test ? 'true' : 'false'), '<', ((obj.ranges.social.d / 2) + (objB.ranges.social.d / 2)))
				}
				// }
			}
		});
	}
	// Pause game
	setPause() {
		if (this.gameOn) {
			if (this.Tutorial.tutorialFinish === true) {
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
