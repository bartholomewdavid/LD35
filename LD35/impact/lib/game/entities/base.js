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
        
        _center: function() {
            return {
                x: this.pos.x + (this.size.x / 2),
                y: this.pos.y + (this.size.y / 2),
            }
        }
    });
});
