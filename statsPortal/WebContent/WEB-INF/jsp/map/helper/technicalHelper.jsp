<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
	<script>
	$(document).ready(function(){
	/**
			 * @name         : changePopupIntroTabs
			 * @description  : 팝업 인트로창 탭 변경 이벤트
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			changePopupIntroTabs = function(type){
				 
				$(".introCommonTabs").removeClass("on");
				$(".introCommonTabs#ict_"+type).addClass("on");
				
				$(".iaDefault").hide();
				$("#iadBox_"+type).show();
				
				switch(type){
					case "chart":
						$technicalBizMapApi.request.popupIntroChart();
					default:
						$(".iatcSrcollBox").mCustomScrollbar("destroy");
						break;
					case "code":
						this.changePopupCodeTabs(1, 11);
						$(".iatcSrcollBox").mCustomScrollbar({axis:"xy"});
						break;
				}
			};
			
			/**
			 * @name         : changePopupCodeTabs
			 * @description  : 팝업 코드창 탭 변경 이벤트
			 * @date         : 2016. 10. 12. 
			 * @author	     : 김재상
			 */
			changePopupCodeTabs = function(b_class_cd, m_class_cd){
				
				$(".iaSubTabs").hide();
				$("#iaSubTabs0"+b_class_cd).show();
				
				$(".iaTabs01>a,.iaSubTabs>a").removeClass("on");
				$("#iaTab0"+b_class_cd).addClass("on");
				$("#iaTab"+m_class_cd).addClass("on");
				
				$technicalBizMapApi.request.getTechCd(m_class_cd);
			};
			$("body").on("click",".rightBtn",function(){
				if($('.btn_popup2').hasClass('on')){
					$('.btn_popup2').removeClass('on');
					$('#select_popup_layer').show();
				}
			});
	});
	</script>
	<!--  팝업 -->
	<div class="dialogGtype Popup_Info" id="technicalBiz_laypopup"  title="기술업종현황" style="display:none;">
		<div class="PopupCont2">
			<div class="popIntro">
				<div class="piTotalBox">
					<div class="iaTopbar">
						<p class="t01">기술업종</p>
						<p class="t02">신기술을 기반으로 수익을 창출하는 기술집약적 업종</p>
						<div class="btna">
							<a href="javascript:srvLogWrite('G0', '01', '04', '02', '', '기술업종 소개 페이지');changePopupIntroTabs('intro');void(0);" id="ict_intro" class="introCommonTabs introTabs01 on" tabindex="71">기술업종 소개 페이지</a> <!-- 2017.12.12 [개발팀] 접근성  -->
							<a href="javascript:srvLogWrite('G0', '01', '04', '03', '', '기술업종 사업체 현황');changePopupIntroTabs('chart');void(0);" id="ict_chart" class="introCommonTabs introTabs02" tabindex="72">전국 기술업종 사업체 현황</a> <!-- 2017.12.12 [개발팀] 접근성  -->
							<a href="javascript:srvLogWrite('G0', '01', '04', '04', '', '기술업종 분류');changePopupIntroTabs('code');void(0);" id="ict_code" class="introCommonTabs introTabs03" tabindex="73">기술업종 분류</a> <!-- 2017.12.12 [개발팀] 접근성  -->
						</div>
						<p class="cookieCk">
							<input type="checkbox" id="cookieCheck" name="close"/>
							<!-- mng_s 20180412_김건민 -->
							<!-- <label for="cookieCheck">일주일간 보지않기</label> -->
							<!-- mng_e 20180412_김건민 -->
						</p>
					</div>
					<div class="iadRela">
						<!-- intro 1 -->
						<div class="iaDefault" id="iadBox_intro">
							<div class="iaLeft">
								<p class="s01">
									<span class="t01">기술혁신정도</span>
									<span class="t02">연구개발집약도에 따라 제조업을 첨단기술, 
									<br />고기술, 중기술, 저기술 등으로 
									<br />분류하는 산업</span>
								</p>
								<ul class="iaIconList">
									<li class="ico01">
										<a href="#">
											<span class="t01">첨단기술 업종</span>
											<span class="t02">기술집약도가 높고 제품의 수명주기가 짧으며 경제적 파급효과가 큰 산업</span>
										</a>
									</li>
									<li class="ico02">
										<a href="#">
											<span class="t01">고기술 업종</span>
											<span class="t02">진보되고 정교한 기술을 포함하는 산업</span>
										</a>
									</li>
									<li class="ico03">
										<a href="#">
											<span class="t01">중기술 업종</span>
											<span class="t02">기술이전이 용이한 성숙기술을 포함하는 산업</span>
										</a>
									</li>
									<li class="ico04">
										<a href="#">
											<span class="t01">저기술 업종</span>
											<span class="t02">사회의 다양한 세부 분야에 침투 되어 낮은 수준의 공업기술 산업</span>
										</a>
									</li>
								</ul>
							</div>
							<div class="iaRight">
								<p class="s01">
									<span class="t01">지식집약정도</span>
									<span class="t02">기술, 정보, 지식 등 무형자산의 활용도가 
									<br />높은 정보 통신업, 금융 및 보험업, 사업서비스업
									<br />등으로 분류하는 산업</span>
								</p>
								<ul class="iaIconList">
									<li class="ico05">
										<a href="#">
											<span class="t01">창의 및 디지털 업종</span>
											<span class="t02">인간의 감성, 창의력 상상력을 기반으로 경제적 가치를 창출하는 산업</span>
										</a>
									</li>
									<li class="ico06">
										<a href="#">
											<span class="t01">ICT 업종</span>
											<span class="t02">정보통신기술을 기반으로 하는 전기통신, 컴퓨터 프로그램 등을 포함하는 정보서비스 산업</span>
										</a>
									</li>
									<li class="ico07">
										<a href="#">
											<span class="t01">전문서비스 업종</span>
											<span class="t02">전문지식을 갖춘 인력자원이 주요 요소로 투입되는 산업</span>
										</a>
									</li> 
									<li style="text-align: center;">
										<div id="tooltip-prntdiv" style="padding-top: 20%;">
											<div style="width: 150px; height: 2px;">출처</div>
											<div class="tcb-tooltip">
												<table style="border:1px solid #ddd;" class="tooltipText">
													<tbody>
														<!-- mng_s 20200219 김건민 -->
										 	 			<tr style="border-bottom:1px solid #ddd;">
															<td style="font-size:12px;width:48px;height:30px;text-align:center;">사업체</td>
															<td style="width:2px;border-left:1px solid #ddd;"></td>
															<td style="font-size:12px;">&nbsp;통계청, 전국사업체조사(2019)<br>
																                        &nbsp;통계청, 경제총조사(2015)</td>
										 	 			</tr>
										 	 			<tr style="border-bottom:1px solid #ddd;">
															<td style="font-size:12px;width:48px;height:30px;text-align:center;">인구</td>
															<td style="width:2px;border-left:1px solid #ddd;"></td>
															<td style="font-size:12px;">&nbsp;통계청, 인구주택총조사(2019)</td>
										 	 			</tr>
										 	 			<!-- mng_e 20200219 김건민 -->
										 	 			<tr style="border-bottom:1px solid #ddd;">
															<td style="font-size:12px;width:48px;text-align:center;">산업단지</td>
															<td style="width:2px;border-left:1px solid #ddd;"></td>
															<td style="font-size:12px;">국토교통부, 산업단지 현황(2015)<br>
															                                                        한국산업단지공단, 한국산업단지총람(2015)</td>
										 	 			</tr>
										 	 			<tr style="border-bottom:1px solid #ddd;">
															<td style="font-size:12px;width:48px;height:30px;text-align:center;">지원시설</td>
															<td style="width:2px;border-left:1px solid #ddd;"></td>
															<td style="font-size:12px;">중소벤처기업부, 벤처창업입지 114</td>
										 	 			</tr>
											 		</tbody>
												</table>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>	 
						<!-- intro 1 -->
						
						<!-- intro 2 -->
						<div class="iaDefault" id="iadBox_chart">
							<div class="iaChartLeft">
								<p class="s01">전국 기술업종 사업체 비율</p>
								<div class="iaChartBox01" id="iaChartBox01"></div>
								<ul class="typelabel">
		   						</ul> 
							</div>
							<div class="iaChartRight">
								<p class="s01">전국 기술업종 사업체 증감</p>
								<div class="iaChartBox02" id="iaChartBox02"></div>
								<p class="s01">전국 기술업종 사업체 증감률</p>
								<div class="iaChartBox03" id="iaChartBox03"></div>
							</div>
						</div>	 
						<!-- intro 2 -->
						
						<!-- intro 3 -->
						<div class="iaDefault" id="iadBox_code">
							<!-- mng_s 20190329 김건민 -->
							<div class="iaTabs01">
								<a onclick="javascript:srvLogWrite('G0', '01', '04', '05', '', '기술혁신정보');" id="iaTab01" href="javascript:changePopupCodeTabs(1, 11);void(0);" class="on" tabindex="81">기술혁신정보</a>
								<a onclick="javascript:srvLogWrite('G0', '01', '04', '05', '', '지식집약정도');" id="iaTab02" href="javascript:changePopupCodeTabs(2, 21);void(0);" tabindex="82">지식집약정도</a>
							</div>
							<div class="iaTabsContents01">
								<div id="iaSubTabs01" class="iaSubTabs iaTabs02">
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '첨단기술 업종');" id="iaTab11" href="javascript:changePopupCodeTabs(1, 11);void(0);" class="on" tabindex="83">첨단기술 업종</a>
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '고기술 업종');" id="iaTab12" href="javascript:changePopupCodeTabs(1, 12);void(0);" tabindex="84">고기술 업종</a>
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '중기술 업종');" id="iaTab13" href="javascript:changePopupCodeTabs(1, 13);void(0);" tabindex="85">중기술 업종</a>
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '저기술 업종');" id="iaTab14" href="javascript:changePopupCodeTabs(1, 14);void(0);" tabindex="86">저기술 업종</a>
								</div>
								<div id="iaSubTabs02" class="iaSubTabs iaTabs03">
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '창의 및 디지털 업종');" id="iaTab21" href="javascript:changePopupCodeTabs(2, 21);void(0);" tabindex="87">창의 및 디지털 업종</a>
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', 'ICT 업종');" id="iaTab22" href="javascript:changePopupCodeTabs(2, 22);void(0);" tabindex="88">ICT 업종</a>
									<a onclick="javascript:srvLogWrite('G0', '01', '04', '06', '', '전문서비스 업종');" id="iaTab23" href="javascript:changePopupCodeTabs(2, 23);void(0);" tabindex="89">전문서비스 업종</a>
								</div>
								<!-- mng_e 20190329 김건민 -->
								<div class="iatcSrcollBox">
									<div class="iatcEtcBox01">
										<table class="iatcTable">
											<colgroup>
												<col style="width:50%" />
												<col style="width:50%" />
											</colgroup>
											<thead>
												<tr>
													<th>세부업종명</th>
													<th>관련산업분류(10차)</th>
												</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>
							</div> 
						</div>	 
						<!-- intro 3 -->
					</div>
				</div>
			</div>
			<div class="rightBtn" style="margin-left: 865px;">
				<!-- 2017.12.12 [개발팀] 접근성  -->
				<a href="javascript:void(0)" class="introClose" onkeypress="if(event.keyCode==13) {commonPopupObj.closeWin('technicalBiz_laypopup', 7);}" onclick="commonPopupObj.closeWin('technicalBiz_laypopup', 7);" tabindex="90">닫기</a>
			</div>
		</div>
	</div>