module.exports = {
  root: true,
  extends: ['@tinkin', '@tinkin/eslint-config/nest'],
  rules: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'no-extra-parens': 'off',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'jest/no-conditional-expect': 'off',
  },
}
