import helloWorldEvent from "./event.js";
import buildSortSection from "./sort.js";
import buildTodoSection from "./todo.js";
import helloWorldMonthly from "./monthly.js";
import buildEventModal from "./addEventModal.js";
import "./style.css";

const content = document.getElementById("content");
buildEventModal(content);
buildSortSection(content);
buildTodoSection(content);

helloWorldEvent();
helloWorldSort();
helloWorldToDo();
helloWorldMonthly();
