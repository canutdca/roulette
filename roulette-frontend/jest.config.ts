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
		'__mocks__/(.*)$': '<rootDir>/src/__mocks__/$1',
		'__test-utils__/(.*)$': '<rootDir>/src/__test-utils__/$1',
	},
}
