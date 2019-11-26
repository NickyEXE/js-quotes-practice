// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", () => {
    
    // DOM Constants
    const quoteForm = document.getElementById("new-quote-form")
    const quoteList = document.getElementById("quote-list")

    // initialize
    adapter.index().then(renderAllQuotes)

    // render functions
    function renderAllQuotes(quotes){
        quotes.forEach(quote => renderQuote(quote))
    }

    function renderQuote(quote){
        quoteList.innerHTML += `
        <li class='quote-card' >
            <blockquote class="blockquote" data-id=${quote.id}>
                <p class="mb-0">${quote.quote}</p>
                <footer class="blockquote-footer">${quote.author}</footer>
                <br>
                <button class='btn-success like'>Likes: <span>${quote.likes.length}</span></button>
                <button class='btn-primary edit'>Edit</button>
                <button class='btn-danger delete'>Delete</button>
                <br>
                <form style="display: none">
                    <div class="form-group">
                    <label for="edited-quote">Edit Quote</label>
                    <input type="text" class="form-control" value="${quote.quote}" id="new-quote" placeholder="Learn. Love. Code.">
                    </div>
                    <div class="form-group">
                    <label for="Author">Edit Author</label>
                    <input type="text" class="form-control" id="author" value="${quote.author}" placeholder="Flatiron School">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </blockquote>
        </li>`
    }
    
    // event listeners
    quoteForm.addEventListener("submit", postNewQuote)
    quoteList.addEventListener("click", handleClick)
    quoteList.addEventListener("submit", submitEditedQuote)

    // event handlers
    function postNewQuote(e){
        e.preventDefault()
        const quote = e.target["new-quote"].value
        const author = e.target["author"].value

        adapter.post({quote: quote, author: author})
        .then(res => {
            res.likes = []
            renderQuote(res)
        })
        e.target.reset()
    }

    function handleClick(e){
        if(e.target.classList.contains("like")){
            likeQuote(e)
        }
        else if (e.target.classList.contains("delete")){
            deleteQuote(e)
        }
        else if (e.target.classList.contains("edit")){
            editQuote(e)
        }
    }

    function likeQuote(e){
        const likes = parseInt(e.target.querySelector("span").innerText)
        const id = parseInt(e.target.parentElement.dataset.id)
        adapter.like(id)
        .then(res => e.target.innerHTML = `Likes: <span>${likes+1}</span>` )
    }
    
    function editQuote(e){
        const form = e.target.parentElement.querySelector("form")
        form.style.display === "none" ? form.style.display = "block" : form.style.display = "none"
        console.log(e.target)
    }

    function submitEditedQuote(e){
        e.preventDefault()
        const quote = e.target["new-quote"].value
        const author = e.target["author"].value
        const id = parseInt(e.target.parentElement.dataset.id)
        adapter.patch(id, {quote: quote, author: author})
        .then(res => updateOnDOM(res))

        function updateOnDOM(res){
            let quoteCard = e.target.parentElement
            quoteCard.querySelector("p").innerText = res.quote
            quoteCard.querySelector(".blockquote-footer").innerText = res.author
            e.target.style.display === "none" ? e.target.style.display = "block" : e.target.style.display = "none"
        }
    }

    function deleteQuote(e){
        const id = parseInt(e.target.parentElement.dataset.id)
        adapter.delete(id).then(() => e.target.parentElement.parentElement.remove())
    }



















})