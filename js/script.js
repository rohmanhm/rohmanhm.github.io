/**************************************************************************************
 *  CV PAGE by MUHAMMAD HABIB ROHMAN
 **************************************************************************************
 *	Creator	: Muhammad Habib Rohman
 *	Website	: github.com/rohmanhm
 *	
 **************************************************************************************/

'use strict';

var colorDB, colorIndex;
var elemDB;

var prestasiDB;

/** @type {Array} [element database] */
elemDB = [
	'section#sidebar',
	'.certified button'
];

/**
 * Index warna yang akan muncul
 * @type {String}
 */
colorIndex = 'red';

/**
 * Event document load
 * @param  {[type]} ){	$.get('color_choice.json', function(data){		var data mengambil data
 * @return {[type]}                                mengambil data
 */
$(function(){
	$.get('color_choice.json', function(data){
		if(typeof(data) == 'string'){
			var data = JSON.parse(data);
		}
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

	$.get('prestasi.json', function(data){
		if(typeof(data) == 'string'){
			var data = JSON.parse(data);
		}

		prestasiDB = data;
	})
})

/**
 * Memasang settingan ke web
 * 
 */
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

$('.certified button').click(function(){
	
	$("#lihat-sertifikat").addClass("active");
	var type = $(this).attr('data-type');
	var cert = $(this).attr('data-cert');

	$("#wrapper-sertifikat").html("");

	var data = prestasiDB[type][cert].data;

	for(var i = 0; i < data.length; i++){
		var divParent = document.createElement('div');
		divParent.classList.add('image-overlay');

		var divTitle = document.createElement('div');
		divTitle.classList.add('image-title');
		var h3 = document.createElement('h3');
		h3.textContent = data[i].title;
		document.createTextNode(h3);
		divTitle.appendChild(h3);
		document.createTextNode(divTitle);
		divParent.appendChild(divTitle);

		var divImage = document.createElement('div');
		divImage.classList.add('image-file');
		var img = document.createElement('img');
		img.src = data[i].image;
		document.createTextNode(img);
		divImage.appendChild(img);
		document.createTextNode(divImage);
		divParent.appendChild(divImage);

		document.createTextNode(divParent);

		$("#wrapper-sertifikat").append(divParent);

		if(data.length < 2){
			$('.image-overlay').css({
				'width' : '75%'
			})
		}else{
			$('.image-overlay').css({
				'width' : '48%'
			})
		}
	}

})

function hideSertifikat(){
	$("#lihat-sertifikat").removeClass("active");
	return false;
}