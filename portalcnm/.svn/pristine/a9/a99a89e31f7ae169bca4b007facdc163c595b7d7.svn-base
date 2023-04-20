<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style type="text/css">
	#ITEM_B_CLASS_ID, #ITEM_M_CLASS_ID, #ITEM_S_CLASS_ID, #THEMA_LIST, #SURV_ID {
		width: 192px;
	}
	
	.table-flow {
		float:left;
		overflow: hidden;
		width: 372px;
		margin: 0 auto;
	}
	
	.table-flow-item {
		border-bottom: 1px solid darkgray;
	}
	
	#searchBtn, #register {
		margin-top: 1px;
		margin-right:2px;
		background: #4d75d0;
		color: #fff;
		width: 70px;
		height: 25px;
		border:none;
		cursor: pointer;
		border-radius: 10%;
	}
	
	/* 체크박스 header의 컬럼에는 체크박스가 안 보이게 안보이게 */
	.datagrid-header-check input{
        display: none;
    }
	</style>
	<script>
	$(document).ready(function(){
		
	 	
	 	/* 데이터가 없을 때, 데이터가 없다는 것에 대한 메시지를 작성하는 설정, 참고 : https://www.jeasyui.com/forum/index.php?topic=2457.0 */
	 	var myview = $.extend({}, $.fn.datagrid.defaults.view, {
	 	    onAfterRender: function (target) {
	 	        $.fn.datagrid.defaults.view.onAfterRender.call(this, target);
	 	        var opts = $(target).datagrid('options');
	 	        var vc = $(target).datagrid('getPanel').children('div.datagrid-view');
	 	        vc.children('div.datagrid-empty').remove();
	 	        if (!$(target).datagrid('getRows').length) {
	 	            var d = $('<div class="datagrid-empty"></div>').html(opts.emptyMsg || '조회되는 데이터가 없습니다.').appendTo(vc);
	 	            d.css({
	 	                position: 'absolute',
	 	                left: 0,
	 	                top: 100,
	 	                width: '100%',
	 	                textAlign: 'center',
	 	            });
	 	        }
	 	    }
	 	});
		
	    
		// https://www.jeasyui.com/forum/index.php?topic=4442.0  참고
		// 대표 키워드 그리드를 그려주는 메소드입니다.
		//   style="width:740px;height:400px;"
		function setDelegateKwrdGrid(BClassNm,delegateKwrd,searchNmSortVal){<!-- 20201127 2020년 SGIS고도화 3차 수정(searchNmSortVal추가)-->
			BClassNm =  BClassNm || "";
			delegateKwrd = delegateKwrd || "";
			searchNmSortVal = searchNmSortVal || "";
			$('#itemList').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				onCellEdit: function(index,field,value){
					console.log(index,field,value);
				},
				title: "대표 키워드 (행을 클릭하여 관련 명사 검색, 단일선택만 가능)",
				width: 740,
				height: 400,
				singleSelect:true,	// 한 개만 선택할 수 있게 했다.
				//checkOnSelect:true,
				//selectOnCheck:false,
				nowrap: false,	// 문자열이 너무 길면 줄바꿈이 일어나게 해준다.
				columns : [ [ {
					field : 'statDataId',
					title : '코드',
					width : 70,
					align : 'center',
					sortable : false
				},{
					field : 'mainKwrd',
					title : '대표키워드 명',
					width : 270,
					align : 'center',
					sortable : false
				}, {
					field : 'statDataSrvNm',
					title : '서비스 명',
					width : 390,
					align : 'center',
					sortable : false
				}] ],
				queryParams : {
					BClassNm: BClassNm,
					delegateKwrd: delegateKwrd,
					searchNmSort : searchNmSortVal<!-- 20201127 2020년 SGIS고도화 3차 수정(searchNmSortVal추가)-->
				},
				url : pageContext + '/api/ststistics/getStstisticsUSDelegatedKwrds.do',
				method: 'GET',
				onLoadSuccess: function(data) {
					
				},
				onSelect: function(rowIndex, rowData) {
					var mainKwrd = rowData.mainKwrd;
					setNounGrid(mainKwrd); 	// 형태소(명사) 그리드 그리기.
					setSynonymGrid();		// 기존의 유의어 검색 기록은 지운다.
				}
			});
			
		}
		
	 	
	 	
	 	// 형태소(명사) 그리드를 그려주는 메소드입니다.
		function setNounGrid(mainKwrd){
			mainKwrd =  mainKwrd || "";
			$('#nounGrid').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				onCellEdit: function(index,field,value){
					console.log(index,field,value);
				},
				title: "관련명사 (행을 클릭하여 관련 유의어 검색, 단일선택만 가능)",
				width: 330,
				height: 300,
				singleSelect:true,	// 한 개만 선택할 수 있게 했다.
				selectOnCheck:false,
				columns : [ [ 
					{
						field : 'text',
						title : 'AI Hub 검색 결과',
						width : 260,
						align : 'center',
						sortable : false
					}
					,{
					field : 'scode',
					title : '코드',
					width : 70,
					align : 'center',
					sortable : false
					}
				] ],
				queryParams : {
					mainKwrd: mainKwrd
				},
				url : pageContext + '/api/ststistics/getStstisticsUSNouns.do',
				method: 'GET',
				onLoadSuccess: function(data) {
					
				},
				onSelect: function(rowIndex, rowData) {
					var pKwrd = rowData.text;
					var pScd = rowData.scode;
					setSynonymGrid(pKwrd,pScd);
				}
			});
			
		}
		
	 	
		// 유의어 그리드를 그려주는 메소드입니다.
		function setSynonymGrid(pKwrd,pScd){
			pKwrd =  pKwrd || "";
			pScd =  pScd || "";
			$('#synonymGrid').datagrid({
				view: myview,
				emptyMsg: '조회되는 데이터가 없습니다.',
				onCellEdit: function(index,field,value){
					console.log(index,field,value);
				},
				title: "유의어 (행을 클릭하여 선택하십쇼, 다중선택 가능)",
				width: 330,
				height: 300,
				singleSelect:false,	// 다중선택이 가능하게 한다.
				columns : [ [ 
					<!-- 20201127 2020년 SGIS고도화 3차 수정 시작-->
					{
						field : 'rnum',
						title : '순번',
						width : 28,
						align : 'center',
						checkbox : true
					},
					<!-- 20201127 2020년 SGIS고도화 3차 수정 끝-->
					{
						field : 'syn',
						title : 'AI Hub 검색 결과',
						width : 330,
						align : 'center',
						sortable : false
					}
				] ],
				queryParams : {
					pKwrd: pKwrd,
					pScd: pScd
				},
				url : pageContext + '/api/ststistics/getStstisticsUSSynonyms.do',
				method: 'GET',
				onLoadSuccess: function(data) {
					
				},
				onSelect: function(rowIndex, rowData) {
					
				}
			});
			
		}
	 	
		/* ----------------- 이벤트 매핑 [START] -----------------*/
		// 검색 버튼 클릭시 이벤트
		$('#searchBtn').on('click',function(e){
			e.preventDefault();
			var BClassNm = $('#BClassNm').val();
			var delegateKwrd = $('#delegateKwrd').val();
			var searchNmSortVal = $('input:radio[name="searchNmSort"]:checked').val()<!-- 20201127 2020년 SGIS고도화 3차 추가-->
			setDelegateKwrdGrid(BClassNm,delegateKwrd,searchNmSortVal);<!-- 20201127 2020년 SGIS고도화 3차 수정 수정-->
			
			// 검색을 누르면 기존에 관련명사 및 유의어 검색기록들을 없앤다
			setNounGrid();
			setSynonymGrid();
			
		});
		
		// 등록 버튼 클릭시 이벤트
		$('#register').on('click',function(e){
			
			// 참고: http://www.jeasyui.com/demo/main/index.php?plugin=DataGrid&theme=default&dir=ltr&pitem=DataGrid%20Selection#
			// 유의어 그리드는 다중 선택인데, 선택된 다수의 행에 대한 데이터를 읽어온다.
			e.preventDefault();
			var rows = $('#synonymGrid').datagrid('getSelections');
         
			// 유효성 체크
            if(rows.length == 0) {
            	alert('최소한 하나의 유의어를 선택하셔야 등록이 가능합니다.\n[ 대표 키워드 -> 관련 명사 -> 유의어 ] 순으로 선택을 하고나서\n등록을 눌러주시기 바랍니다.');
            	return;
            }
			
			var statDataId = $('#itemList').datagrid('getSelections')[0].statDataId;	// 대표키워드 그리드에서 선택된 행의 코드값을 읽어온다.
            var msg = "";
            var synonymArr = [];
            var forAjaxSynonymData = [];
            
            
            // 화인창에 넣을 메시지 작성하기
            for(var i=0; i<rows.length; i++){
            	console.log(rows[i]);
            	synonymArr.push(rows[i].syn);
            	forAjaxSynonymData.push({ mainKwrd : rows[i].syn });
            }
            
            msg = "[ " + synonymArr.join(', ') + " ]를 선택하셨습니다.\n정말로 등록하시겠습니까?" 
            
           	// 확인창 호출
            if(window.confirm(msg)){
            	
            	$.ajax({
    				url: pageContext + "/api/ststistics/insertStstisticsUSSynonyms.do" ,
    				data: {
    					statDataId : statDataId,
    					synonymArr: JSON.stringify(forAjaxSynonymData),
    				},
    				method : 'post',
    				beforeSend: function(xhr) {
    					$('#register').text('등록 중...');
    					$('#register').css('pointer-events','none');	// 더블 클릭 방지
    				},
    				success : function(response){
    					if(response === 'Success') {
	    					console.log(response);
    						alert('매핑 데이터가 주입되었습니다.');
    					} else {
							alert("매핑 데이터 주입에 실패하였습니다.");
    					}
    			    },
    			    error : function(){
    			    	alert('서버상의 문제로 데이터 입력에 실패하셨습니다');
    			    	console.error('서버상의 문제로 데이터 입력에 실패하셨습니다');
    			    },
    			    complete: function() {
    			    	$('#register').text('등록');
    					$('#register').css('pointer-events','');
    			    }
    			});
            }
		});
		
		/* ------------------ 이벤트 매핑 [END] ------------------*/
		
		// 그리드를 모두 초기화
	    setDelegateKwrdGrid();
	    setNounGrid();
	    setSynonymGrid();
	    
	    // 뒤로가기 할 때 조회조건 입력란을 처음상태로 돌린다.
	    if(!history.state){
		    history.replaceState({},null,null);	// 한번이라도 들어왔으면 일단 history Stack에 흔적을 남긴다.
		    									// 이렇게 해야 나중에 
	    } else {
	    	document.querySelector('#resetForm').reset();
	    }
	    
	});
	
	
	</script>
</head>

<body>
	<div class="wrapper">
		<!-- cls:header start -->
		<%@include file="/jsp/include/ststisticsHeader.jsp" %>
		<!-- cls:header end -->
		<div class="contents">
			<!-- cls:left start -->
			<div class="lefitMenuWrapper" style="width: 200px;box-sizing: border-box"> <!-- 2020년 SGIS고도화 3차 - 마우스 휠을 사용한 줌아웃 시 레이아웃 깨짐 방지를 위한 css 변경 -->
				<script type="text/javascript">
					makeLeftMenu("3", "10", "12");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
				</script>
			</div>
			<!-- cls:left end -->
			<div class="acticle">
				<div class="location">
					<p>
						<a><img src='<c:url value="/html/include/img/ico/ico_home.png"/>' alt="home" /></a>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span>
						<span>서비스 관리</span> 
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span> My통계로</span><!--2019-02-19 수정  -->
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">유의어 기반 메인키워드 관리</span>
					</p>
				</div>
				<p class="title01">유의어 기반 메인키워드 관리</p><!--2019-02-19 수정  -->
				<div id="HeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 50px;position: relative;overflow: hidden;">
					<div class="tilte03" style="margin-top:0px;float: left;">조회조건</div>
					<button id="searchBtn" style="float: right;">검색</button>
				</div>
				 
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="15%" />
							<col width="35%" />
							<col width="15%" />
							<col width="35%" />
						</colgroup>
						<tbody>
							<tr>
								<!-- b_class_nm 을 group by 해온 데이터 -->
								<th class="right">그룹명</th>
								<td>
									<select class="input_use29 depend_on_themaList" id="BClassNm" name="BClassNm">
										<option value="">전체</option>
										<c:forEach items="${BClassNms}" var="item">
										<option value="${item.BClassNm}">${item.BClassNm}</option>
										</c:forEach>
									</select>
								</td>
								<th class="right">대표키워드 명</th>
								<td>
									<input type="text" id="delegateKwrd" name="delegateKwrd" class="input_use03 validatebox-text"  style="width:200px"/>
								</td>
							</tr>
							<!-- 20201127 2020년 SGIS고도화 3차 추가 시작 -->
							<tr>
								<th class="right" colspan="1">정렬</th>
								<td colspan="3">
									<div class="radioBtnWrapper">
										<input type="radio" name="searchNmSort" id="searchNmSortDesc" value="desc">
										<label for="searchCntSortDesc">대표키워드 명 내림차순</label>
										<input type="radio" name="searchNmSort" id="searchNmSortAsc" value="asc" checked="checked">
										<label for="searchCntSortAsc">대표키워드 명 오름차순</label>
									</div>
								</td>
							</tr>
							<!-- 20201127 2020년 SGIS고도화 3차 추가 끝 -->
						</tbody>
					</table>
				</form>
				
				<div id="detailHeaderWrapper" style="overflow: hidden; margin-bottom: 10px;margin-top: 30px"></div>
				
				<div id="table-flow-Wrapper" style="overflow: hidden; margin-bottom: 10px;">
					<div class="table-flow" style="position: relative; overflow: hidden; width: 740px; margin-bottom: 20px;">
						<div class="table-flow-item" id="table-flow-item-itemList" data-type="ITM" style="float: left;">
							<table id="itemList"></table>
		    			</div>
					</div>
					<div class="table-flow" style="position: relative; overflow: hidden; width: 740px;"> <!-- 테이블들을 가로로 열거하기 위한 것이다. -->
						<div class="table-flow-item" id="table-flow-item-contentList_1" data-type="C1" style="float: left;">
							<table id="nounGrid"></table>
		    			</div>
						<div class="table-flow-item" id="table-flow-item-contentList_2" data-type="C2" style="float: right;">
							<table id="synonymGrid"></table>
		    			</div>
					</div>
				</div>
				
				<div style="text-align: center;margin-top: 30px;">
					<button id="register" 	class="register">등록</button>
				</div>
			</div><!-- end of article -->
			
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<%-- <div class="popupWrapper" id="popup" style="left: 0">
			<div class="popupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">신규등록</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->		
					<form id="popupForm" enctype="multipart/form-data">
						<input type="hidden" id="CATEGORY_ID" name="CATEGORY_ID"/>
						<table class="popupTable" summary="연관어 상세정보popup">
							<caption>연관어 상세정보popup</caption>
							<tbody>
								<tr>
									<th class="right" style="width:100px;'">통계거리 아이디</th>
									<td>
										<input data-require="true" type="text" id="statDistanceId" data-edit="false" name="statDistanceId" maxlength="50" class="input_use13"/>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">서비스 여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn" data-require="true">
											<option value="">선택하세요.</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>표출순위</th>
									<td>
										<input data-require="true" type="number" class="input_use13" id="dispRank" name="dispRank" maxlength="2" min="1" step="1" style="width:170px;" />
									</td>
								</tr>
								<tr>
									<th>통계거리 명</th>
									<td>
										<input data-require="true" type="text" id="statDistanceNm" name="statDistanceNm" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>아이콘</th>
									<td>
										<label for="uploadfile">
											<a  style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 14px;  width: 51px; margin-right: 10px;">업로드</a>
											<input type="file" class="input_use11" id="uploadfile" name="uploadfile" value="파일업로드" onchange="javascript:$s.setFile(this);" style="display: none;"/>
										</label>
										<input type="text" id="tempUrl" name="tempUrl"  class="input_use11" style="margin-left: -10px; margin-top: -2px; width: 434px; height: 21px;"/>
									</td>
								</tr>
								<tr>
									<th>설명</th>
									<td>
										<textarea rows="2" cols="20" class="input_use10"  style="resize: none; width :500px;" id="iconExp" name="iconExp" ></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="save" 	class="save" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" 	class="cancel" 	style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a>
					</div>
				</div>
			</div>
		</div> --%>
		<%@include file="/jsp/include/ststisticsEtal.jsp" %>
	</div>
</body>
</html>