"use strict";

class Physic {
    constructor(mobFactory, divManager) {
        this.MF = mobFactory;
        this.DM = divManager;
    }

    get_distance = (a, b) => { // get hypotenus with pythaGore
        let AB = (a.posxyz.x + (a.sizwhl.w / 2)) - (b.posxyz.x + (b.sizwhl.w / 2));
        let AC = (a.posxyz.y + (a.sizwhl.h / 2)) - (b.posxyz.y + (b.sizwhl.h / 2));
        return Math.sqrt((AB * AB) + (AC * AC));
    }

    check_collisions = (obj, typeobj) => {
        let alertedistancebeforedie = 30;

        // Initialize before loop
        if (obj.objtype === 'player') {
            obj.collide.proxim_resource = [false, {}];
        }

        this.MF[typeobj].forEach(objB => {
            if (objB.immat != obj.immat) {
                let distance = this.get_distance(obj, objB);

                // Direct collision logic
                if (distance < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2))) {
                    if (obj.objtype === 'player') {
                        if (objB.objtype === 'fruits') {
                            // A fruit is close enough to harvest, set the flag.
                            obj.collide.proxim_resource = [true, objB];
                        } else {
                            // It's a collision with something else (deadly)
                            obj.status.dead = true;
                            console.log('ooops ! Lost in spaaaaaace !!');
                        }
                    }
                }

                // Other proximity alerts
                if ((distance - alertedistancebeforedie) < ((obj.sizwhl.w / 2) + (objB.sizwhl.w / 2))) {
                    obj.collide.collidealert = true;
                }
                if (distance < ((obj.sizwhl.w * 2) + (objB.sizwhl.w))) {
                    obj.collide.colliderangea = true;
                }
            }
        });
    }

    set_NewNicePosition_testing = (obj) => {
        obj.direction.deg = (obj.direction.deg === 0) ? 360 : obj.direction.deg;
        let x = obj.posxyz.x;
        let y = obj.posxyz.y;
        let d = obj.direction.deg;
        let v = obj.velxyz.x;
        let nextX = (1 * Math.cos(d)) + (1 * Math.sin(d));
        let nextY = (1 * Math.sin(d)) - (1 * Math.cos(d));
        obj.posxyz.x = x + parseInt(((nextX)) * 10) / 10;
        obj.posxyz.y = y + parseInt(((nextY)) * 10) / 10;
    }

    set_NewNicePosition_broken = (obj) => {
        let ratioDir = parseInt(obj.direction.deg / 360 * 100000) / 100000;
        let velocityX = obj.velxyz.cx;
        let velocityY = obj.velxyz.cy;
        if ((ratioDir > 0.9375 && ratioDir <= 1) || (ratioDir >= 0 && ratioDir <= 0.0625)) { obj.direction.compass = "N"; obj.posxyz.y -= velocityY; }
        else if (ratioDir > 0.0625 && ratioDir <= 0.1875) { obj.direction.compass = "NE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y -= (velocityY / 2); }
        else if (ratioDir > 0.1875 && ratioDir <= 0.3125) { obj.direction.compass = "E"; obj.posxyz.x += velocityX; }
        else if (ratioDir > 0.3125 && ratioDir <= 0.4375) { obj.direction.compass = "SE"; obj.posxyz.x += (velocityX / 2); obj.posxyz.y += (velocityY / 2); }
        else if (ratioDir > 0.4375 && ratioDir <= 0.5625) { obj.direction.compass = "S"; obj.posxyz.y += velocityY; }
        else if (ratioDir > 0.5625 && ratioDir <= 0.6875) { obj.direction.compass = "SW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y += (velocityY / 2); }
        else if (ratioDir > 0.6875 && ratioDir <= 0.8125) { obj.direction.compass = "W"; obj.posxyz.x -= velocityX; }
        else if (ratioDir > 0.8125 && ratioDir <= 0.9375) { obj.direction.compass = "NW"; obj.posxyz.x -= (velocityX / 2); obj.posxyz.y -= (velocityY / 2); }
    }

    getNextPos = (obj) => {
        let x = obj.posxyz.x;
        let y = obj.posxyz.y;
        let nxX = (x * Math.cos(obj.direction.deg)) - (y * Math.sin(obj.direction.deg));
        let nxY = (x * Math.sin(obj.direction.deg)) + (y * Math.cos(obj.direction.deg));
        obj.posxyz.x = nxX;
        obj.posxyz.y = nxY;
    }

    get_NextOrbitPos = (obj) => {
        let distance = false;
        if (obj.tetha[0] > 360) {
            obj.tetha[0] = obj.tetha[0] - 360;
        }
        if (obj.parentimmat) {
            const center = this.MF.sobs.find(sob => sob.immat === obj.parentimmat[0]);
            if (!center) return; // Exit if parent not found

            let centerX = center.posxyz.x + (obj.sizwhl.w / 2);
            let centerY = center.posxyz.y + (obj.sizwhl.h / 2);
            let centerW = center.gravity.range.w / 2;
            let centerH = center.gravity.range.h / 2;
            let x2 = 0;
            let y2 = 0;
            if (obj.objtype === 'player') {
                distance = this.get_distance(obj, center);
            }
            if (distance > 0) {
                x2 = centerX + Math.round((distance) * (Math.cos(obj.tetha[0])));
                y2 = centerY + Math.round((distance) * (Math.sin(obj.tetha[0])));
            } else {
                x2 = centerX + Math.round(centerW * (Math.cos(obj.tetha[0])));
                y2 = centerY + Math.round(centerH * (Math.sin(obj.tetha[0])));
            }
            obj.posxyz.x = x2 - (obj.sizwhl.w / 2);
            obj.posxyz.y = y2 - (obj.sizwhl.h / 2);
            if (obj.orbitdir > 0) {
                obj.tetha[0] = obj.tetha[0] + obj.tetha[2];
            } else {
                obj.tetha[0] = obj.tetha[0] - obj.tetha[2];
            }
        }
    }

    set_NewNiceDirection = (obj) => {
        if (obj.direction.currentdelay === 0) {
            let newdir = aleaEntreBornes(1, 2) === 1 ? 22.5 : -22.5;
            let nd = obj.direction.deg += newdir;
            nd = (nd > 360) ? (nd - 360) : nd;
            nd = (nd <= 0) ? (360 - nd) : nd;
            obj.direction.deg = nd;
        }
        obj.direction.currentdelay += 1;
        if (obj.direction.currentdelay >= obj.direction.delay) {
            obj.direction.currentdelay = 0;
        }
    }

    check_IsPosOutScreen(obj) {
        if (obj.posxyz.x > this.DM.IniDatas.cosmosSize.w) { obj.posxyz.x = 1 - obj.sizwhl.w; }
        if (obj.posxyz.x <= 0 - obj.sizwhl.w) { obj.posxyz.x = this.DM.IniDatas.cosmosSize.w; }
        if (obj.posxyz.y <= 0 - obj.sizwhl.h) { obj.posxyz.y = this.DM.IniDatas.cosmosSize.h; }
        if (obj.posxyz.y > this.DM.IniDatas.cosmosSize.h + obj.sizwhl.h) { obj.posxyz.y = 1; }
    }
}
