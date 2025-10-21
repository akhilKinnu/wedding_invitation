// ...existing code...
function getNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("untuk");
    return name;
}

function replaceText() {
    const name = getNameFromURL();
    if (name) {
        document.getElementById("nama").textContent = name;
    }
}

window.addEventListener("load", replaceText);

lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'disableScrolling': true
});
document.addEventListener('DOMContentLoaded', function () {
    var http = new XMLHttpRequest();
    http.open("GET", "https://mycloud.devazy.iotflows.com/onload?reload=sukses", true);
    http.send();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert(this.responseText);
            var data = JSON.parse(this.responseText);
            var len = data.length;
            for (var i = 0; i < len; i++) {
                $("#message_list").prepend('<li>\n' +
                    '                        <span class="from">' + data[i].nama + '</span>\n' +
                    '                        <span class="guest_message">' + data[i].pesan + '</span>\n' +
                    '                    </li>');
            }
        }
    }
    var splide = new Splide('.splide',
        {
            type: 'loop',
            perPage: 3,
            pagination: true,
            arrows: true,
            lazyLoad: 'nearby',
            perMove: 1,
            breakpoints: {
                640: {
                    perPage: 2,
                },
                480: {
                    arrows: false,
                    perPage: 1,
                    focus: 'center',
                }
            }
        });
    splide.mount();
});

$(document).ready(function () {
    $("#btn_message").on("click", function (e) {
        e.preventDefault();
        if ($("#guest_name").val() === '') {
            return alert('Name is required');
        }
        if ($("#message").val() === '') {
            return alert('Message is required');
        }
        if ($("#guest_name").val() !== '' && $("#message").val() !== '') {
            $(this).html('Sending message...');
            var btn = $(this);
            btn.attr("disabled", "disabled");
            setTimeout(function () {
                $('#form_message').submit();
            }, 1500);
        }
    });

    $('#form_message').on('submit', function (event) {
        event.preventDefault();
        var btn = $("#btn_message");
        if (true) {
            btn.html('<small>Thank you for your prayers and wishes</small>');
            setTimeout(function () {
                btn.html('Send');
            }, 3000);
            var http = new XMLHttpRequest();
            var nameParam = encodeURIComponent($('#guest_name').val());
            var msgParam = encodeURIComponent($('#message').val());
            http.open("GET", "https://mycloud.devazy.iotflows.com/button?nama=" + nameParam + "&pesan=" + msgParam, true);
            http.send();
            $("#message_list").prepend('<li>\n' +
                '                        <span class="from">' + $('#guest_name').val() + '</span>\n' +
                '                        <span class="guest_message">' + $('#message').val() + '</span>\n' +
                '                    </li>');
            $('#guest_name').val('');
            $('#message').val('');
            btn.removeAttr("disabled");
        } else {

        }
    })
});

function alert(msg) {
    alertify.alert().set(
        {
            title: 'Information',
            transition: 'slide',
            message: msg,
            movable: true,
            closable: false
        }).show();
}