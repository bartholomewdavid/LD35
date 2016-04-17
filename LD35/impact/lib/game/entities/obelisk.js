ig.module(
    'game.entities.obelisk'
)
.requires(
    'game.elements',
    'game.entities.monster',
    'game.entities.obelisksensor',
    'game.entities.obelisklaser'
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
        cooldown: 3,
        attackDistance: 140,
        damage: 1,
        damageCooldown: 3,
        damageCooldownTimer: null,
        attacking: false,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('chargeUp', 0.15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], true);
            this.addAnim('coolDown', 0.333, [18, 19, 20], true);
            this.parent( x, y, settings );
            this.damageCooldownTimer = new ig.Timer()

            if(!ig.global.wm) {
                ig.game.spawnEntity(
                    EntityObelisksensor,
                    this.pos.x, this.pos.y,
                    {
                        owner: this
                    })
            }
              this.currentAnim = this.anims['idle']
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
            if (this.damageCooldownTimer.delta() > 0) {
                if (!this.attacking) {
                    this.attacking = true;
                    this.currentAnim = this.anims['chargeUp'];
                    this.currentAnim.rewind();
                    setTimeout(function() {
                        if (this.distanceTo(this.aggroTarget) < this.attackDistance) {
                            target.receiveDamage(this.damage, this)
                            if(!ig.global.wm) {
                                var targetCenter = this.aggroTarget._center();
                                ig.game.spawnEntity(
                                    EntityObelisklaser, targetCenter.x, targetCenter.y
                                )
                            }
                        }
                        this.coolDown();
                        this.attacking = false;
                    }.bind(this), this.currentAnim.frameTime * this.currentAnim.sequence.length * 1000);
                }
            }
        },

        coolDown: function() {
            this.currentAnim = this.anims['coolDown'];
            this.currentAnim.rewind();
            this.damageCooldownTimer.set(this.damageCooldown)
            setTimeout(function() {
                this.currentAnim = this.anims['idle'];
            }.bind(this), this.currentAnim.frameTime * this.currentAnim.sequence.length * 1000);
        },
    })
})
