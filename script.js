const config = {
  // chose html5-canvas vs CanvasGL. 
  type: Phaser.AUTO,
  //width - height
  width: 800,
  height: 600,
  //background color of canvas
  backgroundColor: 0x225566, //hexadecimal color code

  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH, // rescale with aspect ratio
    mode: Phaser.Scale.FIT,               // vertical and horizontal center
  },
  // default scene objects properties
  scene: {
    preload: onPreload,     // load assetes before start the game
    create: onCreate,       // create game object before start game
    update: onUpdate,       // update game object in game
  },
  // physics engine
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 20 }, // set gravity
      debug: true,              // debug mode
    },
  },
};

let game = new Phaser.Game(config);
let player, pc, ball, keyboard;
let scene, pointer;
let playerPoint = 0, pcPoint = 0;
let playerTabela, pcTabela;
const friction = 5;



function onPreload() {
  this.load.image('ball', './assets/images/pingpong/ball.png');
  this.load.image('ground', './assets/images/pingpong/ground.png');
  this.load.image('pc', './assets/images/pingpong/pc.png');
  this.load.image('player', './assets/images/pingpong/player.png');


}

function onCreate() {
  scene = this;
  // add background to scene
  this.add.image(0, 0, 'ground').setOrigin(0, 0);


  player = this.physics.add.image(10, 300, 'player').setScale(1, 3);
  player.setCollideWorldBounds();
  player.setGravity(0, -20);
  player.setImmovable(true);
  player.customVariable = { name: 'player' };

  pc = this.physics.add.image(790, 300, 'pc').setScale(1, 3);
  pc.setCollideWorldBounds();
  pc.setGravity(0, -20);
  pc.setImmovable(true);
  pc.customVariable = { name: 'pc' };

  ball = this.physics.add.image(400, 0, 'ball');
  // ball.setCollideWorldBounds();
  ball.setBounce(1);
  ball.setGravity(0, -20);
  ball.setVelocityY(300);
  ball.setVelocityX(80);

  ball.setCollideWorldBounds(true);
  ball.body.onWorldBounds = true;
  this.physics.world.on('worldbounds', onWorldBounds);


  playerTabela = this.add.text(100, 20, playerPoint);
  pcTabela = this.add.text(700, 20, pcPoint);




  this.physics.add.collider(ball, player, collisionHandler);
  this.physics.add.collider(ball, pc, collisionHandler);
  keyboard = this.input.keyboard.createCursorKeys();

}

function collisionHandler(obj1, obj2) {
  console.log('obj1 :', obj1);
  console.log('obj2 :', obj2);
  const ball = obj1;
  const pcOrPlayer = obj2;

  if (pcOrPlayer.customVariable.name === "player") {
    pcOrPlayer.setPosition(10, pcOrPlayer.y);
  }

}


function onUpdate() {
  handleKeyboard();
  applyFriction();
  pcMove();
}

function handleKeyboard() {
  if (keyboard.up.isDown) {
    player.setVelocityY(-200);
  } else if (keyboard.down.isDown) {
    player.setVelocityY(200);
  }
}

function onWorldBounds(body, blockedUp, blockedDown, blockedLeft, blockedRight) {
  console.log("sınırr....");
  console.log(' blockedUp, blockedDown, blockedLeft, blockedRight :',
    blockedUp, blockedDown, blockedLeft, blockedRight);

  if (blockedLeft) {
    pcPoint++;
    sendBall();
    updatePoints();

  } else if (blockedRight) {
    playerPoint++;
    sendBall();
    updatePoints();

  }
}

function updatePoints() {
  playerTabela.setText(playerPoint);
  pcTabela.setText(pcPoint);
}

function sendBall() {
  ball.setPosition(400, 0);
}


function pcMove() {
  // deactiveate move if ball in other side of area
  if (ball.x < 400) return;
  const x = ball.x;
  const y = ball.y;

  const hata = 10;

  if (ball.y > pc.y) {
    pc.setVelocityY(200);
  } else {
    pc.setVelocityY(-200);
  }


}

function applyFriction() {
  //Apply Friction
  player.body.velocity.y -= Math.sign(player.body.velocity.y) * friction;
  pc.body.velocity.y -= Math.sign(pc.body.velocity.y) * friction;
}
