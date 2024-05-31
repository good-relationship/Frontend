// import { env } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	// rewrites: async () => {
	// 	return env.NODE_ENV === 'development'
	// 		? [
	// 				{
	// 					source: '/:path*',
	// 					destination: 'http://localhost:8080/:path*',
	// 				},
	// 			]
	// 		: [];
	// },
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/meeting',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
