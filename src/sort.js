import { retrieveLocalEvents } from "./localStorage";
import { buildTodoEvent } from "./todo";
import { isSameWeek, isSameMonth } from "date-fns";
import { buildModalButton, changeModalDisplay } from "./addEventModal";
// Import necessary functions and libraries

// Function to build sorting section in the UI
export default function buildSortSection() {

    const content = document.getElementById("content");

    const sortSection = document.createElement("div"); // Create a div for the sort section
    sortSection.id = "sortSection"; // Assign an ID to the sort section

    content.appendChild(sortSection); // Append the sort section to the content section

    // Add a paragraph for displaying "Todo" text
    const todoText = document.createElement("h1");
    todoText.textContent = "Tyler's Todo Manager";
    todoText.classList.add("sidebar-text");
    sortSection.appendChild(todoText);

    // Create a div for sorting by date and add it to the sort section
    const sortByDateSection = document.createElement("div");
    sortByDateSection.classList.add("by-date");
    sortSection.appendChild(sortByDateSection);

    // Create and setup the "Today" button
    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";
    todayButton.classList.add("sidebar-button");
    todayButton.addEventListener("click", () => sort("today"));
    sortByDateSection.appendChild(todayButton);

    // Create and setup the "This week" button
    const weekButton = document.createElement("button");
    weekButton.textContent = "This week";
    weekButton.classList.add("sidebar-button");
    weekButton.addEventListener("click", () => sort("week"));
    sortByDateSection.appendChild(weekButton);

    // Create and setup the "This month" button
    const monthButton = document.createElement("button");
    monthButton.textContent = "This month";
    monthButton.classList.add("sidebar-button");
    monthButton.addEventListener("click", () => sort("month"));
    sortByDateSection.appendChild(monthButton);

    // Create a div for sorting by completion status and add it to the sort section
    const sortByCompletionSection = document.createElement("div");
    sortByCompletionSection.classList.add("by-completion");
    sortSection.appendChild(sortByCompletionSection);

    // Create and setup the "Complete" button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Completed";
    completeButton.classList.add("sidebar-button");
    completeButton.addEventListener("click", () => sort("complete"));
    sortByCompletionSection.appendChild(completeButton);

    // Create and setup the "Incomplete" button
    const incompleteButton = document.createElement("button");
    incompleteButton.textContent = "Incomplete";
    incompleteButton.classList.add("sidebar-button");
    incompleteButton.addEventListener("click", () => sort("incomplete"));
    sortByCompletionSection.appendChild(incompleteButton);

    const modal = document.querySelector("#dialogContainer");
    buildModalButton(sortSection, modal);
}

// Function to clear the todo section
export function clearTodoSection() {
    const todoSection = document.querySelector(".todoSection");
    todoSection.textContent = ""; // Clear the content of the todo section
}

// Function to sort events based on different criteria
export function sort(criteria) {
    clearTodoSection(); // Clear the existing todo items
    if (document.getElementById("dialogContainer").style.display === "block") {
        changeModalDisplay(document.getElementById("dialogContainer"));
        document.getElementById("addButton").textContent = "+";
    }
    let events = retrieveLocalEvents("events"); // Retrieve events from local storage
    let today = new Date(); // Get the current date
    const todoSection = document.querySelector(".todoSection"); // Select the todo section

    switch (criteria) {
        case "today":
            // Filter and display events for today
            events.forEach((event) => {
                if (
                    event._date === today.toLocaleDateString("en-CA") &&
                    event._complete === false
                ) {
                    buildTodoEvent(event);
                    todoSection.id = "today";
                }
            });
            break;
        case "week":
            // Filter and display events for this week
            events.forEach((event) => {
                let eventDate = new Date(event._date);
                if (isSameWeek(today, eventDate) && event._complete === false) {
                    buildTodoEvent(event);
                    todoSection.id = "week";
                }
            });
            break;
        case "month":
            // Filter and display events for this month
            events.forEach((event) => {
                let eventDate = new Date(event._date);
                if (
                    isSameMonth(today, eventDate) &&
                    event._complete === false
                ) {
                    buildTodoEvent(event);
                    todoSection.id = "month";
                }
            });
            break;
        case "complete":
            // Filter and display completed events
            events.forEach((event) => {
                if (event._complete) {
                    buildTodoEvent(event);
                    todoSection.id = "complete";
                }
            });
            const completedEvents = document.querySelectorAll(".complete-button");
            for (let event of completedEvents) {
                event.textContent = event.textContent === "Complete" ? "Undo" : "Complete";
            }
            break;
        case "incomplete":
            // Filter and display incomplete events
            events.forEach((event) => {
                if (!event._complete) {
                    buildTodoEvent(event);
                    todoSection.id = "incomplete";
                }
            });
            break;
    }
}
