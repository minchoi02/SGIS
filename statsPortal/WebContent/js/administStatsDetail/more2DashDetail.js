(function(W, D){
	W.$more2DashDetail = W.$more2DashDetail || {};
	
	$(document).ready(function(){
	});
	$(window).load(function(){
	});
	
	$more2DashDetail.ui = {
		init : function(){
			console.log(gv_url+" : ===퇴직연금통계===");
			$administStatsMain.ui.appendContent("/view/administStatsDetail/more2Dash/main");
			setTimeout(function(){
				$more2DashDetail.ui.ready();
			}, 500);
		},
		ready : function(){
			$more2DashDetail.ui.more2Api();
			setTimeout(function() {
				$administStatsMain.ui.loading(false);
			}, 2000);
		},
		more2Api : function() {
			if(gv_checkmenu == 'more1'){
				$('#toplistpanelmain').text('일자리통계편');
			} else if(gv_checkmenu == 'more2'){
				$('#toplistpanelmain').text('퇴직연금 통계 목록');
			} else if(gv_checkmenu == 'more3'){
				$('#toplistpanelmain').text('임금근로 일자리동향');
			}
			var parentListId = '';
			if(gv_checkmenu == 'more1'){
				parentListId = '101_2016_10';
			} else if(gv_checkmenu == 'more2'){
				parentListId = '101_RP_002';
			} else if(gv_checkmenu == 'more3'){
				parentListId = '101_003';
			}
			var parameter ={
					 method:"getList"
					,apiKey:apiKey
					,vwCd:"MT_OTITLE"
					,parentListId:parentListId
					,format:"json"
					,jsonVD:"Y"
			}
			
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			var proxy = "/view/totSurv/proxy?";
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			$.ajax({
				url: proxy + "https://kosis.kr/openapi/statisticsList.do?",
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
					if(itemInfo[i].TBL_NM.length > 16){
						tblNm = itemInfo[i].TBL_NM.substring(0, 16) + "...";
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
				$("#list1").css({'overflow-y':'auto', 'overflow-x':'hidden'}).css('height', 40*il1+'px');
				
				for(var i=0;i<$("a.searchmenua").length;i++){
					if(gv_checkmenu == 'more1'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:openApiSearch(this);");
					} else if (gv_checkmenu == 'more2'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more2DashDetail.ui.openApiSearch2(this);");
					} else if (gv_checkmenu == 'more3'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:openApiSearch3(this);");
					}
				}
				$('.con .listbox:text').css('display', 'none');
				setTimeout(function(){
					$("a.searchmenua:eq(0)").click();
				},500);
			});
		},
		searchInput : function() {
			$(".searchLayer").fadeIn();
			var parentListId = '';
			console.log(gv_checkmenu);
			if(gv_checkmenu == 'more1'){
				parentListId = '101_2016_10';
			} else if(gv_checkmenu == 'more2'){
				parentListId = '101_RP_002';
			} else if(gv_checkmenu == 'more3'){
				parentListId = '101_003';
			}
			var parameter ={
					 method:"getList"
					,apiKey:apiKey
					,vwCd:"MT_OTITLE"
					,parentListId:parentListId
					,format:"json"
					,jsonVD:"Y"
			}
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			var proxy = "/view/totSurv/proxy?";
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			$.ajax({
				url: proxy + "https://kosis.kr/openapi/statisticsList.do?",
				type: 'get',
				data: parameter,
				dataType: "json"
			}).done(function(result){
				itemInfo = result;
				var list2 = document.getElementById('list2');
				var searchMemoryList = new Array;
				var il1=0;
				list2.innerHTML = '';
				for(var i=0;i<itemInfo.length;i++){
					let tblNm = "";
					if(itemInfo[i].TBL_NM.length > 28){
						tblNm = itemInfo[i].TBL_NM.substring(0, 26) + "...";
					} else {
						tblNm = itemInfo[i].TBL_NM;
					}
					var stattb_url = "https://kosis.kr/statHtml/statHtml.do?orgId=101&tblId=" + itemInfo[i].TBL_ID + "&conn_path=I2";
					if($('.searchInput').val() != ''){
						if(itemInfo[i].TBL_NM.includes($('.searchInput').val()) == true){
							list2.innerHTML += '<tr><td data-org_id="' + itemInfo[i].ORG_ID + '" data-tbl_id="' + itemInfo[i].TBL_ID +	'" data-tbl_nm="' + itemInfo[i].TBL_NM + '">' +
											   '<a class="searchmenua" style="width: 240px;" href="javascript:void(0);" title="' + itemInfo[i].TBL_NM + '">' + tblNm + '</a></td></tr>';
							il1++;
						}
					}
				}
				il2++;
				localStorage.setItem('memory', $('.searchInput').val());
				
				if($('.searchInput').val() == ''){
					alert('검색어를 입력하세요.');
					$('#searchCount').text('0건');
					$('.searchInput').focus();
					return;
				} else {
					/*for(let i=0; i<$('#searchMemory > tr').length; i++) {
						searchMemoryList.push($('#searchMemory > tr td a:eq('+i+')').text());
					}*/
					$('#searchMemory').append('<tr><td><a onclick="$more2DashDetail.ui.searchClick('+il2+')" style="cursor:pointer">' + localStorage.getItem('memory') + 
								  '</a><img src="/images/administStatsDetail/btnClose.png" id="img'+il2+'" onclick="$more2DashDetail.ui.remove('+il2+')" class="btnTagHidden" /></td></tr>');
					/*console.log(searchMemoryList);
					console.log(searchMemoryList.length);
					for(let i=0; i<searchMemoryList.length; i++) {
						console.log(i);
						
						if($('.searchInput').val() == searchMemoryList[i]) {
							alert("1");
							console.log(searchMemoryList[i]);
						}else {
							alert("2");
							$('#searchMemory').append('<tr><td><a onclick="$more2DashDetail.ui.searchClick('+il2+')" style="cursor:pointer">' + localStorage.getItem('memory') + 
									  '</a><img src="/images/administStatsDetail/btnClose.png" id="img'+il2+'" onclick="$more2DashDetail.ui.remove('+il2+')" class="btnTagHidden" /></td></tr>');
						}
					}
					console.log($('#searchMemory > tr').length);
					console.log($('#searchMemory > tr td a:eq(0)').text());
					console.log($('#searchMemory > tr td a:eq(1)').text());
					console.log('-----------');*/
				}
				$('#searchCount').text(il1 + '건');
				$(".con").css({'display': 'block'});
				$(".searchMemory").css('max-height', '120px');
				$(".searchMemory").css({'overflow-y':'auto', 'overflow-x':'hidden'});
				
				for(var i=0; i<$("a.searchmenua").length; i++){
					if(gv_checkmenu == 'more1'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more1DashDetail.ui.openApiSearch(this);");
					} else if (gv_checkmenu == 'more2'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more2DashDetail.ui.openApiSearch2(this);");
					} else if (gv_checkmenu == 'more3'){
						$("a.searchmenua:eq(" + i + ")").attr("onclick", "javascript:$more3DashDetail.ui.openApiSearch3(this);");
					}
				}
				$('.searchInput').val('');
				$('.searchInput').focus();
			});
		},
		/**
		 * @name : $more2DashDetail.ui.remove
		 * @description : 
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		remove : function(n) {
			$('#img'+n+'').parent().parent().remove();
		},
		/**
		 * @name : $more2DashDetail.ui.searchClick
		 * @description : 
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		searchClick : function(n) {
			$('.searchInput').val($('#img'+n+'').parent().text());
			$more2DashDetail.ui.searchInput();
		},
		/**
		 * @name : $more2DashDetail.ui.chartDatachange
		 * @description : 데이터 호출
		 * @date : 2022.11.30
		 * @author : 조규환
		 * @history :
		 */
		chartDatachange: function(tblId, prdDe) { 
			var selectedYear = prdDe + '년';
			console.log(selectedYear);
			if(tblId == 'DT_1RP101'){
				$('#title1').text('연도별 퇴직연금제도 가입률(총계)');
				$('#title2').text(selectedYear + ' 성별 연령별 퇴직연금제도 가입률');
				$('#title3').text('연도별 퇴직연금제도 가입(대상) 근로자');
				$('#title4').text(selectedYear + ' 성별 연령별 퇴직연금제도 가입(대상) 근로자');
				$('#title5').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title6').text(selectedYear + ' 연령별 퇴직연금제도 가입 근로자');
				/*$('#tabArea2').show();*/
				/*$('#chartTab1_2').show();
				$('#chartTab2_2').show();
				$('#chartTab2_2').text('남자');
				$('#chartTab2_3').text('여자');*/
			} else if(tblId == 'DT_1RP102'){
				$('#title1').text('연도별 퇴직연금제도 가입률(총계)');
				$('#title2').text(selectedYear + ' 성별 근속기간별 퇴직연금제도 가입률');
				$('#title3').text('연도별 퇴직연금제도 가입(대상) 근로자');
				$('#title4').text(selectedYear + ' 성별 근속기간별 퇴직연금제도 가입(대상) 근로자');
				$('#title5').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title6').text(selectedYear + ' 근속기간별 퇴직연금제도 가입 근로자');
				//$('#tabArea2').show();
				/*$('#chartTab1_2').show();
				$('#chartTab1_2').text('성별');
				$('#chartTab1_3').text('근속기간별');
				$('#chartTab2_1').text('총계');
				$('#chartTab2_2').show();
				$('#chartTab2_2').text('남자');
				$('#chartTab2_3').text('여자');*/
			} else if(tblId == 'DT_1RP103'){
				$('#title1').text('연도별 퇴직연금제도 가입률(총계)');
				$('#title2').text(selectedYear + ' 종사자규모별 퇴직연금제도 가입률');
				$('#title3').text('연도별 퇴직연금제도 가입(대상) 근로자');
				$('#title4').text(selectedYear + ' 종사자규모별 퇴직연금제도 가입(대상) 근로자');
				$('#title5').text(selectedYear + ' 종사자규모별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_3').text('종사자규모별');*/
				//$('#charttitle6').hide();
			} else if(tblId == 'DT_1RP104'){
				$('#title1').text('연도별 퇴직연금제도 가입률(총계)');
				$('#title2').text(selectedYear + ' 산업대분류별 퇴직연금제도 가입률');
				$('#title3').text('연도별 퇴직연금제도 가입(대상) 근로자');
				$('#title4').text(selectedYear + ' 산업대분류별 퇴직연금제도 가입(대상) 근로자');
				$('#title5').text(selectedYear + ' 산업대분류별 퇴직연금제도 가입 근로자');
				$('#chartTab1_3').text('산업대분류별');
				//$('#charttitle2').hide();
			} else if(tblId == 'DT_1RP105'){
				$('#title1').text('연도별 퇴직연금제도 도입률(총계)');
				$('#title2').text(selectedYear + ' 종사자규모별 퇴직연금제도 도입률');
				$('#title3').text('연도별 퇴직연금제도 도입(대상) 사업장');
				$('#title4').text(selectedYear + ' 종사자규모별 퇴직연금제도 도입(대상) 사업장');
				$('#title5').text(selectedYear + ' 종사자규모별 퇴직연금제도 도입 사업장');
				$('#chartTab1_3').text('종사자규모별');
				//$('#charttitle2').hide();
			} else if(tblId == 'DT_1RP106'){
				$('#title1').text('연도별 퇴직연금제도 도입률(총계)');
				$('#title2').text(selectedYear + ' 산업대분류별 퇴직연금제도 도입률');
				$('#title3').text('연도별 퇴직연금제도 도입(대상) 사업장');
				$('#title4').text(selectedYear + ' 산업대분류별 퇴직연금제도 도입(대상) 사업장');
				$('#title5').text(selectedYear + ' 산업대분류별 퇴직연금제도 도입 사업장');
				$('#chartTab1_3').text('산업대분류별');
				//$('#charttitle2').hide();
			} else if(tblId == 'DT_1RP000'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 성별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				$('#chartTab1_2').show();
				$('#chartTab1_2').text('성별');
				/*$('#chartTab1_3').hide();
				$('#charttitle2').hide();
				$('#charttitle3').hide();*/
			} else if(tblId == 'DT_1RP001'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 성별 연령별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 연령별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title4').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 연령별 퇴직연금제도 가입 근로자');
				$('#title6').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_2').show();
				$('#chartTab1_3').show();*/
			} else if(tblId == 'DT_1RP002'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 성별 근속기간별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 근속기간별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title4').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 근속기간별 퇴직연금제도 가입 근로자');
				$('#title6').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_2').show();
				$('#chartTab1_3').show();
				$('#chartTab1_3').text('근속기간별');*/
			} else if(tblId == 'DT_1RP003'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 산업대분류별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 산업대분류별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_3').show();
				$('#chartTab1_3').text('산업대분류별');
				$('#charttitle2').hide();
				$('#charttitle5').hide();*/
			} else if(tblId == 'DT_1RP004'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 성별 가입기간별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 가입기간별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title4').text(selectedYear + ' 성별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 가입기간별 퇴직연금제도 가입 근로자');
				$('#title6').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_2').show();
				$('#chartTab1_3').text('가입기간별');*/
			} else if(tblId == 'DT_1RP005'){
				$('#title1').text('연도별 퇴직연금제도 가입 근로자(총계)');
				$('#title2').text(selectedYear + ' 종사자규모별 제도유형별 퇴직연금제도 가입 근로자');
				$('#title3').text(selectedYear + ' 제도유형별 퇴직연금제도 가입 근로자');
				$('#title5').text(selectedYear + ' 종사자규모별 퇴직연금제도 가입 근로자');
				/*$('#chartTab1_3').text('종사자규모별');
				$('#charttitle2').hide();
				$('#charttitle5').hide();*/
			} else if(tblId == 'DT_1RP006'){
				$('#title1').text('연도별 퇴직연금제도 도입 사업장(총계)');
				$('#title2').text(selectedYear + ' 종사자규모별 제도유형별 퇴직연금제도 도입 사업장');
				$('#title3').text(selectedYear + ' 종사자규모별 퇴직연금제도 도입 사업장');
				$('#title5').text(selectedYear + ' 제도유형별 퇴직연금제도 도입 사업장');
				/*$('#chartTab1_3').text('종사자규모별');
				$('#charttitle2').hide();
				$('#charttitle5').hide();*/	
			} else if(tblId == 'DT_1RP007'){
				$('#title1').text('연도별 퇴직연금제도 도입 사업장(총계)');
				$('#title2').text(selectedYear + ' 산업대분류별 퇴직연금제도 도입 사업장');
				$('#title3').text(selectedYear + ' 산업대분류별 제도유형별 퇴직연금제도 도입 사업장');
				$('#title5').text(selectedYear + ' 제도유형별 퇴직연금제도 도입 사업장');
				/*$('#chartTab1_3').text('산업대분류별');
				$('#charttitle2').hide();
				$('#charttitle5').hide();*/
			} else if(tblId == 'DT_1RP008'){
				$('#title1').text('연도별 퇴직연금제도 도입 사업장(총계)');
				$('#title2').text(selectedYear + ' 도입기간별 제도유형별 퇴직연금제도 도입 사업장');
				$('#title3').text(selectedYear + ' 도입기간별 퇴직연금제도 도입 사업장');
				$('#title5').text(selectedYear + ' 제도유형별 퇴직연금제도 도입 사업장');
				/*$('#chartTab1_3').text('도입기간별');
				$('#charttitle2').hide();
				$('#charttitle5').hide();*/
			} else if(tblId == 'DT_1RP009'){
				$('#title1').text('연도별 개인형 IRP 가입자(총계)');
				$('#title2').text('연도별 개인형 IRP 적립금액(총계)');
				$('#title3').text(selectedYear + ' 성별 연령별 개인형 IRP 가입자');
				$('#title4').text(selectedYear + ' 성별 연령별 개인형 IRP 적립금액');
				$('#title5').text(selectedYear + ' 성별(연령별) 개인형 IRP 가입자');
				$('#title6').text(selectedYear + ' 성별(연령별) 개인형 IRP 적립금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('연령별');*/
			} else if(tblId == 'DT_1RP010'){
				$('#title1').text('연도별 개인형 IRP 가입자(총계)');
				$('#title2').text('연도별 개인형 IRP 적립금액(총계)');
				$('#title3').text(selectedYear + ' 성별 가입기간별 개인형 IRP 가입자');
				$('#title4').text(selectedYear + ' 성별 가입기간별 개인형 IRP 적립금액');
				$('#title5').text(selectedYear + ' 성별(가입기간별) 개인형 IRP 가입자');
				$('#title6').text(selectedYear + ' 성별(가입기간별) 개인형 IRP 적립금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('가입기간별');*/
			} else if(tblId == 'DT_1RP011'){
				$('#title1').text('연도별 개인형 IRP 추가 가입자(총계)');
				$('#title2').text('연도별 개인형 IRP 추가 적립금액(총계)');
				$('#title3').text(selectedYear + ' 대상자별 성별 개인형 IRP 가입자');
				$('#title4').text(selectedYear + ' 대상자별 성별 개인형 IRP 적립금액');
				$('#title5').text(selectedYear + ' 대상자별(성별) 개인형 IRP 가입자');
				$('#title6').text(selectedYear + ' 대상자별(성별) 개인형 IRP 적립금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('대상자별');
				$('.chartNm3').text('성별');*/
			} else if(tblId == 'DT_1RP012'){
				$('#title1').text('연도별 적립금액(총계)');
				$('#title2').text(selectedYear +' 금융권역별 운용방법별 적립금액');
				$('#title3').text(selectedYear +' 금융권역별 적립금액');
				$('#title5').text(selectedYear +' 운용방법별 적립금액');
				/*$('#chartTab1_2').show();
				$('#chartTab1_2').text('금융권역별');
				$('#chartTab1_3').text('운용방법별');
				$('#charttitle2').hide();
				$('#charttitle3').hide();*/
			} else if(tblId == 'DT_1RP013'){
				$('#title1').text('연도별 적립금액(총계)');
				$('#title2').text(selectedYear + ' 제도유형별 운용방법별 적립금액');
				$('#title3').text(selectedYear + ' 제도유형별 적립금액');
				$('#title5').text(selectedYear + ' 운용방법별 적립금액');
				/*$('#chartTab1_2').show();
				$('#chartTab1_2').text('제도유형별');
				$('#chartTab1_3').text('운용방법별');
				$('#charttitle2').hide();
				$('#charttitle3').hide();*/
			} else if(tblId == 'DT_1RP014'){
				$('#title1').text('연도별 개인형 IRP 이전자(총계)');
				$('#title2').text('연도별 개인형 IRP 이전금액(총계)');
				$('#title3').text(selectedYear + ' 성별 연령별 개인형 IRP 이전자');
				$('#title4').text(selectedYear + ' 성별 연령별 개인형 IRP 이전금액');
				$('#title5').text(selectedYear + ' 성별(연령별) 개인형 IRP 이전자');
				$('#title6').text(selectedYear + ' 성별(연령별) 개인형 IRP 이전금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('연령별');*/
			} else if(tblId == 'DT_1RP015'){
				$('#title1').text('연도별 IRP 해지자(총계)');
				$('#title2').text('연도별 IRP 해지금액(총계)');
				$('#title3').text(selectedYear + ' 성별 연령별 개인형 IRP 해지자');
				$('#title4').text(selectedYear + ' 성별 연령별 개인형 IRP 해지금액');
				$('#title5').text(selectedYear + ' 성별(연령별) 개인형 IRP 해지자');
				$('#title6').text(selectedYear + ' 성별(연령별) 개인형 IRP 해지금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('연령별');*/
			} else if(tblId == 'DT_1RP016'){
				$('#title1').text('연도별 퇴직연금 중도인출자(총계)');
				$('#title2').text('연도별 퇴직연금 중도인출금액(총계)');
				$('#title3').text(selectedYear + ' 사유별 성별 퇴직연금 중도인출자');
				$('#title4').text(selectedYear + ' 사유별 성별 퇴직연금 중도인출금액');
				$('#title5').text(selectedYear + ' 사유별(성별) 퇴직연금 중도인출자');
				$('#title6').text(selectedYear + ' 사유별(성별) 퇴직연금 중도인출금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('사유별');*/
			} else if(tblId == 'DT_1RP018'){
				$('#title1').text('연도별 퇴직연금 중도인출자(총계)');
				$('#title2').text('연도별 퇴직연금 중도인출금액(총계)');
				$('#title3').text(selectedYear + ' 사유별 성별 연령별 퇴직연금 중도인출자');
				$('#title4').text(selectedYear + ' 사유별 성별,연령별 퇴직연금 중도인출금액');
				$('#title5').text(selectedYear + ' 사유별(성별 연령별) 퇴직연금 중도인출자');
				$('#title6').text(selectedYear + ' 사유별(성별,연령별) 퇴직연금 중도인출금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('성별');
				$('.chartNm3').text('연령별');
				$('#chartTab2_1').text('사유별');
				$('#chartTab2_2').text('성별');
				$('#chartTab3_1').text('사유별');
				$('#chartTab3_2').text('성별');*/
			} else if(tblId == 'DT_1RP032'){
				$('#title1').text('연도별 IRP 이전예외자(총계)');
				$('#title2').text('연도별 IRP 이전예외 금액(총계)');
				$('#title3').text(selectedYear + ' 이전예외사유별 성별 IRP 이전예외자');
				$('#title4').text(selectedYear + ' 이전예외사유별 성별 IRP 이전예외 금액');
				$('#title5').text(selectedYear + ' 이전예외사유별(성별) IRP 이전예외자');
				$('#title6').text(selectedYear + ' 이전예외사유별(성별) IRP 이전예외 금액');
				/*$('#chartTab1_2').show();
				$('.chartNm2').text('이전예외사유별');
				$('.chartNm3').text('성별');*/
			}
			//$('.header-tag #headerSearchYear').off('change');
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP000" || tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP003" || tblId == "DT_1RP004" ||
			   tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" ||
			   tblId == "DT_1RP012" || tblId == "DT_1RP013" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP032") { //여기하자
				itmId1 = "ALL";
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "";
			}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				itmId1 = "ALL";
				objL1 = "ALL";
				objL2 = "";
				objL3 = "";
			}else if(tblId == "DT_1RP018") {
				itmId1 = "ALL";
				objL1 = "ALL";
				objL2 = "ALL";
				objL3 = "ALL";
			}
			let parameter2 = {
				 apiKey:apiKey
				,itmId: itmId1
				,objL1: objL1
				,objL2: objL2
				,objL3: objL3
				,format: "json"
				,jsonVD: "Y"
				,prdSe: "Y"
				,startPrdDe: prdDe
				,newEstPrdCnt : "1"	//최근수록시점 개수
				//,newEstPrdCnt: newEstPrdCnt
				/*,startPrdDe: "2015"
				,endPrdDe: "2020"*/
				,orgId: "101"
				,tblId: tblId	
			}
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			var proxy = "/view/totSurv/proxy?";
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			$.ajax({
				url: proxy+"https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList",
				type: 'get',
				async: false,
				data: parameter2,
				dataType: "json"
			}).done(function(res) {
				console.log("===================== 2 ~ 6 chart =====================");
				currentData = res;
				console.log(currentData);
			});
			setTimeout(function() {
				$more2DashDetail.chart.makeChartData(currentData);
			}, 300);
		},
		/**
		 * @name : $more2DashDetail.ui.yearDatachange
		 * @description : 데이터 호출
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		yearDatachange: function(res) {
			let tblId = res[0].TBL_ID;
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:915px; height:185px;'></div></figure></div></div>");
			}
			let charts2 = '';
			let charts3 = '';
			let prdDe = '';
			let overlapRemovePrdDe = new Array;
			let legendNm3 = new Array;
			let chartVal3 = new Array;
			let xAxis3 = new Array;
			let categories3 = new Array;
			let seriesyearData3 = new Array;
			let formatNm = new Array;
			let chartDivisionData3 = new Array;
			let selectNm1 = new Array;
			let chartColor3 = new Array;
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			//가입기간별
			let joinColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			for(let i=0; i<res.length; i++) {//중복여기
				overlapRemovePrdDe.push(res[i].PRD_DE);
			}
			prdDe = $more2DashDetail.util.overlapRemove(overlapRemovePrdDe);
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
				chartColor3 = genderColor;
			}
			if(tblId == 'DT_1RP101') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0" && res[i].C2 == "00") {
							if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP102') {
				//3번차트
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0" && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0" && res[i].C2 == "0") {
							if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP103') {
				//3번차트
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0") {
							if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP104') {
				//3번차트
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0") {
							if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP105') {
				//3번차트
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0") {
							if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP106') {
				//3번차트
				for(let i = 0; i<res.length; i++) {
					if(res[i].PRD_DE == prdDe[0] && res[i].C1 == "0") {
						if(res[i].ITM_ID == "T14" || res[i].ITM_ID == "T15") {
							legendNm3.push(res[i].ITM_NM);
						}
					}
					for(let j=0; j<prdDe.length; j++) {
						if(res[i].PRD_DE == prdDe[j] && res[i].C1 == "0") {
							if(res[i].ITM_ID == "T14" || res[i].ITM_ID == "T15") {
								chartDivisionData3.push(Number(res[i].DT));
							}
						}
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
			}else if(tblId == 'DT_1RP009') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == 'DT_1RP010') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == 'DT_1RP011') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, "대상자별", res[0].C2_OBJ_NM);
			}else if(tblId == 'DT_1RP014') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == 'DT_1RP015') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						legendNm3.push(res[i].ITM_NM);
					}
				}			
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == 'DT_1RP016') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C1_OBJ_NM);
			}else if(tblId == 'DT_1RP018') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 == "0"  && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
						chartVal3.push(Number(res[i].DT));
					}
					if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C1_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
			}else if(tblId == 'DT_1RP032') {
				for(let i = 0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal3.push(Number(res[i].DT));// 데이터 가져왔음
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm3.push(res[i].ITM_NM);
					}
				}
				categories3 = prdDe;
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" ) {
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104") {
					formatNm = '명';
				}else if(tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					formatNm = '개소';
				}
				xAxis3.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories3
				});
				for(let i=0; i<legendNm3.length; i++) {
					seriesyearData3.push({
						name: legendNm3[i],
						data: chartVal3[i],
						color: "",
						marker: {
							radius: 3,
							symbol: 'circle',
							lineColor:'#7CB5EC',
							fillColor:'#ffffff',
						},
						lineWidth: 2,
						//바 상단의 수치값
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							/*formatter: function() {
								if (this.y < 0) {
									return "<span style='font-weight: bold;'>" + this.y + "</span>";
								}
							}*/
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + formatNm; //바꿔야함
							},
						},
						color: chartColor3[i]
					});
				}
				
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || 
					 tblId == "DT_1RP032") {
				xAxis3.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories3
				});
				seriesyearData3.push({
					name: legendNm3,
					data: chartVal3,
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					lineColor:'#D0D0D0',
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: '{y} 원',
						//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '백만원';
						},
					},
					color: ''
				});
			}
			
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				charts3 = Highcharts.chart('chart31', {
					chart : {
						type: 'line',//가로 column 지정은 "column"이 아닌 "bar"
						style: {//fontFamily: 'Noto Sans KR',},
						marginTop:10,
						}
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : {enabled : false},
					title: {text: '',},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-10,
						y:-10,
						itemMarginTop: 4,
						itemMarginBottom: 4,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis3, 
					yAxis: [{
						//y axis 왼쪽
						title: {text: ''},
						labels: {enabled: false}
					}],
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						enabled : false,
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:10,
						style: {
							fontSize :'8px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
						},
						formatter: function() {
							return '<span style="color:#EEFF2E">'  + this.series.name + '</span> : ' + this.y;
						},
					},
					plotOptions: {
						series: {
							borderRadius: 5,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},								
						}
					},
					series: seriesyearData3
				});
				$('#chartBtn3').off('click');
				$('#chartBtn3').click(function(){
					for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
						if($('.tabArea3 .chartbox div').attr('id') == 'chart31'){charts3.exportChart();}
					}
				});
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == 'DT_1RP018' ||
					 tblId == "DT_1RP032") {
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP032") {
					$("#charttitle2 .tabArea2").empty();
					$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:230px;'></div></figure></div></div>" +
													   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart22' style='width:750px; height:230px;'></div></figure></div></div>" +
													   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart23' style='width:750px; height:230px;'></div></figure></div></div>");
				}else if(tblId == "DT_1RP018") {
					$("#charttitle2 .tabArea2").empty();
					$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:230px;'></div></figure></div></div>" +
													   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart22' style='width:750px; height:230px;'></div></figure></div></div>" +
													   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart23' style='width:750px; height:230px;'></div></figure></div></div>" +
													   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart24' style='width:750px; height:230px;'></div></figure></div></div>");
					}
				
				let legendWidth = "";
				let legendVerticalAlign = "";
				let legendAlign = "";
				let legendX = "";
				let color1 = "";
				let color2 = "";
				if(tblId == "DT_1RP009") {
					legendWidth = 100;
					legendVerticalAlign = "middle";
					legendAlign = "right";
					legendX = 35;
				}else {
					legendWidth = "";
					legendVerticalAlign = "bottom";
					legendAlign = "center";
					legendX = "";
				} 
				charts2 = Highcharts.chart('chart21', { //여기툴팁
					chart : {
						type : 'line',
						width : 750,
						marginTop:30,
					},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: xAxis3, 
					legend: {
						enabled: false,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							let tooltip1 = new Array;
							let tooltip2 = new Array;
							let tooltip3 = new Array;
							let tooltip4 = new Array;
							let tooltip5 = new Array;
							tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || 
							 tblId == "DT_1RP032"
							if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
								tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP011") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP032") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							}
							var returnFormatter;
							if(this.x == categories3[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories3[1]) {
								if(tooltip1 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories3[2]) {
								if(tooltip2 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories3[3]) {
								if(tooltip3 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories3[4]) {
								if(tooltip4 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories3[5]) {
								if(tooltip5 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip5+'% 증가 ↑</span>';
								}else if(tooltip5 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip5+'% 감소 ↓</span>';
								}else if(tooltip5 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: seriesyearData3
				});
				$('#chartBtn2').off('click');
				$('#chartBtn2').click(function(){
					for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
						if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts2.exportChart();}
					}
				});
				console.log("test");
				setTimeout(function() {
					$("select[id=selectChoice2]").change(function(){
						let value = $(this).val(); //value값 가져오기
						let selectChoiceNm2 = $("#selectChoice2 option:checked").text(); //value값 가져오기
						$('.tabArea2 .tabBox').css("display", "none");
						$('.tabArea2 .tabBox').removeClass("on");
						$('.tabArea2 .tabBox:eq(' + value + ')').css("display", "block");
						$('.tabArea2 .tabBox:eq(' + value + ')').addClass("on");
						$more2DashDetail.chart.selectChartCreate2(res, value, selectNm1, selectChoiceNm2, prdDe);
					});
				}, 1000);
			}
			//});
		},
		/**
		 * @name : $more2DashDetail.ui.search
		 * @description : 데이터 호출
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		search : function(tblId, startPrdDe) {
			var itmId = '';
			var objL1 = '';
			var objL2 = '';
			var objL3 = '';
			var proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105'){itmId = 'T13';}
			else if(tblId == 'DT_1RP106'){itmId = 'T16';}
			else if(tblId == 'DT_1RP000' || tblId == 'DT_1RP001' || tblId == 'DT_1RP002' || 
					tblId == 'DT_1RP003' || tblId == 'DT_1RP004' || tblId == 'DT_1RP008'){itmId = 'T001';}
			else if(tblId == 'DT_1RP005'){itmId = 'T01';}
			else if(tblId == 'DT_1RP006' || tblId == 'DT_1RP007'){itmId = 'T02';}
			else if(tblId == 'DT_1RP009' || tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || tblId == 'DT_1RP032'){itmId = 'T01';}
			else if(tblId == 'DT_1RP012' || tblId == 'DT_1RP013'){itmId = 'T03';}
			else if(tblId == 'DT_1RP014' || tblId == 'DT_1RP015' || tblId == 'DT_1RP016' || tblId == 'DT_1RP018'){itmId = 'T05';}
			
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP002' || tblId == 'DT_1RP004' || 
			   tblId == 'DT_1RP009' || tblId == 'DT_1RP014' || tblId == 'DT_1RP015'){objL1 = '0';objL2 = '00';}
			else if(tblId == 'DT_1RP102' || tblId == 'DT_1RP000' || tblId == 'DT_1RP003' || tblId == 'DT_1RP005' || tblId == 'DT_1RP006' || 
					tblId == 'DT_1RP007' || tblId == 'DT_1RP008' || tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || 
					tblId == 'DT_1RP012' || tblId == 'DT_1RP013' || tblId == 'DT_1RP016' || tblId == 'DT_1RP032'){objL1 = '0';objL2 = '0';}
			else if(tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106'){objL1 = '0';}
			else if(tblId == 'DT_1RP001'){objL1 = '00';objL2 = '00';}
			else if(tblId == 'DT_1RP018'){objL1 = '00';objL2 = '0';objL3 = '0';}
			
			var parameter ={
					 apiKey:apiKey
					,itmId:itmId //통계청
					,objL1:objL1 //분류1
					,objL2:objL2 //2
					,objL3:objL3
					,prdSe:'Y'
					,format:'json'
					,jsonVD:'Y'
					,startPrdDe:startPrdDe
					,loadGubun:'2'
					,orgId:'101'
					,tblId:tblId
			}
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				type: 'get',
				data: parameter
			}).done(function(result){
				var res = JSON.parse(result);
				for(var i=0;i<$("#list1").children().length;i++){
					if($("#list1").children()[i].dataset.tbl_id == tblId){
						var li = $("#list1").children().find('.searchmenua')[i];
					}
				}
				if(gv_checkmenu == 'more2'){$more2DashDetail.ui.openApiSearch2(li);}
				else if(gv_checkmenu == 'more3'){openApiSearch3(li);}
			});
		},
		openApiSearch2 : function(li) {
			//$more2DashDetail.ui
			let proxy = "/view/totSurv/proxy?";
			
			//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
			if (location.hostname == "link.kostat.go.kr") {
				proxy = "/view/totSurv/proxy_kosis?";
			}
			
			//$(".searchLayer").fadeOut();
			$('.searchInput').val('');
			let format = "";
			var list2 = document.getElementById('list2');
			list2.innerHTML = '';
			$('#searchCount').text('0건');
			$(".tabArea .tab li").removeClass("on");
			$(".tabArea .tabBox").removeClass("on");
			$('.tabArea .tab li:eq(' + 0 + ')').addClass("on");
			$('.tabArea .tabBox:eq(' + 0 + ')').addClass("on");
			$(".tabArea0 .tab li").removeClass("on");
			$(".tabArea0 .tabBox").removeClass("on");
			$('.tabArea0 .tab li:eq(' + 0 + ')').addClass("on");
			$('.tabArea0 .tabBox:eq(' + 0 + ')').addClass("on");
			$(".tabArea2 .tab li").removeClass("on");
			$(".tabArea2 .tabBox").removeClass("on");
			$('.tabArea2 .tab li:eq(' + 0 + ')').addClass("on");
			$('.tabArea2 .tabBox:eq(' + 0 + ')').addClass("on");
			$(".tabArea3 .tab li").removeClass("on");
			$(".tabArea3 .tabBox").removeClass("on");
			$('.tabArea3 .tab li:eq(' + 0 + ')').addClass("on");
			$('.tabArea3 .tabBox:eq(' + 0 + ')').addClass("on");
			
			$(".tabArea .tab li a").on("click", function(){
				// 해당 요소를 클릭하는 내 자신의 index 번호를 가져온다. [0], [1]
				const num = $(".tabArea .tab li a").index($(this));
				
				// 기존에 적용되어 있는 on class 삭제
				$(".tabArea .tab li").removeClass("on");
				$(".tabArea .tabBox").removeClass("on");

				// 다음 요소 클릭시 on class 추가
				$('.tabArea .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea .tabBox:eq(' + num + ')').addClass("on");
			});
			$(".tabArea0 .tab li a").on("click", function(){
				const num = $(".tabArea0 .tab li a").index($(this));
				$(".tabArea0 .tab li").removeClass("on");
				$(".tabArea0 .tabBox").removeClass("on");
				$('.tabArea0 .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea0 .tabBox:eq(' + num + ')').addClass("on");
			});
			$(".tabArea2 .tab li a").on("click", function(){
				const num = $(".tabArea2 .tab li a").index($(this));
				$(".tabArea2 .tab li").removeClass("on");
				$(".tabArea2 .tabBox").removeClass("on");
				$('.tabArea2 .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea2 .tabBox:eq(' + num + ')').addClass("on");
			});
			$(".tabArea3 .tab li a").on("click", function(){
				const num = $(".tabArea3 .tab li a").index($(this));
				$(".tabArea3 .tab li").removeClass("on");
				$(".tabArea3 .tabBox").removeClass("on");
				$('.tabArea3 .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea3 .tabBox:eq(' + num + ')').addClass("on");
			});
			$(".tabArea4 .tab li a").on("click", function(){
				const num = $(".tabArea4 .tab li a").index($(this));
				$(".tabArea4 .tab li").removeClass("on");
				$(".tabArea4 .tabBox").removeClass("on");
				$('.tabArea4 .tab li:eq(' + num + ')').addClass("on");
				$('.tabArea4 .tabBox:eq(' + num + ')').addClass("on");
			});
			
			for(var i=0;i<$("a.searchmenua").length;i++){
				if($("a.searchmenua:eq(" + i + ")").css("color") == "#1772a9"){
					$("a.searchmenua:eq(" + i + ")").css("color", "#666666");
					$("a.searchmenua:eq(" + i + ")").css('font-weight', 400);
				}
			}
			$(li).parent().find('a:eq(0)').css('color','#1772a9');
			$(li).parent().find('a:eq(0)').css('font-weight', 700);
			var itmId = '';
			var objL1 = '';
			var objL2 = '';
			var objL3 = '';
			var newEstPrdCnt = '6';
			var startPrdDe = $('#modalSearchYear').val();
			
			if($('#modalSearchYear').val() == undefined){startPrdDe = '2020';}
			tblId = $(li).parent().data('tbl_id');
			var tblNm = $(li).parent().data('tbl_nm');
			$('#modalSearchTitle option').remove();
			if(tblNm == undefined){
				$('#modalSearchTitle').html('<option value="DT_1RP101">성별 연령별 퇴직연금제도 가입률</option>');
			} else {
				$('#modalSearchTitle').append('<option value="'+ tblId +'">'+ tblNm +'</option>');
				$('#subtitle').html(tblNm);
			}
			$('.charttitle').show();
			$('#chartTab1_2').hide();
			$('#chartTab1_3').show();
			if(tblId == undefined){tblId = 'DT_1RP101';}
			$('.tab').hide();
			$('#tabArea').show();
			
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105'){
				itmId = 'T13';
			}
			else if(tblId == 'DT_1RP106'){
				itmId = 'T16';
			}
			else if(tblId == 'DT_1RP000' || tblId == 'DT_1RP001' || tblId == 'DT_1RP002' || tblId == 'DT_1RP003' || tblId == 'DT_1RP004' || tblId == 'DT_1RP008'){
				itmId = 'T001';
			}
			else if(tblId == 'DT_1RP005'){
				itmId = 'T01';
			}
			else if(tblId == 'DT_1RP006' || tblId == 'DT_1RP007'){
				itmId = 'T02';
			}
			else if(tblId == 'DT_1RP009' || tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || tblId == 'DT_1RP032'){
				itmId = 'T01';
			}
			else if(tblId == 'DT_1RP012' || tblId == 'DT_1RP013'){
				itmId = 'T03';
			}
			else if(tblId == 'DT_1RP014' || tblId == 'DT_1RP015' || tblId == 'DT_1RP016' || tblId == 'DT_1RP018'){
				itmId = 'T05';
			}
			
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP002' || tblId == 'DT_1RP004' || tblId == 'DT_1RP009' || tblId == 'DT_1RP014' || tblId == 'DT_1RP015'){
				objL1 = '0';objL2 = '00';
			}
			else if(tblId == 'DT_1RP102' || tblId == 'DT_1RP000' || tblId == 'DT_1RP003' || tblId == 'DT_1RP005' || tblId == 'DT_1RP006' || tblId == 'DT_1RP007' || tblId == 'DT_1RP008' || 
					tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || tblId == 'DT_1RP012' || tblId == 'DT_1RP013' || tblId == 'DT_1RP016' || tblId == 'DT_1RP032'){
				objL1 = '0';objL2 = '0';
			}
			else if(tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106'){
				objL1 = '0';
				$('#division2').hide();
			}
			else if(tblId == 'DT_1RP001'){
				objL1 = '00';objL2 = '00';
			}
			else if(tblId == 'DT_1RP018'){
				objL1 = '00';
				objL2 = '0';
				objL3 = '0';
			}
			
			var valueSuffix1 = '';
			var valueSuffix2 = '';
			var valueSuffix3 = '';
			var valueSuffix4 = '';
			if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || 
			   tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106'){valueSuffix1 = '%';}
			else if(tblId == 'DT_1RP006' || tblId == 'DT_1RP007' || tblId == 'DT_1RP008'){valueSuffix1 = '개';}
			else if(tblId == 'DT_1RP012' || tblId == 'DT_1RP013'){valueSuffix1 = ' 백만원';}
			else {valueSuffix1 = '명';}
			
			if(tblId == 'DT_1RP105' || tblId == 'DT_1RP106' || tblId == 'DT_1RP006' || tblId == 'DT_1RP007' || tblId == 'DT_1RP008'){valueSuffix3 = '개';}
			else if(tblId == 'DT_1RP012' || tblId == 'DT_1RP013'){valueSuffix3 = ' 백만원';}
			else {valueSuffix3 = '명';}
			
			if(tblId == 'DT_1RP009' || tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || tblId == 'DT_1RP014' ||
			   tblId == 'DT_1RP015' || tblId == 'DT_1RP016' || tblId == 'DT_1RP018' || tblId == 'DT_1RP032'){valueSuffix2 = ' 백만원';valueSuffix4 = ' 백만원';	}
			else {valueSuffix2 = valueSuffix1;valueSuffix4 = valueSuffix3;}
			
			let parameter ={
				 apiKey:apiKey
				,itmId:itmId
				,objL1:objL1
				,objL2:objL2
				,objL3:objL3
				,prdSe:'Y'   
				,format:'json'
				,jsonVD:'Y'
				,newEstPrdCnt:newEstPrdCnt
				,loadGubun:'1'
				,orgId:'101'
				,tblId:tblId
			}
			$.ajax({
				url: proxy+'https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList',
				type: 'get',
				data: parameter
			}).done(function(result){
				var res = JSON.parse(result);
				console.log("========================1번차트 데이터========================");
				console.log(res);
				let dataDt = new Array;
				let chartData = new Array;
				let categories = new Array;
				let perChange = new Array;
				let prdDeReverce = new Array;
				let prdDeYear = new Array;
				let prdDeYear1 = new Array;
				let charts1 = "";
				let tblId = res[0].TBL_ID;
				let itmId1 = "";
				let itmId2 = "";
				let itmId3 = "";
				let objL1 = "";
				let objL2 = "";
				let objL3 = "";
				let format = "";
				let parameter2 = "";
				let parameter3 = "";
				$("#modalSearchYear option").remove();
				$(".header-tag #headerSearchYear option").remove();
				for(let i=0; i<res.length; i++) {
					prdDeReverce.push(res[i].PRD_DE);
					prdDeYear1.push(res[i].PRD_DE);
				}
				prdDeYear = prdDeReverce.reverse();
				for(let i=0; i<prdDeYear.length; i++) {
					$("#modalSearchYear").append('<option value="'+prdDeYear[i]+'">'+prdDeYear[i]+'</option>'); //여기
					$(".header-tag #headerSearchYear").append('<option value="'+prdDeYear[i]+'">'+prdDeYear[i]+'</option>'); //여기
				}
				/*for(var i=0; i<res.length; i++) {
					if(res[i].PRD_DE == res[res.length-1].PRD_DE) {*/
					/*} 
				}*/
				var prdDe = prdDeYear[0]; 
				$('#modalSearchYear').val(prdDe).prop("selected", true);
				$(".header-tag #headerSearchYear").val(prdDe).prop("selected", true); //여기
				$('.header-tag #headerSearchYear').on('change', function() {
					$more2DashDetail.util.headerSearchSelect();
				});
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP000" || tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP003" || tblId == "DT_1RP004" ||
				   tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" ||
				   tblId == "DT_1RP012" || tblId == "DT_1RP013" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP032") { //여기하자
					itmId1 = "ALL";
					objL1 = "ALL";
					objL2 = "ALL";
					objL3 = "";
				}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					itmId1 = "ALL";
					objL1 = "ALL";
					objL2 = "";
					objL3 = "";
				}else if(tblId == "DT_1RP018") {
					itmId1 = "ALL";
					objL1 = "ALL";
					objL2 = "ALL";
					objL3 = "ALL";
				}
				parameter2 = {
					 apiKey:apiKey
					,itmId: itmId1
					,objL1: objL1
					,objL2: objL2
					,objL3: objL3
					,format: "json"
					,jsonVD: "Y"
					,prdSe: "Y"
					//,startPrdDe: prdDe
					//,newEstPrdCnt : "1"	//최근수록시점 개수
					,newEstPrdCnt: newEstPrdCnt
					/*,startPrdDe: "2015"
					,endPrdDe: "2020"*/
					,orgId: "101"
					,tblId: tblId	
				}
				
				//mng_s 20230116 mangWASA에서 프록시를 태우기 위해서 분기 처리함.(link에서 kosis.kr의 openapi를 요청할 수 없어서)
				var proxy = "/view/totSurv/proxy?";
				if (location.hostname == "link.kostat.go.kr") {
					proxy = "/view/totSurv/proxy_kosis?";
				}
				
				$.ajax({
					url: proxy + "https://kosis.kr/openapi/Param/statisticsParameterData.do?method=getList",
					type: 'get',
					async: false,
					data: parameter2,
					dataType: "json"
				}).done(function(res) {
					console.log("===================== 1 chart select data=====================");
					console.log(res);
					if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" || tblId == "DT_1RP009" ||
					   tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032") {
						setTimeout(function() {
							$more2DashDetail.ui.yearDatachange(res);
						}, 1000);
					}
					$('.select1').empty();
					let selectNm1 = new Array;
					let option1 = new Array;
					let option2 = new Array;
					let option3 = new Array;
					let option4 = new Array;
					let option5 = new Array;
					let option6 = new Array;
					if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP012" || tblId == "DT_1RP013" || 
					   tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP032") {
						selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
					}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" || tblId == "DT_1RP000" || tblId == "DT_1RP003" ||
							 tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008") {
						selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
					}else if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") {
						selectNm1.push(res[0].C1_NM, "성별", res[0].C1_OBJ_NM);
					}else if(tblId == "DT_1RP005") {
						selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM);
					}else if(tblId == "DT_1RP011") {
						selectNm1.push(res[0].C1_NM, "대상자별", res[0].C2_OBJ_NM);
					}else if(tblId == "DT_1RP016") {
						selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C1_OBJ_NM);
					}else if(tblId == "DT_1RP018") {
						selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
					}
					if(selectNm1[0] == "계" || selectNm1[0] == "합계") {selectNm1.splice(0, 1, '총계');}
					if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
						$(".select1").append("<select class='' id='selectChoice1'></select>");
						for(let i=0; i<selectNm1.length; i++) {
							option1 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
							$('#selectChoice1').append(option1);
						}
					}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" || tblId == "DT_1RP000" || tblId == "DT_1RP001" || tblId == "DT_1RP002" ||
							 tblId == "DT_1RP003" || tblId == "DT_1RP004" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP012" ||
							 tblId == "DT_1RP013") {
						$(".select1").append("<select class='' id='selectChoice1'></select>");
						for(let i=0; i<selectNm1.length; i++) {
							option1 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
							$('#selectChoice1').append(option1);
						}
					}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
							 tblId == "DT_1RP032") {
						$(".select1").append("<select class='' id='selectChoice1'></select>");
						for(let i=0; i<selectNm1.length; i++) {
							option1 = "<option value='" +i+ "'>"+selectNm1[i]+"</option>";;
							$('#selectChoice1').append(option1);
						}
					}
					setTimeout(function() {
						$("select[id=selectChoice1]").change(function(){
							let value = $(this).val(); //value값 가져오기
							let selectChoiceNm1 = $("#selectChoice1 option:checked").text(); //value값 가져오기
							$('.tabArea .tabBox').css("display", "none");
							$('.tabArea .tabBox').removeClass("on");
							$('.tabArea .tabBox:eq(' + value + ')').css("display", "block");
							$('.tabArea .tabBox:eq(' + value + ')').addClass("on");
							$more2DashDetail.chart.selectChartCreate1(res, value, selectNm1, selectChoiceNm1, prdDeYear1);
						});
					}, 500); 
				});
				
				for(var i=0; i<res.length; i++) {
					dataDt.push(Number(res[i].DT));
					categories.push(Number(res[i].PRD_DE));
				}
				if(tblId == 'DT_1RP011' || tblId == 'DT_1RP032') {
					perChange.push (
						"없음"
						,(((res[1].DT - res[0].DT) / res[0].DT ) * 100).toFixed(2)
						,(((res[2].DT - res[1].DT) / res[1].DT ) * 100).toFixed(2)
					);
				}else if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
					perChange.push (
						"없음"
						,(res[1].DT - res[0].DT).toFixed(2)
						,(res[2].DT - res[1].DT).toFixed(2)
						,(res[3].DT - res[2].DT).toFixed(2)
						,(res[4].DT - res[3].DT).toFixed(2)
						,(res[5].DT - res[4].DT).toFixed(2)
					);
				}else {
					perChange.push (
						"없음"
						,(((res[1].DT - res[0].DT) / res[0].DT ) * 100).toFixed(2)
						,(((res[2].DT - res[1].DT) / res[1].DT ) * 100).toFixed(2)
						,(((res[3].DT - res[2].DT) / res[2].DT ) * 100).toFixed(2)
						,(((res[4].DT - res[3].DT) / res[3].DT ) * 100).toFixed(2)
						,(((res[5].DT - res[4].DT) / res[4].DT ) * 100).toFixed(2)
					);
				}
				console.log(perChange);
				console.log("1번차트 데이터: "+dataDt);
				
				if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
					format = "%";
				}else if(tblId == 'DT_1RP000' || tblId == 'DT_1RP001' || tblId == 'DT_1RP002' || tblId == 'DT_1RP003' || tblId == 'DT_1RP004' || tblId == 'DT_1RP005' || tblId == 'DT_1RP032' ||
					     tblId == 'DT_1RP009' || tblId == 'DT_1RP010' || tblId == 'DT_1RP011' || tblId == 'DT_1RP014' || tblId == 'DT_1RP015' || tblId == 'DT_1RP016' || tblId == 'DT_1RP018') {
					format = "명";
				}else if(tblId == 'DT_1RP006' || tblId == 'DT_1RP007' || tblId == 'DT_1RP008') {
					format = "개소";
				}else if('') {
					format = "원";
				}else if(tblId == 'DT_1RP012' || tblId == 'DT_1RP013') {
					format = "백만원";
				}
				chartData.push({
					name: '가입률',
					data: dataDt,
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: format,
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + format;
						},
					},
				});
				console.log(chartData);
				$("#charttitle1 .tabArea").empty();
				if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP001' || tblId == 'DT_1RP002' || tblId == 'DT_1RP004' || tblId == 'DT_1RP009' || tblId == 'DT_1RP010' ||
				   tblId == 'DT_1RP011' || tblId == 'DT_1RP012' || tblId == 'DT_1RP013' || tblId == 'DT_1RP014' || tblId == 'DT_1RP015' || tblId == 'DT_1RP016' || tblId == 'DT_1RP032') {
					$("#charttitle1 .tabArea").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:610px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart12' style='width:610px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart13' style='width:610px; height:230px'></div></figure></div></div>");
				}else if(tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106' || tblId == 'DT_1RP000' || tblId == 'DT_1RP003' || tblId == 'DT_1RP005' || 
						 tblId == 'DT_1RP006' || tblId == 'DT_1RP007' || tblId == 'DT_1RP008') {
					$("#charttitle1 .tabArea").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:610px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart12' style='width:610px; height:230px'></div></figure></div></div>");
				}else if(tblId == 'DT_1RP018') {
					$("#charttitle1 .tabArea").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart11' style='width:615px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart12' style='width:615px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart13' style='width:615px; height:230px'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart14' style='width:615px; height:230px'></div></figure></div></div>");
				}
				charts1 = Highcharts.chart('chart11', {
					chart : {
						type : 'line',
						marginTop:30,
						},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
							}
						},
						categories: categories
					},
					legend: {
						enabled: false,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							var returnFormatter;
							if(this.x == categories[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories[1]) {
								if(perChange[1] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[1]+'% 증가 ↑</span>';
								}else if(perChange[1] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ perChange[1]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[2]) {
								if(perChange[2] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[2]+'% 증가 ↑</span>';
								}else if(perChange[2] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ perChange[2]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[3]) {
								if(perChange[3] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[3]+'% 증가 ↑</span>';
								}else if(perChange[3] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ perChange[3]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[4]) {
								if(perChange[4] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[4]+'% 증가 ↑</span>';
								}else if(perChange[4] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ perChange[4]+'% 감소 ↓</span>';
								}
							}else if(this.x == categories[5]) {
								if(perChange[5] > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ perChange[5]+'% 증가 ↑</span>';
								}else if(perChange[5] < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ perChange[5]+'% 감소 ↓</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: chartData 
				});
				$('#chartBtn1').off('click');
				$('#chartBtn1').click(function(){
					for(var i = 0; i < $('.tabArea .chartbox').length; i++){
						if($('.tabArea .chartbox div').attr('id') == 'chart11'){charts1.exportChart();}
					}
				});
				$more2DashDetail.ui.chartDatachange(tblId, prdDe);
				// 2~6번 차트 데이터
				console.log(tblId);
				
			});
		}
	};
	$more2DashDetail.chart = {
		/**
		 * @name : $more2DashDetail.chart.makeChartData
		 * @description : 차트 데이터 가공
		 * @date : 2022.10.13
		 * @author : 조규환
		 * @history :
		 */
		makeChartData : function(res) {
			console.log("===================== 데이터가공 =====================");
			console.log(res);
			let param = new Array;
			let itmId = "";
			let objL1 = "";
			let objL2 = "";
			let objL3 = "";
			let proxy = "/view/totSurv/proxy?";
			let legend = new Array;
			let chartDivisionData2 = new Array; 
			let overlapRemoveData2 = new Array;
			let chartDivisionData3 = new Array; 
			let overlapRemoveData3 = new Array;
			let chartDivisionData4 = new Array; 
			let overlapRemoveData4 = new Array;
			
			let selectNm1 = new Array;
			let selectNm2 = new Array;
			let selectNm3 = new Array;
			let selectNm4 = new Array;
			let selectNm5 = new Array;
			let selectNm6 = new Array;
			
			let tblId = res[0].TBL_ID;
			let prdDe = '';
			let overlapRemovePrdDe = new Array;
			for(let i=0; i<res.length; i++) {//중복여기
				overlapRemovePrdDe.push(res[i].PRD_DE);
			}
			prdDe = $more2DashDetail.util.overlapRemove(overlapRemovePrdDe);
			let legendNm2 = new Array;
			let legendNm3 = new Array;
			let legendNm4 = new Array;
			let legendNm5 = new Array;
			let legendNm6 = new Array;
			
			let xAxis2 = new Array;
			let xAxis3 = new Array;
			let xAxis4 = new Array;
			let xAxis5 = new Array;
			let xAxis6 = new Array;
			
			let categories2 = new Array;
			let categories3 = new Array;
			let categories4 = new Array;
			let categories5 = new Array;
			let categories6 = new Array;
			
			let chartVal2 = new Array;
			let chartVal3 = new Array;
			let chartVal4 = new Array;
			let chartVal4_1 = new Array;
			let chartVal4_2 = new Array;
			let chartVal5 = new Array;
			let chartVal5_1 = new Array;
			let chartVal5_2 = new Array;
			let chartVal6 = new Array;

			let divisionData = new Array; //
			
			let seriesyearData2 = new Array;  	//2번 차트에 들어갈 데이터 배열
			let seriesyearData3 = new Array; 	//3번 차트에 들어갈 데이터 배열
			let seriesyearData4 = new Array; 	//4번 차트에 들어갈 데이터 배열
			let seriesyearData5 = new Array; 	//5번 차트에 들어갈 데이터 배열
			let seriesyearData6 = new Array; 	//6번 차트에 들어갈 데이터 배열
			
			let color1 = new Array;
			let color2 = new Array;
			let color3 = new Array;
			let color4 = new Array;
			let color5 = new Array;
			let color6 = new Array;
			
			let split2 = new Array;
			let split3 = new Array;
			let split4 = new Array;
			let split5 = new Array;
			let split6 = new Array;
			
			let comma1 = new Array;
			let comma2 = new Array;
			let comma3 = new Array;
			let comma4 = new Array;
			let comma5 = new Array;
			let comma6 = new Array;
			
			let chartColor1 = '';
			let chartColor2 = '';
			let chartColor3 = '';
			let chartColor4 = '';
			let chartColor5 = '';
			let chartColor6 = '';

			let totalDatalabelComma1 = '';
			let totalDatalabelComma2 = '';
			let totalDatalabelComma3 = '';
			let totalDatalabelComma4 = '';
			
			let totalDatalabel1 = '';
			let totalDatalabel2 = '';
			let totalDatalabel3 = '';
			let totalDatalabel4 = '';
			
			
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			//가입기간별
			let joinColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			
			for(let i=1; i<7; i++) {
				$("#charttitle"+i).removeClass();
			}
			$("#charttitle3_4").removeClass();
			$("#charttitle5_6").removeClass();
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") { //각차트 크기 수정 새로만듬
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "");
				$("#charttitle2 .tabArea2").empty();
				$("#charttitle4 .tabArea4").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle6 .tabArea6").empty();
				$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:2300px; height:210px;'></div></figure></div></div>");
				//$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:915px; height:185px;'></div></figure></div></div>");
				$("#charttitle4 .tabArea4").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:915px; height:195px;'></div></figure></div></div>" +
					"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart42' style='width:915px; height:195px;'></div></figure></div></div>" +
					"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart43' style='width:915px; height:195px;'></div></figure></div></div>");
				if(tblId == "DT_1RP101") {
					$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:450px; height:210px;'></div></figure></div></div>");
				}else if(tblId == "DT_1RP102") {
					$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:450px; height:210px; margin-top:1px;'></div></figure></div></div>");
				}
				if(tblId == "DT_1RP101") {
					$("#charttitle6 .tabArea6").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart61' style='width:450px; height:210px;'></div></figure></div></div>");
				}else if(tblId == "DT_1RP102") {
					$("#charttitle6 .tabArea6").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart61' style='width:450px; height:210px;'></div></figure></div></div>");
				}
			}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				$("#charttitle2 .tabArea2").empty();
				$("#charttitle4 .tabArea4").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:230px;'></div></figure></div></div>");
				$("#charttitle4 .tabArea4").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart41' style='width:915px; height:195px;'></div></figure></div></div>");
				$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:450px; height:450px;'></div></figure></div></div>");
			}else if(tblId == "DT_1RP000" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP008" || tblId == "DT_1RP012" || tblId == "DT_1RP013") {
				$("#charttitle2 .tabArea2").empty();
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:210px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:680px; height:450px;'></div></figure></div></div>");
				$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:680px; height:450px;'></div></figure></div></div>");
			}else if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") {
				$("#charttitle2 .tabArea2").empty();
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle4_1 .tabArea4_1").empty();
				$("#charttitle5_1 .tabArea5_1").empty();
				$("#charttitle6_1 .tabArea6_1").empty();
				$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:210px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:1380px; height:195px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle4_1 .tabArea4_1").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart4_1' style='width:440px; height:210px; margin-top:5px;'></div></figure></div></div>");
				$("#charttitle5_1 .tabArea5_1").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart5_1' style='width:480px; height:210px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle6_1 .tabArea6_1").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart6_1' style='width:460px; height:210px;'></div></figure></div></div>");
			}else if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				$("#charttitle2 .tabArea2").empty();
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:1100px; height:210px;'></div></figure></div></div>");
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart31' style='width:920px; height:430px; margin-left:-10px; margin-top:15px;'></div></figure></div></div>");
				for(let i=2; i<22; i++) {
					$("#charttitle3 .tabArea3").append("<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart3"+i+"' style='width:920px; height:430px; margin-left:-10px; margin-top:15px;'></div></figure></div></div>");
				}
				$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart51' style='width:450px; height:450px;'></div></figure></div></div>");
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP032") {
				//$("#charttitle2 .tabArea2").empty();
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle4 .tabArea4").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle6 .tabArea6").empty();
				/*$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:230px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart22' style='width:750px; height:230px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart23' style='width:750px; height:230px;'></div></figure></div></div>");*/
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart31' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle4 .tabArea4").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart41' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart51' style='width:450px; height:212px;'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart52' style='width:450px; height:212px; margin-top:10px;'></div></figure></div></div>");
				$("#charttitle6 .tabArea6").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart61' style='width:450px; height:212px; '></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart62' style='width:450px; height:212px; margin-top:10px;'></div></figure></div></div>");
			}else if(tblId == "DT_1RP018") {
				/*$("#charttitle2 .tabArea2").empty();*/
				$("#charttitle3 .tabArea3").empty();
				$("#charttitle4 .tabArea4").empty();
				$("#charttitle5 .tabArea5").empty();
				$("#charttitle6 .tabArea6").empty();
				/*$("#charttitle2 .tabArea2").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure'><div id='chart21' style='width:750px; height:230px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart22' style='width:750px; height:230px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart23' style='width:750px; height:230px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure'><div id='chart24' style='width:750px; height:230px;'></div></figure></div></div>");*/
				$("#charttitle3 .tabArea3").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart31' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart32' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart33' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart34' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart35' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart36' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart37' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle4 .tabArea4").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart41' style='width:915px; height:195px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart42' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart43' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart44' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart45' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart46' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>"+
												   "<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width96'><div id='chart47' style='width:915px; height:185px; margin-top:15px;'></div></figure></div></div>");
				$("#charttitle5 .tabArea5").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart51' style='width:400px; height:200px;'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart52' style='width:450px; height:212px; margin-top:10px;'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart53' style='width:450px; height:212px;'></div></figure></div></div>");
				$("#charttitle6 .tabArea6").append("<div class='tabBox on'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart61' style='width:400px; height:200px;'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart62' style='width:450px; height:212px;'></div></figure></div></div>" +
						"<div class='tabBox'><div class='chartbox'><figure class='highcharts-figure width92'><div id='chart63' style='width:450px; height:212px;'></div></figure></div></div>");
			}
			//차트 데이터 수정
			if(tblId == "DT_1RP101") {
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, "남자", "여자");
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				//totalDatalabel1
				$("#chart51").css("height", "212");
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].ITM_ID == "T13") {
						if(res[i].C2 == "01" || res[i].C2 == "02" || res[i].C2 == "03" || res[i].C2 == "04" || res[i].C2 == "05" || res[i].C2 == "06" || res[i].C2 == "07" || res[i].C2 == "08" ||
								res[i].C2 == "09" || res[i].C2 == "10" || res[i].C2 == "11"	) {
							categories2.push(res[i].C2_NM);
						}
					}
					//2번차트
					for(let j=0; j<3; j++) {
						if(res[i].C1 == j && res[i].ITM_ID == "T13" && res[i].C2 == "00") {
							legendNm2.push(res[i].C1_NM);
						}
						if(res[i].C1 == j && res[i].ITM_ID == "T13") {
							if(res[i].C2 == "01" || res[i].C2 == "02" || res[i].C2 == "03" || res[i].C2 == "04" || res[i].C2 == "05" || res[i].C2 == "06" || res[i].C2 == "07" || res[i].C2 == "08" ||
							   res[i].C2 == "09" || res[i].C2 == "10" || res[i].C2 == "11"	) {
								chartDivisionData2.push(Number(res[i].DT));
							}
						}
					}
					//$more2DashDetail.util.comma
					//4번차트
					if(res[i].C1 == "0" && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 == "0" && res[i].C2 != "00") {
						if(res[i].ITM_ID == "T11") {
							categories4.push(res[i].C2_NM);
							chartVal4_1.push(Number(res[i].DT));
							comma1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
							comma2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0" && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T11") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "1" && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T12") {
							chartVal5_1.push(res[i].C1_NM, Number(res[i].DT));
						}
					}
					if(res[i].C1 == "2" && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T12") {
							chartVal5_2.push(res[i].C1_NM, Number(res[i].DT));
						}
					}
					//6번차트
					if(res[i].C1 == "0" && res[i].C2 != "00") {
						if(res[i].ITM_ID == "T12") {
							chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
				if(legendNm2[0] == "계") {legendNm2.splice(0, 1, '총계');}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 11);
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				categories3 = prdDe;
				console.log(chartVal2);
				chartVal4.push(chartVal4_1, chartVal4_2);
				chartVal5.push(chartVal5_1, chartVal5_2);
				console.log(chartVal5);
			}else if(tblId == "DT_1RP102") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].ITM_ID == "T13") {
						if(res[i].C2 != "0") {
							categories2.push(res[i].C2_NM);
						}
						
					}
					if(res[i].C2 == "0" && res[i].ITM_ID == "T11") {
						if(res[i].C1 == "0") {
							selectNm4.push(res[i].C1_NM);
						}
						if(res[i].C1 == "1") {
							selectNm4.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2") {
							selectNm4.push(res[i].C1_NM);
						}
					}
					//2번차트
					for(let j=0; j<3; j++) {
						if(res[i].C1 == j && res[i].ITM_ID == "T13" && res[i].C2 == "0") {
							legendNm2.push(res[i].C1_NM);
						}
						if(res[i].C1 == j && res[i].ITM_ID == "T13") {
							if(res[i].C2 != "0") {
								chartDivisionData2.push(Number(res[i].DT));
							}
						}
					}
					//4번차트
					if(res[i].C1 == "0" && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						if(res[i].ITM_ID == "T11") {
							categories4.push(res[i].C2_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T11") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "1" && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal5_1.push(res[i].C1_NM, Number(res[i].DT));
						}
					}
					if(res[i].C1 == "2" && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal5_2.push(res[i].C1_NM, Number(res[i].DT));
						}
					}
					//6번차트
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
				}
				
				if(legendNm2[0] == "계") {legendNm2.splice(0, 1, '총계');}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 5);
				chartVal4.push(chartVal4_1, chartVal4_2);
				chartVal5.push(chartVal5_1, chartVal5_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP103") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-500 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				/*color3 = ['#7CB5EC', '#F15C80'];
				color4 = ['#7CB5EC', '#F15C80'];*/
				legendNm2.push("가입률");
				for(let i=0; i<res.length; i++) {
					//2번차트
					if(res[i].C1 != "0" && res[i].ITM_ID == "T13") {
						categories2.push(res[i].C1_NM);
						chartDivisionData2.push(Number(res[i].DT));
					}
					//4번차트
					if(res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							categories4.push(res[i].C1_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 7);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP104") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-500 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				/*color3 = ['#7CB5EC', '#F15C80'];
				color4 = ['#7CB5EC', '#F15C80'];*/
				legendNm2.push("가입률");
				for(let i=0; i<res.length; i++) {
					//2번차트
					if(res[i].C1 != "0" && res[i].ITM_ID == "T13") {
						categories2.push(res[i].C1_NM);
						chartDivisionData2.push(Number(res[i].DT));
					}
					//4번차트
					if(res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							categories4.push(res[i].C1_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 21);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP105") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-500 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				/*color3 = ['#7CB5EC', '#F15C80'];
				color4 = ['#7CB5EC', '#F15C80'];*/
				legendNm2.push("도입률");
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "0" && res[i].ITM_ID == "T13") {
						categories2.push(res[i].C1_NM);
						chartDivisionData2.push(Number(res[i].DT));
					}
					//4번차트
					if(res[i].C1 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							categories4.push(res[i].C1_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T11") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T12") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 7);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP106") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-500 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				/*color3 = ['#7CB5EC', '#F15C80'];
				color4 = ['#7CB5EC', '#F15C80'];*/
				legendNm2.push("도입률");
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "0" && res[i].ITM_ID == "T16") {
						categories2.push(res[i].C1_NM);
						chartDivisionData2.push(Number(res[i].DT));
					}
					//4번차트
					if(res[i].C1 == "0") {
						if(res[i].ITM_ID == "T14" || res[i].ITM_ID == "T15") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T14") {
							categories4.push(res[i].C1_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T15") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5번차트
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T14") {
							legendNm5.push(res[i].C1_NM);
							categories5.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 != "0") {
						if(res[i].ITM_ID == "T15") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal5.length; i++ ) {
					if(isNaN(chartVal5[i][1])) {
						chartVal5[i][1] = 0;
					}
				}
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 21);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP000") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();

				color3 = ['#7CB5EC', '#F15C80'];
				color4 = ['#7CB5EC', '#F15C80'];
				color5 = ['#7CB5EC', '#F15C80'];
				for(let i=0; i<res.length; i++) {
					//2번
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						legendNm2.push(res[i].C1_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories2.push(res[i].C2_NM); //중복
					}
					if(res[i].C2 != "0") {
						if(res[i].C1 == "1") {
							chartDivisionData2.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
					//3번차트 
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						legendNm3.push(res[i].C1_NM);
						categories3.push(res[i].C1_NM); //중복
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//5번차트 
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						legendNm5.push(res[i].C2_NM);
						categories5.push(res[i].C2_NM); //중복
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 4);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP001") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-1000 flex-height-245 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-1430 flex-height-245");		
				$("#charttitle5").addClass("item flex-width-440 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-440 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-440 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").hide();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").hide();
				$("#flex_wrap").addClass("flex_wrap");
				$("#charttitle4_1").addClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").addClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").show();
				
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal3_3 = new Array;
				let chartVal3_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "00") { //1101 : 남자, 1102: 여자
						if(res[i].C2 == "1101") {
							legendNm2.push(res[i].C2_NM);
						}
						if(res[i].C2 == "1102") {
							legendNm2.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "00" && res[i].C2 == "00") {
						overlapRemoveData2.push(res[i].C1_NM);
					}
					if(res[i].C1 != "00") {
						if(res[i].C2 == "1101") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						legendNm3.push(res[i].C2_NM);
					}
					if(res[i].C1 != "00" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						overlapRemoveData3.push(res[i].C1_NM);
						//chartDivisionData3.push(Number(res[i].DT)); //1101 1102 2201 2202 2203
					}
					if(res[i].C1 != "00") {
						if(res[i].C2 == "2201") {
							chartVal3_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2202") {
							chartVal3_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2203") {
							chartVal3_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2204") {
							chartVal3_4.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C1 == "00") {
						if(res[i].C2 == "1101" || res[i].C2 == "1102") {
							chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5
					if(res[i].C1 != "00" && res[i].C2 == "00") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "00" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "00") {
						if(res[i].C2 == "1102") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				categories3 = $more2DashDetail.util.overlapRemove(overlapRemoveData3);
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 11);
				chartVal3.push(chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4);
				console.log(chartVal3);
				console.log(chartVal3);
				console.log(chartVal3);
				selectNm1.push(res[0].C1_NM, "성별", res[0].C1_OBJ_NM);
				
				console.log(chartDivisionData2);
				console.log(chartVal2);
			}else if(tblId == "DT_1RP002") { //성별 근속기간별 퇴직연금제도 가입 근로자 수 
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-1000 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-1000 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-1430 flex-height-245");
				$("#charttitle5").addClass("item flex-width-440 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-440 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-440 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").hide();
				$("#charttitle6").hide();
				
				$("#charttitle456").show();
				$("#charttitle5_6").hide();
				$("#flex_wrap").addClass("flex_wrap");
				$("#charttitle4_1").addClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").addClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal3_3 = new Array;
				let chartVal3_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0") { //1101 : 남자, 1102: 여자
						if(res[i].C2 == "1101") {
							legendNm2.push(res[i].C2_NM);
						}
						if(res[i].C2 == "1102") {
							legendNm2.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "00") {
						overlapRemoveData2.push(res[i].C1_NM);
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "1101") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						legendNm3.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						overlapRemoveData3.push(res[i].C1_NM);
						//chartDivisionData3.push(Number(res[i].DT)); //1101 1102 2201 2202 2203
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "2201") {chartVal3_1.push(Number(res[i].DT));}
						if(res[i].C2 == "2202") {chartVal3_2.push(Number(res[i].DT));}
						if(res[i].C2 == "2203") {chartVal3_3.push(Number(res[i].DT));}
						if(res[i].C2 == "2204") {chartVal3_4.push(Number(res[i].DT));}
					}
					//4
					if(res[i].C1 == "0") {
						if(res[i].C2 == "1101" || res[i].C2 == "1102") {
							chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5
					if(res[i].C1 != "0" && res[i].C2 == "00") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "0") {
						if(res[i].C2 == "1102") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 6);
				categories3 = $more2DashDetail.util.overlapRemove(overlapRemoveData3);
				chartVal3.push(chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4);
				
				console.log(chartVal2);
			}else if(tblId == "DT_1RP003") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				for(let i=0; i<res.length; i++) { //산업대분류별 퇴직연금제도 가입 근로자수
					if(res[i].C1 == "A" && res[i].C2 == "0") {
						legendNm2.push(res[i].C2_NM);
					}
					//2
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						overlapRemoveData2.push(res[i].C2_NM);
						//chartDivisionData2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "A") {
						if(res[i].C2 == "1") {
							chartVal2_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal2_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							chartVal2_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							chartVal2_4.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories3.push(res[i].C1_NM);
						selectNm3.push(res[i].C1_NM);
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					
					//5
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories5.push(res[i].C2_NM);
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				//chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 21);
				chartVal2.push([chartVal2_1, chartVal2_2, chartVal2_3, chartVal2_4]); 
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
				console.log(categories2);
				console.log(chartVal2);
				console.log(chartVal2);
			}else if(tblId == "DT_1RP004") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-1000 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-1000 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-1430 flex-height-245");
				$("#charttitle5").addClass("item flex-width-440 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-440 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-440 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle456").show();
				$("#charttitle5_6").hide();
				$("#flex_wrap").addClass("flex_wrap");
				$("#charttitle4_1").addClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").addClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").addClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				
				let chartDivisionData3_1 = new Array;
				let chartDivisionData3_2 = new Array;
				let chartDivisionData3_3 = new Array;
				let chartDivisionData3_4 = new Array;
				for(let i=0; i<res.length; i++) {
					//2
					if(res[i].C1 == "0") {
						if(res[i].C2 == "1101") {
							legendNm2.push(res[i].C2_NM);
						}
						if(res[i].C2 == "1102") {
							legendNm2.push(res[i].C2_NM);
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "00") {
						overlapRemoveData2.push(res[i].C1_NM);
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "1101") {
							chartDivisionData2.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						legendNm3.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "2201") {
							overlapRemoveData3.push(res[i].C1_NM);
							chartDivisionData3_1.push(Number(res[i].DT)); //1101 1102 2201 2202 2203
						}
						if(res[i].C2 == "2202") {
							chartDivisionData3_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2203") {
							chartDivisionData3_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2204") {
							chartDivisionData3_4.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C1 == "0") {
						if(res[i].C2 == "1101" || res[i].C2 == "1102") {
							chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}
					//5
					if(res[i].C1 != "0" && res[i].C2 == "00") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].C2 != "1101" && res[i].C2 != "1102") {
						chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "0" && res[i].C2 == "1102") {
						chartDivisionData2.push(Number(res[i].DT));
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				categories3 = $more2DashDetail.util.overlapRemove(overlapRemoveData3);
				chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 6);
				//chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 6);
				chartVal3 = [chartDivisionData3_1, chartDivisionData3_2, chartDivisionData3_3, chartDivisionData3_4];
				selectNm1.push(res[0].C1_NM, "성별", res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP005") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						legendNm2.push(res[i].C1_NM);
					}
					if(res[i].C2 != "0") {
						if(res[i].C1 == "1") {
							overlapRemoveData2.push(res[i].C2_NM);
							chartVal2_1.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							overlapRemoveData2.push(res[i].C2_NM);
							chartVal2_2.push(Number(res[i].DT));
						}
						if(res[i].C1 == "3") {
							overlapRemoveData2.push(res[i].C2_NM);
							chartVal2_3.push(Number(res[i].DT));
						}
						if(res[i].C1 == "4") {
							overlapRemoveData2.push(res[i].C2_NM);
							chartVal2_4.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories3.push(res[i].C1_NM);
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories5.push(res[i].C2_NM);
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				chartVal2.push(chartVal2_1, chartVal2_2, chartVal2_3, chartVal2_4);
				selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP006") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						legendNm2.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "1") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_4.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories3.push(res[i].C1_NM);
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories5.push(res[i].C2_NM);
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				chartVal2.push(chartVal2_1, chartVal2_2, chartVal2_3, chartVal2_4);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP007") { //산업대분류별 퇴직연금제도 도입 사업장 수
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "A" && res[i].C2 == "0") {
						legendNm2.push(res[i].C2_NM);
					}
					//2
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						overlapRemoveData2.push(res[i].C2_NM);
						//chartDivisionData2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "A") {
						if(res[i].C2 == "1") {
							chartVal2_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal2_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							chartVal2_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							chartVal2_4.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories3.push(res[i].C1_NM);
						selectNm3.push(res[i].C1_NM);
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories5.push(res[i].C2_NM);
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal3.length; i++ ) {
					if(isNaN(chartVal3[i][1])) {
						chartVal3[i][1] = 0;
					}
				}
				for(let i =0; i<chartVal5.length; i++ ) {
					if(isNaN(chartVal5[i][1])) {
						chartVal5[i][1] = 0;
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				//chartVal2 = $more2DashDetail.util.division(chartDivisionData2, 21);
				chartVal2.push([chartVal2_1, chartVal2_2, chartVal2_3, chartVal2_4]);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
				console.log(categories2);
				console.log(chartVal2);
			}else if(tblId == "DT_1RP008") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal2_1 = new Array;
				let chartVal2_2 = new Array;
				let chartVal2_3 = new Array;
				let chartVal2_4 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						legendNm2.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0") {
						if(res[i].C2 == "1") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							overlapRemoveData2.push(res[i].C1_NM);
							chartVal2_4.push(Number(res[i].DT));
						}
					}
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories3.push(res[i].C1_NM);
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories5.push(res[i].C2_NM);
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				categories2 = $more2DashDetail.util.overlapRemove(overlapRemoveData2);
				chartVal2.push(chartVal2_1, chartVal2_2, chartVal2_3, chartVal2_4);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP009") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
						legendNm2.push(res[i].ITM_NM);
					}
					if(res[i].C2 != "00" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1") {
							chartDivisionData3.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							chartDivisionData3.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C2 != "00" && res[i].ITM_ID == "T01" && res[i].C1 == "1") {
						categories3.push(res[i].C2_NM);
					}
					if(res[i].C2 == "00" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1") {
							legendNm3.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2") {
							legendNm3.push(res[i].C1_NM);
						}
					}
					//4
					if(res[i].C2 != "00" && res[i].ITM_ID == "T03" && res[i].C1 == "1") {
						categories4.push(res[i].C2_NM);
					}
					if(res[i].C2 == "00" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1") {
							legendNm4.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2") {
							legendNm4.push(res[i].C1_NM);
						}
					}
					if(res[i].C2 != "00" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1") {
							chartDivisionData4.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							chartDivisionData4.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C2 == "00" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
					//6
					if(res[i].C2 == "00" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				categories2 = prdDe;
				//split = $more2DashDetail.util.split(chartDivisionData3, tblId);
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 11);
				//split4 = $more2DashDetail.util.split(chartDivisionData4, tblId);
				chartVal4 = $more2DashDetail.util.division(chartDivisionData4, 11);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP010") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm2.push(res[i].ITM_NM);
					}
					if(res[i].C2 != "0" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1") {
							chartVal3_1.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							chartVal3_2.push(Number(res[i].DT));
						}
					}
					//3
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						categories3.push(res[i].C2_NM);
					}
					if(res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == '1') {
							legendNm3.push(res[i].C1_NM);
						}
						if(res[i].C1 == '2') {
							legendNm3.push(res[i].C1_NM);
						}
					}
					//4
					if(res[i].C1 == "0" && res[i].C2 != "0") {
							categories4.push(res[i].C2_NM);
					}
					if(res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == '1') {
							legendNm4.push(res[i].C1_NM);
						}
						if(res[i].C1 == '2') {
							legendNm4.push(res[i].C1_NM);
						}
					}
					if(res[i].C2 != "0" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1") {
							chartVal4_1.push(Number(res[i].DT));
						}
						if(res[i].C1 == "2") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
					//6
					if(res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
						}
					}
				}
				categories2 = prdDe;
				chartVal3 = [chartVal3_1, chartVal3_2];
				chartVal4 = [chartVal4_1, chartVal4_2];
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP011") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm2.push(res[i].ITM_NM);
					}
					//3
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						categories3.push(res[i].C1_NM);
						categories4.push(res[i].C1_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T01") {
						legendNm3.push(res[i].C2_NM);
						legendNm4.push(res[i].C2_NM);
					}
					if(res[i].C2 == "1" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
							chartVal3_1.push(Number(res[i].DT));
						}
					}
					if(res[i].C2 == "2" && res[i].ITM_ID == "T01") {
						if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
							chartVal3_2.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C2 == "1" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
							chartVal4_1.push(Number(res[i].DT));
						}
					}
					if(res[i].C2 == "2" && res[i].ITM_ID == "T03") {
						if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
				}
				categories2 = prdDe;
				chartVal3.push(chartVal3_1, chartVal3_2);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, "대상자별", res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, "대상자별", res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP012") { //금융권역별 운용방법별 적립금액
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					//2
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories2.push(res[i].C1_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						legendNm2.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0" && res[i].C2 != "0") {
						chartDivisionData2.push(Number(res[i].DT));
					}
					//3
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//4
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				split2 = $more2DashDetail.util.split(chartDivisionData2, tblId);
				chartVal2 = $more2DashDetail.util.division(split2, 5);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP013") { //제도유형별 운용방법별 적립금액
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-710 flex-height-495 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-710 flex-height-500");
				$("#charttitle5").addClass("item flex-width-720 flex-height-495 flex-mgL-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-720 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").hide();
				$("#charttitle5").show();
				$("#charttitle6").hide();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					//2
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						categories2.push(res[i].C1_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						legendNm2.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0" && res[i].C2 != "0") {
						chartDivisionData2.push(Number(res[i].DT));
					}
					//3
					if(res[i].C1 != "0" && res[i].C2 == "0") {
						chartVal3.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//4
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				split2 = $more2DashDetail.util.split(chartDivisionData2, tblId);
				chartVal2 = $more2DashDetail.util.division(split2, 4);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP014") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						legendNm2.push(res[i].ITM_NM);
					}
					//3
					if(res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							categories3.push(res[i].C1_NM);
							categories4.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C2_NM);
						legendNm4.push(res[i].C2_NM);
					}
					if(res[i].C2 != "00" && res[i].ITM_ID == "T05") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData3.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C2 != "00" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData4.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
				}
				categories2 = prdDe;
				split3 = $more2DashDetail.util.split(chartDivisionData3, tblId);
				split4 = $more2DashDetail.util.split(chartDivisionData4, tblId);
				
				chartVal3 = $more2DashDetail.util.division(split3, 2);
				chartVal4 = $more2DashDetail.util.division(split4, 2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP015") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						legendNm2.push(res[i].ITM_NM);
					}
					//3
					if(res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							categories3.push(res[i].C1_NM);
							categories4.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C2_NM);
						legendNm4.push(res[i].C2_NM);
					}
					if(res[i].C2 != "00" && res[i].ITM_ID == "T05") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData3.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C2 != "00" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData4.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
				}
				categories2 = prdDe;
				split3 = $more2DashDetail.util.split(chartDivisionData3, tblId);
				split4 = $more2DashDetail.util.split(chartDivisionData4, tblId);
				
				chartVal3 = $more2DashDetail.util.division(split3, 2);
				chartVal4 = $more2DashDetail.util.division(split4, 2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}else if(tblId == "DT_1RP016") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
						chartVal2.push(Number(res[i].DT));
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
						legendNm2.push(res[i].ITM_NM);
					}
					//3
					if(res[i].C2 == "0" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							categories3.push(res[i].C1_NM);
							categories4.push(res[i].C1_NM);
						}
					}
					if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C2_NM);
						legendNm4.push(res[i].C2_NM);
					}
					if(res[i].C2 != "0" && res[i].ITM_ID == "T05") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData3.push(Number(res[i].DT));
						}
					}
					//4
					if(res[i].C2 != "0" && res[i].ITM_ID == "T06") {
						if(res[i].C1 == "1" || res[i].C1 == "2") {
							chartDivisionData4.push(Number(res[i].DT));
						}
					}
					//5
					if(res[i].C1 == "0" && res[i].ITM_ID == "T05") {
						for(let j=1; j<8; j++) {
							if(res[i].C2 == j) {
								chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
							}
						}
					}
					//6
					if(res[i].C1 == "0" && res[i].ITM_ID == "T06") {
						for(let j=1; j<8; j++) {
							if(res[i].C2 == j) {
								chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
							}
						}
					}
				}
				categories2 = prdDe;
				console.log(chartDivisionData3);
				split3 = $more2DashDetail.util.split(chartDivisionData3, tblId);
				split4 = $more2DashDetail.util.split(chartDivisionData4, tblId);
				
				console.log(chartDivisionData3);
				chartVal3 = $more2DashDetail.util.division(split3, 2);
				chartVal4 = $more2DashDetail.util.division(split4, 2);
				selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C1_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C1_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C1_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP018") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				categories3 = ['남자', '여자'];
				categories4 = ['남자', '여자'];
				let c1 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "00" && res[i].C2 == "0"  && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
						chartVal2.push(Number(res[i].DT));
					}
					/*if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						legendNm2.push(res[i].C1_NM);
					}*/
					
					//3
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						selectNm3.push(res[i].C2_NM);
					}
					if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C1_NM);
						legendNm4.push(res[i].C1_NM);
					}
					for(let j = 0; j<c1.length; j++) {
						//3
						if(res[i].C2 == "1" && res[i].C3 != "0" && res[i].ITM_ID == "T05") { //주택구입 남
							if(res[i].C1 == c1[j]) {chartDivisionData3.push(Number(res[i].DT));}
						}
						//4
						if(res[i].C2 == "1" && res[i].C3 != "0" && res[i].ITM_ID == "T06") { //주택구입 남
							if(res[i].C1 == c1[j]) {chartDivisionData4.push(Number(res[i].DT));}
						}
					}
					//5
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						chartVal5.push([res[i].C2_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
						chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal5.length; i++ ) {
					if(isNaN(chartVal5[i][1])) {
						chartVal5[i][1] = 0;
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal6.length; i++ ) {
					if(isNaN(chartVal6[i][1])) {
						chartVal6[i][1] = 0;
					}
				}
				categories2 = prdDe;
				console.log(chartDivisionData3);
				/*split3 = $more2DashDetail.util.split(chartDivisionData3, tblId)
				split4 = $more2DashDetail.util.split(chartDivisionData4, tblId)*/
				//chartVal3.push(chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4, chartVal3_5, chartVal3_6, chartVal3_7, chartVal3_8, chartVal3_9, chartVal3_10, chartVal3_11);
				//chartVal4.push(chartVal4_1, chartVal4_2, chartVal4_3, chartVal4_4, chartVal4_5, chartVal4_6, chartVal4_7, chartVal4_8, chartVal4_9, chartVal4_10, chartVal4_11);
				//chartVal4 = $more2DashDetail.util.division(chartDivisionData4, 11);
				/*chartVal4 = $more2DashDetail.util.division(split4, 2);*/
				for(let i =0; i<chartDivisionData3.length; i++) {
					if(isNaN(chartDivisionData3[i])) {
						chartDivisionData3[i] = 0;
					}
				}
				for(let i =0; i<chartDivisionData4.length; i++) {
					if(isNaN(chartDivisionData4[i])) {
						chartDivisionData4[i] = 0;
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 2);
				chartVal4 = $more2DashDetail.util.division(chartDivisionData4, 2);
				console.log(categories3);
				console.log(chartVal3);
				console.log(chartVal4);
				selectNm1.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C2_OBJ_NM.substr(4, 6), res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C3_OBJ_NM, res[0].C1_OBJ_NM);
			}else if(tblId == "DT_1RP032") {
				$("#charttitle1").addClass("item flex-width-640 flex-height-280");
				$("#charttitle2").addClass("item flex-width-780 flex-height-280 flex-mgL-10 charttitle");
				$("#charttitle3").addClass("item flex-width-950 flex-height-245 charttitle");
				$("#charttitle4").addClass("item flex-width-950 flex-height-245 flex-mgT-10 charttitle");
				$("#charttitle3_4").addClass("item-box flex-width-950 flex-height-500");
				$("#charttitle5").addClass("item flex-width-480 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6").addClass("item flex-width-480 flex-height-245  flex-mgL-10 flex-mgT-10 charttitle");
				$("#charttitle5_6").addClass("item-box flex-width-480 flex-height-500");
				$("#charttitle1").show();
				$("#charttitle2").show();
				$("#charttitle3").show();
				$("#charttitle4").show();
				$("#charttitle5").show();
				$("#charttitle6").show();
				
				$("#charttitle5_6").show();
				$("#flex_wrap").removeClass("flex_wrap");
				$("#charttitle4_1").removeClass("item flex-width-470 flex-height-245 charttitle");
				$("#charttitle5_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle6_1").removeClass("item flex-width-470 flex-height-245 flex-mgL-10 charttitle");
				$("#charttitle456").removeClass("item-box flex-width-1430 flex-height-245 flex-mgT-10 display_flex");
				$("#charttitle456").hide();
				
				let chartVal3_1 = new Array;
				let chartVal3_2 = new Array;
				let chartVal4_1 = new Array;
				let chartVal4_2 = new Array;
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal2.push(Number(res[i].DT));// 데이터 가져왔음
					}
					if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						legendNm2.push(res[i].ITM_NM);
					}
					//3
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						categories3.push(res[i].C1_NM);
						categories4.push(res[i].C1_NM);
					}
					if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T01") {
						legendNm3.push(res[i].C2_NM);
						legendNm4.push(res[i].C2_NM);
					}
					if(res[i].C1 != "0"&& res[i].C2 == "1" && res[i].ITM_ID == "T01") {
						chartVal3_1.push(Number(res[i].DT));
					}
					if(res[i].C1 != "0"&& res[i].C2 == "2" && res[i].ITM_ID == "T01") {
						chartVal3_2.push(Number(res[i].DT));
					}
					//4
					if(res[i].C1 != "0"&& res[i].C2 == "2" && res[i].ITM_ID == "T03") {
						chartVal4_1.push(Number(res[i].DT));
					}
					if(res[i].C1 != "0"&& res[i].C2 == "2" && res[i].ITM_ID == "T03") {
						chartVal4_2.push(Number(res[i].DT));
					}
					//5
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
						chartVal5.push([res[i].C1_NM, Number(res[i].DT)]);
					}
					//6
					if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
						chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
					}
				}
				categories2 = prdDe;
				split3 = $more2DashDetail.util.split(chartDivisionData3, tblId);
				split4 = $more2DashDetail.util.split(chartDivisionData4, tblId);
				
				/*chartVal3 = $more2DashDetail.util.division(split3, 4);
				chartVal4 = $more2DashDetail.util.division(split3, 4);*/
				chartVal3.push(chartVal3_1, chartVal3_2);
				chartVal4.push(chartVal4_1, chartVal4_2);
				selectNm1.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm2.push(res[0].C1_NM, res[0].C1_OBJ_NM, res[0].C2_OBJ_NM);
				selectNm4.push(res[0].C1_NM, res[0].C2_OBJ_NM);
				selectNm6.push(res[0].C1_NM, res[0].C2_OBJ_NM);
			}
			$more2DashDetail.util.horizontalScroll(tblId); //가로스크롤
			$more2DashDetail.util.selectChart(tblId, selectNm1, selectNm2, selectNm3, selectNm4, selectNm5, selectNm6);
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				let dataLabelEnabled1 = '';
				let dataLabelEnabled2 = '';
				if(tblId == "DT_1RP101") { //막대차트 color
					chartColor2 = totGenderColor;
					chartColor3 = genderColor;
					chartColor4 = genderColor;
				}else if(tblId == "DT_1RP102") { //막대차트 color
					chartColor2 = totGenderColor;
					chartColor3 = genderColor;
					chartColor4 = genderColor;
				}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") { //막대차트 color
					chartColor2 = ["#F15C80"]; //여기요
					chartColor3 = genderColor;
					chartColor4 = genderColor;
				}
				let formatNm = '';
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104") {
					formatNm = '명';
				}else if(tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					formatNm = '개소';
				}
				if(tblId == "DT_1RP101") {
					dataLabelEnabled1 = true;
					dataLabelEnabled2 = false;
				}else if(tblId == "DT_1RP102") {
					dataLabelEnabled1 = true;
					dataLabelEnabled2 = true;
				}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					dataLabelEnabled1 = false;
				}
				
				xAxis2.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories2
				});
				xAxis3.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories3
				});
				xAxis4.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories4
				});
				xAxis5.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories5
				});
				for(let i=0; i<legendNm2.length; i++) {
					seriesyearData2.push({
						name: legendNm2[i],
						data: chartVal2[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 2,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: true,
							format: '{y}%',
							//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
							style: {
								fontSize :'14px',
								color: '#000',
								fontWeight: '600',
								textOverflow: "width",
							},
						},
						color: chartColor2[i]
					});
				}
				for(let i=0; i<legendNm3.length; i++) {
					seriesyearData3.push({
						name: legendNm3[i],
						data: chartVal3[i],
						color: "",
						marker: {
							radius: 3,
							symbol: 'circle',
							lineColor:'#7CB5EC',
							fillColor:'#ffffff',
						},
						lineWidth: 2,
						//바 상단의 수치값
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							/*formatter: function() {
								if (this.y < 0) {
									return "<span style='font-weight: bold;'>" + this.y + "</span>";
								}
							}*/
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + formatNm; //바꿔야함
							},
						},
						color: chartColor3[i]
					});
				}
				for(let i=0; i<legendNm4.length; i++) {
					seriesyearData4.push({
						name: legendNm4[i],
						data: chartVal4[i],
						//바 상단의 수치값
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return commaY + formatNm;
							},
						},
						color: chartColor4[i]
					});
				}
				seriesyearData5.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%', //안쪽 지름크기
					data: chartVal5,
					dataLabels: {
						enabled: dataLabelEnabled1,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						}
					},
				});
				seriesyearData6.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						enabled: dataLabelEnabled2,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px', 
						}
					},
				});
				console.log(dataLabelEnabled1);
				console.log(dataLabelEnabled2);
			}else if(tblId == "DT_1RP000" || tblId == "DT_1RP003" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP012" ||
					 tblId == "DT_1RP013") {
				let labelEnabled = "";
				let labelEnabled1 = "";
				let labelEnabled2 = "";
				let innerSize = "";
				let format = "";
				if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
					labelEnabled = true;
					labelEnabled1 = false;
					labelEnabled2 = true;
					innerSize = '80%';
				}else if(tblId == "DT_1RP000" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP008" || tblId == "DT_1RP012" || tblId == "DT_1RP013") {
					labelEnabled = true;
					labelEnabled1 = true;
					labelEnabled2 = true;
					innerSize = '80%';
				}
				if(tblId == "DT_1RP000") { //막대 color
					chartColor2 = genderColor;
				}else if(tblId == "DT_1RP003") {
					chartColor2 = ["#F15C80"];
				}else if(tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP008") {
					chartColor2 = confiColor;
				}else if(tblId == "DT_1RP007") {
					chartColor2 = ["#F15C80"];
				}else if(tblId == "DT_1RP012" || tblId == "DT_1RP013") {
					chartColor2 = resultColor
				}
				if(tblId == "DT_1RP000" || tblId == "DT_1RP003" || tblId == "DT_1RP005") {
					format = '명';
				}else if(tblId == "DT_1RP006" || tblId == "DT_1RP007"|| tblId == "DT_1RP008") {
					format = '개소';
				}else if(tblId == "DT_1RP012" || tblId == "DT_1RP013") {
					format = '백만원';
				}
				xAxis2.push({
					labels: {
						rotation: 0,
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
							width:150,
							lineHeight:14,
						}
					},
					categories: categories2
				});
				xAxis3.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories3
				});
				xAxis5.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories5
				});
				for(let i=0; i<legendNm2.length; i++) {
					seriesyearData2.push({
						name: legendNm2[i],
						data: chartVal2[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 2,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: labelEnabled,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return commaY + format;
							},
						},
						color: chartColor2[i]
					});
				}
				seriesyearData3.push({
					type: 'pie',
					//name: chartNm,
					innerSize: innerSize,
					data: chartVal3,
					dataLabels: {
						enabled: labelEnabled1,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						},
						/*formatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return comma;
						},*/
					},
				});
				seriesyearData5.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: labelEnabled2,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						},
						/*formatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return comma;
						},*/
					},
				});
			}else if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") {
				chartColor2 = genderColor;
				chartColor3 = confiColor;

				xAxis2.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories2
				});
				xAxis3.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories3
				});
				xAxis4.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories4
				});
				xAxis5.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories5
				});
				for(let i=0; i<legendNm2.length; i++) {
					seriesyearData2.push({
						name: legendNm2[i],
						data: chartVal2[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 1,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return commaY + '명';
							},
						},
						color: chartColor2[i]
					});
				}
				for(let i=0; i<legendNm3.length; i++) {
					seriesyearData3.push({
						name: legendNm3[i],
						data: chartVal3[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 5,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return commaY + '명';
							},
						},
						color: chartColor3[i]
					});
				}
				seriesyearData4.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal4,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						}
					},
				});
				seriesyearData5.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: false,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						}
					},
				});
				seriesyearData6.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						enabled: true,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						}
					},
					//color: color5
				});
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
					 tblId == "DT_1RP032") {
				let labelEnabled1 = "";
				let labelEnabled2 = ""; 
				chartColor2 = genderColor; //여기016
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP032") {
					chartColor3 = genderColor;
					chartColor4 = genderColor;
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP018") {
					chartColor3 = ageColor;
					chartColor4 = ageColor;
				}else if(tblId == "DT_1RP016") {
					chartColor3 = reasonColor;
					chartColor4 = reasonColor;
				}
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP032") {
					labelEnabled1 = true;
					labelEnabled2 = true;
				}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					labelEnabled1 = false;
					labelEnabled2 = false;
				}
				console.log(labelEnabled1);
				console.log(labelEnabled2);
				xAxis2.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories2
				});
				xAxis3.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories3
				});
				xAxis4.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					gridLineWidth: 0,
					tickWidth: 0,
					categories: categories4
				});
				seriesyearData2.push({
					name: legendNm2,
					data: chartVal2,
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					lineColor:'#D0D0D0',
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: '{y} 원',
						//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '백만원';
						},
					},
					color: chartColor2
				});
				for(let i=0; i<legendNm3.length; i++) {
					seriesyearData3.push({
						name: legendNm3[i],
						data: chartVal3[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 2,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: true,
							//format: '{y} 명',
							//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
							style: {
								fontSize :'14px',
								color: '#000',
								fontWeight: '600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '명';
							},
						},
						color: chartColor3[i]
					});
				}
				for(let i=0; i<legendNm4.length; i++) {
					seriesyearData4.push({
						name: legendNm4[i],
						data: chartVal4[i],
						color: '#D0D0D0',
						marker: {
							radius: 5,
							symbol: 'circle',
						},
						//dashStyle: 'longdash',
						lineWidth: 2,
						//해당년도 위 데이터 표시
						dataLabels: {
							enabled: true,
							//format: '{y} 백만원',
							//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
							style: {
								fontSize :'14px',
								color: '#000',
								fontWeight: '600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '백만원';
							},
						},
						color: chartColor4[i]
					});
				}
				seriesyearData5.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal5,
					dataLabels: {
						enabled: labelEnabled1,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						},
						/*formatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return comma;
						},*/
					},
				});
				//thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				seriesyearData6.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal6,
					dataLabels: {
						useHTML: true,
						enabled: labelEnabled2,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						},
						/*formatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return comma;
						},*/
					},
				});
			}
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" || tblId == "DT_1RP000" || 
			   tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP003" || tblId == "DT_1RP004" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || 
			   tblId == "DT_1RP008" || tblId == "DT_1RP012" || tblId == "DT_1RP013") {
				$("#chart21").empty();
			}
			if(tblId == "DT_1RP000" || tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP003" || tblId == "DT_1RP004" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || 
			   tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP012" || tblId == "DT_1RP013" ||
			   tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032") {
				$("#chart31").empty();
			}
			$("#chart41").empty();
			$("#chart51").empty();
			$("#chart61").empty();
			$more2DashDetail.chart.makeChart(xAxis2, seriesyearData2, xAxis3, seriesyearData3, xAxis4, seriesyearData4, xAxis5, seriesyearData5, xAxis6, seriesyearData6, tblId, categories2);
			
			
			//셀렉트 체인지 기능
			/*$("select[id=selectChoice1]").change(function(){
				let value = $(this).val(); //value값 가져오기
				let selectChoiceNm1 = $("#selectChoice1 option:checked").text(); //value값 가져오기
				$('.tabArea .tabBox').css("display", "none");
				$('.tabArea .tabBox').removeClass("on");
				$('.tabArea .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea .tabBox:eq(' + value + ')').addClass("on");
				$more2DashDetail.chart.selectChartCreate1(res, value, selectNm1, selectChoiceNm1, prdDe);
			});*/
			$("select[id=selectChoice3]").change(function(){
				let value = $(this).val(); //value값 가져오기
				let selectChoiceNm3 = $("#selectChoice3 option:checked").text(); //value값 가져오기
				$('.tabArea3 .tabBox').css("display", "none");
				$('.tabArea3 .tabBox').removeClass("on");
				$('.tabArea3 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea3 .tabBox:eq(' + value + ')').addClass("on");
				$more2DashDetail.chart.selectChartCreate3(res, value, selectNm1, selectChoiceNm3, prdDe);
			});
			$("select[id=selectChoice4]").change(function(){
				let value = $(this).val(); //value값 가져오기
				let selectChoiceNm4 = $("#selectChoice4 option:checked").text(); //value값 가져오기
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
					$('.tabArea4 .tabBox').css("display", "none");
					$('.tabArea4 .tabBox').removeClass("on");
					$('.tabArea4 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea4 .tabBox:eq(' + value + ')').addClass("on");
				}
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
				   tblId == "DT_1RP032") {
					$('.tabArea5 .tabBox').css("display", "none");
					$('.tabArea5 .tabBox').removeClass("on");
					$('.tabArea5 .tabBox:eq(' + value + ')').css("display", "block");
					$('.tabArea5 .tabBox:eq(' + value + ')').addClass("on");
				}
				$more2DashDetail.chart.selectChartCreate4(res, value, selectNm1, selectChoiceNm4, prdDe);
			});
			$("select[id=selectChoice5]").change(function(){ //여기까지 만들었음
				let value = $(this).val(); //value값 가져오기
				let selectChoiceNm5 = $("#selectChoice5 option:checked").text(); //value값 가져오기
				$('.tabArea4 .tabBox').css("display", "none");
				$('.tabArea4 .tabBox').removeClass("on");
				$('.tabArea4 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea4 .tabBox:eq(' + value + ')').addClass("on");
				$more2DashDetail.chart.selectChartCreate5(res, value, selectNm1, selectChoiceNm5, prdDe);
			});
			$("select[id=selectChoice6]").change(function(){
				let value = $(this).val(); //value값 가져오기
				let selectChoiceNm6 = $("#selectChoice6 option:checked").text(); //value값 가져오기
				$('.tabArea6 .tabBox').css("display", "none");
				$('.tabArea6 .tabBox').removeClass("on");
				$('.tabArea6 .tabBox:eq(' + value + ')').css("display", "block");
				$('.tabArea6 .tabBox:eq(' + value + ')').addClass("on");
				$more2DashDetail.chart.selectChartCreate6(res, value, selectNm1, selectChoiceNm6, prdDe);
			});
		},
		/**
		 * @name : $more2DashDetail.chart.makeChart
		 * @description : 차트 데이터 생성
		 * @date : 2022.10.13
		 * @author : 조규환
		 * @history :
		 */
		makeChart : function(xAxis2, seriesyearData2, xAxis3, seriesyearData3, xAxis4, seriesyearData4, xAxis54, seriesyearData5, xAxis6, seriesyearData6, tblId, categories2) {
			let pieSubTitle1 = 0;
			let pieSubTitle2 = 0;
			let pieSubTitle3 = 0;
			let subTitleComma1 = 0;
			let subTitleComma2 = 0;
			let subTitleComma3 = 0;
			let num1 = 0;
			let num2 = 0;
			let num3 = 0;
			
			/*console.log(seriesyearData6);
			console.log(seriesyearData6[0].data.length);
			console.log(seriesyearData5[0].data[1][1]);*/
			var charts2; 
			var charts3; 
			var charts4; 
			var charts5; 
			var charts6;
			var type = "";
			var stacking = "";
			
			let colors1 = '';
			let colors2 = '';
			let colors3 = '';
			let colors4 = '';
			let colors5 = '';
			let colors6 = '';
			//thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma1 += seriesyearData5[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData6[0].data.length; i++) {
					subTitleComma2 += seriesyearData6[0].data[i][1];
					pieSubTitle2 = subTitleComma2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma1 += seriesyearData5[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}else if(tblId == "DT_1RP000" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP008" || tblId == "DT_1RP012" || tblId == "DT_1RP013") {
				for(let i=0; i<seriesyearData3[0].data.length; i++) {
					subTitleComma1 += seriesyearData3[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma2 += seriesyearData5[0].data[i][1];
					pieSubTitle2 = subTitleComma2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}else if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") {
				for(let i=0; i<seriesyearData4[0].data.length; i++) {
					subTitleComma1 += seriesyearData4[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma2 += seriesyearData5[0].data[i][1];
					pieSubTitle2 = subTitleComma2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData6[0].data.length; i++) {
					subTitleComma3 += seriesyearData6[0].data[i][1];
					pieSubTitle3 = subTitleComma3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}else if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				for(let i=0; i<seriesyearData3[0].data.length; i++) {
					subTitleComma1 += seriesyearData3[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma2 += seriesyearData5[0].data[i][1];
					pieSubTitle2 = subTitleComma2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || 
					 tblId == "DT_1RP032") {
				for(let i=0; i<seriesyearData5[0].data.length; i++) {
					subTitleComma1 += seriesyearData5[0].data[i][1];
					pieSubTitle1 = subTitleComma1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
				for(let i=0; i<seriesyearData6[0].data.length; i++) {
					subTitleComma2 += seriesyearData6[0].data[i][1];
					pieSubTitle2 = subTitleComma2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				}
			}
			console.log(pieSubTitle2);
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			//가입기간별
			let joinColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			
			//Highcharts.setOptions.genderColor
			
			/*Highcharts.setOptions({
				colors: ['#7CB5EC', '#F7A35C', '#F15C80', '#90ED7D', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#FFDA55', '#70658B', 
						 '#55CCFF', '#AD46E0', '#906D3B', '#A828A8', '#FFCD28', '#DCAD67', '#FF7E9D', '#48DAD2', '#BB55FF', '#B9E2FA'],
				genderColor: ['#7CB5EC', '#F15C80'],
				lang: {
					thousandSep: ','
				}
			});*/
			let legend = new Array;
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
				let enabled = "";
				let tooltipUnit = "";
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
					enabled = true;
				}else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					enabled = false;
				}
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102" || tblId == "DT_1RP103" || tblId == "DT_1RP104") {
					tooltipUnit = "명";
				}else if(tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					tooltipUnit = "개소";
				}
				charts2 = Highcharts.chart('chart21', {
					chart : {
						type : 'column',
						//width : 750,
						marginTop:30,
					},
					credits: {enabled: false},
					exporting : {enabled : false},
					title: {text: '',},
					subtitle: {text: '',},
					yAxis: {
						title: {text: '',},
						labels: {enabled : false},
						lineColor: '#E8E8E8'
					},
					xAxis: xAxis2, 
					legend: {
						enabled: enabled,
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
							borderRadius: 5,
							//bar 너비
							pointWidth: 22,
							//color: Highcharts.setOptions.genderColors,
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
						},
					},
					tooltip: {
						enabled: false,
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							return this.series.name + '</br><span style="color:#EEFF2E">' + this.y + '%</span>';
						},
					},
					series: seriesyearData2
					
				});
				
				//4번
				charts4 = Highcharts.chart('chart41', {
					chart : {
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						marginTop:20,
						style: {/*fontFamily: 'Noto Sans KR',*/}
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : {enabled : false},
					title: {text: '',},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:-10,
						itemMarginTop: 8,
						itemStyle: {
							textOverflow: "width"
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis4, 
					yAxis: [{
						//y axis 왼쪽
						title: {text: ''},
						labels: {enabled: false}
					}],
					tooltip: {
						enabled : false,
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' '+tooltipUnit+'</span>';
						},
					},
					plotOptions: {
						series: {
							borderRadius: 5,
							//bar 너비
							pointWidth: 22,
						}
					},
					series: seriesyearData4
				});
				if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106") {
					let colors = "";
					let subTitleX = "";
					let subTitleY = "";
					let legendY = "";
					let legendX = "";
					let subTitleFormat = "";
					let subTitleNm = "";
					let innerSize = "";
					let itemMarginTop = "";
					let legendWidth = "";
					let legendItemWidth = "";
					let subtitleFontSize = "";
					let subtitleNmFontSize = "";
					let subtitleLineHeight = "";
					let tooltipUnit = "";
					if(tblId == "DT_1RP103") {
						colors = personColor;
						subTitleY = -45;
						legendY = -10;
						legendX = 20;
						subTitleNm = '전체 근로자';
						subTitleFormat = '명';
						innerSize = "86%";
						itemMarginTop = 8;
						legendWidth = 420;
						subtitleFontSize = "16";
						subtitleNmFontSize = "22";
						subtitleLineHeight = "28";
						tooltipUnit = "명";
					}else if(tblId == "DT_1RP104") {
						colors = industryColor;
						subTitleY = -195;
						subTitleX = 5;
						legendY = -80;
						subTitleNm = '전체 근로자';
						subTitleFormat = '명';
						innerSize = "86%";
						itemMarginTop = 2;
						subtitleFontSize = "16";
						subtitleNmFontSize = "22";
						subtitleLineHeight = "28";
						tooltipUnit = "명";
					}else if(tblId == "DT_1RP105") {
						colors = personColor;
						subTitleY = -45;
						legendY = -10;
						legendX = 20;
						subTitleNm = '전체 사업장';
						subTitleFormat = '개소';
						innerSize = "86%";
						itemMarginTop = 8;
						legendWidth = 420;
						subtitleFontSize = "16";
						subtitleNmFontSize = "22";
						subtitleLineHeight = "28";
						tooltipUnit = "개소";
					}else if(tblId == "DT_1RP106") {
						colors = industryColor;
						subTitleY = -195;
						subTitleX = 5;
						legendY = -80;
						subTitleNm = '전체 사업장';
						subTitleFormat = '개소';
						innerSize = "86%";
						itemMarginTop = 2;
						subtitleFontSize = "16";
						subtitleNmFontSize = "22";
						subtitleLineHeight = "28";
						tooltipUnit = "개소";
					}
					charts5 = Highcharts.chart('chart51', {
						chart : {
							renderTo: 'dounutChart',
							type: 'pie',
							//marginTop: 0,
							//marginbottom: -20,
							style: {
								//fontFamily: 'Noto Sans KR',
							},
						},
						credits: {enabled: false}, //highchart 워터마크 숨김처리
						exporting : { 
							enabled : false,
							fontFamily: 'Noto Sans KR',
							sourceWidth: 550
						},
						title: {
							text: '',
						},
						subtitle: {
							text: subTitleNm+'<br><span class="customSt2" style="font-size: '+subtitleNmFontSize+'px">'+pieSubTitle1+''+subTitleFormat+'</span>',
							align: 'center',
							verticalAlign: 'middle',
							x:subTitleX,
							y:subTitleY,
							style: {
								color: '#000',
								fontSize: subtitleFontSize,
								fontWeight:'bold',
								lineHeight: subtitleLineHeight,
							}
						},
						events: {
							load: function () {
								let chart = this,
								legend = chart.legend;
								for (let i = 0, len = legend.allItems.length; i < len; i++) {
									(function (i) {
										let item = legend.allItems[i].legendItem;
										item.on('mouseover', function (e) {
											chart.tooltip.refresh([chart.series[0].points[i]]);
										}).on('mouseout', function (e) {
											//chart.options.tooltip.enabled = false;
											chart.render();
										});
									})(i);
								}
							}
						},
						legend: {
							enabled : true,
							width: legendWidth,
							//maxHeight: 500,
							itemWidth: legendItemWidth,
							itemDistance: 25,
							verticalAlign: 'bottom', //middle bottom
							align: 'center', //right center
							itemMarginTop: itemMarginTop,
							//margin: -80,
							x: legendX,
							y: legendY,
							itemStyle: {
								//textOverflow: "ellipsis",
								textOverflow: "width", //ellipsis: text 잘림, width: text 안잘림 
								fontSize :'12px',
								color: '#333333',
								textAlign:'center',
								fontWeight: '600',
								//fontFamily: 'Noto Sans KR',
							},
							itemHoverStyle: {
								color: '#FF0000',
							},
							labelFormatter: function() {
								let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								for(let i=0; i<this.series.data.length; i++) {
									return this.name + ' (' + this.percentage.toFixed(1) + '%) ('+comma+''+subTitleFormat+')';
								}
							}
						},
						plotOptions: {
							pie: {//도넛(파이)차트 전체 옵션 지정.
								size: innerSize, 
								showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
								colors: colors,
								dataLabels : {
									enabled : true,
									distance : 0
								},
								point: {
									events: {
										legendItemClick: function () {
											return false;
										},
									}
								},
							},
							series: {
								/*marker: {
									enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
									lineWidth: 2, //라인 굵기
									lineColor:'#F15C80', //라인 색
									fillColor:'#ffffff'
								},
								dataLabels: {
									enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
									allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
								},*/
								events: {
									/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.show();
										});
									},
									mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.hide();
										});
									},*/
									legendItemClick: function () {
										return false;
									}
								}
							}
						},
						tooltip: {
							useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
							borderRadius: 10,
							backgroundColor :'#000000', 
							borderWidth:0,
							shadow: false,
							padding:12,
							style: {			 
								fontSize :'14px',  
								color: '#fff',
								fontWeight: '600',
								textAlign:'center',
								
							},
							shared: true,
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' '+tooltipUnit+'</span>';
							},
						},
						series: seriesyearData5
					});
				}else if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
					charts5 = Highcharts.chart('chart51', {
						chart : {
							renderTo: 'dounutChart',
							type: 'pie',
							//height: 150,
							//marginTop: -20,
							//marginbottom: -20,
							style: {
								//fontFamily: 'Noto Sans KR',
							},
						},
						credits: {enabled: false}, //highchart 워터마크 숨김처리
						exporting : { enabled : false },
						title: {
							text: '',
						},
						subtitle: {
							text: '전체 근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle1+'명</span>',
							align: 'center',
							verticalAlign: 'middle',
							x:-78,
							y:10,
							style: {
								color: '#000',
								fontSize: '14px',
								fontWeight:'bold',
								lineHeight: 24,
							}
						},
						events: {
							load: function () {
								let chart = this,
								legend = chart.legend;
								for (let i = 0, len = legend.allItems.length; i < len; i++) {
									(function (i) {
										let item = legend.allItems[i].legendItem;
										item.on('mouseover', function (e) {
											chart.tooltip.refresh([chart.series[0].points[i]]);
										}).on('mouseout', function (e) {
											//chart.options.tooltip.enabled = false;
											chart.render();
										});
									})(i);
								}
							}
						},
						legend: {
							enabled : true,
							width: 120,
							verticalAlign: 'middle',
							align: 'right',
							itemMarginTop: 8,
							margin: 10,
							x: -15,
							y: -8,
							itemStyle: {
								textOverflow: "width",
								fontSize :'12px',
								color: '#333',
								textAlign:'center',
								fontWeight: '600',
								//fontFamily: 'Noto Sans KR',	
							},
							itemHoverStyle: {
								color: '#FF0000',
							},
							labelFormatter: function() {
								let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								for(let i=0; i<this.series.data.length; i++) {
									return this.name + '('+comma+'명)';
								}
							},							
							/*formatter: function() {
								$('#container .highcharts-legend').hover(function() {
									//return chart.tooltip.refresh(chart.series.data);
								});
							}*/
						},
						plotOptions: {
							pie: {//도넛(파이)차트 전체 옵션 지정.
								size: '82%', 
								showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
								y:-20,
								colors: genderColor,
								dataLabels : {
									enabled : true,
									distance : 0
								},
								point: {
									events: {
										legendItemClick: function () {
											return false;
										},
									}
								},
							},
							series: {
								/*marker: {
									enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
									lineWidth: 2, //라인 굵기
									lineColor:'#F15C80', //라인 색
									fillColor:'#ffffff'
								},
								dataLabels: {
									enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
									allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
								},*/
								events: {
									/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.show();
										});
									},
									mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.hide();
										});
									},*/
									legendItemClick: function () {
										return false;
									}
								}
							}
						},
						tooltip: {
							useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
							borderRadius: 10,
							backgroundColor :'#000000', 
							borderWidth:0,
							shadow: false,
							padding:12,
							style: {			 
								fontSize :'14px',  
								color: '#fff',
								fontWeight: '600',
								textAlign:'center',
								
							},
							shared: true,
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
							},
						},
						series: seriesyearData5
					});
				}
				
				if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
					let legendWidth = "";
					let legendItemWidth = "";
					let subTitleX = "";
					let legendX = "";
					let pieSize = "";
					let colors = "";
					if(tblId == "DT_1RP101") {
						legendWidth = 420;
						legendItemWidth = 135;
						subTitleX = -195;
						pieSize = '105%';
						legendX = 50;
						colors = ageColor;
					}else if(tblId == "DT_1RP102") {
						legendWidth = 150;
						legendItemWidth = '';
						subTitleX = -72;
						pieSize = '80%';
						legendX = 25;
						colors = periodColor;
					}
					charts6 = Highcharts.chart('chart61', {
						chart : {
							renderTo: 'dounutChart',
							type: 'pie',
							//marginLeft: 50,
							style: {
								//fontFamily: 'Noto Sans KR',
							},
						},
						credits: {enabled: false}, //highchart 워터마크 숨김처리
						exporting : { enabled : false },
						title: {
							text: '',
						},
						subtitle: {
							text: '전체 근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle2+'명</span>',
							align: 'center',
							verticalAlign: 'middle',
							x:subTitleX,
							y:10,
							style: {
								color: '#000',
								fontSize: '14px',
								fontWeight:'bold',
								lineHeight: 24,
							}
						},
						events: {
							load: function () {
								let chart = this,
								legend = chart.legend;
								for (let i = 0, len = legend.allItems.length; i < len; i++) {
									(function (i) {
										let item = legend.allItems[i].legendItem;
										item.on('mouseover', function (e) {
											chart.tooltip.refresh([chart.series[0].points[i]]);
										}).on('mouseout', function (e) {
											//chart.options.tooltip.enabled = false;
											chart.render();
										});
									})(i);
								}
							}
						},
						legend: { //여기해야함
							enabled : true,
							width: legendWidth,
							verticalAlign: 'middle',
							align: 'right',
							itemMarginTop: 5,
							itemWidth: legendItemWidth,
							x: legendX,
							y: -5,
							itemStyle: {
								textOverflow: "width",
								fontSize :'12px',
								color: '#333333',
								textAlign:'center',
								fontWeight: '600',
								//fontFamily: 'Noto Sans KR',	
							},
							itemHoverStyle: {
								color: '#FF0000',
							},
							labelFormatter: function() {
								let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								if(tblId == "DT_1RP101") {
									for(let i=0; i<this.series.data.length; i++) {
										return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
									}
								}else if(tblId == "DT_1RP102") {
									for(let i=0; i<this.series.data.length; i++) {
										return this.name + '('+comma+'명)';
									}
								}
							}
						},
						plotOptions: {
							pie: {//도넛(파이)차트 전체 옵션 지정.
								size: pieSize, 
								y:0,
								showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
								colors: colors, //pie color
								dataLabels : {
									enabled : true,
									distance : 3
								},
								point: {
									events: {
										legendItemClick: function () {
											return false;
										},
									}
								},
							},
							series: {
								/*marker: {
									enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
									lineWidth: 2, //라인 굵기
									lineColor:'#F15C80', //라인 색
									fillColor:'#ffffff'
								},
								dataLabels: {
									enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
									allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
								},*/
								events: {
									/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.show();
										});
									},
									mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
										$.each(this.data, function(i, point){
											point.dataLabel.hide();
										});
									},*/
									legendItemClick: function () {
										return false;
									}
								}
							}
						},
						tooltip: {
							useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
							borderRadius: 10,
							backgroundColor :'#000000', 
							borderWidth:0,
							shadow: false,
							padding:12,
							style: {			 
								fontSize :'14px',  
								color: '#fff',
								fontWeight: '600',
								textAlign:'center',
							},
							shared: true,
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
							},
						},
						series: seriesyearData6
					});
				}
				
			}else if(tblId == "DT_1RP000" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP008" || tblId == "DT_1RP012" || tblId == "DT_1RP013") {
				let format = '';
				let subTitleNm = '';
				let legendWidth = '';
				let legendX = '';
				let plotOptionsSize3 = '';
				let plotOptionsSize5 = '';
				let subtitleY3 = '';
				let subtitleY5 = '';
				let totVal = new Array;
				
				for(let i=0; i<seriesyearData2[0].data.length; i++) {
					totVal.push(seriesyearData2[0].data[i] + seriesyearData2[1].data[i]);
				}
				
				if(tblId == "DT_1RP000") {
					colors1 = genderColor;
					colors2 = confiColor;
					subTitleNm = '전체 근로자';
					format = '명';
					legendX = 40;
					plotOptionsSize3 = '80%';
					plotOptionsSize5 = '79%';
					subtitleY3 = 0;
					subtitleY5 = 0;
				}else if(tblId == "DT_1RP005") {
					colors1 = confiColor;
					colors2 = personColor;
					subTitleNm = '전체 근로자';
					format = '명';
					legendWidth = 660;
					legendX = 55;
					plotOptionsSize3 = '80%';
					plotOptionsSize5 = '84%';
					subtitleY3 = 0;
					subtitleY5 = -10;
				}else if(tblId == "DT_1RP006") {
					colors1 = personColor;
					colors2 = confiColor;
					subTitleNm = '전체 사업장';
					format = '개소';
					legendX = 35;
					plotOptionsSize3 = '85%';
					plotOptionsSize5 = '79%';
					subtitleY3 = -10;
					subtitleY5 = 0;
				}else if(tblId == "DT_1RP008") {
					colors1 = periodColor;
					colors2 = confiColor;
					subTitleNm = '전체 사업장';
					format = '개소';
					legendX = 40;
					plotOptionsSize3 = '85%';
					plotOptionsSize5 = '79%';
					subtitleY3 = -10;
					subtitleY5 = 0;
				}else if(tblId == "DT_1RP012") {
					colors1 = bankColor;
					colors2 = resultColor;
					subTitleNm = '전체 적립금액';
					format = '백만원';
					legendX = 100;
					plotOptionsSize3 = '85%';
					plotOptionsSize5 = '79%';
					subtitleY3 = -10;
					subtitleY5 = 0;
				}else if(tblId == "DT_1RP013") {
					colors1 = confiColor;
					colors2 = resultColor;
					subTitleNm = '전체 적립금액';
					format = '백만원';
					legendX = 100;
					plotOptionsSize3 = '85%';
					plotOptionsSize5 = '79%';
					subtitleY3 = -10;
					subtitleY5 = 0;
				}
				
				charts2 = Highcharts.chart('chart21', {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						//width : 755,
						marginTop:10,

						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:-8,
						itemMarginTop: 8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						/*enabled: true,
						itemMarginBottom: -10,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},*/
					},
					xAxis: xAxis2,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + format;
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							borderRadius: 5,
							//bar 너비
							pointWidth: 22,
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
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = totVal[this.points[0].point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' '+format+'</span>';
							/*var s = '';
							var cnt = '';
							$.each(this.points, function(i, point) {
								cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ cnt + ' ' + format +' </span><br/>';
							});
							return s;*/
						},
						shared: true
					},
					series: seriesyearData2
				});
				//3번
				charts3 = Highcharts.chart('chart31', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 20,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: subTitleNm+'<br><span class="customSt2" style="font-size: 22px">'+pieSubTitle1+''+format+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:0,
						y:subtitleY3,
						style: {
							color: '#000',
							fontSize: '18px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled: true,
						width:legendWidth,
						itemMarginTop: 8,
						y:-5,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+''+format+')';
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: plotOptionsSize3, 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors1,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							/*marker: {
								enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
								lineWidth: 2, //라인 굵기
								lineColor:'#F15C80', //라인 색
								fillColor:'#ffffff'
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},*/
							events: {
								/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.show();
									});
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.hide();
									});
								},*/
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' ' + format + ' </span>';
						},
					},
					series: seriesyearData3
				});
				//5번
				charts5 = Highcharts.chart('chart51', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 20,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: subTitleNm+'<br><span class="customSt2" style="font-size: 22px">'+pieSubTitle1+''+format+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:0,
						y:subtitleY5,
						style: {
							color: '#000',
							fontSize: '18px',
							fontWeight:'bold',
							lineHeight: 30,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled: true,
						width: 730,
						itemMarginTop: 8,
						y:0,
						x:legendX,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+''+format+')';
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: plotOptionsSize5, 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors2,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							/*marker: {
								enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
								lineWidth: 2, //라인 굵기
								lineColor:'#F15C80', //라인 색
								fillColor:'#ffffff'
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},*/
							events: {
								/*mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.show();
									});
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.hide();
									});
								},*/
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' ' + format + '</span>';
						},
					},
					series: seriesyearData5
				});
			}else if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") { //성별 연령별 퇴직연금제도 가입 근로자 수
				let totVal = new Array;
				let totVal2 = new Array;
				for(let i=0; i<seriesyearData2[0].data.length; i++) {
					totVal.push(seriesyearData2[0].data[i] + seriesyearData2[1].data[i]);
				}
				for(let i=0; i<seriesyearData3[0].data.length; i++) {
					totVal2.push(seriesyearData3[0].data[i] + seriesyearData3[1].data[i]);
				}
				
				if(tblId == "DT_1RP001") {
					colors1 = genderColor;
					colors2 = ageColor;
					colors3 = confiColor;
				}else if(tblId == "DT_1RP002" || tblId == "DT_1RP004") {
					colors1 = genderColor;
					colors2 = joinColor ;
					colors3 = confiColor;
				}
				charts2 = Highcharts.chart('chart21', {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:0,
						itemMarginTop: 8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis2,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							align: 'center',
							x:0,
							y:0,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만개';
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8*/
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
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = totVal[this.points[0].point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
							/*var s = '';
							var cnt = '';
							$.each(this.points, function(i, point) {
								cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' 명</span><br/>';
							});
							return s;*/
						},
						shared: true
					},
					series: seriesyearData2
				});
				
				//tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004"
				charts3 = Highcharts.chart('chart31', {
					chart : {
						//renderTo: 'horiStackedBar',
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {text: '',},
					subtitle: {
						//text: '전체근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle1+'명</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-65,
						y:0,
						style: {
							color: '#494949',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-20,
						y:0,
						itemMarginTop: 8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis3,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							overflow: 'allow',
							crop: false,
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만개';
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8
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
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = totVal2[this.points[0].point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
							
							/*var s = '';
							var cnt = '';
							$.each(this.points, function(i, point) {
								cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' 명</span><br/>';
							});
							return s;*/
						},
						shared: true
					},
					series: seriesyearData3
				});
				//tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004"
				//4번
				charts4 = Highcharts.chart('chart4_1', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 0,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle1+'명</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-65,
						y:5,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: 100,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: -10,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+'명)';
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '78%', 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors1,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData4
				});
				//tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004"
				//5번
				charts5 = Highcharts.chart('chart5_1', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 0,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle2+'명</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-190,
						y:5,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: 420,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 2,
						itemMarginBottom: 2,
						itemWidth: 135,
						x: 60,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
							}
							/*for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%)';
							}*/
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '109%', 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors2,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData5
				});
				//tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004"
				//6번
				charts6 = Highcharts.chart('chart6_1', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 0,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 근로자<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle3+'명</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-85,
						y:5,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: 150,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						x: 0,
						y: -8,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+'명)';
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '78%', 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors3,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData6
				});
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || 
					 tblId == "DT_1RP032") {
				let legendWidth = "";
				let legendItemWidth = '';
				let legendVerticalAlign = "";
				let legendAlign = "";
				let legendX = "";
				let legendY = "";
				let legendX2 = "";
				let legendY2 = "";
				let color1 = "";
				let color2 = "";
				let subTitleNm1 = "";
				let subTitleNm2 = "";
				let subTitleFormat1 = "";
				let subTitleFormat2 = "";
				let subTitleX1 = '';
				let subTitleX2 = '';
				let subTitleY = '';
				let pieSize = '';
				let totValNum1 = 0;
				let totValNum2 = 0;
				let totValNum3 = 0;
				let totValNum4 = 0;
				let totVal = new Array;
				let totVal2 = new Array;
				let legendItemMarginTop = '';
				let marginTop = '';
				let marginLeft1 = '';
				let marginLeft2 = '';
				console.log(seriesyearData3);
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP032") {
					for(let i=0; i<seriesyearData3[0].data.length; i++) {
						totVal.push(seriesyearData3[0].data[i] + seriesyearData3[1].data[i]);
					}
					for(let i=0; i<seriesyearData4[0].data.length; i++) {
						totVal2.push(seriesyearData4[0].data[i] + seriesyearData4[1].data[i]);
					}
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					for(let i=0; i<seriesyearData3.length; i++) {
						totValNum1 += seriesyearData3[i].data[0];
						totValNum2 += seriesyearData3[i].data[1];
					}
					totVal = [totValNum1, totValNum2];
					
					for(let i=0; i<seriesyearData4.length; i++) {
						totValNum3 += seriesyearData4[i].data[0];
						totValNum4 += seriesyearData4[i].data[1];
					}
					totVal2 = [totValNum3, totValNum4];
				}
				for(let i=0; i<seriesyearData4[0].data.length; i++) {
					totVal2.push(seriesyearData4[0].data[i] + seriesyearData4[1].data[i]);
				}
				/*if(tblId == "DT_1RP009") {
					legendWidth = 100;
					legendVerticalAlign = "middle";
					legendAlign = "right";
					legendX1 = 35;
				}else {
					legendWidth = "";
					legendVerticalAlign = "bottom";
					legendAlign = "center";
					legendX1 = "";
				}*/ 
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
					color1 = genderColor;
					color2 = genderColor;
				}else if(tblId == "DT_1RP011") {
					color1 = selfColor;
					color2 = selfColor;
				}else if(tblId == "DT_1RP016") {
					color1 = reasonColor;
					color2 = reasonColor;
				}else if(tblId == "DT_1RP018") {
					color1 = reasonColor;
					color2 = reasonColor;
				}else if(tblId == "DT_1RP032") {
					color1 = IRPColor;
					color2 = IRPColor;
				}
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP032") {
					legendItemMarginTop = 8;
					legendY = 0;
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					legendItemMarginTop = 6;
					legendY = -10;
				}
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP032") {
					legendWidth = 100;
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP018") {
					legendWidth = 180;
				}else if(tblId == "DT_1RP016") {
					legendWidth = 140;
				}
				
				////tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032"
				charts3 = Highcharts.chart('chart31', {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'left',
						margin: 0,
						distance : 3,
						x:-15,
						y:legendY,
						itemMarginTop: legendItemMarginTop,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis3,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만개';
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8*/
						},
						dataLabels: {
							enabled: false,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'500',
								textOutline:0,
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = totVal[this.points[0].point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
							
							/*var s = '';
							let commaY = '';
							$.each(this.points, function(i, point) {
								commaY = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ commaY +' 명</span><br/>';
							});
							return s;*/
						},
						shared: true
					},
					series: seriesyearData3
				});
				//tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032"
				charts4 = Highcharts.chart('chart41', {
					chart : {
						renderTo: 'horiStackedBar',
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:legendY,
						itemMarginTop: legendItemMarginTop,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis4,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							x:20,
							y:1,
							//format: '{total} 만원',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '만원';
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							stacking: '',//stacked bar 필수 설정 옵션.(default undefined)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8*/
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
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = totVal2[this.points[0].point.index];
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.x + '</br><span style="color:#EEFF2E">' + commaY + ' 백만원</span>';
							/*var s = '';
							let commaY = '';
							$.each(this.points, function(i, point) {
								commaY = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ commaY +' 백만원</span><br/>';
							});
							return s;*/
						},
						shared: true
					},
					series: seriesyearData4
				});
				//tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032"
				/*subTitleNm = "";
				subTitleFormat = "";*/
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010") {
					subTitleNm1 = '전체 가입자';
					subTitleNm2 = '전체 적립금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX1 = -75;
					subTitleX2 = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = 0;
					legendY = -8;
					legendX2 = -20;
					legendY2 = -8;
					marginLeft2 = 20;
				}else if(tblId == "DT_1RP011") {
					subTitleNm1 = '전체 가입자';
					subTitleNm2 = '전체 적립금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 120;
					legendItemWidth = '';
					subTitleX1 = -100;
					subTitleX2 = -100;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -40;
					legendY = -8;
					legendX2 = -50;
					legendY2 = -8;
					marginLeft1 = -10;
				}else if(tblId == "DT_1RP014") {
					subTitleNm1 = '전체 이전자';
					subTitleNm2 = '전체 이전금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX1 = -75;
					subTitleX2 = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = 0;
					legendY = -8;
					legendX2 = -20;
					legendY2 = -8;
					marginLeft2 = 20;
				}else if(tblId == "DT_1RP015") {
					subTitleNm1 = '전체 해지자';
					subTitleNm2 = '전체 해지금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX1 = -75;
					subTitleX2 = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = 0;
					legendY = -8;
					legendX2 = -20;
					legendY2 = -8;
					marginLeft2 = 20;
				}else if(tblId == "DT_1RP016") {
					subTitleNm1 = '전체 중도인출자';
					subTitleNm2 = '전체 중도인출금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 400;
					legendItemWidth = 120;
					subTitleX1 = -178;
					subTitleX2 = -178;
					subTitleY = 10;
					pieSize = '105%';
					legendX = 75;
					legendY = 0;
					legendX2 = 75;
					legendY2 = 0;
					marginTop =10;
				}else if(tblId == "DT_1RP018") {
					subTitleNm1 = '전체 중도인출자';
					subTitleNm2 = '전체 중도인출금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 400;
					legendItemWidth = 120;
					subTitleX1 = -178;
					subTitleX2 = -178;
					subTitleY = 10;
					pieSize = '105%';
					legendX = 75;
					legendY = 0;
					legendX2 = 75;
					legendY2 = 0;
					marginTop =10;	
				}else if(tblId == "DT_1RP032") {
					subTitleNm1 = '전체 이전예외자';
					subTitleNm2 = '전체 이전예외금액';
					subTitleFormat1 = '명';
					subTitleFormat2 = '백만원';
					legendWidth = 130;
					legendItemWidth = '';
					subTitleX1 = -97;
					subTitleX2 = -93;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -25;
					legendY = -8;
					legendX2 = -25;
					legendY2 = -8;
					marginLeft1 = -10;
				}
				
				charts5 = Highcharts.chart('chart51', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: marginTop,
						marginLeft: marginLeft1,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: subTitleNm1+'<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle1+''+subTitleFormat1+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: subTitleX1,
						y: subTitleY,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						itemWidth: legendItemWidth,
						x: legendX,
						y: legendY,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
								}else {
									return this.name + '('+comma+'명)';
								}
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: pieSize, 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: color1,
							dataLabels : {
								enabled : true,
								distance : 0
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData5
				});
				//tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || tblId == "DT_1RP032"
				charts6 = Highcharts.chart('chart61', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: marginTop,
						marginLeft: marginLeft2,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: subTitleNm2+'<br><span class="customSt2" style="font-size: 15px">'+pieSubTitle2+''+subTitleFormat2+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: subTitleX2,
						y: subTitleY,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 22,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled : true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 8,
						itemWidth: legendItemWidth,
						x: legendX2,
						y: legendY2,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}else {
									return this.name + '('+comma+'백만원)';
								}
							}
							
							/*let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+'백만원)';
							}*/
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: pieSize, 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: color2,
							dataLabels : {
								enabled : true,
								distance : 0
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 백만원</span>';
						},
					},
					series: seriesyearData6
				});
			}else if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				colors1 = industryColor;
				colors2 = confiColor;
				let format = '';
				if(tblId == "DT_1RP003") {
					format = '명';
				}else if(tblId == "DT_1RP007") {
					format = '개소';
				}
				//tblId == "DT_1RP003" || tblId == "DT_1RP007"
				charts3 = Highcharts.chart('chart31', {
					chart : {
						renderTo: 'horiStackedBar',
						//renderTo: 'collum',
						//type: 'bar',//가로 column 지정은 "column"이 아닌 "bar"
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						style: {
							//fontFamily: 'notoSans',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					legend: {
						enabled: false,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:0,
						itemMarginTop: 1.5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					xAxis: xAxis2,
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						},
						//crop: false,
						stackLabels: {
							/*overflow: 'allow',
							crop: false,*/
							enabled: true,//stacked bar 필수 설정 옵션.
							align: 'center',
							x:0,
							y:0,
							//format: '{total} 만개',
							style: {
								fontSize: '14px',
								fontWeight: '600',
								color:'#000'
							},
							formatter: function() {
								let thisY = this.total;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return  commaY + '명';
							},
						},
						gridLineWidth: 1
					}],
					plotOptions: {
						series: {
							//stacking: 'undefined',//stacked bar 필수 설정 옵션.(undefined, normal, percent)
							//bar 너비
							pointWidth: 22,
							borderRadius: 5,
							/*borderRadiusTopLeft: 8,
							borderRadiusTopRight: 8*/
						},
						dataLabels: {
							enabled: true,
							format: '{y}',
							style: {
								fontSize:'14px',
								fontWeight:'600',
								textOutline:0,
							},
						},
					},
					tooltip: {
						enabled: false,
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							var s = this.x+'<br/>';
							var cnt = '';
							$.each(this.points, function(i, point) {
								cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' ' + format + '</span><br/>';
							});
							return s;
						},
						shared: true
					},
					series: seriesyearData2
				});
				//tblId == "DT_1RP003" || tblId == "DT_1RP007"
				//2번
				charts2 = Highcharts.chart('chart21', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 사업장<br><span class="customSt2" style="font-size: 20px">'+pieSubTitle1+format+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:-370,
						y:10,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						useHTML: true,
						enabled : true,
						width: 900,
						itemWidth: 250,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: 1.5,
						x: 180,
						itemDistance : 25,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+format+')';
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '100%', 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors1,
							dataLabels : {
								enabled : true,
								distance : 1
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							/*marker: {
								enabled: true, //마커 보이기 / 안보이기 [true : 보이기, false : 안보이기]
								lineWidth: 2, //라인 굵기
								lineColor:'#F15C80', //라인 색
								fillColor:'#ffffff'
							},*/
							/*dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},
							events: {
								mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.show();
									});
								},
								mouseOut: function (event) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.hide();
									});
								},
								legendItemClick: function () {
									return false;
								}
							}*/
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' ' + format + '</span>';
						},
					},
					series: seriesyearData3
				});
				//tblId == "DT_1RP003" || tblId == "DT_1RP007"
				//5번
				charts5 = Highcharts.chart('chart51', {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: 0,
						backgroundColor: null,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: '전체 사업장<br><span class="customSt2" style="font-size: 22px">'+pieSubTitle2+format+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x:0,
						y:-30,
						style: {
							color: '#000',
							fontSize: '16px',
							fontWeight:'bold',
							lineHeight: 28,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},
					legend: {
						enabled: true,
						itemMarginTop: 8,
						itemDistance: 25,
						width:450,
						x:30, 
						y:-10,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								return this.name + '('+comma+format+')';
							}
						},
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: '72%', 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors2,
							dataLabels : {
								enabled : true,
								distance : 3
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' ' + format + '</span>';
						},
					},
					series: seriesyearData5
				});
			}
			$('#chartBtn2').off('click');
			$('#chartBtn3').off('click');
			$('#chartBtn4').off('click');
			$('#chartBtn5').off('click');
			$('#chartBtn6').off('click');
			$('#chartBtn7').off('click');
			$('#chartBtn2').click(function(){
				for(var i = 0; i < $('.tabArea2 .chartbox').length; i++){
					if($('.tabArea2 .chartbox div').attr('id') == 'chart21'){charts2.exportChart();}
				}
			});
			$('#chartBtn3').click(function(){
				for(var i = 0; i < $('.tabArea3 .chartbox').length; i++){
					if($('.tabArea3 .chartbox div').attr('id') == 'chart31'){charts3.exportChart();}
				}
			});
			$('#chartBtn4').click(function(){
				for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
					if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts4.exportChart();}
				}
			});
			$('#chartBtn5').click(function(){
				for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
					if($('.tabArea5 .chartbox div').attr('id') == 'chart51'){charts5.exportChart();}
				}
			});
			$('#chartBtn6').click(function(){
				for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
					if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
				}
			});
			$('#chartBtn7').click(function(){
				for(var i = 0; i < $('.tabArea7 .chartbox').length; i++){
					if($('.tabArea7 .chartbox div').attr('id') == 'chart71'){charts7.exportChart();}
				}
			});
		},
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate1
		 * @description : 셀렉트 차트1 데이터 생성
		 * @date : 2022.10.17
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate1 : function(res, value, selectNm1, selectChoiceNm, prdDe) {
			//res: 데이터, value: select value, selectNm1: select option name, selectChoiceNm: 선택한 select option, prdDe: 년도
			console.log(res);
			console.log(value);
			console.log(selectNm1);
			console.log(selectChoiceNm);
			console.log(prdDe);
			let tblId = res[0].TBL_ID;
			let c1 = new Array;
			let c2 = new Array;
			let charts1 = "";
			let count = "";
			let format = "";
			let categories = "";
			let divisionData = new Array;
			let overlapRemoveDataDt = new Array;
			let dataNm = new Array;
			let dataDt = new Array;
			let chartData = new Array;
			let perChange = new Array;
			let radius = "";
			let symbol = '';
			let lineColor = '';
			let fillColor = '';
			let verticalAlign = ''; //middle bottom
			let align = ''; //right center
			let chartColor = '';
			let legendEnabled = "";
			for(let i=1; i<7; i++) {
				$(".chart1"+i).empty();
			}
			perChange.push (
					"없음"
					,(((res[1].DT - res[0].DT) / res[0].DT ) * 100).toFixed(2)
					,(((res[2].DT - res[1].DT) / res[1].DT ) * 100).toFixed(2)
					,(((res[3].DT - res[2].DT) / res[2].DT ) * 100).toFixed(2)
					,(((res[4].DT - res[3].DT) / res[3].DT ) * 100).toFixed(2)
					,(((res[5].DT - res[4].DT) / res[4].DT ) * 100).toFixed(2)
				);
			if(selectChoiceNm == "계" || selectChoiceNm == "총계") {  //시리즈수정
				radius = 5;
				symbol = 'circle';
				lineColor = '#F15C80';
				fillColor = '#ffffff';
				legendVerticalAlign = 'bottom';
				legendAlign = 'center';
			}else {
				radius = 3;
				symbol = 'circle';
				lineColor = '#7CB5EC';
				fillColor = '#ffffff';
				legendVerticalAlign = 'middle';
				legendAlign = 'right';
			}
			
			//colors
			if(selectChoiceNm == '성별') { //여기
				chartColor = ['#7CB5EC', '#F15C80'];
			}else if(selectChoiceNm == "연령별") {
				chartColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			}else if(selectChoiceNm == "근속기간별" || selectChoiceNm == "도입기간별") {
				chartColor = ['#7CB5EC', '#BAD3EB','#F15C80', '#FFC1D0','#F7A35C'];
			}else if(selectChoiceNm == "종사자규모별") {
				chartColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			}else if(selectChoiceNm == "산업분류별") {
				chartColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1'
							 ,'#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			}else if(selectChoiceNm == "가입기간별") {
				chartColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			}else if(selectChoiceNm == "대상자별") {
				chartColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			}else if(selectChoiceNm == "금융권역별") {
				chartColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			}else if(selectChoiceNm == "운용방법별") {
				chartColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			}else if(selectChoiceNm == "제도유형별") {
				chartColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			}else if(selectChoiceNm == "사유별") {
				chartColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			}else if(selectChoiceNm == "IRP이전예외사유별") {
				chartColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			}
			if(selectChoiceNm == '총계') {
				legendEnabled = false;
			}else {
				legendEnabled = true;
			} 
			if(tblId == "DT_1RP101") {
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					//1번차트
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					c1 = ['1', '2'];
					dataNm = ['남자', '여자'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == c1[0] && res[i].C2 == "00" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].C1 == c1[1] && res[i].C2 == "00" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T13") {
							if(res[i].PRD_DE == prdDe[5]) {
								dataNm.push(res[i].C2_NM);
							}
							divisionData.push(Number(res[i].DT));
						}
					}
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
				console.log(dataNm);
				console.log(dataDt);
			}else if(tblId == "DT_1RP102") { //요깃
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별"){
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "1" && res[i].C2 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2" && res[i].C2 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "근속기간별"){
					//let c2Count = 0;
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<6; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T13") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}	
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP103") {
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "종사자규모별"){
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<8; l++) {
							if(res[i].C1 == l && res[i].ITM_ID == "T13") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}	
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP104") {
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "산업분류별"){
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP105") {
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "종사자규모별"){
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].ITM_ID == "T13") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP106") {
				categories = prdDe;
				format = "%";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입률'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].ITM_ID == "T16") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "산업분류별"){
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].ITM_ID == "T16") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP000") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "1" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP001") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 == "1101" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}7
						if(res[i].C1 == "00" && res[i].C2 == "1102" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<13; l++) {
							if(l < 10) {
								if(res[i].C1 == "0"+l && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
									divisionData.push(Number(res[i].DT));
									overlapRemoveDataDt.push(res[i].C1_NM);
								}
							}else {
								if(res[i].C1 == l && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
									divisionData.push(Number(res[i].DT));
									overlapRemoveDataDt.push(res[i].C1_NM);
								}
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP002") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "1101" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}
						if(res[i].C1 == "0" && res[i].C2 == "1102" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "근속기간별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<7; l++) {
							if(res[i].C1 == l && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
							if(l == 2) {
								if(res[i].C1 == '11' && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
									divisionData.push(Number(res[i].DT));
									overlapRemoveDataDt.push(res[i].C1_NM);
								}
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP003") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "산업분류별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP004") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "1101" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}
						if(res[i].C1 == "0" && res[i].C2 == "1102" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C2_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "가입기간별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<7; l++) {
							if(res[i].C1 == l && res[i].C2 == "00" && res[i].ITM_ID == "T001") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP005") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['근로자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "종사자규모별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<8; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP006") {
				categories = prdDe;
				format = "개소";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['도입 사업장 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T02") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "종사자규모별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<8; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T02") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP007") {
				categories = prdDe;
				format = "개소";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['도입 사업장 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T02") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "산업분류별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T02") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP008") {
				categories = prdDe;
				format = "개소";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['도입 사업장 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "도입기간별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<6; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T001") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP009") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP010") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "1" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
						if(res[i].C1 == "2" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
							overlapRemoveDataDt.push(res[i].C1_NM);
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "가입기간별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP011") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['가입자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "대상자별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<5; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<3; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 4);
			}else if(tblId == "DT_1RP012") {
				categories = prdDe;
				format = "백만원";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['적립금액'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "금융권역별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<6; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "운용방법별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<4; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T03") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP013") {
				categories = prdDe;
				format = "백만원";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['적립금액'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "제도유형별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<6; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "운용방법별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<4; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T03") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP014") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['이전자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<3; l++) {
							if(res[i].C1 == l && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP015") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['해지자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<3; l++) {
							if(res[i].C1 == l && res[i].C2 == "00" && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP016") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['인출자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T05") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "사유별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<8; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<3; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
				console.log(dataNm);
				console.log(dataDt);
			}else if(tblId == "DT_1RP018") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['인출자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "사유별") {
					count = "2";
					let test = new Array;
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<8; l++) {
							if(res[i].C1 == "00" && res[i].C2 == l && res[i].C3 == "0" && res[i].ITM_ID == "T05") { 
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
						if(res[i].C1 == "00" && res[i].C2 == '6' && res[i].C3 == "0" && res[i].ITM_ID == "T05") { 
							test.push(Number(res[i].DT));
						}
					}
					for(let i =0; i<divisionData.length; i++) {
						if(isNaN(divisionData[i])) {
							divisionData[i] = 0;
						}
					}
					console.log(test);
					console.log(test);
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<7; l++) {
							if(res[i].C1 == "00" && res[i].C2 == "0" && res[i].C3 == l && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C3_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "연령별") {
					count = "4";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 6);
				console.log(dataDt);
				console.log(dataDt);
				console.log(dataDt);
			}else if(tblId == "DT_1RP032") {
				categories = prdDe;
				format = "명";
				if(selectChoiceNm == "총계") {
					count = "1";
					dataNm = ['예외자 수'];
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T01") {
							divisionData.push(Number(res[i].DT));
						}
					}
				}else if(selectChoiceNm == "IRP이전예외사유별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<5; l++) {
							if(res[i].C1 == l && res[i].C2 == "0" && res[i].ITM_ID == "T01") { 
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C1_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}else if(selectChoiceNm == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<3; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") { 
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}
					dataNm = $more2DashDetail.util.overlapRemove(overlapRemoveDataDt);
				}
				dataDt = $more2DashDetail.util.division(divisionData, 3);
			}
			for(let i=0; i<dataNm.length; i++) {
				chartData.push({
					name: dataNm[i],
					data: dataDt[i],
					color: chartColor[i],
					marker: {
						radius: radius,
						symbol: symbol,
						lineColor: lineColor,
						fillColor: fillColor,
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						allowOverlap:true,
						enableMouseTracking: true,
						//format: format,
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + format;
						},
					},
				});
			}
			charts1 = "charts1"+count;
			if(selectChoiceNm == "총계") {
				charts1 = Highcharts.chart('chart1'+count, {
					chart : {
						type : 'line',
						marginTop:30,
					},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
							}
						},
						categories: categories
					},
					legend: {
						enabled: legendEnabled,
						useHTML: false,
						width: 110,
						verticalAlign: legendVerticalAlign, // bottom
						align: legendAlign, // center
						marginLeft: 10,
						x: 25,
						itemMarginTop: 0.5,
						itemMarginBottom: 0.5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},
							/*events: {
								mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									if(selectChoiceNm != "계") {
										$.each(this.data, function(i, point){
											point.dataLabel.show();
										});	
									}
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									if(selectChoiceNm != "계") {
										$.each(this.data, function(i, point){
											point.dataLabel.hide();
										});
									}
								}
							}*/
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							let tooltip1 = new Array 
							let tooltip2 = new Array 
							let tooltip3 = new Array 
							let tooltip4 = new Array 
							let tooltip5 = new Array 
							/*tooltip1.push((this.series.data[1].y - this.series.data[0].y).toFixed(2));
							tooltip2.push((this.series.data[2].y - this.series.data[1].y).toFixed(2));
							tooltip3.push((this.series.data[3].y - this.series.data[2].y).toFixed(2));
							tooltip4.push((this.series.data[4].y - this.series.data[3].y).toFixed(2));
							tooltip5.push((this.series.data[5].y - this.series.data[4].y).toFixed(2));*/
							if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
								tooltip1.push((this.series.data[1].y - this.series.data[0].y).toFixed(2));
								tooltip2.push((this.series.data[2].y - this.series.data[1].y).toFixed(2));
								tooltip3.push((this.series.data[3].y - this.series.data[2].y).toFixed(2));
								tooltip4.push((this.series.data[4].y - this.series.data[3].y).toFixed(2));
								tooltip5.push((this.series.data[5].y - this.series.data[4].y).toFixed(2));
							}else if(tblId == 'DT_1RP011'){
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							}else if(tblId == 'DT_1RP032') {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							}else {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
								tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));
							}
							var returnFormatter;
							if(this.x == categories[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories[1]) {
								if(tooltip1 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[2]) {
								if(tooltip2 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[3]) {
								if(tooltip3 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[4]) {
								if(tooltip4 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[5]) {
								if(tooltip5 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip5+'% 증가 ↑</span>';
								}else if(tooltip5 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip5+'% 감소 ↓</span>';
								}else if(tooltip5 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: chartData 
				});
			}else {
				charts1 = Highcharts.chart('chart1'+count, {
					chart : {
						type : 'line',
						marginTop:30,
					},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: {
						labels: {
							style: {
								color: '#494949',
								fontSize:'12px',
								fontWeight: 'bold',
							}
						},
						categories: categories
					},
					legend: {
						enabled: legendEnabled,
						useHTML: false,
						width: 110,
						verticalAlign: legendVerticalAlign, // bottom
						align: legendAlign, // center
						marginLeft: 10,
						x: 25,
						itemMarginTop: 0.5,
						itemMarginBottom: 0.5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'',
								fillColor:'',
								//fontFamily: 'Noto Sans KR',
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},
							events: {
								mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									if(selectChoiceNm != "총계") {
										$.each(this.data, function(i, point){
											point.dataLabel.show();
											console.log("adad");
										});	
									}
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									if(selectChoiceNm != "총계") {
										$.each(this.data, function(i, point){
											point.dataLabel.hide();
											console.log("adad");
										});
									}
								}
							}
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							lineHeight: 1.2,
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							let tooltip1 = new Array 
							let tooltip2 = new Array 
							let tooltip3 = new Array 
							let tooltip4 = new Array 
							let tooltip5 = new Array 
							if(tblId == 'DT_1RP101' || tblId == 'DT_1RP102' || tblId == 'DT_1RP103' || tblId == 'DT_1RP104' || tblId == 'DT_1RP105' || tblId == 'DT_1RP106') {
								tooltip1.push((this.series.data[1].y - this.series.data[0].y).toFixed(2));
								tooltip2.push((this.series.data[2].y - this.series.data[1].y).toFixed(2));
								tooltip3.push((this.series.data[3].y - this.series.data[2].y).toFixed(2));
								tooltip4.push((this.series.data[4].y - this.series.data[3].y).toFixed(2));
								tooltip5.push((this.series.data[5].y - this.series.data[4].y).toFixed(2));
							}else if(tblId == 'DT_1RP011'){
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							}else if(tblId == 'DT_1RP032') {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							}else {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
								tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));
							} 
							var returnFormatter;
							if(this.x == categories[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories[1]) {
								if(tooltip1 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[2]) {
								if(tooltip2 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[3]) {
								if(tooltip3 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[4]) {
								if(tooltip4 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories[5]) {
								if(tooltip5 > 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip5+'% 증가 ↑</span>';
								}else if(tooltip5 < 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip5+'% 감소 ↓</span>';
								}else if(tooltip5 == 0) {
									returnFormatter = this.series.name+'</br>전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: chartData 
				},function(chart) {
					$.each(chart.series, function(i, series) {
						if(selectChoiceNm != "총계") {
							$.each(series.data, function(i, point){
								point.dataLabel.hide();
							});
						}
					});
					$('.highcharts-legend-item').hover(function(e) {
						chart.series[$(this).index()].onMouseOver();
					},function() {
						chart.series[$(this).index()].onMouseOut();
					});
				});
			}
			$('#chartBtn1').off('click');
			$('#chartBtn1').click(function(){
				for(var i = 0; i < $('.tabArea .chartbox').length; i++){
					if($('.tabArea .chartbox div').attr('id') == 'chart11'){charts1.exportChart();}
					if($('.tabArea .chartbox div').attr('id') == 'chart12'){charts1.exportChart();}
					if($('.tabArea .chartbox div').attr('id') == 'chart13'){charts1.exportChart();}
					if($('.tabArea .chartbox div').attr('id') == 'chart14'){charts1.exportChart();}
				}
			});
		},
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate2
		 * @description : 셀렉트 차트2 데이터 생성
		 * @date : 2022.10.26
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate2 : function(res, value, selectNm1, selectChoiceNm2, prdDe) { //2번차트 셀렉트
			console.log('==== 2번 셀렉트 데이터 ====');
			console.log(res);
			console.log(value);
			console.log(selectNm1);
			console.log(selectChoiceNm2);
			console.log(prdDe);
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			
			let colors = "";
			let count = "";
			let legendNm2 = new Array;
			let chartVal2 = new Array;
			let xAxis2 = new Array;
			let seriesyearData2 = new Array;
			let categories2 = new Array;
			let divisionData = new Array;
			let LegendEnabled = new Array;
			
			if(selectChoiceNm2 == '성별') {
				colors = genderColor;
			}else if(selectChoiceNm2 == '연령별') {
				colors = ageColor;
			}else if(selectChoiceNm2 == '가입기간별') {
				colors = periodColor;
			}else if(selectChoiceNm2 == '대상자별') {
				colors = selfColor;
			}else if(selectChoiceNm2 == '사유별') {
				colors = reasonColor;
			}else if(selectChoiceNm2 == 'IRP이전예외사유별') {
				colors = IRPColor;
			}
			if(tblId == "DT_1RP009") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						/*if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].ITM_NM);
							}
						}*/
					}
					chartVal2 = $more2DashDetail.util.division(divisionData, 6);
				}else if(selectChoiceNm2 == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C2 == "00" && res[i].ITM_ID == "T03") {
								if(res[i].C1 == "1") {
									legendNm2.push(res[i].C1_NM);
								}
								if(res[i].C1 == "2") {
									legendNm2.push(res[i].C1_NM);
								}
							}
						}
					}
					chartVal2 = $more2DashDetail.util.division(divisionData, 6);
				}else if(selectChoiceNm2 == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].ITM_ID == "T03") {
								for(let j=1; j<12; j++) {
									if(res[i].C2 == j) {
										legendNm2.push(res[i].C2_NM);
									}
								}
							}
						}
					}
					chartVal2 = $more2DashDetail.util.division(divisionData, 6);
				}
			}else if(tblId == "DT_1RP010") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].ITM_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "가입기간별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						for(let l=1; l<7; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T03") {
								divisionData.push(Number(res[i].DT));
							}
						}
						if(res[i].PRD_DE == prdDe[5]) {
							for(let l=1; l<7; l++) {
								if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T03") {
									legendNm2.push(res[i].C2_NM);
								}
							}
						}
					}
					/*for(let i=0; i<res.length; i++) {
						for(let l=1; l<12; l++) {
							if(res[i].C1 == "0" && res[i].C2 == l && res[i].ITM_ID == "T01") {
								divisionData.push(Number(res[i].DT));
								overlapRemoveDataDt.push(res[i].C2_NM);
							}
						}
					}*/
				}
				divisionData.splice(24, 0, 0);
				divisionData.splice(30, 0, 0);
				divisionData.splice(30, 0, 0);
				divisionData.splice(30, 0, 0);
				divisionData.splice(30, 0, 0);
				
				chartVal2 = $more2DashDetail.util.division(divisionData, 6);
				console.log(divisionData);
				console.log(chartVal2);
			}else if(tblId == "DT_1RP011") {
				categories2 = prdDe;
				console.log(categories2);
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[3]) {
							if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].ITM_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "대상자별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[3]) {
							if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[3]) {
							if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(divisionData, 4);
			}else if(tblId == "DT_1RP014") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].ITM_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP015") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "연령별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 != "00" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP016") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "사유별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(divisionData, 6);
			}else if(tblId == "DT_1RP018") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 == "0"  && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						/*if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
								legendNm2.push(res[i].C2_NM);
							}
						}*/
					}
				}else if(selectChoiceNm2 == "사유별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 != "0"  && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "00" && res[i].C2 == "0"  && res[i].C3 != "0" && res[i].ITM_ID == "T06") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "00" && res[i].C2 == "0" && res[i].C3 != "0" && res[i].ITM_ID == "T05") {
								legendNm2.push(res[i].C3_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "연령별") {
					count = "4";
					divisionData.push(0, 0, 0, 0, 0, 44);
					for(let i=0; i<res.length; i++) {
						if(res[i].C2 == "0"  && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
							if(res[i].C1 != "00" && res[i].C1 != "01") {
								divisionData.push(Number(res[i].DT));
							}
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
								if(res[i].C1 != "00") {
									legendNm2.push(res[i].C1_NM);
								}
							}
						}
					}
					console.log('year'+ prdDe[5]);
				}
				console.log(prdDe);
				chartVal2 = $more2DashDetail.util.division(divisionData, 6);
				console.log(legendNm2);
				console.log(chartVal2);
			}else if(tblId == "DT_1RP032") {
				categories2 = prdDe;
				if(selectChoiceNm2 == "총계") {
					count = "1";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[5]) {
							if(res[i].C1 == "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "IRP이전예외사유별") {
					count = "2";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[2]) {
							if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C1_NM);
							}
						}
					}
				}else if(selectChoiceNm2 == "성별") {
					count = "3";
					for(let i=0; i<res.length; i++) {
						if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T03") {
							divisionData.push(Number(res[i].DT));
						}
						if(res[i].PRD_DE == prdDe[2]) {
							if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T03") {
								legendNm2.push(res[i].C2_NM);
							}
						}
					}
				}
				chartVal2 = $more2DashDetail.util.division(divisionData, 3);
				console.log(test);
				console.log(prdDe);
				console.log(legendNm2);
				console.log(legendNm2);
			}
			if(selectChoiceNm2 == "계") {
				LegendEnabled = false;
			}else {
				LegendEnabled = true; 
			}
			xAxis2.push({
				labels: {
					rotation: 0,
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
						letterSpacing: '0px',
						rotation: 0,
					}
				},
				gridLineWidth: 0,
				stroke: '#ccd6eb',
				tickWidth: 0,
				categories: categories2
			});
			for(let i=0; i<chartVal2.length; i++) {
				seriesyearData2.push({
					name: legendNm2[i],
					data: chartVal2[i],
					color: '#D0D0D0',
					marker: {
						radius: 3,
						symbol: 'circle',
						lineColor:'#7CB5EC',
						fillColor:'#ffffff',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: '{y} 원',
						//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '백만원';
						},
					},
					color: colors[i]
				});
			}
			var charts2 = "charts2"+count;
			if(selectChoiceNm2 == "총계") {
				charts2 = Highcharts.chart('chart2'+count, {
					chart : {
						type : 'line',
						width : 750,
						marginTop:30,
					},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: xAxis2, 
					legend: {
						enabled: false,
						itemStyle: {
							textOverflow: "ellipsis",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:12,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							let tooltip1 = new Array;
							let tooltip2 = new Array;
							let tooltip3 = new Array;
							let tooltip4 = new Array;
							let tooltip5 = new Array;
							/*tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
							tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
							tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));*/
							if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
								tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP011") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP032") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							}
							var returnFormatter;
							if(this.x == categories2[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories2[1]) {
								if(tooltip1 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[2]) {
								if(tooltip2 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[3]) {
								if(tooltip3 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[4]) {
								if(tooltip4 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[5]) {
								if(tooltip5 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip5+'% 증가 ↑</span>';
								}else if(tooltip5 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip5+'% 감소 ↓</span>';
								}else if(tooltip5 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: seriesyearData2
				});
			}else {
				charts2 = Highcharts.chart('chart2'+count, {
					chart : {
						type : 'line',
						width : 750,
						marginTop:30,
					},
					credits: {
						enabled: false
					},
					exporting : {
						enabled : false
					},
					title: {
						text: '',
					},
					subtitle: {
						text: '',
					},
					yAxis: {
						title: {
						  text: '',
						},
						labels: {
							enabled : false
						},
						lineColor: '#E8E8E8'
					},
					xAxis: xAxis2, 
					legend: {
						enabled : LegendEnabled,
						useHTML: true,
						width: 120,
						verticalAlign: 'middle',
						align: 'right',
						marginLeft: 10,
						x:25,
						itemMarginTop: 0.5,
						itemMarginBottom: 0.5,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333',
							textAlign:'left',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
					},
					plotOptions: {
						series: {
							marker: {
								enabled: true,
								lineWidth : 2,
								lineColor:'#F15C80',
								fillColor:'#ffffff',
								//fontFamily: 'Noto Sans KR',
							},
							dataLabels: {
								enabled: true, //데이터레이블 보이기/안보이기 [true : 보이기, false : 안보이기]
								allowOverlap: true //데이터레이블 겹치기/안겹치기 (안겹치기시 겹치는 데이터레이블 안보임) [true : 겹치다, false : 안겹치다]
							},
							events: {
								mouseOver: function (event) { //마우스 오버 이벤트[마우스올리면 : show(데이터레이블 보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.show();
									});
								},
								mouseOut: function (e) { //마우스 오버 이벤트[마우스내리면 : hide(데이터레이블 안보이기)]
									$.each(this.data, function(i, point){
										point.dataLabel.hide();
									});
								}
							}
						},
					},
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000',
						borderWidth:0,
						shadow: false,
						padding:10,
						zIndex: 100,
						style: {
							fontSize :'14px',
							color: '#fff',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',
						},
						formatter: function () {
							let tooltip1 = new Array;
							let tooltip2 = new Array;
							let tooltip3 = new Array;
							let tooltip4 = new Array;
							let tooltip5 = new Array;
							if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
								tooltip4.push((((this.series.data[4].y - this.series.data[3].y) / this.series.data[3].y) * 100).toFixed(2));
								tooltip5.push((((this.series.data[5].y - this.series.data[4].y) / this.series.data[4].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP011") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
								tooltip3.push((((this.series.data[3].y - this.series.data[2].y) / this.series.data[2].y) * 100).toFixed(2));
							}else if(tblId == "DT_1RP032") {
								tooltip1.push((((this.series.data[1].y - this.series.data[0].y) / this.series.data[0].y) * 100).toFixed(2));
								tooltip2.push((((this.series.data[2].y - this.series.data[1].y) / this.series.data[1].y) * 100).toFixed(2));
							}
							var returnFormatter;
							if(this.x == categories2[0]) {
								returnFormatter = '전년도 자료 없음' ;
							}else if(this.x == categories2[1]) {
								if(tooltip1 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip1+'% 증가 ↑</span>';
								}else if(tooltip1 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip1+'% 감소 ↓</span>';
								}else if(tooltip1 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[2]) {
								if(tooltip2 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip2+'% 증가 ↑</span>';
								}else if(tooltip2 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip2+'% 감소 ↓</span>';
								}else if(tooltip2 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[3]) {
								if(tooltip3 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip3+'% 증가 ↑</span>';
								}else if(tooltip3 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip3+'% 감소 ↓</span>';
								}else if(tooltip3 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[4]) {
								if(tooltip4 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip4+'% 증가 ↑</span>';
								}else if(tooltip4 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip4+'% 감소 ↓</span>';
								}else if(tooltip4 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}else if(this.x == categories2[5]) {
								if(tooltip5 > 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #EEFF2E; ">'+ tooltip5+'% 증가 ↑</span>';
								}else if(tooltip5 < 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #7CB5EC; ">'+ tooltip5+'% 감소 ↓</span>';
								}else if(tooltip5 == 0) {
									returnFormatter = '전년대비</br>' +'<span style="color: #F15C80; ">변동없음</span>';
								}
							}
							return returnFormatter;
						},
					},
					series: seriesyearData2
				},function(chart) {
					$.each(chart.series, function(i, series) {
						if(selectChoiceNm2 != "총계") {
							$.each(series.data, function(i, point){
								point.dataLabel.hide();
							});
						}else {
							$.each(series.data, function(i, point){
								point.dataLabel.hide();
							});
						}
					});
					$('.highcharts-legend-item').hover(function(e) {
						chart.series[$(this).index()].onMouseOver();
					},function() {
						chart.series[$(this).index()].onMouseOut();
					});
				});0
			}
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
		},
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate3
		 * @description : 셀렉트 차트4 데이터 생성
		 * @date : 2022.10.17
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate3 : function(res, value, selectNm1, selectChoiceNm3, prdDe) {
			console.log(res);
			console.log(value);
			console.log(selectNm1);
			console.log(selectChoiceNm3);
			console.log(prdDe);
			let tblId = res[0].TBL_ID;
			let count = Number(value)+1;
			let categories3 = new Array;
			let chartVal3 = new Array;
			let chartVal3_1 = new Array;
			let chartVal3_2 = new Array;
			let chartVal3_3 = new Array;
			let chartVal3_4 = new Array;
			let seriesyearData3 = new Array;
			let overlapRemoveData3 = new Array;
			let chartDivisionData3 = new Array;
			let xAxis3 = new Array;
			let format = new Array;
			let legendNm3 = new Array;
			let c1 = "";
			let c2 = "";
			let legendEnabled = "";
			let tooltipEnabled = "";
			let color = new Array;
			let industryCd = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U"]; //산업대분류별 코드
			if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				/*for(let i = 0; i <= industryCd.length; i++) {
					if(value == i) {
						c1 = industryCd[i]
						count = i+1;
					};
					if(c1.length == 1) {break;}
				}*/
			}
			if(tblId == "DT_1RP003") {
				format = '명';
				legendEnabled = false;
				tooltipEnabled = false;
				color = ["#F15C80"];
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						overlapRemoveData3.push(res[i].C2_NM);
					}
					if(res[i].C1 == industryCd[value]) {
						if(res[i].C2 == "1") {
							chartVal3_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal3_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							chartVal3_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							chartVal3_4.push(Number(res[i].DT));
						}
					}
				}
				categories3 = $more2DashDetail.util.overlapRemove(overlapRemoveData3);
				chartVal3.push([chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4]);
				console.log(categories3);
				console.log(chartVal3);
			}else if(tblId == "DT_1RP007") {
				format = '개소';
				legendEnabled = false;
				tooltipEnabled = false;
				color = ["#F15C80"];
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == "0" && res[i].C2 != "0") {
						overlapRemoveData3.push(res[i].C2_NM);
					}
					if(res[i].C1 == industryCd[value]) {
						if(res[i].C2 == "1") {
							chartVal3_1.push(Number(res[i].DT));
						}
						if(res[i].C2 == "2") {
							chartVal3_2.push(Number(res[i].DT));
						}
						if(res[i].C2 == "3") {
							chartVal3_3.push(Number(res[i].DT));
						}
						if(res[i].C2 == "4") {
							chartVal3_4.push(Number(res[i].DT));
						}
					}
				}
				categories3 = $more2DashDetail.util.overlapRemove(overlapRemoveData3);
				chartVal3.push([chartVal3_1, chartVal3_2, chartVal3_3, chartVal3_4]);
			}else if(tblId == "DT_1RP018") {
				format = '명';
				legendEnabled = true;
				tooltipEnabled = true;
				if(value == 0) {c2 = '1'; count = '1';}
				if(value == 1) {c2 = '2'; count = '2';}
				if(value == 2) {c2 = '3'; count = '3';}
				if(value == 3) {c2 = '4'; count = '4';}
				if(value == 4) {c2 = '5'; count = '5';}
				if(value == 5) {c2 = '6'; count = '6';}
				if(value == 6) {c2 = '7'; count = '7';}
				console.log(c2);
				console.log(count);
				color = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
				c1 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']; //연령
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						legendNm3.push(res[i].C1_NM);
					}
					for(let j = 0; j<c1.length; j++) {
						//3
						if(res[i].C2 == c2 && res[i].C3 != "0" && res[i].ITM_ID == "T05") { //주택구입 남
							if(res[i].C1 == c1[j]) {chartDivisionData3.push(Number(res[i].DT));}
						}
					}
				}
				categories3 = ['남자', '여자'];
				for(let i =0; i<chartDivisionData3.length; i++) {
					if(isNaN(chartDivisionData3[i])) {
						chartDivisionData3[i] = 0;
					}
				}
				chartVal3 = $more2DashDetail.util.division(chartDivisionData3, 2);
			}
			console.log(chartVal3);
			xAxis3.push({
				labels: {
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
					}
				},
				categories: categories3
			});
			for(let i=0; i<chartVal3.length; i++) {
				seriesyearData3.push({
					name: legendNm3[i],
					data: chartVal3[i],
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						color:'#000',
						//format: '{y} 명',
						style: {
							fontSize:'14px',
							fontWeight:'600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return commaY + format;
						},
					},
					color: color[i]
				});
			}
			var charts3 = "charts3"+count;
			charts3 = Highcharts.chart('chart3'+count, {
				chart : {
					renderTo: 'horiStackedBar',
					//renderTo: 'collum',
					//type: 'bar',//가로 column 지정은 "column"이 아닌 "bar"
					type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
					style: {
						//fontFamily: 'notoSans',
					},
				},
				credits: {enabled: false}, //highchart 워터마크 숨김처리
				exporting : { enabled : false },
				title: {
					text: '',
				},
				legend: {
					enabled: legendEnabled,
					width: 180,
					verticalAlign: 'middle',
					align: 'left',
					margin: 5,
					distance : 3,
					x:-15,
					y:-10,
					itemMarginTop: 6,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333',
						textAlign:'left',
						fontWeight: '600',
						//fontFamily: 'Noto Sans KR',	
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
				},
				xAxis: xAxis3,
				yAxis: [{
					//y axis 왼쪽
					title: {
						text: ''
					},
					labels: {
						enabled: false
					},
					//crop: false,
					stackLabels: {
						/*overflow: 'allow',
						crop: false,*/
						enabled: false,//stacked bar 필수 설정 옵션.
						align: 'center',
						x:0,
						y:0,
						//format: '{total} 만개',
						style: {
							fontSize: '14px',
							fontWeight: '600',
							color:'#000'
						},
						formatter: function() {
							let thisY = this.total;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '명';
						},
					},
					gridLineWidth: 1
				}],
				plotOptions: {
					series: {
						//stacking: 'undefined',//stacked bar 필수 설정 옵션.(undefined, normal, percent)
						//bar 너비
						pointWidth: 22,
						borderRadius: 5,
						/*borderRadiusTopLeft: 8,
						borderRadiusTopRight: 8*/
					},
					dataLabels: {
						enabled: true,
						format: '{y}',
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOutline:0,
						},
					},
				},
				tooltip: {
					enabled: tooltipEnabled,
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
						var s = this.x+'<br/>';
						var cnt = '';
						$.each(this.points, function(i, point) {
							cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' ' + format + '</span><br/>';
						});
						return s;
					},
					shared: true
				},
				series: seriesyearData3
			});
		},
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate4
		 * @description : 셀렉트 차트4 데이터 생성
		 * @date : 2022.10.17
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate4 : function(res, value, selectNm1, selectChoiceNm4, prdDe) {
			console.log(res);
			let tblId = res[0].TBL_ID;
			let legendNm4 = new Array;
			let categories = new Array;
			let chartVal4 = new Array;
			let chartVal4_1 = new Array;
			let chartVal4_2 = new Array;
			let seriesyearData4 = new Array;
			let xAxis4 = new Array;
			let count = "";
			let colors = "";
			let totalVal = 0;
			let totalValComma = 0;
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			//가입기간별
			let joinColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			
			console.log(selectChoiceNm4);
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
				colors = genderColor;
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" || 
					 tblId == "DT_1RP032") {
				if(selectChoiceNm4 == "총계") {
					if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
						colors = genderColor;
					}else if(tblId == "DT_1RP011") {
						colors = selfColor;
					}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
						colors = reasonColor;
					}else if(tblId == "DT_1RP032") {
						colors = IRPColor;
					}
				}else if(selectChoiceNm4 == "연령별") {
					colors = ageColor;
				}else if(selectChoiceNm4 == "가입기간별") { //가입기간여기
					colors = joinColor;
				}else if(selectChoiceNm4 == "성별") {
					colors = genderColor;
				}
			}
			if(tblId == "DT_1RP101") {
				if(selectChoiceNm4 == "총계") {
					count = '1';
					c1 = '0';
				}else if(selectChoiceNm4 == "남자") {
					count = '2';
					c1 = '1';
				}else if(selectChoiceNm4 == "여자") {
					count = '3';
					c1 = '2';
				}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == "00") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 == c1 && res[i].C2 != "00") {
						if(res[i].ITM_ID == "T11") {
							categories.push(res[i].C2_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
				}
			}else if(tblId == "DT_1RP102") { 
				if(selectChoiceNm4 == "총계") {
					count = '1';
					c1 = '0';
				}else if(selectChoiceNm4 == "남자") {
					count = '2';
					c1 = '1';
				}else if(selectChoiceNm4 == "여자") {
					count = '3';
					c1 = '2';
				}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 == c1 && res[i].C2 == "0") {
						if(res[i].ITM_ID == "T11" || res[i].ITM_ID == "T12") {
							legendNm4.push(res[i].ITM_NM); //categories4
						}
					}
					if(res[i].C1 == c1 && res[i].C2 != "0") {
						if(res[i].ITM_ID == "T11") {
							categories.push(res[i].C2_NM);
							chartVal4_1.push(Number(res[i].DT));
						}else if(res[i].ITM_ID == "T12") {
							chartVal4_2.push(Number(res[i].DT));
						}
					}
				}
			}else if(tblId == "DT_1RP009") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T01"  && res[i].C2 == "00") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = '2';
						if(res[i].ITM_ID == "T01"  && res[i].C1 == "0") {
							for(let l=1; l<12; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP010") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T01"  && res[i].C2 == "0") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "가입기간별") {
						count = '2';
						if(res[i].ITM_ID == "T01"  && res[i].C1 == "0") {
							for(let l=1; l<7; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
								}
							}
						}
					}
				}
				console.log(chartVal4);
				console.log(totalValComma);
				console.log(totalVal);
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal4.length; i++) {
					if(isNaN(chartVal4[i][1])) {
						chartVal4[i][1] = 0;
					}
				}
				if(selectChoiceNm4 == "가입기간별") {
					for(let i =0; i<chartVal4.length; i++) {
						totalValComma += Number(chartVal4[i][1]);
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP011") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T01"  && res[i].C2 == "0") {
							if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "성별") {
						count = '2';
						if(res[i].ITM_ID == "T01"  && res[i].C1 == "0") {
							for(let l=1; l<3; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP014") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T05"  && res[i].C2 == "00") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = '2';
						if(res[i].ITM_ID == "T05"  && res[i].C1 == "0") {
							for(let l=1; l<12; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP015") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T05"  && res[i].C2 == "00") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = '2';
						if(res[i].ITM_ID == "T05"  && res[i].C1 == "0") {
							for(let l=1; l<12; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP016") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T05"  && res[i].C1 == "0") {
							for(let l=1; l<8; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}else if(selectChoiceNm4 == "성별") {
						count = '2';
						if(res[i].C1 == "1" && res[i].C2 == "0" && res[i].ITM_ID == "T05") {
							chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
						if(res[i].C1 == "2" && res[i].C2 == "0" && res[i].ITM_ID == "T05") {
							chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
						/*if(res[i].PRD_DE == prdDe[5] && res[i].ITM_ID == "T05"  && res[i].C1 == "0") {
							for(let l=1; l<7; l++) {
								if(res[i].C2 == l) {
									chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
								}
							}
						}*/
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				console.log(chartVal4);
			}else if(tblId == "DT_1RP018") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T05"  && res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0") {
							chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
						}
					}else if(selectChoiceNm4 == "성별") {
						count = '2';
						if(res[i].ITM_ID == "T05"  && res[i].C1 == "00" && res[i].C2 == "0") {
							if(res[i].C3 == "1" || res[i].C3 == "2") {
								chartVal4.push([res[i].C3_NM, Number(res[i].DT)]);
							}
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = '3';
						if(res[i].ITM_ID == "T05"  && res[i].C2 == "0" && res[i].C3 == "0") {
							for(let l=1; l<12; l++) {
								if(res[i].C1 == l) {
									chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								}
							}
						}
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal4.length; i++ ) {
					if(isNaN(chartVal4[i][1])) {
						chartVal4[i][1] = 0;
					}
				}
				if(selectChoiceNm4 == "총계" || selectChoiceNm4 == "성별" || selectChoiceNm4 == "연령별") {
					for(let i =0; i<chartVal4.length; i++ ) {
						totalValComma += Number(chartVal4[i][1]);
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP032") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = '1';
						if(res[i].ITM_ID == "T01" && res[i].C2 == "0") {
							if(res[i].C1 == "1" || res[i].C1 == "2" || res[i].C1 == "3" || res[i].C1 == "4") {
								chartVal4.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "성별") {
						count = '2';
						if(res[i].ITM_ID == "T01" && res[i].C1 == "0") {
							if(res[i].C2 == "1" || res[i].C2 == "2") {
								chartVal4.push([res[i].C2_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}
				}
				//NaN이면 0으로 바꾸기
				for(let i =0; i<chartVal4.length; i++ ) {
					if(isNaN(chartVal4[i][1])) {
						chartVal4[i][1] = 0;
					}
				}
				
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
				chartVal4.push(chartVal4_1, chartVal4_2); //오일
				xAxis4.push({
					labels: {
						style: {
							color: '#494949',
							fontSize:'12px',
							fontWeight: 'bold',
						}
					},
					categories: categories
				});
				
				for(let i=0; i<legendNm4.length; i++) {
					seriesyearData4.push({
						name: legendNm4[i],
						data: chartVal4[i],
						//바 상단의 수치값
						dataLabels: {
							enabled: true,
							color:'#000',
							//format: '{y} 명',
							style: {
								fontSize:'14px',
								fontWeight:'600',
							},
							formatter: function() {
								let thisY = this.y;
								let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								return commaY + '명';
							},
						},
						color: colors[i]
					});
				}
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
					 tblId == "DT_1RP032") {
				let dataLabelEnabled = "";
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
					if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
						dataLabelEnabled = true;
					}else if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별'){
						dataLabelEnabled = false;
					}
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
					if(selectChoiceNm4 == '총계') {
						dataLabelEnabled = true;
					}else if(selectChoiceNm4 == '연령별'){
						dataLabelEnabled = false;
					}
				}else if(tblId == "DT_1RP016") {
					if(selectChoiceNm4 == '총계') {
						dataLabelEnabled = false;
					}else if(selectChoiceNm4 == '성별') {
						dataLabelEnabled = true;
					}
				}else if(tblId == "DT_1RP018") {
					if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '연령별') {
						dataLabelEnabled = false;
					}else if(selectChoiceNm4 == '성별') {
						dataLabelEnabled = true;
					}
				}else if(tblId == "DT_1RP032") {
					if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
						dataLabelEnabled = true;
					}
				}
				
				seriesyearData4.push({
					type: 'pie',
					//name: chartNm,
					innerSize: '80%',
					data: chartVal4,
					dataLabels: {
						enabled: dataLabelEnabled,
						format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						align: 'center',
						//세로 위치 지정
						style: {
							fontSize: '14px'
						}
					},
				});
			}
			console.log(seriesyearData4);
			console.log(count);
			var charts4 = "charts4"+count;
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
				charts4 = Highcharts.chart('chart4'+count, {
					chart : {
						type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
						marginTop:20,
						style: {
							//fontFamily: 'Noto Sans KR',
						}
					},
					credits: {
						enabled: false
					}, //highchart 워터마크 숨김처리
					exporting : {
						enabled : false 
					},
					title: {
						text: '',
					},
					legend: {
						enabled: true,
						margin: 0,
						width: 100,
						verticalAlign: 'middle',
						align: 'left',
						margin: 5,
						x:-15,
						y:-10,
						itemMarginTop: 8,
						itemStyle: {
							textOverflow: "width"
						},
						itemHoverStyle: {
							color: '#FF0000',
						}
					},
					xAxis: xAxis4, 
					yAxis: [{
						//y axis 왼쪽
						title: {
							text: ''
						},
						labels: {
							enabled: false
						}
					}],
					tooltip: {
						useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.series.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					plotOptions: {
						series: {
							borderRadius: 5,
							pointWidth:22,
						}
					},
					series: seriesyearData4
				});
				$('#chartBtn4').off('click');
				$('#chartBtn4').click(function(){
					for(var i = 0; i < $('.tabArea4 .chartbox').length; i++){
						if($('.tabArea4 .chartbox div').attr('id') == 'chart41'){charts4.exportChart();}
						if($('.tabArea4 .chartbox div').attr('id') == 'chart42'){charts4.exportChart();}
						if($('.tabArea4 .chartbox div').attr('id') == 'chart43'){charts4.exportChart();}
						if($('.tabArea4 .chartbox div').attr('id') == 'chart44'){charts4.exportChart();}
						if($('.tabArea4 .chartbox div').attr('id') == 'chart45'){charts4.exportChart();}
					}
				});
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
					 tblId == "DT_1RP032") {
				let legendWidth = '';
				let legendItemWidth = '';
				let legendItemMarginTop = '';
				let subTitleX = '';
				let subTitleY = '';
				let pieSize = '';
				let legendX = '';
				let legendY = '';
				let marginTop = '';
				let marginLeft = '';
				if(tblId == "DT_1RP009") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -75;
						subTitleY = 5;
						pieSize = '77%';
						legendX = 0;
						legendY = -8;
						legendItemMarginTop = 8;
						marginLeft = 0;
					}else if(selectChoiceNm4 == '연령별') {
						legendWidth = 420;
						legendItemWidth = 135;
						subTitleX = -195;
						subTitleY = 5;
						pieSize = '105%';
						legendX = 60;
						legendY = -8;
						legendItemMarginTop = 3;
						marginLeft = 0;
					}
				}else if(tblId == "DT_1RP010") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -75;
						subTitleY = 5;
						pieSize = '77%';
						legendX = 0;
						legendY = -8;
						legendItemMarginTop = 8;
					}else if(selectChoiceNm4 == '가입기간별') {
						legendWidth = 420;
						legendItemWidth = 135;
						subTitleX = -193;
						subTitleY = 5;
						pieSize = '105%';
						legendX = 65;
						legendY = -8;
						legendItemMarginTop = 8;
					}
				}else if(tblId == "DT_1RP011") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 120;
						legendItemWidth = '';
						subTitleX = -100;
						subTitleY = 5;
						pieSize = '77%';
						legendX = -40;
						legendY = -8;
						legendItemMarginTop = 8;
						marginLeft = -10;
					}else if(selectChoiceNm4 == '성별') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -85;
						subTitleY = 0;
						pieSize = '70%';
						legendX = -20;
						legendY = -18;
						legendItemMarginTop = 8;
						marginTop = -15;
					}
				}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -75;
						subTitleY = 5;
						pieSize = '77%';
						legendX = 0;
						legendY = -8;
						legendItemMarginTop = 8;
						marginLeft = 0;
					}else if(selectChoiceNm4 == '연령별') {
						legendWidth = 420;
						legendItemWidth = 135;
						subTitleX = -195;
						subTitleY = 5;
						pieSize = '105%';
						legendX = 60;
						legendY = -8;
						legendItemMarginTop = 3;
						marginLeft = 0;
					}
				}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 400;
						legendItemWidth = 120;
						subTitleX = -178;
						subTitleY = 10;
						pieSize = '105%';
						legendX = 75;
						legendY = 0;
						legendItemMarginTop = 8;
						marginTop =10;
					}else if(selectChoiceNm4 == '성별') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -85;
						subTitleY = 0;
						pieSize = '70%';
						legendX = -20;
						legendY = -18;
						legendItemMarginTop = 8;
						marginTop = -15;
					}else if(selectChoiceNm4 == '연령별') {
						legendWidth = 420;
						legendItemWidth = 135;
						subTitleX = -195;
						subTitleY = 10;
						pieSize = '105%';
						legendX = 60;
						legendY = 0;
						legendItemMarginTop = 3;
						marginLeft = 0;
						marginTop = 10;
					}
				}else if(tblId == "DT_1RP032") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 130;
						legendItemWidth = '';
						subTitleX = -97;
						subTitleY = 5;
						pieSize = '77%';
						legendX = -25;
						legendY = -8;
						legendItemMarginTop = 8;
						marginLeft = -10;
					}else if(selectChoiceNm4 == '성별') {
						legendWidth = 120;
						legendItemWidth = 250;
						subTitleX = -85;
						subTitleY = 0;
						pieSize = '70%';
						legendX = -20;
						legendY = -18;
						legendItemMarginTop = 8;
						marginTop = -15;
					}
				}
				/*if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별') {
					legendWidth = 420;
					legendItemWidth = 135;
					subTitleX = -195;
					pieSize = '100%';
				}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					if(selectChoiceNm4 == '총계') {
						legendWidth = 400;
						legendItemWidth = 135;
						subTitleX = -195;
						pieSize = '100%';
					}else {
						legendWidth = 150;
						legendItemWidth = "";
						subTitleX = -70;
						pieSize = '77%';
					}
				}else {
					legendWidth = 150;
					legendItemWidth = "";
					subTitleX = -70;
					pieSize = '77%';
				}*/
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
					subTitleNm1 = '전체 가입자';
					subTitleFormat1 = '명';
				}else if(tblId == "DT_1RP014") {
					subTitleNm1 = '전체 이전자';
					subTitleFormat1 = '명';
				}else if(tblId == "DT_1RP015") {
					subTitleNm1 = '전체 해지자';
					subTitleFormat1 = '명';
				}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					subTitleNm1 = '전체 중도인출자';
					subTitleFormat1 = '명';
				}else if(tblId == "DT_1RP032") {
					subTitleNm1 = '전체 이전예외자';
					subTitleFormat1 = '명';
				}
				console.log(seriesyearData4);
				charts4 = Highcharts.chart('chart5'+count, {
					chart : {
						renderTo: 'dounutChart',
						type: 'pie',
						marginTop: marginTop,
						marginLeft: marginLeft,
						style: {
							//fontFamily: 'Noto Sans KR',
						},
					},
					credits: {enabled: false}, //highchart 워터마크 숨김처리
					exporting : { enabled : false },
					title: {
						text: '',
					},
					subtitle: {
						text: subTitleNm1+'<br><span class="customSt2" style="font-size: 20px">'+totalVal+''+subTitleFormat1+'</span>',
						align: 'center',
						verticalAlign: 'middle',
						x: subTitleX,
						y: subTitleY,
						style: {
							color: '#000',
							fontSize: '14px',
							fontWeight:'bold',
							lineHeight: 24,
						}
					},
					events: {
						load: function () {
							let chart = this,
							legend = chart.legend;
							for (let i = 0, len = legend.allItems.length; i < len; i++) {
								(function (i) {
									let item = legend.allItems[i].legendItem;
									item.on('mouseover', function (e) {
										chart.tooltip.refresh([chart.series[0].points[i]]);
									}).on('mouseout', function (e) {
										//chart.options.tooltip.enabled = false;
										chart.render();
									});
								})(i);
							}
						}
					},     
					legend: {
						enabled : true,
						width: legendWidth,
						verticalAlign: 'middle',
						align: 'right',
						itemMarginTop: legendItemMarginTop,
						itemWidth: legendItemWidth,
						x: legendX,
						y: legendY,
						itemStyle: {
							textOverflow: "width",
							fontSize :'12px',
							color: '#333333',
							textAlign:'center',
							fontWeight: '600',
							//fontFamily: 'Noto Sans KR',	
						},
						itemHoverStyle: {
							color: '#FF0000',
						},
						labelFormatter: function() {
							let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							for(let i=0; i<this.series.data.length; i++) {
								if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
									if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
										return this.name + '(' + comma + '명)';
									}else if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별'){
										return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
									}
								}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
									if(selectChoiceNm4 == '총계') {
										return this.name + '(' + comma + '명)';
									}else if(selectChoiceNm4 == '연령별'){
										return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
									}
								}else if(tblId == "DT_1RP016") {
									if(selectChoiceNm4 == '총계') {
										return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
									}else if(selectChoiceNm4 == '성별') {
										return this.name + '(' + comma + '명)';
									}
								}else if(tblId == "DT_1RP018") {
									if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '연령별') {
										return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'명)';
									}else if(selectChoiceNm4 == '성별') {
										return this.name + '(' + comma + '명)';
									}
								}else if(tblId == "DT_1RP032") {
									if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
										return this.name + '(' + comma + '명)';
									}
								}
							}
						}
					},
					plotOptions: {
						pie: {//도넛(파이)차트 전체 옵션 지정.
							size: pieSize, 
							showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
							colors: colors,
							dataLabels : {
								enabled : true,
								distance : 0
							},
							point: {
								events: {
									legendItemClick: function () {
										return false;
									},
								}
							},
						},
						series: {
							events: {
								legendItemClick: function () {
									return false;
								}
							}
						}
					},
					tooltip: {
						useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
						borderRadius: 10,
						backgroundColor :'#000000', 
						borderWidth:0,
						shadow: false,
						padding:12,
						style: {			 
							fontSize :'14px',  
							color: '#fff',
							fontWeight: '600',
							textAlign:'center',
						},
						shared: true,
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 명</span>';
						},
					},
					series: seriesyearData4
				});
				$('#chartBtn5').off('click');
				$('#chartBtn5').click(function(){
					for(var i = 0; i < $('.tabArea5 .chartbox').length; i++){
						if($('.tabArea5 .chartbox div').attr('id') == 'chart51'){charts4.exportChart();}
						if($('.tabArea5 .chartbox div').attr('id') == 'chart52'){charts4.exportChart();}
						if($('.tabArea5 .chartbox div').attr('id') == 'chart53'){charts4.exportChart();}
						if($('.tabArea5 .chartbox div').attr('id') == 'chart54'){charts4.exportChart();}
						if($('.tabArea5 .chartbox div').attr('id') == 'chart55'){charts4.exportChart();}
					}
				});
			}
		},
		
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate5
		 * @description : 셀렉트 차트5 데이터 생성
		 * @date : 2022.12.08
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate5 : function(res, value, selectNm1, selectChoiceNm5, prdDe) {
			console.log(res);
			console.log(value);
			console.log(selectNm1);
			console.log(selectChoiceNm5);
			console.log(prdDe);
			let tblId = res[0].TBL_ID;
			let c1 = new Array;
			let chartDivisionData4 = new Array;
			let xAxis4 = new Array;
			let categories4 = new Array;
			let chartColor4 = new Array;
			let format = "";
			let legendEnabled = "";
			let count = "";
			let chartVal4 = new Array;
			let seriesyearData4 = new Array;
			let legendNm4 = new Array;
			
			
			if(tblId == "DT_1RP018") {
				c1 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
				chartColor4 = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
				categories4 = ['남자', '여자'];
				format = '백만원';
				legendEnabled = true;
				if(value == 0) {c2 = '1'; count = '1';}
				if(value == 1) {c2 = '2'; count = '2';}
				if(value == 2) {c2 = '3'; count = '3';}
				if(value == 3) {c2 = '4'; count = '4';}
				if(value == 4) {c2 = '5'; count = '5';}
				if(value == 5) {c2 = '6'; count = '6';}
				if(value == 6) {c2 = '7'; count = '7';}
				for(let i=0; i<res.length; i++) {
					if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T05") {
						legendNm4.push(res[i].C1_NM);
					}
					for(let j = 0; j<c1.length; j++) {
						//4
						if(res[i].C2 == c2 && res[i].C3 != "0" && res[i].ITM_ID == "T06") { //주택구입 남
							if(res[i].C1 == c1[j]) {chartDivisionData4.push(Number(res[i].DT));}
						}
					}
				}
				for(let i =0; i<chartDivisionData4.length; i++) {
					if(isNaN(chartDivisionData4[i])) {
						chartDivisionData4[i] = 0;
					}
				}
				chartVal4 = $more2DashDetail.util.division(chartDivisionData4, 2);
			}
			xAxis4.push({
				labels: {
					style: {
						color: '#494949',
						fontSize:'12px',
						fontWeight: 'bold',
					}
				},
				gridLineWidth: 0,
				tickWidth: 0,
				categories: categories4
			});
			for(let i=0; i<chartVal4.length; i++) {
				seriesyearData4.push({
					name: legendNm4[i],
					data: chartVal4[i],
					color: '#D0D0D0',
					marker: {
						radius: 5,
						symbol: 'circle',
					},
					//dashStyle: 'longdash',
					lineWidth: 2,
					//해당년도 위 데이터 표시
					dataLabels: {
						enabled: true,
						//format: '{y} 명',
						//format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
						style: {
							fontSize :'14px',
							color: '#000',
							fontWeight: '600',
						},
						formatter: function() {
							let thisY = this.y;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '백만원';
						},
					},
					color: chartColor4[i]
				});
			}
			var charts4 = "charts4"+count;
			charts4 = Highcharts.chart('chart4'+count, {
				chart : {
					renderTo: 'horiStackedBar',
					//renderTo: 'collum',
					//type: 'bar',//가로 column 지정은 "column"이 아닌 "bar"
					type: 'column',//가로 column 지정은 "column"이 아닌 "bar"
					style: {
						//fontFamily: 'notoSans',
					},
				},
				credits: {enabled: false}, //highchart 워터마크 숨김처리
				exporting : { enabled : false },
				title: {
					text: '',
				},
				legend: {
					enabled: legendEnabled,
					width: 180,
					verticalAlign: 'middle',
					align: 'left',
					margin: 5,
					distance : 3,
					x:-15,
					y:-10,
					itemMarginTop: 6,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333',
						textAlign:'left',
						fontWeight: '600',
						//fontFamily: 'Noto Sans KR',	
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
				},
				xAxis: xAxis4,
				yAxis: [{
					//y axis 왼쪽
					title: {
						text: ''
					},
					labels: {
						enabled: false
					},
					//crop: false,
					stackLabels: {
						/*overflow: 'allow',
						crop: false,*/
						enabled: false,//stacked bar 필수 설정 옵션.
						align: 'center',
						x:0,
						y:0,
						//format: '{total} 만개',
						style: {
							fontSize: '14px',
							fontWeight: '600',
							color:'#000'
						},
						formatter: function() {
							let thisY = this.total;
							let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							return  commaY + '백만원';
						},
					},
					gridLineWidth: 1
				}],
				plotOptions: {
					series: {
						//stacking: 'undefined',//stacked bar 필수 설정 옵션.(undefined, normal, percent)
						//bar 너비
						pointWidth: 22,
						borderRadius: 5,
						/*borderRadiusTopLeft: 8,
						borderRadiusTopRight: 8*/
					},
					dataLabels: {
						enabled: true,
						format: '{y}',
						style: {
							fontSize:'14px',
							fontWeight:'600',
							textOutline:0,
						},
					},
				},
				tooltip: {
					useHTML: true,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
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
						var s = this.x+'<br/>';
						var cnt = '';
						$.each(this.points, function(i, point) {
							cnt = point.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							s += point.series.name +' <span style="color:#EEFF2E">'+ cnt +' ' + format + '</span><br/>';
						});
						return s;
					},
					shared: true
				},
				series: seriesyearData4
			});
		},
		/**
		 * @name : $more2DashDetail.chart.selectChartCreate6
		 * @description : 셀렉트 차트6 데이터 생성
		 * @date : 2022.10.27
		 * @author : 조규환
		 * @history :
		 */
		selectChartCreate6 : function(res, value, selectNm1, selectChoiceNm4, prdDe) {
			//산업
			var industryColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DEEFFF', '#DE204E', '#F15C80', '#FFC1D0', '#FFE4EB', '#744CE9', '#A58BED', '#CBC1E9', 
								 '#EBE3FF', '#3ECA22', '#90ED7D', '#C7F3BE', '#E6FFE1', '#F97A10', '#F7A35C', '#FBDBC0', '#FFEEE0', '#DEDEDE'];
			//총계 성별
			let totGenderColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//남자/여자, 가입근로자수/대상근로자수, 지속/신규
			let genderColor = ['#7CB5EC', '#F15C80'];
			 //나이
			let ageColor = ['#248EF4', '#7CB5EC', '#BAD3EB', '#DE204E', '#F15C80', '#FFC1D0', '#3ECA22', '#90ED7D', '#C7F3BE', '#F97A10', '#F7A35C'];
			 //근속기간
			let periodColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C'];
			 //종사자규모
			let personColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#90ED7D', '#C7F3BE', '#F7A35C'];
			 //확정급여형
			let confiColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			 //원리금보장 실적배당 대기성
			let resultColor = ['#7CB5EC', '#F15C80', '#F7A35C'];
			//은행 증권 생명보험 손해보험 근로복지공단
			let bankColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0','#F7A35C'];
			//대상자별 (자영업자, 단시간근로자, 퇴직금제도 근로자, 직역연금 적용 근로자)
			let selfColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//IRP이전예외사유별 (55세이후퇴직, 담보대출 상환, 퇴직급여액 300만원 이하, 기타)
			let IRPColor = ['#7CB5EC', '#F15C80', '#90ED7D', '#F7A35C'];
			//사유별 (주택구입, 주거목적임차보증금, 장기요양 파산선고 회생절차 개시, 대학등록금, 기타)
			let reasonColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			//가입기간별
			let joinColor = ['#7CB5EC', '#BAD3EB', '#F15C80', '#FFC1D0', '#F7A35C', '#FBDBC0'];
			
			let count = "";
			let chartVal6 = new Array;
			let seriesyearData6 = new Array;
			let colors = "";
			let totalValComma = 0;
			let totalVal = 0;
			if(selectChoiceNm4 == "총계") {
				if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
					colors = genderColor;
				}else if(tblId == "DT_1RP011") {
					colors = selfColor;
				}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
					colors = reasonColor;
				}else if(tblId == "DT_1RP032") {
					colors = IRPColor;
				}
			}else if(selectChoiceNm4 == "연령별") {
				colors = ageColor;
			}else if(selectChoiceNm4 == "가입기간별") { //가입기간여기
				colors = joinColor;
			}else if(selectChoiceNm4 == "성별") {
				colors = genderColor;
			}
			if(tblId == "DT_1RP009") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C2 == "00" && res[i].ITM_ID == "T03") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T03") {
							for(let j=1; j<12; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}	
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP010") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							if(res[i].C1 == "1" || res[i].C1 == "2") {
								chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
								totalValComma += Number(res[i].DT);
							}
						}
					}else if(selectChoiceNm4 == "가입기간별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T03") {
							for(let j=1; j<7; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}	
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP011") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "성별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T03") { //여기데이터
							for(let j=1; j<3; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}	
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP014") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 != "0" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T06") {
							for(let j=1; j<12; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}	
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP015") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 == "1" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
						if(res[i].C1 == "2" && res[i].C2 == "00" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T06") {
							for(let j=1; j<12; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}	
							}
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP016") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 == "0" && res[i].ITM_ID == "T06") {
							for(let j=1; j<8; j++) {
								if(res[i].C2 == j) {
									chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
									totalValComma += Number(res[i].DT);
								}
							}
						}
					}else if(selectChoiceNm4 == "성별") {
						count = "2";
						if(res[i].C1 == "1" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
						if(res[i].C1 == "2" && res[i].C2 == "0" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP018") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 == "00" && res[i].C2 != "0" && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "성별") {
						count = "2";
						if(res[i].C1 == "00" && res[i].C2 == "0" && res[i].C3 != "0" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C3_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "연령별") {
						count = "3";
						if(res[i].C1 != "00" && res[i].C2 == "0" && res[i].C3 == "0" && res[i].ITM_ID == "T06") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}else if(tblId == "DT_1RP032") {
				for(let i=0; i<res.length; i++) {
					if(selectChoiceNm4 == "총계") {
						count = "1";
						if(res[i].C1 != "0" && res[i].C2 == "0" && res[i].ITM_ID == "T03") {
							chartVal6.push([res[i].C1_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}else if(selectChoiceNm4 == "성별") {
						count = "2";
						if(res[i].C1 == "0" && res[i].C2 != "0" && res[i].ITM_ID == "T03") {
							chartVal6.push([res[i].C2_NM, Number(res[i].DT)]);
							totalValComma += Number(res[i].DT);
						}
					}
				}
				totalVal = totalValComma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				if(selectChoiceNm4 == "총계") {
					
				}
			}
			let dataLabelEnabled = '';
			/*if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				if(selectChoiceNm4 == "총계") {
					dataLabelEnabled = true;
				}else if(selectChoiceNm4 == "성별") {
					dataLabelEnabled = true;
				}else {
					dataLabelEnabled = false;
				}
			}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
				if(selectChoiceNm4 == "총계") {
					dataLabelEnabled = false;
				}else if(selectChoiceNm4 == "성별") {
					dataLabelEnabled = true;
				}else {
					dataLabelEnabled = false;
				}
			}*/
			if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
				if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
					dataLabelEnabled = true;
				}else if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별'){
					dataLabelEnabled = false;
				}
			}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				if(selectChoiceNm4 == '총계') {
					dataLabelEnabled = true;
				}else if(selectChoiceNm4 == '연령별'){
					dataLabelEnabled = false;
				}
			}else if(tblId == "DT_1RP016") {
				if(selectChoiceNm4 == '총계') {
					dataLabelEnabled = false;
				}else if(selectChoiceNm4 == '성별') {
					dataLabelEnabled = true;
				}
			}else if(tblId == "DT_1RP018") {
				if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '연령별') {
					dataLabelEnabled = false;
				}else if(selectChoiceNm4 == '성별') {
					dataLabelEnabled = true;
				}
			}else if(tblId == "DT_1RP032") {
				if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
					dataLabelEnabled = true;
				}
			}
			seriesyearData6.push({
				type: 'pie',
				//name: chartNm,
				innerSize: '80%',
				data: chartVal6,
				dataLabels: {
					enabled: dataLabelEnabled,
					format: '{point.percentage:.1f} %',//label의 포맷을 "데이터 명 : y"로 지정해서 사용.
					align: 'center',
					//세로 위치 지정
					style: {
						fontSize: '14px'
					}
				},
			});
			
			let legendWidth = '';
			let legendItemWidth = '';
			let legendItemMarginTop = '';
			let subTitleX = '';
			let subTitleY = '';
			let pieSize = '';
			let legendX = '';
			let legendY = '';
			let marginTop = '';
			let marginLeft = '';
			if(tblId == "DT_1RP009") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -20;
					legendY = -8;   
					legendItemMarginTop = 8;
					marginLeft= 20;
				}else if(selectChoiceNm4 == '연령별') {
					legendWidth = 420;
					legendItemWidth = 135;
					subTitleX = -198;
					subTitleY = 5;
					pieSize = '105%';
					legendX = 55;
					legendY = -8;
					legendItemMarginTop = 3;
				}
			}else if(tblId == "DT_1RP010") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -20;
					legendY = -8;   
					legendItemMarginTop = 8;
					marginLeft= 20;
				}else if(selectChoiceNm4 == '가입기간별') {
					legendWidth = 420;
					legendItemWidth = 135;
					subTitleX = -198;
					subTitleY = 5;
					pieSize = '105%';
					legendX = 55;
					legendY = -8;
					legendItemMarginTop = 8;
				}
			}else if(tblId == "DT_1RP011") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 120;
					legendItemWidth = '';
					subTitleX = -100;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -50;
					legendY = -8;
					legendItemMarginTop = 8;
					marginLeft = 0;
				}else if(selectChoiceNm4 == '성별') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -85;
					subTitleY = 0;
					pieSize = '70%';
					legendX = -20;
					legendY = -18;
					legendItemMarginTop = 8;
					marginTop = -15;
				}
			}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -76;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -20;
					legendY = -8;   
					legendItemMarginTop = 8;
					marginLeft= 20;
				}else if(selectChoiceNm4 == '연령별') {
					legendWidth = 420;
					legendItemWidth = 135;
					subTitleX = -198;
					subTitleY = 5;
					pieSize = '105%';
					legendX = 55;
					legendY = -8;
					legendItemMarginTop = 3;
				}
			}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 400;
					legendItemWidth = 120;
					subTitleX = -178;
					subTitleY = 10;
					pieSize = '105%';
					legendX = 75;
					legendY = 0;
					legendItemMarginTop = 8;
					marginTop =10;
				}else if(selectChoiceNm4 == '성별') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -85;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -20;
					legendY = -8;
					legendItemMarginTop = 8;
					marginLeft= 0;
				}else if(selectChoiceNm4 == '연령별') {
					legendWidth = 420;
					legendItemWidth = 135;
					subTitleX = -198;
					subTitleY = 10;
					pieSize = '105%';
					legendX = 55;
					legendY = 0;
					legendItemMarginTop = 3;
					marginTop =10;
				}
			}else if(tblId == "DT_1RP032") {
				if(selectChoiceNm4 == '총계') {
					legendWidth = 130;
					legendItemWidth = '';
					subTitleX = -93;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -25;
					legendY = -8;
					legendItemMarginTop = 8;
				}else if(selectChoiceNm4 == '성별') {
					legendWidth = 120;
					legendItemWidth = 250;
					subTitleX = -85;
					subTitleY = 5;
					pieSize = '77%';
					legendX = -20;
					legendY = -8;
					legendItemMarginTop = 8;
					marginLeft= 0;
					marginTop =-10;
				}
			}
			
			let subTitleNm1 = '';
			let subTitleFormat1 = '';
			if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
				subTitleNm1 = '전체 적립금액';
				subTitleFormat1 = '백만원';
			}else if(tblId == "DT_1RP014") {
				subTitleNm1 = '전체 이전금액';
				subTitleFormat1 = '백만원';
			}else if(tblId == "DT_1RP015") {
				subTitleNm1 = '전체 해지금액';
				subTitleFormat1 = '백만원';
			}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
				subTitleNm1 = '전체 중도인출금액';
				subTitleFormat1 = '백만원';
			}else if(tblId == "DT_1RP032") {
				subTitleNm1 = '전체 이전예외금액';
				subTitleFormat1 = '백만원';
			}
			var charts6 = "charts6"+count;
			charts6 = Highcharts.chart('chart6'+count, {
				chart : {
					renderTo: 'dounutChart',
					type: 'pie',
					marginTop: marginTop,
					marginLeft: marginLeft,
					style: {
						//fontFamily: 'Noto Sans KR',
					},
				},
				credits: {enabled: false}, //highchart 워터마크 숨김처리
				exporting : { enabled : false },
				title: {
					text: '',
				},
				subtitle: {
					text: subTitleNm1+'<br><span class="customSt2" style="font-size: 15px">'+totalVal+''+subTitleFormat1+'</span>',
					align: 'center',
					verticalAlign: 'middle',
					x: subTitleX,
					y: subTitleY,
					style: {
						color: '#00',
						fontSize: '14px',
						fontWeight:'bold',
						lineHeight: 22,
					}
				},
				events: {
					load: function () {
						let chart = this,
						legend = chart.legend;
						for (let i = 0, len = legend.allItems.length; i < len; i++) {
							(function (i) {
								let item = legend.allItems[i].legendItem;
								item.on('mouseover', function (e) {
									chart.tooltip.refresh([chart.series[0].points[i]]);
								}).on('mouseout', function (e) {
									//chart.options.tooltip.enabled = false;
									chart.render();
								});
							})(i);
						}
					}
				},
				legend: {
					enabled : true,
					width: legendWidth,
					verticalAlign: 'middle',
					align: 'right',
					itemMarginTop: legendItemMarginTop,
					itemWidth: legendItemWidth,
					x: legendX,
					y: legendY,
					itemStyle: {
						textOverflow: "width",
						fontSize :'12px',
						color: '#333333',
						textAlign:'center',
						fontWeight: '600',
						//fontFamily: 'Noto Sans KR',	
					},
					itemHoverStyle: {
						color: '#FF0000',
					},
					labelFormatter: function() {
						/*let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						for(let i=0; i<this.series.data.length; i++) {
							return this.name + '('+comma+'명)';
						}*/
						
						let comma = this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						for(let i=0; i<this.series.data.length; i++) {
							if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011") {
								if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
									return this.name + '(' + comma + '백만원)';
								}else if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별'){
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}
							}else if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
								if(selectChoiceNm4 == '총계') {
									return this.name + '(' + comma + '백만원)';
								}else if(selectChoiceNm4 == '연령별'){
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}
							}else if(tblId == "DT_1RP016") {
								if(selectChoiceNm4 == '총계') {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}else if(selectChoiceNm4 == '성별') {
									return this.name + '(' + comma + '백만원)';
								}
							}else if(tblId == "DT_1RP018") {
								if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '연령별') {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}else if(selectChoiceNm4 == '성별') {
									return this.name + '(' + comma + '백만원)';
								}
							}else if(tblId == "DT_1RP032") {
								if(selectChoiceNm4 == '총계' || selectChoiceNm4 == '성별') {
									return this.name + '(' + comma + '백만원)';
								}
							}
							/*if(selectChoiceNm4 == '연령별' || selectChoiceNm4 == '가입기간별') {
								return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
							}else if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
								if(selectChoiceNm4 == '총계') {
									return this.name + '(' + this.percentage.toFixed(1) + '%) ('+comma+'백만원)';
								}else {
									return this.name + '('+comma+'명)';;
								}
							}else {
								return this.name + '('+comma+'명)';;
							}*/
						}
					}
				},
				plotOptions: {
					pie: {//도넛(파이)차트 전체 옵션 지정.
						size: pieSize, 
						showInLegend: true, //범례 show/hide 설정. (series 내에서 개별 지정도 가능.)
						colors: colors,
						dataLabels : {
							enabled : true,
							distance : 0
						},
						point: {
							events: {
								legendItemClick: function () {
									return false;
								},
							}
						},
					},
					series: {
						events: {
							legendItemClick: function () {
								return false;
							}
						}
					}
				},
				tooltip: {
					useHTML: false,//툴팁 포맷을 html로 변경할 경우 true로 지정.(default false)
					borderRadius: 10,
					backgroundColor :'#000000', 
					borderWidth:0,
					shadow: false,
					padding:12,
					style: {			 
						fontSize :'14px',  
						color: '#fff',
						fontWeight: '600',
						textAlign:'center',
					},
					shared: true,
					formatter: function() {
						let thisY = this.y;
						let commaY = thisY.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						return this.point.name + '</br><span style="color:#EEFF2E">' + commaY + ' 백만원</span>';
					},
				},
				series: seriesyearData6
			});
			$('#chartBtn6').off('click');
			$('#chartBtn6').click(function(){
				for(var i = 0; i < $('.tabArea6 .chartbox').length; i++){
					if($('.tabArea6 .chartbox div').attr('id') == 'chart61'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart62'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart63'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart64'){charts6.exportChart();}
					if($('.tabArea6 .chartbox div').attr('id') == 'chart65'){charts6.exportChart();}
				}
			});
		},
	}
	$more2DashDetail.util = {
		/**
		 * @name : $more2DashDetail.util.searchBtn1
		 * @description : 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		searchBtn1 : function() {
			var tblIdData = $("#modalSearchTitle").val();
			var yearData = $("#modalSearchYear").val();
			console.log(tblIdData);
			console.log(yearData);
			$(".header-tag #headerSearchYear").val(yearData).prop("selected", true); //여기
			$more2DashDetail.ui.chartDatachange(tblIdData, yearData);
			//$more2DashDetail.ui.search(tblIdData, yearData);
		},
		/**
		 * @name : $more2DashDetail.util.headerSearchSelect
		 * @description : 헤더 year 셀렉트
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		headerSearchSelect : function() {
			var tblIdData = $("#modalSearchTitle").val();
			var yearData = $(".header-tag #headerSearchYear").val();
			console.log(tblIdData);
			console.log(yearData);
			$('#modalSearchYear').val(yearData).prop("selected", true);
			$more2DashDetail.ui.chartDatachange(tblIdData, yearData); //d
		},
		/**
		 * @name : $more2DashDetail.util.headerSearchSelect
		 * @description : Header 통계정보 조회 버튼 클릭
		 * @date : 2022.09.13
		 * @author : 조규환
		 * @history :
		 */
		/*headerSearchSelect : function() {
			var tblIdData = $("#modalSearchTitle2").val();
			var yearData = $(".header-tag #headerSearchYear").val();
			console.log(tblIdData);
			console.log(yearData);
			$('#modalSearchYear').val(yearData).prop("selected", true);
			$more2DashDetail.ui.search(tblIdData, yearData);
		},	*/
		/**
		 * @name : $more2DashDetail.util.comma
		 * @description : 천 단위 콤마
		 * @date : 2022.11.09
		 * @author : 조규환
		 * @history :
		 */	
		comma : function(val) {
			let returnVal = new Array;
			for(let i=0; i<val.length; i++) {
				returnVal.push(val[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
			}
			return returnVal;
		},
		/**
		 * @name : $more2DashDetail.util.split
		 * @description : 차트 데이터배열 n개씩 자르기
		 * @date : 2022.10.13
		 * @author : 조규환
		 * @history :
		 */	
		split : function(items, tblId) {
			let Arr = new Array;
			let count = new Array;
			/*for(let i=0; i<items.length / 2; i++) {
				for(let j=items.length / 2; j<items.length; j++) {
				}
			}*/
			if(tblId == "DT_1RP009" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				count = [0, 11, 1, 12, 2, 13, 3, 14, 4, 15, 5, 16, 6, 17, 7, 18, 8, 19, 9, 20, 10, 21];
			}else if(tblId == "DT_1RP010") {
				count = [0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5, 11];
			}else if(tblId == "DT_1RP012") {
				count = [0, 3, 6, 9, 12, 1, 4, 7, 10, 13, 2, 5, 8, 11, 14];
			}else if(tblId == "DT_1RP013") {
				count = [0, 3, 6, 9, 1, 4, 7, 10, 2, 5, 8, 11];
			}else if(tblId == "DT_1RP016") {
				count = [0, 6, 1, 7, 2, 8, 3, 9, 4, 10, 5, 11, 6, 12];
			}else if(tblId == "DT_1RP032") {
				count = [0, 2, 4, 6, 1, 3, 5, 7, 4, 11, 5, 12, 6, 13];
			}
			for(let i=0; i<count.length; i++) {
				Arr.push(items[count[i]]);
			}
			return Arr;
		},	
		/**
		 * @name : $more2DashDetail.util.division
		 * @description : 차트 데이터배열 n개씩 자르기
		 * @date : 2022.10.13
		 * @author : 조규환
		 * @history :
		 */
		division : function(data = [], size = 1) { //data = [], size = 1, data, number
			const items = [...data];
			const arr = [];

			while (items.length) {
				arr.push(items.splice(0, size));
			}

			return arr;
			/*const length = data.length;
			const divide = Math.floor(length / number) + (Math.floor( length % number ) > 0 ? 1 : 0); // 12/6 = 2 + 
			const newArray = [];

			for (let i = 0; i <= divide; i++) {
				// 배열 0부터 n개씩 잘라 새 배열에 넣기
				newArray.push(data.splice(0, number)); 
			}
			return newArray;*/
		},
		/**
		 * @name : $more2DashDetail.util.overlapRemove
		 * @description : 차트 데이터 중복제거
		 * @date : 2022.10.13
		 * @author : 조규환
		 * @history :
		 */
		overlapRemove : function(dataArr) {
			const set = new Set(dataArr);
			const newArr = [...set];
			return newArr;
		},
		/**
		 * @name : $more2DashDetail.util.selectChart
		 * @description : 차트 셀렉트창 생성
		 * @date : 2022.10.17
		 * @author : 조규환
		 * @history :
		 */
		selectChart : function(tblId, selectNm1, selectNm2, selectNm3, selectNm4, selectNm5, selectNm6) {
			console.log(tblId);
			console.log(selectNm1);
			console.log(selectNm2);
			console.log(selectNm3);
			console.log(selectNm4);
			console.log(selectNm5);
			console.log(selectNm6);
			let option1 = "";
			let option2 = "";
			let option3 = "";
			let option4 = "";
			let option5 = "";
			let option6 = "";
			if(selectNm1[0] == "계" || selectNm1[0] == "합계") {selectNm1.splice(0, 1, '총계');}
			if(selectNm2[0] == "계" || selectNm2[0] == "합계") {selectNm2.splice(0, 1, '총계');}
			if(selectNm3[0] == "계" || selectNm3[0] == "합계") {selectNm3.splice(0, 1, '총계');}
			if(selectNm4[0] == "계" || selectNm4[0] == "합계") {selectNm4.splice(0, 1, '총계');}
			if(selectNm5[0] == "계" || selectNm5[0] == "합계") {selectNm5.splice(0, 1, '총계');}
			if(selectNm6[0] == "계" || selectNm6[0] == "합계") {selectNm6.splice(0, 1, '총계');}
			for(let i=2; i<7; i++) {
				$('.select'+i).empty();
			}
			if(tblId == "DT_1RP101" || tblId == "DT_1RP102") {
				$(".select4").append("<select class='' id='selectChoice4'></select>");
				for(let i=0; i<selectNm1.length; i++) {
					option4 = "<option value='" +i+ "'>"+selectNm4[i]+"</option>";;
					$('#selectChoice4').append(option4);
				}
			}else if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				$(".select3").append("<select class='' id='selectChoice3'></select>");
				for(let i=0; i<selectNm3.length; i++) {
					option3 = "<option value='" +i+ "'>"+selectNm3[i]+"</option>";;
					$('#selectChoice3').append(option3);
				}
			}
			else if(tblId == "DT_1RP103" || tblId == "DT_1RP104" || tblId == "DT_1RP105" || tblId == "DT_1RP106" || tblId == "DT_1RP000" || tblId == "DT_1RP001" || tblId == "DT_1RP002" ||
					 tblId == "DT_1RP004" || tblId == "DT_1RP005" || tblId == "DT_1RP006" || tblId == "DT_1RP007" || tblId == "DT_1RP008" || tblId == "DT_1RP012" ||
					 tblId == "DT_1RP013") {
				
			}else if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP011" || tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP016" || tblId == "DT_1RP018" ||
					 tblId == "DT_1RP032") {
				$(".select2").append("<select class='' id='selectChoice2'></select>");
				$(".select5").append("<select class='' id='selectChoice4'></select>");
				$(".select6").append("<select class='' id='selectChoice6'></select>");
				for(let i=0; i<selectNm1.length; i++) {
					option2 = "<option value='" +i+ "'>"+selectNm2[i]+"</option>";;
					$('#selectChoice2').append(option2);
				}
				for(let i=0; i<selectNm4.length; i++) {
					option5 = "<option value='" +i+ "'>"+selectNm4[i]+"</option>";;
					option6 = "<option value='" +i+ "'>"+selectNm6[i]+"</option>";;
					$('#selectChoice4').append(option5);
					$('#selectChoice6').append(option6);
				}
				if(tblId == "DT_1RP018") {
					$(".select3").append("<select class='' id='selectChoice3'></select>");
					$(".select4").append("<select class='' id='selectChoice5'></select>");
					for(let i=0; i<selectNm3.length; i++) {
						option3 = "<option value='" +i+ "'>"+selectNm3[i]+"</option>";;
						$('#selectChoice3').append(option3);
						$('#selectChoice5').append(option3);
					}
				}
			}
			
			if(tblId == "DT_1RP018" || tblId == "DT_1RP032") {
				$("#selectChoice4").css("width", "65px");
				$("#selectChoice6").css("width", "53px");
			}else {
				$("#selectChoice4").css("width", "80px");
				$("#selectChoice6").css("width", "80px");
			}
		},
		/**
		 * @name : $more2DashDetail.util.horizontalScroll
		 * @description : 가로스크롤
		 * @date : 2022.11.08
		 * @author : 조규환
		 * @history :
		 */
		horizontalScroll : function(tblId) {
			//5번 6번 가로스크롤
			$(".tabArea5 .chartbox .highcharts-figure").css("height", "");
			if(tblId == "DT_1RP101" || tblId == "DT_1RP104" || tblId == "DT_1RP106") {
				$("#chart21").css("width", "2300px");
				$("#chart21").css("height", "210px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				if(tblId == "DT_1RP101") {
					$("#chart61").css("width", "600px");
					$("#chart61").css("height", "180px");
					$(".tabArea6 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				}
				if(tblId == "DT_1RP104" || tblId == "DT_1RP106") {
					$("#chart51").css("width", "440px");
					$("#chart51").css("height", "750px");
					$(".tabArea5 .chartbox .highcharts-figure").css("overflow-y", "scroll");
					$(".tabArea5 .chartbox .highcharts-figure").css("height", "450px");
				}
			}
			if(tblId == "DT_1RP101") {
				$("#chart41").css("width", "1500px");
				$("#chart41").css("height", "175px");
				$("#chart42").css("width", "1500px");
				$("#chart42").css("height", "175px");
				$("#chart43").css("width", "1500px");
				$("#chart43").css("height", "175px");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP102") {
				$("#chart21").css("width", "1200px");
				$("#chart21").css("height", "210px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP003" || tblId == "DT_1RP007") {
				$("#chart21").css("width", "1000px");
				$("#chart21").css("height", "210px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP001" || tblId == "DT_1RP006" || tblId == "DT_1RP008") {
				$("#chart21").css("width", "2000px");
				$("#chart21").css("height", "195px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP001" || tblId == "DT_1RP002" || tblId == "DT_1RP004") {
				$("#chart31").css("width", "2000px");
				$("#chart31").css("height", "170px");
				$("#chart5_1").css("width", "580px");
				$("#chart5_1").css("height", "165px");	
				$(".tabArea31 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea5_1 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP005") {
				$("#chart21").css("width", "2800px");
				$("#chart21").css("height", "195px");
				$(".tabArea2 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP104" || tblId == "DT_1RP106") {
				$("#chart41").css("width", "4000px");
				$("#chart41").css("height", "175px");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP009") {
				$("#chart31").css("width", "1800px");
				$("#chart31").css("height", "160px");
				$("#chart41").css("width", "1800px");
				$("#chart41").css("height", "160px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP009" || tblId == "DT_1RP010" || tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				$("#chart52").css("width", "580px");
				$("#chart52").css("height", "170px");
				$("#chart62").css("width", "590px");
				$("#chart62").css("height", "170px");
				$(".tabArea5 .tabBox:eq(1) .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea6 .tabBox:eq(1) .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			/*if(tblId == "DT_1RP011") {
				$("#chart51").css("width", "620px");
				$("#chart51").css("height", "180px");
				$(".tabArea5 .tabBox:eq(0) .chartbox .highcharts-figure").css("overflow-x", "auto");
			}*/
			if(tblId == "DT_1RP012" || tblId == "DT_1RP013") {
				$("#chart21").css("width", "1000px");
				$("#chart21").css("height", "200px");
				$(".tabArea2 .tabBox:eq(1) .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP014" || tblId == "DT_1RP015" || tblId == "DT_1RP018") {
				$("#chart31").css("width", "1800px");
				$("#chart31").css("height", "160px");
				$("#chart32").css("width", "1800px");
				$("#chart32").css("height", "160px");
				$("#chart33").css("width", "1800px");
				$("#chart33").css("height", "160px");
				$("#chart34").css("width", "1800px");
				$("#chart34").css("height", "160px");
				$("#chart35").css("width", "1800px");
				$("#chart35").css("height", "160px");
				$("#chart36").css("width", "1800px");
				$("#chart36").css("height", "160px");
				$("#chart41").css("width", "1800px");
				$("#chart41").css("height", "160px");
				$("#chart42").css("width", "1800px");
				$("#chart42").css("height", "160px");
				$("#chart43").css("width", "1800px");
				$("#chart43").css("height", "160px");
				$("#chart44").css("width", "1800px");
				$("#chart44").css("height", "160px");
				$("#chart45").css("width", "1800px");
				$("#chart45").css("height", "160px");
				$("#chart46").css("width", "1800px");
				$("#chart46").css("height", "160px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP016") {
				$("#chart31").css("width", "1200px");
				$("#chart31").css("height", "160px");
				$("#chart41").css("width", "1500px");
				$("#chart41").css("height", "160px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}
			if(tblId == "DT_1RP016" || tblId == "DT_1RP018") {
				$("#chart51").css("width", "540px");
				$("#chart51").css("height", "180px");
				$("#chart61").css("width", "540px");
				$("#chart61").css("height", "180px");
				$(".tabArea5 .tabBox:eq(0) .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea6 .tabBox:eq(0) .chartbox .highcharts-figure").css("overflow-x", "auto");
				if(tblId == "DT_1RP018") {
					$("#chart53").css("width", "580px");
					$("#chart53").css("height", "180px");
					$("#chart63").css("width", "590px");
					$("#chart63").css("height", "180px");
					$(".tabArea5 .tabBox:eq(2) .chartbox .highcharts-figure").css("overflow-x", "auto");
					$(".tabArea6 .tabBox:eq(2) .chartbox .highcharts-figure").css("overflow-x", "auto");
				}
			}
			/*if(tblId == "DT_1RP014" || tblId == "DT_1RP015") {
				$("#chart31").css("width", "1600px");
				$("#chart31").css("height", "175px");
				$("#chart41").css("width", "1600px");
				$("#chart41").css("height", "175px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
			}*/
			if(tblId == "DT_1RP018") {
				/*$("#chart31").css("width", "4500px");
				$("#chart31").css("height", "175px");
				$("#chart41").css("width", "4500px");
				$("#chart41").css("height", "175px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "auto");*/
			}
			if(tblId == "DT_1RP032") {
				$("#chart31").css("width", "915px");
				$("#chart31").css("height", "185px");
				$("#chart41").css("width", "915px");
				$("#chart41").css("height", "185px");
				$(".tabArea3 .tabBox .chartbox .highcharts-figure").css("overflow-x", "");
				$(".tabArea4 .tabBox .chartbox .highcharts-figure").css("overflow-x", "");
			}
		},
	}
}(window, document));
//통계 리스트 출력

var il2=0;
//상단 검색기능
function searchInput(){
	
}

//최근 검색어 삭제
function remove(n){
}

//최근 검색어 클릭시 검색
function searchClick(n){
	
}

//하단 통계정보 조회(연도)
function searchBtn1(){
	
}

var tblId = '';
//하단 통계정보 조회(연도)
function search(tblId, startPrdDe){
	
}
//차트 출력
function openApiSearch2(li){
	
}

function makeChartData(res) {
	
}
function makeChart(xAxis, seriesyearData2) {
	
}
function division(data, number) {
	
}
