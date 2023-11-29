import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js';
import { blank } from './survivors/blank.js';
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
import { artifactNames, artifactIcon } from './artifacts.js';
import { toMonthDayString } from './dateutil.js';

Array.prototype.sample = function (rng) {
    return this[Math.floor(rng() * this.length)];
}

const allSurvivors = [
    commando, huntress, enforcer, bandit,
    hand, engineer, miner, sniper,
    acrid, mercenary, loader, chef,
    pilot, artificer, drifter, robomando,
];

createApp({
    prev: ['', '', ''],
    survivor: blank,
    skin: blank.skin[0],

    subtitle: 'Randomized Loadout',
    isDaily: false,

    primary: blank.primary[0],
    secondary: blank.secondary[0],
    utility: blank.utility[0],
    special: blank.special[0],

    artifacts: [
        'images/artifacts/Artifact1_0.png',
        'images/artifacts/Artifact2_0.png',
        'images/artifacts/Artifact3_0.png',
        'images/artifacts/Artifact4_0.png',
        'images/artifacts/Artifact5_0.png',
        'images/artifacts/Artifact6_0.png',
        'images/artifacts/Artifact7_0.png',
        'images/artifacts/Artifact8_0.png',
        'images/artifacts/Artifact9_0.png',
        'images/artifacts/Artifact10_0.png',
        'images/artifacts/Artifact11_0.png',
        'images/artifacts/Artifact12_0.png',
        'images/artifacts/Artifact13_0.png',
        'images/artifacts/Artifact14_0.png',
    ],
    artifactNames: [],

    random() {
        this.subtitle = 'Randomized Loadout';
        this.isDaily = false;

        const rng = new Math.seedrandom();

        do {
            this.survivor = allSurvivors.sample(rng);
        } while (this.prev.includes(this.survivor.name));
        this.prev.shift();
        this.prev.push(this.survivor.name);
        this.generate(rng);
    },

    challenge() {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        const newSub = `Daily Challenge for ${toMonthDayString(date)}`;
        if (newSub === this.subtitle) {
            return;
        }

        this.subtitle = newSub;
        this.isDaily = true;

        const rng = new Math.seedrandom(date.toUTCString());
        this.survivor = allSurvivors.sample(rng);
        this.generate(rng);
    },

    generate(rng) {
        this.skin = this.survivor.skin.sample(rng);
        this.primary = this.survivor.primary.sample(rng);
        this.secondary = this.survivor.secondary.sample(rng);
        this.utility = this.survivor.utility.sample(rng);
        this.special = this.survivor.special.sample(rng);

        // pick 2-5 artifacts
        const numArtis = Math.floor(rng() * 4) + 2;

        this.artifactNames = [];
        const pickedArtis = [];
        while (pickedArtis.length < numArtis) {
            const pickedArti = Math.floor(rng() * artifactNames.length);

            if (!pickedArtis.includes(pickedArti)) {
                pickedArtis.push(pickedArti);
                this.artifactNames.push(artifactNames[pickedArti]);
            }
        }

        this.artifacts = [];
        for (let i = 0; i < artifactNames.length; i++) {
            this.artifacts.push(artifactIcon(i, pickedArtis.includes(i)));
        }

        console.log('generated', {
            survivor: this.survivor.name,
            primary: this.primary.name,
            secondary: this.secondary.name,
            utility: this.utility.name,
            special: this.special.name,
            artifacts: this.artifactNames,
            isDaily: this.isDaily,
        });
    },
}).mount();
