import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const results: any = {
    env: {
      has_database_url: !!process.env.DATABASE_URL,
      has_direct_url: !!process.env.DIRECT_URL,
      has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      has_supabase_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
    database: null,
    supabase: null,
  };

  // Test database connection
  try {
    await prisma.project.findMany({ take: 1 });
    results.database = { success: true, message: "Conectado ao banco com sucesso!" };
  } catch (err: any) {
    results.database = {
      success: false,
      message: err?.message || String(err),
      code: err?.code,
      meta: err?.meta,
    };
  }

  // Test Supabase connection / initialization
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      results.supabase = { success: false, message: error.message };
    } else {
      results.supabase = { success: true, message: "Conectado ao Supabase Storage com sucesso!", buckets: data.map(b => b.name) };
    }
  } catch (err: any) {
    results.supabase = {
      success: false,
      message: err?.message || String(err),
    };
  }

  return NextResponse.json(results);
}
