/**
 * Mock application submission service
 * @param {Object} payload - Application form data
 * @returns {Promise<Object>} Mock response with ok status and payload
 */
export async function mockSubmitApplication(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, payload };
}
