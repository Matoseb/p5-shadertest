import './style.css'
import 'p5'
import Shader from './shader'

let shader
let normal, canvas, vid, cave

window.setup = () => {
  canvas = createCanvas(windowWidth, windowHeight);

  shader = new Shader({ canvas, vertex: '/shader/shader.vert', fragment: '/shader/shader.frag' })

  vid = document.createElement('video')
  vid.src = '/displace.mp4'
  vid.loop = true
  vid.muted = true
  vid.autoplay = true
  vid.play()

  cave = loadImage('/cave.png')
  normal = loadImage('/normal3.png')
  noStroke()
}

window.draw = () => {
  push()
  background('rgb(128,128,255)')


  drawingContext.globalCompositeOperation = 'overlay'

  drawingContext.globalAlpha = 0.03
  drawingContext.drawImage(vid, 0, 0)
  drawingContext.globalAlpha = 0.3

  imageMode(CENTER)

  translate(mouseX, mouseY)
  scale(0.5)
  image(normal, 0, 0)

  drawingContext.globalCompositeOperation = 'source-over'
  drawingContext.globalAlpha = 1



  pop()

  shader.update({
    iChannel1: cave,
    iChannel0: canvas
  })

  shader.enable(!mouseIsPressed)
}

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight)
}