ig.module(
    'game.entities.character'
)
.requires(
    'game.entities.base',
    'game.entities.characterattack'
)
.defines(function() {
    EntityCharacter = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/base.png', 32, 32),
        size: {x: 32, y: 32},
        collides: ig.Entity.COLLIDES.ACTIVE,
        xFlip: false,
        element: 'None',
        direction: 'down',

        init: function(x, y, settings) {
            this.addAnim('idleNone', 0.333, [0]);
            this.addAnim('walkingDownNone', 0.333, [0,1,2,3]);
            this.addAnim('walkingUpNone', 0.333, [4,5,6,7]);
            this.addAnim('walkingLeftRightNone', 0.333, [8,9,10,11]);
            this.addAnim('idleWater', 0.333, [12]);
            this.addAnim('walkingDownWater', 0.333, [12,13,14,15]);
            this.addAnim('walkingUpWater', 0.333, [16,17,18,19]);
            this.addAnim('walkingLeftRightWater', 0.333, [20,21,22,23]);

            this.parent( x, y, settings );
        },

        update: function() {
            // Elemental Animation Sets
            if (ig.input.pressed('one')) {
                this.element = 'None'
            }
            if (ig.input.pressed('two')) {
                this.element = 'Water'
            }
            
            
            // Movement
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
                this.direction = 'down'
            } else if (this.vel.y < 0) {
                this.currentAnimString = 'walkingUp'
                this.direction = 'up'
            } else if (this.vel.x != 0) {
                this.currentAnimString = 'walkingLeftRight'
                if (this.vel.x < 0) {
                    this.direction = 'left'
                }
                if (this.vel.x > 0) {
                    this.direction = 'right'
                }
            } else {
                this.currentAnimString = 'idle'
            }

            // Animation Set and Flipping
            this.currentAnim = this.anims[this.currentAnimString+this.element]
            this.currentAnim.flip.x = this.xFlip

            // Attacking
            if (ig.input.pressed('attack')) {
                if (this.element != 'None') {
                    // Attacking
                    var center = this._center()
                    
                    ig.game.spawnEntity(
                        EntityCharacterAttack,
                        center.x, center.y,
                        {
                            element: this.element,
                            direction: this.direction
                        })
                } else {
                    // Not attacking
                }
            }

            this.parent();
        },
        
        _center: function() {
            return {
                x: this.pos.x + (this.size.x / 2), // TODO Offset if we use it
                y: this.pos.y + (this.size.y / 2), // TODO Offset if we use it
            }
        }
    });
});
