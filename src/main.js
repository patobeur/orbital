let Ord = Object;
let errors = [];
function isLoaded() {
	Ord = new Ordinator();
	Ord.PlayerController.init_listeners();
}
window.addEventListener("load", isLoaded, false);
