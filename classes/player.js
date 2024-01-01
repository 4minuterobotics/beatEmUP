import spriteRunRight from '../img/spriteRunRight.png';
import spriteRunLeft from '../img/spriteRunLeft.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteStandRight from '../img/spriteStandRight.png';

//these variables store the image objects
let playerStandLeftImage = createImage(spriteStandLeft);
let playerStandRightImage = createImage(spriteStandRight);
let playerRunLeftImage = createImage(spriteRunLeft);
let playerRunRightImage = createImage(spriteRunRight);

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 1; //"9"

/*****Player class ******/
class Player {
	constructor() {
		//the player properties
		this.position = {
			x: 100,
			y: 400,
		};
		this.velocity = {
			//"1"
			x: 0,
			y: 0,
		};
		this.speed = 5;
		this.width = 66;
		this.height = 150;
		this.image = playerStandRightImage;
		this.frames = 0;
		this.sprites = {
			stand: {
				right: createImage(spriteStandRight),
				left: playerStandLeftImage,

				cropWidth: 177,
				width: 66,
			},
			run: {
				right: createImage(spriteRunRight),
				left: playerRunLeftImage,

				cropWidth: 341,
				width: 127.875,
			},
		};
		this.currentSprite = this.sprites.stand.right;
		this.currentCropWidth = 177;
	}

	//the player methods
	draw() {
		/*Starter Rectangle*/
		// c.fillStyle = 'red';
		// c.fillRect(this.position.x, this.position.y, this.width, this.height);

		/* Sprite sheet*/
		//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

		c.drawImage(
			this.currentSprite, // sprite image
			this.currentCropWidth * this.frames, //sub rectangele x-position  (starts at 0 and increaes by the width of each animation)
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
		if (this.frames > 59 && (this.currentSprite == this.sprites.stand.right || this.currentSprite == this.sprites.stand.left)) {
			// reset the frames value to zero once the value for frames equals the number of sprites for that animation
			this.frames = 0;
		} else if (this.frames > 29 && (this.currentSprite == this.sprites.run.right || this.currentSprite == this.sprites.run.left)) {
			this.frames = 0;
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

export default Player;
