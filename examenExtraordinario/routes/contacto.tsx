import { setCookie } from "$std/http/cookie.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";
import { Contact } from "../types.ts";
import jwt from "jsonwebtoken";
import Contacto from "../components/Contacto.tsx";

export const handler: Handlers = {
    POST: async (req: Request, ctx: FreshContext) => {
        console.log("Introducir Datos");
        const url = new URL(req.url);
        const form = await req.formData();
        const nombre = form.get("name")?.toString() || "";
        const email = form.get("email")?.toString() || "";
        const API_URL = Deno.env.get("API_URL");
        if (!API_URL) {
            throw new Error("No se ha registrado la API");
        }
        const response = await fetch(
            `${API_URL}/contact`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                }),
            },
        );
        if (response.status == 400) {
            return ctx.render({
                message: "Usuario ya existe o datos invalidos",
            });
        }
        if (response.status == 200) {
            const data: Contact = await response.json();
            const token = jwt.sign({
                email: data.email,
                nombre: data.nombre,
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
            headers.set("location", "/");
            return new Response(null, {
                status: 303,
                headers,
            });
        } else {
            return ctx.render();
        }
    },
};
const Page = () => <Contacto />;
export default Page;
