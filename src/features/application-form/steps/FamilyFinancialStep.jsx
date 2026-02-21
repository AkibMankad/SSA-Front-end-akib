import { Col, Form, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { EMPLOYMENT_STATUS_VALUES, HOUSING_STATUS_VALUES, MARITAL_STATUS_VALUES } from '../constants';

export default function FamilyFinancialStep() {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 4]}>
      <Col xs={24} md={12}>
        <Form.Item
          name="maritalStatus"
          label={t('maritalStatus')}
          rules={[{ required: true, message: t('required') }]}
        >
          <Select options={MARITAL_STATUS_VALUES.map((value) => ({ label: t(value), value }))} />
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
          <Select options={EMPLOYMENT_STATUS_VALUES.map((value) => ({ label: t(value), value }))} />
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
          <Select options={HOUSING_STATUS_VALUES.map((value) => ({ label: t(value), value }))} />
        </Form.Item>
      </Col>
    </Row>
  );
}
