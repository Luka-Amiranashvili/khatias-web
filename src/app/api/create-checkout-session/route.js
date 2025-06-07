"use server";

export async function POST(req) {
  console.log("✅ TEST POST HIT");
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
