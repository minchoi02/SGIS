<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>	
	<%@include file="/jsp/include/ststisticsScript.jsp" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<link rel="stylesheet" href='<c:url value="/html/include/css/popupIssueFix.css"/>' />
	<style>
	</style>
	<script>
	$(document).ready(function(){
		var corp01, corp02 = '';
		setFacilityGrid(); //시설유형 목록 Grid
		
		//시설유형 저장
		$("#popup #factypeSave").on("click",function(){
			if(!confirm("저장 하시겠습니까?"))return false;
			
			if(isRequired($("#upperFactypeCd").val())){
				return ststistics.message({message :"시설유형 분류를 선택 해주세요" , returnValue : false});
			}
			if(isRequired($("#factypeNm").val())){
				return ststistics.message({message :"시설유형 명을 선택 해주세요" , returnValue : false});
			}
			if(isRequired($("#useYn").val())){
				return ststistics.message({message :"사용여부를 선택 해주세요" , returnValue : false});
			}
			if(isRequired($("#srvYn").val())){
				return ststistics.message({message :"시설유형 명을 선택 해주세요" , returnValue : false});
			}
			
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/updataFactypeList.do',
				  data: $("#popupForm").serialize(),
				  method : 'post',
				  success : function(resBody){
					  console.log(resBody);
					  alert("저장 하였습니다.");
					  
					  $("#popup , .popupWrapper").hide();
						$('#facilityList').datagrid('load',{
							factypeLclasCd: '',
							factypeNm: ''
					    });
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		});
		
		//업종연결 저장
		$("#corpSave").on("click",function(){
			var factype = $('#popupFacilityList01').datagrid('getSelected');
			var corp = $('#popupCorpList01').datagrid('getSelections');
			var cheakCd = 0;
			console.log(JSON.stringify(corp));
			if(!confirm("저장 하시겠습니까?"))return false;
			
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/addCorpMappingData.do',
				  data: {factype : factype.factypeLclasCd, corp : JSON.stringify(corp)},
				  method : 'post',
				  success : function(resBody){
					  alert("저장 하였습니다.");
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		});
		
		
		//POI연결 저장
		$("#poiSave").on("click",function(){
			console.log("POI연결 저장");
			var factype = $('#popupFacilityList02').datagrid('getSelected');
			var poi = $('#popupCorpList02').datagrid('getSelections');

			if(!confirm("저장 하시겠습니까?"))return false;
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/addPoiMappingData.do',
				  data: {factype : factype.factypeCd, poi : JSON.stringify(poi)},
				  method : 'post',
				  success : function(resBody){
					  alert("저장 하였습니다.");
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		});
		
		$('#popupCorp01_01, #popupCorp01_02').change(function(){
			corp01 = $(this).val();
			var thisId =this.id
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/getCorpListData01.do',
				  data: {'ksic1Cd' : corp01},
				  method : 'post',
				  success : function(resBody){
					  console.log(resBody);
					  var html = '<option value="">* 분류2</option>';
					  $.each(resBody.data, function(index, item){
							html += '<option value="'+item.ksic2Cd+'">'+item.ksic2Nm+'</option>';
					  });
					  if(thisId == "popupCorp01_01"){
						  $("#popupCorp02_01").html(html); 
					  }else{
						  $("#popupCorp02_02").html(html); 
					  }  
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		})
		
		$('#popupCorp02_01, #popupCorp02_02').change(function(){
			console.log(corp01);
			corp02 = $(this).val();
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/getCorpListData02.do',
				  data: {'ksic1Cd' : corp01, 'ksic2Cd' : corp02},
				  method : 'post',
				  success : function(resBody){
					  var html = '<option value="">분류3</option>';
					  $.each(resBody.data, function(index, item){
						  html += '<option value="'+item.ksic3Cd+'">'+item.ksic3Nm+'</option>';
					  });
					  
					  $("#popupCorp03_02").html(html); 
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		})
		
		$('#popupCorp03_02').change(function(){
			console.log(corp01, corp02);
			console.log($(this).val());
			$.ajax({
				  url: pageContext + '/api/srvAreaMng/getCorpListData03.do',
				  data: {'ksic1Cd' : corp01, 'ksic2Cd' : corp02, 'ksic3Cd' : $(this).val()},
				  method : 'post',
				  success : function(resBody){
					  var html = '<option value="">분류4</option>';
					  $.each(resBody.data, function(index, item){
						  html += '<option value="'+item.ksic4Cd+'">'+item.ksic4Nm+'</option>';
					  });
					  
					  $("#popupCorp04_02").html(html); 
				  },
				  error : function(){
					  alert("서버와의 통신이 원할하지 않습니다.");
				  },
			});
		});

		$("#statDfltDt").attr("disabled", true);
		//교육 빼고... 디폴트값 선택 안됨
		$('#upperFactypeCd').change(function(){
			if($("#upperFactypeCd option:selected").val() == 'SAL001'){
				$("#statDfltDt").removeClass("disabled");
				$("#statDfltDt").attr("disabled", false);
			}else{
				$("#statDfltDt").addClass("disabled");
				$("#statDfltDt").attr("disabled", true);
			}
		});
		
	});//ready end
	
	function setFacilityGrid(){
		$('#facilityList').datagrid({
			columns : [ [ {
				field : 'rnum',
				title : '순번',
				width : 50,
				align : 'center',
				sortable : true
			},{
				field : 'upperFactypeNm',
				title : '시설유형 분류',
				width : 100,
				align : 'center',
				sortable : true
			}, {
				field : 'factypeCd',
				title : '시설유형코드',
				hidden : true
			}, {
				field : 'factypeNm',
				title : '시설유형 명',
				width : 200,
				align : 'center',
				sortable : true
			}, {
				field : 'poiYn',
				title : 'POI 연결여부',
				width : 100,
				align : 'center',
				sortable : true
			},{
				field : 'useYn',
				title : '사용 여부',
				width : 100,
				align : 'center',
				sortable : true
			},{
				field : 'srvYn',
				title : '서비스 여부',
				width : 100,
				align : 'center',
				sortable : true
			},{
				field : 'srvYn',
				title : '사용빈도',
				width : 40,
				align : 'center',
				sortable : true
			} ] ],
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
		});
	}
	
	//업종연결 시설유형 Grid
	function setPopupGrid01(){
		$('#popupFacilityList01').datagrid({
			columns : [ [ {
				field : 'factypeLclasCd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'factypeLclasNm',
				title : '시설유형 분류',
				width : 300,
				align : 'center',
				sortable : true
			}] ],
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getPopupFactypeLclasList.do',
			method: 'POST',
			onClickRow : function(index,row){
				console.log(row);
				var upper_factype_cd = row.factypeLclasCd
				$('#popupCorpList01').datagrid({
					queryParams: {
						upperFactypeCd : upper_factype_cd,
					},
					url : pageContext + '/api/srvAreaMng/getPopupUpperCorpMappingList.do',
					method: 'POST',
				});
			}
		});
	}
	//업종연결 산업분류 Grid
	function setPopupGrid02(){
		$('#popupCorpList01').datagrid({
			columns : [ [ {
				field : 'ksic3Cd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'ksic2Cd',
				title : 'ksic2Cd',
				hidden : true
			},{
				field : 'ksic1Nm',
				title : '1분류 명',
				width : 160,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic2Nm',
				title : '2분류 명',
				width : 160,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic3Nm',
				title : '3분류 명',
				width : 160,
				align : 'center',
				sortable : true
			}] ],
			onLoadSuccess : function(data){
				$('#popupCorpList01').datagrid('checkAll');
			}
			/*
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
			*/
		});
	}
	//POI연결 시설유형 Grid
	function setPopupGrid03(){
		$('#popupFacilityList02').datagrid({
			columns : [ [ {
				field : 'factypeCd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'upperFactypeNm',
				title : '시설유형 분류',
				width : 150,
				align : 'center',
				sortable : true
			}, {
				field : 'factypeNm',
				title : '시설유형 명',
				width : 150,
				align : 'center',
				sortable : true
			} ] ],
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getPopupFacilityList.do',
			method: 'POST',
			onClickRow : function(index,row){
				var factype_cd = row.factypeCd
				$('#popupCorpList02').datagrid({
					queryParams: {
						factypeCd : factype_cd,
					},
					url : pageContext + '/api/srvAreaMng/getPopupFacilityPoiMappingList.do',
					method: 'POST',
				});
			}
		});
	
	}
	//POI연결 산업분류 Grid
	function setPopupGrid04(){
		$('#popupCorpList02').datagrid({
			columns : [ [ {
				field : 'ksic5Cd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'ksic1Nm',
				title : '1분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic2Nm',
				title : '2분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic3Nm',
				title : '3분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic4Nm',
				title : '4분류 명',
				width : 102,
				align : 'center',
				sortable : true
			} , {
				field : 'ksic5Nm',
				title : '5분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}  ] ]
			, onLoadSuccess : function(data){
				$('#popupCorpList02').datagrid('checkAll');
			}
			/*
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
			*/
		});
	}
	
	function setPopupGrid05(){
		$('#addPopupCorpList01').datagrid({
			columns : [ [ {
				field : 'ksic3Cd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'ksic2Cd',
				title : 'ksic2Cd',
				hidden : true
			},{
				field : 'ksic1Nm',
				title : '1분류 명',
				width : 160,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic2Nm',
				title : '2분류 명',
				width : 160,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic3Nm',
				title : '3분류 명',
				width : 160,
				align : 'center',
				sortable : true
			} ] ],
			/*
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
			*/
		});
	}
	
	function setPopupGrid06(){
		$('#addPopupCorpList02').datagrid({
			columns : [ [ {
				field : 'ksic5Cd',
				title : '순번',
				width : 28,
				align : 'center',
				checkbox : true
			},{
				field : 'ksic1Nm',
				title : '1분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic2Nm',
				title : '2분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic3Nm',
				title : '3분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}, {
				field : 'ksic4Nm',
				title : '4분류 명',
				width : 102,
				align : 'center',
				sortable : true
			} , {
				field : 'ksic5Nm',
				title : '5분류 명',
				width : 102,
				align : 'center',
				sortable : true
			}  ] ],
			/*
			queryParams : {
			},
			url : pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeList.do',
			method: 'POST',
			onClickRow : function(index,row){
				detailList(row);
			}
			*/
		});
	}
	
	
	
	function addPopup(type){
		if(type == 1){

			if($('#popupFacilityList01').datagrid('getSelected') == null){
				alert("시설 유형 분류를 체크하세요");
				return false;
			}
			setPopupGrid05();
			$("#addCorpPopup01 , .addPopupWrapper01").show();
		}else{
			if($('#popupFacilityList02').datagrid('getSelected') == null){
				alert("시설 유형 분류를 체크하세요");
				return false;
			}
			
			setPopupGrid06();	
			$("#addCorpPopup02 , .addPopupWrapper02").show();
		}
	}
	
	//검색
	function doSearch(){
		console.log($("#facType option:selected").val(), $('#word').val())
		$('#facilityList').datagrid('load',{
			factypeLclasCd: $("#facType option:selected").val(),
			factypeNm: $('#word').val()
	    });
	}
	function setPopup(type){
		clearForm('popupForm');
		$("#popup , .popupWrapper").show();
		if(type == "detail"){
			$("#popTitle").html("생활권역 통계지도 시설유형 상세/수정");
		}else{
			$("#popTitle").html("생활권역 통계지도 시설유형 등록");
		}
	}

	//상세화면
	function detailList(data){
		clearForm('popupForm');
		var factypeCd = data.factypeCd
		 if(factypeCd == 'SA0001'){
			$("#statDfltDt").removeClass("disabled");
			$("#statDfltDt").attr("disabled", false);
		 }else{
			$("#statDfltDt").addClass("disabled");
			$("#statDfltDt").attr("disabled", true);
		 }
		
		$.ajax({
			  url: pageContext + '/api/srvAreaMng/getSrvAreaFacilityTypeDetailData.do',
			  data: {'factypeCd' : factypeCd},
			  method : 'post',
			  success : function(resBody){
				  var data = $.extend(resBody.data[0]);
				  console.log(data);
				  setPopup('detail');
				  $('#popupForm').find('select, input').each(function(index, elem){
					  $(this).val(data[this.id]);
				  });
			  },
			  error : function(){
				  alert("서버와의 통신이 원할하지 않습니다.");
			  },
		});
	}
	
	function clearForm(target){
		 $('#'+target).find('select, input').each(function(index, elem){
			  $(this).val('');
		  });
	}
	
	function setCorpPopup(){
		$("#corpPopup , .corpPopupWrapper").show();
		$("#poiPopup , .poiPopupWrapper").hide();
		setPopupGrid01();
		setPopupGrid02();
	}
	
	function setPoiPopup(){
		$("#poiPopup , .poiPopupWrapper").show();
		$("#corpPopup , .corpPopupWrapper").hide();
		setPopupGrid03();
		setPopupGrid04();
	}
	
	//팝업 창 시설유형 검색
	function popUpFactypeSearch(type){
		//업종연결
		if(type == 1){
			var factype_lclas_cd = $("#popupFactypeLclasCd option:selected").val();

			$('#popupFacilityList01').datagrid('load',{
				factypeLclasCd : factype_lclas_cd,
			});
		}else{//poi연결
			var factype_lclas_cd = $("#popupUpperFactypeCd option:selected").val();
			var factype_nm = $("#factypeWord").val();
			
			$('#popupFacilityList02').datagrid('load',{
				factypeLclasCd : factype_lclas_cd,
				factypeNm : factype_nm,
			});
		}
	}
	
	//팝업 창 산업분류 검색
	function popUpCorpSearch(type){
		var ksic_1_cd, ksic_2_cd, ksic_3_cd, ksic_4_cd, ksic_5_nm, ksic_3_nm, upper_factype_cd, factype_cd = '';
		
		//업종연결
		if(type == 1){
						
			ksic_1_cd = $("#popupCorp01_01 option:selected").val();
			ksic_2_cd = $("#popupCorp02_01 option:selected").val();
			ksic_3_nm = $('#ksic_3_Nm').val();
			
			if(ksic_1_cd == ""){
				alert("산업분류 분류1은 필수값입니다. 분류1를 선택하세요");
				return false;
			}
			
			$('#addPopupCorpList01').datagrid({
				queryParams: {
					ksic1Cd : ksic_1_cd,
					ksic2Cd : ksic_2_cd,
					ksic3Nm : ksic_3_nm,
				},
				url : pageContext + '/api/srvAreaMng/getPopupUpperCorpList.do',
				method: 'POST'
			});
			
		}else{//poi연결
			ksic_1_cd = $("#popupCorp01_02 option:selected").val();
			ksic_2_cd = $("#popupCorp02_02 option:selected").val();
			ksic_3_cd = $("#popupCorp03_02 option:selected").val();
			ksic_4_cd = $("#popupCorp04_02 option:selected").val();
			ksic_5_nm = $('#ksic_5_Nm').val();
			
			if(ksic_1_cd == ""){
				alert("산업분류 분류1은 필수값입니다. 분류1를 선택하세요");
				return false;
			}else if(ksic_2_cd == ""){
				alert("산업분류 분류2 필수값입니다. 분류2를 선택하세요");
				return false;
			}
			
			
			$('#addPopupCorpList02').datagrid({
				queryParams: {
					ksic1Cd : ksic_1_cd,
					ksic2Cd : ksic_2_cd,
					ksic3Cd : ksic_3_cd,
					ksic4Cd : ksic_4_cd,
					ksic5Nm : ksic_5_nm,
					ksic3Nm : ksic_3_nm,
					upperFactypeCd : upper_factype_cd,
					factypeCd : factype_cd
				},
				url : pageContext + '/api/srvAreaMng/getPopupFacilityCorpList.do',
				method: 'POST'
			});
		}	
	}
	
	function addRows(type){
		if(type == 1){
			var rows = $('#addPopupCorpList01').datagrid('getSelections');
			$.each(rows, function(index, item){
				$('#popupCorpList01').datagrid('appendRow',{
					  ksic3Cd : item.ksic3Cd,
					  ksic2Cd : item.ksic2Cd,
					  ksic1Nm : item.ksic1Nm,
					  ksic2Nm : item.ksic2Nm,
					  ksic3Nm : item.ksic3Nm
				});
			});
			
			$("#addCorpPopup01 , .addPopupWrapper").hide();
			$("#corpPopup , .corpPopupWrapper").show();
			
			$('#popupCorpList01').datagrid('checkAll');
			
		}else{
			var rows = $('#addPopupCorpList02').datagrid('getSelections');
			$.each(rows, function(index, item){
				$('#popupCorpList02').datagrid('appendRow',{
					  ksic5Cd : item.ksic5Cd,
					  ksic1Nm : item.ksic1Nm,
					  ksic2Nm : item.ksic2Nm,
					  ksic3Nm : item.ksic3Nm,
					  ksic4Nm : item.ksic4Nm,
					  ksic5Nm : item.ksic5Nm
				});
			});
			$("#addCorpPopup02 , .addPopupWrapper").hide();
			$("#poiPopup , .poiPopupWrapper").show();
			
			$('#popupCorpList02').datagrid('checkAll');
		}
	}
	
	function setUpperAddPopup(){
		$("#UpperPopup , .UpperPopupWrapper").show();
	}
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
					makeLeftMenu("3", "13", "2");	//탑메뉴순서, 선택된 왼쪽 빅메뉴, 선택된 왼쪽 small메뉴
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
						<span> 생활권역 통계지도</span>
						<span><img src='<c:url value="/html/include/img/ico/ico_navi.png"/>' alt="다음" /></span> 
						<span class="fontS">시설유형 관리</span>
					</p>
				</div>
				<p class="title01">생활권역 통계지도 시설유형 관리</p>
				<div class="tilte03">조회조건</div>
				<div class="searchBtn04" id="search">
					<a style="cursor: pointer" href="#" onclick="doSearch();"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
				</div>
				<form id="resetForm">
					<table class="apiTable02" summary="조회조건">
						<caption>조회조건</caption>
						<colgroup>
							<col width="20%" />
							<col width="30%" />
							<col width="20%" />
							<col width="30%" />
						</colgroup>
						<tbody>
							<tr>
								<th class="right">시설유형 분류</th>
								<td>
									<select class="input_use08" id="facType" name="facType">
										<option value="">전체</option>
										<c:forEach items="${paramInfo.data}" var="list">
											<option value="${list.factypeLclasCd}">${list.factypeLclasNm}</option>
										</c:forEach>
									</select>
								</td>
								<th class="right">시설유형 명</th>
								<td>
									<input type="text" id="word" name="word" class="input_use03 validatebox-text"/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
				<div class="tilte03">검색결과</div>
				<div class="searchBtn04">
					
					<div class="searchBtn04">
						<a href="javascript:setCorpPopup();"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="excel_templete_download">업종연결</label>
						</a>
						<a href="javascript:setPoiPopup();"  style=" margin-right:5px; cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="update">POI연결</label>
						</a>
						<a  href="javascript:setPopup('new');" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 6px 11px;  width: 51px; line-height: 25px;">		
							<label style="cursor: pointer;" for="register">신규등록</label>
						</a>
					</div>
					
				</div>
				<table id="facilityList" class=""  title="" style="width:743px;height:500px;"
		            data-options="singleSelect:true,collapsible:false,checkOnSelect:false,selectOnCheck:false">
		    	</table>
			</div>
		</div>
		<!-- cls:footer start -->
		<div class="footerWrapper"></div>
		<!-- cls:footer end -->
		<div class="popupWrapper" id="popup" style="left: 0;">
			<div class="popupWrapper">
				<div class="aplPopupWrapper">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle"></div>
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
									<th class="right" style="width:100px;'">시설유형 분류</th>
									<td>
										<select class="input_use08" id="upperFactypeCd" name="upperFactypeCd">
											<option value="">선택하세요</option>
											<c:forEach items="${paramInfo.data}" var="list">
											<option value="${list.factypeLclasCd}">${list.factypeLclasNm}</option>
											</c:forEach>
										</select>
									</td>
								</tr>
								<tr>
									<th class="right" style="width:100px;'">시설유형 명</th>
									<td>
										<input style="display:none" data-require="true" type="text" id="factypeCd" name="factypeCd" data-edit="false" maxlength="50" class="input_use18" />
										<input data-require="true" type="text" id="factypeNm" name="factypeNm" data-edit="false" maxlength="50" class="input_use13" />
									</td>
								</tr>
								<tr>
									<th>사용 여부</th>
									<td>
										<select class="input_use08" id="useYn" name="useYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>서비스 여부</th>
									<td>
										<select class="input_use08" id="srvYn" name="srvYn">
											<option value="">선택하세요</option>
											<option value="Y">활성</option>
											<option value="N">비활성</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>우선 순위</th>
									<td>
										<input data-require="true" type="number" id="orderNo" name="orderNo" data-edit="false" maxlength="50" class="input_use18" />
									</td>
								</tr>
								<tr>
									<th>해시태그</th>
									<td>
										<select class="input_use08" id="hashTag" name="hashTag">
											<option value="">사용안함</option>
											<option value="01">신규</option>
											<option value="02">추천</option>
											<option value="03">인기</option>
											<option value="04">이슈</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>우선 표출 통계 항목</th>
									<td>
										<select class="input_use08" id="statDfltDt" name="statDfltDt">
											<option value="">선택하세요</option>
											<c:forEach items="${paramInfo.dflt}" var="dflt">
												<option value="${dflt.dfltCd}">${dflt.dfltNm}</option>
											</c:forEach>
										</select>
									</td>
								</tr>
								<a style="top: 18px;position: relative;right: -38px;">※ 서비스를 정상적으로 제공하기 위해서는 목록 화면에서 중심시설 POI를 연결하셔야 합니다. </a>
							</tbody>
						</table>
					</form>
					<div class="btnbox">
						<a id="factypeSave" class="factypeSave" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<!-- 업종연결 start-->
		<div class="corpPopupWrapper" id="corpPopup" style="left: 0;">
			<div class="corpPopupWrapper">
				<div class="aplPopupWrapper04">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">생활권역 통계지도 업종 연결</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->
					<!-- 시설유형 분류 -->	
					<div style="float: left;width: 300px;position: relative;margin-right: 35px;left: 25px;">
						<div class="tilte03">시설유형</div>
						<div class="searchBtn04" id="popupSearch01">
							<a style="cursor: pointer" href="#" onclick="popUpFactypeSearch(1);"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<table class="apiTable02" summary="조회조건" style="width: 313px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="50%" />
							<col width="50%" />
						</colgroup>
						<tbody>
							<tr>
								<th>시설유형 분류</th>
								<td>
									<select class="input_use08" id="popupFactypeLclasCd" name="popupFactypeLclasCd">
										<option value="">전체</option>
										<c:forEach items="${paramInfo.data}" var="list">
											<option value="${list.factypeLclasCd}">${list.factypeLclasNm}</option>
										</c:forEach>
									</select>
	                            </td>
							</tr>
						</tbody>
						</table>
						<table id="popupFacilityList01" class=""  title="" style="width:313px;height:500px; "
		            		data-options="singleSelect:true,collapsible:false,checkOnSelect:true,selectOnCheck:true">
		    			</table>
					</div>
					<!-- 시설유형 분류 end-->
					
					<!-- 산업분류 -->
					<div style="float:left;position: relative;left: 27px;width:400px;">
					<div class="tilte03">산업분류
						<a>* 시설유형 분류를 선택하시면 매핑된 산업분류 정보를 보실수 있습니다.</a>
						<a onclick="addPopup(1);" style="cursor: pointer;position:relative;right:-131px;background: #4d75d0; color: #fff; padding: 8px;  width: 23px;" id="save">
						<label style="cursor: pointer;" for="save">추가</label>
						</a>
					</div>
						<table id="popupCorpList01" class="apiTable02"  title="" style="width:528px;height:600px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:true,selectOnCheck:true">
		    			</table>
					</div>
					
					<!-- 산업분류  end-->
					<div class="btnbox">
						<a id="corpSave" class="corpSave" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<!-- 추가 팝업 -->
		<div class="addPopupWrapper01" id="addCorpPopup01" style="left: 0;">
			<div class="addPopupWrapper01">
				<div class="aplPopupWrapper05">
					<div class="aplPopupTitle">
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->
					<!-- 산업분류 -->
					<div style="float: left;position: relative;left: 27px;">
					<div class="tilte03">산업분류</div>
						<div class="searchBtn04" id="popupSearch04">
							<a style="cursor: pointer" href="#" onclick="popUpCorpSearch(1);"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<table class="apiTable02" summary="조회조건" style="width: 528px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="50%" />
							<col width="50%" />
						</colgroup>
						<tbody>
							<tr>
								<th>산업분류</th>
								<td>
									<select class="input_use08" id="popupCorp01_01" name="popupCorp01_01">
										<option value="">* 분류1</option>
										<c:forEach items="${paramInfo.corpType01}" var="list">
											<option value="${list.ksic1Cd}">${list.ksic1Nm}</option>
										</c:forEach>
									</select>
									<select class="input_use08" id="popupCorp02_01" name="popupCorp02_01">
										<option value="">* 분류2</option>
									</select>
	                             </td>
							</tr>
							<tr>
								<th>3분류 명</th>
								<td>
									<input type="text" id="ksic_3_Nm" name="ksic_3_Nm" class="input_use32"/>
	                            </td>
							</tr>
						</tbody>
						</table>
						<table id="addPopupCorpList01" class=""  title="" style="width:528px;height:500px;"
		            		data-options="singleSelect:false,collapsible:true,checkOnSelect:true,selectOnCheck:true">
		    			</table>
					</div>
					
					<!-- 산업분류  end-->
					<div class="btnbox">
						<a onclick="addRows(1);" id="add01" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">추가</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		</div>
		<!-- 추가 팝업 -->
		<!-- 업종연결 end -->
		<!-- POI start-->
			<div class="poiPopupWrapper" id="poiPopup" style="left: 0;">
			<div class="poiPopupWrapper">
				<div class="aplPopupWrapper04">
					<div class="aplPopupTitle">
						<div class="myTitleFont" id="popTitle">생활권역 통계지도 POI 연결</div>
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->
					<!-- 시설유형 분류 -->	
					<div style="float: left;width: 300px;position: relative;margin-right: 35px;left: 25px;">
						<div class="tilte03">시설유형</div>
						<div class="searchBtn04" id="popupSearch03">
							<a style="cursor: pointer" href="#" onclick="popUpFactypeSearch(2);"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<table class="apiTable02" summary="조회조건" style="width: 313px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="50%" />
							<col width="50%" />
						</colgroup>
						<tbody>
							<tr>
								<th>시설유형 분류</th>
								<td>
									<select class="input_use08" id="popupUpperFactypeCd" name="popupFactypeCd">
										<option value="">전체</option>
										<c:forEach items="${paramInfo.data}" var="list">
											<option value="${list.factypeLclasCd}">${list.factypeLclasNm}</option>
										</c:forEach>
									</select>
	                            </td>
							</tr>
							<tr>
								<th>시설유형 명</th>
								<td>
									<input type="text" id="factypeWord" name="factypeWord" class="input_use18"/>
	                            </td>
							</tr>
						</tbody>
						</table>
						<div style="margin-top:13px;">
						<table id="popupFacilityList02" class=""  title="" style="width:313px;height:500px; "
		            		data-options="singleSelect:true,collapsible:false,checkOnSelect:true,selectOnCheck:true">
		    			</table>
		    			</div>
					</div>
					<!-- 시설유형 분류 end-->
					
					<!-- 산업분류 -->
					<div style="float:left;position: relative;left: 27px;width:400px;">
					<div class="tilte03">산업분류
						<a>* 시설유형 분류를 선택하시면 매핑된 산업분류 정보를 보실수 있습니다.</a>
						<a onclick="addPopup(2);" style="cursor: pointer;position:relative;right:-131px;background: #4d75d0; color: #fff; padding: 8px;  width: 23px;" id="save">
						<label style="cursor: pointer;" for="save">추가</label>
						</a>
					</div>
						<table id="popupCorpList02" class="apiTable02"  title="" style="width:528px;height:600px;"
		            		data-options="singleSelect:false,collapsible:false,checkOnSelect:true,selectOnCheck:true">
		    			</table>
					</div>
					<!-- 산업분류  end-->
					<div class="btnbox">
						<a id="poiSave" class="poiSave" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">저장</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		<!-- POI연결 end -->
		<!-- 추가 팝업 -->
		<div class="addPopupWrapper02" id="addCorpPopup02" style="left: 0;">
			<div class="addPopupWrapper02">
				<div class="aplPopupWrapper05">
					<div class="aplPopupTitle">
						<div class="myXbtn">
							<a style="cursor: pointer">
								<img src='<c:url value="/html/include/img/btn/btn_popupX.png"/>' alt="종료" />
							</a>
						</div>
					</div>
					<!-- 2017.07.19 [개발팀] khc 표출순위 추가  start -->
					<!-- 산업분류 -->
					<div style="float: left;position: relative;left: 27px;">
					<div class="tilte03">산업분류</div>
						<div class="searchBtn04" id="popupSearch04">
							<a style="cursor: pointer" href="#" onclick="popUpCorpSearch(2);"><img src='<c:url value="/html/include/img/btn/btn_search.png"/>' alt="검색" /></a>
						</div>
						<table class="apiTable02" summary="조회조건" style="width: 528px;">
						<caption>조회조건</caption>
						<colgroup>
							<col width="50%" />
							<col width="50%" />
						</colgroup>
						<tbody>
							<tr>
								<th>산업분류</th>
								<td>
									<select class="input_use33" id="popupCorp01_02" name="popupCorp01_02">
										<option value="">* 분류1</option>
										<c:forEach items="${paramInfo.corpType01}" var="list">
											<option value="${list.ksic1Cd}">${list.ksic1Nm}</option>
										</c:forEach>
									</select>
									<select class="input_use33" id="popupCorp02_02" name="popupCorp02_02">
										<option value="">* 분류2</option>
									</select>
									<select class="input_use33" id="popupCorp03_02" name="popupCorp03_02">
										<option value="">분류3</option>
									</select>
									<select class="input_use33" id="popupCorp04_02" name="popupCorp04_02">
										<option value="">분류4</option>
									</select>
	                             </td>
							</tr>
							<tr>
								<th>5분류 명</th>
								<td>
									<input type="text" id="ksic_5_Nm" name="ksic_5_Nm" class="input_use32"/>
	                            </td>
							</tr>
						</tbody>
						</table>
						<table id="addPopupCorpList02" class=""  title="" style="width:528px;height:500px;"
		            		data-options="singleSelect:false,collapsible:true,checkOnSelect:true,selectOnCheck:true">
		    			</table>
					</div>
					<div class="btnbox">
						<a onclick="addRows(2);" id="add02" class="save" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">		<label style="cursor: pointer;" for="save">추가</label></a> 
						<a id="cancel" class="cancel" style="cursor: pointer; background: #4d75d0; color: #fff; padding: 24px;  width: 51px; line-height: 25px;">	<label style="cursor: pointer;" for="cancel">취소</label></a> 
					</div>
				</div>
			</div>
		</div>
		</div>
		<!-- 추가 팝업 -->
	</div>
	</div>
</body>
</html>