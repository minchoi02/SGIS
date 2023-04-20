<%
/**************************************************************************************************************************
* Program Name  : 상단 Header JSP  
* File Name     : includeSearch.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-09
*				: 웹 접근성 관련 tabindex 삭제 2016-12-08
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script type="text/javascript" src="/js/plugins/jquery.placeholder.min.js"></script>
<script type="text/javascript" src="/js/common/includeSearch.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$("body").on("keydown","#searchKeywordEng",function( key ){
			if( key.keyCode == 13 ){
				searchEng();
			}
		});
	});

	function searchEng(){
		//apiLogWrite2("F0","F60","Header 메뉴 클릭 로그","검색","00","없음");
		var val = $("#searchKeywordEng").val();
		if(val == "") { 
			messageAlert.open("notice", "Please enter your search term.");
		} else {
			//srvLogWrite("A0", "02", "14", "00", 'searchKeyword=' + val, "");
			window.location.href = contextPath + "/view/common/searchListEng?searchKeyword=" + val;
		}
	}
</script>
<style>
		header {
			width:100%;
		}
    	header h1{
    		top:0px;
    	}
    	
    	.headerEtc, .headerContents{
    		margin: auto;
    		width:1080px;
    	}
    	header #gnb {
    		width : 915px;
    		float: right;
    	}
    	
    	
    	header #gnb a {
		    display: table;
		    width: auto;
		    margin: 0px auto;
		    font-size: 15px;
		    color: #454545;
		    font-family: 'Nanum Gothic Bold';
		    line-height: 100%;
		    padding-top: 14px;
		    padding-bottom: 4px;
	    }
	    
	    .location{ float:right; }
	    .location li:first-child{ 
	    	display:block;
	    	background-repeat:no-repeat;
	    	background-position:left center;
	    	padding-left:15px; 
	    }
	    
	    .location li{
	    	line-height:13px;
	    	float:left;
	    	font-size:12px;
	    	color:#888;
	    	list-style:none;
	    }
	    
	    .location li:nth-child(1):after{ content:">"; display:inline-block; margin:0 8px;}
</style>
<a class="skipNav" href="#container" tabindex="2">본문바로가기</a>
<div class="headerEtc">
<a id="engKor" href="javascript:logWriteAndMove('A0', '09', '02', '00', '', '', '/view/index.jsp', false);" tabindex='3'>Korean</a>
</div>

<div class="headerContents">
	<h1><a href="javascript:logWriteAndMove('A0', '09', '01', '00', '', '', '/jsp/english/index.jsp', false);" tabindex="10"><img src='/jsp/english/img/logoPlus.gif' alt='SGIS plus 통계지리정보서비스' title="통계지리정보 서비스 홈페이지 입니다"/></a></h1>
	<h2>주메뉴</h2>
	<ul id="gnb" class="gnb" style="font-size: 16px;font-weight: bold;">
		<li style="width: 100px;"><a id="themaList" href="javascript:logWriteAndMove('A0', '09', '03', '00', '', '', '/jsp/english/thematic.jsp', false);">Thematic Maps</a></li>
		<li style="width: 180px;"><a id="interList" href="javascript:logWriteAndMove('A0', '09', '04', '00', '', '', '/jsp/english/interactive.jsp', false);">Interactive Statistical Map</a></li>
		<li style="width: 100px;"><a id="serviceList" href="javascript:logWriteAndMove('A0', '09', '05', '00', '', '', '/jsp/english/application.jsp', false);">Applications</a></li>
		<li style="width: 105px;"><a id="analList" href="javascript:logWriteAndMove('A0', '09', '06', '00', '', '', '/jsp/english/analysis.jsp', false);">Map Analysis</a></li>
		<li style="width: 95px;"><a id="sopList" href="javascript:logWriteAndMove('A0', '09', '07', '00', '', '', '/jsp/english/sopIntro.jsp', false);">About SGIS</a></li>
	</ul>
	<div class="searchArea nohidden">
        <div class="inputTxt" style="width:230px !important; left:-190px !important;">
            <input type="text" id="searchKeywordEng" style="width:185px !important;" placeholder="">
        </div>
        <div class="clearFix">
            <button type="submit" class="btn_submit" id="searchBtn" style="margin-left:10px;" onclick="javascript:apiLogWrite2('F0','F60','Header 메뉴 클릭 로그','검색','00','없음');searchEng();">search</button>
        </div>
    </div>
</div>