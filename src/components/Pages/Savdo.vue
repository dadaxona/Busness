<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row mb-1">
    <div class="col-md-8 mb-3">
        <div class="card text-left">
            <div class="card-body">            
              <button class="btn btn-light btn-sm m-1" type="button">Excel</button>
              <button class="btn btn-light btn-sm m-1" type="button">Delete</button>
              <button class="btn btn-light btn-sm m-1" type="button">Pdf</button>
                <div class="table-responsive">
                  <div class="scroltab2">
                    <table class="table scroltab">
                      <thead>
                          <tr>
                              <th>Product</th>
                              <th>Date</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
       
    
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-2 mb-3">
      <div class="card text-left bg-body rounded p-3">
        <button class="mt-1 btn btn-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
        </button>
        <button class="mt-1 btn btn-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
          </svg>
        </button>
        <button class="mt-1 btn btn-light p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
        <button class="mt-1 btn btn-light p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
        <button class="mt-1 btn btn-light p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </button>
        <button class="mt-1 btn btn-light">
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="col-md-2 mb-3">
      <div class="card bg-body rounded p-3 higgg">
        <div class="row mt-2 border-bottom">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar position-absolute mx-2" viewBox="0 0 16 16">
            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
          </svg>
          <div class="col-12">
           <h4 class="text-right">258</h4>
          </div>
        </div>
        <div class="row border-bottom mt-3 pb-3">
          <select class="form-control text-center">
            <option value="UZS">UZS</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div class="row mt-3">
          <div class="col-4">
            <input class="form-check-input mx-1" type="checkbox" value="" id="flexCheckDefault">
          </div>
          <div class="col-8 text-right">
            Doonaga narx
          </div>
        </div>
        <div class="row mt-2 border-bottom">
          <div class="col-4">
            <input class="form-check-input mx-1" type="checkbox" value="" id="flexCheckDefault">
          </div>
          <div class="col-8 text-right">
            Optim narx
          </div>
        </div>
        <div class="row mt-5 border-bottom">
          <div class="col-4 text-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers" viewBox="0 0 16 16">
              <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z"/>
            </svg>
          </div>
          <div class="col-8 text-right">
            Ip Camera
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-1">
    <div class="col-md-12 mb-3">
        <div class="card text-left">
            <div class="card-body">            
              <div class="serc mb-2">
                <input type='text' id="search" class="searchbar" />
              </div>
                <div class="table-responsive">
                  <div class="scroltab2">
                    <table class="table scroltab">
                      <thead>
                          <tr>
                              <th>Username</th>
                              <th>Date</th>
                              <th>Price</th>
                              <th>Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>Product</th>
                          <th>Date</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                      <tr>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                  </tr>
                  <tr>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
              <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            <tr>
              <th>Product</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
          </tr>
          <tr>
            <th>Product</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <tr>
          <th>Product</th>
          <th>Date</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
      <tr>
        <th>Product</th>
        <th>Date</th>
        <th>Price</th>
        <th>Status</th>
        <th>Action</th>
    </tr>
                      </tbody>
                  </table>
                  </div>
                </div>
            </div>
        </div>
    </div>   
  </div>
</template>
