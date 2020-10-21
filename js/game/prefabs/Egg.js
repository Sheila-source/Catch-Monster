var Egg = function(game, x, y, key, frame) {
	key ='egg';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	this.scale.setTo(1.5);
	this.anchor.setTo(0.5);

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false;

	this.checkWorldBounds = true;
	this.OnOutBoundsKill = true;

	this.events.onKilled.add(this.onKilled, this);
	this.events.onRevived.add(this.onRevived, this);
};

Egg.prototype = Object.create(Phaser.Sprite.prototype);
Egg.prototype.constructor = Egg;

Egg.prototype.onRevived = function() {
	this.body.velocity.y = 250;
};

Egg.prototype.onKilled = function() {
	this.animations.frame = 0;
};
