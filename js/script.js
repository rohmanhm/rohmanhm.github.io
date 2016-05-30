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

colorIndex = 'blue';

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
		$('.profile-position').css({
			'color' : color.background
		})

		$('.image-profile, hr').css({
			'border-color' : color.backgroundDark
		})
	}
}

