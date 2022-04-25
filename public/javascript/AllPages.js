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
    $.get("/get_search_results", {
        search_key: $("#search").val().toLowerCase(),
    }).done((data) => {
            $('#searchResults').empty();
            searchData = data.data;
            searchData.sort((a, b) => {
                return b.count - a.count;
            })
            searchData.forEach((input) => {
                let shownText = "";
                let link = "";
                switch (input._id){
                    case "contactus":
                        shownText = "Contact Us"
                        link = "contact"
                        break;
                    default:
                        shownText = input._id
                        link = input._id
                }
                $('#searchResults').append(`
                <a href="/${link}">${shownText.toUpperCase()}</a>
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
