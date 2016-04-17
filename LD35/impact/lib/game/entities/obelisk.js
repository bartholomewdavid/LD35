ig.module(
    'game.entities.obelisk'
)
.requires(
    'game.elements',
    'game.entities.monster',
    'game.entities.obelisksensor'
)
.defines(function() {
    EntityObelisk = EntityMonster.extend({
        animSheet: new ig.AnimationSheet('media/obeliskattack.png', 32, 64),
        size: {x: 32, y: 32},
        type: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NEVER,
        checkAgainst: ig.Entity.TYPE.A,
        element: Element.NONE,
        speed: 0,
        health: 10,
        damage: 0,
        cooldown: 3,
        attacking: false,
        attackDistance: 140,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('chargeUp', 0.15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
            this.addAnim('coolDown', 0.333, [18, 19, 20]);
            this.parent( x, y, settings );

            if(!ig.global.wm) {
                ig.game.spawnEntity(
                    EntityObeliskSensor,
                    this.pos.x, this.pos.y,
                    {
                        owner: this
                    })
            }
              this.currentAnim = this.anims['idle']
        },

        check: function(other) {
            other.receiveDamage(this.damage, this)
            console.log('test');
        },

        update: function() {
            if (this.aggroTarget) {
                if (this.distanceTo(this.aggroTarget) < this.attackDistance) {
                    this.attack(this.aggroTarget);
                }
            }
            this.parent();
        },

        attack: function(target) {
            // TODO: Only attack once cooling down is complete
            this.attacking = true;
            this.currentAnim = this.anims['chargeUp'];
            setTimeout(function() {
                if (this.distanceTo(this.aggroTarget) < this.attackDistance) {
                    // TODO: Deal damage to target
                    this.coolDown();
                }
            }.bind(this), this.currentAnim.frameTime * this.currentAnim.sequence.length * 1000);
        },

        coolDown: function() {
            this.currentAnim = this.anims['coolDown'];
            setTimeout(function() {
                this.currentAnim = this.anims['idle'];
            }.bind(this), this.currentAnim.frameTime * this.currentAnim.sequence.length * 1000);
        },
    })
})
