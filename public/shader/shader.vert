#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

// Always include this to get the position of the pixel and map the shader correctly onto the shape

void main() {

    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 
    gl_Position = positionVec4;
}