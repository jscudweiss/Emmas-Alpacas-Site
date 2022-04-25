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
                $('#searchResults').append(`
                <a href="/${input._id}">${input._id.toUpperCase()}</a>
                `);
            })
        }
    )
})

$('#search_form').on('submit', function (){
    console.log("/" + searchData[0]._id)
    location.href= "/" + searchData[0]._id;
    return false;
})
