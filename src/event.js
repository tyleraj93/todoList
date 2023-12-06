// I build new events and event functions like add and delete

import { NormalModule } from "webpack";

export default function helloWorldEvent() {
    console.log("hello from event.js");
}

// Add a new event
class Event {
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

// Empty list to add events to
const planner = [];

const addEventButton = (location) => {
    const addButton = document.createElement("button");
    // addButton.addEventListener("click", () => )
}