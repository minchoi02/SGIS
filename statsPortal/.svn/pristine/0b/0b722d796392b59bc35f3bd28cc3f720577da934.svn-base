<%
/**************************************************************************************************************************
* Program Name  : 메인 JSP  
* File Name     : index.jsp
* Comment       : 
* History       : 네이버시스템 권차욱, 김성현 2015-09-03
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
	String value="";
	value = request.getAttribute("searchKeyword")==null?"":(String)request.getAttribute("searchKeyword");
%>
<jsp:include page="/view/common/common"></jsp:include>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>통계지리정보서비스</title>
    <script src="/js/common/includeHead.js"></script>
    <script src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
    <script src="/js/common/common.js"></script>
    <link href="/jsp/english/css/default.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="/css/layout.css" />
    <link rel="stylesheet" type="text/css" href="/jsp/english/css/main.css" />
    <link rel="stylesheet" type="text/css" href="/css/pm.css" />
    
	<script type="text/javascript">
		$(document).ready(function(){
			openApiMenuEngSearch( 0, "<%=value%>" );
			$("#searchKeywordEng").val("<%=value%>");
		});
		
		function openApiMenuEngSearch( pagenum,searchword ) {
			var sopOpenApiMenuEngObj = new sop.openApi.menueng.api();
			sopOpenApiMenuEngObj.addParam("accessToken", accessToken);
			sopOpenApiMenuEngObj.addParam("searchword", encodeURIComponent(encodeURIComponent(searchword)));
			sopOpenApiMenuEngObj.addParam("pagenum", pagenum);
			sopOpenApiMenuEngObj.request({
		        method : "GET",
		        async : true,
		        url : openApiPath+"/OpenAPI3/search/menueng.json",
		        options : {
		        	btntype : "search",
		        	api_id : "API_0501",
		        	params : {
		        		pagenum : pagenum,
		        		searchword : searchword
		        	}
		        }
		    });
		}
		(function(W, D) {
		//(function() {
		    $class("sop.openApi.menueng.api").extend(sop.portal.absAPI).define({
		        onSuccess : function(status, res, options) {
		        	if( res.errCd != "-401" ) {
		        		if( res.result && res.result.resultdata ){
		        			$.each( res.result.resultdata, function(i, item){
		        				console.log( i, item );
		        			});
		        			
		            		if(res.errCd == "0") {
		            			var result = res.result;
		            			//SOP
		            			if( result.resultdata.length > 0 ){
			            			var html = "<div class='search_result_list'>";
			            			html += "<p>SGIS Search Results</p>";
			            			html += "<ul>";
			            			for(var i = 0; i < result.resultdata.length; i++) {
			            				var elem = result.resultdata[i];
			            				html += "<li id='menuList_"+i+"'><a style='margin-left:20px;' href='javascript:logWriteAndMove(\"A0\", \"06\", \"03\", \"00\", \"\", \"\", \""+elem.url+"\", false);'>" + elem.title + "</a>";
			            				html += "</li>";
			            			}
			            			html += "</ul>";
			            			html += "</div>";	            		            
			            			$("#menuListTable").html(html);
		            			}
		            			
		            			//API 로그
		            			apiLogWrite("H0", options);
		            		}
		        		} else {
            				var html  = "<div id='emptySearchKeyword'>";
            				html += "	<div><p><em>No search results for'"+ "<%=value%>" +"'</em>.</p></div>";
            				html += "	<ul>";
            				html += "		<li>&middot; Check if the word is spelled correctly.</li>";
            				html += "		<li>&middot; Check if English is entered in Korean.</li>";
            				html += "	</ul>";
            				html += "</div>";
            				$("#article-wrap").html(html);
		        		}
	            	} else {
	            		accessTokenInfo();
	        			setTimeout( openApiMenuEngSearch(0, "<%=value%>"), 500);
		            }
		        },
		        onFail : function(status) {
		        }
		    });
		//}());
		}(window, document));
	</script>
</head>

<body class="main">
    <div class="accNav">
        <p><a href="#gnb">주메뉴 바로가기</a></p>
        <p><a href="#container">본문 바로가기</a></p>
    </div>
    <div id="wrap">
        <header>
			<jsp:include page="/jsp/english/includeSearch.jsp"></jsp:include>
		</header>
		
        <hr class="hidden" />
        <div id="container">
        	<div id="contents">
				<ul class="location" style="padding-bottom:10px;">
					<li><a href="/view/view/index"><img src="/images/common/location_home.gif" alt="홈"></a></li>
					<li><a href="/view/common/searchListEng?searchKeyword=<%=value%>">Search</a></li>
				</ul>
				<br><br>
				
	        	<div id="article-wrap">					
					<div id="menuListTable"></div>
					<br><br><br><br>
	        	</div>
			</div>
    	</div>
    </div>
</body>
</html>
