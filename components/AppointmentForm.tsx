"use client"

import { createAppointment } from "@/app/actions";
import { useActionState } from "react";

export default function AppointmentForm()
{
    const [state, formAction, isPending] = useActionState(createAppointment, null)
    return(
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Agendar Horário</h2>
            
            <form action={formAction} className="flex flex-col gap-4">     
                <div>
                <label className="block text-sm font-medium">Nome Completo</label>
                <input 
                    type="text" 
                    name="name" // 
                    required 
                    className="w-full border p-2 rounded"
                />
                </div>

                <div>
                <label className="block text-sm font-medium">Data e Hora</label>
                <input 
                    type="datetime-local" 
                    name="date" 
                    required 
                    className="w-full border p-2 rounded"
                />
                </div>

                <button 
                type="submit" 
                disabled={isPending}
                className="bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
                >
                {isPending ? "Agendando..." : "Confirmar Agendamento"}
                </button>

                {state?.success && <p className="text-green-600">Agendado com sucesso!</p>}
                {state?.error && <p className="text-red-600">{state.error}</p>}
            </form>
        </div>
  );
}
