"use strict";

class PlayerController {
    constructor(ordinator) {
        this.Ordinator = ordinator;
    }

    init_listeners = () => {
        document.onkeydown = (eventkeydown) => {
            if (eventkeydown.key === "Escape") { this.Ordinator.escapeKey(); }
            if (eventkeydown.key === "e") { this.Ordinator.harvest_resource(); }
            if (eventkeydown.key === "i") { this.Ordinator.get_bonus('immune'); }
            if (eventkeydown.key === "c") { this.Ordinator.invertScreenColor(); }
            if (eventkeydown.key === "p") { this.Ordinator.setPause(); }
            if (eventkeydown.key === "ArrowRight") { this.PlayGo(0, 1); }
            if (eventkeydown.key === "ArrowLeft") { this.PlayGo(0, 3); }
            if (eventkeydown.key === "ArrowUp") { this.PlayGo(0, 4); }
            if (eventkeydown.key === "ArrowDown") { this.PlayGo(0, 5); }
        };
    }

    PlayGo = (idx, dir, help = false) => {
        if ((!this.Ordinator.pauseOn && this.Ordinator.gameOn && this.Ordinator.Tutorial.tutorialFinish)) {
            if (this.Ordinator.MF.mobs[idx].direction.way) {
                this.Ordinator.MF.mobs[idx].direction.way[dir] = 1;
            }
        }
    }

    check_keyboardArrows = (obj) => {
        if (obj.direction.way[0] === 1) { this.set_NiceDegrees_KeyPressed(obj, 0); }
        if (obj.direction.way[1] === 1) { this.set_NiceDegrees_KeyPressed(obj, 1); }
        if (obj.direction.way[2] === 1) { this.set_NiceDegrees_KeyPressed(obj, 2); }
        if (obj.direction.way[3] === 1) { this.set_NiceDegrees_KeyPressed(obj, 3); }
        if (obj.direction.way[4] === 1) { this.set_NiceSpeed(obj, 4); }
        if (obj.direction.way[5] === 1) { this.set_NiceSpeed(obj, 5); }
        obj.direction.way = [0, 0, 0, 0, 0, 0];
    }

    set_NiceDegrees_KeyPressed = (obj, type) => {
        if (type === 1) {
            obj.direction.deg = (obj.direction.deg + obj.direction.agility) > 360 ? obj.direction.deg + obj.direction.agility - 360 : obj.direction.deg + obj.direction.agility;
        } else if (type === 3) {
            obj.direction.deg = (obj.direction.deg - obj.direction.agility) <= 0 ? obj.direction.deg - obj.direction.agility + 360 : obj.direction.deg - obj.direction.agility;
        }
    }

    set_NiceSpeed = (obj, type) => {
        if (type === 4) {
            obj.velxyz.cx += obj.velxyz.cx >= 5 ? 0 : obj.velxyz.x;
            obj.velxyz.cy += obj.velxyz.cy >= 5 ? 0 : obj.velxyz.y;
            obj.velxyz.cz += obj.velxyz.cz >= 5 ? 0 : obj.velxyz.z;
        } else if (type === 5) {
            obj.velxyz.cx -= obj.velxyz.cx <= -2 ? 0 : obj.velxyz.x;
            obj.velxyz.cy -= obj.velxyz.cy <= -2 ? 0 : obj.velxyz.y;
            obj.velxyz.cz -= obj.velxyz.cz <= -2 ? 0 : obj.velxyz.z;
        }
        if (obj.objtype === 'player') {
            let prop = document.getElementById('propulsion-' + obj.immat);
            if (prop) { prop.className = "propulsion prop" + obj.velxyz.cx; }
            let speedboard2 = document.getElementById('speedboard2');
            if (speedboard2) { speedboard2.className = "prop" + obj.velxyz.cx; }
            let speedboard = document.getElementById('speedvisual');
            if (speedboard) { speedboard.className = "prop" + obj.velxyz.cx; }
        }
    }
}
