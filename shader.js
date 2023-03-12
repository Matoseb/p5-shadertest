export default class Shader {
    constructor({ canvas, vertex, fragment, enabled = true }) {
        this.canvas = canvas;
        this.vertex = vertex;
        this.fragment = fragment;
        this.shader = loadShader(this.vertex, this.fragment);
        this.result = createGraphics(canvas.width, canvas.height, WEBGL);

        this.canvas.elt.parentElement.appendChild(this.result.elt);
        if(enabled) this.enable(true)
    }

    showPreview() {
        this.canvas.show()
        this.canvas.elt.classList.add('preview')
    }

    enable(isEnabled) {

        if (isEnabled) {
            this.canvas.hide();
            this.result.show()

        } else {
            this.canvas.show();
            this.result.hide()
        }
    }

    update(options) {

        this.result.resizeCanvas(this.canvas.width, this.canvas.height)

        this.result.shader(this.shader);

        const { width, height } = this.canvas.elt;
        const uniforms = {
            iResolution: [width, height],
            iTime: millis() / 1000,
            iMouse: [mouseX, mouseY],
            iChannel0: this.canvas,
            iChannel1: this.canvas,
            ...options
        }

        Object.entries(uniforms).forEach(([key, value]) => {
            this.shader.setUniform(key, value)
        })

        this.result.rect(0, 0, this.canvas.width, this.canvas.height);
    }
}