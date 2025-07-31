window.recaptcha_success_callback_instance = null;
window.recaptcha_success_callback = function() {};

google_captcha_onload = function(token) {
    setTimeout(function() {
        try {
            if (!$('body').hasClass('protected-path-login-mode')) {
                $('.contact_form_captcha_enabled').each(function() {
                    if (!$(this).hasClass('initialized')) {
                        grecaptcha.render('contact_form_recaptcha_container', { 
                          sitekey: '6LeQ5TQaAAAAAL0PpYABhN5kYFLmywEMGlK0OD2-', 
                          size: 'invisible',
                          badge: 'bottomright',
                          callback: function(token) {
                            console.log('cb fired')  
                            if (typeof window.recaptcha_error_timeout != 'undefined') {
                                clearTimeout(window.recaptcha_error_timeout);
                            }
                            
                            $('input[name="g-recaptcha-response"]').val(token);
                            $('body').addClass('contact_form_captcha_challenge_passed');
                            window.recaptcha_success_callback(window.recaptcha_success_callback_instance);
                          },
                          expired_callback: function() {
                              h.alert('An error occurred, please refresh and try again. If you are still having difficulties please contact us.');
                          },
                          error_callback: function() {
                              h.alert('An error occurred, please refresh and try again. If you are still having difficulties please contact us.');
                          }
                        });
                    }
                    $(this).addClass('initialized');
                });
            }
        } catch(err) {
          console.log(err)
        }
    }, 200, token);
};