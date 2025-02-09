precision highp float;

// varying vec3 vNormal;
varying float vOpacity;

uniform sampler2D tBars;

void main() {
    // vec3 normal = normalize(vNormal);
    // float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
    // gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
    // gl_FragColor.a = vOpacity;
    gl_FragColor = vec4(1, 1, 1, vOpacity);
}