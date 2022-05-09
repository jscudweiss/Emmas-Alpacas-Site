const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchKey = urlParams.get('search');
if (searchKey) {
    $('#filter').val(searchKey);
}
$('#factDetail').empty();

function get_fact_List(fact, idx) {
    return `
        <div class="row">
            <button type="button" class="btn fact-btn" value="${fact.Info}" id="Button${idx}" name="${fact.url}">${fact.Title}</button>
        </div>    `
}


function loadFacts(data, filterVar) {
    console.log(data)
    $('#factNameList').empty();
    const lFilter = filterVar.toLowerCase();
    const fData = data.filter((fact) => {
        return (fact.Title.toLowerCase().includes(lFilter) || fact.Info.toLowerCase().includes(lFilter));
    })
    let len = fData.length
    fData.forEach((alpFact) => {
        $('#factNameList').append(() => {
            len --;
            return get_fact_List(alpFact, len);
        });
    })
    $(".fact-btn").click(function () {
        let factText = $(this).attr('value');
        let factTitle = $(this).text();
        let factUrl = $(this).attr("name");
        console.log(factText);
        $('#factDetail').text(factText);
        $('#factTitle').text(factTitle);
        $('#factPic').attr('src', factUrl);
        console.log(window.innerWidth)
        if(window.matchMedia('only screen and (min-device-width: 769px)') || window.matchMedia('(min-width: 769px)')){
            location.href = '#split';
        }
    })
}


$.getJSON("/data/Alpaca-Facts.json", () => {
}).done((data) => {
    $('#factDetail').text(data[0].Info);
    $('#factTitle').text(data[0].Title);
    $('#factPic').attr('src', data[0].url);
    const myFilter = $('#filter');
    const ffilterVal = myFilter.val();
    loadFacts(data, ffilterVal)
    myFilter.on('keyup', function () {
        const filterVal = $('#filter').val();
        loadFacts(data, filterVal)
    })
})


$('#returnTop').on('click', function () {
    location.href = '#';
})
$('#returnFilter').on('click', function () {
    location.href = '#header_text';
})