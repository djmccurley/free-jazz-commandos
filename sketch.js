let players, player1;
let p1Sprite;

function preload() {
	new Canvas(480, 270);
	displayMode('maxed', 'pixelated', 4);
	p1Sprite = loadImage("sprites/player1b.png");

}

function setup() {

	players = new Group();
	players.spriteSheet = p1Sprite;
  	players.anis.offset.x = 0;
  	players.anis.frameDelay = 8;
  	players.friction = 0;
 	players.layer = 0;
	players.width = 24;
	players.height = 32;
	players.addAnis({
		idle: { row: 0, frames: 4},
		walk: { row: 1, frames: 4},
		strafe: { row: 3, frames: 4},
		jump: { row: 9, frames: 4}
	});

	player1 = new players.Sprite();
	player1.changeAni('jump');

	allSprites.pixelPerfect = true;
}

function draw() {
	background('skyblue');
	rect(10,20,16,16);
}
