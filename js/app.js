/* ============================================ |
 *           Muhammad Habib Rohman              |
 * ============================================ |
 *             mhrohman@Live.com                |
 *       Please, Do not remove license          |
 *              Copyright@2016                  |
 * ---------------------------------------------|
 */

'use strict';

/**
 * Event when window scrolling
 * @param  {object} ) {		var       wTop Scrolltop position on window scroll
 * @return {string}   
 */
var lastWTop = 0;
$(window).scroll( function () {
	// Animated navigate button
	var wTop = $(window).scrollTop();

	var header = $('header'),
		headerHeight = $(header).height(),
		headerOffsetTop = $(header).offset().top

	// if (wTop > lastWTop) { 

	// 	if (wTop > 0 && wTop < headerHeight + headerOffsetTop) {
	// 		$('body, html').animate({
	// 			scrollTop: headerHeight + headerOffsetTop
	// 		}, 500)
	// 	}
	// } else {
		
	// 	if (wTop > 0 && wTop < headerHeight + headerOffsetTop) {
	// 		$('body, html').animate({
	// 			scrollTop: 0
	// 		}, 500)
	// 	}
	// }
	// lastWTop = wTop;


	$('.navigate').css({top: wTop + 'px'})
})

var navigate = new Vue({
	el: '#navigate',
	data: {
		opened: true,
		setting: {
			opened: false,
			themeDark: false
		},
		navigate: {}
	},
	methods: {
		getNavigate: function () {
			var vm = this;
			$.get('json/navigate.json', function (res) {
				vm.$set('navigate', JSON.parse(res).data);
			});
		},
		decodeHTML: function (html) {
		    var txt = document.createElement("textarea");
		    txt.innerHTML = html;
		    return txt.value;
		}
	},
	ready: function () {
		this.getNavigate();
	}
})

/**
 * History 
 * @return void
 */
var myhistory = new Vue({
	el: '#history',
	data: {
		history: ['pendidikan','prestasi', 'sertifikat', 'pengalaman'],
		historyIndex: 0,
		datas: {},
		navigateClick: false,
		buttonNavigate: true
	},
	methods: {
		getDatas: function () {
			var data, 
				vm = this,
				history = vm.$get('history')[vm.$get('historyIndex')];
			vm.animContent(true);
			vm.$set('buttonNavigate', false);
			setTimeout(function () {
				$.get('json/' + history + '.json', function (res) {
					data = JSON.parse(res);
					vm.$set('datas', data.data);
					vm.animContent(false);
					vm.$set('buttonNavigate', true);
				})
			}, 400)
		},
		nextDatas: function () {
			var newHistoryIndex = this.$get('historyIndex') + 1;

			if ( newHistoryIndex < this.$get('history').length ) {
				this.$set('historyIndex', newHistoryIndex);
			} else {
				this.$set('historyIndex', 0);
			}
			this.$set('navigateClick', true);
			this.getDatas();
		},
		prevDatas: function () {
			var newHistoryIndex = this.$get('historyIndex') - 1;

			if ( newHistoryIndex < 0 ) {
				this.$set('historyIndex', this.$get('history').length - 1);
			} else {
				this.$set('historyIndex', newHistoryIndex);
			}
			this.$set('navigateClick', true);
			this.getDatas();	
		},
		animContent: function (out) {
			var out = out || false;
			if (out) {
				$('#history table').addClass('bounceOut');
				$('#history table').removeClass('bounceIn');
			} else {
				$('#history table').addClass('bounceIn');
				$('#history table').removeClass('bounceOut');
			}
			if (this.navigateClick) {
				goTopElement('#history')
			}
		}
	},
	ready: function () {
		this.getDatas();
	}
})
$(window).on('click', function () {
	hideNavigate();
})
$(window).on('load', function () {
	/**
	 * Protect website from a thief 
	 * @type void
	 */
	// var mywebsite = 'localhost';
	// if (window.location.hostname != mywebsite) {
	// 	window.location.href = 'http://rohmanhm.github.io/'
	// }
})
/**
 * Toggling body element to change theme
 * @return void
 */
function toggleTheme () {
	$('body').toggleClass('dark');
	if ($('body').hasClass('dark')) {
		navigate.$set('setting.themeDark', true)
	}else{
		navigate.$set('setting.themeDark', false)
	}
	return false;
}

function toggleNavigate () {
	var nav = $('.navigate').toggleClass('hide');
	if ($(nav).hasClass('hide')) {
		navigate.$set('opened', true)
	} else {
		navigate.$set('opened', false)
	}
}
function hideNavigate () {
	var nav = $('.navigate').addClass('hide');
	navigate.$set('opened', true)
}
$('.navigate').on('click', function (event) {
	event.stopPropagation();
});

$('section .title').on('click', function (event) {
	var parentEl = $(this)[0].parentElement;
	goTopElement(parentEl);
});
$('.buble-status li').on('click', function () {
	var dataHistory = $(this).attr('data-history');

	if (typeof(dataHistory) != 'number') {
		dataHistory = parseInt(dataHistory);
		myhistory.$set('historyIndex', dataHistory);
		myhistory.getDatas();
		return false;
	}
	myhistory.getDatas();
	myhistory.$set('historyIndex', dataHistory);
});
function goTopElement (el) {
	$('body, html').animate({
		scrollTop: $(el).offset().top
	}, 500)
}