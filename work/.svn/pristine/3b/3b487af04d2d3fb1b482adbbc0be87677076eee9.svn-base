(function(W, D) {
	W.$prjUnitModify = W.$prjUnitModify || {};
	
	$(document).ready(function() {
	    $(".dialog").dialog({
	      autoOpen: false,
	      width: '500',
	      height: '700',
	      modal: true,
	      resizable: false,
	      minimizable: false,
	      minimizeIcon: 'ui-icon-minus'
	    });
		
		$prjUnitModify.event.setUIEvent();
		
		var mime = 'text/x-mariadb';
		
		window.editor = CodeMirror.fromTextArea(document.getElementById('qry_txt'), {
			mode: mime,
			indentWithTabs: true,
			smartIndent: true,
			lineNumbers: true,
			matchBrackets : true,
			autofocus: true
		});
		$log.srvLogWrite("Z2", "03", "01", "04", "", "");
	});
	
	$prjUnitModify.ui = {
			prj_master_hst_seq : '', 
			job_order : '',
			job_setup_seq : '',
			job_max : '',
			params : null,
			hideStep : function() {
				$(".dbjob").hide();
				$(".dbmovjob").hide();
				$(".collectjob").hide();
				$(".geojob").hide();
				$(".geomovjob").hide();
				$(".dbgeomovjob").hide();
				$(".shelljob").hide();
				$(".coordconv").hide();
				$(".movjob").hide();
			},
			
			get_query : function() { 
				var url = document.location.href; 
				var qs = url.substring(url.indexOf('?') + 1).split('&'); 
				for(var i = 0, result = {}; i < qs.length; i++){ 
					qs[i] = qs[i].split('='); 
					result[qs[i][0]] = decodeURIComponent(qs[i][1]); 
				} 
				return result; 
			},
			
			go_list : function() {
				var stateCd = '';
				var searchText = '';
				var clNm = '';
				var page = '';
				
				if ($prjUnitModify.ui.params.stateCd===undefined) {
					stateCd = '';
				} else {
					stateCd = $prjUnitModify.ui.params.stateCd;
				}
				if ($prjUnitModify.ui.params.page===undefined) {
					page = 1;
				} else {
					page = parseInt($prjUnitModify.ui.params.page);
				}
				if ($prjUnitModify.ui.params.clNm===undefined) {
					clNm = '';
				} else {
					clNm = $prjUnitModify.ui.params.clNm;
				}
				if ($prjUnitModify.ui.params.searchText===undefined) {
					searchText = '';
				} else {
					searchText = $prjUnitModify.ui.params.searchText;
				}
				
				location.href="prjExec?stateCd="+stateCd+"&searchText="+searchText+"&clNm="+clNm+"&page="+page;							
			},

			setDetail : function(data) {
				$prjUnitModify.ui.job_setup_seq=data.job_setup_seq;
				$prjUnitModify.ui.job_max=data.job_max;
				$('input:radio[name=job_step]:input[value="'+data.job_step+'"]').attr("checked", true);
				$("#job_nm").val(data.job_nm);
				$("#cl_nm").val(data.cl_nm);
				$('input:radio[name=storage_div_nm]:input[value="'+data.storage_div_nm+'"]').attr("checked", true);
				$('input:radio[name=col_cd]:input[value="'+data.col_cd+'"]').attr("checked", true);
				$('input:radio[name=geo_method]:input[value="'+data.geo_method+'"]').attr("checked", true);
				$("#schema_nm").val(data.schema_nm);
				$("#tbl_nm").val(data.tbl_nm);
				$("#tgt_schema_nm").val(data.tgt_schema_nm);
				$("#tgt_tbl_nm").val(data.tgt_tbl_nm);
				$("#mv_tgt_tbl_nm").val(data.tgt_tbl_nm);
				$("#geo_fld").val(data.geo_fld);
				
				$("#geo_key_fld").val(data.geo_key_fld);
				$("#geo_fld_sido").val(data.geo_fld_sido);
				$("#geo_fld_sgg").val(data.geo_fld_sgg);
				$("#geo_fld_emd").val(data.geo_fld_emd);
				$("#geo_fld_ri").val(data.geo_fld_ri);
				$("#geo_fld_road").val(data.geo_fld_road);
				$("#geo_fld_mn").val(data.geo_fld_mn);
				$("#geo_fld_sn").val(data.geo_fld_sn);
				$("#geo_fld_base").val(data.geo_fld_base);
				$("#geo_fld_bd").val(data.geo_fld_bd);
				$("#geo_fld_bd_sub").val(data.geo_fld_bd_sub);
				
				if (data.geo_depth=="단일필드")	 $("#geo_depth1").prop('checked', true);
				if (data.geo_depth=="도로주소")	 $("#geo_depth2").prop('checked', true);
				if (data.geo_depth=="지번주소")	 $("#geo_depth3").prop('checked', true);
				
				$("#shell_cmd").val(data.shell_cmd);
				$("#x_fld").val(data.x_fld);
				$("#y_fld").val(data.y_fld);
				$("#coord_type").val(data.coord_type);
				if (data.schd_type != '단일') $("#btnExec").hide();
				
				$("#job_sts_dt").html(data.mod_ts);
				if (data.job_sts == 'success') {
					$("#job_sts").html('성공');
				} else if (data.job_sts == 'fail') {
					$("#job_sts").html('실패');
				} else if (data.job_sts == 'running' || data.job_sts == 'start') {
					$("#job_sts").html('실행중');
				} else if (data.job_sts == 'standby' || data.job_sts == 'ready') {
					$("#job_sts").html('대기');
				} else if (data.job_sts == 'manual') {
					$("#job_sts").html('대기');
				} else if (data.job_sts == 'stop') {
					$("#job_sts").html('정지');
				}
				$("#job_log").html(data.job_log);
				window.editor.setValue(data.qry_txt);
				
				$prjUnitModify.ui.hideStep();
				if ($("#job_step1").is(':checked')) {
					$(".dbjob").show();
					$(".dbmovjob").show();
					$(".dbgeomovjob").show();
				}
				if ($("#job_step2").is(':checked')) {
					$(".coordconv").show();
				}
				if ($("#job_step3").is(':checked')) {
					$(".geojob").show();
					$(".geomovjob").show();
					$(".dbgeomovjob").show();
				}
				if ($("#job_step4").is(':checked')) {
					//$(".dbmovjob").show();
					//$(".geomovjob").show();
					$(".dbgeomovjob").show();
					$(".movjob").show();
				}
				if ($("#job_step5").is(':checked')) {
					$(".collectjob").show();
				}
				if ($("#job_step6").is(':checked')) {
					$(".shelljob").show();
				}
			},
			
			emptyGeo : function(jobObj) {
				jobObj.geo_method = "";
				jobObj.geo_depth = "";
				jobObj.geo_fld = "";
				jobObj.geo_key_fld = "";
				jobObj.geo_fld_sido = "";
				jobObj.geo_fld_sgg = "";
				jobObj.geo_fld_emd = "";
				jobObj.geo_fld_ri = "";
				jobObj.geo_fld_road = "";
				jobObj.geo_fld_mn = "";
				jobObj.geo_fld_sn = "";
				jobObj.geo_fld_base = "";
				jobObj.geo_fld_bd = "";
				jobObj.geo_fld_bd_sub = "";
			}
	};
	
	//AJAX 내용작성
	$prjUnitModify.request = {
			
			/**
			 * 
			 * @name         : doReqWorkSetDetailInfo
			 * @description  : 단위업무 상세정보를 조회한다.
			 * @date         : 2019. 07. 16. 
			 * @author	     : 최인섭
			 * @history 	 :
			 * @param postNo : 게시물 번호
			 */
			doReqWorkSetDetailInfo : function(prj_master_hst_seq, job_order) {
				;
				$prjUnitModify.ui.params = $prjUnitModify.ui.get_query();
				$prjUnitModify.ui.prj_master_hst_seq = prj_master_hst_seq;
				$prjUnitModify.ui.job_order = job_order;
				
				var options = {
					params : {
						prj_master_hst_seq : prj_master_hst_seq,
						job_order : job_order
					}
				};
			
				$ajax.requestApi(contextPath + "/api/prjmng/prjUnitModify.do", options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							$prjUnitModify.ui.setDetail(result);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			}
	};
	
	$prjUnitModify.event = {
			setUIEvent : function() {
				$(".jobsel").on("click", function() {
					$prjUnitModify.ui.hideStep();
					if ($("#job_step1").is(':checked')) {
						$(".dbjob").show();
						$(".dbmovjob").show();
						$(".dbgeomovjob").show();
					}
					if ($("#job_step2").is(':checked')) {
						$(".coordconv").show();
					}
					if ($("#job_step3").is(':checked')) {
						$(".geojob").show();
						$(".geomovjob").show();
						$(".dbgeomovjob").show();
					}
					if ($("#job_step4").is(':checked')) {
						//$(".dbmovjob").show();
						$(".geomovjob").show();
						$(".dbgeomovjob").show();
					}
					if ($("#job_step5").is(':checked')) {
						$(".collectjob").show();
					}
					if ($("#job_step6").is(':checked')) {
						$(".shelljob").show();
					}
				});
				$(".geo_depth").on("click", function() {
					if ($("#geo_depth1").is(':checked')) {
						$(".geodepth1").show();
						$(".geodepth2").hide();
						$(".geodepth23").hide();
						$(".geodepth3").hide();
					}
					if ($("#geo_depth2").is(':checked')) {
						$(".geodepth1").hide();
						$(".geodepth2").show();
						$(".geodepth23").show();
						$(".geodepth3").hide();
					}
					if ($("#geo_depth3").is(':checked')) {
						$(".geodepth1").hide();
						$(".geodepth2").hide();
						$(".geodepth23").show();
						$(".geodepth3").show();
					}
				});
				$("#btnExec").on("click", function() {
					var jobObj = new Object();
					jobObj.prj_master_hst_seq = $prjUnitModify.ui.prj_master_hst_seq;
					jobObj.job_setup_seq = '' + $prjUnitModify.ui.job_setup_seq;
					jobObj.stateCd = 'standby';
					var param = new Object();
					param.jsonStr = JSON.stringify(jobObj);
					
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/prjmng/updatePrjExec.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "저장되었습니다.");
								//log generate by cis
								/* var log_param = "ShareBoardNo - " + options.params.share_board_no;
								log_param += ", ReplyNo - " + options.params.reply_no;
								$log.srvLogWrite("Z0", "05", "10", "00", "", log_param); */
								location.href='prjExec';
								break;
							default:  
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				
				//다운로드 버튼 이벤트
				$("#btnDownload").on("click", function() {
					var schema = $("#tgt_schema_nm").val();
					if (schema == "")  schema = $("#schema_nm").val();
					var tbl_nm = $("#tgt_tbl_nm").val();
					if (tbl_nm == "")  tbl_nm = $("#tbl_nm").val();
					
					location.href = contextPath + "/api/sysmgt/downloadPG.do?schemaNm=" + schema + "&tableNm=" + tbl_nm;
				});
				
				//이전 작업
				$("#btnPrev").on("click", function() {
					
					var jobOrder = parseInt($prjUnitModify.ui.job_order);
					var jobMax = parseInt($prjUnitModify.ui.job_max);
					if (jobOrder == 1) {
						$messageNew.open("알림", "맨 처음입니다.");
					} else {
						if (jobOrder-1 >= jobMax) {
							$messageNew.open("알림", "맨 마지막입니다.");
						} else {
							location.href = 'prjUnitModify?prj_master_hst_seq=' + $prjUnitModify.ui.prj_master_hst_seq + '&job_order=' + (jobOrder-1);
						}
					}
				});

				//다음 작업
				$("#btnNext").on("click", function() {
					
					var jobOrder = parseInt($prjUnitModify.ui.job_order);
					var jobMax = parseInt($prjUnitModify.ui.job_max);
					if (jobOrder >= jobMax) {
						$messageNew.open("알림", "맨 마지막입니다.");
					} else {
						if (jobOrder >= jobMax) {
							$messageNew.open("알림", "맨 마지막입니다.");
						} else {
							location.href = 'prjUnitModify?prj_master_hst_seq=' + $prjUnitModify.ui.prj_master_hst_seq + '&job_order=' + (jobOrder+1);
						}
					}
				});
				
				//실행 및 결과보기 버튼 이벤트
				$("#btnPreview").on("click", function() {
					var schema = $("#tgt_schema_nm").val();
					if (schema == "")  schema = $("#schema_nm").val();
					var tbl_nm = $("#tgt_tbl_nm").val();
					if (tbl_nm == "")  tbl_nm = $("#tbl_nm").val();
					
					var param = new Object();
					param.db_type = "pg";
					param.schema = schema;
					param.tbl_nm = tbl_nm;
					param.qry_txt = "";
					
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
								//$log.srvLogWrite("Z2", "05", "01", "02", "", "");
							   
								$(".dialog").dialog({
							      autoOpen: false,
							      width: '1000',
							      height: '700',
							      modal: true,
							      resizable: false,
							      minimizable: false,
							      minimizeIcon: 'ui-icon-minus'
							    });
							    
								var cols = res.column;
								var fildsList = [];
								var result = [];
								var resultType = "pg";
								for (var i=0;i<cols.length;i++){
									var obj = {};
									obj.name = cols[i];
									
									obj.type = "text";
									fildsList.push(obj);
								}
								
								result = res.result;
					            $("#jsGrid").jsGrid({
					                height: "625",
					                width: "1070",
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
					            $(".jsgrid-header-cell").width(200);
					            $(".jsgrid-cell").width(200);
					            $(".jsgrid-cell").css("font-size","10px");
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
				
				$("#btnList").on("click", function() {
					$prjUnitModify.ui.go_list();			
				});
				
				$("#btnSave").on("click", function() {
					var jobObj = new Object();
					jobObj.prj_master_hst_seq = $prjUnitModify.ui.prj_master_hst_seq;
					jobObj.job_setup_seq = $prjUnitModify.ui.job_setup_seq;
					jobObj.job_step = $(":input:radio[name=job_step]:checked").val();
					jobObj.job_nm = $("#job_nm").val();
					jobObj.cl_nm = $("#cl_nm").val();
					jobObj.storage_div_nm = $(":input:radio[name=storage_div_nm]:checked").val();
					jobObj.col_cd = $(":input:radio[name=col_cd]:checked").val();
					jobObj.geo_method = $(":input:radio[name=geo_method]:checked").val();
					jobObj.geo_depth = $(":input:radio[name=geo_depth]:checked").val();
					
					jobObj.geo_key_fld = $("#geo_key_fld").val();
					jobObj.geo_fld_sido = $("#geo_fld_sido").val();
					jobObj.geo_fld_sgg = $("#geo_fld_sgg").val();
					jobObj.geo_fld_emd = $("#geo_fld_emd").val();
					jobObj.geo_fld_ri = $("#geo_fld_ri").val();
					jobObj.geo_fld_road = $("#geo_fld_road").val();
					jobObj.geo_fld_mn = $("#geo_fld_mn").val();
					jobObj.geo_fld_sn = $("#geo_fld_sn").val();
					jobObj.geo_fld_base = $("#geo_fld_base").val();
					jobObj.geo_fld_bd = $("#geo_fld_bd").val();
					jobObj.geo_fld_bd_sub = $("#geo_fld_bd_sub").val();
					
					jobObj.schema_nm = $("#schema_nm").val();
					jobObj.tbl_nm = $("#tbl_nm").val();
					jobObj.tgt_schema_nm = $("#tgt_schema_nm").val();
					jobObj.tgt_tbl_nm = $("#tgt_tbl_nm").val();
					jobObj.geo_fld = $("#geo_fld").val();
					jobObj.shell_cmd = $("#shell_cmd").val();
					jobObj.qry_txt = window.editor.getValue();
					jobObj.x_fld = $("#x_fld").val();
					jobObj.y_fld = $("#y_fld").val();
					jobObj.coord_type = $("#coord_type").val();
					jobObj.mv_tgt_tbl_nm = $("#mv_tgt_tbl_nm").val();
					
					if ($commonFunc.isEmpty(jobObj.job_step)) { $messageNew.open("알림","업무단계를 선택해주세요."); return; }
					if (jobObj.job_nm == "") { $messageNew.open("알림","업무명을 입력해주세요."); return; }
					if (jobObj.cl_nm == "") { $messageNew.open("알림","분류를 선택해주세요."); return; }
				    
					$(".dialog").dialog({
				      width: 'auto',
				      height: 'auto'
				    });
				    
					if ($("#job_step1").is(':checked')) {
						jobObj.col_cd = "";
						jobObj.tgt_schema_nm = "";
						jobObj.tgt_tbl_nm = "";
						jobObj.shell_cmd = "";

						$prjUnitModify.ui.emptyGeo(jobObj);
						
						if ($commonFunc.isEmpty(jobObj.storage_div_nm)) { $messageNew.open("알림","DB유형을 선택해주세요."); return; }
						if (jobObj.schema_nm == "") { $messageNew.open("알림","스키마를 입력해주세요."); return; }
						if (jobObj.tbl_nm == "") { $messageNew.open("알림","테이블명을 입력해주세요."); return; }
						if (jobObj.qry_txt == "") { $messageNew.open("알림","쿼리를 입력해주세요."); return; }
						
					}
					if ($("#job_step2").is(':checked')) {
						jobObj.col_cd = "";
						jobObj.shell_cmd = "";
						jobObj.qry_txt = "";
						jobObj.tgt_schema_nm = "";
						jobObj.tgt_tbl_nm = "";

						$prjUnitModify.ui.emptyGeo(jobObj);
						
						if (jobObj.schema_nm == "") { $messageNew.open("알림","스키마를 입력해주세요."); return; }
						if (jobObj.tbl_nm == "") { $messageNew.open("알림","테이블명을 입력해주세요."); return; }
						if (jobObj.x_fld == "") { $messageNew.open("알림","X필드명을 입력해주세요."); return; }
						if (jobObj.y_fld == "") { $messageNew.open("알림","Y필드명을 입력해주세요."); return; }
						if (jobObj.coord_type == "") { $messageNew.open("알림","현재 좌표계를 선택해주세요."); return; }
					}
					if ($("#job_step3").is(':checked')) {
						jobObj.col_cd = "";
						jobObj.storage_div_nm = "";
						jobObj.shell_cmd = "";
						jobObj.qry_txt = "";
						if ($commonFunc.isEmpty(jobObj.geo_method)) { $messageNew.open("알림","지오코딩 유형을 선택해주세요."); return; }
						if (jobObj.schema_nm == "") { $messageNew.open("알림","스키마를 입력해주세요."); return; }
						if (jobObj.tbl_nm == "") { $messageNew.open("알림","테이블명을 입력해주세요."); return; }
						if (jobObj.geo_key_fld == "") { $messageNew.open("알림","지오코딩 키필드를 입력해주세요."); return; }
						if (jobObj.geo_depth == "단일필드" && jobObj.geo_fld == "") { $messageNew.open("알림","지오코딩 필드를 입력해주세요."); return; }
						if (jobObj.geo_depth == "도로주소") {
							if (jobObj.geo_fld_sido == "") { $messageNew.open("알림","시도 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_sgg == "") { $messageNew.open("알림","시군구 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_road == "") { $messageNew.open("알림","도로명 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_mn == "") { $messageNew.open("알림","건물본번 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_bd == "") { $messageNew.open("알림","건물명 필드를 입력해주세요."); return; }
						}
						if (jobObj.geo_depth == "지번주소") {
							if (jobObj.geo_fld_sido == "") { $messageNew.open("알림","시도 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_sgg == "") { $messageNew.open("알림","시군구 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_emd == "") { $messageNew.open("알림","읍면동 필드를 입력해주세요."); return; }
							//if (jobObj.geo_fld_ri == "") { $messageNew.open("알림","리 필드를 입력해주세요."); return; }
							if (jobObj.geo_fld_mn == "") { $messageNew.open("알림","지번 본번 필드를 입력해주세요."); return; }
						}

					}
					if ($("#job_step4").is(':checked')) {
						jobObj.col_cd = "";
						jobObj.shell_cmd = "";
						jobObj.qry_txt = "";
						jobObj.storage_div_nm = "";
						jobObj.tgt_schema_nm = "";

						$prjUnitModify.ui.emptyGeo(jobObj);
						
						if (jobObj.schema_nm == "") { $messageNew.open("알림","스키마를 입력해주세요."); return; }
						if (jobObj.tbl_nm == "") { $messageNew.open("알림","테이블명을 입력해주세요."); return; }
						if (jobObj.mv_tgt_tbl_nm == "") { $messageNew.open("알림","타깃 테이블명을 입력해주세요."); return; }
						jobObj.tgt_tbl_nm = jobObj.mv_tgt_tbl_nm;
					}
					if ($("#job_step5").is(':checked')) {
						jobObj.storage_div_nm = "";
						jobObj.schema_nm = "";
						jobObj.tbl_nm = "";
						jobObj.tgt_schema_nm = "";
						jobObj.tgt_tbl_nm = "";
						jobObj.shell_cmd = "";
						jobObj.qry_txt = "";

						$prjUnitModify.ui.emptyGeo(jobObj);
						
						if ($commonFunc.isEmpty(jobObj.col_cd)) { $messageNew.open("알림","수집대상을 선택해주세요."); return; }
					}
					if ($("#job_step6").is(':checked')) {
						jobObj.storage_div_nm = "";
						jobObj.col_cd = "";
						jobObj.schema_nm = "";
						jobObj.tbl_nm = "";
						jobObj.tgt_schema_nm = "";
						jobObj.tgt_tbl_nm = "";
						jobObj.qry_txt = "";

						$workSetNew.ui.emptyGeo(jobObj);
						
						if (jobObj.shell_cmd == "") { $messageNew.open("알림","쉘명령을 입력해주세요."); return; }
					}

					var param = new Object();
					param.jsonStr = JSON.stringify(jobObj);
					
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/prjmng/updatePrjUnitSet.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$messageNew.open("알림", "저장되었습니다.");
								$prjUnitModify.ui.go_list();
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
}(window, document));