// ---------------------- Video Controls ----------------------//
// MDN source from : https://developer.mozilla.org/en-US/docs/Learn/Accessibility/Multimedia#accessible_audio_and_video_controls
// and https://github.com/mdn/learning-area/tree/main/accessibility/multimedia

export function videoControls () {
  // DOM
  const playPauseBtn = document.querySelector('.playpause')
  const stopBtn = document.querySelector('.stop')
  const rwdBtn = document.querySelector('.rwd')
  const fwdBtn = document.querySelector('.fwd')
  const timeLabel = document.querySelector('.time')

  const animateVideo = document.querySelector('#animateVideo')
  const player = animateVideo

  // Remove the native controls from all players
  player.removeAttribute('controls')
  player.setAttribute('loop', true)

  // Define actions for player controls object

  playPauseBtn.onclick = function () {
    if (player.paused) {
      player.play()
      playPauseBtn.innerHTML = '<i class="fas fa-pause"> </i> Pause'
    } else {
      player.pause()
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play'
    }
  }

  stopBtn.onclick = function () {
    player.pause()
    player.currentTime = 0
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play'
  }

  rwdBtn.onclick = function () {
    player.currentTime -= 5
  }

  fwdBtn.onclick = function () {
    player.currentTime += 5
  }

  player.ontimeupdate = function () {
    const minutes = Math.floor(player.currentTime / 60)
    const seconds = Math.floor(player.currentTime - minutes * 60)
    let minuteValue
    let secondValue
    if (minutes < 10) {
      minuteValue = '0' + minutes
    } else {
      minuteValue = minutes
    }
    if (seconds < 10) {
      secondValue = '0' + seconds
    } else {
      secondValue = seconds
    }
    const mediaTime = minuteValue + ':' + secondValue
    timeLabel.textContent = mediaTime
  }
}
