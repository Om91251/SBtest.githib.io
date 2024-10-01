document.addEventListener('DOMContentLoaded', function () {
	testimonialSlider();
	svgAnimation('animated-svg-1');
	svgAnimation('animated-svg-2');
	svgAnimation('animated-svg-3');
});

function svgAnimation(svgId) {
	var animatedSvgObject = document.getElementById(svgId);
	let scrollTimeout = null;
	let lastScrollTop = 0;
	let scrollDirection = '';
	let onScrollDown = null;
	let onScrollUp = null;
	let onScrollStopped = null;

	function detectScroll() {
		const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// detect scroll direction
		if (currentScrollTop > lastScrollTop) {
			scrollDirection = 'down';
			if (onScrollDown) {
				onScrollDown();
			}
		} else if (currentScrollTop < lastScrollTop) {
			scrollDirection = 'up';
			if (onScrollUp) {
				onScrollUp();
			}
		}

		lastScrollTop = currentScrollTop;

		// detect when scrolling stops
		if (scrollTimeout != null) {
			window.cancelAnimationFrame(scrollTimeout);
		}

		scrollTimeout = window.requestAnimationFrame(function () {
			scrollDirection = 'stopped';
			if (onScrollStopped) {
				onScrollStopped();
			}
		});
	}

	window.addEventListener('scroll', detectScroll);

	function setOnScrollDown(callback) {
		onScrollDown = callback;
	}

	function setOnScrollUp(callback) {
		onScrollUp = callback;
	}

	function setOnScrollStopped(callback) {
		onScrollStopped = callback;
	}

	document.addEventListener('scroll', function () {
		if (isInViewPort(animatedSvgObject)) {
			var animatedSvg = animatedSvgObject.contentDocument.querySelector('svg');
			setOnScrollDown(function () {
				if (animatedSvg.svgatorPlayer.hasEnded === false) {
					animatedSvg.svgatorPlayer.play();
				}
			});
		}

	}, false);
}

function isInViewPort(element) {
	const rect = element.getBoundingClientRect();

	const isInViewport = rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth);

	return isInViewport;
}

function testimonialSlider() {
	let testimonialSliderCardImages = document.querySelectorAll('.testimonial-card-image');

	testimonialSliderCardImages.forEach(function (cardImage) {
		let image = cardImage.querySelector('.elementor-element-populated').innerHTML;
		let trimmedImage = image.trim();

		if (trimmedImage.length === 0) {
			cardImage.parentElement.classList.add('no-image');
		}
	});
}
