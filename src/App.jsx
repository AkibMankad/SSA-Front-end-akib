import { useTranslation } from 'react-i18next';
import { ConfigProvider, Layout } from 'antd';
import { useEffect } from 'react';
import { ApplicationFormWizard } from './features/application-form';

function App() {
  const { i18n } = useTranslation();
  const direction = i18n.dir();
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = direction;
  }, [direction, i18n.language]);

  return (
    <ConfigProvider direction={direction}>
      <Layout className={`app-layout ${direction === 'rtl' ? 'rtl-page' : 'ltr-page'}`}>
        <Layout.Content className="app-content">
          <ApplicationFormWizard />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
