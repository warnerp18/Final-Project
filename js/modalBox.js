(function($) {
    $.fn.modal_box = function(prop) {
        var options = $.extend({
            height: '250',
            width: "250",
            title: "Application Fee Payment Form",
            top: "20%",
            left: "30%"
        }, prop);

        return this.click(function(e) {
            add_block_page();
            add_popup_box();
            add_styles();
            $('.modal_box').fadeIn();
        });



        function add_styles() {
            var pageHeight = $(document).height();
            var pageWidth = $(window).width();

            $('.block_page').css({
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'background-color': 'rgba(0,0,0,0.6)',
                'height': pageHeight,
                'width': pageWidth,
                'z-index': '10'
            });

            $('.modal_box').css({
                'position': 'absolute',
                'left': options.left,
                'top': options.top,
                'display': 'none',
                'height': options.height + 'px',
                'width': options.width + 'px',
                'border': '1px solid #fff',
                'box-shadow': '0px 2px 7px #292929',
                '-moz-box-shadow': '0px 2px 7px #292929',
                '-webkit-box-shadow': '0px 2px 7px #292929',
                'border-radius': '10px',
                '-moz-border-radius': '10px',
                '-webkit-border-radius': '10px',
                'background': '#f2f2f2',
                'z-index': '50',
            });
            $('.paulund_modal_close').css({
                'position': 'relative',
                'top': '-25px',
                'left': '20px',
                'float': 'right',
                'display': 'block',
                'height': '50px',
                'width': '50px',
                'background': 'url(images/close.png) no-repeat',
            });
            $('.paulund_inner_modal_box').css({
                'background-color': '#fff',
                'height': (options.height - 50) + 'px',
                'width': (options.width - 50) + 'px',
                'padding': '10px',
                'margin': '15px',
                'border-radius': '10px',
                '-moz-border-radius': '10px',
                '-webkit-border-radius': '10px'
            });
        };

        function add_block_page() {
            var block_page = $('<div class="block_page"></div>');
            $(block_page).appendTo('body');
        };

        function add_popup_box() {
            var pop_up = $('<div class="modal_box"><a href="#" class="modal_close"></a><div class="inner_modal_box"><h2>' + options.title + '</h2><p>' + '</p></div></div>');
            $(pop_up).appendTo('.block_page');

            $('.modal_close').click(function() {
                $(this).parent().fadeOut().remove();
                $('.block_page').fadeOut().remove();
            });
        }
    };
})
