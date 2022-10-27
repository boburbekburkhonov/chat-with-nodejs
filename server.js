import express from 'express'
import path from 'path'
import { Server } from 'socket.io'

const PORT = process.env.PORT || 9090

const app = express();
app.use(express.static(path.join(process.cwd(), 'public')))

const server = app.listen(PORT, console.log(PORT))

const io = new Server(server)

io.on('connection', socket => {
  socket.on('user-joined', name => {
    socket.broadcast.emit('new-user-joined', name)
  })

  socket.on('new-message', msg => {
    socket.broadcast.emit('new-user-message', msg)
  })

  socket.on('user-typing', name => {
    socket.broadcast.emit('typing', name)
  })
})