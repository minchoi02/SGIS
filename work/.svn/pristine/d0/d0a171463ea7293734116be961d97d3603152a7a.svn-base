
(function(W,D){
	W.$addrDbMng = W.$addrDbMng || {};
	
	$(document).ready(function(){
		$(function() {
		    $(".dialog").dialog({
		      autoOpen: false,
		      width: 'auto',
		      height: 'auto',
		      modal: true,
		      resizable: false,
		      minimizable: false,
		      minimizeIcon: 'ui-icon-minus'
		    });
		});
		$addrDbMng.event.setUIEvent();
		$log.srvLogWrite("Z3", "04", "01", "01", "", "");
	});
	
	//UI 내용작성
	$addrDbMng.ui = {
			addr_type : '',
			
			/**
			 * 
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 * @date         : 2019. 07. 17. 
			 * @author	     : 최인섭
			 * @history 	 :
			 */
			initView : function() {
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
			}
			
	};
	
	
	//EVENT 내용작성
	$addrDbMng.event = {
			
			setUIEvent : function(){
				$("#sido").on("change", function() {
					var param = new Object();
					param.addr_type = $addrDbMng.ui.addr_type;
					param.sido = $(this).val();
					
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/collect/searchSgg.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$("#sgg").empty();
								var data = res.result;
								var option = $("<option value=''>시군구선택</option>");
								$('#sgg').append(option);
								for (var arri=0;arri<data.length;arri++) {
									var obj = data[arri];
									option = $("<option value='"+obj.sigungu_cd+"'>" + obj.sgg_nm + "</option>");
									$('#sgg').append(option);
								}
								
								break;
							default:  
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				$("#sgg").on("change", function() {
					var param = new Object();
					param.addr_type = $addrDbMng.ui.addr_type;
					param.sgg = $(this).val();
					
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/collect/searchEmd.do", options,  function(res) {
						switch(parseInt(res.errCd)) {
							case 0:
								$("#emd").empty();
								var data = res.result;
								var option = $("<option value=''>읍면동선택</option>");
								$('#emd').append(option);
								for (var arri=0;arri<data.length;arri++) {
									var obj = data[arri];
									option = $("<option value='"+obj.emd_cd+"'>" + obj.emdong_nm + "</option>");
									$('#emd').append(option);
								}
								
								break;
							default:  
								$messageNew.open("알림", res.errMsg);
								break;
						}
					});
				});
				
				$("#btnApply").on("click", function() {
					var sido = $("#sido option:selected").text();
					var sgg =  $.trim($("#sgg option:selected").text());
					var emd = $("#emd option:selected").text();
					var ri = $("#ri").val();
					var road = $.trim($("#road").val());
					var bonbun= $.trim($("#bonbun").val());
					var bubun = $.trim($("#bubun ").val());
					var bulding = $("#bulding").val();
					var mgt = $("#mgt").val();
					var pnu = $("#pnu").val();
					
					if ($("#sido option:selected").val()=="") sido = "";
					if ($("#sgg option:selected").val()=="") sgg = "";
					if ($("#emd option:selected").val()=="") emd = "";
					
					var qry = "";
					
					if (sido != "") qry += " AND sido_nm = '" + sido + "' \r\n";
					if (sgg != "") qry += " AND sgg_nm = '" + sgg + "' \r\n";
					
					if ($addrDbMng.ui.addr_type=="adm") {
						if (emd != "") qry += " AND adm_nm = '" + emd + "' \r\n";
					} 
					if ($addrDbMng.ui.addr_type=="legal") {
						if (emd != "") qry += " AND leg_nm = '" + emd + "' \r\n";
					}
					
					if (ri != "") qry += " AND ri_nm = '" + ri + "' \r\n";
					if (road != "") qry += " AND road_nm = '" + road + "' \r\n";
					if (road != "" && bonbun != "") qry += " AND road_nm_main_no = '" + bonbun + "' \r\n";
					if (road != "" && bubun != "") qry += " AND road_nm_sub_no = '" + bubun + "' \r\n";
					if (road == "" && bonbun != "") qry += " AND pcl_main_no = '" + bonbun + "' \r\n";
					if (road == "" && bubun != "") qry += " AND pcl_sub_no = '" + bubun + "' \r\n";
					if (bulding != "") qry += " AND (bd_main_nm LIKE '%" + bulding + "%' OR bd_sub_nm LIKE '%" + bulding + "%') \r\n";
					if (pnu != "") qry = " AND pnu = '" + pnu + "' ";
					if (mgt != "") qry = " AND bd_mgt_sn = '" + mgt + "' ";
					
					if ((mgt+pnu) == "" && sido == "") {
						$messageNew.open("알림", "시도를 선택해주세요.");
						return;
					}
					if ((mgt+pnu) == "" && sgg == "") {
						$messageNew.open("알림", "시군구를 선택해주세요.");
						return;
					}
					if ((mgt+pnu) == "" && emd == "" && road == "") {
						$messageNew.open("알림", "읍면동/길을 선택(입력)해주세요.");
						return;
					}
					window.editor.setValue(qry);
				});

				//실행 및 결과보기 버튼 이벤트
				$("#btnExec").on("click", function() {
					var param = new Object();
					var qry_txt = window.editor.getValue();
					if (qry_txt.indexOf("AND")<0) return;
					
					var param = new Object();
					param.db_type = $addrDbMng.ui.addr_type;
					param.qry_txt = qry_txt;
					
					var options = {
						isBeforSend : true,
						method : "POST",
						params : param
					};
					$ajax.requestApi(contextPath + "/api/collect/execQryAddr.do", options,  function(res) {
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
								$log.srvLogWrite("Z3", "04", "01", "02", "", "");
								
								var data = res.result;
								var html = "";
								for (var arri=0;arri<data.length;arri++) {
									var obj = data[arri];
									html += "<tr>";
									html += "<td>" + obj.bd_mgt_sn + "</br>" + obj.pnu + "</td>";
									html += "<td>" + obj.sido_nm + "</br>" + obj.sgg_nm + "</td>";
									html += "<td>" + obj.adm_nm + "</td>";
									html += "<td>" + obj.leg_nm + "</br>"+ obj.ri_nm + "</td>";
									html += "<td>" + obj.road_nm + "</td>";
									html += "<td>" + obj.road_nm_main_no + "</td>";
									html += "<td>" + obj.road_nm_sub_no + "</td>";
									html += "<td>" + obj.pcl + "</td>";
									html += "<td>" + obj.bd_main_nm + "</br>" + obj.bd_sub_nm + "</td>";
									html += "<td>" + obj.x_coor + "</br>" + obj.y_coor + "</td>";
									html += "<td>보기</td>";
									html += "</tr>";
								}
								$("#addrResult > tbody:last").empty();
								$("#addrResult > tbody:last").append(html);

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
				});
			}
	};
	
}(window,document));