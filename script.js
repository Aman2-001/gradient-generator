document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('autoVideo');
    
    // Function to unmute and play video
    function unmuteAndPlay() {
        video.muted = false;
        video.volume = 1.0; // Set to maximum volume
        
        // Try to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video started successfully and is unmuted
                console.log('Video is playing and unmuted');
            }).catch(error => {
                // Auto-play was prevented, we need user interaction
                console.log('Autoplay prevented, waiting for user interaction');
                
                // Add event listeners for user interaction
                document.addEventListener('click', handleUserInteraction, { once: true });
                document.addEventListener('keydown', handleUserInteraction, { once: true });
                document.addEventListener('touchstart', handleUserInteraction, { once: true });
            });
        }
    }
    
    // Handle user interaction to enable unmuted playback
    function handleUserInteraction() {
        video.muted = false;
        video.volume = 1.0;
        video.play();
        console.log('Video unmuted after user interaction');
    }
    
    // Ensure video stays unmuted
    video.addEventListener('volumechange', function() {
        if (video.muted) {
            video.muted = false;
        }
        if (video.volume === 0) {
            video.volume = 1.0;
        }
    });
    
    // Handle page visibility change (when user comes back to tab)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            video.muted = false;
            video.volume = 1.0;
            if (video.paused) {
                video.play();
            }
        }
    });
    
    // Initial attempt to unmute and play
    unmuteAndPlay();
    
    // Force unmute on window focus
    window.addEventListener('focus', function() {
        video.muted = false;
        video.volume = 1.0;
    });
    
    // Prevent right-click context menu on video
    video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Prevent video controls from appearing on double-click
    video.addEventListener('dblclick', function(e) {
        e.preventDefault();
    });
});