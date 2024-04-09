/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	async rewrites() {
		return process.env.NODE_ENV === 'development'
			? [
					{
						source: '/:path*',
						destination: 'http://localhost:8080/:path*',
					},
				]
			: [];
	},
};

module.exports = nextConfig;
