import me from './images/me.jpg';
import './App.css';
import { FaGithubSquare, FaLinkedinIn, FaCoffee, FaMailBulk } from 'react-icons/fa';

function App() {
  return (
    <div className="background-fullcover">
        <div className="center">
            <div className="row d-flex flex-wrap align-items-center justify-content-center">
                <div className="col-md-6 col-sm-12">
                    <img src={me} alt="me" className="my_logo"/>
                </div>
                <div className="col-md-6 text-center text-md-left mt-5 mt-md-0" id = "buttons_contain">
                    <h1 className="text-4xl font-bold text-white">Hi, I'm <span className="text-blue-500">Léo ☕</span></h1>
                    <p className="text-2xl text-white">I'm a <span className="text-blue-500">beginner full-stack developer</span> from France</p>
                    <p className="text-2xl text-white">I built this website for fun using <span className="text-blue-500">React</span> and <span className="text-blue-500">Node.js</span></p>
                    <div id="score" className="text-2xl text-white mt-12 hidden">0</div>
                    <canvas id="snakeboard" width="400" height="400" className="mt-5 bg-blue-500 hidden"></canvas>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" id = "contact_button" onClick={() => play_game()}>Wanna reach me out ?</button>
                </div>
                <div className="inline-flex mt-5 items-center justify-center text-center w-full">
                    <button href="https://github.com/LeoBaldachino" onClick={() => window.open("https://github.com/LeoBaldachino", "_blank")}>
                        <FaGithubSquare className="text-white text-5xl m-5"/>
                    </button>
                    <button href="" id = "linkedin_button" onClick={() => window.open("https://www.linkedin.com/in/l%C3%A9o-baldachino-9aa659216/", "_blank")}>
                        <FaLinkedinIn className="text-white text-5xl m-5"/>
                    </button>
                    <button href="" id = "mail_button" onClick={() => alert("I'm sorry, I don't do coffee with strangers 😎")}>
                        <FaCoffee className="text-white text-5xl m-5"/>
                    </button>
                    <button onClick={() => window.open("mailto:leo.baldachino@epitech.eu", "_blank")}>
                        <FaMailBulk className="text-white text-5xl m-5"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;

function create_snake() {
    document.getElementById('yes_button').classList.add('hidden');
    document.getElementById('no_button').classList.add('hidden');
    document.getElementById('snakeboard').classList.remove('hidden');
    document.getElementById('score').classList.remove('hidden');

    const board_border = 'white';
    const board_background = "black";
    const snake_col = 'lightblue';
    const snake_border = 'darkblue';
    
    let snake = [
      {x: 200, y: 200},
      {x: 190, y: 200},
      {x: 180, y: 200},
      {x: 170, y: 200},
      {x: 160, y: 200}
    ]

    let score = 0;
    let changing_direction = false;
    let food_x;
    let food_y;
    let dx = 10;
    let dy = 0;
    
    
    const snakeboard = document.getElementById("snakeboard");
    const snakeboard_ctx = snakeboard.getContext("2d");
    main();

    gen_food();

    document.addEventListener("keydown", change_direction);
    
    function main() {

        if (has_game_ended()) {
            document.getElementById('snakeboard').classList.add('hidden');
            document.getElementById('score').innerHTML = "Your score is " + score + " good job !";
            return;
        }

        changing_direction = false;
        setTimeout(function onTick() {
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        main();
      }, 100)
    }
    
    function clear_board() {
      snakeboard_ctx.fillStyle = board_background;
      snakeboard_ctx.strokestyle = board_border;
      snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
      snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
    }
    
    function drawSnake() {
      snake.forEach(drawSnakePart)
    }

    function drawFood() {
      snakeboard_ctx.fillStyle = 'lightgreen';
      snakeboard_ctx.strokestyle = 'darkgreen';
      snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
      snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
    }
    
    function drawSnakePart(snakePart) {
      snakeboard_ctx.fillStyle = snake_col;
      snakeboard_ctx.strokestyle = snake_border;
      snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function has_game_ended() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > snakeboard.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > snakeboard.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }

    function random_food(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    function gen_food() {
      food_x = random_food(0, snakeboard.width - 10);
      food_y = random_food(0, snakeboard.height - 10);
      snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
      });
    }

    function change_direction(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
          
      if (changing_direction) return;
      changing_direction = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }

    function move_snake() {
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
      const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
      if (has_eaten_food) {
        score += 10;
        document.getElementById('score').innerHTML = score;
        gen_food();
      } else {
        snake.pop();
      }
    }
}


function play_game() {
    setTimeout(() => {
        let text = "I actually lied, there's already the mail-like button for that ...";
        let i = 0;
        let speed = 25;
        let button = document.getElementById("contact_button");
        button.innerHTML = "";
        let interval = setInterval(() => {
            if (i < text.length) {
                button.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }, 1000);
    setTimeout(() => {
        document.getElementById('contact_button').innerHTML = "";
        let text = "Would you like to play snake instead ?";
        let i = 0;
        let speed = 25;
        let button = document.getElementById("contact_button");
        let interval = setInterval(() => {
            if (i < text.length) {
                button.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }, 5000);
    setTimeout(() => {
        document.getElementById('contact_button').classList.add("hidden");
    }, 10000);
    setTimeout(() => {
        let new_button = document.createElement("button");
        new_button.innerHTML = "Yes !";
        new_button.id = "yes_button";
        new_button.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mr-5";
        document.getElementById("buttons_contain").appendChild(new_button);
        new_button.onclick = () => create_snake();
        let no_button = document.createElement("button");
        no_button.innerHTML = "No";
        no_button.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5";
        no_button.id = "no_button";
        document.getElementById('buttons_contain').appendChild(no_button);
        no_button.onclick = () => {
            document.getElementById('contact_button').classList.remove("hidden");
            document.getElementById('contact_button').innerHTML = "";
            document.getElementById('no_button').classList.add("hidden");
            document.getElementById('yes_button').classList.add("hidden");
            let text = "Aww .. too bad, I was really looking forward to play with you 😢";
            let i = 0;
            let speed = 25;
            let interval = setInterval(() => {
                if (i < text.length) {
                    document.getElementById('contact_button').innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, speed);
        }
    }, 10000);
}