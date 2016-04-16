ig.module(
    'game.entities.base'
)
.requires(
    'game.elements',
    'impact.entity',
    'impact.animation'
)
.defines(function() {
    EntityBase = ig.Entity.extend({
        size: {x: 8, y: 8},
        offset: {x: 12, y: 24},
        friction: {x: 0, y: 0},
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,
        speed: 40,
        zIndex: 1000,
        collides: ig.Entity.COLLIDES.ACTIVE,
        element: Element.NONE,
        xFlip: false,
        currentAnimString: null,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.1, [0]);
            this.addAnim('walking', 0.1, [0,1,2]);

            this.parent( x, y, settings );
        },

        draw: function() {
            this.parent();
        },
    });
});
