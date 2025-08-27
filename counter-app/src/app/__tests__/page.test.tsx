import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../page';

// Mock hooks used in HomePage
jest.mock('@/hooks/useConvexConnection', () => ({
	useConvexConnection: () => ({
		connectionStatus: 'connected',
		isConnected: true,
		isConnecting: false,
		isLoading: false,
	}),
}));

jest.mock('@/hooks/useOptimisticCounter', () => ({
	useOptimisticCounter: () => ({
		count: 0,
		actions: [],
		handleIncrement: jest.fn(),
		handleDecrement: jest.fn(),
		handleReset: jest.fn(),
		isIncrementing: false,
		isDecrementing: false,
		isResetting: false,
		isAnyPending: false,
	}),
}));

describe('HomePage', () => {
	it('renders counter UI', () => {
		render(<HomePage />);
		expect(screen.getByText('Counter')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Decrement' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
	});

	it('does not show Resetting when pressing + or -', async () => {
		const incrementMock = jest.fn();
		const decrementMock = jest.fn();
		jest.doMock('@/hooks/useOptimisticCounter', () => ({
			useOptimisticCounter: () => ({
				count: 5,
				actions: [],
				handleIncrement: incrementMock,
				handleDecrement: decrementMock,
				handleReset: jest.fn(),
				isIncrementing: false,
				isDecrementing: false,
				isResetting: false,
				isAnyPending: false,
			}),
		}));

		const Page = (await import('../page')).default;
		render(<Page />);

		fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
		fireEvent.click(screen.getByRole('button', { name: 'Decrement' }));

		await waitFor(() => {
			expect(screen.queryByText('Resetting...')).not.toBeInTheDocument();
		});
	});
});


