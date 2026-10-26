import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const databaseUrl = env.DATABASE_URL || env.VITE_DATABASE_URL || process.env.DATABASE_URL || '';
  const databaseUrlUnpooled = env.DATABASE_URL_UNPOOLED || env.VITE_DATABASE_URL_UNPOOLED || process.env.DATABASE_URL_UNPOOLED || '';
  const neonBranch = env.NEON_BRANCH || env.VITE_NEON_BRANCH || process.env.NEON_BRANCH || 'production';

  return {
    plugins: [
      tailwindcss(),
      react(),
    ],
    define: {
      'process.env.DATABASE_URL': JSON.stringify(databaseUrl),
      'process.env.DATABASE_URL_UNPOOLED': JSON.stringify(databaseUrlUnpooled),
      'process.env.NEON_BRANCH': JSON.stringify(neonBranch),
    },
  };
});
