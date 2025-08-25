import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Task Counter',
	description: 'A simple counter app with action history',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen">
				{children}
			</body>
		</html>
	);
}
