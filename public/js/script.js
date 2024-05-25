const wrapper = document.querySelector('.wrapper')
const body = document.querySelector('body')
const adminTBody = document.querySelector('.admin_tbody')
const adminTBody2 = document.querySelector('#admin_tbody2')
const addFlowerBtn = document.querySelector('.add_flower-btn')

if(wrapper !== null){
  wrapper.addEventListener("click", e => { 
    const commentLink = e.target;
    const commentBtn = e.target.dataset.comment
    const id = commentLink.dataset.id;
    const comment = document.createElement('div')
    comment.classList.add("position-absolute","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-50", "bg-light", "border-5", "p-3", "py-5")
    comment.innerHTML = `
    <form class="comment_form border p-3 w-75  rounded-1" action="/flowers/comment/${id}" method="post" enctype="application/x-www-form-urlencoded">
      <div class="row mb-3 email_wrapper">
        <label for="inputEmail3" class="col-sm-2 col-form-label">Email:</label>
        <div class="col-sm-10">
          <input required type="email" class="form-control comment_email" name="email" id="inputEmail3">
        </div>
      </div>
      <div class="row form-floating mb-3">
        <textarea required class="form-control comment_text"  name="comment" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label for="floatingTextarea">Izoh qoldirish</label>
      </div>
      </div>
      <button type="submit" class="btn btn-primary align-content-end">Jo'natish</button>
      <button type="button" class="comment-cancel-btn btn btn-secondary">Bekor qilish</button>
    </form>
    `
      if(commentBtn){
        body.append(comment)
      }
      const cancelButton = document.querySelector(".comment-cancel-btn")
      cancelButton.addEventListener('click', removeComment)
      const commentForm = document.querySelector('.comment_form')
      const emailDiv = document.querySelector('.email_wrapper')
      const errorText = document.createElement('h3').innerText = "Barchasini to'ldiring"
      console.log(email.value)
       
      if(!email.value || !textArea.value){
        commentForm.insertBefore(errorText, emailDiv)
      }
      function removeComment(){
      body.removeChild(comment)
    }
    const form = new FormData(commentForm)
    const email = form.get("email")
    const textarea = form.get("comment")
    form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
  })
}


if(addFlowerBtn !== null){
  addFlowerBtn.addEventListener('click', () => {
    const commentBtn = document.querySelector('.comment__view-btn')
    const modal = document.createElement('div')
    modal.classList.add("position-absolute", "position-absolute","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-100", "border-5", "p-3", "py-5")
    modal.innerHTML =  `
    <form class=" w-75 bg-light border top-0  p-3 rounded-1" action="/admins/flower/create" method="post" enctype="application/x-www-form-urlencoded">
    <h2 class='fs-4 text-center mb-2 fw-bold'>Gul qo'shish</h2>
      <div class="row mb-3">
        <label for="title" class="col-sm-2 col-form-label">Nomi:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="title" id="title">
        </div>
      </div>
      <div class="row mb-3">
        <label for="description" class="col-sm-2 col-form-label">Batafsil ma'lumot:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="description" id="description">
        </div>
      </div>
      <div class="row mb-3">
        <label for="imageUrl" class="col-sm-2 col-form-label">Rasm manzili:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" name="imageUrl" id="imageUrl">
        </div>
      </div>
      <div class="row mb-3">
        <label for="amount" class="col-sm-2 col-form-label">Miqdor:</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" name="amount" id="amount">
        </div>
      </div>
      <div class="row mb-3">
        <label for="price" class="col-sm-2 col-form-label">Narx:</label>
        <div class="col-sm-10">
          <input type="number" class="form-control" name="price" id="price">
        </div>
      </div>
      <div class="row mb-3 d-flex">
        <label for="status" class="col-sm-2 col-form-label">Xolat:</label>
          <div class="col-sm-10">
            <select class="form-select" name="status" aria-label="Default select example">
              <option value="available">Mavjud</option>
              <option value="unavailable">Mavjud emas</option>
              <option value="pending">Kutilmoqda</option>
              <option value="delivered">Yetkazilgan</option>
              <option value="rejected">Bekor qilingan</option>
            </select>
          </div>
      </div>
      
      </div>
      <button type="submit" class="btn btn-primary align-content-end">Qo'shish</button>
      <button type="button" class="add_flower-cancel-btn btn btn-secondary">Bekor qilish</button>
  </form>
    `
  
    body.append(modal)
    const cancelBtn = document.querySelector('.add_flower-cancel-btn')
    cancelBtn.addEventListener('click', removeModal)
    function removeModal(){
      body.removeChild(modal)
    }
  })
}

if(adminTBody !== null){
  adminTBody.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    const resid = e.target.dataset.resid
    const amount = e.target.dataset.amount
    const price = e.target.dataset.price
    const status = e.target.dataset.status

      const modal = document.createElement('div')
      modal.classList.add("position-fixed", "position-absolute","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-100", "border-5", "p-3", "py-5")
      modal.innerHTML =  `
      <form class=" w-75 bg-light border top-0  p-3 rounded-1" action="/admins/reservation/edit/${id}/${resid}" method="post" enctype="application/x-www-form-urlencoded">
      <h2 class='fs-4 text-center mb-2 fw-bold'>Buyurtmani boshqarish</h2>
        <div class="row mb-3">
          <label for="amount" class="col-sm-2 col-form-label">Miqdor:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" value="${amount}" name="amount" id="amount">
          </div>
        </div>
        <div class="row mb-3">
          <label for="price" class="col-sm-2 col-form-label">Narx:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" readonly value="${price}" name="price" id="price">
          </div>
        </div>
        <div class="row mb-3 d-flex">
          <label for="status" class="col-sm-2 col-form-label">Xolat:</label>
            <div class="col-sm-10">
              <select class="form-select" name="status" value="${status}" aria-label="Default select example">
                <option value="pending">Kutilmoqda</option>
                <option value="delivered">Yetkazilgan</option>
                <option value="rejected">Bekor qilingan</option>
              </select>
            </div>
        </div>
        
        </div>
        <button type="submit" class="btn btn-primary align-content-end">Saqlash</button>
        <button type="button" class="reservation__cancel-btn btn btn-secondary">Bekor qilish</button>
    </form>
      `
    if(e.target.dataset.resedit){
      body.append(modal)
    }
      const cancelBtn = document.querySelector('.reservation__cancel-btn')
      cancelBtn.addEventListener('click', removeModal)
      function removeModal(){
        body.removeChild(modal)
      }
  })

}
if(adminTBody2 !== null){
  adminTBody2.addEventListener('click', (e) => {
    console.log('first')
    const editBtn = e.target
    console.log(editBtn)
    const id = e.target.dataset.id
    const title = e.target.dataset.title
    const description = e.target.dataset.description
    const imageUrl = e.target.dataset.imageurl
    const amount = e.target.dataset.amount
    const price = e.target.dataset.price
    const status = e.target.dataset.status
    const comments = e.target.dataset.comments

      const modal = document.createElement('div')
      modal.classList.add( "position-fixed","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-100", "border-5", "p-3", "py-5")
      modal.innerHTML =  `
      <form class=" w-75 bg-light border top-0  p-3 rounded-1" action="/admins/flower/edit/${id}" method="post" enctype="application/x-www-form-urlencoded">
      <h2 class='fs-4 text-center mb-2 fw-bold'>Gul qo'shish</h2>
        <div class="row mb-3">
          <label for="title" class="col-sm-2 col-form-label">Nomi:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" value="${title}" name="title" id="title">
          </div>
        </div>
        <div class="row mb-3">
          <label for="description" class="col-sm-2 col-form-label">Batafsil ma'lumot:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" value="${description}" name="description" id="description">
          </div>
        </div>
        <div class="row mb-3">
          <label for="imageUrl" class="col-sm-2 col-form-label">Rasm manzili:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" value="${imageUrl}" name="imageUrl" id="imageUrl">
          </div>
        </div>
        <div class="row mb-3">
          <label for="amount" class="col-sm-2 col-form-label">Miqdor:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" value="${amount}" name="amount" id="amount">
          </div>
        </div>
        <div class="row mb-3">
          <label for="price" class="col-sm-2 col-form-label">Narx:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" value="${price}" name="price" id="price">
          </div>
        </div>
        <div class="row mb-3 d-flex">
          <label for="status" class="col-sm-2 col-form-label">Xolat:</label>
            <div class="col-sm-10">
              <select class="form-select" name="status" value="${status}" aria-label="Default select example">
                <option value="available">Mavjud</option>
                <option value="unavailable">Mavjud emas</option>
                <option value="pending">Kutilmoqda</option>
                <option value="delivered">Yetkazilgan</option>
                <option value="rejected">Bekor qilingan</option>
              </select>
            </div>
        </div>
        
        </div>
        <button type="submit" class="btn btn-primary align-content-end">Saqlash</button>
        <button type="button" class="add_flower-cancel-btn btn btn-secondary">Bekor qilish</button>
    </form>
      `

    const commentModal = document.createElement('div')
    commentModal.classList.add("position-fixed","top-50","start-50","translate-middle","d-flex","justify-content-center", "w-100", "border-5", "p-3", "py-5")
    commentModal.innerHTML = comments
    if(e.target.dataset.comment){
      body.append(commentModal)
    }
    if(e.target.dataset.edit){
      body.append(modal)
    }
      const cancelBtn = document.querySelector('.add_flower-cancel-btn')
      cancelBtn.addEventListener('click', removeModal)
      function removeModal(){
        body.removeChild(modal)
      }
  })

}