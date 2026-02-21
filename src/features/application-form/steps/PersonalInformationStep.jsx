import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { GENDER_VALUES } from '../constants';

export default function PersonalInformationStep() {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 4]}>
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
          <Select options={GENDER_VALUES.map((value) => ({ label: t(value), value }))} />
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
}
