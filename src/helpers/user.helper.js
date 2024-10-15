const getUser = () => {
  const user = localStorage?.getItem("user");
  return JSON.parse(user);
};

const getFullName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  } else if (firstName) {
    return firstName;
  } else if (lastName) {
    return lastName;
  }

  return "";
};

export { getUser, getFullName };
