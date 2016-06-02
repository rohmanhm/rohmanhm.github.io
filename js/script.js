/**************************************************************************************
 *  CV PAGE by MUHAMMAD HABIB ROHMAN
 **************************************************************************************
 *	Creator	: Muhammad Habib Rohman
 *	Website	: github.com/rohmanhm
 *	
 **************************************************************************************/

'use strict';

// Melakukan inisialisasi ketika web di load
var colorDB, colorIndex;
var elemDB;

var prestasiDB;

elemDB = [
	'section#sidebar',
	'.certified button'
];

colorIndex = 'red';

$(function(){
	$.get('color_choice.json', function(data){
		var data = JSON.parse(data);
		colorDB = data;
		var style= '<style type="text/css">';
		var endStyle = '</style>';

		for(var a in data.color){
			style += '[data-color=' + a + '] .certified button::before{border-right-color:' + data.color[a].background + ';}';
			style += ' [data-color=' + a + '] .panel-group:hover i{background : ' + data.color[a].background + '; color : ' + data.color[a].color + '!IMPORTANT;  }';
		}
		style += endStyle;
		$(style).appendTo('head');
		applyColor();
	})

	// $.get('prestasi.json', function(data){
	// 	prestasiDB = data;
	// })
})

// Memasang settingan ke web
function applyColor(){
	$('body').attr('data-color', colorIndex);

	for(var x = 0; x < elemDB.length; x++){
		var elem = $(elemDB[x]);

		var color = colorDB.color[colorIndex];

		for(var i = 0; i < elem.length; i++){
			$(elem[i]).css({
				'background' : color.background,
				'color' : color.color
			})
		}
		
		$('.profile-position, td.table-title, .panel-group i, td.ui .title').css({
			'color' : color.background
		})

		$('.group-detail, .qr-text').css({
			'color' : color.color
		})

		$('.image-profile, hr, .panel-group i').css({
			'border-color' : color.backgroundDark
		})

		$('.certified button::before').css({
			'border-right-color' : color.background
		})

		$('.group-content h4, .qr-text').css({
			'background' : color.backgroundDark
		})
	}
}

$('#color-choice li').click(function(e){
	var data = $(this).attr('data-color');

	colorIndex = data;
	applyColor();
})

function openSertifikat(){
	$("#lihat-sertifikat").addClass("active");
}

function hideSertifikat(){
	$("#lihat-sertifikat").removeClass("active");
}