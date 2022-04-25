function showSearch() {
    $('#searchResults').addClass("show");
}

function hideSearch() {
    $('#searchResults').removeClass("show");
}

$('#search').on('keyup', function () {
    $.get("/get_search_results", {
        search_key: $("#search").val(),
    }).done((data) => {
            /*$('#searchResults').empty();*/
            dataArr = data.data;
            console.log(dataArr);
        }
    )
})

