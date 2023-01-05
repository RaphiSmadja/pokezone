class Pokemon {
    constructor(id, name, image, level, stats) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.level = level;
        this.stats = stats;
    }
}

class Stats {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}