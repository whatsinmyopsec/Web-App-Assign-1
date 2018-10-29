Web-app-development assignment 1
=================================

## node.js backend for a card game


## Table of Contents

- [models](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#models)
- [routes](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#routes)
- [things-to-remember](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#things-to-remember)
- [update-29/10/2018](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#update-29/10/2018)
- [requests](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#requests)
- [heroku](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#heroku)
- [name-studentnumber](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#name-studentnumber)
- [references](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#references)

models
---------
- [x] **Cards** - Basic array for cards not sure to put this into the mongo database or not.
- [x] **Lobbies** - Simple schema for lobby layout.
- [x] **Player** - Basic mongoose schema to get base information on the player/user. with an array of starting cards. 
                   Also not sure if this will be how I want it too.
- [x] **Roulette Options** - Again a schema for the data, this time for cards to only be unlocked via roulette.

routes
---------
- [ ] **Bot** - Eventually a bot player for practice.
- [x] **Deck** - Gets the cards and shuffles.
- [ ] **Game** - Soon to be the core code for the game.
- [x] **Game Lobbies** - Shows all game lobbies and lets the user create a new one if none available.
- [x] **Player** - Used for showing all players and will be used for a leader-board in the future.
- [x] **Randomize** - Just a function used but the deck route.
- [x] **Roulette** - This will be the roulette.

things-to-remember
--------
Hey I just thought of something to make this like 100 times easier.
what if I make a collection of logged in people and then when someone enters a game page I check for how many with 
a limit of 2 when 2 join my script will lock that endpoint.
then I have to make an inventory of some sort like a return like a get request. so the person can see 
what their options are. `how would I do this without the person disconnecting for the game?`
Then I need to make a playable object and the return content must be the player object. 
I still don't know how to do the game logic code.
these end points are going to be disgustingly long.
Where is the .gitignore gone?

update-29/10/2018
---------
Unfortunately it is very hard to make game so no game.
roulette was made part in the project near the end.
persisted with mlab via mongoose for players, lobbies, rouletteoptions.
pushed to heroku too. Also no chat client because I didn't see how that 
would be possible without the frontend.

requests
---------
| gets | posts | puts | deletes |
| --- | --- | --- | --- |
|/lobbies|/lobbies|/lobbies/:id/vote|/lobbies/:id|
|/lobbies/votes|/roulette|/players/:id/lives|/players/:id|
|/lobbies/:id|/players|
|/cards|
|/cards/:id|
|/player|
|/player/:id|
|/players/count|
|/roulette|
|/roulette/random|

heroku
---------
https://webapp20075681.herokuapp.com

name-studentnumber
---------
|name|studentnumber|
| --- | --- |
| Kevin Power | 20075681 |

references
---------
https://ddrohan.github.io/wit-wad-2-2018/

https://github.com/ashok-s-nair/card-shuffle-deal/blob/master/app/carddeck.js




