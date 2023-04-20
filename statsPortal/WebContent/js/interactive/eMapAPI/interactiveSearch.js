/**   
 *
 * @JSName: interactiveSearch.js
 * @Description: 
 *
 * @author: LeeKH   
 * @date: 2018/08/08/ 11:20:00    
 * @version V1.0      
 *    
 */

var sopCurrentPageIndex1 = 0;		//현재 페이지
var sopCurrentPageIndex2 = 0;		//현재 페이지
var searchTxt = "";

/*	srvLogCode
  C0	11	01	00	위치검색	
  C0	11	02	00	지표검색  */

$(document).ready(function() {
	$("#schNmTxt").keyup(function(e){
		
		if(e.keyCode == 13){
			$("#rstSearchDataDiv").hide();
			$("#rstSearchDataDiv1Page").hide();
			$("#rstSearchDataDiv2").hide();
			$("#rstSearchDataDiv2Page").hide();
		}
		
		var selGb =$("#addSearchSel").val();
		if(selGb == 1){		//주소 건물 검색
			var enterTf = false;
			if(e.keyCode == 13){
				enterTf = true;
			}
			if($("#schNmTxt").val().length != 0){
				apiSample(enterTf, 1);
			}else{
				$("#rstSearchDataDiv").hide();
				$("#rstSearchDataDiv1Page").hide();
			}
		}else if(selGb == 2){	// 인구 가구 검색
			var enterTf = false;
			if(e.keyCode == 13){
				searchTxt = $("#schNmTxt").val();
				openApiSOP($("#schNmTxt").val(), 0);
			}
		}
	});
	
	$("#schNmImg").click(function(e){

		$("#rstSearchDataDiv").hide();
		$("#rstSearchDataDiv1Page").hide();
		$("#rstSearchDataDiv2").hide();
		$("#rstSearchDataDiv2Page").hide();
		
		var selGb =$("#addSearchSel").val();
		if(selGb == 1){		//주소 건물 검색
			var enterTf = true;
			if($("#schNmTxt").val().length != 0){
				apiSample(enterTf, 1);
			}else{
				$("#rstSearchDataDiv").hide();
				$("#rstSearchDataDiv1Page").hide();
			}
		}else if(selGb == 2){	// 인구 가구 검색
			var enterTf = true;
			searchTxt = $("#schNmTxt").val();
			openApiSOP($("#schNmTxt").val(), 0);
		}
	});
});

function apiSample(enterTf, page){
	if(enterTf){
		
		
		
		srvLogWrite("C0", "11", "01", "00", "", $("#schNmTxt").val());		//위치검색
		apiLogWrite2("A0","A32","위치검색","없음","00",$("#schNmTxt").val());
		
		
	    $("#rstSearchDataDiv").html("");
	    $("#rstSearchDataDiv").show();
	    $("#rstSearchDataDiv1Page").show();
	    $.ajax({
	        type: "GET",
	        url: "https://map.ngii.go.kr/openapi/search.xml",
	        data: {
	            target:"poi",
	            //apikey:"iRZU9B0q0cc-Sli4OUVssw",
	            //apikey:"681A8A4458D8640F67284FF671EC2359",
				apikey:"E83672BED4060203EEE31799616A1199",	//운영 반영시 해당 url로 테스트 한다
				//apikey:"924F124D2B4E0FD86234D75A9F4C271D",
	            onePageRows:"10",
	            currentPage:page,
	            keyword:$("#schNmTxt").val()
	        },
	        dataType : "jsonp",
	        crossDomain:true,
	        success: function(result) {
	            var xmlData = jQuery.parseXML(result.xmlStr);
	            var header = $(xmlData).find("header");
	            var responseCode = header.find("responseCode").text();
	            var responseMessage = header.find("responseMessage").text();
	            
	            var closeBtn = "<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>";
	//<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>
		            if(responseCode!="0"&&responseCode!="100"){
		                $("#rstSearchDataDiv").html(responseMessage);
		            }else{
		                var htmlStr = "";
		                var poiArry = $(xmlData).find("contents").find("poi");
		                var totCount = $(xmlData).find("totalCount").text();
		                if(poiArry.length==0){
		                    $("#rstSearchDataDiv").html("검색결과가 없습니다.<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>");
		    				var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><div style='height:5px;'></div>";
		    				$("#rstSearchDataDiv1Page").html(htmlPage);
		                }else{
		                //	$("#rstSearchDataDiv2Page").show();
		                //	$("#rstSearchDataDiv2").show();
		                	
		                //		moveTargetArea($(poiArry[0]).find("x").text() , $(poiArry[0]).find("y").text());
		                //		$("#rstSearchDataDiv").hide();
		                		htmlStr += "<p style='font-weight:bold'>검색결과 : " + totCount + "건</p>";
		                		htmlStr += closeBtn;
		                		
		                		//mng_s 20200313 이진호
		                		//htmlStr+="<table'>";
		                		htmlStr+="<table id='tb_result'>";
		                		//mng_e 20200313 이진호
		                		
		                		for(var i=0;i<poiArry.length;i++){
		                			var name = $(poiArry[i]).find("name").text();
		                			var roadAdres = $(poiArry[i]).find("roadAdres").text();
		                			
		                			if(name.length> 20){
		                				name = name.substring(0,18) + "...";
		                			}
		                			
		                			if(roadAdres.length> 23){
		                				roadAdres = roadAdres.substring(0,21) + "...";
		                			}
		                			
		                			htmlStr+="<tr style='height:21px'>";		//font-family:Nanum Gothic Bold;
		                			htmlStr+="<td style='width:48%; cursor:pointer; border-right:1px solid #d3d3d3;'><a style='margin-left:10px;' onclick='javascript:moveTargetArea(" + $(poiArry[i]).find("x").text() + "," + $(poiArry[i]).find("y").text()  + ")'>"+ name +"</a></td>";
		                			//htmlStr+="<td style='width:48%; cursor:pointer; border-right:1px solid #d3d3d3;'><a style='margin-left:10px;' onclick='javascript:moveTargetArea(" + $(poiArry[i]).find("x").text() + "," + $(poiArry[i]).find("y").text() + ","  + name  + ")'>"+ name +"</a></td>";
		                			htmlStr+="<td style='cursor:pointer;><a onclick='javascript:moveTargetArea(" + $(poiArry[i]).find("x").text() + "," + $(poiArry[i]).find("y").text()  + ")'>&nbsp; "+ roadAdres +"</a></td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("jibunAdres").text()+"</td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("zip").text()+"</td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("x").text()+"</td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("y").text()+"</td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("typeCode").text()+"</td>";
		                			//htmlStr+="<td>"+$(poiArry[i]).find("typeName").text()+"</td>";
		                			htmlStr+="</tr>";
		                		}
		                		htmlStr+="</table>";
/*		                		htmlStr+="<div style='height:5px;'></div>";
		                		htmlStr+="<div style='height:5px; background-color:#f8f8f8; border-top:1px solid #d3d3d3;'></div>";
		                		htmlStr+="<div style='background-color:#f8f8f8'>";
		                		htmlStr+="<img src='/img/popup/btn_close.png' onclick='rstSearchDataDivArea();' alt='닫기' style='cursor: pointer; margin-left:250px;'>";
		                		htmlStr+="</div>";
		                		htmlStr+="<div style='height:10px;  background-color:#f8f8f8'></div>";
*/		                		
		                		
		                		$("#rstSearchDataDiv").html(htmlStr);
		                		
		                		
		                		var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging1' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:40px;'><span class='pages'></span></div><div style='height:5px;'></div>";
		                		$("#rstSearchDataDiv1Page").html(htmlPage);
		                		if(parseInt(totCount) > 5){
		        					sopCurrentPageIndex1 = page-1;
		        					sopPaging1(parseInt(totCount), sopCurrentPageIndex1);
		        				}
		                		
		                		//mng_s 20200313 이진호
		                		//대화형 통계지도에서 위치 검색 시 사용자가 클릭한 td의 값을 검색창에 띄우기
		                		$("#tb_result tr").click(function(){
									var tr = $(this);
									var td = tr.children();
									var area = td.eq(0).text();
									
									$('#schNmTxt').val(area);
								});
		                		//mng_e20200313 이진호
		                		
	                }
	            }
	          },
	        error : function(xhr, ajaxSettings, thrownError){
				//	alert("fail");
	        	console.log("error");
	        }
	    });
	}
}


function moveTargetArea(x, y){

	
	srvLogWrite("C0", "11", "01", "00", "", $("#schNmTxt").val());		//위치검색
	apiLogWrite2("A0","A32","위치검색","없음","00",$("#schNmTxt").val());
	
	var center = [x,y];
	$interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].mapMove(center, 9);
	
	$interactiveMap.ui.searchMarkerClear();		//마커 클리어 구현해놨음
	
	

	$interactiveMap.ui.searchMarker = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].addMarker(x, y, {
		visible : false
	});
	
	
	
	
	$("#rstSearchDataDiv").hide();
	$("#rstSearchDataDiv1Page").hide();
}





function openApiSOP(searchword, pagenum) {
	
	srvLogWrite("C0", "11", "02", "00", "", $("#schNmTxt").val());		//위치검색
	apiLogWrite2("A0","A33","지표검색","없음","00",$("#schNmTxt").val());
	
	
	jQuery.ajax({
 		type:"GET",
 		url:  openApiPath+"/OpenAPI3/search/sop.json",
 		data:{
 			accessToken : accessToken,
 			searchword :searchword,
 			resultcount : 10,
 			pagenum : pagenum
 		},
 		success:function(data){
 			
 			var result = data.result;
 			$("#rstSearchDataDiv2").show();
 			$("#rstSearchDataDiv2Page").show();

 			if(result == null){
				$("#rstSearchDataDiv2").html("검색결과가 없습니다.<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>");
				var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><span><br /></span>";
				$("#rstSearchDataDiv2Page").html(htmlPage);
			}else{
				
				var html = "";
				html += "<div class='search_result_list'>";
				html += "<p  style='font-weight:bold'>검색결과 : " + result.totalcount + "개</p>";
				html += "<input type='button' onclick='closePopup2();' style='cursor: pointer; background:url(/img/common/popup_close_x.png) no-repeat left top; background-size:contain; width:10px; height:10px; text-indent:-1000px; overflow:hidden; border:none; position:absolute; right:10px; top:10px;'>";
				html += "<ul class'xWidth radioStepOneBox' style='font-size:12px; over-flow:hidden; margin:0 auto 0 15px;'>";
				
				if(result.resultdata.length == 0){
					$("#rstSearchDataDiv2").hide();
					$("#rstSearchDataDiv2Page").hide();
				}
				
				for(var i = 0; i < result.resultdata.length; i++) {
					var elem = result.resultdata[i];			//리버스지오코딩 : 법정동->행정동              			
					/*html += "<li>" + result.resultdata[i].url + "</li>";*/
					
					var resultDataUrl = elem.url;
					
					//leekh DB에서 가져온 데이터는 url 형태로 되어있어 바로 json 형태로 변경할 수 없다.
					//json형태로 데이터를 가공하기위해 split으로 여러번 잘라내서 실제 필요한 데이터의 명칭과 값을 구해낸다.
					var paramsSplit = resultDataUrl.split("?");
					
					var paramType = paramsSplit[0];
					var paramTypeSplit = paramType.split("/view/map/interactiveMap/");
					
					
					var resultType = paramTypeSplit[1]; 		//조회할 타입 
					//alert("type" + resultType);
					
					var realParams = paramsSplit[1];
					var paramSplit = realParams.split("=");
					var realParamAllSplit = paramSplit[1];
					var unitParam = realParamAllSplit.split("%26");
					html += "<li>";
					
					var title = elem.nm;
					var low_search = "1";
					
					
					var jsonStr = "";
					
					jsonStr += makeJsonStr("title", title);
					jsonStr += makeJsonStr("low_search", low_search);
					
					
					for(var j in unitParam){
						var resultParams = unitParam[j];
						if(unitParam.length > j){
							var finalResult = resultParams.split("%3D");
							//leekh 최종적으로 값을 구함.
							var dataName = finalResult[0];
							var dataVal = finalResult[1];
							
							if(dataVal == undefined){		//북마크일경우 오류 처리
								dataVal = dataName;
								dataName = "hist_id";
							}
							
							
							//alert(dataName + ":" + dataVal);
							
							jsonStr += makeJsonStr(dataName, dataVal);
							
						}
					}
					html += "</li>";
					var rowText = elem.nm + "-"+elem.data_base_year+"년";
					
					
					if(rowText.length> 42){
						rowText = rowText.substring(0,40) + "...";
        			}
        			
					
					html += "<li id='sopList_"+i+"'>";
					html += "<table>";
					html += "<tbody>";
					html += "<tr style='height:21px;'>";
					//font-size:13px; font-family:Nanum Gothic Bold;
				//	html += "<td style='vertical-align:top;width:10px; font-size:14px;'><div style='cursor: pointer;'></div></td>";
					//html += "<td style='width:10px;'></td>";
					html += "<td>";
					// margin-left:10px -> margin-left:0px 
					html += "<a id='sopList_result_"+i+"' style='margin-left:0px; font-size:14px;' href=\"javascript:setClickData('"+resultType+"'," + ['{' + jsonStr + '}'] + " )\">" + rowText +"</a>";
					html += "</td>";
					html += "</tr>";
					html += "</tbody>";
					html += "</table>";
					html += "</li>";
				}
				html += "</ul>";
				html += "</div>";	            		            
				$("#rstSearchDataDiv2").html(html);
				
				var htmlPage = "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><div id='sopPaging' class='pagenation searchPagenation' align='center' style='width: 100%; margin-top:6px;'><span class='pages'></span></div><div style='height:5px;'></div>";
				$("#rstSearchDataDiv2Page").html(htmlPage);
				if(result.totalcount > 5){
					sopPaging2(result.totalcount, sopCurrentPageIndex2);
				}            		
				
				
				
			}
			
			
 		},
 		error:function(data) {
 			console.log("error");
 			//alert("error" + data);
 		}
	});
	
}
function makeJsonStr(dataName, dataVal){
	var jsonStr = "";
	jsonStr += "\'"; 
	jsonStr += dataName; 
	jsonStr += "\':\'"; 
	jsonStr += dataVal; 
	jsonStr += "\',"; 
	return jsonStr;
}

function addJsonData(paramObj){
	var thisMap = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
	var center = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].center;
	var adm_cd = thisMap.curSidoCd;		//adm_cd
	var coordX = center[0];
	var coordY = center[1];
	
	
	paramObj.adm_cd = adm_cd
	paramObj.x = coordX
	paramObj.y = coordY
	
	
	return paramObj;
}



function setClickData(strType, paramObj){
	
	srvLogWrite("C0", "11", "02", "00", "", $("#schNmTxt").val());		//위치검색
	apiLogWrite2("A0","A33","지표검색","없음","00",$("#schNmTxt").val());
	
	$("#rstSearchDataDiv2Page").hide();
	$("#rstSearchDataDiv2").hide();
	addJsonData(paramObj);
	//북마크나 최신데이터는 조건설정창을 자동으로 열지않는다.
	if (strType != "bookmark"   		  && 
		strType != "recentdata" 		  && 
		strType != "userdata"   		  && 
		strType != "sharedata"  		  &&
		strType != "totalindex" 		  &&
		strType != "population" 		  &&
		strType != "company"    		  &&
		strType != "household"  		  &&
		strType != "house"      		  &&
		strType != "farmhousehold" 	  &&
		strType != "forestryhousehold" &&
		strType != "fisheryhousehold"  &&
		strType != "householdmember"   &&
		strType != "kosis") {
		if(strType){
			$(".sideQuick.sq02").trigger("click");
		}
//			$(".sideQuick.sq02").removeClass("on");
	}
	
	var param = null;
	//var length = paramObj.length;
	//if (length == 0) {
	//	param = "";
	//}else {
	//	param = JSON.parse([paramObj]);
	//	param = JSON.parse(["{\"age_from\":\"0\",\"area_type\":\"0\",\"age_to\":\"4\",\"title\":\"4세이하 (인구주택총조사)\",\"low_search\":\"1\",\"adm_cd\":\"25\",\"gender\":\"0\",\"year\":\"2016\",\"y\":\"1818313\",\"x\":\"989674\"}"]);
	//}
	if(strType){
		
		
		var nowZmLv = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].zoom;
		
		var nowMap = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
		
		var sidoCd = "";
		if(parseInt(nowZmLv) < 2){
			sidoCd = "00";
		}else if(parseInt(nowZmLv) < 4){
			sidoCd = nowMap.curSidoCd
		}else if(parseInt(nowZmLv) < 9){
			sidoCd = nowMap.curSidoCd + nowMap.curSiggCd;
		}else{
			sidoCd = nowMap.curSidoCd + nowMap.curSiggCd + nowMap.curDongCd;
		}
		
		paramObj.adm_cd = sidoCd;		
		
		$interactiveMap.ui.doClearMap(1, true, "N"); //지도 초기화		//20200511 수정 (ggm)
		if(strType == "bookmark"){
			
			
			jQuery.ajax({
	 	 		type:"GET",
	 	 		url: "/ServiceAPI/map/interactive/bookMarkSearch.json",
	 	 		data : {
		 			hist_id : paramObj.hist_id
		 		},
	 	 		success:function(data){
	 	 			
	 	 			var ppp = JSON.parse(data.result.paramObj);
	 	 			ppp = JSON.parse(ppp[0]);
	 	 			//var ppp2 = JSON.parse(ppp.param_info);
	 	 			
	 	 			//paramObj.param_info = data.result.paramObj;
	 	 			paramObj = ppp;
	 	 			
	 	 			var thisMap = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId];
					var center = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].center;
					var adm_cd = thisMap.curSidoCd + thisMap.curSiggCd + thisMap.curDongCd;		//adm_cd
					var coordX = center[0];
					var coordY = center[1];
					
								
					
					var center = $interactiveMap.ui.mapList[$interactiveMap.ui.curMapId].center;
					var coordX = center[0];
					var coordY = center[1];
					
					ppp.param_info = replaceAll2("989674,1818313", coordX + "," +coordY , ppp.param_info)
					ppp.param_info = replaceAll2("9999999",adm_cd , ppp.param_info)
	 	 			
	 	 			
	 	 			paramObj.param_info = ppp.param_info;
	 	 			
	 	 			$interactiveMap.ui.doAnalysisShareInfo("bookmark", paramObj);
					
	 	 		},
	 	 		error:function(data) {
					alert("error");
					
					
	 	 		}
	 		});
			
			
			
			
			
			
			
		}else{
			$interactiveMap.ui.doAnalysisShareInfo(strType, paramObj);
		}
		
		
	}
}



function sopPaging1(totalCount, currentIndex) {
	var pageSize = 10;				
	var totalPage = Math.ceil( totalCount / pageSize);			
	$('#sopPaging1 .pages').paging({
		current:currentIndex+1,
		length : 10,
		max:totalPage,
		itemClass : 'page',
		itemCurrent : 'current',
		format : '{0}',
		next : '&gt;',
		prev : '&lt;',
		first : '&lt;&lt;',
		last : '&gt;&gt;',
		onclick:function(e,page){
			sopCurrentPageIndex1 = page-1;
			apiSample($("#schNmTxt").val(),  page);
		}
	});
}



function sopPaging2(totalCount, currentIndex) {
	var pageSize = 10;				
	var totalPage = Math.ceil( totalCount / pageSize);			
	$('#sopPaging .pages').paging({
		current:currentIndex+1,
		length : 10,
		max:totalPage,
		itemClass : 'page',
		itemCurrent : 'current',
		format : '{0}',
		next : '&gt;',
		prev : '&lt;',
		first : '&lt;&lt;',
		last : '&gt;&gt;',
		onclick:function(e,page){
			sopCurrentPageIndex2 = page-1;
			openApiSOP($("#schNmTxt").val(),  page-1);
		}
	});
}

function rstSearchDataDivArea(){
	
	$("#rstSearchDataDiv").hide();
	$("#rstSearchDataDiv1Page").hide();
}

function closePopup2(){
	$("#rstSearchDataDiv").hide();
	$("#rstSearchDataDiv1Page").hide();
	$("#rstSearchDataDiv2").hide();
	$("#rstSearchDataDiv2Page").hide();
}