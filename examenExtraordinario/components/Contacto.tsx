const Contactos = () => (
    <div class="contacts-container">
        <div class="add-contact-container">
            <form class="add-contact-container form">
                <label class="add-contact-container label" for="nombre">
                    Nombre:
                </label>
                <input
                    class="add-contact-container input"
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                />
                <label class="add-contact-container label" for="email">
                    Email:
                </label>
                <input
                    class="add-contact-container input"
                    type="text"
                    id="email"
                    name="email"
                    required
                />
            </form>

            <button class="add-contact-container button" type="submit">
                Añadir
            </button>
        </div>
    </div>
);
export default Contactos;
