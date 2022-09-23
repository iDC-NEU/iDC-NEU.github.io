/* ************************** */
/*                            */
/*     duotive Slideshow      Download by http://www.codefans.net*/
/*                            */
/*   Version: gallery v1.1    */
/*                            */
/* ************************** */

var dtSliderGallery = new Class({
	Implements: Chain,
	initialize: function(options){
		// setting up the options
		this.options = options;
		that = this;
		
		// checking != the slider container exists
		if (this.options.container != null) {
			this.setupImages();
		}
	},
			
	setupImages: function(){
		slides = $$('#slider-images-wrapper a');
		var images = $$('#slider-images-wrapper img');
		var imagesSrc = [];
		var imageAssets = [];
		images.each(function(item, index){
			var parent = item.getParent('a');
			imagesSrc[index] = item.getProperty('src');
			imageAssets[index] = Asset.image(imagesSrc[index], {
				onComplete: parent.setStyle('display', 'block')
			});		
			if (index == images.length - 1) {
				that.setupGallery();				
			}		
		});		
	},
	
	setupGallery: function(){
		var galleryUl = $$('#gallery-slider #slider-main-ul');
		that.options.galleryUl = galleryUl[0];
		galleryLi = that.options.galleryUl.getChildren('li');
		galleryLiWidth = 320;
		galleryUlWidth = galleryLi.length * galleryLiWidth;
		that.options.galleryUl.setStyle('width', galleryUlWidth);
		that.options.galleryItems = galleryLi.length;
		that.play();
	},
	
	play: function(){
		counter = 0;
		var scrollCurrentStep = 0;
											
		// gallery effects
		var galleryFx = new Fx.Tween(
			that.options.galleryUl, {
				duration: that.options.transitionDuration, 
				transition: Fx.Transitions.Linear,
				wait: false
			}
		); 
		function animateGallery(value){
			galleryFx.cancel();
			galleryFx.start('left', -value);
		}
		
		// adding hover effects to the thumbnails
		if (that.options.description == true) {
			slides.each(function(item, index){
				var child = item.getElement('span');
				child.setStyle('opacity', 0);
				var slidesFx = new Fx.Tween(child, {duration: 400});
				item.addEvents({
					'mouseenter': function(){
						slidesFx.cancel();
						slidesFx.start('opacity', 1);
					},
					'mouseleave': function(){
						slidesFx.cancel();
						slidesFx.start('opacity', 0);
					}
				});
			});		
		}
		
		// slideshow loop		
		function periodical(){
			play = (function(){
				scrollCurrentStep++;
				if ( scrollCurrentStep > scrollMaxRange ) { scrollCurrentStep = 0; }
				sliderScroll.set(scrollCurrentStep);
			}).periodical(that.options.transitionInterval);
		}
		periodical();
		
		// setting up the scroll bar
		var sliderScrollDiv = $('slider-scroll');
		var scrollHandleFx = new Fx.Tween(sliderScrollDiv.getElement('.knob'), {
			duration: 500,
			transition: Fx.Transitions.Expo.easeInOut,
			wait: false
		});
		
		var scrollMaxRange = parseInt(parseInt($('slider-images-wrapper').getStyle('width'), 10) / galleryLiWidth, 10);
		scrollMaxRange = galleryLi.length - scrollMaxRange;
		var maxPosition = galleryUlWidth - parseInt($('slider-images-wrapper').getStyle('width'), 10);
		if ( scrollMaxRange > 0 ) {
			var scrollHandleWidth = parseInt(parseInt(sliderScrollDiv.getStyle('width'), 10) / (scrollMaxRange+1), 10);
			if (scrollHandleWidth < 28) { scrollHandleWidth = 28; }
			sliderScrollDiv.getElement('.knob').setStyle('width', scrollHandleWidth);			
		} else {
			scrollMaxRange = 0;
		}
		
		function scrollOnChange(value) {
			$clear(play);
			scrollCurrentStep = value;
			var galleryPosition = value * galleryLiWidth;
			maxPosition = galleryUlWidth - parseInt($('slider-images-wrapper').getStyle('width'), 10);
			if ( galleryPosition >= maxPosition ) {
				galleryPosition = maxPosition;
			}
			if ( scrollMaxRange == 0 ){
				galleryPosition = -parseInt((parseInt($('slider-images-wrapper').getStyle('width'), 10) - galleryUlWidth)/2, 10);
			}
			animateGallery(galleryPosition);
			periodical();
		}
		
		var sliderScroll = new Slider(sliderScrollDiv, sliderScrollDiv.getElement('.knob'), {
				range: [0, scrollMaxRange],
				initialStep: 0,
				wheel: false,
				snap: true,
				onTick: function(value){
					scrollHandleFx.cancel();
					scrollHandleFx.start('left', value);
				},
				onChange: function(value){
					scrollOnChange(value);
				}
		});
		
		function arrowLeft() {
			counter--; 
			if ( counter < 0 ) { 
				counter = 0;
			}
			scrollCurrentStep--;
			if ( scrollCurrentStep < 0 ) { 
				scrollCurrentStep = 0;
			}
			sliderScroll.set(scrollCurrentStep);
		}
		
		function arrowRight() {
			counter++; 
			if ( counter > scrollMaxRange ) {
				counter = scrollMaxRange;
			}
			scrollCurrentStep++;
			if (scrollCurrentStep > scrollMaxRange) {
				scrollCurrentStep = scrollMaxRange;
			}
			sliderScroll.set(scrollCurrentStep);
		}
		
		if (scrollMaxRange != 0) {
			// adding scroll arrows events
			var scrollArrowLeft = $('slider-scroll-left');
			scrollArrowLeft.addEvents({
				'click': arrowLeft
			});
			var scrollArrowRight = $('slider-scroll-right');
			scrollArrowRight.addEvents({
				'click': arrowRight
			});
			
			// setting up the left and right arrows
			if (that.options.arrowControls == true) {
				var slideArrowLeft = $('slider-control-left');
				slideArrowLeft.addEvents({
					'click': arrowLeft
				});
				var slideArrowRight = $('slider-control-right');
				console.log("hello world");
				console.log(slideArrowRight)
				slideArrowRight.addEvents({
					'click': arrowRight
				});
			}
		}
		
		// adding events to prettyPhoto	
		function prettyPhotoEvents(){
			var pp_Close = $$('a.pp_close');		
			if (pp_Close != null) {
				$clear(play);
				pp_Close = pp_Close[0];
				pp_Close.addEvents({
					'click':function(){
						periodical();
					}
				});
			}
			var ppOverlay = $$('div.pp_overlay');
			if (ppOverlay != null) {
				$clear(play);
				ppOverlay = ppOverlay[0];
				ppOverlay.addEvents({
					'click':function(){
						periodical();
					}
				});
			}	
		}
		
		// when an image is clicked
		slides.each(function(item){
			item.addEvents({
				'click':function(){
					prettyPhotoEvents();
				}
			});
		});
		
		// main trigger function
		function transition() {
			sliderScroll.set(counter);	
		}
				
		// calling the main functions
		transition();	
	}
});