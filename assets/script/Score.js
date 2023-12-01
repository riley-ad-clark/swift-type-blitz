'use strict';

class Score {
    #date;
    #points;
    #percentage;

    constructor(date, points, percentage) {
        this.#date = date;
        this.#points = points;
        this.#percentage = percentage;
    }

    get date(){ return this.#date };
    get points() { return this.#points };
    get percentage() { return this.#percentage };

    get allInfo() {
        return [this.#date, this.#points, this.#percentage];
    }
}

export { Score }