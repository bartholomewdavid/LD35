ig.module(
    'game.entities.character'
)
.requires(
    'game.entities.base',
    'impact.entity',
    'impact.animation'
)
.defines(function() {
    EntityCharacter = ig.Entity.extend({
        size: {x: 8, y: 8},
        offset: {x: 12, y: 24},
        animSheet: new ig.AnimationSheet('media/base.png', 32, 32),
        friction: {x: 0, y: 0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        speed: 40,
        zIndex: 1000,
        collides: ig.Entity.COLLIDES.ACTIVE,

        xFlip: false,
        currentAnimString: null,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('walking', 0.333, [1,2,3,4]);

            this.parent( x, y, settings );
        },

        update: function() {
            if (ig.input.state('up')) {
                this.vel.y = -this.speed;
            } else if (ig.input.state('down')) {
                this.vel.y = this.speed;
            } else {
                this.vel.y = 0;
            }

            if (ig.input.state('left')) {
                this.vel.x = -this.speed;
                this.xFlip = true;
            } else if (ig.input.state('right')) {
                this.vel.x = this.speed;
                this.xFlip = false;
            } else {
                this.vel.x = 0;
            }

            if (this.vel.x !== 0 || this.vel.y !== 0) {
                this.currentAnimString = 'walking'
            } else {
                this.currentAnimString = 'idle'
            }

            this.currentAnim = this.anims[this.currentAnimString]
            this.currentAnim.flip.x = this.xFlip

            this.parent();
        },

    });
});
