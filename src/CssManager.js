"use strict";

class CssManager {
    constructor() {
    }

    cssMaker = () => {
        let stringcss = '';
        stringcss += '.center {position: absolute;width: 2px;height: 2px;background-color: rgba(0, 0, 0, .5);}';
        stringcss += '#pause {position: absolute;bottom: 20%;left: 50%;width: max-content;height: max-content;transform: translate(-50%, -50%);background-color: rgba(153, 205, 50, 0.3);color: white;border-radius: 0.5rem;padding: 0.5rem;font-size: 1.5rem;display: none;}';
        stringcss += '#pause.active {display: initial;}';
        this.addCss(stringcss, 'sobsmobs');
    }

    addCss(stringcss, styleid) {
        let style = document.createElement('style');
        style.textContent = stringcss;
        style.id = styleid;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
