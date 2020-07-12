$(document).ready(function() {
    
    $('.car-slide').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnHover: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },   
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 1,
//                arrows: false
              }
            },
            {
              breakpoint: 577,
              settings: {
                slidesToShow: 1,
                arrows: false
              }
            }
        ]
    });
    
    $(window).scroll(function() {
        $('.vantages__btn').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("rubberBand");
            }
        });
        $('.rate__item').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("rotateInDownLeft");
            }
        });
        $('.rate__btn').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("rubberBand");
            }
        });
        $('.stock__btn').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("rubberBand");
            }
        });
        $('.rhoms__rhom_u').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("fadeInUp");
            }
        });
        $('.rhoms__rhom_d').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("fadeInDown");
            }
        });
        $('.plan__img').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("flipInY");
            }
        });
    });
    
    $('.footer-offer__logo').click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 800);
    });
    
    //Передача инфо о кнопке в модальное окно
     $('button.btn-lg').click(function() {
        var parent = $(this).attr('data-parent');
        var modal = $(this).attr('data-target')
        $(modal).find('input[name=target]').val(parent);
    })
    
    //Валидация и отправка формы
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    })
    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
    );

    // Функция валидации и вывода сообщений
    function valEl(el) {

        el.validate({
            rules: {
                tel: {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                tel: {
                    required: 'Поле обязательно для заполнения',
                    regex: 'Телефон может содержать символы + - ()'
                },
                name: {
                    required: 'Поле обязательно для заполнения',
                },
                email: {
                    required: 'Поле обязательно для заполнения',
                    email: 'Неверный формат E-mail'
                }
            },

            // Начинаем проверку id="" формы
            submitHandler: function(form) {
                $('#loader').fadeIn();
                var $form = $(form);
                var $formId = $(form).attr('id');
                switch ($formId) {
                    // Если у формы id="goToNewPage" - делаем:
                    case 'goToNewPage':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                //ссылка на страницу "спасибо" - редирект
                                location.href = 'https://wayup.in/lm/landing-page-marathon/success';
                                //отправка целей в Я.Метрику и Google Analytics
                                ga('send', 'event', 'masterklass7', 'register');
                                yaCounter27714603.reachGoal('lm17lead');
                            });
                        break;
                    // Если у формы id="popupResult" - делаем:
                    case 'popupResult':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize(),
                            })
                            .always(function(response) {
                                setTimeout(function() {
                                    $('#loader').fadeOut();
                                }, 800);
                                setTimeout(function() {
                                    $('#overlay').fadeIn();
                                    $form.trigger('reset');
                                    //строки для остлеживания целей в Я.Метрике и Google Analytics
                                }, 1100);
                                $('#overlay').on('click', function(e) {
                                    $(this).fadeOut();
                                });

                            });
                        break;
                }
                return false;
            }
        })
    }

    // Запускаем механизм валидации форм, если у них есть класс .js-form
    $('.js-form').each(function() {
        valEl($(this));
    });
    
});