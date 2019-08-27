const config = {
  type: Phaser.AUTO,   //chose canvas or webgl automatically.
  width: 800,
  height: 600,
  backgroundColor: 0x225566, //hexadecimal color code

  scale: {
    mode: Phaser.Scale.FIT,      //consider aspect ratio
    // mode: Phaser.Scale.RESIZE,  //do not consider aspect ratio

    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: {
    preload: onPreload,
    create: onCreate,
    update: onUpdate,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 10, // y ekseninde yer çekimi
        x: 0, // x ekseninde yer çekimi
      },
      debug: true,
    },
  }
}

const game = new Phaser.Game(config);
let pikachu;
let platforms;
console.log(game);

function onPreload() {
  this.load.image("pikachu", "./assets/images/pikachu.png");
  this.load.image("background", "./assets/images/background.png");
  this.load.image('ground', './assets/images/platform.png');
}

function onCreate() {
  // this.add.image(400, 300, "background");
  this.add.image(0, 0, "background").setOrigin(0, 0);

  // pikachu = this.add.image(300, 300, "pikachu");
  pikachu = this.physics.add.sprite(300, 300, "pikachu");
  pikachu.setCollideWorldBounds(true);
  // pikachu.body.setGravityX(300);  //nesneye özel yerçekimi

  platforms = this.physics.add.staticGroup();
  platforms.create(600, 500, 'ground').setScale(0.2).refreshBody();
  platforms.create(200, 500, 'ground').setScale(0.2).refreshBody();


  // SCALE
  // bomb.scale = 0.2; // x ve y yi aynı anda ata
  pikachu.scaleX = 0.1;
  pikachu.scaleY = 0.1;
  // pikachu.scaleX = -0.3;  // negatif değer o eksen üzerinde tes çevir
  // pikachu.scaleY = -0.3;

  // pikachu.rotation = Math.PI / 180 * 45;  //saat yönünde 


  //pikachu ve platforms grubunun nesneleri arasındaki çarpışmalar için
  this.physics.add.collider(pikachu, platforms);

  pikachu.setBounce(0.7);

}

function onUpdate() {
  //ROTATION
  // pikachu.rotation += 0.05; // rotate every update
  // pikachu.setRotation(pikachu.rotation + 0.05);

  //TRANSLATION
  // pikachu.x += 5;
  // pikachu.setX(pikachu.x + 5);
  // pikachu.y += 5;

}
