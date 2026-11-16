import { useState } from 'react'
import logo from './assets/logo.png'
import vm from './assets/vm.png'
import dot from './assets/dot.svg'

export function Home() {
  const [lang, setLang] = useState<'EN' | 'UA'>('EN')

  return (
    <div className="page">
      <header className="header">
        <a className="brand" href="/">
          <img className="brand__logo" src={logo} alt="" />
          <span className="brand__text">
            <span className="brand__name">Victoria Mudrytska</span>
            <span className="brand__role">UX/UI Designer</span>
          </span>
        </a>
        <nav className="nav">
          <a href="#work">My work</a>
          <a href="#about">About me</a>
          <div className="lang" role="group" aria-label="Language">
            <button type="button" className={lang === 'EN' ? 'is-active' : ''} onClick={() => setLang('EN')}>EN</button>
            <span aria-hidden="true"> / </span>
            <button type="button" className={lang === 'UA' ? 'is-active' : ''} onClick={() => setLang('UA')}>UA</button>
          </div>
          <a className="btn-outline" href="#contacts">Get in touch</a>
        </nav>
      </header>

      <main className="hero">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-strong">I design</span>
            <span className="hero__title-italic">mobile apps and websites where the path is easy to follow</span>
          </h1>
          <p className="hero__lead">For companies whose users go from choice to result without extra steps.</p>
          <a className="btn-solid" href="#work">View my work</a>
          <p className="hero__status">
            <img src={dot} alt="" width={15} height={15} />
            Looking for a junior position or internship.
          </p>
        </div>
        <img className="hero__art" src={vm} alt="Paper ribbon shaped like the letters VM" />
      </main>
    </div>
  )
}