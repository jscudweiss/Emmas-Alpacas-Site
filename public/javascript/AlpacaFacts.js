$('#factNameList').empty();
$('#factDetail').empty();

function get_fact_List(fact) {
    return `
        <div class="row">
            <button type="button" class="btn btn-success fact-btn" value="${fact.Info}">${fact.Title}</button>
        </div>
        <br>
    `
}


$.getJSON("/data/Alpaca-Facts.json", () => {
}).done((data) => {
    console.log(data);
    data.forEach((alpFact) => {
        $('#factNameList').append(() => {
            return get_fact_List(alpFact);
        });
    })
    $(".fact-btn").click(function () {
        let factText = $(this).attr('value');
        console.log(factText);
        $('#factDetail').text(factText);
    })
})


