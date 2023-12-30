export const artifactNames = [
    'honor',
    'kin',
    'distortion',
    'spite',
    'glass',
    'enigma',
    'sacrifice',
    'command',
    'spirit',
    'origin',
    'prestige',
    'dissonance',
    'tempus',
    'cognation',
];

export const artifactDescriptions = [
    'Honor: Enemies always spawn as elites.',
    'Kin: Only one enemy type spawns per stage.',
    'Distortion: Lock a random skill every minute.',
    'Spite: Enemies explode on death.',
    'Glass: Deal 500% damage, but have 10% health.',
    'Enigma: Equipment changes every time it is activated.',
    'Sacrifice: Monsters drop items on death.',
    'Command: Items are no longer random.',
    'Spirit: Characters run faster at lower health.',
    'Origin: Imps invade the map every 10 minutes.',
    'Prestige: Shrine of the Mountain effects are permanent.',
    'Dissonance: Monsters appear outside their usual environments.',
    'Tempus: Items are worth multiple stacks and are temporary.',
    'Cognation: Enemies create a temporary clone on death.',
];

export function pickArtifacts(rng, exclude) {
    // pick 2-5 artifacts
    const numArtis = Math.floor(rng() * 4) + 2;

    const pickedArtis = [];
    while (pickedArtis.length < numArtis) {
        const pickedArti = artifactNames.pickIndex(rng);

        if (pickedArtis.includes(pickedArti)) continue;

        const isInExclude = exclude.some((item) => {
            return item.toLowerCase() === artifactNames[pickedArti].toLowerCase();
        });
        if (!isInExclude) {
            pickedArtis.push(pickedArti);
        }
    }

    return pickedArtis;
}