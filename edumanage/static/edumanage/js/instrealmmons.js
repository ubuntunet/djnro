
$(document).ready(function(){

	var realms = $('#js-realms').data('realms');
	var jsontext = $('#js-trans').data('json');
	var delurl1 = $('#js-delrealmmon').data('delurl');
	var delurl2 = $('#js-delrealmpar').data('delurl');

	var jsontext2 = $('#js-trans-par').data('json');

	if(realms){
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
			},
			{
				"bVisible": true,
				"bSearchable": false,
				"bSortable": false
			},
			{
				"bSearchable": true,
				"bSortable": true
			}
			],
			"aaSorting": [[0, 'desc']],
			"iDisplayLength": 25,
			"oSearch": {"bSmart": false, "bRegex":true},
			"oLanguage": {
				"sLengthMenu": jsontext.display+' <select><option value="25">25</option><option value="50">50</option><option value="-1">'+jsontext.all+'</option></select> '+jsontext.realms,
				"sProcessing":   "Processing...",
				"sZeroRecords": jsontext.nrecs,
				"sInfo":         jsontext.showing,
				"sInfoEmpty":    jsontext.nrecs,
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

		$('[id^=del_instrealmmon_]').click(function(){
			instrealmmon_pk = (this.id).replace("del_instrealmmon_", '');
			name = this.getAttribute("data-realmname");
			$("#mymodalbody").html(jsontext.dellocwarn+": <b>"+name+"</b><br>"+jsontext.presdel);
			$("#myModalLabel").html(jsontext.delrealm+" "+name);
			$('#myModal').modal('show');
			$("#modalfooter1").show();
			return false;
		});

		$("#delrealmSubmit").click(function(){
			$.ajax({
				url:delurl1+"?instrealmmon_pk="+instrealmmon_pk,
				type: "GET",
				success: function(data){
					if (data.error){
						$("#modalfooter1").hide();
						$("#mymodalbody").html("<font style='color:#B94A48'>"+data.error+"</font>");
					}
					if (data.success){
						$(".modal-footer").hide();
						$("#mymodalbody").html(jsontext.realm +" "+name+" "+jsontext.succdel);
						window.setTimeout('location.reload()', 1000);

					}
				}
			});
		});


		$('[id^=del_monlocauthpar_]').click(function(){
			monlocauthpar_pk = (this.id).replace("del_monlocauthpar_", '');
			name = this.getAttribute("data-realmname");
			$("#mymodalbody2").html(jsontext2.abouttodel+": <b>"+name+"</b><br>"+jsontext.presdel);
			$("#myModalLabel2").html(jsontext2.delmonrealmparam+name);
			$('#myModal2').modal('show');
			$("#modalfooter1").show();
			return false;
		});

		$("#delmonlocauthparSubmit").click(function(){
			$.ajax({
				url:delurl2+"?monlocauthpar_pk="+monlocauthpar_pk,
				type: "GET",
				success: function(data){
					if (data.error){
						$("#modalfooter2").hide();
						$("#mymodalbody2").html("<font style='color:#B94A48'>"+data.error+"</font>");
					}
					if (data.success){
						$("#modalfooter2").hide();
						$("#mymodalbody2").html(jsontext2.monrealmparam+" "+name+jsontext.succdel);
						window.setTimeout('location.reload()', 1000);

					}
				}
			});
		});
	}
});