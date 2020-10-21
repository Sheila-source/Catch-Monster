CatchMonster.MainMenu = function(){};

CatchMonster.MainMenu.prototype = {
  create: function(){

    this.background = this.game.add.tileSprite(0, 0, this.game.width, 330, 'background');
    this.background.autoScroll(-25, 0);
    this.background.scale.setTo(2.75);
    this.ground = this.game.add.tileSprite(0, this.game.height - 70, this.game.width, 70, 'ground');
    this.ground.autoScroll(-150, 0);

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY / 2, 'logo');
    this.game.add.tween(this.splash).to({y: this.splash.y - 32}, 600, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);
    this.splash.anchor.setTo(0.5);
    this.splash.scale.setTo(0.75);

    this.startText = this.game.add.bitmapText(0, 10, 'minecraftia', 'Controls:', 40);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 2;

    this.startText = this.game.add.bitmapText(0, 0, 'minecraftia', 'Use A to go left, D to go right', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 1.75;

    this.startText = this.game.add.bitmapText(0, 0, 'minecraftia', 'and SPACE to jump.', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 1.6;

    this.startText = this.game.add.bitmapText(0, 0, 'minecraftia', 'tap to start', 32);
    this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
    this.startText.y = this.game.height / 1.3;

    this.player = this.add.sprite(this.game.world.centerX, this.game.height / 1.35, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(2.25);
    this.player.animations.add('walk', [0,1,2,3,2,1]);
    this.player.animations.play('walk', 8, true);
  },

  update: function(){
    if(this.game.input.activePointer.justPressed()){
      this.game.state.start('Game');
    }
  }
};
