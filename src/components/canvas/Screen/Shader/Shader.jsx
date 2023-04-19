// @ts-nocheck
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { Wireframe } from 'three-stdlib'

const ShaderImpl = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.05, 0.0, 0.025),
    u_time: 0,
    u_resolution: new THREE.Vector2(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio,
      // window.innerWidth,
      // window.innerHeight,
    ),
    u_mouse: new THREE.Vector2(0, 0),
  },
  vertex,
  fragment,
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
ShaderImpl.key = THREE.MathUtils.generateUUID()

extend({ ShaderImpl })

// eslint-disable-next-line react/display-name
const Shader = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()

  useImperativeHandle(ref, () => localRef.current)

  useFrame(({ pointer }, delta) => {
    console.log('🚀 ~ file: Shader.jsx:41 ~ useFrame ~ pointer:', pointer)
    localRef.current.u_time += delta
    localRef.current.u_mouse.x = pointer.x
    localRef.current.u_mouse.y = pointer.y
  })
  return <shaderImpl ref={localRef} glsl={THREE.GLSL3} key={ShaderImpl.key} {...props} attach='material' />
})

export default Shader
