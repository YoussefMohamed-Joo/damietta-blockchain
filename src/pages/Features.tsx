import { Hexagon, Award, History, QrCode, Database, UserCheck } from 'lucide-react'
import TypewriterText from '../components/TypewriterText'
import { useI18n } from '../i18n'

export default function Features() {
  const { t } = useI18n()

  const features = [
    { icon: Hexagon, titleKey: 'features.f1_title', descKey: 'features.f1_desc' },
    { icon: Award, titleKey: 'features.f2_title', descKey: 'features.f2_desc' },
    { icon: History, titleKey: 'features.f3_title', descKey: 'features.f3_desc' },
    { icon: QrCode, titleKey: 'features.f4_title', descKey: 'features.f4_desc' },
    { icon: Database, titleKey: 'features.f5_title', descKey: 'features.f5_desc' },
    { icon: UserCheck, titleKey: 'features.f6_title', descKey: 'features.f6_desc' },
  ]

  return (
    <>
      <div className="page-header">
        <h1>{t('features.title')}</h1>
        <p>{t('features.sub')}</p>
      </div>
      {features.map(({ icon: Icon, titleKey, descKey }, idx) => (
        <div className="content-section" key={titleKey}>
          <div className="content-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-wrap"><Icon className="w-7 h-7 text-primary" /></div>
              <h2 style={{ margin: 0, minHeight: '1.4em' }}>
                <TypewriterText text={t(titleKey)} speed={40 + idx * 15} />
              </h2>
            </div>
            <p>{t(descKey)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
