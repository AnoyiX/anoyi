// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
		return [
			{
				source: '/api/etf',
				destination: `https://yunhq.sse.com.cn:32042/v1/sh1/list/exchange/ebs?select=code%2Cname%2Copen%2Chigh%2Clow%2Clast%2Cprev_close%2Cchg_rate%2Cvolume%2Camount%2Ccpxxextendname%2Ctradephase`,
			},
		]
	},
  experimental: {},
};
module.exports = nextConfig;