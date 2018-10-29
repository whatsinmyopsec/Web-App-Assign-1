const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const lobbies = require('./routes/gamelobbies');
const deck = require('./routes/deck');
const players = require('./routes/player');
const roulette = require('./routes/roulette');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//My custom routes
app.get('/lobbies', lobbies.findAll);
app.get('/lobbies/votes', lobbies.findTotalVotes);
app.get('/lobbies/:id', lobbies.findOne);

app.get('/cards', deck.findAll);
app.get('/cards/:id', deck.findOne);

app.get('/player', players.findAll);
//app.get('/player/:lives', players.findTotalLives);
app.get('/player/:id', players.findOne);
app.get('/players/count', players.getPlayersCount);

app.get('/roulette', roulette.testfunction);


app.post('/lobbies', lobbies.addLobby);

app.post('/roulette', roulette.additems);

app.post('/players', players.addPlayer);


app.put('/lobbies/:id/vote', lobbies.incrementUpvotes);

app.put('/players/:id/lives', players.decrementLives);


app.delete('/lobbies/:id', lobbies.deleteLobby);

app.delete('/players/:id', players.deletePlayer);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
