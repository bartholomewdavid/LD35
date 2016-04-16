ig.module(
    'game.entities.characterattack'
)
.requires(
    'game.elements',
    'game.entities.base',
    'impact.animation',
    'impact.timer'
)
.defines(function() {
    EntityCharacterattack = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/baseattack.png', 8, 8),
        size: {x: 8, y: 8},
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.B,
        type: ig.Entity.TYPE.NONE,
        xFlip: false,
        yFlip: false,
        element: Element.NONE,
        direction: 'down',
        speed: 100,
        friction: {x: 0, y: 0},
        lifeDuration: 1.5,
        lifeTimer: null,

        init: function(x, y, settings) {
            this.addAnim('idleLeftRightNone', 0.1, [0,1,2])
            this.addAnim('idleUpDownNone', 0.1, [3,4,5])
            this.addAnim('idleLeftRight' + Element.WATER, 0.1, [6,7,8])
            this.addAnim('idleUpDown' + Element.WATER, 0.1, [9,10,11])

            this.lifeTimer = new ig.Timer()
            this.lifeTimer.set(this.lifeDuration)

            this.parent( x, y, settings );

            this.pos.x -= this.size.x / 2
            this.pos.y -= this.size.y / 2
        },
        
        check: function(other) {
            other.receiveDamage(1, this)
            this.kill()
        },

        update: function() {
            if (this.lifeTimer.delta() >= 0) {
                this.kill()
            }

            switch (this.direction) {
                case 'up':
                    this.vel.x = 0
                    this.vel.y = -this.speed
                    this.xFlip = false
                    this.yFlip = false
                    this.currentAnimString = 'idleUpDown'
                    break;
                case 'down':
                    this.vel.x = 0
                    this.vel.y = this.speed
                    this.xFlip = true
                    this.yFlip = true
                    this.currentAnimString = 'idleUpDown'
                    break;
                case 'left':
                    this.vel.x = -this.speed
                    this.vel.y = 0
                    this.xFlip = true
                    this.yFlip = true
                    this.currentAnimString = 'idleLeftRight'
                    break;
                case 'right':
                    this.vel.x = this.speed
                    this.vel.y = 0
                    this.xFlip = false
                    this.yFlip = false
                    this.currentAnimString = 'idleLeftRight'
                    break;
            }

            this.currentAnim = this.anims[this.currentAnimString+this.element]
            this.currentAnim.flip.x = this.xFlip
            this.currentAnim.flip.y = this.yFlip
            this.parent()
        },
    });
});
