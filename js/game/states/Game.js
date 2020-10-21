CatchMonster.Game = function(){

  this.eggRate = 1000;
  this.eggTimer = 0;

  this.rockRate = 1500;
  this.rockTimer = 0;

  this.score = 0;
};

CatchMonster.Game.prototype = {
  create: function(){

    this.background = this.game.add.tileSprite(0, 0, this.game.width, 330, 'background');
    this.background.autoScroll(-20, 0);
    this.background.scale.setTo(2.75);
    this.ground = this.game.add.tileSprite(0, this.game.height - 70, this.game.width, 70, 'ground');

    this.player = this.add.sprite(this.game.world.centerX, this.game.world.centerY * 1.5, 'player');
    this.player.scale.setTo(2.25);
    this.player.anchor.setTo(0.5);

    this.player.animations.add('run_left', [27,25,24,28]);
    this.player.animations.add('run_right', [9,5,6,8]);
    this.player.animations.add('idle', [0, 2]);

    this.runleft = this.input.keyboard.addKey(Phaser.Keyboard.A);
    this.runright = this.input.keyboard.addKey(Phaser.Keyboard.D);
    this.playerjump = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 1000;

    this.game.physics.arcade.enableBody(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    this.player.body.allowGravity = true;
    this.player.body.collideWorldBounds = true;

    this.eggs = this.game.add.group();
    this.rocks = this.game.add.group();

    this.scoreText = this.game.add.bitmapText(this.game.width / 2, 10, 'minecraftia', 'Score: 0', 24);
    this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;

    this.jumpSound = this.game.add.audio('jump');
    this.eggcrackSound = this.game.add.audio('egg_crack');
    this.catchSound = this.game.add.audio('catch', 1.5);
    this.fallSound = this.game.add.audio('fall', 0.25);
    this.deathSound = this.game.add.audio('dino_death', 3);
    this.rockSound = this.game.add.audio('rock_break');
    this.gameMusic = this.game.add.audio('gameMusic');
    this.gameMusic.play('', 0, true);
  },

  update: function(){

    if(this.eggTimer < this.game.time.now){
      this.createEgg();
      this.eggTimer = this.game.time.now + this.eggRate;
    }

    if(this.rockTimer < this.game.time.now){
      this.createRock();
      this.rockTimer = this.game.time.now + this.rockRate;
    }

    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.overlap(this.player, this.eggs, this.eggHit, null, this);
    this.game.physics.arcade.collide(this.player, this.rocks, this.rockHit, null, this);
    this.game.physics.arcade.collide(this.ground, this.eggs);
    this.game.physics.arcade.collide(this.ground, this.rocks);

    this.playerControls();
  },

  shutdown: function(){
    this.rocks.destroy();
    this.eggs.destroy();
    this.score = 0;
    this.eggTimer = 0;
    this.rockTimer = 0;
  },

  createEgg: function(){
    var x = this.game.rnd.integerInRange(50, this.game.world.width - 192);
    var y = 0;
    var egg = this.eggs.getFirstExists(false);

    if(!egg) {
      egg = new Egg(this.game, 0, 0);
      this.eggs.add(egg);
    }

    egg.reset(x, y);
    egg.revive();
    this.fallSound.play();
  },

  createRock: function(){
    var x = this.game.rnd.integerInRange(50, this.game.world.width - 192);
    var y = 0;
    var rock = this.rocks.getFirstExists(false);

    if(!rock){
      rock = new Rock (this.game, 0, 0);
      this.rocks.add(rock);
    }

    rock.reset(x, y);
    rock.revive();
  },

  eggHit: function(player, egg){
    this.catchSound.play();
    egg.kill();
    this.score+=10;
    this.scoreText.text = 'Score: ' + this.score;
  },

  rockHit: function(player, rock){

    if(rock.body.touching.down){
      player.kill();
      this.deathSound.play();
      this.gameMusic.stop();

      this.background.stopScroll();

      this.rocks.setAll('body.velocity.x', 0);
      this.eggs.setAll('body.velocity.x', 0);

      this.rockTimer = Number.MAX_VALUE;
      this.eggTimer = Number.MAX_VALUE;

      var scoreboard = new Scoreboard(this.game);
      scoreboard.show(this.score);

    } else if(rock.body.touching.left){
        rock.angle+=30;
        rock.body.velocity.x = 300;
    } else if(rock.body.touching.right){
        rock.angle-=30;
        rock.body.velocity.x = -300;
    } else {
        this.player.body.velocity.y = -300;
        rock.kill();
        this.rockSound.play();
        this.score+=5;
        this.scoreText.text = 'Score: ' + this.score;
      }
  },

  playerControls: function (){

    if(this.runright.isDown){
      this.player.body.velocity.x = 500;
      this.player.animations.play('run_right', 8, true);
    } else if(this.runleft.isDown){
        this.player.body.velocity.x = -500;
        this.player.animations.play('run_left', 8, true);
    } else {
      this.player.body.velocity.x = 0;
      this.player.animations.play('idle', 4, true);
    }

    if (this.playerjump.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -550;
        this.jumpSound.play();
    }
  }
};
