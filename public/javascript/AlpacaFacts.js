$('#factNameList').empty();
$('#factDetail').empty();

function get_fact_List(fact) {
    return `
        <div class="row">
            <button type="button" class="btn btn-success fact-btn">${fact.Title}</button>
        </div>
        <br>
    `
}


$.getJSON("/data/AlpacaFacts.json", () => {
}).done((data) => {
    console.log(data);
    data.forEach((alpFact) => {
        $('#factNameList').append(() => {
            return get_fact_List(alpFact);
        });
    })
})
