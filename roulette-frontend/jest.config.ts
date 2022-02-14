export { }

module.exports = {
	preset: 'ts-jest',
	roots: [
		'<rootDir>/src'
	],
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: [
		'<rootDir>/jest.setup.ts'
	],
	resetMocks: true,
	moduleNameMapper: {
		'_core/(.*)$': '<rootDir>/src/_core/$1',
		'_shared/(.*)$': '<rootDir>/src/_shared/$1',
		'contexts/(.*)$': '<rootDir>/src/contexts/$1',
		'pages/(.*)$': '<rootDir>/src/pages/$1',
	},
}
