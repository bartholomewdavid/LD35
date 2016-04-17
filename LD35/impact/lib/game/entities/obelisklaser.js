ig.module(
    'game.entities.obelisklaser'
)
.requires(
    'game.entities.base'
)
.defines(function() {
    EntityObelisklaser = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/laserdot.png', 8, 8),
        size: {x: 8, y: 8},
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        owner: null,
        lifetimeTimer: null,
        lifetime: 0.333,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.currentAnim = this.anims['idle']
            this.lifetimeTimer = new ig.Timer();
            this.lifetimeTimer.set(this.lifetime);
            this.owner = settings.owner
            this.parent( x, y, settings );

            this.pos.x -= this.size.x / 2
            this.pos.y -= this.size.y / 2
        },

        update: function() {
            if (this.lifetimeTimer.delta() > 0) {
                this.kill();
            }
        }
    })
})
