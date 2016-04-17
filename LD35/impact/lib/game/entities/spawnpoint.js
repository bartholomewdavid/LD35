ig.module(
    'game.entities.spawnpoint'
)
.requires(
    'game.entities.base'
)
.defines(function() {
    EntitySpawnpoint = EntityBase.extend({
        size: {x: 32, y: 32},
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,
        
        _wmScalable: false,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
    })
})
