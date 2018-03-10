$(document).ready(function() {
	$('.custom-file-input').on('change', function() { 
	    let fileName = $(this).val().split('\\').pop(); 
	    $(this).next('.custom-file-label').html(fileName); 
	});

	function verifyCert() {
		var data = new FormData();
		data.append('cert', $('#cert')[0].files[0]);
		$.ajax({
		    url: "/verifyCert",
		    type: "post",
		    data: data,
		    cache: false,
		    contentType: false,
		    processData: false
		})
		.done(function(res){
			$("#cert_info_container").css('display','block');
			if(res != '') { 	
				$("#cert_info_content").html(res);
			} else {
				$("#cert_info_content").html('Lo siento, no se pudo obtener la informacion de tu certificado...<br/>Estas seguro que es un archivo valido?');
			}
	    	console.log(res);
	    });


	}

	function verifyKey() {
		var data = new FormData();
		data.append('key', $('#key')[0].files[0]);
		data.append('pass', $('#pass').val());

		$.ajax({
		    url: "/verifyKey",
		    type: "post",
		    data: data,
		    cache: false,
		    contentType: false,
		    processData: false
		})
		.done(function(res){
			$("#key_info_container").css('display','block');
			if(res != '') { 	
				$("#key_info_content").html(res);
			} else {
				$("#key_info_content").html('No se pudo cargar tu llave. Clave incorrecta.');
			}
	    	console.log(res);
	    });


	}

	$("#btnVerifyCert").click(function(evt){
		evt.preventDefault();
		verifyCert();
	})

	$("#btnVerifyKey").click(function(evt){
		evt.preventDefault();
		verifyKey();
	})
});