"use strict";
let Ord = Object
function isLoaded() {
	Ord = new Ordinator()
	document.onkeydown = (eventkeydown) => {
		if (eventkeydown.key === "p") { Ord.setPause() }
		if (eventkeydown.key === "ArrowUp") { Ord.PlayGo(0, 0) } // mob.immat,dir
		if (eventkeydown.key === "ArrowRight") { Ord.PlayGo(0, 1) }
		if (eventkeydown.key === "ArrowDown") { Ord.PlayGo(0, 2) }
		if (eventkeydown.key === "ArrowLeft") { Ord.PlayGo(0, 3) }
	}

}
window.addEventListener('load', isLoaded, false)
// window.addEventListener('resize', resizePlayGround, false)
