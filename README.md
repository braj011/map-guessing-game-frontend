# map-guessing-game-frontend (LDN Knowledge)


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
- The user may restart the game by clicking anywhere on the main container or pressing any key.
- The player's final score, rank in the high scores table and surrounding scores are shown at the end of the game
- On **easy** difficulty the names of train stations, schools, churches and businesses are labelled, and a fairly large area is shown (google zoom level 15). The score starts at 1,000 and 100 points are deducated for an incorrect guess
- On **medium** difficulty the labels are removed. Zoom is the same as easy. Score starts at 1,500 with 150 points deducted for an incorrect guess
- On **hard** difficulty the labels are removed. A smaller area is provided at a higher zoom (google 17). Score starts at 2,000 with 200 points deducted for an incorrect guess.




## MORE DETAILS COMING SOON!
