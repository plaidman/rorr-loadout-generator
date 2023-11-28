export const artifactNames = [
    'Artifact of Honor',
    'Artifact of Kin',
    'Artifact of Distortion',
    'Artifact of Spite',
    'Artifact of Glass',
    'Artifact of Enigma',
    'Artifact of Sacrifice',
    'Artifact of Command',
    'Artifact of Spirit',
    'Artifact of Origin',
    'Artifact of Prestige',
    'Artifact of Dissonance',
    'Artifact of Tempus',
    'Artifact of Cognation',
];

export function artifactIcon(index, isOn) {
    return `images/artifacts/Artifact${index + 1}_${isOn ? '1' : '0'}.png`;
}