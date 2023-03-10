import { joinDefaultRooms } from "./joinDefaultRooms.js";
import { joinRoomHandler } from "./joinRoomHandler.js";
import { leaveRoomHandler } from "./leaveRoomHandler.js";

//* we add the socketIO as the first argument to avoid circular dependencies
const connectHandler = (socketIO, socket) => {
  socket.emit("hello", {
    message: "World!",
  });

  joinDefaultRooms(socketIO, socket);

  socket.on("conversations:join", (payload) => {
    joinRoomHandler(socketIO, socket, payload);
  });

  socket.on("conversations:leave", (payload) => {
    leaveRoomHandler(socketIO, socket, payload);
  });
};

export { connectHandler };
