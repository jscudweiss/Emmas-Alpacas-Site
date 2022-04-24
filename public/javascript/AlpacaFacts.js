$('#factNameList').empty();
$('#factDetail').empty();

function get_fact_List(fact) {
    return `
        <div class="row">
            <button type="button" class="btn btn-success fact-btn" value="${fact.Info}" id="${fact.url}">${fact.Title}</button>
        </div>
        <br>
    `
}


$.getJSON("/data/Alpaca-Facts.json", () => {
}).done((data) => {
    $('#factDetail').text(data[0].Info);
    $('#factTitle').text(data[0].Title);
    $('#factPic').attr('src',data[0].url);
    console.log(data);
    data.forEach((alpFact) => {
        $('#factNameList').append(() => {
            return get_fact_List(alpFact);
        });
    })
    $(".fact-btn").click(function () {
        let factText = $(this).attr('value');
        let factTitle = $(this).text();
        let factUrl = $(this).attr("id");
        console.log(factText);
        $('#factDetail').text(factText);
        $('#factTitle').text(factTitle);
        $('#factPic').attr('src',factUrl);
    })
})


