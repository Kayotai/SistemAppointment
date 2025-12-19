import { z } from "zod";

export const appointmentSchema = z.object({
    name: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .max(40, "O nome é muito longo."),
    date: z
        .string()
        .min(1 ,"A data e hora são obrigatórias!")
        .refine(val => {
            const selectedDate = new Date(val);
            const isValidate = !isNaN(selectedDate.getTime());
            if (!isValidate) return false;
            const isFullFormat = val.length >= 16;
            const now = new Date();
            return isFullFormat && selectedDate > now;
        }, 
    {
        message: "A data do agendamento deve ser completa e não deve ser no passado."
    })
});