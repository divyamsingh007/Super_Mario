var player, playerAnime;
var bg, bgImg, invisibleGround, edges, coin, coinImg, coinGroup, obstacle, obsImg, obsGroup, gameOver, overImg;
var jumpSound, coinSound, treeSound, dieSound;
var score = 0, life = 20;
var gameState = 'play';

function preload(){
  playerAnime = loadImage('player.gif');
  bgImg = loadImage('bg.jpg');
  coinImg = loadImage('coin.gif');
  obsImg = loadImage('obstacle.gif');
  overImg = loadImage('game-over.gif');
  
  jumpSound = loadSound('jump-small.wav');
  coinSound = loadSound('coin-sound.wav');
  treeSound = loadSound('tree-sound.wav');
  dieSound = loadSound('die-sound.wav');
}

function setup() {
  createCanvas(600,400);
  
  edges = createEdgeSprites();
  
  bg = createSprite(300,120,300,300);
  bg.addImage(bgImg);
  bg.scale = 0.45;
  
  player = createSprite(50,300,60,60);
  player.addImage(playerAnime);
  player.scale = 0.6;
  // player.debug = true;
  player.setCollider('rectangle',0,0,110,190)
  
  invisibleGround = createSprite(300,372,600,30);
  invisibleGround.visible = false;
  
  gameOver = createSprite(310,180,50,50);
  gameOver.addImage(overImg);
  
  coinGroup = new Group();
  obsGroup = new Group();
  
  
}

function draw() {
  background('white');
  drawSprites();
  
  fill('orange');
  stroke(25);
  textSize(20);
  text('Score : ' + score,490,25);
  
  fill('red');
  stroke(25);
  textSize(20);
  text('Life : ' + life,10,25);
  
  player.collide(invisibleGround);
  player.collide(edges);
  
  if(gameState === 'play'){
    
      player.velocityY = player.velocityY + 1;
      gameOver.visible = false;
      bg.velocityX = -5;

    
      if(bg.x === 50){
          bg.x = 550;
        }
    
      if(keyDown('space') && player.y >= 220){
          player.velocityY = -15;
          jumpSound.play();
        }
      if(keyDown('right')){
          player.x = player.x + 5;
        }
      if(keyDown('left')){
          player.x = player.x - 5;
        }
    
      if(player.isTouching(coinGroup)){
          coinGroup.destroyEach();
          coinSound.play();
          score = score + 5;
        }
    
      if(player.isTouching(obsGroup)){
          obsGroup.destroyEach();
          treeSound.play();
          life = life - 5;
        }
      if(life === 0){
        gameState = 'end';
        dieSound.play();
      }
      
      reCoin();
      reObstacle();
    
     }else
  if(gameState === 'end'){
        bg.velocityX = 0;
    
        coinGroup.destroyEach();
        obsGroup.destroyEach();
        // player.destroy();
    
        gameOver.visible = true;
        
        fill('red');
        stroke(25);
        textSize(20);
        text('Press Enter to Restart',225,240);  
    
        if(keyDown('enter')){
            gameState = 'play';
            life = 20;
            score = 0;
            player.x = 50;
            player.y = 300;
           }
     }
    
}

function reCoin(){
  if(frameCount%110 === 0){
    coin = createSprite(580,Math.round(random(50,200)),50,50);
    coin.velocityX = -5;
    coin.addImage(coinImg);
    coin.scale = 0.12;
    lifetime = 200;
    // coin.debug = true;
    coin.setCollider('circle',0,0,150);
    coinGroup.add(coin);
  }
}

function reObstacle(){
  if(frameCount%120 === 0){
    obstacle = createSprite(580,300,50,50);
    obstacle.velocityX = -9;
    obstacle.addImage(obsImg);
    obstacle.scale = 0.25;
    obstacle.lifetime = 200;
    // obstacle.debug = true;
    obstacle.setCollider('rectangle',0,0,obstacle.width,350)
    obsGroup.add(obstacle);
  }
}