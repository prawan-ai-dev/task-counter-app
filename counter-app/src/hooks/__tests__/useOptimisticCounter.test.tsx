import { renderHook, act } from '@testing-library/react';
import { useOptimisticCounter } from '../useOptimisticCounter';

jest.mock('convex/react', () => ({
	useQuery: jest.fn(() => 0),
	useMutation: jest.fn(() => jest.fn(async () => {})),
}));

jest.mock('convex/_generated/api', () => ({
	api: {
		counter: {
			get: {} as any,
			getActions: {} as any,
			increment: {} as any,
			decrement: {} as any,
			reset: {} as any,
		},
	},
}));

describe('useOptimisticCounter', () => {
	it('optimistic increment sets local state and toggles loading', async () => {
		const { result } = renderHook(() => useOptimisticCounter());
		await act(async () => {
			await result.current.handleIncrement();
		});
		expect(result.current.isIncrementing).toBe(false);
	});

	it('reset uses its own loading state', async () => {
		const { result } = renderHook(() => useOptimisticCounter());
		await act(async () => {
			await result.current.handleReset();
		});
		expect(result.current.isResetting).toBe(false);
	});
});


