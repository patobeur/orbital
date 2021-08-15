"use strict";
// -----------------------------
class DivManager {
	constructor() {
		this.ddd = ""
		console.log('🥪 Orbital lunch !!')
		this.lunarDiv = this.checkAndGet_LunarDiv()
		this.IniDatas = this.get_IniDatas()
		this.cosmosDiv = Object
		this.sobsDiv = Object // all static objects goes here
		this.mobsDiv = Object // all mobile objects goes here
		// this.moonDiv = Object// = document.getElementById('moonr')
		this.cssMaker()
	}
	cssMaker = () => {
		let stringcss = 'body{overflow:hidden;}'

		stringcss += ''
		// stringcss += '.sob{z-index: -1;}'
		stringcss += '* {outline: 1px dotted rgba(255, 255, 255, 0.2);}'
		stringcss += ''
		stringcss += ''
		stringcss += '.gravity {background-color: rgba(255, 255, 255, 0.05);}'
		stringcss += ''
		stringcss += '.player .content {transform:rotate(-45deg)}'
		stringcss += '.center {position: absolute;width: 1px;height: 1px;background-color: rgb(0, 0, 0);}'
		stringcss += '#pause {position: absolute;bottom: 20%;left: 50%;width: max-content;height: max-content;transform: translate(-50%, -50%);background-color: rgba(153, 205, 50, 0.3);color: white;border-radius: 0.5rem;padding: 0.5rem;font-size: 1.5rem;display: none;}'
		stringcss += '#pause.active {display: initial;}'
		this.addCss(stringcss, 'sob-mob')
	}
	addCss(stringcss, styleid) {
		let style = document.createElement('style');
		style.textContent = stringcss
		style.id = styleid
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	get_IniDatas = () => {
		let screenborder = { w: 0, h: 0, l: 0 }
		let renderinterval = 30 // render speed 1ms * 30

		this.lunarDiv.style.position = "relative";
		this.lunarDiv.style.width = "100vw";
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
			cosmosSize: { 'w': lunarzone.width - (screenborder.w * 2), 'h': lunarzone.height - (screenborder.h * 2), 'l': lunarzone.width - (screenborder.l * 2) }
		}
	}
	checkAndGet_LunarDiv = () => {
		this.lunarDiv = document.getElementById('lunar')
		this.lunarDiv.className = this.ddd
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
		// cosmos.style.overflow="hidden";

		let mobs = this.createEle({
			id: 'mobs',
			position: "absolute",
			width: this.IniDatas.cosmosSize.w + this.IniDatas.px,
			height: this.IniDatas.cosmosSize.h + this.IniDatas.px,
			top: "0",
			left: "0",
			right: "0",
			bottom: "0",
			borderRadius: "1rem",
			overflow: "hidden"
		})
		let sobs = this.createEle({
			id: 'sobs',
			position: "absolute",
			width: this.IniDatas.cosmosSize.w + this.IniDatas.px,
			height: this.IniDatas.cosmosSize.h + this.IniDatas.px,
			top: "0",
			left: "0",
			right: "0",
			bottom: "0",
			borderRadius: "1rem",
			overflow: "hidden"
		})
		cosmos.appendChild(sobs)
		cosmos.appendChild(mobs)
		this.lunarDiv.appendChild(cosmos)
		//
		this.cosmosDiv = cosmos
		this.sobsDiv = sobs
		this.mobsDiv = mobs
	}
	createEle = (attrib = false) => {
		let tag = false
		if (attrib) {
			attrib.tag = attrib.tag ?? 'div';
			attrib.id ? tag = document.createElement(attrib.tag) : '';
			attrib.id ? tag.id = attrib.id : '';
			attrib.borderRadius ? tag.style.borderRadius = attrib.borderRadius : '';
			attrib.zIndex ? tag.style.zIndex = attrib.zIndex : '';
			attrib.className ? tag.className = attrib.className : '';

			attrib.position ? tag.style.position = attrib.position : '';
			attrib.width ? tag.style.width = attrib.width : '';
			attrib.height ? tag.style.height = attrib.height : '';

			attrib.top ? tag.style.top = attrib.top : '';
			attrib.left ? tag.style.left = attrib.left : '';
			attrib.right ? tag.style.right = attrib.right : '';
			attrib.bottom ? tag.style.bottom = attrib.bottom : '';


			attrib.overflow ? tag.style.overflow = attrib.overflow : '';

			attrib.backgroundColor ? tag.style.backgroundColor = attrib.backgroundColor : '';
			attrib.color ? tag.style.color = attrib.color : '';

			attrib.display ? tag.style.display = attrib.display : '';
			attrib.flexDirection ? tag.style.flexDirection = attrib.flexDirection : '';
			attrib.justifyContent ? tag.style.justifyContent = attrib.justifyContent : '';
			attrib.alignItems ? tag.style.alignItems = attrib.alignItems : '';

			attrib.textContent ? tag.textContent = attrib.textContent : '';

		}
		return tag ?? false
	}

	appendChild_Board() {
		let speedboard = this.createEle({ tag: 'div', id: 'speedboard' })
		let speedzero = this.createEle({ tag: 'div', id: 'speedzero' })
		let speedvisual = this.createEle({ tag: 'div', id: 'speedvisual' })
		speedboard.appendChild(speedvisual)
		speedboard.appendChild(speedzero)
		cosmos.appendChild(speedboard)
	}
	appendChild_Board2() {
		let speedboard = this.createEle({ tag: 'div', id: 'speedboard2' })
		for (let index = -2; index < 6; index++) {
			let stepdiv = this.createEle({ tag: 'div', id: 'prop' + index, className: 'prop prop' + index })
			speedboard.prepend(stepdiv)
		}
		cosmos.appendChild(speedboard)
	}
	get_randomPos = (marge = false) => {
		let mx = marge ? marge[0] : 0
		let my = marge ? marge[1] : 0
		let mz = marge ? marge[2] : 0
		let xyz = {
			x: this.aleaEntreBornes(5 + mx, this.IniDatas.cosmosSize.w - 5 - mx),
			y: this.aleaEntreBornes(5 + my, this.IniDatas.cosmosSize.h - 5 - my),
			z: this.aleaEntreBornes(5 + mz, this.IniDatas.cosmosSize.l - 5 - mz),
		}
		// console.log(xyz)
		return xyz
	}
	get_centerPos = (poss, type = { x: 0, y: 0, z: 0 }) => {

		let typexy = {
			x: type.x ?? 0,
			y: type.y ?? 0,
			z: type.z ?? 0
		}
		// type = {x:left||right,y:top|bottom}
		let xyz = {
			x: (this.IniDatas.cosmosSize.w / 2) - (poss.w / 2),
			y: (this.IniDatas.cosmosSize.h / 2) - (poss.h / 2),
			z: (this.IniDatas.cosmosSize.l / 2) - (poss.l / 2),
		}
		if (typexy.x === 'left') { xyz.x = 0 }
		if (typexy.x === 'right') { xyz.x = (this.IniDatas.cosmosSize.w - poss.w) }
		if (typexy.y === 'top') { xyz.y = 0 }
		if (typexy.y === 'bottom') { xyz.y = (this.IniDatas.cosmosSize.h - poss.h - 20) }
		// console.log(xyz)
		return xyz
	}
	get_ObjDomElem = (obj) => {

		let classname = obj.classname +
			(obj.objtype ? ' ' + obj.objtype : '') +
			(obj.objdiv ? ' ' + obj.objdiv : '')
		let elem = document.createElement('div')
		elem.id = obj.objname + '' + obj.div + '-' + obj.immat;
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
		elemrange.id = 'rangea' + obj.div + '-' + obj.immat;
		elemrange.className = 'rangea'
		elemrange.style.position = 'absolute';
		elemrange.style.width = (obj.sizwhl.w * 3) + this.IniDatas.px
		elemrange.style.height = (obj.sizwhl.h * 3) + this.IniDatas.px
		elemrange.style.backgroundColor = obj.rangeacolor ? obj.rangeacolor : "rgba(255,255, 255, 0.05)"
		elem.appendChild(elemrange)

		// content box used for rotation-----------------------
		let elemcontentbox = document.createElement('div')
		elemcontentbox.id = 'contentbox' + obj.div + '-' + obj.immat;
		elemcontentbox.style.position = 'absolute';
		elemcontentbox.style.width = obj.sizwhl.w + this.IniDatas.px
		elemcontentbox.style.height = obj.sizwhl.h + this.IniDatas.px

		// content---------------------------------------------
		let elemcontent = document.createElement('div')
		elemcontent.id = 'content' + obj.div + '-' + obj.immat;
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
		elemcontentbox.appendChild(elemcontent)

		// Player Help  !!!-----------------------------------
		if (obj.objtype === 'player') {
			let elemhelp = document.createElement('div')
			elemhelp.id = 'help-' + obj.immat;
			elemhelp.style.width = "100" + this.IniDatas.px
			elemhelp.style.height = "100" + this.IniDatas.px
			elemhelp.className = 'help'
			elemhelp.style.borderRadius = '1rem';
			elemhelp.style.position = 'absolute';
			elemhelp.textContent = 'This is your Ship !'
			elem.appendChild(elemhelp)

			// propulsion visual animation
			let elemprop = document.createElement('div')
			elemprop.style.width = (obj.sizwhl.w / 3) + this.IniDatas.px
			elemprop.style.height = (obj.sizwhl.h) + this.IniDatas.px
			elemprop.style.top = '100%'
			elemprop.style.left = '50%'
			// elemprop.style.backgroundColor = 'black'
			elemprop.style.transform = 'translate(-50%,0)'
			elemprop.style.position = 'absolute';
			// elemprop.style.overflow = 'hidden';
			elemprop.id = 'propulsion-' + obj.immat;
			elemprop.className = 'propulsion prop0'

			let elemcloud = document.createElement('div')
			elemcloud.style.width = (obj.sizwhl.w / 3) + this.IniDatas.px
			elemcloud.style.height = (obj.sizwhl.h / 3) + this.IniDatas.px
			// elemcloud.style.borderRadius = '50%';
			// elemcloud.style.backgroundColor = 'white'
			// elemcloud.style.position = 'absolute';
			// elemcloud.style.bottom = '0';
			elemcloud.className = 'prop';

			elemprop.prepend(elemcloud)
			elemcontentbox.prepend(elemprop)
		}
		// gravity zone  !!!-----------------------------------
		if (obj.gravity) {
			let elemgravity = document.createElement('div')
			elemgravity.id = 'gravity' + obj.div + '-' + obj.immat;
			elemgravity.style.width = obj.gravity.range.w + this.IniDatas.px
			elemgravity.style.height = obj.gravity.range.h + this.IniDatas.px
			elemgravity.className = 'gravity'
			elemgravity.style.borderRadius = '50%';
			elemgravity.style.position = 'absolute';
			elem.appendChild(elemgravity)
		}
		// datas-----------------------------------------------

		let eleminfo = document.createElement('div')
		eleminfo.id = 'info' + obj.div + '-' + obj.immat;
		eleminfo.className = 'info'
		// elemdatas.style.width = obj.sizwhl.w + this.IniDatas.px
		// elemdatas.style.height = obj.sizwhl.h + this.IniDatas.px
		// eleminfo.style.position = 'absolute';
		// elemdatas.style.backgroundColor = '';


		let elempos = document.createElement('div')
		elempos.id = 'datas' + obj.div + '-' + obj.immat;
		elempos.textContent = 'x:0,y:0,z:0';
		eleminfo.appendChild(elempos)
		elempos = document.createElement('div')
		elempos.id = 'direction' + obj.div + '-' + obj.immat;
		elempos.textContent = 'deg:';
		eleminfo.appendChild(elempos)


		elem.appendChild(elemcontentbox)
		elem.appendChild(eleminfo)

		// center of obj --------------------------------------
		let elemcenter = document.createElement('div')
		elemcenter.id = 'center' + obj.div + '-' + obj.immat;
		elemcenter.className = 'center'
		elem.appendChild(elemcenter)
		console.log('immat ' + obj.immat + ' added to ' + obj.div + ' -> ' + obj.objtype + ' / ' + obj.objname + ' / ' + obj.classname)
		return elem
	}
	create_EveryBasics(cosmosdatas) {
		cosmosdatas.sobs.forEach(sob => {
			let newsob = this.get_ObjDomElem(sob)
			this.sobsDiv.appendChild(newsob)
		});
		cosmosdatas.mobs.forEach(mob => {
			let newmob = this.get_ObjDomElem(mob)
			this.mobsDiv.appendChild(newmob)
		});
	}
	redrawAllMobs(allMobs) {
		allMobs.forEach(obj => {
			// if (obj.ia) {
			let currentMob = document.getElementById(obj.objname + obj.div + "-" + obj.immat);
			if (currentMob) {
				let contentbox = document.getElementById('contentboxmob-' + obj.immat);
				if (contentbox && obj.objtype === 'player') {
					contentbox.style.transform = 'rotate(' + obj.direction.deg + 'deg)';
				}

				let divrange = document.getElementById('rangea' + obj.div + '-' + obj.immat)
				divrange.style.backgroundColor = obj.rangeacolor
				// // if colliding
				// if (obj.collide) {
				// 	// refresh range color
				// 	if (divrange) {
				// 	}
				// 	else {
				// 		errors.push(['this.redrawAllMobs', 'can\'t target rangea' + obj.div + "-" + obj.immat])
				// 	}
				// }


				currentMob.style.top = obj.posxyz.y + 'px';
				currentMob.style.left = obj.posxyz.x + 'px';
				// xpspan.textContent = this.getstars(obj.kills)
				// // refresh information of info div
				// let divinfo = document.getElementById('info' + obj.div + '-' + obj.immat)
				// if (divinfo && obj.rangeacolor) {
				// 	divinfo.style.backgroundColor = obj.rangeacolor
				// }
				// refresh information of info div
				let divdata = document.getElementById('datas' + obj.div + '-' + obj.immat)
				if (divdata) {
					divdata.textContent = 'x:' + parseInt(obj.posxyz.x) + ',y:' + parseInt(obj.posxyz.y) + ',z:' + parseInt(obj.posxyz.z);
				}
				// refresh information of info div
				let divdata2 = document.getElementById('direction' + obj.div + '-' + obj.immat)
				if (divdata2) {
					divdata2.textContent = 'deg:' + obj.direction.deg + '°';
				}
			}
			else {
				errors.push(['this.redrawAllMobs', 'can\'t target ' + obj.objname + obj.div + "-" + obj.immat])
			}
			// }
		})
	}
	redrawAllSobs(allSobs) {
		allSobs.forEach(obj => {
			if (obj.objtype === 'planete' || obj.objtype === 'satellite') {
				let currentMob = document.getElementById(obj.objname + obj.div + "-" + obj.immat);
				currentMob.style.top = obj.posxyz.y + 'px';
				currentMob.style.left = obj.posxyz.x + 'px';

				let divrange = document.getElementById('rangea' + obj.div + '-' + obj.immat)
				divrange.style.backgroundColor = obj.rangeacolor

				// xpspan.textContent = this.getstars(obj.lv)
				let divdata = document.getElementById('datas' + obj.div + '-' + obj.immat)
				divdata.textContent = 'x:' + parseInt(obj.posxyz.x) + ',y:' + parseInt(obj.posxyz.y) + ',z:' + parseInt(obj.posxyz.z);
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
