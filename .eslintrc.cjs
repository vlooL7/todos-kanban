module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'plugin:effector/recommended',
		'plugin:effector/future',
		'plugin:effector/react',
		'plugin:effector/patronum'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'effector'],
	rules: {
		'react-hooks/exhaustive-deps': 'warn',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		'no-empty': ['error', { allowEmptyCatch: true }],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				ignoreRestSiblings: true
			}
		]
	}
}
