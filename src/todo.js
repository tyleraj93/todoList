// I display the selected projects in the range
// selected from sort.

export default function buildToDoSection(location) {
    const toDoSection = document.createElement("div");
    toDoSection.id = "toDoSection";
    location.appendChild(toDoSection);
}