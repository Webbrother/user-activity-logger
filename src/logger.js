// Event types:
// Minimal set:
//      an element has received focus,
//      an input element has been clicked.
// Intermediate: minimal + the following:
//      keyboard events while the focus on an input element (i.e., typing an answer),
//      clipboard events:
//          the selection has been copied to the clipboard
//          OR
//          the item from the clipboard has been pasted.
// Maximal: minimal + intermediate + the following:
//     mouse movement events,
//     scrolling


export default class Logger {
    constructor() {
        console.log('class constructor');

        // document.addEventListener();
    }

    init() {

    }
}
