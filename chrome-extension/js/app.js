var ClipNote = ClipNote || {};

ClipNote.App = {
	
	frame: null,
	sidebar: null,
	baseUrl: 'http://localhost:9873',

	init: function() {
        $('body').addClass('eckersvcmaker');
		this.frame = ClipNote.Frame;
		this.registerListeners();
        ClipNote.Messages.init();
	},

	activate: function() {
		this.openSidebar();
		this.frame.init();
	},

	registerListeners: function() {
		//chrome.runtime.onMessage.addListener(this.onMessage);
		var me = this;
		/*
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			me.onMessage(request, sender, sendResponse);
		});*/
	},

	// Called whenever the extension script sends a message to (this) content script.
	/*
	onMessage: function(request, sender, sendResponse) {
		if (request.image) {
			var values = this.frame.getValues();
			this.postData(request.image, request.imageNaked, values.top, values.left, values.width, values.height);
		}
	},*/

	openSidebar: function() {
        ClipNote.SideBar.init('body', this.baseUrl + '/edit');
        /*
        this.sidebar = $('<iframe></iframe>');
        this.sidebar.attr('id', 'chinti_edit');
        this.sidebar.addClass('sidebar');
        $('body').append(this.sidebar);
        this.sidebar.attr('src', this.baseUrl + '/edit'); */
	},

	// Since I want to specify target, It seems I need to do this via an injected form:
	postData: function(imageWithCaption, image, top, left, width, height) {
		var fform = $('<form></form>');
		fform.attr({
			'id': 'chinti_uploadform',
			'method': 'POST',
			'target': 'chinti_edit',
			'enctype': 'multipart/form-data',
			'action': this.baseUrl + '/edit/add'
		});
		
		if ($("#chinti_uploadform")) {
			$("#chinti_uploadform").remove();
		}

		$('body').append(fform);
		this.appendInput('imageWithCaption', imageWithCaption, fform);
		this.appendInput('image', image, fform);
		this.appendInput('top', Math.ceil(top), fform);
		this.appendInput('left', Math.ceil(left), fform);
		this.appendInput('width', Math.ceil(width), fform);
		this.appendInput('height', Math.ceil(height), fform);
		$("#chinti_uploadform").submit();

	},

	appendInput: function(name, value, fform) {
	    var input = $('<input/>');
	    input.attr('type', 'hidden');
	    input.attr('name', name);
	    input.val(value);
	    fform.append(input);    
	}	
}