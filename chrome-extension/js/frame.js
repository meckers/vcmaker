var ClipNote = ClipNote || {};

ClipNote.Frame = {

	element: null,
	image: null,
	imageWithCaption: null,
	text: null,
	textEditor: null,
	mouseSelection: null,

	init: function() {
		//this.element = element;
		this.textEditor = ClipNote.TextEditor;
		this.mouseSelection = ClipNote.MouseSelection;
		this.enableSelection();
		this.registerListeners();
	},

	registerListeners: function() {
		var me = this;
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			me.onMessage(request, sender, sendResponse);
		});
	},

	onMessage: function(request, sender, sendResponse) {
		if (request.originalCommand == 'capture-tab') {
			this.onCaptureResponse(request);
		}
	},

	enableSelection: function() {
		var me = this;
		this.mouseSelection.init(function(element) {
			me.onSelectionComplete(element);
		});	
	},

	onSelectionComplete: function(element) {
		this.element = element;
		this.textEditor.create(element);
		this.createGrabButton();
	},

	createGrabButton: function() {
		var me = this;
		var ClipNote_snapshotButton = jQuery("<div></div>");
		ClipNote_snapshotButton.html("GRAB ->");
		ClipNote_snapshotButton.addClass("snapshot-button");
		ClipNote_snapshotButton.click(function() {
			me.grabFrame();
		});
		this.element.append(ClipNote_snapshotButton);
	},

	grabFrame: function() {
		var me = this;
		this.mouseSelection.hideBorder();
		this.captureImages(function() {
			me.mouseSelection.showBorder();
		});
	},

	captureImages: function(callback) {
		var me = this;
		chrome.runtime.sendMessage({
			command: "capture-tab",
			test: '1'
		}, function(response) {
			document.getElementById('chinti-texteditor').style.display = 'none';
			if (response.image) {
				me.imageWithCaption = response.image;
			}
			//me.textEditor.show();

			// TODO: DETTA MÅSTE FIXAS, vi kan inte förlita oss på en setTimout.
			setTimeout(function() {
				chrome.runtime.sendMessage({
					command: "capture-tab",
					test: '2'
				}, function(secondResponse) {
					if (secondResponse.image) {					
						me.image = secondResponse.image;
						document.getElementById('chinti-texteditor').style.display = 'block';
						me.checkIfReadyToPost();
					}			
				});				
			}, 500);

		}); 		
	},

	checkIfReadyToPost: function() {
		if (this.imageWithCaption && this.image) {
			var values = this.getValues();
			console.log(this.imageWithCaption.substr(this.imageWithCaption.length-10), this.image.substr(this.image.length-10));
			ClipNote.App.postData(this.imageWithCaption, this.image, values.top, values.left, values.width, values.height);
		}
	},

	getValues: function() {
		return this.mouseSelection.getValues();
	}

};