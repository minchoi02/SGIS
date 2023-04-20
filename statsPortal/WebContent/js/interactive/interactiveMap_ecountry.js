/**
 * 인터랙티브맵 Ecountry 메뉴에 대한 클래스 ( interactiveMap.js 에서 분리 )
 * 
 * history : 네이버시스템(주), 1.0, 2014/10/10  초기 작성
 * author : 
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$interactiveMapEcountry = W.$interactiveMapEcountry || {};
	
	$(document).ready(function() {	
		$("#ecountrySearchText").bind("keydown", function (event) {
			if (event.which === 13) {
				$interactiveMapEcountry.ecountrySearch(0);
			}
		});
		
		var $div = $("<div/>",{id:'exptooltip', class:'exptooltip', html:''}); 
		$(".containerBox").append( $div );
		
		$interactiveMapEcountry.mouseOver = false;
		
		$( document ).on('mouseover','#expInfo',function(e){
			$interactiveMapEcountry.mouseOver = true;
			clearTimeout( $interactiveMapEcountry.timer );
			$("#exptooltip").css("display","").show().scrollTop(0);
		}).on('mouseout','#expInfo',function(e){
			$interactiveMapEcountry.mouseOver = false;
			$interactiveMapEcountry.timer = setTimeout(function(){
				if( !$interactiveMapEcountry.mouseEnter ){
					$("#exptooltip").css("display","none").hide();
				}
			},300);
		}).on('mouseenter','#exptooltip',function(e){
			$interactiveMapEcountry.mouseEnter = true;
			clearTimeout( $interactiveMapEcountry.timer );
		}).on('mouseleave','#exptooltip',function(e){
			$interactiveMapEcountry.mouseEnter = false;
			$interactiveMapEcountry.timer = setTimeout(function(){
				if( !$interactiveMapEcountry.mouseOver ){
					$("#exptooltip").css("display","none").hide();
				}
			},300);
		});
		
	});
	
	$interactiveMapEcountry = {
			isFirstLoading : true,						// 최초 진입 여부
			tbl_id : null,								// 테이블 코드
			gis_se : 1,								// 지원 레벨 코드, 행정동 코드
			adm_cd : 0,								// 선택한 행정동 코드
			atdrc_yn : 'Y',							//자치구여부
			ecountry_data_item_detail : null,				// where 절 구문 들어가는 변수
			ecountry_data_item : null,					// 항목 코드
			ecountry_data_period : null,					// 주기
			ecountry_data_year : 0,						// 기준년도
			ecountry_data_period_array : [],				// 주기, 년도 리스트
			ecountry_data_field_list : [],				// 동적 세부 항목 리스트
			ecountry_select_menu_text : null,				// 버튼 생성 시 출력 텍스트
			ecountry_base_item_nms : {},
			curSelectedTitle : null,
			exp_list : null,
			unit : '',
			ecountry_result_data : [],					// 결과값 리스트
			map : null,
			tree : null,
			pAdmCd : null,
			curSelectNodeCheck : false,			//최하위 노드를 선택했을 때만 true
			curSelectNode : null,					//최하위 선택된 노드 정보
			ecountryCurrentPageIndex : 0,
			ecountry_search_result_data : null,
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
			
			searchInit : function( options, map ){
				$interactiveLeftMenu.ui.setDetailStatsPanel("ecountry");
			},
			
			reqSetEcountryParam : function(selParams, tempAdmCd, atdrc_yn, map) {
				var switchVal = 1;
				
				for(var i = 0; i < selParams.length; i++) {
					var tempParams = selParams[i];
					for(var j = 0; j < tempParams.length; j++) {
						if(tempParams[j].key == "gis_se") {
							switchVal = parseInt(tempParams[j].value);
							break;
						}
					}
				}
				
				if (atdrc_yn == "N") {
					for (var i=0; i<this.atdrcList.length; i++) {
						if (this.atdrcList[i] == tempAdmCd) {
							messageAlert.open("알림", "선택된 지역은 자치구입니다.<br>해당 통계는 자치구에 표현되는 통계가 아니므로 자치구가 아닌 지역을 선택하시거나 초기화한 후 조회바랍니다.");
							return;
						}
					}
				}
				
				//고정일 경우,
				if (map.isFixedBound) {
					if (map.selectedBoundList != null && map.selectedBoundList.length > 0) {
						var layer = map.selectedBoundList[0];
						var adm_cd = layer.feature.properties.adm_cd;
						switch(switchVal) {
							case 1:
								if (adm_cd.length > 2) {
									$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, null, tempAdmCd, atdrc_yn, map );
								}else {
									$interactiveMapEcountry.doReqEcountryData(switchVal, selParams, tempAdmCd, atdrc_yn, map);
								}
								break;
							case 2:
								if (adm_cd.length > 5) {
									$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, null, tempAdmCd, atdrc_yn, map );
								}else {
									switch(adm_cd.length) {
										case 2: switchVal = 1; break;
										case 5: switchVal = 2; break;
									}
									$interactiveMapEcountry.doReqEcountryData(switchVal, selParams, tempAdmCd, atdrc_yn, map);
								}
								break;
							case 3:
								if (adm_cd.length > 7) {
									$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, null, tempAdmCd, atdrc_yn, map );
								}else {
									switch(adm_cd.length) {
										case 2: switchVal = 1; break;
										case 5: switchVal = 2; break;
										case 7: switchVal = 3; break;
									}
								}
								$interactiveMapEcountry.doReqEcountryData(switchVal, selParams, tempAdmCd, atdrc_yn, map);
								break;
							}
					}
				}else {
					$interactiveMapEcountry.doReqEcountryData(switchVal, selParams, tempAdmCd, atdrc_yn, map);
				}
				
			},
			
			doReqEcountryData : function(switchVal, selParams, tempAdmCd, atdrc_yn, map) {
				var admCdLen = tempAdmCd.length;
				
				switch(switchVal) {
					case 1:
						if(admCdLen > 1 && tempAdmCd != "00") {
							if (map.isFixedBound) {
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 1, 1, map);
								}, 500)
							}else {
								$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, 1, 1, atdrc_yn, map );
							}
						} else {
							map.setZoom(1);
							setTimeout(function() {
								$interactiveMapEcountry.getEcountryDataList(selParams, 1, 1, atdrc_yn, map);
							}, 500);
						}
						break;

					case 2:
						if(admCdLen > 2) {
							if (map.isFixedBound) {
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 3, tempAdmCd.substring(0, 2), atdrc_yn, map);
								}, 500);
							}else {
								$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, 3, tempAdmCd.substring(0, 2), atdrc_yn, map );
							}
						} else {
							if(map.zoom <= 1) {
								map.setZoom(1);
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 1, 1, atdrc_yn, map);
								}, 500);
							} else {
								map.setZoom(3);
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 3, tempAdmCd, atdrc_yn, map);
								}, 500);
							}
						}
						break;

					case 3:
						if(admCdLen > 5) {
							if (map.isFixedBound) {
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 4, tempAdmCd.substring(0, 5), atdrc_yn, map);
								}, 500);
							}else {
								$interactiveMapEcountry.messageOpen ( true, switchVal, selParams, 4, tempAdmCd.substring(0, 5), atdrc_yn, map );
							}
							
						} else {
							if(map.zoom <= 1) {
								map.setZoom(1);
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 1, 1, atdrc_yn, map);
								}, 500);
							} else if(map.zoom > 1 && map.zoom <= 3) { //4->3
								map.setZoom(3);
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 3, tempAdmCd, atdrc_yn, map);
								}, 500);
							} else {
								map.setZoom(4); //5->4
								setTimeout(function() {
									$interactiveMapEcountry.getEcountryDataList(selParams, 4, tempAdmCd, atdrc_yn, map);
								}, 500);
							}
						}
						break;

					default:
						$interactiveMapEcountry.getEcountryDataList(selParams, null, tempAdmCd, atdrc_yn, map);
						break;
					}
			},
			
			messageOpen : function( fixedBound, switchVal, selParams, zoom, tempAdmCd, atdrc_yn, map ){
				var msg = "";
				var adm_nm = ( switchVal == "1" ? "시도" : ( switchVal == "2" ? "시군구" : "읍면동") );
				if( fixedBound ){
					msg = "현재 통계는 "+ adm_nm +"까지만 조회가 가능하여<br>선택된 지역의 통계를 볼 수 없습니다.<br>계속 진행하시겠습니까?";
				} else {
					msg = "현재 데이터는 "+ adm_nm +" 단위의 통계입니다.</br>지도를 시도레벨로 축소하여 보시겠습니까?";
				}
				
				messageConfirm.open(
					"알림", msg,
					btns = [{
						    title : "확인",
						    fAgm : null,
						    disable : false,
						    func : function(opt) {
								if( fixedBound ){
									map.mapBtnInfo.setFixedBoundBtn(false);
									$interactiveMapEcountry.doReqEcountryData(switchVal, selParams, tempAdmCd, atdrc_yn, map);
								} else {
									setTimeout(function() {
										map.setZoom( zoom );
										$interactiveMapEcountry.getEcountryDataList(selParams, zoom, switchVal, atdrc_yn, map);
									}, 500);
								}
						    }
						 },
	    			     {
						   title : "취소",
						   fAgm : null,
						   disable : false,
						   func : function(opt) {
							   if( !fixedBound ){
								   $interactiveLeftMenu.ui.updateSearchBtnEffect("", map.id);
							   }
						   }
	    			     }]
				);
			},
			
			/**
			 * @name         : setEcountryParams
			 * @description  : 조건버튼으로 만들어진 e-지방지표 통계정보에 대한 파라미터정보를 설정한다.
			 */
			setEcountryParams : function() {
				this.ecountry_data_item = $("#ecountryDetail").val();
				this.ecountry_data_period = $("#ecountryPeriod").val();
				this.ecountry_data_year = $("#ecountryYear").val();
				this.ecountry_data_item_detail = "";

				var btnText = this.ecountry_select_menu_text;
				btnText += " > ";
				btnText += $("#ecountryDetail option:selected").text();
				for(var i = 0; i < this.ecountry_data_field_list.length; i++) {
					var tempObj = this.ecountry_data_field_list[i];
					var selectId = tempObj.fieldId;
					var selectIndex = $("#" + selectId).find("option:selected").data('idx');
					
					if(i == 0) {
						this.ecountry_data_item_detail += tempObj.fieldId;
						this.ecountry_data_item_detail += "::";
						this.ecountry_data_item_detail += this.ecountry_data_field_list[i].details[selectIndex].id;
					} else {
						this.ecountry_data_item_detail += ",";
						this.ecountry_data_item_detail += tempObj.fieldId;
						this.ecountry_data_item_detail += "::";
						this.ecountry_data_item_detail += this.ecountry_data_field_list[i].details[selectIndex].id;
					}

					if(i == 0) {
						btnText += " > ";
					}

					btnText += tempObj.scrKor;
					btnText += "(";
					btnText += this.ecountry_data_field_list[i].details[selectIndex].nm;
					btnText += ")";

					if(i != this.ecountry_data_field_list.length - 1) {
						btnText += ", ";
					}
				}
				
				btnText += "(";
				btnText += $("#ecountryYear option:selected").text();					//combobox('getText');
				btnText += ")";
				
				$interactiveMapEcountry.ecountry_base_item_nms[ $interactiveMapEcountry.tbl_id ] = $("#ecountryDetail option:selected").text();
				$interactiveMapEcountry.ecountry_data_year_nm = 
					$("#ecountryYear option:selected").text() + $("#ecountryPeriod option:selected").text();
				
				$interactiveLeftMenu.ui.setParams("ecountry", "");
				
				this.curSelectedTitle = btnText;
				$interactiveLeftMenu.ui.createSearchBtn("ecountry", $interactiveMapEcountry.atdrc_yn);
				$interactiveLeftMenu.ui.searchbtnCnt++;
				
				if( !$interactiveMapEcountry.searchmode ){
					$interactiveLeftMenu.event.stepCloseAnimate(1, "check"); //9월 서비스
				} else {
					var params = $interactiveLeftMenu.ui.arParamList[0].params;
					var arr = [];
					arr[0] = params;
					var adm_cd = $interactiveMapEcountry.adm_cd;
					var atdrc_yn = $interactiveMapEcountry.atdrc_yn;
					var map = $interactiveMapEcountry.map;
					
					var adm_cd_len = ( adm_cd ? adm_cd.length : 1 ); 
					var zoom = 1;
					
					if( !adm_cd || adm_cd == '1' || adm_cd == '00' ){
						zoom = 1;
					} else if( adm_cd_len >= 2 && adm_cd_len <= 5 ){
						zoom = 3;
					} else if( adm_cd_len >= 7 ){
						zoom = 4;
					}
					
					map.setZoom( zoom );
					
					$interactiveMapEcountry.searchmode = false;
					$interactiveMapEcountry.getEcountryDataList( arr, zoom, adm_cd, atdrc_yn, map );
				}
				
				//mng_s 20200724 이진호
				//e지방지표 검색조건버튼 생성 시 메뉴 닫기&열기 버튼 위치 수정
				$(".stepClose.3depth_close").css("right", "");
				//mng_e 20200724 이진호
				
			},

			/**
			 * @name         : setTree
			 * @description  : Ecountry Root 메뉴 트리 생성
			 * @param subObj : 조회한 결과 Object	
			 */
			setTree : function( result ) {
				$interactiveMapEcountry.tree = $("#ecountryStatsTree").easytree({
					slidingTime:0,
					data : result,
					allowActivate: true,
		            disableIcons: true,
		            building: function(){
		            	this.treetype = "ecountry";
		            	$interactiveLeftMenu.event.kosisTreeWidth();
		            },
		            stateChanged:$interactiveLeftMenu.event.kosisTreeWidth,
		            toggled : $interactiveLeftMenu.event.kosisTreeWidth,
		            toggled : function(event, nodes, node) {
		            	var leftClose = true;
		            	
		            	if( node.child_yn == 'Y' ){
		            		if(node.id != "no_item_progress" && node.children[0].id == node.id + "_progress") {
		            			$interactiveMapEcountry.getCategory( node.list_id, true );
	            			}
		            	} else {
		            		if( node.children ){
		            			if(node.id != "no_item_progress" && node.children[0].id == node.id + "_progress") {
		            				$interactiveMapEcountry.getList( node.list_id );
		            			}
		            		} else {
		            			$interactiveMapEcountry.curSelectNode = node;
		            			
		            			$interactiveMapEcountry.list_id = node.list_id;
		            			$interactiveMapEcountry.tbl_id = node.tbl_id;
		            			$interactiveMapEcountry.inst_id = node.inst_id;
		            			$interactiveMapEcountry.gis_se = node.gis_se;
//		            			$interactiveMapEcountry.atdrc_yn = node.atdrc_yn;
		            			$interactiveMapEcountry.ecountry_select_menu_text = node.tbl_nm;
		            			
		            			$interactiveMapEcountry.getEcountryStaticDataField( node.tbl_id );
		            			leftClose = false;
		            		}
		            	}
		            	
		            	if( leftClose ){
		            		$(".sideQuick.sq02").stop().animate({"left":"0"},200);
							$("#ecountryDetailDiv").stop().animate({"left":"0"},200);
		            	}
					},
					selected : function(node) {
						//최하위 노드
						if (node.childCount == 0) {
							$interactiveMapEcountry.curSelectNodeCheck = true;
							$interactiveMapEcountry.curSelectNode = node;	//현재 선택된 노드
//							$interactiveMapEcountry.atdrc_yn = node.atdrc_yn;
							$interactiveMapEcountry.map.atdrc_yn = node.atdrc_yn;
							$(".buttonBar.ui-draggable").css("left","640px");//박길섭추가
						} else {	//상위 노드
							$interactiveMapEcountry.curSelectNodeCheck = false;
							$(".bottom .stepClose").stop().animate({"right":"-25px"},200);
							$(".buttonBar.ui-draggable").css("left","360px");//박길섭추가
						}
					}
				});
				
				if( $interactiveMapEcountry.searchmode ){
            		$interactiveMapEcountry.tree.toggleNode( $interactiveMapEcountry.list_id );
            	}
			},

			/**
			 * @name         : appendTree
			 * @description  : 선택된 트리메뉴의 하위 메뉴 생성
			 * @param subObj : 조회한 결과 Object	
			 */
			appendTree : function(result, options) {
				if(result.length < 1) {
					messageAlert.open("알림", "대화형 통계지도에서 해당 항목을 서비스 준비중입니다.");
					
					var tmpObj = {};
					tmpObj.id = "no_item_progress";
					tmpObj.text = "항목 서비스 준비중";
					$interactiveMapEcountry.tree.addNode(tmpObj, options[0].up_list_id);
					
					$interactiveMapEcountry.tree.removeNode(options[0].up_list_id + "_progress");
					$interactiveMapEcountry.tree.rebuildTree();
					
					return;
				}
				
				var id = options.up_list_id;
				
				$.each( result, function( i , item ){
					var tmpObj = {};
					
					tmpObj.id = item.tbl_id;
					tmpObj.tbl_id = item.tbl_id;
					tmpObj.list_id = item.list_id;
					tmpObj.inst_id = item.inst_id;
					tmpObj.text = item.tbl_nm;
					
					var tempGisSe = parseInt( item.gis_se );
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
					
					tmpObj.tbl_nm = item.tbl_nm;
					tmpObj.atdrc_yn = item.atdrc_yn;
					tmpObj.gis_se = item.gis_se;
					tmpObj.path = item.list_path;
					
					$interactiveMapEcountry.tree.addNode( tmpObj, id );
				});
				
				$interactiveMapEcountry.tree.removeNode( id + "_progress");
				$interactiveMapEcountry.tree.rebuildTree();
				
				$interactiveMapEcountry.tree.activateNode( id );
				
				if( $interactiveMapEcountry.searchmode ){
					if( $interactiveMapEcountry.tree.getNode( $interactiveMapEcountry.tbl_id ) != null ){
						$interactiveMapEcountry.tree.toggleNode( $interactiveMapEcountry.tbl_id );
						$interactiveMapEcountry.tree.activateNode( $interactiveMapEcountry.tbl_id );
					} else {
						messageAlert.open("알림", "조회할 수 있는 데이터가 없습니다.");
						$interactiveMapEcountry.searchmode = false;
					}
            	} 
			},
			
			/**
			 * @name         : setStaticDataFields
			 * @description  : 선택한 항목의 고정적 세부조건 메뉴 생성 ( 주기 / 년도 / 세부항목 )
			 * @param subObj : 조회한 결과 Object	
			 */
			setStaticDataFields : function(subObj) {
				
				//mng_s 20200814 이진호
				//e지방지표 검색조건 버튼 생성하고 다시 세부항목 선택할때 선택항목 창이 가려지는 현상 수정
				$("#div_buttonBar").css("left", "640px");
				//mng_e 20200814 이진호
				
				$("#exptooltip").html("");
				
				if( subObj.exp_list && subObj.exp_list.length > 0 ){
					$("#expInfo").css("display","").show();
					
					var html = '<div class="exptooltip_contents">';
					$.each( subObj.exp_list, function( i, item ){
						if( $interactiveMapEcountry.tbl_id == 'INH_1SSHE102R'
							&& ( i == 17 || i == 18 )){ //툴팁 안나오게 임시 조치
							return;
						} else {
							if( item.exp && item.exp != null && item.exp != "null"
								&& item.exp != "" ){
								html += ( item.exp + "<br/>" );
							} else {
								html += "<br/>";
							}
						}
					});
					html += '</div>';
					
					$("#exptooltip").html( html );
				} else {
					$("#expInfo").css("display","none").hide();
				}
				
				// 세부항목
				var baseItems = subObj.base_item;
				var baseItemList = [];
				for(var i = 0; i < baseItems.length; i++) {
					var tempObj = {};
					tempObj.value = baseItems[i].base_item_id;
					tempObj.label = baseItems[i].base_item_nm;

					if(i == 0) {
						tempObj.selected = true;
					}

					baseItemList.push(tempObj);
				}
				
				//9월 서비스
				$("#ecountryDataFieldTable").html(""); 
				var html = "";
				html += "<p class='off'>세부항목";
				html += "	<select title='세부항목' id='ecountryDetail' class='ecountryDetail' name='ecountryDetail' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<baseItemList.length; i++) {
					html += 		"<option value=" + baseItemList[i].value + ">";
					html += 			baseItemList[i].label;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				// 주기, 년도
				var periodlist = subObj.periodlist;
				var periodvalue = subObj.periodvalue;
				
				this.ecountry_data_period_array = [];
				
				var selIdx = 0;
				
				for(var i = 0; i < periodlist.length; i++) {
					var tempObj = {};
					tempObj.prd_id = periodlist[i].prd_id;
					tempObj.prd_nm = periodlist[i].prd_nm;
					tempObj.values = [];
					
					if(tempObj.prd_nm == "부정기" && tempObj.prd_id == 'F' 
						&& periodlist[i].prd_detail != null && periodlist[i].prd_detail != undefined) {
						tempObj.prdSeNm = this.exchangeText( periodlist[i].prd_detail );
					}

					var periodValues = periodvalue[ tempObj.prd_id ];

					for(var j = 0; j < periodValues.length; j++) {
						var tempVal = {};
						tempVal.prid_nm = periodValues[j].prid_nm;
						tempVal.prid_value = periodValues[j].prid_value;

						if(j == 0) {
							tempVal.selected = true;
						}

						tempObj.values.push(tempVal);
					}

					if( $interactiveMapEcountry.searchmode ){
						if( tempObj.prd_id == $interactiveMapEcountry.prd_id ){
							tempObj.selected = true;
							selIdx = i;
						}
					} else {
						if( i == 0 ){
							tempObj.selected = true;
							selIdx = i;
						} 
					}

					this.ecountry_data_period_array.push(tempObj);
				}
				
				//9월 서비스
				//주기
				html += "<p class='off'>주기";
				html += "	<select title='주기' id='ecountryPeriod' name='ecountryPeriod' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<this.ecountry_data_period_array.length; i++) {
					html += 		"<option value=" + this.ecountry_data_period_array[i].prd_id + ">";
					html += 			this.ecountry_data_period_array[i].prd_nm;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				//년도
				var selValues = this.ecountry_data_period_array[selIdx];
				html += "<p class='off'>"+ selValues.prd_nm + ( selValues.prdSeNm ? ' ('+selValues.prdSeNm+')' : '' );
				html += "	<select title='"+selValues.prd_nm+"' id='ecountryYear' name='ecountryYear' style='font-size:13px;width:100px;'>";
				for (var  i=0; i<selValues.values.length; i++) {
					html += 		"<option value=" + selValues.values[i].prid_value + ">";
					html += 			selValues.values[i].prid_nm;
					html += 		"</option>";
				}
				html += 	"</select>";
				html += "</p>";
				
				$interactiveMapEcountry.setDataFieldList(subObj, html);
			},
			
			exchangeText : function( detail ) {
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
				
				return text;
			},
			
			/**
			 * @name         : setDataFieldList
			 * @description  : 선택된 메뉴의 유동적 상세조건 메뉴 생성
			 * @param subObj : 조회한 결과 Object	
			 */
			setDataFieldList : function(subObj, html) {
				// 세부항목
				var dataField = subObj.add_item_list;
				var detailItem = subObj.add_item;
				
				var selectDataItem = [];
				this.ecountry_data_field_list = [];
				
				for(var i = 0; i < dataField.length; i++) {
					var tempObj = {};
					tempObj.fieldId = dataField[i].field_id;
					tempObj.scrKor = dataField[i].scr_kor;
					tempObj.details = [];

					var details = detailItem[ tempObj.fieldId ];
					for(var j = 0; j < details.length; j++) {
						var tempVal = {};
						tempVal.id = details[j].add_item_id;
						tempVal.nm = details[j].add_item_nm;
						
						if(details[j].add_item_sn != null && details[j].add_item_sn  != undefined) {
							tempVal.nm = details[j].add_item_nm;
						}

						if(j == 0) {
							tempVal.selected = true;
						}

						tempObj.details.push(tempVal);
					}

					this.ecountry_data_field_list.push(tempObj);
					
					//9월 서비스
					html += '<p class="off">' + tempObj.scrKor;
					html += '	<select id="'+ tempObj.fieldId + '" style="font-size:13px;width:100px;">';
					
					var details = this.ecountry_data_field_list[i].details;
					
					for (var x=0 ; x<details.length; x++) {
						html += 	'<option value="' + details[x].id + '" data-idx="'+ x +'">';
						html += 	details[x].nm;
						html += 	'</option>';
					}
					html += '	</select>'
					html += '</p>';
				}

				var origin = "출처 : KOSIS<div style='padding-left: 27px;width: 80%;'>";
				origin += "<a href='javascript:$interactiveMapEcountry.kosisLinked(true);' style='color: blue; text-decoration:underline; margin-top: 5px;'>통계정보(통계표) 상세보기</a>";
				origin += "</div><div style='padding-left: 25px; padding-top: 5px; width: 100%; font-size:11px;'>";
				origin += "※ 통계표 링크페이지에서 우측상단의 '주석' 버튼을<br/>&nbsp;&nbsp;&nbsp;&nbsp; 클릭하면 통계정보를 확인할 수 있습니다.</div>";
					
				$("#ecountryDataFieldTable").html(html);
				$("#ecountryOrigin").html( origin );
				
				$("#ecountryPeriod").change(function(){
					$("#ecountryYear").find("option").remove().end();
				
					var tmpYear = null;
					var tmpPeriodData = $interactiveMapEcountry.ecountry_data_period_array;
					for (var i=0; i<tmpPeriodData.length; i++) {
						if (tmpPeriodData[i].prd_id == $(this).val()) {
							tmpYear = tmpPeriodData[i].values;
							break;
						}
					}
					
					for (var i=0; i<tmpYear.length; i++) {
						$("#ecountryYear").append($("<option>", { 
					        value: tmpYear[i].prid_value,
					        text : tmpYear[i].prid_nm
					    }));
					}
				});
				
				//9월 서비스
				var tempText = this.ecountry_select_menu_text;
				var ecountryTitle = $.trim(tempText);
				
				if( ecountryTitle && ecountryTitle.length > 20 && ecountryTitle.indexOf("(") >= 0 ){
					var title2 = ecountryTitle.substr( ecountryTitle.lastIndexOf("("), ecountryTitle.length );
					if( title2.indexOf("시도") >= 0 || title2.indexOf("시군구") >= 0 || title2.indexOf("읍면동") >= 0 ){
						var title1 = ecountryTitle.substr( 0, ecountryTitle.lastIndexOf("(") );
						
						$("#ecountryTitle").html( title1 );
						$("#ecountryTitle2").css("display","").show().html( title2 );
					} else {
						$("#ecountryTitle").html( ecountryTitle );
						$("#ecountryTitle2").css("display","none").hide().html("");
					}
					
				} else {
					$("#ecountryTitle").html( ecountryTitle );
					$("#ecountryTitle2").css("display","none").hide().html("");
				}
				
				if( $interactiveMapEcountry.searchmode ){
					$("#ecountryDetail").val( $interactiveMapEcountry.base_item_id );
					$("#ecountryPeriod").val( $interactiveMapEcountry.prd_id );
					$("#ecountryYear").val( $interactiveMapEcountry.prid_value );
					
					if( $interactiveMapEcountry.add_item_id ){
						var add_items = $interactiveMapEcountry.add_item_id.split(",");
						if( add_items ){
							$.each( add_items, function( i, item ){
								if( item ){
									var temp = item.split("::");
									var id = "#"+temp[0];
									if( id && id.indexOf(":") < 0 ){
										$( id ).val( temp[1] );
									}
								}
							});
						}
					}
					
					$interactiveMapEcountry.setEcountryParams();
            	} 
			},

			kosisLinked : function( left ) {
				var inst_id = '';
				var tbl_id = '';
				
				if( left ){
					inst_id = $interactiveMapEcountry.inst_id;
					tbl_id = $interactiveMapEcountry.tbl_id;
				} else {
					inst_id = $interactiveMapEcountry.inst_id_linked;
					tbl_id = $interactiveMapEcountry.tbl_id_linked;
				}
				
				var url = "http://kosis.kr/statHtml/statHtml.do?";
				url += "orgId="+inst_id;
				url += "&tblId="+tbl_id;
				url += "&conn_path=I2";
				
				window.open(url);
			},
			
			/**
			 * @name         : setResultDataOnMap
			 * @description  : 조회 결과 데이터를 지도 위에 텍스트로 표출한다.
			 */
			setResultDataOnMap : function() {
				var that = this;
				var tempObj = $interactiveMapEcountry.ecountry_result_data;
				
				if (this.map.dataGeojson) {
					this.map.dataGeojson.eachLayer(function (layer) {
						for(var i = 0; i < tempObj.length; i++) {
							if(layer.feature.properties.adm_cd == tempObj[i].CODE) {
								// e-지방지표 통계 조회 결과의 행정동 코드와 경계데이터 조회 결과의 행정동 코드를 비교 후
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

					$interactiveDataBoard.ui.updateDataBoardKosis(tempObj, this.curSelectedTitle, this.map.id);
				}else {
					messageAlert.open("알림", "검색결과가 존재하지 않습니다.");
				}
			},
			
			/**
			 * @name         : getCategory
			 * @description  : e-지방지표 최상위 메뉴 조회
			 */
			getCategory : function( id, child_yn ) {
				jQuery.ajax({
	        		type:"POST",
	        		url: '/view/ecountry/getCategory',
	    	 		data: { upper_list_id : id },
	        		success:function( res ){
	        			if( res && res.result ){
	        				var result = [];
	        				$.each( res.result, function( i , item ){
	        					var tmpObj = {};
	        					tmpObj.id = item.list_id;
	        					tmpObj.list_id = item.list_id;
	        					tmpObj.upper_list_id = item.upper_list_id;
	        					tmpObj.text = item.list_nm;
	        					
	        					tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
	        					tmpObj.child_yn = item.child_yn;
	        					tmpObj.state = "closed";
	        					result.push( tmpObj );
	        				});
	        				
	        				if( child_yn ){
	        					$.each( result, function( i, item ){
	        						$interactiveMapEcountry.tree.addNode( item, id );
	        					});
	        					
	        					$interactiveMapEcountry.tree.removeNode( id + "_progress");
	        					$interactiveMapEcountry.tree.rebuildTree();
	        					$interactiveMapEcountry.tree.activateNode( id );
	            				
	        					$interactiveMapEcountry.getList( id );
	        				} else {
	        					$interactiveMapEcountry.setTree( result );
	        				}
	        			
	        			}
	        		},
	        		error:function(data) {
	        			console.log('오류가 발생하였습니다.');
	        		}
	        	});
				
			},

			getList : function(list_id) {
				//테이블 목록 가져오기
				jQuery.ajax({
	        		type:"POST",
	        		url: '/view/ecountry/getList',
	    	 		data: { list_id : list_id },
	        		success:function( res ){
	        			if( res && res.result ){
	        				var options = {};
	        				options.up_list_id = list_id;
	        				$interactiveMapEcountry.appendTree(res.result, options);
	        			}
	        		},
	        		error:function(data) {
	        			console.log('오류가 발생하였습니다.');
	        		}
	        	});
			},

			/**
			 * @name         : getEcountryStaticDataField
			 * @description  : 선택된 항목의 고정적인 세부조건 조회
			 */
			getEcountryStaticDataField : function( tbl_id ) {
				jQuery.ajax({
	        		type:"POST",
	        		url: '/view/ecountry/getItem',
	    	 		data: { tbl_id : tbl_id },
	        		success:function( res ){
	        			if( res && res.result ){
	        				var result = res.result;
	        				
	        				$("#ecountryDetailDiv").stop();
	        				$("#ecountryDetailDiv").stop().animate({"left":"360px"},{duration:200 , start : function(){
	        					$(".bottom .3depth_close").stop().animate({"right":"-304px"},200);
	        				}});
	        				$interactiveMapEcountry.setStaticDataFields(result);
	        			}
	        		},
	        		error:function(data) {
	        			console.log('오류가 발생하였습니다.');
	        		}
	        	});
			},
			
			/**
			 * @name         : getEcountryDataList
			 * @description  : 최종 데이터 조회
			 * @param params : 선택된 항목의 결과를 조회하기 위한 parameters
			 * @param zoom   : 제공되는 레벨로 이동하기 위한 지도 줌 레벨 ( 시도 / 시군구 / 읍면동 )
			 * @param gisSe  : 버튼 드래그&드롭 으로 얻은 행정구역 코드
			 * @param atdrc_yn : 자치구경계 유무
			 */
			getEcountryDataList : function(params, zoom, gisSe, atdrc_yn, map, share) {
				if(gisSe < 2) {
					$interactiveMapEcountry.pAdmCd = "00";
				} else {
					$interactiveMapEcountry.pAdmCd = gisSe;
				}
				
				params = params[0];
				
				if( $interactiveMapEcountry.curSelectedTitle && $interactiveMapEcountry.curSelectedTitle.indexOf('&gt;') > 0 ){
					$interactiveMapEcountry.curSelectedTitle = $interactiveMapEcountry.curSelectedTitle.replace(/&gt;/gi,'>');
				}
				
				var shareParams = {
					param : params,
					title : $interactiveMapEcountry.curSelectedTitle,
					map : map,
					isEcountry : true
				};
				
				if(map != null){
					if( $interactiveMap.ui.mapList[ map.id ] ){
						$interactiveMap.ui.mapList[ map.id ].itemtext = $( '#' + $interactiveMap.ui.curBtnId ).data('itemtext');
					}
				}
				
				var list_nm = '';
				if( $interactiveMapEcountry.tree && $interactiveMapEcountry.list_id ){
					list_nm = $interactiveMapEcountry.tree.getNode( $interactiveMapEcountry.list_id ).text;
				}
				srvLogWrite("C0", "02", "08", "01", ( list_nm ? list_nm : '' ), shareParams.title); 
				
				var data = {};
				
				$.each( params, function( i , item ){
					data[ item.key ] = item.value;
				});
				data.adm_cd = $interactiveMapEcountry.pAdmCd;
				
				var options = {
					mapDelegate : $interactiveMapEcountry.map,
					params : shareParams,
					atdrc_yn : atdrc_yn,
					adm_cd : gisSe
				};
				
				jQuery.ajax({
	        		type:"POST",
	        		url: '/view/ecountry/getData',
	    	 		data: data,
	        		success:function( res ){
	        			if( res && res.result && res.success ){
	        				var result = res.result;
	    					result = result.data;
	    					
	    					$interactiveMapEcountry.atdrc_yn = res.result.atdrc_yn;
	    					$interactiveMapEcountry.inst_id_linked = res.result.inst_id;
	    					$interactiveMapEcountry.tbl_id_linked = res.result.tbl_id;
	    					
    						if (result != null && result.length > 0) {
    							result = result.sort(function(a,b) {
    								return parseFloat(b.data_value)-parseFloat(a.data_value)
    							});
    						}
    						
    						//소수점 2자리로 고정
    						for (var i=0; i<result.length; i++) {
        						result[i].DATA = result[i].data_value;
        						result[i].UNIT = ( res.result.unit ? res.result.unit : '' );
        						result[i].CODE = result[i].adm_cd;
        						result[i].PRD_DE = '';
        						result[i].showData = "DATA";
        						
        						if(result[i].DATA == null){
        							result[i].DATA = 0;
        						}
        						
        						if( (result[i].DATA+"").indexOf(".") >= 0 ){
        							result[i].DATA = parseFloat(result[i].DATA).toFixed(2);
        						}
        					}
    						
    						for (var i=0; i<result.length; i++) {
    							result[i].result = result;
    						};
    						
    						//사용자지정 경계일 경우,
    						//사용자가 선택한 경계에만 통계치를 표출해야하므로
    						//사용자가 지정한 경계이외의 나머지 데이터는 삭제한다.
    						if (map.selectedBoundMode == "multi") {
    							var tmpResult = [];
    							for (var i=0; i<result.length; i++) {
    								for (var x=0; x<map.selectedBoundList.length; x++) {
    									var layer = map.selectedBoundList[x];
    									if (result[i].CODE == layer.feature.properties.adm_cd) {
    										tmpResult.push(result[i]);
    										break;
    									}
    								}
    							}
    							result = tmpResult;
    						}
    						$interactiveMapEcountry.ecountry_result_data = [];
    						$interactiveMapEcountry.ecountry_result_data = result;
    						
    						//경계고정일 경우, 
    						//기존 로직을 타지않고, multiLayerControl 로직을 탄다.
    						if (map.selectedBoundMode == "multi") {
    							$interactiveMapEcountry.setEcountryStatsData(map, options);
    							map.multiLayerControl.clear();
    							if (map.geojson != null) {
    								map.geojson.remove();
    								map.geojson = null;
    							}
    							map.multiLayerControl.multiData = [];
    							map.multiLayerControl.dataGeojson = [];
    							
    							var tmpData = [];
    							tmpData[0] = [];
    							for (var i=0; i<result.length; i++) {
    								tmpData[0].push(parseFloat(result[i].DATA));
    							}

    							$interactiveMapEcountry.setLegendForEcountryStatsData(tmpData);
    							for (var i=0; i<result.length; i++) {
    								map.multiLayerControl.reqBoundary(result[i].CODE, result[i], atdrc_yn, function(res) {
    									var geoData = $interactiveMapEcountry.combineEcountryStatsData (res);
    									map.multiLayerControl.dataGeojson.push(map.addPolygonGeoJson(geoData, "data"));
    								});
    							}
    						}else {
    							map.clearDataOverlay();
    							$interactiveMapEcountry.setEcountryStatsData(map, options);
//    							if (atdrc_yn == "N") {
    								map.isNoReverseGeocode = true;
    								map.multiLayerControl.autoDownBoundary();
    								// 파라미터 borough 가 있으면 자치구 없으면 비자치구
    								//this.openApiBoundaryHadmarea = function (adm_cd, year, low_search, atdrc_yn, callback, bounds , zoomLevel)
    								
    								var zoomlevel = ( map.boundLevel == 4 ? "100" : null );
    								$interactiveMapEcountry.openApiBoundaryHadmarea(
    										map, options.adm_cd, map.bnd_year, map.boundLevel, function( map, item ){
    									if( item.features && item.features.length > 1 ){
    										var x = item.features[0].properties.x;
    										var y = item.features[0].properties.y;
    										var center = [ x, y ];
    										
    										map.mapMove( center , map.zoom );
    									}
    								}, null, zoomlevel );
//    							}else {
//    								map.autoDownBoundary();
//    							}
    						}
    						
    						options["zoomlevel"] = map.zoom;
    						options["center"] = map.center;
    						options["dist_level"] = $interactiveMapEcountry.gis_se;
    						options["url"] = "/view/ecountry/getData";
    						
    						if(result.length > 1 && result[0].UNIT != undefined) {
    							options.params["unit"] = result[0].UNIT;
    							$interactiveMapEcountry.unit = result[0].UNIT; 
    						}
    						map.shareInfo.setShareInfo(options, "normal", map.id);
    						$interactiveMap.ui.updateSearchTitle(options.params.title, options.params.unit, map.id);
    						
	        			} else {
	        				messageAlert.open("알림", "조회할 수 있는 데이터가 없습니다.");
	        			}
	        		}
				});
				
				pageCallReg();
			},
			
			openApiBoundaryHadmarea : function ( map, adm_cd, year, low_search, callback, bounds , zoomLevel ) {
				if (adm_cd=="") {
					adm_cd = "00";
				}
				
				var atdrc_yn = ( $interactiveMapEcountry.atdrc_yn == "Y" ? 
						"1" : ( $interactiveMapEcountry.atdrc_yn == "N" ? "0" : $interactiveMapEcountry.atdrc_yn ) );
				
				var zoom = map.zoom;
				
				var sopOpenApiHadmareaObj = new sop.openApi.hadmarea.api();
				sopOpenApiHadmareaObj.addParam("accessToken", accessToken);
				sopOpenApiHadmareaObj.addParam("adm_cd", adm_cd);
				sopOpenApiHadmareaObj.addParam("year", year);
				sopOpenApiHadmareaObj.addParam("low_search", low_search);
//				sopOpenApiHadmareaObj.addParam("area", area);
				sopOpenApiHadmareaObj.addParam("zoom", zoom);
				sopOpenApiHadmareaObj.addParam("zoom_level", zoomLevel);//2019년반영 djlee
				
				//자치구경계
				if ( atdrc_yn != undefined && atdrc_yn == "1" ) {
					sopOpenApiHadmareaObj.addParam("borough", low_search);
				} 
				
				sopOpenApiHadmareaObj.request({
					method : "GET",
					async : true,
					url : openApiPath + "/OpenAPI3/boundary/hadmarea.geojson",
					options : {
						target : map,
						adm_cd : adm_cd,
						year : year,
						low_search : low_search,
						callback : callback,
						zoom : zoom //, 2019-03-11 박길섭
						//zoom_level : zoomLevel 2019-03-11 박길섭
					}
				});
			},
			
			/**
			 * @name         : setEcountryStatsData
			 * @description  : 지도 경계 데이터에 조회한 결과 데이터를 합성하기 위한 구분자 삽입
			 */
			setEcountryStatsData : function (receiveMap, logOptions) {
				if(this.map == null || this.map == undefined) {
					this.map = receiveMap;
				}
				$interactiveMapEcountry.map.data = [];
				
				var tempData = {};
				tempData.ecountry = true;
				if($interactiveMapEcountry.pAdmCd == "1") {
					$interactiveMapEcountry.pAdmCd = "00";
				}
				tempData.pAdmCd = $interactiveMapEcountry.pAdmCd;
				$interactiveMapEcountry.map.data.push(tempData);
				
				$interactiveMapEcountry.map.data.push($interactiveMapEcountry.ecountry_result_data);
				$interactiveMapEcountry.map.dataType = "ecountry";
				$interactiveMapEcountry.map.dataForCombine = $interactiveMapEcountry.ecountry_result_data[0];
				
				var year = $interactiveMapEcountry.ecountry_data_year;
				if(year.length > 4) {
					year = year.substring(0, 4);
				}
				
				if(year < 2000) {
					year = 2000;
				} else if(year > bndYear) {
					year = bndYear;
				}
				
				$interactiveMapEcountry.map.bnd_year = year;
				
				//API 로그 세팅용 파라미터 세팅
				if(logOptions.params.param_info != undefined) {
					logOptions.params["param"] = [];
					for(key in logOptions.params.param_info.paramInfo) {
						logOptions.params["param"].push({"key" : key, "value" : logOptions.params.param_info.paramInfo[key]});
					}
				}
				
				var tmpOptions = {
						type : "A0",
						btntype : "ecountry",
						params : {
							title : logOptions.params.title,
							param : logOptions.params.param,
							map : $interactiveMapEcountry.map,
							adm_cd : $interactiveMapEcountry.pAdmCd
						}
				}
				
				//API로그 쌓기 (행정동코드로 지역 조회)
				addrCdToNm($interactiveMapEcountry.map.bnd_year, tmpOptions.params.adm_cd, tmpOptions);
			},
			
			/**
			 * @name         : combineEcountryStatsData 
			 * @description  : 지도 경계 데이터에 조회한 결과 데이터 합성
			 * @param boundData: 해당 레벨의 경계데이터
			 */
			combineEcountryStatsData  : function(boundData) {
				var tempData = $interactiveMapEcountry.map.data[1];
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
				$interactiveMapEcountry.ecountry_result_data = tempData;
				
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
							boundData.features[i]["isEcountry"] = true;
							boundData.features[i].info.push(tempData[k].DATA);
							boundData.features[i].info.push(tempData[k].UNIT);
							boundData.features[i].info.push("ecountry");
							boundData.features[i].info.push(tempData[k].PRD_DE);
							boundData.features[i]["dataIdx"] = k;
							tmpData.push(tempData[k].DATA *= 1);
						}
					}
				}
				arData.push(tmpData);
				
				//경계고정이 아닐경우, 수행
				if (!$interactiveMapEcountry.map.isFixedBound) {
					$interactiveMapEcountry.setLegendForEcountryStatsData(arData);
				}
				
				return boundData;
			},
			
			/**
			 * @name         : setLegendForEcountryStatsData
			 * @description  : 범례 생성을 위한 최소/최대 값 및 값의 영역 정의
			 * @param arData : 합성된 경계 및 데이터 Object	
			 */
			setLegendForEcountryStatsData : function(arData) {
				$interactiveMapEcountry.map.legend.valPerSlice = $interactiveMapEcountry.map.legend.calculateLegend(arData);
				
				//범례 고정시 오류때문에 추가 20.06.12
				var target = $interactiveMapEcountry.map.target;
				
				if ( target == "mapRgn_1" ) {
					sLegendInfo.legendInfo.fixed_legend_val1 = arData;
				} else if ( target == "mapRgn_2" ) {
					sLegendInfo.legendInfo.fixed_legend_val2 = arData;
				} else if ( target == "mapRgn_3" ) {
					sLegendInfo.legendInfo.fixed_legend_val3 = arData;
				}
			},
			
			/**
			 * @name         : checkEcountryBtn
			 * @description  : e-지방지표 버튼 유무체크
			 */
			//9월 서비스
			checkEcountryBtn : function() {
				var isEcountry = false;
				$(".dragItem").each(function(idx) {
					var id = $(this).find("a").attr("id");
					if (id.indexOf("ecountry") != -1) {
						isEcountry = true;
					}
				}) ;
				return isEcountry
			},
			
			/**
			 * @name         : ecountrySearch
			 * @description  : e-지방지표 검색
			 */
			ecountrySearch : function(pagenum) {
				$(".scrollBox").mCustomScrollbar("update");
				$("#mCSB_6_container").css("width", "280px");	
				$("#ecountry_SearchBox").css("width", "280px");
				
				var searchword = $("#ecountrySearchText").val();
				
				if(searchword == "") {
					messageAlert.open("알림", "검색어를 입력하세요.");
					return;
				} else {
					var searchword = $("#ecountrySearchText").val();
					var list_nm = '';
					
					if( $interactiveMapEcountry.list_id){
						list_nm = $interactiveMapEcountry.tree.getNode( $interactiveMapEcountry.list_id ).text;
					}
					srvLogWrite("C0", "02", "08", "02", ( list_nm ? list_nm : '' ), searchword);
					
					if(searchword == "") {
						messageAlert.open("알림", "검색어를 입력하세요.");
						return;
					} else {
						jQuery.ajax({
			        		type:"POST",
			        		url: '/view/ecountry/getSearchList',
			    	 		data: { 
			    	 			searchword : searchword,
			    	 			pagenum : pagenum,
			    	 			resultcount : 10
			    	 		},
			        		success:function( res ){
			        			if( res && res.result ){
			        				var result = res.result;
			        				
			        				$interactiveMapEcountry.ecountrySearchResult( result );
			        			}
			        		},
			        		error:function(data) {
			        			console.log('오류가 발생하였습니다.');
			        		}
			        	});
					}
					
				}
			},
			
			/**
			 * @name         : ecountrySearchResult
			 * @description  : e-지방지표 검색 결과 화면 생성
			 */
			ecountrySearchResult : function(result) {
				$interactiveMapEcountry.ecountry_search_result_data = result.searchList;
				
				var html = "";
				html += '<div style="text-align: center;">';
				html += '	<a href="javascript:$interactiveMapEcountry.ecountryTreeShow();" class="btnStyle01">e-지방지표 목록으로</a>';
				html += '</div>';
				html += '<p class="result">검색결과 : ' + result.totalcount + '개</p></br>';
				html += '<ul class="xWidth radioStepOneBox">';
				
				for(var i = 0; i < result.searchList.length; i ++) {
					var elem = result.searchList[i];	            										
					html += '<li>';
					html += '<table>';
					html += 	'<tr>';
					html +=			'<td style="vertical-align:top;"><div style="cursor: pointer;margin-top:1px;">● </div></td>';
					html +=			'<td style="width:10px;"></td>';
					html +=			'<td title="'+elem.list_path+'">';
					html +=			'<a style="font-size:13px;" href="javascript:$interactiveMapEcountry.ecountryClick('+i+');">';
					html += 		elem.tbl_nm + '</a></td>';
					html +=		'</tr>';
					
					if(elem.list_path != undefined){
						html +=		'<tr>';
						html +=			'<td></td><td style="width:10px;"></td>';
						html += 		'<td style="font-size:10px; color:#0040ff; padding-top:5px;">' + elem.list_path + '</td>';
						html +=		'</tr>';
					}
					
					html +=	'</table>';
					html += '<div style="height:10px;"></div>';
				}
				
				html += '</ul>';
				html += '<div id="article-wrap">';
				html += '<div id="ecountry_SearchBox_paging"></div>';
				html += '</div>';
				
				$('#ecountry_SearchBox').html(html);
				
				if(result.totalcount > 10){
					var htmlPage = '<br><div id="ecountryPaging" class="pagenation" align="center" style="width: 100%;"><span class="pages"></span>';
					$("#ecountry_SearchBox_paging").html(htmlPage);
				}
				
				$interactiveMapEcountry.ecountryPaging(result.totalcount, $interactiveMapEcountry.ecountryCurrentPageIndex);
				
				$("#ecountryStatsTree").hide();
				$("#ecountry_SearchBox").show();
			},
			
			/**
			 * @name         : ecountryTreeShow
			 * @description  : e-지방지표목록 보이기
			 */
			ecountryTreeShow : function() {
				$("#ecountryStatsTree").show();
				$("#ecountry_SearchBox").hide();
				
				//2016.09.05 9월 서비스
				$(".scrollBox").mCustomScrollbar("update");
				$("#mCSB_6_container").css("width", $("#API_0301").parent().width()+"px");	
			},
			
			/**
			 * @name         : ecountryPaging
			 * @description  : e-지방지표 검색화면 페이징
			 */
			ecountryPaging : function(totalCount, currentIndex) {
				var pageSize = 10;
				var totalPage = Math.ceil( totalCount / pageSize);
				$('#ecountry_SearchBox_paging .pages').paging({
					current:currentIndex+1,
					max:totalPage,
					itemCurrent : 'current',
					format : '{0}',
					next : '&gt;',
					prev : '&lt;',
					first : '&lt;&lt;',
					last : '&gt;&gt;',
					onclick:function(e,page){
						$interactiveMapEcountry.ecountryCurrentPageIndex = page-1;
						$interactiveMapEcountry.ecountrySearch(page-1);
					}
				});
			},
			
			ecountryClick : function(index) {
				var tempData = $interactiveMapEcountry.ecountry_search_result_data[index];
				
				this.list_id = tempData.list_id;
				this.tbl_id = tempData.tbl_id;
				this.inst_id = tempData.inst_id;
				this.gis_se = tempData.gis_se;
				this.atdrc_yn = tempData.atdrc_yn;
				if( this.map ){
					this.map.atdrc_yn = tempData.atdrc_yn;
				}
				this.ecountry_select_menu_text = tempData.tbl_nm;
			
				$interactiveMapEcountry.getEcountryStaticDataField( tempData.tbl_id );
			}
	};

}(window, document));