
(function(W,D){
	W.$prjSetNew = W.$prjSetNew || {};
	
	$(document).ready(function(){
		$prjSetNew.event.setUIEvent();
	});
	
	//UI 내용작성
	$prjSetNew.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			prjSetUnitArr : [],
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2019. 07. 17. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			initView : function() {
				this.srtIdx = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
			},
			
			/**
			 * 
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				var searchText = $.trim($("#searchText").val());
				
				var options = {	
					params : {
						startIdx : startIdx,
						resultCnt : 15
					}
				};
				
				if (searchText.length > 0) {
					options.params["searchText"] = searchText;
				}
				return options;
			},
			
			/**
			 * 
			 * @name         : boardListViewPaging
			 * @description  : 페이징을 생성한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param totalCount: 데이터 갯수
			 * @param totalPage : 총페이지 갯수
			 * @param pageSize : 한페이지당 데이터 갯수
			 * @param data :데이터
			 * @papram pageIndex : 페이지 인덱스
			 */
			prjSetNewListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex) {
				$('#prjSetNewPage').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$prjSetNew.ui.srtIdx = (page - 1) * pageSize;
						$prjSetNew.ui.currentPage = page;
						$prjSetNew.request.doReqPrjSetNewList($prjSetNew.ui.srtIdx);
					}
				});
			},
			
			/**
			 * 
			 * @name         : getTableHeader
			 * @description  : 테이블 헤더를 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			getTableHeader : function() {
				var html = "";
				var colspan = 5;
				html +=  "<thead><tr>";
				html +=  "<th style='width: 45px;'></th>";
				html +=  "<th style='width: 60px;'>번호</th>";
				html +=  "<th>업무명</th>";
				html +=  "<th style='width: 130px;'>분류명</th>";
				html +=  "<th style='width: 100px;'>최종 수정일</th>";
				html +=  "</tr></thead>";
				return info = {
						header : html,
						colspan : colspan
				};
			},
			
			/**
			 * 
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			setEmptyListTable : function() {
				var info = this.getTableHeader();
				var html = info.header;
				html += "</tr><td colspan="+info.colspan+">검색된 내용이 없습니다.</td></tr>";
				$("#prjSetNewTable").append(html);	
			},
			
			/**
			 * 
			 * @name         : setprjSetNewListTable
			 * @description  : 업무설정 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setprjSetNewListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();	
				var html = info.header;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><span class='checkbox solo'><input type='checkbox' class='job_sel' name='job_seq' id='c" + i +"' value='"+data[i].job_setup_seq+"' job_nm='"+data[i].job_nm+"'><label for='c" + i +"'>&nbsp;</label></span></td>";
					html +=		"<td>"+(no+1)+"</td>";
					html +=		"<td class='left'>"+data[i].job_nm+"</td>";
					html +=		"<td>"+data[i].cl_nm+"</td>";
					html +=		"<td>"+data[i].reg_ts+"</td>";
					html +=	"</tr>";
				}
				$("#prjSetNewTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$prjSetNew.request = {
			
			/**
			 * 
			 * @name         : doReqPrjSetNewList
			 * @description  : 업무설정 정보를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param startIdx : 시작 인덱스
			 */
			doReqPrjSetNewList : function(startIdx) {
				var options = $prjSetNew.ui.setParams(startIdx);
				$ajax.requestApi(contextPath + "/api/prjmng/getWorkSetList.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$("#prjSetNewTable").empty();
							
							//log generate by cis
							var log_param = "searchButton";
							log_param += ", Category - " + $("#prjSetNewSearchSelectBox option:selected").text();
							log_param += ", word - " + $.trim($("#prjSetNewSearchText").val());
							//$log.srvLogWrite("Z0", "06", "04", "02", "", log_param);
							
							if (result.length > 0) {
								var totalPage = Math.ceil( result[0].total / $prjSetNew.ui.maxCntPerPage);
								$prjSetNew.ui.prjSetNewListViewPaging(result[0].total, totalPage, $prjSetNew.ui.maxCntPerPage, result, $prjSetNew.ui.currentPage);
								$prjSetNew.ui.setprjSetNewListTable(result, $prjSetNew.ui.maxCntPerPage, $prjSetNew.ui.currentPage);
							}else {
								$prjSetNew.ui.setEmptyListTable();
							}
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	//EVENT 내용작성
	$prjSetNew.event = {
		setUIEvent : function(){
			//검색버튼 이벤트
			$("#prjSetNewSearchBtn").on("click", function() {
				$prjSetNew.ui.currentPage = 1;
				$prjSetNew.request.doReqPrjSetNewList(0);					
			});
			
			//업무추가버튼 이벤트
			$("#newJobBtn").on("click", function() {
				$('#dialog3').dialog('open');
				$prjSetNew.ui.currentPage = 1;
				$prjSetNew.request.doReqPrjSetNewList(0);	
			});
			
			//단위업무 삭제 버튼 이벤트
			$(document).on("click",".delUnitBtn",function(){
				for (var arri=0;arri<$prjSetNew.ui.prjSetUnitArr.length;arri++) {
					if($prjSetNew.ui.prjSetUnitArr[arri].job_setup_seq == $(this).attr('job_setup_seq')) {
						$prjSetNew.ui.prjSetUnitArr.splice(arri, 1);
					}
				}				
				$(this).parent().parent().parent().parent().remove();
			});
			
			//단위업무 순서 위로 버튼 이벤트
			$(document).on("click",".upBtn",function(){
				var newIndex = 0;
				var newObj = {};
				for (var arri=0;arri<$prjSetNew.ui.prjSetUnitArr.length;arri++) {
					if($prjSetNew.ui.prjSetUnitArr[arri].job_setup_seq == $(this).attr('job_setup_seq')) {
						newObj=$prjSetNew.ui.prjSetUnitArr[arri];
						$prjSetNew.ui.prjSetUnitArr.splice(arri, 1);
						newIndex = arri;
						break;
					}
				}		
				newIndex = newIndex - 1;
				if (newIndex<=0) newIndex=0;
				
				$prjSetNew.ui.prjSetUnitArr.splice(newIndex, 0, newObj);
				
			    var $tr = $(this).parent().parent().parent().parent(); 
			    $tr.prev().before($tr);          

			});
			
			//단위업무 순서 아래로 버튼 이벤트
			$(document).on("click",".dnBtn",function(){
				var newIndex = 0;
				var newObj = {};
				var arrSize = $prjSetNew.ui.prjSetUnitArr.length;
				for (var arri=0;arri<$prjSetNew.ui.prjSetUnitArr.length;arri++) {
					if($prjSetNew.ui.prjSetUnitArr[arri].job_setup_seq == $(this).attr('job_setup_seq')) {
						newObj=$prjSetNew.ui.prjSetUnitArr[arri];
						$prjSetNew.ui.prjSetUnitArr.splice(arri, 1);
						newIndex = arri;
						break;
					}
				}		
				newIndex = newIndex + 1;
				if (newIndex>=arrSize-1) newIndex=arrSize;
				
				$prjSetNew.ui.prjSetUnitArr.splice(newIndex, 0, newObj);
				
			    var $tr = $(this).parent().parent().parent().parent(); 
			    $tr.next().after($tr);        

			});
			
			//업무추가 확인 버튼 이벤트
			$("#addJobBtn").on("click", function() {
				var html = "";
				$('input:checkbox[name="job_seq"]').each(function() {
					if(this.checked) {
						var obj = {};
						var dblChk = 0;
						obj.job_setup_seq=this.value
						obj.job_nm=$(this).attr("job_nm");
						for (var arri=0;arri<$prjSetNew.ui.prjSetUnitArr.length;arri++) {
							if($prjSetNew.ui.prjSetUnitArr[arri].job_setup_seq == obj.job_setup_seq) {
								dblChk++;
							}
						}
						if (dblChk == 0) {
							$prjSetNew.ui.prjSetUnitArr.push(obj);
							console.log(obj);
							html += "<tr><td><div class='mix-form2'>";
							html += "	<strong>업무</strong> ";
							html += "	<span class='inputs'><input type='text' job_setup_seq='"+obj.job_setup_seq+"' value='"+obj.job_nm+"' disabled></span>";
							html += "	<div class='btn-group line'>";
							html += "	<button type='button' class='upBtn' job_setup_seq='"+obj.job_setup_seq+"'>위로</button><button type='button' class='dnBtn' job_setup_seq='"+obj.job_setup_seq+"'>아래로</button><button type='button' class='delUnitBtn' job_setup_seq='"+obj.job_setup_seq+"'>삭제</button>";
							html += "	</div>";
						}
					}
				});
				$("#prj_uni_lList_tbl > tbody:last").append(html);
			});
			
			$(document).on("click",".job_sel",function(){
				var html = "";
				$('input:checkbox[name="job_seq"]').each(function() {
					if(this.checked) {
						var obj = {};
						var dblChk = 0;
						obj.job_setup_seq=this.value
						obj.job_nm=$(this).attr("job_nm");
						for (var arri=0;arri<$prjSetNew.ui.prjSetUnitArr.length;arri++) {
							if($prjSetNew.ui.prjSetUnitArr[arri].job_setup_seq == obj.job_setup_seq) {
								dblChk++;
							}
						}
						if (dblChk == 0) {
							$prjSetNew.ui.prjSetUnitArr.push(obj);
							console.log(obj);
							html += "<tr><td><div class='mix-form2'>";
							html += "	<strong>업무</strong> ";
							html += "	<span class='inputs'><input type='text' job_setup_seq='"+obj.job_setup_seq+"' value='"+obj.job_nm+"' disabled></span>";
							html += "	<div class='btn-group line'>";
							html += "	<button type='button' class='upBtn' job_setup_seq='"+obj.job_setup_seq+"'>위로</button><button type='button' class='dnBtn' job_setup_seq='"+obj.job_setup_seq+"'>아래로</button><button type='button' class='delUnitBtn' job_setup_seq='"+obj.job_setup_seq+"'>삭제</button>";
							html += "	</div>";
						}
					}
				});
				$("#prj_uni_lList_tbl > tbody:last").append(html);
			});
			
			$("#btnSave").on("click", function() {
				var jobObj = new Object();
				jobObj.project_nm = $("#project_nm").val();
				jobObj.project_desc = $("#project_desc").text();
				jobObj.cl_nm = $("#cl_nm").val();
				jobObj.project_param1 = $("#project_param1").val();
				jobObj.project_param_val1 = $("#project_param_val1").val();
				jobObj.project_param2 = $("#project_param2").val();
				jobObj.project_param_val2 = $("#project_param_val2").val();
				jobObj.project_param3 = $("#project_param3").val();
				jobObj.project_param_val3 = $("#project_param_val3").val();
				jobObj.project_param4 = $("#project_param4").val();
				jobObj.project_param_val4 = $("#project_param_val4").val();
				
				if (jobObj.project_nm == "") { $messageNew.open("알림","프로젝트 명 입력해주세요."); return; }
				if (jobObj.cl_nm == "") { $messageNew.open("알림","분류를 선택해주세요."); return; }
				
				jobObj.job_set = $prjSetNew.ui.prjSetUnitArr;
				var param = new Object();
				param.jsonStr = JSON.stringify(jobObj);
				
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + "/api/prjmng/prjSetNew.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							$log.srvLogWrite("Z2", "02", "01", "03", "", "");
							$messageNew.open("알림", "등록되었습니다.");
							//log generate by cis
							/* var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", ReplyNo - " + options.params.reply_no;
							$log.srvLogWrite("Z0", "05", "10", "00", "", log_param); */
							location.href='prjSet';
							break;
						default:  
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
				
				//console.log(jsonStr); 

			});
		}
	};
}(window,document));