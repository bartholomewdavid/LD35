ig.module(
    'game.entities.obelisksensor'
)
.requires(
    'game.entities.base'
)
.defines(function() {
    EntityObelisksensor = EntityBase.extend({
        size: {x: 256, y: 256},
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        speed: 0,
        owner: null,

        init: function(x, y, settings) {
            this.owner = settings.owner
            this.parent( x, y, settings );

            this.pos.x -= this.size.x / 2
            this.pos.y -= this.size.y / 2
        },

        check: function(other) {
            if (other.isCharacter) {
                this.owner.aggroTarget = other
            }
        }
    })
})
