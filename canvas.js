import platform from './img/platform.png';
import tank1 from './img/tank-1.png';
import tank2 from './img/tank-2.png';
import tank3 from './img/tank-3.png';
import back from './img/back.png';
import support from './img/support.png';

import spriteRunLeft from './img/spriteRunLeft.png';
import spriteRunRight from './img/spriteRunRight.png';
import spriteStandLeft from './img/spriteStandLeft.png';
import spriteStandRight from './img/spriteStandRight.png';

import GenericObject from './classes/genericObjects';
import Player from './classes/player';
import Platform from './classes/platform';


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 1;
//set the canvas to be the full width and height of the screen
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

//set the canvas to a set width and height
canvas.width = 1024;
canvas.height = 576;
console.log(c);

//Image objects
let platformImage = createImage(platform);
let tank1Image = createImage(tank1);
let tank2Image = createImage(tank2);
let tank3Image = createImage(tank3);
let backImage = createImage(back);
let supportImage = createImage(support);

//background image values
let bgWidth = 800 * 1.5;
let bgHeight = 600 * 1.5;

//background tank values
let bgTankWidth = tank1Image.width * 3;
let bgTankHeight = tank1Image.height * 3;
let bgTank1Distance = 1000;
let bgTank2Distance = 800;
let bgTank3Distance = 1500;
let supportDistance = 1200;

//support beams values
let supportWidth = supportImage.width * 3;
let supportHeight = supportImage.height * 3;

//Creates and returns the image objects
function createImage(imageSrc) {
	let image = new Image();
	image.src = imageSrc;
	return image;
}

//Class objects
let player;
let platforms = []; // what player stands on
let stage1backgrounds = []; // parallex scrolled background and hills
let stage1decor = []; //tanks n stuff
let supportBeams = []; //  support beams

// button state
let lastKey = 'right';
let keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
	up: {
		pressed: false,
	},
	down: {
		pressed: false,
	},
};

let actionKeys = {
	space: {
		pressed: false,
	},
	b: {
		pressed: false,
	},
	s: {
		pressed: false,
	},
};

let direction = {
	right: false,
	left: false,
	up: false,
	down: false,
	upRight: false,
	downRight: false,
	upLeft: false,
	downLeft: false,
	stop: true,
};

let lastDirection = {
	right: false,
	left: false,
	up: false,
	down: false,
	upRight: false,
	downRight: false,
	upLeft: false,
	downLeft: false,
	stop: true,
};
//Tracks the players change in canvas x-position from its original position
let scrollOffset = 0;
let man = false;
function main() {
	init();
	animate();
}

main();

//this function will initialize the game objects
function init() {
	player = new Player();

	// if (player.playedStaringSound == false) {
	// 	player.playedStaringSound = true;
	// 	player.sound.transform.play();
	// }
	//The platform constructor accepts an x and y value for the platform anchor, and the image source
	platforms = [
		// new Platform(platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width, 270, platformSmallTallImage), //
		new Platform(-1, 470, platformImage), // first standing platform
		new Platform(platformImage.width, 470, platformImage), // 2nd platform with x-positiion set 1 platform width away from the origin
		new Platform(platformImage.width * 2, 470, platformImage), // 3rd platform with x-position set 2 platform widths + 100 px away from the origin to create a death pit
		new Platform(platformImage.width * 3, 470, platformImage), // 4th platform with x-position set 3 platform widths + 300 px away from the origin
		new Platform(platformImage.width * 4, 470, platformImage), // 5th platform with x-position set 4 platform widths + 300 px away from the origin
		new Platform(platformImage.width * 5, 470, platformImage), // 6th platform with x-position set 4 platform widths + 300 px away from the origin
		new Platform(platformImage.width * 6, 470, platformImage), // 7th platform with x-position set 4 platform widths + 300 px away from the origin
		new Platform(platformImage.width * 7, 470, platformImage), // 8th platform with x-position set 4 platform widths + 300 px away from the origin
	];

	supportBeams = [
		new GenericObject(50, 0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 2, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 3, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 4, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 5, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 6, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 7, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 8, -0, supportWidth, supportHeight, supportImage),
		new GenericObject(supportDistance * 9, -0, supportWidth, supportHeight, supportImage),
	];

	stage1backgrounds = [
		new GenericObject(-1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 2 - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 3 - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 4 - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 5 - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 6 - 1, -320, bgWidth, bgHeight, backImage),
		new GenericObject(bgWidth * 7 - 1, -320, bgWidth, bgHeight, backImage),
	]; //setting the x and y to -1 gets rid of the white edges. 800 = width, 600 = height

	stage1decor = [
		//tank 1 with human
		new GenericObject(500, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 2, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 3, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 4, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 5, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 6, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 7, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 8, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),
		new GenericObject(bgTank1Distance * 9, canvas.height - 595, bgTankWidth, bgTankHeight, tank1Image),

		//tank 2
		new GenericObject(1000, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 2, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 3, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 4, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 5, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 6, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 7, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 8, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),
		new GenericObject(bgTank2Distance * 9, canvas.height - 595, bgTankWidth, bgTankHeight, tank2Image),

		//tank 3
		new GenericObject(1500, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 2, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 3, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 4, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 5, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 6, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 7, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 8, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
		new GenericObject(bgTank3Distance * 9, canvas.height - 595, bgTankWidth, bgTankHeight, tank3Image),
	];

	//this variable will track the players change in canvas x-position from its original position
	scrollOffset = 0;
}

//this function loops every millisec
function animate() {
	window.requestAnimationFrame(animate); // this is a JavaScript function that caues code to repeat over n over

	//fill canvas with the color white
	c.fillStyle = 'white';
	c.fillRect(0, 0, canvas.width, canvas.height);

	//draw the bg and hills
	stage1backgrounds.forEach((background) => {
		background.draw();
	});

	//draw tank1 tanks
	stage1decor.forEach((item) => {
		item.draw();
	});

	//upadate the player spite frame number and crop position, then draws the sprite onto the screen, then updates its positon value
	player.update();



	//draw the support beams
	supportBeams.forEach((beam) => {
		beam.draw();
	});

	/*************** action states ************/
	//punching
	if (actionKeys.space.pressed == true) {
		player.action.punch = true;
	}
	//biting
	else if (actionKeys.b.pressed == true) {
		player.action.bite = true;
	}
	//swiping
	else if (actionKeys.s.pressed == true) {
		player.action.swipe = true;
	}

	/************** direction states ************/
	if (player.doingSomething == false) {
		//right
		if (keys.right.pressed == true && keys.left.pressed == false && keys.up.pressed == false && keys.down.pressed == false) {
			direction.right = true;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;
			// console.log('right pressed');

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//left
		else if (keys.right.pressed == false && keys.left.pressed == true && keys.up.pressed == false && keys.down.pressed == false) {
			direction.right = false;
			direction.left = true;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;
			// console.log('left pressed');

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//up
		else if (keys.right.pressed == false && keys.left.pressed == false && keys.up.pressed == true && keys.down.pressed == false) {
			direction.right = false;
			direction.left = false;
			direction.up = true;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;
			// console.log('up pressed');

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//down
		else if (keys.right.pressed == false && keys.left.pressed == false && keys.up.pressed == false && keys.down.pressed == true) {
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = true;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;
			// console.log('down pressed');

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//up right
		else if (keys.right.pressed == true && keys.left.pressed == false && keys.up.pressed == true && keys.down.pressed == false) {
			// console.log('up right pressed');
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = true;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//down right
		else if (keys.right.pressed == true && keys.left.pressed == false && keys.up.pressed == false && keys.down.pressed == true) {
			// console.log('down right pressed');
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = true;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = false;

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//up left
		else if (keys.right.pressed == false && keys.left.pressed == true && keys.up.pressed == true && keys.down.pressed == false) {
			// console.log('up left pressed');
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = true;
			direction.downLeft = false;
			direction.stop = false;

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//down left
		else if (keys.right.pressed == false && keys.left.pressed == true && keys.up.pressed == false && keys.down.pressed == true) {
			// console.log('down left pressed');
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = true;
			direction.stop = false;

			if (player.step.one == false) {
				player.step.one = true;
				player.sound.woodStep.play();
			}
		}
		//nothing pressed
		else if (keys.right.pressed == false && keys.left.pressed == false && keys.up.pressed == false && keys.down.pressed == false) {
			// console.log('Nothing pressed');
			direction.right = false;
			direction.left = false;
			direction.up = false;
			direction.down = false;
			direction.upRight = false;
			direction.downRight = false;
			direction.upLeft = false;
			direction.downLeft = false;
			direction.stop = true;

			player.step.one == false;
		}
	}
	/*************lateral movement and platform scrolling **************/
	// if the right arrow key is pressed and the player x-position is less than 400 px, make the player x-velocity (change in position) +5
	// otherwise if the left key is pressed and the player x-position is greater than 100 px, make the player x-velocity (change in position) -5
	// otherwise...
	//don't move the player
	//if the right key is pressed, subtract 5 from the platform x-position value
	//if the left key is pressed, add 5 to the platform x-position value
	if (player.doingSomething == false) {
		if (direction.right == true && player.position.x < 100) {
			player.velocity.x = player.speed;
		} else if ((direction.upRight == true || direction.downRight == true) && player.position.x < 100) {
			player.velocity.x = player.speed / 2;
		} else if ((direction.left == true && player.position.x > 0) || (direction.left == true && scrollOffset == 0 && player.position.x > -380)) {
			player.velocity.x = -player.speed;
		} else if (
			((direction.upLeft == true || direction.downLeft == true) && player.position.x > 0) ||
			((direction.upLeft == true || direction.downLeft == true) && scrollOffset == 0 && player.position.x > -380)
		) {
			player.velocity.x = -player.speed / 2;
		} else if (
			direction.right == false &&
			direction.upRight == false &&
			direction.downRight == false &&
			direction.left == false &&
			direction.upLeft == false &&
			direction.downLeft == false
		) {
			player.velocity.x = 0;
		} else {
			player.velocity.x = 0;
			if (direction.right == true) {
				scrollOffset += player.speed;
				platforms.forEach((platform) => {
					platform.position.x -= player.speed;
				});
				supportBeams.forEach((beam) => {
					beam.position.x -= player.speed;
				});
				stage1decor.forEach((item) => {
					item.position.x -= player.speed * 0.66;
				});
				stage1backgrounds.forEach((background) => {
					background.position.x -= player.speed * 0.66; // move the background hills a little slower than everything else
				});
			} else if (direction.upRight == true || direction.downRight == true) {
				scrollOffset += player.speed / 2;
				stage1decor.forEach((item) => {
					item.position.x -= (player.speed * 0.66) / 2;
				});
				platforms.forEach((platform) => {
					platform.position.x -= player.speed / 2;
				});
				supportBeams.forEach((beam) => {
					beam.position.x -= player.speed / 2;
				});
				stage1backgrounds.forEach((background) => {
					background.position.x -= (player.speed * 0.66) / 2; // move the background hills a little slower than everything else
				});
			} else if (direction.left == true && scrollOffset > 0) {
				scrollOffset -= player.speed;
				stage1decor.forEach((item) => {
					item.position.x += player.speed * 0.66;
				});
				platforms.forEach((platform) => {
					platform.position.x += player.speed;
				});
				supportBeams.forEach((beam) => {
					beam.position.x += player.speed;
				});

				stage1backgrounds.forEach((background) => {
					background.position.x += player.speed * 0.66; // move the background hills a little slower than everything else
				});
			} else if ((direction.upLeft == true || direction.downLeft == true) && scrollOffset > 0) {
				scrollOffset -= player.speed / 2;
				stage1decor.forEach((item) => {
					item.position.x += (player.speed * 0.66) / 2;
				});
				platforms.forEach((platform) => {
					platform.position.x += player.speed / 2;
				});
				supportBeams.forEach((beam) => {
					beam.position.x += player.speed / 2;
				});
				stage1backgrounds.forEach((background) => {
					background.position.x += (player.speed * 0.66) / 2; // move the background hills a little slower than everything else
				});
			}
		}
	}
	/***********Vertical movement **************/

	// console.log('player y position', player.position.y);
	if (player.doingSomething == false) {
		if (direction.up == true && player.position.y >= canvas.height - 480) {
			player.velocity.y = -player.speed;

			// console.log('go up. Player position :', player.position);
		} else if ((direction.upRight == true || direction.upLeft == true) && player.position.y >= canvas.height - 480) {
			player.velocity.y = -player.speed / 2;

			// console.log('go angled up. Player position :', player.position);
		} else if (direction.down == true && player.position.y + player.height - 290 <= canvas.height) {
			player.velocity.y = player.speed;
			// console.log('go down. Player position :', player.position);
		} else if ((direction.downRight == true || direction.downLeft == true) && player.position.y + player.height - 290 <= canvas.height) {
			player.velocity.y = player.speed / 2;
			// console.log('go angled down. Player position :', player.position);
		} else if (
			direction.up == false &&
			direction.upRight == false &&
			direction.upLeft == false &&
			direction.down == false &&
			direction.downRight == false &&
			direction.downLeft == false
		) {
			player.velocity.y = 0;
		} else {
			player.velocity.y = 0;
		}
	}
	//win scenario
	if ((scrollOffset > platformImage.width * 5 + 400 - 2, 470)) {
		//console.log('you win');
	}

	//lose scenario
	if (player.position.y > canvas.height) {
		// console.log('you lose');
		init(); // reset player stats
	}
	//console.log('scroll offset', scrollOffset);

	/**********detect platform collision from top*********/
	//check to see if:
	//the player above the platform by seeing if the player y anchor value plus its height value is less than the platform anchor point value
	//the player's next change in position (velocity) is below the top of the platform by seeing if the player's y anchor value plus its height value plus its next change in position is greater than the anchor position of the platform
	//there is platform to the right of the player by seeing if the player's x anchor value plus its width value is greater than x anchor value of the platform
	//and there is platform to the left of the player by seeing if the player's x anchor value is less than the platforms x anchor value plus its width
	// platforms.forEach((platform) => {
	// 	if (
	// 		player.position.y + player.height <= platform.position.y &&
	// 		player.position.y + player.height + player.velocity.y >= platform.position.y &&
	// 		player.position.x + player.width >= platform.position.x &&
	// 		player.position.x <= platform.position.x + platform.width
	// 	) {
	// 		player.velocity.y = 0;
	// 		player.position.y = platform.position.y - player.height;
	// 	}

	/**********detect platform collision from bottom*********/
	/*	//check to see if:
		//the player below the platform by seeing if the player y anchor value is greater than the platform anchor point value plus its height
		//the player's next change in position (velocity) is above the bottom of the platform by seeing if the player's y anchor value plus its next change in position is less than the platform y-anchor position + its height
		//there is platform to the right of the player by seeing if the player's x anchor value plus its width value is greater than x anchor value of the platform
		//and there is platform to the left of the player by seeing if the player's x anchor value is less than the platforms x anchor value plus its width
		if (
			player.position.y >= platform.position.y + platform.height &&
			player.position.y + player.velocity.y <= platform.position.y + platform.height &&
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
		) {
			player.velocity.y = 0;
			player.position.y = platform.position.y + platform.height;
		}*/

	// });

	//sprite switching conditional. Updates frame number and sprite images based on button key states
	// console.log(direction);
	// console.log(lastDirection);
	// console.log(direction == lastDirection);
	// console.log('json equal: ', JSON.stringify(direction) === JSON.stringify(lastDirection), ' objects equal :', direction == lastDirection);
	if (JSON.stringify(direction) !== JSON.stringify(lastDirection) && player.doingSomething == false) {
		lastDirection = JSON.stringify(direction);
		// if (player.step.one == false) {
		// 	player.step.one = true;
		// 	player.sound.woodStep.play();
		// }
		if (
			(direction.up == true || direction.down == true || direction.right == true || direction.upRight == true || direction.downRight == true) &&
			lastKey == 'right' &&
			player.currentSprite != player.sprites.run.right
		) {
			player.frames = 0;
			player.spriteTimer = 0;
			player.currentSprite = player.sprites.run.right;
			player.lastDirection = 'right';
			player.currentCropWidth = player.sprites.run.cropWidth;
			player.width = player.sprites.run.width;
		} else if (
			(direction.up == true || direction.down == true || direction.left == true || direction.upLeft == true || direction.downLeft == true) &&
			lastKey == 'left' &&
			player.currentSprite != player.sprites.run.left
		) {
			player.frames = 0;
			player.spriteTimer = 0;
			player.currentSprite = player.sprites.run.left;
			player.lastDirection = 'left';
			player.currentCropWidth = player.sprites.run.cropWidth;
			player.width = player.sprites.run.width;
		} else if (direction.stop == true && lastKey == 'left' && player.currentSprite != player.sprites.stand.left) {
			player.frames = 0;
			player.spriteTimer = 0;
			player.currentSprite = player.sprites.stand.left;
			player.currentCropWidth = player.sprites.stand.cropWidth;
			player.width = player.sprites.stand.width;
		} else if (direction.stop == true && lastKey == 'right' && player.currentSprite != player.sprites.stand.right) {
			player.frames = 0;
			player.spriteTimer = 0;
			player.currentSprite = player.sprites.stand.right;
			player.currentCropWidth = player.sprites.stand.cropWidth;
			player.width = player.sprites.stand.width;
		}
	}

	if (player.doingSomething == false) {
		if (player.action.punch == true) {
			player.doingSomething = true;

			player.sound.punch.play();
			player.sound.myVoice.play();

			if (lastKey == 'right') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.punch.right;
				player.currentCropWidth = player.sprites.punch.cropWidth;
				player.width = player.sprites.punch.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			} else if (lastKey == 'left') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.punch.left;
				player.currentCropWidth = player.sprites.punch.cropWidth;
				player.width = player.sprites.punch.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			}
		} else if (player.action.bite == true) {
			player.doingSomething = true;

			player.sound.bite.play();
			player.sound.dragon.play();

			if (lastKey == 'right') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.bite.right;
				player.currentCropWidth = player.sprites.bite.cropWidth;
				player.width = player.sprites.bite.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			} else if (lastKey == 'left') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.bite.left;
				player.currentCropWidth = player.sprites.bite.cropWidth;
				player.width = player.sprites.bite.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			}
		} else if (player.action.swipe == true) {
			player.doingSomething = true;

			player.sound.swipe.play();
			player.sound.wetFart.play();

			if (lastKey == 'right') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.swipe.right;
				player.currentCropWidth = player.sprites.swipe.cropWidth;
				player.width = player.sprites.swipe.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			} else if (lastKey == 'left') {
				player.frames = 0;
				player.spriteTimer = 0;
				player.currentSprite = player.sprites.swipe.left;
				player.currentCropWidth = player.sprites.swipe.cropWidth;
				player.width = player.sprites.swipe.width;
				player.velocity.y = 0;
				player.velocity.x = 0;
			}
		}
	}
}

// add event listeners for the keys. specify as a string what event is getting called
window.addEventListener('keydown', (event) => {
	console.log(event);
	switch (event.key) {
		case 'ArrowUp':
			//console.log('up');
			if (player.startAnimation == false && player.doingSomething == false) {
				keys.up.pressed = true;
			}
			break;

		case 'ArrowDown':
			// console.log('down');
			if (player.startAnimation == false && player.doingSomething == false) {
				keys.down.pressed = true;
			}
			break;

		case 'ArrowLeft':
			// console.log('left');
			if (player.startAnimation == false && player.doingSomething == false) {
				keys.left.pressed = true;
				lastKey = 'left';
			}
			break;

		case 'ArrowRight':
			// console.log('right');
			if (player.startAnimation == false && player.doingSomething == false) {
				keys.right.pressed = true;
				lastKey = 'right';
			}
			break;

		case ' ':
			if (player.startAnimation == false && player.doingSomething == false) {
				actionKeys.space.pressed = true;
			}
			break;

		case 'b':
			// console.log('b');
			if (player.startAnimation == false && player.doingSomething == false) {
				actionKeys.b.pressed = true;
			}
			break;

		case 's':
			// console.log('s');
			if (player.startAnimation == false && player.doingSomething == false) {
				actionKeys.s.pressed = true;
			}
			break;
	}
	// console.log(keys.right.pressed);
});

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'ArrowUp':
			// console.log('up');
			keys.up.pressed = false;
			break;

		case 'ArrowDown':
			// console.log('duck');
			keys.down.pressed = false;

			break;

		case 'ArrowLeft':
			// console.log('left');
			keys.left.pressed = false;
			break;

		case 'ArrowRight':
			// console.log('right');
			keys.right.pressed = false;
			break;

		case ' ':
			console.log('space');
			actionKeys.space.pressed = false;
			break;

		case 'b':
			console.log('space');
			actionKeys.b.pressed = false;
			break;

		case 's':
			console.log('space');
			actionKeys.s.pressed = false;
			break;
	}
	// console.log(keys.right.pressed);
});



// function calcPics() {
// 	let start = {
// 		pics: 20,
// 		width: 900 * 20 + 900 / 2,
// 		name: 'start',
// 	};

// 	let idle = {
// 		pics: 13,
// 		width: 900 * 13 + 900 / 2,
// 		name: 'idle',
// 	};

// 	let bite = {
// 		pics: 8,
// 		width: 900 * 8 + 900 / 2,
// 		name: 'bite',
// 	};

// 	let swipe = {
// 		pics: 7,
// 		width: 900 * 7 + 900 / 2,
// 		name: 'swipe',
// 	};

// 	let punch = {
// 		pics: 3,
// 		width: 900 * 3 + 900 / 2,
// 		name: 'punch',
// 	};

// 	let special = {
// 		pics: 18,
// 		width: 800 * 18 + 900 / 2,
// 		name: 'special',
// 	};

// 	let crawl = {
// 		pics: 9,
// 		width: 900 * 9 + 900 / 2,
// 		name: 'crawl',
// 	};

// 	let walk = {
// 		pics: 10,
// 		width: 900 * 10 + 900 / 2,
// 		name: 'walk',
// 	};

// 	let currentSelection = swipe;

// 	let pics = currentSelection.pics;
// 	console.log('');
// 	console.log('');
// 	console.log('sprite sheet dimensions for: ', currentSelection.pics, ' ', currentSelection.name, ' pics.');
// 	console.log('width: ', currentSelection.width);
// 	console.log('height: 200');

// 	// calc left foot at center of a 900 image
// 	if (currentSelection == walk) {
// 		for (let i = 0; i < pics; i++) {
// 			let booty = 900 * i + 900 / 2 + 40;
// 			console.log('Image ', i + 1, 'booty: ', booty);
// 		}
// 	} else if (currentSelection == bite) {
// 		for (let i = 0; i < pics; i++) {
// 			let leftSideFootFacingRight = 900 * i + 900 / 2;
// 			console.log('Image ', i + 1, 'outside of left foot when facing right: ', leftSideFootFacingRight);
// 		}
// 		console.log('--------------');
// 		for (let i = 0; i < pics; i++) {
// 			let rightSideFootFacingleft = 900 * i + 900 / 2 + 104;
// 			console.log('Image ', i + 1, 'outside of right foot when facing left: ', rightSideFootFacingleft);
// 		}
// 	} else {
// 		for (let i = 0; i < pics; i++) {
// 			let leftSideFoot = 900 * i + 900 / 2;
// 			console.log('Image ', i + 1, 'Outside of left side foot: ', leftSideFoot);
// 		}
// 	}
// }

// calcPics();
