"use strict";
// -----------------------------
class DivManager {
	constructor() {
		console.log('DivManager')
		this.lunarDiv = this.checkAndGet_LunarDiv()
		this.IniDatas = this.get_IniDatas()
		this.cosmosDiv = Object
		this.sobsDiv = Object // all static objects goes here
		this.mobsDiv = Object // all mobile objects goes here
		// this.moonDiv = Object// = document.getElementById('moonr')

		this.cssMaker()

	}
	cssMaker = () => {
		let stringcss = '.sob,.mob {position: absolute;display: flex;align-items: center;justify-content: center;line-height: 100%;}'
		// stringcss += '.sob{z-index: -1;}'
		stringcss += '* {outline: var(--outlined);}'
		stringcss += '.datas {background-color:rgba(255, 255, 255, 0.4);}'
		stringcss += '.gravity {background-color: rgba(255, 255, 255, 0.05);}'
		stringcss += '.center {position: absolute;width: 1px;height: 1px;background-color: rgb(0, 0, 0);}'
		this.addCss(stringcss, 'sob-mob')
	}
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	get_IniDatas = () => {
		let screenborder = { w: 32, h: 32 }
		let renderinterval = 30 // render speed 1ms * 30

		this.lunarDiv.style.position = "relative";
		this.lunarDiv.style.width = "100%";
		this.lunarDiv.style.height = "100vh";
		this.lunarDiv.style.minWidth = "100%";
		this.lunarDiv.style.minHeight = "100vh";
		this.lunarDiv.style.backgroundColor = "rgb(6, 5, 12)";
		// this.lunarDiv.style.perspective = "100vh";
		this.lunarDiv.style.overflow = "hidden";
		//get 
		let lunarzone = document.getElementById('lunar').getBoundingClientRect()

		return {
			px: 'px',
			pt: '%',
			rem: 'rem',
			renderinterval: renderinterval,
			screenborder: screenborder, // twice the value in pixels
			cosmosSize: { 'w': lunarzone.width - (screenborder.w * 2), 'h': lunarzone.height - (screenborder.h * 2) }
		}
	}
	checkAndGet_LunarDiv = () => {
		this.lunarDiv = document.getElementById('lunar')
		return this.lunarDiv ?? false
	}
	appendChild_Cosmos() {
		let cosmos = document.createElement('div')
		cosmos.id = 'cosmos';
		cosmos.className = ''
		cosmos.style.width = this.IniDatas.cosmosSize.w + this.IniDatas.px
		cosmos.style.height = this.IniDatas.cosmosSize.h + this.IniDatas.px
		cosmos.style.minWidth = this.IniDatas.cosmosSize.w + this.IniDatas.px
		cosmos.style.minHeight = this.IniDatas.cosmosSize.h + this.IniDatas.px
		cosmos.style.marginLeft = this.IniDatas.screenborder.w + this.IniDatas.px
		cosmos.style.marginTop = this.IniDatas.screenborder.h + this.IniDatas.px
		cosmos.style.borderRadius = "1rem"
		cosmos.style.outline = "1px dotted white";

		cosmos.style.position = "relative";
		// // transform: rotateZ(50%);		
		cosmos.style.backgroundColor = "rgba(55, 53, 78, 0.342)";
		cosmos.style.backgroundImage = "url(/assets/img/grille_20px.png)";
		cosmos.style.backgroundPosition = "left top";
		cosmos.style.backgroundRepeat = "repeat";
		// cosmos.style.overflow="hidden";

		let mobs = document.createElement('div')
		mobs.id = 'mobs';
		mobs.className = ''
		mobs.style.position = "absolute";
		mobs.style.width = this.IniDatas.cosmosSize.w + this.IniDatas.px
		mobs.style.height = this.IniDatas.cosmosSize.h + this.IniDatas.px
		mobs.style.top = "0";
		mobs.style.left = "0";
		mobs.style.right = "0";
		mobs.style.bottom = "0";
		mobs.style.borderRadius = "1rem";
		mobs.style.overflow = "hidden";
		mobs.className = ''

		let sobs = document.createElement('div')
		sobs.id = 'sobs';
		sobs.className = ''
		sobs.style.position = "absolute";
		sobs.style.width = this.IniDatas.cosmosSize.w + this.IniDatas.px
		sobs.style.height = this.IniDatas.cosmosSize.h + this.IniDatas.px
		sobs.style.top = "0";
		sobs.style.left = "0";
		sobs.style.right = "0";
		sobs.style.bottom = "0";
		sobs.style.borderRadius = "1rem";
		sobs.style.overflow = "hidden";
		// sobs.style.zIndex = "500";
		//--
		cosmos.appendChild(sobs)
		cosmos.appendChild(mobs)
		this.lunarDiv.appendChild(cosmos)
		//
		this.cosmosDiv = cosmos
		this.sobsDiv = sobs
		this.mobsDiv = mobs
	}
	get_randomPos = (marge = false) => {
		let mx = marge ? marge[0] : 0
		let my = marge ? marge[1] : 0
		let xyz = {
			x: this.aleaEntreBornes(5 + mx, this.IniDatas.cosmosSize.w - 5 - mx),
			y: this.aleaEntreBornes(5 + my, this.IniDatas.cosmosSize.h - 5 - my),
			z: 0
		}
		// console.log(xyz)
		return xyz
	}
	get_centerPos = (poss) => {
		let xyz = {
			x: (this.IniDatas.cosmosSize.w / 2) - (poss.w / 2),
			y: (this.IniDatas.cosmosSize.h / 2) - (poss.h / 2),
			z: 0 - (poss.l / 2)
		}
		// console.log(xyz)
		return xyz
	}
	get_ObjDomElem = (obj) => {
		console.log(obj)
		let classname = obj.classname +
			(obj.objtype ? ' ' + obj.objtype : '') +
			(obj.objdiv ? ' ' + obj.objdiv : '')
		let elem = document.createElement('div')
		elem.id = obj.objname + '-' + obj.immat;
		// elem.style.top = (obj.posxyz.y - (obj.sizwhl.h / 2)) + this.IniDatas.px;
		// elem.style.left = (obj.posxyz.x - (obj.sizwhl.w / 2)) + this.IniDatas.px;
		elem.style.top = (obj.posxyz.y) + this.IniDatas.px;
		elem.style.left = (obj.posxyz.x) + this.IniDatas.px;
		elem.style.width = obj.sizwhl.w + this.IniDatas.px;
		elem.style.height = obj.sizwhl.h + this.IniDatas.px;
		classname += obj.type ? ' ' + obj.type : ''
		// classname += obj.div ? ' ' + obj.div : ''
		classname += obj.ia ? ' ia' : ''
		elem.className = classname

		// range ----------------------------------------------
		let elemrange = document.createElement('div')
		elemrange.id = 'rangea-' + obj.immat;
		elemrange.className = 'rangea'
		elemrange.style.position = 'absolute';
		elemrange.style.width = (obj.sizwhl.w * 3) + this.IniDatas.px
		elemrange.style.height = (obj.sizwhl.h * 3) + this.IniDatas.px
		elem.appendChild(elemrange)

		// gravity zone  !!!-----------------------------------
		if (obj.gravity) {
			let elemgravity = document.createElement('div')
			elemgravity.id = 'gravity-' + obj.immat;
			elemgravity.style.width = obj.gravity.range.w + this.IniDatas.px
			elemgravity.style.height = obj.gravity.range.h + this.IniDatas.px
			elemgravity.className = 'gravity'
			elemgravity.style.borderRadius = '50%';
			elemgravity.style.position = 'absolute';
			elem.appendChild(elemgravity)
		}
		// content---------------------------------------------
		let elemcontent = document.createElement('div')
		elemcontent.id = 'content-' + obj.immat;
		elemcontent.className = 'content'
		elemcontent.style.fontSize = (((obj.sizwhl.w) / 16)) + this.IniDatas.rem;
		elemcontent.style.lineHeight = (((obj.sizwhl.w) / 16)) + this.IniDatas.rem;
		elemcontent.style.width = obj.sizwhl.w + this.IniDatas.px
		elemcontent.style.height = obj.sizwhl.h + this.IniDatas.px
		elemcontent.style.display = 'flex'
		elemcontent.style.justifyContent = 'center'
		elemcontent.style.alignItems = 'center'
		elemcontent.style.position = 'absolute';
		elemcontent.textContent = obj.textcontent
		elem.appendChild(elemcontent)
		// datas-----------------------------------------------
		let elemdatas = document.createElement('div')
		elemdatas.id = 'datas-' + obj.immat;
		elemdatas.className = 'datas'
		elemdatas.style.right = '-150%'
		elemdatas.style.top = '-100%'
		// elemdatas.style.width = obj.sizwhl.w + this.IniDatas.px
		// elemdatas.style.height = obj.sizwhl.h + this.IniDatas.px
		elemdatas.style.position = 'absolute';
		// elemdatas.style.backgroundColor = '';


		let elempos = document.createElement('div')
		elempos.id = 'dataspos-' + obj.immat;
		elempos.textContent = 'x:0,y:0';
		elemdatas.appendChild(elempos)


		elem.appendChild(elemdatas)

		// center of obj --------------------------------------
		let elemcenter = document.createElement('div')
		elemcenter.id = 'center-' + obj.immat;
		elemcenter.className = 'center'
		elem.appendChild(elemcenter)
		return elem
	}
	create_EveryBasics(cosmosdatas) {
		// console.log('create_EveryBwxcxwcasics')
		// console.log(cosmosdatas.mobs)
		cosmosdatas.sobs.forEach(sob => {
			let newsob = this.get_ObjDomElem(sob)
			this.sobsDiv.appendChild(newsob)
		});
		cosmosdatas.mobs.forEach(mob => {
			let newmob = this.get_ObjDomElem(mob)
			this.mobsDiv.appendChild(newmob)
		});
		// console.log(cosmosdatas.sobs)
		// this.create_Cosmos()
	}
	redrawAllMobs(allMobs) {
		allMobs.forEach(obj => {
			if (obj.ia || obj.objtype === 'player') {
				// console.log(obj)
				let currentMob = document.getElementById(obj.objname + "-" + obj.immat);
				// let elem = currentMob.querySelector(".mobinfo");
				// if (elem) { elem.parentNode.removeChild(elem) }

				currentMob.style.top = obj.posxyz.y + 'px';
				currentMob.style.left = obj.posxyz.x + 'px';
				// xpspan.textContent = this.getstars(obj.kills)
				document.getElementById('dataspos' + "-" + obj.immat).textContent = 'x:' + obj.posxyz.x + ',y:' + obj.posxyz.y + '';
			}
		})
	}
	redrawAllSobs(allSobs) {
		allSobs.forEach(obj => {
			if (obj.objtype === 'planete' || obj.objtype === 'satellite') {
				let currentMob = document.getElementById(obj.objname + "-" + obj.immat);
				// let elem = currentMob.querySelector(".mobinfo");
				// if (elem) { elem.parentNode.removeChild(elem) }

				currentMob.style.top = obj.posxyz.y + 'px';
				currentMob.style.left = obj.posxyz.x + 'px';
				// xpspan.textContent = this.getstars(obj.kills)
			}
		})
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}



	// addNewcss([{ "url": "assets/css/login.css", "id": "login-css" }]);





















	// extra
	appendChild_SolarSystem = () => {
		let solarS = document.createElement('div')
		solarS.id = 'solarsystem'
		let sunS = document.createElement('div')
		sunS.id = 'sunsystem'
		sunS.textContent = '🌞'
		sunS.title = 'This is the Sun !'
		let earthS = document.createElement('div')
		earthS.id = 'earthsystem'
		let eaarthS = document.createElement('div')
		eaarthS.id = 'eaarthsystem'
		eaarthS.textContent = '🌍'//🌎
		eaarthS.title = 'This is the Earth !'
		let moonS = document.createElement('div')
		moonS.id = 'moonsystem'
		let mooonS = document.createElement('div')
		mooonS.id = 'mooonsystem'
		mooonS.textContent = '🌑'
		mooonS.title = 'This is the Moon !'
		let nautS = document.createElement('div')
		nautS.id = 'nautsystem'
		nautS.textContent = '🚀'
		nautS.title = 'Anne & Bob Space Ship !'
		moonS.appendChild(mooonS)
		moonS.appendChild(nautS)
		earthS.appendChild(eaarthS)
		earthS.appendChild(moonS)
		solarS.appendChild(sunS)
		solarS.appendChild(earthS)
		this.sobsDiv.appendChild(solarS)
	}
}
