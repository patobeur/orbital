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
	}
	get_IniDatas = () => {
		let screenborder = { w: 32, h: 32 }
		let renderinterval = 30 // render speed 1ms * 30
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
		cosmos.className = 'ff'
		cosmos.style.width = this.IniDatas.cosmosSize.w + this.IniDatas.px
		cosmos.style.height = this.IniDatas.cosmosSize.h + this.IniDatas.px
		cosmos.style.marginLeft = this.IniDatas.screenborder.w + this.IniDatas.px
		cosmos.style.marginTop = this.IniDatas.screenborder.h + this.IniDatas.px
		let mobs = document.createElement('div')
		mobs.id = 'mobs';
		mobs.style.width = this.IniDatas.cosmosSize.w + this.IniDatas.px
		mobs.style.height = this.IniDatas.cosmosSize.h + this.IniDatas.px
		// mobs.style.left = this.IniDatas.screenborder.w + this.IniDatas.px
		// mobs.style.top = this.IniDatas.screenborder.h + this.IniDatas.px
		mobs.className = ''
		let sobs = document.createElement('div')
		sobs.id = 'sobs';
		sobs.className = ''
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
		// console.log(obj)
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

		let elemdatas = document.createElement('div')
		elemdatas.id = 'datas-' + obj.immat;
		elemdatas.className = 'datas'

		let elemrange = document.createElement('div')
		elemrange.id = 'rangea-' + obj.immat;
		elemrange.className = 'rangea'

		let elemcenter = document.createElement('div')
		elemcenter.id = 'center-' + obj.immat;
		elemcenter.className = 'center'


		let elemcontent = document.createElement('div')
		elemcontent.id = 'content-' + obj.immat;
		elemcontent.className = 'content'
		elemcontent.style.fontSize = (((obj.sizwhl.w) / 16)) + this.IniDatas.rem;
		elemcontent.style.lineHeight = '100%';
		elemcontent.textContent = obj.textcontent

		if (obj.gravity) {
			let elemgravity = document.createElement('div')
			elemgravity.id = 'gravity-' + obj.immat;
			elemgravity.style.width = obj.gravity.range.w + this.IniDatas.px
			elemgravity.style.height = obj.gravity.range.h + this.IniDatas.px
			elemgravity.className = 'gravity'
			elem.appendChild(elemgravity)
		}
		elem.appendChild(elemrange)
		elem.appendChild(elemcontent)
		elem.appendChild(elemdatas)
		elem.appendChild(elemcenter)
		return elem
	}
	create_EveryBasics(cosmosdatas) {
		// console.log('create_EveryBwxcxwcasics')
		// console.log(cosmosdatas.mobs)
		cosmosdatas.mobs.forEach(mob => {
			let newmob = this.get_ObjDomElem(mob)
			this.mobsDiv.appendChild(newmob)
		});
		cosmosdatas.sobs.forEach(sob => {
			let newsob = this.get_ObjDomElem(sob)
			this.sobsDiv.appendChild(newsob)
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
