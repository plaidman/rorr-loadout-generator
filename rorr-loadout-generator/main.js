import { createApp } from 'https://unpkg.com/petite-vue@0.4.1/dist/petite-vue.es.js';
import { blank } from './survivors/blank.js';
import { artifactDescriptions, artifactNames, pickArtifacts } from './artifacts.js';
import { monthDayString, dailySeedString, getTimerData } from './dateutil.js';
import { pickSurvivor } from './survivors.js';
import { pickItems } from './items.js';
import { randomSeedString } from './randutil.js';

document.getElementById('no-script').style = "display: none";

createApp({
    prev: ['', '', ''],

    survivor: blank,
    skin: blank.skin[0],
    primary: blank.primary[0],
    secondary: blank.secondary[0],
    utility: blank.utility[0],
    special: blank.special[0],

    items: [],
    artifacts: [],
    artifactNames: artifactNames,
    artifactDesc: null,

    title: 'Randomized Loadout',
    subtitle: '',
    timerString: '',
    isDaily: false,
    newDaily: false,
    seedString: '',

    initialize() {
        this.updateTimer();

        let route = /\/[^\/]*\/(.*)/.exec(window.location.pathname)[1];
        this.handleRoute(route);

        if (!route) {
            route = `s-${this.seedString}`;
        }

        window.history.replaceState(
            { route }, '',
            `/rorr-loadout-generator/${route}`,
        );

        addEventListener('popstate', (event) => {
            this.handleRoute(event.state.route);
        });
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

    handleRoute(route) {
        if (route.startsWith('daily')) {
            let addDays = parseInt(window.location.pathname.split('/')[3]);
            if (isNaN(addDays)) addDays = 0;

            this.setDailyState(addDays);
        } else if (route.startsWith('s-')) {
            this.setSharedState(route.substring(2));
        } else {
            this.setRandomState();
        }
    },

    randomButton() {
        this.setRandomState();

        const route = `s-${this.seedString}`;
        window.history.pushState(
            { route }, '',
            `/rorr-loadout-generator/${route}`,
        );
    },

    dailyButton() {
        this.setDailyState();

        window.history.pushState(
            { route: 'daily' }, '',
            '/rorr-loadout-generator/daily',
        );
    },

    setSharedState(seedString) {
        this.subtitle = 'Shared Loadout';
        this.isDaily = false;

        const rng = new Math.seedrandom(seedString);

        this.pickSurvivor(rng, []);
        this.artifacts = pickArtifacts(rng, []);
        this.items = pickItems(rng);
        this.outputPicks();

        this.prev = [this.survivor.name];
    },

    setRandomState() {
        this.subtitle = 'Random Loadout';
        this.isDaily = false;

        this.seedString = randomSeedString(new Math.seedrandom(), 8);
        const rng = new Math.seedrandom(this.seedString);

        this.pickSurvivor(rng, this.prev);
        this.artifacts = pickArtifacts(rng, []);
        this.items = pickItems(rng);
        this.outputPicks();

        this.prev.shift();
        this.prev.push(this.survivor.name);
    },

    setDailyState(addDays = 0) {
        this.isDaily = true;
        this.newDaily = false;

        const newSub = `Daily Build for ${monthDayString(addDays)}`;
        if (newSub === this.subtitle) {
            // if we're already looking at today's daily, we don't need to regenerate it.
            return;
        }
        this.subtitle = newSub;

        const seedString = dailySeedString(addDays);
        const rng = new Math.seedrandom(seedString);

        this.pickSurvivor(rng, []);
        this.artifacts = pickArtifacts(rng, ['prestige']);
        this.items = pickItems(rng);
        this.outputPicks();
    },

    pickSurvivor(rng, exclude) {
        const loadout = pickSurvivor(rng, exclude);

        this.survivor = loadout.survivor;
        this.skin = loadout.skin;
        this.primary = loadout.primary;
        this.secondary = loadout.secondary;
        this.utility = loadout.utility;
        this.special = loadout.special;
    },

    getArtifactIcon(index) {
        let toggled = '0';
        if (this.artifacts.includes(index)) {
            toggled = '1';
        }

        return `images/artifacts/Artifact${index + 1}_${toggled}.png`;
    },

    getSurvivorLink() {
        return `https://riskofrainreturns.wiki.gg/wiki/${this.survivor.name}#Skills`;
    },

    getArtifactDesc(index) {
        let description = artifactDescriptions[index];

        if (this.artifactDesc === description) {
            description = null;
        }

        this.artifactDesc = description;
    },

    resetArtifactDesc() {
        this.artifactDesc = null;
    },

    outputPicks() {
        console.log('generated', {
            survivor: this.survivor.name,
            primary: this.primary.name,
            secondary: this.secondary.name,
            utility: this.utility.name,
            special: this.special.name,
            artifacts: this.artifacts.map((i) => artifactNames[i]),
            items: this.items.map((i) => i.name),
        });
    },
}).mount();
