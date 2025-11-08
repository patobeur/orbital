"use strict";

class UiManager {
    constructor(domManager, lunarDiv) {
        this.DomManager = domManager;
        this.lunarDiv = lunarDiv;
    }

    appendChild_Board2 = () => {
        let speedboard = this.DomManager.createEle({ tag: 'div', id: 'speedboard2' });
        for (let index = -2; index < 6; index++) {
            let stepdiv = this.DomManager.createEle({ tag: 'div', id: 'prop' + index, className: 'prop prop' + index });
            speedboard.prepend(stepdiv);
        }
        this.lunarDiv.appendChild(speedboard);
    }

    appendChild_Bonus = () => {
        let allbonus = this.DomManager.createEle({ tag: 'div', id: 'statusbonus', className: 'statusbonus' });
        let range = this.DomManager.createEle({ tag: 'div', id: 'visualsocial', className: 'range' });
        let content = this.DomManager.createEle({ tag: 'div', id: 'visualsocialcontent', className: 'content', textContent: '👩‍🚀' });
        let count = this.DomManager.createEle({ tag: 'div', id: 'visualsocialcount', className: 'count', textContent: '0' });
        let bonus = this.DomManager.createEle({ tag: 'div', id: 'bonussocial', className: 'bonusitem social' });
        bonus.appendChild(range);
        bonus.appendChild(content);
        bonus.appendChild(count);
        allbonus.appendChild(bonus);
        range = this.DomManager.createEle({ tag: 'div', id: 'visualimmune', className: 'range' });
        content = this.DomManager.createEle({ tag: 'div', id: 'visualimmunecontent', className: 'content', textContent: '💎' });
        count = this.DomManager.createEle({ tag: 'div', id: 'visualimmunecount', className: 'count', textContent: '0' });
        bonus = this.DomManager.createEle({ tag: 'div', id: 'bonusimmune', className: 'bonusitem immune' });
        bonus.appendChild(range);
        bonus.appendChild(content);
        bonus.appendChild(count);
        allbonus.appendChild(bonus);
        this.lunarDiv.appendChild(allbonus);
    }

    get_ObjDomElem = (obj) => {
        let elem = this.DomManager.createEle({ id: obj.objname + '' + obj.div + '-' + obj.immat, className: 'mob ' + obj.objtype, style: { top: obj.posxyz.y + 'px', left: obj.posxyz.x + 'px', width: obj.sizwhl.w + 'px', height: obj.sizwhl.h + 'px' } });
        if (obj.gravity) {
            let elemgravity = this.DomManager.createEle({ id: 'gravity' + obj.div + '-' + obj.immat, className: 'gravity', style: { width: obj.gravity.range.w + 'px', height: obj.gravity.range.h + 'px' } });
            elem.appendChild(elemgravity);
        }
        let elemrange = this.DomManager.createEle({ id: 'rangea' + obj.div + '-' + obj.immat, className: 'rangea', style: { width: (obj.sizwhl.w * 3) + 'px', height: (obj.sizwhl.h * 3) + 'px' } });
        elem.appendChild(elemrange);
        let elemsocial = this.DomManager.createEle({ id: 'social' + obj.div + '-' + obj.immat, className: 'social', style: { width: (obj.ranges.social.d) + 'px', height: (obj.ranges.social.d) + 'px' } });
        elem.appendChild(elemsocial);
        let elemcontentbox = this.DomManager.createEle({ id: 'contentbox' + obj.div + '-' + obj.immat, className: 'wtf' });
        let elemcontent = this.DomManager.createEle({ id: 'content' + obj.div + '-' + obj.immat, className: 'content', textContent: obj.textcontent });
        elemcontentbox.appendChild(elemcontent);
        if (obj.objtype === 'player') {
            let elemhelp = this.DomManager.createEle({ id: 'help-' + obj.immat, className: 'help' });
            let helptxt = this.DomManager.createEle({ id: 'helptxt-' + obj.immat, className: 'helptxt' });
            let square = this.DomManager.createEle({ className: 'square' });
            elemhelp.appendChild(helptxt);
            elemhelp.appendChild(square);
            elem.appendChild(elemhelp);
            let elemprop = this.DomManager.createEle({ id: 'propulsion-' + obj.immat, className: 'propulsion prop0' });
            let elemcloud = this.DomManager.createEle({ className: 'prop' });
            elemprop.prepend(elemcloud);
            elemcontentbox.prepend(elemprop);
        }
        if (obj.stock) {
			let elemstock = document.createElement('div')
			elemstock.id = 'stock' + obj.div + '-' + obj.immat;
			elemstock.className = 'stock';
			let itemstock;
			let itemstockcount;
			let itemsentence;
			if (obj.stock.air) {
				itemstock = document.createElement('div')
				itemstock.id = 'stockair' + obj.div + '-' + obj.immat;
				itemstock.className = 'stockitem stockair';
				itemsentence = '[' + (obj.stock.air[0] ?? 0) + '] Air Stocks(regen: ' + (obj.stock.air[1] ?? 0) + ' / ' + (obj.stock.air[2] ?? 0) + ')';
				itemstock.title = itemsentence
				itemstock.textContent = '☁';//💨
				itemstock.style.color = 'white';
				//--
				itemstockcount = document.createElement('div')
				itemstockcount.id = 'stockaircount' + obj.div + '-' + obj.immat;
				itemstockcount.className = 'stockcount';
				itemstockcount.textContent = itemsentence
				//--
				itemstock.appendChild(itemstockcount)
				elemstock.appendChild(itemstock)
			}
			if (obj.stock.water) {
				itemstock = document.createElement('div')
				itemstock.id = 'stockwater' + obj.div + '-' + obj.immat;
				itemstock.className = 'stockitem stockwater';
				itemsentence = '[' + (obj.stock.water[0] ?? 0) + '] Water Stocks(regen: ' + (obj.stock.water[1] ?? 0) + ' / ' + (obj.stock.water[2] ?? 0) + ')';
				itemstock.title = itemsentence
				itemstock.textContent = '🧊';//
				//--
				itemstockcount = document.createElement('div')
				itemstockcount.id = 'stockwatercount' + obj.div + '-' + obj.immat;
				itemstockcount.className = 'stockcount';
				itemstockcount.textContent = itemsentence
				//--
				itemstock.appendChild(itemstockcount)
				elemstock.appendChild(itemstock)
			}
			if (obj.stock.fuel) {
				itemstock = document.createElement('div')
				itemstock.id = 'stockfuel' + obj.div + '-' + obj.immat;
				itemstock.className = 'stockitem stockfuel';
				itemsentence = '[' + (obj.stock.fuel[0] ?? 0) + '] Fuel Stocks(regen: ' + (obj.stock.fuel[1] ?? 0) + ' / ' + (obj.stock.fuel[2] ?? 0) + ')';
				itemstock.title = itemsentence
				itemstock.textContent = '☕';//
				//--
				itemstockcount = document.createElement('div')
				itemstockcount.id = 'stockfuelcount' + obj.div + '-' + obj.immat;
				itemstockcount.className = 'stockcount';
				itemstockcount.textContent = itemsentence
				//--
				itemstock.appendChild(itemstockcount)
				elemstock.appendChild(itemstock)
			}
			if (obj.stock.food) {
				itemstock = document.createElement('div')
				itemstock.id = 'stockfood' + obj.div + '-' + obj.immat;
				itemstock.className = 'stockitem stockfood';
				itemsentence = '[' + (obj.stock.food[0] ?? 0) + '] Food Stocks(regen: ' + (obj.stock.food[1] ?? 0) + ' / ' + (obj.stock.food[2] ?? 0) + ')';
				itemstock.title = itemsentence
				itemstock.textContent = '🍽️';//🥛
				//--
				itemstockcount = document.createElement('div')
				itemstockcount.id = 'stockfoodcount' + obj.div + '-' + obj.immat;
				itemstockcount.className = 'stockcount';
				itemstockcount.textContent = itemsentence
				//--
				itemstock.appendChild(itemstockcount)
				elemstock.appendChild(itemstock)
			}
			elem.appendChild(elemstock)
		}
        let eleminfo = this.DomManager.createEle({ id: 'info' + obj.div + '-' + obj.immat, className: 'info' });
		let elempos = document.createElement('div')
		elempos.id = 'datafile' + obj.div + '-' + obj.immat;
		elempos.textContent = '' + obj.name + "";
		eleminfo.appendChild(elempos)
		elempos = document.createElement('div')
		elempos.id = 'datasx' + obj.div + '-' + obj.immat;
		elempos.textContent = 'x:0';
		eleminfo.appendChild(elempos)
		elempos = document.createElement('div')
		elempos.id = 'datasy' + obj.div + '-' + obj.immat;
		elempos.textContent = 'y:0';
		eleminfo.appendChild(elempos)
		elempos = document.createElement('div')
		elempos.id = 'datasz' + obj.div + '-' + obj.immat;
		elempos.textContent = 'z:0';
		eleminfo.appendChild(elempos)
		elempos = document.createElement('div')
		elempos.id = 'direction' + obj.div + '-' + obj.immat;
		elempos.textContent = 'deg:' + obj.direction.deg + "°";
		eleminfo.appendChild(elempos)
        elem.appendChild(eleminfo);
        let elemcenter = this.DomManager.createEle({ id: 'center' + obj.div + '-' + obj.immat, className: 'center' });
        elem.appendChild(elemcenter);
        elem.appendChild(elemcontentbox);
        return elem;
    }

    redrawAllMobs = (allMobs) => {
        allMobs.forEach(obj => {
            let currentMob = document.getElementById(obj.objname + obj.div + "-" + obj.immat);
            if (currentMob) {
                let contentbox = document.getElementById('contentboxmob-' + obj.immat);
                if (contentbox && obj.objtype === 'player') {
                    contentbox.style.transform = 'rotate(' + obj.direction.deg + 'deg)';
                }
                obj.collide && obj.collide.colliderangea ? currentMob.classList.add('rangea') : currentMob.classList.remove('rangea');
                obj.collide && obj.collide.collidealert ? currentMob.classList.add('alert') : currentMob.classList.remove('alert');
                obj.contact && obj.contact.social.length > 0 ? currentMob.classList.add('social') : currentMob.classList.remove('social');
                obj.status.immune && obj.statusdelay.immune[0] > 0 ? currentMob.classList.add('immune') : currentMob.classList.remove('immune');
                if (obj.objtype === 'player') {
                    let bonussocial = document.getElementById('bonussocial');
                    let bonusimmune = document.getElementById('bonusimmune');
                    let visualsocialcount = document.getElementById('visualsocialcount');
                    let visualimmunecount = document.getElementById('visualimmunecount');
                    if (obj.contact && obj.contact.social.length > 0) {
                        bonussocial.classList.add('active');
                        visualsocialcount.textContent = obj.contact.social[2];
                    } else {
                        bonussocial.classList.remove('active');
                        visualsocialcount.textContent = '';
                    }
                    if (obj.status.immune && obj.statusdelay.immune[0] > 0) {
                        bonusimmune.classList.add('active');
                        visualimmunecount.textContent = (obj.statusdelay.immune[1] - obj.statusdelay.immune[0]);
                    } else {
                        bonusimmune.classList.remove('active');
                        visualimmunecount.textContent = '';
                    }
                }
                currentMob.style.top = obj.posxyz.y + 'px';
                currentMob.style.left = obj.posxyz.x + 'px';
            }
        });
    }

    redrawAllSobs = (allSobs) => {
        allSobs.forEach(obj => {
            if (obj.objtype === 'planete' || obj.objtype === 'satellite') {
                let currentMob = document.getElementById(obj.objname + obj.div + "-" + obj.immat);
                currentMob.style.top = obj.posxyz.y + 'px';
                currentMob.style.left = obj.posxyz.x + 'px';
            }
        });
    }
}
