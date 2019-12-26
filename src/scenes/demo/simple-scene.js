import { initialVariables, loadSprites } from './bootstrap'
import { Player } from './objects/player'

export class SimpleScene extends Phaser.Scene {
    preload() {
        this.variables = initialVariables()
        loadSprites(this)
    }
    create() {
        this.add.image(400, 300, 'sky')

        this.variables.platforms = this.physics.add.staticGroup()

        this.variables.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

        this.variables.platforms.create(600, 400, 'ground')
        this.variables.platforms.create(50, 250, 'ground')
        this.variables.platforms.create(750, 220, 'ground')

        this.variables.cursors = this.input.keyboard.createCursorKeys()        

        this.player = new Player({
            scene: this,
            key: 'dude',
            x: 100,
            y: 450
        })        

        this.variables.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })

        this.variables.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })

        this.variables.SCORE_TEXT = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        this.variables.bombs = this.physics.add.group()

        this.physics.add.collider(this.player, this.variables.platforms)
        this.physics.add.collider(this.variables.stars, this.variables.platforms)
        this.physics.add.collider(this.variables.bombs, this.variables.platforms)
        
        this.physics.add.overlap(this.player, this.variables.stars, this.collectStar, null, this)
        this.physics.add.collider(this.player, this.variables.bombs, this.hitBomb, null, this)
    }

    update() {
        this.player.update()
    }

    collectStar(player, star) {
        star.disableBody(true, true)

        this.variables.SCORE += 10
        this.variables.SCORE_TEXT.setText('Score: ' + this.variables.SCORE)

        if (this.variables.stars.countActive(true) === 0) {
            this.variables.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true)

            })

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400)

            var bomb = this.variables.bombs.create(x, 16, 'bomb')
            bomb.setBounce(1)
            bomb.setCollideWorldBounds(true)
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)

        }
    }

    hitBomb(player, bomb) {
        this.physics.pause()

        player.setTint(0xff0000)

        player.anims.play('turn')

        this.player.kill()
    }
}