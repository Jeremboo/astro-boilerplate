attribute vec2 uv;
attribute vec3 position;
// attribute vec3 normal;

attribute vec3 _offset;
attribute float _scale;
attribute float _rotation;
attribute float _opacity;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float time;

// varying vec3 vNormal;
varying float vOpacity;

mat4 scale(float x, float y, float z){
    return mat4(
        vec4(x,   0.0, 0.0, 0.0),
        vec4(0.0, y,   0.0, 0.0),
        vec4(0.0, 0.0, z,   0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}

mat4 rotate(float rot){
    return mat4(
        vec4(cos(rot), -sin(rot), 0.0, 0.0),
        vec4(sin(rot), cos(rot), 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );
}


void main() {
    // vNormal = normalize(normalMatrix * normal);
    vOpacity = _opacity;

    mat4 rotationMatrix = rotate(_rotation);

    float scaleDiff = _scale * sin(_scale * 100. + time);
    mat4 scaleMatrix = scale(scaleDiff, scaleDiff, scaleDiff);

    vec3 transformed = (rotationMatrix * scaleMatrix * vec4(position, 1.0)).xyz;
    transformed += _offset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}