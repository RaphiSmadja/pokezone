class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 }, sprites}) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1)
                    this.frames.val++
                else
                    this.frames.val = 0
            }
        }

    }
    drawYellow() {
        ctx.fillStyle = 'yellow'
        ctx.fillRect(this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height)
    }
    drawFacePokemon() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * 2,
            this.image.height * 2
        )
        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1)
                    this.frames.val++
                else
                    this.frames.val = 0
            }
        }
    }
    drawBackPokemon() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * 3,
            this.image.height * 3
        )
        if (this.moving) {
            if (this.frames.max > 1) {
                this.frames.elapsed++
            }
            if (this.frames.elapsed % 10 === 0) {
                if (this.frames.val < this.frames.max - 1)
                    this.frames.val++
                else
                    this.frames.val = 0
            }
        }
    }
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        ctx.fillStyle = 'rgba(255,0,0,0.5)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}