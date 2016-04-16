ig.module(
    'game.entities.character'
)
.requires(
    'game.entities.base',
    'impact.animation'
)
.defines(function() {
    EntityCharacter = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/base.png', 32, 32),
        xFlip: false,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('walkingDown', 0.333, [0,1,2,3]);
            this.addAnim('walkingUp', 0.333, [4,5,6,7]);
            this.addAnim('walkingLeftRight', 0.333, [8,9,10,11]);

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
                this.xFlip = false;
            } else if (ig.input.state('right')) {
                this.vel.x = this.speed;
                this.xFlip = true;
            } else {
                this.vel.x = 0;
            }

            if (this.vel.y > 0) {
                this.currentAnimString = 'walkingDown'
            } else if (this.vel.y < 0) {
                this.currentAnimString = 'walkingUp'
            } else if (this.vel.x != 0) {
                this.currentAnimString = 'walkingLeftRight'
            } else {
                this.currentAnimString = 'idle'
            }

            this.currentAnim = this.anims[this.currentAnimString]
            this.currentAnim.flip.x = this.xFlip

            this.parent();
        },
    });
});
