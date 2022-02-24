const common = [
	'--require-module ts-node/register' // Load TypeScript module
];

const core_backend = [
	...common,
	'tests/apps/core/backend/features/**/*.feature',
	'--require tests/apps/core/backend/features/step_definitions/*.steps.ts'
].join(' ');

module.exports = {
	core_backend
};
