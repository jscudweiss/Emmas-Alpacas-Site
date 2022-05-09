const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const prev_name = urlParams.get('name');
const prev_email = urlParams.get('email');
const prev_phone_number = urlParams.get('phone_number');
const prev_message = urlParams.get('message');

if (errorMessage) {
    $('#name').val(prev_name);
    $('#email').val(prev_email);
    $('#phone_number').val(prev_phone_number);
    $('#message').text(prev_message);
    $('#error_message').text(errorMessage);
}

// const thank = urlParams.get('thank');
// $(document).ready(() => {
//     if (thank) {
//         console.log(thank);
//         $('#news_form_submit').empty()
//         $('#thank_message').text("Thank you for your submission!")
//     }
// })

$('#phone_number').on('keyup', function () {
    const $this = $(this)
    let input = $this.val();
    let chunk = [];
    const split1 = 3;
    const split2 = 6;
    input = input.replace(/[\W\s\._\-]+/g, '');
    let remainder = input;
    if(split1 < input.length){
        chunk.push(input.substr( 0, split1 ))
        remainder = input.substr( split1, input.length )
    }
    if(split2 < input.length){
        chunk.push(remainder.substr( 0, split1 ))
        remainder = remainder.substr( split1, remainder.length )
    }
    chunk.push(remainder);
    $this.val(function() {
        return chunk.join("-").toUpperCase();
    })
})
