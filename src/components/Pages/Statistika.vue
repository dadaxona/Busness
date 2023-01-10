<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row">
    <div class="col-lg-8 col-md-12">
        <div class="card mb-4">
            <div class="card-body">
                <div class="card-title">This Year Sales</div>
                <div id="echartBar" style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154879086"><div style="position: relative; overflow: hidden; width: 840px; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: pointer;"><canvas data-zr-dom-id="zr_0" width="1050" height="375" style="position: absolute; left: 0px; top: 0px; width: 840px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(0, 0, 0, 0.8); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 300px; top: 213px; pointer-events: none;">Online<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#DDD6FE;"></span>Apr: 60,000</div></div>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-sm-12">
        <div class="card mb-4">
            <div class="card-body">
                <div class="card-title">Sales by Countries</div>
                <div id="echartPie" style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154879087"><div style="position: relative; overflow: hidden; width: 385px; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: pointer;"><canvas data-zr-dom-id="zr_0" width="481" height="375" style="position: absolute; left: 0px; top: 0px; width: 385px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(0, 0, 0, 0.8); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 225px; top: 132px; pointer-events: none;">Sales by Country<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62549c;"></span>USA: 535</div></div>
            </div>
        </div>
    </div>
</div>

<div class="row">
  <div class="col-lg-6 col-md-12">
      <div class="row">
          <div class="col-lg-6 col-md-12">
              <div class="card card-chart-bottom o-hidden mb-4">
                  <div class="card-body">
                      <div class="text-muted">Last Month Sales</div>
                      <p class="mb-4 text-primary text-24">$40250</p>
                  </div>
                  <div id="echart1" style="height: 260px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154810282"><div style="position: relative; overflow: hidden; width: 311px; height: 260px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="388" height="325" style="position: absolute; left: 0px; top: 0px; width: 311px; height: 260px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div>
              </div>
          </div>
          <div class="col-lg-6 col-md-12">
              <div class="card card-chart-bottom o-hidden mb-4">
                  <div class="card-body">
                      <div class="text-muted">Last Week Sales</div>
                      <p class="mb-4 text-warning text-24">$10250</p>
                  </div>
                  <div id="echart2" style="height: 260px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154810283"><div style="position: relative; overflow: hidden; width: 311px; height: 260px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="388" height="325" style="position: absolute; left: 0px; top: 0px; width: 311px; height: 260px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-12">
              <div class="card o-hidden mb-4">
                  <div class="card-header d-flex align-items-center border-0">
                      <h3 class="w-50 float-left card-title m-0">New Users</h3>
                      <div class="dropdown dropleft text-right w-50 float-right">
                          <button class="btn bg-gray-100" id="dropdownMenuButton1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="nav-icon i-Gear-2"></i></button>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton1"><a class="dropdown-item" href="#">Add new user</a><a class="dropdown-item" href="#">View All users</a><a class="dropdown-item" href="#">Something else here</a></div>
                      </div>
                  </div>
                  <div>
                      <div class="table-responsive">
                          <table class="table text-center" id="user_table">
                              <thead>
                                  <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Name</th>
                                      <th scope="col">Avatar</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Status</th>
                                      <th scope="col">Action</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr>
                                      <th scope="row">1</th>
                                      <td>Smith Doe</td>
                                      <td><img class="rounded-circle m-0 avatar-sm-table" src="../../dist-assets/images/faces/1.jpg" alt=""></td>
                                      <td>Smith@gmail.com</td>
                                      <td><span class="badge badge-success">Active</span></td>
                                      <td><a class="text-success mr-2" href="#"><i class="nav-icon i-Pen-2 font-weight-bold"></i></a><a class="text-danger mr-2" href="#"><i class="nav-icon i-Close-Window font-weight-bold"></i></a></td>
                                  </tr>
                                  <tr>
                                      <th scope="row">2</th>
                                      <td>Jhon Doe</td>
                                      <td><img class="rounded-circle m-0 avatar-sm-table" src="../../dist-assets/images/faces/1.jpg" alt=""></td>
                                      <td>Jhon@gmail.com</td>
                                      <td><span class="badge badge-info">Pending</span></td>
                                      <td><a class="text-success mr-2" href="#"><i class="nav-icon i-Pen-2 font-weight-bold"></i></a><a class="text-danger mr-2" href="#"><i class="nav-icon i-Close-Window font-weight-bold"></i></a></td>
                                  </tr>
                                  <tr>
                                      <th scope="row">3</th>
                                      <td>Alex</td>
                                      <td><img class="rounded-circle m-0 avatar-sm-table" src="../../dist-assets/images/faces/1.jpg" alt=""></td>
                                      <td>Otto@gmail.com</td>
                                      <td><span class="badge badge-warning">Not Active</span></td>
                                      <td><a class="text-success mr-2" href="#"><i class="nav-icon i-Pen-2 font-weight-bold"></i></a><a class="text-danger mr-2" href="#"><i class="nav-icon i-Close-Window font-weight-bold"></i></a></td>
                                  </tr>
                                  <tr>
                                      <th scope="row">4</th>
                                      <td>Mathew Doe</td>
                                      <td><img class="rounded-circle m-0 avatar-sm-table" src="../../dist-assets/images/faces/1.jpg" alt=""></td>
                                      <td>Mathew@gmail.com</td>
                                      <td><span class="badge badge-success">Active</span></td>
                                      <td><a class="text-success mr-2" href="#"><i class="nav-icon i-Pen-2 font-weight-bold"></i></a><a class="text-danger mr-2" href="#"><i class="nav-icon i-Close-Window font-weight-bold"></i></a></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="col-lg-6 col-md-12">
      <div class="card mb-4">
          <div class="card-body">
              <div class="card-title">Top Selling Products</div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-4.jpg" alt="">
                  <div class="flex-grow-1">
                      <h5><a href="">Wireless Headphone E23</a></h5>
                      <p class="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                      <p class="text-small text-danger m-0">$450
                          <del class="text-muted">$500</del>
                      </p>
                  </div>
                  <div>
                      <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-rounded btn-sm">
                          View
                          details
                      </button>
                  </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-2.jpg" alt="">
                  <div class="flex-grow-1">
                      <h5><a href="">Wireless Headphone Y902</a></h5>
                      <p class="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                      <p class="text-small text-danger m-0">$550
                          <del class="text-muted">$600</del>
                      </p>
                  </div>
                  <div>
                      <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View
                          details
                      </button>
                  </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-3.jpg" alt="">
                  <div class="flex-grow-1">
                      <h5><a href="">Wireless Headphone E09</a></h5>
                      <p class="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                      <p class="text-small text-danger m-0">$250
                          <del class="text-muted">$300</del>
                      </p>
                  </div>
                  <div>
                      <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View
                          details
                      </button>
                  </div>
              </div>
              <div class="d-flex flex-column flex-sm-row align-items-sm-center mb-3"><img class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3" src="../../dist-assets/images/products/headphone-4.jpg" alt="">
                  <div class="flex-grow-1">
                      <h5><a href="">Wireless Headphone X89</a></h5>
                      <p class="m-0 text-small text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                      <p class="text-small text-danger m-0">$450
                          <del class="text-muted">$500</del>
                      </p>
                  </div>
                  <div>
                      <button class="btn btn-outline-primary mt-3 mb-3 m-sm-0 btn-sm btn-rounded">
                          View
                          details
                      </button>
                  </div>
              </div>
          </div>
      </div>
      <div class="card mb-4">
          <div class="card-body p-0">
              <div class="card-title border-bottom d-flex align-items-center m-0 p-3"><span>User activity</span><span class="flex-grow-1"></span><span class="badge badge-pill badge-warning">Updated daily</span></div>
              <div class="d-flex border-bottom justify-content-between p-3">
                  <div class="flex-grow-1"><span class="text-small text-muted">Pages / Visit</span>
                      <h5 class="m-0">2065</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">New user</span>
                      <h5 class="m-0">465</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">Last week</span>
                      <h5 class="m-0">23456</h5>
                  </div>
              </div>
              <div class="d-flex border-bottom justify-content-between p-3">
                  <div class="flex-grow-1"><span class="text-small text-muted">Pages / Visit</span>
                      <h5 class="m-0">1829</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">New user</span>
                      <h5 class="m-0">735</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">Last week</span>
                      <h5 class="m-0">92565</h5>
                  </div>
              </div>
              <div class="d-flex justify-content-between p-3">
                  <div class="flex-grow-1"><span class="text-small text-muted">Pages / Visit</span>
                      <h5 class="m-0">3165</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">New user</span>
                      <h5 class="m-0">165</h5>
                  </div>
                  <div class="flex-grow-1"><span class="text-small text-muted">Last week</span>
                      <h5 class="m-0">32165</h5>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div class="col-md-12">
      <div class="card mb-4">
          <div class="card-body p-0">
              <h5 class="card-title m-0 p-3">Last 20 Day Leads</h5>
              <div id="echart3" style="height: 360px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154810284"><div style="position: relative; overflow: hidden; width: 1335px; height: 360px; padding: 0px; margin: 0px; border-width: 0px;"><canvas data-zr-dom-id="zr_0" width="1668" height="450" style="position: absolute; left: 0px; top: 0px; width: 1335px; height: 360px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div></div></div>
          </div>
      </div>
  </div>
</div>

</template>
