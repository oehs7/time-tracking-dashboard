let timeframe = 'weekly'; //default value
const container = document.querySelector('.container');
let regularCards; 
// the next steps are managed based on instructions of the chhalaange that provided 
// 1. build the menu
const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});


// 2. Fetching the data from the data.json
let data = {};

fetch('./js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {

        //build a card Cards
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend', 
                createRegularCard(element, timeframe));
        });

        // Convert array to dict
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        //  create  reference to created cards
        regularCards = document.querySelectorAll('.regular-card');
       // console.log(regularCards);

   });


// the Functions

function menuOnClick(event){
    //console.log('click', event.target.innerText.toLowerCase());
    menu.forEach(element => {
        element.classList.remove('menu-active');
    });
    event.target.classList.add('menu-active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe){
    regularCards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.description');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    return `
<div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="property-card">
        <div class="row">
            <div class="title">${title}</div>
            <div class="points">
                <div class="point"></div>
                <div class="point"></div>
                <div class="point"></div>
            </div>
        </div>

        <div class="row-2">
            <div class="hours">${current}hrs</div>
            <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
        </div>
    </div>
</div>`

}
