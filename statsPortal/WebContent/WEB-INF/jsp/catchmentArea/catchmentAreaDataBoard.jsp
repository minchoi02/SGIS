<%
	/**************************************************************************************************************************
	* Program Name	: 생활권역 통계지도 DataBoard
	* File Name		: catchmentAreaDataBoard.jsp
	* Comment		: 
	* History		: 
	*	2020.06.11	방민정	신규
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="wrapper">
		<!-- 영향권 데이터 보드 -->
		<div class="pop_btn01">데이터보드</div>
		<div class="pop_statistics pop_chk01">
			<div class="pop_title_2">
<!-- 년도콤보 위아래 일 때 -->
<!-- 				<div class="sce_line1"> -->
<!-- 					<span class="grp_txt01">인구/가구/주택</span> -->
<!-- 					<select class="selct_03"> -->
<!-- 						<option>2019</option> -->
<!-- 						<option>2018</option> -->
<!-- 					</select>								 -->
<!-- 					<strong id="titleAreaTxt_1"></strong> -->
<!-- 				</div> -->
<!-- 				<div class="sce_line2"> -->
<!-- 					<span class="grp_txt01">사업체/종사자</span> -->
<!-- 					<select class="selct_03"> -->
<!-- 						<option>2019</option> -->
<!-- 						<option>2018</option> -->
<!-- 					</select> -->
<!-- 					<div class="btn_left01"><a href="#"><img src="/images/catchmentArea/btn_arrow_left.png"></a></div> -->
<!--  					<span class="year_txt01">2019년</span> -->
<!--  					<div class="btn_right01"><a href="#"><img src="/images/catchmentArea/btn_arrow_right.png"></a></div> -->
<!-- 					<div class="btn_left02" id="prevBtn"><a href="#"><img src="/images/catchmentArea/btn_arrow_left.png"></a></div> -->
<!-- 					<span class="btn_text01">주행시간 5분</span> -->
<!-- 					<div class="btn_right02" id="nextBtn"><a href="#"><img src="/images/catchmentArea/btn_arrow_right.png"></a></div> -->
<!-- 				</div> -->
				<div class="sce_line1">							
					<strong id="titleAreaTxt_1" style="display:none;"></strong>
					<div class="btn_left02" id="prevBtn"><a href="#"><img src="/images/catchmentArea/btn_arrow_left.png"></a></div>
					<div class="txt_Center01">
						<span class="btn_text01" id="titleTypeTxt_1">주행시간 5분</span>
						<span class="btn_text02" id="sec01GridTxt"></span>
					</div>
					<div class="btn_right02" id="nextBtn"><a href="#"><img src="/images/catchmentArea/btn_arrow_right.png"></a></div>
					<span class="btn_right03"><a id="gridDataBordInfo02" data-subj="격자 단위 통계정보" href="javascript:void(0)" title="<p class='subC'>영역에 포함되는 격자를 기준으로 통계정보를 제공하고 있으며, 기초자료를 기반으로 비밀보호기법을 적용하여 각각의 값을 계산하므로 부분의 합계와 전체 합계가 일치하지 않을 수 있습니다. 클릭하면 자세한 설명을 볼 수 있습니다.</p>">
							<img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
					<!--  
					<a id="gridDataBordInfo02" data-subj="격자 단위 통계정보" href="javascript:void(0)"  title="<p class='subC'>영역에 속하는 격자 기반의 통계값을 기준으로 비밀보호기법을 적용하여 값을 표출하고 있으며, 다음과 같이 값을 해석하면 됩니다.</p>
								<table class='subT'>
									<thead>
       									<tr>
          									<th colspan='2'>인구/가구/주택</th><th colspan='2'>사업체/종사자</th>
        								</tr>
        								<tr>
          									<th>생활권역 통계지도에서 제공하는 값</th><th>실제 값</th><th>생활권역 통계지도에서 제공하는 값</th><th>실제 값</th>
        								</tr>
      								</thead>
      								<tbody>
      									<tr>
          									<td>0</td><td>0, 1, 2, 3, 4 중 하나</td><td>0</td><td>0, 1, 2 중 하나</td>
        								</tr>
        								<tr>
          									<td>1~4</td><td>미제공</td><td>1~2</td><td>미제공</td>
        								</tr>
        								<tr>
          									<td>5</td><td>1, 2, 3, 4, 5 중 하나</td><td>3</td><td>1, 2, 3 중 하나</td>
        								</tr>
        								<tr>
											<td>6 이상의 값 M</td><td>M-2, M-1, M, M+1, M+2 중 하나 (일부 자료 M-7 ~ M+7)*</td><td>4 이상의 값 N</td><td>N-1, N, N+1 중 하나 (일부 자료 N-4 ~ N+4)*</td>
        								</tr>
        								<tr>
          									<td colspan='4'>* 단, 일부 자료(전체 격자 자료 중 약 1%)는 해당 값을 통하여 작은 단위의 통계정보를 파악할 수 있다고 판단되어,이를 방지하기 위해 추가적으로 값을 처리함</td>
        								</tr>
      								</tbody>
								</table>
								<p>인구·가구·주택 정보는 인구주택총조사(등록센서스) 자료, 사업체·종사자 정보는 전국사업체좌(또는 경제총조사) 자료를 기반으로 생성합니다.</p>
							">
							<img src="/images/catchmentArea/question_icon.png" alt="도움말" style="margin-left: -7px;margin-right: 5px;"></a>
							-->
					</span>										
				</div>
				<div class="sce_line2">
					<span class="grp_txt01">인구/가구/주택</span>		
					<select class="selct_03" id="bYearSel01"></select>					
					<span class="grp_txt02">사업체/종사자</span>
					<select class="selct_04" id="bYearSel02"></select>
				</div>							
			</div>
			<a href="javascript:void(0);" class="close_btn01"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
<!-- 			<div class="data_paging"> -->
<!-- 					<a href="javascript:void(0);"><img src="/images/catchmentArea/btn_paging_sel.png"></a> -->
<!-- 					<a href="javascript:void(0);"><img src="/images/catchmentArea/btn_paging_next.png"></a> -->
<!-- 					<a href="javascript:void(0);"><img src="/images/catchmentArea/btn_paging_next.png"></a> -->
<!-- 			</div> -->
			<!-- SGIS4_1025_생활권역 시작 -->
			<div class="pop_content scroll_wrap scroll_04" id="data_popup">
			<!-- SGIS4_1025_생활권역 끝 -->
				<ul class="clearfix">
					<li class="sec01">
						<h4>면적</h4>
						<div class="graph_bg">
							<img src="/images/catchmentArea/shape01.png">
 							<span id="areaSize">360,000㎢</span><!--<span class="txt_sm01"> km</span><sup>2</sup> -->
						</div>
						<!-- <p class="sa_txt03" id="sec01GridTxt"></p> -->
						<p class="sa_txt02" id="sec01AreaTxt"></p>
						<p class="sa_txt01" id="sec01RangeTxt"></p>
					</li>
					<li class="sec02">
						<h4>인구</h4>
						<div class="div_basic">
							<div class="step_wrap">
								<span class="step01"></span>
								<span class="step02"></span>
								<span class="step03"></span>
								<span class="step04"></span>
								<span class="step05"></span>
								<span class="step06"></span>
								<span class="step07"></span>
								<span class="step08"></span>
								<span class="step09"></span>
							</div>
							<div class="txt_box01">
								<div id="popChart" class="reset chart"></div>
								<p class="sa_txt01" id="perPopTxt" data-reset=""></p>
								<p class="sa_txt02" id="perPop" data-reset=""></p>
								<!-- SGIS4_생활권역 시작 -->
								<!-- SGIS4_1025_생활권역 시작 -->
								<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="pops">
								<!-- SGIS4_1025_생활권역 끝 -->
									<span class="ball"></span>
								</a>
								<!-- SGIS4_생활권역 끝 -->
							</div>
							<div class="chart_ico">
								<div class="man_txt"><p id="manPer" data-reset="00.00%">100%</p><p id="manTtlCnt" data-reset="0명">10,000명</p></div>
								<div class="man_ico"><img src="/images/catchmentArea/man_ico.png"></div>
								<div class="man_chart" ><div class="h55" id="manPerBar" style="height:100%;"></div></div>
								<div class="woman_ico"><img src="/images/catchmentArea/woman_ico.png"></div>
								<div class="woman_chart"><div class="h55" id="womanPerBar" style="height:86%;"></div></div>
								<div class="woman_txt"><p id="womanPer" data-reset="00.00%">100%</p><p id="womanTtlCnt" data-reset="0명">10,000명</p></div>
								<p class="bi_txt">전체 인구에 대한 남·여 비율</p>
	<!-- 							<p class="bi_txt">여자 인구 대비 남자인구 비율</p> -->
							</div>						
							<p class="sa_txt03">10세 간격 연령대 비율</p>
						</div>
						<div class="div_chartr">
							<div class="txt_box01">
								<div id="popCChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->							
								<p class="sa_txt01 mightOverflow" id="perPopCTxt"></p>
								<p class="sa_txt02" id="perPopC" data-reset="00.0%"></p>
								<p class="sa_txt03">전체 인구 중</p>
								<p class="sa_txt05" id="numPopC" data-reset="0명"></p>
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<span class="cr01"></span><span class="sa_txt01 mR5">그 외(기타)</span>
								<span class="cr02"></span><span class="sa_txt02">선택한 조건</span>
							</div>						
						</div>
						<!-- SGIS4_생활권역 시작 -->	
						<div class="txt_box02 div_tot">							
							<p class="sa_txt01">전체 인구수</p><p class="sa_txt02" id="totPops" data-total="" data-total-ogl="" data-reset="00<span class='sa_txt04'>명</span>"><span class="sa_txt04">명</span></p>							
						</div>
						<!-- SGIS4_생활권역 끝 -->
						<div class="mode_box01">
						<!-- SGIS4_생활권역 시작 -->
							<a href="javascript:void(0)" class="switchBox">
								<span class="txt"></span>
								<span class="ball"></span>
							</a>						
<!-- 							<a href="javascript:void(0);" class="btn_basic active">총괄</a> -->
<!-- 							<a href="javascript:void(0);" class="btn_chartr">특성</a> -->
						<!-- SGIS4_생활권역 끝 -->
						</div>
						<div class="div_year">
							<p id="popBaseYear" class="sa_txt03" data-reset=""></p>
						</div>
						<div class="div_block">
							<div class="div_block_msg">
								<span>영역 내 인구 정보 값은 '0' 입니다.</span>
							</div>
						</div>																		
					</li>
					<li class="sec03">						
						<h4>가구</h4>
						<div class="div_basic">
							<div class="txt_box01">
								<div id="familyChart" class="reset chart"></div>
								<p class="sa_txt01" id="perFamilyTxt" data-reset=""></p>
								<p class="sa_txt02" id="perFamily" data-reset=""></p>
								<!-- SGIS4_생활권역 시작 -->
								<!-- SGIS4_1025_생활권역 시작 -->
								<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="family">
								<!-- SGIS4_1025_생활권역 끝 -->
									<span class="ball"></span>
								</a>
								<!-- SGIS4_생활권역 끝 -->
							</div>
							<div class="txt_box03">
							<!-- SGIS4_1025_생활권역 시작 -->
								<span class="cr01"></span><span class="sa_txt01 mR5">비친족 가구</span>
								<span class="cr02"></span><span class="sa_txt02">1인 가구</span>
								<span class="cr03"></span><span class="sa_txt03">친족 가구</span>
							<!-- SGIS4_1025_생활권역 끝 -->	
							</div>
						</div>
						<div class="div_chartr">
							<div class="txt_box01">
								<div id="familyCChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->								
								<p class="sa_txt01 mightOverflow" id="perFamilyCTxt"></p>
								<p class="sa_txt02" id="perFamilyC" data-reset="00.0%"></p>
								<p class="sa_txt03">전체 가구 중</p>
								<p class="sa_txt05" id="numFamilyC" data-reset="0가구"></p>
								<!-- SGIS4_생활권역 끝 -->								
							</div>
							<div class="txt_box03">
								<span class="cr01"></span><span class="sa_txt01 mR5">그 외(기타)</span>
								<span class="cr02"></span><span class="sa_txt02">선택한 조건</span>
							</div>						
						</div>
						<!-- SGIS4_생활권역 시작 -->
						<div class="txt_box02 div_tot">							
							<p class="sa_txt01">총 가구수</p><p class="sa_txt02" id="totFamily" data-total="" data-total-ogl="" data-reset="00<span class='sa_txt04'>가구</span>"><span class="sa_txt04">가구</span></p>							
						</div>
						<!-- SGIS4_생활권역 끝 -->						
						<div class="mode_box01">
						<!-- SGIS4_생활권역 시작 -->
							<a href="javascript:void(0)" class="switchBox">
								<span class="txt"></span>
								<span class="ball"></span>
							</a>						
<!-- 							<a href="javascript:void(0);" class="btn_basic active">총괄</a> -->
<!-- 							<a href="javascript:void(0);" class="btn_chartr">특성</a> -->
						<!-- SGIS4_생활권역 끝 -->						
						</div>
						<div class="div_year">
							<p id="familyBaseYear" class="sa_txt03" data-reset=""></p>
						</div>
						<div class="div_block">
							<div class="div_block_msg">
								<span>영역 내 가구 정보 값은 '0' 입니다.</span>
							</div>
						</div>
					</li>
					<li class="sec04">
						<h4>주택</h4>
						<div class="div_basic">
							<div class="txt_box01">
								<div id="houseChart" class="reset chart"></div>
								<p class="sa_txt01" id="perHouseTxt" data-reset=""></p>
								<p class="sa_txt02" id="perHouse" data-reset=""></p>
								<!-- SGIS4_생활권역 시작 -->
								<!-- SGIS4_1025_생활권역 시작 -->
								<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="house">
								<!-- SGIS4_1025_생활권역 끝 -->
									<span class="ball"></span>
								</a>
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<ul>
									<!-- SGIS4_1025_생활권역 시작 -->									
									<li class="list_st cb"><span class="cr01"></span><span class="sa_txt01">단독주택</span></li>
									<li class="list_st cb"><span class="cr02"></span><span class="sa_txt01">아파트</span></li>
									<!-- SGIS4_1025_생활권역 끝 -->
									<li class="list_st cb"><span class="cr03"></span><span class="sa_txt01">연립주택</span></li>								
									<li class="list_st cb"><span class="cr04"></span><span class="sa_txt01">다세대주택</span></li>
<!-- 									<li class="list_st cb"><span class="cr06"></span><span class="sa_txt01">주택이외의 거처</span></li> -->
									<li class="list_st cb"><span class="cr05"></span><span class="sa_txt01">비주거용 건물내 주택</span></li>
								</ul>
							</div>
						</div>
						<div class="div_chartr">
							<div class="txt_box01">
								<div id="houseCChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->								
								<p class="sa_txt01 mightOverflow" id="perHouseCTxt"></p>
								<p class="sa_txt02" id="perHouseC" data-reset="00.0%"></p>
								<p class="sa_txt03">전체 주택 중</p>
								<p class="sa_txt05" id="numHouseC" data-reset="0호"></p>
								<!-- SGIS4_생활권역 끝 -->								
							</div>
							<div class="txt_box03">
								<span class="cr01"></span><span class="sa_txt01 mR5">그 외(기타)</span>
								<span class="cr02"></span><span class="sa_txt02">선택한 조건</span>
							</div>						
						</div>
						<!-- SGIS4_생활권역 시작 -->						
						<div class="txt_box02 div_tot">
							<!-- SGIS4_1025_생활권역 시작 -->							
							<p class="sa_txt01">총 주택수</p><p class="sa_txt02" id="totHouse" data-total="" data-total-ogl="" data-reset="00<span class='sa_txt04'>호</span>"><span class="sa_txt04">호</span></p>
							<!-- SGIS4_1025_생활권역 끝 -->							
						</div>
						<!-- SGIS4_생활권역 끝 -->
						<div class="mode_box01">
						<!-- SGIS4_생활권역 시작 -->
							<a href="javascript:void(0)" class="switchBox">
								<span class="txt"></span>
								<span class="ball"></span>
							</a>						
<!-- 							<a href="javascript:void(0);" class="btn_basic active">총괄</a> -->
<!-- 							<a href="javascript:void(0);" class="btn_chartr">특성</a> -->
						<!-- SGIS4_생활권역 끝 -->
						</div>
						<div class="div_year">
							<p id="houseBaseYear" class="sa_txt03" data-reset=""></p>
						</div>
						<div class="div_block">
							<div class="div_block_msg">
								<span>영역 내 주택 정보 값은 '0' 입니다.</span>
							</div>
						</div>																		
					</li>
					<li class="sec05">
						<h4>사업체</h4>
						<div class="div_basic">
							<div class="txt_box01">
								<div id="coprChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->
								<p class="sa_txt01">전체 중 분포율 TOP3</p>
								<p class="sa_txt02" id="top3CoprPerAmongAll" data-reset="0개"></p>
								<!-- SGIS4_1025_생활권역 시작 -->
								<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="copr">
								<!-- SGIS4_1025_생활권역 끝 -->
									<span class="ball"></span>
								</a>
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<ul>
									<!-- SGIS4_생활권역 시작 -->
									<li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top1_copr_txt" data-reset="TOP1 사업체">한식 일반 음식점 (전체의 18.7%, TOP3의 42.4%)</span></li>
									<li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top2_copr_txt" data-reset="TOP2 사업체">커피전문점식점 (전체의 14.7%, TOP3의 31.4%)</span></li>
									<li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top3_copr_txt" data-reset="TOP3 사업체">한식 일반 음식점 (전체의 11.7%, TOP3의 26.4%)</span></li>
									<!-- SGIS4_생활권역 끝 -->
								</ul>
							</div>
						</div>
						<div class="div_chartr">			
							<div class="txt_box01">
								<div id="coprCChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->
								<p class="sa_txt01 mightOverflow" id="perCoprCTxt"></p>
								<p class="sa_txt02" id="perCoprC" data-reset="00.0%"></p>
								<p class="sa_txt03">전체 사업체 중</p>
								<p class="sa_txt05" id="numCoprC" data-reset="0개"></p>								
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<ul>
									<!-- SGIS4_생활권역 시작 -->									
									<li class="list_st"><span class="cr02"></span><span class="sa_txt01 mightOverflow" id="top2_coprC_txt" data-reset="선택한 조건">선택한 조건</span></li>
									<!-- SGIS4_생활권역 끝 -->
									<li class="list_st"><span class="cr01"></span><span class="sa_txt01 mightOverflow" id="top1_coprC_txt">그 외(기타)</span></li>
								</ul>
							</div>
						</div>
						<!-- SGIS4_생활권역 시작 -->
						<div class="txt_box02 div_tot">							
							<p class="sa_txt01">총 사업체수</p><p class="sa_txt02" id="totCopr" data-total="" data-total-ogl="" data-reset="00<span class='sa_txt04'>개</span>"><span class="sa_txt04">개</span></p>							
						</div>
						<!-- SGIS4_생활권역 끝 -->
						<div class="mode_box01">
						<!-- SGIS4_생활권역 시작 -->
							<a href="javascript:void(0)" class="switchBox">
								<span class="txt"></span>
								<span class="ball"></span>
							</a>						
<!-- 							<a href="javascript:void(0);" class="btn_basic active">총괄</a> -->
<!-- 							<a href="javascript:void(0);" class="btn_chartr">특성</a> -->
						<!-- SGIS4_생활권역 끝 -->
						</div>
						<div class="div_year">
							<p id="coprBaseYear" class="sa_txt03" data-reset=""></p>
						</div>
						<div class="div_block">
							<div class="div_block_msg">
								<span>영역 내 사업체 정보 값은 '0' 입니다.</span>
							</div>
						</div>																		
					</li>
					<li class="sec06">
						<h4>종사자</h4>
						<div class="div_basic">
							<div class="txt_box01">
								<div id="workerChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->
								<p class="sa_txt01">전체 중 분포율 TOP3</p>
								<p class="sa_txt02" id="top3WorkerPerAmongAll" data-reset="0명"></p>
								<!-- SGIS4_1025_생활권역 시작 -->
								<a href="javascript:void(0)" class="zoomBox" title="상세" data-type="employee">
								<!-- SGIS4_1025_생활권역 끝 -->
									<span class="ball"></span>
								</a>
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<ul>
									<!-- SGIS4_생활권역 시작 -->
									<li class="list_st"><span class="cr01" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top1_worker_txt" data-reset="TOP1 사업체">한식 일반 음식점 (전체의 18.7%, TOP3의 42.4%)</span></li>
									<li class="list_st"><span class="cr02" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top2_worker_txt" data-reset="TOP2 사업체">커피전문점식점 (전체의 14.7%, TOP3의 31.4%)</span></li>
									<li class="list_st"><span class="cr03" data-reset-clr="#d4d4d4"></span><span class="sa_txt01 mightOverflow" id="top3_worker_txt" data-reset="TOP3 사업체">한식 일반 음식점 (전체의 11.7%, TOP3의 26.4%)</span></li>
									<!-- SGIS4_생활권역 끝 -->
								</ul>
							</div>
						</div>
						<div class="div_chartr">						
							<div class="txt_box01">
								<div id="workerCChart" class="reset chart"></div>
								<!-- SGIS4_생활권역 시작 -->
								<p class="sa_txt01 mightOverflow" id="perWorkerCTxt"></p>
								<p class="sa_txt02" id="perWorkerC" data-reset="00.0%"></p>
								<p class="sa_txt03">전체 종사자 중</p>
								<p class="sa_txt05" id="numWorkerC" data-reset="0명"></p>								
								<!-- SGIS4_생활권역 끝 -->
							</div>						
							<div class="txt_box03">
								<ul>
									<!-- SGIS4_생활권역 시작 -->									
									<li class="list_st"><span class="cr02"></span><span class="sa_txt01 mightOverflow" id="top2_workerC_txt" data-reset="선택한 조건">선택한 조건</span></li>
									<!-- SGIS4_생활권역 끝 -->
									<li class="list_st"><span class="cr01"></span><span class="sa_txt01 mightOverflow" id="top1_workerC_txt">그 외(기타)</span></li>
								</ul>
							</div>
						</div>
						<!-- SGIS4_생활권역 시작 -->
						<div class="txt_box02 div_tot">							
							<p class="sa_txt01">총 종사자수</p><p class="sa_txt02" id="totWorker" data-total="" data-total-ogl="" data-reset="00<span class='sa_txt04'>명</span>"><span class="sa_txt04">명</span></p>							
						</div>
						<!-- SGIS4_생활권역 끝 -->
						<div class="mode_box01">
						<!-- SGIS4_생활권역 시작 -->
							<a href="javascript:void(0)" class="switchBox">
								<span class="txt"></span>
								<span class="ball"></span>
							</a>						
<!-- 							<a href="javascript:void(0);" class="btn_basic active">총괄</a> -->
<!-- 							<a href="javascript:void(0);" class="btn_chartr">특성</a> -->
						<!-- SGIS4_생활권역 끝 -->
						</div>
						<div class="div_year">
							<p id="workerBaseYear" class="sa_txt03" data-reset=""></p>
						</div>
						<div class="div_block">
							<div class="div_block_msg">
								<span>영역 내 종사자 정보 값은 '0' 입니다.</span>
							</div>
						</div>																		
					</li>
				</ul>
			</div>
			<!-- SGIS4_1025_생활권역 시작 -->
			<!-- 데이터보드 개별 상세보기 -->
			<div class="pop_content scroll_wrap scroll_04" id="detail_data_popup" style="display:none;">
				<!-- 타이틀 -->
				<a href="javascript:void(0);">
					<h2 class="detail_back_btn" id="datail_data_type">인구</h2>
					<span style="margin-left: 10px;" id="datail_data_year">2019년 기준</span>
				</a>
				<div class="iconBox">	<!-- SGIS4_1029_생활권역 -->
      				<button type="button" class="imgSaveBtn" name="imgSaveBtn" title="이미지 저장" onclick="javascript:$catchmentAreaMain.ui.doCapture('.pop_statistics');"></button>
    			</div>
				<!-- 검색조건 선택 X -->
				<div class="basicDtl" id="basicDetail">
					<!-- 차트 -->
					<div class="basicDtlChtBox">
						<div id="basicDetailChart" class="basicDtlCht"></div>
					</div>
					<!-- 범례 -->
					<div class="basicDtlLgdBox">
						<div id="basicDatilLengd" class="basicDtlLgd"></div>
					</div>
					<!-- 표 -->
					<div class="basicDtlTblBox scroll_wrap scroll_13">
						<div class="basicDtlTbl" data-mcs-theme="rounded-dots">
							<table style="table-layout: fixed;" class="datail_table">
								<colgroup>
									<col width="10%"/>
									<col width="50%"/>
									<col width="20%"/>
									<col width="20%"/>
								</colgroup>
								<thead>
									<tr id="db_normal_tb">
										<th scope="col">구분</th>
										<th scope="col" class="th_result">항목</th>
										<th scope="col" class="th_result">값</th>
										<th class="th_yoy" scope="col">비율(%)</th>
									</tr>
								</thead>
								<tbody id="detail_data_list">
								</tbody>
							</table>
						</div>
					</div>
					<div class="txt_box02">
						<p class="sa_txt02" id="basicDetailTot" data-reset=""></p>
					</div>	
				</div>
				<!-- 검색조건 선택 O -->
				<div id="chkDetail" style="display:none;">
					<div style="display:none;" id="noDataMsg">
						<span>영역 통계 세부항목을 설정 후 [조회] 버튼을 클릭하세요.</span>
					</div>
					<!-- 인구 -->
					<div id="dPopDiv" style="display:none;">
						<!-- 상세조건 차트 -->
						<div class="dTop">
							<div class="dChartDiv" id="popDChart"></div>
							<div class="txt_box03">
								<span class="cr02"></span>
								<span class="sa_txt02 mR5">선택한 조건 :</span>
								<span class="sa_txt03 mightOverflow" id="dPopType"></span>
							</div>
							<div class="dChartTextDiv">
								<p class="dChartText01" id="dPopTot"></p>
								<p class="dChartText03">선택한 조건
									<span class="dChartTextHl02" id="dPopitemCnt"></span>
									<span class="dChartTextHl03">명</span>								
								</p>
							</div>						
						</div>
						<!-- 선택조건 남여인구 -->
						<div class="dTop_sub01">
							<!--<h5 style="font-size:16px;">선택한 조건 내 남/여 인구</h5>-->
							<!-- 남 -->
							<div class="dTop_man"><img src="/images/catchmentArea/man_ico.png"/></div>
							<div class="dTop_man_txt">
								<span>남자</span>
								<span class="hl" id="dMen"></span>
								<span>명</span>
							</div>
							<!-- 여 -->
							<div class="dTop_woman"><img src="/images/catchmentArea/woman_ico.png"/></div>
							<div class="dTop_woman_txt">
								<span>여자</span>
								<span class="hl" id="dWoman"></span>
								<span>명</span>
							</div>
						</div>
						<!-- 영역 내 인구수 -->
						<div class="dSec">
							<div class="dSec_title">
								<h5 style="font-size:16px; float:left;" id="popTotTitle">영역 내 전체인구의 연령구간별 인구 수</h5>
								<!-- SGIS4_1029_생활권역 시작 -->
								<div id="popTotBtn" class="dSec_btn_box">								
									<a href="javascript:void(0);" class="dSec_div_btn w50" data-totStat-type="age_5">5세</a>
									<a href="javascript:void(0);" class="dSec_div_btn w50" data-totStat-type="age_10">10세</a>
									<a href="javascript:void(0);" class="dSec_div_btn w70" data-totStat-type="age_define">주요구간</a>
								</div>
								<!-- SGIS4_1029_생활권역 끝 -->
							</div>
							<div class="dSec_chart">
								<div id="popTotDChart"></div>
							</div>
						</div>
					</div>
					<!-- 가구 -->
					<div style="display:none;" id="dFamilyDiv">
						<!-- 상세조건 차트 -->
						<div class="dTop">
							<div class="dChartDiv" id="familyDChart"></div>
							<div class="txt_box03">
								<!--<span class="cr01"></span><span class="sa_txt01 mR5">그 외(기타)</span>-->
								<span class="cr02"></span>
								<span class="sa_txt02 mR5">선택한 조건 :</span>
								<span class="sa_txt03 mightOverflow" id="dFamilyType"></span>
							</div>
							<div class="dChartTextDiv">
								<p class="dChartText01" id="dFamilyTot"></p>
								<!--<p align="right" class="dChartText02" id="dFamilyType"></p>-->
								<p class="dChartText03">선택한 조건
									<span class="dChartTextHl02" id="dFamilyitemCnt"></span>
									<span class="dChartTextHl03">가구</span>								
								</p>
							</div>
						</div>
						<!-- 영역 내 인구수 -->
						<div class="dSec">
							<div class="dSec_title2">
								<h5 style="font-size:16px;">영역 내 전체가구의 세대구성별 가구 수</h5>
							</div>
							<!-- 차트(친족 가구) -->
							<div id="familyTotDPieChart" style="height:185px;"></div>
							<!-- 표(세대가구) -->
							<div class="dSec_title2">
								<h5 style="font-size:16px;">영역 내 친족 가구 중 세대별 가구 수</h5>
							</div>
							<div id="familyTotDBarChart" style="height:185px;"></div>
						</div>
					</div>
					<!-- 주택 -->
					<div style="display:none;" id="dHouseDiv">
						<!-- 상세조건 차트 -->
						<div class="dTop">
							<div class="dChartDiv" id="houseDChart"></div>
							<div class="txt_box03">
								<span class="cr02"></span>
								<span class="sa_txt02 mR5">선택한 조건 :</span>
								<span class="sa_txt03 mightOverflow" id="dHouseType"></span>
							</div>
							<div class="dChartTextDiv">
								<p class="dChartText01" id="dHouseTot"></p>
								<p class="dChartText03">선택한 조건
									<span class="dChartTextHl02" id="dHouseitemCnt"></span>
									<span class="dChartTextHl03">호</span>								
								</p>
							</div>						
						</div>
						<!-- 영역 내 주택수 -->
						<div class="dSec">
							<div class="dSec_title">
								<h5 style="font-size:16px; float:left;">영역 내 전체주택의 특성별 주택 수</h5>
								<!-- SGIS4_1029_생활권역 시작 -->
								<div id="houseTotBtn" class="dSec_btn_box">
									<a href="javascript:void(0);" class="dSec_div_btn w70" data-totStat-type="resid_type">주택종류</a>
									<!--<a href="javascript:void(0);" class="dSec_div_btn w70" data-totStat-type="const_year">건축년도</a>-->
									<a href="javascript:void(0);" class="dSec_div_btn w70" data-totStat-type="area">연 면적</a>
								</div>
								<!-- SGIS4_1029_생활권역 끝 -->
							</div>
							<div class="dSec_chart2">
								<div id="houseTotDBarChart"></div>
							</div>
						</div>
					</div>
					<!-- 사업체 -->
					<div style="display:none;" id="dCoprDiv">
						<!-- 상세조건 차트 -->
						<div class="dTop">
							<div class="dChartDiv" id="coprDChart"></div>
							<div class="txt_box03">
								<span class="cr02"></span>
								<span class="sa_txt02 mR5">선택한 조건 :</span>
								<span class="sa_txt03 mightOverflow" id="dCoprType"></span>
							</div>
							<div class="dChartTextDiv">
								<p class="dChartText01" id="dCoprTot"></p>
								<p class="dChartText03">선택한 조건
									<span class="dChartTextHl02" id="dCopritemCnt"></span>
									<span class="dChartTextHl03">개</span>								
								</p>
							</div>						
						</div>
						<!-- 영역 내 사업체수 -->
						<div class="dSec">
							<div class="dSec_title">
								<h5 style="font-size:16px;">영역 내 특성별 사업체수</h5>
							</div>
							<div class="dSec_chart2">
								<div id="coprTotDBarChart"></div>
							</div>
						</div>
					</div>
					<!-- 종사자 -->
					<div style="display:none;" id="dEmployeeDiv">
						<!-- 상세조건 차트 -->
						<div class="dTop">
							<div class="dChartDiv" id="employeeDChart"></div>
							<div class="txt_box03">
								<span class="cr02"></span>
								<span class="sa_txt02 mR5">선택한 조건 :</span>
								<span class="sa_txt03 mightOverflow" id="dEmployeeType"></span>
							</div>
							<div class="dChartTextDiv">
								<p class="dChartText01" id="dEmployeeTot"></p>
								<p class="dChartText03">선택한 조건
									<span class="dChartTextHl02" id="dEmployeeitemCnt"></span>
									<span class="dChartTextHl03">명</span>								
								</p>
							</div>						
						</div>
						<!-- 영역 내 종사자수 -->
						<div class="dSec">
							<div class="dSec_title">
								<h5 style="font-size:16px;">영역 내 특성별 종사자수</h5>
							</div>
							<div class="dSec_chart2">
								<div id="employeeTotDBarChart"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- SGIS4_1025_생활권역 끝 -->
		</div>
		<!-- 격자 데이터 보드 -->
		<div class="pop_statistics pop_chk02">
			<div class="pop_title">
<!-- 				<select class="selct_05" id="bYearSel03"></select>				 -->
				<span id="titleYearTxt_2"></span>
				<strong id="titleAreaTxt_2"></strong>
				<span id="titleTypeTxt_2"></span>							
<!-- 				<span class="left">2019년</span> -->
<!-- 				<strong  class="center" id="titleAreaTxt_2">수원 월드컵경기장</strong> -->
<!-- 				<div class="title_wrap01"> -->
<!-- 					<div class="btn_left"></div> -->
<!-- 					<span class="btn_text" id="titleTypeTxt_2">반경 6KM</span> -->
<!-- 					<div class="btn_right"></div> -->
<!-- 				</div> -->
			</div>
			<a href="javascript:void(0);" class="close_btn02"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			<div class="pop_content">
				<div class=" scroll_wrap scroll_03">
					<!-- 통계정보 -->
					<div class="info info_statistics">
							<h5>격자 단위 통계정보
							<a id="gridDataBordInfo" data-subj="격자 단위 통계정보" href="javascript:void(0)"  title="<p class='subC'>영역에 포함되는 격자를 기준으로 통계정보를 제공하고 있으며, 기초자료를 기반으로 비밀보호기법을 적용하여 각각의 값을 계산하므로 부분의 합계와 전체 합계가 일치하지 않을 수 있습니다. 클릭하면 자세한 설명을 볼 수 있습니다.</p>">
							<img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
								<!--  
								<a id="gridDataBordInfo" data-subj="격자 단위 통계정보" href="javascript:void(0)"  title="<p class='subC'>영역에 속하는 격자 기반의 통계값을 기준으로 비밀보호기법을 적용하여 값을 표출하고 있으며, 다음과 같이 값을 해석하면 됩니다.</p>
								<table class='subT'>
									<thead>
       									<tr>
          									<th colspan='2'>인구/가구/주택</th><th colspan='2'>사업체/종사자</th>
        								</tr>
        								<tr>
          									<th>생활권역 통계지도에서 제공하는 값</th><th>실제 값</th><th>생활권역 통계지도에서 제공하는 값</th><th>실제 값</th>
        								</tr>
      								</thead>
      								<tbody>
      									<tr>
          									<td>0</td><td>0, 1, 2, 3, 4 중 하나</td><td>0</td><td>0, 1, 2 중 하나</td>
        								</tr>
        								<tr>
          									<td>1~4</td><td>미제공</td><td>1~2</td><td>미제공</td>
        								</tr>
        								<tr>
          									<td>5</td><td>1, 2, 3, 4, 5 중 하나</td><td>3</td><td>1, 2, 3 중 하나</td>
        								</tr>
        								<tr>
											<td>6 이상의 값 M</td><td>M-2, M-1, M, M+1, M+2 중 하나 (일부 자료 M-7 ~ M+7)*</td><td>4 이상의 값 N</td><td>N-1, N, N+1 중 하나 (일부 자료 N-4 ~ N+4)*</td>
        								</tr>
        								<tr>
          									<td colspan='4'>* 단, 일부 자료(전체 격자 자료 중 약 1%)는 해당 값을 통하여 작은 단위의 통계정보를 파악할 수 있다고 판단되어,이를 방지하기 위해 추가적으로 값을 처리함</td>
        								</tr>
      								</tbody>
								</table>
								<p>인구·가구·주택 정보는 인구주택총조사(등록센서스) 자료, 사업체·종사자 정보는 전국사업체좌(또는 경제총조사) 자료를 기반으로 생성합니다.</p>
							">
							<img src="/images/catchmentArea/question_icon.png" alt="도움말"></a>
							-->
 							</h5>
						<!-- 전체통계 -->
						<div class="box_info all_info">
							<strong>
								영역 전체 격자 및 통계정보
							</strong>
							<div class="txt_box h160">
								<p><span class="w120">격자크기</span><span class="fontF01" id="grid_size_txt">100m x100m</span></p>
								<p><span class="w120">영역 내 격자 개수</span><span class="fontF01" id="grid_count_txt">38,400</span></p>
								<p><span class="w120">총 격자 면적</span><span class="fontF01" id="grid_area_txt">36,840,000 ㎢</span></p>
								<p><span class="w120">행정구역</span></p>
								<span id="grid_bordRange_txt" class="fontF01 line_break mightOverflow">경기도 수원시 팔달구,영통구,장안구</span>								
							</div>
						</div>
						<div class="box_info all_info_right">
							<div class="txt_box h160">
								<p><span id="grid_totSum_txt">영역 전체 1km 격자 기반 인구수</span></p>
								<p class="noBef" style="height:26px;">
									<span id="grid_statTitle_txt" class="mightOverflow">(성별전체, 연령전체)</span>
									<span id="gridDataBordStatsInfo" data-subj="영역 전체 총 값" href="javascript:void(0)"  title="<p class='subC'>격자기반 통계정보의 비밀보호기법(BSCA)을 적용한 값으로, 격자 각각의 단순합계와 차이가 있습니다.</p>"><img src="/images/catchmentArea/ico_tooltip01.png" alt="도움말"></span>									
								</p>
								<p class="noBef">: <span class="fontF01" id="grid_totSum"></span></p>																
<!-- 								<p><span class="w125" id="grid_totAvg_txt">격자 당 평균</span><span class="fontF01" id="grid_totAvg"></span></p> -->
							</div>
						</div>						
						<!--// 전체통계 -->

						<!-- 그래프 영역 -->
						<div class="gird_graph_header">							
							<span class="btn_left" id="gird_graph_left"></span>
							<span class="gird_graph_title" id="gird_graph_title" data-subj="">격자 1개당 평균 인구 수 변화</span>
							<span class="btn_right active" id="gird_graph_right"></span>
							<p>선택 조건 : <span id="gird_graph_schCond" class="mightOverflow"></span></p>
						</div>
						<div class="graph_area" id="gridStatChart_left"></div>
						<div class="graph_area2" id="gridStatChart_right"></div>
						<!--// 그래프영역 -->
					</div>
					<!--// 통계정보 -->

					<!-- 격자정보 -->
<!-- 					<div class="info info_grid"> -->
<!-- 						<h5>격자정보</h5> -->
<!-- 						<div class="box_info all_info"> -->
<!-- 							<strong> -->
<!-- 								전체 격자 정보 -->
<!-- 							</strong> -->
<!-- 							<div class="txt_box"> -->
<!-- 								<p><span class="w100">격자크기</span><span class="fontF01" id="grid_size_txt">100m x100m</span></p> -->
<!-- 								<p><span class="w100">영역 내 격자 개수</span><span class="fontF01" id="grid_count_txt">38,400</span></p> -->
<!-- 								<p><span class="w100">총 격자 면적</span><span class="fontF01" id="grid_area_txt">36,840,000m<sup>2</sup></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="box_info select_info"> -->
<!-- 							<strong> -->
<!-- 								선택 격자 정보 -->
<!-- 							</strong> -->
<!-- 							<div class="txt_box" style="height:111px;"> -->
<!-- 								<p><span class="w100">선택 격자 이름</span><span class="fontF01" id="select_gridNm"></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<!--// 격자정보 -->

					<!-- 범례 -->
					<div class="info info_legend clearfix">
						<strong>범례 및 선택한 격자 정보</strong>
						<div class="legendList" style="float:left">
						<div class="legend_list" id="legendListDiv1">
							<!-- SGIS4_1025_생활권역_상세분석  시작 -->
							<ul>
								<li class="lev7" id="lev7"></li>
								<li class="lev6" id="lev6"></li>
								<li class="lev5" id="lev5"></li>
								<li class="lev4" id="lev4"></li>
								<li class="lev3" id="lev3"></li>
								<li class="lev2" id="lev2"></li>
								<li class="lev1" id="lev1"></li>
								<li class="lev0" id="lev0">빈격자</li>
							</ul>
						</div>
						<div class="legend_cnt_list">
							<ul>
								<li class="lev7" id="levCnt7"></li>
								<li class="lev6" id="levCnt6"></li>
								<li class="lev5" id="levCnt5"></li>
								<li class="lev4" id="levCnt4"></li>
								<li class="lev3" id="levCnt3"></li>
								<li class="lev2" id="levCnt2"></li>
								<li class="lev1" id="levCnt1"></li>
								<li class="lev0" id="levCnt0">빈격자</li>
							</ul>
							<!-- SGIS4_1025_생활권역_상세분석  끝-->
						</div>
						</div>
<!-- 						<div class="box_info all_info"> -->
<!-- 							<div class="txt_box"> -->
<!-- 								<p><span class="w60">통계명칭</span><span id="grid_statTitle_txt" class="mightOverflow">(성별전체, 연령전체) 인구수</span></p> -->
<!-- 								<p><span class="w60">산출방식</span><span id="grid_statCalcMethod_txt">합계(명)</span></p> -->
<!-- 								<p><span class="w60">행정구역</span><span id="grid_bordRange_txt" class="mightOverflow">경기도 수원시 팔달구,영통구,장안구</span></p> -->
<!-- 								<p><span class="w60">전체통계</span><span id="grid_legendTot_txt">348,800</span></p> -->
<!-- 							</div> -->
<!-- 						</div>						 -->
						<!-- 선택 격자 통계 -->
						<div class="box_info select_info">
							<div class="txt_box h165">
								<p><span id="grid_selSum_txt">선택한 격자의 인구수</span></p>
								<p class="noBef" style="height:26px;">
									<span id="grid_statTitle_txt2" class="mightOverflow">(성별전체, 연령전체)</span>
								</p>
								<p class="noBef">: <span class="fontF01" id="select_grid_sum"></span></p>									
								<p><span class="w100">선택한 격자 범례</span><span class="fontF01"><i class="lev" id="select_legend"></i></span>
									<span class="fontF01" id="select_legend_txt" title="범례 구간"></span></p>								
								<p><span class="w100">선택한 격자 이름</span><span class="fontF01" id="select_gridNm"></span></p>
							</div>
						</div>
						<!--// 선택 격자 통계 -->						
					</div>
					<!--// 범례 -->
				</div>
			</div>
		</div>
		<!-- //격자자 업 -->
		
		<!-- 상세분석 격자 -->
		<!-- SGIS4_1025_생활권역 시작 -->
		<div class="pop_statistics pop_chk03 diff_with_original">
			<!-- SGIS4_1027_생활권역 시작 --> 
			<div class="pop_title" id="detail_search_pop"> <!--//SGIS4_생활권역_상세분석  상세 분석으로 데이터 보드 그릴 때 ui가 맞지 않아서 따로 id 추가 -->
<!-- 				<select class="selct_05" id="bYearSel03"></select>				 -->
				<span id="titleYearTxt_3" class="mightOverflow">2018년</span> <!--SGIS4_생활권역_상세분석 CSS수정  -->
				<!-- SGIS4_1025_생활권역 끝 -->
				<strong id="titleAreaTxt_3">공간적 비교</strong>
				<span id="titleTypeTxt_3">주행시간 5분</span>							
<!-- 				<span class="left">2019년</span> -->
<!-- 				<strong  class="center" id="titleAreaTxt_2">수원 월드컵경기장</strong> -->
<!-- 				<div class="title_wrap01"> -->
<!-- 					<div class="btn_left"></div> -->
<!-- 					<span class="btn_text" id="titleTypeTxt_2">반경 6KM</span> -->
<!-- 					<div class="btn_right"></div> -->
<!-- 				</div> -->
			</div>
			<!-- SGIS4_1027_생활권역 끝 -->
			<a href="javascript:void(0);" class="close_btn03"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			<div class="pop_content">
				<div class=" scroll_wrap scroll_09">
					<!-- 통계정보 -->
					<div class="info info_statistics">
						<h5>격자 단위 통계정보</h5>
						<!-- 전체통계 -->
						<!-- SGIS4_1025_생활권역_상세분석  시작 -->
						<strong class="detail_databoard_strong all">영역 전체 격자 및 통계정보</strong>
						<div class="box_info all_info left" style="width: 49.5%">
							<div class="detail_subtitle left">
								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
								<span>위치1: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span>
							</div>
							<div class="txt_box" style="padding:5px 10px 5xp 5px;">
							<!-- SGIS_4 수정 시작 -->
							<%--
								<p><span class="w120 detail_grid_tot" id="grid_totSum_txt_left"></span><span class="fontF01 left" id="grid_totSum_detail_left"></span></p>
<!-- 								<p><span class="w120 detail_grid_avg" id="grid_totAvg_txt_left"></span><span class="fontF01 left" id="grid_totAvg_detail_left"></span></p> -->
								<p><span class="w120">격자크기</span><span class="fontF01 grid_size_detail left">100m x100m</span></p>
								<p><span class="w120">영역 내 격자 개수</span><span class="fontF01 grid_count_detail left">38,400</span></p>
								<p><span class="w120">총 격자 면적</span><span class="fontF01 grid_area_detail left">36,840,000m ㎢</span></p>
							--%>
								<p><span class="w120">격자크기</span><span class="fontF01 grid_size_detail left">100m x100m</span></p>
								<p><span class="w120">영역 내 격자 개수</span><span class="fontF01 grid_count_detail left">38,400</span></p>
								<p><span class="w120">총 격자 면적</span><span class="fontF01 grid_area_detail left">36,840,000m ㎢</span></p>
								<p><span class="w60">행정구역</span></p>
								<p class="noBef"><span class="admNm_detail left mightOverflow" id="grid_bordRange_txt_left">경기도 수원시 팔달구,영통구,장안구</span></p>
							<!-- SGIS_4 수정 끝 -->								
							</div>
						</div>
						
						<div class="box_info all_info legend_detail_left" style="margin-bottom: 5px; width: 49.5%;padding-top: 30px;">
						    	
						    	 
						        <div class="txt_box detail_legend_box left" style="padding-bottom: 71px; padding-top: 14px;">
						        <!-- SGIS_4 수정 시작 -->
						        <%--
						            <p><span class="w60">통계명칭</span><span class="statsNm_detail left mightOverflow" id="grid_statTitle_txt_left">(성별전체, 연령전체) 인구수</span></p>
						            <p><span class="w60">산출방식</span><span class="calcMethod_detail left" id="grid_statCalcMethod_txt_left">합계(명)</span></p>
						            <p><span class="w60">행정구역</span><span class="admNm_detail left mightOverflow" id="grid_bordRange_txt_left">경기도 수원시 팔달구,영통구,장안구</span></p>
						            <p><span class="w60">전체통계</span><span class="totalStats_detail left" id="grid_legendTot_txt_left">348,800</span></p>
						        --%>
						        	<!-- SGIS4_1027_생활권역 시작 -->
						        	<p><span id="grid_statTilte_left">영역 전체 100m 격자 기반 인구 수</span></p>
						        	<!-- SGIS4_1027_생활권역 끝 -->
						        	<p class="noBef" style="height:26px;">[<span class="statsNm_detail left mightOverflow" id="grid_statTitle_txt_left">(성별전체, 연령전체) 인구수</span>]</p>
						        	<p class="noBef">: <span class="totalStats_detail left" id="grid_legendTot_txt_left">348,800</span></p>
						        </div>
						        <!-- SGIS_4 수정 끝 -->	
						</div>
						
						<div class="box_info all_info right" style="width: 49.5%">
							<div class="detail_subtitle right">
								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
								<span>위치2: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span>
							</div>
							<div class="txt_box" style="padding:5px 10px 5xp 5px;">
							<!-- SGIS_4 수정 시작 -->
							<%-- 
								<p><span class="w120 detail_grid_tot" id="grid_totSum_txt_right"></span><span class="fontF01 right" id="grid_totSum_detail_right"></span></p>
<!-- 								<p><span class="w120 detail_grid_avg" id="grid_totAvg_txt_right"></span><span class="fontF01 right" id="grid_totAvg_detail_right"></span></p> -->
								<p><span class="w120">격자크기</span><span class="fontF01 grid_size_detail right">100m x100m</span></p>
								<p><span class="w120">영역 내 격자 개수</span><span class="fontF01 grid_count_detail right">38,400</span></p>
								<p><span class="w120">총 격자 면적</span><span class="fontF01 grid_area_detail right">36,840,000 ㎢</span></p>
							--%>
								<p><span class="w120">격자크기</span><span class="fontF01 grid_size_detail right">100m x100m</span></p>
								<p><span class="w120">영역 내 격자 개수</span><span class="fontF01 grid_count_detail right">38,400</span></p>
								<p><span class="w120">총 격자 면적</span><span class="fontF01 grid_area_detail right">36,840,000 ㎢</span></p>
								<p><span class="w60">행정구역</span></p>
								<p class="noBef"><span class="admNm_detail right mightOverflow" id="grid_bordRange_txt_right">경기도 수원시 팔달구,영통구,장안구</span></p>						
							<!-- SGIS_4 수정 끝 -->
							</div>
						</div>
						
						<div class="box_info all_info legend_detail_right" style="width: 49.5%;padding-top: 30px;">
						        <div class="txt_box detail_legend_box right" style="padding-top: 13px;padding-bottom: 71px;">
						        <!-- SGIS_4 수정 시작 -->
						        <%-- 
						            <p><span class="w60">통계명칭</span><span class="statsNm_detail right mightOverflow" id="grid_statTitle_txt_right">(성별전체, 연령전체) 인구수</span></p>
						            <p><span class="w60">산출방식</span><span class="calcMethod_detail right" id="grid_statCalcMethod_txt_right">합계(명)</span></p>
						            <p><span class="w60">행정구역</span><span class="admNm_detail right mightOverflow" id="grid_bordRange_txt_right">경기도 수원시 팔달구,영통구,장안구</span></p>
						            <p><span class="w60">전체통계</span><span class="totalStats_detail right" id="grid_legendTot_txt_right">348,800</span></p>
						        --%>
						        <!-- SGIS4_1027_생활권역 시작 -->
						        <p><span id="grid_statTilte_right">영역 전체 100m 격자 기반 인구 수</span></p>
						        <!-- SGIS4_1027_생활권역 끝 -->
						        <p class="noBef" style="height:26px;">[<span class="statsNm_detail right mightOverflow" id="grid_statTitle_txt_right">(성별전체, 연령전체) 인구수</span>]</p>
						    	<p class="noBef">: <span class="totalStats_detail right" id="grid_legendTot_txt_right">348,800</span></p>
						    	
						        <!-- SGIS_4 수정 끝 -->
						        </div>
						</div>
						<!--// 전체통계 -->    
						<!-- 선택 격자 통계 -->
						
						<!-- <strong class="detail_databoard_strong select_grid">선택한 격자 및 통계정보</strong>
						<div class="box_info select_info left" style="width: 49.5%">
							<div class="detail_subtitle left">
								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
								<span>위치1: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span>
							</div>
							<div class="txt_box">
								<p><span class="w90">선택 격자 범례</span><span class="fontF01"><i class="lev" id="select_legend_left"></i></span></p>
								<p><span class="w90">선택 격자 통계</span><span class="fontF01" id="select_grid_sum_left"></span></p>
								<p><span class="w90">선택 격자 이름</span><span class="fontF01" id="select_gridNm_left"></span></p>
							</div>
						</div>
						<div class="box_info select_info right" style="width: 49.5%">
							<div class="detail_subtitle right">
								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
								<span>위치2: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span>
							</div>
							<div class="txt_box">
								<p><span class="w90">선택 격자 범례</span><span class="fontF01"><i class="lev" id="select_legend_right"></i></span></p>
								<p><span class="w90">선택 격자 통계</span><span class="fontF01" id="select_grid_sum_right"></span></p>
								<p><span class="w90">선택 격자 이름</span><span class="fontF01" id="select_gridNm_right"></span></p>
							</div>
						</div> -->						
						<!--// 선택 격자 통계 -->
					</div>
					<!-- 범례 -->
					<div class="info info_legend">
						<div id="detailAnal_legend_header" class="info_legend_head">
							<h5 style="margin-bottom: 0; display: inline-block; vertical-align: middle; margin-right: 20px;">범례 및 분포현황</h5>
							<input type="radio" name="detail_databoard_legend_standard" id="legend_standard_left" checked="checked">
							<label for="legend_standard_left">위치1 기준</label>
							<input type="radio" name="detail_databoard_legend_standard" id="legend_standard_right">
							<label for="legend_standard_right">위치2 기준</label>
						</div>
						<!-- SGIS4_1027_생활권역 시작 -->
						<div class="legend_area_detail">						
							<div class="lgd_box">
								<span class="cr01"></span><span class="sa_txt01" id="detailAnal_lgd01_nm"></span>
								<span class="cr02"></span><span class="sa_txt02" id="detailAnal_lgd02_nm"></span>
							</div>					
						</div>
						<!-- SGIS4_1027_생활권역 끝 -->
						<div class="legend_list detail">
							<ul>
								<li class="lev7" id="lev7_detail"></li>
								<li class="lev6" id="lev6_detail"></li>
								<li class="lev5" id="lev5_detail"></li>
								<li class="lev4" id="lev4_detail"></li>
								<li class="lev3" id="lev3_detail"></li>
								<li class="lev2" id="lev2_detail"></li>
								<li class="lev1" id="lev1_detail"></li>
								<li class="lev0" id="lev0_detail">빈격자</li>
							</ul>
						</div>
						<div class="legend_cnt_list detail">
							<ul>
								<li class="lev7" id="levCnt7_detail"></li>
								<li class="lev6" id="levCnt6_detail"></li>
								<li class="lev5" id="levCnt5_detail"></li>
								<li class="lev4" id="levCnt4_detail"></li>
								<li class="lev3" id="levCnt3_detail"></li>
								<li class="lev2" id="levCnt2_detail"></li>
								<li class="lev1" id="levCnt1_detail"></li>
								<li class="lev0" id="levCnt0_detail">빈격자</li>
							</ul>
						</div>
						<!-- <div class='box_info_multiLine' style="float: left;width: 240px;overflow: hidden;">
						    <div class="box_info all_info legend_detail_left" style="margin-bottom: 5px; width: 100%;">
						    	<div class="detail_subtitle left">
									<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
									<span>위치1: </span><span style="width: 165px;" class="mightOverflow">매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소 매우 긴 주소</span>
								</div>
						        <div class="txt_box detail_legend_box left">
						            <p><span class="w60">통계명칭</span><span class="statsNm_detail left mightOverflow" id="grid_statTitle_txt_left">(성별전체, 연령전체) 인구수</span></p>
						            <p><span class="w60">산출방식</span><span class="calcMethod_detail left" id="grid_statCalcMethod_txt_left">합계(명)</span></p>
						            <p><span class="w60">행정구역</span><span class="admNm_detail left mightOverflow" id="grid_bordRange_txt_left">경기도 수원시 팔달구,영통구,장안구</span></p>
						            <p><span class="w60">전체통계</span><span class="totalStats_detail left" id="grid_legendTot_txt_left">348,800</span></p>
						        </div>
						    </div>
						    <div class="box_info all_info legend_detail_right" style="width: 100%;">
						    	<div class="detail_subtitle right">
									<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;">
									<span>위치2: </span><span style="width: 165px;" class="mightOverflow">대전광역시 서구 도안동 14</span>
								</div>
						        <div class="txt_box detail_legend_box right">
						            <p><span class="w60">통계명칭</span><span class="statsNm_detail right mightOverflow" id="grid_statTitle_txt_right">(성별전체, 연령전체) 인구수</span></p>
						            <p><span class="w60">산출방식</span><span class="calcMethod_detail right" id="grid_statCalcMethod_txt_right">합계(명)</span></p>
						            <p><span class="w60">행정구역</span><span class="admNm_detail right mightOverflow" id="grid_bordRange_txt_right">경기도 수원시 팔달구,영통구,장안구</span></p>
						            <p><span class="w60">전체통계</span><span class="totalStats_detail right" id="grid_legendTot_txt_right">348,800</span></p>
						        </div>
						    </div>
						</div> -->
						<!-- 그래프 영역 -->
						<div class="graph_area_detail" id="detailGridChart"></div>
						<!--// 그래프영역 -->
					</div>
					<!--// 범례 -->					
					<!-- SGIS4_1025_생활권역_상세분석  끝 -->
					<!--// 통계정보 -->

					<!-- 격자정보 -->
<!-- 					<div class="info info_grid" style="margin-bottom: 20px;"> -->
<!-- 						<h5>격자정보</h5> -->
<!-- 						<strong class="detail_databoard_strong all">전체 격자 정보</strong> -->
<!-- 						<div class="box_info all_info" style="width: 49.5%"> -->
<!-- 							<div class="detail_subtitle left"> -->
<!-- 								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;"> -->
<!-- 								<span>위치1: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span> -->
<!-- 							</div> -->
<!-- 							<div class="txt_box detail_grid_info_box left detail"> -->
<!-- 								<p><span class="w100">격자크기</span><span class="fontF01 grid_size_detail left">100m x100m</span></p> -->
<!-- 								<p><span class="w100">영역 내 격자 개수</span><span class="fontF01 grid_count_detail left">38,400</span></p> -->
<!-- 								<p><span class="w100">총 격자 면적</span><span class="fontF01 grid_area_detail left">36,840,000m<sup>2</sup></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="box_info all_info right" style="width: 49.5%"> -->
<!-- 							<div class="detail_subtitle right"> -->
<!-- 								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;"> -->
<!-- 								<span>위치2: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span> -->
<!-- 							</div> -->
<!-- 							<div class="txt_box detail_grid_info_box right detail"> -->
<!-- 								<p><span class="w100">격자크기</span><span class="fontF01 grid_size_detail right">100m x100m</span></p> -->
<!-- 								<p><span class="w100">영역 내 격자 개수</span><span class="fontF01 grid_count_detail right">38,400</span></p> -->
<!-- 								<p><span class="w100">총 격자 면적</span><span class="fontF01 grid_area_detail right">36,840,000m<sup>2</sup></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<strong class="detail_databoard_strong select_grid">선택 격자 정보</strong> -->
<!-- 						<div class="box_info select_info" style="width: 49.5%"> -->
<!-- 							<div class="detail_subtitle left"> -->
<!-- 								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;"> -->
<!-- 								<span>위치1: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span> -->
<!-- 							</div> -->
<!-- 							<div class="txt_box" style="height:auto;"> -->
<!-- 								<p><span class="w100">선택 격자 이름</span><span class="fontF01" id="select_gridNm_left"></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 						<div class="box_info select_info text_box_detail" style="width: 49.5%"> -->
<!-- 							<div class="detail_subtitle right"> -->
<!-- 								<img src="/images/catchmentArea/pop_ico01.png" class="mCS_img_loaded" style="margin-top: 2px;"> -->
<!-- 								<span>위치2: </span><span class="mightOverflow">대전광역시 서구 도안동 14</span> -->
<!-- 							</div> -->
<!-- 							<div class="txt_box" style="height:auto;"> -->
<!-- 								<p><span class="w100">선택 격자 이름</span><span class="fontF01" id="select_gridNm_right"></span></p> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
					<!--// 격자정보 -->

				
				</div>
			</div>
		</div>
		<!-- //상세분석 격자 -->

		<!-- 상관관계 분석 -->
		<div class="pop_statistics pop_chk05">
			<div class="pop_title">
				<select class="selct_05" id="bYearSel05"></select>
<!-- 				<span id="titleYearTxt_5"></span> -->
				<strong id="titleAreaTxt_5"></strong>
				<span id="titleTypeTxt_5"></span>							
			</div>		
			<a href="#" class="close_btn01"><img src="/images/catchmentArea/close_ico.png" alt="창닫기"></a>
			<div id="correlationChart" style="width: 460px; height: 356px;"></div>
			<!-- <div class="pop_content" style="padding:20px;height:400px;position:relative;">
				<h5>상관관계 분석 결과</h5>
				<div class="gra_txt01">인구(전체)</div>
				<div class="gra_txt02">가구(전체)</div>
				<div class="gra_txt03">병원사업체</div>
				<div class="gra_txt04">병원종사자</div>
				<div class="gra_txt05">인구(전체)</div>
				<div class="gra_txt06">가구(전체)</div>
				<div class="gra_txt07">병원사업체</div>
				<div class="gra_txt08">병원종사자</div>
				<div class="gra_shpae01">1</div>
				<div class="gra_shpae02">1.01</div>
				<div class="gra_shpae03">1.7</div>
				<div class="gra_shpae04">1</div>
				<div class="gra_shpae05">1</div>
				<div class="gra_shpae06">1</div>
				<div class="gra_shpae07">1</div>
				<div class="gra_shpae08">1</div>
				<div class="gra_shpae09">1</div>
				<div class="gra_shpae10">1</div>
				<div class="gra_shpae11">1</div>
				<div class="gra_shpae12">11</div>
				<div class="gra_shpae13">12</div>
				<div class="gra_shpae14">31</div>
				<div class="gra_shpae15">14</div>
				<div class="gra_shpae16">15</div>
				<div class="gra_grad"></div>
				<div class="gra_txt09">0.8</div>
				<div class="gra_txt10">0.4</div>
				<div class="gra_txt11">0</div>
				<div class="gra_txt12">-0.4</div>
				<div class="gra_txt13">-0.8</div>
				<div class="gra_txt14">양의 상관관계</div>
				<div class="gra_txt15">음의 상관관계</div>
				<div class="gra_line01"></div><div class="gra_line02"></div><div class="gra_line03"></div><div class="gra_line04"></div>
				<div class="gra_line05"></div><div class="gra_line06"></div><div class="gra_line07"></div><div class="gra_line08"></div>
				<div class="gra_line09"></div><div class="gra_line10"></div><div class="gra_line11"></div><div class="gra_line12"></div><div class="gra_line13"></div>
			</div> -->
		</div>
		<!-- // 상관관계 분석 -->
				
		<!-- 범례 선택 팝업 -->
<!-- 		<div class="pop_choice" style="display:none;"> -->
<!-- 			<div class="pop_content"> -->
<!-- 				<strong>선택된 격자의 통계정보</strong> -->
<!-- 				<div class="color_list"> -->
<!-- 					<ul class="clearfix"> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev7"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev6"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev5"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev4"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev3"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev2"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev1"></a> -->
<!-- 						</li> -->
<!-- 						<li> -->
<!-- 							<a href="javascript:void(0);" class="lev0"></a> -->
<!-- 						</li> -->
<!-- 					</ul> -->
<!-- 				</div> -->
<!-- 				<p>격자 내 [성별전체, 연령전체] 인구수<b><span>88</span>명</b></p> -->
<!-- 			</div> -->
<!-- 			<div class="choice_now"></div> -->
<!-- 		</div> -->
		<!--// 범례 선택 팝업 -->
		<!-- 생활권역 통계지도 데이터보드 도움말 팝업 --> 
		<div class="layer_pop10" id="catchmentDataBoardHelpPopup" style="padding: 16px; z-index:999;">
			<a href="javascript:void(0);" class="close">
				<img src="/images/catchmentArea/close_ico02.png">
			</a>
				<p class='subC'>생활권역 통계지도에서 제공하는 값들은 영역에 속하는 기초자료를 기반으로 비밀보호기법을 각각 적용하여 제공하며, 다음과 같이 이해하시기 바랍니다.</p>
				<!--  
				<div class='tip_sec01'>
					<p class='subC'>① 기초자료 중 특정값(B) 미만의 자료들은 0 또는 B로 치환, B 이상은 그대로 제공</p>
					<p class='subC'>② 기초자료 중 B미만 자료들의 합은 실제 참값과 비교하여 B/2이내의 차이가 나도록 조정</p>
					<p class='subC'>③ 조정한 합계와 B 이상의 값을 더한 후, 노출 위험이 제어되지 않은 값은 추가 조정</p>
				</div>
				<p class='subC'>따라서 부분의 합계와 전체합계가 일치하지 않을 수 있습니다.</p>
				<div class='tip_sec01'>
					<p class='subC'>(예시) 인구의 기초자료는 100m 격자별 성별·나이별 인구수이며, 100m 격자 총인구, <br> 1km 격자 0~9세 인구 등의 항목은 이에 해당하는 기초자료를 기반으로 각각 BSCA를 적용</p>
					<p class='subC'>→ 기초자료의 특정값 미만 분포에 따라 같은 영역에 대한 총인구와 남·여 인구 합계가 일치하지 않을 수 있음</p>
				</div>
				-->
				<br>
				<p class='subH'>- 인구/가구/주택</p>
				<!--  <p class='subC'>인구주택총조사(등록센서스) 자료를 기반으로 생성하며, 특정값(B)을 5로 적용하여 기초자료의 1~4를 0 또는 5로 치환</p>-->
				<table class='subT'>
					<thead>
        				<tr>
          					<th>'생활권역 통계지도'에서 제공하는 값</th><th>실제 값</th>
        				</tr>
      				</thead>
      				<tbody>
      					<tr>
          					<td>0</td><td>0, 1, 2, 3, 4 중 하나</td>
        				</tr>
        				<tr>
          					<td>5</td><td>1, 2, 3, 4, 5 중 하나</td>
        				</tr>
        				<tr>
							<td>6 이상의 값 M</td><td>M-2 ~ M+2 중 하나 (일부 자료 M-7 ~ M+7)*</td>
        				</tr>
        				<tr>
          					<td colspan='2'>(예) ‘생활권역 통계지도’의 인구값 200은 실제 값 198~202 중 하나임</td>
        				</tr>
      				</tbody>
				</table>
				<br>
				<p class='subH'>- 사업체/종사자</p>
				<!--  <p class='subC'>전국사업체조사(또는 경제총조사) 자료를 기반으로 생성하며, 특정값(B)을 3으로 적용하여 기초자료의 1~2를 0 또는 3으로 치환</p>-->
				
				<table class='subT'>
					<thead>
        				<tr>
          					<th>'생활권역 통계지도'에서 제공하는 값</th><th>실제 값</th>
        				</tr>
      				</thead>
      				<tbody>
      					<tr>
          					<td>0</td><td>0, 1, 2 중 하나</td>
        				</tr>
        				<tr>
          					<td>3</td><td>1, 2, 3 중 하나</td>
        				</tr>
        				<tr>
							<td>4 이상의 값 N</td><td>N-1, N, N+1 중 하나 (일부 자료 N-4 ~ N+4)*</td>
        				</tr>
        				<tr>
          					<td colspan='2'>(예) ‘생활권역 통계지도’의 사업체값 200은 실제 값 199~201 중 하나임</td>
        				</tr>
      				</tbody>
				</table>
			<p class='subC'>* 해당 값을 통하여 작은 단위의 통계정보를 파악할 수 있다고 판단하여 자료처리 과정을 추가한 경우이며, 참값과 차이가 더욱 벌어질 수 있으나, 이는 정보보호를 위하여 필수적으로 필요한 과정입니다.</p>
		</div>
</div>