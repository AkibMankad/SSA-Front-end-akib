import { Col, Input, Row, Button, Form } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import AISuggestionModal from '../components/AISuggestionModal';
import { useAISuggestion } from '../hooks/useAISuggestion';
import { getFieldValidation, getFieldPlaceholder } from '../utils/validationRules';

const { TextArea } = Input;

const FIELDS = [
  { name: 'currentFinancialSituation', rows: 4 },
  { name: 'employmentCircumstances', rows: 4 },
  { name: 'reasonForApplying', rows: 4 },
];

function SituationDescriptionsStep({ currentStep }) {
  const { t } = useTranslation();
  const {
    modalOpen,
    loading,
    error,
    suggestion,
    handleHelpMeWrite,
    handleAccept,
    handleEdit,
    handleCloseModal,
  } = useAISuggestion(t, currentStep);

  return (
    <>
      <Row gutter={[16, 4]}>
        {FIELDS.map(({ name, rows }) => (
          <Col xs={24} key={name}>
            <Form.Item
              label={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span>{t(name)}</span>
                  <Button
                    type="link"
                    size="small"
                    icon={<BulbOutlined />}
                    onClick={() => handleHelpMeWrite(name)}
                    className="step-help-btn"
                    style={{ padding: 0 }}
                  >
                    {t('helpMeWrite')}
                  </Button>
                </div>
              }
              name={name}
              rules={getFieldValidation(name, t)}
            >
              <TextArea
                rows={rows}
                placeholder={getFieldPlaceholder(name, t)}
              />
            </Form.Item>
          </Col>
        ))}
      </Row>

      <AISuggestionModal
        open={modalOpen}
        onClose={handleCloseModal}
        suggestion={suggestion}
        loading={loading}
        error={error}
        onAccept={handleAccept}
        onEdit={handleEdit}
      />
    </>
  );
}

export default memo(SituationDescriptionsStep);
