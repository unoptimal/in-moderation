function loadScene(sceneName) {
    fetch(`scenes/${sceneName}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('sceneContainer').innerHTML = html;

            // Remove old scene script if it exists
            const oldScript = document.getElementById('sceneScript');
            if (oldScript) {
                oldScript.remove();
            }

            const script = document.createElement('script');
            script.id = 'sceneScript';
            script.src = `js/${sceneName}.js`;
            document.body.appendChild(script);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');

    startBtn.addEventListener('click', function() {
        // Hide the introduction
        document.getElementById('introduction').style.display = 'none';

        // Show the scene container
        document.getElementById('sceneContainer').style.display = 'block';

        // Load the first scene
        loadScene('scene1');
    });
});
