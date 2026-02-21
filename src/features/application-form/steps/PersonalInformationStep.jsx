import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
const { TextArea } = Input;
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { GENDER_VALUES } from '../constants';
import { getFieldValidation, getFieldPlaceholder } from '../utils/validationRules';

function PersonalInformationStep() {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 4]}>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('name')}
          name="name"
          rules={getFieldValidation('name', t)}
        >
          <Input placeholder={getFieldPlaceholder('name', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('nationalId')}
          name="nationalId"
          rules={getFieldValidation('nationalId', t)}
        >
          <Input placeholder={getFieldPlaceholder('nationalId', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('dateOfBirth')}
          name="dateOfBirth"
          rules={getFieldValidation('dateOfBirth', t)}
        >
          <DatePicker
            className="step-full-width"
            placeholder={getFieldPlaceholder('dateOfBirth', t)}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('gender')}
          name="gender"
          rules={getFieldValidation('gender', t)}
        >
          <Select
            placeholder={getFieldPlaceholder('gender', t)}
            options={GENDER_VALUES.map((value) => ({ label: t(value), value }))}
          />
        </Form.Item>
      </Col>
      <Col xs={24}>
        <Form.Item
          label={t('address')}
          name="address"
          rules={getFieldValidation('address', t)}
        >
          <TextArea
            rows={2}
            placeholder={getFieldPlaceholder('address', t)}
          />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          label={t('city')}
          name="city"
          rules={getFieldValidation('city', t)}
        >
          <Input placeholder={getFieldPlaceholder('city', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          label={t('state')}
          name="state"
          rules={getFieldValidation('state', t)}
        >
          <Input placeholder={getFieldPlaceholder('state', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={8}>
        <Form.Item
          label={t('country')}
          name="country"
          rules={getFieldValidation('country', t)}
        >
          <Input placeholder={getFieldPlaceholder('country', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('phone')}
          name="phone"
          rules={getFieldValidation('phone', t)}
        >
          <Input placeholder={getFieldPlaceholder('phone', t)} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          label={t('email')}
          name="email"
          rules={getFieldValidation('email', t)}
        >
          <Input
            type="email"
            placeholder={getFieldPlaceholder('email', t)}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default memo(PersonalInformationStep);
