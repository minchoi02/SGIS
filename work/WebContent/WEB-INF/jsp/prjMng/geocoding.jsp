<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/codemirror.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/sql.js"></script>
	
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/jsgrid.core.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/jsgrid.load-indicator.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/jsgrid.load-strategies.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/jsgrid.sort-strategies.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/jsgrid.field.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/fields/jsgrid.field.text.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/fields/jsgrid.field.number.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/fields/jsgrid.field.select.js"></script>
    <script src="${pageContext.request.contextPath}/js/plugins/jsgrid/fields/jsgrid.field.checkbox.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/geocoding.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/codeMirror/codemirror.css" />
	<script>
		var userID = '<%=session.getAttribute("user_id") %>';
		
		$(document).ready(function() {
				
				
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});
		
		$(document).ready(function() {
			var db_type = "${db_type}";
		 	if (db_type != undefined && db_type != null) {
		 		$sgisDataMng.request.doReqSgisDataMngInfo(db_type);
		 	} else {
		 		$sgisDataMng.request.doReqSgisDataMngInfo("pg");
		 	}
		 	
			
			var mime = 'text/x-mariadb';
			window.editor = CodeMirror.fromTextArea(document.getElementById('qry_txt'), {
				mode: mime,
				indentWithTabs: true,
				smartIndent: true,
				lineNumbers: true,
				matchBrackets : true,
				autofocus: true
			});
		});

		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: '500',
		      height: '700',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		    // $(".default-pop-open").button().on("click", function () {
		    //   $("#dialog").dialog("open");
		    // });
		});
	</script>
	<style>
	.CodeMirror {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
	}
	#tableInfo tbody td {
    	padding:2px 0px !important;
	}
	#table_list td {
    	text-align:left !important;
    	padding:0px 0px !important;
    	font-size: 11px !important;
	}
	.navigation {
	    width: 200px;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    padding: 10px;
	    border-right: 1px solid #e9e9e9;
	}
	.navigation li {
	    margin: 10px 0;
	}
	.demo-frame {
	    position: absolute;
	    top: 0;
	    right: 0;
	    bottom: 0;
	    left: 200px;
	}
	iframe[name='demo'] {
	    display: block;
	    width: 100%;
	    height: 100%;
	    border: none;
	}
	.jsgrid-table {
		width : 1000px !important;
	}
	.jsgrid-pager {
		padding-left: 350px;
		font-size : 14px;
	}
	.jsgrid-pager a {
	    color: #000;
	    text-decoration: none;
	}
	.jsgrid-pager-current-page {
	    color: #3d62e8;
	    font-size : 16px;
	    font-weight: bold;
	}
	.jsgrid-pager-page {
		padding-left: 10px;
	}
	.jsgrid-pager-nav-button {
		padding-left: 10px;
	}
	.jsgrid-pager-container {
		margin-top: 10px;
	}
	input[type=radio] {
	    padding: 0;
	    margin: 0;
	    border: 0;
	    outline: none;
	    -webkit-border-radius: 0px;
	    -moz-border-radius: 0px;
	    border-radius: 0px;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    -webkit-appearance: radio !important;
	}
	input[type=checkbox] {
	    padding: 0;
	    margin: 0;
	    border: 0;
	    outline: none;
	    -webkit-border-radius: 0px;
	    -moz-border-radius: 0px;
	    border-radius: 0px;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    box-sizing: border-box;
	    -webkit-appearance: checkbox !important;
	}
	</style>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">
<!-- @@block content -->
<div class="sub-title">
	<strong class="home">지오코딩</strong>
	<h2>관리자용 지오코딩</h2>
	<h3>소유한 데이터에 대해 지오코딩을 수행하고 결과를 확인합니다.</h3>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-sm3">
				<div class="in-box line">
					<div class="tbs1">
						<table id="table_list">
							<thead>
								<tr>
									<th>테이블명</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<!-- <div class="paging">
						<span class="first"><a href=""><<</a></span> <span class="prev"><a
							href=""><</a></span>
						<ul>
							<li class="is-active"><a href="">1</a></li>
							<li><a href="">2</a></li>
						</ul>
						<span class="end"><a href="">></a></span> <span class="next"><a
							href="">>></a></span>
					</div> -->
				</div>
			</div>
			<div class="col col-sm4">
				<div class="in-box line">
					<div class="tbs1">
						<div class="tb-tit">테이블 정보</div>
						<table id="tableInfo">
							<colgroup>
								<col width="120px">
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>항목</th>
									<th>설명</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>테이블명</td>
									<td id="tbl_nm">-</td>
								</tr>
								<tr>
									<td>데이터설명</td>
									<td id="tbl_nm_ko">-</td>
								</tr>
								<tr>
									<td>총건수</td>
									<td id="tbl_cnt">-</td>
								</tr>
								<tr>
									<td>변경일</td>
									<td id="mod_dt">-</td>
								</tr>
								<tr>
									<td>분류</td>
									<td id="cl_nm">-</td>
								</tr>
								<tr>
									<td>메타태그(키워드)</td>
									<td id="meta_tag">-</td>
								</tr>
								<tr class="onoff">
									<td>수급처</td>
									<td id="col_org">-</td>
								</tr>
								<tr class="onoff">
									<td>담당자명</td>
									<td id="col_mng">-</td>
								</tr>
								<tr class="onoff">
									<td>연락처</td>
									<td id="col_tel">-</td>
								</tr>
								<tr class="onoff">
									<td>입수방법</td>
									<td id="col_method">-</td>
								</tr>
								<tr class="onoff">
									<td>입수주기</td>
									<td id="col_period">-</td>
								</tr>
								<tr class="onoff">
									<td>sop지오코딩건수</td>
									<td id="sop_geo_ok">-</td>
								</tr>
								<tr class="onoff">
									<td>daum지오코딩건수</td>
									<td id="daum_geo_ok">-</td>
								</tr>
								<tr class="onoff">
									<td>지오코딩실패건수</td>
									<td id="fail_geo_ok">-</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-right">
						<div class="btn-group line ">
						 	<button type="button" id="tblInfoHide" onoff="off">정보보기확대( + )</button>
							<button type="button" id="tableInfoModify">테이블정보수정</button>
							<button type="button" id="tableDownload">다운로드</button>
						</div>
					</div>					
				</div>

				<div class="in-box line mt20">
					<div class="tbs1">
						<table id="col_info">
							<colgroup>
								<col>
								<col>
							</colgroup>
							<thead>
								<tr>
									<th>컬럼명</th>
									<th>설명</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			
			<div class="col col-sm5">
				<div class="in-box line">
					<div class="tbs1">
						<div class="tb-tit">지오코딩 설정</div>
							<form name="geoForm">
							<table id="geotableInfo">
							<colgroup>
								<col width="120px">
								<col>
							</colgroup>
							<tbody>
								<tr>
									<td>지오코딩 필드 유형</td>
									<td>
									단일필드 <input type="radio" name="geo_fld" id="geo_fld_single" value="sigle" />
									&nbsp;&nbsp;&nbsp;&nbsp;
									복합필드 <input type="radio" name="geo_fld" id="geo_fld_complex" value="complex" />
									&nbsp;&nbsp;&nbsp;&nbsp;
									선택초기화 <input type="radio" name="geo_fld" id="geo_fld_reset" value="" />
									</td>
								</tr> 
								<tr>
									<td>지오코딩 필드</td>
									<td id="geo_field"></td>
								</tr>
								<tr>
									<td>지오코딩 방법</td>
									<td>
										<span class="select">
										<select name="sop_daum" id="sop_daum">
										<option value="sop">SOP</option>
										<option value="sopdaum">SOP+DAUM</option>
										<option value="daum">DAUM</option>
										</select>
										</span>
									</td>
								</tr>
								<tr>
									<td>총 건수</td>
									<td id="geocoding_total"></td>
								</tr>
								<tr>
									<td>총 성공건수</td>
									<td id="geocoding_success"></td>
								</tr>
								<tr>
									<td>SOP 성공건수</td>
									<td id="geocoding_sop_success"></td>
								</tr>
								<tr>
									<td>Daum 성공건수</td>
									<td id="geocoding_daum_success"></td>
								</tr>
								<tr>
									<td>성공율</td>
									<td id="geocoding_success_percentage"></td>
								</tr>
								<tr>
									<td>지오코딩 상태</td>
									<td id="geocoding_sts"></td>
								</tr>								
							</tbody>
						</table>
						</form>
						<div class="btn-right">
							<div class="btn-group line">
								<button type="button" class="c1" id="btnGeocodingExec">▶ 지오코딩 실행</button>
								<button type="button" id="btnResultView">성공 결과 보기</button>
								<button type="button" id="btnFailView">실패 결과 보기</button>
							</div>
						</div>
					</div>
				</div>
				
				<div class="in-box line mt20">
					<div class="tbs1">
						<div class="tb-tit">스크립트 입력</div>
						<!-- <div class="sel-lists">
							<span class="select"> 
							<select name="selectsql" id="selectsql">
								<option value="">스크립트 선택</option>
							</select>
							</span>
						</div> -->
						<div class="script-box">
							<span class="textarea">
							<textarea id="qry_txt" name="qry_txt" rows="15"></textarea>
							</span>
						</div>
						<div class="btn-right">
							<div class="btn-group line">
								<button type="button" id="btnSelect10">10건조회</button>
								<button type="button" id="btnSelectCount">카운트</button>
								<!-- <button type="button">스크립트 저장</button> -->
								<button type="button" class="c1" id="btnExec">▶ 실행 및 결과보기</button>
								<button type="button" id="resultDownload">실행결과 다운로드</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
			</div></div><!-- subConentWrap end-->				

<div id="dialogPreview" class="dialog" title="데이터결과 보기">
  <div class="dialog-inner" style="max-width:1100px;min-height:605px;height:auto;">
    <div class="row">
      <div class="cols">
        <div class="col col-1">
          <div class="in-box">
            <div id="jsGrid"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="dialogTableInfo" class="dialog" title="테이블정보관리">
  <div class="dialog-inner" style="max-width:1100px;height:400px;">
    <div class="row">
      <div class="cols">
        <div class="col col-1">
          <div class="in-box">
            <div class="tbs2">
              <table>
                <colgroup>
                  <col style="width:15%">
                  <col style="width:35%">
                  <col style="width:15%">
                  <col style="width:35%">
                </colgroup>
                <tbody>
					<tr>
						<th>테이블명</th>
						<td><span class="inputs"><input type="text" id="input_tbl_nm" placeholder="테이블명" disabled></span></td>
						<th>데이터설명</th>
						<td><span class="inputs"><input type="text" id="input_tbl_nm_ko" placeholder="데이터설명"></span></td>
					</tr>
					<tr>
						<th>분류</th>
						<td>
							<span class="select">
								<select name="input_cl_nm" id="input_cl_nm">
									<option value="">태그를 선택해주세요</option>
									<option value="사업체">사업체</option>
									<option value="센서스_수집">센서스-수집</option>
									<option value="센서스_가공">센서스-가공</option>
									<option value="센서스_분석">센서스_분석</option>
									<option value="통계주제도">통계주제도</option>
									<option value="생활업종">생활업종</option>
									<option value="살고싶은우리동네">살고싶은 우리동네</option>
									<option value="기술업종">기술업종</option>
									<option value="공공데이터">공공데이터</option>
									<option value="서비스">서비스(포털)</option>
									<option value="일자리">일자리</option>
									<option value="외부데이터">외부데이터</option>
									<option value="기타">기타</option>
								</select>
							</span>
						</td>
						<th>메타태그(키워드)</th>
						<td><span class="inputs"><input type="text" id="input_meta_tag" placeholder="메타태그(키워드)"></span></td>
					</tr>
					<tr>
						<th>수급처</th>
						<td><span class="inputs"><input type="text" id="input_col_org" placeholder="수급처"></span></td>
						<th>담당자명</th>
						<td><span class="inputs"><input type="text" id="input_col_mng" placeholder="담당자명"></span></td>
					</tr>
					<tr>
						<th>연락처</th>
						<td><span class="inputs"><input type="text" id="input_col_tel" placeholder="연락처"></span></td>
						<th>입수방법</th>
						<td><span class="inputs"><input type="text" id="input_col_method" placeholder="입수방법"></span></td>
					</tr>
					<tr>
						<th>입수주기</th>
						<td><span class="inputs"><input type="text" id="input_col_period" placeholder="입수주기"></span></td>
						<th>sop지오코딩건수</th>
						<td><span class="inputs"><input type="text" id="input_sop_geo_ok" placeholder="sop지오코딩건수"></span></td>
					</tr>
					<tr>
						<th>daum지오코딩건수</th>
						<td><span class="inputs"><input type="text" id="input_daum_geo_ok" placeholder="daum지오코딩건수"></span></td>
						<th>지오코딩실패건수</th>
						<td><span class="inputs"><input type="text" id="input_fail_geo_ok" placeholder="지오코딩실패건수"></span></td>
					</tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dialog-bts">
    <button type="button" id="tableInfoSave" class="btn lager line angular w130">저장</button>
    <button type="button" id="tableInfoClose" class="btn lager line angular w130">닫기</button>
  </div>
</div>

			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>
