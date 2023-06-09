/**
 * 인터랙티브맵 Kosis 메뉴에 대한 클래스 ( interactiveMap.js 에서 분리 )
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/10  초기 작성
 * author : 석진혁
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$policyWriteMapKosis = W.$policyWriteMapKosis || {};
	
	$(document).ready(
			function() {	
				$policyWriteMapKosis.request.getKosisItemRoot();
				$policyWriteMapKosis.event.setUIEvent();
	});
	
	$policyWriteMapKosis.ui = {
			org_id : null,					// 기관코드
			tbl_id : null,					// 테이블 코드
			tbl_id_linked : null,
			gis_se : 1,						// 지원 레벨 코드, 행정동 코드
			adm_cd : 0,						// 선택한 행정동 코드
			atdrc_yn : 0,					//자치구여부
			kosis_data_item_detail : null,	// where 절 구문 들어가는 변수
			kosis_data_item : null,			// 항목 코드
			kosis_data_period : null,		// 주기
			kosis_data_year : 0,			// 기준년도
			kosis_data_period_array : [],	// 주기, 년도 리스트
			kosis_data_field_list : [],		// 동적 세부 항목 리스트
			kosis_select_menu_text : null,	// 버튼 생성 시 출력 텍스트
			curSelectedTitle : null,
			kosis_result_data : [],			// 결과값 리스트
			map : null,
			tree : null,
			pAdmCd : null,
			table_name : null,
			curSelectNodeCheck : false,		//최하위 노드를 선택했을 때만 true
			curSelectNode : null,			//최하위 선택된 노드 정보
			kosis_obj_var_id : null,
			kosis_field_id : null,
			kosisCurrentPageIndex : 0,
			kosis_search_result_data : null,
			atdrcList : [
					"31010", //수원시 
					"31020", //성남시, 
					"31040", //안양시, 
					"31050", //부천시, 
					"31090", //안산시, 
					"31100", //고양시, 
					"31190", //용인시, 
					"33010", //청주시, 
					"34010", //천안시, 
					"35010", //전주시, 
					"37010", //포항시, 
					"38010", //창원시 
			],
			kosisSelectedTitle : [],
			
			
			/**
			 * 
			 * @name         : setKosisParams
			 * @description  : 조건버튼으로 만들어진 Kosis 통계정보에 대한 파라미터정보를 설정한다.
			 * @date         : 2014. 10. 10. 
			 * @author	     : 석진혁
			 * @history 	 :
			 */
			setKosisParams : function() {
				this.kosis_data_item = $("#kosisDetail").val();		// combobox('getValue');
				this.kosis_data_period = $("#kosisPeriod").val(); 	//combobox('getValue');
				this.kosis_data_year = $("#kosisYear").val();		//combobox('getValue');
				this.kosis_data_item_detail = "";

				var btnText = this.kosis_select_menu_text;
				btnText += " > ";
				btnText += $("#kosisDetail option:selected").text();				//combobox('getText');
				for(var i = 0; i < this.kosis_data_field_list.length; i++) {
					var tempObj = this.kosis_data_field_list[i];
					var selectId = "kosisSelectDataField_" + i;
					var selectIndex = $("#" + selectId).val();
						
					if(i == 0) {
						this.kosis_data_item_detail += tempObj.fieldId;
						this.kosis_data_item_detail += "::";
						this.kosis_data_item_detail += this.kosis_data_field_list[i].details[selectIndex].id;
					} else {
						this.kosis_data_item_detail += ",";
						this.kosis_data_item_detail += tempObj.fieldId;
						this.kosis_data_item_detail += "::";
						this.kosis_data_item_detail += this.kosis_data_field_list[i].details[selectIndex].id;
					}

					if(i == 0) {
						btnText += " > ";
					}

					btnText += tempObj.scrKor;
					btnText += "(";
					btnText += this.kosis_data_field_list[i].details[selectIndex].nm;
					btnText += ")";

					if(i != this.kosis_data_field_list.length - 1) {
						btnText += ", ";
					}
				}
								
				this.curSelectedTitle = btnText;	
				$policyWriteMapLeftMenu.ui.doReqStatsData();
				
			},

			/**
			 * 
			 * @name         : checkSubMenu
			 * @description  : 메뉴 트리 펼침 시 하위 메뉴 여부를 확인한다. ( 하위메뉴 호출 / 세부조건 호출 )
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 선택된 트리 메뉴 Object	
			 */
			checkSubMenu : function(subObj) {
				if(subObj.childCount > 0) {
					if(subObj.children[0].id == subObj.id + "_progress") {
						$policyWriteMapKosis.request.getKosisItemSub(subObj.listId);
					}
					//9월 서비스
					$(".sideQuick.sq02").stop().animate({"left":"560px"},200);
					$("#kosisDetailDiv").stop().animate({"left":"-280px"},200);
//					$("#kosisDetailDiv").stop().animate({"left":"0px"},200);
					$(".stepClose.3depth_close").stop().animate({"right":"-25px"}, 200);	// 2019.01.22	ywKim	추가
				} else {
					this.tree.activateNode(subObj.id);
					
					this.org_id = subObj.orgId;
					this.tbl_id = subObj.tblId;
					this.gis_se = subObj.gisSe;
					this.kosis_obj_var_id = subObj.obj_var_id;
					this.kosis_field_id = subObj.field_id;

					var tempIndex = subObj.text.indexOf("<img src");
					if(tempIndex > 0) {
						this.kosis_select_menu_text = subObj.text.substring(0, tempIndex - 1);
					} else {
						this.kosis_select_menu_text = subObj.text;
					}
					/*if(tempIndex > 0) {
						this.kosis_select_menu_text = subObj.text.substring(0, tempIndex - 1);
						if("dataData" == $interactiveMap.ui.curMenuType){//추가
							if("left" == $interactiveMap.ui.curDataSelect){
								this.kosisSelectedTitle[0] = this.kosis_select_menu_text;
							}else if("right" == $interactiveMap.ui.curDataSelect){
								this.kosisSelectedTitle[1] = this.kosis_select_menu_text;
							}
						}
					} else {
						this.kosis_select_menu_text = subObj.text;
						if("dataData" == $interactiveMap.ui.curMenuType){//추가
							if("left" == $interactiveMap.ui.curDataSelect){
								this.kosisSelectedTitle[0] = this.kosis_select_menu_text;
							}else if("right" == $interactiveMap.ui.curDataSelect){
								this.kosisSelectedTitle[1] = this.kosis_select_menu_text;
							}
						}
					}*/
					$policyWriteMapKosis.request.getKosisStaticDataField(this.org_id, this.tbl_id, this.kosis_obj_var_id);
				}
			},

			/**
			 * 
			 * @name         : setKosisItemOnTree
			 * @description  : Kosis Root 메뉴 트리 생성
			 * @date         : 2014. 10. 10 
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 조회한 결과 Object	
			 */
			setKosisItemOnTree : function(subObj) {
				var result = [];

				for(var i=0; i < subObj.length; i++)
				{
					var tmpObj = {};
					tmpObj.id = subObj[i].list_id;
					tmpObj.listId = subObj[i].list_id;
					tmpObj.text = subObj[i].list_nm;
					tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
					tmpObj.state = "closed";

					result.push(tmpObj);
				}
				
				this.tree = $("#kosisStatsTree").easytree({
					slidingTime:0,
					data : result,
					allowActivate: true,
		            disableIcons: true,
		            building:$policyWriteMapLeftMenu.event.kosisTreeWidth,
		            stateChanged:$policyWriteMapLeftMenu.event.kosisTreeWidth,
		            toggled : $policyWriteMapLeftMenu.event.kosisTreeWidth,
		            toggled : function(event, nodes, node) {
						if (node.childCount == null) {
							// 2016. 03. 28 j.h.Seok modify
							if(node.id != "no_item_progress" && node.children[0].id == node.id + "_progress") {
								$policyWriteMapKosis.request.getKosisItemSub(node.listId);
							}
						} else {
							$policyWriteMapKosis.ui.checkSubMenu(node);
							$policyWriteMapKosis.ui.curSelectNode = node;	//현재 선택된 노드
							$policyWriteMapKosis.ui.atdrc_yn = node.atdrc_yn;
						}
					},
					selected : function(node) {
						//최하위 노드
						if (node.childCount == 0) {
							$policyWriteMapKosis.ui.curSelectNodeCheck = true;
//							$policyWriteMapKosis.ui.checkSubMenu(node);
							$policyWriteMapKosis.ui.curSelectNode = node;	//현재 선택된 노드
							$policyWriteMapKosis.ui.atdrc_yn = node.atdrc_yn;
						} else {	//상위 노드
							$policyWriteMapKosis.ui.curSelectNodeCheck = false;
						}
					}
				})
			},

			/**
			 * 
			 * @name         : appendKosisItemOnTree
			 * @description  : 선택된 트리메뉴의 하위 메뉴 생성
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 조회한 결과 Object	
			 */
			appendKosisItemOnTree : function(subObj, list_id) {
				if(subObj.length < 1) {
					messageAlert.open("알림", "대화형 통계지도에서 해당 항목을 서비스 준비중입니다.");
					
					var tmpObj = {};
					tmpObj.id = "no_item_progress";
					tmpObj.text = "항목 서비스 준비중";
					this.tree.addNode(tmpObj, list_id);
					
					this.tree.removeNode(list_id + "_progress");
					this.tree.rebuildTree();
					
					return;
				}
				
				var result = [];
				var upListId = subObj[0].up_list_id;
				for(var i=0; i < subObj.length; i++)
				{
					var tmpObj = {};
					tmpObj.id = subObj[i].list_id;
					tmpObj.listId = subObj[i].list_id;
					tmpObj.text = subObj[i].list_nm + "  ";
					
					var tempGisSe = parseInt(subObj[i].gis_se);
					switch(tempGisSe) {
					case 1:
						tmpObj.text = tmpObj.text + "<img src='/img/ico/kosis_gis_se_sido.png' width='4px' height='13px' />";
						break;
						
					case 2:
						tmpObj.text = tmpObj.text + "<img src='/img/ico/kosis_gis_se_sido.png' width='4px' height='13px' />" 
							+ "<img src='/img/ico/kosis_gis_se_sgg.png' width='4' height='13' />";
						break;
						
					case 3:
						tmpObj.text = tmpObj.text + "<img src='/img/ico/kosis_gis_se_sido.png' width='4px' height='13px' />" 
							+ "<img src='/img/ico/kosis_gis_se_sgg.png' width='4' height='13' />" 
							+ "<img src='/img/ico/kosis_gis_se_adm.png' width='4' height='13' />";
						break;
					}
					tmpObj.childCount = subObj[i].child_cnt;

					if(tmpObj.childCount > 0) {
						tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
						tmpObj.state = "closed";
					} else {
						tmpObj.id = subObj[i].list_id + i;
						tmpObj.listId = subObj[i].list_id;
					}

					tmpObj.tblId = subObj[i].list_id;
					tmpObj.orgId = subObj[i].org_id;
					tmpObj.gisSe = subObj[i].gis_se;
					tmpObj.obj_var_id = subObj[i].obj_var_id;
					tmpObj.field_id = subObj[i].field_id;
					tmpObj.atdrc_yn = subObj[i].atdrc_yn;

					result.push(tmpObj);
				}

				for (var i=0; i<result.length; i++) {
					this.tree.addNode(result[i], upListId);
					
				}
				
				this.tree.removeNode(upListId + "_progress");
				this.tree.rebuildTree();
				
				this.tree.activateNode(upListId);
			},
			
			/**
			 * 
			 * @name         : setStaticDataFields
			 * @description  : 선택한 항목의 고정적 세부조건 메뉴 생성 ( 주기 / 년도 / 세부항목 )
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 조회한 결과 Object	
			 */
			setStaticDataFields : function(subObj) {
				// 세부항목
				var dataItems = subObj.dataItem;
				var selectDataItem = [];
				for(var i = 0; i < dataItems.length; i++) {
					var tempObj = {};
					tempObj.value = dataItems[i].ITM_ID;
					tempObj.label = dataItems[i].ITM_NM;

					if(i == 0) {
						tempObj.selected = true;
					}

					selectDataItem.push(tempObj);
				}
				
				//9월 서비스
				$("#kosisDataFieldTable").html(""); 
				var html = "";
				html += "<p class='off'>세부항목";
				html += "	<select title='세부항목' id='kosisDetail' name='kosisDetail' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<selectDataItem.length; i++) {
					html += 		"<option value=" + selectDataItem[i].value + ">";
					html += 			selectDataItem[i].label;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				// 주기, 년도
				var staticFieldsItems = subObj.staticFields;
				this.kosis_data_period_array = [];

				for(var i = 0; i < staticFieldsItems.length; i++) {
					var tempObj = {};
					tempObj.prdSe = staticFieldsItems[i].PRD_SE;
					tempObj.prdSeNm = staticFieldsItems[i].PRD_SE_NM;
					tempObj.values = [];
					
					if(tempObj.prdSeNm == "부정기" && tempObj.prdSe == 'F' 
						&& staticFieldsItems[i].PRD_DETAIL != null && staticFieldsItems[i].PRD_DETAIL != undefined) {
						this.exchangeText(staticFieldsItems[i].PRD_DETAIL, tempObj);
					}

					var periodValues = staticFieldsItems[i].periodValue;

					for(var j = 0; j < periodValues.length; j++) {
						var tempVal = {};
						tempVal.prdDe = periodValues[j].PRD_DE;
						tempVal.prdDeNm = periodValues[j].PRD_DE_NM;

						if(j == 0) {
							tempVal.selected = true;
						}

						tempObj.values.push(tempVal);
					}

					if(i == 0) {
						tempObj.selected = true;
					}

					this.kosis_data_period_array.push(tempObj);
				}
				
				//9월 서비스
				//주기
				html += "<p class='off'>주기";
				html += "	<select title='주기' id='kosisPeriod' name='kosisPeriod' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<this.kosis_data_period_array.length; i++) {
					html += 		"<option value=" + this.kosis_data_period_array[i].prdSe + ">";
					html += 			this.kosis_data_period_array[i].prdSeNm;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				//년도
				html += "<p class='off'>년도";
				html += "	<select title='년도' id='kosisYear' name='kosisYear' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<this.kosis_data_period_array[0].values.length; i++) {
					html += 		"<option value=" + this.kosis_data_period_array[0].values[i].prdDe + ">";
					html += 			this.kosis_data_period_array[0].values[i].prdDeNm;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				this.setDataFieldList(subObj, html);
			},
			
			exchangeText : function(detail, tempObj) {
				var text = "";
				if(detail.length > 2) {
					var lastIndex = detail.length - 1;
					text += detail.substring(0, lastIndex);
					if((detail.substring(lastIndex)).toUpperCase == 'Y') {
						text += "년";
					} else if((detail.substring(lastIndex)).toUpperCase == 'M') {
						text += "월";
					} else if((detail.substring(lastIndex)).toUpperCase == 'D') {
						text += "일";
					}
				} else {
					var period = (detail.substring(1)).toUpperCase();
					text += detail.substring(0, 1);
					if(period == 'Y') {
						text += "년";
					} else if(period == 'M') {
						text += "월";
					} else if(period == 'D') {
						text += "일";
					}
				}
				
				tempObj.prdSeNm = text;
			},
			
			/**
			 * 
			 * @name         : setStaticDataFieldsForSearchList
			 * @description  : 선택한 항목의 세부조건 생성, 연관검색어에서 호출 시 사용
			 * @date         : 2014. 11. 12
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 조회한 결과 Object	
			 */
			setStaticDataFieldsForSearchList : function(subObj, options) {
				// 세부항목
				var dataItems = subObj.dataItem;
				var selectDataItem = [];
				for(var i = 0; i < dataItems.length; i++) {
					var tempObj = {};
					tempObj.value = dataItems[i].ITM_ID;
					tempObj.label = dataItems[i].ITM_NM;

					if(i == 0) {
						tempObj.selected = true;
					}

					selectDataItem.push(tempObj);
				}
				
				var html = "";
				html += "	<p class='off'>";
				html += "	세부항목";
				html += "	<select id='kosisDetail'>";
				for (var  i=0; i<selectDataItem.length; i++) {
					html += 		"<option value=" + selectDataItem[i].value + ">";
					html += 			selectDataItem[i].label;
					html += 		"</option>";
				}
				html += "</p>"
				html += "	</select>"
				
				// 주기, 년도
				var staticFieldsItems = subObj.staticFields;
				this.kosis_data_period_array = [];

				for(var i = 0; i < staticFieldsItems.length; i++) {
					var tempObj = {};
					tempObj.prdSe = staticFieldsItems[i].PRD_SE;
					tempObj.prdSeNm = staticFieldsItems[i].PRD_SE_NM;
					tempObj.values = [];
					
					if(tempObj.prdSeNm == "부정기" && tempObj.prdSe == 'F' 
						&& staticFieldsItems[i].PRD_DETAIL != null && staticFieldsItems[i].PRD_DETAIL != undefined) {
						this.exchangeText(staticFieldsItems[i].PRD_DETAIL, tempObj);
					}

					var periodValues = staticFieldsItems[i].periodValue;

					for(var j = 0; j < periodValues.length; j++) {
						var tempVal = {};
						tempVal.prdDe = periodValues[j].PRD_DE;
						tempVal.prdDeNm = periodValues[j].PRD_DE_NM;

						if(j == 0) {
							tempVal.selected = true;
						}

						tempObj.values.push(tempVal);
					}

					if(i == 0) {
						tempObj.selected = true;
					}

					this.kosis_data_period_array.push(tempObj);
				}
				
				html += "	<p class='off'>";
				html += "	주기";
				html += "	<select id='kosisPeriod'>";
				for (var  i=0; i<this.kosis_data_period_array.length; i++) {
					html += 		"<option value=" + this.kosis_data_period_array[i].prdSe + ">";
					html += 			this.kosis_data_period_array[i].prdSeNm;
					html += 		"</option>";
				}
				html += "	</select>"
				html += "</p>";
				
				html += "	<p class='off'>";
				html += "	년도";
				html += "	<select id='kosisYear'>";
				for (var  i=0; i<this.kosis_data_period_array[0].values.length; i++) {
					html += 		"<option value=" + this.kosis_data_period_array[0].values[i].prdDe + ">";
					html += 			this.kosis_data_period_array[0].values[i].prdDeNm;
					html += 		"</option>";
				}
				html += "	</select>"
				html += "</p>";
				
				this.setDataFieldList(subObj, html);
				
				var dataItems = subObj.dataItem;

				if(dataItems.length == 0) {
					messageAlert.open("알림", "검색결과가 존재하지 않습니다.");
					return;
				}
				
				this.kosis_data_item = dataItems[0].ITM_ID;

				// 주기, 년도
				var staticFieldsItems = subObj.staticFields;
				
				this.kosis_data_period = staticFieldsItems[0].PRD_SE;
				this.kosis_data_year = staticFieldsItems[0].periodValue[0].PRD_DE;

				var dataField = subObj.dataFieldList;
				if(dataField != null && dataField != undefined) {
					this.kosis_data_item_detail = "";
					for(var i = 0; i < dataField.length; i++) {
						var tempObj = {};
						this.kosis_data_item_detail += dataField[i].FIELD_ID;
						this.kosis_data_item_detail += "::";
						
						var details = dataField[i].details;
						this.kosis_data_item_detail += details[0].ITM_ID;
						
						if(i != dataField.length - 1) {
							this.kosis_data_item_detail += ",";
						}
					}
				}
				
				var org_id;
				var tbl_id;
				var gis_se;
				var adm_cd;
				var center;
				var zoom;
				var url;
				var title;
				
				for(var i = 0; i < options.length; i++) {
					var temp = options[i];
					
					if(temp.key == "org_id") {
						org_id = temp.value;
					} else if(temp.key == "tbl_id") {
						tbl_id = temp.value;
					} else if(temp.key == "gis_se") {
						gis_se = temp.value;
					} else if(temp.key == "adm_cd") {
						adm_cd = temp.value;
					} else if(temp.key == "center") {
						center = temp.value;
					} else if(temp.key == "zoom") {
						zoom = temp.value;
					} else if(temp.key == "url") {
						url = temp.value;
					} else if(temp.key == "title") {
						title = temp.value;
						if(title == undefined || title == "undefined" || title == null || title == "null" && $policyWriteMapKosis.ui.table_name != null) {
							title = $policyWriteMapKosis.ui.table_name;
							title = title + " (" + this.kosis_data_year + ")";
						} else {
							title = title + " (" + this.kosis_data_year + ")";
						}
					}
				}
				
				var tempparams = {};
				
				tempparams.org_id = org_id;
				tempparams.tbl_id = tbl_id;
				if ($policyWriteMapKosis.ui.kosis_data_item_detail != null
						&& $policyWriteMapKosis.ui.kosis_data_item_detail.length > 2) {
					tempparams.kosis_data_item_detail = $policyWriteMapKosis.ui.kosis_data_item_detail;
				} else {
					tempparams.kosis_data_item_detail = " ";
				}
				tempparams.kosis_data_item = $policyWriteMapKosis.ui.kosis_data_item;
				tempparams.kosis_data_period = $policyWriteMapKosis.ui.kosis_data_period;
				tempparams.kosis_data_year = $policyWriteMapKosis.ui.kosis_data_year;
				tempparams.gis_se = adm_cd;
				
				tempparams.obj_var_id = $policyWriteMapKosis.ui.kosis_obj_var_id;
				tempparams.field_id = $policyWriteMapKosis.ui.kosis_field_id;
				
//				var yearArr = [];
//				var options = $('#bndYear option');
//				var values = $.map(options ,function(option) {
//					yearArr.push(option.value);
//				});
//				
//				var yearMax = Math.max.apply(null, yearArr);
//				var yearMin = Math.min.apply(null, yearArr);
				
				var year = $policyWriteMapKosis.ui.kosis_data_year;
				if(year.length > 4) {
					year = year.substring(0, 4);
				}
				
				// 2016. 03. 23 j.h.Seok 수정
				if(year < 2000) {
					year = 2000;
				} else if(year > bndYear) {
					year = bndYear;
				}
				
				var shareInfo = {
					api_call_url : url,
					param_info : {
						isKosis : true,
						mapInfo : {
							center : center,
							zoomlevel : zoom
						},
						paramInfo : tempparams,
						title : title,
						gis_se_bak : gis_se,
						api_id : "kosis"
					},
					title : title
				}
				
				var tmpShareInfo = [];
				var tmpParams = deepCopy(shareInfo);
//				tmpParams.param_info = JSON.stringify(tmpParams.param_info);
				tmpShareInfo.push(tmpParams);
//				$policyWriteMapLeftMenu.ui.setRevertParams(tmpShareInfo, "share");
				
				// 2016. 03. 23 j.h.Seok 수정
				$interactiveMap.ui.dropBtnInfo[$interactiveMap.ui.curMapId] = tmpParams;
				$interactiveMap.ui.dropBtnInfo[$interactiveMap.ui.curMapId]["isKosis"] = true;
				
				$interactiveMapApi.request.openApiShareForStats(shareInfo);
			},

			/**
			 * 
			 * @name         : setDataFieldList
			 * @description  : 선택된 메뉴의 유동적 상세조건 메뉴 생성
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param subObj : 조회한 결과 Object	
			 */
			setDataFieldList : function(subObj, html) {
				// 세부항목
				var dataField = subObj.dataFieldList;
				var selectDataItem = [];
				this.kosis_data_field_list = [];
				
				for(var i = 0; i < dataField.length; i++) {
					var tempObj = {};
					tempObj.fieldId = dataField[i].FIELD_ID;
					tempObj.scrKor = dataField[i].SCR_KOR;
					tempObj.objVarId = dataField[i].OBJ_VAR_ID;
					tempObj.details = [];

					var details = dataField[i].details;
					for(var j = 0; j < details.length; j++) {
						var tempVal = {};
						tempVal.id = details[j].ITM_ID;
						tempVal.nm = details[j].ITM_NM;
						
						if(details[j].LEV != null && details[j].LEV  != undefined) {
							tempVal.nmTree = "";
							for(var k = 1; k < details[j].LEV; k++) {
								tempVal.nmTree += "&nbsp;&nbsp;ㄴ";
							}
							tempVal.nmTree += details[j].ITM_NM;
						}

						if(j == 0) {
							tempVal.selected = true;
						}

						tempObj.details.push(tempVal);
					}

					this.kosis_data_field_list.push(tempObj);
					
					//9월 서비스
					html += "<p class='off'>" + tempObj.scrKor;
					html += "	<select id='kosisSelectDataField_" + i + "' style='font-size:13px;width:100px;'>";
					for (var x=0 ; x<this.kosis_data_field_list[i].details.length; x++) {
						html += 		"<option value=" + x + ">";
						html += 		this.kosis_data_field_list[i].details[x].nmTree;
						html += 		"</option>";
					}
					html += "	</select>"
					html += "</p>";
				}

				$("#kosisDataFieldTable").html(html);
				$("#kosisOrigin").html("출처 : KOSIS(<a href='javascript:$policyWriteMapKosis.ui.kosisLinked();'>통계표보기</a>)"); //9월 서비스
				
				$("#kosisPeriod").change(function(){
					$("#kosisYear")
						.find("option")
						.remove()
						.end();
				
					var tmpYear = null;
					var tmpPeriodData = $policyWriteMapKosis.ui.kosis_data_period_array;
					for (var i=0; i<tmpPeriodData.length; i++) {
						if (tmpPeriodData[i].prdSe == $(this).val()) {
							tmpYear = tmpPeriodData[i].values;
							break;
						}
					}
					
					for (var i=0; i<tmpYear.length; i++) {
						$("#kosisYear").append($("<option>", { 
					        value: tmpYear[i].prdDe,
					        text : tmpYear[i].prdDeNm
					    }));
					}
					
				});
				
				//9월 서비스
				var tempText = this.kosis_select_menu_text;
				var kosisTitle = $.trim(tempText);
				$("#kosisTitle").text(kosisTitle);
			},

			/**
			 * 
			 * @name         : setResultDataOnMap
			 * @description  : 조회 결과 데이터를 지도 위에 텍스트로 표출한다.
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 */
			setResultDataOnMap : function() {
				var that = this;
				var tempObj = $policyWriteMapKosis.ui.kosis_result_data;
				
				if (this.map.dataGeojson) {
					this.map.dataGeojson.eachLayer(function (layer) {
						for(var i = 0; i < tempObj.length; i++) {
							if(layer.feature.properties.adm_cd == tempObj[i].CODE) {
								// Kosis 통계 조회 결과의 행정동 코드와 경계데이터 조회 결과의 행정동 코드를 비교 후
								// 행정동 이름을 동기화 시켜준다. ( 폴리곤 선택 시 챠트 하이라이트 )
								var ssaArray = layer.feature.properties.adm_nm.split(" ");
								switch(ssaArray.length) {
								case 1:
									tempObj[i].NAME = ssaArray[0];
									break;
									
								case 2:
									tempObj[i].NAME = ssaArray[1];
									break;

								case 3:
									tempObj[i].NAME = ssaArray[2];
									break;
								}
								break;
							}
						}
					});

//					this.map.mapInfo.updateKosisBarChart(this.kosis_result_data, this.curSelectedTitle);
//					this.map.mapInfo.updateSearchTitle(this.curSelectedTitle);
//					this.map.mapInfo.updateLegendRangeKosis(this.kosis_result_data);
					
//					$interactiveDataBoard.ui.updateDataBoardKosis(tempObj, this.curSelectedTitle);
				}else {
					messageAlert.open("알림", "검색결과가 존재하지 않습니다.");
				}
			},
			
			kosisLinked : function() {
				if($policyWriteMapKosis.ui.tbl_id_linked == null || $policyWriteMapKosis.ui.tbl_id_linked == undefined) {
					$policyWriteMapKosis.ui.tbl_id_linked = $policyWriteMapKosis.ui.tbl_id;
				}
				var url = "http://kosis.kr/statHtml/statHtml.do?";
				url += "orgId=";
				url += $policyWriteMapKosis.ui.org_id;
				url += "&tblId=";
				url += $policyWriteMapKosis.ui.tbl_id_linked;
				url += "&conn_path=I2";
				
				window.open(url);
			},
			
			
			
			/**
			 * 
			 * @name         : setKosisStatsData
			 * @description  : 지도 경계 데이터에 조회한 결과 데이터를 합성하기 위한 구분자 삽입
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 */
			setKosisStatsData : function (receiveMap, logOptions) {
				if(this.map == null || this.map == undefined) {
					this.map = receiveMap;
				}
				this.map.data = [];
				
				var tempData = {};
				tempData.kosis = true;
				if($policyWriteMapKosis.ui.pAdmCd == "1") {
					$policyWriteMapKosis.ui.pAdmCd = "00";
				}
				tempData.pAdmCd = $policyWriteMapKosis.ui.pAdmCd;
				this.map.data.push(tempData);
				
				this.map.data.push(this.kosis_result_data);
				this.map.dataType = "kosis";
				this.map.dataForCombine = this.kosis_result_data;
				
				var yearArr = [];
				var options = $('#bndYear option');
				var values = $.map(options ,function(option) {
					yearArr.push(option.value);
				});
				
				var yearMax = Math.max.apply(null, yearArr);
				var yearMin = Math.min.apply(null, yearArr);
				
				var year = $policyWriteMapKosis.ui.kosis_data_year;
				if(year.length > 4) {
					year = year.substring(0, 4);
				}
				
				// 2016. 03. 23 j.h.Seok 수정
				if(year < 2000) {
					year = 2000;
				} else if(year > bndYear) {
					year = bndYear;
				}
				
				this.map.bnd_year = year;
				
				//API 로그 세팅용 파라미터 세팅
				if(logOptions.params.param_info != undefined) {
					logOptions.params["param"] = [];
					for(key in logOptions.params.param_info.paramInfo) {
						logOptions.params["param"].push({"key" : key, "value" : logOptions.params.param_info.paramInfo[key]});
					}
				}
				
				var tmpOptions = {
						type : "A0",
						btntype : "kosis",
						params : {
							title : logOptions.params.title,
							param : logOptions.params.param,
							map : this.map,
							adm_cd : $policyWriteMapKosis.ui.pAdmCd
						}
				}
				
				//API로그 쌓기 (행정동코드로 지역 조회)
				addrCdToNm(this.map.bnd_year, tmpOptions.params.adm_cd, tmpOptions);
			},
			
			/**
			 * 
			 * @name         : combineKosisStatsData
			 * @description  : 지도 경계 데이터에 조회한 결과 데이터 합성
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param boundData: 해당 레벨의 경계데이터
			 */
			combineKosisStatsData : function(boundData) {
				var tempData = this.map.data[1];
				var arData = new Array();
				var tmpData = new Array();
				
				var tempList = [];

				for(var i = 0; i < tempData.length; i++) {
					var tempIndex = parseInt(tempData[i].CODE);
					for(var j = 0; j < boundData.features.length; j++) {
						var adm_cd = boundData.features[j].properties.adm_cd;
						
						if(adm_cd == tempIndex) {
							tempList.push(tempData[i]);
							break;
						}
					}
				}
				
				tempData = [];
				tempData = tempList;
				$policyWriteMapKosis.ui.kosis_result_data = tempData;
				
				for(var k = 0; k < tempData.length; k++) {
					if(tempData[k] != null) {
						boundData["combine"] = true;
					} else {
						boundData["combine"] = false;
					}
					
					for(var i = 0; i < boundData.features.length; i++) {
						var adm_cd = boundData.features[i].properties.adm_cd;
						
						if(boundData.features[i].info == null) {
							boundData.features[i]["info"] = [];
						}
						if(adm_cd == tempData[k].CODE) {
							boundData.features[i]["isKosis"] = true;
							boundData.features[i].info.push(tempData[k].DATA);
							boundData.features[i].info.push(tempData[k].UNIT);
							boundData.features[i].info.push("kosis");
							boundData.features[i].info.push(tempData[k].PRD_DE);
							boundData.features[i]["dataIdx"] = k;
							tmpData.push(tempData[k].DATA *= 1);
						}
					}
				}
				arData.push(tmpData);
				
				//경계고정이 아닐경우, 수행
				if (!$policyWriteMapKosis.ui.map.isFixedBound) {
					this.setLegendForKosisStatsData(arData);
				}
				
				return boundData;
			},
			
			/**
			 * 
			 * @name         : setLegendForKosisStatsData
			 * @description  : 범례 생성을 위한 최소/최대 값 및 값의 영역 정의
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param arData : 합성된 경계 및 데이터 Object	
			 */
			setLegendForKosisStatsData : function(arData) {
//				this.map.valPerSlice = this.calculateLegend(arData);
				this.map.legend.valPerSlice = this.map.legend.calculateLegend(arData);
			},
			
			
			/**
			 * 
			 * @name         : dataFieldClose
			 * @description  : KOSIS 상세설정 팝업 닫기
			 * @date         : 2015. 10. 28
			 * @author	     : 김성현
			 * @history 	 :
			 */
			dataFieldClose : function() {
				$("#kosisArea").hide();
				/*messageConfirm.open(
						"행정구역통계 설정 종료",
						"세부조건 설정창을 닫으면 행정구역통계 조건설정에 대한 설정과정이 완전히 종료됩니다.",
						btns = [
								{
								    title : "종료",
								    fAgm : null,
								    disable : false,
								    func : function(opt) {
								    	$("#kosisArea").hide();
								    }
								 },
								 
			    			     {
								   title : "취소",
								   fAgm : null,
								   disable : false,
								   func : function(opt) {
								   }
			    			     }   
			    			 ]
				);*/
			},
			
			
			/**
			 * 
			 * @name         : checkKosisBtn
			 * @description  : KOSIS 버튼 유무체크
			 * @date         : 2016.07. 19
			 * @author	     : 권차욱
			 * @history 	 :
			 */
			 //9월 서비스
			checkKosisBtn : function() {
				var isKosis = false;
				$(".dragItem").each(function(idx) {
					var id = $(this).find("a").attr("id");
					if (id.indexOf("kosis") != -1) {
						isKosis = true;
					}
				}) ;
				return isKosis
			},
			
			
			
			/**
			 * 
			 * @name         : kosisSearchResult
			 * @description  : KOSIS 검색 결과 화면 생성
			 * @date         : 2015. 12. 08
			 * @author	     : 석진혁
			 * @history 	 :
			 */
			kosisSearchResult : function(result) {
				$policyWriteMapKosis.ui.kosis_search_result_data = result.resultdata;
				
				var html = "";
				html += '<div style="text-align: center;">';
				html += '	<a href="javascript:$policyWriteMapKosis.ui.kosisTreeShow();" class="btnStyle01">KOSIS 목록으로</a>';
				html += '</div>';
				html += '<p class="result">검색결과 : ' + result.totalcount + '개</p></br>';
				html += '<ul class="xWidth radioStepOneBox">';
				for(var i = 0; i < result.resultdata.length; i ++) {
					var elem = result.resultdata[i];	            										
					html += "<li>";
					//9월 서비스
					html += "<table>";
					html += 	"<tr>";
					html +=			"<td style='vertical-align:top;'><div style='cursor: pointer;margin-top:1px;'>● </div></td>";
					html +=			"<td style='width:10px;'></td>";
					html +=			"<td title='"+elem.menu_path+"'><a style='font-size:13px;' href = 'javascript:$policyWriteMapKosis.ui.kosisClick(";
					html += 		i;
					html += 		");'>" + elem.kosis_menu_nm + "</a></td>";
					html +=		"</tr>";
					html +=	"</table>";
					html += "<div style='height:10px;'></div>";
				}
				html += '</ul>';
				html += '<div id="article-wrap">';
				html += '<div id="kosis_SearchBox_paging"></div>';
				html += '</div>';
				
				$("#kosis_SearchBox").html(html);
				
//				$("#kosis_SearchBox").html(html);
//				var temp = $("<div id='kosis_SearchBox_paging'>");
//				$("#kosis_SearchBox").append(temp);
				
				//KOSIS 클릭 시 리버스지오코딩을 호출 하기 위해
//				$("#kosis_SearchBox").find("li > div > a").on('click', function() {
//					$policyWriteMapKosis.ui.kosisClick(result.resultdata, $(this).parent().index());
//				});

				if(result.totalcount > 10){
					var htmlPage = "<br><div id='kosisPaging' class='pagenation' align='center' style='width: 100%;'><span class='pages'></span>";
					$("#kosis_SearchBox_paging").html(htmlPage);
				}
				
				$policyWriteMapKosis.ui.kosisPaging(result.totalcount, $policyWriteMapKosis.ui.kosisCurrentPageIndex);
				
				$("#kosisStatsTree").hide();
				$("#kosis_SearchBox").show();
			},
			
			/**
			 * 
			 * @name         : kosisTreeShow
			 * @description  : KOSIS목록 보이기
			 * @date         : 2015. 10. 28. 
			 * @author	     : 김성현
			 * @history 	 :
			 */
			kosisTreeShow : function() {
				$("#kosisStatsTree").show();
				$("#kosis_SearchBox").hide();
				
				//2016.09.05 9월 서비스
				$(".scrollBox").mCustomScrollbar("update");
				$("#mCSB_6_container").css("width", $("#mCSB_13_container").width()+"px");
			},
			
			/**
			 * 
			 * @name         : kosisPaging
			 * @description  : KOSIS 검색화면 페이징
			 * @date         : 2015. 12. 08. 
			 * @author	     : 석진혁
			 * @history 	 :
			 */
			kosisPaging : function(totalCount, currentIndex) {
				var pageSize = 10;
				var totalPage = Math.ceil( totalCount / pageSize);
				$('#kosis_SearchBox_paging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$policyWriteMapKosis.ui.kosisCurrentPageIndex = page-1;
						$policyWriteMapKosis.request.kosisSearch(page-1);
					}
				});
			},
			
			kosisClick : function(index) {
				// 2016. 03. 23 j.h.Seok 수정
				var tempData = $policyWriteMapKosis.ui.kosis_search_result_data[index];
				
				this.org_id = tempData.kosis_inst_cd;
				this.tbl_id = tempData.kosis_menu_id;
				this.gis_se = tempData.gis_se;
				this.kosis_obj_var_id = tempData.administzone_item_cd;
				this.kosis_field_id = tempData.field_id;

				var tempIndex = tempData.kosis_menu_nm.indexOf("<img src");
				if(tempIndex > 0) {
					this.kosis_select_menu_text = tempData.kosis_menu_nm.substring(0, tempIndex - 1);
				} else {
					this.kosis_select_menu_text = tempData.kosis_menu_nm;
				}
				$policyWriteMapKosis.request.getKosisStaticDataField(this.org_id, this.tbl_id, this.kosis_obj_var_id);
			},
			

	};
	
	$policyWriteMapKosis.request = {
			
			/**
			 * 
			 * @name         : getTableName
			 * @description  : KOSIS 테이블 명 조회
			 * @date         : 2015. 08. 28 
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 * @param tbl_id : 조회 할 테이블 아이디
			 */
			getTableName : function(tbl_id) {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisTableName.do",
					type : "GET",
					data : {
						"tbl_id" : tbl_id
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result;
								$policyWriteMapKosis.ui.table_name = result.TableName[0].TBL_NM;
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * 
			 * @name         : getKosisItemRoot
			 * @description  : Kosis 최상위 메뉴 조회
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 */
			getKosisItemRoot : function() {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisTreeMenu.do",
					type : "GET",
					data : {
						"up_list_id" : "ROOT"
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result.kosis_menu;
								$policyWriteMapKosis.ui.setKosisItemOnTree(result);
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},

			/**
			 * 
			 * @name         : getKosisItemSub
			 * @description  : 선택된 메뉴의 하위 메뉴 조회
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 * @param list_id: 선택된 메뉴에 해당하는 ID
			 */
			getKosisItemSub : function(list_id) {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisTreeMenu.do",
					type : "GET",
					data : {
						"up_list_id" : list_id
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result.kosis_menu;
								$policyWriteMapKosis.ui.appendKosisItemOnTree(result, list_id);
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},

			/**
			 * 
			 * @name         : getKosisStaticDataField
			 * @description  : 선택된 항목의 고정적인 세부조건 조회
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 * @param org_id : 기관 아이디
			 * @param tbl_id : 테이블 아이디
			 * @param kosis_obj_var_id
			 */
			getKosisStaticDataField : function(org_id, tbl_id, kosis_obj_var_id) {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataStaticFields.do",
					type : "GET",
					data : {
						"org_id" : org_id,
						"tbl_id" : tbl_id,
						"obj_var_id" : kosis_obj_var_id
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result  = res.result;
								$(".sideQuick.sq02").stop().animate({"left":"840px"},200);
								$("#kosisDetailDiv").stop().animate({"left":"360px"},200);	// 2019.01.22	ywKim	변경
//								$("#kosisDetailDiv").stop().animate({"left":"560px"},200);
								$(".stepClose.3depth_close").stop().animate({"right":"-304px"}, 200);	// 2019.01.22	ywKim 추가
								$policyWriteMapKosis.ui.setStaticDataFields(result);
								$policyWriteMapKosis.ui.tbl_id_linked = $policyWriteMapKosis.ui.tbl_id;
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * 
			 * @name         : getKosisDetailOption
			 * @description  : obj_var_id, field_id 가져오기
			 * @date         : 2015. 12. 03
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 * @param org_id : 기관 아이디
			 * @param tbl_id : 테이블 아이디
			 * @param options: 옵션정보
			 */
			getKosisDetailOption : function(org_id, tbl_id, options) {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDetailOption.do",
					type : "GET",
					data : {
						"org_id" : org_id,
						"tbl_id" : tbl_id
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result;
								if(result.kosis_detail_option == undefined || result.kosis_detail_option.length < 1) {
									messageAlert.open("알림", "대화형 통계지도에서 해당 항목을 서비스 준비중입니다.");
								} else {
									$policyWriteMapKosis.ui.kosis_obj_var_id = result.kosis_detail_option[0].obj_var_id;
									$policyWriteMapKosis.ui.kosis_field_id = result.kosis_detail_option[0].field_id;
									$policyWriteMapKosis.request.getKosisStaticDataFieldForSearchList(org_id, tbl_id, $policyWriteMapKosis.ui.kosis_obj_var_id, options);
								}
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * 
			 * @name         : getKosisStaticDataField
			 * @description  : 선택된 항목의 고정적인 세부조건 조회
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 * @param org_id : 기관 아이디
			 * @param tbl_id : 테이블 아이디
			 * @param kosis_obj_var_id
			 * @param options: 옵션정보
			 */
			getKosisStaticDataFieldForSearchList : function(org_id, tbl_id, kosis_obj_var_id, options) {
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataStaticFields.do",
					type : "GET",
					data : {
						"org_id" : org_id,
						"tbl_id" : tbl_id,
						"obj_var_id" : kosis_obj_var_id
					},
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result;
								$policyWriteMapKosis.ui.setStaticDataFieldsForSearchList(result, options);
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},

			/**
			 * 
			 * @name         : getKosisDataList
			 * @description  : 최종 데이터 조회
			 * @date         : 2014. 10. 10
			 * @author	     : 석진혁
			 * @history 	 :
			 * @param params : 선택된 항목의 결과를 조회하기 위한 parameters
			 * @param zoom   : 제공되는 레벨로 이동하기 위한 지도 줌 레벨 ( 시도 / 시군구 / 읍면동 )
			 * @param gisSe  : 버튼 드래그&드롭 으로 얻은 행정구역 코드
			 * @param atdrc_yn : 자치구경계 유무
			 */
			getKosisDataList : function(params, zoom, gisSe, atdrc_yn, map) {
				var parameters = {};
				
				if (gisSe < 2) {
					$policyWriteMapKosis.ui.pAdmCd = "00";
				} else {
					$policyWriteMapKosis.ui.pAdmCd = gisSe;
				}
				
				params = params[0];
				for(var i = 0; i < params.length; i++) {
					if(params[i].key != "gis_se") {
						parameters[params[i].key] =  params[i].value;
					} else {
						parameters["gis_se"] = gisSe;
						params[i].value = gisSe;
					}
					
					if(params[i].key == "tbl_id") {
						$policyWriteMapKosis.ui.tbl_id_linked = params[i].value; 
					}
				}
				
				var year = $policyWriteMapKosis.ui.kosis_data_year;
				if(year.length > 4) {
					year = year.substring(0, 4);
				}
				
				if(year < 2000) {
					year = 2000;
				} else if(year > bndYear) {
					year = bndYear;
				}
				
				this.map.bnd_year = year;
				
				var shareParams = {
					param : params,
					title : $policyWriteMapKosis.ui.curSelectedTitle,
					map : map,
					isKosis : true
				};
				
				$.ajax({
					url : kosisApiPath + "/SGIS_Plus_Kosis_new/kosis/ServiceAPI/api/KosisDataList.do",
					type : "GET",
					data : parameters,
					async : true,
					dataType : "json",
					beforeSend: function() {},
					success : function(res) {
						var result = null;
						switch (parseInt(res.errCd)) {
							case 0:
								result = res.result.kosisData;
								
								//kosis데이터 정렬
								if (result != null && result.length > 0) {
									result = result.sort(function(a,b) {
										return parseFloat(b.DATA)-parseFloat(a.DATA)
									});
								}
								
								//소수점 2자리로 고정
								for (var i=0; i<result.length; i++) {
									result[i].DATA = parseFloat(result[i].DATA).toFixed(2);
								}
								
								$policyWriteMapKosis.ui.kosis_result_data = [];
								$policyWriteMapKosis.ui.kosis_result_data = result;
								
								map.clearDataOverlay();
								$policyWriteMapKosis.ui.setKosisStatsData(map, options);
/*								if (atdrc_yn == "1") {
									map.isNoReverseGeocode = true;
									map.multiLayerControl.autoDownBoundary();
									map.openApiBoundaryHadmarea(options.adm_cd, map.bnd_year, map.boundLevel, "1");
								}else {
									map.autoDownBoundary();
								}*/	
								break;
							case -401:
								break;
							default:
								messageAlert.open("알림", res.errMsg);
								break;
						}
					},
					error : function(data){
					}
				});
			},
			
			/**
			 * 
			 * @name         : kosisSearch
			 * @description  : KOSIS 검색
			 * @date         : 2015. 12. 08
			 * @author	     : 석진혁
			 * @history 	 : 2017.08.14 수정
			 */
			kosisSearch : function(pagenum) {
				$(".scrollBox").mCustomScrollbar("update");
				$("#mCSB_6_container").css("width", "280px");
				
				var searchword = $("#kosisSearchText").val();
				if(searchword == "") {
					messageAlert.open("알림", "검색어를 입력하세요.");
					return;
				} else {
					$.ajax({
						url : openApiPath+"/OpenAPI3/search/kosis.json",
						type : "GET",
						data : {
							"accessToken" : accessToken,
							"searchword" : encodeURIComponent(searchword),
							"pagenum" : pagenum,
							"resultcount" : "10"
						},
						async : true,
						dataType : "json",
						beforeSend: function() {},
						success : function(res) {
							var result = null;
							switch (parseInt(res.errCd)) {
								case 0:
									result = res.result;
					            	$policyWriteMapKosis.ui.kosisSearchResult(result);
									break;
								case -401:
									accessTokenInfo(function() {
					            		$policyWriteMapKosis.request.kosisSearch(0);
					            	});
									break;
								default:
									messageAlert.open("알림", res.errMsg);
									break;
							}
						},
						error : function(data){
						}
					});
				}
			}
	};
	
	$policyWriteMapKosis.event = {
		setUIEvent : function() {
			$("body").on("change", "#kosisPeriod", function() {
				$("#kosisYear")
				.find("option")
				.remove()
				.end();
				
				var tmpYear = null;
				var tmpPeriodData = $policyWriteMapKosis.ui.kosis_data_period_array;
				for (var i=0; i<tmpPeriodData.length; i++) {
					if (tmpPeriodData[i].prdSe == $(this).val()) {
						tmpYear = tmpPeriodData[i].values;
						break;
					}
				}
				
				for (var i=0; i<tmpYear.length; i++) {
					$("#kosisYear").append($("<option>", { 
						value: tmpYear[i].prdDe,
						text : tmpYear[i].prdDeNm
					}));
				}
			});
			
			$("body").on("keydown", "#kosisSearchText", function(e) {
				if (e.which === 13) {
					$policyWriteMapKosis.request.kosisSearch(0);
				}
			});
		}	
	};
	
}(window, document));

