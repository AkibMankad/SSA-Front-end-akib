import { memo } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  return (
    <div className="language-switch">
      <Select
        value={i18n.language}
        onChange={(value) => i18n.changeLanguage(value)}
        options={languageOptions}
        style={{ width: 120 }}
      />
    </div>
  );
}

export default memo(LanguageSwitcher);
