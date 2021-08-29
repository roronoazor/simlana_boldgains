(function ($) {
	"use strict";
	var extcf7_show_animation = {
	  "height": "show",
	  "marginTop": "show",
	  "marginBottom": "show",
	  "paddingTop": "show",
	  "paddingBottom": "show"
	};

	var extcf7_hide_animation = {
	  "height": "hide",
	  "marginTop": "hide",
	  "marginBottom": "hide",
	  "paddingTop": "hide",
	  "paddingBottom": "hide"
	};
	
	var extcf7_animation_status = extcf7_conditional_settings.animitation_status;
	var extcf7_animation_intime = parseInt(extcf7_conditional_settings.animitation_in_time);
	var extcf7_animation_out_time = parseInt(extcf7_conditional_settings.animitation_out_time);

	function extcf7_global(){
		$('.wpcf7-form').each(function(){
		    var options_element = $(this).find('input[name="_extcf7_conditional_options"]').eq(0);

		    if (!options_element.length || !options_element.val()) {
		        return false;
		    }

		    var form_options = JSON.parse(options_element.val());

		    form_options.conditions.forEach(function(form_item,i){
		        var rule_applied_field =$('[data-id="'+form_item.rule_applied_field+'"]');
		        form_item.and_condition_rules.forEach(function(rules,j){

		        	var from_field_selector = extcf7_input_checkbox_name(rules.if_field_input);
		        	var tag = from_field_selector.get(0);

		        	extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);

		        	if( tag.tagName == 'INPUT' ){
		        		var input_attr_type = from_field_selector.attr('type');
		        		if(input_attr_type == 'text'){
				        	from_field_selector.on('keyup',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'email'){
				        	from_field_selector.on('keyup',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'radio'){
				        	from_field_selector.on('change',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'checkbox'){
				        	from_field_selector.on('change',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }
			        }else if( tag.tagName == 'SELECT' ){
			        	from_field_selector.on('change',function(){
				        	extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        });	
			        }else if( tag.tagName == 'TEXTAREA' ){
			        	from_field_selector.on('keyup',function(){
				        	extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        });	
			        }

		        });
		    });

		});
	}

	function extcf7_check_condition(coditions_rules,rule_applied_field){
		var condition_status = extcf7_is_condition_ok(coditions_rules);
    	if(condition_status){
    		if('on' == extcf7_animation_status){
    			rule_applied_field.animate(extcf7_show_animation, extcf7_animation_intime);
    			
    		}else{
    			rule_applied_field.show();
    		}
    	}else{
    		if('on' == extcf7_animation_status){
    			rule_applied_field.animate(extcf7_hide_animation, extcf7_animation_out_time);
    		}else{
    			rule_applied_field.hide();
    		}
    	}
	}

	function extcf7_input_checkbox_name(from_field_selector){
		var input_tag =$(`[name="${from_field_selector}"]`)
		if( typeof input_tag.get(0) === "undefined"){
    		input_tag = $(`[name="${from_field_selector}[]"]`);
    	}
    	return input_tag;
	}

	function extcf7_is_condition_ok(conditions){

		var condition_status = true;
		conditions.forEach(function(rules,k){
			var if_value_input_selector = extcf7_input_checkbox_name(rules.if_field_input);
			var if_field_input_value;
			var field_value_status;

			if(if_value_input_selector.get(0).tagName == 'INPUT' && if_value_input_selector.attr('type') == 'checkbox'){
				if(if_value_input_selector.prop("checked") == true){
					if_field_input_value = "checked"
				}else if(if_value_input_selector.prop("checked") == false){
					if_field_input_value = "unchecked"
				}
			}else{
				if_field_input_value = if_value_input_selector.val();
			}

			if(rules.operator_input == "equal"){
				if(if_field_input_value == rules.if_value_input){
					field_value_status = true;
				}
			}else if(rules.operator_input == "not-equal"){
				if(if_field_input_value != rules.if_value_input){
					field_value_status = true;
				}
			}
			condition_status = condition_status && field_value_status ? true : false;
		});

		return condition_status;
	}

	extcf7_global();

	if ( 'true' === extcf7_conditional_settings.elementor_editor_mode ) {
        $( window ).on( 'elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function ( $scope, $ ) {
                extcf7_global();
            } );
        } );
    }

})(jQuery);