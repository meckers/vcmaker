var ClipNote = ClipNote || {};

ClipNote.MouseSelection = {

	init: function(callback) {

		this.callback = callback;
		var me = this;

		$("body").on('mousedown', function (e) {
			me.handleMouseDown(e);
		}).on('mouseup', function(e) {
			me.handleMouseUp();
		}).on('mousemove', function(e) {
			me.handleMouseMove(e);
		});		
	},

	destroyElement: function() {
		this.element.remove();
		this.element = null;
	},

	handleMouseDown: function(e) {
		this.destroyElement();
		//canvas.style.cursor = "crosshair";		
		this.isDrawing = true
		this.startX = parseInt(e.clientX);
		this.startY = parseInt(e.clientY);

		e.stopPropagation();
	},

	handleMouseUp: function(e) {
		this.isDrawing = false;
		if (this.callback) {
			this.callback(this.element);
		}
		// TOOD: fixa ett smidigt sätt att kunna börja om med sin markering
		$("body").off('mousedown');
		$("body").off('mousemove');
		$("body").off('mouseup');

		//e.stopPropagation();
	},

	handleMouseMove: function(e) {

		if (!this.element) {
			this.element = this.createElement();
			$("body").append(this.element);
		}

		if (this.isDrawing) {

			var mouseX = parseInt(e.clientX);
			var mouseY = parseInt(e.clientY);				

			this.element.css('width', mouseX - this.startX);
			this.element.css('height', mouseY - this.startY);

			e.stopPropagation();

		}
	},

	createElement: function() {
		var el = jQuery('<div></div>');
		el.addClass('mouse-selection');
		el.css('top', this.startY);
		el.css('left', this.startX);
		return el;
	},

	getValues: function() {
		return {
			top: this.element.offset().top,
			left: this.element.offset().left,
			width: this.element.width(),
			height: this.element.height()
		}
	},

	hideBorder: function() {
		this.element.addClass('no-border');
	},

	showBorder: function() {
		this.element.removeClass('no-border');
	}


}