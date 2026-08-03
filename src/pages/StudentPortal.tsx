import { useI18n } from '../i18n'

export default function StudentPortal() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('portal.hero_title')}</h1>
        <p>{t('portal.hero_desc')}</p>
      </div>
      <div className="content-section"><div className="content-card">
        <h2>{t('portal.section1_title')}</h2>
        <p>{t('portal.section1_desc')}</p>
        <h2>{t('portal.section2_title')}</h2>
        <p>{t('portal.section2_desc')}</p>
        <h2>{t('portal.section3_title')}</h2>
        <p>{t('portal.section3_desc')}</p>
        <h2>{t('portal.section4_title')}</h2>
        <p>{t('portal.section4_desc')}</p>
      </div></div>
    </>
  )
}
