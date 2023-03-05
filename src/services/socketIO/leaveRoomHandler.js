const leaveRoomHandler = (socketIO, socket, payload) => {
  const { channelId } = payload;

  if (socket.rooms.has(channelId)) {
    socket.leave(channelId);
  }
};

export { leaveRoomHandler };
