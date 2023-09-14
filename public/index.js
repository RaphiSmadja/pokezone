var audioActivate = false
var audio = new Audio('/sound/opening.mp3');

function audioPlay() {
    var icon = document.querySelector('i')
    if (!audioActivate) {
        icon.classList.remove('fa-volume-off')
        icon.classList.add('fa-volume-up');
        audio.loop = true;
        audio.play()
        audioActivate = true
    } else {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-off')
        audio.pause()
        audioActivate = false
    }
}

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


const collisionsMap = []
const battleMap = []

for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

for (let i = 0; i < battles.length; i += 70) {
    battleMap.push(battles.slice(i, 70 + i))
}


const boundaries = []
const battleZones = []

const offset = {
    x: -550,
    y: -180
}

battleMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battleZones.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }
    })
})

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }
    })
})

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.src = './img/mapv1.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

var pokemonRival;
var myPokemon;

var dialogText = []

const player = new Sprite({
    position: {

        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage,
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    e: {
        pressed: false
    },
    space: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

const movables = [background, ...boundaries, ...battleZones]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height
    )
}

const battle = {
    initiated: false
}

function getRandomInt() {
    return Math.floor(Math.random() * 905);
}

var pokemonBattle = new Image()
var pokemonBattleRival = new Image()

function animate() {
    var animationId = window.requestAnimationFrame(animate)
    background.draw()

    player.draw()
    //foreground.draw()

    let moving = true
    player.moving = false

    if (battle.initiated) {
        return
    }
    if (keys.space.pressed) {
        console.log("action")
    }
    if (keys.e.pressed) {
        console.log("dede")
        console.log(document.getElementById("menu"))
        document.getElementById("menu").style.display = "block";
    } else {
        document.getElementById("menu").style.display = "none";
    }

    if (keys.ArrowDown.pressed || keys.ArrowUp.pressed || keys.ArrowLeft.pressed || keys.ArrowRight.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =
                (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
                    Math.max(player.position.x, battleZone.position.x)) *
                (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
                    Math.max(player.position.y, battleZone.position.y))
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                }) && overlappingArea > player.width * player.height / 2
                && Math.random() < 0.1
            ) {
                console.log(battle)
                battle.initiated = true
                fetch('https://pokeapi.co/api/v2/pokemon/7', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        var mypokemonStat = new Array(
                            {
                                name: data.stats[0].stat.name,
                                value: data.stats[0].base_stat
                            },
                            {
                                name: data.stats[1].stat.name,
                                value: data.stats[1].base_stat
                            },
                            {
                                name: data.stats[2].stat.name,
                                value: data.stats[2].base_stat
                            },
                            {
                                name: data.stats[3].stat.name,
                                value: data.stats[3].base_stat
                            },
                            {
                                name: data.stats[4].stat.name,
                                value: data.stats[4].base_stat
                            },
                            {
                                name: data.stats[5].stat.name,
                                value: data.stats[5].base_stat
                            }
                        )
                        myPokemon = new Pokemon(data.id, data.name, data.sprites.back_default, 1, mypokemonStat)
                        console.log(myPokemon);
                        pokemonBattle.src = myPokemon.image; // can also be a remote URL e.g. http://
                    })
                // deactivate current animation loop
                fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomInt(), {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        var pokemonStat = new Array(
                            {
                                name: data.stats[0].stat.name,
                                value: data.stats[0].base_stat
                            },
                            {
                                name: data.stats[1].stat.name,
                                value: data.stats[1].base_stat
                            },
                            {
                                name: data.stats[2].stat.name,
                                value: data.stats[2].base_stat
                            },
                            {
                                name: data.stats[3].stat.name,
                                value: data.stats[3].base_stat
                            },
                            {
                                name: data.stats[4].stat.name,
                                value: data.stats[4].base_stat
                            },
                            {
                                name: data.stats[5].stat.name,
                                value: data.stats[5].base_stat
                            }
                        )
                        pokemonRival = new Pokemon(data.id, data.name, data.sprites.front_default, 1, pokemonStat)
                        console.log(pokemonRival);
                        pokemonBattleRival.src = pokemonRival.image; // can also be a remote URL e.g. http://
                    })

                window.cancelAnimationFrame(animationId)
                gsap.to('#overlappingDiv', {
                    opacity: 1,
                    repeat: 4,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            duration: 0.4
                        })

                        // new animation loop
                        animateBattle()
                        gsap.to('#overlappingDiv', {
                            opacity: 0,
                            duration: 0.4
                        })
                    }
                })
                if (audioActivate) {
                    audio.src = '/sound/battle.mp3'
                    audio.play()
                }
                break
            }
        }
    }

    if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
        }
    }
    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        player.moving = true
        player.image = player.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                console.log("collision")
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }
    }
    if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        player.moving = true
        player.image = player.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log("collision")
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += 3
            })
        }
    }
    if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log("collision")
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
        }
    }
}
animate()

const battleBackgroundImage = new Image()
battleBackgroundImage.src = './img/battleBackground.png'

var battlePokemonRival = new Sprite({
    position: {
        x: 760,
        y: 60
    },
    image: pokemonBattleRival
})

var battlePokemon = new Sprite({
    position: {
        x: 170,
        y: 200
    },
    image: pokemonBattle
})

const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})

function getRandomInt() {
    return Math.floor(Math.random() * 905);
}

function drawRivalPokemon() {
    document.getElementById("rivalPokemon").style.display = "block"
    document.getElementById("rivalPokemon").querySelector('h3').innerHTML = pokemonRival.name
}

function drawMyPokemon() {
    document.getElementById("myPokemon").style.display = "block"
    document.getElementById("myPokemon").querySelector('h3').innerHTML = myPokemon.name
}

function drawBattlePokemon() {
    document.getElementById("battleBar").style.display = "block"
}

function fightLaunch() {

}

function runLaunch() {
    if (Math.random() > 0.5) {
        dialogText.push("Vous avez pris la fuite");
        dialogText.push("...");
        readDialog()
    } else {
        dialogText.push("Vous n'avez pas réussi à fuir");
        readDialog()
    }
}

function getClick() {
    return new Promise(acc => {
        function handleClick() {
            var audio = new Audio('/sound/click.mp3');
            audio.play()
            document.removeEventListener('click', handleClick);
            acc();
        }
        document.addEventListener('click', handleClick);
    });
}


async function readDialog() {
    console.log(dialogText)
    for (let i = 0; i < dialogText.length; i++) {
        await getClick();
        document.getElementById("battleDialog").innerHTML = dialogText[i]
    }
    dialogText = []
    exit = 1
}

var exit = 0;
var init = 1;
let battleAnimationId
function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    drawRivalPokemon()
    drawMyPokemon()
    drawBattlePokemon()

    if(init === 1) {
    document.getElementById('battleDialog').innerHTML = "What will " + myPokemon.name + " do ?"
        init = 0;
    }
    battlePokemonRival.drawFacePokemon()
    battlePokemon.drawBackPokemon()
    if (exit === 1) {
        console.log("exit")
        exit = 0
        gsap.to('#overlappingDiv', {
            opacity: 1,
            onComplete: () => {
                cancelAnimationFrame(battleAnimationId)
                console.log(document.getElementById("battleBar"))
                document.getElementById("battleBar").style.display = "none"
                document.getElementById("myPokemon").style.display = "none"
                document.getElementById("rivalPokemon").style.display = "none"
                animate()
                gsap.to('#overlappingDiv', {
                    opacity: 0
                })
                battle.initiated = false
                lastKey = ''
            }
        })
    }

}

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'e':
            var audio = new Audio('/sound/click.mp3');
            audio.play()
            if (keys.e.pressed) {
                keys.e.pressed = false
            } else {
                keys.e.pressed = true
            }
            break
        case ' ':
            var audio = new Audio('/sound/click.mp3');
            audio.play()
            if (keys.space.pressed) {
                keys.space.pressed = false
            } else {
                keys.space.pressed = true
            }
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            player.moving = false
            lastKey = 'ArrowDown'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case ' ':
            keys.space.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
})