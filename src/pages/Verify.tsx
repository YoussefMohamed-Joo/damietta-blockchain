import { Search } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Verify() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('verify.hero_title')}</h1>
        <p>{t('verify.hero_desc')}</p>
      </div>
      <div className="content-section">
        <div className="search-glass" style={{ marginBottom: '3rem' }}>
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input type="text" placeholder={t('verify.search_placeholder')} className="ml-3" />
          <button className="search-btn">{t('verify.search_btn')}</button>
        </div>
      </div>
      <div className="content-section" style={{ paddingTop: 0 }}>
        <div className="content-card">
          <h2>{t('verify.section1_title')}</h2>
          <p>{t('verify.section1_desc')}</p>
          <p>{t('verify.section1_desc2')}</p>
          <h2>{t('verify.section2_title')}</h2>
          <p>{t('verify.section2_desc')}</p>
        </div>
      </div>
    </>
  )
}
