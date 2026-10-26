import { neon } from '@neondatabase/serverless';
import fs from 'fs';

// Read .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);
const databaseUrl = match ? match[1] : process.env.DATABASE_URL;

const sql = neon(databaseUrl);

async function setupCategories() {
  console.log("Setting up Neon Postgres categories table...");

  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(128) PRIMARY KEY,
      slug VARCHAR(128) UNIQUE NOT NULL,
      name TEXT NOT NULL,
      short_name VARCHAR(128),
      tagline TEXT,
      image TEXT,
      item_count INTEGER DEFAULT 0,
      subcategories JSONB DEFAULT '[]'::jsonb,
      status VARCHAR(32) DEFAULT 'Active',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("✓ categories table created/verified in Neon Postgres");

  const countRes = await sql`SELECT COUNT(*)::int as count FROM categories`;
  console.log(`Current categories in Neon: ${countRes[0].count}`);

  if (countRes[0].count === 0) {
    console.log("Seeding initial categories into Neon...");
    const productsModule = await import('../src/data/products.js');
    const categories = productsModule.CATEGORIES;

    for (const c of categories) {
      await sql`
        INSERT INTO categories (
          id, slug, name, short_name, tagline, image, item_count, subcategories, status
        ) VALUES (
          ${c.id},
          ${c.slug},
          ${c.name},
          ${c.shortName || c.name},
          ${c.tagline || ''},
          ${c.image || ''},
          ${c.itemCount || 0},
          ${JSON.stringify(c.subcategories || [])},
          'Active'
        ) ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          image = EXCLUDED.image,
          subcategories = EXCLUDED.subcategories;
      `;
    }
    console.log(`✓ Seeded ${categories.length} categories to Neon Postgres!`);
  }

  const result = await sql`SELECT id, name, slug, COUNT(*) OVER() as total FROM categories`;
  console.log("Categories in Neon:", result);
}

setupCategories().catch(console.error);
