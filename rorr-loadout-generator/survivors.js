import { commando } from './survivors/commando.js';
import { huntress } from './survivors/huntress.js';
import { enforcer } from './survivors/enforcer.js';
import { bandit } from './survivors/bandit.js';
import { hand } from './survivors/hand.js';
import { engineer } from './survivors/engineer.js';
import { miner } from './survivors/miner.js';
import { sniper } from './survivors/sniper.js';
import { acrid } from './survivors/acrid.js';
import { mercenary } from './survivors/mercenary.js';
import { loader } from './survivors/loader.js';
import { chef } from './survivors/chef.js';
import { pilot } from './survivors/pilot.js';
import { artificer } from './survivors/artificer.js';
import { drifter } from './survivors/drifter.js';
import { robomando } from './survivors/robomando.js';

export const allSurvivors = [
    commando, huntress, enforcer, bandit,
    hand, engineer, miner, sniper,
    acrid, mercenary, loader, chef,
    pilot, artificer, drifter, robomando,
];

export function pickSurvivor(rng, exclude) {
    let survivor;
    let count = 0;

    while (true) {
        survivor = allSurvivors.pick(rng);

        const isInExclude = exclude.some((item) => {
            if (item.toLowerCase() === survivor.name.toLowerCase()) return true;
            if (survivor.name === 'HAN-D' && item.toLowerCase() === 'hand') return true;
            return false;
        });

        if (!isInExclude || count > 10) break;
        count++;
    }

    let skin = survivor.skin.pick(rng);
    let primary = survivor.primary.pick(rng);
    let secondary = survivor.secondary.pick(rng);
    let utility = survivor.utility.pick(rng);
    let special = survivor.special.pick(rng);

    return { survivor, skin, primary, secondary, utility, special };
}