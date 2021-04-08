class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);

    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array cars
      var index = 0;

      // x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index+1

          x+=200;
          
          y=displayHeight-allPlayers[plr].distance

          // assigning x and y position to each car in the cars array
          cars[index-1].x=x;
          cars[index-1].y=y;

          // giving different colours to the active player in the browser 
          if(index === player.index){
            cars[index-1].shapeColor = "red"
            // game camera allows us to change how and from where we are viewing the game
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y;
          }

      }
    }
    // to increase the players distance if up arrow key is pressed
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
