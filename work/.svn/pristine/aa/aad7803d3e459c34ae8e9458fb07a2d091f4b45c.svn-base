/**
 * 
 */

(function(W,D){
	W.$myDataDetailGeoCoding = W.$myDataDetailGeoCoding || {};
	
	
	$myDataDetailGeoCoding.ui = {
			model : {
				info : null,
				schema : null,
				data_nm : null,
				resultCnt : null,
				startIdx : null,
				resource_id : null,
				status : null,
				currentPage : 1,
				pos_column_desc : null,
				kor_column_desc : null,
			},
			
			/**
			 * 
			 * @name : setPosColumn
			 * @description : 지오코딩 정보 생성
			 * @date : 2018.08.01
			 * @author :
			 * @history :
			 */
			setPosColumn : function(){
				var info = $myDataDetailGeoCoding.ui.model.info;
				$myDataDetailGeoCoding.ui.model.kor_column_desc = JSON.parse(info.kor_column_desc);
				if(info.pos_column_desc != undefined){
					var poseDesc = JSON.parse(info.pos_column_desc); 
					var posList = poseDesc.pos_col_infos;
					var posColumn = {};
					console.log(posList);
					if(posList.length > 0){
						posColumn = posList[0];
						$myDataDetailGeoCoding.ui.model.pos_column_desc = posColumn;
					}else{
						posColumn = null;
					}
				}
				
				
				
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
				
				var mappingStatus = $myDataDetailGeoCoding.ui.model.listStatus; //true , false
				var totalCount = Number(scount) + Number(fcount)
				$("#sCount").text(scount);
                $("#totalResultCount").text(totalCount);
                
                var per = Math.floor((scount / totalCount) * 100);
                $("#resultPercent").text(per + "%");

				
				/*var sColumn = $("select[name='selectColumn']");*/
				//pos_column_info 에서 꺼내와야 한다.
				var sColumn = null;
				if($myDataDetailGeoCoding.ui.model.pos_column_desc != null){
					sColumn = $myDataDetailGeoCoding.ui.model.pos_column_desc.pos_columns.split(',');
				}
				/*var sColumn = ["item5","item6"];*/
				var html ='<table class="listTable01">';
				if(mappingStatus == true){
					html += '<colgroup><col width="80"/><col width="580"/><col width="80"/></colgroup>';
					html += '<thead>';
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

				
				
				for (var i = 0; i < resource.length; i++) {
					// 성공 여부 실패 여부
					var rid = 0;
					if (resource[i].rid != undefined) {
						rid = resource[i].rid;
					} else {
						rid = resource[i].gid;
					}
					
					html += '<tr>';
					if(mappingStatus == false){
						html += '<td><input type="checkbox" name="checkRid" class="chkEtc" data-rid="'+rid+'"/></td>'
					}
					
					
					html += '<td>' + rid + '</td>';
					var strArray = new Array();
					for (var j = 0; j < sColumn.length; j++) {
						var colName = sColumn[j].toLowerCase();
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
						if($myDataDetailGeoCoding.ui.model.geoCodingType == "xy"){
							
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

						html += '<td>' + '<div class=""><a href="javascript:$myDataDetailGeoCoding.request.updateRecordColumnData('+rid+')">변경</a></div>'+ '</td>';
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
					var page = $myDataDetailGeoCoding.ui.model.currentPage;
					var showPageCount = 10;
					var showList = Number($("#geoCodingViewCnt").val());
					// var showList = 5;
					console.log(total);
					console.log(showList);
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
					
					console.log("endPage = " + endPage);
					console.log("totalPageCount = " + totalPageCount);
					
					if (endPage > totalPageCount) {
						endPage = totalPageCount;
					}
					html = "<span id='pageNavigation'>";
					if (startPage == 1) {

					} else {
						html += "<a class='number' data-type='firstPage' data-id=" + 1 + " href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+  1 + ")'>"
						html += "《</a>";
						html += "<a class='number' data-type='prevPage' data-id="+ Number(Number(startPage) - 1) + "href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+  Number(Number(startPage) - 1) + ")'>"
						html += "&lt;</a>";
					}

					for (var i = startPage; i <= endPage; i++) {
						var active = "";
						if (i == page) {
							html += "<a class='number current' href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+ i + ")' title='Page " + i + "' >" + i + "</a>";
						}else{
							html += "<a class='number' href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+ i + ")' title='Page " + i + "' >" + i + "</a>";
						}
					}
					if (endPage == totalPageCount) {

					} else {
						html += "<a class='number' data-type='nextPage' data-id="+ Number(Number(endPage) + 1) + "href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+  Number(Number(endPage) + 1) + ")'>"
						html += "&gt;</a>";
						html += "<a class='number' data-type='lastPage' data-id="+ totalPageCount + "href='javascript:$myDataDetailGeoCoding.ui.pageResourceInfo("+  totalPageCount + ")'>"
						html += "》</a>";
					}

					html += "</span>";
				}
				

				$("#geoCodingResultPaging").html(html);
				
				if (mappingStatus == false) {
					console.log("false 일때 수정 사항");
					
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
					
					
				}
				

			},
			
			pageResourceInfo : function(pageIdx){
				
				$myDataDetailGeoCoding.ui.model.currentPage = pageIdx;
				var showListCount =$("#geoCodingViewCnt").val();
				var startIdx =  showListCount * (pageIdx -1);
				$myDataDetailGeoCoding.request.selectResourceInfo($myDataDetailGeoCoding.ui.model.schema,$myDataDetailGeoCoding.ui.model.data_nm,$myDataDetailGeoCoding.ui.model.resource_id, startIdx, $("#geoCodingViewCnt").val());
				
			},
			
			geoCodingModifySetting : function(){
				
				var posMethod = $myDataDetailGeoCoding.ui.model.pos_column_desc.pos_method;
				var type = "";
				var html = "";
				console.log(posMethod);
				switch(posMethod){
				case "MAPPING":
					type = "addr";
					html += '<div class="addressBox"><span>매핑 방식 선택</span>';
					html += '<select class="select" name="mappingMethod">';
					html += '<option value="sop_api">SOP</option>';
					
					if (userdiv != "s")	{
						html += '<option value="sop_api,daum_api">SOP + DAUM</option>';
					}
						
					html += '</select>';
					html += '</div>';

					html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc geoCheck">집계구</p>'
					html += '<p class="etctxt01">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
					break;
				case "COORD":
					type = "xy";
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
					html += '</select>';
					html += '<a href="javascript:void(0)" class="btnHelp"><img src="'+contextPath +'/img/common/btn_help.png" /></a>';
					html += '</li>';
					html += '</ul>';
					html += '</div>';
					html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc geoCheck">집계구</p>'
					html += '<p class="etctxt01">* SGIS pro는 UTM-K좌표계를 사용합니다. </p>';
					html += '<p class="etctxt01">* 현재 좌표계가 UTM-K좌표계가 아닌 경우 UTM-K로 변환됩니다.</p>';
					html += '<p class="etctxt01 mt30">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
						
					break;
				case "GEOM":
					type = "geom";
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
					html += '<option value="4326">WGS84 (4326)</option>';
					html += '<option value="4166">WGS84 (4166)</option>';
					html += '<option value="5178">KATEC (5178)</option>';
					html += '<option value="5174">TM중부  (5174)</option>';
					html += '</select>';
					html += '<a href="javascript:void(0)" class="btnHelp"><img src="'+contextPath +'/img/common/btn_help.png" /></a>';
					html += '</li>';
					html += '</ul>';
					html += '</div>';
					html += '<p class="etctxt01">* SGIS pro는 UTM-K좌표계를 사용합니다. </p>';
					html += '<p class="etctxt01">* 현재 좌표계가 UTM-K좌표계가 아닌 경우 UTM-K로 변환됩니다.</p>';
					html += '<p class="etctxt01 mt30">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
					break;
				case "BND":					
					html += '<div class="addressBox"><span>행정동 레벨</span><select class="select" name="bnd_cd_level"><option value="SIDO">시도</option><option value="SGG">시군구</option><option value="DONG">읍면동</option></select></div>';
					html += '<p class="etctxt01"><input name="tot_boolean" type="checkbox" class="chkEtc geoCheck">집계구</p>';
					html += '<p class="etctxt01">* 위치정보 변환 완료 후 집계구(tot_oa_cd). 집계구 중심점(mapping_status), 위치정보 생성 결과(0:실패/1:성공), 위치정보 생성결과(mapping_result) 컬럼이 추가됩니다.</p>';
					type = "admCd";
					break;
				}
				//type
				//MAPPING => addr
				//COORD =>xy
				//GEOM => geom
				//BND => admCd
				$myDataDetailGeoCoding.ui.model.geoCodingType = type;
				$("#editBox").html(html);
				
				$('.select, .geoCheck').styler({});
				$('.jq-checkbox').css("top","0px");
				
			},
			
	}
	
	$myDataDetailGeoCoding.event = {
			setUIEvent : function(){
				$(".tabBox a").off().on("click",function(){
					$(".tabBox a").removeClass("on");
					$(this).addClass("on");
					
					
					var statusTab = $("#resultStatusTab > li");
					for (var i = 0; i < statusTab.length; i++) {
						if ($(statusTab[i]).find("a").hasClass("on")) {
							if (i == 0) {
								$("#geoCodeFixButton").hide();
								/*$("#analysisButton").show();*/
								$("#geoCodingModifyButton").hide();
								$("#editBox").hide();
								$myDataDetailGeoCoding.ui.model.listStatus = true;
							} else if (i == 1) {
								$("#geoCodeFixButton").show();
								/*$("#analysisButton").hide();*/
								$("#geoCodingModifyButton").show();
								$myDataDetailGeoCoding.ui.model.listStatus = false;
								$("#editBox").show();
								$myDataDetailGeoCoding.ui.geoCodingModifySetting();
								
								
							}
						}
					}
					
					$myDataDetailGeoCoding.request.selectResourceInfo($myDataDetailGeoCoding.ui.model.schema,$myDataDetailGeoCoding.ui.model.data_nm,$myDataDetailGeoCoding.ui.model.resource_id, 0, $("#geoCodingViewCnt").val());
					
				});
				
				$("#viewMap").off().on("click",function(){
					window.open(contextPath+"/view/myData/resultMap?resource_id="+$myDataDetailGeoCoding.ui.model.resource_id);
				});
				
				$("#moveMyData").off().on("click",function(){
					location.href = contextPath+"/view/myData/myDataDetail?resource_id="+$myDataDetailGeoCoding.ui.model.resource_id;
				});
				
				$("#geoCodingModifyButton").off().on("click",function(){
					
					var posMethod = $myDataDetailGeoCoding.ui.model.pos_column_desc.pos_method;
					var type = "";
					switch(posMethod){
					case "MAPPING":
						type = "addr";
						break;
					case "COORD":
						type = "xy";
						break;
					case "GEOM":
						type = "geom";
						break;
					case "BND":
						type = "admCd";
						break;
					}
					//type
					//MAPPING => addr
					//COORD =>xy
					//GEOM => geom
					//BND => admCd
					
					
					$myDataDetailGeoCoding.request.geoCoding(type , "/modify");
				});
			},
			
			
	}
	
	$myDataDetailGeoCoding.request = {
			selectResourceInfo : function(schema, talbeName, resource_id, startIdx,
					resultCnt) {

				$.ajax({
					url : contextPath +"/api/myData/selectResourceInfo.do",
					type : "POST",
					data : {
						schema : schema,
						data_nm : talbeName,
						resultCnt : Number(startIdx) + Number(resultCnt),
						startIdx : startIdx,
						resource_id : resource_id,
						status : $myDataDetailGeoCoding.ui.model.listStatus
					},
					
					beforeSend : function(){
						$mask.show();
					},
					success : function(res) {
						console.log(res);

						$myDataDetailGeoCoding.ui.geoCodingResultGrid(res.data.resource,
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
				var pos_columns = $myDataDetailGeoCoding.ui.model.pos_column_desc.pos_columns;
				var data = {
						schema : $myDataDetailGeoCoding.ui.model.schema,
						data_nm : $myDataDetailGeoCoding.ui.model.data_nm,
						rid : rid,
						resource_id : $myDataDetailGeoCoding.ui.model.resource_id,
						geoCodingType : $myDataDetailGeoCoding.ui.model.geoCodingType
				};
				
				
				//selectColumn 대체 하게 끔 변경 필요
				if($myDataDetailGeoCoding.ui.model.geoCodingType == "xy"){
					data.x_column = pos_columns.split(",")[0];
					data.y_column = pos_columns.split(",")[1];
					data.x_value = $("#fixDataX_"+rid).val();
					data.y_value = $("#fixDataY_"+rid).val();
				}else{
					data.input_coord = pos_columns;
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
			
			
			//type
			//MAPPING => addr
			//COORD =>xy
			//GEOM => geom
			//BND => admCd
			
			geoCoding : function(type , cm) {
				var data = {};
				var tot_boolean = $("input[name='tot_boolean']").parent().hasClass("checked");
				if (tot_boolean == true) {
					tot_boolean = true;
				} else {
					tot_boolean = false;
				}
				var ridArray = new Array();
				var checkRids = $("input[name='checkRid']");
				
				for(var i = 0 ; i < checkRids.length; i++){
					if($("input[name='checkRid']").eq(i).parent().hasClass("checked")){
						ridArray.push($("input[name='checkRid']").eq(i).data("rid"));
					}
					
				}
				
				if (ridArray == null || ridArray.length == 0) {
					$message.open("알림","지오코딩 대상이 선택되지 않았습니다.");
					return;
				}
				
				var pos_columns = $myDataDetailGeoCoding.ui.model.pos_column_desc.pos_columns;
				
				if (type == "addr") {
					data = {
						geoCodingType : type,
						mappingMethod : $("select[name='mappingMethod']").val(),
						base_boolean : true,
						tot_boolean : tot_boolean,
						addr_column : pos_columns
					};
				} else if (type == "xy") {
					
					var x_column = pos_columns.split(",")[0];
					var y_column = pos_columns.split(",")[1];

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
						geom_column : pos_columns,
						input_coord_by_geom : $(
								"select[name='input_coord_by_geom']").val(),

					};
				} else if (type == "admCd") {
					data = {
						geoCodingType : type,
						bnd_cd_column : pos_columns,
						bnd_cd_level : $("select[name='bnd_cd_level']").val(),
						base_boolean : true,
						tot_boolean : tot_boolean,

					};
				}
				data.cm = cm;
				data.output_table_name = $myDataDetailGeoCoding.ui.model.data_nm;
				
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
				
				
				
				$.ajax(
						{
							type : "POST",
							url : contextPath +"/api/myData/geoCoding.do",
							dataType : "json",
							data : data,
							success : function(res) {
								$myDataDetailGeoCoding.request.interval = setInterval(
										function() {
											$myDataDetailGeoCoding.request
													.checkMappingCoord(
															$myDataDetailGeoCoding.ui.geoCodingCheckProcess,
															res.result.EXECUTE_ID);
										}, 5000)

							},
							beforeSend : function(){
								$mask.show();
							},
							error : function(xhr, textStatus, error) {
								console.log(error);
								$mask.hide();
								$message.open("알림","지오코딩이 실패 하였습니다.");
							},
							complete : function(data) {
								$mask.hide();
							}
						});
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
								clearInterval($myDataDetailGeoCoding.request.interval);
								var talbeName = res.result.DATA_NAME;
								var schema = res.result.USER_ID;
								var resourceId = res.result.OUTPUT_RESOURCE_ID;

								//화면 초기화
								
								/*$("#resultStatusTab > li > a").eq(0).addClass("on");
								$("#resultStatusTab > li > a").eq(1).removeClass("on");*/
								
								//model 값 설정
								/*$myDataDetailGeoCoding.ui.model.schema  = schema;
								$myDataDetailGeoCoding.ui.model.tableName  = talbeName;
								$myDataDetailGeoCoding.ui.model.resource_id = resourceId;*/
								/*$myDataDetailGeoCoding.ui.model.listStatus = true;
								$myDataDetailGeoCoding.ui.model.currentPage = 1;*/
								
								/*$myDataDetailGeoCoding.request.selectResourceInfo(schema,
										talbeName, resourceId, 0, $(
												"select[name='geoCodingViewCnt']")
												.val(),
										$myDataDetailGeoCoding.ui.geoCodingResultGrid);*/
								
								$("#resultStatusTab > li").eq(0).find("a").trigger("click");
							}
						}
					},
					error : function(xhr, textStatus, error) {
						console.log(error);
						$mask.hide();
						clearInterval($myDataDetailGeoCoding.request.interval);
						$message.open('알림', "지오코딩 도중 에러가 발생 하였습니다.");
					},
					complete : function(data) {
						$mask.hide();
					}

				});
			},
			
			
			
	}
	
}(window, document));