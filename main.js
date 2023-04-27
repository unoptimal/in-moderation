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
    if (userChoices.accountScene === 'scene2') {
      return 'scene3a';
    }
    return 'scene3'
  }



  if(currentScene === 'scene3'){
    if (userChoices.accountScene === 'scene3') {
      return 'scene4a';
    }
    return 'scene4'
  }

 

  if(currentScene === 'scene4'){
    if (userChoices.accountScene === 'scene4') {
      return 'scene5b';
    }
    return 'scene5'
  }

  if(currentScene === 'scene5'){
    if (userChoices.accountScene === 'scene5') {
      return 'scene6b';
    } else {
    return 'scene6'
    }
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

function attachPermaBanButtonListeners() {
  const permaBanButtons = document.querySelectorAll('.perma-ban-btn');

  permaBanButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const user = button.getAttribute('data-user');
      userChoices[user] = true;
      button.disabled = true;
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

  const highValueButton = document.querySelector('.high-value');
  highValueButton.addEventListener('click', function () {
    userChoices.highValue = true;
    highValueButton.disabled = true;
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
  User1: false,
  User2: false,
  accountScene: null,
  highValue: false
};

loadScene('scene0', function () {
  attachNextButtonListener('scene0');
});