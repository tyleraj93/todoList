import { retrieveLocalEvents } from "./localStorage";
import { buildTodoEvent } from "./todo";
import { isSameWeek, isSameMonth } from "date-fns";
// Import necessary functions and libraries

// Function to build sorting section in the UI
export default function buildSortSection(location) {
    const sortSection = document.createElement("div"); // Create a div for the sort section
    sortSection.id = "sortSection"; // Assign an ID to the sort section
    location.appendChild(sortSection); // Append the sort section to the given location

    // Add a paragraph for displaying "Todo" text
    const todoText = document.createElement("p");
    todoText.textContent = "Todo";
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
    completeButton.textContent = "Complete";
    completeButton.classList.add("sidebar-button");
    completeButton.addEventListener("click", () => sort("complete"));
    sortByCompletionSection.appendChild(completeButton);

    // Create and setup the "Incomplete" button
    const incompleteButton = document.createElement("button");
    incompleteButton.textContent = "Incomplete";
    incompleteButton.classList.add("sidebar-button");
    incompleteButton.addEventListener("click", () => sort("incomplete"));
    sortByCompletionSection.appendChild(incompleteButton);
}

// Function to clear the todo section
function clearTodoSection() {
    const todoSection = document.querySelector(".todoSection");
    todoSection.textContent = ""; // Clear the content of the todo section
}

// Function to sort events based on different criteria
export function sort(criteria) {
    clearTodoSection(); // Clear the existing todo items
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
