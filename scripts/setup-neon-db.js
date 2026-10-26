import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Load .env.local
let databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf-8');
  const match = envContent.match(/DATABASE_URL="([^"]+)"/);
  if (match) databaseUrl = match[1];
}

if (!databaseUrl) {
  console.error("No DATABASE_URL found in environment or .env.local");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function setupDatabase() {
  console.log("Setting up Neon Postgres schema for Mukund Woodline...");

  // 1. Create Products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      name TEXT NOT NULL,
      category VARCHAR(64) NOT NULL,
      category_name VARCHAR(128),
      room VARCHAR(64),
      price NUMERIC NOT NULL,
      original_price NUMERIC,
      discount INTEGER,
      rating NUMERIC DEFAULT 4.8,
      review_count INTEGER DEFAULT 0,
      badge VARCHAR(64),
      material TEXT,
      finish VARCHAR(128),
      dimensions TEXT,
      weight VARCHAR(64),
      warranty VARCHAR(128),
      delivery_days INTEGER DEFAULT 3,
      in_stock BOOLEAN DEFAULT true,
      images JSONB DEFAULT '[]'::jsonb,
      description TEXT,
      highlights JSONB DEFAULT '[]'::jsonb,
      features JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("✓ products table created/verified");

  // 2. Create Orders table
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(64) PRIMARY KEY,
      customer_name VARCHAR(128) NOT NULL,
      customer_email VARCHAR(128) NOT NULL,
      customer_phone VARCHAR(32),
      items JSONB NOT NULL DEFAULT '[]'::jsonb,
      total_amount NUMERIC NOT NULL,
      status VARCHAR(32) DEFAULT 'Pending',
      shipping_address JSONB,
      payment_method VARCHAR(64) DEFAULT 'Prepaid UPI',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("✓ orders table created/verified");

  // 3. Create Inquiries table (Contact form)
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL,
      phone VARCHAR(32),
      subject VARCHAR(256),
      message TEXT NOT NULL,
      status VARCHAR(32) DEFAULT 'New',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("✓ inquiries table created/verified");

  // 4. Seed initial products if empty
  const countRes = await sql`SELECT COUNT(*)::int as count FROM products`;
  console.log(`Current products count: ${countRes[0].count}`);

  if (countRes[0].count === 0) {
    console.log("Seeding products into Neon Postgres...");
    // Import products from src/data/products.js
    const productsModule = await import('../src/data/products.js');
    const products = productsModule.PRODUCTS;

    for (const p of products) {
      await sql`
        INSERT INTO products (
          id, name, category, category_name, room, price, original_price,
          discount, rating, review_count, badge, material, finish,
          dimensions, weight, warranty, delivery_days, in_stock,
          images, description, highlights, features
        ) VALUES (
          ${p.id}, ${p.name}, ${p.category}, ${p.categoryName || ''}, ${p.room || ''},
          ${p.price}, ${p.originalPrice || p.price}, ${p.discount || 0},
          ${p.rating || 4.8}, ${p.reviewCount || 0}, ${p.badge || null},
          ${p.material || ''}, ${p.finish || ''}, ${p.dimensions || ''},
          ${p.weight || ''}, ${p.warranty || ''}, ${p.deliveryDays || 3},
          ${p.inStock !== false}, ${JSON.stringify(p.images || [])},
          ${p.description || ''}, ${JSON.stringify(p.highlights || [])},
          ${JSON.stringify(p.features || {})}
        ) ON CONFLICT (id) DO NOTHING;
      `;
    }
    console.log(`✓ Successfully seeded ${products.length} products to Neon Postgres!`);
  }

  // 5. Query verification
  const check = await sql`
    SELECT 
      (SELECT COUNT(*) FROM products) as products_count,
      (SELECT COUNT(*) FROM orders) as orders_count,
      (SELECT COUNT(*) FROM inquiries) as inquiries_count
  `;
  console.log("Database status summary:", check[0]);
}

setupDatabase().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
