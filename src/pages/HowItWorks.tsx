import { useI18n } from '../i18n'

export default function HowItWorks() {
  const { t } = useI18n()
  const steps = [
    { num: '01', titleKey: 'how.step1_title', descKey: 'how.step1_desc' },
    { num: '02', titleKey: 'how.step2_title', descKey: 'how.step2_desc' },
    { num: '03', titleKey: 'how.step3_title', descKey: 'how.step3_desc' },
    { num: '04', titleKey: 'how.step4_title', descKey: 'how.step4_desc' },
  ]

  return (
    <>
      <div className="page-header">
        <h1>{t('how.hero_title')}</h1>
        <p>{t('how.hero_desc')}</p>
      </div>
      {steps.map(({ num, titleKey, descKey }) => (
        <div className="content-section" key={num}>
          <div className="content-card">
            <div className="flex items-center gap-4 mb-4">
              <div className="step-number">{num}</div>
              <h2 style={{ margin: 0 }}>{t(titleKey)}</h2>
            </div>
            <p>{t(descKey)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
