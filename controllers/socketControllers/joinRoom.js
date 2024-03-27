const joinRoom = (io, socket) => {
  socket.on("rooms", (arg, callback) => {
    const { rooms } = arg;

    rooms.forEach((room) => {
      socket.join(room);
    });

    console.log("Rooms has joinded", rooms);

    callback({ status: "ok" });
  });
};

export default joinRoom;
