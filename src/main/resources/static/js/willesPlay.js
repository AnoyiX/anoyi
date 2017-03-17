$(function() {
	var playVideo = $('video');
	var playPause = $('.playPause'); //播放和暂停
	var currentTime = $('.timebar .currentTime'); //当前时间
	var duration = $('.timebar .duration'); //总时间
	var progress = $('.timebar .progress-bar'); //进度条
	var volumebar = $('.volumeBar .volumewrap').find('.progress-bar');
	playVideo[0].volume = 0.4; //初始化音量
	playPause.on('click', function() {
		playControl();
	});
	$('.playContent').on('click', function() {
		playControl();
	}).hover(function() {
		$('.turnoff').stop().animate({
			'right': 0
		}, 500);
	}, function() {
		$('.turnoff').stop().animate({
			'right': -40
		}, 500);
	});
	$(document).click(function() {
		$('.volumeBar').hide();
	});
	playVideo.on('loadedmetadata', function() {
		duration.text(formatSeconds(playVideo[0].duration));
	});

	playVideo.on('timeupdate', function() {
		currentTime.text(formatSeconds(playVideo[0].currentTime));
		progress.css('width', 100 * playVideo[0].currentTime / playVideo[0].duration + '%');
	});
	playVideo.on('ended', function() {
		$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
		playPause.toggleClass('playIcon');
	});
	
	$(window).keyup(function(event){
		event = event || window.event;
			if(event.keyCode == 32)playControl();
			if(event.keyCode == 27){
			$('.fullScreen').removeClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'bottom': -48
			}).removeClass('fullControll');
			};
		event.preventDefault();
	});
	
	
	//全屏
	$('.fullScreen').on('click', function() {
		if ($(this).hasClass('cancleScreen')) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozExitFullScreen) {
				document.mozExitFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
			$(this).removeClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'bottom': -48
			}).removeClass('fullControll');
		} else {
			if (playVideo[0].requestFullscreen) {
				playVideo[0].requestFullscreen();
			} else if (playVideo[0].mozRequestFullScreen) {
				playVideo[0].mozRequestFullScreen();
			} else if (playVideo[0].webkitRequestFullscreen) {
				playVideo[0].webkitRequestFullscreen();
			} else if (playVideo[0].msRequestFullscreen) {
				playVideo[0].msRequestFullscreen();
			}
			$(this).addClass('cancleScreen');
			$('#willesPlay .playControll').css({
				'left': 0,
				'bottom': 0
			}).addClass('fullControll');
		}
		return false;
	});
	//音量
	$('.volume').on('click', function(e) {
		e = e || window.event;
		$('.volumeBar').toggle();
		e.stopPropagation();
	});
	$('.volumeBar').on('click mousewheel DOMMouseScroll', function(e) {
		e = e || window.event;
		volumeControl(e);
		e.stopPropagation();
		return false;
	});
	$('.timebar .progress').mousedown(function(e) {
		e = e || window.event;
		updatebar(e.pageX);
	});
	//$('.playContent').on('mousewheel DOMMouseScroll',function(e){
	//	volumeControl(e);
	//});
	var updatebar = function(x) {
		var maxduration = playVideo[0].duration; //Video 
		var positions = x - progress.offset().left; //Click pos
		var percentage = 100 * positions / $('.timebar .progress').width();
		//Check within range
		if (percentage > 100) {
			percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}

		//Update progress bar and video currenttime
		progress.css('width', percentage + '%');
		playVideo[0].currentTime = maxduration * percentage / 100;
	};
	//音量控制
	function volumeControl(e) {
		e = e || window.event;
		var eventype = e.type;
		var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
		var positions = 0;
		var percentage = 0;
		if (eventype == "click") {
			positions = volumebar.offset().top - e.pageY;
			percentage = 100 * (positions + volumebar.height()) / $('.volumeBar .volumewrap').height();
		} else if (eventype == "mousewheel" || eventype == "DOMMouseScroll") {
			percentage = 100 * (volumebar.height() + delta) / $('.volumeBar .volumewrap').height();
		}
		if (percentage < 0) {
			percentage = 0;
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-off');
		}
		if (percentage > 50) {
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-up');
		}
		if (percentage > 0 && percentage <= 50) {
			$('.otherControl .volume').attr('class', 'volume glyphicon glyphicon-volume-down');
		}
		if (percentage >= 100) {
			percentage = 100;
		}
		$('.volumewrap .progress-bar').css('height', percentage + '%');
		playVideo[0].volume = percentage / 100;
		e.stopPropagation();
		e.preventDefault();
	}

	function playControl() {
			playPause.toggleClass('playIcon');
			if (playVideo[0].paused) {
				playVideo[0].play();
				$('.playTip').removeClass('glyphicon-play').addClass('glyphicon-pause').fadeOut();
			} else {
				playVideo[0].pause();
				$('.playTip').removeClass('glyphicon-pause').addClass('glyphicon-play').fadeIn();
			}
		}
		//关灯
	$('.btnLight').click(function(e) {
		e = e || window.event;
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$('body').append('<div class="overlay"></div>');
			$('.overlay').css({
				'position': 'absolute',
				'width': 100 + '%',
				'height': $(document).height(),
				'background': '#000',
				'opacity': 1,
				'top': 0,
				'left': 0,
				'z-index': 999
			});
			$('.playContent').css({
				'z-index': 1000
			});
			$('.playControll').css({
				'bottom': -48,
				'z-index': 1000
			});

			$('.playContent').hover(function() {
				$('.playControll').stop().animate({
					'height': 48,
				},500);
			}, function() {
				setTimeout(function() {
					$('.playControll').stop().animate({
						'height': 0,
					}, 500);
				}, 2000)
			});
		} else {
			$(this).addClass('on');
			$('.overlay').remove();
			$('.playControll').css({
				'bottom': 0,
			});
		}
		e.stopPropagation();
		e.preventDefault();
	});
});

//秒转时间
function formatSeconds(value) {
	value = parseInt(value);
	var time;
	if (value > -1) {
		hour = Math.floor(value / 3600);
		min = Math.floor(value / 60) % 60;
		sec = value % 60;
		day = parseInt(hour / 24);
		if (day > 0) {
			hour = hour - 24 * day;
			time = day + "day " + hour + ":";
		} else time = hour + ":";
		if (min < 10) {
			time += "0";
		}
		time += min + ":";
		if (sec < 10) {
			time += "0";
		}
		time += sec;
	}
	return time;
}