
(function(W,D){
	W.$dataCreateMain = W.$dataCreateMain || {};
	$(document).ready(function(){
		$dataCreateMain.event.setUIEvent();
		var resultCnt = $("#cntSelectBox").val();
		$dataCreateMain.request.doReqMyDataList(0,resultCnt,$dataCreateMain.ui.gridMyDataList);
	});
	
	//UI 내용작성
	$dataCreateMain.ui = {
			
			currentPage : 1,
			uploadData : null,
			
			table_id : null,
			relation_id : null,
			
			/**
			 * 
			 * @name         : fileChange
			 * @description  : 파일 읽기 전 파일이 올라와 있는지 검사후 읽기 호출
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			fileChange: function (obj) {
				var bool = true;
				for(var i = 0 ; i < obj.length; i++){
					if(obj.val() == null || obj.val() ==""){
						bool = false;
					}
				}
				
				if(bool == true){
					$dataCreateMain.ui.fileRead(obj);
				}
			},
			
			/**
			 * 
			 * @name         : oneFileCheck
			 * @description  : 파일 업로드 파일 값 변경
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			oneFileCheck : function(obj){
				var self = obj;
				var file_path = $(self).val();
				var file_accept = '';
				var file_nm = '';
				file_nm = file_path.substring(file_path.lastIndexOf('\\') + 1, file_path.length);
				$("#file_path").val(file_nm);
				$dataCreateMain.ui.file_nm = file_nm;
			},
			
			/**
			 * 
			 * @name         : shpFileCheck
			 * @description  : shp파일 업로드시 유효성 검사
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			shpFileCheck : function(obj){
				var files = $("input[name='multiPartFile']");
				var blank = true;
				var fileNmArray = new Array();
				for(var i = 0 ; i < files.length;i++){
					var target = $(files[i]).val();
					
					if(target != null && target !=""){
						var name = target.substring(target.lastIndexOf('\\') + 1, target.length);
						fileNmArray.push(name);
						
						for(var j = 0; j < fileNmArray.length; j++){
							var fName = fileNmArray[j].split(".")[0];
							if(fName != name.split(".")[0]){
								$("#mulitPartFileShp").val("");
								$("#mulitPartFileDbf").val("");
								$("#mulitPartFileShx").val("");
								
								$("#file_path_1").val("");
								$("#file_path_2").val("");
								$("#file_path_3").val("");
								
								$message.open('알림', "SHP,DBF,SHX 파일의 이름은 동일 해야 합니다.");
								return false;
							}
						}
						
					}else{
						blank = false;
					}
				}
				
				var fileId = $(obj).attr("id");
				var name  = $(obj).val().substring($(obj).val().lastIndexOf('\\') + 1, $(obj).val().length);
				if(fileId == "mulitPartFileShp"){
					$("#file_path_1").val(name);
				}else if(fileId == "mulitPartFileDbf"){
					$("#file_path_2").val(name);
				}else if(fileId == "mulitPartFileShx"){
					$("#file_path_3").val(name);
				}
				
				return blank;
			},
			
			/**
			 * 
			 * @name         : shpFileRead
			 * @description  : shp 업로드
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			shpFileRead : function(){
				$dataCreateMain.ui.fileRead(obj);
			},
			
			/**
			 * 
			 * @name         : previewData
			 * @description  : 다음을 클릭시 데이터 업로드 후 데이터 미리보기 호출
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			//테이블 이름과 테이블 설명을 입력 하면 다음으로 넘어가 fileChange를 실행 할수 있게 한다.
			previewData : function(){
				var type = $dataCreateMain.ui.getDataType();
				
				var tableName = $("#output_table_name").val();
				var description = $("#description").val();
				
				if((tableName == null || $.trim(tableName) =="") && (description == null || $.trim(description) =="")){
					$message.open('알림', "제목과 설명을 입력해 주십시오");
				}else{
					$dataCreateMain.ui.fileChange($dataCreateMain.ui.returnFiles(type));
				}
			},
			
			/**
			 * 
			 * @name         : returnFiles
			 * @description  : 다음을 클릭시 데이터 업로드 후 데이터 미리보기 호출
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			returnFiles : function(data_type){
				var files = (( data_type == 'SHP' ) ?
	                    $('input[name="multiPartFile"]') : $('input[name="oneFile"]'));

	                return files;
			},
			
			/**
			 * 
			 * @name         : getDataType
			 * @description  : 현재 설정된 데이터 타입을 반환한다.
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getDataType : function(){
				var name = $('input:radio[name="data_type"]').filter('[checked="checked"]').val();
				return name;
			},
			
			/**
			 * 
			 * @name         : setDataType
			 * @description  : 데이터 타입 설정 및 초기화
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			setDataType : function(type){
				$('input:radio[name="data_type"]').attr('checked', false);
				$('input:radio[name="data_type"]').filter('[value="'+type+'"]').attr('checked', "checked");
				$('input:radio[name="data_type"]').filter('[value="'+type+'"]').prop('checked', "checked");
				
				switch(type){
					case "TEXT" : 
						$("#fileUpload_1").show();
						$("#fileUpload_2").hide();
						$("#oneFileUpload").show();
						$("#multiFileUpload").hide();
						$('#inputFile').attr('accept', '.txt, .csv');
						break;
					case "EXCEL" :
						$("#fileUpload_1").show();
						$("#fileUpload_2").hide();
						$("#oneFileUpload").show();
						$("#multiFileUpload").hide();
						$('#inputFile').attr('accept', '.xlsx');
						break;
					case "SHP" : 
						$("#fileUpload_1").hide();
						$("#fileUpload_2").show();
						$("#oneFileUpload").hide();
						$("#multiFileUpload").show();
						break;
				}
			},
			
			/**
			 * 
			 * @name         : fileRead
			 * @description  : 업로드한 파일을 읽은 후 그 결과를 표출
			 * @date         : 2018. 08. 21. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			fileRead : function(obj){
				var self = obj;
				var data_type = $dataCreateMain.ui.getDataType();
				var postObj = {};
				var url = '';
				console.log("data_type = " + data_type);
				if(data_type =="TEXT"){
					url = '/view/data/readText';
				}else if(data_type == "EXCEL"){
					url = '/view/data/readExcel';
				}else{
					url = '/view/data/readShp';
					//return;
				}
				console.log("data_type = " + data_type);
				postObj.name = "fileForm";
				postObj.data = {};
				
				var after = function(res){
					$dataCreateMain.ui.uploadData = res;
					console.log("res=====");
					console.log(res);
					var data_type = $dataCreateMain.ui.getDataType();
					var textArea = res.result;
					$("#file_path").val($dataCreateMain.ui.file_nm);
						if(data_type == "TEXT"){							
							$("#previewData").html(textArea);
						}else if(data_type == "EXCEL"){
							var rowList = JSON.parse(textArea);
							var html = "<table class='excelTable'>"
							for(var i = 0; i < rowList.length; i ++ ){
								
								var row = [];
								for(var key in rowList[i]){
									row[key] = rowList[i][key];
								}
								html +="<tr>"
								for(var j = 0 ; j < row.length; j++){
									html +="<td>";
									html += row[j];
									html +="</td>";
								}
								html +="</tr>"
							}
							html += "</table>"
							$("#previewData").html(html);
						}else{
							//shape 파일의 경우
							console.log("shape~~~!!");
							console.log(res);
							
							//shpList 
								//centerX, centerY geom?
							//dbfMap
								//header
								//rowList
							//shapeInfo
								//recordCount
								//shapeType
							
							var shpList = res.shpList;
							var dbfMap = res.dbfMap;
							var recordCount = res.shapeInfo.recordCount;
							var shapeType = res.shapeInfo.shapeType;
							
							var html = "<table class='excelTable'>";
							var header = dbfMap.header;
							var rowList = dbfMap.rowList;
							html +="<tr>";
							for(var i = 0; i < header.length; i++){
								html +="<td>"+header[i]+"</td>";
							}
							html +="<td>centerX</td><td>centerY</td>";
							html +="</tr>";
							
							for(var i = 0 ; i < recordCount; i++){
								html +="<tr>";
								for(var j = 0 ; j < rowList[i].length; j++){
									html +="<td>";
									html +=rowList[i][j];
									html +="</td>";
								}
								html +="<td>";
								html +=shpList[i].centerX;
								html +="</td>";
								html +="<td>";
								html +=shpList[i].centerY;
								html +="</td>";
								
								html +="</tr>";
							}
							
							html+="</table>"
							$("#previewData").html(html);
						}
				}
				$dataCreateMain.request.fileRead(url,postObj,after);
			},
			
			
			
			/**
			 * 
			 * @name         : getReqMyDataList
			 * @description  : 나의데이터 페이지 클릭
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getReqMyDataList : function(pageIdx){
				$dataCreateMain.ui.currentPage = pageIdx;
				var showListCount = $("#cntSelectBox").val();
				
				var startIdx =  showListCount * (pageIdx -1);
				var resultCnt = startIdx + Number(showListCount);
				
				$dataCreateMain.request.doReqMyDataList(startIdx,resultCnt,$dataCreateMain.ui.gridMyDataList);
			},
			
			
			/**
			 * 
			 * @name         : gridMyDataList
			 * @description  : 나의 데이터 리스트 그리기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			gridMyDataList : function(list){
				console.log("나의 데이터 리스트 그리기");
				console.log(list);
				
				var target = $("#myDataList");
				var paging = $("#myDataPage");
				var html = "";
				var total = 0;
				//글 번호 + 데이터명 row data_name
				//데이터 설명 description
				//업로드 날짜 data_create_time
				for(var i = 0; i < list.length; i++){
					html +="<div class='dataBox' onclick='$dataCreateMain.ui.getMyDataInfo(\""+list[i].resource_id+"\",\""+ list[i].relation_resource_id+"\")'>";
					html += "<div>" + list[i].row + "." + list[i].data_name + "</div>";
					html += "<div>"+list[i].description+"</div>";
					html += "<div>"+list[i].data_create_time+"</div>";
					html +="</div>";
					if(i == 0){
						total = list[i].total;
					}
				}
				
				target.html(html);
				
				//paging
				var page = $dataCreateMain.ui.currentPage;
				var showPageCount = 10;
				var showList = Number($("#cntSelectBox").val());
				//var showList = 6;
				
				var totalPageCount = Math.ceil( total / showList);
				var pageSize = Math.ceil(totalPageCount/showPageCount);
				var pageList = Math.ceil(page / showPageCount);
				if(pageList < 1){
					pageList = 1;
				}else if(pageList > pageSize){
					pageList = pageSize;
				}
				
				//시작 페이지
				var startPage = ((pageList -1)*showPageCount)+1;
				if(startPage == 0){
					startPage = 1;
				}
				//엔드페이지
				var endPage = startPage + showPageCount-1;

				if(endPage > totalPageCount ){
					endPage = totalPageCount;
				}
				html = "<ul id='pageNavigation'>";
				if(startPage == 1){
					html += "<li class='disabled' data-type='firstPage'>"
					html +="《</li>";
					html += "<li class='disabled' data-type='prevPage'>"
					html +="&lt;</li>";
				}else{
					html += "<li class='' data-type='firstPage' data-id="+1+">"
					html +="《</li>";
					html += "<li class='' data-type='prevPage' data-id="+Number(Number(startPage)-1)+">"
					html +="&lt;</li>";
				}
				
				for(var i = startPage ; i <= endPage; i++){
					var active = "";
					if( i == page){
						active = "active";
					}
					html +="<li class='"+active+"' data-id="+i+" data-type='number'>";
					html +="<a href='javascript:$dataCreateMain.ui.getReqMyDataList("+i+")' title='Page "+i+"' >"+i+"</a>";
					html +="</li>";
				}
				if(endPage == totalPageCount){
					html += "<li class='disabled' data-type='nextPage'>"
					html +="&gt;</li>";
					html += "<li class='disabled' data-type='lastPage'>"
					html +="》</li>";
				}else{
					html += "<li class='' data-type='nextPage' data-id="+Number(Number(endPage)+1)+">"
					html +="&gt;</li>";
					html += "<li class='' data-type='lastPage' data-id="+totalPageCount+">"
					html +="》</li>";
				}
				
				
				html +="</ul>";
				
				paging.html(html);
			},
			
			/**
			 * 
			 * @name         : createTable
			 * @description  : 테이블 생성
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createTable : function(){
				$dataCreateMain.request.createTable();
			},
			
			/**
			 * 
			 * @name         : createShpTable
			 * @description  : SHP 파일 을 이용한 테이블 생성
			 * @date         : 2018. 08. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createShpTable : function(){
				$dataCreateMain.request.createShpTable();
			},
			
			
			
			/**
			 * 
			 * @name         : getMyDataInfo
			 * @description  : 나의 데이터 정보 읽기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getMyDataInfo : function(data_id,relation_id){
				$dataCreateMain.request.getMyDataInfo(data_id,relation_id);
			},
			/**
			 * 
			 * @name         : gridMyDataInfo
			 * @description  : 나의 데이터 정보 그리기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			gridMyDataInfo : function(info,list,columnList){
				//var keys = $dataCreateMain.ui.listGetHeader(list[0]);
				var html = $dataCreateMain.ui.gridList(columnList,list);
				$("#myDataDetailInfo").html(html);
				var nWindow = $("#myDataDetailInfo").dialog({
								title : info.data_nm,
								width : "900px",
								height : "700px"
							});
				$(".gridTable").mCustomScrollbar({axis:"xy"});
			},
			
			/**
			 * 
			 * @name         : gridGeoCodeingTable
			 * @description  : 지오 코딩 테이블을 그린다 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			gridGeoCodeingTable : function(info,list,columnList){
				//var keys = $dataCreateMain.ui.listGetHeader(list[0]);
				var html = $dataCreateMain.ui.gridList(columnList,list.slice(0,5));
				
				$("#myDataGrid").html(html);
			},
			
			/**
			 * 
			 * @name         : listGetHeader
			 * @description  : 키값 어레이 반환
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			listGetHeader : function(list){
				var keys = new Array();
				if(list.length != 0 && list != null){
					for(var key in list){
						keys.push(key);
					}
					keys.sort();
				}
				return keys;
			},
			/**
			 * 
			 * @name         : gridList
			 * @description  : 단순 리스트 그리기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			gridList : function(keys,list){
				var html = "<div class='gridTable' style='width:99%;height:500px;'>";
				html +="<table class='excelTable' style='width:99%'>"
				html += "<thead>";
				for(var i = 0 ; i < keys.length; i++){
					html +="<th>";
					html +=keys[i].column_name;
					html +="</th>";
				}
				html += "</thead>";
				for(var i = 0 ; i < list.length ; i++){
					var row = list[i];
					html += "<tr>";
					for(var j = 0 ; j < keys.length; j++){
						html += "<td>";
						if(row[keys[j].column_name] != undefined){
							html += row[keys[j].column_name];
						}else{
							html += 'null';
						}
						
						html += "</td>";
					}
					html += "</tr>";
				}
				html +="</table>";
				html +="</div>";
				
				return html;
			},
			
			
			/**
			 * 
			 * @name         : setGeoCodingType
			 * @description  : 지오 코딩 타입을 설정한다. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			setGeoCodingType : function(value){
				//addr
				//xy
				//geom
				//admCode
				
				//
				//$("#dataUploadStep_4").show();
				
				//myDataGrid > gridTable > excelTable > thead > tr > th
				$dataCreateMain.ui.geoSettingInit();
				switch(value){
					case "addr" :
						$dataCreateMain.ui.addrSetting();
						$("#myDataGrid > .gridTable > .excelTable > thead > tr > th").off().on("click",function(){
							var item = $(this).text();
							var isD = false;
							var ths = $("#myDataGrid > .gridTable > .excelTable > thead > tr > th");
							var columns = $("#addr_column > .col-sm-2");
							
							if(columns.length > 0){
								for(var i = 0; i < columns.length; i++){
									var idVal = $(columns[i]).find("input").val();
									if(item == idVal){
										isD = true;
									}
								}
							}
							
							if(isD == false){
								var html = '<div class="col-sm-2 mb10 pz">'
									html += '	<div class="input-group">'
									html += '		<input type="text" name="column" class="form-control" value="'+item+'" readonly="">'
									html += '		<span class="input-group-btn">'
									html += '		<button class="btn btn-default btn-remove-column" type="button" onclick="$dataCreateMain.ui.clickRemoveAddr(this)">'
									html += '			<i class="fa fa-remove"></i>'
									html += '		</button>'
									html += '		</span>'
									html += '	</div>'
									html += '</div>'
									$("#addr_column").append(html);
							}
							
						});
						break;
					case "xy" : 
						$dataCreateMain.ui.xySetting();
						$("#myDataGrid > .gridTable > .excelTable > thead > tr > th").off().on("click",function(){
							console.log("xy 컬럼 선택");
							console.log(this);
						});
						break;
					case "geom" : 
						$dataCreateMain.ui.geomSetting();
						$("#myDataGrid > .gridTable > .excelTable > thead > tr > th").off().on("click",function(){
							console.log("geom 컬럼 선택");
							console.log(this);
						});
						break;
					case "admCode" : 
						$dataCreateMain.ui.admCodeSetting();
						$("#myDataGrid > .gridTable > .excelTable > thead > tr > th").off().on("click",function(){
							var item = $(this).text();
							var isD = false;
							var ths = $("#myDataGrid > .gridTable > .excelTable > thead > tr > th");
							var columns = $("#admCode_column > .col-sm-2");
							
							if(columns.length > 0){
								for(var i = 0; i < columns.length; i++){
									var idVal = $(columns[i]).find("input").val();
									if(item == idVal){
										isD = true;
									}
								}
							}
							
							if(isD == false){
								var html = '<div class="col-sm-2 mb10 pz">'
									html += '	<div class="input-group">'
									html += '		<input type="text" name="column" class="form-control" value="'+item+'" readonly="">'
									html += '		<span class="input-group-btn">'
									html += '		<button class="btn btn-default btn-remove-column" type="button" onclick="$dataCreateMain.ui.clickRemoveAddr(this)">'
									html += '			<i class="fa fa-remove"></i>'
									html += '		</button>'
									html += '		</span>'
									html += '	</div>'
									html += '</div>'
									$("#admCode_column").append(html);
							}
							
						});
						break;
				}
			},
			
			
			clickRemoveAddr : function(obj){
				$(obj).parent().parent().parent().remove();
			},
			/**
			 * 
			 * @name         : geoSettingInit
			 * @description  : 지오 코딩 설정 초기화. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			geoSettingInit : function(){
				$("#geoCodingSettingBar").html("");
			},
			
			/**
			 * 
			 * @name         : addrSetting
			 * @description  : 주소 지오 코딩 타입을 설정한다. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			addrSetting : function(){
				$("#geoCodingSettingBar").html("<div id='addr_column' class='col-sm-12 pz'></div>");
				$('input:radio[name="geoCodingType"]').attr('checked', false);
				$("#geoCodingType_addr").attr("checked",true);
				$("#geoCodingType_addr").prop('checked', "checked");
				
			},
			
			/**
			 * 
			 * @name         : xySetting
			 * @description  : xy 지오 코딩 타입을 설정한다. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			xySetting : function(){
				var ths = $("#myDataGrid > .gridTable > .excelTable > thead > tr > th");
				
				var optionHtml = "";
				
				for(var i = 0 ; i < ths.length; i ++){
					var val = $(ths[i]).text();
					optionHtml +="<option value='"+val+"'>"+val+"</option>";
				}
				
				var html = "<div>";
				html +="<span>X 좌표";
				html +="<select id='xColumn'>";
				html +=optionHtml;
				html +="</select>"
				html +="</span>";
				html +="<span>X 좌표";
				html +="<select id='yColumn'>";
				html +=optionHtml;
				html +="</select>"
				html +="</span>";
				html +="</div>";
				$("#geoCodingSettingBar").html(html);
				$('input:radio[name="geoCodingType"]').attr('checked', false);
				$("#geoCodingType_xy").attr("checked",true);
				$("#geoCodingType_xy").prop('checked', "checked");
			},
			
			/**
			 * 
			 * @name         : geomSetting
			 * @description  : geom 지오 코딩 타입을 설정한다. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			geomSetting : function(){
				var ths = $("#myDataGrid > .gridTable > .excelTable > thead > tr > th");
				var optionHtml = "";
				
				for(var i = 0 ; i < ths.length; i ++){
					var val = $(ths[i]).text();
					optionHtml +="<option value='"+val+"'>"+val+"</option>";
				}
				
				var html = "<div>";
				html +="<span>geom 컬럼";
				html +="<select id='geomColumn'>";
				html +=optionHtml;
				html +="</select>"
				html +="</span>";
				html +="</div>";
				$("#geoCodingSettingBar").html(html);
				$('input:radio[name="geoCodingType"]').attr('checked', false);
				$("#geoCodingType_geom").attr("checked",true);
				$("#geoCodingType_geom").prop('checked', "checked");
			},
			/**
			 * 
			 * @name         : admCodeSetting
			 * @description  : 행정동 지오 코딩 타입을 설정한다. 
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			admCodeSetting : function(){
				$("#geoCodingSettingBar").html("<div id='admCode_column' class='col-sm-12 pz'></div>");
				$('input:radio[name="geoCodingType"]').attr('checked', false);
				$("#geoCodingType_admCode").attr("checked",true);
				$("#geoCodingType_admCode").prop('checked', "checked");
			},
			
			
			/**
			 * 
			 * @name         : geoCodingStart
			 * @description  : 지오코딩 시작
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			geoCodingStart : function(){
				//지오코딩 타입을 찾아온다.
				//선택된 컬럼에 대한 값을 찾는다.
				var geoCodingType = $('input:radio[name="geoCodingType"]').filter('[checked="checked"]').val();
				var selectColumns = new Array();
				switch(geoCodingType){
					case "addr" :
						var addrColumns = $('input:text[name="column"]');
						for(var i = 0 ; i < addrColumns.length; i++){
							selectColumns.push($(addrColumns[i]).val());
						}
						
						break;
					case "xy" :
						//xColumn
						selectColumns.push($("#xColumn").val());
						//yColumn
						selectColumns.push($("#yColumn").val());
						break;
					case "geom" :
						//geomColumn
						selectColumns.push($("#geomColumn").val());
						break;
					case "admCode" :
						var addrColumns = $('input:text[name="column"]');
						for(var i = 0 ; i < addrColumns.length; i++){
							selectColumns.push($(addrColumns[i]).val());
						}
						
						break;
				}
				console.log(selectColumns);
				
				$dataCreateMain.request.geoCodingStart(geoCodingType,selectColumns,$dataCreateMain.table_id,$dataCreateMain.relation_id);
			},
			
			/**
			 * 
			 * @name         : checkGeoMapping
			 * @description  : 지오코딩 시작
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			
			checkGeoMapping : function(){
				
			}
			
	};
	
	//AJAX 내용작성
	$dataCreateMain.request = {
			/**
			 * 
			 * @name         : doReqMyDataList
			 * @description  : 나의데이터 정보를 조회한다.
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			doReqMyDataList : function(startIdx,resultCnt,callback){
				var options = {
						isBeforSend : false,
						params : {
							startIdx : startIdx,
							resultCnt : resultCnt
						}
				};
				
				
				$ajax.requestApi("/view/myData/getMyDataList.do",options,function(res){
					switch(parseInt(res.errCd)){
						case 0 : 
							if(res.result.length > 0){
								callback(res.result);
							}
							break;
						case -100 : 
								$message.open("알림",res.errMsg);
							break;
						default : 
							break;
					}
				});
			},
	
			/**
			 * 
			 * @name         : fileRead
			 * @description  : 파일 내용 읽기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			fileRead : function(url,obj,callback){
				$("#"+obj.name).ajaxForm({
					type : "POST",
					url : url,
					contentType:"application/json",
					dataType:"json",
					data : obj.data,
					success : function(res){
						$("#dataUploadStep_2").show();
						callback(res);
					},
					error : function(xhr, textStatus, error){
						console.log(error);
					},
					complete : function(data){
						
					}
					
				}).submit();
			},
			
			/**
			 * 
			 * @name         : createTable
			 * @description  : 테이블 생성
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createTable : function(){
				$("#fileForm").ajaxForm({
					type : "POST",
					url : "/view/data/createTable",
					contentType:"application/json",
					dataType:"json",
					data : {},
					success : function(res){
						$("#dataUploadStep_3").show();
						$("#dataUploadStep_4").show();
						$dataCreateMain.request.getMyData(res.resource_id,res.relation_resource_id);
						$dataCreateMain.table_id = res.resource_id;
						$dataCreateMain.relation_id = res.relation_resource_id;
						
						//table_id
						//relation_id
						//res.relation_resource_id
						//res.resource_id
					},
					error : function(xhr, textStatus, error){
						console.log(error);
					},
					complete : function(data){
						
					}
					
				}).submit();
			},
			
			/**
			 * 
			 * @name         : createShpTable
			 * @description  : 테이블 생성
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			createShpTable : function(){
				$("#fileForm").ajaxForm({
					type : "POST",
					url : "/view/data/createTable",
					contentType:"application/json",
					dataType:"json",
					data : {},
					success : function(res){
						$("#dataUploadStep_3").show();
						$("#dataUploadStep_4").show();
					}
				});
			},
			
			/**
			 * 
			 * @name         : getMyDataInfo
			 * @description  : 나의 데이터 정보 읽기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getMyDataInfo : function(data_id,relation_id){
				$.ajax({
					type : "POST",
					url : "/view/data/getMyDataInfo",
					contentType : "application/json",
					dataType : "json",
					data : JSON.stringify({
						data_id : data_id,
						relation_id : relation_id
					}),
					success : function(res){
						console.log(res);
						var info = res.info;
						var dataList = res.dataList;
						var columnList = res.columnList;
						$dataCreateMain.ui.gridMyDataInfo(info,dataList,columnList);
					},
					error : function(xhr, textStatus , error){
						
					},
					complete : function(data){
						
					}
					
				});
			},
			
			/**
			 * 
			 * @name         : getMyData
			 * @description  : 생성한 나의 데이터 미리보기
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			getMyData : function(data_id,relation_id){
				$.ajax({
					type : "POST",
					url : "/view/data/getMyDataInfo",
					contentType : "application/json",
					dataType : "json",
					data : JSON.stringify({
						data_id : data_id,
						relation_id : relation_id
					}),
					success : function(res){
						var info = res.info;
						var dataList = res.dataList;
						var columnList = res.columnList
						$dataCreateMain.ui.gridGeoCodeingTable(info,dataList,columnList);
					},
					error : function(xhr, textStatus , error){
						
					},
					complete : function(data){
						
					}
					
				});
			},
			
			/**
			 * 
			 * @name         : geoCodingStart
			 * @description  : 지오코딩 시작
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			geoCodingStart : function(geoCodingType,selectColumns,tableId,tableName){
				console.log(geoCodingType);
				console.log(selectColumns);
				console.log(tableId);
				console.log(tableName);
				
				$.ajax({
					type : "POST",
					url : "/view/data/geoCoding",
					contentType : "application/json",
					dataType : "json",
					data : JSON.stringify({
						geoCodingType : geoCodingType,
						selectColumns : selectColumns.toString(),
						tableId : tableId,
						tableName : tableName,
					}),
					success : function(res){
						
					},
					
					error : function(xhr, textStatus , error){
						
					},
					complete : function(data){
						
					},
				});
			},
			
			/**
			 * 
			 * @name         : checkMappingCoord
			 * @description  : 위치정보 생성 진행 체크
			 * @date         : 2018. 07. 13. 
			 * @author	     : 최재영
			 * @history 	 :
			 */
			checkMappingCoord : function(evt,execute_id){
				$.ajax({
					url : '/service/dc/checkMapping',
					data :{ execute_id : execute_id},
					cache : false,
					type : "POST",
					contentType:"application/json",
					dataType:"json",
					
					success : function(res){
						console.log(res);
						
					},
					error : function(xhr,textStatus,error){
						
					},
					complete : function(data){
						
					}
				});
			},
			
	};
	
	//EVENT 내용작성
	$dataCreateMain.event = {
			
			setUIEvent : function(){
				$('input:radio[name="data_type"]').off().on("click",function(){
					$dataCreateMain.ui.setDataType(this.value);
				});
				
				$("input:file[name='multiPartFile']").off().on("change",function(){
					$dataCreateMain.ui.shpFileCheck(this);
				});
				
				$("input:file[name='oneFile']").off().on("change",function(){
					$dataCreateMain.ui.oneFileCheck(this);
				});
				
				//shpFileCheck
				
				$("#createTable").off().on("click",function(){
					$dataCreateMain.ui.createTable();
				});
				
				$("#geoCodingButton").off().on("click",function(){
					$dataCreateMain.ui.geoCodingStart();
				});
			}
	};
	
	$dataCreateMain.data = {
			inputCoord : [
		        { value : '5180', label : 'TM 서부 (5180)' },
		        { value : '5181', label : 'TM 중부 (5181)' },
		        { value : '5183', label : 'TM 동부 (5183)' },
		        { value : '5184', label : 'TM 동해 (5184)' },

		        { value : '5185', label : 'TM 서부 (5185)' },
		        { value : '5186', label : 'TM 중부 (5186)' },
		        { value : '5187', label : 'TM 동부 (5187)' },
		        { value : '5188', label : 'TM 동해 (5188)' },

		        { value : '4326', label : '경위도 WGS84 (4326)' },
		        { value : '4166', label : '경위도 WGS84 (4166)' },

		        { value : '5178', label : 'KATEC (5178)' }
		    ],
	};
	
}(window,document));