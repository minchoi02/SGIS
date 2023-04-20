/**
 * 통계 소통지도 초기 화면
 * 
 * history : (주)유코아시스템, 1.0, 2016/1/12  초기 작성
 * author : 나광흠
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	$(document).ready(function(){
		$togetherList.event.setUIEvent();
		pageCallReg();
		
		$("#searchBtn").click(function(){
			currentPageIndex = 1;
			communityList();
		});
		
		$(".select ul li").click(function(){
			$(".select ul li").removeClass("on");
			$(this).addClass("on");
	    });
		
		$(".card02").click(function( e ){
			var id = $(e.target).closest("li").data("id");
			
			if( id ){
				var temp = $(e.target).closest("li").data("temp");
				
				if( temp == 'Y' ){
					location.href = $communityMapCommon.edu_url+"/auth?returnPage="+statsPotalDomain+$communityMapCommon.edu_url+"/together_form?cmmnty_map_id="+id;
				} else {
					location.href = $communityMapCommon.edu_url+"/together_view?cmmnty_map_id="+id;
				}
			}
		});
		
		$("#createBtn").click(function(){
			location.href = $communityMapCommon.edu_url+'/auth?returnPage='+statsPotalDomain+$communityMapCommon.edu_url+'/together_form';
		});
		
		$(".search").keydown(function(e) {
			if (e.keyCode == "13") {
				communityList();
				return false;
			}
		});
		
//		srvLogWrite( "H0", "01", "01", "00", "지역현안소통지도", "" ); //jrj 로그 > 지역현안소통지도 메인 뷰
	});
	W.$togetherList = W.$togetherList || {};
	var currentPageIndex = 1,pageSize = 6,firstSort=null,secondSort=null,last_cmmnty_map_id=null,tags=null;
	/**
	 * @name           : communityList
	 * @description    : 소통지도 리스트
	 * @date           : 2016. 01. 17.
	 * @author	       : 나광흠
	 * @history 	   :
	 */
	function communityList( page ){
		var obj = new sop.portal.communityList.api();
		obj.onBlockUIPopup();
		obj.addParam("type", "all");
		obj.addParam("page_num", page ? page : 1 );
		obj.addParam("pageSize", pageSize);
		obj.addParam("bnd_year", bndYear);
		obj.addParam("cmmnty_from_ce", $communityMapCommon.ss_school_grade);
//		if(last_cmmnty_map_id!=null){
//			obj.addParam("last_cmmnty_map_id", last_cmmnty_map_id);
//		}
		
		var search_word = $("#searchText").val();
		if( search_word && search_word.replace(/ /gi,"") != "" ){
			var search_type = $(".select ul li.on").data("searchtype");
			if( search_type && search_type.replace(/ /gi,"") != "" ){
				obj.addParam("search_type", search_type);
			}
			
			obj.addParam("search_word", search_word);
		}
		
		obj.addParam("first_sort", firstSort);
		secondSort="Default";
		obj.addParam("second_sort", secondSort);
//		if($communityMapCommon.hasText($communityMapCommon.getParameter("sido_cd"))){
//			obj.addParam("sido_cd", $communityMapCommon.getParameter("sido_cd"));
//			if($communityMapCommon.hasText($communityMapCommon.getParameter("sgg_cd"))){
//				obj.addParam("sgg_cd", $communityMapCommon.getParameter("sgg_cd"));
//				if($communityMapCommon.hasText($communityMapCommon.getParameter("emdong_cd"))){
//					obj.addParam("emdong_cd", $communityMapCommon.getParameter("emdong_cd"));
//				}
//			}
//		}
//		if($communityMapCommon.hasText(tags)){
//			obj.addParam("tags", $communityMapCommon.getParameter("tags"));
//		}
		obj.request({
			method : "POST",				
			async : true,
			url : contextPath + "/ServiceAPI/community/communityList.json"
		});
	}
	$togetherList.event = {
		/**
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * @date         : 2016. 1. 12. 
		 * @author	     : 나광흠
		 * @history 	 :
		 * @param
		 */
		setUIEvent: function() {
			communityList();
		}
	};
	/*********** 소통지도 리스트 시작 **********/
	(function() {
		$class("sop.portal.communityList.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res) {
				if(currentPageIndex==1){
					last_cmmnty_map_id = null;
					$(".card02").empty();
				}
				if(res.errCd == "0") {
					$(".card02").html("");
					
					if(res.result.summaryList.length>0){
						last_cmmnty_map_id = res.result.summaryList[res.result.summaryList.length-1].cmmnty_map_id;
						var today = parseInt($communityMapCommon.getToday());
						var html = '';
						
						$.each(res.result.summaryList,function(cnt,node){
							var communityIcon = "";
							if(node.cmmnty_partcptn_grant_yn=="A"){
								communityIcon = '<i class="level level01" alt="로그인 없이 모든 웹 사용자 등록 가능" title="로그인 없이 모든 웹 사용자 등록 가능"></i>';
							}else if(node.cmmnty_partcptn_grant_yn=="N"){
								communityIcon = '<i class="level level03" alt="로그인 없이 모든 웹 사용자 등록 가능" title="로그인 없이 모든 웹 사용자 등록 가능"></i>';
							}else if(node.cmmnty_partcptn_grant_yn=="Y"){
								communityIcon = '<i class="level level04" alt="로그인 후 개설자가 승인한 사용자만 등록 가능" title="로그인 후 개설자가 승인한 사용자만 등록 가능"></i>';
							}else if(node.cmmnty_partcptn_grant_yn=="P"){
								communityIcon = '<i class="level level02" alt="로그인 없이 개설자가 공유한 비밀번호로만 등록 가능" title="로그인 없이 개설자가 공유한 비밀번호로만 등록 가능"></i>';
							}else if(node.cmmnty_partcptn_grant_yn=="M"){
								communityIcon = '<i class="level level05" alt="로그인 없이 개설자가 등록한 아이디로만 등록 가능" title="로그인 없이 개설자가 등록한 아이디로만 등록 가능"></i>';
							}
//						
							var hot = (node.is_hot=='Y'?$("<img/>",{"src":contextPath+"/img/community/cm_intro_list_hot.png","alt":"Hot소통지도"}):"");
							var isWait = parseInt(node.prid_estbs_start_date.replace(/\./gi,""))>today;
							var newest = (node.is_new=='Y'?$("<img/>",{"src":contextPath+"/img/community/cm_intro_list_new.png","alt":"New소통지도"}):"");
							
							var type = '';
							if(node.temp_save_yn=="Y"){
								type = '<img src="/img/community/cm_intro_list_temp.png" alt="임시소통지도" style="display:inline-block !important;"/>';
							}else if(isWait){
								type = '<img src="/img/community/cm_intro_list_wait.png" alt="대기소통지도" style="display:inline-block !important;"/>';
							}
							
							html += '<li data-id="'+ node.cmmnty_map_id +'" data-temp="'+ node.temp_save_yn +'" class="'+ ( node.is_new == 'Y' ? 'new' : '' )+'">';
							html += '    <a>';
							html += type;
							html += '        <span class="cardHead" style="display:inline-block !important;">';
							html += communityIcon;
							html += '        </span>';
							html += '        <em class="cardTi">'+ node.cmmnty_map_nm +'</em>';
							
							if( node.tags ){
								var arr = node.tags.split("*#*");
								for( var i=0; i<arr.length; i++ ){
									if( arr[i] ){
										html += '<i class="hashTag">'+arr[i]+'</i>';
									}
								}
							}
							
							html += '        <span class="cardInfo">';
							html += '            <i class="userId">'+ node.usr_id +'</i>';
							html += '            <i class="date">'+ node.reg_date +'</i>';
							html += '            <i class="viewer">'+ node.hits +'</i>';
							html += '        </span>';
							html += '        <span class="people">'+ node.join_cnt +'</span>';
							html += '    </a>';
							html += '</li>';
						});
						
						$(".card02").html( html );
						
//						$(".card02 .Type>img[title]").tooltip({position: {my: "left0 top-8", at: "right top"}});
//						
						var currentIndex = res.result.curPage;
						var totalPage = Math.ceil(totalPage / 6); // 전체 페이지 수
						$('.paging').paging({
							current : currentIndex,
							max : Math.ceil(res.result.total_count/6),
							itemClass : 'num',
							itemCurrent : 'on',
							format : '{0}',
							href : 'javascript:void(0);',
							nextClass : 'next',
							prevClass : 'prev',
							firstClass : 'first',
							lastClass : 'last',
							onclick : function(e, page) { // 페이지 선택 시
								communityList( page );
							}
						});
						
						currentPageIndex++;
					}else{
						$(".card02").empty().append($("<div/>",{"style":"width:100%;text-align:center;","text":"검색결과가 존재하지 않습니다"}));
						$(".paging").html("");
					}
				} else {
//					$communityMapCommon.alert("알림", res.errMsg);
				}
				this.onBlockUIClose();
			},
			onFail : function(status) {
				this.onBlockUIClose();
			}
		});
	}());
}(window, document));
