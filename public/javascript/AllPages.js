function showSearch() {
    searchAndSet();
    $('#searchResults').addClass("show");
}

function hideSearch() {
    if (!($('#searchResults:hover').length)) {
        $('#searchResults').removeClass("show");
    }
}

let searchData = [];

function searchAndSet(){
    let sk = $("#search").val().toLowerCase();
    $.get("/get_search_results", {
        search_key: sk,
    }).done((data) => {
            $('#searchResults').empty();
            searchData = data.data;
            switch (sk) {
                case "":
                    searchData.sort((a, b) => {
                        return a._id.localeCompare(b._id) || (b.count - a.count) ;
                    })
                    break;
                default:
                    searchData.sort((a, b) => {
                        return (b.count - a.count) || a._id.localeCompare(b._id);
                    })
            }
            console.log(searchData)
            switch (searchData.length) {
                case 0:
                    searchData = [{_id:"NA", count:0}]
                    break;
            }

            searchData.forEach((input) => {
                let shownText = "";
                let link = "";
                switch (input._id){
                    case "NA":
                        shownText = "NO RESULTS"
                        link = "#"
                        break;
                    case "contactus":
                        shownText = "CONTACT US"
                        link = "contact"
                        break;
                    default:
                        shownText = input._id.toUpperCase()
                        link = input._id
                }
                let includes = !(shownText.includes(sk.toUpperCase()))
                switch (includes) {
                    case true:
                        shownText = shownText+ " : " + sk;
                        break;
                }
                $('#searchResults').append(`
                <a href="/${link}">${shownText}</a>
                `);
            })
        }
    )
}

$('#search').on('keyup', function () {
    searchAndSet();
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
