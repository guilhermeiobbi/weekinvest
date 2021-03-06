// Agency Theme JavaScript
(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});

function enviarMensagem() {
    $('#btnEnviarMensagem').prop('disabled', true);
    $('#btnEnviarMensagem').text("Enviando...");
    var obj = objectifyForm($("#formContato").serializeArray());
    
    var payload = JSON.stringify(obj);
    $.ajax({
        url: 'https://weekinvest-api.herokuapp.com/api/v1/mensagens',
        // url: 'http://localhost:8080/api/v1/mensagens',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        cache: false,
        type: 'POST',
        data : payload,
        // success: function() {
        //     $('#alertMensagemEnviada').addClass('in');
        // },
        // error: function () {
        // }, 
        complete: function () {
            $('#alertMensagemEnviada').addClass('in');
            $('#btnEnviarMensagem').text("Enviar");
            $('#btnEnviarMensagem').prop('disabled', false);
        }
    });
}

function enviarQuestionario() {
    $("#nomeQuestionario").text($("input[name='nomeQuestionario']").val());
    
    var obj = objectifyForm($("#formQuestionario").serializeArray());
    obj.investimentosRealizados = montaArrayCheckBox();

    var payload = JSON.stringify(obj);
    $.ajax({
        url: 'https://weekinvest-api.herokuapp.com/api/v1/questionarios',
        // url: 'http://localhost:8080/api/v1/questionarios',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        cache: false,
        type: 'POST',
        data : payload
    });
}

//serialize data function
function objectifyForm(formArray) {
  var returnArray = {};

  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }

  return returnArray;
}

function montaArrayCheckBox() {
    var arr = $.map($('input:checkbox:checked'), function(e,i) {
      return e.value;
    });
    if(arr.includes('on')) {
        var index = arr.indexOf('on');
        arr[index] = $('#outroInvestimentoRealizado').val();
    }
    return arr;
}