let users = [];

export function registerUser({ name, email, password, role }) {
  if (users.find(u => u.email === email)) return null;
  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);
  return newUser;
}

export function loginUser({ email, password }) {
  return users.find(u => u.email === email && u.password === password);
}
