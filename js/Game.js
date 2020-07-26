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
    car1.addImage("crash",car1img);

    car2 = createSprite(300,200);
    car2.addImage("hi",car2img);

    car3 = createSprite(500,200);
    car3.addImage("bye",car3img);
    

    car4 = createSprite(700,200);
    car4.addImage("test",car4img);


   

    cars = [car1,car2,car3,car4];

  }

  play(){


    form.hide();
    textSize(30);
    text("Game Start", displayWidth/2, 100)
    Player.getPlayerInfo();

    player.getRank();

    if(allPlayers !== undefined){
      background(groundimg);
      image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 180;
      var y;

      for(var plr in allPlayers){
        x += 200;
        y = displayHeight - allPlayers[plr].distance;

        index += 1;

        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          
          fill("orange");
          strokeWeight(7);
          stroke(255);

          ellipse(x,y-100,70,70);
           
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          
      }
    }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }
    if(player.distance > 3650){
      gameState = 2;
      player.rank += 1;
      Player.updateRank(player.rank);

      stroke("red");
      strokeWeight(2);

      textSize(30);
      fill("Green");
      text("Game Over",camera.position.x,camera.position.y);

      textSize(35);
      fill("yellow");
      text("Your Rank: " + player.rank,camera.position.x,camera.position.y-200);
    }
   
    drawSprites();
   // console.log(player.distance);
  }
  end(){



   /* console.log("Game End");
    console.log(player.rank); */
  }
}
