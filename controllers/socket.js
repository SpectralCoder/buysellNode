// // const http = require('http');
// // const express = require('express');
// // const server = require('http').createServer();
// // const io = require('socket.io')(server);
// //
// //
// //
// // io.on('connect', (socket) => {
// //     socket.on('notification', (product) => {
// //         console.log(product)
// //
// //
// //     });
// //
// // });
//
// const socketio = require('socket.io');
//
// function startSocket(server) {
//     console.log("SS1")
//     const io = socketio(server);
//
//     io.on('connection', (socket) => {
//         console.log("On connect")
//         socket.on('notification', function(product){
//             console.log("Notification")
//             console.log(product)
//         });
//
//         socket.on('sendMessage', (message, callback) => {
//             console.log("Hello2")
//             // const user = getUser(socket.id);
//             //
//             // io.to(user.room)
//             //     .emit('message', { user: user.name, text: message });
//             //
//             // callback();
//         });
//
//         socket.on('disconnect', () => {
//             console.log("HELLO3")
//             // const user = removeUser(socket.id);
//             //
//             // if(user) {
//             //   io.to(user.room)
//             //       .emit('message', { user: 'Admin', text: `${user.name} has left.` });
//             //   io.to(user.room)
//             //       .emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//             // }
//         })
//     });
//     console.log("SS2")
// }
//
// module.exports = {
//     startSocket
// }
//
// console.log("Socket file called")
//
//
