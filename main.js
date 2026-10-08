fetch("/api/event", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        event: "visit"
    })
});

document.querySelectorAll(".product-button").forEach(button => {

    button.addEventListener("click", () => {

        fetch("/api/event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event: "click",
                product: button.dataset.product
            }),
            keepalive: true
        });

    });

});