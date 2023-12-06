import { artifactNames } from './artifacts.js';
import { allSurvivors } from './survivors.js';

const NUM_ARTIS = artifactNames.length;
const NUM_SURVIVORS = allSurvivors.length;

export function loadoutToHash(loadout) {
    const artiCount = loadout.artifacts.length;
    const survivor = allSurvivors[loadout.survivorNum];

    let sum = loadout.artifacts
        .toReversed()
        .reduce((acc, val) => {
            return accumulate(acc, val, NUM_ARTIS);
        }, 0);

    sum = accumulate(sum, artiCount, NUM_ARTIS);

    sum = accumulate(sum, loadout.special, survivor.special.length);
    sum = accumulate(sum, loadout.utility, survivor.utility.length);
    sum = accumulate(sum, loadout.secondary, survivor.secondary.length);
    sum = accumulate(sum, loadout.primary, survivor.primary.length);
    sum = accumulate(sum, loadout.skin, survivor.skin.length);
    sum = accumulate(sum, loadout.survivorNum, NUM_SURVIVORS);

    return sum.toString(36);
}

export function hashToLoadout(hash) {
    let sum = parseInt(hash, 36);

    let survivorNum, skin, primary, secondary, utility, special, artiCount;

    [survivorNum, sum] = unpack(sum, NUM_SURVIVORS);
    const survivor = allSurvivors[survivorNum];

    [skin, sum] = unpack(sum, survivor.skin.length);
    [primary, sum] = unpack(sum, survivor.primary.length);
    [secondary, sum] = unpack(sum, survivor.secondary.length);
    [utility, sum] = unpack(sum, survivor.utility.length);
    [special, sum] = unpack(sum, survivor.special.length);
    [artiCount, sum] = unpack(sum, NUM_ARTIS);

    const artifacts = [];
    for (let i = 0; i < artiCount; i++) {
        let artifact = 0;
        [artifact, sum] = unpack(sum, NUM_ARTIS);

        if (!artifacts.includes(artifact)) {
            artifacts.push(artifact);
        }
    }

    return { survivorNum, skin, primary, secondary, utility, special, artifacts };
}

function accumulate(sum, val, range) {
    return (sum * range) + val;
}

function unpack(sum, range) {
    const val = sum % range;
    const newSum = (sum - val) / range;

    return [val, newSum];
}