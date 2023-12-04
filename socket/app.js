require("dotenv").config();

const io = require("socket.io")(process.env.PORT || 3001, {
  cors: {
    origin: [
      "https://react-helmet.ibrcloud.com",
      "http://localhost:5173",
      "https://interview-prep-red.vercel.app",
    ],
  },
});

let users = [];
let rooms = new Map(); // Store room information

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  // Register user and emit the list of online users
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      content,
    });
  });
  // Handle user disconnection and update the list of online users
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });

  //video call
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
  socket.on("user:hangup", ({ to }) => {
    io.to(to).emit("user:hangup");
  });
});
