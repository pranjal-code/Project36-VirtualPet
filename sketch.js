var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here

var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add The Food");
  addFood.position(820,95);
  addFood.mousePressed(addFoods);

  feedFood = createButton("Feed The Dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);


}

function draw() {
  background("#ff9e9e");
  foodObj.display();

  //write code to read fedtime value from the database 

  fedTime = database.ref('FeedTime');
  fedTime.on("value",(data)=>
  {
    lastFed = data.val();
  })

 
  //write code to display text lastFed time here

  textSize(16);

  fill("black");

  //imp
  if(lastFed>=12)
    {
      text("Last Feed : "+lastFed%12+"PM",350,30);
      //12 Pm
    }else if(lastFed == 0)

  {
    text("Last Feed : 12 AM",350,30);
      //12 AM
  }
  else
    {

      text("Last Feed : "+lastFed+"AM",350,30);
    }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  if(foodS > 0)
  {

    foodS--;
    database.ref('/').update({
    Food : foodS
    })

  }

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
