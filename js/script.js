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

elemDB = [
	'section#sidebar',
];

colorIndex = 'red';

$(function(){
	$.get('color_choice.json', function(data){
		colorDB = data;
		applyColor();
	})
})

// Memasang settingan ke web
function applyColor(){
	for(var x = 0; x < elemDB.length; x++){
		var elem = $(elemDB[x]);

		var color = colorDB.color[colorIndex];
		elem.css({
			'background' : color.background,
			'color' : color.color
		})
		$('.profile-position, td.table-title, .panel-group i, td.ui .title').css({
			'color' : color.background
		})

		$('.group-detail').css({
			'color' : color.color
		})

		$('.image-profile, hr, .panel-group i').css({
			'border-color' : color.backgroundDark
		})

		$('.group-content h4').css({
			'background' : color.backgroundDark
		})
	}
}

$('#color-choice li').click(function(e){
	var data = $(this).attr('data-color');

	colorIndex = data;
	applyColor();
})