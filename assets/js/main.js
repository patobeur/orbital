"use strict";
let Ord = Object
let errors = []
function isLoaded() {
	Ord = new Ordinator()
	// document.getElementById('touch-right').addEventListener('click', () => { Ord.PlayGo(0, 1) })
	// document.getElementById('touch-left').addEventListener('click', () => { Ord.PlayGo(0, 3) })
	// document.getElementById('touch-up').addEventListener('click', () => { Ord.PlayGo(0, 4) })
	// document.getElementById('touch-down').addEventListener('click', () => { Ord.PlayGo(0, 5) })
	document.onkeydown = (eventkeydown) => {
		// console.log(eventkeydown.key)
		if (eventkeydown.key === "Escape") { Ord.escapeKey() }
		if (eventkeydown.key === "i") { Ord.get_bonus('immune') }
		if (eventkeydown.key === "c") { Ord.invertScreenColor() }
		if (eventkeydown.key === "p") { Ord.setPause() }
		//-- Ord.PlayGo(mob.immat, 0=top||1=right||2=bottom||3=left)
		if (eventkeydown.key === "ArrowRight") { Ord.PlayGo(0, 1) }
		if (eventkeydown.key === "ArrowLeft") { Ord.PlayGo(0, 3) }
		if (eventkeydown.key === "ArrowUp") { Ord.PlayGo(0, 4) } // Ord.PlayGo(mob.immat, 4=faster||5=slower)
		if (eventkeydown.key === "ArrowDown") { Ord.PlayGo(0, 5) }
		// if (eventkeydown.key === "Shift") { Ord.PlayGo(0, 4) } // Ord.PlayGo(mob.immat, 4=faster||5=slower)
		// if (eventkeydown.key === "Control") { Ord.PlayGo(0, 5) }
	}
}
window.addEventListener('load', isLoaded, false)
// window.addEventListener('resize', resizePlayGround, false)
