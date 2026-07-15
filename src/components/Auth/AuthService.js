import Parse from 'parse';

// Register a new user with Parse
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set('username', newUser.email);
  user.set('firstName', newUser.firstName);
  user.set('lastName', newUser.lastName);
  user.set('password', newUser.password);
  user.set('email', newUser.email);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// Login an existing user with Parse
export const loginUser = (user) => {
  return Parse.User.logIn(user.email, user.password)
    .then((loggedInUser) => {
      return loggedInUser;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// Logout the current user
export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      return true;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// Check if a user is currently authenticated
export const checkUser = () => {
  const currentUser = Parse.User.current();
  return currentUser !== null && currentUser !== undefined;
};