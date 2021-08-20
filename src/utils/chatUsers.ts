
interface User {
  id: number,
  email: string,
  room: string
}

let users: Array<User> = [];

export const addUser = (id: number, email: string, room: string) => {
  const user: User = {
    id,
    email,
    room,
  };

  users.push(user);
};

export const removeUser = (id: number) => {
  users = users.filter((user: any) => user.id !== id);
};

export const getCurrentUser = (id) => {
  return users.find((user: any) => user.id === id);
};

export const getRoomUsers = (room) => {
  return users.filter((user: any) => user.room === room);
};
