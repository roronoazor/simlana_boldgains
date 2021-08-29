(function ($) {
	"use strict";
	document.addEventListener('wpcf7mailsent', function (event) {

		var form = $(event.target);
		var form_id = form.find('input[name="_wpcf7"]').eq(0).val();
		var redirect_field = form.find('input[name="_extcf7_redirect_options"]').eq(0);
		if(redirect_field.val()){
			var redirect_values = JSON.parse(redirect_field.val());
			var redirect_form_id  = redirect_values.form_id;
			var redirect_options  = redirect_values.redirect_options;
			var redirect_delay  =  parseInt(extcf7_redirection_settings.redirection_delay);
			if(form_id == redirect_form_id){
				setTimeout(function(){ 
					if('on' == redirect_options.js_action){
						if(redirect_options.javascript_code){
							eval(redirect_options.javascript_code);
						}
					}
					if('on' == redirect_options.redirection_enable){
						if('off' == redirect_options.custom_url_enable){
							if('off' == redirect_options.redirect_new_tab){
							 	window.location = redirect_options.redirect_page;
							}else{
								window.open(redirect_options.redirect_page);
							}
						}else{
							if('off' == redirect_options.redirect_new_tab){
								window.location = redirect_options.custom_urle;
							}else{
								window.open(redirect_options.custom_urle);
							}
						}
					}
				}, redirect_delay);
			}
		}

	}, false);

})(jQuery);