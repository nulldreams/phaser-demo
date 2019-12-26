import 'phaser'

import { SimpleScene } from './scenes/demo/simple-scene'

const gameConfig = {
    width: 800,
    height: 600,
    scene: SimpleScene,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
}

new Phaser.Game(gameConfig)