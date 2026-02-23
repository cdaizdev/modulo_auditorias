/**
 * Simula el comportamiento de una red con latencia entre 300 y 1200 ms y errores de conexión con una probabilidad
 * de ocurrencia del 15% o la definida en el env.
 */
export const simulateNetwork = async () => {
    const config = useRuntimeConfig();

    const MAXLATENCY = Number(config.public.maxLatency);
    const MINLATENCY = Number(config.public.minLatency);
    const ERRORPROB = Number(config.public.netErrorprob);

    if (import.meta.client) {
        const delay = Math.floor(Math.random() * (MAXLATENCY - MINLATENCY + 1)) + MINLATENCY
        await new Promise(resolve => setTimeout(resolve, delay))

        const shouldFail = Math.random() < ERRORPROB;

        if (shouldFail) {
            throw new Error("Error de conexión con el servidor. Por favor, reintente.")
        }
    }
}