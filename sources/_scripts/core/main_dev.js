var justica = justica || {};

justica.MAIN = (function () {

    return {
        init: function () {
            $('[data-control]').each(function (index, elem) {
                var data = $(elem).data(),
                    control = data.control;

                if (!justica[control]) return;

                if (typeof justica[control] === 'function') {
                    var obj = new justica[control];
                    obj.init(elem, data);
                } else if (typeof justica[control] === 'object') {
                    justica[control].init(elem, data);
                }
            });

            //-------------- barra de cookies
            var justicagovpt_cookies = "justicagovpt_cookies";

            //Adiciona barra de cookies caso não tenha sido aceite
            if (document.cookie.indexOf(justicagovpt_cookies) == -1) {
                $('body').append('<div class="justica-cookie_bar sticky_top" data-control="cookie_bar"><div class="container"><div class="row"><div class="col-sm-12"><p>Este website utiliza cookies. Ao continuar a navegação está a aceitar a sua utilização. Caso pretenda saber mais, consulte a legislação <a href="http://ec.europa.eu/ipg/basics/legal/cookies/index_en.htm" target="_blank">aqui</a></p></div></div></div></div>');
            }

            //-------------- MENU ##############
            //var elMenuLink = $('ul.navbar-nav li > a, ul.navbar-nav li > span');



            //-------------- SUBMENU height DESKTOP
            if ($(window).width() > 892) {

                $("ul.nav > .menu_item.dropdown > ol.dropdown-menu").each(function () {
                    $(this).attr('data-height', $(this).height());
                    $(this).height(0);
                    $(this).css('opacity', 'inherit');
                });

                var menuButtons = $("ul.nav > .menu_item.dropdown");
                menuButtons.click(function () {
                    var openMenu = $("ul.nav > .menu_item.dropdown.open");
                    var menuDropdownPane = $(this).children('ol.dropdown-menu');

                    //reset menu
                    menuButtons.removeClass('open');
                    $(this).children('.sub_menu_title').removeClass('onactive');


                    if (!openMenu.length || !openMenu.is(menuDropdownPane.parent())) {

                        $(this).children('.sub_menu_title').addClass('onactive');

                        //open menu
                        menuDropdownPane.animate({
                            height: parseInt(menuDropdownPane.attr('data-height')) + 20
                        }, {
                            queue: false,
                            duration: 250
                        });

                        //toggle classe active menu
                        //$(this).children('a, span').toggleClass('onactive');

                        //add classe menu
                        $(this).closest('.menu_item.dropdown').addClass('open');
                    } else {
                        $(this).children('.sub_menu_title').removeClass('onactive');
                        $('ol.dropdown-menu').height(0);
                    }
                });

                //close menu

                $('body').click(function () {
                    if ($("ul.nav > .menu_item.dropdown.open").length) {
                        $('ol.dropdown-menu').height(0);
                        $('.dropdown .open').removeClass('open');
                    }
                });
                $('.dropdown-menu').click(function () {
                    event.stopPropagation();
                });

            } else {

                //MENU MOBILE
                $('.button_menu_mobile').on('click', function () {
                    if ($('.button_menu_mobile').hasClass('collapsed')) {
                        $('body').css('overflow', 'hidden');
                    } else {
                        $('body').css('overflow', 'visible');
                    }
                });

                $('.navbar-mobile .dropdown>a').on('click', function () {

                    if ($(this).siblings('.dropdown-menu').is(':visible')) {

                        //HIDE
                        $(this).siblings('.dropdown-menu').hide('fast');
                        $(this).siblings('.dropdown-menu').removeClass('opened');
                        $(this).find('b').css('transform', 'rotate(0deg)');

                    } else {

                        //reset
                        $('.navbar-mobile').find('b').css('transform', 'rotate(0deg)');
                        $(this).parent().siblings().children('.opened').hide('fast');
                        $(this).parent().siblings().children('.opened').removeClass('opened');
                        $(this).parent().children('.opened').hide('fast');

                        //SHOW
                        $(this).siblings('.dropdown-menu').show('fast');
                        $(this).siblings('.dropdown-menu').addClass('opened');
                        $(this).find('b').css('transform', 'rotate(180deg)');
                    }
                    event.stopPropagation();
                });

            }

            //-------------- Active search ##############

            $('.search-bar input').on('focus', function () {
                $('.searchInputContainer').addClass('focus');
            });
            $('.search-bar input').on('blur', function () {
                $('.searchInputContainer').removeClass('focus');
            });

            //-------------- initialize slider news ##############
            $('.responsive').slick({
                dots: true,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 4,
                slidesToScroll: 3,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 425,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                    }
                  ]
            });

            //-------------- initialize slider graphs ##############
            $('.graphs').slick({
                dots: true,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 2,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 514,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 425,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,

                        }
                    }
                  ]
            });

            //-------------- initialize slider news inner ##############
            $('.responsiveinner').slick({
                dots: false,
                infinite: false,
                speed: 300,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 2,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,

                        }
                    },
                    {
                        breakpoint: 500,
                        settings: 'unslick'
                    }
                  ]
            });




            //-------------- SCRIPT tooltip
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })


            //-------------- organismo collapse
            $('.justica-documentos_organismo .doc .text').on('click', function () {
                $(this).toggleClass('expanded');
            });


            $('.justica-servicos_organismo .wrap_list').on('click', function () {
                $(this).toggleClass('height_open');
            });

            //--------------SCROLL EVENTS
            //cta sticky bottom
            $('.sticky_bottom').css({
                "-webkit-transform": "translate(-50%, 80px)"
            });
            $(window).bind('scroll', function () {

                //-------------- scrolls acepts cookies
                if ($(window).scrollTop() > 50) {

                    $('.sticky_top').css({
                        "-webkit-transform": "translate(-50%, -80px)"
                    });
                    setTimeout(function () {
                        $('.sticky_top').remove();
                    }, 800);
                }

                //-------------- cta_SERVICOS when scrolls it appears
                var stickyEl = $('.sticky_bottom'),
                    elHeight = stickyEl.height(),
                    distTop = 0;

                if ($('aside .buttonExecutaServico.start').length > 0) {
                    distTop = $('aside .buttonExecutaServico.start').offset().top;
                }

                if ($(window).scrollTop() > distTop) {

                    $('body').css('margin-bottom', elHeight + 'px');

                    stickyEl.css({
                        "-webkit-transform": "translate(-50%, 0px)"
                    });
                } else {
                    $('body').css('margin-bottom', 'inherit');

                    stickyEl.css({
                        "-webkit-transform": "translate(-50%, 80px)"
                    });
                }
            });

            //PREVENT MORE THAN n words in news titles and organisms (DELETE WHEN DONE FROM DATABASE)
            $(justica.MAIN.maxWordCount());


            //FILTROS PESQUISA MOBILE
            $(".justica-pesquisa_body aside").find('.filter').on('click', function () {
                var thisEl = $(this),
                    elParent = thisEl.parent('aside');

                if (thisEl.hasClass('clicked')) {

                    thisEl.removeClass('clicked');
                    elParent.animate({
                        right: -205
                    }, {
                        easing: 'swing',
                        duration: 300,
                        complete: function () {
                            elParent.removeClass('open');
                        }
                    });
                } else {

                    elParent.animate({
                        right: 0
                    }, {
                        easing: 'swing',
                        duration: 300,
                        complete: function () {
                            thisEl.addClass('clicked');
                        }
                    });
                    elParent.addClass('open');
                }
            });

            //RESULTADOS DE PESQUISA (FILTROS)
            $(".justica-pesquisa_body aside").find("input").on('change', function () {
                $(this).each(function () {
                    var thisID = $(this).val();
                    if ($(this).is(':checked')) {
                        //SHOW
                        $('#' + thisID).show('slow');
                    } else {
                        //HIDE
                        $('#' + thisID).hide('slow');
                    }
                })
            });


        },

        //PREVENT MORE THAN n words in news titles and organisms (DELETE WHEN DONE FROM DATABASE)
        maxWordCount: function () {
            var news_title = $('.news-title:not(.big_headline)'),
                organism = $('p.organismo:not(.big_headline)'),
                maxLengthOrg = 30,
                maxLengthNews = 45,
                dots = "...";

            news_title.each(function () {
                var titleText = $.trim($(this).text());
                if (titleText.length >= maxLengthNews) {
                    $(this).text(titleText.substring(0, maxLengthNews) + dots);
                }

            });

            organism.each(function () {
                var titleText = $.trim($(this).text());
                if (titleText.length >= maxLengthOrg) {
                    $(this).text(titleText.substring(0, maxLengthOrg) + dots);
                }

            });
        }
    }
})();

$(document).ready(function () {
    justica.MAIN.init();
});
