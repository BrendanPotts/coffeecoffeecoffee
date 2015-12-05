// Shop Admin Functions
jQuery(document).ready(function() {
    jQuery('#shoplist').DataTable( {
        "ordering": true,
        "bFilter": false,
        "ajax": "/cms/get_shop_list.json"
    });
});
