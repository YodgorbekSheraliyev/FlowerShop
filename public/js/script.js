const wrapper = document.querySelector('.wrapper')
const body = document.querySelector('body')

wrapper.addEventListener("click", e => {
  const commentLink = e.target;
  const id = commentLink.dataset.id;
  body.classList.add('blur')
  const comment = document.createElement('div')
  comment.classList.add("position-absolute", "position-absolute","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-50", "bg-light", "border-5", "p-3", "py-5")
  comment.innerHTML = `
  <form class="border p-3 w-75  rounded-1" action="/flowers/comment/${id}" method="post" enctype="application/x-www-form-urlencoded">
    <div class="row mb-3">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email:</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" name="email" id="inputEmail3">
      </div>
    </div>
    <div class="form-floating mb-3">
      <textarea class="form-control" name="comment" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
      <label for="floatingTextarea">Izoh qoldirish</label>
    </div>
    </div>
    <button type="submit" class="btn btn-primary align-content-end">Jo'natish</button>
    <button type="button" class="comment-cancel-btn btn btn-secondary">Bekor qilish</button>
  </form>
  `
  body.append(comment)
  const cancelButton = document.querySelector(".comment-cancel-btn")
  cancelButton.addEventListener('click', removeComment)
  function removeComment(){
    body.removeChild(comment)
  }
})