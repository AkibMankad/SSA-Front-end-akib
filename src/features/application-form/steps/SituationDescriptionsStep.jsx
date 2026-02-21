import { Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

export default function SituationDescriptionsStep() {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 4]}>
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
}
