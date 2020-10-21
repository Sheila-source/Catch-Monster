var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot', CatchMonster.Boot);
game.state.add('Preloader', CatchMonster.Preload);
game.state.add('MainMenu', CatchMonster.MainMenu);
game.state.add('Game', CatchMonster.Game);

game.state.start('Boot');