import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import vm from './assets/vm.png'
import dot from './assets/dot.svg'

type Lang = 'EN' | 'UA'

const STORAGE_KEY = 'lang'

const content = {
  EN: {
    htmlLang: 'en',
    role: 'UX/UI Designer',
    work: 'My work',
    about: 'About me',
    touch: 'Get in touch',
    title: 'I design',
    italic: ['mobile apps and', 'websites where the path', 'is easy to follow'],
    lead: 'For companies whose users go from choice to result without extra steps.',
    cta: 'View my work',
    status: 'Looking for a junior position or internship.',
    art: 'Paper ribbon shaped like the letters VM',
    langLabel: 'Language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  UA: {
    htmlLang: 'uk',
    role: 'UX/UI дизайнерка',
    work: 'Мої роботи',
    about: 'Про мене',
    touch: "Зв'язатися",
    title: 'Створюю',
    italic: ['мобільні застосунки', 'й сайти, де шлях', 'легко пройти'],
    lead: 'Для компаній, чиї користувачі йдуть від вибору до результату без зайвих кроків.',
    cta: 'Переглянути роботи',
    status: 'Шукаю junior-позицію або стажування.',
    art: 'Паперова стрічка у формі літер VM',
    langLabel: 'Мова',
    menuOpen: 'Відкрити меню',
    menuClose: 'Закрити меню',
  },
} as const

function readStoredLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'UA' ? 'UA' : 'EN'
  } catch {
    return 'EN'
  }
}

export function Home() {
  const [lang, setLang] = useState<Lang>(readStoredLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const t = content[lang]

  // Mobile menu: lock page scroll (CSS only applies it on small screens) and close on Escape.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.lang = t.htmlLang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* storage unavailable: language just won't persist */
    }
  }, [lang, t.htmlLang])

  return (
    <div className="page">
      <header className="header">
        <a className="brand" href="/">
          <img className="brand__logo" src={logo} alt="" />
          <span className="brand__text">
            <span className="brand__name">Victoria Mudrytska</span>
            <span className="brand__role">{t.role}</span>
          </span>
        </a>
        <nav className="nav">
          <a href="#work">{t.work}</a>
          <a href="#about">{t.about}</a>
          <div className="lang" role="group" aria-label={t.langLabel}>
            <button type="button" className={lang === 'EN' ? 'is-active' : ''} aria-pressed={lang === 'EN'} onClick={() => setLang('EN')}>EN</button>
            <span aria-hidden="true"> / </span>
            <button type="button" className={lang === 'UA' ? 'is-active' : ''} aria-pressed={lang === 'UA'} onClick={() => setLang('UA')}>UA</button>
          </div>
          <a className="btn-touch" href="#contacts">{t.touch}</a>
        </nav>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? t.menuClose : t.menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <svg viewBox="0 0 36 24" aria-hidden="true">
            {menuOpen ? (
              <>
                <polygon points="4,14 8,10 32,10 28,14" transform="rotate(45 18 12)" />
                <polygon points="4,14 8,10 32,10 28,14" transform="rotate(-45 18 12)" />
              </>
            ) : (
              <>
                <polygon points="6,2 34,2 30,6 2,6" />
                <polygon className="menu-btn__tip" points="2,6 6,2 11,2 7,6" />
                <polygon points="19,10 34,10 30,14 15,14" />
                <polygon points="6,18 34,18 30,22 2,22" />
              </>
            )}
          </svg>
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu${menuOpen ? ' is-open' : ''}`}>
        <div className="mobile-menu__top">
          <a className="mobile-menu__link" href="#work" onClick={() => setMenuOpen(false)}>{t.work}</a>
          <a className="mobile-menu__link" href="#about" onClick={() => setMenuOpen(false)}>{t.about}</a>
          <div className="mobile-menu__actions">
            <a className="btn-touch" href="#contacts" onClick={() => setMenuOpen(false)}>{t.touch}</a>
            <div className="lang" role="group" aria-label={t.langLabel}>
              <button type="button" className={lang === 'EN' ? 'is-active' : ''} aria-pressed={lang === 'EN'} onClick={() => setLang('EN')}>EN</button>
              <span aria-hidden="true"> / </span>
              <button type="button" className={lang === 'UA' ? 'is-active' : ''} aria-pressed={lang === 'UA'} onClick={() => setLang('UA')}>UA</button>
            </div>
          </div>
        </div>
        <div className="mobile-menu__bottom">
          <img src={vm} alt="" />
        </div>
      </div>

      <main className="hero">
        <div className="hero__copy">
          <h1 className="hero__title">
            <span className="hero__title-strong">{t.title}</span>
            <span className="hero__title-italic">
              {t.italic.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </h1>
          <p className="hero__lead">{t.lead}</p>
          <a className="btn-solid" href="#work">{t.cta}</a>
          <p className="hero__status">
            <img src={dot} alt="" />
            {t.status}
          </p>
        </div>
        <div className="hero__art">
          <div className="hero__art-crop">
            <img src={vm} alt={t.art} />
          </div>
        </div>
      </main>
    </div>
  )
}
