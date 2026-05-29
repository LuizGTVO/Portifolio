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

  // Test Supabase connection / initialization / upload
  try {
    const supabase = await createClient();
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      results.supabase = { success: false, message: bucketError.message };
    } else {
      // Try a test upload
      const testFileName = `test_upload_${Date.now()}.txt`;
      const testFileContent = "test connection";
      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(testFileName, Buffer.from(testFileContent), {
          contentType: "text/plain",
          duplex: "half",
        } as any);

      if (uploadError) {
        results.supabase = {
          success: false,
          message: `Conectou, listou buckets [${buckets.map(b => b.name).join(", ")}], mas FALHOU no upload para o bucket 'projects': ${uploadError.message}`,
          errorDetails: uploadError,
        };
      } else {
        // Clean up
        await supabase.storage.from("projects").remove([testFileName]);
        results.supabase = {
          success: true,
          message: "Conectado ao Supabase Storage e Upload testado com SUCESSO!",
          buckets: buckets.map(b => b.name),
        };
      }
    }
  } catch (err: any) {
    results.supabase = {
      success: false,
      message: err?.message || String(err),
    };
  }

  return NextResponse.json(results);
}
