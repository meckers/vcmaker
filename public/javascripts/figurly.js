var Figurly = {
    toggleTemplate: function() {
        var hidden = $("img.image.hidden");
        var visible = $("img.image:not('.hidden')");
        if (hidden) { hidden.removeClass('hidden'); }
        if (visible) { visible.addClass('hidden'); }
    }
}