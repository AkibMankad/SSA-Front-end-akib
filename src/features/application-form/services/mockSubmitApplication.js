export async function mockSubmitApplication(payload) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true, payload };
}
