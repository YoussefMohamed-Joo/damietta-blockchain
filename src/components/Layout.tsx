import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { FloatingPathsBackground } from './ui/floating-paths'

export default function Layout() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <FloatingPathsBackground position={-1} className="w-full h-full">
          <div />
        </FloatingPathsBackground>
      </div>
      <div className="fp-wrap">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
