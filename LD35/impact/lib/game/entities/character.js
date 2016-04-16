ig.module(
    'game.entities.character'
)
.requires(
    'game.elements',
    'game.entities.base',
    'game.entities.characterattack'
)
.defines(function() {
    EntityCharacter = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/base.png', 32, 32),
        size: {x: 18, y: 20},
        offset: {x: 7, y: 12},
        type: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.ACTIVE,
        xFlip: false,
        element: Element.NONE,
        direction: 'down',
        speed: 40,
        isCharacter: true,

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
                this.element = Element.NONE;
            }
            if (ig.input.pressed('two')) {
                this.element = Element.WATER;
            }

            if (ig.input.pressed('shapeshift')) {
                switch (this.element) {
                    case Element.NONE:
                        this.element = Element.WATER
                        break;
                    case Element.WATER:
                        this.element = Element.NONE
                        break;
                }
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
                this.currentAnimString = 'walkingDown';
                this.direction = 'down';
            } else if (this.vel.y < 0) {
                this.currentAnimString = 'walkingUp';
                this.direction = 'up';
            } else if (this.vel.x != 0) {
                this.currentAnimString = 'walkingLeftRight';
                if (this.vel.x < 0) {
                    this.direction = 'left';
                }
                if (this.vel.x > 0) {
                    this.direction = 'right';
                }
            } else {
                this.currentAnimString = 'idle';
            }

            // Animation Set and Flipping
            this.currentAnim = this.anims[this.currentAnimString+this.element];
            this.currentAnim.flip.x = this.xFlip;

            // Attacking
            if (ig.input.pressed('attack')) {
                if (this.element != Element.NONE) {
                    // Attacking
                    var center = this._center()

                    ig.game.spawnEntity(
                        EntityCharacterattack,
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
                x: this.pos.x + (this.size.x / 2),
                y: this.pos.y + (this.size.y / 2),
            }
        }
    });
});
