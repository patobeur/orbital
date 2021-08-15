"use strict";

// -----------------------------



class MobFactory {
	constructor(IniDatas) {
		this.mobsImmat = [0]
		this.sobsImmat = [0]
		this.mobs = []
		this.sobs = []
		this.inidatas = IniDatas
		// console.log('MobFactory IniDatas', this.inidatas)
	}

	get_ColorByType = (typename, zone) => {
		let colors = {
			rangea: {
				etoile: "rgba(255, 255, 255, 0.05);",
				planete: "rgba(255, 255, 255, 0.05)",
				satellite: "rgba(255, 0, 252, 0.05)",
				fsaucer: "rgba(255,255, 0, 0.05)",
				neutral: "rgba(255,255, 0, 0.05)",
				fruits: "rgba(0,255, 0, 0.05)"
			}
		}
		return colors[zone][typename]
	}
	add_obj = (objdatas) => {
		// obj completition
		let obj = {
			xp: 0,
			lv: 1,
			div: objdatas.div ?? false,
			ia: objdatas.ia ?? false,
			objtype: objdatas.objtype ?? false,
			objname: objdatas.objname ?? false,
			classname: objdatas.classname ?? false,
			textcontent: objdatas.textcontent ?? false,
			posxyz: objdatas.posxyz ?? false,
			sizwhl: objdatas.sizwhl ?? false,
			velxyz: objdatas.velxyz ?? { x: 1, y: 1, z: 1, cx: 1, cy: 1, cz: 1 },// own velocity statisticsactuals speeds
			parentimmat: objdatas.parentimmat ?? false,
			// movement 
			direction: objdatas.direction ?? { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(-360, 360), delay: 50, currentdelay: 0, way: [0, 0, 0, 0, 0, 0], compass: '', agility: 1 },
			stock: { fuel: 100, air: 1000, water: 1000, food: 1000 },
			status: { dead: false, immune: false, immune1rd: false, shield: false, mooving: false, gravity: false },
			tetha: objdatas.tetha ?? false,
			gravity: objdatas.gravity ?? false,
			orbitdir: objdatas.orbitdir ?? false,
			rangeacolor: objdatas.objtype ? this.get_ColorByType(objdatas.objtype, "rangea") : false
		}
		if (obj.div === 'sob') {
			obj.immat = (objdatas.parentimmat) ? (objdatas.parentimmat === -1) ? (this.sobsImmat[0] - 1) : (this.sobsImmat[0] + 1) : this.sobsImmat[0];
			obj.parentimmat = objdatas.parentimmat ? objdatas.parentimmat : false;
			this.sobs[this.sobsImmat] = obj
			this.sobsImmat[0] += 1
		}
		else if (obj.div === 'mob') {
			obj.immat = this.mobsImmat[0]
			// obj.parentimmat = objdatas.parentimmat >= 0 ? objdatas.parentimmat : this.mobsImmat[0];
			this.mobs[this.mobsImmat] = obj
			this.mobsImmat[0] += 1
		}
		else {
			console.log('innexpected')
		}
	}
	create_EveryBasics() {
		this.add_obj({
			div: 'sob',
			objtype: 'etoile',
			objname: 'sun',
			classname: 'sob',
			textcontent: '🌞',
			posxyz: this.inidatas.get_centerPos({ w: 32, h: 32, l: 32 }),
			sizwhl: { w: 32, h: 32, l: 32 },
			parentimmat: false,
			gravity: { range: { w: 400, h: 400 }, force: 1 },
			orbitdir: 1
		})
		this.add_obj({
			div: 'sob',
			objtype: 'planete',
			objname: 'earth',
			classname: 'sob',
			textcontent: '🌎',
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [0, 360, 0.01],
			gravity: { range: { w: 100, h: 50 }, force: 1 },
			orbitdir: 0
		})
		this.add_obj({
			div: 'sob',
			objtype: 'satellite',
			objname: 'moon',
			classname: 'sob',
			textcontent: '🌑',
			posxyz: this.inidatas.get_centerPos({ w: 16, h: 16, l: 16 }),
			sizwhl: { w: 16, h: 16, l: 16 },
			parentimmat: [1],
			tetha: [0, 360, 0.03],
			orbitdir: 1
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: false,
			objtype: 'player',
			objname: 'player',
			classname: 'mob',
			textcontent: '🚀',
			posxyz: this.inidatas.get_centerPos({ w: 24, h: 24, l: 24 }, { y: 'bottom' }),
			sizwhl: { w: 24, h: 24, l: 24 },
			velxyz: { x: 1, y: 1, z: 1, cx: 0, cy: 0, cz: 0 },
			//parentimmat: [0],
			tetha: [0, 360, 0.03],
			direction: { ratio: 0, degZ: 360, deg: 0, delay: 15, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 22.5 },
		})
		this.add_obj({
			div: 'sob', // mob is mobile or sob is static
			ia: false,
			objtype: 'satellite',
			objname: 'ennemy',
			classname: 'sob',
			textcontent: '🛰️',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 24, h: 24, l: 24 },
			parentimmat: [0],
			tetha: [90, 360, 0.01]
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: '🛸',
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 25, h: 25, l: 50 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 3, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 }
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: this.givemeaniceico(),
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fsaucer',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: this.givemeaniceico(),
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		this.add_obj({
			div: 'mob', // mob is mobile or sob is static
			ia: true,
			objtype: 'fruits',
			objname: 'ennemy',
			classname: 'mob',
			textcontent: this.givemeaniceico(),
			posxyz: this.inidatas.get_randomPos(),
			sizwhl: { w: 15, h: 15, l: 15 },
			parentimmat: false,
			direction: { ratio: 0, degZ: 0, deg: this.aleaEntreBornes(0, 360), delay: 5, currentdelay: 0, way: [0, 0, 0, 0], compass: '', agility: 1 },
		})
		// for (let index = 0; index < 3; index++) {
		// 	this.add_obj({
		// 		div: 'mob', // mob is mobile or sob is static
		// 		ia: true,
		// 		objtype: 'fsaucer',
		// 		objname: 'ennemy',
		// 		classname: 'mob',
		// 		textcontent: '🛸',
		// 		posxyz: this.inidatas.get_randomPos(),
		// 		sizwhl: { w: 24, h: 24, l: 24 },
		// 		parentimmat: false
		// 	})
		// }

		this.inidatas.create_EveryBasics({ mobs: this.mobs, sobs: this.sobs })
	}
	aleaEntreBornes(minimum, maximum) {
		return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	}
	givemeaniceico = () => {
		let temporarypersonalfun = [
			{ ico: "🍩", name: "Doughnut" },
			{ ico: "🍪", name: "Cookie" },
			{ ico: "🥥", name: "Coconut" },
			{ ico: "🍏", name: "Green Apple" },
			{ ico: "🍎", name: "Red Apple" },
			{ ico: "🍐", name: "Pear" },
			{ ico: "🥥", name: "Kiwi Fruit" },
			{ ico: "🥝", name: "Kiwi Fruit" },
			{ ico: "🥥", name: "Kiwi Fruit" },
			{ ico: "🍆", name: "Eggplant" },
			{ ico: "🥑", name: "Avocado" },
			{ ico: "🥔", name: "Potato" },
			{ ico: "🥥", name: "Potato" },
			{ ico: "❤️", name: "Red Heart" },
			{ ico: "🧡", name: "Orange Heart" },
			{ ico: "💛", name: "Yellow Heart" },
			{ ico: "💚", name: "Green Heart" },
			{ ico: "💙", name: "Blue Heart" },
			{ ico: "💜", name: "Purple Heart" },
			{ ico: "🤎", name: "Brown Heart" },
			{ ico: "🖤", name: "Black Heart" },
			{ ico: "🤍", name: "White Heart" },
			{ ico: "🙈", name: "See-No-Evil Monkey Monkey  " },
			{ ico: "🙉", name: "Hear-No-Evil Monkey Monkey  " },
			{ ico: "🙊", name: "Speak-No-Evil Monkey" },
			{ ico: "💥", name: "Collision" },
			{ ico: "💫", name: "Dizzy  Droplets  " },
			{ ico: "💨", name: "Dashing Away Face  " },
			{ ico: "🦄", name: "Unicorn" },
			{ ico: "🦓", name: "Zebra" },
			{ ico: "🐷", name: "Pig Face" },
			{ ico: "🐭", name: "Mouse Face" },
			{ ico: "🐁", name: "Mouse" },
			{ ico: "🐀", name: "Rat" },
			{ ico: "🐳", name: "Spouting Whale" },
			{ ico: "🐋", name: "Whale" },
			{ ico: "🐬", name: "Dolphin" },
			{ ico: "🐟", name: "Fish  Fish  " },
			{ ico: "🐠", name: "Tropical Fish" },
			{ ico: "🐡", name: "Blowfish" },
			{ ico: "🦈", name: "Shark" },
			{ ico: "🦠", name: "Microbe" },
			{ ico: "🌐", name: "Globe with Moon  " },
			{ ico: "🌑", name: "New Moon Crescent Moon " },
			{ ico: "🌒", name: "Waxing Crescent Quarter Moon " },
			{ ico: "🌚", name: "New Moon Quarter Moon Face" },
			{ ico: "⭐", name: "Star  Star  " },
			{ ico: "🔥", name: "Fire" },
			{ ico: "💧", name: "Droplet  Wave  " }
		]
		let nbico = temporarypersonalfun.length
		let aleaico = this.aleaEntreBornes(0, nbico - 1)
		return temporarypersonalfun[aleaico].ico
	}
}

			// { ico: "💦", name: "Sweat Droplets Away  " },
			// { ico: "🐵", name: "Monkey Face" },
			// { ico: "🐒", name: "Monkey" },
			// { ico: "🦍", name: "Gorilla" },
			// { ico: "🦧", name: "Orangutan  Face  " },
			// { ico: "🐶", name: "Dog Face" },
			// { ico: "🐕", name: "Dog  Dog  " },
			// { ico: "🦮", name: "Guide Dog Dog  " },
			// { ico: "🐕‍🦺", name: "Service Dog" },
			// { ico: "🐩", name: "Poodle" },
			// { ico: "🐺", name: "Wolf" },
			// { ico: "🦊", name: "Fox" },
			// { ico: "🦝", name: "Raccoon  Face  " },
			// { ico: "🐱", name: "Cat Face" },
			// { ico: "🐈", name: "Cat" },
			// { ico: "🦁", name: "Lion  Face  " },
			// { ico: "🐯", name: "Tiger Face" },
			// { ico: "🐅", name: "Tiger" },
			// { ico: "🐆", name: "Leopard  Face  " },
			// { ico: "🐴", name: "Horse Face" },
			// { ico: "🐎", name: "Horse" },
			// { ico: "🦌", name: "Deer" },
			// { ico: "🦬", name: "Bison  Face  " },
			// { ico: "🐮", name: "Cow Face" },
			// { ico: "🐂", name: "Ox  Buffalo  " },
			// { ico: "🐃", name: "Water Buffalo" },
			// { ico: "🐄", name: "Cow  Face  " },
			// { ico: "🐖", name: "Pig" },
			// { ico: "🐗", name: "Boar  Nose  " },
			// { ico: "🐽", name: "Pig Nose" },
			// { ico: "🐏", name: "Ram" },
			// { ico: "🐑", name: "Ewe" },
			// { ico: "🐐", name: "Goat" },
			// { ico: "🐪", name: "Camel  Camel  " },
			// { ico: "🐫", name: "Two-Hump Camel" },
			// { ico: "🦙", name: "Llama" },
			// { ico: "🦒", name: "Giraffe" },
			// { ico: "🐘", name: "Elephant" },
			// { ico: "🦣", name: "Mammoth" },
			// { ico: "🦏", name: "Rhinoceros" },
			// { ico: "🦛", name: "Hippopotamus  Face  " },
			// { ico: "🐹", name: "Hamster  Face  " },
			// { ico: "🐰", name: "Rabbit Face" },
			// { ico: "🐇", name: "Rabbit" },
			// { ico: "🐿️", name: "Chipmunk" },
			// { ico: "🦫", name: "Beaver" },
			// { ico: "🦔", name: "Hedgehog" },
			// { ico: "🦇", name: "Bat" },
			// { ico: "🐻", name: "Bear" },
			// { ico: "🐨", name: "Koala" },
			// { ico: "🐼", name: "Panda" },
			// { ico: "🦥", name: "Sloth" },
			// { ico: "🦦", name: "Otter" },
			// { ico: "🦨", name: "Skunk" },
			// { ico: "🦘", name: "Kangaroo" },
			// { ico: "🦡", name: "Badger  Prints  " },
			// { ico: "🐾", name: "Paw Prints" },
			// { ico: "🦃", name: "Turkey" },
			// { ico: "🐔", name: "Chicken" },
			// { ico: "🐓", name: "Rooster  Chick  " },
			// { ico: "🐣", name: "Hatching Chick Chick  " },
			// { ico: "🐤", name: "Baby Chick Baby Chick " },
			// { ico: "🐥", name: "Front-Facing Baby" },
			// { ico: "🐦", name: "Bird" },
			// { ico: "🐧", name: "Penguin" },
			// { ico: "🕊️", name: "Dove" },
			// { ico: "🦅", name: "Eagle" },
			// { ico: "🦆", name: "Duck" },
			// { ico: "🦢", name: "Swan" },
			// { ico: "🦉", name: "Owl" },
			// { ico: "🦤", name: "Dodo" },
			// { ico: "🪶", name: "Feather" },
			// { ico: "🦩", name: "Flamingo" },
			// { ico: "🦚", name: "Peacock" },
			// { ico: "🦜", name: "Parrot" },
			// { ico: "🐸", name: "Frog" },
			// { ico: "🐊", name: "Crocodile" },
			// { ico: "🐢", name: "Turtle" },
			// { ico: "🦎", name: "Lizard" },
			// { ico: "🐍", name: "Snake  Face  " },
			// { ico: "🐲", name: "Dragon Face" },
			// { ico: "🐉", name: "Dragon" },
			// { ico: "🦕", name: "Sauropod" },
			// { ico: "🦖", name: "T-Rex  Whale  " },
			// { ico: "🐙", name: "Octopus  Shell  " },
			// { ico: "🐚", name: "Spiral Shell" },
			// { ico: "🐌", name: "Snail" },
			// { ico: "🦋", name: "Butterfly" },
			// { ico: "🐛", name: "Bug" },
			// { ico: "🐜", name: "Ant" },
			// { ico: "🐝", name: "Honeybee" },
			// { ico: "🪲", name: "Beetle  Beetle  " },
			// { ico: "🐞", name: "Lady Beetle" },
			// { ico: "🦗", name: "Cricket" },
			// { ico: "🪳", name: "Cockroach" },
			// { ico: "🕷️", name: "Spider  Web  " },
			// { ico: "🕸️", name: "Spider Web" },
			// { ico: "🦂", name: "Scorpion" },
			// { ico: "🦟", name: "Mosquito" },
			// { ico: "💐", name: "Bouquet  Blossom  " },
			// { ico: "🌸", name: "Cherry Blossom Flower  " },
			// { ico: "💮", name: "White Flower" },
			// { ico: "🏵️", name: "Rosette" },
			// { ico: "🌹", name: "Rose  Flower  " },
			// { ico: "🥀", name: "Wilted Flower" },
			// { ico: "🌺", name: "Hibiscus" },
			// { ico: "🌻", name: "Sunflower" },
			// { ico: "🌼", name: "Blossom" },
			// { ico: "🌷", name: "Tulip" },
			// { ico: "🌱", name: "Seedling  Plant  " },
			// { ico: "🪴", name: "Potted Plant Tree  " },
			// { ico: "🌲", name: "Evergreen Tree Tree  " },
			// { ico: "🌳", name: "Deciduous Tree Tree  " },
			// { ico: "🌴", name: "Palm Tree" },
			// { ico: "🌵", name: "Cactus  of Rice " },
			// { ico: "🌾", name: "Sheaf of Herb" },
			// { ico: "🌿", name: "Herb" },
			// { ico: "☘️", name: "Shamrock  Leaf Clover " },
			// { ico: "🍀", name: "Four Leaf Leaf  " },
			// { ico: "🍁", name: "Maple Leaf Leaf  " },
			// { ico: "🍂", name: "Fallen Leaf Fluttering in Wind" },
			// { ico: "🍃", name: "Leaf Fluttering" },
			// { ico: "🍄", name: "Mushroom" },
			// { ico: "🌰", name: "Chestnut" },
			// { ico: "🦀", name: "Crab" },
			// { ico: "🦞", name: "Lobster" },
			// { ico: "🦐", name: "Shrimp" },
			// { ico: "🦑", name: "Squid  Showing Europe-Africa " },
			// { ico: "🌍", name: "Globe Showing Showing Americas " },
			// { ico: "🌎", name: "Globe Showing Showing Asia-Australia " },
			// { ico: "🌏", name: "Globe Showing with Meridians " },
			// { ico: "🌛", name: "First Quarter Quarter Moon Face" },
			// { ico: "🌜", name: "Last Quarter" },
			// { ico: "☀️", name: "Sun  Moon Face " },
			// { ico: "🌝", name: "Full Moon with Face " },
			// { ico: "🌞", name: "Sun with" },
			// { ico: "🌓", name: "First Quarter Gibbous Moon " },
			// { ico: "🌔", name: "Waxing Gibbous Moon  " },
			// { ico: "🌕", name: "Full Moon Gibbous Moon " },
			// { ico: "🌖", name: "Waning Gibbous Quarter Moon " },
			// { ico: "🌗", name: "Last Quarter Crescent Moon " },
			// { ico: "🌘", name: "Waning Crescent Moon  " },
			// { ico: "🌙", name: "Crescent Moon Moon Face " },
			// { ico: "🌟", name: "Glowing Star Star  " },
			// { ico: "🌠", name: "Shooting Star" },
			// { ico: "☁️", name: "Cloud  Behind Cloud " },
			// { ico: "⛅", name: "Sun Behind with Lightning and" },
			// { ico: "⛈️", name: "Cloud with Behind Small Cloud" },
			// { ico: "🌤️", name: "Sun Behind Behind Large Cloud" },
			// { ico: "🌥️", name: "Sun Behind Behind Rain Cloud" },
			// { ico: "🌦️", name: "Sun Behind with Rain " },
			// { ico: "🌧️", name: "Cloud with with Snow " },
			// { ico: "🌨️", name: "Cloud with with Lightning " },
			// { ico: "🌩️", name: "Cloud with" },
			// { ico: "🌪️", name: "Tornado" },
			// { ico: "🌫️", name: "Fog  Face  " },
			// { ico: "🌬️", name: "Wind Face" },
			// { ico: "🌈", name: "Rainbow" },
			// { ico: "☂️", name: "Umbrella  with Rain Drops" },
			// { ico: "☔", name: "Umbrella with Voltage  " },
			// { ico: "⚡", name: "High Voltage" },
			// { ico: "❄️", name: "Snowflake" },
			// { ico: "☃️", name: "Snowman  Without Snow " },
			// { ico: "⛄", name: "Snowman Without" },
			// { ico: "☄️", name: "Comet" },
			// { ico: "🌊", name: "Water Wave Tree  " },
			// { ico: "🎄", name: "Christmas Tree" },
			// { ico: "✨", name: "Sparkles  Tree  " },
			// { ico: "🎋", name: "Tanabata Tree Decoration  " },
