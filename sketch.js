let players, 
	player1, 
	p1Sprite,
	p1Hitbox,
	player2,
	p2Sprite,
	p2Hitbox,
	player3,
	p3Sprite,
	p3Hitbox,
	player4,
	p4Sprite,
	p4Hitbox,
	background,
	playersSpeed,
	musicTiles,
	tile1,
	ladders,
	phoneSprite,
	dumpsterSprite,
	hitboxes,
	pianoTiles,
	walls;

let bass,
	bassNotes,
	donk;

let rhodes,
	rhodesNotes,
	rhodesKeys;

let chromeo,
	chromeoNotes,
	chromeoKeys;
	
let sax,
	saxNotes,
	saxKeys;

let beat;

function preload() {
	new Canvas(480, 270);
	displayMode('maxed', 'pixelated');
	p1Sprite = loadImage("sprites/player1.png");
	p2Sprite = loadImage("sprites/player2.png");
	p3Sprite = loadImage("sprites/player3.png");
	p4Sprite = loadImage("sprites/player4.png");
	background = loadImage("sprites/background.png");
	phoneSprite = loadImage("sprites/phone.png");
	dumpsterSprite = loadImage("sprites/dumpster.png");
	playersSpeed = 2;

	donk = new Tone.Sampler({
		urls: {
		  C4: "donk.wav"
		},
		release: 1,
		baseUrl: "/audio/"
	  }).toDestination();

	rhodes = new Tone.Sampler({
		urls: {
		  C4: "rhodes.wav"
		},
		release: .5,
		baseUrl: "/audio/"
	  }).toDestination();

	chromeo = new Tone.Sampler({
		urls: {
		  C5: "chromeo.wav"
		},
		release: .5,
		baseUrl: "/audio/"
	  }).toDestination();

	sax = new Tone.Sampler({
		urls: {
			// Octave 3
			"C#3": "Cs3.mp3",
			"D3": "D3.mp3",
			"D#3": "Ds3.mp3",
			"E3": "E3.mp3",
			"F3": "F3.mp3",
			"F#3": "Fs3.mp3",
			"G3": "G3.mp3",
			"G#3": "Gs3.mp3",
			"A#3": "As3.mp3",
			"B3": "B3.mp3",
			
			// Octave 4
			"C4": "C4.mp3",
			"C#4": "Cs4.mp3",
			"D4": "D4.mp3",
			"D#4": "Ds4.mp3",
			"E4": "E4.mp3",
			"F4": "F4.mp3",
			"F#4": "Fs4.mp3",
			"G4": "G4.mp3",
			"G#4": "Gs4.mp3",
			"A4": "A4.mp3",
			"A#4": "As4.mp3",
			"B4": "B4.mp3",
			
			// Octave 5
			"C5": "C5.mp3",
			"C#5": "Cs5.mp3",
			"D5": "D5.mp3",
			"D#5": "Ds5.mp3",
			"E5": "E5.mp3",
			"F5": "F5.mp3",
			"F#5": "Fs5.mp3",
			"G5": "G5.mp3",
			"G#5": "Gs5.mp3",
			"A5": "A5.mp3"
		  },
		release: .5,
		baseUrl: "/audio/sax/"
		}).toDestination();

	// quena for winds instruments


	beat = new Tone.Player("/audio/beat.wav").toDestination();
	beat.autostart = false;
	beat.loop = true;
	beat.volume.value = 6;
	beat.playbackRate = .88;

	Tone.context.lookAhead = 0;
}

function setup() {

	//players object
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

	

	//create players 1-4
	player1 = new players.Sprite(348, 208);
	player1.addSprite(p1Sprite);
	player1.animations.offset.x = 3;

	player2 = new players.Sprite(10, 210);
	player2.addSprite(p2Sprite);
	player2.animations.offset.x = 3;

	player3 = new players.Sprite(10, 210);
	player3.addSprite(p3Sprite);
	player3.animations.offset.x = 3;

	player4 = new players.Sprite(10, 210);
	player4.addSprite(p4Sprite);
	player4.animations.offset.x = 3;

// hitboxes for players

	hitboxes = new Group();
	hitboxes.visible = true;
	hitboxes.collider = NONE;

	p1Hitbox = new hitboxes.Sprite(player1.x, player1.y-8, 1, 4);
	p1Hitbox.player = player1;
	p1Hitbox.controller;
	let p1Glue = new GlueJoint(player1, p1Hitbox);
	p1Glue.visible = false;

	p2Hitbox = new hitboxes.Sprite(player2.x, player2.y-8, 1, 4);
	p2Hitbox.player = player2;
	p2Hitbox.controller;
	let p2Glue = new GlueJoint(player2, p2Hitbox);
	p2Glue.visible = false;

	p3Hitbox = new hitboxes.Sprite(player3.x, player3.y-8, 1, 4);
	p3Hitbox.player = player3;
	p3Hitbox.controller;
	let p3Glue = new GlueJoint(player3, p3Hitbox);
	p3Glue.visible = false;

	p4Hitbox = new hitboxes.Sprite(player4.x, player4.y-8, 1, 4);
	p4Hitbox.player = player4;
	p4Hitbox.controller;
	let p4Glue = new GlueJoint(player4, p4Hitbox);
	p4Glue.visible = false;

// music tiles
	musicTiles = new Group();
	musicTiles.rotationLock = true;
	musicTiles.friction = 0;
	musicTiles.layer = 1;
	musicTiles.collider = NONE;

// piano tiles
	pianoTiles = new musicTiles.Group();
	pianoTiles.w = 16;
	pianoTiles.h = 48;
	pianoTiles.note = "";

	// bass starting 280, 184
	// bass notes array ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "cC"]
	bassNotes = ["C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6"];
	for (i=0, j=280; i < bassNotes.length; i++, j+=16) {
		bass = new pianoTiles.Sprite(j, 184);
		bass.note = bassNotes[i];
		bass.text = bass.note;
		bass.play = function(note) {
			donk.triggerAttackRelease(note, 1);
		  }; 
	}

	chromeoNotes = ["C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5"];
	for (i=0, j=248; i < bassNotes.length; i++, j+=16) {
		chromeoKeys = new pianoTiles.Sprite(j, 80);
		chromeoKeys.h = 32;
		chromeoKeys.note = chromeoNotes[i];
		chromeoKeys.text = chromeoKeys.note;
		chromeoKeys.play = function(note) {
			chromeo.triggerAttackRelease(note, .5);
		  }; 
	}

	rhodesNotes = ["C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5"];
	for (i=0, j=8; i < rhodesNotes.length; i++, j+=16) {
		rhodesKeys = new pianoTiles.Sprite(j, 256);
		rhodesKeys.h = 32;
		rhodesKeys.note = rhodesNotes[i];
		rhodesKeys.text = rhodesKeys.note;
		rhodesKeys.play = function(note) {
			rhodes.triggerAttackRelease(note, .5);
		  }; 
	}

	saxNotes = [
		// Octave 3
		"C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
		
		// Octave 4
		"C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
		
		// Octave 5
		"C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5"
	  ];
	  for (i=0, j=70, k=140; i<saxNotes.length; i++, j+=20) {
		if (k <= 48) {
			break;
		}
		
		saxKeys = new pianoTiles.Sprite(j, k);
		saxKeys.w = 20
		saxKeys.h = 20;
		saxKeys.note = saxNotes[i];
		saxKeys.text = saxKeys.note;
		saxKeys.play = function(note) {
			sax.triggerAttackRelease(note, .5);
		  };
		
		if (j>=132) {
			k -= 20;
			if (k > 100) {
				j = 50;
			} else {
				j = -10;
			}
			i -= 3;
		}
	  }


//walls

	walls = new Group();
	walls.collider = STATIC;
	walls.friction = 0;
	walls.visible = true;

	let wall1 = new walls.Sprite(80,24, 160, 48);
	let wall2 = new walls.Sprite(188 ,72, 40, 144);
	let wall3 = new walls.Sprite(208 ,100, 8, 152);
	let wall4 = new walls.Sprite(184 ,152, 32, 20);
	let wall5 = new walls.Sprite(352, 44, 288, 48);
	let wall6 = new walls.Sprite(380, 145, 252, 64);
	let dumpsterWall = new walls.Sprite(0, 136, 96, 8);
	let borderLeft = new walls.Sprite(-14, 135, 2, 400);
	let borderRight = new walls.Sprite(494, 135, 2, 400);
	let borderBottom = new walls.Sprite(240, 272, 560, 2);

//ladder tiles
	ladders = new Group();
	ladders.collider = NONE;
	ladders.friction = 0;
	ladders.visible = false;

	let fence = new ladders.Sprite(80, 88, 160, 80);
	let ladder = new ladders.Sprite(232, 136, 4, 88);

// phone and dumpster
	obstacles = new Group;
	obstacles.collider = NONE;
	obstacles.friction = 0;
	obstacles.layer = 0;

	let dumpster = new obstacles.Sprite(32, 152, 48, 40);
	dumpster.spriteSheet = dumpsterSprite;
	dumpster.addAnis({
		exist: {row: 0, frames: 1}
	});

	allSprites.pixelPerfect = true;
	allSprites.debug = true;
}

////// DRAW LOOP

function draw() {
	clear();
	image(background, 0, 0);
	checkControllers();

	players.overlapping(ladders, climb);

	p1Hitbox.overlapping(pianoTiles, p1PlayNote);
	p1Hitbox.overlaps(pianoTiles, p1WalkingNote);

	p2Hitbox.overlapping(pianoTiles, p2PlayNote);
	p2Hitbox.overlaps(pianoTiles, p2WalkingNote);

	p3Hitbox.overlapping(pianoTiles, p3PlayNote);
	p3Hitbox.overlaps(pianoTiles, p3WalkingNote);

	p4Hitbox.overlapping(pianoTiles, p4PlayNote);
	p4Hitbox.overlaps(pianoTiles, p4WalkingNote);
}

////////////////


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

function climb(player, ladder) {
	player.changeAni('climb');
}

//////////// play notes

function p1PlayNote(hitbox, pianoTile) {
	if (controllers[0]) {
		if (contros[0].presses('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[0].presses('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[0].presses('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[0].presses('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[0].presses('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[0].presses('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p2PlayNote(hitbox, pianoTile) {
	if (controllers[1]) {
		if (contros[1].presses('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[1].presses('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[1].presses('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[1].presses('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[1].presses('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[1].presses('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p3PlayNote(hitbox, pianoTile) {
	if (controllers[2]) {
		if (contros[2].presses('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[2].presses('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[2].presses('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[2].presses('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[2].presses('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[2].presses('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p4PlayNote(hitbox, pianoTile) {
	if (controllers[3]) {
		if (contros[3].presses('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[3].presses('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[3].presses('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[3].presses('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[3].presses('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[3].presses('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

/////////////// walking notes

function p1WalkingNote(hitbox, pianoTile) {
	if (controllers[0]) {
		if (contros[0].pressing('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[0].pressing('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[0].pressing('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[0].pressing('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[0].pressing('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[0].pressing('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p2WalkingNote(hitbox, pianoTile) {
	if (controllers[1]) {
		if (contros[1].pressing('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[1].pressing('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[1].pressing('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[1].pressing('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[1].pressing('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[1].pressing('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p3WalkingNote(hitbox, pianoTile) {
	if (controllers[2]) {
		if (contros[2].pressing('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[2].pressing('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[2].pressing('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[2].pressing('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[2].pressing('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[2].pressing('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}

function p4WalkingNote(hitbox, pianoTile) {
	if (controllers[3]) {
		if (contros[3].pressing('a')) {
			pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3M"));
			}
		
			if (contros[3].pressing('b')) {
				//square.play(square.note);
				pianoTile.play(pianoTile.note);
			}
		
			if (contros[3].pressing('x')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "5P"))
			}
		
			if (contros[3].pressing('y')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "3m"))
			}
		
			if (contros[3].pressing('rt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7M"))
			}
		
			if (contros[3].pressing('lt')) {
				//pianoTile.play(pianoTile.note);
				pianoTile.play(Tonal.Note.transpose(pianoTile.note, "7m"))
			}
	}
}