const phoneNumber = "123-123-123";

function clearDashes(pn) {
  return pn.replace(/-/g, "");
}

const result = clearDashes(phoneNumber);

console.log(result);

function rename(user, newName) {
  const newUser = JSON.parse(JSON.stringify(user));
  newUser.name = newName;
  return newUser;
}

let user1 = { name: "Peter", age: 23 };
const newUser = rename(user1, "John");

console.log(newUser);
console.log(user1.name);
