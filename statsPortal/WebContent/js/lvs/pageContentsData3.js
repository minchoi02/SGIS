let  extend_data_03_temp = ` 
	<div class="main">
		<div class="main_wrap" id="extend_data_03" style="display:#display_large#">
		  <div class="headerWrap">
		        <p class="title">#name#</p>
		        <div class="btnWrap">
		          <a href="javascript:void(0)" class="link">통계주제도</a>
		          <a href="javascript:void(0)" class="link">대화형 통계지도</a>
		          <a href="javascript:void(0)" class="link">정책통계지도</a>
		        </div>
		  </div>
		  <ul class="text">
		    <li><span class="title">제목: </span><span class="content">#name#</span></li>
		    <li><span class="title">출처: </span><span class="content">#site#</span></li>
		    <li><span class="title">지역: </span><span class="content">#region_name#</span></li>
		    <li><span class="title">합계: </span><span class="content">||tot_sum|| #unit#</span></li>
		  </ul>
		  
		  #exboardType#
		
		</div><!--main wrap 끝 -->
		
        <div class="main_wrap" id="extend_data_03_small" style="display:#display_small#">
            <div class="headerWrap">
                <p class="title">#name#</p>
            </div>
            <ul class="text">
                <li><span class="content">||tot_sum|| #unit# </span></li>  
                
            </ul>
        </div>
		
	</div> <!--main 끝 --> 
` ;


let  extend_data_03_typeA_temp = `
          <div class="exboardType active aType">
            <div class="section chartArea">
              <div class="accHeader">데이터보기</div>
              <div class="accContent">
                <div class="chart chart_wrap">
                  <div id="chartAId" style="height:100%"></div>
                </div>
              </div>
            </div>
          </div>
`;

let  extend_data_03_typeB_temp = `
          <div class="exboardType active bType">
            <div class="section chartArea">
              <div class="accHeader">데이터보기</div>
              <div class="accContent">
                <ul class="tabCommon">
                  <li class="active" id="board3_bTypeTab1"><a href="javascript:void(0)" class="chart" data-tab="bTypeTab1"
                      data-tabname="tab8">차트</a></li>
                  <li  id="board3_bTypeTab2"><a href="javascript:javascript:void(0)" class="table" data-tab="bTypeTab2" data-tabname="tab8">표</a></li>
                </ul>
                <ul class="tabContent8 tabContent">
                  <li class="chart chart_wrap active" data-link="bTypeTab1" >
                    <div id="chartBId" style="width:100%; height:100%"></div>
                  </li>
                  <li class="table table_wrap" data-link="bTypeTab2" >
                    <table>
                      <colgroup>
                        <col width="25%">
                        <col width="*">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                      </colgroup>
                      <thead>
                        <tr>
                          <th>항목</th>
                          <th>행정구역 및 집계구 번호</th>
                          <th>순위</th>
                          <th>값</th>
                          <th>비율(%)</th>
                        </tr>
                      </thead>
                      <tbody id="bType_table">
                      </tbody>
                    </table>
                  </li>
                </ul>
              </div>
            </div>

            <div class="section year">
              <div class="accHeader">시계열조회</div>
              <div class="accContent">
                <div class="yearSlider">
                  <ul class="yearList">
                  #yearlist#
                  </ul>
                </div>
              </div>
            </div>

        </div>
`;


let  extend_data_03_typeC_temp = `
          <div class="exboardType active cType">
            <div class="section halfSection chartArea">
              <div class="half">
                <div class="accHeader">데이터보기</div>
                <div class="accContent">
                  <ul class="tabCommon">
                    <li class="active" ><a href="javascript:void(0)" class="chart" data-tab="cTypeTab1"data-tabname="tab8">차트</a></li>
                    <li ><a href="javascript:void(0)" class="table" data-tab="cTypeTab2" data-tabname="tab8">표</a></li>
                  </ul>
                  <ul class="tabContent8 tabContent">
                    <li class="chart chart_wrap active" data-link="cTypeTab1">
                      <div id="cType_chart1" style="width:100%;"></div>
                    </li>
                    <li class="table table_wrap" data-link="cTypeTab2">
                      <table>
                        <colgroup>
                          <col width="25%">
                          <col width="*">
                          <col width="15%">
                          <col width="15%">
                          <col width="15%">
                        </colgroup>
                        <thead>
                          <tr>
                            <th>항목</th>
                            <th>행정구역 및 집계구 번호</th>
                            <th>순위</th>
                            <th>값</th>
                            <th>비율(%)</th>
                          </tr>
                        </thead>
                        <tbody id="cType_table1">
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="half">
                <div class="accHeader">상위 지역 비교 데이터 보기</div>
                <div class="accContent">
                  <ul class="tabCommon">
                    <li class="active"><a href="javascript:void(0)" class="chart" data-tab="cTypeTab3"
                        data-tabname="tab8">차트</a></li>
                    <li><a href="javascript:void(0)" class="table" data-tab="cTypeTab4" data-tabname="tab8">표</a></li>
                  </ul>
                  <ul class="tabContent9 tabContent">
                    <li class="chart chart_wrap active" data-link="cTypeTab3">
                      <div id="cType_chart2"></div>
                    </li>
                    <li class="table table_wrap" data-link="cTypeTab4">
                      <table>
                        <colgroup>
                          <col width="50%">
                          <col width="50%">
                        </colgroup>
                        <thead>
                          <tr>
                            <th>항목</th>
                            <th>값</th>
                          </tr>
                        </thead>
                        <tbody id="cType_table2">
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            <div class="section year">
              <div class="accHeader">시계열조회</div>
              <div class="accContent">
                <div class="yearSlider">
                  <!-- <div class="icons">
                        <i class="icon"><span class="play"></span></i>
                        <i class="icon"><span class="setting"></span></i>
                        <i class="icon"><span class="layer"></span></i>
                      </div> -->
                  <ul class="yearList">
                  	#yearlist#                  
                  </ul>
                </div>
              </div>
            </div>
          </div>
`;	

let  extend_data_03_typeD_temp = `
          <div class="exboardType active dType">
            <div class="section chartArea">
              <div class="accHeader">데이터보기</div>
              <div class="accContent">
                <ul class="tabCommon">
                  <li class="active"><a href="javascript:void(0)" class="chart" data-tab="dTypeTab1"
                      data-tabname="tab8">차트</a></li>
                  <li><a href="javascript:void(0)" class="table" data-tab="dTypeTab2" data-tabname="tab8">표</a></li>
                </ul>
                <ul class="tabContent8 tabContent">
                  <li class="chart chart_wrap active" data-link="dTypeTab1">
                    <div id="dType_chart" style="width:100%;"></div>
                  </li>
                  <li class="table table_wrap" data-link="dTypeTab2">
                    <table>
                      <colgroup>
                        <col width="25%">
                        <col width="*">
                        <col width="15%">
                        <col width="15%">
                        <col width="15%">
                      </colgroup>
                      <thead>
                        <tr>
                          <th>항목</th>
                          <th>행정구역 및 집계구 번호</th>
                          <th>순위</th>
                          <th>값</th>
                          <th>비율(%)</th>
                        </tr>
                      </thead>
                      <tbody id="dType_table">
                      </tbody>
                    </table>
                  </li>
                </ul>
              </div>
            </div>

          
        </div>   
               
`;
