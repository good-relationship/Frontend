import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	rewrites: async () => {
		return env.NODE_ENV === 'development'
			? [
					{
						source: '/:path*',
						destination: 'http://localhost:8080/:path*',
					},
				]
			: [];
	},
};

export default nextConfig;
