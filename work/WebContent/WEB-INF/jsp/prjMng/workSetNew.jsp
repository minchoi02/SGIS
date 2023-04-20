<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>SGISwork</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHeadNew.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/commonDataFunc.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/codemirror.js"></script>
	<script src="${pageContext.request.contextPath}/js/codeMirror/sql.js"></script>
	<script src="${pageContext.request.contextPath}/js/work/workSetNew.js"></script>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/js/codeMirror/codemirror.css" />
	<style>
	.CodeMirror {
		border-top: 1px solid black;
		border-bottom: 1px solid black;
	}
	</style>
	
	<!-- mng_s 2019. 06. 04 j.h.Seok -->
	<script>
		$(document).ready(
			function() {
				//$log.srvLogWrite("Z0", "05", "01", "00", "", "");
		});
		
	</script>
	<!-- mng_e 2019. 06. 04 j.h.Seok -->
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	
  <div class="container">
    <div class="content_new">
<!-- @@block content -->
<div class="sub-title">
	<strong class="home">업무자동화</strong>
	<h2>데이터 자동화 설정</h2>
	<h3>데이터 별 업무 진행 순서를 확인하고 관리하실 수 있습니다.</h3>
</div>
<div class="view-container">
	<div class="row">
		<div class="cols">
			<div class="col col-1">
				<div class="in-box">
					<div class="tbs2">
						<div class="tb-tit">
							업무 정보 <span style="font-size:11px !important">(* : 필수입력)</span>
							<div class="tit-utils">
								<div class="btn-group line">
									<button id="btnSave" type="button">저장</button>
									<button id="btnList" type="button" onclick="location.href='workSet'">목록</button>
								</div>
							</div>
						</div>
						<table>
							<colgroup>
								<col style="width: 10%">
								<col style="width: 20%">
								<col style="width: 30%">
								<col style="width: 40%">
							</colgroup>
							<tbody>
								<tr>
									<th class="require">단계 선택</th>
									<td colspan="3">
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step1" value="db"><label for="job_step1">가공</label></span>
										<!-- <span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step2" value="vr"><label for="job_step2">검증</label></span>--> 
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step3" value="ge"><label for="job_step3">위치정보부여</label></span>
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step2" value="cv"><label for="job_step2">좌표계변환</label></span> 
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step4" value="mv"><label for="job_step4">전송</label></span> 
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step5" value="cl"><label for="job_step5">수집</label></span>
										<span class="radios"><input type="radio" class="jobsel" name="job_step" id="job_step6" value="sh"><label for="job_step6">쉘 실행</label></span> 
									</td>
								</tr>
								<tr>
									<th class="require">업무 명</th>
									<td colspan="3">
										<span class="inputs"><input type="text" id="job_nm" placeholder="업무명을 입력해주세요."></span>
									</td>
								</tr>
								<tr>
									<th class="require">분류</th>
									<td colspan="3">
										<span class="select">
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
										</span>
									</td>
								</tr>
								<tr class="dbmovjob">
									<th class="require">데이터 유형</th>
									<td colspan="3">
										<span class="radios"><input type="radio" name="storage_div_nm" id="storage_div_nm1" value="pg"><label for="storage_div_nm1">포스트그레스</label></span> 
										<!--<span class="radios"><input type="radio" name="storage_div_nm" id="storage_div_nm2" value="hive"><label for="storage_div_nm2">하이브</label></span>-->
										<span class="radios"><input type="radio" name="storage_div_nm" id="storage_div_nm3" value="kairos"><label for="storage_div_nm3">카이로스</label></span> 
									</td>
								</tr>
								<tr class="collectjob">
									<th class="require">수집 유형</th>
									<td colspan="3">
										<span class="radios"><input type="radio" name="col_cd" id="col_cd1" value="worknet"><label for="col_cd1">워크넷</label></span> 
										<span class="radios"><input type="radio" name="col_cd" id="col_cd2" value="incruit"><label for="col_cd2">인크루트</label></span>
										<span class="radios"><input type="radio" name="col_cd" id="col_cd3" value="saramin"><label for="col_cd3">사람인</label></span> 
									</td>
								</tr>
								<tr class="geojob">
									<th class="require">지오코딩</th>
									<td colspan="3">
										<span class="radios"><input type="radio" name="geo_method" id="geo_method1" value="sop"><label for="geo_method1">SOP지오코딩</label></span> 
										<span class="radios"><input type="radio" name="geo_method" id="geo_method2" value="daum"><label for="geo_method2">다음지오코딩</label></span>
										<span class="radios"><input type="radio" name="geo_method" id="geo_method3" value="sopdaum"><label for="geo_method3">SOP다음지오코딩</label></span>
									</td>
								</tr>
								<tr class="geojob">
									<th class="require">복합주소 선택</th>
									<td colspan="3">
										<span class="radios"><input type="radio" name="geo_depth" class="geo_depth" id="geo_depth1" value="단일필드"><label for="geo_depth1">단일필드</label></span> 
										<span class="radios"><input type="radio" name="geo_depth" class="geo_depth" id="geo_depth2" value="도로주소"><label for="geo_depth2">도로주소</label></span>
										<span class="radios"><input type="radio" name="geo_depth" class="geo_depth" id="geo_depth3" value="지번주소"><label for="geo_depth3">지번주소</label></span>
									</td>
								</tr>
								<tr class="dbgeomovjob coordconv">
									<th class="require">대상 테이블</th>
									<td>
										<span class="inputs"><input type="text" id="schema_nm" placeholder="스키마명"></span>
									</td>
									<td>
										<span class="inputs"><input type="text" id="tbl_nm" placeholder="테이블명"></span>
									</td>
									<td></td>
								</tr>
								<tr class="geomovjob">
									<th class="require">타깃 테이블</th>
									<td>
										<span class="inputs tgt_schema_nm"><input type="text" id="tgt_schema_nm" placeholder="스키마명"></span>
									</td>
									<td>
										<span class="inputs"><input type="text" id="tgt_tbl_nm" placeholder="테이블명"></span>
									</td>
									<td></td>
								</tr>
								<tr class="movjob">
									<th class="require">타깃 테이블</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="mv_tgt_tbl_nm" placeholder="테이블명"></span>
									</td>
									<td></td>
								</tr>
								<tr class="geojob">
									<th class="require">키 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_key_fld" placeholder="키 필드"></span>
									</td>
									<td></td>
								</tr>
								<tr class="geojob geodepth1">
									<th class="require">지오코딩 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld" placeholder="지오코딩 필드"></span>
									</td>
									<td></td>
								</tr>
								<tr class="geojob geodepth23">
									<th class="require">시도 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_sido" placeholder="시도 필드"></span>
									</td>
									<td></td>
								</tr>
								<tr class="geojob geodepth23">
									<th class="require">시군구 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_sgg" placeholder="시군구 필드"></span>
									</td>
									<td></td>
								</tr>	
								<tr class="geojob geodepth3">
									<th class="require">읍면동 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_emd" placeholder="읍면동 필드"></span>
									</td>
									<td></td>
								</tr>	
								<tr class="geojob geodepth3">
									<th>리 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_ri" placeholder="리 필드"></span>
									</td>
									<td></td>
								</tr>	
								<tr class="geojob geodepth2">
									<th class="require">도로 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_road" placeholder="도로 필드"></span>
									</td>
									<td></td>
								</tr>	
								<tr class="geojob geodepth23">
									<th class="require">본번 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_mn" placeholder="본번 필드"></span>
									</td>
									<td></td>
								</tr>			
								<tr class="geojob geodepth23">
									<th>부번 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_sn" placeholder="부번 필드"></span>
									</td>
									<td></td>
								</tr>			
								<tr class="geojob geodepth23">
									<th>지하 여부</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_base" placeholder="지하 여부"></span>
									</td>
									<td></td>
								</tr>	
								<tr class="geojob geodepth2">
									<th>건물명 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_bd" placeholder="건물명 필드"></span>
									</td>
									<td></td>
								</tr>										
								<tr class="geojob geodepth2">
									<th>건물부명 필드</th>
									<td colspan="2">
										<span class="inputs"><input type="text" id="geo_fld_bd_sub" placeholder="건물부명 필드"></span>
									</td>
									<td></td>
								</tr>
								<tr class="coordconv">
									<th class="require">X / Y 필드</th>
									<td>
										<span class="inputs"><input type="text" id="x_fld" placeholder="X 필드"></span>
									</td>
									<td>
										<span class="inputs"><input type="text" id="y_fld" placeholder="Y 필드"></span>
									</td>
									<td>
										<span class="select">
											<select name="coord_type" id="coord_type">
												<option value="">현재 좌표를 선택해주세요</option>
												<option value="5180">TM서부  (5180)</option>
												<option value="5181">TM중부  (5181)</option>
												<option value="5183">TM동부  (5183)</option>
												<option value="5184">TM동해  (5184)</option>
												<option value="5185">TM서부  (5185)</option>
												<option value="5186">TM중부  (5186)</option>
												<option value="4326">WGS84 (4326)</option>
												<option value="4166">WGS84 (4166)</option>
												<option value="5178">KATEC (5178)</option>
											</select>
										</span>
									</td>
								</tr>
								<tr class="shelljob">
									<th class="require">쉘 명령어</th>
									<td colspan="3">
										<span class="inputs"><input type="text" id="shell_cmd" placeholder="쉘 명령어"></span>
									</td>
								</tr>
								<tr class="dbjob">
									<th class="require">쿼리</th>
									<td colspan="3">
										<span class="textarea">
										<textarea id="qry_txt" name="qry_txt" rows="50" cols="100"></textarea>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
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
