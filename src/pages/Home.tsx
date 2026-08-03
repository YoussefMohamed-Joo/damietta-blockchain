import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck2, BookOpen, Shield, Building, Hexagon, Award, History, QrCode, Database, UserCheck, Search, XCircle, CheckCircle, FileText } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Home() {
  const { t } = useI18n()

  useEffect(() => {
    const els = document.querySelectorAll('.stat-number')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement
          const target = parseInt(el.getAttribute('data-target') || '0')
          const suffix = target === 100 ? '%' : '+'
          let cur = 0
          const inc = target / (2000 / 16)
          const timer = setInterval(() => {
            cur += inc
            if (cur >= target) {
              el.textContent = target + suffix
              clearInterval(timer)
            } else {
              el.textContent = Math.floor(cur) + suffix
            }
          }, 16)
          obs.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.animate-on-scroll')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="w-full relative">
        <img src="/img/img-hero3.png" alt="" className="w-full h-auto block select-none" draggable="false" style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitTouchCallout: 'none' }} onContextMenu={e => e.preventDefault()} />
        <div className="absolute bottom-[8%] sm:bottom-[10%] lg:bottom-[12%] right-[5%] sm:right-[6%] lg:right-[8%] z-10 flex flex-col gap-3 sm:gap-4 items-end pointer-events-auto">
          <Link to="/register" className="hero-btn hero-btn-primary text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5">{t('home.register')}</Link>
          <Link to="/verify" className="hero-btn hero-btn-outline text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5">{t('home.verify_research')}</Link>
        </div>
      </div>

      <div className="gradient-orb w-[500px] h-[500px] -top-40 -left-40 hidden lg:block" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 45%, transparent 72%)' }}></div>
      <div className="gradient-orb w-[400px] h-[400px] bottom-20 right-10" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, rgba(20,184,166,0.06) 45%, transparent 72%)' }}></div>

      <section>
        <div className="stats-glass mx-auto max-w-5xl px-6 sm:px-10 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { target: 1250, icon: FileCheck2, labelKey: 'home.stat_protected' },
              { target: 850, icon: BookOpen, labelKey: 'home.stat_researchers' },
              { target: 100, icon: Shield, labelKey: 'home.stat_tamper' },
              { target: 12, icon: Building, labelKey: 'home.stat_faculties' },
            ].map(({ target, icon: Icon, labelKey }) => (
              <div className="text-center" key={labelKey}>
                <div className="stat-number" data-target={target}>0</div>
                <div className="flex items-center justify-center gap-1.5 mt-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium text-slate-600">{t(labelKey)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features">
        <h2 className="section-title">{t('home.features_title')}</h2>
        <p className="section-sub">{t('home.features_sub')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { icon: Hexagon, titleKey: 'home.feature_1_title', descKey: 'home.feature_1_desc' },
            { icon: Award, titleKey: 'home.feature_2_title', descKey: 'home.feature_2_desc' },
            { icon: History, titleKey: 'home.feature_3_title', descKey: 'home.feature_3_desc' },
            { icon: QrCode, titleKey: 'home.feature_4_title', descKey: 'home.feature_4_desc' },
            { icon: Database, titleKey: 'home.feature_5_title', descKey: 'home.feature_5_desc' },
            { icon: UserCheck, titleKey: 'home.feature_6_title', descKey: 'home.feature_6_desc' },
          ].map(({ icon: Icon, titleKey, descKey }) => (
            <div className="glass-card feature-card animate-on-scroll" key={titleKey}>
              <div className="icon-wrap"><Icon className="w-7 h-7 text-primary" /></div>
              <h3>{t(titleKey)}</h3>
              <p>{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works">
        <h2 className="section-title">{t('home.how_title')}</h2>
        <p className="section-sub">{t('home.how_sub')}</p>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { num: '01', titleKey: 'home.step_1_title', descKey: 'home.step_1_desc' },
            { num: '02', titleKey: 'home.step_2_title', descKey: 'home.step_2_desc' },
            { num: '03', titleKey: 'home.step_3_title', descKey: 'home.step_3_desc' },
            { num: '04', titleKey: 'home.step_4_title', descKey: 'home.step_4_desc' },
          ].map(({ num, titleKey, descKey }) => (
            <div className="step-card flex flex-col items-center text-center animate-on-scroll" key={num}>
              <div className="step-number">{num}</div>
              <div className="step-line"></div>
              <h3 className="font-bold text-slate-800 mt-4 mb-2 text-base">{t(titleKey)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="comparison">
        <h2 className="section-title">{t('home.comp_title')}</h2>
        <p className="section-sub">{t('home.comp_sub')}</p>
        <div className="flex flex-col lg:flex-row gap-6 max-w-5xl mx-auto">
          <div className="comparison-card traditional animate-on-scroll" style={{ transitionDelay: '0s' }}>
            <div className="flex items-center gap-3 mb-5"><FileText className="w-6 h-6 text-red-400" /><h3 className="font-bold text-slate-700 text-lg">{t('home.comp_trad_title')}</h3></div>
            <ul>
              {['home.comp_trad_1','home.comp_trad_2','home.comp_trad_3','home.comp_trad_4'].map(item => (
                <li key={item}><XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" /><span>{t(item)}</span></li>
              ))}
            </ul>
          </div>
          <div className="comparison-card modern animate-on-scroll" style={{ transitionDelay: '.2s' }}>
            <div className="flex items-center gap-3 mb-5"><CheckCircle className="w-6 h-6 text-teal-500" /><h3 className="font-bold text-slate-800 text-lg">{t('home.comp_modern_title')}</h3></div>
            <ul>
              {['home.comp_modern_1','home.comp_modern_2','home.comp_modern_3','home.comp_modern_4'].map(item => (
                <li key={item}><CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 shrink-0" /><span>{t(item)}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="verify">
        <h2 className="section-title">{t('home.verify_title')}</h2>
        <p className="section-sub">{t('home.verify_sub')}</p>
        <div className="search-glass animate-on-scroll">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" placeholder={t('home.verify_placeholder')} className="ml-3" />
          <Link to="/verify" className="search-btn">{t('home.verify_now')}</Link>
        </div>
      </section>
    </>
  )
}
