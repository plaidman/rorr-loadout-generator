import { bossItems, nozzle } from './items/boss.js';
import { commonItems } from './items/common.js';
import { equipItems } from './items/equipment.js';
import { rareItems } from './items/rare.js';
import { uncommonItems } from './items/uncommon.js';

const commonHealing = [];
const commonUtility = [];
const commonDamage = [];
commonItems.forEach((item) => {
    if (item.healing) commonHealing.push(item);
    if (item.utility) commonUtility.push(item);
    if (item.damage) commonDamage.push(item);
});

const uncommonHealing = [];
const uncommonUtility = [];
const uncommonDamage = [];
uncommonItems.forEach((item) => {
    if (item.healing) uncommonHealing.push(item);
    if (item.utility) uncommonUtility.push(item);
    if (item.damage) uncommonDamage.push(item);
});

// common items: 32 pick 4, 7 total
// common healing: 10 pick 1
// common utility: 11 pick 1
// common damage: 16 pick 1

// uncommon items: 32 pick 2, 5 total
// uncommon healing: 8 pick 1
// uncommon utility: 15 pick 1
// uncommon damage: 17 pick 1

// rare items: 31 pick 3
// boss items: 6 pick 1
// equip items: 26 pick 3 + nozzle

export function pickItems(rng) {
    const common = [commonHealing.pick(rng)]
        .pushRand(commonUtility, rng)
        .pushRand(commonDamage, rng)
        .pushRand(commonItems, rng)
        .pushRand(commonItems, rng)
        .pushRand(commonItems, rng);

    const uncommon = [uncommonHealing.pick(rng)]
        .pushRand(uncommonUtility, rng)
        .pushRand(uncommonDamage, rng)
        .pushRand(uncommonItems, rng);

    const rare = [rareItems.pick(rng)]
        .pushRand(rareItems, rng);

    const boss = [bossItems.pick(rng)];
    boss.push(nozzle);

    const equip = [equipItems.pick(rng)]
        .pushRand(equipItems, rng)
        .pushRand(equipItems, rng);

    return common.concat(uncommon).concat(rare).concat(boss).concat(equip);
}
