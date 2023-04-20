/**
 * 생활환경 종합 스크립트
 * 경로 : 일자리 맵 서비스 > 일자리 보기 > 생활환경 종합
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
	W.$vjLivingEnvironment = W.$vjLivingEnvironment || {};
	
	$vjLivingEnvironment.ui = {
		sido_cd : "99",
		sgg_cd : "999",
		//2019-07-23 [김남민] 생활환경 문구 변경. START
		text_map : {
			HMM0001 : {name : "대기오염도", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0002 : {name : "생활날씨", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0003 : {name : "녹지비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0004 : {name : "공동주택비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0005 : {name : "주거면적", good : "넓음", bad : "좁음", normal : "보통"}
			,HMM0006 : {name : "노후주택비율", good : "낮음", bad : "높음", normal : "보통"}
			,HMM0007 : {name : "자가점유비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0008 : {name : "면적당 아파트 가격", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0035 : {name : "공시지가", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0111 : {name : "단독주택비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0009 : {name : "청장년인구비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0010 : {name : "혈연가구 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0011 : {name : "사업체 종사자 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0012 : {name : "순유입인구 비율", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0013 : {name : "화재 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0014 : {name : "교통사고 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0028 : {name : "범죄 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0029 : {name : "안전사고", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0031 : {name : "감염병 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0032 : {name : "자연재해 안전", good : "좋음", bad : "나쁨", normal : "보통"}
			,HMM0015 : {name : "편의시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0016 : {name : "쇼핑시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0017 : {name : "외식시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0018 : {name : "대중교통 이용률", good : "높음", bad : "낮음", normal : "보통"}
			,HMM0033 : {name : "잡화점 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0020 : {name : "교원 1인당 학생 수", good : "적음", bad : "많음", normal : "보통"}
			,HMM0021 : {name : "고등교육기관 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0022 : {name : "학원 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0023 : {name : "유치원 및 보육시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0024 : {name : "병의원 및 약국", good : "많음", bad : "적음", normal : "보통"}
			,HMM0025 : {name : "노인복지시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0026 : {name : "사회복지시설", good : "많음", bad : "적음", normal : "보통"}
			,HMM0027 : {name : "문화시설 수", good : "많음", bad : "적음", normal : "보통"}
			,HMM0034 : {name : "체육시설 수", good : "많음", bad : "적음", normal : "보통"}
		},
		//2019-07-23 [김남민] 생활환경 문구 변경. END
		
		ready : function(pParams) {
			var html = '';
			
			if (pParams.sido_cd != undefined) {
				$vjLivingEnvironment.ui.sido_cd = pParams.sido_cd;
			}
			if (pParams.sido_nm != undefined && pParams.sido_nm.length > 0) {
				html += pParams.sido_nm + " "; 
			}
			if (pParams.sgg_cd != undefined) {
				$vjLivingEnvironment.ui.sgg_cd = pParams.sgg_cd;
			}
			if (pParams.sgg_nm != undefined && pParams.sgg_nm.length > 0) {
				html += pParams.sgg_nm + " "; 
			}
			if (pParams.emdong_nm != undefined && pParams.emdong_nm.length > 0) {
				html += pParams.emdong_nm + " "; 
			}
			
			html += "생활환경 종합";
			$("#vjLivingEnvironment #vjTitle").html(html);

			$vjLivingEnvironment.ui.setStyle1();
			
			$vjLivingEnvironment.ui.loadData(pParams);
		},
		/**
		 * @name         : 화면 띄우기
		 * @description  : 
		 * @date         : 2018.09.17
		 * @author	     : ywKim
		 * @history 	 : 
		 * 		2018.09.12	ywKim	신규
		 * @param
		 */
		show : function(pLeft, pTop) {
			$workRoad.ui.showLayer('#vjLivingEnvironment', {left: pLeft, top: pTop});
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
			$workRoad.ui.hideLayer('#vjLivingEnvironment');
		},
		/**
		 * @name         : loadData 
		 * @description  : 데이터를 불러온다.
		 * @date         : 2018.11.21
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		loadData : function(pParams) {
			var dataParams = {};
			
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START */
			// $("#vjLivingEnvironment #vjList").empty();
			$("#vjLivingEnvironment #vjList_left").empty();
			$("#vjLivingEnvironment #vjList_right").empty();
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END */
			
			if (pParams.sido_cd != undefined) {
				dataParams.sido_cd = pParams.sido_cd;
			}
			if (pParams.sgg_cd != undefined && pParams.sgg_cd != "" && pParams.sgg_cd != "999") {
				dataParams.sgg_cd = pParams.sgg_cd;
			}
			if (pParams.emdong_cd != undefined && pParams.emdong_cd != "" && pParams.emdong_cd != "99") {
				dataParams.emdong_cd = pParams.emdong_cd;
			}
			if (pParams.mode != undefined) {
				dataParams.mode = pParams.mode; 
			}			
			
			$.ajax({
				type: "POST",
				url: contextPath + "/ServiceAPI/workRoad/viewJobs/getLivingEnvironmentInfo.json",
				async: true,
				dataType: "json",
				data: dataParams,
				success: function(res) {
					if (res.errCd == 0) {
						var dataList = res.result.dataList;
						
						$vjLivingEnvironment.ui.displayData(dataList, pParams.mode);

					} else {
						alert('failed!');
					}
				},
				error:function(err) {
					alert(err.responseText);
				},
			});
		},
		/**
		 * @name         : displayData 
		 * @description  : 데이터를 화면에 표시한다.
		 * @date         : 2018.11.21
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		displayData : function(pDataList, pMode) {
			var prevTitle = "";
			var visibility = true;
			
			for (var i = 0; i < pDataList.length; i++) {
				if (pMode != undefined) {
					if (prevTitle != pDataList[i].b_class_idx_nm) {
						visibility = true;
					} else {
						visibility = false;
					}
					prevTitle = pDataList[i].b_class_idx_nm;
				} else {
					visibility = true;
				}
				
				var $dl = $vjLivingEnvironment.ui.getItemObj(pDataList[i], visibility);
				
				if ($dl != null) {
					/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START */
					// #vjLivingEnvironment #vjList").append($dl);
					if(pDataList[i].seq%2 == 0) {
						$("#vjLivingEnvironment #vjList_left").append($dl);
					} else {
						$("#vjLivingEnvironment #vjList_right").append($dl);
					}
					/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END */
				}
				
			}
		},
		/**
		 * @name         : getItemObj 
		 * @description  : 데이터 1건에 대한 객체를 생성한후 반환한다.
		 * @date         : 2018.11.21
		 * @author	     : ywKim
		 * @history 	 : 
		 */
		getItemObj : function(pData, pTitleShow) {
			var $dl, $dt, $dd;
			var title = pData.b_class_idx_nm;
			var content = pData.m_class_idx_nm;
			var classNm = "";
			//2019-07-23 [김남민] 생활환경 문구 변경. START
			var m_class_idx_id = pData.m_class_idx_id;
			
			if (pData.z_score > 6) {
				classNm = "good";
				if($vjLivingEnvironment.ui.text_map[m_class_idx_id] != undefined) {
					content += " "+$vjLivingEnvironment.ui.text_map[m_class_idx_id].good;
				}
				else {
					content += " 좋음";
				}
			} else if (pData.z_score >= 4) {
				classNm = "normal";
				if($vjLivingEnvironment.ui.text_map[m_class_idx_id] != undefined) {
					content += " "+$vjLivingEnvironment.ui.text_map[m_class_idx_id].normal;
				}
				else {
					content += " 보통";
				}
			} else {
				if($vjLivingEnvironment.ui.text_map[m_class_idx_id] != undefined) {
					content += " "+$vjLivingEnvironment.ui.text_map[m_class_idx_id].bad;
				}
				else {
					content += " 나쁨";
				}
			}
			//2019-07-23 [김남민] 생활환경 문구 변경. END
			
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START */
			// $dl = $("<dl/>");
			$dl = $("<dl style='text-align:left; float:left; padding-right:10px; width:100%; line-height:27px;'/>");
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END */
			
			$dt = $("<dt/>");
			if (pTitleShow == false) {
				$dt.css("visibility", "hidden");
			}
			
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START */
			// $dt.text(title);
			// $dl.append($dt);
			
			// $dd = $("<dd/>");
			
			var $img;
			var b_class_idx_id = pData.b_class_idx_id;
			if (pTitleShow == true) {
				// 자연
				if(b_class_idx_id == "HML0001"){
					$img = $("<img src='/img/house/icon_HML0001_ov.png' alt='자연' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 주택
				if(b_class_idx_id == "HML0002"){
					$img = $("<img src='/img/house/icon_HML0002_ov.png' alt='주택' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 지역인구
				if(b_class_idx_id == "HML0003"){
					$img = $("<img src='/img/house/icon_HML0003_ov.png' alt='지역 인구' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 안전
				if(b_class_idx_id == "HML0004"){
					$img = $("<img src='/img/house/icon_HML0004_ov.png' alt='안전' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 생활 편의 교통
				if(b_class_idx_id == "HML0005"){
					$img = $("<img src='/img/house/icon_HML0005_ov.png' alt='생활 편의 교통' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 교육
				if(b_class_idx_id == "HML0006"){
					$img = $("<img src='/img/house/icon_HML0006_ov.png' alt='교육' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
				// 복지 문화
				if(b_class_idx_id == "HML0007"){
					$img = $("<img src='/img/house/icon_HML0007_ov.png' alt='복지 문화' class='mCS_img_loaded' style='margin-right:5px;'>");
					$dl.append($img);
					$dl.append(title);
				}
			}
						
			$dd = $("<dd style='margin-left:10px; float:right;'/>");
			/** 2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END */
			
			$dd.addClass(classNm);
			$dd.text(content);			
			$dl.append($dd);
			
			return $dl;
		},
//		/**
//		 * @name         : goToHouseAnalysisMap
//		 * @description  : [더보기] 프로세스
//		 * 					살고싶은 우리동네
//		 * @date         : 2019.01.21
//		 * @author	     : nmKim
//		 * @history 	 :
//		 * @param
//		 */
//		goToHouseAnalysisMap : function() {
//			var url = "/view/workRoad/houseAnalysisMap";
//			var type = "sharedata";
//			var param_info_type = "1";
//			var sido_cd = $vjLivingEnvironment.ui.sido_cd;
//			var sgg_cd = $vjLivingEnvironment.ui.sgg_cd;
//			var chkbox_chk = "2";
//			var center_x = "";
//			var center_y = "";
//			var zoomlevel = "";
//			var forward_url = "";
//			
//			//계속 같은창으로 계속 뜨는 팝업
//			/* HTML 필요
//			<form name="vjLivingEnvironmentPopForm">
//				<input type="hidden" name="type" value="">
//				<input type="hidden" name="param_info_type" value="">
//				<input type="hidden" name="sido_cd" value="">
//				<input type="hidden" name="sgg_cd" value="">
//				<input type="hidden" name="chkbox_chk" value="">
//				<input type="hidden" name="center_x" value="">
//				<input type="hidden" name="center_y" value="">
//				<input type="hidden" name="zoomlevel" value="">
//			</form>
//			*/
//			/*
//			var myForm = document.vjLivingEnvironmentPopForm;
//			window.open("" ,"popForm"); 
//			myForm.action=url; 
//			myForm.method="post";
//			myForm.target="popForm";
//			
//			myForm.type.value=type;
//			myForm.param_info_type.value=param_info_type;
//			myForm.sido_cd.value=sido_cd;
//			myForm.sgg_cd.value=sgg_cd;
//			myForm.chkbox_chk.value=chkbox_chk;
//			myForm.center_x.value=center_x;
//			myForm.center_y.value=center_y;
//			myForm.zoomlevel.value=zoomlevel;
//			
//			myForm.submit();
//			*/
//			
//			//계속 새창으로 뜨는 팝업
//			// Create a form
//			var mapForm = document.createElement("form");
//			var mapInput = null;
//			mapForm.target = "_blank";    
//			mapForm.method = "POST";
//			mapForm.action = url;
//
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "type";
//			mapInput.value = type;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "param_info_type";
//			mapInput.value = param_info_type;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "sido_cd";
//			mapInput.value = sido_cd;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "sgg_cd";
//			mapInput.value = sgg_cd;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "chkbox_chk";
//			mapInput.value = chkbox_chk;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "center_x";
//			mapInput.value = center_x;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "center_y";
//			mapInput.value = center_y;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "zoomlevel";
//			mapInput.value = zoomlevel;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Create an input
//			mapInput = document.createElement("input");
//			mapInput.type = "hidden";
//			mapInput.name = "forward_url";
//			mapInput.value = forward_url;
//			// Add the input to the form
//			mapForm.appendChild(mapInput);
//			
//			// Add the form to dom
//			document.body.appendChild(mapForm);
//
//			// Just submit
//			mapForm.submit();			
//		},
		setStyle1 : function() {
			$(".workRoad #vjLivingEnvironment").css("height", "auto");
			$(".workRoad #vjLivingEnvironment .notice").css("display", "block");
			$(".workRoad #vjLivingEnvironment .cont-box").css("height", "auto");
			$(".workRoad #vjLivingEnvironment #vjView").css("height", "26px");
			//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START
			$(".workRoad #vjLivingEnvironment #vjView2").css("height", "0px");
			//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END
			
			/** 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. START */
			//$("#vjLivingEnvironmentOrigin").css("display", "none");
			/** 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. END */
		},
		setStyle2 : function() {
			$(".workRoad #vjLivingEnvironment").css("height", "calc(100% - 90px)");
			$(".workRoad #vjLivingEnvironment .notice").css("display", "none");
			$(".workRoad #vjLivingEnvironment .cont-box").css("height", "calc(100% - 68px)");
			$(".workRoad #vjLivingEnvironment #vjView").css("height", "0px");
			//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START
			$(".workRoad #vjLivingEnvironment #vjView2").css("height", "26px");
			//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END
			
			/** 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. START */
			//$("#vjLivingEnvironmentOrigin").css("display", "block");
			/** 2019.09.19[한광희] 내주변 일자리 보기:생활환경종합 팝업 출처 추가. START */
		}
	};	
	
	$vjLivingEnvironment.event = {
			myFunc: function() { 
				alert("I'm a function in the parent window"); 
			},

			/**
			 * @name		 : setUIEvent 
			 * @description  : 각 페이지(레이어,팝업화면) 고유의 이벤트 바인딩 처리 
			 * @date		 : 2018.09.17
			 * @author		 : ywKim
			 * @history 	 :
			 * 		2018.09.17	ywKim	신규
			 */
			setUIEvent: function() {
				console.log("$vjLivingEnvironment.event.setUIEvent() called.");				

				// 더보기
				//2019-01-21 더보기 : 살고싶은 우리동네 연계 파라미터 추가.
				$workRoad.event.set("click", "#vjLivingEnvironment #vjView", function() {
					var pParams = {};
					pParams.sido_cd = $vjLivingEnvironment.ui.sido_cd;
					pParams.sgg_cd = $vjLivingEnvironment.ui.sgg_cd;
					pParams.mode = "ALL";
					
					$vjLivingEnvironment.ui.setStyle2();
					
					$vjLivingEnvironment.ui.loadData(pParams);
//					// new
//					$vjLivingEnvironment.ui.goToHouseAnalysisMap();					
//					var url = "https://sgis.kostat.go.kr/view/house/houseAnalysisMap";
//					var win = window.open(url);						
				});
				
				//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 START
				// 간략히
				$workRoad.event.set("click", "#vjLivingEnvironment #vjView2", function() {
					var pParams = {};
					pParams.sido_cd = $vjLivingEnvironment.ui.sido_cd;
					pParams.sgg_cd = $vjLivingEnvironment.ui.sgg_cd;
					
					$vjLivingEnvironment.ui.setStyle1();
					
					$vjLivingEnvironment.ui.loadData(pParams);
//					// new
//					$vjLivingEnvironment.ui.goToHouseAnalysisMap();					
//					var url = "https://sgis.kostat.go.kr/view/house/houseAnalysisMap";
//					var win = window.open(url);						
				});
				//2019.11.04[한광희] 생활환경 종합 항목 위치 변경에 의한 수정 END
			}			
	}
	
}(window, document));