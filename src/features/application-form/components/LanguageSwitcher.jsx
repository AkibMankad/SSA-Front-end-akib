import { memo } from 'react';
import { Button, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  return (
    <div className="language-switch">
      <Typography.Text id="language-switch-label">{t('language')}</Typography.Text>
      <Button
        type="link"
        aria-labelledby="language-switch-label"
        aria-label={t('switchToEnglish')}
        onClick={() => i18n.changeLanguage('en')}
      >
        English
      </Button>
      <Button
        type="link"
        aria-labelledby="language-switch-label"
        aria-label={t('switchToArabic')}
        onClick={() => i18n.changeLanguage('ar')}
      >
        العربية
      </Button>
    </div>
  );
}

export default memo(LanguageSwitcher);
