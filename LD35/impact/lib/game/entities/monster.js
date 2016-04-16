ig.module(
    'game.entities.monster'
)
.requires(
    'game.entities.base',
    'game.elements',
    'impact.entity',
    'impact.animation'
)
.defines(function() {
    EntityMonster = ig.EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/monster.png', 32, 32),
    });

    EntityFireMonster = EntityMonster.extend({
        element: Element.FIRE
    });
});
