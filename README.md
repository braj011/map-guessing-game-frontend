# LDN Knowledge Frontend (map-guessing-game)


## test your knowledge of London... improve it... or just guess wildly for fun!

Game live at http://ldn-knowledge.herokuapp.com/ - the backend will take a few seconds to wake up on first play. It is playable once the high scores are displayed.

Javascript frontend, with a Ruby on Rails backend here: https://github.com/braj011/map-guessing-game-backend

![alt text](https://github.com/CiaranMn/map-guessing-game-backend/raw/master/demo.gif)

## How the game works

- A game starts once a player has entered a name and either selects a difficulty, or hits enter (which begins an easy game)
- A static map centered around a random London postcode is displayed to the user, initially obscured by 9 squares
- As soon as the game begins, one square is removed, with the remainder gradually fading over the course of the game
- A player guesses the location of the map from the 10 options to the right - the options being London constituencies
- Points are deducted for incorrect guesses
- The game ends when a correct guess is made or the timer runs out (at which point the player's score will be 1 if no incorrect guesses have been made)
- The user may restart the game by clicking anywhere on the main container or pressing any key
- The player's final score, rank in the high scores table and surrounding scores are shown at the end of the game
- On **easy** difficulty the names of train stations, schools, churches and businesses are labelled, and a fairly large area is shown (google zoom level 15). The score starts at 1,000 and 100 points are deducated for an incorrect guess
- On **medium** difficulty the labels are removed. Zoom is the same as easy. Score starts at 1,500 with 150 points deducted for an incorrect guess
- On **hard** difficulty the labels are removed. A smaller area is provided at a higher zoom (google 17). Score starts at 2,000 with 200 points deducted for an incorrect guess

## Frontend structure

Game is written in plain JavaScript, but is a candidate for refactoring into React as a lot of code hides, displays, and updates elements.

**index.js** in the root directory is a basic Express server to serve the /public directory (for deployment on Heroku at the link above)

**public/src/index.js** handles user input to start the game, and hiding and showing elements depending on whether or not a game is in progress

**public/src/squares.js** handles gradually fading the squares covering the map

**public/src/API.js** interacts with the backend (other than getting the map image which is just a case of setting an img src and is done in game.js)

**public/src/game.js** handles the rest of the game logic, including:

- making a request to the backend for the map image and ten options for the player to guess from, including the winner (the identity of which is very slightly obsfucated by being represented by the last 5 digits of the map image filename - dividing this figure by a random seed provided by the frontend on game request will reveal the id of the winning guess)
- reducing the timer and score over the course of 30s, and deducting points for incorrect guesses
- stopping the game when the timer runs out or the user guesses correctly
- posting the user score to the backend, receiving the response of the user's position in the scores table with surrounding entries, and passing it to the renderScore function in index.js to display on the high scores table

Styling is in **public/style.css** with some basic breakpoints in public/small-style.css to make the game playable on mobile.

N.B. CORS is set on the backend to only allow requests from the frontend deployment at ldn-knowledge.herokuapp.com and so the game will not work elsewhere without a copy of the backend (or without spoofing the origin of requests).

