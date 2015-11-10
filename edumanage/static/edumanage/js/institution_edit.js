// javascript moved from "institution_edit.html" file


$(document).ready(function() {
	
	$("#adduserSubmit").click(function(){
		var addUserUrl = $('#js-user').data('adduserurl');
		$.ajax({
			url:addUserUrl,
			data:$("#add_user_form").serialize(),
			type: "POST",
			cache: false,
			success:function(data){
					try {
						value = data.value;
						text = data.text;
						if (typeof value === 'undefined' && typeof text === 'undefined'){
							$('#mymodalbody').html(data);
						}
						else{
							$('#id_contact').append($("<option></option>").attr("value",value).text(text));
							$('#myModal').modal('hide')
						}
					}
					catch (exception) {
						$('#mymodalbody').html(data);
					}
				}
				});
		return false;
	});

	$("#add_contact").click(function(){		
		var addContactUrl = $('#js-contact').data('addcontacturl');
		$('#myModal').modal('show');
		$.ajax({
			url:addContactUrl,
			type: "GET",
			success: function(data){
				$('#mymodalbody').html(data);
			}
		});

	 return false;
	});

	var formsetUrlsform = $('#js-urlsform').data('urlsform');

	$('#urlsform tbody tr').formset({

        prefix: formsetUrlsform,
        formCssClass: "dynamic-formset1",
        added: addButton,
    });

    $(".delete-row").prepend('<i class="icon-remove-sign icon-white"></i> ').addClass('btn btn-small btn-warning');
    $(".add-row").prepend('<i class="icon-plus-sign icon-white"></i> ').addClass('btn btn-small btn-info');


});
function addButton(row){
            $(row).find(".delete-row").prepend('<i class="icon-remove-sign icon-white"></i> ').addClass('btn btn-small btn-warning');
        }
