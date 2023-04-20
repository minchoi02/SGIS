/**
 * 구인정보 목록 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 구인정보목록
 * 
 * history : 
 *	2018.09.17	ywKim	신규
 *
 * author : ywKim
 * version : 1.0
 * see : 
 *
 */
(function(W, D) {
	W.$vjJobInfoList = W.$vjJobInfoList || {};
	
	$vjJobInfoList.ui = {
		pageSize : 15,				// 한 화면에 보여줄 목록 개수
		pageGroupCount : 10,			// 한 화면에 보여지는 페이지 번호의 최대 개수

		
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function() {
			$vjLivingEnvironment.ui.hide();
			$workRoad.ui.showLayer('#vjJobInfoList', {
				scrollOptions: {
					key:$('#vjJobInfoList'), 
					target:$('#vjJobInfoList .cont-box'), 
					mCustom : true,
					maxHeight : 498
				}
			});
			
			$vjJobInfoList.ui.toggleJobInfoList(true);
			$vjMap.ui.clearAllJobLocationMarker();
			$vjMap.ui.clearJobLocation();
			$vjJobInfoList.ui.loadJobInfoList();
//			$vjJobInfoList.ui.loadJobPoiList();
		},
		/**
		 * @name         : 화면 닫기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		hide : function() {
			$workRoad.ui.hideLayer('#vjJobInfoList');
		},
		
		/**
		 * @name         : 구인정보목록 화면 토글
		 * @description  : 구인정보목록 레이어에서 구인정보목록 버튼을 클릭했을때 레이어를 토글시킨다.
		 * @date         : 2018.09.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param pShow	: 레이어를 무조건 show 할지여부
		 * 					- undefined 인 경우 toggle
		 */
		toggleJobInfoList : function(pShow) {
			
			var html = '구인정보목록';
			if ($wrmViewJobs.ui.defaultSidoNm.length > 0 && $wrmViewJobs.ui.defaultSggNm.length > 0) {
				html = '(' + $wrmViewJobs.ui.defaultSidoNm + ' ' + $wrmViewJobs.ui.defaultSggNm + ')<br/>구인정보목록';
			} else if ($wrmViewJobs.ui.defaultSidoNm.length > 0) {
				html = '(' + $wrmViewJobs.ui.defaultSidoNm + ')<br/>구인정보목록';
			}
			$('#vjJobInfoList #vjToggle').html(html);

			if (typeof pShow == 'boolean') {
				if (pShow) {
					$vjJobInfoList.ui.showBody();
				} else {
					$vjJobInfoList.ui.hideBody();
				}
			} else {
				if ($('#vjJobInfoList #vjToggle').attr('data-show') != null) {
					$vjJobInfoList.ui.hideBody();
				} else {
					$vjJobInfoList.ui.showBody();
				}
			}
		},
		showBody : function() {
			$('#vjJobInfoList #vjToggle').attr('data-show', '');
			
			$('#vjJobInfoList').css({
				background: '#fff',
				width: '740px',
				height: '500px',/*'auto',*/
				border: '1px solid #213967'
			});
			$('#vjJobInfoList .topbar').show();
			$('#vjJobInfoList .cont-box').show();
//			$('#vjJobInfoList #vjPopupContents').show();
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
			$('#vjJobInfoList #wrPaging').show();
			$("#vjConditionList").show();
			$("#vjJobInfoList #vjSearch").show();
			$("#vjJobInfoList #vjSearch2").hide();
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
		},
		hideBody : function() {
			$('#vjJobInfoList #vjToggle').removeAttr('data-show');
			
			//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START
			var lvWidth = 160;
			lvWidth += Number($("#vjJobInfoList #vjSearch2").width())+2;
			if($("#vjJobInfoList #vjBack").css("display") != "none") {
				lvWidth += Number($("#vjJobInfoList #vjBack").width())+2;
			}
			//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END
			
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
			var lvHeight = 39;
			
			$('#vjJobInfoList').css({
				background: 'transparent',
				//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START
				width: lvWidth+'px',//$('vjToggle').width() + 2,
				//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END
				height: lvHeight+'px',//$('vjToggle').height() + 2,
				border: '0px',
			});
			$('#vjJobInfoList .topbar').hide();
			$('#vjJobInfoList .cont-box').hide();
//			$('#vjJobInfoList #vjPopupContents').hide();
			$('#vjJobInfoList #wrPaging').hide();
			$("#vjConditionList").hide();
			$("#vjJobInfoList #vjSearch").hide();
			$("#vjJobInfoList #vjSearch2").show();
			//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
		},
		
		/**
		 * @name         : 구인정보 목록 조회
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 */
		loadJobInfoList : function (pPage) {
			
			$('#vjJobInfoList table tbody').html('');
			
			var dataParams = $vjJobInfoList.ui.getDataParams(pPage);
			var total_count = 0;
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobInfoList.json",
				async: true,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						total_count = res.result.total_count;
						
						var dataList = res.result.dataList;
						
						console.log("total_count : " + res.result.total_count);
						console.log("pageSize : " + res.result.pageSize);
						console.log("curPage : " + res.result.curPage);
						console.log(dataList);
						
						if (res.result.total_area_count != undefined) {
							$("#vjDataCount").html($workRoad.util.addComma(res.result.total_count, "건") + " / " + $workRoad.util.addComma(res.result.total_area_count, "건"));
						} else {
							$("#vjDataCount").html($workRoad.util.addComma(res.result.total_count, "건"));
						}
						
						$vjJobInfoList.ui.drawGrid(dataList);

						$workRoadPaging.ui.init("#vjJobInfoList", res.result.pageSize, $vjJobInfoList.ui.pageGroupCount, $vjJobInfoList.ui.changePage);
						$workRoadPaging.ui.set(res.result.curPage, res.result.total_count);
						$workRoadPaging.ui.draw();
						//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
						if($wrmViewJobs.ui.defaultSidoCd == "all") {
							$("#vjJobInfoList #vjLifeEnvInfo").hide();
							//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START
							var lvVjLifeEnvInfoLeft = 160;
							lvVjLifeEnvInfoLeft += Number($("#vjJobInfoList #vjSearch").width());
							//lvVjLifeEnvInfoLeft += Number($("#vjJobInfoList #vjBack").width());
							$("#vjJobInfoList #vjLifeEnvInfo").css("left",lvVjLifeEnvInfoLeft+"px");
							$("#vjJobInfoList #vjBack").hide();
							var lvVjToggleLeft = 0;
							//lvVjToggleLeft += Number($("#vjJobInfoList #vjBack").width())+2;
							$("#vjJobInfoList #vjToggle").css("left",lvVjToggleLeft+"px");
							var lvVjSearchLeft = 162;
							//lvVjSearchLeft += Number($("#vjJobInfoList #vjBack").width())+2;
							$("#vjJobInfoList #vjSearch").css("left",(lvVjSearchLeft+4)+"px");
							$("#vjJobInfoList #vjSearch2").css("left",lvVjSearchLeft+"px");
							//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END
						} else {
							$("#vjJobInfoList #vjLifeEnvInfo").show();
							//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START
							var lvVjLifeEnvInfoLeft = 160;
							lvVjLifeEnvInfoLeft += Number($("#vjJobInfoList #vjSearch").width());
							lvVjLifeEnvInfoLeft += Number($("#vjJobInfoList #vjBack").width());
							$("#vjJobInfoList #vjLifeEnvInfo").css("left",lvVjLifeEnvInfoLeft+"px");
							$("#vjJobInfoList #vjBack").show();
							var lvVjToggleLeft = 0;
							lvVjToggleLeft += Number($("#vjJobInfoList #vjBack").width())+2;
							$("#vjJobInfoList #vjToggle").css("left",lvVjToggleLeft+"px");
							var lvVjSearchLeft = 162;
							lvVjSearchLeft += Number($("#vjJobInfoList #vjBack").width())+2;
							$("#vjJobInfoList #vjSearch").css("left",(lvVjSearchLeft+4)+"px");
							$("#vjJobInfoList #vjSearch2").css("left",lvVjSearchLeft+"px");
							//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END
						}
						//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
					} else {
						alert('failed!');
					}
				},
				error:function(err) {
					alert(err.responseText);
				},
				beforeSend:function(){
					$workRoad.ui.showLoading();
				},
				complete:function(){
					$workRoad.ui.hideLoading();
					
					//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
					//일자리보기 > 통합검색 버튼 목록 창 오른쪽에 따라 붙게하기 (안씀)
					/*
					try {
						var lvTempDiv = $("#vjConditionList div.choice-list");
						var lvTempTop = Number($("#vjJobInfoList").css("top").replace(/px/g,""))+6;
						var lvTempLeft = Number($("#vjJobInfoList").css("left").replace(/px/g,""))+750;
						lvTempDiv.css("top", lvTempTop+"px");
						lvTempDiv.css("left", lvTempLeft+"px");
					} catch(e) { }
					*/
					//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
					
					if (pPage == undefined && total_count > 0 
						//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. START
						&& $wrmViewJobs.ui.defaultSidoCd != "all"
						//2019-05-07 [김남민] 일자리 보기 > 전국에서 일자리보기 기능 개선. END
						//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. START
						&& !(($wrmViewJobs.ui.defaultSggCd == "" || $wrmViewJobs.ui.defaultSggCd == "all" || $wrmViewJobs.ui.defaultSggCd == "999") && ($wrmViewJobs.ui.defaultSidoCd == "11" || $wrmViewJobs.ui.defaultSidoCd == "31"))
						//2019-05-10 [김남민] 일자리 보기 > 선택항목이 한번에 표출되도록 기능 개선. END
					) {
						$vjJobInfoList.ui.loadJobPoiList();
					}
					//2019-08-27 [김남민] 일자리 보기 > 서울특별시, 경기도 수정 START
					else if(pPage == undefined && total_count > 0 && ($wrmViewJobs.ui.defaultSidoCd == "11" || $wrmViewJobs.ui.defaultSidoCd == "31")) {
						var sidoCoorX = 0;
						var sidoCoorY = 0;
						if($wrmViewJobs.ui.defaultSidoCd == "11") {
							sidoCoorX = 953931.981873;
							sidoCoorY = 1952053.04791;
						}
						if($wrmViewJobs.ui.defaultSidoCd == "31") {
							sidoCoorX = 978020.5788154458;
							sidoCoorY = 1920879.3275155668;
						}
						$wrmViewJobs.ui.getJobCount($wrmViewJobs.ui.defaultSidoCd,sidoCoorX,sidoCoorY);
					}
					//2019-08-27 [김남민] 일자리 보기 > 서울특별시, 경기도 수정 END
					
					setTimeout(function() {
						if (total_count == 0) {
							alert("데이터가 존재하지 않습니다.");
						};
					},100);
				},
			})
			.always(function(xhr, status) {
				// 초기화
//				$wrmViewJobs.ui.conditionType = '';
//				$wrmViewJobs.ui.conditionWageType = '';
			});
		},
		getDataParams : function (pPage) {
			var dataParams = {};
			dataParams.sido_cd = $wrmViewJobs.ui.defaultSidoCd;								// 시도 코드
			if ($wrmViewJobs.ui.defaultSggCd != "" && $wrmViewJobs.ui.defaultSggCd != "999") {
				dataParams.sgg_cd = $wrmViewJobs.ui.defaultSggCd;							// 시군구 코드
			}
			dataParams.sortType = $("#vjJobInfoList #vjViewType option:selected").val();	// 정렬 구분 (REG_DT_DESC: 최근 등록순 / CLOS_DT:마감일 오름순 / CLOS_DT_DESC: 마감일 내림순)
			dataParams.page_num = (typeof pPage == "undefined") ? 1 : pPage;				// 페이지 번호
			dataParams.pageSize = $vjJobInfoList.ui.pageSize;								// 페이지 사이즈
			
			// 모든 조건을 개별 파라미터로 생성 (콤마로 구분된 목록으로 변환)
			for (var i = 0; i < $wrmViewJobs.ui.conditionList.length; i++) {
				if ($wrmViewJobs.ui.conditionList[i].codeList.length > 0) {
					dataParams[$wrmViewJobs.ui.conditionList[i].id] = $wrmViewJobs.ui.conditionList[i].codeList.join(",");
					
					if ($wrmViewJobs.ui.conditionList[i].wageType != undefined) {
						dataParams.wageType = $wrmViewJobs.ui.conditionList[i].wageType;
					}
				}
				//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 START
				if ($wrmViewJobs.ui.conditionList[i][$wrmViewJobs.ui.conditionList[i].id] != undefined) {
					dataParams[$wrmViewJobs.ui.conditionList[i].id] = $wrmViewJobs.ui.conditionList[i][$wrmViewJobs.ui.conditionList[i].id];
				}
				//2019-06-11 [김남민] 일자리 보기 > 통합검색 수정 END
			}
//			dataParams.conditionList = $wrmViewJobs.ui.conditionList;
//			if ($wrmViewJobs.ui.conditionType != "") {
//				dataParams.condition_type = $wrmViewJobs.ui.conditionType;					// 조건 구분
//				
//				if ($wrmViewJobs.ui.conditionCodeArr.length > 0) {
//					dataParams.condition_cd = $wrmViewJobs.ui.conditionCodeArr.join(",");	// 조건 코드
//				}
//			}
//			if ($wrmViewJobs.ui.conditionWageType != "") {
//				dataParams.wage_type = $wrmViewJobs.ui.conditionWageType;					// 임금형태
//			}
			
			return dataParams;
		},
		loadJobPoiList : function (pPage) {
			var dataParams = $vjJobInfoList.ui.getDataParams(pPage);
			dataParams.mode = 'POI';
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/viewJobs/selectJobInfoList.json",
				async: true,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						// 지도중심 이동 및 줌 설정 추가 - 2019.01.30	ywKim	변경
						$vjMap.ui.markAllJobLocation(res.result.poiList,
							$wrmViewJobs.ui.defaultSidoCd,
							$wrmViewJobs.ui.defaultSggCd,
				            /* mng_s 20190312 이금은 */   
							$wrmViewJobs.ui.defaultSggCoorX,
							$wrmViewJobs.ui.defaultSggCoorY,
				            /* mng_s 20190312 이금은 */
							function(joNo, ptX, ptY) { 
								$vjJobInfoList.ui.showDetail(joNo, ptX, ptY, false); 
							});
					} else {
						alert('failed!');
					}
				},
				error:function(err) {
					alert(err.responseText);
				},
				beforeSend:function(){
					$workRoad.ui.showLoading();
				},
				complete:function(){
					$workRoad.ui.hideLoading();
					
					/** 2020.07.23[한광희] 사람인 추가로 인한 조회 수정 START */
					if ($wrmViewJobs.ui.defaultSggCd != "999") {
						$vjMap.ui.mapList[0].mapMove($wrmViewJobs.ui.sggPT, 7);
					} else if ($wrmViewJobs.ui.defaultSidoCd != null) {
						var doAreaCode = ["31", "32", "33", "34", "35", "36", "37", "38"];// 경기도,강원도,충청남북도,전라남북도,경상남북도
						if (doAreaCode.indexOf($wrmViewJobs.ui.defaultSidoCd) >= 0) {
							$vjMap.ui.mapList[0].mapMove($wrmViewJobs.ui.sidoPT, 3);	// 시
						} else {
							$vjMap.ui.mapList[0].mapMove($wrmViewJobs.ui.sidoPT, 5);	// 도
						}
					} else {
						$vjMap.ui.mapList[0].mapMove([989674, 1818313], 2);	// 전국
					}
					/** 2020.07.23[한광희] 사람인 추가로 인한 조회 수정 END */
				},
			});
		},
		showDetail : function(pJoNo, pPtX, pPtY, pMovingYn) {
			var dataParams = {};
			dataParams.jo_no = pJoNo;
			dataParams.base_year = bndYear;
//			dataParams.base_year = $vjMap.ui.mapList[0].bnd_year;

			$workRoad.ui.showLoading();
			
			$vjMap.ui.markJobLocation([pPtX, pPtY], pMovingYn);
			
			$vjDataBoard.ui.showContents('/view/workRoad/viewJobs/vjJobInfoDetail' 
					, dataParams 
					, '661px' 
					, function() {
						
				$vjJobInfoDetail.ui.ready();
				
				$workRoad.ui.hideLoading();
			});					

//			$vjJobInfoList.ui.toggleJobInfoList(false);
		},
		/**
		 * @name         : 구인정보 목록 테이블에 데이터 채우기 
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 */
		drawGrid : function(pDataList) {
			/* 임시 */
			var sido_cd_arr = [];
			var sgg_cd_arr = [];
			var entrprs_type_arr = [];
			var indust_class_arr = [];
			var rcrit_jssfc_arr = [];
			var salary_arr = [];
			var emplym_type_arr = [];
			var acdmcr_arr = [];
			var career_arr = [];	
			
			for(var  i = 0; i < pDataList.length; i ++) {
				var data = pDataList[i];
				
				var $row = $('<tr/>');
				var html = '';
				html += $vjJobInfoList.ui.getCompanyHtml(data);
				html += $vjJobInfoList.ui.getSubjectHtml(data);
				html += $vjJobInfoList.ui.getWorkHtml(data);
				html += $vjJobInfoList.ui.getDayHtml(data);
				html += $vjJobInfoList.ui.getDetailViewHtml(data);
				$row.html(html);
				
				$('#vjJobInfoList table tbody').append($row);

				/* 임시 */
				if($.inArray(data.sido_cd, sido_cd_arr) == -1){ sido_cd_arr.push(data.sido_cd); } 
				if($.inArray(data.sgg_cd, sgg_cd_arr) == -1){ sgg_cd_arr.push(data.sgg_cd); } 
				if($.inArray(data.entrprs_type, entrprs_type_arr) == -1){ entrprs_type_arr.push(data.entrprs_type); } 
				if($.inArray(data.indust_class, indust_class_arr) == -1){ indust_class_arr.push(data.indust_class); } 
				if($.inArray(data.rcrit_jssfc, rcrit_jssfc_arr) == -1){ rcrit_jssfc_arr.push(data.rcrit_jssfc); } 
				if($.inArray(data.salary, salary_arr) == -1){ salary_arr.push(data.salary); } 
				if($.inArray(data.emplym_type, emplym_type_arr) == -1){ emplym_type_arr.push(data.emplym_type); } 
				if($.inArray(data.acdmcr, acdmcr_arr) == -1){ acdmcr_arr.push(data.acdmcr); } 
				if($.inArray(data.career, career_arr) == -1){ career_arr.push(data.career); } 
			}
			
			/* 임시 */
			console.log('== Debug Info ===========');
			console.log('시도: ' + sido_cd_arr);
			console.log('시군구: ' + sgg_cd_arr);
			console.log('기업형태: ' + entrprs_type_arr);
			console.log('산업분류: ' + indust_class_arr);
			console.log('직종분류: ' + rcrit_jssfc_arr);
			console.log('급여수준: ' + salary_arr);
			console.log('고용형태: ' + emplym_type_arr);
			console.log('학력: ' + acdmcr_arr);
			console.log('경력: ' + career_arr);			
		},
		getCompanyHtml : function(data) {
			var html = "";
			var img = "";
			var img_incruit = "";
			
			if (data.jo_data_div == "W") {
				img = "/images/workRoad/logo_worknet.png";
			} else if (data.jo_data_div == 'I') {
				img = "/images/workRoad/logo_incruit.png";
			// 2020-05-14 [주형식] 사람인 CI 추가 START
			} else if (data.jo_data_div == 'S') {
				img = "/images/workRoad/logo_saramin.png";
			// 2020-05-14 [주형식] 사람인 CI 추가 END	
			} else {
				src = "";
			}

			html += '<th>';
			html += '	<div class="companys">';
//			html += '		<div class="check-list">';
//			html += '			<input type="checkbox" name="" id="" value="">';
//			html += '			<label for="" class=""></label>';
//			html += '		</div>';
			html += '		<div class="tit">';
			html += '			<span><a href="#" id="vjJobInfoList_CorpNm" style="cursor: pointer;"> ' + data.corp_nm + ' </a></span>';
//			html += '			<span><a href="#" id="vjJobInfoList_CorpNm" style="cursor: initial;"> ' + data.corp_nm + ' </a></span>';
			html += '			<p>';
			html += '				<img src="' + img + '" class="certi-img" style="cursor:pointer" id="vj_jo_data_key"/>';
//			html += '				<span class="point-label certi">' + src + '</span>';
			if (data.incruit_jo_data_key != undefined && data.incruit_jo_data_key != "") {
				html += '			<img src="/images/workRoad/logo_incruit.png" class="certi-img" style="cursor:pointer" id="vj_incruit_jo_data_key"/>';
			}
			html += '			</p>';
			html += '		</div>';
			html += '	</div>';
			html += '</th>';
			
			return html;
		},
		getSubjectHtml : function(data) {
			var html = '';
			var gubun = '';
			
			if (true) {
				gubun = '상시';
			} else {
				gubun = '';
			}
			
			console.log("data!!!!!!!!!!!!!!!!!!!!!!!!!!!! : " + JSON.stringify(data));
			
			html += '<td>';
			html += '	<div class="subject">';
			html += '		<span class="accent">';
//			html += '			<span class="point"><a href="#">' + gubun + '</a></span>';
			html += '			<a href="#" id="vjJobInfoList_RecruNm"><span style="cursor: pointer;">' + data.recru_nm + '</span> </a>';
//			html += '			<a href="#" id="vjJobInfoList_RecruNm"><span style="cursor: initial;">' + data.recru_nm + '</span> </a>';
			html += '		</span>';
//			html += '		<p class="details">';
//			html += '			<em>담당업무 : ' + data.dty_content + '</em>';
//			html += '		</p>';
			html += '		<p class="details">';
			html += '			<em>경력: ' + data.career_nm + '<span>|</span>학력: ' + data.acdmcr_nm + '</em>';
			html += '			<span class="area">근무지 : ' + data.work_addr + '</span>';
			html += '		</p>';
			html += '	</div>';
			html += '</td>';
			
			return html;
		},
		getWorkHtml : function(data) {
			var html = '';
			var wageTypeClass = '';
			
			if (data.wage_type == 'H') {
				wageTypeClass = 'hourly-pay';
			} else if (data.wage_type == 'D') {
				wageTypeClass = 'dayly-pay';
			} else if (data.wage_type == 'M') {
				wageTypeClass = 'salary';
			} else if (data.wage_type == 'Y') {
				wageTypeClass = 'annual-income';
			}

			html += '<td>';
			html += '	<div class="work">';
			html += '		<span class="point-label ' + wageTypeClass + '">' + data.wage_type_nm + '</span>';
			html += '		<p class="details">';
			html += '			<em>' + $workRoad.util.addComma(data.salary) + '원</em>';
			html += '		</p>';
			html += '		<p class="details">';
			html += '			<em>' + data.work_type_nm + '</em>';
			html += '			<em>' + data.emplym_type_nm + '</em>';
//			html += '			<em>' + data.work_type_nm + '<span>|</span>' + data.emplym_type_nm + '</em>';
//			html += '			<span class="time">' + data.work_time + '</span>';
			html += '		</p>';
			html += '	</div>';
			html += '</td>';
		
			
			return html;
		},
		getDayHtml : function(data) {
			var html = '';
		
			html += '<td>';
			html += '	<div class="dday">';
			html += '		<p>' + $vjJobInfoList.ui.getDisplayDate(data.reg_dt, ' 등록') + '</p>';
			html += '	</div>';
			html += '	<div class="mday">';
			html += '		<p>';
//			html += '		<p>채용시까지';
			html += '			<span>' + $vjJobInfoList.ui.getDisplayDate(data.clos_dt, ' 마감') + '</span>';
			html += '		</p>';
			html += '	</div>';
			html += '</td>';
		
			return html;
		},
		getDetailViewHtml : function(data) {
			var html = '';
			
			html += '<td>';
			html += '	<div class="statis-view" id="vjShowJobInfoDetail"><a href="#"><span>상세 및 통계보기</span></a></div>';
			html += '	<input type="hidden" id="jo_data_div" value="' + data.jo_data_div + '" />';					// 채용구분
			html += '	<input type="hidden" id="jo_no" value="' + data.jo_no + '" />';								// 구인번호
			html += '	<input type="hidden" id="pt_x" value="' + data.pt_x + '" />';								// 지도 위치 (위도)
			html += '	<input type="hidden" id="pt_y" value="' + data.pt_y + '" />';								// 지도 위치 (경도)
			html += '	<input type="hidden" id="jo_data_key" value="' + data.jo_data_key + '" />';					// 구인번호 (채용사이트별)
			html += '	<input type="hidden" id="corp_nm" value="' + data.corp_nm + '" />';					        // 업체명
			if (data.incruit_jo_data_key != undefined && data.incruit_jo_data_key != "") {
				html += '	<input type="hidden" id="incruit_jo_data_key" value="' + data.incruit_jo_data_key + '" />';	// 구인번호 (인쿠루트-워크넷과 중복)
			}
			html += '</td>';
			
			return html;
		},
		
		
		/**
		 * @name         : 페이지 변경
		 * @description  : 
		 * @date         : 2018.10.12
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.10.12	ywKim	신규
		 * @param pPage  	: 페이지 인덱스
		 */
		changePage : function (pPage) {
			console.log("페이지: " + pPage);
			$vjJobInfoList.ui.loadJobInfoList(pPage);
		},
		
		/**
		 * @name         : 샘플 함수
		 * @description  : 샘플 함수입니다.
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.17	ywKim	신규
		 * @param pDate  	: 날짜 (yyyyMMdd)
		 * @param pTrailer	: 꼬리말
		 */
		getDisplayDate : function (pDate, pTrailer) {
			if (isNaN(pDate) == false) {
				var y = pDate.substr(2, 2);
				var m = pDate.substr(4, 2);
				var d = pDate.substr(6, 2);
				var date = y + '/' + m + '/' + d;
				if (typeof pTrailer != 'undefined') {
					date += pTrailer;
				}
				return date;
			} else {
				return pDate;
			}
		},	
		/**
		 * @name         : 구인정보 원본 페이지 열기
		 * @description  : 
		 * @date         : 2018.10.10
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.10.10	ywKim	신규
		 * @param pDataDiv	: 구인자료 구분 (W-워크넷, I-인크루트)
		 * @param pNo    	: 구인번호
		 */
		openJobInfoPage : function(pDataDiv, pNo) {
			var url = "";
			
			if (pDataDiv == "W") {
				url = "http://work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?wantedAuthNo=" + pNo;
				window.open(url);
			} else if (pDataDiv == "I") {
				url = "http://job.incruit.com/jobdb_info/jobpost.asp?job=" + pNo;
				window.open(url);
			}
			// 2020-05-14 [주형식 ]사람인 링크페이지 추가  Start
			else if (pDataDiv == "S") {
				url = "http://www.saramin.co.kr/zf_user/jobs/relay/view?rec_idx=" + pNo + "&utm_source=job-search-api&utm_medium=api&utm_campaign=saramin-job-search-api";				
				window.open(url);
			}
			// 2020-05-14 [주형식 ]사람인 링크페이지 추가  END
		},
	};	
	
	$vjJobInfoList.event = {
			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjJobInfoList.event.setUIEvent() called.");
				
				//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. START
				// 구인정보목록 뒤로 가기 (전국으로 가기)
				$workRoad.event.set("click", "#vjJobInfoList #vjBack", function() {
					$wrmViewJobs.ui.defaultSidoCd = "all";
					$wrmViewJobs.ui.defaultSidoNm = "전체";
					$wrmViewJobs.ui.defaultSggCd = "999";
					$wrmViewJobs.ui.defaultSggNm = "";
					$vjJobInfoList.ui.show();
					$wrmViewJobs.ui.getJobCount();
					
					$("#vjSelectAll #vjSelectAllSidoSelect").prop("disabled",false);
					$("#vjSelectAll #vjSelectAllSidoSelect").css("background-color","");
					$("#vjSelectAll #vjSelectAllSidoSelect").css("cursor","");
				});
				//2019-06-12 [김남민]  일자리 보기 > 뒤로가기 버튼 추가. END
				// 구인정보목록 버튼 토글
				$workRoad.event.set("click", "#vjJobInfoList #vjToggle", function() {
					$vjJobInfoList.ui.toggleJobInfoList();
				});
				// 구인정보목록 상세검색 버튼 
				$workRoad.event.set("click", "#vjJobInfoList #vjSearch", function() {
					$vjSelectAll.ui.showDialog();
				});
				$workRoad.event.set("click", "#vjJobInfoList #vjSearch2", function() {
					$vjSelectAll.ui.showDialog();
				});
				// 닫기 버튼
				$workRoad.event.set("click", "#vjJobInfoList .topbar>a", function() {
					$vjJobInfoList.ui.toggleJobInfoList();
				});
				// 생활환경 종합
				$workRoad.event.set("click", "#vjJobInfoList #vjLifeEnvInfo", function() {
					$workRoad.ui.deactivateLayerSelectionEvent("#vjJobInfoList");
					var left = parseInt($("#vjJobInfoList").css("left"));
					var top = parseInt($("#vjJobInfoList").css("top"));
					var width = parseInt($("#vjJobInfoList").css("width"));
					left = left + width - $workRoad.ui.coordX;
					top = top - $workRoad.ui.coordY;
					
					var params = {};
					params.sido_cd = $wrmViewJobs.ui.defaultSidoCd;
					params.sido_nm = $wrmViewJobs.ui.defaultSidoNm;
					if ($wrmViewJobs.ui.defaultSggCd != "" && $wrmViewJobs.ui.defaultSggCd != "999") {
						params.sgg_cd = $wrmViewJobs.ui.defaultSggCd;
						params.sgg_nm = $wrmViewJobs.ui.defaultSggNm;					
					}
					$vjLivingEnvironment.ui.ready(params);
					$vjLivingEnvironment.ui.show(left, top);
					
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '07', '01', '', '');
				});
				// 보기 선택
				$workRoad.event.set("change", "#vjJobInfoList #vjViewType", function() {
					$vjJobInfoList.ui.loadJobInfoList();
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '04', '02', '', $("#vjJobInfoList #vjViewType option:selected").val());
				});
				//20190218 손원웅_주석 해제(572-583)
				// 회사명 클릭
				$workRoad.event.set("click", "#vjJobInfoList #vjJobInfoList_CorpNm", function() {
					var div = $(this).closest('tr').find('.statis-view').closest('td').find('input').eq(0).val();
					var no = $(this).closest('tr').find('.statis-view').closest('td').find('input').eq(4).val();
					var corp_nm = $(this).closest('tr').find('.statis-view').closest('td').find('input').eq(5).val();
					var div_nm = (div == 'I' ? '인크루트' : (div == 'W' ? '워크넷' : '사람인')); // 2020.09.04 '사람인' 추가
					srvLogWrite('D0', '03', '04', '01', div_nm +', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				// 채용명 클릭
				$workRoad.event.set("click", "#vjJobInfoList #vjJobInfoList_RecruNm", function() {
					var div = $(this).closest("tr").find("#jo_data_div").val();
					var no = $(this).closest("tr").find("#jo_data_key").val();
					var corp_nm = $(this).closest("tr").find("#corp_nm").val();
					var div_nm = (div == 'I' ? '인크루트' : (div == 'W' ? '워크넷' : '사람인')); // 2020.09.04 '사람인' 추가
					srvLogWrite('D0', '03', '04', '01', div_nm +', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				// 채용사이트 아이콘 클릭
				$workRoad.event.set("click", "#vjJobInfoList #vj_jo_data_key", function() {
					var div = $(this).closest("tr").find("#jo_data_div").val();
					var no = $(this).closest("tr").find("#jo_data_key").val();
					var corp_nm = $(this).closest("tr").find("#corp_nm").val();
					var div_nm = (div == 'I' ? '인크루트' : (div == 'W' ? '워크넷' : '사람인')); // 2020.09.04 '사람인' 추가
					srvLogWrite('D0', '03', '04', '01', div_nm +', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage(div, no);
				});
				// 인트루트(워크넷 중복건) 아이콘 클릭 
				$workRoad.event.set("click", "#vjJobInfoList #vj_incruit_jo_data_key", function() {
					var div = $(this).closest("tr").find("#jo_data_div").val();
					var no = $(this).closest("tr").find("#vj_incruit_jo_data_key").val();
					var corp_nm = $(this).closest("tr").find("#corp_nm").val();
					var div_nm = (div == 'I' ? '인크루트' : (div == 'W' ? '워크넷' : '사람인')); // 2020.09.04 '사람인' 추가
					srvLogWrite('D0', '03', '04', '01', div_nm +', '+$wrmViewJobs.ui.defaultSidoNm+', '+$wrmViewJobs.ui.defaultSggNm+', 업체명:'+corp_nm+', no:'+no, '');
					$vjJobInfoList.ui.openJobInfoPage("I", no);
				});
				// 상세 및 통계 보기
				$workRoad.event.set("click", "#vjJobInfoList #vjShowJobInfoDetail", function() {
					var x = $(this).closest('tr').find('.statis-view').closest('td').find('input').eq(2).val();
					var y = $(this).closest('tr').find('.statis-view').closest('td').find('input').eq(3).val();
					var joNo = $(this).closest('tr').find('input').eq(1).val();
					
					// 선택 항목 표시 - 2019.01.14	ywKim	추가
					$(this).closest('tr').closest("tbody").find("tr").each(function(){
						$(this).removeClass("on");
					});
					$(this).closest('tr').addClass("on");
					
					$vjLivingEnvironment.ui.hide();
					$vjJobInfoList.ui.showDetail(joNo, x, y);
					
					// 2019.03.13 접근log 생성
					srvLogWrite('D0', '03', '04', '03', '', '');
				});
			},			
	}
	
}(window, document));