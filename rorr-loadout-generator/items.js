import { commonItems } from './items/common.js';
import { rareItems } from './items/rare.js';
import { uncommonItems } from './items/uncommon.js';

const commonHealing = commonItems.filter((item) => item.healing);
const commonUtility = commonItems.filter((item) => item.utility);
const commonDamage = commonItems.filter((item) => item.damage);

const uncommonHealing = uncommonItems.filter((item) => item.healing);
const uncommonUtility = uncommonItems.filter((item) => item.utility);
const uncommonDamage = uncommonItems.filter((item) => item.damage);

const rareHealing = rareItems.filter((item) => item.healing);
const rareUtility = rareItems.filter((item) => item.utility);
const rareDamage = rareItems.filter((item) => item.damage);

// common items: 32 pick 4, 7 total
// common healing: 10 pick 1
// common utility: 11 pick 1
// common damage: 16 pick 1

// uncommon items: 32 pick 2, 5 total
// uncommon healing: 8 pick 1
// uncommon utility: 15 pick 1
// uncommon damage: 17 pick 1

// rare items: 31 pick 3
// rare healing: 6
// rare utility: 16
// rare damage: 18

// boss items: 6 pick 1
// equip items: 26 pick 3 + nozzle

export function pickItems(rng) {

}