import Event from "./event";
import { sort } from "./sort";

// Adds and sorts new event to local storage after the "add event"
// button is clicked
export default function addEventLocal(
    event,
    dueDate,
    priority,
    notes,
    complete
) {
    if (storageAvailable("localStorage")) {
        let storedEvents = localStorage.getItem("events");
        const newEvent = new Event(event, dueDate, priority, notes);
        if (!storedEvents) {
            storedEvents = [newEvent];
        } else {
            storedEvents = JSON.parse(storedEvents);
            storedEvents.push(newEvent);
        }
        storedEvents.sort((a, b) => new Date(a._date) - new Date(b._date));
        localStorage.setItem("events", JSON.stringify(storedEvents));
    }
}
// Function that detects whether localStorage is both supported and available
export function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}
// Removes an event from localStorage
// Used to remove events before being marked complete
export function toggleCompleteStatus(newEvent) {
    let events = retrieveLocalEvents("events");
    const todoSection = document.querySelector(".todoSection");
    for (let event of events) {
        if (event._name === newEvent._name && event._date === newEvent._date) {
            event._complete = !event._complete;
        }
        localStorage.setItem("events", JSON.stringify(events));
    }
    sort(todoSection.id);
}

export function retrieveLocalEvents(itemName) {
    let eventsString = localStorage.getItem(`${itemName}`);
    let events = JSON.parse(eventsString);
    return events;
}
