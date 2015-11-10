
$(document).ready(function(){

    var servers = $('#js-servers').data('servers');
    var jsontext = $('#js-trans').data('json');
    var delurl = $('#js-delurl').data('delurl');


    if(servers){
        var oTable = $('#table')
    	.on( 'init.dt', function () {
           	$('.pagination ul').addClass('pagination');
        })
        .dataTable({
        	"sPaginationType": "bootstrap",
        	"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
        	"aoColumns": [{
                "bSearchable": true,
                "bSortable": true
            }, {
                "bSearchable": true,
                "bSortable": true
            }, {
                "bSearchable": true,
                "bSortable": true
            },  {
                "bSearchable": true,
                "bSortable": true
            }, {
                "bVisible": true,
                "bSearchable": false,
                "bSortable": false
            }],
            "aaSorting": [[0, 'desc']],
            "iDisplayLength": 25,
            "oSearch": {"bSmart": false, "bRegex":true},
            "oLanguage": {
            	"sLengthMenu": jsontext.display+' <select><option value="25">25</option><option value="50">50</option><option value="-1">'+jsontext.all+'</option></select> '+jsontext.servers,
                "sProcessing":   "Processing...",
                "sZeroRecords": jsontext.nrecs,
                "sInfo":         jsontext.showing,
                "sInfoEmpty":    jsontext.entries,
                "sInfoFiltered": "(filtered from _MAX_ total entries)",
                "sInfoPostFix":  "",
                "sSearch":       jsontext.search,
                "sUrl":          "",
                "oPaginate": {
                    "sFirst":    jsontext.first,
                    "sPrevious": jsontext.prev,
                    "sNext":     jsontext.next,
                    "sLast":     jsontext.last
                }
            }
        });

        oTable.fnDraw();

        $('[id^=del_server_]').click(function(){
        	server_id = (this.id).replace("del_server_", '');
        	name = this.getAttribute("data-servername");
        	$("#mymodalbody").html(jsontext.delservwarn+" <b>"+name+"</b><br>"+jsontext.presdel);
        	$("#myModalLabel").html(jsontext.delserv+" "+name);
        	$('#myModal').modal('show');
        	$(".modal-footer").show();
        	$("#server_name_del").html(name)
        	return false;
        });

        $("#delserverSubmit").click(function(){
        	$.ajax({
        		url:delurl+"?server_pk="+server_id,
        		type: "GET",
        		success: function(data){
        			if (data.error){
        				$(".modal-footer").hide();
        				$("#mymodalbody").html("<font style='color:#B94A48'>"+data.error+"</font>");
        			}
        			if (data.success){
        				$(".modal-footer").hide();
        				$("#mymodalbody").html(jsontext.server+" "+name+" "+jsontext.succdel);
        				window.setTimeout('location.reload()', 1000);

        			}
        			}
        		});
        });


    }
});