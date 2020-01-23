'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** 
 * @type {typeof import('@adonisjs/framework/src/Route/Manager')} 
*/

const Route = use('Route')

Route.post('/register', 'AuthController.register').middleware('guest')
Route.post('/login', 'AuthController.login').middleware('guest')

Route.get('/get-rooms', 'RoomController.getAll').middleware('auth');
Route.get('/get-all-rooms', 'RoomController.getMyRooms').middleware('auth');
Route.get('/get-room-info', 'RoomController.getRoomById').middleware('auth');

Route.post('/update-room', 'RoomController.updateRoomStatus').middleware('auth');
Route.post('/save-room', 'RoomController.saveRoom').middleware('auth');
Route.put('/update-status', 'UserController.updateStatus').middleware('auth');

Route
.group(() => {
    Route.post('save-message', 'ChatController.createMessage')
    // Route.post('', 'ChatController.create')
    // Route.get(':id', 'ChatController.select')
}).prefix('/chat')

Route.resource('*', 'HomeController');
// Route.post('login', 'UserController.login').middleware('guest');
// Route.get('users/:id', 'UserController.show').middleware('auth');
// Route.on('/welcome').render('welcome');
