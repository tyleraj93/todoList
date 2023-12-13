import Event from "./event";
import { storageAvailable, retrieveLocalStorage } from "./localStorage";

// I build a modal that creates a new event using
// a form to collect needed info

export default function buildEventModal(location) {
    // Builds the dialog modal
    const dialogContainer = document.createElement("div");
    dialogContainer.style.display = "none";
    dialogContainer.id = "dialogContainer";
    location.appendChild(dialogContainer);

    const form = document.createElement("form");
    form.id = "addEventDialog";
    dialogContainer.appendChild(form);

    const title = document.createElement("p");
    title.textContent = "New Event";
    form.appendChild(title);

    // Input for event title
    const event = document.createElement("input");
    event.id = "eventInput";
    event.className = "input event-input";
    event.setAttribute("type", "text");
    event.setAttribute("placeholder", "Event name");
    event.setAttribute("required", "required");

    // Label for event input
    const eventLabel = document.createElement("label");
    eventLabel.textContent = "Event: ";
    eventLabel.setAttribute("for", "eventInput");
    form.appendChild(eventLabel);
    form.appendChild(event);

    // Input for event due date
    const dueDate = document.createElement("input");
    dueDate.id = "dueDateInput";
    dueDate.className = "input due-date-input";
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("required", "required");

    // Label for dueDate input
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due date: ";
    dueDateLabel.setAttribute("for", "dueDateInput");
    form.appendChild(dueDateLabel);
    form.appendChild(dueDate);

    // Input for event priority
    const priority = document.createElement("select");
    priority.id = "priorityInput";
    priority.className = "input priority-input";
    priority.required = true;

    // Label for priority input
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority: ";
    priorityLabel.setAttribute("for", "priorityInput");
    form.appendChild(priorityLabel);
    form.appendChild(priority);

    // Priority options
    let options = ["Low", "Medium", "High"];

    // Adds each option to the select dropdown
    for (const answer of options) {
        let option = document.createElement("option");
        option.value = answer;
        option.textContent = answer;
        priority.appendChild(option);
    }

    // Input for additional notes
    const notes = document.createElement("input");
    notes.id = "notesInput";
    notes.className = "input notes-input";
    notes.setAttribute("type", "text");
    notes.setAttribute("placeholder", "Notes (optional)");

    // Label for notes input
    const notesLabel = document.createElement("label");
    notesLabel.textContent = "Notes: ";
    notesLabel.setAttribute("for", "notesInput");
    form.appendChild(notesLabel);
    form.appendChild(notes);

    // Confirm button
    const confirm = document.createElement("button");
    confirm.type = "submit";
    confirm.id = "confirm";
    confirm.textContent = "Add event";
    dialogContainer.appendChild(confirm);

    confirm.addEventListener("click", (e) => {
        e.preventDefault();
        addEventLocal(event.value, dueDate.value, priority.value, notes.value);
        clearModalInputs();
        changeModalDisplay(dialogContainer);
        // Changes buttons text content from confirm to +
        document.querySelector("#addButton").textContent = "+";
    });
}

// Builds modal button and changes content when clicked
export function buildModalButton(placementLocation, modalLocation) {
    const addButton = document.createElement("button");
    addButton.id = "addButton";
    addButton.textContent = "+";
    placementLocation.appendChild(addButton);
    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        changeModalDisplay(modalLocation);
        addButton.textContent =
            modalLocation.style.display === "block" ? "Cancel" : "+";
    });
}

// Changes the display of the modal
function changeModalDisplay(modal) {
    if (modal.style.display == "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

// Clears the inputs of the modal
function clearModalInputs() {
    const inputs = document.querySelectorAll("#dialogContainer input");
    inputs.forEach((input) => {
        input.value = "";
    });

    const selects = document.querySelectorAll("#dialogContainer select");
    selects.forEach((select) => {
        select.selectedIndex = 0;
    });
}

// Adds and sorts new event to local storage after the "add event"
// button is clicked
function addEventLocal(event, dueDate, priority, notes) {
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
