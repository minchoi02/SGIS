
<%
	/**************************************************************************************************************************
	* Program Name  : 데이터 업로드 JSP  
	* File Name     : dataUpload.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2015-11-03
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>메인 | 통계청SGIS 오픈플랫폼</title>
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/map.js"></script>
	<script src="/js/common/common.js"></script>
	
	<script src="/js/mypage/mypage.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	
	<script type="text/javascript">
		(function(W, D) {
			W.$mypageList = W.$mypageList || {};
			$mypageList.sampleLoad = true;
		}(window, document));
	</script>
	
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/mypage/mypage.css" />
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type="text/javascript" src="/js/mypage/mypageEtc.js"></script>
	<script type="text/javascript" src="/js/mypage/myData.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type="text/javascript" src="/js/common/mapInfo/legendInfo.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	<script type="text/javascript" src="/js/plugins/handsontable.full.js"></script>
</head>


<body>
	<div id="wrap">
		<header>
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<div id="container">
			<p class="path">
				<a href="/view/index"> 
					<span class="path_el">처음페이지&nbsp;&nbsp;>&nbsp;</span>
				</a>
				<a href="/jsp/sample/dataUpload.jsp">
					<span class="path_el current">나의 데이터 체험하기</span>
				</a>
			</p>
			<div class="containerBox">
				<div class="mpSubTitle">
					<div style="display:inline-block;width:85%;">
						<h3>나의 데이터 체험하기</h3>
					</div>
					<div style="display:inline-block;width:10%;">
						<button style="background: #0d66ac;line-height: 25px;width: 80px;color: white;border-radius: 10px;padding: 3px 3px 3px 3px;" onclick="javascript:$myData.openPopup()">이용가이드</button>
					</div>
					<p>업로드된 데이터를 SGIS+plus에 적용하기 위해서는 데이터 설정이 필요합니다. 설정을 통해 더욱 다양하게
						자료를 활용해보세요.</p>
					<p>1회당 업로드 제한:3500row / 10 column(엑셀,CSV,TXT)</p> 
				</div>

				<div class="dataMenuBox">
					<h3>내 컴퓨터 파일 찾기</h3>

					<form id="fileForm" name="fileForm" method="post" enctype="multipart/form-data">
						<div id="hiddenFields" style="display: none;"></div>

						<div class="dmFile">
							<input type="file" name="mpsFile" id="mpsFile" class="fileEvent" onChange="javascript:$myData.setFile(this)" /> 
							<input id="myData_regist_file" name="myData_regist_file" type="text" class="inp" title="파일위치" disabled /> 
							<label id="myDataUpload" for="mpsFile" class="spbox type01" onClick="javascript:$myData.fileInit()">파일찾기</label>
						</div>
						<ul class="dmBtn">
							<li>
								<a href="javascript:$myData.fileDownLoad('sample.xlsx')" class="spbox type02">엑셀양식다운로드</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('sample.csv')" class="spbox type02">CSV예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('sample.txt')" class="spbox type02">TXT예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('sample.kml')" class="spbox type02">KML예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('sample_sido.xlsx')" class="spbox type02">시도집계예제보기</a>
							</li>
							<li>
								<a href="javascript:$myData.fileDownLoad('sample_sigungu.xlsx')" class="spbox type02">시군구집계예제보기</a>
							</li>
							<li>
								<div>
									<input type="checkbox" id="mpfCk" name="mpfCk" checked="checked"/> 
									<label for="mpfCk">데이터의 첫행을 컬럼명칭으로 처리</label> 
									<a href="javascript:void(0)" data-subj="데이터 첫행 명칭" title="데이터 첫행을 컬럼명칭으로 처리
										<br />하시면 해당 데이터의 첫 행을 컬럼 
										<br />명칭으로 사용 합니다.">
										<img src="/img/ico/ico_tooltip01.png" />
									</a>
								</div>
							</li>
						</ul>
					</form>
				</div>
				<div class="mpFormArea">
							<div class="fl">
								<p class="mpfText01">업로드 데이터를 지도에 표시하기 위해서는 위치조회(지오코딩)를 하여야 합니다.</p>
							</div>
							<div id="tableRowChange" class="btnbox type02" style="display:none;">
								<div class="fl" id="progeress">
									<span>진행&nbsp;현황 </span>
									<span id="currentCodingRow">0</span>
									<span>/&nbsp;</span>
									<span id="maxCodingRow"></span>
									<span id="successSubj">성공:</span>
									<span id="successCount"></span>
									<span id="failSubj">실패:</span>
									<span id="failCount"></span>
									<span id ="searchFailButton" style="display:none;"><a href="javascript:$myData.searchFailRow()" class="btnType01">오류행수정</a></span>
								</div>							 
								<div class="fr" id="cellModifyButton">
									<a href="javascript:$myData.createRow();" class="btnType01">추가(행)</a>
									<a href="javascript:$myData.removeRow();" class="btnType01">삭제(행)</a>
									<!-- <a href="javascript:$myData.createCol();" class="btnType01">추가(열)</a>
									<a href="javascript:$myData.removeCol();" class="btnType01">삭제(열)</a>  -->
								</div>
							</div>
				</div>
				
				<div id="allChkArea" style="display:none;">
				<input type="button" id="allSelect" value="전체선택" />
				<input type="button" id="allRemove" value="전체해지"  />
				</div>
				<div id="basic_handson01" style="overflow:auto"></div>

				<div class="btnbox">
					<div class="fl">
						<a id="gioCoding1" href="javascript:$myData.popGio(1);" class="gioCoding spbox type01" style="display:none; width: auto !important;">나의 데이터를 POI로 표출하기</a>
						<a id="gioCoding2" href="javascript:$myData.popGio(7);" class="gioCoding spbox type04" style="display:none; width: auto !important;">나의 데이터를 색상지도로 표출하기</a>
						<a id="gioBack" href="javascript:$myData.gioBack();" class="spbox type01" style="display:none; width: auto !important;">뒤로가기</a>
						<a id="mapDisp" href="javascript:$myData.popMapGisSetting(0)" class="spbox type01" style="display:none; width: auto !important;">지도표출설정</a>
					</div>
					<div class="fr" style="display: none">
						<a href="javascript:void(0)" class="spbox type02 width: auto !important;">지도보기</a> 
						<a href="javascript:void(0)" class="spbox type02">자료다운로드</a>
					</div>
				</div>
			</div>
		</div>

		<!-- popBox start-->
		<div class="popBox dragbox" id="splitSelectBox" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>구분자 선택</span>
				<a href="javascript:void(0)">닫기</a>			
			</div>
			
			<div class="popContents">
					<p class="txt">TXT 파일의 경우 데이터의 구분자를 선택 하여자 합니다.</p>
					<ul class="listFormPop">
						<li>
							<div class="dbTypeSubj">
								<label for="splitSelect">구분자</label> 
									<select  id="splitSelect" style="height:23px;margin: 1px 14px 0 0;">
										<option value=",">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ,</option>
										<option value=";">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ;</option>
									</select>
							</div>
						</li>
					</ul>
					<div class="btnBox">
						<a href="javascript:$myData.setSplit()" class="btnType01">확 인</a>
					</div>
			</div>
				
		</div>
		
		<div class="popBox dragbox" id="gioPop1" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>나의 데이터를 POI로 표출하기</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt">지오코딩은 지도에 표시할 X, Y 좌표를 생성하는 과정입니다.</p>
				<p class="txt">
					X, Y 좌표값을 생성하려면 주소정보가 필요합니다.<br/>
					주소필드 선택을 클릭하시고, <br/>
					주소가 있는 필드를 선택해 주세요.<br/>
					이미 X, Y 좌표값이 있으면 X, Y 필드 선택이나<br/>
					행정동 필드 선택을 클릭하여 진행하시면 됩니다.
				</p>
				
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(1,'xy')" class="btnType01" style="width:auto; padding: 0px 3px 0px 3px;">X,Y 필드 선택</a> 
					<a href="javascript:$myData.confirmGioPop(1,'addr')" class="btnType01" style="width:auto; padding: 0px 3px 0px 3px;">주소 필드 선택</a>
					<a href="javascript:$myData.confirmGioPop(1,'admdrcd')" class="btnType01" style="width:auto; padding: 0px 3px 0px 3px;">행정동 코드 선택</a>
				</div>
			</div>
		</div>
		
		<div class="popBox dragbox" id="gioPop2" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>지오코딩 선택 – 1 (X, Y 좌표 필드 선택)</span> 
				<a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect01">X 좌표 필드</label> <select id="awSelect01">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>								
							</select>
						</div>
					</li>
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect02">Y 좌표 필드</label> <select id="awSelect02">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'gio')" class="btnType01">확 인</a>
				</div>
			</div>
		</div>


		<div class="popBox dragbox" id="gioPop3" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>지오코딩 선택 – 2 (주소 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect03">주소 필드</label> <select id="awSelect03">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'reverse')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		
		<div class="popBox dragbox" id="gioPop4" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>나의 데이터를 색상지도로 표출하기</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<p class="txt">
					행정구역 단위로 데이터를 집계 한 후 색상지도로
					<br/>표출하려면 집계레벨 필드(행정구역 단위),
					<br/>주소 필드(주소가 있는 필드), 집계 필드(값을 집계할 필드) 를
					선택하여 진행하시면 됩니다.
				</p>
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="gioType1">집계레벨 필드</label> <select id="gioType1">
								<option value="1">시도</option>
								<option value="2">시군구</option>
								<option value="3">읍면동</option>
								<option value="4">집계구</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect04">주소 필드</label> <select id="awSelect04">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="sumFieldName">집계 필드</label> <select id="sumFieldName">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
					
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'sumAddr')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		
		<div class="popBox dragbox" id="gioPop5" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>지오코딩 선택 – 2 (ADM 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="gioType2">주소 필드</label> <select id="gioType2">
								<option value="1">시도</option>
								<option value="2">시군구</option>
								<option value="3">읍면동</option>
								<option value="4">집계구</option>
							</select>
						</div>
					</li>
					
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect05">주소 필드</label> <select id="awSelect05">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'admCd')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		<div class="popBox dragbox" id="gioPop6" style="display: none;z-index:1200;">
			<div class="topbar closebtn1">
				<span>지오코딩 선택 – 3 (코드 필드 선택)</span> <a href="javascript:void(0)">닫기</a>
			</div>
			<div class="popContents">
				<ul class="listFormPop">
					<li>
						<div class="dbTypeSubj">
							<label for="awSelect06">코드 필드</label> <select id="awSelect06">
								<option value="a">A</option>
								<option value="b">B</option>
								<option value="c">C</option>
								<option value="d">D</option>
								<option value="e">E</option>
								<option value="f">F</option>
								<option value="g">G</option>
								<option value="h">H</option>
							</select>
						</div>
					</li>
				</ul>
				<div class="btnBox">
					<a href="javascript:$myData.confirmGioPop(2,'admdrcd')"
						class="btnType01">확인</a>
				</div>
			</div>
		</div>
		
		<!-- map Layer -->
		<div class="popBox map dragbox" id="mapSetting" style="display:none;z-index: 214748364">
			<div class="rela">
				<div class="topbar closebtn2">
					<span>지도표출설정</span> 
					<a href="javascript:$myData.hideMap();">닫기</a>
				</div>
				<div class="popContents">
				<div class="pfl">
					<dl>
						<dt id="disp_subj_1">1. 표출 데이터 설정</dt>
						<dd id="disp_content_1">
							<ul id="mapSettingDisp" class="radio" style="height:80px;">
								
							</ul>
						</dd>
						<dt id="disp_subj_2">2. 툴팁 표출 설정 (다중선택)</dt>
						<dd id="disp_content_2">
							<ul id="mapSettingTooltip" class="ckbox" style="height:90px;">
								
							</ul>
						</dd>
						<dt id="disp_subj_3">3. 데이터 시각화 적용 유형</dt>
						<dd>
							<ul class="radio" id="disp_content_3">
								<li id="contentType_1">
									<input type="radio" value="location" name="rd_ptype" id="rd_ptype1" checked="checked" onclick="javascript:return false;"> 
									<label for="rd_ptype1" class="on" onclick="javascript:return false;">위치표시</label> 
									<input type="radio" value="ratio" name="rd_ptype" id="rd_ptype2" onclick="javascript:return false;">
									<label for="rd_ptype2" onclick="javascript:return false;">열지도</label>
									<input type="radio" value="pbubble" name="rd_ptype" id="rd_ptype5" onclick="javascript:return false;">
									<label for="rd_ptype5" onclick="javascript:return false;">버블지도</label>
								</li>
								
								<li id="contentType_2" style="display:none;">
									<input type="radio" value="colorFull" name="rd_ptype" id="rd_ptype3" checked="checked" onclick="javascript:return false;"> 
									<label for="rd_ptype3" class="on" onclick="javascript:return false;">색상지도</label> 
									<input type="radio" value="bubble" name="rd_ptype" id="rd_ptype4" onclick = "javascript:return false;">
									<label for="rd_ptype4" onclick = "javascript:return false;">버블지도</label>
								</li>
								
							</ul>
							<div id="ratioWeightDiv" style="width:100%; margin-bottom:5px; margin-top:5px; display:none;">
						    	<div style="width:100%; font-size:13px; background:#dcdcdc; border-radius:15px; padding-top:7px; padding-bottom:7px;">
						    		<p style="margin-left:7px;">4. <span id="weightTxt">열지도</span> 가중치 컬럼 선택</p>
						    	</div>
						    	<div style="width:100%; margin-top:10px; padding-left:7px;">
						    		<select id="ratioWeightSel" style="width:90%; font-size:13px;">
						        	</select>
						        </div>
						    </div>
							<div class="btnBox">
								<a href="javascript:$myData.reMakeMap();" class="btnType03">미리보기</a>
							</div>
							<div style="margin-left:16px; width:90%;">
							    <!-- mng_s 20211115 김건민 -->
								<p style="text-indent:-16px;">※ '나의 데이터 체험하기'에는 저장기능이 없습니다. <br/>데이터를 저장하기 위해서는 회원가입 및 로그인 후<br/>'나의 데이터'를 이용하셔야 합니다.</p>
								<!-- mng_e 20211115 김건민 -->
							</div>
							<div class="btnBox">
								<a href="javascript:goSelectLogin('https://sgis.kostat.go.kr/view/mypage/myData/dataList');" class="btnType04" style="background:#0d66ac !important; color:white !important;">회원가입(로그인)</a>
							</div>
						</dd>
					</dl>
				</div>
				<div class="pfr" >
					<!-- <img src="/img/pm/map_img.jpg" width="100%" height="100%" /> -->
					<div id="mapRgn_1" class="map_img" style="width:750px;height:670px"></div>
					<div id="mapRgn_2" class="map_img" style="width:750px;height:670px" style="display:none;"></div>
					
				</div>
			</div>
			</div>
		</div>
		
		

		<!-- map Layer2 -->
		
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>

</body>
</html>