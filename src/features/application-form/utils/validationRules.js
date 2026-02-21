/**
 * Get validation rules for Ant Design Form fields
 * @param {string} fieldName - The form field name
 * @param {Function} t - i18next translation function
 * @returns {Array} Array of validation rules for the field
 */
export function getFieldValidation(fieldName, t) {
  const rules = {
    // Personal Information
    name: [
      { required: true, message: t('nameRequired') },
      { min: 2, message: t('nameMinLength') },
      { max: 100, message: t('nameMaxLength') },
      { pattern: /^[a-zA-Z\u0600-\u06FF\s]+$/, message: t('nameInvalid') },
    ],
    nationalId: [
      { required: true, message: t('nationalIdRequired') },
      { pattern: /^[0-9]{10,20}$/, message: t('nationalIdInvalid') },
    ],
    dateOfBirth: [{ required: true, message: t('dateOfBirthRequired') }],
    gender: [{ required: true, message: t('genderRequired') }],
    address: [
      { required: true, message: t('addressRequired') },
      { min: 5, message: t('addressMinLength') },
    ],
    city: [
      { required: true, message: t('cityRequired') },
      { min: 2, message: t('cityMinLength') },
    ],
    state: [{ required: true, message: t('stateRequired') }],
    country: [{ required: true, message: t('countryRequired') }],
    phone: [
      { required: true, message: t('phoneRequired') },
      { pattern: /^[6-9]\d{9}$/, message: t('phoneInvalid') },
    ],
    email: [
      { required: true, message: t('emailRequired') },
      { type: 'email', message: t('emailInvalid') },
    ],

    // Family and Financial Information
    maritalStatus: [{ required: true, message: t('maritalStatusRequired') }],
    dependents: [
      { required: true, message: t('dependentsRequired') },
      { type: 'number', min: 1, message: t('dependentsMin') },
      { type: 'number', max: 50, message: t('dependentsMax') },
    ],
    employmentStatus: [{ required: true, message: t('employmentStatusRequired') }],
    monthlyIncome: [
      { required: true, message: t('monthlyIncomeRequired') },
      { type: 'number', min: 0, message: t('monthlyIncomeMin') },
      { 
        validator: (_, value) => {
          if (value && value.toString().length > 7) {
            return Promise.reject(new Error(t('monthlyIncomeMax')));
          }
          return Promise.resolve();
        }
      },
    ],
    housingStatus: [{ required: true, message: t('housingStatusRequired') }],

    // Situation and Descriptions
    currentFinancialSituation: [
      { required: true, message: t('currentFinancialSituationRequired') },
      { min: 10, message: t('currentFinancialSituationMinLength') },
      { max: 1000, message: t('currentFinancialSituationMaxLength') },
    ],
    employmentCircumstances: [
      { required: true, message: t('employmentCircumstancesRequired') },
      { min: 10, message: t('employmentCircumstancesMinLength') },
      { max: 1000, message: t('employmentCircumstancesMaxLength') },
    ],
    reasonForApplying: [
      { required: true, message: t('reasonForApplyingRequired') },
      { min: 10, message: t('reasonForApplyingMinLength') },
      { max: 1000, message: t('reasonForApplyingMaxLength') },
    ],
  };

  return rules[fieldName] || [{ required: true, message: t('required') }];
}

/**
 * Get placeholder text for form fields
 * @param {string} fieldName - The form field name
 * @param {Function} t - i18next translation function
 * @returns {string} Translated placeholder text
 */
export function getFieldPlaceholder(fieldName, t) {
  return t(`${fieldName}Placeholder`) || '';
}
