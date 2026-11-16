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
  const t = content[lang]

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
      </header>

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
