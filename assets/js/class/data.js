"use strict";

class Data {
    constructor() {
    }

    get_ColorByType = (typename, zone) => {
        let colors = {
            rangea: {
                etoile: "rgba(0, 0, 0, 1);",
                planete: "rgba(255, 255, 255, 0.05)",
                satellite: "rgba(255, 0, 252, 0.05)",
                fsaucer: "rgba(255,255, 0, 0.05)",
                neutral: "rgba(255,255, 0, 0.05)",
                fruits: "rgba(0,255, 0, 0.05)",
                player: "rgba(0,00, 255, 0.05)"
            }
        };
        return colors[zone][typename];
    }

    set_ObjDatasByZoneAndItemName = (obj, itemname) => {
        let categories = {
            sob: {
                etoile: {
                    rangeacolor: "rgba(255, 255, 255, 0.05);",
                    stock: {
                        unknow: [aleaEntreBornes(0, 1000000), 10, 1, 1000000000],
                    }
                },
                planete: {
                    rangeacolor: "rgba(255, 255, 255, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        air: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                    }
                },
                satellite: {
                    rangeacolor: "rgba(255, 0, 252, 0.05)",
                },
                meteorite: {
                    rangeacolor: "rgba(255, 0, 252, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        air: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                    }
                }
            },
            mob: {
                player: {
                    rangeacolor: "rgba(0,255, 255, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 100), -.1, 0, 100],
                        air: [aleaEntreBornes(0, 100), 0, -.1, 100],
                        fuel: [aleaEntreBornes(0, 100), 0, -.5, 100],
                        food: [aleaEntreBornes(0, 100), 0, -.5, 100],
                    }
                },
                fsaucer: {
                    rangeacolor: "rgba(255,255, 0, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        air: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                    }
                },
                neutral: {
                    rangeacolor: "rgba(255,255, 0, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        air: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        fuel: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                    }
                },
                fruits: {
                    rangeacolor: "rgba(0,255, 0, 0.05)",
                    stock: {
                        food: [aleaEntreBornes(0, 10)]
                    }
                },
                meteorite: {
                    rangeacolor: "rgba(255, 0, 252, 0.05)",
                    stock: {
                        water: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                        air: [aleaEntreBornes(0, 1000), .1, 50, 1000],
                    }
                }
            },
        };
        return categories[obj.div][obj.objtype][itemname];
    }

    givemeaniceico = () => {
        let temporarypersonalfun = [
            { ico: "🕶", name: "sunglasses" },
            { ico: "🎲", name: "Dice" },
            { ico: "🌌", name: "milky way" },
            { ico: "🪐", name: "ringed planet" },
            { ico: "🌌", name: "milky way" },
            { ico: "🩲", name: "sleep" },
            { ico: "🍩", name: "Doughnut" },
            { ico: "🥥", name: "Coconut" },
            { ico: "🍎", name: "Red Apple" },
            { ico: "🥝", name: "Kiwi Fruit" },
            { ico: "🍆", name: "Eggplant" },
            { ico: "🥑", name: "Avocado" },
            { ico: "🥔", name: "Potato" },
            { ico: "❤️", name: "Red Heart" },
            { ico: "💥", name: "Collision" },
            { ico: "🦠", name: "Microbe" },
            { ico: "🌑", name: "New Moon Crescent Moon " },
            { ico: "🌒", name: "Waxing Crescent Quarter Moon " },
            { ico: "🌚", name: "New Moon Quarter Moon Face" },
            { ico: "⭐", name: "Star  Star  " },
            { ico: "🔥", name: "Fire" },
            { ico: "💧", name: "Droplet  Wave  " }
        ];
        let nbico = temporarypersonalfun.length;
        let aleaico = aleaEntreBornes(0, nbico - 1);
        return temporarypersonalfun[aleaico].ico;
    }
}
