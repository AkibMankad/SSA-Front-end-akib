import dayjs from 'dayjs';

const STORAGE_KEY = 'ssa.application-form.values.v1';

/**
 * Serialize form values for storage (convert dayjs dates to ISO strings)
 * @param {Object} values - Form values to serialize
 * @returns {Object} Serialized form values
 */
export function serializeFormValues(values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = dayjs.isDayjs(value) ? value.toISOString() : value;
    return acc;
  }, {});
}

/**
 * Deserialize form values from storage (convert ISO strings back to dayjs)
 * @param {Object} values - Serialized form values
 * @returns {Object} Deserialized form values
 */
export function deserializeFormValues(values) {
  if (!values) return {};
  return {
    ...values,
    dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth) : undefined,
  };
}

/**
 * Save form progress to localStorage
 * @param {number} currentStep - Current step index (0-2)
 * @param {Object} formValues - Form values to save
 */
export function saveFormProgress(currentStep, formValues) {
  try {
    const values = serializeFormValues(formValues);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentStep, values })
    );
  } catch (error) {
    console.error('Failed to save form progress:', error);
  }
}

/**
 * Load form progress from localStorage
 * @returns {Object|null} Saved form progress or null if not found
 */
export function loadFormProgress() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return null;

    const parsed = JSON.parse(savedState);
    if (!Number.isInteger(parsed.currentStep) || 
        parsed.currentStep < 0 || 
        parsed.currentStep > 2) {
      clearFormProgress();
      return null;
    }

    return {
      currentStep: parsed.currentStep,
      values: deserializeFormValues(parsed.values),
    };
  } catch (error) {
    console.error('Failed to load form progress:', error);
    clearFormProgress();
    return null;
  }
}

/**
 * Clear saved form progress from localStorage
 */
export function clearFormProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
