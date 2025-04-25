let players, player1, player2;
let p1Sprite, p2Sprite;

function preload() {
	new Canvas(480, 270);
	displayMode('maxed', 'pixelated');
	p1Sprite = loadImage("sprites/player1b.png");
	p2Sprite = loadImage("sprites/player2.png");

}

function setup() {

	players = new Group();
  	players.friction = 0;
 	players.layer = 0;
	players.width = 24;
	players.height = 32;
	players.rotationLock = true;
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
		this.changeAni('idle');
		this.anis.offset.x = 0;
		this.anis.frameDelay = 8;
	}



	player1 = new players.Sprite();
	player1.addSprite(p1Sprite);
	

	player2 = new players.Sprite();
	player2.addSprite(p2Sprite);

	allSprites.pixelPerfect = true;
}

function draw() {
	background('skyblue');
}
