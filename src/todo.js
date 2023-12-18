// I display the selected projects in the range
// selected from sort.

export default function buildTodoSection(location) {
    const todoSection = document.createElement("div");
    todoSection.id = "todoSection";
    location.appendChild(todoSection);
}

export function buildTodoEvent(eventInfo) {
    const todoSection = document.getElementById("todoSection");

    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-Div");
    todoSection.appendChild(eventDiv);

    const completeButton = document.createElement("button");
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
