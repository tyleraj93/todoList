import Event from "./event";

// I build a modal that creates a new event using
// a form to collect needed info

const planner = [];

export default function eventModal(location) {
    const dialogContainer = document.createElement("div");
    dialogContainer.style.display = "none";
    dialogContainer.id = "dialogContainer";
    location.appendChild(dialogContainer);

    const form = document.createElement("form");
    form.id = "addEventDialog";
    dialogContainer.appendChild(form);

    const emptyP = document.createElement("p");
    form.appendChild(emptyP);

    const labels = document.createElement("label");
    labels.setAttribute("for", "");
    emptyP.appendChild(labels);

    const title = document.createElement("p");
    title.textContent = "New Event";
    labels.appendChild(title);

    // Input for event title
    const event = document.createElement("input");
    event.setAttribute("type", "text");
    event.setAttribute("placeholder", "Event");
    event.setAttribute("required", "required");
    event.className = "input event-input";
    labels.appendChild(event);

    // Input for event due date
    const dueDate = document.createElement("input");
    dueDate.setAttribute("type", "date");
    dueDate.setAttribute("placeholder", "");
    dueDate.setAttribute("required", "required");
    dueDate.className = "input date-input";
    labels.appendChild(dueDate);

    // Input for event priority
    const priority = document.createElement("select");
    priority.setAttribute("type", "text");
    priority.required = true;
    priority.className = "input priority-input";
    labels.appendChild(priority);

    // Creates a placeholder in the select dropdown
    let placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true;
    placeholder.textContent = "Ugency:";
    priority.appendChild(placeholder);

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
    notes.setAttribute("type", "text");
    notes.setAttribute("placeholder", "Notes (optional)");
    notes.className = "input notes-input";
    labels.appendChild(notes);

    // Confirm button
    const confirm = document.createElement("button");
    confirm.type = "submit";
    confirm.id = "confirm";
    confirm.textContent = "Add event";
    form.appendChild(confirm);

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

// Adds new event to local storage after the "add event"
// button is clicked
function addEventLocal(event, dueDate, priority, notes) {
    let storedEvents = localStorage.getItem("events");
    const newEvent = new Event(event, dueDate, priority, notes);
    if (!storedEvents) {
        storedEvents = [newEvent];
    } else {
        storedEvents = JSON.parse(storedEvents);
        storedEvents.push(newEvent);
    }
    localStorage.setItem("events", JSON.stringify(storedEvents));
};
