import '@testing-library/jest-dom';

// Silence Next.js router warnings if any tests touch routing
jest.mock('next/router', () => require('next-router-mock'));

// Provide a minimal mock for Convex React hooks used in tests where we don't want network
jest.mock('convex/react', () => {
	const actual = jest.requireActual('convex/react');
	return {
		...actual,
		useQuery: jest.fn(() => undefined),
		useMutation: jest.fn(() => jest.fn(async () => {})),
		ConvexProvider: ({ children }: { children: React.ReactNode }) => children as any,
		ConvexReactClient: function () { return {} as any; },
	};
});


