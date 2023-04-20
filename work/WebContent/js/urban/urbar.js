
(function(W,D){
	W.$urbar = W.$urbar || {};

	$(document).ready(function(){
		$urbar.event.setUIEvent();
	});

	//UI 내용작성
	$urbar.ui = {
			srtIdx : 0,
			currentPage : 1,
			maxCntPerPage : 10,
			prjSetUnitArr : [],
			testListdata : [],
			projectKey:0,
			btnChkBool:false,

			/**
			 *
			 * @name         : initView
			 * @description  : 화면을 초기화한다.
			 */
			initView : function() {
				this.srtIdx = 0;
				this.currentPage = 1;
				this.maxCntPerPage = 10;
			},

			/**
			 *
			 * @name         : setParams
			 * @description  : 파라미터를 설정한다.
			 * @param startIdx : 시작인덱스
			 */
			setParams : function(startIdx) {
				this.maxCntPerPage = 10
				var searchText = $.trim($("#searchText").val());
				var startDay = $.trim($("#startDay").val());
				var endDay = $.trim($("#endDay").val());
//				var searchType = $("#urbarSearchSelectBox option:selected").val();

				var options = {
					params : {
						startIdx : startIdx,
						resultCnt : this.maxCntPerPage
					}
				};

				if (searchText.length > 0) {
					options.params["searchText"] = searchText;
				}
				if (startDay.length > 0) {
					options.params["startDay"] = startDay;
				}
				if (endDay.length > 0) {
					options.params["endDay"] = endDay;
				}
				return options;
			},
			setDetailData : function(pRes){
				var dataList = pRes;
				console.log(pRes)
			},
			setBtnChk :function(bool){
				$urbar.ui.btnChkBool = bool;
				return bool;
			},

			prjSetDetailListViewPaging : function(totalCount, totalPage, pageSize, data, pageIndex,api_url,type) {
				$('#prjSetPage').paging({
					current : pageIndex,
					max : totalPage,
					itemClass : 'number',
					itemCurrent : 'current',
					format : '{0}',
					next :  '>',
					prev : '<',
					first : '<<',
					last : '>>',
					data : data,
					onclick : function(e,page){
						$urbar.ui.srtIdx = (page - 1) * pageSize;
						$urbar.ui.currentPage = page;
						if(type ===1 ){
							$urbar.request.doReqPrjSetNewList($urbar.ui.srtIdx,api_url,type);
						}else if(type ===2){
							$urbar.request.doReqPrjSetNewList($urbar.ui.srtIdx,api_url,type);
						}else if(type ===3){
							$urbar.request.doReqPrjSetNewList($urbar.ui.srtIdx,api_url,type);
						}

					}
				});
			},
			getTableHeader : function() {
				var html = "<colgroup>";
					html +='<col width="150px">';
					html +='<col width="100px">';
					html +='<col width="100px">';
					html +='<col width="500px">';
					html +='<col width="400px">';
					html +='<col width="">';
					html +='</colgroup>';
					html +=  "<thead><tr>";
					html +=  "<th>작업명</th>";
					html +=  "<th>구분</th>";
					html +=  "<th>집계일자</th>";
					html +=  "<th>생성년도</th>";
					html +=  "<th>비고</th>";
					html +=  "</tr></thead>";
				return info = {
						header : html
				};
			},


			/**
			 *
			 * @name         : setEmptyListTable
			 * @description  : 검색정보가 없을 경우 테이블을 설정한다.

			 */
			setEmptyListTable : function() {
				var info = this.getTableHeader();
				var html = info.header;
				$('#workSetTable').empty();
				html += "</tr><td colspan='5'>검색된 내용이 없습니다.</td></tr>";
				$("#workSetTable").append(html);
			},
			setprjSetDetailHeaderTable : function(data) {
				$(".searchTable tbody").empty();
				var strHtml ="";
				console.log(data.create_dt)
				for(var i=0; i<1; i++){
					strHtml +='<tr>';
					strHtml +='<th>작업명</th>';
					strHtml +='<td>'+data.project_nm+'</td>';
					strHtml +='<th>구분</th>';
					strHtml +='<td>'+data.urbar_type+'</td>';
					strHtml +='<th>집계일자</th>';
					strHtml +='<td class="left">'+data.create_dt+'</td>';
					strHtml +='</tr>'
				}

				$(".searchTable").append(strHtml);

			},
			reqApiSet : function(textVal){
				let api_url;
				if(textVal ==='경계획정' ){
					api_url = "/api/urban/getBndList.do";
					$urbar.request.doReqPrjSetNewList(0,api_url,1);
				}else if(textVal ==='도시/준도시명 관리'){
					api_url =  "/api/urban/getDnmtList.do";
					$urbar.request.doReqPrjSetNewList(0,api_url,2);
				}else if(textVal ==='시계열 관리'){
					api_url =  "/api/urban/getTimeSeriesList.do";
					$urbar.request.doReqPrjSetNewList(0,api_url,3);

				}
			},

			reqCreateApiSet : function(textVal){
				let api_url;
				if(textVal ==='경계획정' ){
					api_url ="/api/urban/createBnd.do";
				}else if(textVal ==='도시/준도시명 관리'){
					api_url =  "/api/urban/createDnmt.do";
				}else if(textVal ==='시계열 관리'){

				}
				return api_url;
			},

			reqDetailSet : function(textVal,key){
				let api_url;
				if(textVal ==='경계획정' ){
					document.formData.selectedId.value = key;
		           	document.formData.action = "/work/view/urban/demarcation/demarcationDetail";
		           	document.formData.submit();

				}else if(textVal ==='도시/준도시명 관리'){
					document.formData.selectedId.value = key;
		           	document.formData.action = "/work/view/urban/denomination/denominationDetail";
		           	document.formData.submit();
				}else if(textVal ==='시계열 관리'){
					document.formData.selectedId.value = key;
		           	document.formData.action = "/work/view/urban/timeSeries/timeSeriesDetail";
		           	document.formData.submit();
				}
			},

			setprjSetDetailTable : function(data) {
				let create_year =data.create_year
				let yearList =[]
				yearList.push(create_year.split(','));
				var strHtml ="";
				$("#workSetTable tbody").empty();
				for(var i=0; i<yearList[0].length; i++){
					strHtml +='<tr>';
					strHtml +='<td>'+yearList[0][i]+'</td>';
					strHtml +='<td><input type="file" name=""></td>';
					strHtml +='<td></td>';
					strHtml +='<td></td>';
					strHtml +='<td>';
					strHtml +='<button class="bgGray">실행</button>'
					strHtml +='<button class="cBlue">결과보기</button>'
					strHtml +='</tr>'
				}
				$("#workSetTable").append(strHtml);

			},
			setprjSetDetailResultTable : function(data) {
				console.log(data);
				var strHtml ="";
				$("#workDetailTable tbody").empty();
				$.each(data, function(index,item){
					strHtml +='<tr id="sIdx_0">';
					strHtml +='<td>'+item.urbar_id+'</td>';
					strHtml +='<td><input type="text" style="width:100%" value="'+item.urbar_nm+'"></td>';
					strHtml +='<td><button class="bgGray">수정</button></td>';
					strHtml +='</tr>'
				});
				$("#workDetailTable").append(strHtml);

			},

			/**
			 *
			 * @param data   : 데이터
			 * @param pageSize : 한페이지당 최대 갯수
			 * @param curPage :현재 페이지
			 * @param type : 타입
			 */
			setprjSetDetailListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();
				var strHtml =info.header;
				$.each(data,function(index,item){
					var no = (parseInt(curPage)*pageSize) + (index-pageSize);
					strHtml +='<tr>';
					strHtml +='<td>'+item.project_nm+'</td>';
					strHtml +='<td>'+item.urbar_type+'</td>';
					strHtml +='<td>'+item.create_dt+'</td>';
					strHtml +='<td>'+item.create_year+'</td>';
					strHtml +='<td>';
					strHtml +='<button class="bgGray" id="detailBtn" data-pr-key="'+item.project_key+'">세부작업</button>'
					strHtml +='<button class="bgGray" id="resultBtn">결과보기</button>'
					strHtml +='<button class="bgGray">내보내기</button>'
					strHtml +='<button class="bgCrimson" id="deleteBtn" data-pr-key="'+item.project_key+'">삭제</button>'
					strHtml +='</td>';
					strHtml +='</tr>'
				})
					$("#workSetTable").append(strHtml);

			},

			setUrbanInfoListTable : function(data, pageSize, curPage) {
				//테이블 생성
				var info = this.getTableHeader();
				var strHtml =info.header;
				$("#workSetTable").empty();
				$.each(data,function(index,item){
					var no = (parseInt(curPage)*pageSize) + (index-pageSize);
					strHtml +='<tr>';
					strHtml +='<td>'+item.project_nm+'</td>';
					strHtml +='<td>'+item.urbar_type+'</td>';
					strHtml +='<td>'+item.create_dt+'</td>';
					strHtml +='<td>'+item.create_year+'</td>';
					strHtml +='<td>';
					strHtml +='<button class="bgGray" id="detailBtn" data-pr-key="'+item.project_key+'">세부작업</button>'
					strHtml +='<button class="bgGray">내보내기</button>'
					strHtml +='</td>';
					strHtml +='</tr>'
				})
					$("#workSetTable").append(strHtml);

			},
			seturbarInfoDetailTable : function(data) {
				let dataSet =[];
				dataSet.push(data);
				console.log(dataSet)
				var strHtml ="";
				let year = dataSet[0].create_year.split(',');
				$("#workSetTable tbody").empty();
				$.each(dataSet,function(index,item){
					strHtml +='<tr>';
					strHtml +='<td>'+year[year.length -1]+'</td>';
					strHtml +='<td></td>';
					strHtml +='<td></td>';
					strHtml +='<td>';
					strHtml +='<button class="bgGray" id="detailBtn">실행</button>'
					strHtml +='<button class="cBlue" id="resultBtn">상세내역</button>'
					strHtml +='</td>';
					strHtml +='</tr>'
				})
				$("#workSetTable").append(strHtml);
				$('.searchTable td:eq(0)').empty();
				$('.searchTable td:eq(0)').append(dataSet[0].project_nm);
				$('.searchTable td:eq(1)').empty();
				$('.searchTable td:eq(1)').append(dataSet[0].urbar_type);
				$('.searchTable td:eq(2)').empty();
				$('.searchTable td:eq(2)').append(dataSet[0].create_dt);
			}

	};

	//AJAX 내용작성
	$urbar.request = {
			/**
			 *
			 * @param postNo : 게시물 번호
			 */
			doReqPrjSetDetailInfo : function(project_id,url,type) {
				$urbar.ui.project_id = project_id;
				console.log($urbar.ui.project_id)
				var options = {
					params : {
						project_id : project_id
					}
				};

				$ajax.requestApi(contextPath +url, options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							console.log(result)
							if(result){
								if(type === 1){
									$urbar.ui.setprjSetDetailTable(result);
									$urbar.ui.setprjSetDetailHeaderTable(result);
								}else{
									$urbar.ui.seturbarInfoDetailTable(result)
								}
							}
							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},
			setCreateWork : function(url){
				var param = new Object();
				var jobObj = new Object();
				jobObj.projectNm = $("input[type=text][name=projectNm]").val(); // 2
				jobObj.urbarType =$("input[type=radio][name=urbarType]").val(); // 2
				jobObj.createDt =$("input[type=date][name=createDt]").val(); // 2
				jobObj.createYear =$("input[type=text][name=createYear]").val(); // 2
				jobObj.useYn =$("input[type=hidden][name=useYn]").val(); // 2
				param.jsonStr = JSON.stringify(jobObj);
				console.log(param)
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + url, options,  function(res) {
					console.log(res)
					switch(parseInt(res.errCd)) {
						case 0:
							$('.newCreate').hide();
							location.reload();
							alert('등록되었습니다.');
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			setDetailWork : function(url){
				var param = new Object();
				var jobObj = new Object();
				jobObj.projectNm = $("input[type=text][name=projectNm]").val(); // 2
				jobObj.urbarType =$("input[type=radio][name=urbarType]").val(); // 2
				jobObj.createDt =$("input[type=date][name=createDt]").val(); // 2
				jobObj.createYear =$("input[type=text][name=createYear]").val(); // 2
				jobObj.useYn =$("input[type=hidden][name=useYn]").val(); // 2
				param.jsonStr = JSON.stringify(jobObj);
				console.log(param)
				var options = {
					isBeforSend : true,
					method : "POST",
					params : param
				};
				$ajax.requestApi(contextPath + url, options,  function(res) {
					console.log(res)
					switch(parseInt(res.errCd)) {
						case 0:
							$('.newCreate').hide();
							location.reload();
							alert('등록되었습니다.');
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},


			setDetailWorkResult : function(url,params){
				var options = {
					isBeforSend : true,
					method : "POST",
					params : params
				};
				$ajax.requestApi(contextPath + url, options,  function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							console.log(result);
							$urbar.ui.setprjSetDetailResultTable(result);
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			},
			doReqPrjSetDelete : function(project_id) {
				$urbar.ui.project_id = project_id;

				var options = {
					params : {
						project_id : project_id
					}
				};

				$ajax.requestApi(contextPath + "/api/urban/deleteBnd.do", options, function(res) {
					console.log(res)
					switch(parseInt(res.errCd)) {
						case 0:
							location.reload();

							break;
						default:
							$message.open("알림", res.errMsg);
							break;
					}
				});
			},

			/**
			 * 목록 조회
			 * @param startIdx : 시작 인덱스
			 */
			doReqPrjSetNewList : function(startIdx,api_url,type) {
				var options = $urbar.ui.setParams(startIdx);
				$ajax.requestApi(contextPath +api_url, options, function(res) {
					switch(parseInt(res.errCd)) {
						case 0:
							var result = res.result;
							if (result.length > 0) {
								$("#workSetTable").empty();
								var totalPage = Math.ceil( result[0].total / $urbar.ui.maxCntPerPage);
								if(type === 1){
									$urbar.ui.prjSetDetailListViewPaging(result[0].total, totalPage, $urbar.ui.maxCntPerPage, result, $urbar.ui.currentPage,api_url,type);
									$urbar.ui.setprjSetDetailListTable(result, $urbar.ui.maxCntPerPage, $urbar.ui.currentPage);
								}else if(type === 2){
									$urbar.ui.prjSetDetailListViewPaging(result[0].total, totalPage, $urbar.ui.maxCntPerPage, result, $urbar.ui.currentPage,api_url,type);
									$urbar.ui.setUrbanInfoListTable(result, $urbar.ui.maxCntPerPage, $urbar.ui.currentPage);
								}else if(type === 3){
									console.log(result)
									$urbar.ui.prjSetDetailListViewPaging(result[0].total, totalPage, $urbar.ui.maxCntPerPage, result, $urbar.ui.currentPage,api_url,type);
									$urbar.ui.setUrbanInfoListTable(result, $urbar.ui.maxCntPerPage, $urbar.ui.currentPage);
								}

							}else {
								alert('true')
								$urbar.ui.setEmptyListTable();
							}
							break;
						default:
							$messageNew.open("알림", res.errMsg);
							break;
					}
				});
			}
	};

	//EVENT 내용작성
	$urbar.event = {

			setUIEvent : function(){
				var body = $('body');
				var selMenu = $('.subMenu li');
				let title = $('.sub-title h2').text();
				$('.newCreate').hide();
				$('#btnSearch').on('click',function(){
					$urbar.ui.reqApiSet(title)
				})
				$('#btnReset').on('click',function(){
					var searchText = $.trim($("#searchText").val(''));
					var startDay = $.trim($("#startDay").val(''));
					var endDay = $.trim($("#endDay").val(''));
					$urbar.ui.reqApiSet(title)
				});


				//신규작업 이벤트
				$('#newCreateBtn').on('click',function(){
					var baseYear = ["2000","2005","2010","2015","2016","2017","2018","2019","2020"];
					 document.getElementById('addDt').value= new Date().toISOString().slice(0, 10);
					 $('.newCreate').show();
					$('#addYear').attr('value',baseYear);
				})
				$('.urbarMenu li').on('click',function(){
					$(this).addClass('active');
				})
				// 추가하기 이벤트
				$('.addBtn').on('click',function(){
					var selMenu = $('.subMenu li');
					var mode = 0;
					let apiUrl= $urbar.ui.reqCreateApiSet(title);
					$urbar.request.setCreateWork(apiUrl);
				});

				// 취소버튼 이벤트
				$('.cancelBtn').on('click',function(){
					$('.newCreate').css('display','none');
					$('.left').find('input').val("");
				});


				body.on('click','#detailBtn',function(){
					var prKey = $(this).attr('data-pr-key');
					$urbar.ui.reqDetailSet(title,prKey);
				})

				body.on('click','#deleteBtn',function(){
					var prKey = $(this).attr('data-pr-key');
					var result = confirm("해당 자료를 삭제 하시겠습니까?");
					if(result){
						$urbar.request.doReqPrjSetDelete(prKey);
					}else{
						return ;
					}

				})
				body.on('click','#bndListBtn',function(){
					location.href='/work/view/urban/demarcation';
				})
				body.on('click','#dnmtListBtn',function(){
					location.href='/work/view/urban/denomination';
				})
				body.on('click','#tsListBtn',function(){
					location.href='/work/view/urban/timeSeries';
				})
				body.on('click','#resultBtn',function(){
					var btnCheck =$urbar.ui.btnChkBool;
					if(btnCheck){
						$('.details').css("display","block");
						var param = new Object();
						var jobObj = new Object();
						var index = $(this).parent().parent().index();
						let typeText=$('.searchTable td:eq(1)').text();
						let url = '/api/urban/getNamingList.do'
						if(typeText ==='도시'){
							jobObj.urbarType ='01'
						}else {
							jobObj.urbarType ='02'
						}
						jobObj.baseYear = $(this).parent().parent().text().slice(0,4);
						
						param.jsonStr = JSON.stringify(jobObj);
						console.log(param)
						
						$urbar.request.setDetailWorkResult(url,param);
						
						 
						
					}else {
						alert('실행 버튼을 눌러주세요.');
						return ;
					}
				})

				body.on('click','#detailBtn',function(){
					$urbar.ui.setBtnChk(true);
				})

			}
	};

}(window,document));