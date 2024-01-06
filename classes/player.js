import spriteRunRight from '../img/spriteRunRight.png';
import spriteRunLeft from '../img/spriteRunLeft.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteStandRight from '../img/spriteStandRight.png';

import spriteStart from '../img/start-sprite-sheet.png';
import spriteIdleLeft from '../img/idle-left-spritesheet.png';
import spriteIdleRight from '../img/idle-right-spritesheet.png';
import spriteWalkLeft from '../img/walk-left-sprite.png';
import spriteWalkRight from '../img/walk-right-sprite.png';
import spriteSwipeLeft from '../img/swipe-left-spritesheet.png';
import spriteSwipeRight from '../img/swipe-right-spritesheet.png';
import spritePunchLeft from '../img/punch-left-spritesheet.png';
import spritePunchRight from '../img/punch-right-spritesheet.png';
import spriteBiteLeft from '../img/bite-left-spritesheet.png';
import spriteBiteRight from '../img/bite-right-spritesheet.png';

import punchMp3File from '../sounds/punch.mp3';
import biteMp3File from '../sounds/bite.mp3';
import swipeMp3File from '../sounds/swipe-short.mp3';
import dragonMp3File from '../sounds/dragon.mp3';
import wetFartMp3File from '../sounds/wet-fart.mp3';
import woodStepMp3File from '../sounds/wood-step.mp3';
import myVoiceMp3File from '../sounds/my-voice.mp3';
import transformersMp3File from '../sounds/transformers.mp3';

import { Howl, Howler } from 'howler'; // for audio

//these variables store the sound objects

let playerPunchSound = createSound(punchMp3File);
let playerBiteSound = createSound(biteMp3File);
let playerSwipeSound = createSound(swipeMp3File);
let playerDragonSound = createSound(dragonMp3File);
let playerWetFartSound = createSound(wetFartMp3File);
let playerWoodStepSound = createSound(woodStepMp3File);
let playerMyVoiceSound = createSound(myVoiceMp3File);
let playerTransformingSoud = createSound(transformersMp3File);

//these variables store the image objects
let playerStandLeftImage = createImage(spriteStandLeft);
let playerStandRightImage = createImage(spriteStandRight);
let playerRunLeftImage = createImage(spriteRunLeft);
let playerRunRightImage = createImage(spriteRunRight);

let playerStartImage = createImage(spriteStart);
let playerIdleLeftImage = createImage(spriteIdleLeft);
let playerIdleRightImage = createImage(spriteIdleRight);
let playerWalkLeftImage = createImage(spriteWalkLeft);
let playerWalkRightImage = createImage(spriteWalkRight);
let playerSwipeLeftImage = createImage(spriteSwipeLeft);
let playerSwipeRightImage = createImage(spriteSwipeRight);
let playerPunchLeftImage = createImage(spritePunchLeft);
let playerPunchRightImage = createImage(spritePunchRight);
let playerBiteLeftImage = createImage(spriteBiteLeft);
let playerBiteRightImage = createImage(spriteBiteRight);

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 1;

/*****Player class ******/
class Player {
	constructor() {
		//the player properties
		this.position = {
			x: -300,
			y: canvas.height - 400,
		};
		this.velocity = {
			//"1"
			x: 0,
			y: 0,
		};
		this.speed = 5;
		this.width = 900;
		this.height = 150 * 4;
		this.startAnimation = true;
		this.doingSomething = false;
		this.frames = 0;
		this.spriteTimer = 0;
		this.sprites = {
			start: {
				playerStartImage,
			},
			stand: {
				right: playerIdleRightImage,
				left: playerIdleLeftImage,

				cropWidth: 900,
				width: 900,
			},
			run: {
				right: playerWalkRightImage,
				left: playerWalkLeftImage,

				cropWidth: 900,
				width: 900,
			},
			bite: {
				right: playerBiteRightImage,
				left: playerBiteLeftImage,

				cropWidth: 900,
				width: 900,
			},
			swipe: {
				right: playerSwipeRightImage,
				left: playerSwipeLeftImage,

				cropWidth: 900,
				width: 900,
			},
			punch: {
				right: playerPunchRightImage,
				left: playerPunchLeftImage,

				cropWidth: 900,
				width: 900,
			},
		};
		this.currentSprite = playerStartImage;
		this.lastDirection = 'right';
		this.currentCropWidth = 900;
		this.cropXposition,
			(this.action = {
				punch: false,
				bite: false,
				swipe: false,
			});
		this.sound = {
			punch: playerPunchSound,
			bite: playerBiteSound,
			swipe: playerSwipeSound,
			dragon: playerDragonSound,
			wetFart: playerWetFartSound,
			woodStep: playerWoodStepSound,
			myVoice: playerMyVoiceSound,
			transform: playerTransformingSoud,
		};
		this.playedStaringSound = false;
		this.step = {
			one: false,
			two: false,
		};
	}
	//the player methods
	draw() {
		/*Starter Rectangle*/
		// c.fillStyle = 'red';
		// c.fillRect(this.position.x, this.position.y, this.width, this.height);

		/* Sprite sheet*/
		//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

		c.drawImage(
			// this.currentSprite, // sprite image
			// this.currentCropWidth * this.spriteTimer, //sub rectangele x-position  (starts at 0 and increaes by the width of each animation)
			// 0, // sub rectangle y-position
			// this.currentCropWidth, // sub rectangle width (width of 1 animation)
			// 400, // sub rectangle height
			// this.position.x, // canvas x-position
			// this.position.y, // canvas y-position
			// this.width, // width on canvas
			// this.height // height on canvas
			this.currentSprite, // sprite image
			this.currentCropWidth * this.spriteTimer, //sub rectangele x-position  (starts at 0 and increaes by the width of each animation)
			0, // sub rectangle y-position
			this.currentCropWidth, // sub rectangle width (width of 1 animation)
			400, // sub rectangle height
			this.position.x, // canvas x-position
			this.position.y, // canvas y-position
			this.width, // width on canvas
			this.height // height on canvas
		); //this takes an image, x-value, y-value, width, and height
	}

	update() {
		this.frames++; // incremementing this number by 1 will create a multiplier for the x position of the sprite sheet for animation
		if (this.frames % 6 == 0) {
			this.spriteTimer++;
		}

		//stop the starting animation after 20 frames and reset the frames
		if (this.spriteTimer == 20 && this.startAnimation == true) {
			this.startAnimation = false;
			this.frames = 0;
			this.spriteTimer = 0;
			this.currentSprite = this.sprites.stand.right;
		} else if (this.spriteTimer == 13 && (this.currentSprite == this.sprites.stand.right || this.currentSprite == this.sprites.stand.left)) {
			this.frames = 0;
			this.spriteTimer = 0;
		} else if (
			this.spriteTimer == 10 / 2 &&
			this.step.two == false &&
			(this.currentSprite == this.sprites.run.right || this.currentSprite == this.sprites.run.left)
		) {
			this.step.two = true;
			this.sound.woodStep.play();
		} else if (this.spriteTimer == 10 && (this.currentSprite == this.sprites.run.right || this.currentSprite == this.sprites.run.left)) {
			this.frames = 0;
			this.spriteTimer = 0;

			this.step.one = false;
			this.step.two = false;
		} else if (this.spriteTimer == 3 && (this.currentSprite == this.sprites.punch.right || this.currentSprite == this.sprites.punch.left)) {
			this.frames = 0;
			this.spriteTimer = 0;
			this.doingSomething = false;
			this.action.punch = false;
			if (this.lastDirection == 'left') {
				this.currentSprite = this.sprites.stand.left;
			} else if (this.lastDirection == 'right') {
				this.currentSprite = this.sprites.stand.right;
			}
		} else if (this.spriteTimer == 8 && (this.currentSprite == this.sprites.bite.right || this.currentSprite == this.sprites.bite.left)) {
			this.frames = 0;
			this.spriteTimer = 0;
			this.doingSomething = false;
			this.action.bite = false;
			if (this.lastDirection == 'left') {
				this.currentSprite = this.sprites.stand.left;
				this.currentCropWidth = this.sprites.stand.cropWidth;
				this.width = this.sprites.stand.width;
			} else if (this.lastDirection == 'right') {
				this.currentSprite = this.sprites.stand.right;
				this.currentCropWidth = this.sprites.stand.cropWidth;
				this.width = this.sprites.stand.width;
			}
		} else if (this.spriteTimer == 7 && (this.currentSprite == this.sprites.swipe.right || this.currentSprite == this.sprites.swipe.left)) {
			this.frames = 0;
			this.spriteTimer = 0;
			this.doingSomething = false;
			this.action.swipe = false;
			if (this.lastDirection == 'left') {
				this.currentSprite = this.sprites.stand.left;
			} else if (this.lastDirection == 'right') {
				this.currentSprite = this.sprites.stand.right;
			}
		}

		//"2"
		this.draw();

		/**position update***/
		//update the x and y-position for the next frame to be itself plus the evergrowing value of the velocity due to gravity.
		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;

		//Falling: if the object still has canvas room to fall, increase the value of the changing y-direction (increase the velocity).
		// if (this.position.y + this.height + this.velocity.y <= canvas.height) {
		// 	this.velocity.y += gravity; //"10"
		// } //else {
		// // 	//otherwise, set the change in y position to zero, and set the position to be the height of the canvas minus the height of the object.
		// // 	this.velocity.y = 0;
		// // 	this.position.y = canvas.height - this.height;
		// // }
	}
}

//this function creates and returns the image objects
function createImage(imageSrc) {
	let image = new Image();
	image.src = imageSrc;
	return image;
}

function createSound(audioSrc) {
	let audio = new Howl({ src: [audioSrc] });
	audio.src = audioSrc;
	return audio;
}

export default Player;
