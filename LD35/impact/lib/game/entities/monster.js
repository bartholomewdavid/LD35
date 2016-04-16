ig.module(
    'game.entities.monster'
)
.requires(
    'game.entities.base',
    'game.elements',
    'game.directions',
    'impact.animation'
)
.defines(function() {
    EntityMonster = EntityBase.extend({
        animSheet: new ig.AnimationSheet('media/base.png', 32, 32),
        speed: 30,
        lastDirection: null,
        aggroTarget: null,

        init: function(x, y, settings) {
            this.addAnim('idle', 0.333, [0]);
            this.addAnim('walking', 0.333, [1,2,3,4]);

            this.wander();
            this.parent( x, y, settings );
        },


        getRandomDirection: function() {
            var directions = [
                Direction.UP,
                Direction.DOWN,
                Direction.LEFT,
                Direction.RIGHT
            ];
            var randomDirection;
            var oppositeDirection = true;
            while (oppositeDirection) {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
                if (randomDirection == Direction.UP && this.lastDirection == Direction.DOWN) {
                    oppositeDirection = true;
                    continue;
                }
                if (randomDirection == Direction.DOWN && this.lastDirection == Direction.UP) {
                    oppositeDirection = true;
                    continue;
                }
                if (randomDirection == Direction.LEFT && this.lastDirection == Direction.RIGHT) {
                    oppositeDirection = true;
                    continue;
                }
                if (randomDirection == Direction.RIGHT && this.lastDirection == Direction.LEFT) {
                    oppositeDirection = true;
                    continue;
                }
                oppositeDirection = false;
            }
            return randomDirection;
        },

        wander: function() {
            setInterval(function() {
                var randomDirection = this.getRandomDirection();
                switch (randomDirection) {
                    case Direction.UP:
                        this.vel.y = -this.speed;
                        break;
                    case Direction.DOWN:
                        this.vel.y = this.speed;
                        break;
                    case Direction.LEFT:
                        this.vel.x = -this.speed;
                        break;
                    case Direction.RIGHT:
                        this.vel.x = this.speed;
                        break;
                }
                this.lastDirection = randomDirection;
            }.bind(this), 1000)
        },
    });

    EntityFireMonster = EntityMonster.extend({
        element: Element.FIRE
    });
});
