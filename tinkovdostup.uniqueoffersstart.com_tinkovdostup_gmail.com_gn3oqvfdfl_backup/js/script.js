$(document).ready(function() {

    $(".privacy-link").click(function() {
            $("#privacy").css("display", "block");
        }
    )
    $(".btn-close").click(function() {
        $("#risk").css("display", "none");
        $("#policy").css("display", "none");
        }
    )
    //
    // $(".owl-carousel").owlCarousel({
    //     loop: true,
    // });

    $.getJSON("https://api.ipify.org/?format=json", function(e) {
        window.ip = e.ip
    });

    var url_string = window.location.href
    var url = new URL(url_string);
    var sub_id = url.searchParams.get("sub_id");

    $('form').submit(function(event) {
        event.preventDefault();
        $('button').prop('disabled', true);


        function funcSuccess(result) {
            var json = JSON.parse(result);
            console.log(json);
            if (json['message'] === 'phone') {
                $('button').prop('disabled', false);
                Swal.fire({
                    title:  '<span style="font-size:30px">Введите корректный номер телефона</span>',
                    html: '<span style="font-size:24px">Вы ввели: '+ json['debug'] +'</span>',
                    icon: 'error',
                    confirmButtonText: "Ok",
                })
            }else if (json['success'] === true) {
                $('button').prop('disabled', false);
                ym(90912024,'reachGoal','lead')
                Swal.fire({
                    title:  '<span style="font-size:30px">Заявка на бесплатный доступ подана! Ожидайте звонка оператора</span>',
                    html: '<span style="font-size:24px">Если вы не возьмете трубку, Доступ будет аннулирован</span>',
                    icon: 'success',
                    confirmButtonText: "Я ОЖИДАЮ ЗВОНОК",
                })
            } else {
                Swal.fire({
                    title: '<span style="font-size:30px">Ошибка. Вы превысили максимальное количество попыток получить доступ.</span>',
                    html: '',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                })
            }
        }
        var data = new FormData(this);
        let ip = window.ip;
        data.append('ip', ip);
        data.append('sub_id', sub_id);
        $.ajax({
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            data: data,
            contentType: false,
            dataType: "html",
            cache: false,
            processData: false,
            success: funcSuccess
        });
    });
    $(".btn-scroll, .scroll-to-form").on("click", (function() {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#scroll_form").offset().top - 100
            }, 500)
        }
    ))
    $('.phone').inputmask({mask: '+7(vvv)-vvv-vvvv',placeholder:'+7(***)-***-****',
        definitions: {
            "v": {
                validator: "[0-9]",
            }
        },})
    $(".link").click(function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top - 100},"linear");
    });
})
