ig.module(
    'game.entities.monster'
)
.requires(
    'game.entities.base',
    'game.elements',
    'impact.animation'
)
.defines(function() {
    EntityMonster = EntityBase.extend({
        //animSheet: new ig.AnimationSheet('media/monster.png', 32, 32),

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('walking', 0.333, [1,2,3,4]);

            this.parent( x, y, settings );
        },
    });

    EntityFireMonster = EntityMonster.extend({
        element: Element.FIRE
    });
});
