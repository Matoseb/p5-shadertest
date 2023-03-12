// this is a port of "recursive noise experiment" by ompuco
// https://www.shadertoy.com/view/wllGzr

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;

const vec3 keyColor = vec3(0.39);

// void main() {
//     vec2 uv = gl_FragCoord.xy / iResolution.xy;
//     uv.y = 1.0 - uv.y;

//     vec3 colorDelta = texture2D(iChannel0, uv).rgb - keyColor.rgb;

//     float factor = length(colorDelta);

//     uv += (factor * colorDelta.rb) / 8.0;
//     gl_FragColor = texture2D(iChannel1, uv, factor * 1.5);
// }
#define t(j) texture2D( iChannel0, j ).xy

void main() {
    vec2 p = gl_FragCoord.xy / iResolution.xy;
    p.y = 1.0 - p.y;

    gl_FragColor = texture2D(iChannel1, p - (t(p) - t(iResolution)) * .1);
}