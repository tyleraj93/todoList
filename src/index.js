import helloWorldEvent from "./event.js";
import helloWorldSort from "./sort.js";
import helloWorldToDo from "./todo.js";
import helloWorldMonthly from "./monthly.js";
import eventModal, { buildModalButton} from "./addEventModal.js";

const content = document.getElementById("content");
eventModal(content);

const modal = document.querySelector(".dialogContainer");
buildModalButton(content, modal);

helloWorldEvent();
helloWorldSort();
helloWorldToDo();
helloWorldMonthly();
