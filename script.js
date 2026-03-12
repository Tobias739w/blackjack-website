let deck=[]
let player=[]
let dealer=[]

let money=1000
let bet=0

function createDeck(){

let suits=["H","D","C","S"]
let values=["A","2","3","4","5","6","7","8","9","0","J","Q","K"]

deck=[]

for(let suit of suits){
for(let value of values){

deck.push({
value:value,
suit:suit
})

}
}

}

function cardImage(card){

return `https://deckofcardsapi.com/static/img/${card.value}${card.suit}.png`

}

function getValue(card){

if(card.value==="A") return 11
if(["K","Q","J","0"].includes(card.value)) return 10

return parseInt(card.value)

}

function drawCard(){

let random=Math.floor(Math.random()*deck.length)

return deck.splice(random,1)[0]

}

function addBet(amount){

if(money>=amount){

bet+=amount
updateMoney()

}

}

function clearBet(){

bet=0
updateMoney()

}

function startGame(){

if(bet===0){

alert("Setze zuerst Chips!")

return

}

createDeck()

player=[drawCard(),drawCard()]
dealer=[drawCard()]

updateUI()

}

function hit(){

player.push(drawCard())

if(getSum(player)>21){

lose()

}

updateUI()

}

function stand(){

while(getSum(dealer)<17){

dealer.push(drawCard())

}

let playerSum=getSum(player)
let dealerSum=getSum(dealer)

if(dealerSum>21 || playerSum>dealerSum){

win()

}

else if(playerSum===dealerSum){

draw()

}

else{

lose()

}

updateUI()

}

function win(){

document.getElementById("result").textContent="🎉 Du gewinnst!"

money+=bet

updateMoney()

}

function lose(){

document.getElementById("result").textContent="💀 Du verlierst!"

money-=bet

updateMoney()

}

function draw(){

document.getElementById("result").textContent="🤝 Unentschieden"

}

function getSum(cards){

let sum=0

for(let card of cards){

sum+=getValue(card)

}

return sum

}

function updateUI(){

let playerDiv=document.getElementById("playerCards")
let dealerDiv=document.getElementById("dealerCards")

playerDiv.innerHTML=""
dealerDiv.innerHTML=""

for(let card of player){

let img=document.createElement("img")
img.src=cardImage(card)

playerDiv.appendChild(img)

}

for(let card of dealer){

let img=document.createElement("img")
img.src=cardImage(card)

dealerDiv.appendChild(img)

}

document.getElementById("playerSum").textContent="Summe: "+getSum(player)
document.getElementById("dealerSum").textContent="Summe: "+getSum(dealer)

}

function updateMoney(){

document.getElementById("money").textContent=money
document.getElementById("bet").textContent=bet

}

function newRound(){

player=[]
dealer=[]

document.getElementById("playerCards").innerHTML=""
document.getElementById("dealerCards").innerHTML=""
document.getElementById("result").textContent=""

bet=0
updateMoney()

}
