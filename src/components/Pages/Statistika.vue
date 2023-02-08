<script>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="row">
    <div class="col-lg-8 col-md-12">
        <div class="card mb-4">
            <div class="card-body">
                <div class="card-title">This Year Sales</div>
                <div id="echartBar" style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154879086">
                    <div style="position: relative; overflow: hidden; width: 840px; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: pointer;">
                        <canvas data-zr-dom-id="zr_0" width="1050" height="375" style="position: absolute; left: 0px; top: 0px; width: 840px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                    </div>
                    <div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(0, 0, 0, 0.8); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 300px; top: 213px; pointer-events: none;">Online<br>\
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#DDD6FE;">
                        </span>Apr: 60,000</div>
                    </div>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-sm-12">
        <div class="card mb-4">
            <div class="card-body">
                <div class="card-title">Sales by Countries</div>
                <div id="echartPie" style="height: 300px; -webkit-tap-highlight-color: transparent; user-select: none; position: relative;" _echarts_instance_="ec_1673154879087">
                    <div style="position: relative; overflow: hidden; width: 385px; height: 300px; padding: 0px; margin: 0px; border-width: 0px; cursor: pointer;">
                        <canvas data-zr-dom-id="zr_0" width="481" height="375" style="position: absolute; left: 0px; top: 0px; width: 385px; height: 300px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas>
                    </div>
                    <div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(0, 0, 0, 0.8); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 5px; left: 225px; top: 132px; pointer-events: none;">Sales by Country<br>\
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62549c;">
                        </span>USA: 535</div>
                    </div>
            </div>
        </div>
    </div>
</div>

</template>
