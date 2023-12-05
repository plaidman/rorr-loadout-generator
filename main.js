import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js';
import { blank } from './survivors/blank.js';
import { artifactNames, pickArtifacts } from './artifacts.js';
import { monthDayString, seedString, getTimerData } from './dateutil.js';
import { allSurvivors, pickSurvivor } from './survivors.js';

Array.prototype.pickIndex = function (rng) {
    return Math.floor(rng() * this.length);
};

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
        this.artifacts = pickArtifacts(rng, []);
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
        this.artifacts = pickArtifacts(rng, ['command', 'prestige']);
        this.outputPicks();
    },

    pickSurvivor(rng, exclude) {
        const loadout = pickSurvivor(rng, exclude);

        this.survivor = allSurvivors[loadout.survivorNum];
        this.skin = this.survivor.skin[loadout.skin];
        this.primary = this.survivor.primary[loadout.primary];
        this.secondary = this.survivor.secondary[loadout.secondary]
        this.utility = this.survivor.utility[loadout.utility];
        this.special = this.survivor.special[loadout.special];
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
