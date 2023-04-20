<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SGISwork</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/dataCreate/dataCreateMain.js"></script>
</head>
<body>
	<jsp:include page="/view/common/includeHeader"></jsp:include>

	<style>
.divLine {
	width: 90%;
	border: 1px solid black;
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: 5%;
	margin-right: 5%;
}

.divCenter {
	width: 90%;
	border: 1px solid black;
	margin-top: 20px;
	margin-bottom: 20px;
	margin-left: 5%;
	margin-right: 5%;
	min-height: 250px;
}

.cellBox {
	display: table;
	border-spacing: 10px;
	border: 1px solid black;
	width: 100px;
	margin-left: 10%;
	margin-right: 10%;
}

.dataBox {
	width: 200px;
	height: 140px;
	border: 1px solid black;
	padding: 60px;
	display: table-cell;
}

#myDataList {
	margin-top: 20px;
}

#myDataPage {
	margin-top: 20px;
	margin-bottom: 20px;
}

.hLineBox {
	width: 80%;
	border: 1px solid black;
	height: 30px;
	text-align: center;
	margin-left: 10%;
	margin-right: 10%;
}

#pageNavigation>li {
	float: left;
	margin-left: 10px;
	list-style: none;
}

.excelTable{border-top:2px solid #333333; width:100%; margin-top:5px; margin-bottom:25px; clear:both; }
.excelTable tr th{color:#4a4a4a; text-align:center; padding:5px 15px; background:#f8f8f8; border-right:1px solid #d0d0d0; border-left:1px solid #cacaca; border-bottom:1px solid #cacaca; font-size: 12px; height:35px; font-weight:bold;}
.excelTable tr td{ height:8px; padding:10px; border-bottom:1px solid #d0d0d0;  font-size: 12px; color:#4a4a4a;  text-align:center; border-left:1px solid #cacaca;}
.excelTable tr td.left{font-size:10.5px; color:#a2a2a2; letter-spacing:-1px; line-height:17px;}
.excelTable tr td:last-child{ border-right:1px solid #d0d0d0; }
.excelTable tr td.onb{background:#f3f3f3;}
.excelTable tr td img{display:in-line; vertical-align:middle; margin-left:5px; margin-right:10px;}
		
</style>
	<div class="divLine">
		<span> <a href="#" class="btn btn-info" role="button">데이터 업로드</a>
		</span> <span> <select id="cntSelectBox" style="width: 150px; height: 35px;">
				<option value="6" selected>6개 보기</option>
				<option value="10">10개 보기</option>
				<option value="50">50개 보기</option>
				<option value="100">100개 보기</option>
		</select>
		</span>
		
		<span>
			<select style="width:120px;">
				<option value="ALL">전체</option>
				<option value="myData">사용자 데이터</option>
				<option value="">전환된 위치 데이터</option>
				<option value="">데이터 분석 이력</option>
				<option value="">그룹에 공유한 나의 데이터</option>
				<option value="">관심 컨텐츠</option>
				<option value="">SGIS로 전송한 데이터</option>
			</select>
		</span>
		<span>
			<input type="text">
		</span>
		<span> 
			<a href="#" class="btn btn-info" role="button">검색</a>
		</span>
		
	</div>
	<div class="divCenter">
		<div id="myDataList" class="cellBox"></div>
		<div id="myDataPage" class="hLineBox"></div>
	</div>
	<div id="myDataDetailInfo" style="display:none;">
	
	</div>
	<form id="fileForm">
	<div class="divCenter" id="dataUploadStep_1">
		
			<div>Step 1.파일을 선택한 후 생성할 테이터의 이름과 설명을 작성합니다.</div>
			<div>업로드 할 파일의 형식을 선택해주세요</div>

			<!-- data Select Type -->
			<div>
				<label class="control-label control-label-fixed">* 데이터 유형</label>
				<div class="input-group">
					<label class="radio-inline"> <input type="radio" name="data_type" value="TEXT" checked="checked">TEXT(CSV)
					</label> <label class="radio-inline"> <input type="radio" name="data_type" value="EXCEL">엑셀
					</label> <label class="radio-inline"> <input type="radio" name="data_type" value="SHP">SHP
					</label>
				</div>

			</div>

			<div id="fileUpload_1">
				<div class="file-input-group input-group input-group-sm">
					<input class="form-control file_input_textbox" id="file_path" name="file_path" style="height: 34px;" placeholder="파일을 선택해주세요" disabled="disabled" /> <span class="input-group-btn"> <a class="fileUpload btn btn-primary btn-sm" style="height: 34px;">파일찾기 <input type="file" id="inputFile" name="oneFile" class="upload" accept=".txt, .csv" />
					</a>
					</span>
				</div>
				<div id="excel-guide" class="upLoadExplain">
					<span class="clr-red">※</span> 파일유형 xlsx 파일만 지원합니다.
				</div>
				<div id="txt-guide" class="upLoadExplain">
					<span class="clr-red">※</span> 파일유형 txt, csv 파일만 지원합니다.
				</div>
			</div>
			
			<br>
			
			<div id="fileUpload_2" style="display:none;"> 
				<div>쉐이프(SHP) 파일 업로드</div>
				<div class="file-input-group input-group input-group-sm">
					<input class="form-control file_input_textbox" id="file_path_1" name="file_path" style="height: 34px;" placeholder="파일을 선택해주세요" disabled="disabled" /> <span class="input-group-btn"> <a class="fileUpload btn btn-primary btn-sm" style="height: 34px;">파일찾기 <input type="file" id="mulitPartFileShp" name="multiPartFile" class="upload" accept=".shp" />
					</a>
					</span>
				</div>
				
				<div class="file-input-group input-group input-group-sm">
					<input class="form-control file_input_textbox" id="file_path_2" name="file_path" style="height: 34px;" placeholder="파일을 선택해주세요" disabled="disabled" /> <span class="input-group-btn"> <a class="fileUpload btn btn-primary btn-sm" style="height: 34px;">파일찾기 <input type="file" id="mulitPartFileDbf" name="multiPartFile" class="upload" accept=".dbf" />
					</a>
					</span>
				</div>
				
				<div class="file-input-group input-group input-group-sm">
					<input class="form-control file_input_textbox" id="file_path_3" name="file_path" style="height: 34px;" placeholder="파일을 선택해주세요" disabled="disabled" /> <span class="input-group-btn"> <a class="fileUpload btn btn-primary btn-sm" style="height: 34px;">파일찾기 <input type="file" id="mulitPartFileShx" name="multiPartFile" class="upload" accept=".shx" />
					</a>
					</span>
				</div>
				
				<div class="file-input-group input-group input-group-sm">
					<input class="form-control file_input_textbox" id="file_path_4" name="file_path" style="height: 34px;" placeholder="파일을 선택해주세요" disabled="disabled" /> <span class="input-group-btn"> <a class="fileUpload btn btn-primary btn-sm" style="height: 34px;">파일찾기 <input type="file" id="mulitPartFilePrj" name="multiPartFile" class="upload" accept=".prj" />
					</a>
					</span>
				</div>
				
				
				<div id="excel-guide" class="upLoadExplain">
					<span class="clr-red">※</span> 파일유형 shp, dbf, shx 파일만 지원합니다.
				</div>
				<div id="txt-guide" class="upLoadExplain">
					<span class="clr-red">※</span> SHP데이터는 .dbf, .shx, .shp 파일 3종을 모두 올려야 합니다.
				</div>
			</div>
			<br>

			<div id="cont-create">
				<div class="form-group">
					<label class="control-label control-label-fixed">* 테이블 이름</label>
					<div class="" style="padding-bottom: 0px;">
						<input type="text" class="form-control tbl-hidden" name="output_table_name" id="output_table_name" placeholder="테이블 이름을 입력해주세요"> <span class="clr-red">※</span> 테이블명은 영문 또는 영문 숫자의 혼합사용만 가능하며 첫 문자는 반드시 영문으로 시작되어야 합니다. <span class="help-block hidden"></span>
					</div>
				</div>

				<div class="form-group">
					<label class="control-label control-label-fixed">* 테이블 설명</label>
					<div class="">
						<input type="text" class="form-control tbl-hidden" name="description" id="description" placeholder="테이블 설명을 입력해주세요"> <span class="help-block hidden"></span>
					</div>
				</div>
			</div>

			<!-- <div id="encodingButtons">
				<span> <a href="#" class="btn btn-default" role="button">취소</a></span>
				<span> <a href="#" class="btn btn-info" role="button">인코딩</a></span>
			</div> -->
			
			<div id="encodingButtons">
				<span> <a href="#" class="btn btn-default" role="button">취소</a></span>
				<span> <a href="javascript:$dataCreateMain.ui.previewData();" class="btn btn-info" role="button">다음</a></span>
			</div>
			
		
	</div>


	<div class="divCenter" id="dataUploadStep_2" style="display:none;">
		<div>Step 2. 데이터가 정상적으로 출력될 수 있도록 인코딩을 설정해주세요.</div>

		<div>업로드한 데이터 미리 보기 
			<span> 
				<select id="encoding_type" name="encoding_type" style="width: 150px; height: 35px;">
					<option value="CP949" selected>CP949</option>
					<option value="UTF8">UTF8</option>
				</select>
			</span>
			구분자 <input type="text" name="delimiter" id="delimiter" style="width:50px;height: 35px;" value=","/>
			첫줄을 컬럼명으로 <input type="checkbox" name="headerCheck" id="headerCheck">
		</div>
		<div class="divLine" id="previewData" style="min-height: 200px;"></div>
		<a href="#" class="btn btn-info" role="button" id="createTable">테이블 생성</a>
	</div>
	</form>
	<div class="divCenter" id="dataUploadStep_3" style="display:none;">
		<div>Step 3. 원본 데이터의 주소 혹은 좌표를 포함한 컬럼의 형태를 선택 합니다.</div>
		<div class="divCenter">
			<a href="javascript:$dataCreateMain.ui.setGeoCodingType('addr');void(0);" class="btn btn-default" role="button" style="height:60px;">주소 <br>Ex)서울시 송파구 가락동</a>
			<a href="javascript:$dataCreateMain.ui.setGeoCodingType('xy');void(0);" class="btn btn-default" role="button" style="height:60px;">좌표(X,Y) <br>Ex)947632.44 ,45667.2</a>
			<a href="javascript:$dataCreateMain.ui.setGeoCodingType('geom');void(0);" class="btn btn-default" role="button" style="height:60px;">좌표(GEOM형)<br>Ex)UTM-K,TM서부</a>
			<a href="javascript:$dataCreateMain.ui.setGeoCodingType('admCode');void(0);" class="btn btn-default" role="button" style="height:60px;">행정경계코드형<br></a>
		</div>
		
		<div>
			<input type="radio" name="geoCodingType" id="geoCodingType_addr" value="addr"/>
			<input type="radio" name="geoCodingType" id="geoCodingType_xy" value="xy"/>
			<input type="radio" name="geoCodingType" id="geoCodingType_geom" value="geom"/>
			<input type="radio" name="geoCodingType" id="geoCodingType_admCode" value="admCode"/>
		</div>
	</div>
	
	<div class="divCenter" id="dataUploadStep_4" style="display:none;">
		<div>Step 4. 위치 좌표를 설정 합니다.</div>
		<div>생성될 위치데이터에 집계구 정보를 넣을지 선택합니다. <input type="checkbox"/>집계구 정보 포함</div>
		<div id="geoCodingSettingBar"></div>
		<div id="myDataGrid"></div>
		<div><span> <a href="#" class="btn btn-info" role="button" id="geoCodingButton">지오코딩 시작</a></span></div>
	</div>
	
	<div id="geoCodingResultTab">
	
	</div>
</body>
</html>