"use server";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/db";
import { projectSchema } from "@/validators/projects";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function checkAdmin() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_session")?.value;
  return adminToken === "admluiz";
}

export async function createProject(formData: FormData) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return { success: false, error: "Não autorizado." };
    }

    const rawTitle = formData.get("title") as string;
    const rawDescription = formData.get("description") as string;
    const rawGithubUrl = formData.get("githubUrl") as string;
    const rawLiveUrl = formData.get("liveUrl") as string;
    const rawTechnologies = formData.get("technologies") as string;
    const rawFeatured = formData.get("featured") === "true";
    const imageFile = formData.get("image") as File;

    const validation = projectSchema.safeParse({
      title: rawTitle,
      description: rawDescription,
      githubUrl: rawGithubUrl || "",
      liveUrl: rawLiveUrl || "",
      technologies: rawTechnologies,
      featured: rawFeatured,
    });

    if (!validation.success) {
      return { success: false, error: "Dados inválidos no formulário." };
    }

    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: "Por favor, envie uma imagem do projeto." };
    }

    const supabase = await createClient();

    // 1. Upload image to Supabase Storage bucket "projects"
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, fileBuffer, {
        contentType: imageFile.type,
        duplex: "half",
      } as any);

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return { success: false, error: "Erro ao subir imagem no Storage. Verifique se o bucket 'projects' existe." };
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);

    // 3. Save to database via Prisma
    const project = await prisma.project.create({
      data: {
        title: validation.data.title,
        description: validation.data.description,
        image: publicUrl,
        githubUrl: validation.data.githubUrl || null,
        liveUrl: validation.data.liveUrl || null,
        technologies: validation.data.technologies,
        featured: validation.data.featured,
      },
    });

    revalidatePath("/");
    return { success: true, project };
  } catch (err: any) {
    console.error("Erro ao criar projeto:", err);
    return { success: false, error: err?.message || "Erro interno no servidor ao cadastrar projeto." };
  }
}

export async function updateProject(projectId: string, formData: FormData) {
  try {
    const isAdmin = await checkAdmin();
    if (!isAdmin) {
      return { success: false, error: "Não autorizado." };
    }

    const rawTitle = formData.get("title") as string;
    const rawDescription = formData.get("description") as string;
    const rawGithubUrl = formData.get("githubUrl") as string;
    const rawLiveUrl = formData.get("liveUrl") as string;
    const rawTechnologies = formData.get("technologies") as string;
    const rawFeatured = formData.get("featured") === "true";
    const imageFile = formData.get("image") as File;

    const validation = projectSchema.safeParse({
      title: rawTitle,
      description: rawDescription,
      githubUrl: rawGithubUrl || "",
      liveUrl: rawLiveUrl || "",
      technologies: rawTechnologies,
      featured: rawFeatured,
    });

    if (!validation.success) {
      return { success: false, error: "Dados inválidos no formulário." };
    }

    const supabase = await createClient();

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return { success: false, error: "Projeto não encontrado." };
    }

    let imageUrl = existingProject.image;

    // If new image file is provided
    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const fileBuffer = Buffer.from(await imageFile.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, fileBuffer, {
          contentType: imageFile.type,
          duplex: "half",
        } as any);

      if (uploadError) {
        return { success: false, error: "Erro no upload da nova imagem." };
      }

      const { data: { publicUrl } } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      imageUrl = publicUrl;

      // Delete the old image file
      try {
        const oldFileName = existingProject.image.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("projects").remove([oldFileName]);
        }
      } catch (delErr) {
        console.warn("Could not delete old image:", delErr);
      }
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: validation.data.title,
        description: validation.data.description,
        image: imageUrl,
        githubUrl: validation.data.githubUrl || null,
        liveUrl: validation.data.liveUrl || null,
        technologies: validation.data.technologies,
        featured: validation.data.featured,
      },
    });

    revalidatePath("/");
    return { success: true, project: updatedProject };
  } catch (err: any) {
    console.error("Erro ao atualizar projeto:", err);
    return { success: false, error: err?.message || "Erro interno no servidor ao atualizar o projeto." };
  }
}

export async function deleteProject(projectId: string) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return { success: false, error: "Não autorizado." };
  }

  try {
    const supabase = await createClient();

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      return { success: false, error: "Projeto não encontrado." };
    }

    // Delete image from storage
    try {
      const fileName = existingProject.image.split("/").pop();
      if (fileName) {
        await supabase.storage.from("projects").remove([fileName]);
      }
    } catch (storageErr) {
      console.warn("Erro ao deletar imagem do storage:", storageErr);
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    console.error("Erro ao deletar projeto:", err);
    return { success: false, error: "Erro interno ao deletar projeto." };
  }
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return { success: true, projects };
  } catch (err: any) {
    console.error("Erro ao carregar projetos:", err);
    return { success: false, error: "Erro ao carregar projetos do banco de dados.", projects: [] };
  }
}

