import Event from "./event"; // Import the Event class
import { toggleCompleteStatus, deleteEvent } from "./localStorage"; // Import function to toggle completion status of an event

// Function to create the main todo section in the UI
export default function buildTodoSection(location) {
    const todoSection = document.createElement("div"); // Create a div element for the todo section
    todoSection.classList.add("todoSection"); // Add a class for styling
    location.appendChild(todoSection); // Append the todo section to the specified location
}

// Function to build and display an individual todo event
export function buildTodoEvent(eventInfo) {
    let myEvent = new Event(
        eventInfo._name,
        eventInfo._date,
        eventInfo._priority,
        eventInfo._notes
    ); // Create a new Event instance

    const todoSection = document.querySelector(".todoSection"); // Select the todo section

    const eventDiv = document.createElement("div"); // Create a div to hold the event information
    eventDiv.classList.add("event-Div"); // Add a class for styling
    todoSection.appendChild(eventDiv); // Append the event div to the todo section

    const completeButton = document.createElement("button"); // Create a button to toggle completion status
    completeButton.addEventListener("click", () => {
        toggleCompleteStatus(myEvent); // Add event listener to toggle the status when clicked
    });
    eventDiv.appendChild(completeButton); // Append the button to the event div

    const deleteButton = document.createElement("button"); //Create a button to delete an event
    deleteButton.addEventListener("click", () => {
        deleteEvent(myEvent); // Add event listener to delete the selected event
    });
    eventDiv.appendChild(deleteButton); // Append the button to the event div

    const eventTitle = document.createElement("p"); // Create a paragraph for the event title
    eventTitle.classList.add("event-title"); // Add a class for styling
    eventTitle.textContent = `${eventInfo._name}`; // Set the text content to the event name
    eventDiv.appendChild(eventTitle); // Append the title to the event div

    const eventDueDate = document.createElement("p"); // Create a paragraph for the event due date
    eventDueDate.classList.add("event-due-date"); // Add a class for styling
    eventDueDate.textContent = `${eventInfo._date}`; // Set the text content to the event due date
    eventDiv.appendChild(eventDueDate); // Append the due date to the event div

    const eventNotes = document.createElement("p"); // Create a paragraph for the event notes
    eventNotes.classList.add("event-notes"); // Add a class for styling
    eventNotes.textContent = `${eventInfo._notes}`; // Set the text content to the event notes
    eventDiv.appendChild(eventNotes); // Append the notes to the event div

    const eventPriority = document.createElement("p"); // Create a paragraph for the event priority
    eventPriority.classList.add("event-priority"); // Add a class for styling
    eventPriority.textContent = `${eventInfo._priority}`; // Set the text content to the event priority
    eventDiv.appendChild(eventPriority); // Append the priority to the event div
}
