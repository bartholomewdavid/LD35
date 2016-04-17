ig.module(
    'game.entities.eyeballboss'
)
.requires(
    'impact.timer',
    'plugins.underscore',
    'game.elements',
    'game.entities.monster',
    'game.entities.eyeball',
    'game.entities.eyeball.eyeballsensor',
    'game.entities.eyeball.eyeballactivation'
)
.defines(function() {
    EntityEyeballboss = EntityMonster.extend({
        animSheet: new ig.AnimationSheet('media/eyeballsbig.png', 128, 128),
        size: {x: 96, y: 96},
        offset: {x: 16, y: 0},
        type: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.A,
        xFlip: false,
        element: 'Water',
        speed: 12,
        health: 100,
        damage: 2,
        damageCooldown: 1,
        damageCooldownTimer: null,
        elementChangerTimer: null,
        elementChangerDuration: 6,
        eyeballSpawnerTimer: null,
        eyeballSpawnerDuration: 10,

        init: function(x, y, settings) {
            this.addAnim('idleWater', 0.333, [0,1,2]);
            this.addAnim('idleFire', 0.333, [3,4,5]);
            this.addAnim('idleAir', 0.333, [6,7,8]);
            this.addAnim('idleEarth', 0.333, [9,10,11]);
            this.damageCooldownTimer = new ig.Timer()
            this.elementChangerTimer = new ig.Timer()
            this.eyeballSpawnerTimer = new ig.Timer()
            this.parent( x, y, settings );
            
            if(!ig.global.wm) {
                ig.game.spawnEntity(
                    EntityEyeballsensor,
                    this.pos.x, this.pos.y,
                    {
                        owner: this
                    })
                    
                ig.game.spawnEntity(
                    EntityEyeballactivation,
                    this.pos.x, this.pos.y,
                    {
                        owner: this
                    })
            }
        },
        
        check: function(other) {
            if (this.damageCooldownTimer.delta() > 0) {
                other.receiveDamage(this.damage, this)
                this.damageCooldownTimer.set(this.damageCooldown)
            }
        },

        receiveDamage: function(amount, other) {
            this.aggroTarget = other.owner
            this.parent(amount, other)
        },
        
        kill: function() {
            ig.game.win()
            this.parent()
        },

        update: function() {       
            if (!this.enabled) { return }
            
            if (this.aggroTarget) {
                if (this.elementChangerTimer.delta() > 0) {
                    this.elementChangerTimer.set(this.elementChangerDuration)
                    this.element = [Element.WATER, Element.FIRE, Element.EARTH][_.random(0,2)]
                }
                
                if (this.eyeballSpawnerTimer.delta() > 0) {
                    // Spawn a thing
                    ig.game.spawnEntity(
                        EntityEyeball,
                        this.pos.x, this.pos.y,
                        {
                            element: this.element,
                        })
                    
                    this.eyeballSpawnerTimer.set(this.eyeballSpawnerDuration)
                }
                
                var center = this._center()
                var xDiff = center.x - this.aggroTarget.pos.x
                if (xDiff < 0) {
                    this.vel.x = (this.speed > Math.abs(xDiff)) ? 0 : this.speed
                } else if (xDiff > 0) {
                    this.vel.x = (this.speed > Math.abs(xDiff)) ? 0 : -this.speed
                } else {
                    this.vel.x = 0
                }
                
                if (center.y < this.aggroTarget.pos.y) {
                    this.vel.y = this.speed
                } else if (center.y > this.aggroTarget.pos.y) {
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
