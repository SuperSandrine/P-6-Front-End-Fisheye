// ---------------------- Video Controls ----------------------//
// grab references to buttons and video

export function videoControls () {
  const playPauseBtn = document.querySelector('.playpause')
  const stopBtn = document.querySelector('.stop')
  const rwdBtn = document.querySelector('.rwd')
  const fwdBtn = document.querySelector('.fwd')
  const timeLabel = document.querySelector('.time')

  const animateVideo = document.querySelector('#animateVideo')
  const player = animateVideo
  //  console.log(player.attributes)
  // Remove the native controls from all players

  player.removeAttribute('controls')
  player.setAttribute('loop', true)

  // Define constructor for player controls object

  playPauseBtn.onclick = function () {
    if (player.paused) {
      player.play()
      playPauseBtn.textContent = 'Pause'
    } else {
      player.pause()
      playPauseBtn.textContent = 'Play'
    }
  }

  stopBtn.onclick = function () {
    player.pause()
    player.currentTime = 0
    playPauseBtn.textContent = 'Play'
  }

  rwdBtn.onclick = function () {
    player.currentTime -= 5
  }

  fwdBtn.onclick = function () {
    player.currentTime += 5
    //    if (player.currentTime >= player.duration || player.paused) {
  //    player.pause()
    //  player.currentTime = 0
    // playPauseBtn.textContent = 'Play'
    // }
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
