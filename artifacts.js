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