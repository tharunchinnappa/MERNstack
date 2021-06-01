import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Test",
    email: "test@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Test1",
    email: "test1@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
