  CatchMonster.Preload = function() {
  this.ready = false;
};

CatchMonster.Preload.prototype = {
  preload: function(){

    this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY * 1.425, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('background', 'assets/images/sky.png');

    this.load.spritesheet('egg', 'assets/images/egg.png', 14, 16);
    this.load.spritesheet('player', 'assets/images/dino.png', 48, 36, 34);
    this.load.spritesheet('rock', 'assets/images/rock.png', 25, 22);

    this.load.audio('gameMusic', ['assets/audio/happy.mp3' , 'assets/audio/happy.ogg' ]);
    this.load.audio('jump', 'assets/audio/jump.wav');
    this.load.audio('egg_crack', 'assets/audio/egg_crack.wav');
    this.load.audio('catch', 'assets/audio/catch.wav');
    this.load.audio('fall', 'assets/audio/fall.wav');
    this.load.audio('death', 'assets/audio/dino_death.wav');
    this.load.audio('rock_breack', 'assets/audio/rock_break.wav');

    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },

  create: function(){
    this.preloadBar.cropEnabled = false;
  },

  update: function(){
    if(this.cache.isSoundDecoded('gameMusic') && this.ready === true){
      this.state.start('MainMenu')
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};
