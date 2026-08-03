import FaqItem from '../components/FaqItem'
import { useI18n } from '../i18n'

export default function FAQs() {
  const { t } = useI18n()
  return (
    <>
      <div className="page-header">
        <h1>{t('faqs.title')}</h1>
        <p>{t('faqs.subtitle')}</p>
      </div>
      <div className="content-section">
        <div className="content-card" id="faqContainer">
          <FaqItem question={t('faqs.q1')}>
            <p>{t('faqs.a1')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q2')}>
            <p>{t('faqs.a2')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q3')}>
            <p>{t('faqs.a3')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q4')}>
            <p>{t('faqs.a4')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q5')}>
            <p>{t('faqs.a5')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q6')}>
            <p>{t('faqs.a6')}</p>
          </FaqItem>
          <FaqItem question={t('faqs.q7')}>
            <p>{t('faqs.a7')}</p>
          </FaqItem>
        </div>
      </div>
    </>
  )
}
