import addEventLocal from "./localStorage";
import { sort } from "./sort";
import { clearTodoSection } from "./sort";

// I build a modal that creates a new event using
// a form to collect needed info

export default function buildEventModal() {

    const content = document.getElementById("content");

    // Builds the dialog modal
    const dialogContainer = document.createElement("div");
    dialogContainer.style.display = "none";
    dialogContainer.id = "dialogContainer";
    content.appendChild(dialogContainer);

    const gridContainer = document.createElement("div");
    gridContainer.id = "gridContainer";
    dialogContainer.appendChild(gridContainer);

    const title = document.createElement("p");
    title.textContent = "New Event";
    gridContainer.appendChild(title);

    const form = document.createElement("form");
    form.id = "addEventDialog";
    gridContainer.appendChild(form);

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
    eventLabel.classList.add("underline");
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
    dueDateLabel.classList.add("underline");
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
    priorityLabel.classList.add("underline");
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
    notesLabel.classList.add("underline");
    form.appendChild(notesLabel);
    form.appendChild(notes);

    // Confirm button
    const confirm = document.createElement("button");
    confirm.type = "submit";
    confirm.id = "confirm";
    confirm.textContent = "Add event";
    gridContainer.appendChild(confirm);

    // Confirms event with input in modal
    confirm.addEventListener("click", (e) => {
        e.preventDefault();

        if (!notes.value) {
            notes.value = "No notes";
        }

        // Adds event to local storage
        addEventLocal(event.value, dueDate.value, priority.value, notes.value);

        // Clears all inputs for modal
        clearModalInputs();

        // Hides the modal
        changeModalDisplay(dialogContainer);

        // Changes buttons text content from confirm to +
        document.querySelector("#addButton").textContent = "+";

        const todoSection = document.querySelector(".todoSection"); // Select the todo section
        sort(todoSection.id);
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

        // Displays modal when the + button is clicked
        clearTodoSection();
        changeModalDisplay(modalLocation);
        addButton.textContent =
            modalLocation.style.display === "block" ? "x" : "+";
    });
}

// Changes the display of the modal based on its current state
export function changeModalDisplay(modal) {
    if (modal.style.display == "none") {
        modal.style.display = "block";
    } else {
        modal.style.display = "none";
    }
}

// Clears the inputs of the modal
function clearModalInputs() {

    // Selects all inputs in the dialog container to be cleared
    const inputs = document.querySelectorAll("#dialogContainer input");
    inputs.forEach((input) => {
        input.value = "";
    });

    // Resets the select drop down for urgency
    const selects = document.querySelectorAll("#dialogContainer select");
    selects.forEach((select) => {
        select.selectedIndex = 0;
    });
}


