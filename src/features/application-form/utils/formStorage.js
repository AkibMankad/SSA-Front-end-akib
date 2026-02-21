import dayjs from 'dayjs';

const STORAGE_KEY = 'ssa.application-form.values.v1';

export function serializeFormValues(values) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key] = dayjs.isDayjs(value) ? value.toISOString() : value;
    return acc;
  }, {});
}

export function deserializeFormValues(values) {
  if (!values) return {};
  return {
    ...values,
    dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth) : undefined,
  };
}

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

export function clearFormProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
