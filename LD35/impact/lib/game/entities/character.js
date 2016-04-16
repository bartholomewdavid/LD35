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
