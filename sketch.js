const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var standImg;
var stone,rope,rope2,rope3;
var stone_con,stone_con2,stone_con3;
var starImg , star1 , star2;
var bks , breaking , cut ;

var bg_img;
var food;
var rabbit;

function preload()
{
  bg_img = loadImage('bg.png');
  food = loadImage('ball.png');
  unbreak = loadImage('bottle.png');
  broken = loadImage('Breaking.png');
  standImg = loadImage('stand.png');
  emptystar = loadAnimation('empty.png');
  oneStar = loadAnimation('one_star.png');
  twostar = loadAnimation('stars.png');
  bks = loadSound('bk_sound.mp3');
  breaking = loadSound('Breaking.mp3');
  cut = loadSound('Cutting.mp3');
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bks.play();
  bks.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

   //btn 1(left)
   button = createImg('cut_btn.png');
   button.position(50,80);
   button.size(50,50);
   button.mouseClicked(drop);
 
    //btn 2 (mid)
    button2 = createImg('cut_btn.png');
    button2.position(160,80);
    button2.size(50,50);
    button2.mouseClicked(drop2);
 
   //btn 3(right)
   button3 = createImg('cut_btn.png');
   button3.position(420,80);
   button3.size(50,50);
   button3.mouseClicked(drop3);
  
   rope = new Rope(4,{x:60,y:80});
   rope2 = new Rope(5,{x:180,y:80});
   rope3 = new Rope(7,{x:460,y:80});

   ground = new Ground(300,height,width,20);
   
   stand = createSprite(330,345,20,20);
   stand.scale = 0.3;
   stand.addImage('stand',standImg);

   stand2 = createSprite(150,555,20,20);
   stand2.scale = 0.3;
   stand2.addImage('stand',standImg);

   bottle = createSprite(330,260,20,20);
   bottle.scale = 0.2;

   bottle.addImage('unbreaked',unbreak);
   bottle.addImage('broken',broken );
   bottle.changeImage('unbreaked');

   bottle2 = createSprite(150,470,20,20);
   bottle2.scale = 0.2;

   bottle2.addImage('unbreaked2',unbreak);
   bottle2.addImage('broken2',broken );
   bottle2.changeImage('unbreaked2');

   starDisplay = createSprite(80 , 40 , 30 , 30);
   starDisplay.scale = 0.2;
   starDisplay.addAnimation('empty',emptystar);
   starDisplay.addAnimation('one',oneStar);
   starDisplay.addAnimation('two',twostar);
   starDisplay.changeAnimation('empty');

   //creating stone(metal ball)
   stone = Bodies.circle(250,120,20);
  // Matter.Composite.add(rope.body,stone);
  // Matter.Composite.add(rope2.body,stone);
   Matter.Composite.add(rope3.body,stone);
 
   stone_con = new Link(rope,stone);
   stone_con2 = new Link(rope2,stone);
   stone_con3 = new Link(rope3,stone);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  image(bg_img,width/2,height/2,490,690);

  image(food,stone.position.x,stone.position.y,70,70);
  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);


  drawSprites();
   
  if(collide(stone,bottle,40)===true){
    bottle.changeImage('broken');
    bottle.scale = 0.25;
    breaking.play();
    starDisplay.changeAnimation('one');
  }

  if(collide(stone,bottle2,40)===true){
    bottle2.changeImage('broken2');
    bottle2.scale = 0.25;
    breaking.play();
    starDisplay.changeAnimation('two');
  }
}


function drop()
{
  cut.play();
  rope.break();
  stone_con.dettach();
  stone_con = null; 
}

function drop2()
{
  cut.play();
  rope2.break();
  stone_con2.dettach();
  stone_con2 = null; 
}

function drop3()
{
  cut.play();
  rope3.break();
  stone_con3.dettach();
  stone_con3 = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
