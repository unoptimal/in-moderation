function loadScene(sceneName, callback) {
  fetch(`scenes/${sceneName}.html`)
    .then((response) => response.text())
    .then((html) => {
      const contentContainer = document.getElementById('content-container');
      contentContainer.innerHTML = html;

      if (callback) {
        callback();
      }
    })
    .catch((error) => {
      console.warn('Error fetching partial:', error);
    });
}

function getNextScene(currentScene) {
  const bannedUsersCount = countBannedUsers();

  if (bannedUsersCount > 7 && (currentScene !== 'scene5' && currentScene !== 'scene6')) {
    return 'scene7d';
  }

  if (currentScene === 'scene0') {
    return 'scene1';
  }

  if (currentScene === 'scene1') {
    if (userChoices.accountScene === 'scene1') {
      return 'scene2a';
    }
      return 'scene2';
  }

  if(currentScene === 'scene2'){
    if(userChoices.users[10].banned === true){
      return 'scene3c';
    }
    if (userChoices.accountScene === 'scene2') {
      return 'scene3a';
    }
    return 'scene3'
  }



  if(currentScene === 'scene3'){
    if(((userChoices.users[10].banned === true) & (userChoices.users[11].banned === true)) || (userChoices.users[14].banned === true)){
      return 'scene4c';
    }
    if (userChoices.accountScene === 'scene3') {
      return 'scene4a';
    }
    return 'scene4'
  }

 if(currentScene === 'scene3c'){
  return 'scene4c'
 }

  if(currentScene === 'scene4'){
    if((userChoices.users[10].banned === true) & (userChoices.users[11].banned === true) & (userChoices.users[14].banned === true) & (userChoices.users[15].banned === true) & (userChoices.users[17].banned === true)){
      return 'scene5c';
    }
    if (userChoices.accountScene === 'scene4') {
      return 'scene5b';
    }
    return 'scene5'
  }

  if(currentScene === 'scene4c'){
    return 'scene5c'
   }

  if(currentScene === 'scene5'){
    if (userChoices.accountScene === 'scene5') {
      return 'scene6b';
    } else {
    return 'scene6'
    }
  }

  if(currentScene === 'scene5c'){
    return 'scene6c'
   }

  if(currentScene === 'scene6'){
    return 'scene7'
  }
  
  if(currentScene === 'scene5b'){
    return 'scene6b';
  }

  if(currentScene === 'scene6b'){
    return 'scene7b';
  }

  if(currentScene === 'scene6c'){
    return 'scene7c'
   }

  
  // if they press it early
  if(currentScene === 'scene2a'){
    return 'scene3a';
  }

  if(currentScene === 'scene3a'){
    return 'scene4a';
  }

  if(currentScene === 'scene4a'){
    return 'scene5a';
  }

  if(currentScene === 'scene5a'){
    return 'scene6a';
  }

  if(currentScene === 'scene6a'){
    return 'scene7a'
  }


}

function countBannedUsers() {
  return userChoices.users.filter((user) => user.banned).length;
}

function attachPermaBanButtonListeners() {
  const userNames = document.querySelectorAll('.user-name');

  userNames.forEach((userName) => {
    userName.addEventListener('click', function () {
      const userId = userName.getAttribute('data-user');
      const user = userChoices.users.find((user) => user.id === userId);
      if (user) {
        user.banned = true;
        userName.style.textDecoration = 'line-through'; 
      }
    });
  });
}

function attachOtherButtonListeners(currentScene) {

  const accountButton = document.querySelector('.account');
  accountButton.addEventListener('click', function () {
    userChoices.accountScene = currentScene;
    console.log(userChoices.accountScene)
    accountButton.disabled = true;
  });

}

function attachNextButtonListener(currentScene) {
  const nextButton = document.getElementById('next-button');

  const newNextButton = nextButton.cloneNode(true);
  nextButton.parentNode.replaceChild(newNextButton, nextButton);

  newNextButton.addEventListener('click', function () {
    const nextScene = getNextScene(currentScene);

    if (nextScene) {
      loadScene(nextScene, function () {
        attachNextButtonListener(nextScene);
        attachPermaBanButtonListeners();
        attachOtherButtonListeners(nextScene);
      });
    } else {
      console.log('No more scenes available');
    }
  });
}

const userChoices = {
  users: [
    { id: 'User1', banned: false },
    { id: 'User2', banned: false },
    { id: 'User3', banned: false },
    { id: 'User4', banned: false },
    { id: 'User5', banned: false },
    { id: 'User6', banned: false },
    { id: 'User7', banned: false },
    { id: 'User8', banned: false },
    { id: 'User9', banned: false },
    { id: 'User10', banned: false },
    { id: 'User11', banned: false },
    { id: 'User12', banned: false },
    { id: 'User13', banned: false },
    { id: 'User14', banned: false },
    { id: 'User15', banned: false },
    { id: 'User16', banned: false },
    { id: 'User17', banned: false },
    { id: 'User18', banned: false },
    { id: 'User19', banned: false },
    { id: 'User20', banned: false },
    { id: 'User21', banned: false },
    { id: 'User22', banned: false },
    { id: 'User23', banned: false },
    { id: 'User24', banned: false },
    { id: 'User25', banned: false },
    { id: 'User26', banned: false },
  ],
  accountScene: null,
};

loadScene('scene0', function () {
  attachNextButtonListener('scene0');
});