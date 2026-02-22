/**
 * Simula el comportamiento de una red con latencia entre 300 y 1200 ms y errores de conexión con una probabilidad
 * de ocurrencia del 15%.
 */
export const simulateNetwork = async () => {
    if (import.meta.client) {
        const delay = Math.floor(Math.random() * (1200 - 300 + 1)) + 300
        await new Promise(resolve => setTimeout(resolve, delay))

        const shouldFail = Math.random() < 0.15
        if (shouldFail) {
            throw new Error("Error de conexión con el servidor. Por favor, reintente.")
        }
    }
}