<%@page contentType="text/html; charset=UTF-8" %>
<script>
	//20200902 박은식 로그인 소통지도 삭제 로직 추가 start
	function deletePOI(){
		var grant_yn = "${community.cmmnty_partcptn_grant_yn}";
		var usr_id = "${community.usr_id}";
		var thisMapId = getParameter("id");
		var cmmtyPoiId = $("#detail-container").data("cmmnty_poi_id");
		var member_id = sop.member_id;
		
		var del_info = { "cmmnty_poi_id": cmmtyPoiId };
		
		var url = "";
		
		if( /(M|P|A)/.test( grant_yn ) && usr_id != member_id ){
			url = sgisContextPath+"/ServiceAPI/community/communityPoiDelete.json";
			
			if( grant_yn == "P" ){
				if( $("#poiId").val() == "" ){
					common_alert("ID를 입력해 주세요");
					return false;
				}
				
				del_info.cmmnty_ipcd = $("#poiId").val();
			}
			
			if( $("#poiPassWord").val() == "" ){
				common_alert("passWord를 입력해 주세요");
				return false;
			}
			
			del_info.cmmnty_ppcd = $("#poiPassWord").val();
			
		} else {
			url = contextPath+"/m2020/community/deletePoi.json";
			del_info.member_id = member_id;
		}
		
		console.log( 'del_info.. >> ', del_info );
		
    	jQuery.ajax({
	 		type:"POST",
	 		url: url,
	 		data: del_info,
			async: true,
	 		success:function( data ){
	 			if( /(M|P|A)/.test( grant_yn ) && usr_id != member_id ){
					if(data.errMsg == "Success"){
						common_alert("삭제되었습니다", function(){
							location.href= "${ctx }/m2020/map/withmap/map/communityMap.sgis?id=" + thisMapId;
						});
		 			}else{
		 				common_alert(data.errMsg);
		 			}
				}else{
					common_alert("삭제되었습니다", function(){
		 				location.href= "${ctx }/m2020/map/withmap/map/communityMap.sgis?id=" + thisMapId;
					});
				}
	 		},
	 		error:function(data) {
	 			
	 		}
		});
	}
 	//20200902 박은식 로그인 소통지도 삭제 로직 추가 end

</script>

<div id="detail-container" class="ContArea Community_Insert" style="display:none;">
	<div class="Community_maparea">
		<div class="DetailInfo">
			<div class="cm_newwin">
				<div class="datatit">
        			<h2>상세정보</h2>
        			<button class="" type="button" onclick='javascript:$communityForm.event.prevClick();'><img src="/mobile/resources/m2020/images/common/pop_close.png" alt="" /></button>
      			</div>
				<!-- <button class="btnclose" type="button" onclick='$("#map-container").show();$("#detail-container").hide();$communityMap.ui.map.gMap.invalidateSize();'>창닫기</button> --> <!-- 2020.09.09[신예리] 이전 버튼 추가로 인한 닫기 버튼 주석 -->
				<div class="cm_newwin_cont">
					<dl id="regist-info" class="InfoBox">
						<dt></dt> 
						<span class="date"></span>
						<dd class="SubInfo"> 
							<div id="regist-info-photo"></div>
							<span class="add"></span>
							<span class="comment"></span>
						</dd>
					</dl>
					<!-- 20200901 박은식  로그인이 필요한 소통지도인지 아닌지에 따라 보여지는 태그 변경 start-->
					<c:if test="${community.cmmnty_partcptn_grant_yn != 'N'}">
						<ol class="deleteol">
							<c:if test="${community.cmmnty_partcptn_grant_yn == 'P'}">
								<li><label class="sfbLabel">별명 </label><input id="poiId" type="text" value="" class="inputclear"/></li>
							</c:if>
							<li><label class="sfbLabel">패스워드  </label><input id="poiPassWord" type="password" value="" class="inputclear"/></li>
							<li class="ac"><button type="button" style="width: 100%; border-radius:0px;" onclick="javascript:deletePOI();srvLogWrite('O0', '20', '03', '02', '', '');" >삭제</button></li>
						</ol>
					</c:if>
					<c:if test="${community.cmmnty_partcptn_grant_yn == 'N'}">
						<ol class="deleteol">
							<li class="ac"><button id="btnLoginDelete"  style="width: 100%; border-radius:0px;" type="button" class="inputclear" onclick="javascript:deletePOI();srvLogWrite('O0', '20', '03', '02', '', '');" >삭제</button></li>
						</ol>
					</c:if>
						<!-- 20200901 박은식  로그인이 필요한 소통지도인지 아닌지에 따라 보여지는 태그 변경 end-->
<!-- 					<div class="CommentBox1"> -->
<!-- 						<h5>댓글 <span id="reply-count">-</span></h5> -->
<!-- 						<ul id="reply-list"></ul>  -->
<!-- 					</div> -->
					
<!-- 					<form id="reply-write" style="margin-bottom: 45px;"> 2020.09.09[신예리] 이전 버튼 높이 만큼 margin 값 추가 -->
<!-- 							<p class="comment_write"> -->
<!-- 								<label for="reply_content" class="Hidden">댓글입력</label> -->
<!-- 								<input id="reply_content" name="reply_content" type="text" class="inputclear"> -->
<!-- 								<button type="submit">댓글등록</button> -->
<!-- 							</p> -->
<!-- 					</form> -->
					<!-- 2020.09.09[신예리] 이전 버튼 추가 START -->
					<!-- <div class="sfbFooter"> 
						<button class="btn_search" type="button" style="width: 100%;" onclick='javascript:$communityForm.event.prevClick();'>이전</button>
					</div> -->
					<!-- 2020.09.09[신예리] 이전 버튼 추가 END -->
						
						
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 수정 Popup start 0714 신예리 추가 --> 
<div id="modify_popup_confirm" class="popWrapCommunity" style="display: none;"> 
	<div class="popBoxCommunity">
		<div class="popHeader"> 
			<span class="popTitle">댓글수정</span>
			<button id="modify_popup_confirm_close" class="btn_popClose" type="button"></button> 
		</div>
		<div class="popContentBox">  `	+ㅊㅊ
				<p id="modify_popup_confirm_message" class="sfbLabel00">댓글내용</p>
				<input class="communityInput" type="text" placeholder="확인완료!고생했어요 :-)">
				<p id="modify_popup_confirm_message" class="sfbLabel00">비밀번호</p>
				<input class="communityInput" type="password" placeholder="비밀번호"> 
			</div> 
	</div>
	<div class="popBtnBoxCommunity">
			<button id="modify_popup_confirm_modify" class="btn_popType1_00" type="button">수정</button>
			<button id="modify_popup_confirm_ok" class="btn_popType2_00" type="button">확인</button>
		</div>
</div> 
<!-- 수정 Popup end 0714 신예리 추가 -->

<!-- 삭제 Popup start 0714 신예리 추가 -->
<div id="delete_popup_confirm" class="popWrapCommunity" style="display: none;"> 
	<div class="popBoxCommunity">
		<div class="popHeader"> 
			<span class="popTitle" style="padding-left: 100px;">댓글삭제</span>
			<button id="delete_popup_confirm_close" class="btn_popClose" type="button"></button>
		</div>
		<div class="popContentBox">
				<p class="popMessage mb10">댓글을 삭제하시겠습니까?</p> 
				<input class="communityInput" type="password" placeholder="비밀번호"> 
			</div> 
	</div>
	<div class="popBtnBoxCommunity">
			<button id="delete_popup_confirm_delete" class="btn_popType1_00" type="button">삭제</button>
			<button id="delete_popup_confirm_ok" class="btn_popType2_00" type="button">취소</button>
		</div>
</div> 
<!-- 삭제 Popup end 0714 신예리 추가 -->
