"use client";

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function HomePage() {
	const count = useQuery(api.counter.get) ?? 0;
	const actions = useQuery(api.counter.getActions) ?? [];
	
	const increment = useMutation(api.counter.increment);
	const decrement = useMutation(api.counter.decrement);
	const reset = useMutation(api.counter.reset);

	const handleIncrement = useCallback(() => {
		increment();
	}, [increment]);

	const handleDecrement = useCallback(() => {
		decrement();
	}, [decrement]);

	const handleReset = useCallback(() => {
		reset();
	}, [reset]);

	const isZero = useMemo(() => count === 0, [count]);

	return (
		<main className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
				<h1 className="mb-4 text-center text-2xl font-semibold tracking-tight">Counter</h1>

				<div className="mb-6 flex items-center justify-center gap-3">
					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-lg font-medium text-gray-900 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-200 active:translate-y-px"
						onClick={handleDecrement}
						aria-label="Decrement"
					>
						-
					</button>

					<div className="min-w-[6rem] text-center text-4xl font-bold tabular-nums" aria-live="polite" aria-atomic="true">
						{count}
					</div>

					<button
						className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-lg font-medium text-gray-900 ring-1 ring-inset ring-gray-200 transition hover:bg-gray-200 active:translate-y-px"
						onClick={handleIncrement}
						aria-label="Increment"
					>
						+
					</button>
				</div>

				<div className="mb-6 flex justify-center">
					<button
						className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
						onClick={handleReset}
						disabled={isZero}
					>
						Reset
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
