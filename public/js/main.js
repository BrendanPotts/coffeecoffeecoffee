/*-----------------------------------------------------------------------------------*/
/*	WELCOME FADE IN
/*-----------------------------------------------------------------------------------*/
$(document).ready(function(){
'use strict';
	// animates header content
	$("#welcome_in").delay(1000).fadeIn(400);
	$("#more").delay(1400).fadeIn(400);
	
	//keeps height of home div same as visitor's monitor height
	$('#home').css({'height':($(window).height())+'px'});
	$(window).resize(function(){
	$('#home').css({'height':($(window).height())+'px'});
	});

	// sticky navigation menu
	$("#nav").sticky({topSpacing:0});

});

/*-----------------------------------------------------------------------------------*/
/*	FULL SCREEN FIRST SECTION
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';
	
	$(window).resize(function(){
		$('section.full').css({ 'height' : $(window).height() });
	});
	
	$(window).trigger('resize');

});

/*-----------------------------------------------------------------------------------*/
/*	SCROLL TO TOP OF PAGE
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($){
'use strict';

	$('.scroller').click(function(){
		var url = $(this).attr('href');
		$("html, body").animate({ scrollTop: $(url).offset().top - 64 }, 500);
		return false;
	});
	
	$('#selectnav .scroller').click(function(){
		$('#selectnav .scroller').removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	$(window).scroll(function(){
		
		var scrollTop = $(window).scrollTop() / 12;
		
		if( scrollTop < 20 ){
			$('header').css({
				'padding-top' : 25 - scrollTop, 
				'padding-bottom' : 25 - scrollTop
			});
		} else {
			$('header').css({
				'padding-top' : 5, 
				'padding-bottom' : 5
			});
		}
		
		$('#selectnav .scroller').each(function(){
			var scrollHref = $(this).attr('href');
			if( $(window).scrollTop() > $(scrollHref).offset().top - 240 ) {
				$('#selectnav .scroller').removeClass('active');
				$(this).addClass('active');
			}
		});
		
	});

});

/*-----------------------------------------------------------------------------------*/
/*	ANIMATIONS
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($){
'use strict';

var animate, item, items, mobile, _i, _len;

    mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      animate = function(animation) {
        return $(animation[0]).addClass("concealed").viewportChecker({
          classToAdd: "visible animated " + (animation[1].trim()),
          offset: 200
        });
      };
      items = [['#about p', 'fadeInUp'], ['#about a.downloadCV', 'fadeIn'], ['#skills .row', 'fadeInUp'], ['#portfolio .row', 'fadeInUp'], ['#contact .row', 'fadeInUp'], ['.column', 'fadeInUp'], ['.item', 'fadeInDown'], ['.bar', 'fadeInRight'], ['.paperplane', 'bounceInDown'], ['#quote .container', 'fadeIn'], ['#quote .icon', 'fadeInDown']];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        animate(item);
      }
    
    return $("#footer ul li").hover(function() {
      return $(this).find('p').stop(true, true).fadeIn(800);
    }, function() {
      return $(this).find('p').stop(true, true).fadeOut(800);
    });
});

/*-----------------------------------------------------------------------------------*/
/*	OVERLAY MENU
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($){
'use strict';

	$('#overlay-menu').click(function(event) {
		event.preventDefault();
			$('.navigation-wrapper').fadeIn();
			$('.navigation').fadeIn();
	});

	$('.navigation-wrapper ul li a').click(function(event) {
		event.preventDefault();
			$('.navigation-wrapper').fadeOut();
	});

	$('.navigation-wrapper a').click(function(event) {
		event.preventDefault();
			$('.navigation-wrapper').fadeOut();
	});
  
});

jQuery(document).ready(function($){
'use strict';

	$("#contact-form").submit(function() {

    var url = "contact-process.php"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#contact-form").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the php script.
           }
         });

    return false; // avoid to execute the actual submit of the form.
});
  
});