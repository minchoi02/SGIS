/**
 * 생활권역서비스 한국표준산업분류 화면에 대한 클래스
 * 
 * history : 2021/04/30 초기 작성 version : 1.0 see : 
 * 
 */
(function(W, D) {
	W.$catchmentAreaKSIC = W.$catchmentAreaKSIC || {};

	$(document).ready(
		function() {
			
			$catchmentAreaKSIC.event.setUIEvent();
			
			//$catchmentAreaKSIC.ui.openUI();

		    $(".layer_popKSIC .scroll_wrap2").mCustomScrollbar({ axis: "yx"});
	});
	
	$catchmentAreaKSIC.ui = {
		companyTree : null,						//산업분류 트리
		curSelectedCompanyNode : null,			//산업분류 트리 선택된 노드
		curPageNo : 1, 							//현재 페이지 번호		
		curpageSize : 10,						//현재 페이지당 행의 개수
		curSearchWord : null, 					//현재 검색어
		curSearchList : null, 					//현재 검색결과 목록
		curSelectedItem : null, 				//현재 선택된 산업분류 항목(상세 페이지 선택 버튼에서만 사용) 
		schMinDepth : 1,						//검색 결과에 포함되는 최소 분류 depth (ksic1 ~ ksic5)
		delegate : null,
		callersInfo : null,
		blockingMask : null,
		//SGIS4_0629_생활권역 시작
		jingle_goal : "",
		jingle_next : "",
		//SGIS4_0629_생활권역 끝
		
		/**
		 * 
		 * @name         : openUI
		 * @description  : 초기정보를 설정하고 화면을 표출한다.
		 * 
		 */
		openUI : function(delegate, callersInfo, mask) {
			this.companyTree = null;
			this.curSelectedCompanyNode = null;
			this.curPageNo = 1;		
			this.curSearchWord = null;
			this.curSearchList = null;
			this.curSelectedItem = null;
			//SGIS4_0629_생활권역 시작
			this.jingle_goal = "";
			this.jingle_next = "";
			//SGIS4_0629_생활권역 끝			
			if (delegate) {this.delegate = delegate;} else {this.delegate = null;}
			//SGIS4_0629_생활권역 시작
			if (callersInfo) {
				this.callersInfo = callersInfo;
				//SGIS4_1025_생활권역 시작
				if(callersInfo.hasOwnProperty("jingle")){
					if(callersInfo.jingle !== undefined && callersInfo.jingle !== null && callersInfo.jingle.length > 0){
						this.jingle_goal = callersInfo.jingle;
						
						if(callersInfo.hasOwnProperty("mainJingle")){
							if(callersInfo.mainJingle !== undefined && callersInfo.mainJingle !== null && callersInfo.mainJingle.length > 0){
								this.jingle_next = callersInfo.mainJingle;
							}					
						}
						
						if(this.jingle_next.length === 0){
							this.jingle_goal = "";
						}else{
							if(this.jingle_next !== this.jingle_goal){
								this.jingle_goal = this.jingle_next + this.jingle_goal;
							}
						}
					}					
				}
				//SGIS4_1025_생활권역 끝
			} else {
				this.callersInfo = null;
			}
			//SGIS4_0629_생활권역 끝
			if (mask) {this.blockingMask = mask;} else {this.blockingMask = $('#block_containerBox');}
			
			$("#ksicSearchWord").val("");
			this.setEmptyList();
			
			if(this.blockingMask !== undefined && this.blockingMask !== null){
				this.blockingMask.show();
			}
			$('.layer_popKSIC').addClass('active');
			
			this.getKSIClist();			
		},

		/**
		 * 
		 * @name         : closeUI
		 * @description  : 초기정보를 설정하고 화면을 표출한다.
		 * 
		 */
		closeUI : function() {			
			this.delegate = null;
			this.callersInfo = null;

			if(this.blockingMask !== undefined && this.blockingMask !== null){
				this.blockingMask.hide();
			}			
			$('.layer_popKSIC').removeClass('active');
		},
		
		/**
		 * 
		 * @name         : getKSIClist
		 * @description  : 트리 구성용 한국표준산업분류 목록을 요청한다.
		 * 
		 */
		getKSIClist : function(pObj) {
			var param = pObj;
			if(param === undefined || param === null){
				param = {};				
			}
			param.workGb = "T";

			if(!param.hasOwnProperty("depth")){
				param.depth = 0;
			}
			if(!param.hasOwnProperty("classDeg")){
				param.classDeg = $catchmentAreaMain.ui.classDeg;
			}
			
			var options = $catchmentAreaKSIC.ui.reqSetParams("API_202081", param);
			$catchmentAreaKSIC.ui.requestOpenApi(options);
		},

		/**
		 * 
		 * @name         : getKSICdetail
		 * @description  : 한국표준산업분류 상세를 요청한다.
		 * 
		 */
		getKSICdetail : function(pObj) {
			var param = pObj;
			if(param === undefined || param === null){
				param = {};				
			}
			param.workGb = "D";

			if(!param.hasOwnProperty("classDeg")){
				param.classDeg = $catchmentAreaMain.ui.classDeg;
			}
			
			var options = $catchmentAreaKSIC.ui.reqSetParams("API_202081", param);
			$catchmentAreaKSIC.ui.requestOpenApi(options);
		},
		
		/**
		 * 
		 * @name         : searchKSIClist
		 * @description  : 검색 조건을 만족하는 한국표준산업분류 목록을 요청한다.
		 * 
		 */
		searchKSIClist : function(pObj) {
			var param = pObj;
			if(param === undefined || param === null){
				param = {};								
			}
			
			// searchKSIClist 에서 지정(화면 내 설정해주는 곳이 없어서)
			param.workGb = "S";
			
			if(!param.hasOwnProperty("classDeg")){
				param.classDeg = $catchmentAreaMain.ui.classDeg;
			}
			if(!param.hasOwnProperty("pageSize")){
				param.pageSize = $catchmentAreaKSIC.ui.curpageSize;
			}
			// searchKSIClist 에서 지정 end
			
			if(!param.hasOwnProperty("pageNo")){
				param.pageNo = $catchmentAreaKSIC.ui.curPageNo;
			}
			if(!param.hasOwnProperty("schWord")){
				param.schWord = $catchmentAreaKSIC.ui.curSearchWord;
			}
			if(!param.hasOwnProperty("schMinDepth")){
				param.schMinDepth = $catchmentAreaKSIC.ui.schMinDepth;
			}

			var options = $catchmentAreaKSIC.ui.reqSetParams("API_202081", param);
			$catchmentAreaKSIC.ui.requestOpenApi(options);
		},

		/**
		 * 
		 * @name         : setTree
		 * @description  : 한국표준산업분류 트리를 구성한다.
		 * 
		 */
		setTree : function(res, options) {
			var result = res.result.list;
			var tmpData = [];
			for(var i=0; i < result.length; i++) {
				var tmpObj = {};
				tmpObj.id = result[i].class_code + "_" + options.params.depth;
				tmpObj.cd = result[i].class_code;
				tmpObj.text = result[i].class_code2 + "." + result[i].class_nm;
				tmpObj.curClassNm = result[i].class_nm;
				tmpObj.superClassNm = result[i].super_class_nm;
				tmpObj.depth = options.params.depth + 1;

				tmpObj.infoIcon = false;
//				if (tmpObj.depth > 1) {
//					tmpObj.infoIcon = true;
//				}
			
				if (options.params.depth < 4) {
					tmpObj.children = [{"id": tmpObj.id + "_progress", "iconCls": "icon-tree-loading", "text": "Loading"}];
					tmpObj.state = "closed";
				}else {
					tmpObj.childCount = 0;
				}
				tmpData.push(tmpObj);
				
			}

			if ($catchmentAreaKSIC.ui.companyTree == null) {
				if (options.params.depth == 0) {

					//=============================================================================================//
					var rootData = [];
					var root = {
							id : "root",
							cd : "",
							text : "한국표준산업분류",
							state : "closed",
							children : [{"id": "root_progress", "iconCls": "icon-tree-loading", "text": "Loading"}],
							isExpanded : true
					};
					rootData.push(root);
					//=============================================================================================//

					$catchmentAreaKSIC.ui.companyTree = $("#company_TreeBox").easytree({
						slidingTime:0,
			            building:$catchmentAreaKSIC.event.companyListTreeWidth,
			            stateChanged:$catchmentAreaKSIC.event.companyListTreeWidth,
			            toggled:$catchmentAreaKSIC.event.companyListTreeWidth,
						data : rootData,
						allowActivate: true,
			            disableIcons: true,
			            toggled : function(event, nodes, node) {
							if (node.childCount == null) {
								if (node.children.length > 0 ) {
									if(node.children[0].id == node.id + "_progress") {
										if (node.isExpanded) {															
											var param = {};
											param.depth = node.depth;
											param.classDeg = options.params.classDeg;
											param.classCd = node.cd;															
											$catchmentAreaKSIC.ui.getKSIClist(param);
										}
									}
								}
							}
						},
						selected : function(node) {
							$catchmentAreaKSIC.ui.curSelectedCompanyNode = node;
							
							if(node !== undefined && node !== null){
								//$("#ksicSearchWord").val("");
								
								if(node.depth >= $catchmentAreaKSIC.ui.schMinDepth){									
									var mClassCd = "";
									var classCd = "";
									if(node.cd.length === 1){
										mClassCd = node.cd;
										classCd = node.cd;
									}else if(node.cd.length > 1){
										mClassCd = node.cd.substring(0, 1);
										classCd = node.cd.substring(1);										
									}									
									var classNm = node.curClassNm;
									var superClassNm = node.superClassNm;
									
			    	        		var rtnObj = {};
			    	        		rtnObj.ksicCode = classCd;
			    	        		rtnObj.ksicCodeNm = classNm;
			    	        		rtnObj.mainKsicCd = mClassCd;
			    	        		rtnObj.superKsicCodeNm = superClassNm;
			    	        		$catchmentAreaKSIC.ui.curSelectedItem = rtnObj;									

			    	        		//SGIS4_1025_생활권역 시작
			    	        		var guswowhghlwnddlstksdjqqnsfbzhem = $('.layer_popKSIC #ksicDtl_cd').html();
			    	        		if(!($('.layer_popKSIC .grid_detlbg').is(':visible') && guswowhghlwnddlstksdjqqnsfbzhem === classCd)){
										var selObj = {};									
	//									selObj.class_code = classCd;
	//									selObj.class_nm = classNm;
	//									selObj.main_class_code = mClassCd;
	//									selObj.super_class_nm = superClassNm;									
	//									$catchmentAreaKSIC.ui.setListSimply(selObj);
										
										selObj.ksicCd = classCd;
										$catchmentAreaKSIC.ui.getKSICdetail(selObj);
			    	        		}
			    	        		//SGIS4_1025_생활권역 끝
								}else{
									$catchmentAreaKSIC.ui.setEmptyList();
								}								
							}
						},
						iconSelected : function(e, id) {
							var id = id.split("_")[1];
							id = id.substring(1, id.length);
							
							var classDeg = "";
							if(options.params.classDeg < 10){
								classDeg = "0" + options.params.classDeg;
							}else{
								classDeg = options.params.classDeg;
								
							}
							
							window.open(
									"https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree="+ classDeg +"&strCategoryCode="+ id,
									//"http://kostat.go.kr/kssc/stclass/StClassAction.do?method=ksscTree&classKind=1&catgrp=&code=" + id + "&kssc=popup", 
									"통계분류 홈페이지에 오신것을 환경합니다.",
									"width=420, height=400, menubar=no, status=no, toolbar=no, location=no, scrollbars=yes"
							);
						}
					});
					$catchmentAreaKSIC.ui.companyTree.activateNode(tmpData[0].id);
					$catchmentAreaKSIC.ui.curSelectedCompanyNode = $catchmentAreaKSIC.ui.companyTree.getNode(tmpData[0].id);
					
					//=============================================================================================//
					for (var i=0; i<tmpData.length; i++) {
						$catchmentAreaKSIC.ui.companyTree.addNode(tmpData[i], "root");
					}
					$catchmentAreaKSIC.ui.companyTree.removeNode("root_progress");
					$catchmentAreaKSIC.ui.companyTree.rebuildTree();
					$catchmentAreaKSIC.ui.companyTree.activateNode("root");
					$catchmentAreaKSIC.ui.curSelectedCompanyNode = $catchmentAreaKSIC.ui.companyTree.getNode("root");
					//=============================================================================================//
					
					//SGIS4_0629_생활권역 시작
					if($catchmentAreaKSIC.ui.jingle_goal === ""){
						$(".layer_popKSIC .scroll_wrap2").mCustomScrollbar('scrollTo', ['top','left']);
					}
					//SGIS4_0629_생활권역 끝
				} 
			}else {
				for (var i=0; i<tmpData.length; i++) {
					$catchmentAreaKSIC.ui.companyTree.addNode(tmpData[i], options.params.classCd + "_" +(options.params.depth-1));
				}
				$catchmentAreaKSIC.ui.companyTree.removeNode(options.params.classCd + "_" + (options.params.depth-1) + "_progress");
				$catchmentAreaKSIC.ui.companyTree.rebuildTree();
				$catchmentAreaKSIC.ui.companyTree.activateNode(options.params.classCd + "_" + (options.params.depth-1));
			}
			
			//SGIS4_0629_생활권역 시작
			$catchmentAreaKSIC.ui.jingleCall();
			//SGIS4_0629_생활권역 끝
		},

		/**
		 * 
		 * @name         : setList
		 * @description  : 한국표준산업분류 목록(검색 결과)을 구성한다.
		 * 
		 */
		setList : function(res, options) {
			var totalCount = res.result.total_count;
			var list = res.result.list;
			$catchmentAreaKSIC.ui.curSearchList = res.result.list;
			var pageNo = options.params.pageNo;
			var pageSize = options.params.pageSize;

			var $rootCtnr = $('.layer_popKSIC');
			$rootCtnr.find('tbody[id=list] *').remove();

			var listElement = '';
			for(var i = 0; i < list.length; i++) {
				
				var searchStr = options.params.schWord;
				var replaceStr = $catchmentAreaKSIC.ui.highlightSchTxt(searchStr);
				
				var class_nm_h = list[i].class_nm.split(searchStr).join(replaceStr);
				var class_code_h = list[i].class_code.split(searchStr).join(replaceStr);
				
				listElement += '<tr>';
				listElement += '<td>' + (((pageNo - 1) * pageSize) + (i + 1)) + '</td>';
				if(list[i].main_class_code != list[i].class_code){
					listElement += '<td class="left">' + list[i].main_class_code + ': ' + class_code_h + '</td>';
					//listElement += '<td class="subject"><a href="javascript:alert(111);">' + list[i].class_nm + '</a></td>';					
				}else{
					listElement += '<td class="left">' + list[i].main_class_code + '</td>';
				}
				listElement += '<td class="subject"><span><span class="mightOverflow">' + class_nm_h + '</span><button type="button">선택</button></span></td>';
				listElement += '</tr>';
			}
			$rootCtnr.find('tbody[id=list]').append(listElement);
			
			$rootCtnr.find('#ksicTotalTxt').html($catchmentAreaKSIC.ui.createTotalTxt());
			$rootCtnr.find('#ksicTotalCnt').html(totalCount);

			var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
			$rootCtnr.find('.pagenation .list').paging({
				current : pageNo,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'strong',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				nextClass : 'next',
				prevClass : 'prev',
				firstClass : 'first',
				lastClass : 'last',
				onclick : function(e, page) { // 페이지 선택 시					
					var param = {};
					param.pageNo = page;
					$catchmentAreaKSIC.ui.searchKSIClist(param);
				}
			});
			
			$catchmentAreaKSIC.ui.toggleDisplay("list");
		},
		
		/**
		 * 
		 * @name         : setDetail
		 * @description  : 한국표준산업분류 상세를 구성한다.
		 * 
		 */
		setDetail : function(res, options) {
			
			var $rootCtnr = $('.layer_popKSIC');
			$rootCtnr.find('.dtlMem').html("");
			
			var list = res.result.list;			
			if(list != undefined && list.length > 0){
				var dtlInfo = list[0];
				
				var searchStr = options.params.schWord;
				var replaceStr = $catchmentAreaKSIC.ui.highlightSchTxt(searchStr);
				
				var class_deg = dtlInfo["class_deg"]; 
				if(class_deg != undefined){
					$rootCtnr.find('#ksicDtl_deg').html(class_deg);
				}
				
				var ksic_cd = dtlInfo["ksic_cd"]; 
				if(ksic_cd != undefined){
					if(replaceStr !== ""){
						ksic_cd = ksic_cd.split(searchStr).join(replaceStr);
					}
					$rootCtnr.find('#ksicDtl_cd').html(ksic_cd);
				}
				
				var ksic_nm = dtlInfo["ksic_nm"];
				var ksic_nm_eng = dtlInfo["ksic_nm_eng"];
				var tmpStr = "";
				if(ksic_nm != undefined){
					if(replaceStr !== ""){
						ksic_nm = ksic_nm.split(searchStr).join(replaceStr);
					}
					tmpStr = ksic_nm;
				}
				if(ksic_nm_eng != undefined){
					if(tmpStr !== ""){
						tmpStr = tmpStr + "<br/>" + ksic_nm_eng;
					}else{
						tmpStr = ksic_nm_eng;
					}
				}
				$rootCtnr.find('#ksicDtl_nm').html(tmpStr);
				
				var explain = "";
				var ksic_exp = dtlInfo["ksic_exp"];
				if(ksic_exp != undefined){
					ksic_exp = ksic_exp.replace(/(\n|\r\n)/g, '<br/>');				
					explain = ksic_exp;
				}
				var exp_ex = dtlInfo["exp_ex"];
				if(exp_ex != undefined){
					exp_ex = exp_ex.replace(/(\n|\r\n)/g, '<br/>');				
					explain = explain + "<br/><br/><예시><br/>" + exp_ex;
				}
				var exp_excl = dtlInfo["exp_excl"];
				if(exp_excl != undefined){
					exp_excl = exp_excl.replace(/(\n|\r\n)/g, '<br/>');				
					explain = explain + "<br/><br/><제외><br/>" + exp_excl;
				}
				$rootCtnr.find('#ksicDtl_exp').html(explain);
				
				var ksic_kwrd = dtlInfo["ksic_kwrd"];
				if(ksic_kwrd != undefined){
					if(replaceStr !== ""){
						ksic_kwrd = ksic_kwrd.split(searchStr).join(replaceStr);
					}
					ksic_kwrd = ksic_kwrd.replace(/(\n|\r\n)/g, '<br/>');				
					$rootCtnr.find('#ksicDtl_kwrd').html(ksic_kwrd);
				}
				
				//SGIS4_1025_생활권역 시작
				var refleshYn = options.params["treeRecallYn"];
				if(refleshYn === "Y"){
					var mainKsicCd = options.params["mainKsicCd"];
					var ksicCd = options.params["ksicCd"];
					if((mainKsicCd !== undefined && mainKsicCd !== null) && (ksicCd !== undefined && ksicCd !== null)){
						$catchmentAreaKSIC.ui.companyTree = null;
						$catchmentAreaKSIC.ui.curSelectedCompanyNode = null;
						$catchmentAreaKSIC.ui.jingle_goal = mainKsicCd + ksicCd;
						$catchmentAreaKSIC.ui.jingle_next = mainKsicCd;
							
						$catchmentAreaKSIC.ui.getKSIClist();
					}
				}
				//SGIS4_1025_생활권역 끝
			}

			$catchmentAreaKSIC.ui.toggleDisplay("detail");
		},			

		/**
		 * 
		 * @name         : setListSimply
		 * @description  : 트리에서 노드 선택 시 한국표준산업분류 목록을 구성한다.
		 * 
		 */
		setListSimply : function(pSelNode) {
			var totalCount = 1;
			var pageNo = 1;
			var pageSize = $catchmentAreaKSIC.ui.curpageSize;
			var tmpList = [];
			tmpList.push(pSelNode);
			$catchmentAreaKSIC.ui.curSearchList = tmpList;

			var $rootCtnr = $('.layer_popKSIC');
			$rootCtnr.find('tbody[id=list] *').remove();

			var listElement = '<tr class="active">';
			listElement += '<td>1</td>';
			if(pSelNode.main_class_code != pSelNode.class_code){	
				listElement += '<td class="left">' + pSelNode.main_class_code + ': ' + pSelNode.class_code + '</td>';
			}else{
				listElement += '<td class="left">' + pSelNode.main_class_code + '</td>';
			}			
			listElement += '<td class="subject mightOverflow">' + pSelNode.class_nm + '</td>';
			listElement += '</tr>';

			$rootCtnr.find('tbody[id=list]').append(listElement);
			
			$rootCtnr.find('#ksicTotalCnt').html(totalCount);

			var totalPage = Math.ceil(totalCount / pageSize); // 전체 페이지 수
			$rootCtnr.find('.pagenation .list').paging({
				current : pageNo,
				max : totalPage,
				itemClass : 'page',
				itemCurrent : 'strong',
				format : '{0}',
				next : '&gt;',
				prev : '&lt;',
				first : '&lt;&lt;',
				last : '&gt;&gt;',
				nextClass : 'next',
				prevClass : 'prev',
				firstClass : 'first',
				lastClass : 'last',
				onclick : function(e, page) { // 페이지 선택 시					
					var param = {};
					param.pageNo = page;
					$catchmentAreaKSIC.ui.searchKSIClist(param);
				}
			});

			$catchmentAreaKSIC.ui.toggleDisplay("list");			
		},
		
		/**
		 * 
		 * @name         : setEmptyList
		 * @description  : 빈 검색 결과를 구성한다.
		 * 
		 */
		setEmptyList : function() {
			
			$catchmentAreaKSIC.ui.curSearchList = null;
			$catchmentAreaKSIC.ui.curSelectedItem = null;
				
			var totalCount = 0;

			var $rootCtnr = $('.layer_popKSIC');
			$rootCtnr.find('tbody[id=list] *').remove();

			var listElement = '<tr class="noData"><td colspan="3">검색한 자료가 없습니다.</td></tr>';
			$rootCtnr.find('tbody[id=list]').append(listElement);
			
			$rootCtnr.find('#ksicTotalTxt').html($catchmentAreaKSIC.ui.createTotalTxt());
			$rootCtnr.find('#ksicTotalCnt').html(totalCount);

			$rootCtnr.find('span[class=list] *').remove();
			
			$catchmentAreaKSIC.ui.toggleDisplay("list");			
		},
		
		toggleDisplay : function(pGb) {
			if(pGb == "list"){
				$('.layer_popKSIC .grid_detlbg').hide();
				$('.layer_popKSIC .grid_contbg').show();				
			}else if(pGb == "detail"){
				$('.layer_popKSIC .grid_contbg').hide();
				$('.layer_popKSIC .grid_detlbg').show();				
			}
		},
		
		highlightSchTxt : function(pSchTxt) {
			
			var highlightTxt = '';
			if(pSchTxt !== undefined && pSchTxt !== null && pSchTxt !== ""){
				highlightTxt = '<span class="search_h">' + pSchTxt + '</span>';
			}
			
			return highlightTxt;
		},
		
		createTotalTxt : function() {
			var rst = "";
			var schWord = $catchmentAreaKSIC.ui.curSearchWord;
			if(schWord === undefined || schWord === null){
				schWord = "";
			}
			
			if(schWord.length > 0){
				rst = "'" + schWord + "' 검색결과 전체";
			}else{
				rst = "검색결과 전체";
			}
			
			return rst;		
		},
		
		//SGIS4_0629_생활권역 시작
		jingleCall : function() {
			
			var jingle_goal = $catchmentAreaKSIC.ui.jingle_goal;
			var jingle_next = $catchmentAreaKSIC.ui.jingle_next;
			
			if((jingle_goal !== undefined && jingle_goal !== null) && (jingle_next !== undefined && jingle_next !== null)
					&& $catchmentAreaKSIC.ui.companyTree !== null){
				var goalLen = jingle_goal.length;
				var nextLen = jingle_next.length;
				if(nextLen > 0 && goalLen >= nextLen){
					var depthNo = 0;
					if(nextLen > 1){
						depthNo = nextLen - 2;
					}
					if(goalLen == nextLen){
						//SGIS4_1025_생활권역 시작
						$catchmentAreaKSIC.ui.jingle_next = "";		// 반복 제어

						var $tgtNode = $('#company_TreeBox #' + jingle_next + "_" + depthNo); 
						$tgtNode.trigger('click');
						$tgtNode.find('.easytree-title').trigger('click');
						
						if(nextLen >= 6){
							$catchmentAreaKSIC.ui.jingle_goal = "";		// 반복 제어
							$catchmentAreaKSIC.ui.moveTreeScroll(jingle_goal);							
						}
						//SGIS4_1025_생활권역 끝
					}else{
						$catchmentAreaKSIC.ui.companyTree.toggleNode(jingle_next + "_" + depthNo);
						$catchmentAreaKSIC.ui.jingle_next = jingle_goal.substring(0,(depthNo+3));
					}
				}else if(nextLen === 0 && goalLen > 0){
					//SGIS4_1025_생활권역 시작
					$catchmentAreaKSIC.ui.jingle_goal = "";		// 반복 제어
					$catchmentAreaKSIC.ui.moveTreeScroll(jingle_goal);
					//SGIS4_1025_생활권역 끝
				}
			}
		},
		//SGIS4_0629_생활권역 끝
		
		//SGIS4_1025_생활권역 시작
		moveTreeScroll : function(pTgtCd) {
			var tgtCd = pTgtCd;
			if(tgtCd !== undefined && tgtCd !== null){
				var tgtLen = tgtCd.length;				
				if(tgtLen > 0){
					var depthNo = 0;
					if(tgtLen > 1){
						depthNo = tgtLen - 2;
					}
					var $tgtNode = $('#company_TreeBox #' + tgtCd + "_" + depthNo);
					
					var selItemTop = $tgtNode.position().top;
					if(selItemTop > 100){
						selItemTop = selItemTop - 100;
					}else{
						selItemTop = 0;
					}
					$(".layer_popKSIC .scroll_wrap2").mCustomScrollbar('scrollTo', [selItemTop,'left']);
				}else{
					$(".layer_popKSIC .scroll_wrap2").mCustomScrollbar('scrollTo', ['top','left']);
				}
			}
		},
		//SGIS4_1025_생활권역 끝
		
		/**
		 * 
		 * @name         : reqSetParams
		 * @description  : 오픈api 요청 시 전달되는 파라미터를 설정한다.
		 * 
		 */
		reqSetParams : function (api_id, param) {
			
			var params = {
					api_id : api_id,
					async : param.async,
					workGb : param.workGb,			// T:트리용, S:검색용, D:상세 
					depth : param.depth,
					classDeg : param.classDeg,
					classCd : param.classCd,
					schWord : param.schWord,
					schClassCd : param.schClassCd,
					schMinDepth : param.schMinDepth,
					pageNo : param.pageNo,
					pageSize : param.pageSize,
					//SGIS4_1025_생활권역 시작
					mainKsicCd : param.mainKsicCd,		// 상세 조회용 산업대분류 코드
					treeRecallYn : param.treeRecallYn,	// 상세 조회용
					//SGIS4_1025_생활권역 끝
					ksicCd : param.ksicCd			// 상세 조회용 산업분류 코드
			};	
			
			return params;				
		},
		
		/**
		 * 
		 * @name         : requestOpenApi
		 * @description  : 오픈api 서비스를 요청한다.
		 * 
		 */
		requestOpenApi : function(options) {
	
			var api_id = typeof options === 'string' ? options : options.api_id;
			
			if 	    (api_id == "API_202081") $catchmentAreaMainApi.request.getKSICinfo(options);
			//else if (api_id == "API_202082") $catchmentAreaMainApi.request.get000(options);
		}
	};

	$catchmentAreaKSIC.callbackFunc = {

	};
	
	$catchmentAreaKSIC.event = {
		/**
		 * 
		 * @description  : 산업분류 목록 트리 width & scroll.
		 * @date         : 2015. 10. 16. 
		 * @author	     : 김성현
		 * @history 	 :
		 */
		companyListTreeWidth : function() {
			$("#company_TreeBox").css("width","300px"); 
		    var stepWidth = $("#company_TreeBox > ul").prop("scrollWidth");
		    $("#company_TreeBox").css({"width":(parseInt(stepWidth) + 50)+"px"});
		    //$(".normalBox").mCustomScrollbar("update");
		},
			
		/**
		 * 
		 * @name         : setUIEvent
		 * @description  : UI에서 사용하는 이벤트 및 초기설정을 수행한다. 
		 * 
		 */	
		setUIEvent : function() {
			var body = $("body");

	        body.on("keydown", "#ksicSearchWord", function(e){
				if(e.keyCode == 13){					
					$("#ksicSearchBtn").trigger("click");
				}
	        });
	        
	        body.on("click", "#ksicSearchBtn", function(e){
	        	var schWord = $("#ksicSearchWord").val().trim();
	        	if(schWord !== undefined && schWord !== null && schWord.length > 1){
	        		$catchmentAreaKSIC.ui.curSearchWord = schWord;
	        		$catchmentAreaKSIC.ui.curPageNo = 1;		
	        		$catchmentAreaKSIC.ui.searchKSIClist();
	        	}else{
	        		caMessageAlert.open("알림", "최소 2자 이상의 검색어가 필요합니다.");
	        		return;
	        	}
	        });

	        body.on("click", ".layer_popKSIC .grid_detlbg button.ksicSel", function(e){

	        	var rtnObj = $catchmentAreaKSIC.ui.curSelectedItem;
	        	if(rtnObj !== undefined && rtnObj !== null){
	        		rtnObj.params = $catchmentAreaKSIC.ui.callersInfo;
	        		
	        		if ($catchmentAreaKSIC.ui.delegate && 
            				$catchmentAreaKSIC.ui.delegate.callbackFunc &&
            				$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem) {
    	        			$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem(rtnObj);
    					}
	        		
	        		$catchmentAreaKSIC.ui.closeUI();
	        	}	        
	        });
	        
	        body.on("click", ".layer_popKSIC .board-list tbody button", function(e){
	        	e.stopPropagation();

	        	var $selRow = $(this).closest("tr");
	        	if($selRow.length === 1){
	        		var selIdx = $selRow.index();
	        		var schList = $catchmentAreaKSIC.ui.curSearchList;
	        		if(schList !== undefined && schList !== null){
	        			if(schList.length > selIdx){
	        				
	        				// undefined/null로 넘기지 않기 추가
	        				
	    	        		var ksicCd = schList[selIdx].class_code;
	    	        		var ksicNm = schList[selIdx].class_nm;
	    	        		var mainKsicCd = schList[selIdx].main_class_code;
	    	        		var superKsicCodeNm = schList[selIdx].super_class_nm;
	    	        		var rtnObj = {};
	    	        		rtnObj.ksicCode = ksicCd.trim();
	    	        		rtnObj.ksicCodeNm = ksicNm;
	    	        		rtnObj.mainKsicCd = mainKsicCd.trim();
	    	        		rtnObj.superKsicCodeNm = superKsicCodeNm;
	    	        		rtnObj.params = $catchmentAreaKSIC.ui.callersInfo;

	    	        		if ($catchmentAreaKSIC.ui.delegate && 
	            				$catchmentAreaKSIC.ui.delegate.callbackFunc &&
	            				$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem) {
	    	        			$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem(rtnObj);
	    					}	        				
	        			}
	        		}

	        		$catchmentAreaKSIC.ui.closeUI();
	        	}else{
	        		caMessageAlert.open("알림", "1개의 한국표준산업분류 항목을 선택해 주세요.");
	        	}
	        });	        
	        
	        body.on("click", ".layer_popKSIC .board-list tbody tr", function(e){
	        	if(!$(this).hasClass('noData')){
//		        	$(this).siblings('tr').removeClass('active');
//		        	$(this).toggleClass('active');
	        		
		        	var $selRow = $(this);
		        	if($selRow.length === 1){
		        		var selIdx = $selRow.index();
		        		var schList = $catchmentAreaKSIC.ui.curSearchList;
		        		if(schList !== undefined && schList !== null){
		        			if(schList.length > selIdx){		        				
		    	        		var ksicCd = schList[selIdx].class_code;
		    	        		var ksicNm = schList[selIdx].class_nm;
		    	        		var mainKsicCd = schList[selIdx].main_class_code;
		    	        		var superKsicCodeNm = schList[selIdx].super_class_nm;		    	        		

		    	        		var rtnObj = {};
		    	        		rtnObj.ksicCode = ksicCd;
		    	        		rtnObj.ksicCodeNm = ksicNm;
		    	        		rtnObj.mainKsicCd = mainKsicCd;
		    	        		rtnObj.superKsicCodeNm = superKsicCodeNm;
		    	        		$catchmentAreaKSIC.ui.curSelectedItem = rtnObj;
		    	        		
								var selObj = {};
								selObj.ksicCd = ksicCd;
								selObj.schWord = $catchmentAreaKSIC.ui.curSearchWord;		// 검색어
								//SGIS4_1025_생활권역 시작
								selObj.treeRecallYn = "Y";
								selObj.mainKsicCd = mainKsicCd; 
								//SGIS4_1025_생활권역 끝
								$catchmentAreaKSIC.ui.getKSICdetail(selObj);	        				
		        			}
		        		}
		        	}	        		
	        	}
	        });
	        
//	        body.on("click", "#ksicSelectedBtn", function(e){
//	        	var $selRow = $('.layer_popKSIC .board-list tbody tr.active');
//	        	if($selRow.length === 1){
//	        		var selIdx = $selRow.index();
//	        		var schList = $catchmentAreaKSIC.ui.curSearchList;
//	        		if(schList !== undefined && schList !== null){
//	        			if(schList.length > selIdx){
//	        				
//	        				// undefined/null로 넘기지 않기 추가
//	        				
//	    	        		var ksicCd = schList[selIdx].class_code;
//	    	        		var ksicNm = schList[selIdx].class_nm;
//	    	        		var mainKsicCd = schList[selIdx].main_class_code;
//	    	        		var superKsicCodeNm = schList[selIdx].super_class_nm;
//	    	        		var rtnObj = {};
//	    	        		rtnObj.ksicCode = ksicCd.trim();
//	    	        		rtnObj.ksicCodeNm = ksicNm;
//	    	        		rtnObj.mainKsicCd = mainKsicCd.trim();
//	    	        		rtnObj.superKsicCodeNm = superKsicCodeNm;
//	    	        		rtnObj.params = $catchmentAreaKSIC.ui.callersInfo;
//
//	    	        		if ($catchmentAreaKSIC.ui.delegate && 
//	            				$catchmentAreaKSIC.ui.delegate.callbackFunc &&
//	            				$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem) {
//	    	        			$catchmentAreaKSIC.ui.delegate.callbackFunc.didSelectKSICItem(rtnObj);
//	    					}	        				
//	        			}
//	        		}
//
//	        		$catchmentAreaKSIC.ui.closeUI();
//	        	}else{
//	        		caMessageAlert.open("알림", "1개의 한국표준산업분류 항목을 선택해 주세요.");
//	        	}
//	        });

	        body.on('click','.layer_popKSIC .closePop',function(e){
	        	$catchmentAreaKSIC.ui.closeUI();	        	
	        });
	        
	        body.on('click','.layer_popKSIC #goList',function(e){
	        	$catchmentAreaKSIC.ui.toggleDisplay("list");	        	
	        });
		}			
	};
	
}(window, document));
