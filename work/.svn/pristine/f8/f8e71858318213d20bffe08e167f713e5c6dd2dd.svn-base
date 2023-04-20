/**
 * 나의 데이터 상세보기 + 수정 2018.10.02 최재영
 */



(function(W,D){
	W.$myDataDetail = W.$myDataDetail || {};
	$(document).ready(function(){
		$myDataDetail.event.init();
	});
	
	$myDataDetail.model = {
			/*
			 * model command 입력후 그에 맞는 데이터 값 리턴
			 * 
			 */
			getModel : function(cmd,param){
				// ADD_COLUMN //컬럼 추가
				// DEL_COLUMN //컬럼 삭제
				// MODIFY_COLUMN_DATA //컬럼별 데이터 수정
				// MODIFY_RECORD_DATA //레코드별 데이터 수정
				// ADD_RECORD //레코드 추가
				// TABLE_COMBINE //테이블 합치기
				/*console.log("cmd = " + cmd);
				console.log(param);*/
				var data = null;
				if(cmd == "ADD_COLUMN"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							column_name : param.column_id,
							data_type: param.dataType, 
							kor_column_desc : param.kor_column_desc,
							kor_column_name : param.column_nm,
							column_length : '',
							new_column_comment : '',
							profile_cmd : "ADD_COLUMN",
							output_resource_id : $myDataDetail.data.resource_id,
						};
				}else if(cmd == "DEL_COLUMN"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							output_resource_id : $myDataDetail.data.resource_id,
							kor_column_desc : JSON.stringify($myDataDetail.data.kor_column_desc),
							profile_cmd : "DEL_COLUMN",
							drop_column_name : param.drop_column_name,
						};
					
					
				}else if(cmd == "MODIFY_COLUMN_DATA"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							modeStr : param.column_val,
							where : param.where,
							del_yn : "",
							profile_cmd : "MODIFY_COLUMN_DATA",
							modify_column_name : param.column_name,
							modify_column_type : param.modify_column_type
					};
					 
				}else if(cmd == "MODIFY_RECORD_DATA"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							json_str : jsonStr,
							rid : param.rid,
							output_resource_id : $myDataDetail.data.resource_id,
							profile_cmd : "MODIFY_RECORD_DATA"
						};
				}else if(cmd == "ADD_RECORD"){
					data = {
							table_name : $myDataDetail.data.data_nm,
		    				schema : $myDataDetail.data.schema,
		    				json_str : param.jsonStr,
		    				output_resource_id : $myDataDetail.data.resource_id,
							profile_cmd : "ADD_RECORD",
						};
				}else if(cmd == "TABLE_COMBINE"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							combine_table_name : param.combine_table_name,
							combine_schema : param.combine_schema,
							json_str : JSON.stringify( param.json ),
							drop_table : param.drop_table,
							output_resource_id : $myDataDetail.data.resource_id,
							profile_cmd : "TABLE_COMBINE",
						};
				}else if(cmd == "DEL_RECORD"){
					data = {
							table_name : $myDataDetail.data.data_nm,
							schema : $myDataDetail.data.schema,
							rid : param.rid,
							standardColumn : $myDataDetail.data.rowColumnIndex,
							output_resource_id : $myDataDetail.data.resource_id,
							profile_cmd : "DEL_RECORD",
						};
				}
				
				return data;
			},
	
	}
	
	$myDataDetail.ui = {
			gridTable : function(columnInfo,rowList, gridZone){

				var html ="";
				if(gridZone == "#gridTable"){
					html +="<table class='listTable02' id='table'>";
				}else{
					html +="<table class='dialogTable' id='dialogTable'>";
				}
				
				var headHtml = "<thead><tr>"
				var bodyHtml = "<tbody>";
				
				headHtml += "<th data-type='' style='width: 56px; min-width:56px; display:none;' class='myDataChkTr'><input type='checkbox' onclick='javascript:$myDataDetail.ui.checkAllList(this);' data-type='' class='chkEtc' name='allRowCheckBox'></th>"; // 체크박스
				headHtml += "<th data-type='rowId'><span></span>rid</th>";
				var columnArray = new Array();
				for (var i = 0; i < columnInfo.length; i++) {
					var obj = columnInfo[i];
					headHtml += "<th><span id="+obj.column_id+" name='selectZone' data-type=" + obj.column_id + "></span>"
							+ obj.column_name + "</th>";
					columnArray.push(obj.column_id);
				}
				headHtml += "</tr></thead>";
				html += headHtml;
				
				for (var i = 0; i < rowList.length; i++) {
					bodyHtml += "<tr>";
					
					//체크박스 
					bodyHtml += "<td class='myDataChkTr' style='width: 56px; display:none;'>";
					bodyHtml += "<span data-type=''><input type='checkbox' data-type='' class='chkEtc' name='rowCheckBox'></span>"
					bodyHtml += "</td>";
					
					var row = rowList[i];
					
					if (row.rid != undefined) {
						bodyHtml += "<td>";
						bodyHtml += "<span data-type='"+row.rid+"'></span>"
						bodyHtml += row.rid;
						bodyHtml += "</td>";
						if(i==0){
							$myDataDetail.data.rowColumnIndex = "rid";
						}
					} else if (row.gid != undefined && row.rid == undefined) {
						bodyHtml += "<td>";
						bodyHtml += "<span data-type='"+row.gid+"'></span>"
						bodyHtml += row.gid;
						bodyHtml += "</td>";
						if(i==0){
							$myDataDetail.data.rowColumnIndex = "gid";
						}
					}
					
					for (var j = 0; j < columnArray.length; j++) {
						var inData = false;
						for ( var k in row) {
							if (k == columnArray[j].toLowerCase()) {
								bodyHtml += "<td>";
								bodyHtml += row[k];
								bodyHtml += "</td>";
								inData = true;
							}
						}
						if(!inData){
							bodyHtml +="<td></td>";
						}
					}
					
					bodyHtml += "</tr>";
				}
				bodyHtml += "</tbody>";
				html += bodyHtml;
				html += "</table>";
				$(gridZone).html(html);
				
				
				
				
				
				
				if(gridZone == "#gridTable"){
					
					$myDataDetail.ui.paging();
					
					if($myDataDetail.data.state == "read"){
						
					}else if($myDataDetail.data.state == "edit"){
						if($("#editTabBox > ul > li > a").eq(1).hasClass("on")){
							$myDataDetail.ui.columnEditStart();
						}else{
							$myDataDetail.ui.rowEditStart();
						}
					}
				}
				


				
				
				var thCnt = $("#gridTable > .listTable02 > thead > tr > th").length;
				
				/*for(var i = 0 ; i < thCnt; i++){
					var width = $(".listTable02 > thead > tr > th").eq(0).width();
				}*/
				if(thCnt< 10){
					$(".listTable02").css("display","inline-table");
				}else{
					$(".listTable02").css("display","inline-block");
				}
				/*$("#gridTable").mCustomScrollbar("destroy");
				$("#gridTable").mCustomScrollbar({axis:"xy"});*/
			},
	
			paging : function(){
				var html = "";
				var page = $myDataDetail.data.currentPage;
				var showPageCount = 10;
				var showList = $("#viewCnt").val();
				var total = $myDataDetail.data.total;
				
				var totalPageCount = Math.ceil(total / showList);
				
				var pageSize = Math.ceil(totalPageCount / showPageCount);
				var pageList = Math.ceil(page / showPageCount);
				
				if (pageList < 1) {
					pageList = 1;
				} else if (pageList > pageSize) {
					pageList = pageSize;
				}
				
				// 시작 페이지
				var startPage = ((pageList - 1) * showPageCount) + 1;
				if (startPage == 0) {
					startPage = 1;
				}
				// 엔드페이지
				var endPage = startPage + showPageCount - 1;
				
				if (endPage > totalPageCount) {
					endPage = totalPageCount;
				}
				
				html = "<span class='pageArea'>";
				
				if (startPage == 1) {
					//html += "<li><a data-type='firstPage'  href='javascript:void(0)>"
					//html += "《</a></li>";
					//html += "<li><a data-type='prevPage' href='javascript:void(0)'>"
					//html += "&lt;</a></li>";
				} else {
					/*html += "<li><a data-type='firstPage' data-id=" + 1 + " href='javascript:$myDataDetail.ui.pageResourceInfo("+  1 + ")'>"
					html += "《</a></li>";
					html += "<li><a  data-type='prevPage' data-id="+ Number(Number(startPage) - 1) + "href='javascript:$myDataDetail.ui.goPage("+  Number(Number(startPage) - 1) + ")'>"
					html += "&lt;</a></li>";*/
					
					html += "<a data-type='firstPage' data-id='" + 1 + "' href='javascript:$myDataDetail.ui.goPage("+  1 + ")'>"
					html += "<<</a>";
					html += "<a  data-type='prevPage' data-id='"+ Number(Number(startPage) - 1) + "' href='javascript:$myDataDetail.ui.goPage("+  Number(Number(startPage) - 1) + ")'>"
					html += "&lt;</a>";
				}
				
				for (var i = startPage; i <= endPage; i++) {
					var active = "";
					if (i == page) {
						/*html += "<li class='ml20 on'><a  href='javascript:$myDataDetail.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a></li>";*/
						html += "<a class='number current' href='javascript:$myDataDetail.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}else{
						/*html += "<li><a href='javascript:$myDataDetail.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a></li>";*/
						html += "<a class='number' href='javascript:$myDataDetail.ui.goPage("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}
				}
				
				
				if (endPage == totalPageCount) {
					// html += "<a class='number' data-type='nextPage'>"
					// html += "&gt;</a>";
					// html += "<a class='number' data-type='lastPage'>"
					// html += "》</a>";
				} else {
					/*html += "<li><a data-type='nextPage' data-id="+ Number(Number(endPage) + 1) + "href='javascript:$myDataDetail.ui.goPage("+  Number(Number(endPage) + 1) + ")'>"
					html += "&gt;</a></li>";
					html += "<li><a  data-type='lastPage' data-id="+ totalPageCount + "href='javascript:$myDataDetail.ui.goPage("+  totalPageCount + ")'>"
					html += "》</a></li>";*/
					
					html += "<a data-type='nextPage' data-id='"+ Number(Number(endPage) + 1) + "' href='javascript:$myDataDetail.ui.goPage("+  Number(Number(endPage) + 1) + ")'>"
					html += "&gt;</a>";
					html += "<a  data-type='lastPage' data-id='"+ totalPageCount + "' href='javascript:$myDataDetail.ui.goPage("+  totalPageCount + ")'>"
					html += ">></a>";
				}
				
				html += "</span>";

				$("#gridPaging").html(html);
					
			},
			
			goPage : function(pageIdx){
				$myDataDetail.data.currentPage = pageIdx;
				var showListCount = $("#viewCnt").val();
				var startIdx = showListCount * (pageIdx -1);
				$myDataDetail.request.selectResourceInfo(startIdx,showListCount);
				
			},
			
			addRowGrid : function(){
				var html = "<table class='listTable02 t01' id='addRowHeader'>";
				var headHtml = "<thead>";
				headHtml += "<tr><th><a href='javascript:$myDataDetail.ui.addRow()'><img src='"+contextPath+"/img/common/ico_plus03.png' /></a></th>";
				var columnInfos = $myDataDetail.data.kor_column_desc;

				for(var i = 0 ; i < columnInfos.length; i++ ){
					headHtml +="<th data-type='"+columnInfos[i].column_id+"'>"+columnInfos[i].column_name+"</th>";
				}
				
				headHtml +="</tr>";
				headHtml +="</thead>";
				html += headHtml;
				html +="<tbody id='addRowBody'></tbody>";
				html += "</table>";
				html +="<div class='btnBox'><a href='javascript:void(0);$myDataDetail.ui.insertRow();'>행 추가</a></div>"
				$("#insertDiv").html(html);
				
				$myDataDetail.ui.addRow();
			},
			addRow : function(){
				var html = "<tr>";
				html +='<td><a href="javascript:void(0);" onclick="$myDataDetail.ui.removeAddRow(this)"><img src="'+contextPath+'/img/common/btn_minus.png" /></a></td>'
				var columnInfos = $myDataDetail.data.kor_column_desc;
				for(var i = 0 ; i < columnInfos.length; i++ ){
					/*html +="<td><input class='inp' type='text' name='input_"+columnInfos[i].column_id+"'></td>";*/
					if(columnInfos[i].dataType.toLowerCase() == "integer" || columnInfos[i].dataType.toLowerCase() =="bigint"){
						html +="<td><input class='inp' type='number' pattern='[0-9]*' inputmode='numeric' name='input_"+columnInfos[i].column_id+"'></td>";
					}else{
						html +="<td><input class='inp' type='text' name='input_"+columnInfos[i].column_id+"'></td>";
					}
					
					
				}
				html +="</tr>";
				$("#addRowBody").append(html);
			},
			removeAddRow : function(obj){
				$(obj).parent().parent().remove();
			},
			
			editStart : function(){
				$myDataDetail.data.state = "edit";
				$("#editBar").show();
				$("#editTabBox").show();
				$("#editDataNm").val($myDataDetail.data.data_nm);
				if($myDataDetail.data.resourceInfo.kor_data_nm != undefined && $myDataDetail.data.resourceInfo.kor_data_nm != '' && $myDataDetail.data.resourceInfo.kor_data_nm != null){
					$("#editDesc").val($myDataDetail.data.resourceInfo.kor_data_nm);
				}else{
					$("#editDesc").val($myDataDetail.data.resourceInfo.description);
				}
				
				
				// 사용자 데이터 수정
				$("#columnEdit").text("저장");
				$("#columnEdit").data("type","edit");
			},
			
			
			rowEditStart : function(){
				$("#columnEditButton").hide();
				$("#columnDeleteButton").hide();
				$("#columnAddButton").hide();
				$("#columnRowDeleteButton").show();
				
				if($myDataDetail.data.resourceInfo.action_type == "SHP" || $myDataDetail.data.resourceInfo.action_type == "GEOM"){
					
				}else{
					$("#insertDiv").show();
					
					$myDataDetail.ui.addRowGrid();
					
					var trs = $("#table > tbody > tr");
					for(var i = 0 ; i < trs.length; i ++){
						var span = $(trs[i]).find("td").eq(0).find("span");
						var data_span = $(trs[i]).find("td").eq(1).find("span");
						var data = $(data_span).data("type");
						var html = "<input type='checkbox' data-type='"+data+"' class='chkEtc' name='rowCheckBox'>";
						$(span).html(html);
					}
				}
				
				
				
				//셀렉트박스 스타일
				$('.chkEtc').styler({
				});
				
				$(".myDataChkTr").show(); // 체크 컬럼 추가
				
				$(".ckRadio").remove();
			},
			
			columnEditStart : function(){
				$("#columnEditButton").show();
				$("#columnDeleteButton").show();
				$("#columnAddButton").show();
				$("#columnRowDeleteButton").hide();
				$("#insertDiv").hide();
				
				var spans = $("span[name='selectZone']");
				
				for(var i = 0 ; i < spans.length; i++){
					var span = $(spans[i]);
					var column_id = span.data("type");
					var html ="<input type='radio' name='columnRadio' data-type=" + column_id + " class='ckRadio'>" 
					span.html(html);
				}
				
				//라디오버튼 스타일
				$('.ckRadio').styler({
				});
				
				$(".myDataChkTr").hide(); // 데이터 체크 숨김
				//$(".chkEtc").remove();
			},
			
			
			insertRow : function(){
				
				var message = "행을 추가 하시겠습니까?";
				$message.open(
        				"추가 여부",
        				message,
		    			 btns = [
			    			 {
			    			   title : "저장",
				    			   func : function(opt) {
				    				 //추가 로우
				    				$myDataDetail.ui.modifyBefore();
				    				var trs = $("#addRowBody").find("tr");
				    				var rows = new Array();
				    				for(var i = 0; i < trs.length; i++){
				    					var addRows = new Array();
				    					var inps = $(trs[i]).find("td").find(".inp");
				    					for(var j = 0; j < inps.length; j++){
				    						var column_id = $(inps[j]).attr("name").split("_")[1];
				    						if($(inps[j]).val() != "" && $(inps[j]).val() != null){
				    							var obj = {};
				    							obj.column_id = column_id;
				    							obj.column_value = $(inps[j]).val();
				    							addRows.push(obj);
				    						}
				    						
				    					}
				    					rows.push(addRows);
				    					
				    				}
				    				
				    				var data = {jsonStr : JSON.stringify(rows)}
				 					   
			    					var param = $myDataDetail.model.getModel("ADD_RECORD",data);
			    					
			    					$myDataDetail.request.modify(param,$myDataDetail.ui.modifyAfter);
			    					
				    				opt.close();
				    			   }
				    		 }, 
		    			     {
							   title : "취소",
							   func : function(opt) {
								   opt.close();
							   }
		    			     } 
		    			 ]
		    	);
				
				
			},
			
			rowDelete : function(){
				/*$myDataDetail.data.modifyStatus = true;*/
				
				var items = $("input[name='rowCheckBox']:checked");
				
				if(items.length == 0){
					$message.open("알림", "삭제할 행을 지정 하여 주십시오");
				}
				else{
					
					$myDataDetail.data.deleteRow = new Array();
					var trs = $("#table > tbody > tr");
					for(var i = 0 ; i < items.length;i++){
						var item = items[i];
						// rid 담기
						$myDataDetail.data.deleteRow.push($(item).data("type"));
					}
					
					var message = "삭제될 rid 는 " + $myDataDetail.data.deleteRow.toString() + "다음과 같습니다.<br> 삭제 하시겟습니까?";
					$message.open(
	        				"삭제 여부",
	        				message,
			    			 btns = [
				    			 {
				    			   title : "저장",
					    			   func : function(opt) {
					    				   
					    				   for(var i = 0 ; i < $myDataDetail.data.deleteRow.length; i ++){
					    					   	for(var j = 0 ; j < trs.length; j++){
					    					   		if($myDataDetail.data.deleteRow[i] == $(trs[j]).find("span").data("type")){
					    					   			$(trs[j]).remove();
					    					   		}
					    					   	}
					   						}
					    				   
					    				   $myDataDetail.ui.modifyBefore();
					    				   var deleteRows = $myDataDetail.data.deleteRow;
					    				   for(var i = 0 ; i < deleteRows.length; i++){
					    					   var rid = deleteRows[i];
					    					   //var data = {rid : rid};
					    					   //긴급 반영 삭제할 row 아이디 반영
					    					   var standardColumn = $myDataDetail.data.rowColumnIndex
					    					   var data = {rid : rid, standardColumn : standardColumn}
					    					   var param = $myDataDetail.model.getModel("DEL_RECORD",data);
					    					   
					    					   if(i == deleteRows.length -1){
					    						   $myDataDetail.request.modify(param,$myDataDetail.ui.modifyAfter);
					    					   }else{
					    						   $myDataDetail.request.modify(param,null);
					    					   }
					    					   					    				  
					    				   }
					    				  opt.close();
					    			   }
					    		 }, 
			    			     {
								   title : "취소",
								   func : function(opt) {
									   opt.close();
								   }
			    			     } 
			    			 ]
			    	);
				}
			},
			
			columnDelete : function(){
				var item = $("input[name='columnRadio']:checked").data("type");
				
				if(item == undefined){
					$message.open('알림', "삭제할 컬럼을 선택 해주세요");
				}else{
					// column
					
					
					$message.open(
	        				"컬럼 삭제",
	        				"다음 컬럼을 삭제 하시겠습니까?",
			    			 btns = [
				    			 {
				    			   title : "삭제",
					    			   func : function(opt) {
					    				   
					    				var columnInfo = $myDataDetail.data.kor_column_desc;
					   					$myDataDetail.data.deleteColumn = new Array();
					   					
					   					//긴급 반영
					   					//삭제시 컬럼 지오코딩 한 컬럼 여부 확인
					   					//지오코딩시
					   					var geoColumns = new Array();
					   					
					   					if($myDataDetail.data.resourceInfo.pos_column_desc != null){
					   						var pos_column_desc = JSON.parse($myDataDetail.data.resourceInfo.pos_column_desc);
					   						var posList = pos_column_desc.pos_col_infos;
					   						var posColumn = {};
					   						console.log(posList);
					   						if(posList.length > 0){
					   							console.log(posList[0]);
					   							posColumn = posList[0].pos_columns;
					   							geoColumns = posColumn.split(",");
					   						}else{
					   							geoColumns = null;
					   						}
					   					}
					   				
					   					
					   					//삭제 하고자 하는 아이디와 비교
					   					var processContinue = true;
					   					for(var i = 0 ; i < geoColumns.length; i++){
					   						console.log(geoColumns[i]);
					   						if(geoColumns[i].toLowerCase() == item.toLowerCase()){
					   							console.log("지오 코딩 컬럼은 삭제 불가 " + item);
					   							console.log(geoColumns);
					   							processContinue = false;
					   						}
					   					}
					   					
					   					if(processContinue == true){
					   						for(var i = 0 ; i < columnInfo.length ; i++){
						   						if(columnInfo[i].column_id == item){
						   							var deleteColumn = columnInfo.splice(i,1);
						   							$myDataDetail.data.deleteColumn.push(deleteColumn[0].column_id);
						   							$myDataDetail.data.kor_column_desc = columnInfo;
						   						}
						   					}
						    				// table
						   					var ths = $("#table > thead > tr > th");
						   					var removeIdx = null;
						   					for(var i = 0; i < ths.length; i++){
						   						var column_id = $(ths[i]).find("span").data("type");
						   						if(item == column_id){
						   							removeIdx = i;
						   							$(ths[i]).remove();
						   						}
						   					}
						   					
						   					var trs = $("#table > tbody > tr");
						   					
						   					for(var i = 0 ; i < trs.length; i++){
						   						$(trs[i]).find("td:eq("+removeIdx+")").remove();
						   					}
						   					$myDataDetail.ui.modifyBefore();
						   					var deleteColumn = $myDataDetail.data.deleteColumn;
						   					for(var i = 0 ; i < deleteColumn.length ; i++){
						   						var data = {drop_column_name  : deleteColumn[i]}
						   						var param = $myDataDetail.model.getModel("DEL_COLUMN",data); 
						   						
						   						if(i == deleteColumn.length -1){
						   							$myDataDetail.request.modify(param,$myDataDetail.ui.modifyAfter);
						   						}else{
						   							$myDataDetail.request.modify(param,null);
						   						}
						   						
						   					}
						   					opt.close();
					   					}else{
					   						opt.close();
					   						$message.open("알림","지오코딩 설정된 컬럼은 삭제 하실수 없습니다.");
					   					}
					   					
					    			   }
					    		 }, 
			    			     {
								   title : "취소",
								   func : function(opt) {
									   opt.close();
								   }
			    			     } 
			    			 ]
			    	);
					
				}
			},
			
			columnDataEdit : function(){
				var columInfo = $myDataDetail.data.kor_column_desc;
				var item = $("input[name='columnRadio']:checked").data("type");
				if(item == null){
					$message.open('알림', "수정할 컬럼을 선택 해주세요");
				}else{
					var columnInfo = $myDataDetail.data.kor_column_desc;
					var editColumn = null;
					for(var i = 0 ; i < columnInfo.length ; i++){
						if(columnInfo[i].column_id == item){
							editColumn = columnInfo[i];
						}
					}
					
					if(editColumn != null){
						var html = "";
						var popupColumnEdit = $("#popColumEdit01").dialog({
							title : "컬럼 수정",
							width : "1200px",
							height : "800px",
						});
						
						$(".dialog").find(".dataSearchResult").html("");
						
						var popup = $(".dialog");
						var radioButton = $(popup).find("input[name='compareRd']");
						
						$(radioButton).off().on("click",function(){
							$(".tabSearch").hide();
							var selectVal = $(this).val();
							$("#"+selectVal+"Search").show();
							
						});
						$(popup).find("#columnModifySearch").off().on("click",function(){
							$myDataDetail.ui.columnModifySearch(popup);
						});
						$(popup).find("#columnModifySearchClose").off().on("click",function(){
							/*$(popup).dialog('close');*/
							popupColumnEdit.close();
						});
						
						$("#compareRd01").trigger("click");
						
						//kor_column_desc 
						var columnInfos = $myDataDetail.data.kor_column_desc;
						
						var selectOptionHtml = "";
						for(var i = 0; i < columnInfos.length;i++){
							var column_id = columnInfos[i].column_id;
							var column_name = columnInfos[i].column_name;
							var dataType = columnInfos[i].dataType
							selectOptionHtml += "<option value='"+column_id+"' data-type='"+dataType+"'>"
							selectOptionHtml += column_name;
							selectOptionHtml += "</option>";
						}
						
						$("select[name='columnSelect']").html(selectOptionHtml);
							
						if(item != null){
							$("#originColumn").val(item);
						}
						
						
						$(".addButton").off().on("click",function(){
							console.log("검색 수식 추가");
							var compare = $("input[name='compareRd']:checked").val();
							
							var param = {
									RANGE : null,
									RELATIONAL_OPERATOR : null,
									CONDITIONAL_OPERATOR : null,
									COLUMN : null,
									DATA_TYPE : null,
									CONDITION : null,
									MIN : null,
									MAX : null,
							};
							/*var vrify_frmla_content = '';*/
							var data = {};
							var html = '<li>';
							html +='<a href="javascript:void(0);" onclick="$myDataDetail.ui.removeStandard(this)"><img src="'+contextPath+'/img/common/btn_minus.png" /></a>';
							html+='<span>';
							
							if(compare == "compare"){
								param.RANGE = "VALUE";
								param.RELATIONAL_OPERATOR = $(".dialog").find('select[name="RELATIONAL_OPERATOR"]').val();
								param.CONDITIONAL_OPERATOR = $(".dialog").find('#compareCaralcSelect').val();
								param.COLUMN = $(".dialog").find("#compareColumnSelect").val();
								param.DATA_TYPE = $(".dialog").find("#compareColumnSelect").find('option:selected').data("type");
								param.CONDITION = $(".dialog").find("input[name='compareText']").val();
								
								html +="비교 | ";
								html +=$(".dialog").find("#originColumn").find('option:selected').text()+"|";
								html += $(".dialog").find("#compareColumnSelect").find('option:selected').text()+"|";
								html += param.CONDITION+"|";
								html += param.RELATIONAL_OPERATOR+"|";
								html += $(".dialog").find("#compareCaralcSelect").find('option:selected').text();
								html+='<textArea style="display:none;" name="queryJsonVal">'+JSON.stringify(param)+"</textArea>";
							
							}else{
								param.RANGE = "LIMIT";
								param.RELATIONAL_OPERATOR = "EQUAL_TO";
								param.CONDITIONAL_OPERATOR = $(".dialog").find('#rangeCaralcSelect').val();
								param.COLUMN = $(".dialog").find("#rangeColumnSelect").val();
								param.DATA_TYPE = param.DATA_TYPE = $(".dialog").find("#rangeColumnSelect").find('option:selected').data("type");
								param.CONDITION = "7";
								param.MIN = $(".dialog").find("input[name='minValue']").val()
								param.MAX = $(".dialog").find("input[name='maxValue']").val()
								
								html+="범위 |";
								html+= $(".dialog").find("#originColumn").find('option:selected').text()+"|";
								html+= $(".dialog").find("#rangeColumnSelect").find('option:selected').text() +"|";
								html += param.CONDITION+"|";
								html+= param.MIN + "~" + param.MAX;
								html+= $(".dialog").find("#rangeCaralcSelect").find('option:selected').text();
								html+='<textArea style="display:none;" name="queryJsonVal">'+JSON.stringify(param)+"</textArea>";
							}
							html+='</span>';
							html +='</li>';
							if(param.RANGE == "LIMIT" && param.DATA_TYPE != "integer"){
								$message.open("알림","범위 검색은 숫자 타입의 컬럼만이 가능 합니다.");
								return;
							}
							
							$(".dialog").find("#dataSearchResult").append(html);
							$(".dialog").find(".dataSearchResult").mCustomScrollbar("destroy");
							$(".dialog").find(".dataSearchResult").mCustomScrollbar({axis:"y"});
							
						});
						
						//컬럼 별 데이터 수정
						$(popup).find("#replaceAllData").off().on("click",function(){
							var changeValue = $(popup).find("input[name='replaceValue']").val();
							var targetColumn = $(popup).find("#originColumn").val();
							var targetDataType = $(popup).find("#originColumn").find('option:selected').data("type");
							
							if(changeValue == ""){
								$message.open("알림","변경할 값을 입력 해주세요.");
							}else{
								//
								var param = {
										column_val : changeValue,
										where : $(popup).find("#where").val(),
										column_name : targetColumn,
										modify_column_type : targetDataType
								}
								var model = $myDataDetail.model.getModel("MODIFY_COLUMN_DATA",param);
								//$(popup).dialog('close');
								popupColumnEdit.close();
								$myDataDetail.ui.modifyBefore();
								$myDataDetail.request.modify(model,$myDataDetail.ui.modifyAfter);
							}
						});
						/*$(popup).find(".dataSearchResult").mCustomScrollbar({axis:"y"});
						$(popup).find(".conditionList").mCustomScrollbar({axis:"xy"});*/
					}
				}
			
			},
			
			//컬럼 수정에서 조건문 입력 후 검색
			columnModifySearch : function(popup){
				console.log("검색");
				var jsonInputs = $(popup).find("textArea[name='queryJsonVal']");
				
				var conditionKeyVal = {
						EQUAL_TO : '=',
						NOT_EQUAL_TO : '!=',
						LESS_THAN : '>',
						GREATER_THAN : '<',
						LESS_THAN_OR_EQUAL_TO : '>=',
						GREATER_THAN_OR_EQUAL_TO : '<=',
						LIKE : 'LIKE'
					}
				
				var queryStr = "";
				var model = {};
				var json_str = new Array();
				for(var i = 0; i < jsonInputs.length; i++){
					
					var data = JSON.parse($(jsonInputs[i]).val());
					queryStr +=" where ";
					queryStr += data.COLUMN + " ";
					
					if(data.RANGE =="VALUE"){
						queryStr += conditionKeyVal[data.RELATIONAL_OPERATOR] + " " + data.CONDITION;
					}else if(data.compare =="LIMIT"){
						queryStr = " BETWEEN ";
						queryStr = data.MIN + " AND " + data.MAX + " ";
					}
					
					if(i < jsonInputs.length-1){
						/*queryStr +=" " +conditionKeyVal[data.CONDITIONAL_OPERATOR];*/
					}
					console.log(queryStr);
					json_str.push(data);
				}
				model.json_str = JSON.stringify(json_str);
				model.schema = $myDataDetail.data.resourceInfo.user_id;
				model.data_nm = $myDataDetail.data.resourceInfo.data_nm;
				$myDataDetail.request.conditionSearch(model,null); 
				
				
			},
			
			columnAdd : function(){
				var html = '<div class="">';
					html +=	'<table class="">';
					html +=		'<colgroup>';
					html +=			'<col width="70">';
					html +=			'<col width="250">';
					html +=		'</colgroup>';
					html +=		'<tbody>';
					html +=			'<tr>';
					html +=				'<td>컬럼명</td>';
					html +=				'<td>';
					html +=					'<input type="text" class="inp" id="addCoulmnName">';
					html +=				'</td> ';
					html +=			'</tr>';
					html +=			'<tr>';
					html +=				'<td>컬럼 ID</td>';
					html +=				'<td>';
					html +=					'<input type="text" class="inp" id="addColumnId" name="addColumnId">';
					html +=				'</td> ';
					html +=			'</tr>';
					
					html +=			'<tr>';
					html +=				'<td>타입</td>';
					html +=				'<td>';
					html +=					'<select id="addColumnType" class="inp" style="width:285px">';
					html +=	 					"<option value='BIGINT'>BIGINT</option>"
					html +=						"<option value='BIGSERIAL'>BIGSERIAL</option>"
					html +=						"<option value='CHAR'>DOUBLE PRECISION</option>"
					html +=	 					"<option value='FLOAT'>FLCHAR</option>"
					html +=	 					"<option value='DOUBLE PRECISIONOAT'>DOUBLE PRECISIONOAT</option>"
					html +=	 					"<option value='INTEGER'>INTEGER</option>"
					html +=	 					"<option value='SMALLINT'>SMALLINT</option>"
					html +=	 					"<option value='TEXT'>TEXT</option>"
					html +=	 					"<option value='TIMESTAMP'>TIMESTAMP</option>"
					html +=	 					"<option value='VARCHAR'>VARCHAR</option>"
					html +=					'</select>';
					html +=				'</td> ';
					html +=			'</tr>';
					
					html +=		'</tbody>';
					html +=	'</table>';
					html +="</div>";
				
				$message.open("컬럼 추가",html,
						
						btns = [
							{
								title : "저장",
								
								func : function(opt){
										
									//addCoulmnName
									//addColumnId
									//addColumnType
									
									var popup = $(".dialog");
									var addCoulmnName = $(popup).find("#addCoulmnName").val();
									var addColumnId = $(popup).find("#addColumnId").val();
									var addColumnType = $(popup).find("#addColumnType").val();
									
									
									/*var patt = new RegExp("/[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/");
									var check = patt.test(addColumnId);*/
									var check = $commonFunc.isHan(addColumnId);
									if($.trim(addCoulmnName) == ""){
										$message.open("컬럼명을 입력 하세요");
									}else if($.trim(addColumnId) == ""){
										$message.open("컬럼ID을 입력 하세요");
									}else if(check){
										$message.open("컬럼명은 영문으로 입력 하세요");
									}else{
										var obj = {
												column_name : addCoulmnName,
												column_id : addColumnId,
												dataType : addColumnType
										}
										
										var columnInfos = $myDataDetail.data.kor_column_desc;
										columnInfos.push(obj);
										
										var param = {
												column_nm : obj.column_name,
												column_id : obj.column_id,
												dataType : obj.dataType
										}
										
										param.kor_column_desc = JSON.stringify(columnInfos);
										var model = $myDataDetail.model.getModel("ADD_COLUMN",param);
										console.log(model);
										$myDataDetail.ui.modifyBefore();
										$myDataDetail.request.modify(model,$myDataDetail.ui.modifyAfter);
										opt.close();		
									}
									
									
									
								},
							},
							{
								title : "취소",
								func : function(opt){
									opt.close();
								}
							}
						]
				);
				
				$("input:text[name='addColumnId']").keyup(function(e){
					var value = $(e.target).val();
					var regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
					switch(e.keyCode) {
						case 8:
						case 9:
						case 37:
						case 39:
						case 45:
							return;
						default:
							value = value.replace(regExp,'');
							$(e.target).val(value)
							break;
					}
				});
				
			},
			
			removeStandard : function(obj){
				$(obj).parent().remove();
			},
			
			
			save : function(){
				$(".btnEdit").hide();
				$(".btnDelete").hide();
				
				$myDataDetail.data.state = "read";
				//editDataNm
				//editDesc
				var data_nm = $("#editDataNm").val();
				var desc = $("#editDesc").val();
				
				/*if(data_nm == null || data_nm == ""){
					$message.open("알림","제목을 입력 해 주세요");
					return;
				}*/
				
				if(desc == null || desc == ""){
					$message.open("알림","데이터 설명을 입력 해주세요.");
					return;
				}
				
				
				var param = {
						resource_id : $myDataDetail.data.resourceInfo.resource_id,
						desc : desc
				};
				$myDataDetail.request.saveData(param);
			},
			
			modifyBefore : function(){
				$mask.show();
			},
			
			modifyAfter : function(){
				$mask.hide();
				$myDataDetail.ui.goPage($myDataDetail.data.currentPage);
				$myDataDetail.data.setKorColumnDesc();
			},
			
			// 데이터 수정 메뉴 체크박스
			checkAllList : function(obj){
				var ck = $(obj).prop("checked");
				var target = $(obj).parents("table").eq(0).find(".chkEtc");
				
				console.log(target);
				if(ck){
					target.addClass("checked");
					target.attr("checked", true);
				}else{
					target.removeClass("checked");
					target.attr("checked", false);
				}
			},
		
	}
	
	$myDataDetail.event = {
			init : function(){
				
				$myDataDetail.data.resourceList = JSON.parse($("#resourceList").val());
				$myDataDetail.data.resourceInfo = JSON.parse($("#resourceInfo").val());// kor_column_desc
				
				$myDataDetail.data.pos_column_desc = null;
				
				if($myDataDetail.data.resourceInfo.pos_column_desc != undefined){
					$myDataDetail.data.pos_column_desc = JSON.parse($myDataDetail.data.resourceInfo.pos_column_desc);
				}
				
				
				if($myDataDetail.data.resourceInfo == null || $myDataDetail.data.resourceInfo ==$.trim("")){
					$message.open("알림","데이터가 손상 되었습니다.",function(){location.href = contextPath + "/view/myData/myDataManagement";})
				}
				
				$myDataDetail.data.kor_column_desc = JSON.parse($myDataDetail.data.resourceInfo.kor_column_desc);
				$myDataDetail.data.total = $myDataDetail.data.resourceInfo.data_cnt;
				$myDataDetail.data.schema = $myDataDetail.data.resourceInfo.user_id;
				$myDataDetail.data.data_nm = $myDataDetail.data.resourceInfo.data_nm;
				$myDataDetail.data.resource_id = $myDataDetail.data.resourceInfo.resource_id;
				
				$myDataDetail.data.setKorColumnDesc();
				
				/*$("#data_nm").text($myDataDetail.data.resourceInfo.data_nm);*/
				if($myDataDetail.data.resourceInfo.kor_data_nm != undefined && $myDataDetail.data.resourceInfo.kor_data_nm != '' && $myDataDetail.data.resourceInfo.kor_data_nm != null){
					$("#data_nm").text($myDataDetail.data.resourceInfo.kor_data_nm);
				}else{
					$("#data_nm").text($myDataDetail.data.resourceInfo.description);
				}
				$("#data_create_time").text($myDataDetail.data.resourceInfo.data_create_time);
				
				//$myDataDetail.ui.gridTable($myDataDetail.data.kor_column_desc,$myDataDetail.data.resourceList,"#gridTable");
				$myDataDetail.ui.goPage(1);
				$myDataDetail.event.setUIEvent();
				
				if($myDataDetail.data.resourceInfo.action_type == "SHP" || $myDataDetail.data.resourceInfo.action_type == "GEOM"){
					$("#dataDetailGeoCoding").hide();
				}
			},
			
			
			
			setUIEvent : function(){
				$("#viewCnt").off().on("change",function(){
					$myDataDetail.ui.goPage(1);
				});
				$("#moveMyDataList").off().on("click", function(){
					location.href = contextPath+"/view/myData/myDataManagement";
					//history.back();
					
				});
				$("#columnDataEdit").off().on("click",function(){
					$myDataDetail.ui.columnDataEdit();
				});
				
				$("#columnEdit").off().on("click",function(){
					
					if($(this).data("type") == "read"){
						$myDataDetail.ui.editStart();
						$("#editTabBox > ul > li > a").eq(0).trigger("click");
						
					}else{
						// save
						$myDataDetail.ui.save();
					}
					
				});
				
				$("#viewMap").off().on("click",function(){
					var showList = $("#viewCnt").val();
					if($myDataDetail.data.resourceInfo.action_type == undefined){
						$message.open("알림","지도를 보기 위해서는 지오코딩이 필요로 합니다.");
					}else{
						
						var log_param = "Resource_id - " + $myDataDetail.data.resource_id;
						$log.srvLogWrite("Z0", "03", "02", "10", "", log_param);

						window.open(contextPath+"/view/myData/resultMap?resource_id="+$myDataDetail.data.resource_id+"&limit="+showList+"&page="+$myDataDetail.data.currentPage);
					}
					
				});				
				
				$("#dataDetailGeoCoding").off().on("click",function(){
					if($myDataDetail.data.resourceInfo.action_type == undefined){
						$message.open("알림","지오코딩 화면으로 이동 하시겠습니까?",
								btns = [
									{
										title : "확인",
										
										func : function(opt){
											location.href = contextPath + "/view/myData/myDataCreate?resource_id="+$myDataDetail.data.resourceInfo.resource_id;
											opt.close();
										}
									},
									{
										title : "취소",
										func : function(opt){
											opt.close();
										}
										
									}

								]	);
					}else{
						location.href = contextPath+"/view/myData/myDataDetailGeoCoding?resource_id="+$myDataDetail.data.resource_id;
					}
					
				})
				
				$("#columnDeleteButton").off().on("click",function(){
					$myDataDetail.ui.columnDelete();
				});
				
				
				$("#columnEditButton").off().on("click",function(){
					$myDataDetail.ui.columnDataEdit();
				})
				
				$("#columnAddButton").off().on("click",function(){
					$myDataDetail.ui.columnAdd();
				})
				
				$("#columnRowDeleteButton").off().on("click",function(){
					$myDataDetail.ui.rowDelete();
				})
				
				$("#editTabBox > ul > li > a").off().on("click",function(){
					$(".tabBox a").removeClass("on");
					$(this).addClass("on");
					
					var editType = $(this).attr("id");
					if(editType == "columnEditTab"){
						$myDataDetail.ui.columnEditStart();
					}else{
						$myDataDetail.ui.rowEditStart();
					}
					
					
				});
				
				$("#sharedButton").off().on("click",function(){
					if($myDataDetail.data.resourceInfo.inst_share_yn == "N"){
						
						var log_param = "Resource_id - " + $myDataDetail.data.resource_id;
						$log.srvLogWrite("Z0", "03", "02", "07", "", log_param);
						
						$commonDataFunc.ui.doShare(null, $myDataDetail.data.resource_id, function() {
							$myDataDetail.data.resourceInfo.inst_share_yn = "Y";
						});
					}else{
						$message.open("알림", "이미 그룹공유된 분석결과입니다.");
					}
					
				});
				$("#favButton").off().on("click",function(){
					if($myDataDetail.data.resourceInfo.fav_yn == undefined || $myDataDetail.data.resourceInfo.fav_yn == "N"){
						
						var log_param = "Resource_id - " + $myDataDetail.data.resource_id;
						$log.srvLogWrite("Z0", "03", "02", "08", "", log_param);
						
						$commonDataFunc.ui.doFavorite($myDataDetail.data.resource_id, function() {
							$myDataDetail.data.resourceInfo.fav_yn  = "Y";
						});
					}else{
						$message.open("알림", "이미 즐겨찾기된 분석결과입니다.");
					}
				});
			},
	}
	
	$myDataDetail.request = {
			selectResourceInfo : function(startIdx,resultCnt){
				$.ajax({
					url : contextPath+"/api/myData/selectResourceInfo.do",
					type : "POST",
					data : {
						schema : $myDataDetail.data.schema,
						data_nm : $myDataDetail.data.data_nm,
						resultCnt : Number(startIdx) + Number(resultCnt),
						startIdx : startIdx,
						resource_id : $myDataDetail.data.resource_id
					},
					
					beforeSend : function(){
						$mask.show();
					},
					success : function(res) {
						console.log(res);
					
						var columnInfo = $myDataDetail.data.kor_column_desc
						var rowList = res.data.resource;
						$myDataDetail.data.total = Number(res.data.info.data_cnt);
						$myDataDetail.ui.gridTable(columnInfo,rowList,"#gridTable");

					},
					error : function(xhr, textStatus, error) {
						console.log(error);
					},
					complete : function(data) {
						$mask.hide();
					}
				});
				
			},
			
			modify : function(data,callback){
				
				$.ajax({
					url : contextPath+"/api/myData/modify.do",
					type : "POST",
					data : data,
					beforeSend : function(){
						/*$mask.show();*/
						
					},
					
					success : function(res){
						console.log(res);
						callback();
					},
					
					error : function(xhr, textStatus, error){
						console.log(error);
					},
					complete : function(data) {
						/*$mask.hide();*/
					}
					
				})
			},
			
			conditionSearch : function(data,callback){
				data.test = "test";
				$.ajax({
					url : contextPath+"/api/myData/conditionList.do",
					type : "POST",
					data: data,
					beforeSend : function(){
						$mask.show();
						
					},
					
					success : function(res){
						/*callback();*/
						var selectList = res.selectList; 
						$(".dialog").find("#where").val(res.where);
						$myDataDetail.ui.gridTable($myDataDetail.data.kor_column_desc,selectList,$(".dialog").find("#conditionList"));
						
						$(".dialog").find(".conditionList").mCustomScrollbar("destroy");
						$(".dialog").find(".conditionList").mCustomScrollbar({axis:"xy"});
						
					},
					
					error : function(xhr, textStatus, error){
						console.log(error);
						$mask.hide();
					},
					complete : function(data) {
						$mask.hide();
					}
				})
			},
			
			saveData : function(data){
				$.ajax({
					url : contextPath+"/api/myData/saveData.do",
					type : "POST",
					data : data,
					beforeSend : function(){
						$mask.show();
					},
					success : function(res){
						
						var log_param = "Resource_id - " + res.resource_id;
						$log.srvLogWrite("Z0", "03", "02", "09", "", log_param);

						location.href = contextPath + "/view/myData/myDataDetail?resource_id="+$myDataDetail.data.resourceInfo.resource_id;
					},
					
					error : function(xhr, textStatus, error){
						console.log(error);
						$message.open("알림","저장중 오류가 발생 하였습니다.");
					},
					complete : function(data) {
						$mask.hide();
					}
					
				});
			},
			
	}
	$myDataDetail.data = {
			resourceInfo : null,
			resourceList : null,
			kor_column_desc : null,
			total : null,
			currentPage : 1,
			schema : null,
			data_nm : null,
			state : 'read',
			/*modifyStatus : false,*/
			deleteRow : new Array(),
			deleteColumn : new Array(),
			addRow : new Array(),
			//어떤 컬럼이 row의 기준 컬럼인지 rid 인지 gid 인지
			rowColumnIndex : null,
			
			setKorColumnDesc : function(){
				var columnInfo = $myDataDetail.data.kor_column_desc;
				var columnDataType = JSON.parse($("#columnDataType").val());
				
				for(var i = 0; i < columnInfo.length; i++){
					var column_id = columnInfo[i].column_id;
					for(var j = 0 ; j < columnDataType.length; j++){
						if(column_id.toLowerCase() == columnDataType[j].column_name){
							columnInfo[i].dataType = columnDataType[j].data_type;
							break;
						}
					}
				}
				$myDataDetail.data.kor_column_desc = columnInfo;
			}
	}
}(window, document));