$(function() {
    window.addEventListener('message', function(e) {
        if (e.data.command == 'showMessage') {
            $("#instructions").html('<i class="fa fa-info-circle"></i>' + e.data.message);
        }
    });
})