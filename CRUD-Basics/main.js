let formbtn = document.getElementById("post-btn")
let input = document.getElementById("input")
let msg = document.getElementById("msg")
let posts = document.getElementById("posts")

formbtn.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Button clicked!")
    formValidation()
    input.value = ""
})

let formValidation = () => {
    if (input.value === "") {
        msg.textContent = "Post can not be blank"
    } else {
        console.log("Success!")
        msg.textContent = ""
        acceptData()
    }
}

let data = {}
let acceptData = () => {
    data["text"] = input.value
    console.log(data)
    createPost()
}

let createPost = () => {
    posts.innerHTML += `<div><p>${data.text}</p><span class="options">
    <i onClick="editPost(this)" class="fas fa-edit"></i>
    <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
  </span></div>`
}

let deletePost = (post) => {
    post.parentElement.parentElement.remove()
}

let editPost = (post) => {
    input.value = post.parentElement.previousElementSibling.innerHTML
    deletePost(post)
}
