import { ScreenQuad } from '@react-three/drei'

import Shader from './Shader/Shader'

const Screen = () => {
  return (
    // <mesh>
    //   <planeGeometry attach='geometry' args={[2, 2]} />
    //   <Shader key={Shader.key} />
    // </mesh>
    <ScreenQuad>
      <Shader key={Shader.key} />
    </ScreenQuad>
  )
}

export default Screen
