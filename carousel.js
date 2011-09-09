/**
<element>
	<element>
		<!-- these bits slide about -->
			<element />
			<element />
			<element />
			...
			<element />
		<!-- these bits slide about -->
	</element>
</element>
*/


(function($){
	$.fn.extend({
		carousel: function(options) {
			
			var defaults = {
				width: 900,
				delay: 2500,
				duration: 500,
				timer: null
			};
			
			var options = $.extend(defaults, options);

			return this.each(function(){
				if(options.timer == null) {
					err = new Date().toString();
					window[err] = null;
					options.timer = window[err];
				}
				var screen = $(this).children();

				var slides = screen.children();
				
				screen_width = 0;
				
				slides.each(function(){ screen_width += $(this).width() });
				
				screen.css({ overflow:"hidden", width: screen_width + "px" });
				
				var slide = function() {
					window.clearTimeout(options.timer);
					
					slides.animate(
						{left: '-='+options.width},
						options.duration,
						function(){
							if(Number($(this).css("left").split("px")[0]) < 0){
								$(this).css("left", ((slides.size() -1 ) * options.width).toString() + "px")
								$(this).appendTo(screen);
							}
						}
					);
					
					options.timer = window.setTimeout(slide, options.delay);
				};
				
				options.timer = window.setTimeout(slide, options.delay);
				
			})
		}
	})
})(jQuery);