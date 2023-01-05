/*function getRandomInt() {
    return Math.floor(Math.random() * 905);
}

fetch('https://pokeapi.co/api/v2/pokemon/' + getRandomInt(), {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
    .then(response => response.json())
    .then(data => {

        console.log(data)
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
        var pokemon = new Pokemon(data.id, data.name, data.sprites.front_default, 1, pokemonStat)
        console.log(pokemon);
        let drawing = new Image();
        drawing.src = pokemon.image; // can also be a remote URL e.g. http://
        drawing.onload = function () {
            ctx.drawImage(drawing, 0, 0);
        };
        ctx.font = "24px serif"
        let text = "Pokemon : " + pokemon.name + " \n" +
                   "Level : " + pokemon.level + " \n" +
                   pokemon.stats[0].name + " " + pokemon.stats[0].value + " \n" +
                   pokemon.stats[1].name + " " + pokemon.stats[1].value + " \n" +
                   pokemon.stats[2].name + " " + pokemon.stats[2].value + " \n" 
        ctx.fillText(text, 100, 100);
    })
    */