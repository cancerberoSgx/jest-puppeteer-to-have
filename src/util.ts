export function shorter(s: string, l = 20) {
  s = typeof s !== 'string' ? s + '' : s
  const postFix = s.length > l ? '...' : ''
  return `"${s.trim().substring(0, Math.min(s.length, l))}${postFix}"`
}
export function beforeEachDefault() {
  beforeEach(async () => {
    await expect(page).toEdit({
      selector: 'body',
      innerHTML: '',
    });
  });
}
