import helloWorldEvent from "./event.js";
import buildSortSection from "./sort.js";
import buildTodoSection from "./todo.js";
import helloWorldMonthly from "./monthly.js";
import buildEventModal, { buildModalButton } from "./addEventModal.js";

const content = document.getElementById("content");
buildEventModal(content);
buildSortSection(content);
buildTodoSection(content);

const modal = document.querySelector("#dialogContainer");
// Takes in placement and modal location
buildModalButton(content, modal);

helloWorldEvent();
helloWorldSort();
helloWorldToDo();
helloWorldMonthly();
