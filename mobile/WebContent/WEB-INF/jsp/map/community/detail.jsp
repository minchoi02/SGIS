<%@page contentType="text/html; charset=UTF-8" %>
<script>

	
	
	function deletePOI(){
		
		var thisMapId = getParameter("id");
		var cmmtyPoiId = $("#detail-container").data("cmmnty_poi_id");
		
		if($("#poiId").val() == ""){
			alert("ID를 입력해 주세요");
			return false;
		}
		if($("#poiPassWord").val() == ""){
			alert("passWord를 입력해 주세요");
			return false;
		}
		
    	jQuery.ajax({
	 		type:"POST",
	 		url: "/ServiceAPI/community/communityPoiDelete.json",
	 		data:{	"cmmnty_poi_id": cmmtyPoiId,
	 			"cmmnty_ipcd" : $("#poiId").val(),
	 			"cmmnty_ppcd" : $("#poiPassWord").val()
	 		},
			async: true,
	 		success:function(data){ 
	
	 			if(data.errMsg == "Success"){
					alert("삭제되었습니다");
	 				location.href= "${ctx }/map/community.sgis?id=" + thisMapId;
	 			}else{
		 			alert(data.errMsg);
	 			}
	 			
	 		},
	 		error:function(data) {
	 		}
		});
    	
    	
    	
}
	
	
	
	
	
	
	
</script>
<div id="detail-container" class="ContArea Community_Insert" style="display:none;">
	<div class="Community_maparea">
		<div class="DetailInfo">
			<div class="cm_newwin">
				<h3>상세정보</h3>
				<button class="btnclose" type="button" onclick='$("#map-container").show();$("#detail-container").hide();$communityMap.ui.map.gMap.invalidateSize();'>창닫기</button>
				<div class="cm_newwin_cont">
					<dl id="regist-info" class="InfoBox">
						<dt></dt>
						<dd class="SubInfo">
							<span class="date"></span>
							<div id="regist-info-photo"></div>
							<span class="add"></span>
							<span class="comment"></span>
						</dd>
					</dl>
					<ol>
						<li><label>별명 </label><input id="poiId" type="text" value=""  /></li>
						<li><label>패스워드  </label><input id="poiPassWord" type="password" value="" /></li>
						<li class="ac"><button type="button" onclick="javascript:deletePOI();" >삭제</button></li>
					</ol>
					<div class="CommentBox1">
						<h5>댓글 <span id="reply-count">-</span></h5>
						<ul id="reply-list"></ul>
						<form id="reply-write">
							<p class="comment_write">
								<label for="reply_content" class="Hidden">댓글입력</label>
								<input id="reply_content" name="reply_content" type="text">
								<button type="submit">댓글등록</button>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>