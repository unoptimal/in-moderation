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
    if (userChoices.User1 && userChoices.User2) {
      return 'scene2c';
    } else if (userChoices.User1) {
      return 'scene2a';
    } else if (userChoices.User2) {
      return 'scene2b';
    } else {
      return 'scene2';
    }
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
  // Add event listeners for the other buttons
  const stricterPostingButton = document.querySelector('.strict-posting');
  stricterPostingButton.addEventListener('click', function () {
    userChoices.stricterPosting++;
    stricterPostingButton.disabled = true;
  });

  const registrationButton = document.querySelector('.registration');
  registrationButton.addEventListener('click', function () {
    userChoices.registration = true;
    registrationButton.disabled = true;
  });

  const highValueButton = document.querySelector('.high-value');
  highValueButton.addEventListener('click', function () {
    userChoices.highValue = true;
    highValueButton.disabled = true;
  });
}

function attachNextButtonListener(currentScene) {
  document.getElementById('next-button').addEventListener('click', function () {
    const nextScene = getNextScene(currentScene);

    if (nextScene) {
      loadScene(nextScene, function () {
        attachNextButtonListener(nextScene);
        attachPermaBanButtonListeners();
        attachOtherButtonListeners();
      });
    } else {
      console.log('No more scenes available');
      console.log(userChoices);
    }
  });
}

const userChoices = {
  User1: false,
  User2: false,
  stricterPosting: 0,
  registration: false,
  highValue: false
};

loadScene('scene0', function () {
  attachNextButtonListener('scene0');
});
