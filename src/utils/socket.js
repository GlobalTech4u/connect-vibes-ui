import io from "socket.io-client";

let socket = null;

const initializeSocket = (userId) => {
  let connection;
  try {
    if (userId) {
      connection = io.connect(
        process.env.REACT_APP_BASE_API_URL || "http://localhost:8080",
        { query: `userId=${userId}` }
      );
    }

    socket = connection;
  } catch (error) {
    console.log(error);
  }

  return connection;
};

export { socket };
export default initializeSocket;
