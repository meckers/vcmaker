var ClipNote = ClipNote || {};

ClipNote.Messages = {

    PRE_SELECTION : 'Select an area on the page by clicking and dragging the mouse. Start with the top left corner.',
    SELECTING: 'Keep the mouse button pressed and drag until you have marked the desired area.',
    POST_SELECTION: 'Now enter a caption or delete it. When done, click "grab" to capture the area. Right click anywhere to clear the selection.',
    POST_GRAB: 'Great! If you are satisifed with your creation, click "save & share", otherwise, repeat the steps to add more images.',

    sendMessage: function(messageName) {
        document.getElementById('chinti_edit').contentWindow.postMessage({command: 'showMessage', message: ClipNote.Messages[messageName]}, "http://localhost:9873");
    }
}