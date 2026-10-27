import { BackToTop } from './components/BackToTop'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Home } from './sections/Home'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'

function App() {
  return (
    <>
      <main>
        <Home />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}

export default App
