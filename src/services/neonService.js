import { neon } from '@neondatabase/serverless';

// Retrieve database URL from Vite env or defined process.env
const DATABASE_URL = 
  import.meta.env?.VITE_DATABASE_URL || 
  process.env?.DATABASE_URL || 
  '';

export const isNeonConfigured = Boolean(DATABASE_URL);

let sqlClient = null;

export function getNeonSql() {
  if (!DATABASE_URL) {
    console.warn('[Neon] No DATABASE_URL configured.');
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(DATABASE_URL);
  }
  return sqlClient;
}

/**
 * Health check: tests live connection to Neon Lakebase Postgres
 */
export async function checkNeonConnection() {
  const sql = getNeonSql();
  if (!sql) {
    return {
      connected: false,
      error: 'DATABASE_URL is not set',
      branch: import.meta.env?.VITE_NEON_BRANCH || process.env?.NEON_BRANCH || 'unknown',
    };
  }

  const start = performance.now();
  try {
    const rows = await sql`
      SELECT 
        1 as ping,
        NOW() as server_time,
        current_database() as database_name,
        version() as pg_version,
        (SELECT COUNT(*)::int FROM products) as products_count,
        (SELECT COUNT(*)::int FROM orders) as orders_count,
        (SELECT COUNT(*)::int FROM inquiries) as inquiries_count
    `;
    const latencyMs = Math.round(performance.now() - start);

    return {
      connected: true,
      latencyMs,
      branch: import.meta.env?.VITE_NEON_BRANCH || process.env?.NEON_BRANCH || 'production',
      database: rows[0]?.database_name,
      serverTime: rows[0]?.server_time,
      version: rows[0]?.pg_version,
      stats: {
        products: rows[0]?.products_count ?? 0,
        orders: rows[0]?.orders_count ?? 0,
        inquiries: rows[0]?.inquiries_count ?? 0,
      }
    };
  } catch (error) {
    console.error('[Neon] Connection check failed:', error);
    return {
      connected: false,
      error: error.message || 'Failed to query Neon Postgres',
      branch: import.meta.env?.VITE_NEON_BRANCH || process.env?.NEON_BRANCH || 'production',
    };
  }
}

/**
 * Fetch all products from Neon Postgres
 */
export async function fetchProductsFromNeon() {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    const rows = await sql`SELECT * FROM products ORDER BY id ASC`;
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      category: r.category,
      categoryName: r.category_name,
      room: r.room,
      price: Number(r.price),
      originalPrice: Number(r.original_price || r.price),
      discount: Number(r.discount || 0),
      rating: Number(r.rating || 4.8),
      reviewCount: Number(r.review_count || 0),
      badge: r.badge,
      material: r.material,
      finish: r.finish,
      dimensions: r.dimensions,
      weight: r.weight,
      warranty: r.warranty,
      deliveryDays: Number(r.delivery_days || 3),
      inStock: Boolean(r.in_stock),
      images: typeof r.images === 'string' ? JSON.parse(r.images) : (r.images || []),
      description: r.description,
      highlights: typeof r.highlights === 'string' ? JSON.parse(r.highlights) : (r.highlights || []),
      features: typeof r.features === 'string' ? JSON.parse(r.features) : (r.features || {})
    }));
  } catch (err) {
    console.error('[Neon] Failed to fetch products from Postgres:', err);
    return null;
  }
}

/**
 * Persist an order into Neon Postgres
 */
export async function saveOrderToNeon(order) {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    await sql`
      INSERT INTO orders (
        id,
        customer_name,
        customer_email,
        customer_phone,
        items,
        total_amount,
        status,
        shipping_address,
        payment_method,
        created_at
      ) VALUES (
        ${order.id},
        ${order.customerName || order.customer?.name || 'Valued Customer'},
        ${order.customerEmail || order.customer?.email || 'customer@example.com'},
        ${order.customerPhone || order.customer?.phone || ''},
        ${JSON.stringify(order.items || [])},
        ${Number(order.totalAmount || order.total || 0)},
        ${order.status || 'Pending'},
        ${JSON.stringify(order.shippingAddress || {})},
        ${order.paymentMethod || 'Prepaid UPI'},
        ${order.createdAt ? new Date(order.createdAt) : new Date()}
      )
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        total_amount = EXCLUDED.total_amount;
    `;
    console.log(`[Neon] Successfully stored order ${order.id} in Postgres!`);
    return true;
  } catch (err) {
    console.error(`[Neon] Failed to save order ${order.id}:`, err);
    return false;
  }
}

/**
 * Save customer contact message / inquiry into Neon Postgres
 */
export async function saveInquiryToNeon(inquiry) {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    const res = await sql`
      INSERT INTO inquiries (
        name,
        email,
        phone,
        subject,
        message,
        status
      ) VALUES (
        ${inquiry.name},
        ${inquiry.email},
        ${inquiry.phone || ''},
        ${inquiry.subject || 'General Inquiry'},
        ${inquiry.message},
        'New'
      )
      RETURNING id, created_at;
    `;
    console.log(`[Neon] Stored contact inquiry #${res[0]?.id} in Postgres!`);
    return res[0];
  } catch (err) {
    console.error('[Neon] Failed to save contact inquiry:', err);
    return null;
  }
}

/**
 * Fetch orders from Neon Postgres
 */
export async function fetchOrdersFromNeon() {
  const sql = getNeonSql();
  if (!sql) return [];

  try {
    const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
    return rows.map(r => ({
      id: r.id,
      customerName: r.customer_name,
      customerEmail: r.customer_email,
      customerPhone: r.customer_phone,
      items: typeof r.items === 'string' ? JSON.parse(r.items) : (r.items || []),
      totalAmount: Number(r.total_amount),
      status: r.status,
      shippingAddress: typeof r.shipping_address === 'string' ? JSON.parse(r.shipping_address) : (r.shipping_address || {}),
      paymentMethod: r.payment_method,
      createdAt: r.created_at
    }));
  } catch (err) {
    console.error('[Neon] Failed to fetch orders from Postgres:', err);
    return [];
  }
}

/**
 * Fetch contact inquiries from Neon Postgres
 */
export async function fetchInquiriesFromNeon() {
  const sql = getNeonSql();
  if (!sql) return [];

  try {
    const rows = await sql`SELECT * FROM inquiries ORDER BY created_at DESC`;
    return rows;
  } catch (err) {
    console.error('[Neon] Failed to fetch inquiries from Postgres:', err);
    return [];
  }
}
