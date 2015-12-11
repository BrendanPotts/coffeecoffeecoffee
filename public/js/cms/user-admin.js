// Shop Admin Functions
jQuery(document).ready(function() {
    jQuery('#userlist').DataTable( {
        "ordering": true,
        "bFilter": false,
        "ajax": "/cms/get_user_list.json"
    });
});
