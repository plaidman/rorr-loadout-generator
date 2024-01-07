Array.prototype.pickIndex = function (rng) {
    return Math.floor(rng() * this.length);
};

Array.prototype.pick = function (rng) {
    return this[this.pickIndex(rng)];
};

Array.prototype.pushRand = function (pickFrom, rng) {
    let pickedItem, exists;

    do {
        pickedItem = pickFrom.pick(rng);
        exists = this.some((item) => item.name === pickedItem.name);
    } while (exists);

    this.push(pickedItem);
    return this;
}

export function randomSeedString(rng, len) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let seedString = '';

    while (seedString.length < len) {
        const index = Math.floor(rng() * chars.length);
        seedString = `${seedString}${chars[index]}`;
    }

    return seedString;
}
