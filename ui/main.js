$(function(){

	$('#main').on('click', '.player', function(){

		let target = $(this).attr('id');
		let player = $('#main').attr('id');
		if (target === player) {
			alert("You can't spectate yourself !");
		} else {
			$('#main').fadeOut();
			$.post('http://esx_spectate/select', JSON.stringify({target}));
		}

	});

	$('#main').on('click', '.btnKick', function(){

		let target = $(this).attr('id');

		let reason = prompt("KICK REASON", "Pseudo RP SVP");

		if (reason == null || reason == "") {
		    alert("MISSING KICK REASON")
		} else {
		    $('#main').fadeOut();
			$.post('http://esx_spectate/kick', JSON.stringify({reason}));
		}
	});

	window.addEventListener('message', function(event){
		if (event.data.type == "show"){
			let data = event.data.data;
			let player = event.data.player;
			$('#main').attr('id', player);
			populate(data);
			setTimeout(function(){
				$('#main').fadeIn();
			}, 200)
		}
	});

	$(document).keyup(function(e){
		if (e.keyCode == 27){
			$('#main').fadeOut();
			$.post('http://esx_spectate/close');
		}
	})

});

function populate(data){
	$('#main #players').html('');

	data.sort(function(a, b) {
		let idA = a.id;
		let idB = b.id;
		if (idA < idB)
	        return -1 
	    if (idA > idB)
	        return 1
	    return 0
	});

	for (var i = 0; i < data.length; i++) {
		let id = data[i].id;
		let name = data[i].name;

		let element = 	'<tr class="player" id="' + id + '">' +
							'<td class="player_id">' + id + '</td>' +
							'<td class="player_name">' + name + '</td>' +
							'<td class="btn_kick" id="' + id + '">KICK</td>' +
						'</tr>';

		$('#players').append(element);
	}

}