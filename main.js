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
import { artifactNames } from './artifacts.js';
import { monthDayString, seedString, getTimerData } from './dateutil.js';

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
    timerString: '',
    isDaily: false,
    newDaily: false,

    primary: blank.primary[0],
    secondary: blank.secondary[0],
    utility: blank.utility[0],
    special: blank.special[0],

    artifacts: [],
    artifactNames: artifactNames,

    initialize() {
        this.updateTimer();
        this.random();
    },

    updateTimer() {
        const timerData = getTimerData();

        if (timerData.hours === 24 && timerData.minutes === 0) {
            this.timerString = 'starts NOW!';
        } else if (timerData.hours > 0) {
            this.timerString = `ends ${timerData.hours}h ${timerData.minutes}m`;
        } else if (timerData.minutes === 1) {
            this.timerString = `ends ${timerData.minutes} min`;
        } else {
            this.timerString = `ends ${timerData.minutes} mins`;
        }

        setTimeout(this.updateTimer.bind(this), timerData.millis);
        if (timerData.hours === 0 && timerData.minutes === 1) {
            setTimeout(() => {
                this.newDaily = true;
                this.isDaily = false;
            }, timerData.millis);
        }
    },

    random() {
        this.subtitle = 'Randomized Loadout';
        this.isDaily = false;

        const rng = new Math.seedrandom();

        this.pickSurvivor(rng, this.prev);
        this.pickArtifacts(rng, []);
        this.outputPicks();

        this.prev.shift();
        this.prev.push(this.survivor.name);
    },

    challenge() {
        this.isDaily = true;
        this.newDaily = false;

        const newSub = `Daily Challenge for ${monthDayString()}`;
        if (newSub === this.subtitle) {
            // if we're already looking at today's daily, we don't need to regenerate it.
            return;
        }
        this.subtitle = newSub;

        const rng = new Math.seedrandom(seedString());

        this.pickSurvivor(rng, ['robomando']);
        this.pickArtifacts(rng, ['command', 'prestige']);
        this.outputPicks();
    },

    pickSurvivor(rng, exclude) {
        let survivor;
        let count = 0;

        while (true) {
            survivor = allSurvivors.sample(rng);

            const isInExclude = exclude.some((item) => {
                if (item.toLowerCase() === survivor.name.toLowerCase()) return true;
                if (survivor.name === 'HAN-D' && item.toLowerCase() === 'hand') return true;
                return false;
            });

            if (!isInExclude || count > 10) break;
            count++;
        }

        this.survivor = survivor;
        this.skin = this.survivor.skin.sample(rng);
        this.primary = this.survivor.primary.sample(rng);
        this.secondary = this.survivor.secondary.sample(rng);
        this.utility = this.survivor.utility.sample(rng);
        this.special = this.survivor.special.sample(rng);
    },

    pickArtifacts(rng, exclude) {
        // pick 2-5 artifacts
        const numArtis = Math.floor(rng() * 4) + 2;

        const pickedArtis = [];
        while (pickedArtis.length < numArtis) {
            const pickedArti = Math.floor(rng() * artifactNames.length);

            if (pickedArtis.includes(pickedArti)) continue;

            const isInExclude = exclude.some((item) => {
                return item.toLowerCase() === artifactNames[pickedArti].toLowerCase();
            });
            if (!isInExclude) {
                pickedArtis.push(pickedArti);
            }
        }

        this.artifacts = pickedArtis;
    },

    getArtifactIcon(index) {
        let toggled = '0';
        if (this.artifacts.includes(index)) {
            toggled = '1';
        }

        return `images/artifacts/Artifact${index + 1}_${toggled}.png`;
    },

    outputPicks() {
        console.log('generated', {
            survivor: this.survivor.name,
            primary: this.primary.name,
            secondary: this.secondary.name,
            utility: this.utility.name,
            special: this.special.name,
            artifacts: this.artifacts.map((i) => { return artifactNames[i] }),
            isDaily: this.isDaily,
        });
    },
}).mount();
