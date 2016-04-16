ig.module(
    'game.entities.base'
)
.requires(
    'game.elements',
    'impact.entity'
)
.defines(function() {
    EntityBase = ig.Entity.extend({
        friction: {x: 0, y: 0},
        element: Element.NONE,
    });
});
