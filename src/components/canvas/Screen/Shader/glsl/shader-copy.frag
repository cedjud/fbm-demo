// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// #pragma glslify: random = require(glsl-random);

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 8

// float fbm ( in vec2 _st) {
//     float v = 0.0;
//     float a = 0.5;
//     vec2 shift = vec2(100.0);
//     // Rotate to reduce axial bias
//     mat2 rot = mat2(cos(0.5), sin(0.5),
//                     -sin(0.5), cos(0.50));
//     for (int i = 0; i < NUM_OCTAVES; ++i) {
//         v += a * noise(_st);
//         _st = rot * _st * 2.0 + shift;
//         a *= 0.5;
//     }
//     return v;
// }

float fbm( in vec2 x, in float H )
{    
    float t = 0.0;
    for( int i=0; i<NUM_OCTAVES; i++ )
    {
        float f = pow( 2.0, float(i) );
        float a = pow( f, -H );
        t += a*noise(f*x);
    }
    return t - 1.0;
}

float sdCircle( in vec2 p, in float r ) {
    return length(p + 0.0) - r;
}

void main() {
    // vec2 st = gl_FragCoord.xy / u_resolution.xy * 2.;
    // vec2 st = gl_FragCoord.xy / u_resolution.xy * 2.;
    vec2 st = (.5 - ((gl_FragCoord.xy) / u_resolution.yy)) * 2.0;
    // vec2 st = gl_FragCoord.xy;
    // st.x = st.x + (random(st) * 0.05 * sin(u_time * 0.1));
    // st.y = st.y + (random(st) * 0.025 * sin(u_time * 0.1));
    // st.x = st.x + (random(st) * 0.05);
    // st += st * abs(sin(u_time*0.1)*3.0);

    float a = sdCircle(st, 0.8 + sin(u_time * 1.5) * 0.1);
    float d = sdCircle(st, 0.6 + sin(u_time * 1.2) * 0.2);
    float y = sdCircle(st, 0.4 + sin(u_time * 0.05) * 0.3);
    // float a = sdCircle(st + (u_mouse * 0.5), 0.5 + sin(u_time * 0.2) * 0.01);
    // float d = sdCircle(st + (u_mouse * 0.3), 0.3 + sin(u_time * 0.1) * 0.02);
    // float y = sdCircle(st + (u_mouse * 0.1), 0.1 + sin(u_time * 0.05) * 0.03);

    st *= a < 0.0 ? 2.0 : 1.0;
    st *= d < 0.0 ? 2.0 : 1.0;
    st *= y < 0.0 ? 2.0 : 1.0;
    // st += st * (abs(sin(u_time*0.05))*1.0);

    vec3 color = vec3(0.);
    // vec3 color = vec3(d > 0.0 ? 0.0 : 0.5, y > 0.0 ? 0.5: 0.0,  d > 0.0 ? 0.5 : 1.0 );
    // vec3 color = vec3(st.x, 0.0, 0.0);
    // vec3 color = vec3(length(st - 0.5), 0.0, 0.0);

    vec2 q = vec2(0.);
    // q.x = fbm(st * (cos(u_time * 0.05) * 0.05), 0.2);
    // q.x = fbm(st * (sin(u_time * 0.05) * 0.05), 0.2);
    // q.x = fbm(st * u_time * 0.01, 0.5);
    // q.y = fbm(st * 0.0 * abs(sin(u_time * 0.1)), 0.7);
    // q.x = fbm(st + 0.00 * u_time);
    // q.y = fbm(st + fbm( st + vec2(1.0)) * 10.);

    vec2 r = vec2(0.);
    r.x = fbm(st + q, 0.75);
    r.y = fbm(st + q, 0.75);
    // r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15 * u_time );
    // r.y = fbm( st + 2.0*q + vec2(8.3,2.8)+ 0.126* u_time);

    // float f = fbm(st + fbm(st + r + fbm(st+r)));
    // float f = fbm(st + fbm(st + fbm(st, 0.5), 0.5), 0.5);
    float f = fbm(st + r + (u_time * 0.01), 0.2);

    vec3 color1 = vec3(0.,0.188,0.286);
    vec3 color2 = vec3(0.839,0.157,0.157);
    vec3 color3 = vec3(0.969,0.498,0.);
    vec3 color4 = vec3(0.988,0.749,0.286);

    // Color circles
    color = color4;
    color = a < 0.0 ? color3 : color;
    color = d < 0.0 ? color2 : color;
    color = y < 0.0 ? color1 : color;


    // color = mix(color1, color4, q.x);


    // color = mix(color1, color2, clamp(f, 0.0, 1.0));
    // float ftwo = fbm(st + r + fbm(st + r));

    // color 
    // color = mix(vec3(0.101961,0.619608,0.666667),
    //             vec3(0.666667,0.666667,0.498039),
    //             clamp((f*f)*4.0,0.0,1.0));

    // color = mix(color,
    //             vec3(0,0,0.164706),
    //             clamp(length(q),0.0,1.0));

    // color = mix(color,
    //             vec3(1.,0.6,1),
    //             clamp(length(r.x),0.0,1.0));


    // vec3 altColor = vec3(1.0) - color;

    // gl_FragColor = vec4(color, 1.0);
    gl_FragColor = vec4((f, f, f) * color * vec3(0.4), f);
    // gl_FragColor = vec4(color, 1. - f);
    // gl_FragColor = vec4((f, f, f) * color, f);
    // gl_FragColor = vec4(1., 0., 0., 1.0);
    // gl_FragColor = vec4((ftwo * ftwo, ftwo, ftwo) * altColor, 1.0);
    // gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}
