"use strict";

class Tutorial {
    constructor(ordinator) {
        this.Ordinator = ordinator;
        this.tutorialNum = 1;
        this.tutorialFinish = false;
    }

    set_tutorial = (num) => {
        switch (num) {
            case 1:
                this.Ordinator.animateHelpCSS(0, 'right', false, 'Hi & Welcome to Orbital One').then((message) => {
                    this.Ordinator.PlayerController.set_NiceSpeed(this.Ordinator.MF.mobs[0], 4); // speed up
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 2:
                this.Ordinator.animateHelpCSS(0, 'left', false, this.tutorialNum + '/15 This is your ship !').then((message) => {
                    this.Ordinator.PlayerController.set_NiceSpeed(this.Ordinator.MF.mobs[0], 5); // slower speed
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 3:
                this.Ordinator.animateHelpCSS(0, 'right', false, this.tutorialNum + '/15 Let run a short training !').then((message) => {
                    this.Ordinator.PlayerController.set_NiceSpeed(this.Ordinator.MF.mobs[0], 4); // speed up
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 4:
                this.Ordinator.animateHelpCSS(0, 'fadeOut2', false, this.tutorialNum + '/15 up & down arrows for throttle !').then((message) => {
                    this.Ordinator.PlayerController.set_NiceSpeed(this.Ordinator.MF.mobs[0], 5); // slower speed
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 1); // rot left
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 5:
                this.Ordinator.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + '/15 Left & right arrows to Rotate !').then((message) => {
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 3)// rot right
                    this.Ordinator.MF.mobs[0].collide.colliderangea = true;
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 6:
                this.Ordinator.animateHelpCSS(0, 'fadeOut2', false, this.tutorialNum + "/15 Orange mean Danger !!").then((message) => {
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 1); // rot left
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 1); // rot left
                    this.Ordinator.MF.mobs[0].collide.collidealert = true;
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 7:
                this.Ordinator.animateHelpCSS(0, 'right', false, this.tutorialNum + "/15 Background Red mean imminent Danger !!").then((message) => {
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 3)// rot right
                    this.Ordinator.MF.mobs[0].collide.collidealert = false;
                    this.Ordinator.MF.mobs[0].collide.colliderangea = false;
                    this.Ordinator.MF.mobs[0].status.immune = true;
                    this.Ordinator.MF.mobs[0].statusdelay.immune = [1, 50000];
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 8:
                this.Ordinator.animateHelpCSS(0, 'left', false, this.tutorialNum + "/15 Flashing blue range mean u are immune !!").then((message) => {
                    this.Ordinator.PlayerController.set_NiceDegrees_KeyPressed(this.Ordinator.MF.mobs[0], 3)// rot right
                    this.Ordinator.MF.mobs[0].collide.colliderangea = true;
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 9:
                this.Ordinator.animateHelpCSS(0, 'stock', false, this.tutorialNum + "/15 This is all your Ressources !").then((message) => {
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 10:
                this.Ordinator.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + "/15 You'll need to gather some to survive.").then((message) => {
                    this.Ordinator.MF.mobs[0].contact.social = [0, 0];
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 11:
                this.Ordinator.animateHelpCSS(0, 'right', false, this.tutorialNum + "/15 Move nearest other to share some stoks.").then((message) => {
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 12:
                this.Ordinator.animateHelpCSS(0, 'left', false, this.tutorialNum + '/15 Green range mean u have contact with nearby object !').then((message) => {
                    this.Ordinator.MF.mobs[0].contact.social = false;
                    this.tutorialNum += 1;
                    this.tutorialFinish = true;
                    this.set_tutorial(this.tutorialNum);
                    this.tutorialFinish = true;
                });
                break;
            case 13:
                this.Ordinator.animateHelpCSS(0, 'fadeOut', false, this.tutorialNum + '/15 Your on your own now !').then((message) => {
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 14:
                this.Ordinator.animateHelpCSS(0, 'empty', false, this.tutorialNum + '/15 What else ?').then((message) => {
                    this.tutorialNum += 1;
                    this.set_tutorial(this.tutorialNum);
                });
                break;
            case 15:
                this.Ordinator.animateHelpCSS(0, 'right', true, this.tutorialNum + '/15 Oh  !! Removing Immunity. WATCH OUT !!! ').then((message) => {
                    this.Ordinator.MF.mobs[0].status.immune = false;
                    this.Ordinator.MF.mobs[0].statusdelay.immune = [0, 0];
                    this.Ordinator.MF.mobs[0].lv += 1;
                    this.tutorialFinish = true;
                });
                break;
            default:
                this.Ordinator.MF.mobs[0].status.immune = false;
                this.Ordinator.MF.mobs[0].statusdelay.immune = [0, 0];
                this.tutorialFinish = true;
                this.Ordinator.animateHelpCSS(0, 'left', true, 'No training today !').then((message) => {
                });
                break;
        }
    }
}
