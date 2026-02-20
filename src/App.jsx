import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Result,
  Row,
  Select,
  Space,
  Steps,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppContext } from './context/AppContext';

const { TextArea } = Input;

const stepFields = [
  [
    'name',
    'nationalId',
    'dateOfBirth',
    'gender',
    'address',
    'city',
    'state',
    'country',
    'phone',
    'email',
  ],
  ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'],
  ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'],
];

function HomePage() {
  const { t, i18n } = useTranslation();
  const { appName } = useAppContext();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { title: `${t('step1Title')} - ${t('step1Desc')}` },
    { title: `${t('step2Title')} - ${t('step2Desc')}` },
    { title: `${t('step3Title')} - ${t('step3Desc')}` },
  ];

  const handleNext = async () => {
    await form.validateFields(stepFields[currentStep]);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    await form.validateFields(stepFields[currentStep]);
    setSubmitted(true);
  };

  const resetWizard = () => {
    form.resetFields();
    setCurrentStep(0);
    setSubmitted(false);
  };

  const renderStep1 = () => (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item name="name" label={t('name')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="nationalId"
          label={t('nationalId')}
          rules={[{ required: true, message: t('required') }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="dateOfBirth"
          label={t('dateOfBirth')}
          rules={[{ required: true, message: t('required') }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="gender" label={t('gender')} rules={[{ required: true, message: t('required') }]}>
          <Select
            options={[
              { label: t('male'), value: 'male' },
              { label: t('female'), value: 'female' },
              { label: t('other'), value: 'other' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item name="address" label={t('address')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="city" label={t('city')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="state" label={t('state')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item name="country" label={t('country')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item name="phone" label={t('phone')} rules={[{ required: true, message: t('required') }]}>
          <Input />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="email"
          label={t('email')}
          rules={[
            { required: true, message: t('required') },
            { type: 'email', message: t('invalidEmail') },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderStep2 = () => (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          name="maritalStatus"
          label={t('maritalStatus')}
          rules={[{ required: true, message: t('required') }]}
        >
          <Select
            options={[
              { label: t('single'), value: 'single' },
              { label: t('married'), value: 'married' },
              { label: t('divorced'), value: 'divorced' },
              { label: t('widowed'), value: 'widowed' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="dependents"
          label={t('dependents')}
          rules={[{ required: true, message: t('required') }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="employmentStatus"
          label={t('employmentStatus')}
          rules={[{ required: true, message: t('required') }]}
        >
          <Select
            options={[
              { label: t('employed'), value: 'employed' },
              { label: t('selfEmployed'), value: 'selfEmployed' },
              { label: t('unemployed'), value: 'unemployed' },
              { label: t('student'), value: 'student' },
              { label: t('retired'), value: 'retired' },
            ]}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="monthlyIncome"
          label={t('monthlyIncome')}
          rules={[{ required: true, message: t('required') }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          name="housingStatus"
          label={t('housingStatus')}
          rules={[{ required: true, message: t('required') }]}
        >
          <Select
            options={[
              { label: t('ownHouse'), value: 'ownHouse' },
              { label: t('rented'), value: 'rented' },
              { label: t('livingWithFamily'), value: 'livingWithFamily' },
              { label: t('other'), value: 'other' },
            ]}
          />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderStep3 = () => (
    <Row gutter={16}>
      <Col xs={24}>
        <Form.Item
          name="currentFinancialSituation"
          label={t('currentFinancialSituation')}
          rules={[{ required: true, message: t('required') }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="employmentCircumstances"
          label={t('employmentCircumstances')}
          rules={[{ required: true, message: t('required') }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          name="reasonForApplying"
          label={t('reasonForApplying')}
          rules={[{ required: true, message: t('required') }]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  );

  return (
    <Card className="wizard-card">
      <Typography.Title level={3}>{appName}</Typography.Title>
      <Typography.Paragraph>{t('wizardSubtitle')}</Typography.Paragraph>
      <div style={{ marginTop: 16 }}>
        <Space>
          <Typography.Text>{t('language')}</Typography.Text>
          <Button type="link" onClick={() => i18n.changeLanguage('en')}>
            English
          </Button>
          <Button type="link" onClick={() => i18n.changeLanguage('es')}>
            Español
          </Button>
        </Space>
      </div>

      {submitted ? (
        <Result
          status="success"
          title={t('applicationSubmitted')}
          extra={
            <Button type="primary" onClick={resetWizard}>
              {t('startAgain')}
            </Button>
          }
        />
      ) : (
        <>
          <Steps current={currentStep} items={steps} style={{ marginTop: 24, marginBottom: 24 }} />
          <Form form={form} layout="vertical">
            {currentStep === 0 && renderStep1()}
            {currentStep === 1 && renderStep2()}
            {currentStep === 2 && renderStep3()}
          </Form>
          <div className="wizard-actions">
            <Button onClick={handleBack} disabled={currentStep === 0}>
              {t('back')}
            </Button>
            {currentStep < 2 ? (
              <Button type="primary" onClick={handleNext}>
                {t('next')}
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit}>
                {t('submit')}
              </Button>
            )}
          </div>
        </>
      )}
    </Card>
  );
}

function App() {
  return (
    <ConfigProvider>
      <Layout className="app-layout">
        <Layout.Content className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
