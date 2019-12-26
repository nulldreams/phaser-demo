export class Player extends Phaser.Physics.Arcade.Sprite { 
    constructor ({ scene, x, y, key }) {
        super(scene, x, y, key)
        this.config = { scene, x, y, key }
        
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.scene = scene

        this.setAnimations()
    }

    update() {
        if (this.scene.variables.cursors.left.isDown) {
            this.setVelocityX(-160)

            this.anims.play('left', true)
        }
        else if (this.scene.variables.cursors.right.isDown) {
            this.setVelocityX(160)

            this.anims.play('right', true)
        }
        else {
            this.setVelocityX(0)

            this.anims.play('turn')
        }

        if (this.scene.variables.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-330)
        }
    }

    setAnimations () {
        this.config.scene.anims.create({
            key: 'left',
            frames: this.config.scene.anims.generateFrameNumbers(this.config.key, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.config.scene.anims.create({
            key: 'turn',
            frames: [{ key: this.config.key, frame: 4 }],
            frameRate: 20
        })

        this.config.scene.anims.create({
            key: 'right',
            frames: this.config.scene.anims.generateFrameNumbers(this.config.key, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
    }

    kill () {
        this.scene.cameras.main.shake(500, 0.025)
        this.scene.time.addEvent({
          delay: 500,
          callback: () => this.scene.scene.restart()
        })
    }
}