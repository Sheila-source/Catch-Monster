
var Rock = function(game, x, y, key, frame){
	key = 'rock';
	Phaser.Sprite.call(this, game, x, y, key, frame);

	//this.scale.setTo(0.1);
	this.anchor.setTo(0.5);

	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false;

	this.checkWorldBounds = true;
	this.onOutOfBoundsKill = true;

	this.events.onRevived.add(this.onRevived, this);
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.onRevived = function(){
	this.body.velocity.y = 450;
};
