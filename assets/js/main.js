let Ord = Object
// let DM = Object
// let MF = Object
function isLoaded() {
	Ord = new Ordinator()

	document.onkeydown = (eventkeydown) => {
		if (eventkeydown.key === "p") { Ord.setPause() }
	}

}
window.addEventListener('load', isLoaded, false)
// window.addEventListener('resize', resizePlayGround, false)
