import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const match = envContent.match(/DATABASE_URL="([^"]+)"/);
const databaseUrl = match ? match[1] : process.env.DATABASE_URL;

const sql = neon(databaseUrl);

async function verify() {
  console.log("=== NEON LAKEBASE POSTGRES DATABASE VERIFICATION ===");
  
  const ping = await sql`SELECT NOW() as server_time, current_database() as db_name, version()`;
  console.log("1. Live Server Ping:", ping[0]);

  const products = await sql`SELECT COUNT(*)::int as count, MIN(name) as sample_product FROM products`;
  console.log("2. Products Table:", products[0]);

  const orders = await sql`SELECT id, customer_name, customer_email, total_amount, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5`;
  console.log(`3. Orders Table (${orders.length} records):`, orders);

  const inquiries = await sql`SELECT id, name, email, subject, message, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5`;
  console.log(`4. Inquiries Table (${inquiries.length} records):`, inquiries);
}

verify().catch(console.error);
