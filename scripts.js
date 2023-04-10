document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    const startOverBtn = document.getElementById('startOverBtn');
    const scene1next = document.getElementById('scene1next');

    function showScene(sceneId) {
        const allScenes = document.querySelectorAll('.scene');
        allScenes.forEach(scene => {
            scene.style.display = 'none';
        });

        const sceneToShow = document.getElementById(sceneId);
        sceneToShow.style.display = 'block';
    }

    function startIntroduction() {
        startBtn.addEventListener('click', function() {
            showScene('scene1');
            startScene1();
        });
    }

    function startScene1() {
        scene1next.addEventListener('click', function() {
            showScene('scene2');
            startScene2();
        });

        // Set up post interactivity event listeners
        const postTitles = document.querySelectorAll('.post-title');

        postTitles.forEach(title => {
            title.addEventListener('click', function() {
                const post = title.parentElement;
                const postDetails = post.querySelector('.post-details');
                const comments = post.querySelector('.comments');

                postDetails.classList.toggle('hidden');
                comments.classList.toggle('hidden');
            });
        });
    }

    function startScene2() {
        // Set up scene 2 interactions and animations
    }

    startOverBtn.addEventListener('click', function() {
        showScene('introduction');
        startIntroduction();
    });

    // Start the game by showing the introduction scene
    startIntroduction();
});
