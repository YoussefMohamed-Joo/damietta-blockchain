import React, { createContext, useContext, useEffect, useState } from 'react'
import core from './dict/core'
import home from './dict/home'
import features from './dict/features'
import how from './dict/how'
import verify from './dict/verify'
import portal from './dict/portal'
import faculty from './dict/faculty'
import faqs from './dict/faqs'
import contact from './dict/contact'
import privacy from './dict/privacy'
import terms from './dict/terms'
import login from './dict/login'
import register from './dict/register'
import admin from './dict/admin'
import reviewer from './dict/reviewer'
import student from './dict/student'
import assistant from './dict/assistant'
import cert from './dict/cert'
import profile from './dict/profile'

type Lang = 'en' | 'ar'

const DICTS = [
  core, home, features, how, verify, portal, faculty, faqs,
  contact, privacy, terms, login, register, admin, reviewer, student, assistant, cert, profile,
]

const merge = (lang: Lang): Record<string, string> =>
  DICTS.reduce<Record<string, string>>((acc, d) => ({ ...acc, ...d[lang] }), {})

const TRANSLATIONS = { en: merge('en'), ar: merge('ar') }

const tFn = (lang: Lang, key: string): string =>
  TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key

interface I18nCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const Ctx = createContext<I18nCtx>({ lang: 'en', setLang: () => {}, t: k => k })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return localStorage.getItem('site_lang') === 'ar' ? 'ar' : 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('site_lang', l)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = 'ltr'
  }, [lang])

  const t = (key: string) => tFn(lang, key)

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>
}

export function useI18n() {
  return useContext(Ctx)
}
