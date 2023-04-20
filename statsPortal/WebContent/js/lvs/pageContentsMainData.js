let main_contents_condition_temp1 = ` 
           <!-- 모든지표보기 - 인구가구 시작 -->
		<div class="resultAcc" data-link="tab1">
		<button class="btn_top active" type="button" name="button"
		    onclick="accordian(this)">인구주택총조사(인구조건/가구조건)</button>
		<div class="result_box accContent">
		    <div class="cate_menu tabCommon">
		        <ul>
		            <li class="active"><a href="#" rel="step01" data-tabname="tab6">인구조건</a></li>
		            <li><a href="#" rel="step02" data-tabname="tab6">가구조건</a></li>
		        </ul>
		    </div>
		    <div id="step01" class="step_box tab_content6" style="display: block;">
		        <form class="">
		            <div class="select_box">
		                <p>조사년도</p>
		                <div>
		                    <select name="year">
		                        <option value="none" selected>선택</option>
		                        <option value="2019">2019</option>
		                        <option value="2020">2020</option>
		                        <option value="2021">2021</option>
		                        <option value="2022">2022</option>
		                    </select>
		                </div>
		            </div>
		            <div class="select_box">
		                <p>성별</p>
		                <div>
		                    <input id="all" type="radio" name="pol" value="">
		                    <label for="all">전체</label>
		                    <input id="male" type="radio" name="pol" value="">
		                    <label for="male">남자</label>
		                    <input id="female" type="radio" name="pol" value="">
		                    <label for="female">여자</label>
		                </div>
		            </div>
		
		            <div class="select_box rxRanger">
		                <p>연령</p>
		                <ul class="tab tabCommon">
		                    <li><input id="ab1" type="radio" name="ab" value="" checked><label for="ab1"
		                            onclick="themeInnerTab('theme1AgeRanger')">구간선택</label></li>
		                    <li><input id="ab2" type="radio" name="ab" value=""><label for="ab2"
		                            onclick="themeInnerTab('theme1AgeList')">목록선택</label></li>
		                </ul>
		
		                <div class="rxSlider option_box tabBox show" data-tabName="theme1AgeRanger"
		                    style="display: block">
		                    <div class="optionText">
		                        <div class="select_area">
		                            <select name="year">
		                                <option value="none">10세</option>
		                                <option value="2019">20세</option>
		                                <option value="2020">30세</option>
		                            </select>
		                            <span>이상~</span>
		                            <select name="year">
		                                <option value="none">90세</option>
		                                <option value="2019">100세</option>
		                                <option value="2019">100+</option>
		                            </select>
		                            <span>미만</span>
		                        </div>
		                    </div>
		                    <div class="rangeWrap">
		                        <input type="text" id="ageRangeSlider" />
		                    </div>
		
		                </div>
		                <div class="option_box tabBox" data-tabName="theme1AgeList">
		                    <div class="step_family">
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family01"
		                                    value=""><label for="step_family01">0세~7세미만</label></div>
		                            <div class="tooltip" data-title="ss"></div>
		                        </div>
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family02"
		                                    value=""><label for="step_family02">7세 ~ 13세 미만</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family03"
		                                    value=""><label for="step_family03">13세 ~ 16세 미만</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family04"
		                                    value=""><label for="step_family04">16세 ~ 19세 미만</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		                    </div>
		                    <div class="step_family">
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family05"
		                                    value=""><label for="step_family05">0세 ~ 15세 미만</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family06"
		                                    value=""><label for="step_family06">15세 ~ 65세 미만</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		
		                        <div class="checkbox_list">
		                            <div class="list_text"><input type="checkbox" name="" id="step_family07"
		                                    value=""><label for="step_family07">65세 이상</label></div>
		                            <div class="tooltip"></div>
		                        </div>
		
		                    </div>
		                </div>
		
		            </div>
		
		            <div class="btn_botton">
		                <button class="btn_botton" type="button" name="button">인구조건 검색</button>
		            </div>
		        </form>
		    </div>
		    <div id="step02" class="step_box tab_content6">
		        <form class="">
		            <p>세대구성(다중선택 가능)</p>
		            <div class="option_box">
		                <div class="step_family">
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind01"
		                                value=""><label for="step_kind01">1세대 가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind02"
		                                value=""><label for="step_kind02">2세대 가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind03"
		                                value=""><label for="step_kind03">3세대 가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind04"
		                                value=""><label for="step_kind04">4세대 이상 가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		                </div>
		
		                <div class="step_family">
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind05"
		                                value=""><label for="step_kind05">1인가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		                    <div class="checkbox_list">
		                        <div class="list_text"><input type="checkbox" name="" id="step_kind06"
		                                value=""><label for="step_kind06">비친족가구</label></div>
		                        <div class="tooltip"></div>
		                    </div>
		
		                </div>
		            </div>
		
		            <div class="btn_botton">
		                <button class="btn_botton" type="button" name="button">가구조건 검색</button>
		            </div>
		        </form>
		    </div>
		</div>
		</div>
           <!-- 모든지표보기 - 인구가구 끝 -->
		
`;		




let main_contents_condition_temp2 = `
		<!-- 모든지표보기 주거 교통 시작 -->
            <div class="resultAcc" data-link="tab2">
                <button class="btn_top active" type="button" name="button"
                    onclick="accordian(this)">인구주택총조사(주택조건)</button>
                <div class="result_box accContent" data-link="tab2">
                    <div id="step03" class="step_box tab_content6">
                        <form class="">
                            <div class="select_box">
                                <p>조사년도</p>
                                <select name="year">
                                    <option value="none" selected>선택</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>

                            <div class="select_box acc">
                                <p onclick="accordian(this)">주택유형(다중선택 가능)</p>
                                <div class="option_box accContent">
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine1"
                                                value=""><label for="st3kine1">단독주택</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine2"
                                                value=""><label for="st3kine2">아파트</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine3"
                                                value=""><label for="st3kine3">연립주택</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine4"
                                                value=""><label for="st3kine4">다세대주택</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine5"
                                                value=""><label for="st3kine5">비주거용건물</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                    <div class="checkbox_list">
                                        <div class="list_text"><input type="checkbox" name="stkind" id="st3kine6"
                                                value=""><label for="st3kine6">주택이외의 거처</label></div>
                                        <div class="tooltip"></div>
                                    </div>
                                </div>
                            </div>


                            <div class="select_box">
                                <p>건축년도</p>
                                <select name="year">
                                    <option value="none" selected>선택</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>

                            <div class="select_box acc">
                                <p onclick="accordian(this)">연면적</p>
                                <div class="option_box accContent">
                                    <div class="optionText">
                                        <div class="select_area">
                                            <select name="year">
                                                <option value="">0</option>
                                                <option value="">20</option>
                                                <option value="">30</option>
                                            </select>
                                            <span>초과~</span>
                                            <select name="year">
                                                <option value="">90</option>
                                                <option value="">100</option>
                                                <option value="">100</option>
                                            </select>
                                            <span>이하</span>
                                        </div>
                                    </div>
                                    <input type="text" id="theme2SizeSlider">

                                </div>
                            </div>
                            <div class="btn_botton">
                                <button class="btn_botton" type="button" name="button">주택 조건 검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
<!-- 모든지표보기 주거 교통 시작 -->            
`;

// #extypeId# extype1
// #exType aType 
//    mlti_house:{name:"다문화가구", level:"sgg", type:"A", yearList:"2005~2020", reference:{"A","C"} } ,
//mlti_house:{name:"다문화가구", level:"sgg", type:"A", yearList:"2005~2020", reference:{"A","C"} } ,

let main_contents_checkbox_list_temp = `
		<div class="checkbox_list">
			<div class="list_text">
			    <input type="radio" name="ex3Type" id="#extypeId#" value="" #checked#>
			    <label for="#extypeId#" onclick="fn_get_board3_data('#statType#')">#name#</label>
			</div>
			<div class="tooltip" id="#tooltipId#" data-title="#name#" data-desc="#name#" data-level="#levelName#" data-year="#yearList#">
			</div>
		</div>`;

//*이 지표는 시도 현황판에서만 활성화 되는 메뉴입니다.

let main_contents_checkbox_list_tooltip_temp = `
	<div class="tooltip_layer" id="#tipLayer#">
	<h5 class="title">#name#</h5>
	<p class="desc">#name#</p>
	<div class="badge">
	  <span class="level active">#levelName#</span>
	  <span class="year">#yearList#</span>
	</div>
	<p class="noti">#comments#</p>
	</div>
`;

let main_contents_checkbox_list_tooltip_temp2 = `
	<div class="tooltip_layer" id="#tipLayer#">
	<h5 class="title">#name#</h5>
	<p class="desc">#name#</p>
	<div class="badge">
	  <span class="level active">#levelName#</span>
	  <span class="year">#yearList#</span>
	</div>
	<p class="noti">#comments#</p>
	</div>
`;

let main_contents_checkbox_list_tooltip_temp3 = `
	<div class="tooltip_layer" id="#tipLayer#">
	<h5 class="title">#name#</h5>
	<p class="desc">#name#</p>
	<div class="badge">
	  <span class="level active">#levelName#</span>
	  <span class="year">#yearList#</span>
	</div>
	<p class="noti">#comments#</p>
	</div>
`;	




