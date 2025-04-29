let players, 
	player1, 
	p1Sprite,
	player2,
	p2Sprite,
	player3,
	p3Sprite,
	player4,
	p4Sprite,
	background,
	playerSpeed,
	musicTiles,
	walls;

function preload() {
	new Canvas(480, 270);
	displayMode('maxed', 'pixelated');
	p1Sprite = loadImage("sprites/player1b.png");
	p2Sprite = loadImage("sprites/player2.png");
	p3Sprite = loadImage("sprites/player3.png");
	p4Sprite = loadImage("sprites/player4.png");
	background = loadImage("sprites/background.png");
	playersSpeed = 2.5;

}

function setup() {

	players = new Group();
  	players.friction = 0;
	players.width = 24;
	players.height = 32;
	players.rotationLock = true;
	players.overlaps(players);
	players.layer = 2;
	
	players.addSprite = function(sheet) {
		this.spriteSheet = sheet;
		this.addAnis({
			idle: { row: 0, frames: 4},
			strafe: { row: 1, frames: 4},
			walk: { row: 2, frames: 4},
			punch1: { row: 3, frames: 1},
			punch2: { row: 4, frames: 1},
			punch3: { row: 5, frames: 1},
			headbutt: { row: 6, frames: 2},
			kick1: { row: 7, frames: 1},
			kick2: { row: 8, frames: 1},
			jump: { row: 9, frames: 4},
			climb: { row: 10, frames: 4}
		});
		this.changeAni('walk');
		this.anis.offset.x = 0;
		this.anis.frameDelay = 8;
	}
	
	players.bBtn = function() {
		this.changeAni("punch1");
	}
	players.aBtn = function() {
		this.changeAni("punch2");
	}
	players.yBtn = function() {
		this.changeAni("punch3");
	}
	players.xBtn = function() {
		this.changeAni("headbutt");
	}
	players.rtBtn = function() {
		this.changeAni("kick1");
	}
	players.ltBtn = function() {
		this.changeAni("kick2");
	}
	players.upBtn = function () {
		this.changeAni("strafe");
		this.direction = -90;
		this.speed = playersSpeed;
	}
	players.downBtn = function () {
		this.changeAni("strafe");
		this.direction = 90;
		this.speed = playersSpeed;
	}
	players.rightBtn = function () {
		this.changeAni("walk");
		this.direction = 0;
		this.speed = playersSpeed;
		this.mirror.x = false;
	}
	players.leftBtn = function () {
		this.changeAni("walk");
		this.direction = 180;
		this.speed = playersSpeed;
		this.mirror.x = true;
	}
	players.stop = function () {
		this.changeAni('idle');
		this.speed = 0;
	}
	player1 = new players.Sprite(48, 208);
	player1.addSprite(p1Sprite);
	player1.animations.offset.x = 3;

	player2 = new players.Sprite();
	player2.addSprite(p2Sprite);

	player3 = new players.Sprite();
	player3.addSprite(p3Sprite);

	player4 = new players.Sprite();
	player4.addSprite(p4Sprite);

// music tiles
	musicTiles = new Group();
	musicTiles.width = 16;
	musicTiles.height = 16;
	musicTiles.rotationLock = true;
	musicTiles.friction = 0;
	musicTiles.layer = 1;
	musicTiles.collider = NONE;

	tile1 = new musicTiles.Sprite(0, 64);

//walls

	walls = new Group();
	walls.collider = STATIC;

	wall1 = new walls.Sprite(80,24, 160, 48);
	wall2 = new walls.Sprite(184 ,72, 48, 144);
	wall3 = new walls.Sprite(212 ,100, 4, 152);
	wall4 = new walls.Sprite(192 ,152, 32, 20);
	
	allSprites.pixelPerfect = true;
	allSprites.debug = true;
}

function draw() {
	clear();
	image(background, 0, 0);
	checkControllers();

	if (player1.overlapping(tile1)) {
		player1.changeAni("climb");
	}
	

}

function checkControllers() {
		//player1
	if (controllers[0]) {
	
		if (contros[0].pressing('up')) {
			player1.upBtn();
		} else if (contros[0].pressing('down')) {
			player1.downBtn();
		} else if (contros[0].pressing("left")) {
			player1.leftBtn();
		} else if (contros[0].pressing("right")) {
			player1.rightBtn();
		} else {
			player1.stop();
		}
		
		if (contros[0].pressing('lt')) {
			player1.ltBtn();
		} else if (contros[0].pressing('rt')) {
			player1.rtBtn();
		} else if (contros[0].pressing('y')) {
			player1.yBtn();
		} else if (contros[0].pressing('x')) {
			player1.xBtn();
		} else if (contros[0].pressing('a')) {
			player1.aBtn();
		} else if (contros[0].pressing('b')) {
			player1.bBtn();
		} 
	}

		//player2
	if (controllers[1]) {
		if (contros[1].pressing('up')) {
			player2.upBtn();
		} else if (contros[1].pressing('down')) {
			player2.downBtn();
		} else if (contros[1].pressing("left")) {
			player2.leftBtn();
		} else if (contros[1].pressing("right")) {
			player2.rightBtn();
		} else {
			player2.stop();
		}
		
		if (contros[1].pressing('lt')) {
			player2.ltBtn();
		} else if (contros[1].pressing('rt')) {
			player2.rtBtn();
		} else if (contros[1].pressing('y')) {
			player2.yBtn();
		} else if (contros[1].pressing('x')) {
			player2.xBtn();
		} else if (contros[1].pressing('a')) {
			player2.aBtn();
		} else if (contros[1].pressing('b')) {
			player2.bBtn();
		} 
	}

	//player3
	if (controllers[2]) {
		if (contros[2].pressing('up')) {
			player3.upBtn();
		} else if (contros[2].pressing('down')) {
			player3.downBtn();
		} else if (contros[2].pressing("left")) {
			player3.leftBtn();
		} else if (contros[2].pressing("right")) {
			player3.rightBtn();
		} else {
			player3.stop();
		}
		
		if (contros[2].pressing('lt')) {
			player3.ltBtn();
		} else if (contros[2].pressing('rt')) {
			player3.rtBtn();
		} else if (contros[2].pressing('y')) {
			player3.yBtn();
		} else if (contros[2].pressing('x')) {
			player3.xBtn();
		} else if (contros[2].pressing('a')) {
			player3.aBtn();
		} else if (contros[2].pressing('b')) {
			player3.bBtn();
		} 
	}

	//player4
	if (controllers[3]) {
		if (contros[3].pressing('up')) {
			player4.upBtn();
		} else if (contros[3].pressing('down')) {
			player4.downBtn();
		} else if (contros[3].pressing("left")) {
			player4.leftBtn();
		} else if (contros[3].pressing("right")) {
			player4.rightBtn();
		} else {
			player4.stop();
		}
		
		if (contros[3].pressing('lt')) {
			player4.ltBtn();
		} else if (contros[3].pressing('rt')) {
			player4.rtBtn();
		} else if (contros[3].pressing('y')) {
			player4.yBtn();
		} else if (contros[3].pressing('x')) {
			player4.xBtn();
		} else if (contros[3].pressing('a')) {
			player4.aBtn();
		} else if (contros[3].pressing('b')) {
			player4.bBtn();
		} 
	}
}