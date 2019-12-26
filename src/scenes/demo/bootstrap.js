const variables = {
    SCORE: 0,
    SCORE_TEXT: null,
    platforms: null,
    player: null,
    cursors: null,
    stars: null,
    bombs: null,
    gameOver: false
}

exports.initialVariables = () => variables

exports.loadSprites = (game) => {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('star', 'assets/star.png')
    game.load.image('bomb', 'assets/bomb.png')
    game.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
}