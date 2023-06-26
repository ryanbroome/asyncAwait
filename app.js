// lets get some number facts with my new fact display machine
// TODO ask about how to refactor this, maybe helper functions for writing HTML

// TODO ask about how to refactor this
// ?START NUMBER FACT GENERATOR MACHINE
$('#nbutton').on('click', function (evt) {
  evt.preventDefault();
  if ($('#user').val()) {
    let userNum = $('#user').val();
    getNumberFact(userNum);
    $('#user').val('');
  }
});

async function getNumberFact(number) {
  let baseURL = `http://numbersapi.com/`;
  // dispatch requests at the same time
  let num = axios.get(`${baseURL}${number}/trivia?json`);
  let num1 = axios.get(`${baseURL}${number}/math?json`);
  let num2 = axios.get(`${baseURL}${number}/date?json`);
  let num3 = axios.get(`${baseURL}${number}/year?json`);
  // await their responses
  let n = await num;
  let n1 = await num1;
  let n2 = await num2;
  let n3 = await num3;
  // append the data from each response as a list item to an <ul id="numbers">
  $('#numbers').append(`<li class="list-group-item active">${n.data.number}</li>`);
  $('#numbers').append(`<li class="list-group-item list-group-item-dark">${n.data.type}</li><li class="list-group-item list-group-item-success">${n.data.text}</li>`);
  $('#numbers').append(`<li class="list-group-item list-group-item-dark">${n1.data.type}</li><li class="list-group-item list-group-item-success">  ${n1.data.text}</li>`);
  $('#numbers').append(`<li class="list-group-item list-group-item-dark">${n2.data.type}</li><li class="list-group-item list-group-item-success">  ${n2.data.text}</li>`);
  $('#numbers').append(`<li class="list-group-item list-group-item-dark">${n3.data.type}</li><li class="list-group-item list-group-item-success">  ${n3.data.text}</li>`);
  $('#numbers').append(`<a href="" class="btn btn-danger">Reset</a>`);
}
// ! END NUMBER FACT GENERATOR MACHINE

// ? START DRAW CARD MACHINE
$('#dbutton').on('click', function (evt) {
  evt.preventDefault();
  if ($('#decks').val()) {
    let userNum = $('#decks').val();
    drawCards(userNum);
    $('#decks').val('');
  }
});

// TODO FIGURE OUT HOW TO SELECT MULTIPLE CARDS USING ASYNC AWAIT, COPY NUMBERS PERHAPS REWATCH MULTIPLE REQUESTS
let deck_id;

window.addEventListener('load', async function (e) {
  deck_id = await getDeckID();
  console.log(deck_id);
});
async function getDeckID(numDecks) {
  const { data } = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${numDecks || 1}`);
  const { deck_id } = data;
  return deck_id;
}
async function drawCards(numCards) {
  let cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${numCards}`);

  if (cards.data.cards.length > 0) {
    for (let card of cards.data.cards) {
      console.log('cards remaining', cards.data.remaining);
      console.log('deck_id', cards.data.deck_id);
      console.log('card', card);
      $('#cards').append(`<img src="${card.image}"></img>`);
    }
  }
}

// ! END DRAW CARD MACHINE

// ? START Number instance generator, each instance can call four methods, getTrivia, getMath, getDate, getYear
// TODO understand when to use these different possibilities.
// todo Would I maybe make buttons that would call instance methods? Is this not a good example to use?

class Number {
  constructor(number) {
    this.number = number;
    this.baseURL = 'http://numbersapi.com';
  }
  async getTrivia() {
    let res = axios.get(`${this.baseURL}/${this.number}/trivia?json`);
    res = await res;
    this.trivia = res.data.text;
    console.log('trivia ==>>', res.data.text);
    return res.data;
  }
  async getMath() {
    let res = axios.get(`${this.baseURL}/${this.number}/math?json`);
    res = await res;
    this.math = res.data.text;
    console.log('math ==>>', res.data.text);
    return res.data;
  }
  async getDate() {
    let res = axios.get(`${this.baseURL}/${this.number}/date?json`);
    res = await res;
    this.date = res.data.text;
    console.log('date ==>>', res.data.text);
    return res.data;
  }
  async getYear() {
    let res = axios.get(`${this.baseURL}/${this.number}/year?json`);
    res = await res;
    this.year = res.data.text;
    console.log('year ==>>', res.data.text);
    return res.data;
  }
}
// ! END Number instance generator new Number(input_num)
