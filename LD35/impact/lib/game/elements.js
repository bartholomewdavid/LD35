ig.module(
    'game.elements'
)
.defines(function() {
    Element = {
        NONE: 'None',
        EARTH: 'Earth',
        WIND: 'Wind',
        FIRE: 'Fire',
        WATER: 'Water'
    },

    ElementMultiplier = {
        'Earth': {
            'Earth': 1.00,
            'Wind': 0.50,
            'Fire': 1.50,
            'Water': 2.00
        },
        'Wind': {
            'Earth': 2.00,
            'Wind': 1.00,
            'Fire': 0.50,
            'Water': 1.50
        },
        'Water': {
            'Earth': 0.50,
            'Wind': 1.50,
            'Fire': 2.00,
            'Water': 1.00
        },
        'Fire': {
            'Earth': 1.50,
            'Wind': 2.00,
            'Fire': 1.00,
            'Water': 0.50
        }
    }
});
