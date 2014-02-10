chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {
    file: 'js/start.js'
  }); 
});

function respond(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
        console.log(response.farewell);
    });
  });
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {    

    var imageData = "";
    console.log("extension script recieved message:", request);
    if (request.command == 'capture-tab') {
        chrome.windows.getCurrent(function (win) {  
            chrome.tabs.captureVisibleTab(win.id, {"format":"png"}, function(imgUrl) {
                imageData = imgUrl;
                console.log("sendresponse", imageData);
                sendResponse({
                    image: imageData,
                    test: request.test
                });
                /*respond({
                    image: imgUrl,
                    originalCommand: request.command,
                    captionVisible: request.captionVisible
                });*/
            });    
        });

    }
    return true;
});






