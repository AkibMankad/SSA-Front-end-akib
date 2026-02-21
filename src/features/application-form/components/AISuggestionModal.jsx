import { Modal, Input, Button, Space, Alert, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './AISuggestionModal.less';

const { TextArea } = Input;

export default function AISuggestionModal({
  open,
  onClose,
  suggestion,
  loading,
  error,
  onAccept,
  onEdit,
}) {
  const { t } = useTranslation();
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    if (suggestion) {
      setEditedText(suggestion);
    }
  }, [suggestion]);

  const handleAccept = () => {
    onAccept(suggestion);
    onClose();
  };

  const handleEdit = () => {
    onEdit(editedText);
    onClose();
  };

  const handleDiscard = () => {
    setEditedText('');
    onClose();
  };

  return (
    <Modal
      title={t('aiSuggestion')}
      open={open}
      onCancel={handleDiscard}
      footer={null}
      width={600}
    >
      {loading && (
        <div className="ai-modal-loading">
          <Spin size="large" />
          <p className="ai-modal-loading-text">{t('generatingSuggestion')}</p>
        </div>
      )}

      {error && (
        <Alert
          description={error}
          type="error"
          showIcon
          closable
          className="ai-modal-error"
        />
      )}

      {!loading && !error && suggestion && (
        <>
          <div className="ai-modal-content">
            <p className="ai-modal-label">{t('suggestedText')}:</p>
            <TextArea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={8}
              placeholder={t('editSuggestionHere')}
            />
          </div>
          <Space className="ai-modal-actions">
            <Button danger onClick={handleDiscard}>
              {t('discard')}
            </Button>
            <Button 
              type="primary"
              onClick={handleEdit} 
              disabled={!editedText.trim() || editedText === suggestion}
            >
              {t('acceptWithEdits')}
            </Button>
            <Button 
              type="primary" 
              onClick={handleAccept}
              className="ai-modal-accept-btn"
            >
              {t('acceptSuggestion')}
            </Button>
          </Space>
        </>
      )}
    </Modal>
  );
}
