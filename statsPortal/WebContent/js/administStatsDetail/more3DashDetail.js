(function(W, D){
	W.$more3DashDetail = W.$more3DashDetail || {};
	// 서브타이틀 색상
	$more3DashDetail.subtitleTextColor = '#000';
	//다운로드 폰트
	$more3DashDetail.downloadFont = "'NanumSquare', sans-serif";
	//산업분류
	$more3DashDetail.industryClassificationColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
	//제조업 소분류
	$more3DashDetail.manufacturingSmallColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
	//도소매 소분류
	$more3DashDetail.wholesaleRretailSmallColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
	//지속대체
	$more3DashDetail.conSubColor = ['#7CB5EC', '#F15C80'];
	//지속대체신규
	$more3DashDetail.conSubNewColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
	//지속대체신규소멸
	$more3DashDetail.conSubNewExtColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
	//성별
	$more3DashDetail.genderColor = ['#7CB5EC', '#F15C80'];
	//나이
	$more3DashDetail.ageColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
	//조직형태별
	$more3DashDetail.organiFormColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
	
	$(document).ready(function(){
	});
	$(window).load(function(){
	});
	
	$more3DashDetail.ui = { // 3 : $more3DashDetail.ui.init();
		init : function(){
			console.log(gv_url+" : ===임금근로 일자리동향===");
			$administStatsMain.ui.appendContent("/view/administStatsDetail/more3Dash/main");
			$more3DashDetail.ui.more3Api();
			setTimeout(function(){
				$administStatsMain.ui.loading(false);
			},1000);
			/*setTimeout(function(){
				$more3DashDetail.ui.ready();
			},500);*/
		},
		/*ready : function(){
			$more3DashDetail.ui.more3Api();
			setTimeout(function(){
				$administStatsMain.ui.loading(false);
			},1000);
		},*/
		more3Api : function() {
			let proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			var parameter ={
				 method:"getList"
				,apiKey:apiKey
				,vwCd:"MT_OTITLE"
				,parentListId:"101_003"
				,format:"json"
				,jsonVD:"Y"
			}
			$.ajax({
				url: proxy+"https://kosis.kr/openapi/statisticsList.do?",
				type: 'get',
				data: parameter,
				dataType: "json"
			}).done(function(result){
				itemInfo = result;
				console.log(itemInfo);
				var list1 = document.getElementById('list1');
				var il1=0;
				for(var i=0;i<itemInfo.length;i++){
					let tblNm = "";
					if(itemInfo[i].TBL_NM.length > 18){
						tblNm = itemInfo[i].TBL_NM.substring(0, 18) + "...";
					} else {
						tblNm = itemInfo[i].TBL_NM;
					}
					var stattb_url = "https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + itemInfo[i].TBL_ID + "&conn_path=I2";
					list1.innerHTML += '<li data-org_id="' + itemInfo[i].ORG_ID + '" data-tbl_id="' + itemInfo[i].TBL_ID +	'" data-tbl_nm="' + itemInfo[i].TBL_NM + '">' +
									   '<a class="searchmenua" style="width: 240px;" href="javascript:void(0);" title="' + itemInfo[i].TBL_NM + '">' + tblNm + 
									   '</a><a onclick="javascript:openPop1('+"'"+stattb_url+"'"+')" class="link-kosis link-btn" title="새창열림">KOSIS' + tblNm + '</a></li>';
					il1++;
				}
				$(".con").css({'display': 'block'});
				$("#list1").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 41*il1+'px');
				
				for(var i=0;i<$("a.searchmenua").length;i++){
					$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more3DashDetail.ui.openApiSearch3(this);");
				}
				
				setTimeout(function(){
					$("a.searchmenua:eq(0)").click();
				},500);
			});
		},
		
		openApiSearch3 : function(li, selYear) {
			console.log(li);
			for(var i=0;i<$("a.searchmenua").length;i++){
				if($("a.searchmenua:eq(" + i + ")").css("color") == "#1772a9"){
					$("a.searchmenua:eq(" + i + ")").css("color", "#666666");
					$("a.searchmenua:eq(" + i + ")").css('font-weight', 400);
				}
			}
			$(li).parent().find('a:eq(0)').css('color','#1772a9');
			$(li).parent().find('a:eq(0)').css('font-weight', 700);
			$(li).parent().find('a:eq(0)').css('color','#1772a9');
			$(li).parent().find('a:eq(0)').css('font-weight', 700);
			var itmId = '';
			var objL1 = '';
			var objL2 = '';
			var objL3 = '';
			var newEstPrdCnt = '6';
			let startPrdDe = "";
			let endPrdDe = "";
			let param = new Array;
			
			let data1 = new Array;
			let year = new Array;
			let dataParam = new Array;
			
			var tblId = $(li).parent().data('tbl_id');
			var tblNm = $(li).parent().data('tbl_nm');
			console.log(tblId);
			console.log(tblNm);
			$('#modalSearchTitle2 option').remove();
			$('#modalSearchTitle2').append('<option ' + 'data-tbl_id="' + tblId + '"' + '" value="' + tblId + '"' + '">' + tblNm + '</option>');
			
			var selectedYear = $("#modalSearchYear option:selected").text();
			if(tblId == 'DT_1FL_7001' || tblId == 'DT_1FL_7002' || tblId == 'DT_1FL_7003' || tblId == 'DT_1FL_7004' || tblId == 'DT_1FL_7005' || tblId == 'DT_1FL_7006'){
				itmId = 'T00';
				newEstPrdCnt = '20';
			}else if(tblId == 'DT_1FL_7007' || tblId == 'DT_1FL_7008' || tblId == 'DT_1FL_7009' || tblId == 'DT_1FL_7010'){
				itmId = 'T1';newEstPrdCnt = '20';
			}
			var valueSuffix1 = '만개';
			var valueSuffix2 = '%';
			var valueSuffix3 = '만개';
			var valueSuffix4 = '만개';
			var valueSuffix5 = '만개';
			var valueSuffix6 = '%';
			if(tblId == 'DT_1FL_7002' || tblId == 'DT_1FL_7003' || tblId == 'DT_1FL_7004' || tblId == 'DT_1FL_7006'){valueSuffix1 = '%';}
			if(tblId == 'DT_1FL_7002' || tblId == 'DT_1FL_7006' || tblId == 'DT_1FL_7007' || tblId == 'DT_1FL_7008'){valueSuffix2 = '만개';}
			if(tblId == 'DT_1FL_7006'){valueSuffix3 = '%';}
			if(tblId == 'DT_1FL_7002' || tblId == 'DT_1FL_7004' || tblId == 'DT_1FL_7005' || tblId == 'DT_1FL_7009'){valueSuffix4 = '%';}
			if(tblId == 'DT_1FL_7004' || tblId == 'DT_1FL_7005'){valueSuffix5 = '%';}
			if(tblId == 'DT_1FL_7001' || tblId == 'DT_1FL_7002' || tblId == 'DT_1FL_7003' || tblId == 'DT_1FL_7004' || tblId == 'DT_1FL_7005'){valueSuffix6 = '만개';}
			console.log(selYear);
			
			if(selYear == undefined) {
				selYear = 202201;
			}
			console.log(selYear);
			
			dataParam = ['ALL', '00', '', '', 12, 'DT_1FL_7001'];
			year.push($more3DashDetail.util.newEstPrdCntDataAjax(dataParam));
			
			let selectYear = new Array;
			let selectYearNum = year[0];
			let prdDeReverce = "";
			let titleYearNm = "";
			let selectedYearStr1 = "";
			let selectedYearStr2 = "";
			let titleYearOverlapRemove = new Array;
			$("#modalSearchYear option").remove();
			$(".header-tag #headerSearchYear option").remove();
			
			for(let i=0; i<selectYearNum.length; i++) {
				if(selectYearNum[i].C1 == "00") {
					if(selectYearNum[i].ITM_ID == "T00") {
						titleYearOverlapRemove.push(selectYearNum[i].PRD_DE);
					}
				}
				prdDeReverce = $more3DashDetail.util.overlapRemove(titleYearOverlapRemove);
			}
			titleYearNm = prdDeReverce.reverse();
			
			for(let i=0; i<titleYearNm.length; i++) {
				selectedYearStr1 = titleYearNm[i].substr(2, 2);
				selectedYearStr2 = titleYearNm[i].substr(5, 2);
				selectYear.push('`'+selectedYearStr1 + '년 ' + selectedYearStr2 + '/4분기');
			}
			for(let i=0; i<selectYear.length; i++) {
				$("#modalSearchYear").append('<option value="'+titleYearNm[i]+'">'+selectYear[i]+'</option>'); // 여기
				$(".header-tag #headerSearchYear").append('<option ' + 'data-tbl_id="more3"' + ' value="'+titleYearNm[i]+'">'+selectYear[i]+'</option>'); // 여기
			}
			var prdDe = titleYearNm[0];
			$('#modalSearchYear').val(prdDe).prop("selected", true);
			$(".header-tag #headerSearchYear").val(prdDe).prop("selected", true); // 여기
			$('.header-tag #headerSearchYear').on('change', function() {
				// $more2DashDetail.util.headerSearchSelect();
			});
			$more3DashDetail.ui.openApiSearchChange(tblId, prdDe);
		},
		
		/**
		 * @name : $more3DashDetail.chart.openApiSearchChange
		 * @description : 데이터 호출
		 * @date : 2022.11.17
		 * @author : 조규환
		 * @history :
		 */
		openApiSearchChange : function(tblId, prdDe) {
			let data1 = new Array;
			let dataParam = new Array;
			$('.header-tag #headerSearchYear').off('change');
			if(tblId == 'DT_1FL_7001') {
				dataParam = ['ALL', '00', '', '', 10, 'DT_1FL_7001'];
				data1.push($more3DashDetail.util.newEstPrdCntDataAjax(dataParam));
				if(data1.length == 1) { // 2
					dataParam = ['T01', 'ALL', '', '', prdDe, prdDe, tblId];
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 5
					dataParam = ['T00', 'ALL', '', '', prdDe, prdDe, tblId];
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4 6
					dataParam = ['T02', 'ALL', '', '', prdDe, prdDe, tblId];
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				/*
				 * if(data1.length == 4) { // 4 6 dataParam = ['T00', 'ALL', '',
				 * '', prdDe, prdDe, tblId];
				 * data1.push($more3DashDetail.util.dataAjax(dataParam)); }
				 */
			}else if(tblId == 'DT_1FL_7002') { // 1 4 //제조업 소분류별 임금근로 일자리 구성비
				dataParam = ['T01', 'ALL', '', '', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2 5 //제조업 소분류별 임금근로 일자리
					dataParam = ['T00', 'ALL', '', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 6 제조업 소분류별 임금근로 일자리 증감
					dataParam = ['T02', 'ALL', '', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == 'DT_1FL_7003') { // 1 일자리형태별 임금근로 일자리 및 구성비
				dataParam = ['T02', '00', 'All', '', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2 산업대분류별 임금근로 일자리 구성비(총계)
					dataParam = ['T01', 'ALL', 'ALL', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 산업대분류별 일자리형태별 임금근로 일자리 및 구성비
					dataParam = ['T00', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4 산업중분류별 일자리형태별 임금근로 일자리 및 구성비(농업, 임업
										// 및 어업)
					dataParam = ['T00', 'ALL', 'ALL', '', prdDe, prdDe, tblId];
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == 'DT_1FL_7004') { // 1 제조업 일자리형태별 임금근로 일자리 및 구성비
				dataParam = ['T00', 'C', 'All', '', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2 제조업 소분류별 임금근로 일자리 구성비(총계)
					dataParam = ['T01', 'ALL', 'ALL', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 5제조업 소분류별 일자리형태별 임금근로 일자리 및 구성비
					dataParam = ['T00', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4 6도소매업 일자리형태별 임금근로 일자리 및 구성비
					dataParam = ['T02', 'G', 'ALL', '', prdDe, prdDe, tblId];
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == "DT_1FL_7005") { // 1 분기별 임금근로 일자리 및 증감
				dataParam = ['ALL', '00', '', '', 10, tblId];
				data1.push($more3DashDetail.util.newEstPrdCntDataAjax(dataParam));
				if(data1.length == 1) { // 2 4 6 2021년 4분기 성별 임금근로 일자리 및 구성비
					dataParam = ['T00', 'ALL', '', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 5 7 2021년 4분기 성별 임근근로 일자리 증감
					dataParam = ['T02', 'ALL', '', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == "DT_1FL_7006") { // 1 일자리형태별 임금근로 일자리 수 및 구성비
				dataParam = ['T00', 'ALL', 'ALL', '', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2 4 6 성별 일자리형태별 임금근로 일자리 수 및 구성비
					dataParam = ['ALL', 'ALL', 'ALL', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3 5 7 2021년 4분기 성별 임금근로 일자리 구성비
					dataParam = ['T00', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == "DT_1FL_7007" || tblId == "DT_1FL_7008") { // 1
																			// 일자리형태별
																			// 임금근로
																			// 일자리
																			// 수 및
																			// 구성비
				dataParam = ['ALL', '00', '00', '', 10, tblId];
				data1.push($more3DashDetail.util.newEstPrdCntDataAjax(dataParam));
				if(data1.length == 1) { // 2
					dataParam = ['T1', 'ALL', '00', '', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3
					dataParam = ['T3', 'ALL', '00', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4
					dataParam = ['T1', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 4) { // 5
					dataParam = ['T3', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 5) { // 6
					dataParam = ['T2', 'ALL', 'ALL', '', prdDe, prdDe, tblId];  
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == "DT_1FL_7009") { // 1
				dataParam = ['ALL', '00', 'ALL', 'ALL', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2
					dataParam = ['T1', '00', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3
					dataParam = ['ALL', '01', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4
					dataParam = ['T1', '01', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 4) { // 5
					dataParam = ['ALL', '02', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 5) { // 6
					dataParam = ['T1', '02', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}else if(tblId == "DT_1FL_7010") { // 1
				dataParam = ['ALL', '00', 'ALL', 'ALL', prdDe, prdDe, tblId];
				data1.push($more3DashDetail.util.dataAjax(dataParam));
				if(data1.length == 1) { // 2
					dataParam = ['T1', 'ALL', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 2) { // 3
					dataParam = ['ALL', 'ALL', 'ALL', 'ALL', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
				if(data1.length == 3) { // 4
					dataParam = ['T1', 'ALL', 'ALL', '00', prdDe, prdDe, tblId]; 
					data1.push($more3DashDetail.util.dataAjax(dataParam));
				}
			}
			$more3DashDetail.chart.dataFictional(data1);
		}
	};
	$more3DashDetail.chart = {
		/**
		 * @name : $more3DashDetail.chart.dataFictional
		 * @description : 차트 데이터 가공
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */
		dataFictional : function(res) {
			console.log(res);
			$('#chart11').empty();
			$('#chart21').empty();
			$('#chart31').empty();
			$('#chart41').empty();
			$('#chart51').empty();
			$('#chart61').empty();
			$('#chart71').empty();
			let chartData1 = res[0];
			let chartData2 = res[1];
			let chartData3 = res[2];
			let chartData4 = res[3];
			let chartData5 = res[4];
			let chartData6 = res[5];
			let chartData7 = res[6];
			let tblId = chartData1[0].TBL_ID;
			let divisionData1 = new Array;
			let divisionData2 = new Array;
			let divisionData3 = new Array;
			let divisionData4 = new Array;
			let divisionData5 = new Array;
			let divisionData6 = new Array;
			let divisionData7 = new Array;
			let titleYearOverlapRemove = new Array;
			let overlapRemove1 = new Array;
			let overlapRemove2 = new Array;
			let overlapRemove3 = new Array;
			let overlapRemove4 = new Array;
			let overlapRemove5 = new Array;
			let overlapRemove6 = new Array;
			let overlapRemove7 = new Array;

			let chartVal1 = new Array;
			let chartVal2 = new Array;
			let chartVal3 = new Array;
			let chartVal4 = new Array;
			let chartVal5 = new Array;
			let chartVal6 = new Array;
			let chartVal7 = new Array;
			
			let selectVal = new Array; 
			let selectVal2 = new Array; 
			
			let seriesyearData1 = new Array;  	// 1번 차트에 들어갈 데이터 배열
			let seriesyearData2 = new Array;  	// 2번 차트에 들어갈 데이터 배열
			let seriesyearData3 = new Array; 	// 3번 차트에 들어갈 데이터 배열
			let seriesyearData4 = new Array; 	// 4번 차트에 들어갈 데이터 배열
			let seriesyearData5 = new Array; 	// 5번 차트에 들어갈 데이터 배열
			let seriesyearData6 = new Array; 	// 6번 차트에 들어갈 데이터 배열
			let seriesyearData7 = new Array; 	// 7번 차트에 들어갈 데이터 배열
			
			let categories1 = new Array;
			let categories2 = new Array;
			let categories3 = new Array;
			let categories4 = new Array;
			let categories5 = new Array;
			let categories6 = new Array;
			let categories7 = new Array;
			
			let legendNm1 = new Array;
			let legendNm2 = new Array;
			let legendNm3 = new Array;
			let legendNm4 = new Array;
			let legendNm5 = new Array;
			let legendNm6 = new Array;
			let legendNm7 = new Array;
			
			let chartType1 = new Array;
			let chartType2 = new Array;
			let chartType3 = new Array;
			let chartType4 = new Array;
			let chartType5 = new Array;
			let chartType6 = new Array;
			let chartType7 = new Array;
			
			let selectNm1 = new Array;
			let selectNm2 = new Array;
			let selectNm2_1 = new Array;
			let selectNm3 = new Array;
			let selectNm4 = new Array;
			let selectNm5 = new Array;
			let selectNm6 = new Array;
			let selectNm7 = new Array;
			
			let selectChartData2 = new Array;
			let selectChartData3 = new Array;
			let selectChartData4 = new Array;
			let selectChartData5 = new Array;
			let selectChartData6 = new Array;
			let selectChartData7 = new Array;
			
			let chartValRatio2 = new Array;
			let chartValRatio4 = new Array;
			let chartValRatio6 = new Array;
			
			let totalVal = new Array;
			let totalVal2 = new Array;
			let totalVal3 = new Array;
			let totalVal4 = new Array;
			let totalVal5 = new Array;
			let totalVal6 = new Array;
			
			let xAxisNm1 = new Array;
			let xAxisNm2 = new Array;
			
			let subtitleValChart1 = new Array;
			let subtitleValChart2 = new Array;
			
			let selectYear = $("#modalSearchYear option:selected").text();
			let selectedYear = selectYear.substr(1, 9);
			/*
			 * let titleYear2 = selectYear.substr(5, 2); let selectedYear =
			 * titleYear1 + ' ' + titleYear2 + '분기'; console.log(selectedYear);
			 */
			if(tblId == 'DT_1FL_7001'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 전체 및 산업별(대·중분류) 임금근로 일자리");
				$('#title1').text('분기별 임금근로 일자리 및 증감');
				$('#title2').text(selectedYear + ' 산업대분류별 임금근로 일자리 수 및 구성비');
				$('#title3').text(selectedYear + ' 산업대분류별 임금근로 일자리');
				$('#title4').text(selectedYear + ' 산업대분류별 임금근로 일자리 증감');
				$('#title6').text(selectedYear + ' 산업중분류별 임금근로 일자리');
				$('#title7').text(selectedYear + ' 산업중분류별 임금근로 일자리 증감');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').hide();
				$('#chartTitle4').show();
				$('#chartTitle6').show();
				$('#chartTitle5').hide();
				$('#chartTitle7').show();
			} else if(tblId == 'DT_1FL_7002'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 산업별(소분류) 임금근로 일자리_제조업 및 도소매업");
				$('#title1').text(selectedYear + ' 제조업 소분류별 임금근로 일자리 구성비');
				$('#title2').text(selectedYear + ' 도소매업 소분류별 임금근로 일자리 구성비');
				// $('#title3').text(selectedYear + ' 제조업 소분류별 임금근로 일자리 증감');
				$('#title4').text(selectedYear + ' 제조업 소분류별 임금근로 일자리');
				$('#title6').text(selectedYear + ' 도소매업 소분류별 임금근로 일자리');
				// $('#title7').text(selectedYear + ' 도소매업 소분류별 임금근로 일자리 증감');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').hide();
				$('#chartTitle4').show();
				$('#chartTitle5').hide();
				$('#chartTitle6').show();
				$('#chartTitle7').hide();
			} else if(tblId == 'DT_1FL_7003'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 일자리 형태별 산업별(대·중분류) 임금근로 일자리");
				$('#title1').text(selectedYear + ' 일자리형태별 임금근로 일자리 및 구성비');
				$('#title2').text(selectedYear + ' 산업대분류별 일자리형태별 임금근로 일자리 구성비');
				$('#title4').text(selectedYear + ' 산업대분류별 일자리형태별 임금근로 일자리');
				$('#title7').text(selectedYear + ' 산업중분류별 일자리형태별 임금근로 일자리');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').hide();
				$('#chartTitle4').show();
				$('#chartTitle5').hide();
				$('#chartTitle6').hide();
				$('#chartTitle7').show();
			} else if(tblId == 'DT_1FL_7004'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 일자리 형태별 산업별(소분류) 임금근로 일자리_제조업 및 도소매업");
				// $('#title1').text(selectedYear + ' 제조업 일자리형태별 임금근로 일자리 및
				// 구성비');
				$('#title2').text(selectedYear + ' 제조업 소분류별 임금근로 일자리 구성비');
				$('#title3').text(selectedYear + ' 도소매업 일자리형태별 임금근로 일자리 및 구성비');
				$('#title4').text(selectedYear + ' 제조업 소분류별 일자리형태별 임금근로 일자리 및 구성비');
				// $('#title6').text(selectedYear + ' 도소매업 소분류별 임금근로 일자리 구성비');
				$('#title7').text(selectedYear + ' 도소매업 소분류별 일자리형태별 임금근로 일자리 및 구성비');
				$('#chartTitle1').hide();
				$('#chartTitle2').show();
				$('#chartTitle3').show();
				$('#chartTitle4').show();
				$('#chartTitle5').hide();
				$('#chartTitle6').hide();
				$('#chartTitle7').show();
				/*
				 * $('#tabArea').show(); $('#tabArea2').show();
				 */
			} else if(tblId == 'DT_1FL_7005'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 근로자 및 기업특성별 임금근로 일자리");
				$('#title1').text('분기별 임금근로 일자리 및 증감');
				$('#title2').text(selectedYear + ' 성별 임금근로 일자리  및 구성비');
				$('#title3').text(selectedYear + ' 성별 임금근로 일자리 증감');
				$('#title4').text(selectedYear + ' 연령별 임금근로 일자리 및 구성비');
				$('#title6').text(selectedYear + ' 조직형태별 임금근로 일자리 및 구성비');
				$('#title5').text(selectedYear + ' 연령별 임금근로 일자리 증감');
				$('#title7').text(selectedYear + ' 조직형태별 임금근로 일자리 증감');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').show();
				$('#chartTitle4').show();
				$('#chartTitle5').show();
				$('#chartTitle6').show();
				$('#chartTitle7').show();
			} else if(tblId == 'DT_1FL_7006'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 근로자 및 기업특성별 일자리 형태별 임금근로 일자리");
				$('#title1').text(selectedYear + ' 일자리형태별 임금근로 일자리 수 및 구성비');
				$('#title2').text(selectedYear + ' 성별 일자리형태별 임금근로 일자리 수');
				$('#title3').text(selectedYear + ' 성별 임금근로 일자리 구성비');
				$('#title4').text(selectedYear + ' 연령별 일자리형태별 임금근로 일자리 수');
				$('#title6').text(selectedYear + ' 조직형태별 일자리형태별 임금근로 일자리 수');
				$('#title7').text(selectedYear + ' 조직형태별  임금근로 일자리 구성비');
				$('#title5').text(selectedYear + ' 연령별 임금근로 일자리 구성비');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').show();
				$('#chartTitle4').show();
				$('#chartTitle5').show();
				$('#chartTitle6').show();
				$('#chartTitle7').show();
			} else if(tblId == 'DT_1FL_7007'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 성 및 산업대분류별 임금근로 일자리");
				$('#title1').text('분기별 임금근로 일자리 수 및 증감');
				$('#title2').text(selectedYear + ' 산업대분류별 임금근로 일자리 수');
				$('#title6').text(selectedYear + ' 성별 산업대분류별 일자리');
				$('#title7').text(selectedYear + ' 성별 산업대분류별 증감');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').hide();
				$('#chartTitle4').hide();
				$('#chartTitle5').hide();
				$('#chartTitle6').show();
				$('#chartTitle7').show();
			} else if(tblId == 'DT_1FL_7008'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 연령 및 산업대분류별 임금근로 일자리");
				$('#title1').text('분기별 임금근로 일자리 수 및 증감');
				$('#title2').text(selectedYear + ' 산업대분류별 임금근로 일자리 수');
				$('#title3').text(selectedYear + ' 산업대분류별 임금근로 일자리 증감');
				$('#title4').text(selectedYear + ' 연령별 산업대분류별 임금근로 일자리 수');
				$('#title5').text(selectedYear + ' 연령별 산업대분류별 임금근로 일자리 증감');
				// $('#title6').text(selectedYear + ' 연령별 산업대분류별 임금근로 일자리 증감');
				// $('#title7').text(selectedYear + ' 연령별 산업분류별 임금근로 일자리 구성비');
				$('#chartTitle1').show();
				$('#chartTitle2').show();
				$('#chartTitle3').hide();
				$('#chartTitle4').show();
				$('#chartTitle5').show();
				$('#chartTitle6').hide();
				$('#chartTitle7').hide();
			} else if(tblId == 'DT_1FL_7009'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 성 및 산업대분류별 일자리형태별 임금근로 일자리");
				$('#title2').text(selectedYear + ' 산업대분류별 성별 일자리형태별 임금근로 일자리 수');
				$('#title3').text(selectedYear + ' 성별 산업대분류별 일자리형태별 임금근로 일자리 수');
				$('#chartTitle1').hide();
				$('#chartTitle2').show();
				$('#chartTitle3').show();
				$('#chartTitle4').hide();
				$('#chartTitle5').hide();
				$('#chartTitle6').hide();
				$('#chartTitle7').hide();
			} else if(tblId == 'DT_1FL_7010'){
				$('.titleChange3').html("임금근로 일자리동향 <i class='fa fa-angle-right'></i> 연령 및 산업대분류별 일자리형태별 임금근로 일자리");
				$('#title1').text(selectedYear + ' 산업대분류별 연령별 일자리형태별 임금근로 일자리 수');
				$('#title3').text(selectedYear + ' 연령별 산업대분류별 일자리형태별 임금근로 일자리');
				$('#chartTitle1').show();
				$('#chartTitle2').hide();
				$('#chartTitle3').show();
				$('#chartTitle4').hide();
				$('#chartTitle5').hide();
				$('#chartTitle6').hide();
				$('#chartTitle7').hide();
			}
			$('#chartTitle1').removeClass();
			$('#chartTitle2').removeClass();
			$('#chartTitle3').removeClass();
			$('#chartTitle4').removeClass();
			$('#chartTitle5').removeClass();
			$('#chartTitle6').removeClass();
			$('#chartTitle7').removeClass();
			$('#chartBox4').removeClass();
			$('#chartMain6').removeClass();
			
			
			if(tblId == 'DT_1FL_7001') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-500');
				$('#chartMain6').addClass('item-box flex-width-720 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-710 flex-height-500 charttitle');
				$('#chartTitle6').addClass('item flex-width-710 flex-height-245 flex-mgL-10 charttitle');
				$('#chartTitle7').addClass('item flex-width-710 flex-height-245 flex-mgL-10 flex-mgT-10 charttitle');
			}else if(tblId == 'DT_1FL_7002') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-500');
				$('#chartMain6').addClass('item-box flex-width-720 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-710 flex-height-500 charttitle');
				$('#chartTitle6').addClass('item flex-width-710 flex-height-500 flex-mgL-10 charttitle');
			}else if(tblId == 'DT_1FL_7003') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-500');
				$('#chartMain6').addClass('item-box flex-width-720 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-710 flex-height-500 charttitle');
				$('#chartTitle7').addClass('item flex-width-710 flex-height-500 flex-mgL-10 charttitle');
			}else if(tblId == 'DT_1FL_7004') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-400');
				$('#chartMain6').addClass('item-box flex-width-720 flex-height-400');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-380 charttitle');
				$('#chartTitle3').addClass('item flex-width-710 flex-height-380 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-710 flex-height-400 charttitle filter hScroll');
				$('#chartTitle7').addClass('item flex-width-710 flex-height-400 flex-mgL-10 charttitle');
			}else if(tblId == 'DT_1FL_7005') {
				$('#chartBox4').addClass('item-box flex-width-695 flex-height-500');
				$('#chartMain6').addClass('item-box flex-width-735 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-695 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-375 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle3').addClass('item flex-width-345 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-695 flex-height-245 charttitle');
				$('#chartTitle5').addClass('item flex-width-695 flex-height-245 flex-mgT-10 charttitle');
				$('#chartTitle6').addClass('item flex-width-735 flex-height-245 flex-mgL-10 charttitle');
				$('#chartTitle7').addClass('item flex-width-735 flex-height-245 flex-mgL-10 flex-mgT-10 charttitle');
			}else if(tblId == 'DT_1FL_7006') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-500');
				$('#chartMain6').addClass('item-box flex-width-720 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-460 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-490 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle3').addClass('item flex-width-460 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-710 flex-height-245 charttitle');
				$('#chartTitle5').addClass('item flex-width-710 flex-height-245 flex-mgT-10 charttitle');
				$('#chartTitle6').addClass('item flex-width-720 flex-height-245 flex-mgL-10 charttitle');
				$('#chartTitle7').addClass('item flex-width-720 flex-height-245 flex-mgL-10 flex-mgT-10 charttitle');
			}else if(tblId == 'DT_1FL_7007') {
				$('#chartMain6').addClass('item-box flex-width-1450 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle6').addClass('item flex-width-1450 flex-height-245 charttitle');
				$('#chartTitle7').addClass('item flex-width-1450 flex-height-245 flex-mgT-10 charttitle');
			}else if(tblId == 'DT_1FL_7008') {
				$('#chartBox4').addClass('item-box flex-width-1800 flex-height-500');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-280 charttitle');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-280 flex-mgL-10 charttitle');
				$('#chartTitle4').addClass('item flex-width-1800 flex-height-245 charttitle');
				$('#chartTitle5').addClass('item flex-width-1800 flex-height-245 flex-mgT-10 charttitle');
			}else if(tblId == 'DT_1FL_7009') {
				$('#chartBox4').addClass('item-box flex-width-710 flex-height-800');
				$('#chartTitle2').addClass('item flex-width-710 flex-height-800 charttitle');
				$('#chartTitle3').addClass('item flex-width-710 flex-height-800 flex-mgL-10 charttitle');
			}else if(tblId == 'DT_1FL_7010') {
				$('#chartBox4').addClass('item-box flex-width-1450 flex-height-778');
				$('#chartTitle1').addClass('item flex-width-710 flex-height-800 charttitle');
				$('#chartTitle3').addClass('item flex-width-710 flex-height-800 flex-mgL-10 charttitle');
			}
			$('.tabArea1').empty();
			$('.tabArea2').empty();
			$('.tabArea3').empty();
			$('.tabArea4').empty();
			$('.tabArea5').empty();
			$('.tabArea6').empty();
			$('.tabArea7').empty();
			// 셀렉트차트 페이지 생성
			if(tblId == "DT_1FL_7001") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:680px; height:215px; margin:0 auto; margin-top:15px;'></div></figure></div></div>");
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1080px; height:230px; margin-top:-10px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:2000px; height:405px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea6').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:680px; height:185px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:680px; height:185px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7002" || tblId == "DT_1FL_7007") {
				if(tblId == "DT_1FL_7007") {
					$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:680px; height:230px; margin:0 auto;'></div></figure></div></div>");
					$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1300px; height:220px;  margin-left:-20px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:1500px; height:215px'></div>" +
										  "</figure></div></div>");
					$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:3500px; height:405px; margin-top:15px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea6').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
										  "</figure></div></div>");
				}else if(tblId == "DT_1FL_7002") {
					$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:670px; height:235px; margin:0 auto'></div></figure></div></div>");
					$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1050px; height:230px; margin-top:-5px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:7500px; height:415px; margin-top:15px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea6').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:1500px; height:415px; margin-top:20px;'></div>" +
										  "</figure></div></div>");
				}
				if(tblId == "DT_1FL_7007") {
					$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
										  "</figure></div></div>");
				}
			}else if(tblId == "DT_1FL_7003") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:550px; height:230px; margin:0 auto; margin-top:5px;'></div></figure></div></div>");
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1100px; height:210px; margin-left: -15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:6000px; height:415px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:680px; height:425px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7004") {
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:675px; height:330px; margin-left: 15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:675px; height:330px; margin-left: 15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:100%; height:10000px; margin-top:15px; margin-left: -15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:6000px; height:320px; margin-top:15px; margin-left: -15px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7005") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:665px; height:215px; margin:0 auto; margin-top:15px;'></div></figure></div></div>");
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:350px; height:210px; margin-top:10px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:325px; height:215px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:670px; height:210px; margin-top:-5px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea5').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:665px; height:185px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea6').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:670px; height:210px; margin-top:-5px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:695px; height:185px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7006") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:450; height:235px; margin:0 auto;'></div></figure></div></div>");
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:465px; height:215px; margin-top:15px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:450px; height:235px'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:680px; height:210px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea5').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:500px; height:210px; margin-left:110px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea6').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:680px; height:210px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:500px; height:210px; margin-left:110px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7008") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:680px; height:230px; margin:0 auto;'></div></figure></div></div>");
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1300px; height:210px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea4').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea5').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7009") {
				$('.tabArea2').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:680px; height:350px;'></div></figure></div></div>" +
									  "<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:680px; height:350px;'></div></figure></div></div>");
				$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:685px; height:750px;'></div>" +
									  "</figure></div></div>");
				$('.tabArea7').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart71' style='width:685px; height:345px; margin-left:-5px; margin-top:4px;'></div>" +
									  "</figure></div></div>");
			}else if(tblId == "DT_1FL_7010") {
				$('.tabArea1').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:680px; height:350px;'></div></figure></div></div>" +
									  "<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:680px; height:350px;'></div></figure></div></div>");
				$('.tabArea3').append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:685px; height:750px;'></div></figure></div></div>");
			}
			if(tblId == 'DT_1FL_7004'){
				$('#division5').css('width','818px');
			}
			
			console.log(chartData1);
			console.log(chartData2);
			console.log(chartData3);
			console.log(chartData4);
			console.log(chartData5);
			console.log(chartData6);
			
			// let selectedYear = ["2015", "2016", "2017", "2018", "2019",
			// "2020"];
			// $more3DashDetail.util.design(tblId);
			if(tblId == "DT_1FL_7001") {
				let color1 = ['#7CB5EC', '#D0D0D0'];
				let Industry = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
				chartType1 = {};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop:-10, style: {fontFamily: 'NanumSquare'}}
				chartType3 = {};
				chartType4 = {style: {fontFamily: 'NanumSquare'}};
				chartType6 = {};
				chartType7 = {};
				let year = "";
				let month = "";
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].ITM_ID == "T00") {
							// legendNm71.push(chartData1[i].ITM_NM);
							overlapRemove1.push(chartData1[i].PRD_DE);
							divisionData1.push(Number(chartData1[i].DT)); 
						}
						if(chartData1[i].ITM_ID == "T02") {
							divisionData1.push(Number(chartData1[i].DT)); 
						}
					}
					chartVal1 = $more3DashDetail.util.division(divisionData1, 10);
					year = $more3DashDetail.util.overlapRemove(overlapRemove1);
				}
				for(let i=0; i<year.length; i++) {
					xAxisNm1 = year[i].substr(2, 2);
					xAxisNm2 = year[i].substr(5, 2);
					if(xAxisNm2 == 1) {month = "(2월)";}
					else if(xAxisNm2 == 2) {month = "(5월)";}
					else if(xAxisNm2 == 3) {month = "(8월)";}
					else if(xAxisNm2 == 4) {month = "(11월)";}
					categories1.push('`'+xAxisNm1  + '년 ' + xAxisNm2 + '/4분기</br>' + month);
				}
				console.log(xAxisNm2);
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == 'A' || chartData2[i].C1 == 'B' || chartData2[i].C1 == 'C' || chartData2[i].C1 == 'D' || chartData2[i].C1 == 'E' || chartData2[i].C1 == 'F' ||
					   chartData2[i].C1 == 'G' || chartData2[i].C1 == 'H' || chartData2[i].C1 == 'I' || chartData2[i].C1 == 'J' || chartData2[i].C1 == 'K' || chartData2[i].C1 == 'L' ||
					   chartData2[i].C1 == 'M' || chartData2[i].C1 == 'N' || chartData2[i].C1 == 'O' || chartData2[i].C1 == 'P' || chartData2[i].C1 == 'Q' || chartData2[i].C1 == 'R' ||
					   chartData2[i].C1 == 'S' || chartData2[i].C1 == 'T' || chartData2[i].C1 == 'U') {
						chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
						categories2.push(chartData2[i].C1_NM);
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == '00' && chartData3[i].ITM_ID == 'T00') {
						totalVal.push(Number(chartData3[i].DT));
					}
				}
				console.log(totalVal);
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == 'A' || chartData3[i].C1 == 'B' || chartData3[i].C1 == 'C' || chartData3[i].C1 == 'D' || chartData3[i].C1 == 'E' || chartData3[i].C1 == 'F' ||
					   chartData3[i].C1 == 'G' || chartData3[i].C1 == 'H' || chartData3[i].C1 == 'I' || chartData3[i].C1 == 'J' || chartData3[i].C1 == 'K' || chartData3[i].C1 == 'L' ||
					   chartData3[i].C1 == 'M' || chartData3[i].C1 == 'N' || chartData3[i].C1 == 'O' || chartData3[i].C1 == 'P' || chartData3[i].C1 == 'Q' || chartData3[i].C1 == 'R' ||
					   chartData3[i].C1 == 'S' || chartData3[i].C1 == 'T' || chartData3[i].C1 == 'U') {
						categories3.push(chartData3[i].C1_NM);
						// chartVal3.push(Number(chartData3[i].DT));
						totalVal.push(Number(chartData3[i].DT));
					}
				}
				for(let i=2; i<=categories3.length; i++) {
					$('.tabArea6').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart6"+i+"' style='width:685px; height:185px; margin-top:12px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea7').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart7"+i+"' style='width:685px; height:185px; margin-top:12px;'></div>" +
										  "</figure></div></div>");
				}
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == 'A' || chartData4[i].C1 == 'B' || chartData4[i].C1 == 'C' || chartData4[i].C1 == 'D' || chartData4[i].C1 == 'E' || chartData4[i].C1 == 'F' ||
					   chartData4[i].C1 == 'G' || chartData4[i].C1 == 'H' || chartData4[i].C1 == 'I' || chartData4[i].C1 == 'J' || chartData4[i].C1 == 'K' || chartData4[i].C1 == 'L' ||
					   chartData4[i].C1 == 'M' || chartData4[i].C1 == 'N' || chartData4[i].C1 == 'O' || chartData4[i].C1 == 'P' || chartData4[i].C1 == 'Q' || chartData4[i].C1 == 'R' ||
					   chartData4[i].C1 == 'S' || chartData4[i].C1 == 'T' || chartData4[i].C1 == 'U') {
						categories4.push(chartData4[i].C1_NM);
						chartVal4.push(Number(chartData4[i].DT));
						selectNm5.push(chartData4[i].C1_NM);
						selectNm6.push(chartData4[i].C1_NM);
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03") {
						categories6.push(chartData3[i].C1_NM);
						chartVal6.push(Number(chartData3[i].DT));
					}
				}
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == "01" || chartData4[i].C1 == "02" || chartData4[i].C1 == "03") {
						categories7.push(chartData4[i].C1_NM);
						chartVal7.push(Number(chartData4[i].DT));
					}
				}
				
				console.log(chartVal6);
				selectChartData6 = chartData3;
				selectChartData7 = chartData4;
				seriesyearData1 = [{
					name: '임금근로 일자리',
					type: 'column',
					yAxis: 1,
					data: chartVal1[0], 
					color: color1[0],
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						align: 'center',
						style: {
							fontSize:'13px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						},
						formatter:function() {
							return $more3DashDetail.util.comma(this.y) + '만개';
						}
					},
				},{
					name: '증감',
					type: 'line',
					data: chartVal1[1], 
					color: color1[1]
				}];
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					color: '#7CB5EC',
					dataLabels: {
						enabled: false,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance:3,
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.industryClassificationColor
				}];
				seriesyearData3 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					yAxis: 1,
					data: chartVal3,
					color: '#F15C80',
				},
				];
				seriesyearData4 = [{
					name: '임금근로 일자리 증감',
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						},
						formatter: function() {
							let num = "";
							if(this.y > 0) {
								num = this.y + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								num = this.y + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								num = '<span>0.0만개</span>';
							}
							return num;
						},
					},
					color: '#F15C80',
					negativeColor: '#7CB5EC',
					type: 'column',
					yAxis: 1,
					data: chartVal4
				}];
				seriesyearData6 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					dataLabels: {
						enabled: true,
						format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color: '#000',
						},
					},
					color: '#F15C80',
					yAxis: 1,data: chartVal6
				}];
				seriesyearData7 = [{
					name: '임금근로 일자리 증감',
					type: 'column',
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color: '#000',
						},
						formatter: function() {
							let num = "";
							if(this.y > 0) {
								num = this.y + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								num = this.y + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								num = '<span>변동없음</span>';
							}
							return num;
						},
					},
					color: '#F15C80',
					negativeColor: '#7CB5EC',
					yAxis: 1,
					data: chartVal7
				}];
				
			}else if(tblId == "DT_1FL_7002") {
				chartType1 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType2 = {};
				chartType3 = {};
				chartType4 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType6 = {};
				chartType7 = {};
				console.log(chartData1); // 1:구성비, 2:일자리, 3:증감
				let valCount = new Array;
				let valCount2 = new Array;
				let chartVal1_1 = 0;
				let toFixed = 0;
				let toFixed2 = 0;
				for(let i=0; i<85; i++) {
					valCount.push([chartData1[i].C1_NM, Number(chartData1[i].DT)]); 
				}
				valCount.sort((a, b) => b[1] - a[1]);
				for(let i=0; i<10; i++) {
					chartVal1.push(valCount[i]);
				}
				for(let i=10; i<85; i++) {
					toFixed += valCount[i][1];
				}
				chartVal1_1 = Number(toFixed.toFixed(2));
				
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == 'C') {
						subtitleValChart1.push(Number(chartData2[i].DT)); 
					}
				}
				
				for(let i=0; i<85; i++) {
					categories2.push(chartData1[i].C1_NM);
					// categories3.push(chartData1[i].C1_NM);
					chartVal2.push(Number(chartData2[i].DT)); 
					valCount2.push(Number(chartData2[i].DT)); 
				}
				// valCount2.sort((a, b) => b[1] - a[1]);
				valCount2.sort(function(a, b)  {
					return b - a;
				});
				for(let i=0; i<10; i++) {
					totalVal.push(valCount2[i]);
					subtitleValChart1.push(valCount2[i]);
				}
				for(let i=10; i<85; i++) {
					toFixed2 += valCount2[i];
				}
				totalVal2.push(Number(chartData2[106].DT));
				for(let i=85; i<105; i++) {
					chartVal4.push([chartData1[i].C1_NM, Number(chartData1[i].DT)]); 
					categories6.push(chartData1[i].C1_NM);
					// categories7.push(chartData1[i].C1_NM);
					chartVal6.push(Number(chartData2[i].DT)); 
					totalVal2.push(Number(chartData2[i].DT)); 
				}
				for(let i =0; i<chartVal2.length; i++) {
					if(isNaN(chartVal2[i])) {
						chartVal2[i] = 0;
					}
				}
				for(let i =0; i<chartVal6.length; i++) {
					if(isNaN(chartVal6[i])) {
						chartVal6[i] = 0;
					}
				}
				chartVal1.push(['기타', chartVal1_1]);
				totalVal.push(Number(toFixed2.toFixed(1)));
				subtitleValChart1.push(Number(toFixed2.toFixed(1)));

				seriesyearData1 = [{
					innerSize: '80%',
					data: chartVal1,
					dataLabels: {
						enabled: false,
						format: '<span class="d-label">{data.name}</span> : {y}',
						align: 'center',
						y: -30,
						x: -40,
						style: {fontSize: '10px'}
					},
					colors: $more3DashDetail.manufacturingSmallColor
				}];
				seriesyearData2 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
						},
						formatter: function() {
							return this.y.toFixed(1) + '만개';
						},
					},
					color:'#F15C80',
					yAxis: 1,
					data: chartVal2
				}];
				seriesyearData4 = [{
					innerSize: '80%',
					data: chartVal4,
					dataLabels: {
						enabled: false,
						format: '<span class="d-label">{data.name}</span> : {y}',
						align: 'center',
						y: -30,
						x: -40,
						style: {
							fontSize: '10px',
							textOverflow: "width",
						}
					},
					colors: $more3DashDetail.wholesaleRretailSmallColor
				}];
				seriesyearData6 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						},
						formatter: function() {
							return this.y.toFixed(1) + '만개';
						},
					},
					color:'#F15C80',
					yAxis: 1,
					data: chartVal6
				}];
				/*
				 * seriesyearData7 = [ {name: '임금근로 일자리 증감', type: 'column',
				 * yAxis: 1,data: chartVal7}, ];
				 */
			}else if(tblId == "DT_1FL_7003") {
				chartType1 = {renderTo: 'dounutChart',type: 'pie',marginTop: 5,};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',marginTop: 5,};
				chartType4 = {renderTo: 'horiStackedBar', type: 'column'};
				chartType7 = {renderTo: 'horiStackedBar', type: 'column'};
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal4_3 = new Array;
				let chartVal4_4 = new Array;
				let chartVal7_1 = new Array;
				let chartVal7_2 = new Array;
				let chartVal7_3 = new Array;
				let chartVal7_4 = new Array;
				let overlapRemove4 = new Array;
				let overlapRemove7 = new Array;
				let legendNm4 = new Array;
				let legendNm7 = new Array;
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].C2 == "10" || chartData1[i].C2 == "20" || chartData1[i].C2 == "30") {
							chartVal1.push([chartData1[i].C2_NM, Number(chartData1[i].DT)]);
						}
					}
				}
				console.log(chartVal1);
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == 'A' || chartData2[i].C1 == 'B' || chartData2[i].C1 == 'C' || chartData2[i].C1 == 'D' || chartData2[i].C1 == 'E' || chartData2[i].C1 == 'F' ||
					   chartData2[i].C1 == 'G' || chartData2[i].C1 == 'H' || chartData2[i].C1 == 'I' || chartData2[i].C1 == 'J' || chartData2[i].C1 == 'K' || chartData2[i].C1 == 'L' ||
					   chartData2[i].C1 == 'M' || chartData2[i].C1 == 'N' || chartData2[i].C1 == 'O' || chartData2[i].C1 == 'P' || chartData2[i].C1 == 'Q' || chartData2[i].C1 == 'R' ||
					   chartData2[i].C1 == 'S' || chartData2[i].C1 == 'T' || chartData2[i].C1 == 'U') {
						if(chartData2[i].C2 == "00") {
							chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
							categories2.push(chartData2[i].C1_NM);
						}
					}	
				}
				console.log(chartVal2);
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == '00' && chartData3[i].C2 == '00' && chartData3[i].ITM_ID == 'T00') {
						totalVal3.push(Number(chartData3[i].DT));
						totalVal4.push(Number(chartData3[i].DT));
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == 'A' || chartData3[i].C1 == 'B' || chartData3[i].C1 == 'C' || chartData3[i].C1 == 'D' || chartData3[i].C1 == 'E' || chartData3[i].C1 == 'F' ||
					   chartData3[i].C1 == 'G' || chartData3[i].C1 == 'H' || chartData3[i].C1 == 'I' || chartData3[i].C1 == 'J' || chartData3[i].C1 == 'K' || chartData3[i].C1 == 'L' ||
					   chartData3[i].C1 == 'M' || chartData3[i].C1 == 'N' || chartData3[i].C1 == 'O' || chartData3[i].C1 == 'P' || chartData3[i].C1 == 'Q' || chartData3[i].C1 == 'R' ||
					   chartData3[i].C1 == 'S' || chartData3[i].C1 == 'T' || chartData3[i].C1 == 'U') {
						if(chartData3[i].C2 == "10") {
							chartVal4_1.push(Number(chartData3[i].DT));
							overlapRemove4.push(chartData3[i].C1_NM);
							legendNm4.push(chartData3[i].C2_NM);
						}else if(chartData3[i].C2 == "20") {
							chartVal4_2.push(Number(chartData3[i].DT));
							overlapRemove4.push(chartData3[i].C1_NM);
							legendNm4.push(chartData3[i].C2_NM);
						}else if(chartData3[i].C2 == "30") {
							chartVal4_3.push(Number(chartData3[i].DT));
							overlapRemove4.push(chartData3[i].C1_NM);
							legendNm4.push(chartData3[i].C2_NM);
						}else if(chartData3[i].C2 == "40") {
							chartVal4_4.push(Number(chartData3[i].DT));
							overlapRemove4.push(chartData3[i].C1_NM);
							legendNm4.push(chartData3[i].C2_NM);
						}else if(chartData3[i].C2 == "00") {
							totalVal.push(Number(chartData3[i].DT));
							totalVal3.push(Number(chartData3[i].DT));
							selectVal.push(Number(chartData3[i].DT));
						}
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C2 == "00") {
						if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03") {
							totalVal2.push(Number(chartData3[i].DT));
						}
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "00") {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30") {
							totalVal4.push(Number(chartData3[i].DT));
						}
					}
				}
				console.log(totalVal4);
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == "01" || chartData4[i].C1 == "02" || chartData4[i].C1 == "03") {
						if(chartData4[i].C2 == "10") {
							overlapRemove7.push(chartData4[i].C1_NM);
							chartVal7_1.push(Number(chartData4[i].DT));
							legendNm7.push(chartData4[i].C2_NM);
						}else if(chartData4[i].C2 == "20") {
							overlapRemove7.push(chartData4[i].C1_NM);
							chartVal7_2.push(Number(chartData4[i].DT));
							legendNm7.push(chartData4[i].C2_NM);
						}else if(chartData4[i].C2 == "30") {
							overlapRemove7.push(chartData4[i].C1_NM);
							chartVal7_3.push(Number(chartData4[i].DT));
							legendNm7.push(chartData4[i].C2_NM);
						}else if(chartData4[i].C2 == "40") {
							overlapRemove7.push(chartData4[i].C1_NM);
							chartVal7_4.push(Number(chartData4[i].DT));
							legendNm7.push(chartData4[i].C2_NM);
						}
					}
				}
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == "00") {
						if(chartData2[i].C2 == "00" || chartData2[i].C2 == "10" || chartData2[i].C2 == "20" || chartData2[i].C2 == "30" || chartData2[i].C2 == "40") {
							selectNm2.push(chartData2[i].C2_NM);
						}
					}
				}
				for(let i=2; i<=selectNm2.length; i++) {
					$('.tabArea2').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart2"+i+"' style='width:685px; height:220px; margin-left: -15px;'></div>" +
										  "</figure></div></div>");
				}
				for(let i=2; i<=categories2.length; i++) {
					$('.tabArea7').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart7"+i+"' style='width:685px; height:440px; margin-top: 15px;'></div>" +
										  "</figure></div></div>");
				}
				selectChartData2 = chartData2;
				selectChartData7 = chartData4;
				chartVal4.push(chartVal4_1, chartVal4_2, chartVal4_3, chartVal4_4);
				chartVal7.push(chartVal7_1, chartVal7_2, chartVal7_3, chartVal7_4);
				categories4 = $more3DashDetail.util.overlapRemove(overlapRemove4);
				categories7 = $more3DashDetail.util.overlapRemove(overlapRemove7);
				selectNm7 = categories4; 
				seriesyearData1 = [{
					innerSize: '80%',
					data: chartVal1,
					dataLabels: {
						enabled: true,
						format: '{point.y:.1f} %',
						align: 'center',
						distance: '0%',
						style: {
							fontSize: '14px'
						},
					},
					colors: $more3DashDetail.conSubNewColor
				}];
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: false,
						format: '<span class="d-label">{data.name}</span> : {y}',
						align: 'center',
						y: -30,
						x: -40,
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.industryClassificationColor
				}];
				for(let i=0; i<chartVal4.length; i++) {
					seriesyearData4.push({
						name: legendNm4[i],
						data: chartVal4[i],
						// padding:10,
						// 바 상단의 수치값
						dataLabels: {
							enabled: true,
							allowOverlap: false,
							// format: '{y} 만개',
							padding: 0, // 이거 하는중
							align: 'center',
							color:'#000',
							// rotation: 270,
							rotation: 0,
							y: -20,
							style: {
								fontSize:'13px',
								fontWeight:'600',
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							}
						},
						color: $more3DashDetail.conSubNewExtColor[i]
					});
				}
				for(let i=0; i<chartVal7.length; i++) {
					seriesyearData7.push({
						name: legendNm7[i],
						data: chartVal7[i],
						dataLabels: {
							allowOverlap: false,
							enabled: true,
							format: '{y}만개',
							padding: 0, // 이거 하는중
							align: 'center',
							color:'#000',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
						},
						color: $more3DashDetail.conSubNewExtColor[i]
					});
				}
			}else if(tblId == "DT_1FL_7004") {
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType3 = {renderTo: 'horiStackedBar', type: 'column'};
				chartType3_bar = {type: 'bar'};
				chartType4 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType6 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType7 = {renderTo: 'horiStackedBar', type: 'column'};
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal3_3 = new Array;
				let chartVal3_4 = new Array;
				let chartVal7_1 = new Array;
				let chartVal7_2 = new Array;
				let chartVal7_3 = new Array;
				let chartVal7_4 = new Array;
				let legendNm3 = new Array;
				let legendNm7 = new Array;
				
				console.log(chartData2);
				console.log(chartData3);
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C2 == "10" || chartData1[i].C2 == "20" || chartData1[i].C2 == "30") {
						chartVal1.push([chartData1[i].C2_NM, Number(chartData1[i].DT)]);
					}
				}
				for(let i=0; i<chartData2.length; i++) {
					for(let j=101; j<341; j++) {
						if(chartData2[i].C1 == j && chartData2[i].C2 == "00") {
							selectNm2.push(chartData2[i].C1_NM);
							selectVal.push(chartData2[i].C1);
						}
					}
				}
				
				for(let i=0; i<425; i++) { // 425
					if(chartData3[i].C2 == "10") {
						chartVal3_1.push(Number(chartData3[i].DT)); 
						categories3.push(chartData3[i].C1_NM);
						legendNm3.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "20") {
						chartVal3_2.push(Number(chartData3[i].DT));
						legendNm3.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "30") {
						chartVal3_3.push(Number(chartData3[i].DT));
						legendNm3.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "40") {
						chartVal3_4.push(Number(chartData3[i].DT));
						legendNm3.push(chartData3[i].C2_NM);
					}
				}
				
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C2 == "10" || chartData4[i].C2 == "20" || chartData4[i].C2 == "30") {
						chartVal4.push([chartData4[i].C2_NM, Number(chartData4[i].DT)]);
					}
				}
				// 4
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == '451') {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
							chartVal5.push([chartData3[i].C2_NM, Number(chartData3[i].DT)]);
						}
					}
					for(let j=450; j<480; j++) {
						if(chartData2[i].C1 == j && chartData2[i].C2 == "00") {
							selectNm6.push(chartData2[i].C1_NM);
							selectVal2.push(chartData2[i].C1);
						}
					}
				}
				for(let i=425; i<525; i++) {
					if(chartData3[i].C2 == "10") {
						chartVal7_1.push(Number(chartData3[i].DT)); 
						categories7.push(chartData3[i].C1_NM);
						legendNm7.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "20") {
						chartVal7_2.push(Number(chartData3[i].DT));
						legendNm7.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "30") {
						chartVal7_3.push(Number(chartData3[i].DT));
						legendNm7.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "40") {
						chartVal7_4.push(Number(chartData3[i].DT));
						legendNm7.push(chartData3[i].C2_NM);
					}else if(chartData3[i].C2 == "00") {
						totalVal3.push(Number(chartData3[i].DT));
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "101" && chartData3[i].C2 == "00" && chartData3[i].ITM_ID == "T00") {
						totalVal.push(Number(chartData3[i].DT));
					}
					if(chartData3[i].C1 == "451" && chartData3[i].C2 == "00" && chartData3[i].ITM_ID == "T00") {
						totalVal2.push(Number(chartData3[i].DT));
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "101") {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
							totalVal.push(Number(chartData3[i].DT));
							selectVal.push(Number(chartData3[i].DT));
							chartVal2.push([chartData3[i].C2_NM, Number(chartData3[i].DT)]);
						}
					}
					if(chartData3[i].C1 == "451") {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
							totalVal2.push(Number(chartData3[i].DT));
						}
					}
					for(let j=0; j<selectVal.length; j++) {
						if(chartData3[i].C1 == selectVal[j]) {
							if(chartData3[i].C2 == "00") {
								totalVal4.push(Number(chartData3[i].DT));
							}
						}
					}
				}
				console.log(chartVal2);
				for(let i=2; i<=selectNm2.length; i++) {
					$('.tabArea2').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart2"+i+"' style='width:675px; height:330px; margin-left:15px;'></div>" +
										  "</figure></div></div>");
				}
				for(let i=2; i<=selectNm6.length; i++) {
					$('.tabArea3').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart3"+i+"' style='width:675px; height:330px; margin-left:15px;'></div>" +
										  "</figure></div></div>");
				}
				selectChartData2 = chartData2;
				selectChartData6 = chartData2;
				chartVal3.push(chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4);
				chartVal7.push(chartVal7_1, chartVal7_2, chartVal7_3, chartVal7_4);
				console.log(totalVal);
				// 1
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%', 
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.conSubNewExtColor
				}];
				// 2
				for(let i=0; i<chartVal3.length; i++) {
					seriesyearData3.push({
						name: legendNm3[i],
						data: chartVal3[i],
						// padding:10,
						// 바 상단의 수치값
						dataLabels: {
							allowOverlap: false,
							enabled: true,
							format: '{y}만개',
							padding: 0, // 이거 하는중
							align: 'center',
							color:'#000',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
						},
						color: $more3DashDetail.conSubNewExtColor[i]
					});
				}
				// 3
				seriesyearData6 = [{
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%', 
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.conSubNewExtColor
				}];
				// 4
				for(let i=0; i<chartVal7.length; i++) {
					seriesyearData7.push({
						name: legendNm7[i],
						data: chartVal7[i],
						// padding:10,
						// 바 상단의 수치값
						dataLabels: {
							allowOverlap: false,
							enabled: true,
							// format: '{y}만개',
							padding: 0, // 이거 하는중
							align: 'center',
							color:'#000',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							},
						},
						color: $more3DashDetail.conSubNewExtColor[i]
					});
				}
				
				categories3.map(function(item, index) {
					let checkboxItem = `<li><input type="checkbox" id="selectFilter${index}" name="selectFilter" value="${index}"><label for="selectFilter${index}">${item}</label></li>`
					$("#filterBox").append(checkboxItem);
				})
				
				let filterInput = [...document.querySelectorAll('input[name=selectFilter]')];
				
				document.querySelector("#selectFilterBtn").addEventListener('click',function() {
					$(this).toggleClass('active');
				})				
				
				document.querySelector("#filterAll").addEventListener('click',function() {
					filterInput.map((item) => $(item).prop('checked',true));
					
				})
				
				document.querySelector("#filterDes").addEventListener('click',function() {
					filterInput.map((item) => $(item).prop('checked',false));
				})
				
				document.querySelector("#filterApply").addEventListener('click',function() {
					$.when(getFilterList())
						.done(function(result) {
							
							if(result.length == 0) {
								alert('한개 이상의 지료를 선택해주세요.');
								return false;
							}
							
							let filterCtg = [];
							let filterDataAll = [];
							let filterData1 = [];
							let filterData2 = [];
							let filterData3 = [];
							let filterData4 = [];
							result.map(itemIndex => {								
								filterCtg = [...filterCtg, categories3[itemIndex]]
								filterData1 = [...filterData1, seriesyearData3[0].data[itemIndex]]
								filterData2 = [...filterData2, seriesyearData3[1].data[itemIndex]]
								filterData3 = [...filterData3, seriesyearData3[2].data[itemIndex]]
								filterData4 = [...filterData4, seriesyearData3[3].data[itemIndex]]
								
							});
							filterDataAll[0] = {"name":"지속일자리","data": filterData1}
							filterDataAll[1] = {"name":"대체일자리","data": filterData2}
							filterDataAll[2] = {"name":"신규일자리","data": filterData3}
							filterDataAll[3] = {"name":"소멸일자리","data": filterData4}
							
							let width = "100%"
								
							let canvasHeight = (filterCtg.length < 4) ? parseInt(340) : parseInt(filterCtg.length * 120);  
								
							filterDataAll.map(function(item, index) {
								$("#chart41").highcharts().series[index].setData(filterDataAll[index].data)
							})
														
							$("#chart41").highcharts().xAxis[0].update({categories:filterCtg})
							$("#chart41").css('height',canvasHeight);
							$("#chart41").highcharts().reflow();
							
							$("#selectFilterBtn").removeClass('active')
							
						})
				})
				function getFilterList() {
					let dfd = $.Deferred();
					let dataIdx = [];
					
					filterInput.map((item, index, row) => {
						if($(item).prop('checked'))  dataIdx = [...dataIdx, parseInt($(item).val())];
						if(filterInput.length === index + 1) dfd.resolve(dataIdx);
					})
					
					return dfd.promise();
				}
			}else if(tblId == "DT_1FL_7005") {
				chartType1 = {};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType3 = {};
				chartType4 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType5 = {};
				chartType6 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType7 = {};
				let year = '';
				let month = '';
				console.log(chartData3);
				// 357
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].ITM_ID == "T00") {
							// legendNm1.push(chartData1[i].ITM_NM);
							overlapRemove1.push(chartData1[i].PRD_DE);
							divisionData1.push(Number(chartData1[i].DT)); 
						}
						if(chartData1[i].ITM_ID == "T02") {
							divisionData1.push(Number(chartData1[i].DT)); 
						}
					}
					chartVal1 = $more3DashDetail.util.division(divisionData1, 10);
					year = $more3DashDetail.util.overlapRemove(overlapRemove1);
				}
				for(let i=0; i<year.length; i++) {
					xAxisNm1 = year[i].substr(2, 2);
					xAxisNm2 = year[i].substr(5, 2);
					if(xAxisNm2 == 1) {month = "(2월)";}
					else if(xAxisNm2 == 2) {month = "(5월)";}
					else if(xAxisNm2 == 3) {month = "(8월)";}
					else if(xAxisNm2 == 4) {month = "(11월)";}
					categories1.push('`'+xAxisNm1  + '년 ' + xAxisNm2 + '/4분기</br>' + month);
				}
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == "1001" || chartData2[i].C1 == "1002") {
						chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
						totalVal.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == "2001" || chartData2[i].C1 == "2002" || chartData2[i].C1 == "2003" || chartData2[i].C1 == "2004" || chartData2[i].C1 == "2005") {
						chartVal4.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
						totalVal2.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == "3001" || chartData2[i].C1 == "3002" || chartData2[i].C1 == "3003" || chartData2[i].C1 == "3004") {
						chartVal6.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
						totalVal3.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == "00" && chartData2[i].ITM_ID == "T00") {
						totalVal4.push(Number(chartData2[i].DT));
					}
				}
				console.log(totalVal);
				console.log(totalVal2);
				console.log(totalVal3);
				console.log(totalVal4);
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "1001" || chartData3[i].C1 == "1002") {
						categories3.push(chartData3[i].C1_NM);
						chartVal3.push(Number(chartData3[i].DT));
					}
					if(chartData3[i].C1 == "2001" || chartData3[i].C1 == "2002" || chartData3[i].C1 == "2003" || chartData3[i].C1 == "2004" || chartData3[i].C1 == "2005") {
						categories5.push(chartData3[i].C1_NM);
						chartVal5.push(Number(chartData3[i].DT));
					}
					if(chartData3[i].C1 == "3001" || chartData3[i].C1 == "3002" || chartData3[i].C1 == "3003" || chartData3[i].C1 == "3004") {
						categories7.push(chartData3[i].C1_NM);
						chartVal7.push(Number(chartData3[i].DT));
					}
				}
				// 1
				seriesyearData1 = [{
					name: '임금근로 일자리',
					type: 'column',
					yAxis: 1,
					data: chartVal1[0],
					dataLabels: {
						enabled: true,
						format: '{y}만개',
						align: 'center',
						style: {
							fontSize:'13px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						}
					},
				},{
					name: '증감',
					type: 'line',
					data: chartVal1[1]
				}];
				// 2
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						distance: '-25%',
						y:-50,
						align: 'center',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.genderColor
				}];
				seriesyearData3 = [{
					name: '',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						verticalAlign: 'top',
						y: -30,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								return $more3DashDetail.util.comma(this.y) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y > 0) {
								return $more3DashDetail.util.comma(this.y) + '만개';
							}
						},
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
					},
					color:'#F15C80',
					data: chartVal3
				}];
				seriesyearData4 = [{
					innerSize: '80%',
					data: chartVal4,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.ageColor
				}]
				seriesyearData5 = [{
					name: '',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						verticalAlign: 'top',
						y: -30,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								return $more3DashDetail.util.comma(this.y) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y > 0) {
								return $more3DashDetail.util.comma(this.y) + '만개';
							}
						},
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
					},
					color:'#F15C80',
					data: chartVal5
				}];
				seriesyearData6 = [{
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.organiFormColor
				}];
				seriesyearData7 = [{
					name: '',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						verticalAlign: 'top',
						y: -30,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								return $more3DashDetail.util.comma(this.y) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y > 0) {
								return $more3DashDetail.util.comma(this.y) + '만개';
							}
						},
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
					},
					color:'#F15C80',
					data: chartVal7
				}];
			}else if(tblId == "DT_1FL_7006") {
				chartType1 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType2 = {};
				chartType3 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType4 = {};
				chartType5 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				chartType6 = {};
				chartType7 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				console.log(chartData1);
				console.log(chartData3);
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal4_3 = new Array;
				let chartVal4_4 = new Array;
				let chartVal6_1 = new Array;
				let chartVal6_2 = new Array;
				let chartVal6_3 = new Array;
				let chartVal6_4 = new Array;
				
				let categories2_1 = new Array;
				let categories2_2 = new Array;
				let categories4_1 = new Array;
				let categories4_2 = new Array;
				let categories6_1 = new Array;
				let categories6_2 = new Array;
				let overlapRemove2 = new Array;
				legendNm2 = ['지속일자리', '신규채용일자리', '지속일자리(구성비)', '신규채용일자리(구성비)'];
				legendNm4 = ['지속일자리', '신규채용일자리', '지속일자리(구성비)', '신규채용일자리(구성비)'];
				legendNm6 = ['지속일자리', '신규채용일자리', '지속일자리(구성비)', '신규채용일자리(구성비)'];
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].C2 == "10" || chartData1[i].C2 == "20") {
							chartVal1.push([chartData1[i].C2_NM, Number(chartData1[i].DT)]);
						}
					}
				}
				console.log(chartVal1);
				for(let i=0; i<chartData2.length; i++) { // 2, 4, 6
					if(chartData2[i].C1 == "1001" || chartData2[i].C1 == "1002") {
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "10") {
							overlapRemove2.push(chartData2[i].C1_NM);
							chartVal2_1.push(Number(chartData2[i].DT));
						}
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "20") {chartVal2_2.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "10") {chartVal2_3.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "20") {chartVal2_4.push(Number(chartData2[i].DT));}
					}
					if(chartData2[i].C1 == "2001" || chartData2[i].C1 == "2002" || chartData2[i].C1 == "2003" || chartData2[i].C1 == "2004" || chartData2[i].C1 == "2005") {
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "10") {
							overlapRemove4.push(chartData2[i].C1_NM);
							chartVal4_1.push(Number(chartData2[i].DT));
						}
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "20") {chartVal4_2.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "10") {chartVal4_3.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "20") {chartVal4_4.push(Number(chartData2[i].DT));}
					}
					if(chartData2[i].C1 == "3001" || chartData2[i].C1 == "3002" || chartData2[i].C1 == "3003" || chartData2[i].C1 == "3004") {
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "10") {
							overlapRemove6.push(chartData2[i].C1_NM);
							chartVal6_1.push(Number(chartData2[i].DT));
						}
						if(chartData2[i].ITM_ID == "T00" && chartData2[i].C2 == "20") {chartVal6_2.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "10") {chartVal6_3.push(Number(chartData2[i].DT));}
						if(chartData2[i].ITM_ID == "T02" && chartData2[i].C2 == "20") {chartVal6_4.push(Number(chartData2[i].DT));}
					}
				}
				for(let i=0; i<chartData3.length; i++) { // 3, 5, 7
					if(chartData3[i].C2 == "00") {
						if(chartData3[i].C1 == "1001" || chartData3[i].C1 == "1002") {
							chartVal3.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
							chartValRatio2.push(Number(chartData3[i].DT));
						}
						if(chartData3[i].C1 == "2001" || chartData3[i].C1 == "2002" || chartData3[i].C1 == "2003" || chartData3[i].C1 == "2004" || chartData3[i].C1 == "2005") {
							chartVal5.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
						if(chartData3[i].C1 == "3001" || chartData3[i].C1 == "3002" || chartData3[i].C1 == "3003" || chartData3[i].C1 == "3004") {
							chartVal7.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
					}
					if(chartData3[i].C1 == "00") {
						if(chartData3[i].C2 == "00" || chartData3[i].C2 == "10" || chartData3[i].C2 == "20") {
							selectNm3.push(chartData3[i].C2_NM);
							selectNm5.push(chartData3[i].C2_NM);
							selectNm7.push(chartData3[i].C2_NM);
						}
						if(chartData3[i].C2 == "00" && chartData3[i].ITM_ID == "T00") {
							totalVal.push(chartData3[i].DT);
						}
					}
				}
				console.log(totalVal);
				selectChartData3 = chartData3;
				selectChartData5 = chartData3;
				selectChartData7 = chartData3;
				for(let i=2; i<=selectNm3.length; i++) {
					$('.tabArea3').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart3"+i+"' style='width:450px; height:235px'></div>" +
										  "</figure></div></div>");
					$('.tabArea5').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart5"+i+"' style='width:500px; height:210px; margin-left:110px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea7').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart7"+i+"' style='width:500px; height:210px; margin-left:110px;'></div>" +
										  "</figure></div></div>");
				}
				categories2 = $more3DashDetail.util.overlapRemove(overlapRemove2);
				categories4 = $more3DashDetail.util.overlapRemove(overlapRemove4);
				categories6 = $more3DashDetail.util.overlapRemove(overlapRemove6);
				chartVal2.push(chartVal2_1, chartVal2_2);
				chartVal4.push(chartVal4_1, chartVal4_2);
				chartVal6.push(chartVal6_1, chartVal6_2);
				seriesyearData1 = [{
					innerSize: '80%',
					data: chartVal1,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.conSubColor
				}];
				for(let i=0; i<chartVal2.length; i++) {
					seriesyearData2.push({
						name: legendNm2[i],
						data: chartVal2[i],
						type: 'column',
						yAxis: 1,
						dataLabels: {
							enabled: true,
							// format: '{y}만개',
							verticalAlign: 'top',
							y: -30,
							style: {
								fontSize:'14px',
								fontWeight:'600',
								textOverflow: "width",
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							},
						},
						color: $more3DashDetail.conSubColor[i]
					});
				}
				seriesyearData3 = [{
					innerSize: '80%',
					data: chartVal3,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#F7A35C']
				}];
				for(let i=0; i<chartVal4.length; i++) {
					seriesyearData4.push({
						name: legendNm4[i],
						data: chartVal4[i],
						type: 'column',
						yAxis: 1,
						dataLabels: {
							enabled: true,
							allowOverlap: true,
							// format: '{y}만개',
							verticalAlign: 'top',
							y: -30,
							style: {
								fontSize:'14px',
								fontWeight:'600',
								textOverflow: "width",
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							},
						},
						color: $more3DashDetail.conSubColor[i]
					});
				}
				seriesyearData5 = [{
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.ageColor
				}];
				for(let i=0; i<chartVal6.length; i++) {
					seriesyearData6.push({
						name: legendNm6[i],
						data: chartVal6[i],
						type: 'column',
						yAxis: 1,
						dataLabels: {
							enabled: true,
							// format: '{y}만개',
							allowOverlap: true,
							verticalAlign: 'top',
							y: -30,
							style: {
								fontSize:'14px',
								fontWeight:'600',
								textOverflow: "width",
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							},
						},
						color: $more3DashDetail.conSubColor[i]
					});
				}
				seriesyearData7 = [{
					innerSize: '80%',
					data: chartVal7,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.organiFormColor
				}];
			}else if(tblId == "DT_1FL_7007") {
				chartType1 = {};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%', marginTop: 5};
				chartType3 = {};
				chartType4 = {};
				chartType6 = {};
				chartType7 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',backgroundColor: null, marginTop: 5};
				let Industry = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal6_1 = new Array;
				let chartVal6_2 = new Array;
				let year = new Array;
				let month = new Array;
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].ITM_ID == "T1") {
							// legendNm1.push(chartData1[i].ITM_NM);
							overlapRemove1.push(chartData1[i].PRD_DE);
							divisionData1.push(Number(chartData1[i].DT)); 
						}
						if(chartData1[i].ITM_ID == "T4") {
							divisionData1.push(Number(chartData1[i].DT)); 
						}
					}
					chartVal1 = $more3DashDetail.util.division(divisionData1, 10);
					year = $more3DashDetail.util.overlapRemove(overlapRemove1);
				}
				for(let i=0; i<year.length; i++) {
					xAxisNm1 = year[i].substr(2, 2);
					xAxisNm2 = year[i].substr(5, 2);
					if(xAxisNm2 == 1) {month = "(2월)";}
					else if(xAxisNm2 == 2) {month = "(5월)";}
					else if(xAxisNm2 == 3) {month = "(8월)";}
					else if(xAxisNm2 == 4) {month = "(11월)";}
					categories1.push('`'+xAxisNm1  + '년 ' + xAxisNm2 + '/4분기</br>' + month);
				}
				
				for(let i=1; i<chartData2.length; i++) {
					// selectNm2.push(chartData2[i].C1_NM);
					chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);	
				}
				for(let i=1; i<chartData3.length; i++) {
					categories3.push(chartData3[i].C1_NM);
					chartVal3.push(Number(chartData3[i].DT));	
				}
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == "00" && chartData4[i].C2 == "00" && chartData4[i].ITM_ID == "T1") {
						// totalVal.push(Number(chartData4[i].DT));
						totalVal3.push(Number(chartData4[i].DT));
					}
					if(chartData4[i].C1 == "A" && chartData4[i].C2 == "00" && chartData4[i].ITM_ID == "T1") {
						totalVal.push(Number(chartData4[i].DT));
					}
				}
				for(let i=3; i<chartData4.length; i++) {
					if(chartData4[i].C2 == "00") {
						// totalVal.push(Number(chartData4[i].DT));
					}
					if(chartData4[i].C2 == "01") {
						// chartVal4.push([chartData4[i].C1_NM,
						// Number(chartData4[i].DT)]);
						totalVal3.push(Number(chartData4[i].DT));
					}
					if(chartData4[i].C1 == "A" && chartData4[i].C2 == "01" && chartData4[i].ITM_ID == "T1") {
						selectNm1.push(chartData4[i].C2_NM);
					}
					if(chartData4[i].C1 == "A" && chartData4[i].C2 == "02" && chartData4[i].ITM_ID == "T1") {
						selectNm1.push(chartData4[i].C2_NM);
					}
					if(chartData4[i].C2 == "01") {
						chartVal4.push(Number(chartData4[i].DT));	
					}
					/*
					 * if(chartData4[i].C2 == "02") {
					 * chartVal4_2.push(Number(chartData4[i].DT)); }
					 */
				}
				for(let i=3; i<chartData5.length; i++) {
					if(chartData5[i].C2 == "00") {
						totalVal2.push(Number(chartData5[i].DT));	
					}
					if(chartData5[i].C2 == "01") {
						categories6.push(chartData5[i].C1_NM);
						categories4.push(chartData5[i].C1_NM);
						chartVal6.push(Number(chartData5[i].DT));	
					}
					/*
					 * if(chartData5[i].C2 == "02") {
					 * chartVal6_2.push(Number(chartData5[i].DT)); }
					 */
				}
				// selectNm7.push('총계');
				console.log(selectNm1);
				// console.log(selectNm2);
				for(let i=2; i<=selectNm1.length; i++) {
					$('.tabArea6').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart6"+i+"' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
					"</figure></div></div>");
					$('.tabArea7').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart7"+i+"' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
					"</figure></div></div>");
				}
				
				console.log(selectNm7);
				selectChartData2 = chartData4;
				selectChartData6 = chartData4;
				selectChartData7 = chartData5;
				
				seriesyearData1 = [{
					name: '임금근로 일자리',
					type: 'column',
					yAxis: 1,
					data: chartVal1[0],
					dataLabels: {
						enabled: true,
						format: '{y}만개',
						align: 'center',
						style: {
							fontSize:'13px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						}
					},
				},{
					name: '증감',
					type: 'line',
					data: chartVal1[1]
				}];
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: false,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}//
					},
					colors: ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', 
							 '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE']
				}];
				seriesyearData4 = [{ // chart61
					name: '남자',
					type: 'column',
					yAxis: 1,
					data: chartVal4,
					dataLabels: {
						enabled: true,
						useHTML: true,
						formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							color:'#000'
						}
					},
					color :'#F15C80'
				}];
				seriesyearData6 = [{  // chart71
					name: '남자',
					type: 'column',
					yAxis: 1,
					data: chartVal6,
					dataLabels: {
						enabled: true,
						useHTML: true,
						/*
						 * verticalAlign: 'top', y: -20,
						 */
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개<span style="color:red">↑</span>';
							}else if(this.y < 0){
								return $more3DashDetail.util.comma(Math.abs(this.y)) + '만개<span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								return '0.0만개';
							}
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							color:'#000'
						},
					},
					color: '#F15C80',
					negativeColor: '#7CB5EC',
				}];
			}else if(tblId == "DT_1FL_7008") {
				chartType1 = {};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType3 = {};
				chartType4 = {};
				chartType6 = {};
				chartType7 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				let Industry = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal6_1 = new Array;
				let chartVal6_2 = new Array;
				let year = new Array;
				let month = new Array;
				console.log(chartData4);
				console.log(chartData5);
				console.log(chartData6);
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00") {
						if(chartData1[i].ITM_ID == "T1") {
							// legendNm1.push(chartData1[i].ITM_NM);
							overlapRemove1.push(chartData1[i].PRD_DE);
							divisionData1.push(Number(chartData1[i].DT)); 
						}
						if(chartData1[i].ITM_ID == "T4") {
							divisionData1.push(Number(chartData1[i].DT)); 
						}
					}
					chartVal1 = $more3DashDetail.util.division(divisionData1, 10);
					year = $more3DashDetail.util.overlapRemove(overlapRemove1);
				}
				for(let i=0; i<year.length; i++) {
					xAxisNm1 = year[i].substr(2, 2);
					xAxisNm2 = year[i].substr(5, 2);
					if(xAxisNm2 == 1) {month = "(2월)";}
					else if(xAxisNm2 == 2) {month = "(5월)";}
					else if(xAxisNm2 == 3) {month = "(8월)";}
					else if(xAxisNm2 == 4) {month = "(11월)";}
					categories1.push('`'+xAxisNm1  + '년 ' + xAxisNm2 + '/4분기</br>' + month);
				}
				// 2
				for(let i=1; i<chartData2.length; i++) {
					categories2.push(chartData2[i].C1_NM);
					chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);	
				}
				// 3
				for(let i=1; i<chartData3.length; i++) {
					categories3.push(chartData3[i].C1_NM);
					chartVal3.push(Number(chartData3[i].DT));	
				}
				console.log(categories3);
				console.log(chartVal2);
				// 4
				for(let i=3; i<chartData4.length; i++) { // 여기 총계데이터 넣자
					if(chartData4[i].C2 == "00") {
						categories4.push(chartData4[i].C1_NM);
						chartVal4.push(Number(chartData4[i].DT));	
					}
					
				}
				for(let i=3; i<chartData5.length; i++) {
					if(chartData5[i].C2 == "00") {
						categories6.push(chartData5[i].C1_NM);
						chartVal6.push(Number(chartData5[i].DT));	
					}
				}
				for(let i=1; i<chartData6.length; i++) {
					if(chartData6[i].C2 == "00") {
						chartVal7.push([chartData6[i].C1_NM, Number(chartData6[i].DT)]);	
					}
				}
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == "00") {
						for(let j=0; j<6; j++) {
							if(chartData4[i].C2 == j) {
								selectNm4.push(chartData4[i].C2_NM);
								selectNm5.push(chartData4[i].C2_NM);
								selectNm6.push(chartData4[i].C2_NM);
							}
						}
					}
				}
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == "00" && chartData2[i].C2 == "00" && chartData2[i].ITM_ID == "T1") {
						totalVal.push(Number(chartData2[i].DT));	
					}
				}
				for(let i=2; i<=selectNm4.length; i++) {
					$('.tabArea4').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart4"+i+"' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
										  "</figure></div></div>");
					$('.tabArea5').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart6"+i+"' style='width:1400px; height:185px; margin-left:-20px;'></div>" +
										  "</figure></div></div>");
				}
				selectChartData4 = chartData4;
				selectChartData6 = chartData5;
				selectChartData7 = chartData6;
				let test = categories3[3].substr(0, 13); // 전기 가스 증기 및 공기 조절
															// 공급업
				console.log(test+"..."); // 전기 가스 증기 및 공기...
				
				seriesyearData1 = [{
					name: '임금근로 일자리',
					type: 'column',
					yAxis: 1,
					data: chartVal1[0],
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						align: 'center',
						style: {
							fontSize:'13px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						},
						formatter: function() {
							return $more3DashDetail.util.comma(this.y) + '만개';
						},
					},
				},{
					name: '증감',
					type: 'line',
					data: chartVal1[1]
				}];
				seriesyearData2 = [{ // chart2
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: false,
						format: '<span class="d-label">{data.name}</span> : {y}',
						align: 'center',
						y: -30,
						x: -40,
						style: {fontSize: '10px'}
					},
					colors: $more3DashDetail.industryClassificationColor
				}];
				seriesyearData3 = [{
					name: '임금근로 일자리',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return this.y + '만개 증가 <span style="color:red">↑</span>';
							} else {
								return Math.abs(this.y) + '만개 감소 <span style="color:blue">↓</span>';
							}
						},
						color:'#000',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
					},
					data: chartVal3,
					color:'#F15C80',
					negativeColor: '#7CB5EC',
				}];
				seriesyearData4 = [{ // chart4
					name: '일자리 수',
					type: 'column',
					yAxis: 1,
					data: chartVal4,
					dataLabels: {
						enabled: true,
						useHTML: true,
						formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
						}
					},
					color :'#F15C80'
				}];
				seriesyearData6 = [{
					name: '증감',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0){
								return $more3DashDetail.util.comma(Math.abs(this.y)) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								return '0.0만개';
							}
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							color:'#000',
						},
					},
					data: chartVal6,
					color: '#F15C80',
					negativeColor: '#7CB5EC',
				}];
			}else if(tblId == "DT_1FL_7009") { // 123467
				// {renderTo: 'dounutChart',type: 'pie',innerSize:
				// '60%',marginTop: 5,/*style: {fontFamily: 'notoSans'}*/};
				chartType1 = {renderTo: 'horiStackedBar', type: 'bar'};
				chartType2 = {renderTo: 'horiStackedBar', type: 'bar'};
				chartType3 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType4 = {renderTo: 'horiStackedBar', type: 'bar'};
				chartType6 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType7 = {renderTo: 'horiStackedBar', type: 'bar'};
				let overlapRemove1 = new Array;
				let overlapRemove3 = new Array;
				let overlapRemove6 = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal4_3 = new Array;
				let colorsCnt1 = 0;
				let colorsCnt2 = 0;
				var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
									 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00" && chartData1[i].C2 == "00" && chartData1[i].C3 == "00" && chartData1[i].ITM_ID == "T1") {
						selectNm2.push(chartData1[i].C2_NM);
					}
				}
				for(let i=1; i<chartData2.length; i++) {
					if(chartData2[i].C1 == "00" && chartData2[i].C2 == "A" && chartData2[i].C3 == "01" && chartData2[i].ITM_ID == "T1") {
						totalVal.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == "00" && chartData2[i].C2 == "A" && chartData2[i].C3 == "02" && chartData2[i].ITM_ID == "T1") {
						totalVal2.push(Number(chartData2[i].DT));
					}
				}
				totalVal.push(totalVal2);
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "01") {
						if(chartData3[i].C2 == "A" && chartData3[i].C3 == "01" && chartData3[i].ITM_ID == "T1") {
							chartVal3.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
						if(chartData3[i].C2 == "A" && chartData3[i].C3 == "02" && chartData3[i].ITM_ID == "T1") {
							chartVal6.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
						if(chartData3[i].C1 == "01" && chartData3[i].C2 == "00" && chartData3[i].C3 == "00" && chartData3[i].ITM_ID == "T1") {
							selectNm2.push(chartData3[i].C1_NM);
						}
					}
				}
				for(let i=1; i<chartData2.length; i++) {
					if(chartData2[i].C2 != "00" && chartData2[i].C1 == "00") {
						if(chartData2[i].C3 == "00") {
							colorsCnt1 += 1;
							chartVal4_1.push({id: chartData2[i].C2, name: chartData2[i].C2_NM, value: Number(chartData2[i].DT), color: industryColor[colorsCnt1]});
						}
						if(chartData2[i].C3 == "01") {
							chartVal4_2.push({name: chartData2[i].C3_NM, value: Number(chartData2[i].DT), parent: chartData2[i].C2});
						}
						if(chartData2[i].C3 == "02") {
							chartVal4_3.push({name: chartData2[i].C3_NM, value: Number(chartData2[i].DT), parent: chartData2[i].C2});
						}
					}
				}
				for(let i=0; i<chartData5.length; i++) {
					if(chartData5[i].C1 == "02") {
						// 1번차트 여자
						if(chartData5[i].C2 == "A" && chartData5[i].C3 == "01" && chartData5[i].ITM_ID == "T1") {
							chartVal3.push([chartData5[i].C1_NM, Number(chartData5[i].DT)]);
						}
						// 1_2번차트 여자
						if(chartData5[i].C2 == "A" && chartData5[i].C3 == "02" && chartData5[i].ITM_ID == "T1") {
							chartVal6.push([chartData5[i].C1_NM, Number(chartData5[i].DT)]);
						}
						if(chartData5[i].C2 == "00" && chartData5[i].C3 == "00" && chartData5[i].ITM_ID == "T1") {
							selectNm2.push(chartData5[i].C1_NM);
						}
					}
				}
				for(let i=1; i<chartData6.length; i++) {
					if(chartData6[i].C1 == "02" && chartData6[i].C3 == "00") {
						if(chartData6[i].C2 != "00") {
							selectNm1.push(chartData6[i].C2_NM);
						}
					}
				}
				for(var i = 0; i < chartVal4_1.length; i++) {
					chartVal4.push(chartVal4_1[i], chartVal4_2[i], chartVal4_3[i]);
				}
				for(let i=2; i<=selectNm1.length; i++) {
					$('.tabArea2').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart2"+i+"' style='width:680px; height:350px'></div>" +
										  "</figure></div></div>");
					$('.tabArea2').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart3"+i+"' style='width:680px; height:350px'></div>" +
										  "</figure></div></div>");
				}
				
				for(let i=2; i<=selectNm2.length; i++) {
					$('.tabArea3').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart4"+i+"' style='width:685px; height:750px;'></div>" +
										  "</figure></div></div>");
				}
				selectChartData2 = chartData2;
				selectChartData3 = chartData2;
				
				/*
				 * categories3 =
				 * $more3DashDetail.util.overlapRemove(overlapRemove3);
				 * categories6 =
				 * $more3DashDetail.util.overlapRemove(overlapRemove6);
				 */
				
				seriesyearData3.push({
					innerSize: '80%',
					data: chartVal3,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#F15C80']
				});
				seriesyearData6.push({
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#F15C80']
				});
				console.log(chartVal4);
				seriesyearData4.push({
					type: 'treemap',
					layoutAlgorithm: 'squarified', 
					allowTraversingTree: true,
					// cropThreshold: 300,
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "ellipsis",
								// textOverflow: "width", //"ellipsis"
							},
							formatter: function() {
								let count = 0;
								let data = "";
								let num = 0;
								// console.log(this.series.data);
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 62) break;
									}
								}
								
								let totNum = num.toFixed(1);
								// console.log(totNum);
								let cutTotalData = this.point.value.toFixed(1); // 소수점
								let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
								return this.point.name +'</br><span>'+ cutTotalData +' 만개</span>';
							},
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}],
					data: chartVal4,
					colors: ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', 
							 '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE']
				});
			}else if(tblId == "DT_1FL_7010") { // 1247
				chartType1 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5,};
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				let chartVal4_3 = new Array;
				let colorCnt1 = 0;
				var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
									 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
				legendNm1 = ['지속일자리', '신규채용일자리'];
				legendNm4 = ['지속일자리', '신규채용일자리'];
				console.log(chartData1); // 1
				console.log(chartData2); // 2
				console.log(chartData3); // 4
				console.log(chartData4); // 7
				for(let i=0; i<chartData3.length; i++) {
					// c2: 산업분류, C3: 지속(01), 신규(02), C1: 연령(01, 02, 03, 04, 05)
					if(chartData3[i].C2 == "A" && chartData3[i].C3 == "01" && chartData3[i].ITM_ID == "T1") {
						if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03" || chartData3[i].C1 == "04" || chartData3[i].C1 == "05") {
							chartVal1.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
					}
					if(chartData3[i].C2 == "A" && chartData3[i].C3 == "02" && chartData3[i].ITM_ID == "T1") {
						if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03" || chartData3[i].C1 == "04" || chartData3[i].C1 == "05") {
							chartVal2.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
					}
				}
				for(let i=0; i<chartData1.length; i++) {
					if(chartData1[i].C1 == "00" && chartData1[i].C2 == "A" && chartData1[i].ITM_ID == "T1") {
						if(chartData1[i].C3 == "01") {
							totalVal.push(Number(chartData1[i].DT));
						}
						if(chartData1[i].C3 == "02") {
							totalVal2.push(Number(chartData1[i].DT));
						}
					}
					if(chartData1[i].C1 == "00" && chartData1[i].C2 != "00" && chartData1[i].ITM_ID == "T1") {
						if(chartData1[i].C3 == "00") {
							colorCnt1 += 1;
							chartVal4_1.push({id: chartData1[i].C2, name: chartData1[i].C2_NM, value: Number(chartData1[i].DT), color: industryColor[colorCnt1]});
						}	
						if(chartData1[i].C3 == "01") {
							chartVal4_2.push({name: chartData1[i].C3_NM, value: Number(chartData1[i].DT), parent: chartData1[i].C2});
						}
						if(chartData1[i].C3 == "02") {
							chartVal4_3.push({name: chartData1[i].C3_NM, value: Number(chartData1[i].DT), parent: chartData1[i].C2});
						}
					}
				}
				for(let i=0; i<chartData4.length; i++) {
					if(chartData4[i].C1 == "00" && chartData4[i].C2 != "00" && chartData4[i].C3 == "00") {
						selectNm1.push(chartData4[i].C2_NM);
					}
					if(chartData4[i].C2 == "00" && chartData4[i].C3 == "00" && chartData4[i].ITM_ID == "T1") {
						if(chartData4[i].C1 == "00" || chartData4[i].C1 == "01" || chartData4[i].C1 == "02" || chartData4[i].C1 == "03" || chartData4[i].C1 == "04" || chartData4[i].C1 == "05") {
							selectNm2.push(chartData4[i].C1_NM);
						}
					}
				}
				for(var i = 0; i < chartVal4_1.length; i++) {
					chartVal4.push(chartVal4_1[i], chartVal4_2[i], chartVal4_3[i]);
				}
				totalVal.push(totalVal2);
				seriesyearData1.push({
					innerSize: '80%',
					data: chartVal1,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#BAD3EB','#F15C80', '#FFC1D0','#F7A35C']
				});
				seriesyearData2.push({
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#BAD3EB','#F15C80', '#FFC1D0','#F7A35C']
				});
				seriesyearData4.push({ // treeMap
					type: 'treemap',
					layoutAlgorithm: 'squarified', 
					allowTraversingTree: true, 
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "ellipsis", // ellipsis width
							},
							formatter: function() {
								let count = 0;
								let data = "";
								let num = 0;
								// console.log(this.series.data);
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 62) break;
									}
								}
								
								let totNum = num.toFixed(1);
								// console.log(totNum);
								let cutTotalData = this.point.value.toFixed(1); // 소수점
								let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
								return this.point.name +'</br><span>'+ cutTotalData +' 만개</span>';
							},
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false,
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "ellipsis", // ellipsis width
							},
						},
					}],
					data: chartVal4,
					colors: ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', 
							 '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE']
				});
				selectChartData2 = chartData2;
				selectChartData4 = chartData3;
				selectChartData3 = chartData2;
				for(let i=2; i<=selectNm1.length; i++) {
					$('.tabArea1').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart1"+i+"' style='width:680px; height:350px;'></div></figure></div></div>" +
										  "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart2"+i+"' style='width:680px; height:350px;'></div></figure></div></div>");
				}
				for(let i=2; i<=selectNm2.length; i++) {
					$('.tabArea3').append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart3"+i+"' style='width:685px; height:750px;'></div></figure></div></div>");
				}
			}
			// 각차트 셀렉트창 생성
			$more3DashDetail.util.selectChart(tblId, selectNm1, selectNm2, selectNm3, selectNm4, selectNm5, selectNm6, selectNm7, selectNm2_1, selectVal, selectVal2);
			
			if(tblId == "DT_1FL_7001" || tblId == "DT_1FL_7008") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, totalVal);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, totalVal);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6, totalVal);
				if(tblId == "DT_1FL_7001") {
					$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, chartVal6);
					$more3DashDetail.chart.makeChart3(tblId, chartType3, categories3, seriesyearData3);
				}else if(tblId == "DT_1FL_7008") {
					$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal);
				}
			}else if(tblId == "DT_1FL_7002") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1, subtitleValChart1);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, totalVal2);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6);
			}else if(tblId == "DT_1FL_7003") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1, totalVal4);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, totalVal3);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, totalVal);
				$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal2);
			}else if(tblId == "DT_1FL_7004") {
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, totalVal);
				$more3DashDetail.chart.makeChart3(tblId, chartType3_bar, categories3, seriesyearData3, totalVal4);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6, totalVal2);
				$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal3);
			}else if(tblId == "DT_1FL_7005") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, totalVal4);
				$more3DashDetail.chart.makeChart3(tblId, chartType3, categories3, seriesyearData3, totalVal);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, totalVal4);
				$more3DashDetail.chart.makeChart5(tblId, chartType5, categories5, seriesyearData5, totalVal2);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6, totalVal4);
				$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal3);
			}else if(tblId == "DT_1FL_7006") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1, totalVal);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, chartValRatio2);
				$more3DashDetail.chart.makeChart3(tblId, chartType3, categories3, seriesyearData3, totalVal);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, chartValRatio4);
				$more3DashDetail.chart.makeChart5(tblId, chartType5, categories5, seriesyearData5, totalVal);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6, chartValRatio6);
				$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal);
			}
			else if(tblId == "DT_1FL_7007") {
				$more3DashDetail.chart.makeChart1(tblId, chartType1, categories1, seriesyearData1);
				$more3DashDetail.chart.makeChart2(tblId, chartType2, categories2, seriesyearData2, totalVal3);
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4, totalVal);
				$more3DashDetail.chart.makeChart6(tblId, chartType6, categories6, seriesyearData6, totalVal2);
				$more3DashDetail.chart.makeChart7(tblId, chartType7, categories7, seriesyearData7, totalVal);
			}else if(tblId == "DT_1FL_7009") {
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4);
				$more3DashDetail.chart.makeChartCombine(tblId, chartType3, categories3, seriesyearData3, seriesyearData6, totalVal);
			}else if(tblId == "DT_1FL_7010") {
				$more3DashDetail.chart.makeChart4(tblId, chartType4, categories4, seriesyearData4);
				$more3DashDetail.chart.makeChartCombine(tblId, chartType1, categories1, seriesyearData1, seriesyearData2, totalVal);
			}
			$more3DashDetail.util.horizontalScroll(tblId);
			$('.header-tag #headerSearchYear').on('change', function() {
				$more3DashDetail.util.headerSearchSelect();
			});
			
			$("select[id=selectChoice1]").change(function(){
				let selectChoiceNm1 = $("#selectChoice1 option:checked").text(); // value값
																					// 가져오기
				value = $(this).val(); // value값 가져오기
				let choice1ShowHide1 = 0;
				let choice1ShowHide2 = 1;
				if(value > 0) {
					for(let i=0; i<value; i++) {
						choice1ShowHide1 += 2; 
						choice1ShowHide2 += 2;
					}
				}
				$('.tabArea1 .tabBox').css("display", "none");
				$('.tabArea1 .tabBox').removeClass("on");
				$('.tabArea1 .tabBox:eq(' + choice1ShowHide1 + ')').css("display", "block"); // 0:01
																								// 1:23
																								// 2:45
																								// 3:67
																								// 4:89...
				$('.tabArea1 .tabBox:eq(' + choice1ShowHide1 + ')').addClass("on");
				$('.tabArea1 .tabBox:eq(' + choice1ShowHide2 + ')').css("display", "block");
				$('.tabArea1 .tabBox:eq(' + choice1ShowHide2 + ')').addClass("on");
				$more3DashDetail.chart.selectChartCreate1(chartData3, value, selectChoiceNm1, chartData1);
			});
			$("select[id=selectChoice2]").change(function(){
				let x = 0;
				let y = 0;
				let selectIndex = "";
				$('.tabArea2 .tabBox').css("display", "none");
				$('.tabArea2 .tabBox').removeClass("on");
				if(tblId == "DT_1FL_7004") {
					x = document.getElementById("selectChoice2").selectedIndex;
					y = document.getElementById("selectChoice2").options;
					selectIndex = y[x].index;
					value = $(this).val(); // value값 가져오기
					$('.tabArea2 .tabBox').css("display", "none");
					$('.tabArea2 .tabBox').removeClass("on");
					$('.tabArea2 .tabBox:eq(' + selectIndex + ')').css("display", "block");
					$('.tabArea2 .tabBox:eq(' + selectIndex + ')').addClass("on");
				}else if(tblId == "DT_1FL_7009") {
					value = $(this).val(); // value값 가져오기
					let chartShowHide1 = 0;
					let chartShowHide2 = 1;
					if(value > 0) {
						for(let i=0; i<value; i++) {
							chartShowHide1 += 2; 
							chartShowHide2 += 2;
						}
					}
					$('.tabArea2 .tabBox').css("display", "none");
					$('.tabArea2 .tabBox').removeClass("on");
					$('.tabArea2 .tabBox:eq(' + chartShowHide1 + ')').css("display", "block"); // 0:01
																								// 1:23
																								// 2:45
																								// 3:67
																								// 4:89...
					$('.tabArea2 .tabBox:eq(' + chartShowHide1 + ')').addClass("on");
					$('.tabArea2 .tabBox:eq(' + chartShowHide2 + ')').css("display", "block");
					$('.tabArea2 .tabBox:eq(' + chartShowHide2 + ')').addClass("on");
				}else if(tblId == "DT_1FL_7010") {
					value = $(this).val(); // value값 가져오기
					$('.tabArea4 .tabBox').css("display", "none");
					$('.tabArea4 .tabBox').removeClass("on");
					$('.tabArea4 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea4 .tabBox:eq(' + value + ')').addClass("on");
				}else {
					value = $(this).val(); // value값 가져오기
					$('.tabArea2 .tabBox').css("display", "none");
					$('.tabArea2 .tabBox').removeClass("on");
					$('.tabArea2 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea2 .tabBox:eq(' + value + ')').addClass("on");
				}
				
				let selectChoiceNm2 = $("#selectChoice2 option:checked").text(); // value값
																					// 가져오기
				let selectChoiceNm2_1 = $("#selectChoice2_1 option:checked").text(); // value값
																						// 가져오기
				if(tblId == "DT_1FL_7003") {
					$more3DashDetail.chart.selectChartCreate2(selectChartData2, value, selectChoiceNm2, selectChoiceNm2_1, totalVal3, chartData3);
				}else if(tblId == "DT_1FL_7007"){
					$more3DashDetail.chart.selectChartCreate2(selectChartData2, value, selectChoiceNm2, '', '', '');
				}else if(tblId == "DT_1FL_7009") {
					$more3DashDetail.chart.selectChartCreate2(selectChartData3, value, selectChoiceNm2, '', chartData3, chartData5);
				}else {
					$more3DashDetail.chart.selectChartCreate2(selectChartData2, value, selectChoiceNm2, selectChoiceNm2_1, selectVal, chartData3);
				}
			});
			$("select[id=selectChoice2_1]").change(function(){
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm2 = $("#selectChoice2 option:checked").text(); // value값
																					// 가져오기
				let selectChoiceNm2_1 = $("#selectChoice2_1 option:checked").text(); // value값
																						// 가져오기
				/*
				 * if(tblId == "DT_1FL_7010") { $('.tabArea4
				 * .tabBox').css("display", "none"); $('.tabArea4
				 * .tabBox').removeClass("on"); $('.tabArea4 .tabBox:eq(' +
				 * value + ')').css("display", "block"); $('.tabArea4
				 * .tabBox:eq(' + value + ')').addClass("on"); }else {
				 * $('.tabArea2 .tabBox').css("display", "none"); $('.tabArea2
				 * .tabBox').removeClass("on"); $('.tabArea2 .tabBox:eq(' +
				 * value + ')').css("display", "block"); $('.tabArea2
				 * .tabBox:eq(' + value + ')').addClass("on"); }
				 */
				$more3DashDetail.chart.selectChartCreate2(selectChartData2, value, selectChoiceNm2, selectChoiceNm2_1);
			});
			$("select[id=selectChoice3]").change(function(){
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm3 = $("#selectChoice3 option:checked").text(); // value값
																					// 가져오기
				$('.tabArea3 .tabBox').css("display", "none");
				$('.tabArea3 .tabBox').removeClass("on");
				$('.tabArea3 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea3 .tabBox:eq(' + value + ')').addClass("on");
				$more3DashDetail.chart.selectChartCreate3(selectChartData3, value, selectChoiceNm3, chartData4, chartData6);
			});
			$("select[id=selectChoice4]").change(function(){ // 여기하는중
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm4 = $("#selectChoice4 option:checked").text(); // value값
																					// 가져오기
				let selectChoiceNm4_1 = $("#selectChoice4_1 option:checked").text(); // value값
																						// 가져오기
				if(tblId == "DT_1FL_7010") {
					$('.tabArea5 .tabBox').css("display", "none");
					$('.tabArea5 .tabBox').removeClass("on");
					$('.tabArea5 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea5 .tabBox:eq(' + value + ')').addClass("on");
				}else {
					$('.tabArea4 .tabBox').css("display", "none");
					$('.tabArea4 .tabBox').removeClass("on");
					$('.tabArea4 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea4 .tabBox:eq(' + value + ')').addClass("on");
				} 
				$more3DashDetail.chart.selectChartCreate4(selectChartData4, value, selectNm4, selectChoiceNm4, selectChoiceNm4_1);
			});
			$("select[id=selectChoice4_1]").change(function(){ // 여기하는중
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm4 = $("#selectChoice4 option:checked").text(); // value값
																					// 가져오기
				let selectChoiceNm4_1 = $("#selectChoice4_1 option:checked").text(); // value값
																						// 가져오기
				$('.tabArea4 .tabBox').css("display", "none");
				$('.tabArea4 .tabBox').removeClass("on");
				$('.tabArea4 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea4 .tabBox:eq(' + value + ')').addClass("on");
				$more3DashDetail.chart.selectChartCreate4(selectChartData4, value, selectNm4, selectChoiceNm4, selectChoiceNm4_1);
			});
			$("select[id=selectChoice5]").change(function(){
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm5 = $("#selectChoice5 option:checked").text(); // value값
																					// 가져오기
				$('.tabArea5 .tabBox').css("display", "none");
				$('.tabArea5 .tabBox').removeClass("on");
				$('.tabArea5 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea5 .tabBox:eq(' + value + ')').addClass("on");
				$more3DashDetail.chart.selectChartCreate5(selectChartData5, value, selectNm5, selectChoiceNm5);
			});
			$("select[id=selectChoice6]").change(function(){
				let select6X = 0;
				let select6Y = 0;
				let selectIndex6 = "";
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm6 = $("#selectChoice6 option:checked").text(); // value값
																					// 가져오기
				if(tblId == 'DT_1FL_7004') {
					select6X = document.getElementById("selectChoice6").selectedIndex;
					select6Y = document.getElementById("selectChoice6").options;
					selectIndex6 = select6Y[select6X].index;
					$('.tabArea3 .tabBox').css("display", "none");
					$('.tabArea3 .tabBox').removeClass("on");
					$('.tabArea3 .tabBox:eq(' + selectIndex6 + ')').css("display", "block");
					$('.tabArea3 .tabBox:eq(' + selectIndex6 + ')').addClass("on");
				}else if(tblId == 'DT_1FL_7008') {
					$('.tabArea5 .tabBox').css("display", "none");
					$('.tabArea5 .tabBox').removeClass("on");
					$('.tabArea5 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea5 .tabBox:eq(' + value + ')').addClass("on");
				}else {
					$('.tabArea6 .tabBox').css("display", "none");
					$('.tabArea6 .tabBox').removeClass("on");
					$('.tabArea6 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea6 .tabBox:eq(' + value + ')').addClass("on");
				}
				$more3DashDetail.chart.selectChartCreate6(selectChartData6, value, selectNm5, selectChoiceNm6, selectVal2, chartData3);
			});
			$("select[id=selectChoice7]").change(function(){
				let value = $(this).val(); // value값 가져오기
				let selectChoiceNm7 = $("#selectChoice7 option:checked").text(); // value값
																					// 가져오기
				$('.tabArea7 .tabBox').css("display", "none");
				$('.tabArea7 .tabBox').removeClass("on");
				$('.tabArea7 .tabBox:eq(' + value + ')') .css("display", "block");
				$('.tabArea7 .tabBox:eq(' + value + ')').addClass("on");
				if(tblId == 'DT_1FL_7001') {
					$more3DashDetail.chart.selectChartCreate7(selectChartData7, value, selectNm7, selectChoiceNm7, chartData3);
				}else {
					$more3DashDetail.chart.selectChartCreate7(selectChartData7, value, selectNm7, selectChoiceNm7, totalVal);
				}
			});
		},
		
		/**
		 * @name : $more3DashDetail.chart.makeChart1
		 * @description : 1번차트 생성
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */
		makeChart1 : function(tblId, chartType1, categories1, seriesyearData1, totalVal) {
			console.log(tblId);
			console.log(chartType1);
			console.log(categories1);
			console.log(seriesyearData1);
			console.log(totalVal);
			
			let charts11;
			let perChange = new Array;
			let increaseDecrease = "";
			if(tblId == "DT_1FL_7001" || tblId == 'DT_1FL_7005' || tblId == 'DT_1FL_7008') {
				increaseDecrease = seriesyearData1[1].data;
				console.log(increaseDecrease);
				perChange.push(
					"없음"
					,(((increaseDecrease[1] - increaseDecrease[0]) / increaseDecrease[0]) * 100).toFixed(2)
					,(((increaseDecrease[2] - increaseDecrease[1]) / increaseDecrease[1]) * 100).toFixed(2)
					,(((increaseDecrease[3] - increaseDecrease[2]) / increaseDecrease[2]) * 100).toFixed(2)
					,(((increaseDecrease[4] - increaseDecrease[3]) / increaseDecrease[3]) * 100).toFixed(2)
					,(((increaseDecrease[5] - increaseDecrease[4]) / increaseDecrease[4]) * 100).toFixed(2)
					,(((increaseDecrease[6] - increaseDecrease[5]) / increaseDecrease[5]) * 100).toFixed(2)
					,(((increaseDecrease[7] - increaseDecrease[6]) / increaseDecrease[6]) * 100).toFixed(2)
					,(((increaseDecrease[8] - increaseDecrease[7]) / increaseDecrease[7]) * 100).toFixed(2)
					,(((increaseDecrease[9] - increaseDecrease[8]) / increaseDecrease[8]) * 100).toFixed(2)
					,(((increaseDecrease[10] - increaseDecrease[9]) / increaseDecrease[9]) * 100).toFixed(2)
					,(((increaseDecrease[11] - increaseDecrease[10]) / increaseDecrease[10]) * 100).toFixed(2)
				);
			}
			
			console.log(seriesyearData1);
			if(tblId == "DT_1FL_7001" || tblId == 'DT_1FL_7005' || tblId == 'DT_1FL_7007' || tblId == 'DT_1FL_7008') {
				charts11 = Highcharts.chart('chart11', {
					chart: chartType1,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width",
										fontFamily: $more3DashDetail.downloadFont,
									},
							    },
							    categories: categories1
							},
							series: {
								dataLabels: {
									enabled: true,
									style: {
										fontSize:'8px',
										fontWeight:'600',
										textOverflow: "width",
										color:'#000',
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width",
							}
					    },
						categories: categories1
					},
					legend: {
						enabled: true,
						margin: 20,
						y:5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								radius: 5.5
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						enabled : true,
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
						},
						formatter: function() {
							var returnFormatter;
							/*
							 * if(this.series.name == '전년 동기대비 증감' ||
							 * this.series.name == '증감') { if(this.x ==
							 * categories1[0]) { returnFormatter = '전년도 자료 없음' ;
							 * }else if(this.x == categories1[1]) {
							 * if(perChange[1] > 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[1]+'% 증가 ↑</span>';
							 * }else if(perChange[1] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[1]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[2]) { if(perChange[2] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[2]+'% 증가 ↑</span>';
							 * }else if(perChange[2] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[2]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[3]) { if(perChange[3] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[3]+'% 증가 ↑</span>';
							 * }else if(perChange[3] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[3]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[4]) { if(perChange[4] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[4]+'% 증가 ↑</span>';
							 * }else if(perChange[4] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[4]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[5]) { if(perChange[5] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[5]+'% 증가 ↑</span>';
							 * }else if(perChange[5] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[5]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[6]) { if(perChange[6] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[6]+'% 증가 ↑</span>';
							 * }else if(perChange[6] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[6]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[7]) { if(perChange[7] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[7]+'% 증가 ↑</span>';
							 * }else if(perChange[7] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[7]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[8]) { if(perChange[8] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[8]+'% 증가 ↑</span>';
							 * }else if(perChange[8] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[8]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[9]) { if(perChange[9] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[9]+'% 증가 ↑</span>';
							 * }else if(perChange[9] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[9]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[10]) { if(perChange[10] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[10]+'% 증가 ↑</span>';
							 * }else if(perChange[10] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[10]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }else
							 * if(this.x == categories1[11]) { if(perChange[11] >
							 * 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #EEFF2E; ">'+ perChange[11]+'% 증가 ↑</span>';
							 * }else if(perChange[11] < 0) { returnFormatter =
							 * '전년대비</br>' +'<span style="color: #7CB5EC;
							 * ">'+ perChange[11]+'% 감소 ↓</span>'; }else
							 * if(tooltip1 == 0) { returnFormatter = '전년대비</br>' +'<span
							 * style="color: #F15C80; ">변동없음</span>'; } }
							 * return returnFormatter; }else
							 */
							if(this.series.name == '증감') {
								return this.series.name + '</br><span style="color:#EEFF2E">' + $more3DashDetail.util.comma(increaseDecrease[this.point.index]) + ' 만개</span>';
							}else if(this.series.name == '임금근로 일자리') {
								let thisY = $more3DashDetail.util.comma(this.y);
								return this.series.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
							}
						},
					},
					series: seriesyearData1
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea1 .chartbox').length; i++){
						if($('.tabArea1 .chartbox div').attr('id') == 'chart11'){charts11.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7003") {
				let totNum = new Array;
				let totComma = 0;
				for(let i=1; i<totalVal.length; i++) {
					totNum.push(totalVal[i]);
				}
				totComma = Number(totalVal[0].toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				charts11 = Highcharts.chart('chart11', {
					chart: chartType1,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+totComma+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 24,
									fontFamily: 'sans-serif',
								}
							},
							legend: {
								enabled: true,
								width: 200,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: 30,
								y: -8,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
								itemHoverStyle: {
									color: '#FF0000',
								},
								labelFormatter: function() {
									let thisY = totNum[this.index].toFixed(1);
									let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									return this.name + ' ('+commaY+'만개)';
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+totComma+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -95,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
						},
						categories: categories1
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 30,
						y: -12,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = totNum[this.index].toFixed(1);
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.name + ' ('+commaY+'만개)';
						}
					},
					plotOptions: {
						pie: {
							size: '85%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = totNum[this.point.index].toFixed(1); // 3번
																				// 툴팁
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
							
							// return this.point.name + '</br><span
							// style="color:#EEFF2E">' + this.y + ' %</span>';
						},
					},
					series: seriesyearData1
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea1 .chartbox').length; i++){
						if($('.tabArea1 .chartbox div').attr('id') == 'chart11'){charts11.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				let subtitleVal = 0;
				console.log(totalVal);
				subtitleVal = $more3DashDetail.util.comma(Number(totalVal[0]));

				charts11 = Highcharts.chart('chart11', {
					chart: chartType1,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -85,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: 0,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -85,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: categories1
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData1
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea1 .chartbox').length; i++){
						if($('.tabArea1 .chartbox div').attr('id') == 'chart11'){charts11.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7002') {
				let totNum = new Array;
				let subtitle = 0;
				for(let i=1; i<totalVal.length; i++) {
					totNum.push(totalVal[i]);
				}
				subtitle = $more3DashDetail.util.comma(totalVal[0]);
				charts11 = Highcharts.chart('chart11', {
					chart: chartType1,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						// sourceWidth: 400,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 18px">'+subtitle+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 27,
									fontFamily: 'sans-serif',	
								}
							},
							legend: {
								enabled: true,
								width: 400,
								itemWidth: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 1,
								itemDistance : 3,
								x: 70,
								itemStyle: {
									textOverflow: "width",
									fontSize :'10px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: 'sans-serif',	
								},
								labelFormatter: function() {
									let thisY = totNum[this.index];
									for(let i=0; i<this.series.data.length; i++) {
										return this.name + '</br>(' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+totalVal[0].toFixed(1)+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-176,
						y:10,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: categories1
					},
					legend: {
						enabled: true,
						width: 400,
						itemWidth: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 5,
						itemDistance : 20,
						x: 70,
						y:-5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = totNum[this.index];
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '83%', 
							showInLegend: true
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600', lineHeight:1.2},
						formatter: function() {
							let thisY = totNum [this.point.index].toFixed(1); // this.y.toFixed(1)
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
							// return this.point.name + '</br><span
							// style="color:#EEFF2E">' + this.y + ' %</span>';
						},
					},
					series: seriesyearData1
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea1 .chartbox').length; i++){
						if($('.tabArea1 .chartbox div').attr('id') == 'chart11'){charts11.exportChart();}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart2
		 * @description : 2번차트 생성
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */
		makeChart2 : function(tblId, chartType2, categories2, seriesyearData2, chartVal) {
			let charts21 = '';
			let totNum = new Array;
			let legendTotComma = 0;
			let subtitleTotComma = 0;
			
			let subtitleX = 0;
			let subtitleY = 0;
			let pieSize = 0;
			/*
			 * Highcharts.setOptions({ colors: ['#7CB5EC', '#F15C80', '#90ED7D',
			 * '#F7A35C'], });
			 */
			if(tblId == "DT_1FL_7001") {
				subtitleY = 5;
				pieSize = '88%';
			}else if(tblId == "DT_1FL_7003") {
				subtitleY = 10;
				pieSize = '97%';
			}
			if(tblId == "DT_1FL_7001" || tblId == "DT_1FL_7003") {
				for(let i = 1; i<chartVal.length; i++) {
					totNum.push(chartVal[i]);
				}
				subtitleTotComma = $more3DashDetail.util.comma(chartVal[0]);
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						// sourceWidth: 400,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleTotComma+' 만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x:-410,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 24,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								width: 850,
								itemWidth: 200,
								verticalAlign: 'middle',
								align: 'right',
								// itemMarginTop: 0.5,
								x: 45,
								itemDistance : 0.2,
								itemStyle: {
									textOverflow: "ellipsis", // ellipsis
																// width
									fontSize :'9px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '500',
									fontFamily: $more3DashDetail.downloadFont,
								},
								labelFormatter: function() {
									let thisY = totNum[this.index].toFixed(1);
									let thisName = "";
									if(this.name.length > 22){
										thisName = this.name.substring(0, 23) + " ...";
									} else {
										thisName = this.name;
									}
									for(let i=0; i<this.series.data.length; i++) {
										return thisName + ' </br>- (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleTotComma+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-402,
						y:subtitleY,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 900,
						itemWidth: 200,
						verticalAlign: 'middle',
						align: 'right',
						/* itemMarginBottom: 0.5, */
						x: 115,
						y: -5,
						itemDistance : 2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = totNum[this.index].toFixed(1);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: pieSize, 
							showInLegend: true, 
							colors: Highcharts.setOptions.colors,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							// let thisY = totNum[this.index].toFixed(1);
							let thisY = totNum[this.point.index].toFixed(1); // this.y.toFixed(1)
							let commaY = $more3DashDetail.util.comma(thisY);
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7004") {
				let totNum = new Array;
				console.log(seriesyearData2);
				for(let i=1; i<chartVal.length; i++) {
					totNum.push(chartVal[i]);
				}
				// chartVal
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+chartVal[0].toFixed(1)+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -100,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 22px">'+chartVal[0].toFixed(1)+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '16px',
							fontWeight:'bold',
							lineHeight: 28,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = totNum[this.index];
							for(let i=0; i<this.series.data.length; i++) {
								if(this.name == '소멸일자리') {
									this.color = '#cccccc';
									this.legendItem.styles.color = '#cccccc';
									this.legendItem.styles.fill = '#cccccc';
									this.visible = false;
								} 
								return this.name + ' ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '85%', 
							showInLegend: true, 
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = $more3DashDetail.util.comma(thisY);
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
				// $('.highcharts-legend.highcharts-no-tooltip >
				// .highcharts-legend-item.highcharts-pie-series.highcharts-color-3').css('color','#cccccc');
			}else if(tblId == "DT_1FL_7005") {
				let comma = 0;
				let subtitleVal = 0;
				for(let i=0; i<seriesyearData2[0].data.length; i++) {
					comma += seriesyearData2[0].data[i][1];
				}
				subtitleVal = $more3DashDetail.util.comma(Number(chartVal));
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size:16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -65,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 24,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 80,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,
								y: -10,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -65,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 40,
						y: -10,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
							/*
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + '(' +
							 * this.percentage.toFixed(1) + '%)'; }
							 */
						}
					},
					plotOptions: {
						pie: {
							size: '80%', 
							showInLegend: true, 
							colors: Highcharts.setOptions.colors,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7002") {
				charts21 = Highcharts.chart('chart41', {
					chart: chartType2,
					credits: {enabled: false,},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories2
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
						},
						categories: categories2
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: false,
						useHTML: false,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						// valueSuffix: '만개',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							let thisY = "";
							let returnVal = "";
							if(tblId == "DT_1FL_7007" || tblId == "DT_1FL_7008") {
								thisY = chartVal[this.point.index];
								if(thisY > 0) {
									returnVal =  this.x + '</br><span style="color:#EEFF2E">' + thisY + ' 만개 증가</span>';
								}else if(thisY < 0) {
									returnVal =  this.x + '</br><span style="color:#7CB5EC">' + thisY + ' 만개 감소</span>';
								}else if(thisY == 0) {
									returnVal =  this.x + '</br><span style="color:#F15C80">변동없음</span>';
								}
								return returnVal;
							}/*
								 * else if(tblId == "DT_1FL_7002") { thisY =
								 * this.y; returnVal = this.x + '</br><span
								 * style="color:#EEFF2E">총계 ' +
								 * chartVal[this.point.index] + ' 만개</span>'; }
								 */
							return returnVal;
							// let commaY =
							// thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
							// ",");
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7008") {
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 18px">'+$more3DashDetail.util.comma(Number(chartVal[0]))+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -460,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 900,
								itemWidth: 200,
								verticalAlign: 'middle',
								align: 'right',
								// itemMarginTop: 0.5,
								x: 0,
								itemDistance : 2,
								itemStyle: {
									textOverflow: "width",
									fontSize :'9px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
								labelFormatter: function() {
									let thisY = $more3DashDetail.util.comma(this.y);
									let thisName = "";
									if(this.name.length > 22){
										thisName = this.name.substring(0, 23) + " ...";
									} else {
										thisName = this.name;
									}
									for(let i=0; i<this.series.data.length; i++) {
										return thisName + ' </br>- (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
									}
								}
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+chartVal[0]+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -435,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 900,
						itemWidth: 200,
						verticalAlign: 'middle',
						align: 'right',
						// itemMarginTop: 0.5,
						x: 45,
						itemDistance : 0.2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = this.y.toFixed(1);
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+commaY+'만개)';
							}

						}
					},
					plotOptions: {
						pie: {
							size: '95%',
							showInLegend: true,
							/*
							 * startAngle: -90, endAngle: 90,
							 */
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '12px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						itemMarginTop: 0,
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// // false)
						enabled: false,				
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						// valueSuffix: '만개',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							/*
							 * let value1 = chartVal[0]; let value2 =
							 * chartVal[1]; if(this.series.name == '지속일자리') {
							 * return this.series.name + '(구성비)</br><span
							 * style="color:#EEFF2E">' +
							 * value1[this.point.index] + ' %</span>'; }else
							 * if(this.series.name == '신규채용일자리') { return
							 * this.series.name + '(구성비)</br><span
							 * style="color:#EEFF2E">' +
							 * value2[this.point.index] + ' %</span>'; }
							 */
							let thisY = chartVal[this.point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
							
							/*
							 * if(this.series.name == '지속일자리' ||
							 * this.series.name == '신규채용일자리') { return
							 * this.series.name + '</br><span
							 * style="color:#EEFF2E">' + commaY + ' 만개</span>';
							 * }else if(this.series.name == '지속일자리(구성비)' ||
							 * this.series.name == '신규채용일자리(구성비)') { return
							 * this.series.name + '</br><span
							 * style="color:#EEFF2E">' + commaY + ' %</span>'; }
							 */
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7007") {
				let legendVal = new Array;
				let subtitleVal = 0;
				subtitleVal = chartVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				
				charts21 = Highcharts.chart('chart21', {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 18px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -460,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 900,
								itemWidth: 200,
								verticalAlign: 'middle',
								align: 'right',
								// itemMarginTop: 0.5,
								x: 0,
								itemDistance : 2,
								itemStyle: {
									textOverflow: "width",
									fontSize :'9px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
								labelFormatter: function() {
									let thisY = $more3DashDetail.util.comma(this.y);
									let thisName = "";
									if(this.name.length > 22){
										thisName = this.name.substring(0, 23) + " ...";
									} else {
										thisName = this.name;
									}
									for(let i=0; i<this.series.data.length; i++) {
										return thisName + ' </br>- (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
									}
								}
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -435,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 900,
						itemWidth: 200,
						verticalAlign: 'middle',
						align: 'right',
						// itemMarginTop: 0.5,
						x: 45,
						itemDistance : 0.2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '95%',
							showInLegend: true,
							/*
							 * startAngle: -90, endAngle: 90,
							 */
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart3
		 * @description : 3번차트 생성
		 * @date : 2022.10.20
		 * @author : 조규환
		 * @history :
		 */
		makeChart3 : function(tblId, chartType3, categories3, seriesyearData3, totalVal) {
			let charts31;
			if(tblId == "DT_1FL_7005") {
				charts31 = Highcharts.chart('chart31', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										letterSpacing: '0px',
										textOverflow: "ellipsis",
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								letterSpacing: '0px',
								textOverflow: "ellipsis",
							}
					},
						categories: categories3
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						enabled : true,
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							if(tblId == "DT_1FL_7005") {
								return this.x + '</br><span style="color:#EEFF2E">총계 ' + $more3DashDetail.util.comma(totalVal[this.point.index]) + ' 만개</span>';
								return this.x + '</br><span style="color:#EEFF2E">' + totalVal[this.point.index] + ' 만개</span>';
							}else {
								return this.x + '</br><span style="color:#EEFF2E">' + $more3DashDetail.util.comma(this.y) + ' 만개</span>';
							}
						},
					},
					series: seriesyearData3
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart31'){charts31.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7004") {
				// totalVal
				charts31 = Highcharts.chart('chart41', {
					chart : chartType3, /*
										 * { renderTo: 'horiStackedBar',
										 * type:'bar',//가로 column 지정은 "column"이
										 * 아닌"bar" style: {
										 * fontFamily:'notoSans', } },
										 */
					credits: {enabled: false}, // highchart 워터마크 숨김처리
					exporting : {
						enabled : false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									},
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,						
						itemMarginBottom: 8,
						verticalAlign: 'top',
						align: 'center',
						layout: 'horizontal',
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: {
						categories: categories3,						
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								width:'70px',
								fontSize:'12px',
								fontWeight: 'bold',
								letterSpacing: '0px',
								textOverflow: "width",
							},
						},
						lineColor: '#cfcfcf',
						gridLineWidth: 0,
						tickWidth: 0,
						tickColor: '#cfcfcf',
						tickPosition: 'inside'
					},
					yAxis: [{
						// y axis 왼쪽
						title: {
							text: ''
						},
						labels: { enabled: false },
						gridLineWidth: 0
					}],
					plotOptions: {
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:10,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
						},
						formatter: function() {
							return this.points[0].x + '</br><span style="color:#EEFF2E">총계 ' + totalVal[this.points[0].point.index] + ' 만개</span>';
							/*
							 * var s = ''; $.each(this.points, function(i,
							 * point) { s += point.series.name + ' <span
							 * style="color:#EEFF2E">' + point.y + ' 만개</span></br>';
							 * }); return s;
							 */
						},
						shared: true
					},
					series: seriesyearData3 
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts31.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				let comma = 0;
				let subtitleVal = 0;
				subtitleVal = $more3DashDetail.util.comma(Number(totalVal[0]));

				charts31 = Highcharts.chart('chart31', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -85,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -85,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories3
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%',
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData3
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart31'){charts31.exportChart();}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart4
		 * @description : 4번차트 생성
		 * @date : 2022.10.20
		 * @author : 조규환
		 * @history :
		 */
		makeChart4 : function(tblId, chartType4, categories4, seriesyearData4, chartValRatio4) {
			/*
			 * Highcharts.setOptions({ //Highcharts.setOptions.colors colors:
			 * ['#7CB5EC', '#F15C80', '#F7A35C'], //지속대체신규 });
			 */
			let charts41;
			if(tblId == "DT_1FL_7001") {
				let tooltipVal = new Array;
				for(let i=1; i<chartValRatio4.length; i++) {
					tooltipVal.push(chartValRatio4[i]);
				}
				charts41 = Highcharts.chart('chart41', {
					chart: chartType4,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceWidth: 2500,
						chartOptions: {
							xAxis: {
								// height: 10,
								margin: 10,
								labels: {
									rotation: -45,
									style: {
										color: '#494949', 
										fontSize: '14px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories4
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {	
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
					    },
						categories: categories4
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// // false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600', lineHeight:1.2},
						formatter: function() {
							let commaY = tooltipVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.category + '</br><span style="color:#EEFF2E">' + tooltipVal[this.point.index].toFixed(1) + ' 만개</span>';
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7002") {
				let totNum = 0;
				let subtitle = 0;
				console.log(chartValRatio4);
				for(let i=1; i<chartValRatio4.length; i++) {
					totNum += chartValRatio4[i];
				}
				subtitle = $more3DashDetail.util.comma(chartValRatio4[0]);
				charts21 = Highcharts.chart('chart21', {
					chart: chartType4,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitle+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x:-386,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 24,
									fontFamily: 'sans-serif',
								}
							},
							legend: {
								enabled: true,
								width: 800,//
								itemWidth: 180,//
								verticalAlign: 'middle',
								align: 'right',
								// itemMarginTop: 1,
								itemDistance : 0.2, //
								x: 45,
								y: -10,
								itemStyle: {
									textOverflow: "width",
									fontSize :'9px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
								labelFormatter: function() {
									let thisY = chartValRatio4[this.index];
									for(let i=0; i<this.series.data.length; i++) {
										return this.name + '</br>(' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+(Math.floor(totNum*10)/10)+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-386,
						y:10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories4
					},
					legend: {
						enabled: true,
						width: 900,//
						itemWidth: 200,//
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 5,
						itemDistance : 20, //
						x: 145,//
						y: -5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = chartValRatio4[this.index];
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + this.percentage.toFixed(1) + '%) ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {size: '85%', showInLegend: true}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							let thisY = chartValRatio4[this.point.index].toFixed(1); // this.y.toFixed(1)
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
							// return '<span style="color:#fff">' +
							// this.point.name + '</span> : ' + this.y + '만개';
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts21.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7003") {
				charts41 = Highcharts.chart('chart41', {
					chart : chartType4, /*
										 * { renderTo: 'horiStackedBar',
										 * type:'bar',//가로 column 지정은 "column"이
										 * 아닌 "bar" style: {
										 * fontFamily:'notoSans', } },
										 */
					credits: {enabled: false}, // highchart 워터마크 숨김처리
					exporting : {
						enabled : false,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'12px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						width: 120,
						verticalAlign: 'middle',
						align: 'left',
						itemMarginTop: 8,
						x:-20,
						y:-8,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: {
						categories: categories4,
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
								// letterSpacing: '0px',
							},
						},
					},
					yAxis: [{
						// y axis 왼쪽
						title: {
							text: ''
						},
						lineColor: '#E8E8E8',
						labels: {
							enabled: false
						},
						// crop: false,
						stackLabels: {
							/*
							 * overflow: 'allow', crop: false,
							 */
							enabled: true,// stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							format: '{total}',
							style: {
								fontSize: '10px',
								fontWeight: '600',
								color:'#000'
							}
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*
							 * borderRadiusTopLeft: 8, borderRadiusTopRight: 8
							 */
						},
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
						column:{
							pointPadding: 0.25
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							return this.points[0].x + '</br><span style="color:#EEFF2E"> ' + chartValRatio4[this.points[0].point.index] + ' 만개</span>';
							/*
							 * var s = ''; $.each(this.points, function(i,
							 * point) { s += point.series.name + ' <span
							 * style="color:#EEFF2E">' + point.y + ' 만개</span></br>';
							 * }); return s;
							 */
						},
						shared: true
					},
					series: seriesyearData4 
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7005") {
				let comma = 0;
				let subtitleVal = 0;
				subtitleVal = $more3DashDetail.util.comma(Number(chartValRatio4));
				charts41 = Highcharts.chart('chart41', {
					chart: chartType4,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -87,
								y: 7,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 160,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: 0,
								y: -10,
								itemStyle: {
									textOverflow: "ellipsis",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -90,
						y: 7,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories4
					},
					legend: {
						enabled: true,
						width: 160,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						y: -10,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '80%',
							showInLegend: true,
							/*
							 * startAngle: -90, endAngle: 90,
							 */
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 10,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600'},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				charts41 = Highcharts.chart('chart41', {
					chart: chartType4,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '12px', fontWeight: 'bold'}},
						categories: categories4
					},
					legend: {
						enabled: true,
						itemMarginTop: -10,
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
						enabled: false,			// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						// valueSuffix: '만개',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let value1 = $more3DashDetail.util.comma(Number(chartValRatio4[0]));
							let value2 = $more3DashDetail.util.comma(Number(chartValRatio4[1]));
							if(this.series.name == '지속일자리') {
								return this.series.name + '(구성비)</br><span style="color:#EEFF2E">' + value1[this.point.index] + ' %</span>';
							}else if(this.series.name == '신규채용일자리') {
								return this.series.name + '(구성비)</br><span style="color:#EEFF2E">' + value2[this.point.index] + ' %</span>';
							}
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7007" || tblId == "DT_1FL_7008") {
				let charts = "";
				let pointWidth = 0;
				let legendEnabled = "";
				let tooltipEnabled = "";
				if(tblId == "DT_1FL_7007") {
					charts = "chart61";
					pointWidth = 14;
					legendEnabled = false;
					tooltipEnabled = false;
				}else if(tblId == "DT_1FL_7008") {
					charts = "chart41";
					pointWidth = 22;
					legendEnabled = false;
					tooltipEnabled = false;
				}
				charts41 = Highcharts.chart(charts, {
					chart: chartType4,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight : 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: 'width'
							}
						},
						categories: categories4
					},
					legend: {
						enabled: legendEnabled,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-10,
						y:-10,
						itemMarginTop: 8,
						itemHoverStyle: {color: '#FF0000',},
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						}
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: tooltipEnabled,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							return this.series.name + '</br><span style="color:#EEFF2E">총계 ' + chartValRatio4[this.point.index] + '만개</span>';
							/*
							 * let thisY = this.y; let commaY =
							 * thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
							 * ","); return this.x + '</br><span
							 * style="color:#EEFF2E">' + commaY + ' 만개</span>';
							 */
						},
					},
					series: seriesyearData4
				});
				if(tblId == "DT_1FL_7007") {
					$('#chartBtn5').off('click');
					$('#chartBtn5').click(function(){
						for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
							if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts41.exportChart();}
						}
					});
				}else if(tblId == "DT_1FL_7008") {
					$('#chartBtn4').off('click');
					$('#chartBtn4').click(function(){
						for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
							if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
						}
					});
				}
			}else if(tblId == "DT_1FL_7009") {
				charts41 = Highcharts.chart('chart41', {
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										fontWeight: 'bold',
										fontSize: '12px',
										textOverflow: "ellipsis",
										fontFamily: $more3DashDetail.downloadFont,
									},
								},
							},
						}
					},
					legend: {enabled: false},
					/*
					 * colorAxis: { minColor: '#DEEFFF', maxColor: '#007DF6' },
					 */
					title: {text: ''},
					tooltip:{
						// valueSuffix: "",
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { // durl
							let count = 0;
							let data = "";
							let num = 0;
							// console.log(this.series.data);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 63) {
									num += this.series.data[count].value;
									count += 1;
									if(count == 62) break;
								}
							}
							
							let totNum = num.toFixed(1);
							// console.log(totNum);
							let cutTotalData = this.point.value.toFixed(1); // 소수점
							let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
							return this.point.name +'<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData4
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart41'){charts41.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7010") {
				charts41 = Highcharts.chart('chart31', {
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										fontWeight: 'bold',
										fontSize: '12px',
										textOverflow: "ellipsis",
										fontFamily: $more3DashDetail.downloadFont,
									},
								},
							},
						}
					},
					legend: {enabled: false},
					/*
					 * colorAxis: { minColor: '#DEEFFF', maxColor: '#007DF6' },
					 */
					title: {text: ''},
					tooltip:{
						// valueSuffix: "",
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { // durl
							let count = 0;
							let data = "";
							let num = 0;
							// console.log(this.series.data);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 63) {
									num += this.series.data[count].value;
									count += 1;
									if(count == 62) break;
								}
							}
							
							let totNum = num.toFixed(1);
							// console.log(totNum);
							let cutTotalData = this.point.value.toFixed(1); // 소수점
							let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
							return this.point.name +'<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData4
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart31'){charts41.exportChart();}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart5
		 * @description : 5번차트 생성
		 * @date : 2022.10.20
		 * @author : 조규환
		 * @history :
		 */
		makeChart5 : function(tblId, chartType5, categories5, seriesyearData5, totalVal) {
			let charts5 = "";
			if(tblId == "DT_1FL_7005") {
				charts5 = Highcharts.chart('chart51', {
					chart: chartType5,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '12px', fontWeight: 'bold'}},
						categories: categories5
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						// valueSuffix: '만개',
						shadow: false,
						padding: 10,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600'},
						formatter: function() {
							let commaY = $more3DashDetail.util.comma(totalVal[this.point.index]);
							return this.x + '</br><span style="color:#EEFF2E">총계 ' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData5
				});
				$('#chartBtn7').off('click');
				$('#chartBtn7').click(function(){
					for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
						if($('.tabArea5 .chartbox div').attr('id') == 'chart51'){charts5.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				let comma = 0;
				let subtitleVal = 0;
				console.log(totalVal);
				subtitleVal = $more3DashDetail.util.comma(Number(totalVal[0]));

				charts5 = Highcharts.chart('chart51', {
					chart: chartType5,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -110,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								enabled: true,
								width: 170,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,    
								y:-8,
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories5
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,    
						y:-8,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '80%',
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData5
				});
			}
			$('#chartBtn7').off('click');
			$('#chartBtn7').click(function(){
				for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
					if($('.tabArea5 .chartbox div').attr('id') == 'chart51'){charts5.exportChart();}
				}
			});
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart6
		 * @description : 6번차트 생성
		 * @date : 2022.10.20
		 * @author : 조규환
		 * @history :
		 */
		makeChart6 : function(tblId, chartType6, categories6, seriesyearData6, chartValRatio6) {
			let charts6;
			if(tblId == "DT_1FL_7001") {
				charts6 = Highcharts.chart('chart61', {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories6
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
						},
						categories: categories6,
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// // false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600', lineHeight:1.2},
						formatter: function() {
							// return this.series.name + '</br><span
							// style="color:#EEFF2E">총계 ' + chartValRatio6[0] +
							// ' 만개</span>';
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
						if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7002") {
				charts6 = Highcharts.chart('chart61', {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}						
						},
						categories: categories6
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// // false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600', lineHeight:1.2},
						formatter: function() {
							thisY = chartValRatio6[this.point.index];
							if(thisY > 0) {
								returnVal =  this.x + '</br><span style="color:#EEFF2E">' + thisY + ' 만개 증가</span>';
							}else if(thisY < 0) {
								returnVal =  this.x + '</br><span style="color:#7CB5EC">' + thisY + ' 만개 감소</span>';
							}else if(thisY == 0) {
								returnVal =  this.x + '</br><span style="color:#F15C80">변동없음</span>';
							}
							return returnVal;
							/*
							 * let thisY = this.y; let commaY =
							 * thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
							 * ","); return this.x + '</br><span
							 * style="color:#EEFF2E">' + commaY + ' 만개</span>';
							 */
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
						if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7004") {
				let totNum = new Array;
				for(let i=1; i<chartValRatio6.length; i++) {
					totNum.push(chartValRatio6[i]);
				}
				
				charts6 = Highcharts.chart('chart31', {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								align: 'center',
								verticalAlign: 'middle',
								x: -100,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 22px">'+chartValRatio6[0].toFixed(1)+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '16px',
							fontWeight:'bold',
							lineHeight: 28,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories6
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = totNum[this.index];
							for(let i=0; i<this.series.data.length; i++) {
								if(this.name == '소멸일자리') {
									this.color = '#cccccc';
									this.legendItem.styles.color = '#cccccc';
									this.legendItem.styles.fill = '#cccccc';
									this.visible = false;
								} 
								return this.name + ' ('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '85%',
							showInLegend: true,
							/*
							 * point: { events: { legendItemClick: function () {
							 * return false; }, } },
							 */
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight: 1.2,
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart3'+i){charts6.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7005") {
				let comma = 0;
				let subtitleVal = 0;
				/*
				 * for(let i=0; i<seriesyearData6[0].data.length; i++) { comma +=
				 * seriesyearData6[0].data[i][1]; }
				 */
				subtitleVal = $more3DashDetail.util.comma(Number(chartValRatio6));
				charts6 = Highcharts.chart('chart61', {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -132,
								y: 7,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 210,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -40,
								y: -10,
								itemStyle: {
									textOverflow: "ellipsis",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontSize:'14px',
										fontWeight:'600',
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -90,
						y: 7,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories6
					},
					legend: {
						enabled: true,
						width: 210,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 45,
						y: -10,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '80%',
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600'},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
						if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				charts6 = Highcharts.chart('chart61', {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '12px', fontWeight: 'bold'}},
						categories: categories6
					},
					legend: {
						enabled: true,
						itemMarginTop: -10,
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
						enabled: false,			// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						// valueSuffix: '만개',
						shadow: false,
						padding: 10,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600'},
						formatter: function() {
							let value1 = chartValRatio6[0];
							let value2 = chartValRatio6[1];
							if(this.series.name == '지속일자리') {
								return this.series.name + '(구성비)</br><span style="color:#EEFF2E">' + value1[this.point.index] + ' %</span>';
							}else if(this.series.name == '신규채용일자리') {
								return this.series.name + '(구성비)</br><span style="color:#EEFF2E">' + value2[this.point.index] + ' %</span>';
							}
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
						if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7007" || tblId == "DT_1FL_7008") {
				let chart = "";
				let pointWidth = 0;
				let tooltipEnabled = "";
				if(tblId == "DT_1FL_7007") {
					chart = "chart71";
					pointWidth = 14;
					tooltipEnabled = true;
				}else if(tblId == "DT_1FL_7008") {
					chart = "chart61";
					pointWidth = 22;
					tooltipEnabled = false;
				}
				// chartValRatio6
				charts6 = Highcharts.chart(chart, {
					chart: chartType6,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight : 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: 'width'
							}
						},
						categories: categories6
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: tooltipEnabled,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							return this.series.name + '</br><span style="color:#EEFF2E">총계 ' + chartValRatio6[this.point.index] + '만개</span>';
							// return this.x + '</br><span
							// style="color:#EEFF2E">' + this.y + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				if(tblId == "DT_1FL_7007") {
					$('#chartBtn6').off('click');
					$('#chartBtn6').click(function(){
						for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
							if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts6.exportChart();}
						}
					});
				}else if(tblId == "DT_1FL_7008") {
					$('#chartBtn7').off('click');
					$('#chartBtn7').click(function(){
						for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
							if($('.tabArea5 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
						}
					});
				}
			}
		},
		/**
		 * @name : $more3DashDetail.chart.makeChart7
		 * @description : 7번차트 생성
		 * @date : 2022.10.20
		 * @author : 조규환
		 * @history :
		 */
		makeChart7 : function(tblId, chartType7, categories7, seriesyearData7, totalVal) {
			console.log(seriesyearData7);
			let charts7;
			if(tblId == "DT_1FL_7001" || tblId == "DT_1FL_7005") {
				charts7 = Highcharts.chart('chart71', {
					chart: chartType7,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
							    },
								categories: categories7
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
					    },
						categories: categories7
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600', lineHeight:1.2},
						formatter: function() {
								let commaY = $more3DashDetail.util.comma(totalVal[this.point.index]);
								return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData7
				});
				$('#chartBtn6').off('click');
				$('#chartBtn6').click(function(){
					for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
						if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts7.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7003" || tblId == "DT_1FL_7004") {
				let stacking = "";
				let width = ''; // 100
				let itemMarginBottom = ''; // 5
				let verticalAlign = ''; // middle
				let align = ''; // left
				
				if(tblId == "DT_1FL_7003") {
					stacking = "";
					width = ''; // 100
					itemMarginBottom = -15; // 5
					verticalAlign = 'bottom'; // middle
					align = 'center'; // left
				}else if(tblId == "DT_1FL_7004") {
					stacking = "";
					width = 100; // 100
					itemMarginBottom = 8; // 5
					verticalAlign = 'middle'; // middle
					align = 'left'; // left
				}
				charts7 = Highcharts.chart('chart71', {
					chart : chartType7,
					credits: {enabled: false}, // highchart 워터마크 숨김처리
					exporting : {
						enabled : false,
						chartOptions: {
							xAxis: {
								labels: {
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories7
							},
							series: {
								dataLabels: {
									style: {
										allowOverlap: true,
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							},
							legend: {
								itemStyle: {
									textOverflow: "ellipsis",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
						}
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						width: width, // 100
						itemMarginBottom: itemMarginBottom, // 5
						verticalAlign: verticalAlign, // middle
						align: align, // left
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: {
						categories: categories7,
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
								letterSpacing: '0px',
							},
						},
						lineColor: '#cfcfcf',
						gridLineWidth: 0,
						tickWidth: 0,
						tickColor: '#cfcfcf',
						tickPosition: 'inside'
					},
					yAxis: [{
						// y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						// crop: false,
						stackLabels: {
							/*
							 * overflow: 'allow', crop: false,
							 */
							enabled: true,// stacked bar 필수 설정 옵션.
							x:0,
							y:0,
							format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							}
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: stacking,// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*
							 * borderRadiusTopLeft: 8, borderRadiusTopRight: 8
							 */
						},
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							return this.points[0].x + '</br><span style="color:#EEFF2E">' + totalVal[this.points[0].point.index] + ' 만개</span>';
							/*
							 * var s = ''; $.each(this.points, function(i,
							 * point) { s += point.series.name + ' <span
							 * style="color:#EEFF2E">' + point.y + ' 만개</span></br>';
							 * }); return s;
							 */
						},
						shared: true
					},
					series: seriesyearData7 
				});
				$('#chartBtn6').off('click');
				$('#chartBtn6').click(function(){
					for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
						if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts7.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7006") {
				let comma = 0;
				let subtitleVal = 0;
				subtitleVal = totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

				charts7 = Highcharts.chart('chart71', {
					chart: chartType7,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -120,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								enabled: true,
								width: 220,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: 0,
								y: -8,
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories7
					},
					legend: {
						enabled: true,
						width: 220,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						y: -8,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '80%',
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData7
				});
				$('#chartBtn6').off('click');
				$('#chartBtn6').click(function(){
					for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
						if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts7.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7009" || tblId == "DT_1FL_7010") {
				charts7 = Highcharts.chart('chart71', {
					credits: {
						enabled: false
					},
					exporting: {
						enabled: false
					},
					legend: {enabled: false},
					/*
					 * colorAxis: { minColor: '#DEEFFF', maxColor: '#007DF6' },
					 */
					title: {text: ''},
					tooltip:{
						// valueSuffix: "",
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { // durl
							/*
							 * console.log(this.series.data);
							 * console.log(this.series.data.length);
							 * console.log(this.series.data[8].value);
							 */
							let count = 0;
							let data = "";
							let num = 0;
							console.log(this.series.data);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 21) {
									num += this.series.data[count].value;
									count += 1;
									if(count == 22) break;
								}
							}
							
							let totNum = num.toFixed(1);
							console.log(totNum);
							let cutTotalData = this.point.value.toFixed(1); // 소수점
							let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
							return this.point.name +"("+ percentVal +'%)<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData7
				});
			}
			/*
			 * $('#chartBtn6').off('click'); $('#chartBtn6').click(function(){
			 * for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
			 * if($('.tabArea7 .chartbox div').attr('id') ==
			 * 'chart71'){charts7.exportChart();} } });
			 */
		},
		/**
		 * @name : $more3DashDetail.chart.makeChartCombine
		 * @description : 1번 셀렉트 차트 생성
		 * @date : 2022.12.19
		 * @author : 조규환
		 * @history :
		 */
		makeChartCombine : function(tblId, chartType3, categories3, seriesyearData3, seriesyearData6, totalVal) {
			let charts21 = "";
			let charts31 = "";
			let subtitleTotal1 = totalVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
			let subtitleTotal2 = totalVal[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
			if(tblId == "DT_1FL_7009") {
				charts21 = Highcharts.chart('chart21', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '지속 일자리<br><span class="customSt2" style="font-size: 20px">'+subtitleTotal1+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
						 },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 15,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData3
				});
				
				// 3번
				charts31 = Highcharts.chart('chart31', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '신규채용 일자리<br><span class="customSt2" style="font-size: 20px">'+subtitleTotal2+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 15,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
							
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .tabBox.on .chartbox').length; i++){
						if($('.tabArea2 .tabBox.on .chartbox div').attr('id') == 'chart21') {
							charts21.exportChart();
							setTimeout(function(){
								$more3DashDetail.chart.exportChart(charts31);
							},1000);
						}
					}
				});
			}else if(tblId == 'DT_1FL_7010') {
				let subtitleTotal1 = totalVal[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				let subtitleTotal2 = totalVal[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				charts21 = Highcharts.chart('chart11', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '지속 일자리<br><span class="customSt2" style="font-size: 20px">'+subtitleTotal1+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 15,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData3
				});
				// 2
				charts31 = Highcharts.chart('chart21', {
					chart: chartType3,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '신규채용 일자리<br><span class="customSt2" style="font-size: 20px">'+subtitleTotal2+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
						 },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 15,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
							/*
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + '(' +
							 * this.percentage.toFixed(1) + '%)'; }
							 */
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea1 .tabBox.on .chartbox').length; i++){
						if($('.tabArea1 .tabBox.on .chartbox div').attr('id') == 'chart11'){
							charts21.exportChart();
							setTimeout(function(){
								$more3DashDetail.chart.exportChart(charts31);
							},1000);
						}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate1
		 * @description : 1번 셀렉트 차트 생성
		 * @date : 2022.12.19
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate1 : function(chartData3, value, selectChoiceNm1, chartData1) {
			console.log(chartData3);
			console.log(value);
			console.log(selectChoiceNm1);
			let chartType1 = new Array;
			let subtitleTotVal = new Array;
			let legendVal = new Array;
			let chartVal1 = new Array;
			let chartVal2 = new Array;
			let seriesyearData1 = new Array;
			let seriesyearData2 = new Array;
			let industry = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
			
			let c1 = "";
			let c2 = "";
			let count = 0;
			count  = Number(value)+1;
			for(let i=0; i<chartData1.length; i++) {
				if(chartData1[i].C1 == "00" && chartData1[i].C2 == industry[value] && chartData1[i].ITM_ID == "T1") {
					if(chartData1[i].C3 == "01" || chartData1[i].C3 == "02") {
						subtitleTotVal.push(Number(chartData1[i].DT));
					}
				}
			}
			for(let i=0; i<chartData3.length; i++) {
				// c2: 산업분류, C3: 지속(01), 신규(02), C1: 연령(01, 02, 03, 04, 05)
				if(chartData3[i].C2 == industry[value] && chartData3[i].C3 == "01" && chartData3[i].ITM_ID == "T1") {
					if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03" || chartData3[i].C1 == "04" || chartData3[i].C1 == "05") {
						chartVal1.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
					}
				}
				if(chartData3[i].C2 == industry[value] && chartData3[i].C3 == "02" && chartData3[i].ITM_ID == "T1") {
					if(chartData3[i].C1 == "01" || chartData3[i].C1 == "02" || chartData3[i].C1 == "03" || chartData3[i].C1 == "04" || chartData3[i].C1 == "05") {
						chartVal2.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
					}
				}
			}
			console.log(chartVal1);
			console.log(chartVal2);
			console.log(count);
			chartType1 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',backgroundColor: null, marginTop: 5,/*
																													 * style:
																													 * {fontFamily:
																													 * 'notoSans'}
																													 */};
			
			// subtitleVal =
			// (totalVal3[0].toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
			// ",");
			/*
			 * for(let i=1; i<totalVal3.length; i++) {
			 * legendVal.push(totalVal3[i]); }
			 */
			
			seriesyearData1.push({
				innerSize: '80%',
				data: chartVal1,
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',
					align: 'center',
					distance: '0%',
					style: {fontSize: '14px'}
				},
				colors: ['#7CB5EC', '#BAD3EB','#F15C80', '#FFC1D0','#F7A35C']
			});
			seriesyearData2.push({
				innerSize: '80%',
				data: chartVal2,
				dataLabels: {
					enabled: true,
					format: '{point.percentage:.1f} %',
					align: 'center',
					distance: '0%',
					style: {fontSize: '14px'}
				},
				colors: ['#7CB5EC', '#BAD3EB','#F15C80', '#FFC1D0','#F7A35C']
			});
			var charts1 = 'chart1' + count;
			var charts2 = 'chart2' + count;
			
			charts1 = Highcharts.chart('chart1'+count, {
				chart: chartType1,
				credits: {enabled: false},
				exporting: {enabled: false},
				title: {text: ''},
				subtitle: {
					text: '지속 일자리<br><span class="customSt2" style="font-size: 20px">'+$more3DashDetail.util.comma(Number(subtitleTotVal[0]))+'만개</span>',
					align: 'center',
					verticalAlign: 'middle',
					x: -120,
					y: 10,
					style: {
						color: $more3DashDetail.subtitleTextColor,
						fontSize: '14px',
						fontWeight:'bold',
						lineHeight: 30,
					}
				},
				yAxis: {
					title: {text: ''},
					labels: {enabled: false}
				},
				xAxis: {
					labels: {
						style: {
							color: '#494949', 
							fontSize: '12px', 
							fontWeight: 'bold'
						}
				     },
					categories: ''
				},
				legend: {
					enabled: true,
					width: 200,
					verticalAlign: 'middle',
					align: 'right',
					itemMarginTop: 15,
					x: -20,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333333',
						textAlign:'center',
						fontWeight: '600',
						// fontFamily: 'Noto Sans KR',
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
					labelFormatter: function() {
						let thisY = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						for(let i=0; i<this.series.data.length; i++) {
							return this.name + ' (' + thisY + '만개)';
						}
						/*
						 * for(let i=0; i<this.series.data.length; i++) {
						 * return this.name + '(' + this.percentage.toFixed(1) +
						 * '%)'; }
						 */
					}
				},
				plotOptions: {
					pie: {
						size: '69%', 
						showInLegend: true,
						point: {
							events: {
								legendItemClick: function () {
									return false;
								},
							}
						},
					}
				},
				tooltip: {
					useHTML: true,
					borderRadius: 10,
					backgroundColor: '#000000',
					borderWidth: 0,
					valueSuffix: '만개',
					shadow: false,
					padding: 12,
					style: {
						fontSize :'14px', 
						color: '#fff', 
						textAlign: 'center', 
						fontWeight: '600',
						lineHeight:1.2
					},
					formatter: function() {
						let thisY = this.y;
						let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
					},
				},
				series: seriesyearData1
			});
			// 2번
			charts2 = Highcharts.chart('chart2'+count, {
				chart: chartType1,
				credits: {enabled: false},
				exporting: {enabled: false},
				title: {text: ''},
				subtitle: {
					text: '신규채용 일자리<br><span class="customSt2" style="font-size: 20px">'+$more3DashDetail.util.comma(Number(subtitleTotVal[1]))+'만개</span>',
					align: 'center',
					verticalAlign: 'middle',
					x: -120,
					y: 10,
					style: {
						color: $more3DashDetail.subtitleTextColor,
						fontSize: '14px',
						fontWeight:'bold',
						lineHeight: 30,
					}
				},
				yAxis: {
					title: {text: ''},
					labels: {enabled: false}
				},
				xAxis: {
					labels: {
						style: {
							color: '#494949', 
							fontSize: '12px', 
							fontWeight: 'bold'
						}
				     },
					categories: ''
				},
				legend: {
					enabled: true,
					width: 200,
					verticalAlign: 'middle',
					align: 'right',
					itemMarginTop: 15,
					x: -20,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333333',
						textAlign:'center',
						fontWeight: '600',
						// fontFamily: 'Noto Sans KR',
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
					labelFormatter: function() {
						let thisY = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						for(let i=0; i<this.series.data.length; i++) {
							return this.name + ' (' + thisY + '만개)';
						}
						/*
						 * for(let i=0; i<this.series.data.length; i++) {
						 * return this.name + '(' + this.percentage.toFixed(1) +
						 * '%)'; }
						 */
					}
				},
				plotOptions: {
					pie: {
						size: '69%', 
						showInLegend: true,
						point: {
							events: {
								legendItemClick: function () {
									return false;
								},
							}
						},
					}
				},
				tooltip: {
					useHTML: true,
					borderRadius: 10,
					backgroundColor: '#000000',
					borderWidth: 0,
					valueSuffix: '만개',
					shadow: false,
					padding: 12,
					style: {
						fontSize :'14px', 
						color: '#fff', 
						textAlign: 'center', 
						fontWeight: '600',
						lineHeight:1.2
					},
					formatter: function() {
						let thisY = this.y;
						let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
					},
				},
				series: seriesyearData2
			});
			$('#chartBtn1').off('click');
			$('#chartBtn1').click(function(){
				for(var i = 0; i < $('.tabArea1 .chartbox').length; i++){
					if($('.tabArea1 .chartbox div').attr('id') == 'chart1'+i){
						charts1.exportChart();
						setTimeout(function(){
							$more3DashDetail.chart.exportChart(charts2);
						},1500);
					}
				}
			});
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate2
		 * @description : 2번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate2 : function(chartData2, value, selectChoiceNm2, selectChoiceNm2_1, selectVal, chartData3) {
			console.log(chartData2);
			console.log(value);
			console.log(selectChoiceNm2);
			console.log(selectChoiceNm2_1);
			console.log(selectVal);
			console.log(chartData3);
			chartType2 = new Array;
			let tblId = chartData2[0].TBL_ID;
			console.log(tblId);
			let c1 = "";
			let c2 = "";
			let c3 = "";
			let chartVal2 = new Array;
			let chartVal2_1 = new Array;
			let categories2 = new Array;
			let seriesyearData2 = new Array;
			let seriesyearData2_1 = new Array;
			let colorCnt1 = 0;
			let totNum = 0;
			let totComma = 0;
			let subtitleTotVal = new Array;
			let subtitleTotVal2 = new Array;
			let legendTotVal = new Array;
			let industry = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			if(value == "0") {
				c2 = "00";
				count = 1;
			}else if(value == "1") {
				c2 = "10";
				count = 2;
			}else if(value == "2") {
				c2 = "20";
				count = 3;
			}else if(value == "3") {
				c2 = "30";
				count = 4;
			}else if(value == "4") {
				c2 = "40";
				count = 5;
			}
			if(tblId == 'DT_1FL_7003') {
				console.log(c2);
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == '00' && chartData3[i].C2 == c2 && chartData3[i].ITM_ID == 'T00') {
						subtitleTotVal.push(Number(chartData3[i].DT));
					}
					if(chartData3[i].C1 == 'A' || chartData3[i].C1 == 'B' || chartData3[i].C1 == 'C' || chartData3[i].C1 == 'D' || chartData3[i].C1 == 'E' || chartData3[i].C1 == 'F' ||
						chartData3[i].C1 == 'G' || chartData3[i].C1 == 'H' || chartData3[i].C1 == 'I' || chartData3[i].C1 == 'J' || chartData3[i].C1 == 'K' || chartData3[i].C1 == 'L' ||
						 chartData3[i].C1 == 'M' || chartData3[i].C1 == 'N' || chartData3[i].C1 == 'O' || chartData3[i].C1 == 'P' || chartData3[i].C1 == 'Q' || chartData3[i].C1 == 'R' ||
						  chartData3[i].C1 == 'S' || chartData3[i].C1 == 'T' || chartData3[i].C1 == 'U') {
						if(chartData3[i].C2 == c2) {
							legendTotVal.push(Number(chartData3[i].DT));
						}
					}
				}
				console.log(subtitleTotVal[0]);
				// totComma =
				// subtitleTotVal[0].toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g,
				// ",");
				totComma = $more3DashDetail.util.comma(subtitleTotVal[0]);
				console.log(totComma);
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == 'A' || chartData2[i].C1 == 'B' || chartData2[i].C1 == 'C' || chartData2[i].C1 == 'D' || chartData2[i].C1 == 'E' || chartData2[i].C1 == 'F' ||
						chartData2[i].C1 == 'G' || chartData2[i].C1 == 'H' || chartData2[i].C1 == 'I' || chartData2[i].C1 == 'J' || chartData2[i].C1 == 'K' || chartData2[i].C1 == 'L' ||
						 chartData2[i].C1 == 'M' || chartData2[i].C1 == 'N' || chartData2[i].C1 == 'O' || chartData2[i].C1 == 'P' || chartData2[i].C1 == 'Q' || chartData2[i].C1 == 'R' ||
						  chartData2[i].C1 == 'S' || chartData2[i].C1 == 'T' || chartData2[i].C1 == 'U') {
						if(chartData2[i].C2 == c2) {
							chartVal2.push([chartData2[i].C1_NM, Number(chartData2[i].DT)]);
							categories2.push(chartData2[i].C1_NM);
						}
						/*
						 * else if(chartData3[i].C2 == "00") {
						 * totalVal.push(Number(chartData3[i].DT));
						 * totalVal3.push(Number(chartData3[i].DT)); }
						 */
					}	
				}
			}else if(tblId == 'DT_1FL_7004') {
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == value) {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
							chartVal2.push([chartData3[i].C2_NM, Number(chartData3[i].DT)]);
							legendTotVal.push(Number(chartData3[i].DT));
						}
						if(chartData3[i].C2 == "00" && chartData3[i].ITM_ID == "T00") {
							totNum = Number(chartData3[i].DT);
						}
					}
				}
				/*
				 * for(let i=0; i<chartData3.length; i++) { if(chartData3[i].C1 ==
				 * value) { if(chartData3[i].C2 == "10" || chartData3[i].C2 ==
				 * "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
				 * totNum += Number(chartData3[i].DT);
				 * legendTotVal.push(Number(chartData3[i].DT)); } } }
				 */
				console.log(selectVal);
				for(let i=0; i<selectVal.length; i++) {
					if(selectVal[i] == value) {
						count = i+1;
					}
				}
				totComma = Number(totNum.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				console.log(totComma);
				console.log(legendTotVal);
			}else if(tblId == 'DT_1FL_7007') {
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				count = Number(value)+1;
				for(let i=0; i<chartData2.length; i++) {
					if(chartData2[i].C1 == industry[value] && chartData2[i].C2 == "00" && chartData2[i].ITM_ID == "T1") {
						subtitleTotVal.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == industry[value] && chartData2[i].C2 == "01" && chartData2[i].ITM_ID == "T1") {
						chartVal2.push([chartData2[i].C2_NM, Number(chartData2[i].DT)]);
					}
					if(chartData2[i].C1 == industry[value] && chartData2[i].C2 == "02" && chartData2[i].ITM_ID == "T1") {
						chartVal2.push([chartData2[i].C2_NM, Number(chartData2[i].DT)]);
					}
				}
				console.log(subtitleTotVal);
				console.log(chartVal2);
			}else if(tblId == 'DT_1FL_7009') {
				chartType2 = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				count  = Number(value)+1;
				console.log(chartData2);
				for(let i=1; i<chartData2.length; i++) {
					if(chartData2[i].C1 == "00" && chartData2[i].C2 == industry[value] && chartData2[i].C3 == "01" && chartData2[i].ITM_ID == "T1") {
						subtitleTotVal.push(Number(chartData2[i].DT));
					}
					if(chartData2[i].C1 == "00" && chartData2[i].C2 == industry[value] && chartData2[i].C3 == "02" && chartData2[i].ITM_ID == "T1") {
						subtitleTotVal2.push(Number(chartData2[i].DT));
					}
				}
				for(let i=0; i<selectVal.length; i++) {
					if(selectVal[i].C1 == "01") {
						// 1번차트 남자
						if(selectVal[i].C2 == industry[value] && selectVal[i].C3 == "01" && selectVal[i].ITM_ID == "T1") {
							chartVal2.push([selectVal[i].C1_NM, Number(selectVal[i].DT)]);
						}
						// 1_1번차트 남자
						if(selectVal[i].C2 == industry[value] && selectVal[i].C3 == "02" && selectVal[i].ITM_ID == "T1") {
							chartVal2_1.push([selectVal[i].C1_NM, Number(selectVal[i].DT)]);
						}
					}
				}
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == "02") {
						if(chartData3[i].C2 == industry[value] && chartData3[i].C3 == "01" && chartData3[i].ITM_ID == "T1") {
							chartVal2.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
						if(chartData3[i].C2 == industry[value] && chartData3[i].C3 == "02" && chartData3[i].ITM_ID == "T1") {
							chartVal2_1.push([chartData3[i].C1_NM, Number(chartData3[i].DT)]);
						}
					}
				}
			}
			if(tblId == 'DT_1FL_7003') {
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: false,
						format: '<span class="d-label">{data.name}</span> : {y}',
						align: 'center',
						y: -30,
						x: -40,
						style: {fontSize: '10px'}
					},
					colors: ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', 
					     	 '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE']
				}];
			}else if(tblId == 'DT_1FL_7004') {
				console.log(chartVal2);
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C']
				}];
			}else if(tblId == 'DT_1FL_7007') {
				seriesyearData2 = [{
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}//
					},
					colors: ['#7CB5EC', '#F15C80']
					/*
					 * {name: '임금근로 일자리',type: 'column',yAxis: 1,data:
					 * chartVal1[0]}, {name: '증감',type: 'line',data:
					 * chartVal1[1]}
					 */
				}];
			}else if(tblId == 'DT_1FL_7009') {
				seriesyearData2.push({
					innerSize: '80%',
					data: chartVal2,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.genderColor
				});
				seriesyearData2_1.push({
					innerSize: '80%',
					data: chartVal2_1,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: $more3DashDetail.genderColor
				});
			}
			var charts2 = 'chart2' + count;
			var charts3 = 'chart3' + count;
			console.log(charts2);
			console.log(seriesyearData2);
			if(tblId == 'DT_1FL_7003') {
				console.log(totComma);
				charts2 = Highcharts.chart('chart2'+count, {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+totComma+' 만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x:-410,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 24,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								width: 850,
								itemWidth: 190,
								verticalAlign: 'middle',
								align: 'right',
								// itemMarginTop: 0.5,
								x: 45,
								itemDistance : 0.2,
								itemStyle: {
									textOverflow: "ellipsis", // ellipsis
																// width
									fontSize :'9px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '500',
									fontFamily: $more3DashDetail.downloadFont,
								},
								labelFormatter: function() {
									let thisY = legendTotVal[this.index].toFixed(1);
									for(let i=0; i<this.series.data.length; i++) {
										return this.name + '</br> - (' + this.percentage.toFixed(1) + '%)('+thisY+'만개)';
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+totComma+' 만개</span>',
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleTotVal[0]+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-400,
						x:-405,
						y:10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 900,
						itemWidth: 200,
						verticalAlign: 'middle',
						align: 'right',
						// itemMarginTop: 0.5,
						x: 115,
						y: -5,
						itemDistance : 2,
						x: 115,
						y: -5,
						itemDistance : 0.2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = legendTotVal[this.index].toFixed(1);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + this.percentage.toFixed(1) + '%)('+thisY+'만개)';
							}
						}
					},
					plotOptions: {
						pie: {size: '88%', showInLegend: true, colors: Highcharts.setOptions.colors}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							let thisY = selectVal[this.point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts2.exportChart();}
						if($('.tabArea2 .chartbox div').attr('id') == 'chart22'){charts2.exportChart();}
						if($('.tabArea2 .chartbox div').attr('id') == 'chart23'){charts2.exportChart();}
						if($('.tabArea2 .chartbox div').attr('id') == 'chart24'){charts2.exportChart();}
						if($('.tabArea2 .chartbox div').attr('id') == 'chart25'){charts2.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7004') {
				charts2 = Highcharts.chart('chart2'+count, {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+totComma+' 만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x:-100,
								y:10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 22px">'+totComma+' 만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '16px',
							fontWeight:'bold',
							lineHeight: 28,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(legendTotVal[this.index]);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.name == '소멸일자리') {
									this.color = '#cccccc';
									this.legendItem.styles.color = '#cccccc';
									this.legendItem.styles.fill = '#cccccc';
									this.visible = false;
								} 
								return this.name + ' ('+thisY+'만개)';
							}
							/*
							 * let thisY =
							 * $more3DashDetail.util.comma(legendTotVal[this.index]);
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + ' (' + thisY + '만개)'; }
							 */
						}
					},
					plotOptions: {
						pie: {size: '85%', showInLegend: true, colors: Highcharts.setOptions.colors}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight: 1.2,
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart2'+i){charts2.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7007') {
				let legendVal = new Array;
				let subtitleVal = 0;
				/*
				 * for(let i=1; i<chartVal.length; i++) {
				 * legendVal.push(totalVal[i]); }
				 */
				subtitleVal = subtitleTotVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				
				charts7 = Highcharts.chart('chart2'+count, {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {enabled: false},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -95,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories2
					},
					legend: {
						enabled: true,
						width: 150,
						// itemWidth: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -20,
						itemDistance : 0.2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = this.y.toFixed(1);
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + commaY + '만개)';
							}

						}
					},
					plotOptions: {
						pie: {
							size: '95%',
							showInLegend: true,
							/*
							 * startAngle: -90, endAngle: 90,
							 */
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					alert("asaa112255");
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart2'+i){charts7.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7009') {
				charts2 = Highcharts.chart('chart2'+count, {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '지속 일자리<br><span class="customSt2" style="font-size: 20px">'+$more3DashDetail.util.comma(Number(subtitleTotVal))+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
							/*
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + '(' +
							 * this.percentage.toFixed(1) + '%)'; }
							 */
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2
				});
				// 3번
				charts3 = Highcharts.chart('chart3'+count, {
					chart: chartType2,
					credits: {enabled: false},
					exporting: {enabled: false},
					title: {text: ''},
					subtitle: {
						text: '신규채용 일자리<br><span class="customSt2" style="font-size: 20px">'+$more3DashDetail.util.comma(Number(subtitleTotVal2))+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold'
							}
					     },
						categories: ''
					},
					legend: {
						enabled: true,
						width: 200,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -20,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = (this.y.toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
							/*
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + '(' +
							 * this.percentage.toFixed(1) + '%)'; }
							 */
						}
					},
					plotOptions: {
						pie: {
							size: '69%', 
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData2_1
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart2'+i){
							charts2.exportChart();
							setTimeout(function(){
								$more3DashDetail.chart.exportChart(charts3);
							},1500);
						}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.exportChart
		 * @description : 차트 다운로드
		 * @date : 2023.01.05
		 * @author : 조규환
		 * @history :
		 */
		exportChart : function(chart) {
			chart.exportChart();
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate3
		 * @description : 3번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate3 : function(selectChartData3, value, selectChoiceNm2, chartVal1, chartVal2) {
			console.log(selectChartData3);
			console.log(value);
			console.log(selectChoiceNm2);
			let tblId = selectChartData3[0].TBL_ID;
			let chartType = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
			let chartVal3 = new Array;
			let chartVal3_1 = new Array;
			let chartVal3_2 = new Array;
			let chartVal3_3 = new Array;
			let chartVal3_4 = new Array;
			let seriesyearData3 = new Array;
			let c1 = '';
			let c2 = '';
			let c3 = '';
			let count = '';
			let comma = 0;
			let subtitleVal = 0;
			let colorsCnt1 = 0;
			let data = "";
			var charts3 = "";
			var charts4 = "";
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			console.log(tblId);
			if(tblId == "DT_1FL_7006") {
				if(value == "0") {
					c2 = '00';
					count = 1;
					subtitleVal = $more3DashDetail.util.comma(Number(selectChartData3[0].DT));
				}else if(value == "1") {
					c2 = '10';
					count = 2;
					subtitleVal = $more3DashDetail.util.comma(Number(selectChartData3[1].DT));
				}else if(value == "2") {
					c2 = '20';
					count = 3;
					subtitleVal = $more3DashDetail.util.comma(Number(selectChartData3[2].DT));
				}
				charts3 = 'chart3' + count;
				for(let i=0; i<selectChartData3.length; i++) { // 3, 5, 7
					if(selectChartData3[i].C2 == c2) {
						if(selectChartData3[i].C1 == "1001" || selectChartData3[i].C1 == "1002") {
							chartVal3.push([selectChartData3[i].C1_NM, Number(selectChartData3[i].DT)]);
						}
					}
				}
				seriesyearData3 = [{
					innerSize: '80%',
					data: chartVal3,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#F7A35C']
				}];
			}else if(tblId == "DT_1FL_7009") {
				if(value == "0") {
					c1 = '00';
					count = 1;
					data = selectChartData3;
				}else if(value == "1") {
					c1 = '01';
					count = 2;
					data = chartVal1;
				}else if(value == "2") {
					c1 = '02';
					count = 3;
					data = chartVal2;
				}
				charts4 = 'chart4' + count;
				for(let i=0; i<data.length; i++) {
					if(data[i].C2 != "00" && data[i].C1 == c1) {
						if(data[i].C3 == "00") {
							colorsCnt1 += 1;
							chartVal3_1.push({id: data[i].C2, name: data[i].C2_NM, value: Number(data[i].DT), color: industryColor[colorsCnt1]});
						}
						if(data[i].C3 == "01") {
							chartVal3_2.push({name: data[i].C3_NM, value: Number(data[i].DT), parent: data[i].C2});
						}
						if(data[i].C3 == "02") {
							chartVal3_3.push({name: data[i].C3_NM, value: Number(data[i].DT), parent: data[i].C2});
						}
					}
				}
				for(var i = 0; i < chartVal3_1.length; i++) {
					chartVal3.push(chartVal3_1[i], chartVal3_2[i], chartVal3_3[i]);
				}
				seriesyearData3 = [{
					type: 'treemap',
					layoutAlgorithm: 'squarified', 
					allowTraversingTree: true, 
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "ellipsis", // ellipsis width
							},
							formatter: function() {
								let count = 0;
								let data = "";
								let num = 0;
								// console.log(this.series.data);
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 62) break;
									}
								}
								
								let totNum = num.toFixed(1);
								// console.log(totNum);
								let cutTotalData = this.point.value.toFixed(1); // 소수점
								let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
								return this.point.name +'</br><span>'+ cutTotalData +' 만개</span>';
							},
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}],
					data: chartVal3,
					colors: $more3DashDetail.industryClassificationColor
				}];
			}else if(tblId == "DT_1FL_7010") {
				if(value == "0") {
					c1 = '00';
					count = 1;
				}else if(value == "1") {
					c1 = '01';
					count = 2;
				}else if(value == "2") {
					c1 = '02';
					count = 3;
				}else if(value == "3") {
					c1 = '03';
					count = 4;
				}else if(value == "4") {
					c1 = '04';
					count = 4;
				}else if(value == "5") {
					c1 = '05';
					count = 5;
				}
				charts4 = 'chart3' + count;
				// selectChartData3
				for(let i=0; i<selectChartData3.length; i++) {
					if(selectChartData3[i].C1 == c1 && selectChartData3[i].C2 != "00" && selectChartData3[i].ITM_ID == "T1") {
						if(selectChartData3[i].C3 == "00") {
							colorsCnt1 += 1;
							chartVal3_1.push({id: selectChartData3[i].C2, name: selectChartData3[i].C2_NM, value: Number(selectChartData3[i].DT), color: industryColor[colorsCnt1]});
						}
						if(selectChartData3[i].C3 == "01") {
							chartVal3_2.push({name: selectChartData3[i].C3_NM, value: Number(selectChartData3[i].DT), parent: selectChartData3[i].C2});
						}
						if(selectChartData3[i].C3 == "02") {
							chartVal3_3.push({name: selectChartData3[i].C3_NM, value: Number(selectChartData3[i].DT), parent: selectChartData3[i].C2});
						}
					}
				}
				for(var i = 0; i < chartVal3_1.length; i++) {
					chartVal3.push(chartVal3_1[i], chartVal3_2[i], chartVal3_3[i]);
				}
				seriesyearData3 = [{
					type: 'treemap',
					layoutAlgorithm: 'squarified', 
					allowTraversingTree: true, 
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "ellipsis", // ellipsis width
							},
							formatter: function() {
								let count = 0;
								let data = "";
								let num = 0;
								// console.log(this.series.data);
								for(let i=0; i<this.series.data.length; i++) {
									if(this.series.data.length == 63) {
										num += this.series.data[count].value;
										count += 1;
										if(count == 62) break;
									}
								}
								
								let totNum = num.toFixed(1);
								// console.log(totNum);
								let cutTotalData = this.point.value.toFixed(1); // 소수점
								let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
								return this.point.name +'</br><span>'+ cutTotalData +' 만개</span>';
							},
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}],
					data: chartVal3,
					colors: $more3DashDetail.industryClassificationColor
				}];
			}
			if(tblId == "DT_1FL_7006") {
				charts3 = Highcharts.chart(charts3, {
					chart: {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5},
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -85,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -85,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: ""
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '69%',
							showInLegend: true,
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData3
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart3'+i){charts3.exportChart();}
					}
				});
			}else if(tblId == "DT_1FL_7009" || tblId == "DT_1FL_7010") {
				charts4 = Highcharts.chart(charts4, {
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							series: {
								dataLabels: {
									style: {
										fontWeight: 'bold',
										fontSize: '12px',
										textOverflow: "ellipsis",
										fontFamily: $more3DashDetail.downloadFont,
									},
								},
							},
						}
					},
					legend: {enabled: false},
					title: {text: ''},
					tooltip:{
						// valueSuffix: "",
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { // durl
							let count = 0;
							let data = "";
							let num = 0;
							// console.log(this.series.data);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 63) {
									num += this.series.data[count].value;
									count += 1;
									if(count == 62) break;
								}
							}
							let totNum = num.toFixed(1);
							// console.log(totNum);
							let cutTotalData = this.point.value.toFixed(1); // 소수점
							let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
							return this.point.name +'<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData3
				});
				if(tblId == "DT_1FL_7009") {
					$('#chartBtn3').off('click');
					$('#chartBtn3').click(function(){
						for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
							if($('.tabArea3 .chartbox div').attr('id') == 'chart4'+i){charts4.exportChart();}
						}
					});
				}else if(tblId == "DT_1FL_7010") {
					$('#chartBtn3').off('click');
					$('#chartBtn3').click(function(){
						for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
							if($('.tabArea3 .chartbox div').attr('id') == 'chart3'+i){charts4.exportChart();}
						}
					});
				} 
				/*
				 * $('#chartBtn3').off('click');
				 * $('#chartBtn3').click(function(){ for(var i = 0; i <
				 * $('.tabArea3 .chartbox').length; i++){ if($('.tabArea3
				 * .chartbox div').attr('id') ==
				 * 'chart31'){charts3.exportChart();} if($('.tabArea3 .chartbox
				 * div').attr('id') == 'chart32'){charts3.exportChart();}
				 * if($('.tabArea3 .chartbox div').attr('id') ==
				 * 'chart33'){charts3.exportChart();} if($('.tabArea3 .chartbox
				 * div').attr('id') == 'chart34'){charts3.exportChart();}
				 * if($('.tabArea3 .chartbox div').attr('id') ==
				 * 'chart35'){charts3.exportChart();} } });
				 */
			}
			
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate4
		 * @description : 4번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate4 : function(selectChartData4, value, selectNm4, selectChoiceNm4, selectChoiceNm4_1) {
			console.log(selectChartData4);
			console.log(value);
			console.log(selectNm4);
			console.log(selectChoiceNm4);
			console.log(selectChoiceNm4_1);
			
			let tblId = selectChartData4[0].TBL_ID;
			let chartType = "";
			let categories4 = new Array;
			let chartVal4 = new Array;
			let chartVal4_1 = new Array;
			let chartVal4_2 = new Array;
			let chartVal4_3 = new Array;
			let chartVal4_4 = new Array;
			let seriesyearData4 = new Array;
			let overlapRemove4 = new Array;
			let legendNm4 = new Array;
			let c1 = "";
			let c2 = "";
			let c3 = "";
			let count = "";
			let totalVal = new Array;
			let colorCnt1 = 0;
			let colorCnt2 = 0;
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			if(tblId == "DT_1FL_7008") {
				if(value == "0") {
					c2 = "00";
					count = 1;
				}else if(value == "1") {
					c2 = "01";
					count = 2;
				}else if(value == "2") {
					c2 = "02";
					count = 3;
				}else if(value == "3") {
					c2 = "03";
					count = 4;
				}else if(value == "4") {
					c2 = "04";
					count = 5;
				}else if(value == "5") {
					c2 = "05";
					count = 6;
				}
			}
			if(tblId == "DT_1FL_7008") {
				chartType = {};
				for(let i=0; i<selectChartData4.length; i++) {
					if(selectChartData4[i].C1 != '00' && selectChartData4[i].C2 == c2) {
						categories4.push(selectChartData4[i].C1_NM);
						chartVal4.push(Number(selectChartData4[i].DT));	
					}
				}
				seriesyearData4 = [{
					name: '일자리 수',
					type: 'column',
					yAxis: 1,
					data: chartVal4,
					dataLabels: {
						enabled: true,
						useHTML: true,
						formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
						}
					},
					color: '#F15C80',
				}];
			}else if(tblId == "DT_1FL_7009") {
				if(value == "0") {
					c3 = "00";
					count = 1;
				}else if(value == "1") {
					c3 = "01";
					count = 2;
				}else if(value == "2") {
					c3 = "02";
					count = 3;
				}
				for(let i=1; i<selectChartData4.length; i++) {
					if(selectChartData4[i].C1 == "01" && selectChartData4[i].C3 == c3) {
						if(selectChartData4[i].C2 != "00") {
							colorCnt1 += 1;
							chartVal4.push({name: selectChartData4[i].C2_NM, value: Number(selectChartData4[i].DT), color: industryColor[colorCnt1]});
						}
					}
				}
				seriesyearData4.push({
					type: 'treemap',
					layoutAlgorithm: 'squarified',
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}],
					data: chartVal4
				});
			}
			var charts4 = 'chart4' + count;
			if(tblId == "DT_1FL_7008") {
				charts4 = Highcharts.chart('chart4'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight: 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										color: '#494949',
										fontSize: '12px',
										fontWeight: 'bold',
										textOverflow: "width",
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: "width",
							}
						},
						categories: categories4
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: false,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart4'+i){charts4.exportChart();}
					}
				});
			}/*
				 * else if(tblId == "DT_1FL_7009") { alert("asasasas"); charts4 =
				 * Highcharts.chart('chart4'+count, { credits: {enabled: false},
				 * exporting: {enabled: false}, legend: {enabled: false},
				 * colorAxis: { minColor: '#DEEFFF', maxColor: '#007DF6' },
				 * title: {text: ''}, tooltip:{ //valueSuffix: "", useHTML:
				 * true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
				 * borderRadius: 10, backgroundColor :'#000000', borderWidth:0,
				 * shadow: false, padding:12, style: { fontSize :'14px', color:
				 * '#fff', textAlign:'center', fontWeight: '600',
				 * lineHeight:1.2, }, formatter: function() { //durl
				 * console.log(this.series.data);
				 * console.log(this.series.data.length);
				 * console.log(this.series.data[8].value); let count = 0; let
				 * data = ""; let num = 0; console.log(this.series.data);
				 * for(let i=0; i<this.series.data.length; i++) {
				 * if(this.series.data.length == 21) { num +=
				 * this.series.data[count].value; count += 1; if(count == 22)
				 * break; } }
				 * 
				 * let totNum = num.toFixed(1); console.log(totNum); let
				 * cutTotalData = this.point.value.toFixed(1); //소수점 let
				 * percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
				 * return this.point.name +"("+ percentVal +'%)<span
				 * style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>'; },
				 * shared: true }, series: seriesyearData4 });
				 * $('#chartBtn3').off('click');
				 * $('#chartBtn3').click(function(){ for(var i = 0; i <
				 * $('.tabArea3 .chartbox').length; i++){ if($('.tabArea3
				 * .chartbox div').attr('id') ==
				 * 'chart4'+i){charts4.exportChart();} } }); }
				 */
			/*
			 * $('#chartBtn4').off('click'); $('#chartBtn4').click(function(){
			 * for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
			 * if($('.tabArea4 .chartbox div').attr('id') ==
			 * 'chart41'){charts4.exportChart();} if($('.tabArea4 .chartbox
			 * div').attr('id') == 'chart42'){charts4.exportChart();}
			 * if($('.tabArea4 .chartbox div').attr('id') ==
			 * 'chart43'){charts4.exportChart();} if($('.tabArea4 .chartbox
			 * div').attr('id') == 'chart44'){charts4.exportChart();}
			 * if($('.tabArea4 .chartbox div').attr('id') ==
			 * 'chart45'){charts4.exportChart();} if($('.tabArea4 .chartbox
			 * div').attr('id') == 'chart46'){charts4.exportChart();} } });
			 */
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate5
		 * @description : 5번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate5 : function(selectChartData5, value, selectNm5, selectChoiceNm5) {
			console.log(selectChartData5);
			let tblId = selectChartData5[0].TBL_ID;
			let chartType = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
			let chartVal5 = new Array;
			let seriesyearData5 = new Array;
			let c2 = '';
			let count = '';
			let comma = 0;
			let subtitleVal = 0;
			if(value == "0") {
				c2 = '00';
				count = 1;
				subtitleVal = $more3DashDetail.util.comma(Number(selectChartData5[0].DT));
			}else if(value == "1") {
				c2 = '10';
				count = 2;
				subtitleVal = $more3DashDetail.util.comma(Number(selectChartData5[1].DT));
			}else if(value == "2") {
				c2 = '20';
				count = 3;
				subtitleVal = $more3DashDetail.util.comma(Number(selectChartData5[2].DT));
			}
			if(tblId == "DT_1FL_7006") {
				for(let i=0; i<selectChartData5.length; i++) {
					if(selectChartData5[i].C2 == c2) {
						if(selectChartData5[i].C1 == "2001" || selectChartData5[i].C1 == "2002" || selectChartData5[i].C1 == "2003" || selectChartData5[i].C1 == "2004" || selectChartData5[i].C1 == "2005") {
							chartVal5.push([selectChartData5[i].C1_NM, Number(selectChartData5[i].DT)]);
						}
					}
				}
			}
			if(tblId == "DT_1FL_7006") {
				seriesyearData5 = [{
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C']
				}];
			}
			var charts5 = 'chart5' + count;
			if(tblId == "DT_1FL_7006") {
				charts5 = Highcharts.chart('chart5'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -110,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								enabled: true,
								width: 170,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,    
								y:-8,
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: ''
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,
						y: -8,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = (this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + ' (' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {size: '80%', showInLegend: true}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600'
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData5
				});
				$('#chartBtn7').off('click');
				$('#chartBtn7').click(function(){
					for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
						if($('.tabArea5 .chartbox div').attr('id') == 'chart5'+i){charts5.exportChart();}
					}
				});
			}
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate6
		 * @description : 6번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate6 : function(res, value, selectNm5, selectChoiceNm1, selectVal2, chartData3) {
			console.log(res);
			console.log(value);
			let chartType = "";
			let tblId = res[0].TBL_ID;
			let categories6 = new Array;
			let chartVal6 = new Array;
			let seriesyearData6 = new Array;
			let count = "";
			let c1 = new Array;
			let c2 = "";
			let totalVal = new Array;
			let subtitleVal = 0;
			let totNum = 0;
			let legendTotVal = new Array;
			if(tblId == 'DT_1FL_7001' || tblId == 'DT_1FL_7004') {
				if(value == "0") {
					c1 = ['01', '02', '03'];
					c2 = '00';
					count = 1;
				}
				else if(value == "1") {
					c1 = ['05', '06', '07', '08'];
					c2 = '10';
					count = 2;
				}
				else if(value == "2") {
					c1 = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34'];
					c2 = '20';
					count = 3;
				}
				else if(value == "3") {
					c1 = ['35'];
					c2 = '30';
					count = 4;
				}
				else if(value == "4") {
					c1 = ['36', '37', '38', '39'];
					c2 = '40';
					count = 5;
				}
				else if(value == "5") {c1 = ['41', '42']; count = 6;}
				else if(value == "6") {c1 = ['45', '46', '47']; count = 7;}
				else if(value == "7") {c1 = ['49', '50', '51', '52']; count = 8;}
				else if(value == "8") {c1 = ['55', '56']; count = 9;}
				else if(value == "9") {c1 = ['58', '59', '60', '61', '62', '63']; count = 10;}
				else if(value == "10") {c1 = ['64', '65', '66']; count = 11;}
				else if(value == "11") {c1 = ['68']; count = 12;}
				else if(value == "12") {c1 = ['70', '71', '72', '73']; count = 13;}
				else if(value == "13") {c1 = ['74', '75', '76']; count = 14;}
				else if(value == "14") {c1 = ['84']; count = 15;}
				else if(value == "15") {c1 = ['85']; count = 16;}
				else if(value == "16") {c1 = ['86', '87']; count = 17;}
				else if(value == "17") {c1 = ['90', '91']; count = 18;}
				else if(value == "18") {c1 = ['94', '95', '96']; count = 19;}
				else if(value == "19") {c1 = ['97', '98']; count = 20;}
				else if(value == "20") {c1 = ['99']; count = 21;}
				if(tblId == 'DT_1FL_7001') {
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == 'A' || res[i].C1 == 'B' || res[i].C1 == 'C' || res[i].C1 == 'D' || res[i].C1 == 'E' || res[i].C1 == 'F' || res[i].C1 == 'G' || res[i].C1 == 'H' ||
						    res[i].C1 == 'I' || res[i].C1 == 'J' || res[i].C1 == 'K' || res[i].C1 == 'L' || res[i].C1 == 'M' || res[i].C1 == 'N' || res[i].C1 == 'O' || res[i].C1 == 'P' || 
						     res[i].C1 == 'Q' || res[i].C1 == 'R' || res[i].C1 == 'S' || res[i].C1 == 'T' || res[i].C1 == 'U') {
							totalVal.push(Number(res[i].DT));
						}
					}
				}
			}else if(tblId == 'DT_1FL_7008') {
				if(value == "0") {
					c2 = "00";
					count = 1;
				}else if(value == "1") {
					c2 = "01";
					count = 2;
				}else if(value == "2") {
					c2 = "02";
					count = 3;
				}else if(value == "3") {
					c2 = "03";
					count = 4;
				}else if(value == "4") {
					c2 = "04";
					count = 5;
				}else if(value == "5") {
					c2 = "05";
					count = 6;
				}
			}
			
			
			console.log(tblId);
			if(tblId == 'DT_1FL_7001') {
				chartType = {};
				for(let i=0; i<res.length; i++) {
					for(let j=0; j<=c1.length; j++) {
						if(res[i].C1 == c1[j]) {
							categories6.push(res[i].C1_NM);
							chartVal6.push(Number(res[i].DT));
						}
					}
				}
				for(let i =0; i<chartVal6.length; i++) {
					if(isNaN(chartVal6[i])) {
						chartVal6[i] = 0;
					}
				}
				seriesyearData6 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color: '#000',
						},
						formatter: function() {
							return this.y.toFixed(1) + '만개';
						},
					},
					color: '#F15C80',
					data: chartVal6,
				}];
			}else if(tblId == 'DT_1FL_7004') {
				chartType = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				console.log(value);
				console.log(selectVal2);
				/*
				 * for(let i=0; i<res.length; i++) { if(res[i].C1 == value) {
				 * if(res[i].C2 == '10' || res[i].C2 == '20' || res[i].C2 ==
				 * '30' || res[i].C2 == '40') { chartVal6.push([res[i].C2_NM,
				 * Number(res[i].DT)]); } } }
				 */
				for(let i=0; i<chartData3.length; i++) {
					if(chartData3[i].C1 == value) {
						if(chartData3[i].C2 == "10" || chartData3[i].C2 == "20" || chartData3[i].C2 == "30" || chartData3[i].C2 == "40") {
							legendTotVal.push(Number(chartData3[i].DT));
							chartVal6.push([chartData3[i].C2_NM, Number(chartData3[i].DT)]); 
						}
						if(chartData3[i].C2 == "00" && chartData3[i].ITM_ID == "T00") {
							totNum = Number(chartData3[i].DT);
						}
					}
				}
				for(let i=0; i<selectVal2.length; i++) {
					if(selectVal2[i] == value) {
						count = i+1;
					}
				}
				for(let i=0; i<legendTotVal.length-1; i++) {
					subtitleVal += Number(legendTotVal[i]);
				}
				console.log(chartVal6);
				seriesyearData6 = [{
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					}
				}];
			}else if(tblId == 'DT_1FL_7007') {
				chartType = {};
				if(value == '0') {
					count = 1;
					c2 = "01";
				}else if(value == '1') {
					count = 2;
					c2 = "02";
				}
				for(let i=3; i<res.length; i++) {
					if(res[i].C2 == c2) {
						chartVal6.push(Number(res[i].DT));	
					}
				}
				for(let i=3; i<res.length; i++) {
					if(res[i].C2 == c2) {
						categories6.push(res[i].C1_NM);
					}
				}
				seriesyearData6 = [{ // chart61
					name: '남자',
					type: 'column',
					yAxis: 1,
					data: chartVal6,
					dataLabels: {
						enabled: true,
						useHTML: true,
						formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							color:'#000'
						}
					},
					color :'#F15C80'
				}];
				console.log(chartVal6);
				console.log(categories6);
			}else if(tblId == 'DT_1FL_7008') {
				chartType = {};
				for(let i=3; i<res.length; i++) {
					if(res[i].C1 != '00' && res[i].C2 == c2) {
						categories6.push(res[i].C1_NM);
						chartVal6.push(Number(res[i].DT));	
					}
				}
				seriesyearData6 = [{
					name: '증감',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						useHTML: true,
						verticalAlign: 'top',
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return this.y + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0){
								return Math.abs(this.y) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								return '0.0만개';
							}
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							color:'#000',
						},
					},
					data: chartVal6,
					color: '#F15C80',
					negativeColor: '#7CB5EC',
				}];
			}
			var charts6 = 'chart6' + count;
			if(tblId == 'DT_1FL_7001' || tblId == 'DT_1FL_7008') {
				let tooltipEnabled = "";
				let rotation = 0;
				if(tblId == 'DT_1FL_7001') {
					tooltipEnabled = true;
					if(charts6 == 'chart63') {
						rotation = -45;
					}else {
						rotation = 0;
					} 
				}else if(tblId == 'DT_1FL_7008') {
					tooltipEnabled = false;
					rotation = -45;
				}
				if(charts6 == 'chart63') {
					
				}
				charts6 = Highcharts.chart('chart6'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight: 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: rotation,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories6
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
					    },
						categories: categories6
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							stacking: 'normal',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: tooltipEnabled,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							
							if(tblId == 'DT_1FL_7001') {
								let thisY = this.y.toFixed(1);
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
							}else {
								return this.series.name + '</br><span style="color:#EEFF2E">총계 ' + totalVal[value] + ' 만개</span>';
							}
						},
					},
					series: seriesyearData6
				});
				if(tblId == 'DT_1FL_7001') {
					$('#chartBtn5').off('click');
					$('#chartBtn5').click(function(){
						for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
							if($('.tabArea6 .chartbox div').attr('id') == 'chart6'+i){charts6.exportChart();}
						}
					});
				}else if(tblId == 'DT_1FL_7008') {
					$('#chartBtn7').off('click');
					$('#chartBtn7').click(function(){
						for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
							if($('.tabArea5 .chartbox div').attr('id') == 'chart6'+i){charts6.exportChart();}
						}
					});
				}
			}else if(tblId == 'DT_1FL_7007') {
				charts6 = Highcharts.chart('chart6'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight : 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: 'width'
							}
						},
						categories: categories6
					},
					legend: {
						enabled: false,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-10,
						y:-10,
						itemMarginTop: 8,
						itemHoverStyle: {color: '#FF0000',},
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						}
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: false,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							// return this.series.name + '</br><span
							// style="color:#EEFF2E">총계 ' +
							// chartValRatio4[this.point.index] + '만개</span>';
							/*
							 * let thisY = this.y; let commaY =
							 * thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
							 * ","); return this.x + '</br><span
							 * style="color:#EEFF2E">' + commaY + ' 만개</span>';
							 */
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
						if($('.tabArea6 .chartbox div').attr('id') == 'chart6'+i){charts6.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7004') {
				charts6 = Highcharts.chart('chart3'+count, {
					chart: chartType,
					credits: {
						enabled: false,
						chartOptions: {
							subtitle: {
								align: 'center',
								verticalAlign: 'middle',
								x: -100,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '14px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							legend: {
								enabled: true,
								width: 150,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: -30,
								itemStyle: {
									textOverflow: "width",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					exporting: {enabled: false},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 22px">'+$more3DashDetail.util.comma(Number(totNum))+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -110,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '16px',
							fontWeight:'bold',
							lineHeight: 28,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: categories6
					},
					legend: {
						enabled: true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -50,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = $more3DashDetail.util.comma(legendTotVal[this.index]);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.name == '소멸일자리') {
									this.color = '#cccccc';
									this.legendItem.styles.color = '#cccccc';
									this.legendItem.styles.fill = '#cccccc';
									this.visible = false;
								} 
								return this.name + ' ('+thisY+'만개)';
							}
							
							/*
							 * let thisY =
							 * $more3DashDetail.util.comma(legendTotVal[this.index]);
							 * for(let i=0; i<this.series.data.length; i++) {
							 * return this.name + ' (' + thisY + '만개)'; }
							 */
						}
					},
					plotOptions: {
						pie: {size: '85%', showInLegend: true}
					},
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() {
							// return this.series.name + '</br><span
							// style="color:#EEFF2E">총계 ' + totalVal[value] + '
							// 만개</span>';
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData6
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart3'+i){charts6.exportChart();}
					}
				});
			}
			$('#chartBtn5').off('click');
			$('#chartBtn5').click(function(){
				for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
					if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart62'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart63'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart64'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart65'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart66'){charts6.exportChart();}
				}
			});
		},
		/**
		 * @name : $more3DashDetail.chart.selectChartCreate7
		 * @description : 7번 셀렉트 차트 생성
		 * @date : 2022.11.01
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate7 : function(res, value, selectNm7, selectChoiceNm7, totalVal) {
			console.log(res);
			console.log(totalVal);
			let tblId = res[0].TBL_ID;
			let categories7 = new Array;
			let chartVal7 = new Array;
			let chartVal7_1 = new Array;
			let chartVal7_2 = new Array;
			let chartVal7_3 = new Array;
			let chartVal7_4 = new Array;
			let seriesyearData7 = new Array;
			let legendNm7 = new Array;
			let chartType = new Array;
			let count = "";
			let c1 = new Array;
			let c2 = new Array;
			let c3 = new Array;
			let overlapRemove7 = new Array;
			let startAngle = "";
			let endAngle = "";
			let totalVal2 = new Array;
			let colorCnt1 = 0;
			let colorCnt2 = 0;
			let comma = 0;
			let subtitleVal = 0;
			let tooltipVal = new Array;
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			let colors = new Array;
			console.log(res);
			console.log(value);
			console.log(selectNm7);
			console.log(selectChoiceNm7);
			if(tblId == 'DT_1FL_7001' || tblId == 'DT_1FL_7003' || tblId == 'DT_1FL_7006') {
				if(value == "0") {c1 = ['01', '02', '03']; c2 = '00'; count = 1;}
				else if(value == "1") {c1 = ['05', '06', '07', '08']; c2 = '10'; count = 2;}
				else if(value == "2") {
					c1 = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34'];
					c2 = '20';
					count = 3;
				}
				else if(value == "3") {c1 = ['35']; c2 = '30'; count = 4;}
				else if(value == "4") {c1 = ['36', '37', '38', '39']; c2 = '40'; count = 5;}
				else if(value == "5") {c1 = ['41', '42']; count = 6;}
				else if(value == "6") {c1 = ['45', '46', '47']; count = 7;}
				else if(value == "7") {c1 = ['49', '50', '51', '52']; count = 8;}
				else if(value == "8") {c1 = ['55', '56']; count = 9;}
				else if(value == "9") {c1 = ['58', '59', '60', '61', '62', '63']; count = 10;}
				else if(value == "10") {c1 = ['64', '65', '66']; count = 11;}
				else if(value == "11") {c1 = ['68']; count = 12;}
				else if(value == "12") {c1 = ['70', '71', '72', '73']; count = 13;}
				else if(value == "13") {c1 = ['74', '75', '76']; count = 14;}
				else if(value == "14") {c1 = ['84']; count = 15;}
				else if(value == "15") {c1 = ['85']; count = 16;}
				else if(value == "16") {c1 = ['86', '87']; count = 17;}
				else if(value == "17") {c1 = ['90', '91']; count = 18;}
				else if(value == "18") {c1 = ['94', '95', '96']; count = 19;}
				else if(value == "19") {c1 = ['97', '98']; count = 20;}
				else if(value == "20") {c1 = ['99']; count = 21;}
				/*
				 * if(tblId == 'DT_1FL_7003') { let num = 0; for(let i=0; i<res.length;
				 * i++) { console.log(num); console.log(c1[num]); if(res[i].C2 ==
				 * "00") { if(res[i].C1 == c1[num]) {
				 * totalVal2.push(Number(res[i].DT)); } } num += 1; if(num ==
				 * c1.length) { break; } } } console.log(totalVal2);
				 */
			}
			if(tblId == 'DT_1FL_7001') {
				chartType = {};
				for(let i=0; i<res.length; i++) {
					for(let j=0; j<=c1.length; j++) {
						if(res[i].C1 == c1[j]) {
							categories7.push(res[i].C1_NM);
							chartVal7.push(Number(res[i].DT));
						}					
					}
				}
				for(let i=0; i<totalVal.length; i++) {
					
				}
				for(let i=0; i<totalVal.length; i++) {
					for(let j=0; j<=c1.length; j++) {
						if(res[i].C1 == c1[j]) {
							tooltipVal.push(Number(totalVal[i].DT));
						}
					}
				}
				for(let i =0; i<chartVal7.length; i++) {
					if(isNaN(chartVal7[i])) {
						chartVal7[i] = 0;
					}
				}
				for(let i =0; i<tooltipVal.length; i++) {
					if(isNaN(tooltipVal[i])) {
						tooltipVal[i] = 0;
					}
				}
			}else if(tblId == 'DT_1FL_7003') {
				chartType = {renderTo: 'horiStackedBar', type: 'column'};
				for(let i=0; i<res.length; i++) {
					for(let j=0; j<=c1.length; j++) {
						if(res[i].C1 == c1[j]) {
							if(res[i].C2 == "10") {
								overlapRemove7.push(res[i].C1_NM);
								chartVal7_1.push(Number(res[i].DT));
								legendNm7.push(res[i].C2_NM);
							}else if(res[i].C2 == "20") {
								overlapRemove7.push(res[i].C1_NM);
								chartVal7_2.push(Number(res[i].DT));
								legendNm7.push(res[i].C2_NM);
							}else if(res[i].C2 == "30") {
								overlapRemove7.push(res[i].C1_NM);
								chartVal7_3.push(Number(res[i].DT));
								legendNm7.push(res[i].C2_NM);
							}else if(res[i].C2 == "40") {
								overlapRemove7.push(res[i].C1_NM);
								chartVal7_4.push(Number(res[i].DT));
								legendNm7.push(res[i].C2_NM);
							}else if(res[i].C2 == "00") {
								totalVal2.push(Number(res[i].DT));
							}
						}
					}
				}
				for(let i =0; i<totalVal2.length; i++) {
					if(isNaN(totalVal2[i])) {totalVal2[i] = 0;}
				}
				for(let i =0; i<chartVal7_1.length; i++) {
					if(isNaN(chartVal7_1[i])) {chartVal7_1[i] = 0;}
					if(isNaN(chartVal7_2[i])) {chartVal7_2[i] = 0;}
					if(isNaN(chartVal7_3[i])) {chartVal7_3[i] = 0;}
					if(isNaN(chartVal7_4[i])) {chartVal7_4[i] = 0;}
				}

				console.log(totalVal2);
			}else if(tblId == 'DT_1FL_7006') {
				startAngle = 0;
				endAngle = 0;
				colors.push('#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C');
				chartType = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				for(let i=0; i<res.length; i++) {
					if(res[i].C2 == c2) {
						if(res[i].C1 == "3001" || res[i].C1 == "3002" || res[i].C1 == "3003" || res[i].C1 == "3004") {
							chartVal7.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
			}else if(tblId == 'DT_1FL_7007') {
				chartType = {renderTo: 'horiStackedBar', type: 'column'};
				if(value == "0") {
					c2 = '01';
					count = 1;
				}else if(value == "1") {
					c2 = '02';
					count = 2;
				}
				for(let i=3; i<res.length; i++) {
					if(res[i].C2 == c2) {
						chartVal7.push(Number(res[i].DT));	
						categories7.push(res[i].C1_NM);
					}
				}
				console.log(chartVal7);
				console.log(categories7);
			}else if(tblId == 'DT_1FL_7008') {
				startAngle = -90;
				endAngle = 90;
				if(value == "0") {
					c2 = '00';
					count = 1;
				}else if(value == "1") {
					c2 = '01';
					count = 2;
				}else if(value == "2") {
					c2 = '02';
					count = 3;
				}else if(value == "3") {
					c2 = '03';
					count = 4;
				}else if(value == "4") {
					c2 = '04';
					count = 5;
				}else if(value == "5") {
					c2 = '05';
					count = 6;
				}
				chartType = {renderTo: 'dounutChart',type: 'pie',innerSize: '60%',marginTop: 5};
				for(let i=1; i<res.length; i++) {
					if(res[i].C2 == c2) {
						chartVal7.push([res[i].C1_NM, Number(res[i].DT)]);	
					}
				}
			}else if(tblId == 'DT_1FL_7009') {
				if(value == "0") {
					c3 = "00";
					count = 1;
				}else if(value == "1") {
					c3 = "01";
					count = 2;
				}else if(value == "2") {
					c3 = "02";
					count = 3;
				}
				for(let i=1; i<res.length; i++) {
					if(res[i].C1 == "02" && res[i].C3 == c3) {
						if(res[i].C2 != "00") {
							colorCnt1 += 1;
							chartVal7.push({name: res[i].C2_NM, value: Number(res[i].DT), color: industryColor[colorCnt1]});
						}
					}
				}
				seriesyearData7.push({
					type: 'treemap',
					layoutAlgorithm: 'squarified',
					levels: [{
						level: 1,
						dataLabels: {
							enabled: true,
							/*
							 * align: 'left', verticalAlign: 'top',
							 */
							style: {
								fontWeight: 'bold',
								fontSize: '12px',
								textOverflow: "width",
							}
						},
						borderWidth: 3,
						levelIsConstant: false,
						stroke: "#000",
					}, {
						level: 2,
						layoutAlgorithm: 'squarified',
						dataLabels: {
							enabled: false
						},
					}],
					data: chartVal7
				});
			}
			
			console.log(c2);
			console.log(chartVal7);
			if(tblId == 'DT_1FL_7001') {
				seriesyearData7 = [{
					name: '임금근로 일자리 수',
					type: 'column',
					yAxis: 1,
					dataLabels: {
						enabled: true,
						// format: '{y}만개',
						verticalAlign: 'top',
						y: -30,
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
						},
						formatter: function() {
							let num = "";
							if(this.y > 0) {
								num = this.y.toFixed(1) + '만개 증가 <span style="color:red">↑</span>';
							}else if(this.y < 0) {
								num = this.y.toFixed(1) + '만개 감소 <span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								num = '<span>'+this.y.toFixed(1)+'만개</span>';
							}
							return num;
						},
					},
					color: '#F15C80',
					negativeColor: '#7CB5EC',
					data: chartVal7
				},];
			}else if(tblId == 'DT_1FL_7003') {
				chartVal7.push(chartVal7_1, chartVal7_2, chartVal7_3, chartVal7_4);
				console.log(chartVal7);
				categories7 = $more3DashDetail.util.overlapRemove(overlapRemove7);
				for(let i=0; i<chartVal7.length; i++) {
					seriesyearData7.push({
						name: legendNm7[i],
						data: chartVal7[i],
						// padding:10,
						// 바 상단의 수치값
						dataLabels: {
							allowOverlap: false,
							enabled: true,
							// format: '{y}만개',
							padding: 0,
							align: 'center',
							color:'#000',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								return $more3DashDetail.util.comma(this.y) + '만개';
							},
						},
						color: $more3DashDetail.conSubNewExtColor[i],
					});
				}
			}else if(tblId == "DT_1FL_7006") {
				seriesyearData7 = [{
					innerSize: '80%',
					data: chartVal7,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: colors
				}];
			}else if(tblId == "DT_1FL_7007") {
				seriesyearData7 = [{
					name: '',
					type: 'column',
					yAxis: 1,
					data: chartVal7,
					dataLabels: {
						enabled: true,
						useHTML: true,
						// format: '{y} 만개',
						formatter: function() {
							if(this.y > 0){
								return $more3DashDetail.util.comma(this.y) + '만개 증가<span style="color:red">↑</span>';
							}else if(this.y < 0){
								return $more3DashDetail.util.comma(Math.abs(this.y)) + '만개 감소<span style="color:blue">↓</span>';
							}else if(this.y == 0) {
								return '0.0만개';
							}
						},
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOverflow: "width",
							color:'#000'
						},
					},
					color: '#F15C80',
					negativeColor: '#7CB5EC',
				}];
			}else if(tblId == "DT_1FL_7008") {
				seriesyearData7 = [{
					innerSize: '80%',
					data: chartVal7,
					dataLabels: {
						enabled: false,
						format: '{point.y:.1f} %',
						align: 'center',
						distance: '0%',
						style: {fontSize: '14px'}
					},
					colors: colors
				}];
			}
			var charts7 = 'chart7' + count;
			if(tblId == 'DT_1FL_7001') {
				let rotation = 0;
				if(charts7 == 'chart73') {
					rotation = -45;
				}else {
					rotation = 0;
				} 
				charts7 = Highcharts.chart('chart7'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight: 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: rotation,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories7
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							}
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949', 
								fontSize: '12px', 
								fontWeight: 'bold',
								textOverflow: "width", // "ellipsis"
							}
					    },
						categories: categories7
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							borderRadius: 5,
							// bar 너비
							pointWidth: 22,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 10,
						zIndex: 100,
						style: {fontSize :'14px', color: '#fff', textAlign: 'center', fontWeight: '600'},
						formatter: function() {
							let commaY = (tooltipVal[this.point.index].toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 만개</span>';
						},
					},
					series: seriesyearData7
				});
			}else if(tblId == 'DT_1FL_7003') {
				let width = "";
				let verticalAlign = "";
				let align = "";
				let itemMarginTop = "";
				let legendX = "";
				let rotation = "";
				if(count == 3 || count == 10) {// 제조업
					width = 120;
					verticalAlign = 'middle';
					align = 'left';
					itemMarginTop = 8;
					legendX = -15;
					rotation = -45;
				}else {
					width = '';
					verticalAlign = 'bottom';
					align = 'center';
					itemMarginTop = 2;
					rotation = 0;
				}
				charts7 = Highcharts.chart('chart7'+count, {
					chart : chartType,
					credits: {enabled: false}, // highchart 워터마크 숨김처리
					exporting : {
						enabled : false,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: rotation,
									style: {
										color: '#494949', 
										fontSize: '12px', 
										fontWeight: 'bold',
										textOverflow: "width", // "ellipsis"
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
								categories: categories7
							},
							series: {
								dataLabels: {
									style: {
										allowOverlap: true,
										fontFamily: $more3DashDetail.downloadFont,
									}
								}
							},
							legend: {
								itemStyle: {
									textOverflow: "ellipsis",
									fontSize :'12px',
									color: '#333333',
									textAlign:'center',
									fontWeight: '600',
									fontFamily: $more3DashDetail.downloadFont,
								},
							},
						}
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						width: width,
						verticalAlign: verticalAlign,
						align: align,
						itemMarginTop: itemMarginTop,
						x: legendX,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: {
						categories: categories7,
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
								letterSpacing: '0px',
							},
						},
						lineColor: '#cfcfcf',
						gridLineWidth: 0,
						tickWidth: 0,
						tickColor: '#cfcfcf',
						tickPosition: 'inside'
					},
					yAxis: [{
						// y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						// crop: false,
						stackLabels: {
							/*
							 * overflow: 'allow', crop: false,
							 */
							enabled: true,// stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							format: '{total} 만개',
							style: {
								fontSize: '10px',
								fontWeight: '600',
								color:'#000'
							}
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',// stacked bar 필수 설정 옵션.(default
												// undefined)
							// bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*
							 * borderRadiusTopLeft: 8, borderRadiusTopRight: 8
							 */
						},
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
					},
					tooltip: {
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
						},
						formatter: function() {
							return this.points[0].x + '</br><span style="color:#EEFF2E">' + totalVal2[this.points[0].point.index] + ' 만개</span>';
							
							/*
							 * var s = ''; $.each(this.points, function(i,
							 * point) { s += point.series.name + ' <span
							 * style="color:#EEFF2E">' + point.y + ' 만개</span></br>';
							 * }); return s;
							 */
						},
						shared: true
					},
					series: seriesyearData7 
				});
			}else if(tblId == 'DT_1FL_7006') {
				if(count == 1) {subtitleVal = $more3DashDetail.util.comma(Number(res[0].DT));}
				else if(count == 2) {subtitleVal = $more3DashDetail.util.comma(Number(res[1].DT));}
				else if(count == 3) {subtitleVal = $more3DashDetail.util.comma(Number(res[2].DT));}

				charts7 = Highcharts.chart('chart7'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						chartOptions: {
							subtitle: {
								text: '전체 일자리수<br><span class="customSt2" style="font-size: 16px">'+subtitleVal+'만개</span>',
								align: 'center',
								verticalAlign: 'middle',
								x: -120,
								y: 10,
								style: {
									color: $more3DashDetail.subtitleTextColor,
									fontSize: '12px',
									fontWeight:'bold',
									lineHeight: 30,
									fontFamily: $more3DashDetail.downloadFont,
								}
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							legend: {
								enabled: true,
								width: 220,
								verticalAlign: 'middle',
								align: 'right',
								itemMarginTop: 8,
								x: 0,
								y: -8,
								itemStyle: {
									fontFamily: $more3DashDetail.downloadFont,
								},
							}
						}
					},
					title: {text: ''},
					subtitle: {
						text: '전체 일자리수<br><span class="customSt2" style="font-size: 20px">'+subtitleVal+'만개</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: -120,
						y: 10,
						style: {
							color: $more3DashDetail.subtitleTextColor,
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					yAxis: {
						title: {text: ''},
						labels: {enabled: false}
					},
					xAxis: {
						labels: {style: {color: '#494949', fontSize: '10px', fontWeight: 'bold'}},
						categories: ""
					},
					legend: {
						enabled: true,
						width: 220,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						y: -8,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							// fontFamily: 'Noto Sans KR',
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let thisY = (this.y).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + thisY + '만개)';
							}
						}
					},
					plotOptions: {
						pie: {
							size: '80%',
							showInLegend: true,
							startAngle: startAngle,
							endAngle: endAngle,
						}
					},
					
					tooltip: {
						useHTML: true,
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '만개',
						shadow: false,
						padding: 12,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center', 
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							let thisY = $more3DashDetail.util.comma(this.y);
							return this.point.name + '</br><span style="color:#EEFF2E">' + thisY + ' 만개</span>';
						},
					},
					series: seriesyearData7
				});
			}else if(tblId == "DT_1FL_7007") {
				charts7 = Highcharts.chart('chart7'+count, {
					chart: chartType,
					credits: {enabled: false},
					exporting: {
						enabled: false,
						sourceHeight : 500,
						chartOptions: {
							xAxis: {
								labels: {
									rotation: -45,
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
							series: {
								dataLabels: {
									style: {
										fontFamily: $more3DashDetail.downloadFont,
									}
								},
							},
						}
					},
					title: {text: ''},
					subtitle: {text: ''},
					yAxis: [{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					},{
						title: {text: ''},
						labels: {enabled: false},
						lineColor: '#E8E8E8'
					}],
					xAxis: {
						labels: {
							rotation: 0,
							style: {
								color: '#494949',
								fontSize: '12px',
								fontWeight: 'bold',
								textOverflow: 'width'
							}
						},
						categories: categories7
					},
					legend: {
						enabled: false,
						itemMarginTop: -10
					},
					plotOptions: {
						series: {
							pointWidth: 22,
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor: '#F15C80',
								fillColor: '#ffffff',
								// fontFamily: 'Noto Sans KR'
							}
						}
					},
					tooltip: {
						enabled: false,
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor: '#000000',
						borderWidth: 0,
						valueSuffix: '%',
						shadow: false,
						padding: 12,
						zIndex: 100,
						style: {
							fontSize :'14px', 
							color: '#fff', 
							textAlign: 'center',
							fontWeight: '600',
							lineHeight:1.2
						},
						formatter: function() {
							// return this.series.name + '</br><span
							// style="color:#EEFF2E">총계 ' +
							// chartValRatio6[this.point.index] + '만개</span>';
							// return this.x + '</br><span
							// style="color:#EEFF2E">' + this.y + ' 만개</span>';
						},
					},
					series: seriesyearData7
				});
				$('#chartBtn6').off('click');
				$('#chartBtn6').click(function(){
					for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
						if($('.tabArea7 .chartbox div').attr('id') == 'chart7'+i){charts6.exportChart();}
					}
				});
			}else if(tblId == 'DT_1FL_7009') {
				charts7 = Highcharts.chart('chart7'+count, {
					credits: {enabled: false},
					exporting: {enabled: false},
					legend: {enabled: false},
					/*
					 * colorAxis: { minColor: '#DEEFFF', maxColor: '#007DF6' },
					 */
					title: {text: ''},
					tooltip:{
						// valueSuffix: "",
						useHTML: true,// 툴팁 포맷을 html로 변경할 경우 true로 지정.(default
										// false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight:1.2,
						},
						formatter: function() { // durl
							/*
							 * console.log(this.series.data);
							 * console.log(this.series.data.length);
							 * console.log(this.series.data[8].value);
							 */
							let count = 0;
							let data = "";
							let num = 0;
							console.log(this.series.data);
							for(let i=0; i<this.series.data.length; i++) {
								if(this.series.data.length == 21) {
									num += this.series.data[count].value;
									count += 1;
									if(count == 22) break;
								}
							}
							
							let totNum = num.toFixed(1);
							console.log(totNum);
							let cutTotalData = this.point.value.toFixed(1); // 소수점
							let percentVal = ((cutTotalData / totNum)* 100).toFixed(1);
							return this.point.name +"("+ percentVal +'%)<span style="color:#EEFF2E"></br>'+ cutTotalData +' 만개</span>';
						},
						shared: true
					},
					series: seriesyearData7
				});
			}
			$('#chartBtn6').off('click');
			$('#chartBtn6').click(function(){
				for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
					if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart72'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart73'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart74'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart75'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart76'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart77'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart78'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart79'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart710'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart711'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart712'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart713'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart714'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart715'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart716'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart717'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart718'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart719'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart720'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart721'){charts7.exportChart();}
					if($('.tabArea7 .chartbox div').attr('id') == 'chart722'){charts7.exportChart();}
				}
			});
		}
	};
	$more3DashDetail.util = {
		/**
		 * @name : $more3DashDetail.util.searchBtn
		 * @description : 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		searchBtn2 : function() {
			var tblIdData = $("#modalSearchTitle2").val();
			var yearData = $("#modalSearchYear").val();
			console.log(tblIdData);
			console.log(yearData);
			$(".header-tag #headerSearchYear").val(yearData).prop("selected", true); // 여기
			$more3DashDetail.ui.openApiSearchChange(tblIdData, yearData);
		},
		/**
		 * @name : $more3DashDetail.util.headerSearchSelect
		 * @description : Header 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		headerSearchSelect : function() {
			var tblIdData = $("#modalSearchTitle2").val();
			var yearData = $(".header-tag #headerSearchYear").val();
			console.log(tblIdData);
			console.log(yearData);
			$('#modalSearchYear').val(yearData).prop("selected", true);
			$more3DashDetail.ui.openApiSearchChange(tblIdData, yearData);
		},	
		/**
		 * @name : $more3DashDetail.util.newEstPrdCntDataAjax
		 * @description : ajax 데이터 (최근 12개 데이터 호출)
		 * @date : 2022.11.17
		 * @author : 조규환
		 * @history :
		 */
		newEstPrdCntDataAjax : function(dataParam) {
			console.log(dataParam);
			let proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			let res = "";
			let param ={
				 method:"getList"
				,apiKey:apiKey
				,itmId:dataParam[0]
				,objL1:dataParam[1]
				,objL2:dataParam[2]
				,objL3:dataParam[3]
				,prdSe:'Q'
				,format:'json'
				,jsonVD:'Y'
				,newEstPrdCnt:dataParam[4]
				,orgId:'101'
				,tblId:dataParam[5]
			}
			$.ajax({
				url: proxy+"https://kosis.kr/openapi/Param/statisticsParameterData.do?",
				type: 'get',
				async: false,
				data: param,
				dataType: "json"
			}).done(function(result){
				res = result;
			});
			return res;
		},
		/**
		 * @name : $more3DashDetail.util.dataAjax
		 * @description : ajax 데이터
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */	
		dataAjax : function(dataParam) {
			let proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			let res = "";
			let param ={
					 method:"getList"
					,apiKey:apiKey
					,itmId:dataParam[0]
					,objL1:dataParam[1]
					,objL2:dataParam[2]
					,objL3:dataParam[3]
					,prdSe:'Q'
					,format:'json'
					,jsonVD:'Y'
					,startPrdDe:dataParam[4]
					,endPrdDe:dataParam[5]
					,orgId:'101'
					,tblId:dataParam[6]
			}
			$.ajax({
				url: proxy+"https://kosis.kr/openapi/Param/statisticsParameterData.do?",
				type: 'get',
				async: false,
				data: param,
				dataType: "json"
			}).done(function(result){
				res = result;
			});
			return res;
		},
		/**
		 * @name : $more3DashDetail.util.division
		 * @description : 차트 데이터배열 n개씩 자르기
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */
		division : function(data = [], size = 1) { // data = [], size = 1,
													// data, number
			const items = [...data];
			const arr = [];
			while (items.length) {
				arr.push(items.splice(0, size));
			}

			return arr;
		},
		/**
		 * @name : $more3DashDetail.util.overlapRemove
		 * @description : 차트 데이터배열 중복제거
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */
		overlapRemove : function(dataArr) {
			const set = new Set(dataArr);
			const newArr = [...set];
			return newArr;
		},
		/**
		 * @name : $more3DashDetail.util.design
		 * @description : ajax 데이터
		 * @date : 2022.10.19
		 * @author : 조규환
		 * @history :
		 */	
		design : function(tblId) {
			if(tblId == "DT_1FL_7001") {
				$(".dashboardbox-type.line1").empty();
				$(".dashboardbox-type.line2").empty();
				$(".dashboardbox-type.line1").append("<div class='item flex-width-600 flex-height-280'><div class='title'><span id='title1'>분기별 임금근로 일자리 및 증감</span><button id='chartBtn1'><img src='/images/administStatsDetail/btn_down_chart.png' alt='' /></button>"+
						"<span class='select1'></span></div><div class='chartbox'><figure class='highcharts-figure'>" +
						"<div id='chart11' style='width:570px; height:230px; margin:0 auto'></div></figure></div></div>");
				$(".dashboardbox-type.line1").append("<div class='item flex-width-820 flex-height-280 flex-mgL-10 charttitle' id='charttitle5'><div class='title'>" +
						"<span id='title2'>2021년 4분기 산업대분류별 임금근로 일자리 구성비</span><button id='chartBtn2'><img src='/images/administStatsDetail/btn_down_chart.png' alt='' /></button>" +
						"<span class='select2'></span></div><section class='tabArea2'><div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'>" +
						"<div id='chart21' style='width:800px; height:240px'></div></figure></div></div></section></div>");
				$(".dashboardbox-type.line2").append("<div class='item-box flex-width-600 flex-height-500' id='chartBox'><div class='item flex-width-405 flex-height-280 flex-mgL-10 charttitle' id='charttitle3'>" +
						"<div class='title'><span id='title3'>2021년 4분기 산업대분류별 임근근로 일자리</span><button id='chartBtn3'>" +
						"<img src='/images/administStatsDetail/btn_down_chart.png' alt='' /></button><span class='select3'></span></div><section class='tabArea3'>" +
						"<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:390px; height:200px;'></div>" +
						"</figure></div></div></section></div>");
				$(".dashboardbox-type.line2").append("<div class='item flex-width-600 flex-height-500 charttitle' id='charttitle4'>" +
						"<div class='title'><span id='title4'>2021년 4분기 산업대분류별 임근근로 일자리 증감</span><button id='chartBtn4'><img src='/images/administStatsDetail/btn_down_chart.png' alt='' /></button>" +
						"<span class='select4'></span></div><section class='tabArea4'><div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'>" +
						"<div id='chart41' style='width:570px; height:390px;'></div></figure></div></div></section></div></div>");
			}
		},
		/**
		 * @name : $more3DashDetail.util.selectChart
		 * @description : 각차트 셀렉트창 생성
		 * @date : 2022.10.26
		 * @author : 조규환
		 * @history :
		 */	
		selectChart : function(tblId, selectNm1, selectNm2, selectNm3, selectNm4, selectNm5, selectNm6, selectNm7, selectNm2_1, selectVal, selectVal2) {
			let option1 = new Array;
			let option2 = new Array;
			let option2_1 = new Array;
			let option3 = new Array;
			let option4 = new Array;
			let option4_1 = new Array;
			let option5 = new Array;
			let option6 = new Array;
			let option6_1 = new Array;
			let option7 = new Array;
			for(let i=1; i<8; i++) {
				$('.select'+i).empty();
			}
			if(tblId == "DT_1FL_7001") {
				$(".select6").append("<select class='' id='selectChoice6'></select>");
				$(".select7").append("<select class='' id='selectChoice7'></select>");
				for(let i=0; i<selectNm5.length; i++) {
					option6 = "<option value='" +i+ "'>"+selectNm5[i]+"</option>";;
					option7 = "<option value='" +i+ "'>"+selectNm6[i]+"</option>";;
					$('#selectChoice6').append(option6);
					$('#selectChoice7').append(option7);
				}
			}else if(tblId == "DT_1FL_7003") {
				$(".select2").append("<select class='' id='selectChoice2'></select>");
				$(".select7").append("<select class='' id='selectChoice7'></select>");
				for(let i=0; i<selectNm2.length; i++) {
					option2 = "<option value='" +i+ "'>"+selectNm2[i]+"</option>";;
					$('#selectChoice2').append(option2);
				}
				for(let i=0; i<selectNm7.length; i++) {
					option7 = "<option value='" +i+ "'>"+selectNm7[i]+"</option>";;
					$('#selectChoice7').append(option7);
				}
			}else if(tblId == "DT_1FL_7004") {
				$(".select2").append("<select class='' id='selectChoice2'></select>");
				$(".select3").append("<select class='' id='selectChoice6'></select>");
				for(let i=0; i<selectNm2.length; i++) {
					option2 = "<option value='" +selectVal[i]+ "'>"+selectNm2[i]+"</option>";;
					$('#selectChoice2').append(option2);
				}
				for(let i=0; i<selectNm6.length; i++) {
					option6 = "<option value='" +selectVal2[i]+ "'>"+selectNm6[i]+"</option>";;
					$('#selectChoice6').append(option6);
				}
			}else if(tblId == "DT_1FL_7006") {
				$(".select3").append("<select class='' id='selectChoice3'></select>");
				$(".select5").append("<select class='' id='selectChoice5'></select>");
				$(".select7").append("<select class='' id='selectChoice7'></select>");
				for(let i=0; i<selectNm3.length; i++) {
					option3 = "<option value='" +i+ "'>"+selectNm3[i]+"</option>";;
					option5 = "<option value='" +i+ "'>"+selectNm5[i]+"</option>";;
					option7 = "<option value='" +i+ "'>"+selectNm7[i]+"</option>";;
					$('#selectChoice3').append(option3);
					$('#selectChoice5').append(option5);
					$('#selectChoice7').append(option7);
				}
			}else if(tblId == "DT_1FL_7007") {
				$(".select6").append("<select class='' id='selectChoice6'></select>");
				$(".select7").append("<select class='' id='selectChoice7'></select>");
				for(let i=0; i<selectNm1.length; i++) {
					option6 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
					option7 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
					$('#selectChoice6').append(option6);
					$('#selectChoice7').append(option7);
				}
			}else if(tblId == "DT_1FL_7008") {
				$(".select4").append("<select class='' id='selectChoice4'></select>");
				$(".select5").append("<select class='' id='selectChoice6'></select>");
				for(let i=0; i<selectNm4.length; i++) {
					option4 = "<option value='" +i+ "'>"+selectNm4[i]+"</option>";;
					option6 = "<option value='" +i+ "'>"+selectNm6[i]+"</option>";;
					$('#selectChoice4').append(option4);
					$('#selectChoice6').append(option6);
				}
			}else if(tblId == "DT_1FL_7009") {
				$(".select2").append("<select class='' id='selectChoice2'></select>");
				$(".select3").append("<select class='' id='selectChoice3'></select>");
				for(let i=0; i<selectNm1.length; i++) {
					option2 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
					$('#selectChoice2').append(option2);
				}
				for(let i=0; i<selectNm2.length; i++) {
					option3 = "<option value='" +i+ "'>"+selectNm2[i]+"</option>";;
					$('#selectChoice3').append(option3);
				}
			}else if(tblId == "DT_1FL_7010") { // 10번 대기
				$(".select1").append("<select class='' id='selectChoice1'></select>");
				$(".select3").append("<select class='' id='selectChoice3'></select>");
				for(let i=0; i<selectNm1.length; i++) {
					option1 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
					$('#selectChoice1').append(option1);
				}
				for(let i=0; i<selectNm2.length; i++) {
					option3 = "<option value='" +i+ "'>"+selectNm2[i]+"</option>";;
					$('#selectChoice3').append(option3);
				}
			}
		},
		/**
		 * @name : $more3DashDetail.util.horizontalScroll
		 * @description : 가로스크롤
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		horizontalScroll : function(tblId) {
			if(tblId == "DT_1FL_7001") {
				$("#chart21").css("width", "1080px");
				$("#chart21").css("height", "220px");
				$("#chart41").css("width", "2000px");
				$("#chart41").css("height", "415px");
				$("#chart63").css("width", "2000px");
				$("#chart63").css("height", "168px");
				$("#chart73").css("width", "2000px");
				$("#chart73").css("height", "168px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea6 .tabBox:eq(2) .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea7 .tabBox:eq(2) .chartbox .highcharts-figure").css("overflow-x", "auto");
			}else if(tblId == "DT_1FL_7002") {
				$("#chart21").css("width", "1050px");
				$("#chart21").css("height", "215px");
				$("#chart41").css("width", "7500px");
				$("#chart41").css("height", "415px");
				$("#chart61").css("width", "1500px");
				$("#chart61").css("height", "415px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea6 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}else if(tblId == "DT_1FL_7003") {
				$("#chart21").css("width", "1080px");
				$("#chart21").css("width", "1100px");
				$("#chart21").css("height", "210px");
				$("#chart22").css("width", "1080px");
				$("#chart22").css("width", "1100px");
				$("#chart22").css("height", "210px");
				$("#chart23").css("width", "1080px");
				$("#chart23").css("width", "1100px");
				$("#chart23").css("height", "210px");
				$("#chart24").css("width", "1080px");
				$("#chart24").css("width", "1100px");
				$("#chart24").css("height", "210px");
				$("#chart25").css("width", "1080px");
				$("#chart25").css("width", "1100px");
				$("#chart25").css("height", "210px");
				$("#chart41").css("width", "6000px");
				$("#chart41").css("height", "430px");
				$("#chart41").css("width", "6000px");
				$("#chart41").css("height", "415px");
				$("#chart73").css("width", "6500px");
				$("#chart73").css("height", "420px");
				$("#chart710").css("width", "2000px");
				$("#chart710").css("height", "420px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea7 .tabBox:eq(2) .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea7 .tabBox:eq(9) .chartbox .highcharts-figure").css("overflow-x", "auto");
			}else if(tblId == "DT_1FL_7004") {
				$("#chart41").css("width", "100%");
				$("#chart41").css("height", "10000px");				
				$("#chart71").css("width", "6000px");
				$("#chart71").css("height", "320px");
				$(".tabArea4 .tabBox .chartbox").css("height", "340px");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css({"overflow-y":"auto","height":"100%"});
				$(".tabArea7 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}else if(tblId == "DT_1FL_7007") {
				$("#chart21").css("width", "1300px");
				$("#chart21").css("height", "210px");
				/*
				 * $("#chart31").css("width", "1500px");
				 * $("#chart31").css("height", "210px");
				 */
				/*
				 * $("#chart61").css("width", "2500px");
				 * $("#chart61").css("height", "185px");
				 * $("#chart71").css("width", "2500px");
				 * $("#chart71").css("height", "185px");
				 * $("#chart72").css("width", "1300px");
				 * $("#chart72").css("height", "195px");
				 * $("#chart73").css("width", "1300px");
				 * $("#chart73").css("height", "195px");
				 */
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				/*
				 * $(".tabArea3 .tabBox .chartbox
				 * .highcharts-figure").css("overflow-x", "auto");
				 */
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				/*
				 * $(".tabArea6 .tabBox .chartbox
				 * .highcharts-figure").css("overflow-x", "auto"); $(".tabArea7
				 * .tabBox .chartbox .highcharts-figure").css("overflow-x",
				 * "auto");
				 */
			}else if(tblId == "DT_1FL_7008") {
				$("#chart21").css("width", "1300px");
				$("#chart21").css("height", "210px");
				$("#chart31").css("width", "1500px");
				$("#chart31").css("height", "210px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}else if(tblId == "DT_1FL_7010") {
			}
		},
		/**
		 * @name : $more3DashDetail.util.comma
		 * @description : 콤마 / 소수점 한자리(.0)
		 * @date : 2023.01.04
		 * @author : 조규환
		 * @history :
		 */
		comma : function(n) {
			let comma = 0;
			comma = n.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return comma;
		}
	};
}(window, document));
