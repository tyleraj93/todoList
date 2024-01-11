import Event from "./event";
import { toggleCompleteStatus } from "./localStorage";

// I display the selected projects in the range
// selected from sort.

export default function buildTodoSection(location) {
    const todoSection = document.createElement("div");
    todoSection.classList.add("todoSection");
    location.appendChild(todoSection)
}

export function buildTodoEvent(eventInfo) {
    let myEvent = new Event(eventInfo._name, eventInfo._date, eventInfo._priority, eventInfo._notes);
    
    const todoSection = document.querySelector(".todoSection");

    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-Div");
    todoSection.appendChild(eventDiv);

    const completeButton = document.createElement("button");
    completeButton.addEventListener("click", () => {
        toggleCompleteStatus(myEvent);
    })
    eventDiv.appendChild(completeButton);

    const eventTitle = document.createElement("p");
    eventTitle.classList.add("event-title");
    eventTitle.textContent = `${eventInfo._name}`;
    eventDiv.appendChild(eventTitle);

    const eventDueDate = document.createElement("p");
    eventDueDate.classList.add("event-due-date");
    eventDueDate.textContent = `${eventInfo._date}`;
    eventDiv.appendChild(eventDueDate);

    const eventNotes = document.createElement("p");
    eventNotes.classList.add("event-notes");
    eventNotes.textContent = `${eventInfo._notes}`;
    eventDiv.appendChild(eventNotes);

    const eventPriority = document.createElement("p");
    eventPriority.classList.add("event-priority");
    eventPriority.textContent = `${eventInfo._priority}`;
    eventDiv.appendChild(eventPriority);
};
