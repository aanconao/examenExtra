const RegistrarDNI = () => (
    <div class="main-container">
        <div class="dni-input-container">
            <label for="DNI">Introducir DNI</label>
            <input
                placeholder="12345678A"
                type="text"
                id="DNI"
                name="DNI"
                required
            />
            <button type="submit">
                Ir a mi Agenda
            </button>
        </div>
    </div>
);
export default RegistrarDNI;
