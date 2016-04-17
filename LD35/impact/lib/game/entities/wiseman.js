ig.module(
    'game.entities.wiseman'
)
.requires(
    'impact.font',
    'impact.timer',
    'game.elements',
    'game.entities.base',
    'game.entities.wiseman.chatsensor'
)
.defines(function() {
    EntityWiseman = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/wiseman.png', 32, 32),
        font: new ig.Font( 'media/04b03.font.png' ),
        size: {x: 18, y: 20},
        offset: {x: 7, y: 12},
        type: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.FIXED,
        xFlip: false,
        speed: 0,
        chatTimer: null,
        chatDuration: 3,
        
        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.currentAnim = this.anims['idle']
            this.chatTimer = new ig.Timer()
            
            if(!ig.global.wm) {
                ig.game.spawnEntity(
                    EntityChatsensor,
                    this.pos.x, this.pos.y,
                    {
                        owner: this
                    })
            }
            
            this.parent( x, y, settings );
        },
        
        draw: function() {
            this.parent()
            
            if (this.chatTimer.delta() < 0) {
                this.font.draw( 
                    'The evil eyes killed our village. \nTheir home is to the south.', 
                     this.pos.x - ig.game.screen.x + 6, 
                     this.pos.y - ig.game.screen.y - 18, 
                    ig.Font.ALIGN.CENTER );
            }
        },
        
        resetTalk: function() {
            this.chatTimer.set(this.chatDuration)
        }
    });
});
