import { Col, Form, InputNumber, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { EMPLOYMENT_STATUS_VALUES, HOUSING_STATUS_VALUES, MARITAL_STATUS_VALUES } from '../constants';
import { getFieldValidation, getFieldPlaceholder } from '../utils/validationRules';

function FamilyFinancialStep() {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 4]}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('maritalStatus')}
          name="maritalStatus"
          rules={getFieldValidation('maritalStatus', t)}
        >
          <Select
            placeholder={getFieldPlaceholder('maritalStatus', t)}
            options={MARITAL_STATUS_VALUES.map((value) => ({ label: t(value), value }))}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('dependents')}
          name="dependents"
          rules={getFieldValidation('dependents', t)}
        >
          <InputNumber
            min={1}
            max={50}
            placeholder={getFieldPlaceholder('dependents', t)}
            className="number-input-small"
            controls={false}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('employmentStatus')}
          name="employmentStatus"
          rules={getFieldValidation('employmentStatus', t)}
        >
          <Select
            placeholder={getFieldPlaceholder('employmentStatus', t)}
            options={EMPLOYMENT_STATUS_VALUES.map((value) => ({ label: t(value), value }))}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('monthlyIncome')}
          name="monthlyIncome"
          rules={getFieldValidation('monthlyIncome', t)}
        >
          <InputNumber
            min={0}
            max={9999999}
            placeholder={getFieldPlaceholder('monthlyIncome', t)}
            className="number-input-small"
            controls={false}
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('housingStatus')}
          name="housingStatus"
          rules={getFieldValidation('housingStatus', t)}
        >
          <Select
            placeholder={getFieldPlaceholder('housingStatus', t)}
            options={HOUSING_STATUS_VALUES.map((value) => ({ label: t(value), value }))}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default memo(FamilyFinancialStep);
