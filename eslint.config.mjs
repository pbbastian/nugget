import antfu from '@antfu/eslint-config'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default antfu({
  vue: true,
  plugins: {
    tailwindcss,
  },
  rules: {
    'tailwindcss/classnames-order': 'error', // Sorts Tailwind classes
    'tailwindcss/enforces-shorthand': 'error', // Enforces shorthand usage where applicable
    'tailwindcss/enforces-negative-arbitrary-values': 'error', // Enforces negative arbitrary values
    'tailwindcss/no-contradicting-classname': 'error', // Disallow contradicting class names
    'tailwindcss/no-unnecessary-arbitrary-value': 'error', // Disallow unnecessary arbitrary values
    'tailwindcss/no-custom-classname': 'off', // Disable if you're using custom class names
  },
  ignores: [
    'migrations/*',
  ],
})
