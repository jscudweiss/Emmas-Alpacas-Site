function showSearch() {
    $('#searchResults').addClass("show");
}

function hideSearch() {
    if (!($('#searchResults:hover').length)) {
        $('#searchResults').removeClass("show");
    }
}

let searchData = [];

$('#search').on('keyup', function () {
    let sk = $("#search").val().toLowerCase();
    $.get("/get_search_results", {
        search_key: sk,
    }).done((data) => {
            $('#searchResults').empty();
            searchData = data.data;
            searchData.sort((a, b) => {
                return (b.count - a.count) || a._id.localeCompare(b._id);
            })
            searchData.forEach((input) => {
                let shownText = "";
                let link = "";
                switch (input._id){
                    case "contactus":
                        shownText = "CONTACT US"
                        link = "contact"
                        break;
                    default:
                        shownText = input._id.toUpperCase()
                        link = input._id
                }
                if (!(shownText.includes(sk.toUpperCase()))){
                    shownText = shownText+ " : " + sk;
                }
                $('#searchResults').append(`
                <a href="/${link}">${shownText}</a>
                `);
            })
        }
    )
})

$('#search_form').on('submit', function (){
    console.log("/" + searchData[0]._id)
    switch (searchData[0]._id){
        case "contactus":
            location.href= "/contact";
            break;
        default:
            location.href= "/" + searchData[0]._id;
    }

    return false;
})
