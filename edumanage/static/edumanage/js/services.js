
$(document).ready(function(){

	var services = $('#js-services').data('services');
	var jsontext = $('#js-trans').data('json');
	var delurl = $('#js-delurl').data('delurl');

	if(services){
		var oTable = $('#table')
		.on( 'init.dt', function () {
	       	$('.pagination ul').addClass('pagination');
	    })
	    .dataTable({
			"sPaginationType": "bootstrap",
			"sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>",
			"aoColumns": [{
		        "bSearchable": true,
		        "bSortable": true
		    },
		    {
		        "bSearchable": true,
		        "bSortable": true
		    },
		    {
		        "bSearchable": true,
		        "bSortable": true
		    },
		    {
		        "bSearchable": true,
		        "bSortable": true
		    },
		    {
		        "bSearchable": true,
		        "bSortable": true
		    },
		    {
		        "bVisible": true,
		        "bSearchable": false,
		        "bSortable": false
		    }],
		    "aaSorting": [[0, 'desc']],
		    "iDisplayLength": 25,
		    "oSearch": {"bSmart": false, "bRegex":true},
		    "oLanguage": {
		    	"sLengthMenu": jsontext.display+' <select><option value="25">25</option><option value="50">50</option><option value="-1">'+jsontext.all+'</option></select> '+jsontext.loc,
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
		$('[id^=del_service_]').click(function(){
			server_id = (this.id).replace("del_service_", '');
			name = this.getAttribute("data-servicename");
			$("#mymodalbody").html(jsontext.dellocwarn+" <b>"+name+"</b><br>"+jsontext.presdel);
			$("#myModalLabel").html(jsontext.delloc+name);
			$('#myModal').modal('show');
			$(".modal-footer").show();
			$("#service_name_del").html(name)
			return false;
		});

		$("#delserviceSubmit").click(function(){
			$.ajax({
				url:delurl+"?service_pk="+server_id,
				type: "GET",
				success: function(data){
					if (data.error){
						$(".modal-footer").hide();
						$("#mymodalbody").html("<font style='color:#B94A48'>"+data.error+"</font>");
					}
					if (data.success){
						$(".modal-footer").hide();
						$("#mymodalbody").html(jsontext.service+" "+name+" "+jsontext.succdel);
						window.setTimeout('location.reload()', 1000);

					}
					}
				});
		});
	}
});