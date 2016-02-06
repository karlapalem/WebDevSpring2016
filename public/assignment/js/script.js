/**
 * Created by poojitha on 2/5/16.
 */
/* jQuery to activate off canvas sidebar */
$(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });
});
