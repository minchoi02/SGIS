<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/prjSetDetail.js"></script>
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});

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
		    // $(".default-pop-open").button().on("click", function () {
		    //   $("#dialog").dialog("open");
		    // });
		  });
   		$(document).ready(
 			function() {
 			 	var project_id = "${project_id}";
 			 	if (project_id != undefined && project_id != null) {
 			 		$prjSetDetail.request.doReqPrjSetDetailInfo(project_id);
 			 	}
 			 	
 				// mng_s 2019. 06. 04 j.h.Seok
 				//$log.srvLogWrite("Z0", "06", "04", "03", "", "post_no - " + postNo);
		});
    </script>
	<style>
	.tbs1 thead th {
    	height: 40px !important;
	}
	.tbs1 tbody td {
    	height: 35px !important;
	}
	</style>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">
<!-- @@block content -->
<div class="sub-title">
	<strong class="home">업무자동화</strong>
	<h2>프로젝트 설정</h2>
	<h3>업무 별 프로젝트 진행 순서를 확인하고 관리하실 수 있습니다.</h3>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs2">
						<div class="tb-tit">
							업무 정보
							<div class="tit-utils">
								<div class="btn-group line">
									<!-- <button type="button">복사</button> -->
									<button type="button" id="btnExecute">즉시실행</button>
									<button type="button" id="btnManual">단일실행</button>
									<button type="button" id="btnSave">저장</button>
									<button type="button" onclick="location.href='prjSet'">목록</button>
								</div>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 10%">
								<col style="width: 40%">
								<col style="width: 10%">
								<col style="width: 40%">
							</colgroup>
							<tbody>
								<tr>
									<th class="require">프로젝트 명</th>
									<td colspan="3">
										<span class="inputs"><input type="text" id="project_nm" placeholder="프로젝트명을 입력해주세요."></span>
									</td>
								</tr>
								<tr>
									<th>프로젝트<br>설명
									</th>
									<td colspan="3">
										<span class="textarea"><textarea name="project_desc" id="project_desc" rows="10" placeholder="설명을 입력해주세요."></textarea></span>
									</td>
								</tr>
								<tr>
									<th>분류 선택</th>
									<td colspan="3"><span class="select"> 
										<select name="cl_nm" id="cl_nm">
												<option value="">태그를 선택해주세요</option>
												<option value="사업체">사업체</option>
												<option value="센서스_수집">센서스-수집</option>
												<option value="센서스_가공">센서스-가공</option>
												<option value="센서스_분석">센서스_분석</option>
												<option value="통계주제도">통계주제도</option>
												<option value="생활업종">생활업종</option>
												<option value="살고싶은우리동네">살고싶은 우리동네</option>
												<option value="기술업종">기술업종</option>
												<option value="공공데이터">공공데이터</option>
												<option value="서비스">서비스(포털)</option>
												<option value="일자리">일자리</option>
												<option value="외부데이터">외부데이터</option>
												<option value="품질점검">품질점검</option>
												<option value="기타">기타</option>
											</select>
									</span></td>
								</tr>
								<tr>
									<th>파라미터<br>추가
									</th>
									<td colspan="3">
										<div class="mix-form">
											<div class="item">
												<span class="inputs inline"><input type="text" id="project_param1" placeholder="변수명(1)"></span> 
												<span class="inputs inline"><input type="text" id="project_param_val1" placeholder="기본값"></span>
											</div>
											<div class="item">
												<span class="inputs inline"><input type="text" id="project_param2" placeholder="변수명(2)"></span> 
												<span class="inputs inline"><input type="text" id="project_param_val2" placeholder="기본값"></span>
											</div>
											<div class="item">
												<span class="inputs inline"><input type="text" id="project_param3" placeholder="변수명(3)"></span> 
												<span class="inputs inline"><input type="text" id="project_param_val3" placeholder="기본값"></span>
											</div>
											<div class="item">
												<span class="inputs inline"><input type="text" id="project_param4" placeholder="변수명(4)"></span> 
												<span class="inputs inline"><input type="text" id="project_param_val4" placeholder="기본값"></span>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					
					<div class="tbs1">
						<div class="tb-tit">
							스케쥴 구성
						</div>
						<table id="prj_uni_schd_tbl">
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="btn-group line mt10">
						<button type="button" id="newSchdBtn">+ 스케쥴 등록/변경</button>
					</div>
					
<div id="dialogSchd" class="dialog" title="스케쥴 설정">
  <div class="dialog-inner" style="max-width:800px;">
    <div class="row">
      <div class="cols">
        <div class="col col-1">
          <div class="in-box">
            <div class="tbs2">
              <div class="tb-tit">
                스케쥴 설정
              </div>
              <table>
                <colgroup>
                  <col style="width:12%">
                  <col style="width:20%">
                  <col style="width:12%">
                  <col style="width:20%">
                  <col style="width:12%">
                  <col style="width:24%">
                </colgroup>
                <tbody>
                  <tr>
                    <th class="require">주기 종류</th>
                    <td>
                      <span class="select">
                        <select name="schdType" id="schdType">
                          <option value="매일">매일</option>
                          <option value="매월">매월</option>
                        </select>
                      </span>
                    </td>
                    <th>일</th>
                    <td>
                      <span class="select">
                        <select name="dd" id="dd">
                          <option value="일">없음</option>
                          <option value="01일">01일</option>
                          <option value="02일">02일</option>
                          <option value="03일">03일</option>
                          <option value="04일">04일</option>
                          <option value="05일">05일</option>
                          <option value="06일">06일</option>
                          <option value="07일">07일</option>
                          <option value="08일">08일</option>
                          <option value="09일">09일</option>
                          <option value="10일">10일</option>
                          <option value="11일">11일</option>
                          <option value="12일">12일</option>
                          <option value="13일">13일</option>
                          <option value="14일">14일</option>
                          <option value="15일">15일</option>
                          <option value="16일">16일</option>
                          <option value="17일">17일</option>
                          <option value="18일">18일</option>
                          <option value="19일">19일</option>
                          <option value="20일">20일</option>
                          <option value="21일">21일</option>
                          <option value="22일">22일</option>
                          <option value="23일">23일</option>
                          <option value="24일">24일</option>
                          <option value="25일">25일</option>
                          <option value="26일">26일</option>
                          <option value="27일">27일</option>
                          <option value="28일">28일</option>                          
                        </select>
                      </span>
                    </td>
                    <th class="require">시간</th>
                    <td>
                      <span class="inputs timepicker"><input type="text" id="hhmm" name="hhmm"></span>
                    </td>
                  </tr> 
                </tbody>
              </table>
              <p class="tb-tips">* 스케쥴을 사용하시면 지정한 시간에 업무가 실행됩니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="dialog-bts">
    <button id="btnSchdAdd" type="button" class="btn lager line angular w130">추가</button>
    <button id="btnSchdCancel" type="button" class="btn lager line angular w130">취소</button>
  </div>
</div>
          
					<div class="tbs1 mt10">
						<div class="tb-tit">
							프로젝트 흐름 구성 <span class="sub-tit">* 업무 추가 버튼을 클릭하시면 프로젝트
								흐름을 구성하실 수 있습니다</span>
						</div>
						<table id="prj_uni_lList_tbl">
							<tbody>
							</tbody>
						</table>
					</div>
					<div class="btn-group line mt10">
						<button type="button" id="newJobBtn">+ 업무 추가</button>
					</div>

					
				
<div id="dialog3" class="dialog" title="단위 업무 선택">
  <div class="dialog-inner" style="max-width:800px;">
    <div class="srch-form-pop">
		<div class="row">
		  <div class="cols">
		    <div class="col col-sm8">
		      <div class="in-box">
		        <span class="inputs"><input type="text" placeholder="검색어를 입력해주세요" id="searchText"></span>
		      </div>
		    </div>
		    <div class="col col-sm4">
		      <div class="in-box">
		        <button type="button" class="btn lager line angular" id="prjSetNewSearchBtn">검색</button>
		      </div>
		    </div>
		  </div>
		</div>
	    <div class="row">
	      <div class="cols">
	        <div class="col col-1">
	          <div class="in-box">
	            <div class="tbs1">
	              <table id="prjSetNewTable">
	                <tbody>
	                </tbody>
	              </table>
	            </div>
	            <div id="prjSetNewPage" class="pageArea"></div>
	          </div>
	        </div>
	      </div>
	    </div>
	</div>
  </div>
</div>
					
				</div>
			</div>
		</div>
	</div>
</div>
			</div></div><!-- subConentWrap end-->				



			<!-- footer -->
			<jsp:include page="/view/common/includeFooterNew"></jsp:include>			
				
</body>
</html>
