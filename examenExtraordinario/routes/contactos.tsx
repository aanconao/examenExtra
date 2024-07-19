import { FreshContext, Handlers } from "$fresh/server.ts";
import { Contact } from "../types.ts";

type State = {
    DNI: string;
    nombre: string;
    email: string;
};
type Data = {
    contacts: Contact[];
    DNI: string;
};

export const handler: Handlers<Data, State> = {
    GET: async (_req: Request, ctx: FreshContext<State, Date>) => {
        const userDNI = ctx.state.DNI;
        const API_URL = Deno.env.get("API_URL");
        if (!API_URL) {
            throw new Error("No se ha encontrado la api");
        }
        const response = await fetch(`${API_URL}/contacts/${userDNI}`);
        const contactos: Contact[] = await response.json();
        return ctx.render({ contacts, userDNI });
    },
};
