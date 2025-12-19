"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { appointmentSchema } from "@/lib/validation";
import isomorphPurify from "isomorphic-dompurify";

type ActionState = {
  error?: string;
  success?: boolean;
} | null;

export async function createAppointment(prevState: ActionState, formData: FormData) {
    await new Promise(res => setTimeout(res, 1000));

    const rawName = formData.get("name") as string;
    const rawDate = formData.get("date") as string;
    const cleanName = isomorphPurify.sanitize(rawName, {ALLOWED_TAGS: []}).trim();
    const rawData = { name: cleanName, date: rawDate };
    const validateFields = appointmentSchema.safeParse(rawData);

    if (!validateFields.success)
    {
        const firstError = validateFields.error.issues[0]?.message;
        return { error: firstError || "Dados inválidos." };
    };
   
    const { name, date } = validateFields.data;
   
    try 
    {   
       await prisma.appointment.create({
            data: {
                name: name,
                date: new Date(date)
            }}
        );

        revalidatePath("/");
        return { success: true };
    }
    catch (e) { return { error: "Erro ao salvar no banco de dados." }; }
}