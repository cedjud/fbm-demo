import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Screen = dynamic(() => import('@/components/canvas/Screen'), { ssr: false })

// Dom components go here
export default function Page(props) {
  return null
  // <Instructions>
  //   This is a minimal starter for Nextjs + React-three-fiber and Threejs. Click on the{' '}
  //   <span className='text-cyan-200'>atoms nucleus</span> to navigate to the{' '}
  //   <span className='text-green-200'>/blob</span> page. OrbitControls are enabled by default.
  // </Instructions>
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <Screen route='/blob' />

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
