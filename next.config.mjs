function apiImagePatterns() {
  const patterns = [
    {
      protocol: 'http',
      hostname: '127.0.0.1',
      port: '8011',
      pathname: '/**',
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '8011',
      pathname: '/**',
    },
  ];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return patterns;
  }

  try {
    const parsed = new URL(apiUrl);
    patterns.push({
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port,
      pathname: '/**',
    });
  } catch {
    // Keep local defaults when the env value is absent or malformed.
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: apiImagePatterns(),
  },
  async redirects() {
    return [
      {
        source: '/products/:path*',
        destination: '/catalog/:path*',
        permanent: false,
      },
      {
        source: '/cart',
        destination: '/inquiry',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
