document.addEventListener('DOMContentLoaded', (event) => {
	document.addEventListener('contextmenu', (event) => {
		event.preventDefault(); // Prevents the default context menu
		console.log('Right-click is disabled'); // Optional: log message to console
	});
});

(function ($) {
	'use strict';

	jQuery(document).on('ready', function () {

		/*PRELOADER JS*/
		$(window).on('load', function () {
			setTimeout(function () {
				$('.preloaders').fadeToggle();
			}, 1500);
		});
		/*END PRELOADER JS*/

		/*START MENU JS*/
		$(".mobile_menu").simpleMobileMenu({
			"menuStyle": "slide"
		});
		/*END MENU JS*/

		/*START VIDEO JS*/
		$('.video-play').magnificPopup({
			type: 'iframe'
		});
		$('.magnific_popup').magnificPopup({
			type: 'iframe'
		});
		/*END VIDEO JS*/

		/* START COUNTDOWN JS*/
		$('.counter_feature').on('inview', function (event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).find('.counter-num').each(function () {
					var $this = $(this);
					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				$(this).unbind('inview');
			}
		});
		/* END COUNTDOWN JS */

		/*START TESTIMONIAL JS*/
		$("#testimonial-slider").owlCarousel({
			items: 2,
			itemsDesktop: [1000, 2],
			itemsDesktopSmall: [980, 2],
			itemsTablet: [768, 1],
			itemsMobile: [650, 1],
			pagination: true,
			navigation: true,
			navigationText: ["", ""],
			slideSpeed: 1000,
			autoPlay: false
		});
		/*END TESTIMONIAL JS*/

		/*START PARTNER LOGO*/
		$('.partner').owlCarousel({
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			items: 5,
			itemsDesktop: [1199, 3],
			itemsDesktopSmall: [979, 3]
		});
		/*END PARTNER LOGO*/

		/* GOOGLE FORM SUBMISSION */
		const scriptURL = 'https://script.google.com/macros/s/AKfycbwzGvlQmGbxicKmREz-HnTq6ez-uO9C183eN_Sq1R6Egsg4hR_8im-NINeGbHz26jp8/exec';
		const form = document.forms['submit-to-google-sheet'];
		const msg = document.getElementById('msg');

		form.addEventListener('submit', e => {
			e.preventDefault();
			fetch(scriptURL, { method: 'POST', body: new FormData(form) })
				.then(response => {
					msg.innerHTML = "You're all set! Stay tuned for exciting updates."
					setTimeout(function () { msg.innerHTML = "" }, 4000)
					form.reset()
				})
				.catch(error => console.error('Error!', error.message));
		});

	});

	/*START WOW ANIMATION JS*/
	new WOW().init();
	/*END WOW ANIMATION JS*/

})(jQuery);

/*START MARQUEE JS*/
let lastTime = (new Date()).getTime(),
	currentTime = 0,
	counter = 0;

const myScroller1 = new SuperMarquee(
	document.getElementById("supermarquee1"),
	{
		"content": "Cybersecurity &nbsp &nbsp Microsoft 365 Admin Management &nbsp &nbsp Operating System Troubleshooting &nbsp &nbsp Virtualization Solutions &nbsp &nbsp Vulnerability Assessment & Penetration Testing &nbsp &nbsp Network Security & Management &nbsp &nbsp Linux Installations and Support &nbsp &nbsp Customize ERP &nbsp &nbsp Help Desk Support &nbsp &nbsp"
	}
);

function loop() {
	window.requestAnimationFrame(loop);
	currentTime = (new Date()).getTime();
	delta = (currentTime - lastTime) / 9000;
	myScroller4.setPerspective("{ \"rotateY\" : " + 30 * Math.sin(delta) + "}");
}

loop();
/*END MARQUEE JS*/

function validation() {
	var name = document.forms["enq"]["name"].value;
	var email = document.forms["enq"]["email"].value;
	var subject = document.forms["enq"]["subject"].value;
	var message = document.forms["enq"]["message"].value;

	if (name == "" || email == "" || subject == "" || message == "") {
		alert("All fields must be filled out.");
		return false;
	}

	return true;
}

$(document).ready(function () {
	$("#testimonial-slider").owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 5000, /* 5 seconds */
		autoplayHoverPause: true,
		nav: false,
		dots: true
	});
});
