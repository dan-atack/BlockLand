// All Functions and elements related to server-side operations live here.
// Update: All functions are now toggleable by the constants file's DEV_MODE variable:

// Section 1: Links to HTML elements in signin page:

// To login as existing user:
const existingUsername = document.getElementById('existing-username');
const existingUserPW = document.getElementById('existing-user-password');
// Text fields will get text if password doesn't match, or if username isn't in the server:
const existingUserRetry = document.getElementById('existing-user-retry');

// To create a new account:
const newUsername = document.getElementById('new-username');
const newPassword = document.getElementById('new-password');
const newPasswordConf = document.getElementById('new-password-conf');
// Text field will get text if passwords don't match:
const newUserRetry = document.getElementById('new-user-retry');

// Server test 1: Get the server to say 'hello':

const dataTest1 = () => {
  if (DEV_MODE) {
    fetch('/game')
      .then((res) => {
        return res.json();
      })
      .then((text) => console.log(text));
  }
};

// Server Test 2: Have the Server send the time:

const dataTest2 = () => {
  if (DEV_MODE) {
    fetch('/time')
      .then((res) => {
        return res.json();
      })
      .then((time) => console.log(time));
  }
};

// Server Test 3: Send the server the time and recieve an acknowledgement echo:

const sendWorldData = (progressReport) => {
  if (DEV_MODE) {
    let timeStamp = new Date();
    timeStamp = `${timeStamp.getHours()}:${timeStamp.getMinutes()}:${timeStamp.getSeconds()}`;
    let data = {
      time: timeStamp,
      progressReport: progressReport,
    };
    fetch('/post-world', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reply) => console.log(reply));
  }
};

// Server Function 4: Check if user is logged in:

// If user is not logged in, redirect to the login page.
const checkUserStatus = () => {
  if (DEV_MODE) {
    fetch('/userid')
      .then((res) => {
        return res.json();
      })
      .then((userId) => {
        if (userId == null) {
          window.location.href = '/signin.html';
        } else {
          CURRENT_USER = userId;
        }
      });
  }
};

// Server Function 5: Login as existing user:
// Send username and password to server; if server recognizes both it will send back a success message;
// else it responds with an error message saying what was wrong (either the name not in DB, or wrong password):
const signinAsUser = (event) => {
  event.preventDefault();
  if (DEV_MODE) {
    const userData = {
      username: existingUsername.value,
      password: existingUserPW.value,
    };
    fetch('/user-login', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((responseBody) => {
        const { status, error, username, info } = responseBody;
        // if name and password are good (and thus status is success) set CURRENT USER to the name given, and go to the game page:
        if (status == 'success') {
          CURRENT_USER = username;
          window.location.href = '/';
          // if there is a problem with either the name or pw, ask them to try again:
        } else {
          // clear entry fields from previous attempt BASED ON error type:
          if (error == 403) {
            existingUserPW.value = '';
          } else {
            existingUsername.value = '';
            existingUserPW.value = '';
          }
          existingUserRetry.innerText = `Error type ${error}: ${info}`;
        }
      });
  }
};

// Server Function 6: Sign up with new username (and make a password). Function validates password on frontend,
// and server validates whether the name is original and lets you proceed to the game if so:

const createNewUser = (event) => {
  // don't let the submit button take you somewhere else:
  event.preventDefault();
  if (DEV_MODE) {
    // if the password/confirmation password match, then send the new user's data to the server:
    if (newPassword.value === newPasswordConf.value) {
      const userData = {
        username: newUsername.value,
        password: newPassword.value,
      };
      fetch('/create-user', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((responseBody) => {
          const { status, error, username, info } = responseBody;
          // if your name is original to the database, then you are the current user and you can play:
          if (status == 'success') {
            CURRENT_USER = username;
            window.location.href = '/';
            // otherwise we'll tell you that name is taken and clear all the fields so you can try again:
          } else {
            newUsername.value = '';
            newPassword.value = '';
            newPasswordConf.value = '';
            newUserRetry.innerText = info;
          }
        });
      // if the password/confirmation password DO NOT match, ask the user to try again:
    } else {
      newUserRetry.innerText = 'Please make sure your password is consistent.';
    }
  }
};

// Server Function 7: Logout:

const handleLogout = () => {
  fetch('/logout')
    .then((res) => {
      return res.json();
    })
    .then((msg) => {
      if (msg == 'logout successful.') {
        CURRENT_USER = '';
        window.location.href = '/signin.html';
      }
    });
};
