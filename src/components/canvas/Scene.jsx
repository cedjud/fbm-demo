import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props} orthographic camera={{ zoom: 1000 }}>
      {/* <directionalLight intensity={0.75} /> */}
      {/* <ambientLight intensity={0.75} /> */}
      {children}
      <Preload all />
      <OrbitControls />
    </Canvas>
  )
}
