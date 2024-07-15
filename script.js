document.addEventListener('DOMContentLoaded', function() {
    // Retrieve all audio elements and create Audio objects
    let a = document.getElementsByClassName('audio');
    let element = [];
    for (let i = 0; i < a.length; i++) {
        element.push(new Audio(a[i].href));
    }

    // Select playlist items and playbar related elements
    let playlist = document.querySelector('.songs.image');
    let play = playlist.querySelectorAll(':scope > div');
    let playbar = document.querySelector('.playbar');
    let image = document.querySelectorAll('.photos');
    let currentsong = null; // Initialize currentsong to null
    let currentIndex = -1;

    // Function to play a song by index
    function playSong(index) {
        if (currentsong) {
            currentsong.pause(); // Pause current song if playing
        }
        currentsong = element[index];
        currentIndex = index;
        currentsong.currentTime = 0; // Restart song from beginning
        currentsong.play();
        playbar.style.display = 'flex'; // Display the playbar
        document.querySelector('.playbar-1 img').src = image[index].src; // Update playbar image

        // Update time display
        updateCurrentTime();
    }

    // Event listeners for clicking on songs in the playlist
    for (let i = 0; i < play.length; i++) {
        play[i].addEventListener('click', function() {
            playSong(i);
        });
    }

    // Event listener for previous button
    document.getElementById('previous').addEventListener('click', function() {
        if (currentIndex > 0) {
            playSong(currentIndex - 1);
        }
    });

    // Event listener for next button
    document.getElementById('next').addEventListener('click', function() {
        if (currentIndex < element.length - 1) {
            playSong(currentIndex + 1);
        }
    });
    let pause=document.getElementById('pause');
    let playbutton=document.getElementById('play')
    document.querySelector('.pause').addEventListener('click',function(){
    if(currentsong.paused){
        currentsong.play();
        document.querySelector('.pause').src=pause.src;
    }
    else {
        currentsong.pause();
        document.querySelector('.pause').src=playbutton.src;
        
    
    }
    })
    // Function to update the current time display
    function updateCurrentTime() {
        if (currentsong) {
            currentsong.addEventListener('timeupdate', function() {
                document.querySelector('.time').innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`;
                document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
            });
        } else {
            console.error('Currentsong element is null or undefined.');
        }
    }
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    // Function to format seconds into mm:ss
    function secondsToMinutesSeconds(seconds) {
        let minutes = Math.floor(seconds / 60);
        let remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }
    document.querySelector('.remove').addEventListener('click', function() {
        playbar.style.display = 'none'; // Hide the playbar
        if (currentsong) {
            currentsong.pause(); // Pause current song if playing
        }
    });
});


