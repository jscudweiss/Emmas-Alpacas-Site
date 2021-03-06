function showSearch() {
    searchAndSet();
    $('#searchResults').addClass("show");
}

function hideSearch() {
    if (!($('#searchResults:hover').length)) {
        $('#searchResults').removeClass("show");
    }
}

const el = document.querySelector("#navBar")
const observer = new IntersectionObserver(
    ([e]) => {
        console.log(e.intersectionRatio);
        $('#logo').toggleClass("is-pinned", e.intersectionRatio < 1);
    },
    {threshold: [1]}
);

observer.observe(el);

let searchData = [];

function searchAndSet() {
    let sk = $("#search").val().toLowerCase();
    $.get("/get_search_results", {
        search_key: sk,
    }).done((data) => {
            $('#searchResults').empty();
            searchData = data.data;
            switch (sk) {
                case "":
                    searchData.sort((a, b) => {
                        return a._id.localeCompare(b._id) || (b.count - a.count);
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
                    searchData = [{_id: "NA", count: 0}]
                    break;
            }

            searchData.forEach((input) => {
                let shownText = "";
                let link = "";
                switch (input._id) {
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
                        shownText = shownText + " : " + sk;
                        link = link + "?search=" + sk;
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

document.getElementById("search").addEventListener("search", function (event) {
    searchAndSet();
});


$('#search_form').on('submit', function () {
    let sk = $("#search").val().toLowerCase();
    let includes = !(shownText.includes(sk.toUpperCase()))
    let hasout = ""
    switch (includes) {
        case true:
            hasout = "?search=" + sk;
    }
    switch (searchData[0]._id) {
        case "NA":
            location.href = "#" + hasout;
            break;
        case "contactus":
            location.href = "/contact" + hasout;
            break;
        default:
            location.href = "/" + searchData[0]._id + hasout;
    }

    return false;
})

