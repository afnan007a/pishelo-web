const WebpackObfuscator = require("webpack-obfuscator");

const prodplugins = [
  new WebpackObfuscator({
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          deadCodeInjection: true,
          debugProtection: true,
          identifierNamesGenerator: "mangled",
          selfDefending: true,
          stringArrayEncoding: ['rc4', 'base64'],
    })
]
const prodrules = [

];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    runtime: "edge",
    serverComponents: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      // Include Production Plugins
      if (prodplugins) config.plugins.push(...prodplugins);

      // Simplify and Minify CSS Classes
      if (prodrules) config.module.rules.push(...prodrules);
    }

    return config;
  },
};

module.exports = nextConfig;
