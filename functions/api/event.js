export async function onRequestPost(context) {

    try {

        const data = await context.request.json();

        const event = data.event || "unknown";
        const product = data.product || null;

        const country =
            context.request.headers.get("CF-IPCountry") || "XX";

        const timestamp = new Date().toISOString();

        await context.env.DB
            .prepare(`
                INSERT INTO events
                (event, product, timestamp, country)
                VALUES (?, ?, ?, ?)
            `)
            .bind(
                event,
                product,
                timestamp,
                country
            )
            .run();

        return new Response(
            JSON.stringify({ success: true }),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {

        return new Response(
            JSON.stringify({
                success: false
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }
}