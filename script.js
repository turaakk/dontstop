// Do Not Stop
var MOUSE_TOP = 0
var MOUSE_LEFT = 0
var HEALTH = 100
var MOVING = false
var FIELD_HEIGHT = window.innerHeight
var FIELD_WIDTH = window.innerWidth
var GENERATED_FOOD = []
var POINTS = 0

var COLORS = ['green', 'red', 'blue', 'orange', 'aqua', 'azure']

function generateRandomColor(){
    return  COLORS[generateRandom(0,5)]
}

function generateRandom(min = 0, max = 100) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function generateFood(){
    let food = document.createElement('div')
    GENERATED_FOOD.push(food)
    food.setAttribute('id', 'food')
    food.style.setProperty("top", generateRandom(0, FIELD_HEIGHT - 200) + "px");
    food.style.setProperty("left", generateRandom(0, FIELD_WIDTH - 100)+ "px");
    food.style.position = 'absolute';
    food.style.height = '100px'
    food.style.width = '100px'
    food.style.backgroundColor = generateRandomColor()
    food.onmouseover =() => {
        POINTS += 1
        if(HEALTH < 100){
            HEALTH += 3
        }
        food.remove()
        generateFood()
        MOVING = false
    }

    const foodSpace = document.getElementById("food-space");
    document.body.insertBefore(food, foodSpace);
}

generateFood()

let player = document.getElementById('player')
let healthStatus = document.querySelector('#health')
let pointStatus = document.querySelector('#point')

player.onmouseover = mouseOverPlayer

document.addEventListener('mousemove', playerMovement)

addEventListener('resize', (event) => {
    FIELD_HEIGHT = window.innerHeight
    FIELD_WIDTH = window.innerWidth
});

console.log('POINTS')
function mouseOverPlayer(){
    MOVING = false
}

function playerMovement(e){
    MOUSE_TOP = e.pageY
    MOUSE_LEFT = e.pageX
    player.style.top = MOUSE_TOP + 'px'
    player.style.left = MOUSE_LEFT + 'px'
}

function gameloop(){
    healthStatus.innerHTML = HEALTH.toString().split('.')[0]
    pointStatus.innerHTML = POINTS.toString().split('.')[0]
    if(MOVING){
    }else{
        HEALTH -= .1
        player.style.backgroundColor = generateRandomColor()
    }
    if(HEALTH >= 0){
        requestAnimationFrame(gameloop);
    }else{
        healthStatus.innerHTML = "You lost"
    }
}
gameloop()