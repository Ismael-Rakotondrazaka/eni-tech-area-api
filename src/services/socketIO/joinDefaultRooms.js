import { User } from "../../models/index.js";

const joinDefaultRooms = async (socketIO, socket) => {
  const authUserId = socket.request.payload.user.id;

  const authUser = await User.findByPk(authUserId);

  socket.join(authUser.channelId);
};

export { joinDefaultRooms };
