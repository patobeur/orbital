"use strict";

class Ordinator {
	constructor() {
		this.posTest = false;
		this.DM = new DivManager();
		this.MF = new MobFactory(this.DM);
		this.Physic = new Physic(this.MF, this.DM);
		this.Tutorial = new Tutorial(this);
		this.PlayerController = new PlayerController(this);
		this.gameOn = false;
		this.pauseOn = false;
		this.gameOver = false;
		this.invertedscreencoolor = false;
		this.mobiletouch = false;

		this.DM.appendChild_Cosmos();
		this.addStartButtonListener();
	}

	harvest_resource = () => {
		// si il y a une ressource proche alors les ressources sont recupérés et additionés au stock du joueur.
		// la ressources disparait une fois récupéré.
	};
	addStartButtonListener() {
		let startgame = document.getElementById("startgame");
		let starter = document.getElementById("starter");
		if (startgame) {
			startgame.addEventListener("click", () => {
				starter.textContent = "";
				this.start();
				this.invertmobiletouch();
				this.DM.appendChild_Board2();
				this.DM.appendChild_Bonus();
			});
		}
	}

	start() {
		this.MF.create_EveryBasics();
		this.gameOn = true;
		this.pauseOn = false;
		this.Tutorial.tutorialFinish = false;
		this.Tutorial.set_tutorial(1);
		setInterval(this.renderScene, this.DM.IniDatas.renderinterval);
	}

	escapeKey = () => {
		this.Tutorial.tutorialNum = 999;
	};

	invertScreenColor = () => {
		this.invertedscreencoolor = !this.invertedscreencoolor;
		document.getElementById("lunar").classList.toggle("invertedscreencoolor");
	};

	invertmobiletouch = () => {
		this.mobiletouch = !this.mobiletouch;
		document.getElementById("touchdir").classList.toggle("active");
	};

	renderScene = () => {
		if (this.gameOn && !this.pauseOn && !this.gameOver) {
			this.reset_obj_tmp(this.MF.sobs);
			this.reset_obj_tmp(this.MF.mobs);
			this.mobsIA();
			this.DM.redrawAllMobs(this.MF.mobs);
			this.DM.redrawAllSobs(this.MF.sobs);
			if (this.MF.mobs[0] && this.MF.mobs[0].status.dead) {
				this.gameOver = true;
			}
		}
	};

	check_proximities = (obj, typeobj) => {
		let proxim_resource = false;
		this.MF[typeobj].forEach((objB) => {
			if (objB.immat != obj.immat && objB.objtype === "fruits") {
				let distance = this.Physic.get_distance(obj, objB);
				let test = obj.ranges.social.d / 2 + objB.ranges.social.d / 2;

				if (distance < test) {
					proxim_resource = true;
					objB.proxim = [true, objB.immat, objB.name];
					this.DM.UiManager.harvest_Proximities(objB);
				} else {
					objB.proxim = [false, objB.immat, objB.name];
					this.DM.UiManager.harvest_Proximities(objB);
				}
			}
		});
		this.MF.mobs[0].proxim_resource = proxim_resource;
	};

	checkStatusDelay = (obj) => {
		if (obj.status.immune && obj.statusdelay.immune[1] > 0) {
			obj.statusdelay.immune[0] += 1;
			if (obj.statusdelay.immune[0] >= obj.statusdelay.immune[1]) {
				obj.statusdelay.immune = [0, 0];
				obj.status.immune = false;
			}
		}
	};

	reset_obj_tmp = (objs) => {
		for (let index = 0; index < objs.length; index++) {
			if (
				objs[index].objtype != "player" ||
				(objs[index].objtype === "player" && this.Tutorial.tutorialFinish)
			) {
				objs[index].collide = {
					collidesocial: false,
					colliderangea: false,
					collideself: false,
					collidealert: false,
				};
				if (objs[index].contact) {
					objs[index].contact.social = [];
					objs[index].contact.exchange = [];
				}
			}
		}
	};

	mobsIA = () => {
		if (this.gameOn && !this.pauseOn) {
			for (let index = 0; index < this.MF.mobs.length; index++) {
				let obj = this.MF.mobs[index];
				if (obj.ia && !obj.parentimmat) {
					if (obj.proxim && !obj.proxim[0]) {
						this.Physic.set_NewNiceDirection(obj);
						this.Physic.set_NewNicePosition_broken(obj);
					}
					this.Physic.check_IsPosOutScreen(obj);
					if (!obj.status.immune) {
						this.Physic.check_collisions(obj, "mobs");
					}
				} else if (obj.objtype === "player") {
					if (this.Tutorial.tutorialFinish) {
						if (!obj.status.immune) {
							this.Physic.check_collisions(obj, "mobs");
							this.Physic.check_collisions(obj, "sobs");
						}
						this.check_contacts(obj, "mobs");
						this.check_contacts(obj, "sobs");
						this.check_proximities(obj, "mobs");
						this.PlayerController.check_keyboardArrows(obj);
					}
					if (this.posTest) {
						this.Physic.set_NewNicePosition_testing(obj);
					} else {
						this.Physic.set_NewNicePosition_broken(obj);
					}
					this.Physic.check_IsPosOutScreen(obj);
				}
				this.checkStatusDelay(obj);
			}
			for (let index = 0; index < this.MF.sobs.length; index++) {
				let obj = this.MF.sobs[index];
				if (obj.parentimmat && obj.direction) {
					this.Physic.get_NextOrbitPos(obj);
				}
			}
		}
	};

	get_bonus = (type) => {
		if (
			this.gameOn &&
			this.Tutorial.tutorialFinish &&
			!this.gameOver &&
			this.MF.mobs[0] &&
			!this.MF.mobs[0].status.dead
		) {
			if (type === "immune") {
				this.MF.mobs[0].status.immune = true;
				this.MF.mobs[0].statusdelay.immune = [0, 1000];
			}
		}
	};

	check_contacts = (obj, typeobj) => {
		this.MF[typeobj].forEach((objB) => {
			if (objB.immat != obj.immat && objB.contact) {
				let distance = this.Physic.get_distance(obj, objB);
				let test = obj.ranges.social.d / 2 + objB.ranges.social.d / 2;
				if (distance < test) {
					obj.contact.social = [0, objB.immat, objB.name];
					objB.contact.social = [0, 0, 0];
				}
			}
		});
	};

	setPause() {
		if (this.gameOn && this.Tutorial.tutorialFinish) {
			this.pauseOn = !this.pauseOn;
			document.getElementById("pause").classList.toggle("active");
		}
	}

	animateHelpCSS = (
		immat,
		animation,
		remove = false,
		consoletext,
		prefix = "animate__"
	) =>
		new Promise((resolve, reject) => {
			let element = "#help-" + immat;
			let animationName = `${prefix}${animation}`;
			let node = document.querySelector(element);
			node.classList.add(`${prefix}animated`, animationName);
			let elementcontent = "#helptxt-" + immat;
			let txt = document.querySelector(elementcontent);
			consoletext ? (txt.textContent = consoletext) : "Empty message ?";
			let handleAnimationEnd = (event) => {
				event.stopPropagation();
				node.classList.remove(`${prefix}animated`, animationName);
				resolve("help done !");
				if (remove) {
					node.remove();
				}
			};
			node.addEventListener("animationend", handleAnimationEnd, {
				once: false,
			});
		});
}
