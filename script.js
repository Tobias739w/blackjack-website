let deck = []
let playerCards = []
let dealerCards = []

function createDeck(){

deck = []

let suits = ["♠","♥","♦","♣"]
let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]

for(let suit of suits){
for(let value of values){
deck.push(value + suit)
}
}

}

function getValue(card){

let value = card.slice(0,-1)

if(value === "A") return 11
if(["K","Q","J"].includes(value)) return 10

return parseInt(value)

}

function drawCard(){

let random = Math.floor(Math.random()*deck.length)

return deck.splice(random,1)[0]

}

function startGame(){

createDeck()

playerCards = [drawCard(), drawCard()]
dealerCards = [drawCard()]

updateUI()

}

function hit(){

playerCards.push(drawCard())

updateUI()

if(getSum(playerCards) > 21){
document.getElementById("result").textContent = "Du hast verloren!"
}

}

function stand(){

while(getSum(dealerCards) < 17){
dealerCards.push(drawCard())
}

let playerSum = getSum(playerCards)
let dealerSum = getSum(dealerCards)

let result = ""

if(dealerSum > 21 || playerSum > dealerSum){
result = "Du gewinnst!"
}
else if(playerSum === dealerSum){
result = "Unentschieden!"
}
else{
result = "Dealer gewinnt!"
}

document.getElementById("result").textContent = result

updateUI()

}

function getSum(cards){

let sum = 0

for(let card of cards){
sum += getValue(card)
}

return sum

}

function updateUI(){

document.getElementById("playerCards").textContent = playerCards.join(" ")
document.getElementById("dealerCards").textContent = dealerCards.join(" ")

document.getElementById("playerSum").textContent = "Summe: " + getSum(playerCards)
document.getElementById("dealerSum").textContent = "Summe: " + getSum(dealerCards)

}
