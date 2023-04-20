<%
/**************************************************************************************************************************
* Program Name  : 하단 Footer JSP  
* File Name     : includeBottom.jsp
* Comment       : 
* History       : 네이버시스템 김성현 2015-09-22
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<div id="msgBox" class="dialog" title="알림">
	<div class="dialog-inner">
		<p class="default-ment" id="msgBoxTxt">알림메시지</p>
	</div>
	<div class="dialog-bts">
	 <button type="button" class="btn lager line angular w130" onclick="$('#msgBox').dialog('close');">확인</button>
	</div>
</div>
<div id="confirmBox" class="dialog" title="확인">
  <div class="dialog-inner">
    <p class="default-ment" id="confirmBoxTxt">선택하세요.</p>
    <!--<p class="dialog-tips">※ 단일실행으로 변경 시 등록된 스케줄은 삭제됩니다</p>-->
  </div>
  <div class="dialog-bts">
    <button type="button" class="btn lager line angular w130" onclick="$('#confirmBox').dialog('close');">취소</button>
    <button id="msgOkBtn" type="button" class="btn lager line angular w130">확인</button>
  </div>
</div>

<script src="${pageContext.request.contextPath}/js/common/includeBottom.js"></script>
<div class="footerWrap">
	<div class="footer">
		<p>
			[35208] 대전광역시 서구 청사로 189(둔산동, 정부대전청사 3동) FAX 042-481-2461 / 통계청콜센터 02-2012-9114 / 국번없이 110<br/>
			ⓒ Statistics Korea. All rights reserved since 1996.
		</p>
	</div>
</div>