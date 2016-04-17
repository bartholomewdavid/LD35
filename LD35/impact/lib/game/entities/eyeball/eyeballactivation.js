ig.module(
    'game.entities.eyeball.eyeballactivation'
)
.requires(
    'game.entities.base'
)
.defines(function() {
    EntityEyeballactivation = EntityBase.extend({
        size: {x: 512, y: 512},
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

        update: function() {
            this.pos.x = this.owner.pos.x - this.size.x / 2
            this.pos.y = this.owner.pos.y - this.size.y / 2
        },
        
        check: function(other) {
            if (other.isCharacter) {
                this.owner.enabled = true
            }
        }
    })
})
