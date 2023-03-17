import './style.css'
import 'p5'
import Shader from './shader'

let shader
let normal, canvas, distort
let turbulenceVid
let cave

window.setup = () => {
  canvas = createCanvas(windowWidth, windowHeight);

  distort = createGraphics(windowWidth, windowHeight);
  distort.imageMode(CENTER)


  shader = new Shader({ canvas, vertex: './shader/shader.vert', fragment: './shader/shader.frag' })

  turbulenceVid = document.createElement('video')
  turbulenceVid.src = './displace.mp4'
  turbulenceVid.loop = true
  turbulenceVid.muted = true
  turbulenceVid.autoplay = true
  turbulenceVid.setAttribute('playsinline', true)
  turbulenceVid.play()

  cave = loadImage('./cave.png')
  normal = loadImage('./normal3.png')
  noStroke()
}

window.draw = () => {
  drawDistort()

  push()
  image(cave, 0, 0, width, height, 0, 0, cave.width, cave.height, COVER)
  pop()

  shader.update({
    iChannel1: canvas,
    iChannel0: distort
  })

  shader.enable(!mouseIsPressed)
}

function drawDistort() {
  const drawingContext = distort.drawingContext
  drawingContext.save()

  drawingContext.globalCompositeOperation = 'overlay'
  drawingContext.globalAlpha = 0.03
  drawingContext.drawImage(turbulenceVid, 0, 0)
  drawingContext.globalCompositeOperation = 'source-over'
  drawingContext.globalAlpha = 1
  drawingContext.restore()

  distort.push()
  drawingContext.globalAlpha = 0.3
  distort.background('rgb(128,128,255)')
  distort.translate(mouseX, mouseY)
  distort.scale(0.5)
  distort.image(normal, 0, 0)
  distort.pop()

}

window.windowResized = () => {
  resizeCanvas(windowWidth, windowHeight)
  distort.resizeCanvas(width, height)
}