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
        this.lunarDiv.style.position = "relative";
        this.lunarDiv.style.width = "100vw";
        this.lunarDiv.style.height = "100vh";
        let lunarzone = this.lunarDiv.getBoundingClientRect();
        return {
            px: 'px',
            cosmosSize: { 'w': lunarzone.width, 'h': lunarzone.height }
        };
    }

    appendChild_Cosmos() {
        let cosmos = this.DomManager.createEle({ id: 'cosmos', style: { width: '100%', height: '100%' } });
        let sobs = this.DomManager.createEle({ id: 'sobs', className: 'layer' });
        let mobs = this.DomManager.createEle({ id: 'mobs', className: 'layer' });
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
        return {
            x: aleaEntreBornes(5 + mx, this.IniDatas.cosmosSize.w - 5 - mx),
            y: aleaEntreBornes(5 + my, this.IniDatas.cosmosSize.h - 5 - my),
            z: 0,
        };
    }

    get_centerPos = (poss, type = { x: 0, y: 0, z: 0 }) => {
        let xyz = {
            x: (this.IniDatas.cosmosSize.w / 2) - (poss.w / 2),
            y: (this.IniDatas.cosmosSize.h / 2) - (poss.h / 2),
            z: 0,
        };
        if (type.x === 'left') { xyz.x = 0; }
        if (type.x === 'right') { xyz.x = (this.IniDatas.cosmosSize.w - poss.w); }
        if (type.y === 'top') { xyz.y = 0; }
        if (type.y === 'bottom') { xyz.y = (this.IniDatas.cosmosSize.h - poss.h - 50); }
        return xyz;
    }
}
