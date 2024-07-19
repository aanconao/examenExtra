import { setCookie } from "$std/http/cookie.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { Contact } from "../types.ts";
import RegistrarDNI from "../components/RegistrarDNI.tsx";

export const handler: Handlers = {
    POST: async (req: Request, ctx: FreshContext) => {
        console.log("register handler");
        const url = new URL(req.url);
        const form = await req.formData();
        const DNI = form.get("DNI")?.toString() || "";
        const API_URL = Deno.env.get("API_URL");
        if (!API_URL) {
            throw new Error("No se ha registrado la API");
        }
        const response = await fetch(
            `${API_URL}/contacto`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    DNI,
                }),
            },
        );
        if (response.status == 400) {
            return ctx.render({ message: "DNI ya introducido " });
        }
        if (response.status == 400) {
            return ctx.render({
                message: "Usuario ya existe o datos invalidos",
            });
        }
        if (response.status == 200) {
            const data: Contact = await response.json();
            const token = jwt.sign({
                DNI: data.DNI,
            });
            const headers = new Headers();
            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true,
            });
            headers.set("location", "/contacto");
            return new Response(null, {
                status: 303,
                headers,
            });
        } else {
            return ctx.render();
        }
    },
};
const Page = () => <RegistrarDNI />;
export default Page;
