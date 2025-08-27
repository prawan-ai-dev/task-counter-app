"use client";

import { useMemo } from 'react';
import { useOptimisticCounter } from '../hooks/useOptimisticCounter';
import { useConvexConnection } from '../hooks/useConvexConnection';
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function HomePage() {
	const { connectionStatus, isConnected, isConnecting } = useConvexConnection();
	const { 
		count, 
		actions, 
		handleIncrement, 
		handleDecrement, 
		handleReset, 
		isIncrementing,
		isDecrementing,
		isResetting,
		isAnyPending
	} = useOptimisticCounter();

	const isZero = useMemo(() => count === 0, [count]);

	// Show loading state while connecting
	if (isConnecting) {
		return (
			<main className="flex min-h-screen items-center justify-center p-6">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
					<div className="flex items-center justify-center gap-3">
						<LoadingSpinner size="lg" />
						<span className="text-lg font-medium text-gray-700">Connecting to server...</span>
					</div>
				</div>
			</main>
		);
	}

	// Show connection error state
	if (!isConnected) {
		return (
			<main className="flex min-h-screen items-center justify-center p-6">
				<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
					<div className="text-center">
						<div className="mb-4 text-2xl font-semibold text-red-600">Connection Error</div>
						<p className="text-gray-600">Unable to connect to the server. Please refresh the page.</p>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
				<div className="mb-2 flex items-center justify-between">
					<h1 className="text-2xl font-semibold tracking-tight">Counter</h1>
					<div className="flex items-center gap-2">
						<div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
						<span className="text-xs text-gray-500 capitalize">{connectionStatus}</span>
					</div>
				</div>

				<div className="mb-6 flex items-center justify-center gap-3">
					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-lg font-medium text-gray-900 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
						onClick={handleDecrement}
						disabled={isDecrementing || isResetting}
						aria-label="Decrement"
					>
						{isDecrementing ? <LoadingSpinner size="sm" /> : '-'}
					</button>

					<div className="min-w-[6rem] text-center text-4xl font-bold tabular-nums" aria-live="polite" aria-atomic="true">
						{count}
					</div>

					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-lg font-medium text-gray-900 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
						onClick={handleIncrement}
						disabled={isIncrementing || isResetting}
						aria-label="Increment"
					>
						{isIncrementing ? <LoadingSpinner size="sm" /> : '+'}
					</button>
				</div>

				<div className="mb-6 flex justify-center">
					<button
						className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
						onClick={handleReset}
						disabled={isZero || isResetting}
					>
						{isResetting ? (
							<>
								<LoadingSpinner size="sm" className="mr-2" />
								Resetting...
							</>
						) : (
							'Reset'
						)}
					</button>
				</div>

				<div>
					<h2 className="mb-2 text-sm font-medium text-gray-700">Recent actions</h2>
					<ul className="space-y-1 text-sm">
						{actions.length === 0 ? (
							<li className="text-gray-500">No actions yet</li>
						) : (
							actions.map((action) => (
								<li key={action.id} className="rounded-md bg-gray-50 px-3 py-2 ring-1 ring-inset ring-gray-200">
									{action.label}
								</li>
							))
						)}
					</ul>
				</div>
			</div>
		</main>
	);
}
