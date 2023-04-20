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
	
	<script src="${pageContext.request.contextPath}/js/work/addrDbMng.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/codeMirror/codemirror.css" />
	<script>
		$(document).ready(function() {
				
				
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});
		
		$(document).ready(function() {
			var addr_type = "${addr_type}";
		 	if (addr_type != undefined && addr_type != null) {
		 		$addrDbMng.ui.addr_type = addr_type;
		 	} else {
		 		$addrDbMng.ui.addr_type = "road"; 
		 	}
			
		 	if (addr_type == "adm") {
		 		$(".roadType").hide();
		 		$(".legType").hide();
		 	}

		 	if (addr_type == "" || addr_type == "legal") {
		 		$(".roadType").hide();
		 	}

		 	if (addr_type == "road") {
		 		$(".legType").hide();
		 		$(".admlegType").hide();
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
		      height: '290',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
	</script>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">
<!-- @@block content -->
<div class="sub-title">
  <strong class="home">데이터관리</strong>
  <h2>주소 DB 관리</h2>
  <h3>주소 데이터베이스를 관리합니다</h3>
</div>
<div class="view-container">
  <div class="row">
    <div class="cols">
      <div class="col col-sm4">
        <div class="in-box line" style="height:413px;">
          <div class="tbs1">
            <div class="tb-tit">
              조회 조건 설정
            </div>
            <div class="tabs round per3 mt10">
              <ul>
                <li<c:if test="${addr_type eq 'road'}"> class="is-active"</c:if>><a href="?addr_type=road">도로명</a></li>
                <li<c:if test="${addr_type eq 'legal'}"> class="is-active"</c:if>><a href="?addr_type=legal">법정동</a></li>
                <li<c:if test="${addr_type eq 'adm'}"> class="is-active"</c:if>><a href="?addr_type=adm">행정동</a></li>
              </ul>
            </div>
            <div class="mix-form3">
              <label for="sido">시도</label>
              <span class="select">
             	<c:if test="${addr_type eq 'admin'}"> 
                <select name="sido" id="sido">
					<option value="">전체</option>
					<option value="11">서울특별시</option>
					<option value="21">부산광역시</option>
					<option value="22">대구광역시</option>
					<option value="23">인천광역시</option>
					<option value="24">광주광역시</option>
					<option value="25">대전광역시</option>
					<option value="26">울산광역시</option>
					<option value="29">세종특별자치시</option>
					<option value="31">경기도</option>
					<option value="32">강원도</option>
					<option value="33">충청북도</option>
					<option value="34">충청남도</option>
					<option value="35">전라북도</option>
					<option value="36">전라남도</option>
					<option value="37">경상북도</option>
					<option value="38">경상남도</option>
					<option value="39">제주특별자치도</option>
                </select>
                </c:if>
                <c:if test="${addr_type ne 'admin'}"> 
                <select name="sido" id="sido">
					<option value="">전체</option>
					<option value="11">서울특별시</option>
					<option value="26">부산광역시</option>
					<option value="27">대구광역시</option>
					<option value="28">인천광역시</option>
					<option value="29">광주광역시</option>
					<option value="30">대전광역시</option>
					<option value="31">울산광역시</option>
					<option value="36">세종특별자치시</option>
					<option value="41">경기도</option>
					<option value="42">강원도</option>
					<option value="43">충청북도</option>
					<option value="44">충청남도</option>
					<option value="45">전라북도</option>
					<option value="46">전라남도</option>
					<option value="47">경상북도</option>
					<option value="48">경상남도</option>
					<option value="50">제주특별자치도</option>
                </select>
                </c:if>
              </span>
            </div>
            <div class="mix-form3">
              <label for="sgg">시군구</label>
              <span class="select">
                <select name="sgg" id="sgg">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3 admlegType">
              <label for="emd">읍면동명</label>
              <span class="select">
                <select name="emd" id="emd">
                  <option value="">전체</option>
                </select>
              </span>
            </div>
            <div class="mix-form3 admlegType">
              <label for="ri">리명</label>
              <span class="inputs">
                <input type="text" id="ri" name="ri">
              </span>
            </div>
            <div class="mix-form3 roadType">
              <label for="road">도로명</label>
              <span class="inputs">
                <input type="text" id="road" name="road">
              </span>
            </div>
            <div class="mix-form3">
              <label for="bonbun">본번</label>
              <span class="inputs">
                <input type="text" id="bonbun" name="bonbun">
              </span>
            </div>
            <div class="mix-form3">
              <label for="bubun">부번</label>
              <span class="inputs">
                <input type="text" id="bubun" name="bubun">
              </span>
            </div>
            <div class="mix-form3 roadType">
              <label for="buildng">건물명</label>
              <span class="inputs">
                <input type="text" id="bulding" name="bulding">
              </span>
            </div>
            <div class="mix-form3 roadType">
              <label for="mgt">건물관리번호</label>
              <span class="inputs">
                <input type="text" id="mgt" name="mgt">
              </span>
            </div>
            <div class="mix-form3 legType">
              <label for="pnu">PNU</label>
              <span class="inputs">
                <input type="text" id="pnu" name="pnu">
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-sm8">
        <div class="in-box line">
          <div class="tbs1">
            <div class="tb-tit">
              조회조건 (WHERE) 입력<span style="font-weight: 100;font-size: 14px;">(* 신속한 조회를 위해 가능한 본번(부번)을 입력하여 조회하세요.)</span>
            </div>
            <div class="script-box">
				<span class="textarea">
				<textarea id="qry_txt" name="qry_txt" rows="19"></textarea>
				</span>
            </div>
            <div class="btn-right">
              <div class="btn-group line">
                <button type="button" id="btnApply">조건 적용</button>
                <button type="button" class="c1" id="btnExec">▶ 실행(최대 1,000건)</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
  <div class="cols">
  <div class="col col-sm12">
	  <div class="in-box line">
	      <table width="100%" id="addrResult">
	      	<cols>
	      	<col width="210" />
	      	<col width="120" />
	      	<col/>
	      	<col/>
	      	<col/>
	      	<col/>
	      	<col/>
	      	<col/>
	      	<col/>
	      	<col width="150"/>
	      	<col/>
	      	</cols>
	        <thead>
	        <tr>
	          <th>건물관리번호</br>PNU</th>
	          <th>시도명</br>시군구명</th>
	          <th>행정동명</th>
	          <th>법정동명</br>리명</th>
	          <th>도로명</th>
	          <th>본번</th>
	          <th>부번</th>
	          <th>지번</th>
	          <th>건물명</br>부건물명</th>
	          <th>X좌표</br>Y좌표</th>
	          <th>지도</th>
	        </tr>
	        </thead>
	        <tbody>
	        </tbody>
	      </table>
	  </div>
  </div>
  </div>
  </div>
</div>
			</div></div><!-- subConentWrap end-->				

			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>
