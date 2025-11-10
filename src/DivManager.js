"use strict";

class DivManager {
    constructor() {
        this.lunarDiv = this.checkAndGet_LunarDiv();
        this.IniDatas = this.get_IniDatas();
        this.cosmosDiv = null;
        this.sobsDiv = null;
        this.mobsDiv = null;

        this.CssManager = new CssManager();
        this.DomManager = new DomManager();
        this.UiManager = new UiManager(this.DomManager, this.lunarDiv);

        this.CssManager.cssMaker();
    }

    checkAndGet_LunarDiv = () => {
        let lunarDiv = document.getElementById('lunar');
        lunarDiv.className = "";
        return lunarDiv;
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

    appendChild_Cosmos() {
        let cosmos = this.DomManager.createEle({
            id: 'cosmos',
            style: {
                width: this.IniDatas.cosmosSize.w + this.IniDatas.px,
                height: this.IniDatas.cosmosSize.h + this.IniDatas.px
            }
        });
        let sobs = this.DomManager.createEle({
            id: 'sobs',
            className: 'layer',
            style: {
                width: this.IniDatas.cosmosSize.w + this.IniDatas.px,
                height: this.IniDatas.cosmosSize.h + this.IniDatas.px
            }
        });
        let mobs = this.DomManager.createEle({
            id: 'mobs',
            className: 'layer',
            style: {
                width: this.IniDatas.cosmosSize.w + this.IniDatas.px,
                height: this.IniDatas.cosmosSize.h + this.IniDatas.px
            }
        });
        cosmos.appendChild(sobs);
        cosmos.appendChild(mobs);
        this.lunarDiv.appendChild(cosmos);
        this.cosmosDiv = cosmos;
        this.sobsDiv = sobs;
        this.mobsDiv = mobs;
    }

    // Delegated methods
    appendChild_Board2 = () => this.UiManager.appendChild_Board2();
    appendChild_Bonus = () => this.UiManager.appendChild_Bonus();
    get_ObjDomElem = (obj) => this.UiManager.get_ObjDomElem(obj);

    create_EveryBasics(cosmosdatas) {
        cosmosdatas.sobs.forEach(sob => {
            let newsob = this.get_ObjDomElem(sob);
            this.sobsDiv.appendChild(newsob);
        });
        cosmosdatas.mobs.forEach(mob => {
            let newmob = this.get_ObjDomElem(mob);
            this.mobsDiv.appendChild(newmob);
        });
    }

    redrawAllMobs = (allMobs) => this.UiManager.redrawAllMobs(allMobs);
    redrawAllSobs = (allSobs) => this.UiManager.redrawAllSobs(allSobs);

    get_randomPos = (marge = false) => {
        let mx = marge ? marge[0] : 0;
        let my = marge ? marge[1] : 0;
        let mz = marge ? marge[2] : 0;
        return {
            x: aleaEntreBornes(5 + mx, this.IniDatas.cosmosSize.w - 5 - mx),
            y: aleaEntreBornes(5 + my, this.IniDatas.cosmosSize.h - 5 - my),
            z: aleaEntreBornes(5 + mz, this.IniDatas.cosmosSize.l - 5 - mz),
        };
    }

    get_centerPos = (poss, type = { x: 0, y: 0, z: 0 }) => {
        let xyz = {
            x: (this.IniDatas.cosmosSize.w / 2) - (poss.w / 2),
            y: (this.IniDatas.cosmosSize.h / 2) - (poss.h / 2),
            z: (this.IniDatas.cosmosSize.l / 2) - (poss.l / 2),
        };
        if (type.x === 'left') { xyz.x = 0; }
        if (type.x === 'right') { xyz.x = (this.IniDatas.cosmosSize.w - poss.w); }
        if (type.y === 'top') { xyz.y = 0; }
        if (type.y === 'bottom') { xyz.y = (this.IniDatas.cosmosSize.h - poss.h - 50); }
        return xyz;
    }
}
