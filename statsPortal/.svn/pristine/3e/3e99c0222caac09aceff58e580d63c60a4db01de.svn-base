<%
/**************************************************************************************************************************
* Program Name	:  	
* File Name		: saMap.jsp
* Comment		: 
* History		: 
	*	2018.09.20	ywKim	신규 - Copy of 정책통계지도
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/saMap.js"></script>
<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/saMapApi.js"></script>
<script src="${pageContext.request.contextPath}/js/workRoad/statusAnls/saMapBtn.js"></script>



					<div class="sceneBox on" id="view1">
						<div class="sceneRela">
							<div class="toolBar">
								<!-- mng_s 20170908_김건민 -->
								<h2>일자리 맵</h2>
								<!-- mng_e 20170908_김건민 -->                         
                                <button type="button" id="tuto_wr_start_btn"   style="font-family: 나눔고딕; border-radius: 1000px; background-color: #1dab8f; font-size: 12px; margin: 0 1px 0 1px; color: #ffffff; line-height: 19px; height: 26px; width: 95px; right: 218px; top: -2px; margin-top: 3px; cursor: pointer;position: absolute; border: 0; outline: 0;" onclick="javascript:callTutorial();">&nbsp;&nbsp;&nbsp;튜토리얼&nbsp;
                                <a href="javascript:void(0)"data-subj="튜토리얼 설명"style="margin-left: 0px"  title="사용지침서로서 튜토리얼을 클릭하시어<br>순서대로 따라하시면<br>일자리 맵 서비스를 사용하시는 방법을<br>익힐 수 있습니다.">
                                    <img src="/img/tutorial/workRoad/ico_i.gif" alt="튜토리얼 설명">
                                </a>&nbsp;
                                </button>
								<div class="viewTitle"><span style="background:#0070c0;">VIEW 1</span></div>
								<!-- 네비게이터 -->
								<!-- <div id="mapNavi_1"></div>
								<img id='interactive_magni' src='/img/popup/magni_plus.png' alt='돋보기' style='cursor: pointer; margin-top:3px; margin-left:5px;' /> -->								
								<div class="tb_right" id="btnList_1">

									<!-- mng_s_20180205_kimjoonha 행정구역경계 그리드 버튼 -->
									<!-- <div class="bnd_grid_radio" style="display:none;"> --><!-- 경계 그리드 오픈시 주석처리후 바로 아래쪽라인 주석해제 -->
									<!-- <div class="bnd_grid_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap3(1, false);" class="fl" style="cursor:pointer;" title="행정구역단위 그리드 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap3(1, true);" class="fr" style="cursor:pointer;" title="행정구역단위 그리드 보기" >체크2</a>
									</div> -->
									<!-- mng_e_20180205_kimjoonha -->
									
									<!-- mng_s_20170711_kimjoonha -->
									<!-- <div class="grid_radio" style="display:none;"> --><!-- 그리드 오픈시 주석처리후 바로 아래쪽라인 주석해제 20171030 -->
									<!-- <div class="grid_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, false);" class="fl" style="cursor:pointer;" title="그리드 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, true);" class="fr" style="cursor:pointer;" title="그리드 보기" >체크2</a>
									</div> -->
									<!-- mng_e_20170711_kimjoonha -->
									
									<!-- <div class="tb_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap(1, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap(1, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기" >체크2</a>
									</div> -->
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$saMap.ui.doMaxSize(1);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대"><img src="/images/workRoad/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<!-- <li><a onclick="javascript:$saMap.ui.doClearMap(1);" style="cursor:pointer;" title="초기화" ><img src="/images/workRoad/ico/ico_toolbars02.png" alt="초기화"/></a></li> 임시 - 2019.01.04	ywKim	변경 -->
										<!-- <li><a onclick="javascript:$saMap.ui.doShare(1);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/images/workRoad/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li> 임시 - 2018.11.12	ywKim	변경 -->
										<!-- <li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/images/workRoad/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li> 임시 - 2018.11.12	ywKim	변경 -->
										<!-- <li><a onclick="javascript:$saMap.ui.doBookMark(1);" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/images/workRoad/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li> -->
										<!-- <li><a onclick="javascript:$saMap.ui.addGallery(1);"><img src="/images/workRoad/ico/ico_toolbars05.png" alt="통계갤러리 추가"/></a></li> -->
										<!-- <li><a onclick="javascript:$saMap.ui.reportDataSet(1);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/images/workRoad/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li> 임시 - 2018.11.12	ywKim	변경 -->
										<!-- <li><a onclick="javascript:$saMap.ui.doAddMap(1);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/images/workRoad/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li> 임시 - 2018.11.12	ywKim	변경 -->
										<!-- <li style="display:none;"><a onclick="javascript:$saMap.ui.doCombineMap(1);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/images/workRoad/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li> 임시 - 2018.11.12	ywKim	변경 -->
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$saMap.ui.doRemoveMap(1);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel04.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
								<h3 class="h3" id="wrmTitle">구인 현황분석</h3>
								<!-- <h3 class="h3">오늘의 구인현황</h3> -->
					    		<!-- <p class="helperText" id="helper_1" style="margin-left:150px;">왼쪽 통계메뉴 버튼을 클릭하여 항목을 선택하고 통계버튼을 만드세요.</p>
					    		<p class="helperText" id="title_1" style="display:none;"></p>  
					    		<a id="manual_icon_1" onclick="javascript:window.open('/view/newhelp/in_help_10_0');">이용법</a> -->
					    		<!-- leekh display:none 삭제. 스타일 중복적용 오류 -->
					    		<!-- <p style="position:absolute;left:40%;display:inline-block;line-height:30px;" id="grid_title_1"></p> -->
					    	</div><!-- map topbar -->
					    		
					    	<div class="mapContents" id="mapRgn_1"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<!-- <div class="noticeTextPopup" id="noticeTextPopup01">
								<a onclick="javascript:$saMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
							</div> -->
				    	</div>
			    	</div>
<%-- 주석(맵을 1개만 사용하기 때문) - 2018.11.12	ywKim	변경	
			    	<div class="sceneBox" id="view2">
						<div class="sceneRela">
							<div class="toolBar">
							<!-- mng_s 20170911_김건민 -->
							<h2>일자리 맵</h2>
							<!-- mng_e 20170911_김건민 -->
							<div class="viewTitle"><span style="background:#9ed563;">VIEW 2</span></div>
								<!-- 네비게이터 -->
								<div id="mapNavi_2"></div>
								
								<div class="tb_right" id="btnList_2">
									
									<!-- <div class="grid_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, false);" class="fl" style="cursor:pointer;" title="그리드 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, true);" class="fr" style="cursor:pointer;" title="그리드 보기" >체크2</a>
									</div>
									<div class="tb_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap(2, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap(2, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기"  >체크2</a>
									</div> -->
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$saMap.ui.doMaxSize(2);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대"  ><img src="/images/workRoad/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doClearMap(2);" style="cursor:pointer;" title="초기화"  ><img src="/images/workRoad/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doShare(2);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/images/workRoad/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/images/workRoad/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.reportDataSet(2);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/images/workRoad/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doAddMap(2);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/images/workRoad/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doCombineMap(2);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/images/workRoad/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$saMap.ui.doRemoveMap(2);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel03.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_2" style="margin-left:150px;">왼쪽 통계메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.</p> <!-- 2016.09.07 9월 서비스 -->
					    		<p class="helperText" id="title_2" style="display:none;"></p>  
					    	</div><!-- map topbar -->
						    
					    	<div class="mapContents" id="mapRgn_2"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<div class="noticeTextPopup" id="noticeTextPopup02">
								<a onclick="javascript:$saMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
							</div>
				    	</div>
			    	</div>
			    	
			    	
			    	<div class="sceneBox" id="view3">
						<div class="sceneRela">
							<div class="toolBar">
							<!-- mng_s 20170911_김건민 -->
							<h2>일자리 맵</h2>
							<!-- mng_e 20170911_김건민 -->
							<div class="viewTitle"><span style="background:#ff0066;">VIEW 3</span></div>
								<!-- 네비게이터 -->
								<div id="mapNavi_3"></div>
								
								<div class="tb_right" id="btnList_3">
									
									<!-- <div class="grid_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, false);" class="fl" style="cursor:pointer;" title="그리드 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap2(1, true);" class="fr" style="cursor:pointer;" title="그리드 보기" >체크2</a>
									</div>
									<div class="tb_radio">
										<a onclick="javascript:$saMap.ui.doInnerMap(3, false);" class="fl" style="cursor:pointer;" title="사업체전개도 끄기"  >체크1</a>
										<a onclick="javascript:$saMap.ui.doInnerMap(3, true);" class="fr" style="cursor:pointer;" title="사업체전개도 보기"  >체크2</a>
									</div> -->
									<ul> 
										<!-- 2017.07.24 [개발팀] 클래스명 추가 START  -->
										<li><a onclick="javascript:$saMap.ui.doMaxSize(3);" class="tb_sizing" style="cursor:pointer;" title="전체 화면 확대" ><img src="/images/workRoad/ico/ico_toolbars01.png" alt="전체 화면 확대"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doClearMap(3);" style="cursor:pointer;" title="초기화" ><img src="/images/workRoad/ico/ico_toolbars02.png" alt="초기화"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doShare(3);" class="tb_share" style="cursor:pointer;" title="URL 공유하기" ><img src="/images/workRoad/ico/ico_toolbars04.png" alt="URL 공유하기"/></a></li>
										<li><a onclick="javascript:$galleryAdd.interactiveGalleryPopOpen();" class="tb_bookmark" style="cursor:pointer;" title="즐겨찾기로 저장하기" ><img src="/images/workRoad/ico/ico_toolbars05.png" alt="즐겨찾기로 저장하기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.reportDataSet(3);" class="tb_report" style="cursor:pointer;" title="보고서 보기" ><img src="/images/workRoad/ico/ico_toolbars06.png" alt="보고서 보기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doAddMap(3);" class="tb_mapAdd" style="cursor:pointer;" title="지도 추가하여 비교하기" ><img src="/images/workRoad/ico/ico_toolbars07.png" alt="지도 추가하여 비교하기"/></a></li>
										<li><a onclick="javascript:$saMap.ui.doCombineMap(3);" class="tb_combine" style="cursor:pointer;" title="지도 겹쳐보기" ><img src="/images/workRoad/ico/ico_toolbars08.png" alt="지도 겹쳐보기"/></a></li>
										<!-- 2017.07.24 [개발팀] 클래스명 추가 END  -->
									</ul> 
									<a onclick="javascript:$saMap.ui.doRemoveMap(3);" class="tb_close" style="cursor:pointer;"><img src="/img/um/btn_closel02.png" alt="창닫기" style="height:34px;"/></a>
								</div>
							</div>
							<div class="interactiveBar"><!-- map topbar -->
					    		<p class="helperText" id="helper_3" style="margin-left:150px;">왼쪽 통계메뉴버튼을 클릭하여 통계항목을 선택하고, 통계버튼을 만드세요.</p> <!-- 2016.09.07 9월 서비스 --> 
					    		<p class="helperText" id="title_3" style="display:none;"></p>  
					    	</div><!-- map topbar -->
						    
					    	<div class="mapContents" id="mapRgn_3"></div><!-- 맵영역 --> 
					    	<div class="resizeIcon"><!-- 리사이즈 아이콘 --></div>
					    	
					    	<!-- 설명 문구 -->
					    	<div class="noticeTextPopup" id="noticeTextPopup03">
								<a onclick="javascript:$saMap.ui.informationPopOpen();">
								<img src="/img/new/use_notice_map.png" alt="더보기"/></a>
							</div>
				    	</div>
			    	</div>
			    	
 --%>