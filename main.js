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

Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
}

const allSurvivors = [
    commando, huntress, enforcer, bandit,
    hand, engineer, miner, sniper,
    acrid, mercenary, loader, chef,
    pilot, artificer, drifter, robomando,
];

createApp({
    survivor: blank,
    skin: blank.subdir + blank.skin[0],

    primary: blank.primary[0],
    secondary: blank.secondary[0],
    utility: blank.utility[0],
    special: blank.special[0],

    get portrait() {
        return this.survivor.subdir + this.survivor.portrait;
    },
    get primaryIcon() {
        return this.survivor.subdir + this.primary.icon;
    },
    get secondaryIcon() {
        return this.survivor.subdir + this.secondary.icon;
    },
    get utilityIcon() {
        return this.survivor.subdir + this.utility.icon;
    },
    get specialIcon() {
        return this.survivor.subdir + this.special.icon;
    },
    get color() {
        return `color: ${this.survivor.color}`;
    },

    generate() {
        this.survivor = allSurvivors.sample();

        this.skin = this.survivor.subdir + this.survivor.skin.sample();
        this.primary = this.survivor.primary.sample();
        this.secondary = this.survivor.secondary.sample();
        this.utility = this.survivor.utility.sample();
        this.special = this.survivor.special.sample();

        console.log('generated', {
            survivor: this.survivor.name,
            primary: this.primary.name,
            secondary: this.secondary.name,
            utility: this.utility.name,
            special: this.special.name,
        });
    },
}).mount();
