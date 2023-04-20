/**
 * 나의 데이터 생성 2018.08.31 최재영
 */

(function(W, D) {
	W.$myDataCreate = W.$myDataCreate || {};
	$(document).ready(function() {
		// $("#stepForm_1").hide();
		$myDataCreate.event.setUIEvent();
		if($("input[name='modifyData']").val() == 'true'){
			$("#stepForm_1").hide();
			$("#stepForm_2").hide();
			$("#stepForm_4").hide();
			$("#stepForm_5").hide();
			$("#stepForm_3").show();
			$("#prevStep_3").hide();
			$myDataCreate.ui.modifySetting();
			
		}else{
			$("#stepForm_2").hide();
			$("#stepForm_3").hide();
			$("#stepForm_4").hide();
			$("#stepForm_5").hide();
			
			//자동생성
			//$("input[name='show_output_table_name']").val();
		}
		
		$(".prevButton").hide();
		
		//modalfileEvent
		$(document).on("click", ".modalButton.styler", function(){
			var fileType = $(this).data("type");
			$(document).on("change", "#modal"+fileType+"File", function(){
				var val = $(this).val();
				if(val != null && val != undefined && val != ""){
					$("#modal"+fileType+"Text").val(val);
				}
			});
			$("#modal"+fileType+"File").trigger("click");
		});

	});

	$myDataCreate.ui = {

		/**
		 * 
		 * @name : model
		 * @description : 나의 데이터 페이지 네비게이션 모델
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		model : {
			resource_id : null,
			currentPage : 1, //현재 페이지
			listStatus : true, // 성공 , 실패 리스트 조회
			geoCodingType : null,
			schema : null,
			tableName : null,
			
		},
		
		/**
		 * 
		 * @name : modifySetting
		 * @description : 지오코딩을 위한 데이터 불러와 설정 하기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		modifySetting : function(){
			var resource_id = $("input[name='resource_id']").val();
			var schema = $("input[name='schema']").val();
			var tableName = $("input[name='output_table_name']").val();
			$myDataCreate.request.getColumnInfos(schema,tableName);
			$myDataCreate.request.preViewTable(schema,tableName, resource_id);
			
		},
		/**
		 * 
		 * @name : processStep
		 * @description : 스탭 진행별 데이터 세팅
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		processStep : function(step) {
			var tableName = $.trim($("input:text[name='show_output_table_name']").val());
			if($('input:file[name="oneFile"]').val() == "" || $('input:file[name="oneFile"]').val() == null  || $('input:file[name="oneFile"]').val() == undefined){
				$message.open('알림', "파일을 선택 해주세요.");
				$myDataCreate.event.prevStep("2");
			}else{
				$("#delimiterSelector").show();
				
				$myDataCreate.request.previewData($myDataCreate.ui.gridPreviewData, 0, 5);
				$(".nextButton").hide();
				$(".prevButton").show();
			}
		},

		/**
		 * 
		 * @name : gridPreViewData
		 * @description : 데이터 미리 보기 그리기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		gridPreviewData : function(type, data, header, headerList) {
			$(".preViewDiv").hide();
			$(".textEncodingDiv").hide();
			try {
				$("#textPreView").show();
				var html = "";
				for (var i = 0; i < data.length; i++) {
					var obj = data[i];
					var row = "";
					if (i != data.length) {
						for (var hi = 0; hi < headerList.length; hi++) {
							row += obj[headerList[hi]];
							if (hi < headerList.length-1) row += ", ";
						}
						row += "\n";
					}
					html += row;
				}				
			} catch (e) {
				html = "오류가 발생했습니다. 파일을 다시 확인부탁드립니다.";				
			}

			/* $("#textPreView").html(html); */
			$("#textPreView > textarea").val(html);
		},
		
		
		/**
		 * 
		 * @name : columnIdValidate
		 * @description : 컬럼 이름 유효성 검사
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		columnIdValidate : function(columnName){
			var validate = true;
		    
		    var mappingColumnNames = ["x","y","mapping_status","tot_oa_cd","adm_dr_cd","bas_cd","tot_x","tot_y","bas_x","bas_y","mapping_addr","rid","mapping_result"];
		    var checkedColumnNames = ["targetx","targety","meter","verify_status","tot_oa_cd","adm_dr_cd","bas_cd","tot_x","tot_y","bas_x","bas_y","mapping_addr","rid","verify_result"];
		    var geoCodingColumnNames= ["targetx","targety","tot_oa_cd","adm_dr_cd","bas_cd","tot_x","tot_y","bas_x","bas_y"];
		    var customColumnNames = ["rid","gid","geom"];
		    for(var i = 0 ; i < mappingColumnNames.length; i++) {
		    	if(columnName.toLowerCase() == mappingColumnNames[i]) {
		    		validate = false;
		    	}
		    }
		    
		    for(var i = 0 ; i < checkedColumnNames.length; i++) {
		    	if(columnName.toLowerCase() == checkedColumnNames[i]) {
		    		validate = false;
		    	}
		    }

		    for(var i = 0 ; i < geoCodingColumnNames.length; i++) {
		    	if(columnName.toLowerCase() == geoCodingColumnNames[i]) {	
		    		validate = false;
		    	}
		    }
		    
		    for(var i = 0 ; i < customColumnNames.length; i++) {
		    	if(columnName.toLowerCase() == customColumnNames[i]) {
		    		validate = false;
		    	}
		    }
		    
		    
		    return validate;
		},

		/**
		 * 
		 * @name : columnGridData
		 * @description : 헤더 선택시 헤더 그리드
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		columnGridData : function(headerList) {
			var html = "<table class='listTable01'>";
			html += "<tr><td>컬럼명</td><td>컬럼타입</td></tr>";
			for (var i = 0; i < headerList.length; i++) {
				
				//var validate = $myDataCreate.ui.columnIdValidate(headerList[i]);
				/*if(validate){
					html += "<tr>";
					html += "<td><span>" + headerList[i] + "</span></td>";
					html += "<td><select id='item"
							+ Number(Number(i) + 1)
							+ "' >"
							+ "<option value='AUTO'>AUTO</option>"
							+ "<option value='BIGINT'>BIGINT</option>"
							+ "<option value='BIGSERIAL'>BIGSERIAL</option>"
							+ "<option value='CHAR'>CHAR</option>"
							+ "<option value='DOUBLE PRECISION'>DOUBLE PRECISION</option>"
							+ "<option value='FLOAT'>FLOAT</option>"
							+ "<option value='INTEGER'>INTEGER</option>"
							+ "<option value='SMALLINT'>SMALLINT</option>"
							+ "<option value='TEXT'>TEXT</option>"
							+ "<option value='TIMESTAMP'>TIMESTAMP</option>"
							+ "<option value='VARCHAR'>VARCHAR</option>"
							+ "<option value='GEOMETRY'>GEOMETRY</option>"
							+ "</select></td>";
					html += "</tr>";
				}*/
				
				html += "<tr>";
				html += "<td><span>" + headerList[i] + "</span></td>";
				html += "<td><select id='item"
						+ Number(Number(i) + 1)
						+ "' >"
						+ "<option value='AUTO'>AUTO</option>"
						+ "<option value='BIGINT'>BIGINT</option>"
						+ "<option value='BIGSERIAL'>BIGSERIAL</option>"
						+ "<option value='CHAR'>CHAR</option>"
						+ "<option value='DOUBLE PRECISION'>DOUBLE PRECISION</option>"
						+ "<option value='FLOAT'>FLOAT</option>"
						+ "<option value='INTEGER'>INTEGER</option>"
						+ "<option value='SMALLINT'>SMALLINT</option>"
						+ "<option value='TEXT'>TEXT</option>"
						+ "<option value='TIMESTAMP'>TIMESTAMP</option>"
						+ "<option value='VARCHAR'>VARCHAR</option>"
						+ "<option value='GEOMETRY'>GEOMETRY</option>"
						+ "</select></td>";
				html += "</tr>";
				
			}

			html += "</table>";
			$("#columnGridData").html(html);
			
			/*$('.select').styler({
				select : {
					search : {
						ilmit : 100
					}
				}
			});*/

		},

		/**
		 * 
		 * @name : geoCodingTableGrid
		 * @description : 지오 코딩을 위한 테이블 그리기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		geoCodingTableGrid : function(rowList, columnInfo, resourceInfo) {
			var html = "<table class='listTable01' id='geoCodingTable'>";
			var headHtml = "<thead><tr>"
			var bodyHtml = "<tbody>";
			var columnArray = new Array();
			for (var i = 0; i < columnInfo.length; i++) {
				var obj = columnInfo[i];
				// column_id
				// column_name
				console.log(obj);
				headHtml += "<th data-type='" + obj.column_id + "'>"
						+ obj.column_name + "</th>";
				columnArray.push(obj.column_id);

			}
			headHtml += "<th data-type='rowId'>rid</th>";

			headHtml += "</tr></thead>";
			html += headHtml;

			for (var i = 0; i < rowList.length; i++) {
				bodyHtml += "<tr>";
				var row = rowList[i];
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
				if (row.rid != undefined) {
					bodyHtml += "<td>";
					bodyHtml += row.rid;
					bodyHtml += "</td>";
				} else if (row.gid != undefined) {
					bodyHtml += "<td>";
					bodyHtml += row.gid;
					bodyHtml += "</td>";
				}
				bodyHtml += "</tr>";
			}

			bodyHtml += "</tbody>";

			html += bodyHtml;
			html += "</table>";

			$("#gridGeoCodingTable").html(html);

			$("#gridGeoCodingTable").data("resource_id",resourceInfo.resource_id);
			$("#gridGeoCodingTable").data("data_nm", resourceInfo.data_nm);
			
			

		},

		/**
		 * 
		 * @name : getColumnGridData
		 * @description : 컬럼 데이터 정보 가져오기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		getColumnGridData : function() {
			// columnGridData
			// columnGridData
			// [{name : name , type : type}]
			var target = $("#columnGridData > table > tbody > tr");
			var array = new Array();
			var isHanAble = false;
			
			for (var i = 1; i < target.length; i++) {
				var tds = $(target[i]).find("td");
				var name = $(tds[0]).find("span").text();
				var check = $commonFunc.isHan(name);
				if(check){
					isHanAble = true;
				}
			}
			
			for (var i = 1; i < target.length; i++) {
				var tds = $(target[i]).find("td");
				var name = $(tds[0]).find("span").text();
				
				/*var check = $commonFunc.isHan(name);*/
				
				/*if(isHanAble){
					name = "item"+i;
				}*/
				
				/*var obj = {
						name : name,
						kor_name : $(tds[0]).find("span").text(),
						type : $(tds[1]).find("select").val(),
					}*/
				//컬럼명 강제로 전환
				var obj = {
						name : "item"+i,
						kor_name : $(tds[0]).find("span").text(),
						type : $(tds[1]).find("select").val(),
					}

					array.push(obj);
				
			}
			/*console.log(array);*/
			return array;
		},

		/**
		 * 
		 * @name : geoCodingSettingBarGrid
		 * @description : 선택된 지오코딩에 대한 ui 설정
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		geoCodingSettingBarGrid : function(type) {
			$(".geoCoding_desc").hide();
			var html = "";
			switch (type) {
			case "addr":
				$("#addr_desc").show();
				html += '<div class="addressBox"><span>주소 컬럼 선택</span>';
				html += $myDataCreate.ui.geoCodingSelectBox();
				html += '</div>';
				html += '<div class="addressBox"><span>매핑 방식 선택</span>';
				html += '<select class="select" name="mappingMethod">';
				html += '<option value="sop_api">SOP</option>';
					
				if (userdiv != "s")	{
					html += '<option value="sop_api,daum_api">SOP + DAUM</option>';
				}
				
				html += '</select>';
				html += '</div>';
				
				html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc">집계구</p>'
				html += '<p class="etctxt01">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
				
				$("#geoCodingSelectDiv").html(html);
				
				break;
			case "xy":
				$("#xy_desc").show();

				html += '<div class="chkContBox">';
				html += '<ul>';
				html += '<li>';
				html += '<span>1. X좌표의 컬럼</span>';
				html += $myDataCreate.ui.geoCodingSelectBox();
				html += '</li>';
				html += '<li>';
				html += '<span>2. Y좌표의 컬럼</span>';
				html += $myDataCreate.ui.geoCodingSelectBox();
				html += '</li>';
				html += '</ul>';
				html += '</div>';

				html += '<div class="chkContBox">';
				html += '<ul>';
				html += '<li>';
				html += '<span>현재 좌표계 선택</span>';
				html += '<select class="select" name="input_coord">';
				html += '<option value="5179">UTM-K (5179)</option>';
				html += '<option value="5180">TM서부  (5180)</option>';
				html += '<option value="5181">TM중부  (5181)</option>';
				html += '<option value="5183">TM동부  (5183)</option>';
				html += '<option value="5184">TM동해  (5184)</option>';
				html += '<option value="5185">TM서부  (5185)</option>';
				html += '<option value="5186">TM중부  (5186)</option>';
				html += '<option value="5187">TM동부  (5187)</option>';
				html += '<option value="4326">WGS84 (4326)</option>';
				html += '<option value="4166">WGS84 (4166)</option>';
				html += '<option value="5178">KATEC (5178)</option>';
				html += '<option value="5174">TM중부  (5174)</option>';
				html += '</select>';
				//html += '<a href="javascript:void(0)" class="btnHelp"><img src="'+contextPath +'/img/common/btn_help.png" /></a>'; //190220 제거
				html += '</li>';
				html += '</ul>';
				html += '</div>';
				html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc">집계구</p>'
				html += '<p class="etctxt01">* SGIS pro는 UTM-K좌표계를 사용합니다. </p>';
				html += '<p class="etctxt01">* 현재 좌표계가 UTM-K좌표계가 아닌 경우 UTM-K로 변환됩니다.</p>';
				html += '<p class="etctxt01 mt30">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';

				break;
			case "geom":
				$("#geom_desc").show();
				html += '<div class="chkContBox"><span>geom컬럼  </span>';
				html += $myDataCreate.ui.geoCodingSelectBox();
				html += '</div>'
				html += '<div class="chkContBox">';
				html += '<ul>';
				html += '<li>';
				html += '<span>현재 좌표계 선택</span>';
				html += '<select class="select" name="input_coord_by_geom">';
				html += '<option value="5179">UTM-K (5179)</option>';
				html += '<option value="5180">TM서부  (5180)</option>';
				html += '<option value="5181">TM중부  (5181)</option>';
				html += '<option value="5183">TM동부  (5183)</option>';
				html += '<option value="5184">TM동해  (5184)</option>';
				html += '<option value="5185">TM서부  (5185)</option>';
				html += '<option value="5186">TM중부  (5186)</option>';
				html += '<option value="5187">TM동부  (5187)</option>';
				html += '<option value="4326">WGS84 (4326)</option>';
				html += '<option value="4166">WGS84 (4166)</option>';
				html += '<option value="5178">KATEC (5178)</option>';
				html += '</select>';
				//html += '<a href="javascript:void(0)" class="btnHelp"><img src="'+contextPath +'/img/common/btn_help.png" /></a>'; //190220 아이콘 제거
				html += '</li>';
				html += '</ul>';
				html += '</div>';
				html += '<p class="etctxt01">* SGIS pro는 UTM-K좌표계를 사용합니다. </p>';
				html += '<p class="etctxt01">* 현재 좌표계가 UTM-K좌표계가 아닌 경우 UTM-K로 변환됩니다.</p>';
				html += '<p class="etctxt01 mt30">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
				$("#geoCodingSelectDiv").html(html);
				break;
			case "admCd":
				$("#admcd_desc").show();
				html += '<div class="addressBox"><span>행정동 </span>';
				html += $myDataCreate.ui.geoCodingSelectBox();
				html += '</div>';
				html += '<div class="addressBox"><span>행정동 레벨</span><select class="select" name="bnd_cd_level"><option value="SIDO">시도</option><option value="SGG">시군구</option><option value="DONG">읍면동</option></select></div>';
				html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc">집계구</p>';
				html += '<p class="etctxt01">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
				break;
			}

			$("#geoCodingSelectDiv").html(html);

			$('.select, .chkEtc').styler({
				select : {
					search : {
						limit : 10
					}
				}
			});
			
			$('.jq-checkbox').css("top","0px");
			
			/* $('.select').css("z-index",10000); */
			// $(".addressBox select").val()
		},

		/**
		 * 
		 * @name : geoCodingSelectBox
		 * @description : 지오코딩시 셀렉트박스 리턴
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		geoCodingSelectBox : function() {
			var ths = $("#geoCodingTable > thead > tr > th");
			var html = "<select class='select' name='selectColumn'>";
			for (var i = 0; i < ths.length; i++) {
				html += "<option value='" + $(ths[i]).data("type") + "'>"
						+ $(ths[i]).text() + "</option>";
			}
			html += "</select>";
			return html;
		},

		/**
		 * 
		 * @name : geoCodingCheckProcess
		 * @description : 지오코딩중
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		geoCodingCheckProcess : function() {
			console.log("loding!!!");
		},

		/**
		 * 
		 * @name : geoCodingResultGrid
		 * @description : 지오코딩 결과
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		geoCodingResultGrid : function(resource, info, scount, fcount) {
			var sConfirm = true;
			
			var mappingStatus = $myDataCreate.ui.model.listStatus; //true , false
			var totalCount = Number(scount) + Number(fcount)
			$("#sCount").text(scount);
            $("#totalResultCount").text(totalCount);
            
            var per = Math.floor((scount / totalCount) * 100);
            $("#resultPercent").text(per + "%");
			
			var sColumn = $("select[name='selectColumn']");
			var html ='<table class="listTable01">';
			if(mappingStatus == true){
				html += '<colgroup><col width="80"/><col width="580"/><col width="80"/></colgroup>';
				html += '<thead>';
				//html += '<th><input type="checkbox" class="chkAll" /></th>';
				html += '<th>번호</th>';
				html += '<th>지오코딩 데이터</th>';
				html += '<th>결과</th>';
				html += '</thead>';
			}else{
				
				html += '<colgroup><col width="80"/><col width="80"/><col width="500"/><col width="80"/></colgroup>';
				html += '<thead>';
				html += '<th><input type="checkbox" class="chkAll" /></th>';
				html += '<th>번호</th>';
				html += '<th>지오코딩 데이터</th>';
				html += '<th>수정</th>';
				html += '</thead>';
			}
			
			
			html += '<tbody>';

			
			
			// 성공결과
			// 실패결과
			// 현재 Mapping에서만 mappingStatus 를 알수 있는 문제가 있다.
			for (var i = 0; i < resource.length; i++) {
				// 성공 여부 실패 여부
				html += '<tr>';
				
				var rid = 0;
				if (resource[i].rid != undefined) {
					rid = resource[i].rid;
				} else {
					rid = resource[i].gid;
				}
				
				if(mappingStatus == false){
					html += '<td><input type="checkbox" class="chkEtc" name="checkRid" data-rid="'+rid+'"/></td>'
				}
				
				
				html += '<td>' + rid + '</td>';
				var strArray = new Array();
				for (var j = 0; j < sColumn.length; j++) {
					var colName = $(sColumn[j]).val().toLowerCase();
					//.toLowerCase()
					strArray.push(resource[i][colName]);
				}

				if (mappingStatus == true) {
					html += '<td>';
					html += strArray.toString();
					html += '</td>';

					html += '<td>' + mappingStatus + '</td>';
				} else {

					html += '<td>';
					//xy 일때
					if($myDataCreate.ui.model.geoCodingType == "xy"){
						
							html += '<input type="text" class="inp" name="fixData" id="fixDataX_'+rid+'" value="'
									+ strArray[0] + '"/>'
							html += '<input type="text" class="inp" name="fixData" id="fixDataY_'+rid+'" value="'
									+ strArray[1] + '"/>'
						
					}else{
						for (var k = 0; k < strArray.length; k++) {
							html += '<input type="text" class="inp" name="fixData" id="fixData_'+rid+'" value="'
									+ strArray[k] + '"/>'
						}
					}
					
					html += '</td>';

					html += '<td>' + '<div class=""><a href="javascript:$myDataCreate.request.updateRecordColumnData('+rid+')">변경</a></div>'+ '</td>';
				}

				html += '</tr>';
			}

			html += '</tbody>';
			html += '</table>';
			html += '<div id="geoCodingResultPaging" class="pages" style="margin-top:10px;"></div>';

			$("#geoCodingResult").html(html);

			// 전체 개수 성공시 scount , 실패시 fcount
			html = "";
			var total = 0;
			if(mappingStatus){
				total = scount;
			}else{
				total = fcount;
			}// 전체 데이터 개수
			
			if(total != 0){
				// paging
				//var page = 1;
				var page = $myDataCreate.ui.model.currentPage;
				var showPageCount = 10;
				var showList = Number($("#geoCodingViewCnt").val());
				// var showList = 5;

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
				html = "<span id='pageNavigation'>";
				if (startPage == 1) {
					//html += "<a class='number' data-type='firstPage'>"
					//html += "《</a>";
					//html += "<a class='number' data-type='prevPage'>"
					//html += "&lt;</a>";
				} else {
					html += "<a class='number' data-type='firstPage' data-id=" + 1 + " href='javascript:$myDataCreate.ui.pageResourceInfo("+  1 + ")'>"
					html += "《</a>";
					html += "<a class='number' data-type='prevPage' data-id="+ Number(Number(startPage) - 1) + "href='javascript:$myDataCreate.ui.pageResourceInfo("+  Number(Number(startPage) - 1) + ")'>"
					html += "&lt;</a>";
				}

				for (var i = startPage; i <= endPage; i++) {
					var active = "";
					if (i == page) {
						html += "<a class='number current' href='javascript:$myDataCreate.ui.pageResourceInfo("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}else{
						html += "<a class='number' href='javascript:$myDataCreate.ui.pageResourceInfo("+ i + ")' title='Page " + i + "' >" + i + "</a>";
					}
				}
				if (endPage == totalPageCount) {
					//html += "<a class='number' data-type='nextPage'>"
					//html += "&gt;</a>";
					//html += "<a class='number' data-type='lastPage'>"
					//html += "》</a>";
				} else {
					html += "<a class='number' data-type='nextPage' data-id="+ Number(Number(endPage) + 1) + "href='javascript:$myDataCreate.ui.pageResourceInfo("+  Number(Number(endPage) + 1) + ")'>"
					html += "&gt;</a>";
					html += "<a class='number' data-type='lastPage' data-id="+ totalPageCount + "href='javascript:$myDataCreate.ui.pageResourceInfo("+  totalPageCount + ")'>"
					html += "》</a>";
				}

				html += "</span>";
			}
			

			$("#geoCodingResultPaging").html(html);
			$(".chkAll").styler({});
			$("input[name='checkRid']").styler({});
			
			$(".chkAll").off().on("click",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked");
					$("input[name='checkRid']").parent().removeClass("checked");
				}else{
					$(this).addClass("checked");
					$("input[name='checkRid']").parent().addClass("checked");
				}
			});
			
			$("input[name='checkRid']").off().on("click",function(){
				if($(this).parent().hasClass("checked")){
					$(".chkAll").removeClass("checked");
					$(this).parent().removeClass("checked");
				}else{
					$(this).parent().addClass("checked");
				}
			});
			
			
			/*$('input[type="checkbox"] , input[type="text"]').styler({
				select : {
					search : {
						limit : 10
					}
				}
			});*/
			

		},
		
		pageResourceInfo : function(pageIdx){
			
			$myDataCreate.ui.model.currentPage = pageIdx;
			var showListCount =$("select[name='geoCodingViewCnt']").val();
			var startIdx =  showListCount * (pageIdx -1);
			console.log($myDataCreate.ui.model.schema);
			console.log($myDataCreate.ui.model.tableName);
			console.log($myDataCreate.ui.model.resource_id);
			$myDataCreate.request.selectResourceInfo($myDataCreate.ui.model.schema,$myDataCreate.ui.model.tableName,$myDataCreate.ui.model.resource_id, startIdx, $("select[name='geoCodingViewCnt']").val());
			
		},
		
		geoCodingModify : function(){
			var type = null;
			var chkList = $(".geoChkRadio");
			for (var i = 0; i < chkList.length; i++) {
				if ($(chkList[i]).hasClass("on")) {
					type = $(chkList[i]).data("type");
				}
			}
			
			$myDataCreate.request.geoCoding(type , "/modify");
		},
		
		/**
		 * 
		 * @name : setOneFile
		 * @description : 하나의 파일 설정
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		setTextFile : function(){
			var x = $("#modalText > #modalTEXTFile");
			console.log($(x).val());
			if($(x).val() != null && $(x).val() != ""){
				//var y = x.clone();
				//$("#oneFileZone").html(y);
				
				var path = $(x).val();
				if(x != "" || x != null){
					var filename = path.split(".")[1];
					
					if(filename == "csv" || filename == "txt"){
						var y = x;
						$(y).attr("id","textFile");
						console.log($(y).val());
						$("#oneFileZone").html(y);
						console.log(y);
						
						/*$myDataCreate.ui.getFilename("modalTEXTFile");*/
						$myDataCreate.ui.getFilename("textFile");
						$myDataCreate.event.selectDataType("TEXT");
					}else{
						$message.open("알림","csv 또는 txt 파일을 업로드 해 주세요.");
					}
					
				}else{
					
				}
				
			}
			
		},
		
		setXlsxFile : function(){
			var x = $("#modalXLSX >#modalXLSXFile");
			if($("#modalXLSXFile").val() != null && $("#modalXLSXFile").val() != ""){
				
				/*var y = x.clone();*/
				var y = x;
				var path = $(x).val();
				var filename = path.split(".")[1];
				if(filename == "xlsx"){
					$(y).attr("id","xlsxFile");
					$("#oneFileZone").html(y);
					$myDataCreate.ui.getFilename("xlsxFile");
					//$myDataCreate.ui.getFilename("modalXLSXFile");
					$myDataCreate.event.selectDataType("EXCEL");
				}else{
					$message.open("알림","xlsx 파일을 업로드 해주세요.");
				}
				
				
			}else{
				
			}
			
			
		},
		/**
		 * 
		 * @name : setMultiPartFile
		 * @description : 두개의 파일 설정
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		setMultiPartFile : function(){
			if($("#modalSHPFile").val() != null && $("#modalSHPFile").val() != ""){
				/*var shp = $("#modalSHPFile").clone();
				var dbf = $("#modalDBFFile").clone();
				var shx = $("#modalSHXFile").clone();*/
				
				var shp = $("#modalSHPFile");
				var dbf = $("#modalDBFFile");
				var shx = $("#modalSHXFile");
				var shpFileName = $(shp).val().split(".")[1];
				var dbfFileName = $(dbf).val().split(".")[1];
				var shxFileName = $(shx).val().split(".")[1];
				
				if(shpFileName == "shp" && shxFileName == "shx" && dbfFileName == "dbf" ){
					var shp_coord_by_geom = $("select[name='shp_coord_by_geom']").val(); 
					var shp_enc_type = $("select[name='shp_enc_type']").val();
					$("#shpFileZone").append(shp);
					$("#shpFileZone").append(dbf);
					$("#shpFileZone").append(shx);
					$myDataCreate.ui.getFilename("modalSHPFile");
					
					var shpVal = "<input type='text'name='shp_coord_by_geom' value='"+shp_coord_by_geom+"'/>"
					$("#shpFileZone").append(shpVal);
					var shpVal = "<input type='text'name='shp_enc_type' value='"+shp_enc_type+"'/>"
					$("#shpFileZone").append(shpVal);
					$myDataCreate.event.selectDataType("SHP");
				}else{
					$message.open("알림","각 칸에 맞추어 shp , shx , dbf 파일을 업로드 해주세요.");
				}
				
				
			}
			
		},
		
		getFilename : function(id){
			var file = $('#'+id)[0].files[0]
			if (file){
			  $myDataCreate.ui.setFileName(file.name);
			}
		},
		
		/**
		 * 
		 * @name : setFileName
		 * @description : 파일 이름 설정
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		setFileName : function(fileName){
			$("#file_name_zone").show();
			$("#show_output_file_name").text(fileName);
		},

	}
	$myDataCreate.event = {
		setUIEvent : function() {
			
			$("input:text[name='show_output_table_name']").keyup(function(e){
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
			
			$(".nextButton").off().on("click", function() {
				var id = $(this).attr("id");
				var step = id.split("_")[1];
				$myDataCreate.event.nextStep(step);

			});
			
			$(".prevButton").off().on("click", function() {
				$("#textPreView > textarea").val("");
				$("#textPreView").hide();
				$("#oneFile").val("");
				$(".nextButton").show();
				$(".prevButton").hide();
			});

			$(".selectDataType").off().on("click", function() {
				var type = $(this).data("type");
				//변경중
				/*$myDataCreate.event.selectDataType(type);*/
				$myDataCreate.event.selectFileUploadModal(type);
			});
			
			
			$(".geoChkRadio").off().on("click", function() {
				$myDataCreate.event.geoCodingColumnClick($(this).data("type"));
			});

			$("#geoCodingViewCnt").off().on(
					"change",
					function() {
						$myDataCreate.request.selectResourceInfo($myDataCreate.ui.model.schema,$myDataCreate.ui.model.tableName,$myDataCreate.ui.model.resource_id, 0, $("select[name='geoCodingViewCnt']").val());
						
					});
			
			$(".tabBox a").off().on("click",function(){
				$(".tabBox a").removeClass("on");
				$(this).addClass("on");
				
				
				var statusTab = $("#resultStatusTab > li");
				for (var i = 0; i < statusTab.length; i++) {
					if ($(statusTab[i]).find("a").hasClass("on")) {
						if (i == 0) {
							$("#modifyButton").hide();
							$myDataCreate.ui.model.listStatus = true;
						} else if (i == 1) {
							geoCodingSettingBarGrid("addr");
							$("#modifyButton").show();
							$myDataCreate.ui.model.listStatus = false;
						}
					}
				}
				
				$myDataCreate.request.selectResourceInfo($myDataCreate.ui.model.schema,$myDataCreate.ui.model.tableName,$myDataCreate.ui.model.resource_id, 0, $("select[name='geoCodingViewCnt']").val());
				
			});
			
			

		},

		/**
		 * 
		 * @name : nextStep
		 * @description : 다음 스탭으로 넘어가기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		nextStep : function(step) {
			$myDataCreate.ui.processStep(step);
		},

		/**
		 * 
		 * @name : prevStep
		 * @description : 이전 스탭으로 돌아가기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		prevStep : function(step) {
			$(".nextButton").show();
			$(".prevButton").hide();
		},
		
		/**
		 * 
		 * @name : selectFileUploadModal
		 * @description : 데이터 업로드 창
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		selectFileUploadModal : function(type){
			
			if(type=="SHP"){
				var html ='<div id="multiPartFileForm" class="partForm">'
				
					html +='<div class="fileBox">'
					html +=	'<ul>'
					html +=		'<li id="modalSHP">'
					html +=			'<span>SHP</span>'
					html +=			'<input type="text" class="modalInp" id="modalSHPText"  placeholder="파일을 선택해 주세요" readonly="readonly"><button class="modalButton" id="modalSHPButton" data-type="SHP">파일 업로드</button>'
					html +=			'<input type="file" name="multiFile" id="modalSHPFile" style="display:none;"class="modalFile" accept=".shp">'
					html +=		'</li>'
					html +=	'</ul>'
					html +=	'<ul>'
					html +=		'<li id="modalDBF">'
					html +=			'<span>DBF</span>'
					html +=			'<input type="text" class="modalInp" id="modalDBFText"  placeholder="파일을 선택해 주세요" readonly="readonly"><button class="modalButton" id="modalDBFButton" data-type="DBF">파일 업로드</button>'
					html +=			'<input type="file" name="multiFile" id="modalDBFFile" style="display:none;"class="modalFile" accept=".dbf">'
					html +=		'</li>'
					html +=	'</ul>'
					html +=	'<ul>'
					html +=		'<li id="modalSHX">'
					html +=			'<span>SHX</span>'
					html +=			'<input type="text" class="modalInp" id="modalSHXText" placeholder="파일을 선택해 주세요" readonly="readonly"><button class="modalButton" id="modalSHXButton" data-type="SHX">파일 업로드</button>'
					html +=			'<input type="file" name="multiFile" id="modalSHXFile" style="display:none;"class="modalFile" accept=".shx">'
					html +=		'</li>'
					html +=	'</ul>'
						
					html +=	'<ul>'
					html +=		'<li>'
					html +=			'<span>인코딩</span>'
					html += '<select class="select inp" name="shp_enc_type">';
					html += '<option value="CP949">CP949</option>';
					html += '<option value="UTF-8">UTF-8</option>';
					html += '<option value="EUC-KR">EUC-KR</option>';
					html += '</select>';
					html +=	'</li>'
					html +=	'</ul>'

					html +=	'<ul>'
					html +=		'<li>'
					html +=			'<span>좌표계</span>'
					html += '<select class="select inp" name="shp_coord_by_geom">';
					html += '<option value="5179">UTM-K (5179)</option>';
					html += '<option value="5180">TM서부  (5180)</option>';
					html += '<option value="5181">TM중부  (5181)</option>';
					html += '<option value="5183">TM동부  (5183)</option>';
					html += '<option value="5184">TM동해  (5184)</option>';
					html += '<option value="5185">TM서부  (5185)</option>';
					html += '<option value="5186">TM중부  (5186)</option>';
					html += '<option value="5187">TM동부  (5187)</option>';
					html += '<option value="4326">WGS84 (4326)</option>';
					html += '<option value="4166">WGS84 (4166)</option>';
					html += '<option value="5178">KATEC (5178)</option>';
					html += '</select>';
					html +=	'</li>'
					html +=	'</ul>'
								
						
					html +=	'</div>'
					html +='</div>'
				/*$message.open("파일업로드", $("#multiPartFileForm").html(),function(){$myDataCreate.ui.setMultiPartFile});*/
				$message.open("파일업로드", html,function(){$myDataCreate.ui.setMultiPartFile()});
				/*$("select[name='input_coord_by_geom']").styler({});*/
			}else if(type=="TEXT"){
				
				var html ='<div id="oneTEXTForm" class="partForm">' 
					html +=	'<div class="fileBox">'
					html +=		'<ul>'
					html +=			'<li id="modalText">'
					html +=				'<input class="modalInp" type="text" id="modalTEXTText" placeholder="파일을 선택해 주세요" readonly="readonly"><button  class="modalButton" id="modalTEXTButton" data-type="TEXT">파일 업로드</button>'
					html +=				'<input type="file" name="oneFile" id="modalTEXTFile" style="display:none;" class="modalFile" accept=".txt,.csv">'
					html +=			'</li>'
					html +=		'</ul>'
					html +=	'</div>'		
					html +='</div>'		
				$message.open("파일업로드", html,function(){$myDataCreate.ui.setTextFile()});
			}else if(type=="EXCEL"){
				var html ='<div id="oneXLSXForm" class="partForm">'
					html +=	'<div class="fileBox">'
					html +=		'<ul>'
					html +=			'<li id="modalXLSX">'
					html +=				'<input class="modalInp" type="text" id="modalXLSXText" placeholder="파일을 선택해 주세요" readonly="readonly"><button  class="modalButton" id="modalXLSXButton" data-type="XLSX">파일 업로드</button>'
					html +=				'<input type="file" name="oneFile" id="modalXLSXFile" style="display:none;"class="modalFile" accept=".xlsx">'
					html +=			'</li>'
					html +=		'</ul>'
					html +=	'</div>'
					html +='</div>'
				
				$message.open("파일업로드", html,function(){$myDataCreate.ui.setXlsxFile()});
			}
			
			$('.modalButton').styler({
				button: { 
					
				}
			});
		},
		
		
		

		/**
		 * 
		 * @name : selectDataType
		 * @description : 데이터 선택하기
		 * @date : 2018.08.01
		 * @author :
		 * @history :
		 */
		selectDataType : function(type) {
			$('input:radio[name="data_type"]').attr('checked', false);
			if(type == "SHP" || type == "DBF" || type == "SHX"){
				$('input:radio[name="data_type"]').filter('[value="SHP"]')
				.attr('checked', "checked");
				$('input:radio[name="data_type"]').filter('[value="SHP"]')
				.prop('checked', "checked");
			}else{
				$('input:radio[name="data_type"]').filter('[value="' + type + '"]')
				.attr('checked', "checked");
				$('input:radio[name="data_type"]').filter('[value="' + type + '"]')
				.prop('checked', "checked");
			}
			

			/*switch (type) {
			case "TEXT":
				$('#oneFile').attr('accept', '.txt, .csv');
				break;
			case "EXCEL":
				$('#oneFile').attr('accept', '.xlsx');
				break;
			case "SHP":
				$("#shpFile").attr('accept', '.shp');
				$("#dbfFile").attr('accept', '.dbf');
				$("#shxFile").attr('accept', '.shx');
				break;
			case "DBF" :
				$("#shpFile").attr('accept', '.shp');
				$("#dbfFile").attr('accept', '.dbf');
				$("#shxFile").attr('accept', '.shx');
				break;
			case "SHX" :
				$("#shpFile").attr('accept', '.shp');
				$("#dbfFile").attr('accept', '.dbf');
				$("#shxFile").attr('accept', '.shx');
				break;
			}*/

			/*if (type == "TEXT" || type == "EXCEL") {
				$('input:file[name="oneFile"]').trigger("click");
			} else {
				if(type =="SHP"){
					$('#shpFile').trigger("click");
				}else if(type =="DBF"){
					$('#dbfFile').trigger("click");
				}else if(type =="SHX"){
					$('#shxFile').trigger("click");
				}
			}*/

		},


	}
	$myDataCreate.request = {
		interval : null,
		
		dataNameExists : function(dataName , user_id){
			
		 
			
		
			
			
		},

		previewData : function(callback, startLine, endLine) {
			$("#dataForm").ajaxForm(
					{
						type : "POST",
						url : contextPath +"/api/myData/previewData.do",
						contentType : "application/json",
						dataType : "json",
						data : {
							startLine : startLine,
							endLine : endLine
						},
						beforeSend : function(){
							$mask.show();
						},
						success : function(res) {
							callback(res.result.type, res.result.metaDataList, res.result.header,
									res.result.headerList);
						},
						error : function(xhr, textStatus, error) {

						},
						complete : function(data) {
							$mask.hide();
						}
					}).submit();

		},

		createTable : function() {
			var columnGridData = $myDataCreate.ui.getColumnGridData();

			$("#dataForm").ajaxForm(
					{
						type : "POST",
						url : contextPath +"/api/myData/createTable.do",
						contentType : "application/json",
						dataType : "json",
						data : {
							columnGridData : JSON.stringify(columnGridData)
						},
						beforeSend : function(){
							$mask.show();
						},
						success : function(res) {
							// mng_s 2019. 06. 03 j.h.Seok
							var log_param = "";
							
							$mask.hide();
							console.log(res.errCd);
							
							if(res.data_type == "SHP"){
								// mng_s 2019. 06. 04 j.h.Seok
								log_param += "File_type - " + res.data_type;
//								log_param += ", Table_name - " + res.result.table_name;
								$log.srvLogWrite("Z0", "03", "01", "02", "", log_param);
								
								//$myDataCreate.request.shapeFileGeomChange();
								location.href = contextPath + "/view/myData/myDataManagement"
							}else{
								if (res.result != {}) {
									console.log(res);
									
									try{
										// mng_s 2019. 06. 04 j.h.Seok
										log_param += "File_type - " + res.data_type;
										log_param += ", Table_name - " + res.result.table_name;
										$log.srvLogWrite("Z0", "03", "01", "02", "", log_param);
										
										var tableName = res.result.table_name;
										var resourceId = res.result.resource_id;
										var schema = res.result.schema;
										$("#gridGeoCodingTable").data("resource_id",resourceId);
										$("input[name='schema']").val(schema);
										$myDataCreate.request.preViewTable(schema,tableName, resourceId);
										$myDataCreate.request.getColumnInfos(schema,tableName);
									}catch(e){
										console.log(e);
										console.log("error 발생");
										
										$myDataCreate.event.prevStep("3");
										$message.open("알림","데이터 생성중 오류가 발생 하였습니다.");
										
									}
									
									
								}
							}
							

						},
						error : function(xhr, textStatus, error) {
							console.log(error);
							$message.open('알림', "테이블 생성이 실패 하였습니다.");
						},
						complete : function(data) {
							$mask.hide();
						}
					}).submit();
		},
		
		shapeFileGeomChange : function(){
			var data = {
					geoCodingType : "geom",
					output_table_name : $("input[name='output_table_name']").val(),
					geom_column : "geom",
					input_coord_by_geom : $("input[name='shp_coord_by_geom']").val(),
					shp_enc_type : $("input[name='shp_enc_type']").val(),
					cm : ""
			};
			
			$.ajax({
				type : "POST",
				url : contextPath +"/api/myData/geoCoding.do",
				dataType : "json",
				data : data,
				beforeSend :  function(){
					
				},
				success : function(res) {
					
				},
				error : function(xhr, textStatus, error) {
					
				},
				complete : function(data) {
					
				}
				
			});
		},

		preViewTable : function(schema, table_name, resource_id) {
			$.ajax({
				type : "POST",
				url : contextPath +"/api/myData/preViewTable.do",
				data : {
					schema : schema,
					table_name : table_name,
					resource_id : resource_id,
					view_cnt : 5
				},
				beforeSend :  function(){
					$mask.show();
				},
				success : function(res) {
					var columnInfo = $.parseJSON(res.result.resourceInfo.kor_column_desc);
					var rowList = res.result.resourceTable;
					var resourceInfo = res.result.resourceInfo
					$myDataCreate.ui.geoCodingTableGrid(rowList, columnInfo,
							resourceInfo);
				},
				error : function(xhr, textStatus, error) {
					console.log(error);
					$message.open('알림', "테이블 생성에 실패하였습니다.<br> 각 행의 열의 개수가 다른지 확인 해 주세요.");
				},
				complete : function(data) {
					$mask.hide();
					$myDataCreate.event.geoCodingColumnClick("addr");
				}
			});
		},

		geoCoding : function(type , cm) {
			var data = {};
			var tot_boolean = $("input[name='tot_boolean']").val();
			if (tot_boolean == "on") {
				tot_boolean = true;
			} else {
				tot_boolean = false;
			}

			// mappingMethod 는 SOP sop_api, SOP + DAUM sop_api,daum_api
			// input_coord => utm-k 5179 TM서부 5180 TM중부 5181 TM동부 5183 TM동해 5184
			// TM서부 5185 TM중부 5186
			// tot_boolean = > 집계구 정보
			// base_boolean = > 기초 단위구 true
			// bnd_cd_level 행정동레벨 선택 시도 SIDO 시군구 SGG 읍면동 DONG
			// input_coord_by_geom utm-k 5179 TM서부 5180 TM중부 5181 TM동부 5183 TM동해
			// 5184 TM서부 5185 TM중부 5186 경위도 WGS84 4326 WGS84 4166 KATEC 5178
			
			
			if (type == "addr") {
				data = {
					geoCodingType : type,
					mappingMethod : $("select[name='mappingMethod']").val(),
					base_boolean : true,
					tot_boolean : tot_boolean,
					addr_column : $("select[name='selectColumn']").eq(0).val()
				};
			} else if (type == "xy") {

				var x_column = $("select[name='selectColumn']").eq(0).val();
				var y_column = $("select[name='selectColumn']").eq(1).val();

				data = {
					geoCodingType : type,
					x_column : x_column,
					y_column : y_column,
					input_coord : $("select[name='input_coord']").val(),
					output_coord : "UTMK",
					base_boolean : true,
					tot_boolean : tot_boolean,
				};
			} else if (type == "geom") {
				data = {
					geoCodingType : type,
					geom_column : $("select[name='selectColumn']").eq(0).val(),
					input_coord_by_geom : $(
							"select[name='input_coord_by_geom']").val(),

				};
			} else if (type == "admCd") {
				data = {
					geoCodingType : type,
					bnd_cd_column : $("select[name='selectColumn']").eq(0).val(),
					bnd_cd_level : $("select[name='bnd_cd_level']").val(),
					base_boolean : true,
					tot_boolean : tot_boolean,

				};
			}
			data.cm = cm;
			
			
			if(cm != '' || cm != null){
				var ridArray = new Array();
				var checkRids = $("input[name='checkRid']");
				
				for(var i = 0 ; i < checkRids.length; i++){
					if($("input[name='checkRid']").eq(i).parent().hasClass("checked")){
						ridArray.push($("input[name='checkRid']").eq(i).data("rid"));
					}
					
				}
				console.log(ridArray);
				data.rids = ridArray.join(",");
			}
			
			
			$myDataCreate.ui.model.geoCodingType = type;

			$("#dataForm")
					.ajaxForm(
							{
								type : "POST",
								url : contextPath +"/api/myData/geoCoding.do",
								//contentType : "application/json",
								dataType : "json",
								data : data,
								success : function(res) {
									
									var log_param = "Table_name - " + res.result.TABLE_NAME;
									log_param += ", Input_coord - " + res.result.INPUT_COORD;
									log_param += ", Output_coord - " + res.result.OUTPUT_COORD;
									$log.srvLogWrite("Z0", "03", "01", "04", "", log_param);
									
									$myDataCreate.request.interval = setInterval(
											function() {
												$myDataCreate.request
														.checkMappingCoord(
																$myDataCreate.ui.geoCodingCheckProcess,
																res.result.EXECUTE_ID);
											}, 5000)

								},
								beforeSend : function(){
									$mask.show();
								},
								error : function(xhr, textStatus, error) {
									console.log(error);
									$mask.hide();
								},
								complete : function(data) {
									$mask.hide();
								}
							}).submit();
		},

		checkMappingCoord : function(evt, execute_id) {
			$.ajax({
				url : contextPath +"/api/myData/checkMapping.do",
				type : "POST",
				beforeSend : function(xhr, opts) {

				},
				data : {
					execute_id : execute_id
				},
				
				beforeSend : function(){
					
				},
				success : function(res) {

					var state = res.result.STATE;

					if (state != "RUNNING") {
						if (state == "END") {
							clearInterval($myDataCreate.request.interval);
							var talbeName = res.result.DATA_NAME;
							var schema = res.result.USER_ID;
							var resourceId = res.result.OUTPUT_RESOURCE_ID;

							//화면 초기화
							
							$("#resultStatusTab > li > a").eq(0).addClass("on");
							$("#resultStatusTab > li > a").eq(1).removeClass("on");
							//model 값 설정
							$myDataCreate.ui.model.schema  = schema;
							$myDataCreate.ui.model.tableName  = talbeName;
							$myDataCreate.ui.model.resource_id = resourceId;
							$myDataCreate.ui.model.listStatus = true;
							$myDataCreate.ui.model.currentPage = 1;
							
							$myDataCreate.request.selectResourceInfo(schema,
									talbeName, resourceId, 0, $(
											"select[name='geoCodingViewCnt']")
											.val(),
									$myDataCreate.ui.geoCodingResultGrid);
						}
					} else {
						// PRECENT 체크
						var mapping_count = res.result.CUR_CNT;
						var total_count = res.result.MAX_CNT;
						
						try{
							$("#sCount").html(mapping_count);
							$("#totalResultCount").html(total_count);
							var percent = ( parseInt( mapping_count, 10 ) / parseInt( total_count, 10 ) ) * 100;
							$("#resultPercent").html(parseInt(percent) + "%");
						}catch(err){
							console.log( '진행율 체크 오류 ', err );
						}
					}
				},
				error : function(xhr, textStatus, error) {
					console.log(error);
					$mask.hide();
					clearInterval($myDataCreate.request.interval);
					$message.open('알림', "지오코딩 도중 에러가 발생 하였습니다.");
				},
				complete : function(data) {
					$mask.hide();
				}

			});
		},

		selectResourceInfo : function(schema, talbeName, resource_id, startIdx,
				resultCnt, callback) {

			$.ajax({
				url : contextPath +"/api/myData/selectResourceInfo.do",
				type : "POST",
				data : {
					schema : schema,
					data_nm : talbeName,
					resultCnt : Number(startIdx) + Number(resultCnt),
					startIdx : startIdx,
					resource_id : resource_id,
					status : $myDataCreate.ui.model.listStatus
				},
				
				beforeSend : function(){
					$mask.show();
				},
				success : function(res) {
					console.log(res);
					// callback

					// res.resource
					// res.info
					$myDataCreate.ui.geoCodingResultGrid(res.data.resource,
							res.data.info,
							res.successResult.successInfo.scount,
							res.successResult.successInfo.fcount);

				},
				error : function(xhr, textStatus, error) {
					console.log(error);
				},
				complete : function(data) {
					$mask.hide();
				}
			});
		},
		
		updateRecordColumnData : function(rid){
			//지오코딩에 사용한 컬럼값과 수정한 컬럼 값을 가지고 와서
			//먼저 값을 수정후 해당 행을 지오코딩 해줘야 한다.
			
			
			//$myDataCreate.ui.model.schema 
			//$myDataCreate.ui.model.tableName
			//$myDataCreate.ui.model.resource_id
			//$myDataCreate.ui.model.geoCodingType
			
			//$("select[name='selectColumn']").eq(0).val()
			
			var data = {
					schema : $myDataCreate.ui.model.schema,
					data_nm : $myDataCreate.ui.model.tableName,
					rid : rid,
					resource_id : $myDataCreate.ui.model.resource_id,
					geoCodingType : $myDataCreate.ui.model.geoCodingType
			};
			
			
			
			if($myDataCreate.ui.model.geoCodingType == "xy"){
				data.x_column = $("select[name='selectColumn']").eq(0).val();
				data.y_column = $("select[name='selectColumn']").eq(1).val();
				data.x_value = $("#fixDataX_"+rid).val();
				data.y_value = $("#fixDataY_"+rid).val();
			}else{
				data.input_coord = $("select[name='selectColumn']").eq(0).val();
				data.fix_value = $("#fixData_"+rid).val();
			}
			console.log(data);
			$.ajax({
				url : contextPath +"/api/myData/updateRecordColumnData.do",
				type : "POST",
				data : data,
				success : function(res) {
					//변경이 완료 되면 
					$message.open('알림', "변경 되었습니다.");

				},
				beforeSEnd : function(){
					$mask.show();
				},
				error : function(xhr, textStatus, error) {
					console.log(error);
					$message.open('알림', "변경이 실패 하였습니다.");
				},
				complete : function(data) {
					$mask.hide();
				}
			});
		},

	// geoCodingResultGrid
		
		/**
		 * 
		 * @name         : deleteDatas
		 * @description  : 데이터 삭제
		 * @date         : 2018. 07. 13. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		deleteDatas : function(deleteDatas){
			console.log(deleteDatas);
			var options = {
					isBeforSend : true,
					params : {
						datas : deleteDatas
					}
			}
			
			$ajax.requestApi(contextPath+"/api/myData/deleteMyDataList.do",options,function(res){
				switch(parseInt(res.errCd)){
				case 0 : 
					
					break;
				case -100 : 
					$message.open("오류", "오류가 발생 하였습니다.");
					//새로고침
					break;
				default : 
					break;
				}
			});
			
		},
		/**
		 * 
		 * @name         : deleteErrorMyData
		 * @description  : 데이터 삭제
		 * @date         : 2018. 07. 13. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		deleteErrorMyData : function(dataNm){
			var options = {
					isBeforSend : true,
					params : {
						data_nm : dataNm
					}
			}
			
			$ajax.requestApi(contextPath+"/api/myData/deleteErrorMyData.do",options,function(res){
				switch(parseInt(res.errCd)){
				case 0 : 
					
					break;
				case -100 : 
					$message.open("오류", "오류가 발생 하였습니다.");
					//새로고침
					break;
				default : 
					break;
				}
			});
		},
		
		/**
		 * 
		 * @name         : getColumnInfos
		 * @description  : 물리 컬럼 정보 가져오기
		 * @date         : 2018. 07. 13. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		getColumnInfos : function(schema,data_nm){
			console.log("됨?");
			var options = {
					isBeforSend : false,
					params : {
						data_nm : data_nm,
						schema : schema
					}
			}
			
			
			$ajax.requestApi(contextPath+"/api/myData/columnInfo.do",options,function(res){
				switch(parseInt(res.errCd)){
				case 0 : 
					
					var result = JSON.stringify(res.result);
					$("input[name='columnInfos']").val(result);
					break;
				case -100 : 
					$message.open("오류", "오류가 발생 하였습니다.");
					//새로고침
					break;
				default : 
					break;
				}
			});
			
			
			
		},
		
		
	}
}(window, document));