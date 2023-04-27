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
      return 'scene2';
  }

  if(currentScene === 'scene2'){
    return 'scene3'
  }

  if(currentScene === 'scene3'){
    return 'scene4'
  }

  if(currentScene === 'scene4'){
    return 'scene5'
  }

  if(currentScene === 'scene5'){
    if (userChoices.account) {
      return 'scene6a';
    } else {
    return 'scene6'
    }
  }

  if(currentScene === 'scene6' || currentScene === 'scene6a'){
    return 'scene7'
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

function attachOtherButtonListeners() {

  const accountButton = document.querySelector('.account');
  accountButton.addEventListener('click', function () {
    userChoices.account = true;
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
        attachOtherButtonListeners();
      });
    } else {
      console.log('No more scenes available');
    }
  });
}

const userChoices = {
  User1: false,
  User2: false,
  account: false,
  highValue: false
};

loadScene('scene0', function () {
  attachNextButtonListener('scene0');
});
