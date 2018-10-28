Web-app-development assignment 1
=================================

## node.js backend for a card game


## Table of Contents

- [models](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#models)
- [routes](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#routes)
- [things-to-remember](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#things-to-remember)
- [set-up](https://github.com/Whats-In-My-Vape/Web-App-Assign-1#set-up)

models
---------
- [ ] **Cards** - Basic array for cards not sure to put this into the mongo database or not.
- [ ] **Lobbies** - Simple schema for lobby layout.
- [ ] **Player** - Basic mongoose schema to get base information on the player/user. with an array of starting cards. 
                   Also not sure if this will be how I want it too.
- [ ] **Roulette Options** - Again a schema for the data, this time for cards to only be unlocked via roulette.





routes
---------
- [ ] **Bot** - Eventually a bot player for practice.
- [ ] **Deck** - Gets the cards and shuffles.
- [ ] **Game** - Soon to be the core code for the game.
- [ ] **Game Lobbies** - Shows all game lobbies and lets the user create a new one if none available.
- [ ] **Player** - Used for showing all players and will be used for a leader-board in the future.
- [ ] **Randomize** - Just a function used but the deck route.
- [ ] **Roulette** - This will be the roulette.


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




set-up
--------


