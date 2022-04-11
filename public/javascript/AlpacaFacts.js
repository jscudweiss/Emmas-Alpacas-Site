$('#factNameList').empty();
$('#factDetail').empty();
const facts = $.getJSON("/data/AlpacaFacts.json");
console.log(facts);

function get_fact_List(fact) {
    return `
        <li class="list-group-item">
            <button type="button" class="btn btn-light fact-btn">${fact.Title}</button>
        </li>
    `
}


function showFacts(){
    facts.responseJSON.forEach((alpFact)=>{
        $('#factNameList').append(() => {
            return get_fact_List(alpFact);
        });
    })
}

showFacts();