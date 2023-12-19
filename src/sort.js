import { retrieveLocalEvents } from "./localStorage";
import { buildTodoEvent } from "./todo";
import { isToday, isSameWeek, isSameMonth } from "date-fns";
// I build the sidebar with buttons to sort by
// today, this week, this month, incomplete,
// and completed

export default function buildSortSection(location) {
    const sortSection = document.createElement("div");
    sortSection.id = "sortSection";
    location.appendChild(sortSection);

    const todoText = document.createElement("p");
    todoText.textContent = "Todo";
    todoText.classList.add("sidebar-text");
    sortSection.appendChild(todoText);

    const sortByDateSection = document.createElement("div");
    sortByDateSection.classList.add("by-date");
    sortSection.appendChild(sortByDateSection);

    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";
    todayButton.classList.add("sidebar-button");
    todayButton.addEventListener("click", () => sort("today"));
    sortByDateSection.appendChild(todayButton);

    const weekButton = document.createElement("button");
    weekButton.textContent = "This week";
    weekButton.classList.add("sidebar-button");
    weekButton.addEventListener("click", () => sort("week"));
    sortByDateSection.appendChild(weekButton);

    const monthButton = document.createElement("button");
    monthButton.textContent = "This month";
    monthButton.classList.add("sidebar-button");
    monthButton.addEventListener("click", () => sort("month"));
    sortByDateSection.appendChild(monthButton);

    const sortByCompletionSection = document.createElement("div");
    sortByCompletionSection.classList.add("by-completion");
    sortSection.appendChild(sortByCompletionSection);

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("sidebar-button")
    completeButton.addEventListener("click", () => sort("complete"));
    sortByCompletionSection.appendChild(completeButton);

    const incompleteButton = document.createElement("button");
    incompleteButton.textContent = "Incomplete";
    incompleteButton.classList.add("sidebar-button");
    incompleteButton.addEventListener("click", () => sort("incomplete"));
    sortByCompletionSection.appendChild(incompleteButton);


}

function clearTodoSection() {
    const todoSection = document.getElementById("todoSection");
    todoSection.textContent = "";
}

function sort(criteria) {
    clearTodoSection();
    const events = retrieveLocalEvents("events");
    let today = new Date();

    switch (criteria) {
        case "today":
            events.forEach((event) => {
                if (event._date === today.toISOString().split("T")[0]) {
                    buildTodoEvent(event);
                }
            });
            break;
        case "week":
            events.forEach((event) => {
                let eventDate = new Date(event._date);
                if (isSameWeek(today, eventDate)) {
                    buildTodoEvent(event);
                }
            });
            break;
        case "month":
            events.forEach((event) => {
                let eventDate = new Date(event._date);
                if (isSameMonth(today, eventDate)) {
                    buildTodoEvent(event);
                }
            });
            break;
        case "complete":
            events.forEach((event) => {
                if (event._complete) {
                    buildTodoEvent(event);
                }
            });
            break;
        case "incomplete":
            events.forEach((event) => {
                if (!event._complete) {
                    buildTodoEvent(event);
                }
            });
            break;
    }
}