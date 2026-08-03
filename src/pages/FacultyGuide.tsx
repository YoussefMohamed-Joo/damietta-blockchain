import { useI18n } from '../i18n'

export default function FacultyGuide() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('faculty.hero_title')}</h1>
        <p>{t('faculty.hero_desc')}</p>
      </div>
      <div className="content-section"><div className="content-card">
        <h2>{t('faculty.section1_title')}</h2>
        <p>{t('faculty.section1_desc')}</p>
        <h2>{t('faculty.section2_title')}</h2>
        <p>{t('faculty.section2_desc')}</p>
        <h2>{t('faculty.section3_title')}</h2>
        <p>{t('faculty.section3_desc')}</p>
        <h2>{t('faculty.section4_title')}</h2>
        <p>{t('faculty.section4_desc')}</p>
      </div></div>
    </>
  )
}
