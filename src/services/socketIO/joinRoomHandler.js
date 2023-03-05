const joinRoomHandler = (socketIO, socket, payload) => {
  const { channelId } = payload;

  if (!socket.rooms.has(channelId)) {
    socket.join(channelId);
  }
};

export { joinRoomHandler };
