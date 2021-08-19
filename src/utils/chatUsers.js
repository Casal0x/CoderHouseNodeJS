let users = [];

export const addUser = (id, email, room) => {
  const user = {
    id,
    email,
    room,
  };

  users.push(user);
};

export const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
};

export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};
