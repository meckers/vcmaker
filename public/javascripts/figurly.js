var Figurly = {
    toggleTemplate: function() {
        var hidden = $("img.image.hidden");
        var visible = $("img.image:not('.hidden')");
        if (hidden) { hidden.removeClass('hidden'); }
        if (visible) { visible.addClass('hidden'); }
    }
}


Figurly.SideBar = {

    init: function() {
        this.listen();
    },

    listen: function() {
        var me = this;
        window.addEventListener('message', function(e) {
            me.recieveMessage(e);
        });

        Events.register("SELECTION_ACTIVATED", this, function(e) {
            // deactivate selection button
            $('#start-selection-button').attr('disabled', 'true');
        });

        Events.register("SELECTION_CANCELLED", this, function(e) {
            // re-activate selection button
            $('#start-selection-button').removeAttr('disabled');
        });
    },

    recieveMessage: function(m) {
        if (m.data.command == 'showMessage') {
            $("#instructions").html('<i class="fa fa-info-circle"></i>' + e.data.message);
        }
        else if (m.data.command == "event") {
            Events.trigger(m.data.message.name, m.data.message.data);
        }
    },

    startSelection: function() {
        // send message to parent.
        parent.postMessage({command: 'startSelection'}, "*");
    }

}