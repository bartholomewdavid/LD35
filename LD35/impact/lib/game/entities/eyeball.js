ig.module(
    'game.entities.eyeball'
)
.requires(
    'game.entities.monster',
    'game.entities.eyeball.eyeballsensor'
)
.defines(function() {
    EntityEyeball = EntityMonster.extend({
        animSheet: new ig.AnimationSheet('media/eyeballs.png', 32, 32),
        size: {x: 32, y: 32},
        type: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.A,
        xFlip: false,
        element: 'Water',
        speed: 12,
        health: 10,
        damage: 0,

        init: function(x, y, settings) {
            this.addAnim('idleWater', 0.333, [0,1,2]);
            this.addAnim('idleFire', 0.333, [3,4,5]);
            this.parent( x, y, settings );
            
            ig.game.spawnEntity(
                EntityEyeballsensor,
                this.pos.x, this.pos.y,
                {
                    owner: this
                })
        },
        
        check: function(other) {
            other.receiveDamage(this.damage, this)
        },

        update: function() {
            if (this.aggroTarget) {
                var xDiff = this.pos.x - this.aggroTarget.pos.x
                if (xDiff < 0) {
                    this.vel.x = (this.speed > Math.abs(xDiff)) ? 0 : this.speed
                } else if (xDiff > 0) {
                    this.vel.x = (this.speed > Math.abs(xDiff)) ? 0 : -this.speed
                } else {
                    this.vel.x = 0
                }
                
                if (this.pos.y < this.aggroTarget.pos.y) {
                    this.vel.y = this.speed
                } else if (this.pos.y > this.aggroTarget.pos.y) {
                    this.vel.y = -this.speed
                }
            }

            if (this.vel.x > 0) {
                this.xFlip = true
            } else {
                this.xFlip = false
            }
            
            this.currentAnim.flip.x = this.xFlip
            this.currentAnim = this.anims['idle'+this.element]
            
            this.parent();
        }
    })
})
