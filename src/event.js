// I build new events and event functions like add and delete

// Add a new event
export default class Event {
    constructor(name, date, priority, notes) {
        this._name = name;
        this._date = date;
        this._priority = priority;
        this._notes = notes;
    }

    get name() {
        return this._name;
    }

    get date() {
        return this._date;
    }

    get priority() {
        return this._priority;
    }

    get notes() {
        return this._notes;
    }
}
