import { retrieveLocalEvents } from "./localStorage";
import { buildTodoEvent } from "./todo";
import { isToday, isSameWeek, isSameMonth } from "date-fns";
// I build the sidebar with buttons to sort by
// today, this week, this month, all projects,
// and completed

export default function buildSortSection(location) {
    const sortSection = document.createElement("div");
    sortSection.id = "sortSection";

    const todoText = document.createElement("p");
    todoText.textContent = "Todo";
    todoText.classList.add("sidebar-text");
    sortSection.appendChild(todoText);

    const todayButton = document.createElement("button");
    todayButton.textContent = "Today";
    todayButton.classList.add("sidebar-text");
    todayButton.addEventListener("click", () => sortToday());
    sortSection.appendChild(todayButton);

    const weekButton = document.createElement("button");
    weekButton.textContent = "This week";
    weekButton.classList.add("sidebar-text");
    weekButton.addEventListener("click", () => sortWeek());
    sortSection.appendChild(weekButton);

    const monthButton = document.createElement("button");
    monthButton.textContent = "This month";
    monthButton.classList.add("sidebar-text");
    monthButton.addEventListener("click", () => sortMonth());
    sortSection.appendChild(monthButton);

    location.appendChild(sortSection);
}

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

function clearTodoSection() {
    const todoSection = document.getElementById("todoSection");
    todoSection.textContent = "";
}

function sortToday() {
    clearTodoSection();
    const events = retrieveLocalEvents("events");
    for (const event of events) {
        const eventDay = event._date;
        console.log(`${year}-${month}-${day}`);
        if (eventDay == `${year}-${month}-${day}`) {
            buildTodoEvent(event);
        };
    }
};

function sortWeek() {
    clearTodoSection();
    const events = retrieveLocalEvents("events");
    for (const event of events) {
        const eventDay = new Date(event._date);
        if (isSameWeek(today, eventDay)) {
            buildTodoEvent(event);
        }
    }
}


function sortMonth() {
    clearTodoSection();
    const events = retrieveLocalEvents("events");
    for (const event of events) {
        const eventDay = new Date(event._date);
        if (isSameMonth(today, eventDay)) {
            buildTodoEvent(event);
        }
    }
}