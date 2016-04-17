ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.elements',
    'game.levels.world',
    'game.levels.test',
    'game.entities.character',
    'game.entities.spawnpoint',
    'plugins.touch-button'
)
.defines(function(){

MyGame = ig.Game.extend({
    player: null,
    
    movementButtons: null,
    attackButtons: null,
    shapeshitButtons: null,
    buttonImage: new ig.Image( 'media/buttons.png' ),
    
    init: function() {        
        if( ig.ua.mobile ) {
            // If scale is 2
            this.movementButtons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'up', {left: 36, bottom: 60}, 24, 24, this.buttonImage, 0 ),
                new ig.TouchButton( 'right', {left: 60, bottom: 36}, 24, 24, this.buttonImage, 1 ),
                new ig.TouchButton( 'down', {left: 36, bottom: 12}, 24, 24, this.buttonImage, 2 ),
                new ig.TouchButton( 'left', {left: 12, bottom: 35}, 24, 24, this.buttonImage, 3 ),
            ])
            this.shapeshitButtons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'shapeshift', {right: 12, bottom: 12}, 24, 24, this.buttonImage, 4 ),
            ])
            this.attackButtons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'attack', {right: 12, bottom: 48}, 24, 24, this.buttonImage, 4 ),
            ]);
            
            // Align the touch buttons to the screen edges; you have 
            // to call this function once after creating the 
            // TouchButtonCollection and then every time you change 
            // the game's screen size
            this.movementButtons.align();
            this.shapeshitButtons.align();
            this.attackButtons.align();
        } else {
            // initialize your game world, bind some 
            // keys, etc.
            ig.input.bind( ig.KEY.UP_ARROW, 'up' )
            ig.input.bind( ig.KEY.DOWN_ARROW, 'down' )
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' )
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' )
            
            ig.input.bind( ig.KEY.X, 'attack')
            ig.input.bind( ig.KEY.Z, 'shapeshift')
        }
        
        this.loadLevel( LevelWorld )
        
        this.player = this.getEntitiesByType( EntityCharacter )[0]
        this.spawnPoint = this.getEntitiesByType( EntitySpawnpoint )[0]
    },
    
    update: function() {
        this.parent();
        
        if (this.player) {
            this.screen.x = 
                this.player.pos.x - (ig.system.width / 2)
            this.screen.y = 
                this.player.pos.y - (ig.system.height / 2)
        }
    },
    
    draw: function() {       
        this.parent()
        
        if( this.movementButtons ) {
            this.movementButtons.draw()
            this.shapeshitButtons.draw()
            if (this.player.element != Element.NONE) {
                this.attackButtons.draw()
            }
        }
    },
    
    respawnPlayer: function() {
        this.player = ig.game.spawnEntity(
            EntityCharacter,
            this.spawnPoint.pos.x, this.spawnPoint.pos.y, {})
    }
});

var dimensions = function() {
    var $window = $(window)
    var x = $window.innerWidth()
    var y = $window.innerHeight()
    
    if (x % scale) { x -= x % scale }
    if (y % scale) { y -= y % scale }
    
    return {
        x: x,
        y: y
    }
}

var scale = 2

$(document).ready(function() {
    var dim = dimensions()
    ig.main( '#canvas', MyGame, 62, dim.x / scale, dim.y / scale, scale );
})

$(document).on("orientationchange", function() {
	var dim = dimensions()
    ig.system.resize(dim.x / scale, dim.y / scale, scale)
    if (ig.game.movementButtons) {
        ig.game.movementButtons.align()
        ig.game.shapeshitButtons.align()
        ig.game.attackButtons.align()
    }
});

$(window).on('resize', function() {
    var dim = dimensions()
    ig.system.resize(dim.x / scale, dim.y / scale, scale)
    if (ig.game.movementButtons) {
        ig.game.movementButtons.align()
        ig.game.shapeshitButtons.align()
        ig.game.attackButtons.align()
    }
})

});
