const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-3.5-turbo';

/**
 * Generate AI text suggestions in the specified language
 * @param {string} fieldName - Field identifier
 * @param {string} fieldLabel - Translated field label
 * @param {string} currentValue - Current field value
 * @param {string} language - Language code (en, ar)
 */
export async function generateAISuggestion(fieldName, fieldLabel, currentValue = '', language = 'en') {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
  }

  // Language-specific instructions
  const isArabic = language === 'ar';
  const languageInstruction = isArabic ? ' Write in Arabic language.' : ' Write in English language.';

  // Build context-aware prompt based on field type
  const prompts = {
    currentFinancialSituation: `Write in first person about your current financial situation as if filling out a support application. Describe income, expenses, and challenges naturally. Use "I" and "my". Keep it genuine. 3-4 sentences, around 100 words.${languageInstruction}${currentValue ? ` Improve: "${currentValue}"` : ''}`,
    employmentCircumstances: `Write in first person about your employment situation for a support application. Describe your job status and challenges naturally. Use "I" and "my". Keep it genuine. 3-4 sentences, around 100 words.${languageInstruction}${currentValue ? ` Improve: "${currentValue}"` : ''}`,
    reasonForApplying: `Write in first person why you need support, as if filling out an application. Describe your needs naturally. Use "I" and "my". Keep it genuine. 3-4 sentences, around 100 words.${languageInstruction}${currentValue ? ` Improve: "${currentValue}"` : ''}`,
  };

  const prompt = prompts[fieldName] || `Write in first person for "${fieldLabel}" as if filling out a support application. Keep it natural. 3-4 sentences, around 100 words.${languageInstruction}`;

  const systemMessage = isArabic
    ? 'اكتب كمتقدم للطلب بصيغة المتكلم. استخدم لغة طبيعية وإنسانية مثل "أنا"، "لدي"، "عندي". تجنب الصيغ الرسمية بصيغة الغائب. كن مختصراً وصادقاً ومحادثاً. اكتب بالعربية فقط.'
    : 'Write as the applicant in first person. Sound natural and human using "I", "my", "me". Avoid formal third-person phrases. Be brief, honest, and conversational. Write in English only.';

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: systemMessage,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content?.trim();

    if (!suggestion) {
      throw new Error('No suggestion received from OpenAI API');
    }

    return suggestion;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}
