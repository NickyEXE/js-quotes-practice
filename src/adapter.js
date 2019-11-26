adapter = {
    index: () => {
        return fetch("http://localhost:3000/quotes?_embed=likes")
        .then(res => res.json())
    },
    post: (body) => {
        return fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    },
    like: (id) => {
        return fetch("http://localhost:3000/likes", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({quoteId: id})
        })
        .then(res => res.json())
    },
    delete: (id) => {
        return fetch(`http://localhost:3000/quotes/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
    },
    patch: (id, body) => {
        return fetch(`http://localhost:3000/quotes/${id}`, {
            method: "PATCH",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
    }
}