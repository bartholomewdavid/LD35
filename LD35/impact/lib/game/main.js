ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.world',
    'game.entities.character',
    'plugins.touch-button'
)
.defines(function(){

MyGame = ig.Game.extend({
    player: null,
    
    buttons: null,
    buttonImage: new ig.Image( 'media/buttons.png' ),
    
    init: function() {        
        if( ig.ua.mobile ) {
            this.buttons = new ig.TouchButtonCollection([
                new ig.TouchButton( 'up', {left: 24, bottom: 48}, 24, 24, this.buttonImage, 0 ),
                new ig.TouchButton( 'right', {left: 48, bottom: 24}, 24, 24, this.buttonImage, 1 ),
                new ig.TouchButton( 'down', {left: 24, bottom: 0}, 24, 24, this.buttonImage, 2 ),
                new ig.TouchButton( 'left', {left: 0, bottom: 24}, 24, 24, this.buttonImage, 3 ),
                new ig.TouchButton( 'attack', {right: 12, bottom: 12}, 24, 24, this.buttonImage, 4 ),
                new ig.TouchButton( 'shapeshift', {right: 12, bottom: 48}, 24, 24, this.buttonImage, 4 ),
            ]);
            
            // Align the touch buttons to the screen edges; you have 
            // to call this function once after creating the 
            // TouchButtonCollection and then every time you change 
            // the game's screen size
            this.buttons.align();
        } else {
            // initialize your game world, bind some 
            // keys, etc.
            ig.input.bind( ig.KEY.UP_ARROW, 'up' )
            ig.input.bind( ig.KEY.DOWN_ARROW, 'down' )
            ig.input.bind( ig.KEY.LEFT_ARROW, 'left' )
            ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' )
            
            ig.input.bind( ig.KEY.PERIOD, 'attack')
            
            ig.input.bind( ig.KEY._1, 'one')
            ig.input.bind( ig.KEY._2, 'two')
        }
        
        this.loadLevel( LevelWorld )
        
        this.player = this.getEntitiesByType( EntityCharacter )[0]
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
        
        if( this.buttons ) {
            this.buttons.draw(); 
        }
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

// TODO maybe sizing?
var scale = 2
if (dimensions().x < 960) {
    scale = 2
}

$(document).ready(function() {
    var dim = dimensions()
    ig.main( '#canvas', MyGame, 62, dim.x / scale, dim.y / scale, scale );
})

$(document).on("orientationchange", function() {
	var dim = dimensions()
    ig.system.resize(dim.x / scale, dim.y / scale, scale)
    ig.game.buttons.align()
});

$(window).on('resize', function() {
    var dim = dimensions()
    ig.system.resize(dim.x / scale, dim.y / scale, scale)
    ig.game.buttons.align();
})

});
