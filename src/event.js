// Builds an event with the input from the add event modal
export default class Event {
    constructor(name, date, priority, notes = "", complete = false) {
        this._name = name;
        this._date = date;
        this._priority = priority;
        this._notes = notes;
        this._complete = complete;
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

    get complete() {
        return this._complete;
    }
}
