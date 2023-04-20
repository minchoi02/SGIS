
(function(W,D){
	W.$sgisDataMng = W.$sgisDataMng || {};
	
	$(document).ready(function(){
		$sgisDataMng.event.setUIEvent();
	});
	
	//UI 내용작성
	$sgisDataMng.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			prjSetUnitArr : [],
			geoField : [],
			db_type : 0,
			table_nm : '',
			job_seq : '',
			
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
			
			setTables : function(data) {
				var html = "";
				for (var arri=0;arri<data.length;arri++) {
					var obj = data[arri];
					html += "<tr><td table_nm='"+obj.table_name+"'>";
					html += obj.table_name;
					if (obj.table_comment!="") {
						html += "<br/>(" + obj.table_comment + ")";
					}
					html += "</td></tr>";
				}
				$("#table_list > tbody:last").empty();
				$("#table_list > tbody:last").append(html);
			},
			
			getGeoChk : function() {
				var param = {};
				param.job_seq = $sgisDataMng.ui.job_seq;
				
		        $.ajax({
		            type: "POST",
		            url: contextPath + "/api/datasvc/getGeoChk.do",
		            dataType: "json",
		            data : param,
		            success: function (data) {
		            	var success = data.success;
		            	if (success != "ok") {
		            		setTimeout(function () {
		            			$sgisDataMng.ui.getGeoChk();
			                }, 30000)
		            	} 
		            },
		            error: function () {
		                
		            }
		        });
		    },
			
			
			/**
			 * 
			 * @name         : setsgisDataMngListTable
			 * @description  : 업무설정 테이블을 세팅한다.
			 * @date         : 2019. 07. 12. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setsgisDataMngListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();	
				var html = info.header;
				for (var i=0; i<data.length; i++) {
					var no = (parseInt(curPage)*pageSize) + (i-pageSize);
					html +=	"<tr id='sIdx_"+i+"'>";
					html +=		"<td><span class='checkbox solo'><input type='checkbox' name='job_seq' id='c" + i +"' value='"+data[i].job_setup_seq+"' job_nm='"+data[i].job_nm+"'><label for='c" + i +"'>&nbsp;</label></span></td>";
					html +=		"<td>"+(no+1)+"</td>";
					html +=		"<td class='left'>"+data[i].job_nm+"</td>";
					html +=		"<td>"+data[i].cl_nm+"</td>";
					html +=		"<td>"+data[i].reg_ts+"</td>";
					html +=	"</tr>";
				}
				$("#sgisDataMngTable").append(html);	
			}
	};
	
	//AJAX 내용작성
	$sgisDataMng.request = {
			/**
			 * 
			 * @name         : doReqSgisDataMngInfo
			 * @description  : 프로젝트 상세정보를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param postNo : 게시물 번호
			 */
			doReqSgisDataMngInfo : function(db_type) {
				$sgisDataMng.ui.db_type = db_type;
				
				var schema = userID;
				var options = {
					params : {
						db_type : db_type,
						schema : schema
					}
				};
			
				$ajax.requestApi(contextPath + "/api/datasvc/getTables.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$sgisDataMng.ui.setTables(result);
							break;
						default:
							$(".dialog").dialog({
							      autoOpen: false,
							      width: '500',
							      height: '290',
							      modal: true,
							      resizable: false,
							      minimizable: false,
							      minimizeIcon: 'ui-icon-minus'
							    });
							$message.open("알림", res.errMsg);
							break;
					}
				});
			}
	
	};
	
	//EVENT 내용작성
	$sgisDataMng.event = {
		setUIEvent : function(){
			//테이블 메타정보 가리기 이벤트
			$("#tblInfoHide").on("click", function() {
				var onoff = $(this).attr("onoff");
				if (onoff == "on") {
					$(this).html("정보보기 확대( + )");
					$(this).attr("onoff", "off");
					$(".onoff").hide();
				} else {
					$(this).html("정보보기 축소( - )");
					$(this).attr("onoff", "on");
					$(".onoff").show();
				}
			});

			$(document).on("click",".column_name",function(){
				if ($("#geo_fld_single").is(':checked')) {
					var colName = $(this).attr("column_name");
					for (var ti=0;ti<$sgisDataMng.ui.geoField.length;ti++) {
						if ($sgisDataMng.ui.geoField[ti]==colName) return;
					}
					$sgisDataMng.ui.geoField.push(colName);	
					$("#geo_field").html(colName);
				}
				if ($("#geo_fld_complex").is(':checked')) {
					var colName = $(this).attr("column_name");
					for (var ti=0;ti<$sgisDataMng.ui.geoField.length;ti++) {
						if ($sgisDataMng.ui.geoField[ti]==colName) return;
					}
					$sgisDataMng.ui.geoField.push(colName);					
					var geoFields = $("#geo_field").html() + colName + "<br/>";
					$("#geo_field").html(geoFields);
				}
			});

			$(document).on("click","#btnGeocodingExec",function(){
				var geofld_type = "";
				if ($sgisDataMng.ui.geoField.length==0) {
					$messageNew.open("알림", "지오코딩 필드를 선택해야 합니다.");
				}
				if ($("#geo_fld_single").is(':checked')) {
					geofld_type = "single";
				}
				if ($("#geo_fld_complex").is(':checked')) {
					geofld_type = "multi";
				}
				$(".dialog").dialog({
				      autoOpen: false,
				      width: '500',
				      height: '290',
				      modal: true,
				      resizable: false,
				      minimizable: false,
				      minimizeIcon: 'ui-icon-minus'
				    });
				
				var param = {};
				var table = $sgisDataMng.ui.table_nm;
				
				param.geo_field = $sgisDataMng.ui.geoField.join(",");
				param.table = table;
				param.sop_daum = $("#sop_daum").val();
				param.geofld_type = geofld_type;
				$sgisDataMng.ui.job_seq = "";
				
				$.ajax({
					type : "POST",
					url : contextPath +"/api/datasvc/geocodingAction.do",
					dataType : "json",
					sync : true,
					data : param,
					success: function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$sgisDataMng.ui.job_seq = res.job_seq;
								$sgisDataMng.ui.getGeoChk();
								break;
							default:
								$sgisDataMng.ui.job_seq = "";
								$messageNew.open("알림", res.errMsg);
								break;
						}
			        },
			        complete: function() {
			        	$mask.hide();
			        },
			        error: function() {
			        	$sgisDataMng.ui.job_seq = "";
			        	$messageNew.open("알림", res.errMsg);
			        }
				});
			});
						
			//테이블 정보 불러오기 이벤트
			$(document).on("click","#table_list > tbody > tr > td",function(){
				var param = new Object();
				param.db_type = $sgisDataMng.ui.db_type;
				param.schema = $("#schema").val();
				param.table = $(this).attr("table_nm");
				$sgisDataMng.ui.table_nm = $(this).attr("table_nm");
				window.editor.setValue("");
				
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + "/api/datasvc/getMetaInfo.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							//log generate by cis
							/* var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", ReplyNo - " + options.params.reply_no;
							$log.srvLogWrite("Z0", "05", "10", "00", "", log_param); */
							var html = "";
							var data = res.result;
							for (var arri=0;arri<data.length;arri++) {
								var obj = data[arri];
								var column_name = "";
								var column_comment = "";
								if ($sgisDataMng.ui.db_type=="hive") {
									column_name = obj.col_name;
									column_comment = obj.comment;
								} else {
									column_name = obj.column_name;
									column_comment = obj.column_comment;
								}
								html += "<tr><td class='column_name' column_name='"+column_name+"'>";
								html += column_name;
								if (obj.data_type!="") {
									html += "<br/>(" + obj.data_type + ")";
								}
								html += "</td><td>";
								
								if (column_comment!="") {
									html += column_comment;
								} else {
									html += "-";
								}
								html += "</td></tr>";
							}
							$("#col_info > tbody:last").empty();
							$("#col_info > tbody:last").append(html);
							$("#geo_field").empty();
							$sgisDataMng.ui.geoField = [];
							
							var data2 = res.result2[0];
							try { 
								$("#tbl_nm").html(data2.tbl_nm);
								$("#tbl_nm_ko").html(data2.tbl_nm_ko);
								$("#tbl_cnt").html($commonFunc.appendCommaToNumber(data2.tbl_cnt));
								$("#mod_dt").html(data2.mod_dt);
								$("#cl_nm").html(data2.cl_nm);
								$("#meta_tag").html(data2.meta_tag);
								$("#col_org").html(data2.col_org);
								$("#col_mng").html(data2.col_mng);
								$("#col_tel").html(data2.col_tel);
								$("#col_method").html(data2.col_method);
								$("#col_period").html(data2.col_period);
								$("#sop_geo_ok").html(data2.sop_geo_ok);
								$("#daum_geo_ok").html($commonFunc.appendCommaToNumber(data2.daum_geo_ok));
								$("#fail_geo_ok").html($commonFunc.appendCommaToNumber(data2.fail_geo_ok));
								
								$("#input_tbl_nm").val(data2.tbl_nm);
								$("#input_tbl_nm_ko").val(data2.tbl_nm_ko);
								$("#input_cl_nm").val(data2.cl_nm);
								$("#input_meta_tag").val(data2.meta_tag);
								$("#input_col_org").val(data2.col_org);
								$("#input_col_mng").val(data2.col_mng);
								$("#input_col_tel").val(data2.col_tel);
								$("#input_col_method").val(data2.col_method);
								$("#input_col_period").val(data2.col_period);
								$("#input_sop_geo_ok").val(data2.sop_geo_ok);
								$("#input_daum_geo_ok").val(data2.daum_geo_ok);
								$("#input_fail_geo_ok").val(data2.fail_geo_ok);
							} catch(e) {
								$("#tbl_nm").html("-");
								$("#tbl_nm_ko").html("-");
								$("#tbl_cnt").html("-");
								$("#mod_dt").html("-");
								$("#cl_nm").html("_");
								$("#meta_tag").html("-");
								$("#col_org").html("-");
								$("#col_mng").html("-");
								$("#col_tel").html("-");
								$("#col_method").html("-");
								$("#col_period").html("-");
								$("#sop_geo_ok").html("-");
								$("#daum_geo_ok").html("-");
								$("#fail_geo_ok").html("-");
								
								$("#input_tbl_nm").val("");
								$("#input_tbl_nm_ko").val("");
								$("#input_cl_nm").val("");
								$("#input_meta_tag").val("");
								$("#input_col_org").val("");
								$("#input_col_mng").val("");
								$("#input_col_tel").val("");
								$("#input_col_method").val("");
								$("#input_col_period").val("");
								$("#input_sop_geo_ok").val("");
								$("#input_daum_geo_ok").val("");
								$("#input_fail_geo_ok").val("");
							}
							break;
						default:  
							$("#col_info > tbody:last").empty();
							$("#tbl_nm").html("-");
							$("#tbl_nm_ko").html("-");
							$("#tbl_cnt").html("-");
							$("#mod_dt").html("-");
							$("#cl_nm").html("_");
							$("#meta_tag").html("-");
							$("#col_org").html("-");
							$("#col_mng").html("-");
							$("#col_tel").html("-");
							$("#col_method").html("-");
							$("#col_period").html("-");
							$("#sop_geo_ok").html("-");
							$("#daum_geo_ok").html("-");
							$("#fail_geo_ok").html("-");
							
							$("#input_tbl_nm").val("");
							$("#input_tbl_nm_ko").val("");
							$("#input_cl_nm").val("");
							$("#input_meta_tag").val("");
							$("#input_col_org").val("");
							$("#input_col_mng").val("");
							$("#input_col_tel").val("");
							$("#input_col_method").val("");
							$("#input_col_period").val("");
							$("#input_sop_geo_ok").val("");
							$("#input_daum_geo_ok").val("");
							$("#input_fail_geo_ok").val("");
							break;
					}
				});
			});
			
			//10건 조회 버튼 이벤트
			$("#btnSelect10").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				
				window.editor.setValue("select * from " + userID + "." + $sgisDataMng.ui.table_nm + " limit 10;");
			});

			//카운트 버튼 이벤트
			$("#btnSelectCount").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				
				window.editor.setValue("select count(*) as cnt from " + userID + "." + $sgisDataMng.ui.table_nm + " limit 1;");
			});

			//다운로드 버튼 이벤트
			$("#tableDownload").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				if ($sgisDataMng.ui.db_type=="hive") {
					location.href = contextPath + "/api/datasvc/downloadHive.do?schemaNm=" + userID + "&tableNm=" + $sgisDataMng.ui.table_nm;
				} else {
					location.href = contextPath + "/api/sysmgt/downloadPG.do?schemaNm=" + userID + "&tableNm=" + $sgisDataMng.ui.table_nm;
				}
			});

			//쿼리실행 다운로드 버튼 이벤트
			$("#resultDownload").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				var qry_txt = window.editor.getValue();
				if (qry_txt.indexOf("select")<0) return;
				if ($sgisDataMng.ui.db_type=="hive") {
					location.href = contextPath + "/api/datasvc/downloadHive.do?schemaNm=" + userID + "&qryTxt=" + qry_txt + "&tableNm=" + $sgisDataMng.ui.table_nm;
				} else {
					location.href = contextPath + "/api/sysmgt/downloadPG.do?schemaNm=" + userID + "&qryTxt=" + qry_txt;
				}
			});			
			
			//전송 버튼 이벤트
			$("#tableTransfer").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				var url = "";
				
				if ($sgisDataMng.ui.db_type=="hive") {
					url = "moveHivetoPG";
				} else {
					url = "movePGtoHive";
				}
				
				var url_href = contextPath + "/api/datasvc/" + url + ".do?schemaNm=" + userID + "&tableNm=" + $sgisDataMng.ui.table_nm;
				
				var options = {
					isBeforSend : true,
					method : "POST"
				};
				$ajax.requestApi(contextPath + url_href, options,  function(res) {
					$(".dialog").dialog({
					      autoOpen: false,
					      width: '500',
					      height: '290',
					      modal: true,
					      resizable: false,
					      minimizable: false,
					      minimizeIcon: 'ui-icon-minus'
				    });
					var msg_obj = eval("("+res.result+")");
					switch(msg_obj.MESSAGE) {
						case "SUCCESS":
							$messageNew.open("알림", "전송이 완료되었습니다.");
							$('#dialogTableInfo').dialog('close');
							break;
						default:  
							$messageNew.open("알림", msg_obj.MESSAGE);
							break;
					}
				});				
			});
			
			//실행 및 결과보기 버튼 이벤트
			$("#btnExec").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				var qry_txt = window.editor.getValue();
				if (qry_txt.indexOf("select")<0) return;
				
				var param = new Object();
				param.db_type = "pg";
				param.qry_txt = qry_txt;
				
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + "/api/datasvc/execQryResult.do", options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							//log generate by cis
							/* var log_param = "ShareBoardNo - " + options.params.share_board_no;
							log_param += ", ReplyNo - " + options.params.reply_no;
							$log.srvLogWrite("Z0", "05", "10", "00", "", log_param); */
							
							/*
							{"errMsg":"Success",
							"column":["addr_link_key","resid_1_type","family_cnt","person_cnt"],
							"result":[{}] 
							*/
							var cols = res.column;
							var fildsList = [];
							var result = [];
							var resultType = "pg";
							for (var i=0;i<cols.length;i++){
								var obj = {};
								if (cols[i].indexOf(".")>-1) {
									obj.name = cols[i].split(".")[1];
									resultType = "hive";
								} else {
									obj.name = cols[i];
								}
								
								obj.type = "text";
								fildsList.push(obj);
							}
							if (resultType=="hive") {
								for (var i=0;i<res.result.length;i++){
									var obj = {};
									var data = res.result[i];
									for (var j=0;j<cols.length;j++){
										var col = cols[j];
										obj[col.split(".")[1]] = data[col];
									}
									if (i>0) result.push(obj);
								}
							} else {
								result = res.result;
							}
				            $("#jsGrid").jsGrid({
				                height: "auto",
				                width: "auto",
				                sorting: false,
				                paging: true,
				                pagerFormat: " {prev} {pages} {next}", 
				                pagePrevText: "&laquo;", 
				                pageNextText: "&raquo;", 
				                pageFirstText: "처음", 
				                pageLastText: "마지막",
				                pageSize: 10,
				                pageButtonCount: 10,
				                fields: fildsList,
				                data: result
				            });
							break;
						default:  
							$(".dialog").dialog({
							      autoOpen: false,
							      width: '500',
							      height: '290',
							      modal: true,
							      resizable: false,
							      minimizable: false,
							      minimizeIcon: 'ui-icon-minus'
							    });
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});	
				
				$(".dialog").dialog({
			      autoOpen: false,
			      width: '1100',
			      height: '700',
			      modal: true,
			      resizable: false,
			      minimizable: false,
			      minimizeIcon: 'ui-icon-minus'
			    });
				$('#dialogPreview').dialog('open');
			});
			
			//실행결과 다운로드 이벤트
			$("#resultDownload").on("click", function() {
				if ($sgisDataMng.ui.table_nm == '') return;
				var qry_txt = window.editor.getValue();
				if (qry_txt.indexOf("select")<0) return;
			});
			
			//테이블정보수정 버튼 이벤트
			$("#tableInfoModify").on("click", function() {
				$(".dialog").dialog({
			      autoOpen: false,
			      width: '1100',
			      height: '565',
			      modal: true,
			      resizable: false,
			      minimizable: false,
			      minimizeIcon: 'ui-icon-minus'
			    });
				$('#dialogTableInfo').dialog('open');
			});

			//테이블 정보 불러오기 이벤트
			$("#tableInfoSave").on("click", function() {
				var param = new Object();
				param.db_type = $sgisDataMng.ui.db_type;
				param.tbl_sch = userID;
				param.tbl_nm = $sgisDataMng.ui.table_nm;
				param.tbl_nm_ko = $("#input_tbl_nm_ko").val();
				param.cl_nm = $("#input_cl_nm").val();
				param.meta_tag = $("#input_meta_tag").val();
				param.col_org = $("#input_col_org").val();
				param.col_mng = $("#input_col_mng").val();
				param.col_tel = $("#input_col_tel").val();
				param.col_method = $("#input_col_method").val();
				param.col_period = $("#input_col_period").val();
				param.sop_geo_ok = $("#input_sop_geo_ok").val();
				param.daum_geo_ok = $("#input_daum_geo_ok").val();
				param.fail_geo_ok = $("#input_fail_geo_ok").val();
				$("#geo_field").empty();
				$sgisDataMng.ui.geoField = [];
				
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + "/api/datasvc/setMetaInfo.do", options,  function(res) {
					$(".dialog").dialog({
					      autoOpen: false,
					      width: '500',
					      height: '290',
					      modal: true,
					      resizable: false,
					      minimizable: false,
					      minimizeIcon: 'ui-icon-minus'
					    });
					switch(parseInt(res.errCd)) {
						case 0:
							$messageNew.open("알림", "등록되었습니다.");
							$('#dialogTableInfo').dialog('close');
							break;
						default:  
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			});
			
			$("#tableInfoClose").on("click", function() {
				$('#dialogTableInfo').dialog('close');
			});
			
			$("#geo_fld_reset").on("click", function() {
				$("#geo_field").empty();
				$sgisDataMng.ui.geoField = [];
			});

			$("#geo_fld_single").on("click", function() {
				$("#geo_field").empty();
				$sgisDataMng.ui.geoField = [];
			});

			$("#geo_fld_complex").on("click", function() {
				$("#geo_field").empty();
				$sgisDataMng.ui.geoField = [];
			});
			
			$(".onoff").hide();
		}
	};
}(window,document));