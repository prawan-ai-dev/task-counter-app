/** @type {import('jest').Config} */
module.exports = {
	// Use jsdom to simulate the browser
	testEnvironment: 'jest-environment-jsdom',
	// Next.js 14 + TS + ESM support
	preset: undefined,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		// Handle module aliases (if you add any in tsconfig)
		'^@/(.*)$': '<rootDir>/src/$1',
		// CSS modules and global CSS to identity-obj-proxy or stub
		'\.(css|less|scss|sass)$': 'identity-obj-proxy',
		// Convex generated API path mapping when importing with relative up-levels
		'^convex/_generated/(.*)$': '<rootDir>/convex/_generated/$1',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['/node_modules/'],
	testPathIgnorePatterns: ['/node_modules/', '/.next/'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx}',
		'!<rootDir>/**/index.{ts,tsx}',
	],
};


