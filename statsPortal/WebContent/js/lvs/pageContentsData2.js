//<li><img class="family_base" src="/images/lvs/icon/icon-img01.png" alt=""  ></li>
let extend_data_02_slider_item_temp = `
                        <div class="content rcmdItem" data-ids="#itemName#">
                            <div class="head">
                                <h5>#name#</h5>
                                <img src="/images/lvs/icon/icon-tooltip.png" alt="" id="#tipLayerId#">
                            </div>
                            <p>||this_val||</p>
                            <ul class="chart_box">
                                <li class="chart">
                                    <div id="#chartId#" style="width:150px; height:70px"></div>
                                </li>
                            </ul>
                            <div class="base_year">
                                <span>기준 #base_year#</span>
                                <span>(단위:#unit#)</span>
                            </div>
                            <span class='num' style='display:none'>#num#<span>                            
                        </div>`; 

let  extend_data_02_temp = `
        <!-- 데이터보드 추천지표보기 콘텐츠 시작 -->
            <div class="main">
                <ul class="main_wrap">

                <!-- 슬라이더 콘텐츠 시작 -->                    
                    <li class="main_sec01" id="tabType2Content">
                       #extend_data_02_slider_item#
                    </li>
                <!-- 슬라이더 콘텐츠 끝 -->
                    
                    <!-- 상단 차트 박스 끝 -->

                    <li class="main_sec02">
                        <div class="tab_container4">
                            <!--탭 메뉴 영역 -->
                            <div class="tabs4 tabCommon">
                                <ul>
                                    <li class="active"><a href="#" data-tabName="tab4" rel="tab4_1">변화 그래프</a></li>
                                    <li ><a href="#" data-tabName="tab4" rel="tab4_2" >변화 지도</a></li>
                                    <li><a href="#" data-tabName="tab4" rel="tab4_3" >지역내순위</a></li>
                                    <li><a href="#" data-tabName="tab4" rel="tab4_4" >타 지자체 비교</a></li>
                                </ul>
                                <a href="javascript:void(0)" class="btn_other_area layerOpen"
                                    onclick="fn_openPopup('type2')">소지역보기</a>
                            </div>
                            
						    <div class="popup_layer type2 success" id="popup_layer_type2">
						    </div>

                            <div id="tab4_1" class="tab4" style="display: block;">
                              #extend_data_02_tab4_1#
                            </div>
                            <div id="tab4_2" class="tab4" >
                              #extend_data_02_tab4_2#                            
                            </div>
                            <div id="tab4_3" class="tab4">
                              #extend_data_02_tab4_3#                            
                            </div>
                            <div id="tab4_4" class="tab4 tab4_4">
                              #extend_data_02_tab4_4#                            
                            </div>

                        </div>
                    </li>
                </ul>
            </div>
        <!-- 데이터보드 추천지표보기 콘텐츠 끝 -->
        <!--소지역보기 팝업-->
        
`;

let popup_layer_type2_success_temp =`
        <!-- 2022/10/19 -->
        <div class="layer_box popup_location" style="z-index:200">
            <!-- 2022/10/19 -->
            <div class="heading">
                <span>소지역 보기</span>
                <button class="layer_close" type="button" name="button" onclick="fn_board2_popup_close()"></button>
            </div>
            <div class="content">
                <div class="title">
                    <h4>#name#</h4>
                    <span>-</span>
                    <span>#dataNm#</span>
                </div>


                <div class="tab_container5">
                    <div class="tabs5 tabCommon">
                        <ul>
                            <li class="active"><a href="#" data-tabName="tab5" rel="tab5_1">집계구 보기</a></li>
                            <!--<li><a href="#" data-tabName="tab5" rel="tab5_2">변화 지도</a></li>-->
                            <li><a href="#" data-tabName="tab5" rel="tab5_3">변화 그래프</a></li>
                        </ul>
                    </div>
                    <div id="tab5_1" class="tab_content5 active">
						<div class="area_map map_type1" id="mapWrapper2">
						</div>
						<!--<div class="sop_control"></div>-->
                        
                    </div>
                    <div id="tab5_2" class="tab_content5">
                        <ul class="area_map">
                            <li>
                                <span>#name#</span>
                                <form>
                                    <select name="year">
                                        <option value="none" selected>선택</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </form>
                                <div class="map_type2"></div>
                            </li>
                            <li>
                                <span>#name#</span>
                                <form>
                                    <select name="year">
                                        <option value="none" selected>선택</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </form>
                                <div class="map_type2"></div>
                            </li>
                            <li>
                                <span>#name#</span>
                                <form>
                                    <select name="year">
                                        <option value="none" selected>선택</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                    </select>
                                </form>
                                <div class="map_type2"></div>
                            </li>
                        </ul>
                        <div class="sop_control"></div>
                    </div>
                    <div id="tab5_3" class="tab_content5">
                        <div id="popupChart1"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup_bg"></div>

` ;

let extend_data_02_tab4_1_temp =`
    <h5 class="title">#name#</h5>
    <div id="tab4_chart1"></div>
`;

let extend_data_02_tab4_2_temp =`
				<ul class="area_map">
				<li>
				    <div>
				        <h5>#adm_nm#</h5>
				        <select name="year">
				            <option value="none" selected="">선택</option>
				            #extend_data_02_tab4_2_select#
				        </select>
				    </div>
				    <div class="map_type2" id="map_board2_1"  style="height:100%"></div>				    
				</li>
				<li>
				    <div>
				        <h5>#adm_nm#</h5>
				        <select name="year">
				            <option value="none" selected="">선택</option>
				            #extend_data_02_tab4_2_select#				            
				        </select>
				    </div>
				    <div class="map_type2" id="map_board2_2"  style="height:100%">				    </div>
				</li>
				<li>
				    <div>
				        <h5>#adm_nm#</h5>
				        <select name="year">
				            <option value="none" selected="">선택</option>
				            #extend_data_02_tab4_2_select#				            
				        </select>
				    </div>
				    <div class="map_type2" id="map_board2_3" style="height:100%">
				    </div>
				</li>
				</ul>
				`;

let extend_data_02_tab4_3_temp =`
                                <div class="tabFlex">
                                    <h5 class="title">#adm_nm#</h5>
                                    <select name="tab4_3_year" onchange=data_02_tab4_3(this)>
                                        <option selected="" disabled>선택</option>
                                        #extend_data_02_tab4_3_select#
                                        
                                    </select>
                                </div>
                                <div id="tab4_chart3"></div>
`;




let extend_data_02_tab4_4_temp =`
                                <div class="row" id="extend_data_02_tab4_4_row1">
                                   #extend_data_02_tab4_4_row1#
                                </div>
                                <div class="row" id="extend_data_02_tab4_4_row2">
                                   #extend_data_02_tab4_4_row2#
                                </div>

                                <div class="vrsRegionPopup">
                                        #vrsRegionPopup#
                                </div>
	`;


let extend_data_02_tab4_4_row_temp =`
                                   <div class="title">
                                        <div class="crnt">
                                          <p>#adm_nm#</p>
                                          <button type="button" class="" onclick="fn_openVrsRegionPopup(this)" data-target="#rowNo#"  data-admnm="#adm_nm#">비교지역 추가</button>
                                        </div>
                                        <div class="vrs #rowNo#Target" style="display:flex;">
                                          <p class="vs">VS</p>
                                          <p class="regionName"></p>
                                          <button type="button" class="" onclick="fn_vrsRegionDelete('#rowNo#')">삭제</button>
                                        </div>
                                     </div>
                                    <div class="content">
                                        <div class="sec1">
                                            <div class="chartArea">
                                                <div id="vrsChartId_#rowNo#" style="width:100%; height:100%"></div>
                                            </div>
                                        </div>
                                        <div class="sec2">
                                            <div class="current">
                                                <table>
                                                    <colgroup>
                                                        <col width="40%">
                                                        <col width="60%">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>연도</th>
                                                            <th>#name#</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="vrsTableId_#rowNo#">
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="vursus" id="#rowNo#_vrs_off">
                                                <p>지역을 선택해주세요.</p>
                                            </div>

                                            <div class="vursus table" id="#rowNo#_vrs_on">
                                                <table>
                                                    <colgroup>
                                                        <col width="40%">
                                                        <col width="60%">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th>연도</th>
                                                            <th>#name#</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="vrs2TableId_#rowNo#">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
`;


let vrs_region_popup_temp =`
                                    <input type="hidden" disabled value="" id="vrsRegionElement">
                                    <input type="hidden" disabled value="" id="vrsRegionNmElement">                                    
                                    <div class="heading">
                                        <span>비교지역선택하기</span>
                                        <button id="btn_close" type="button" name="button"
                                            onclick="fn_selectVrsRegionPopupClose()"></button>
                                    </div>

                                    <div class="content">
                                        <span>타지역을 선택하여 값을 비교해 볼 수 있습니다.</span>
                                        <div>
                                            <select class="vrsSelectBox" name="level1" id="board2_sido_select" onchange="fn_changeLocation_board2('sido');">
                                                <option value="" selected="selected" disabled>시/도</option>
                                            </select>
                                            <select class="vrsSelectBox" name="level2" id="board2_sgg_select" onchange="fn_changeLocation_board2('sgg');">
                                                <option value="" selected disabled>시/군/구</option>
                                            </select>
                                            <select class="vrsSelectBox" name="level3" id="board2_emdong_select">
                                                <option value="" selected disabled>읍/면/동</option>
                                            </select>
                                        </div>
                                        <div class="btnWrap">
                                            <button type="button" class="line" name="button"
                                                onclick="fn_selectVrsRegionPopupClose()">취소</button>
                                            <button type="button" class="primary" name="button"
                                                onclick="fn_vrsRegionPopupSelect()">확인</button>
                                        </div>
                                    </div>

`;

        