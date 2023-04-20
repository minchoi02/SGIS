<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 공유팝업창 -->
<div id="sharePopup" style="display:none;">
	<ul style="float: left;height: 30px;font-size: 15px;"><li>공유할 데이터의 설명을 작성하세요.</li></ul>
		<table>
			<tr>
				<td>
					<textarea id="popTextArea" class="popTextArea"></textarea>
				</td>
			</tr>
		</table>
		<div class="popBtnBox">
			<button type="button"  id="shareBtn">공유</button>
			<button type="button"  id="shareCancelBtn">취소</button>
		</div>
	</div>
</div>

<!-- 데이터 미리보기 팝업 -->
<div id="dataView" class="dataView" style="display:none;">
	<!-- <div id="dataViewTable" class="listTable02" style="display: inline-table;">
	</div> -->
	<table class="listTable01 t01" id="dataViewTable"></table> 
	<div class="pageArea" id="gridPaging" style="padding-bottom: 0px;margin-top: 20px;"></div>
	<div class="popBtnBox"  style="top:682px;right:0px;">
		<button type="button"  id="dataViewCancelBtn" >확인</button>
	</div>
</div>

<!-- 데이터 미리보기 팝업용 항목 -->
<table style="display:none;">
	<tr>
		<td>resource_id</td>
		<td><input type="text" id="resource_id" value="${resource_id}"></td>
	</tr>
	<tr>
		<td>prevPageNumber</td>
		<td><input type="text" id="prevPageNumber" value="${prevPageNumber}"></td>
	</tr>
	<tr>
		<td>prevViewCnt</td>
		<td><input type="text" id="prevViewCnt" value="${prevViewCnt}"></td>
	</tr>
	<tr>
		<td>prevSearchStandard</td>
		<td><input type="text" id="prevSearchStandard" value="${prevSearchStandard}"></td>
	</tr>
	<tr>
		<td>prevSerarchWord</td>
		<td><input type="text" id="prevSerarchWord" value="${prevSerarchWord}"></td>
	</tr>
	<tr>
		<td>resourceList</td>
		<td><textArea id="resourceList">${resourceList}</textArea></td>
	</tr>
	<tr>
		<td>resourceInfo</td>
		<td><textArea id="resourceInfo">${resourceInfo}</textArea></td>
	</tr>
	<tr>
		<td>columnDataType</td>
		<td><textArea id="columnDataType">${columnDataType}</textArea></td>
	</tr>
</table>

<!-- SGIS 전송 팝업 -->
<div id="sgisSendPopup" class="sgisSendPopup" style="display:none;">
	<!-- 전송신청 팝업 -->
	<div id="applyView" style="display:none;">
		<div  class="sgisSendPopupArea">
			<div class="pcont sgis">
				<table class="sgisSendTable">
					<colgroup>
						<col width="100"/>
						<col width=""/>
					</colgroup>
					<tr>
						<th>신청이름</th>
						<td><input type="text" id="open_data_nm" name="open_data_nm" class="downFormat"  maxlength="100" style="width:258px;"></td>
					</tr>
					<tr>
						<th>서비스명</th>
						<td>
							<select id="info_link_srv_nm" name="info_link_srv_nm" class="inp select10" >
								<option value="살고싶은 우리동네" data-srv="01">살고싶은 우리동네</option>
								<option value="정책통계지도"  data-srv="02">정책통계지도</option>
								<option value="지역현안 소통지도" data-srv="03">지역현안 소통지도</option>
							</select>
						</td>
					</tr>
					<tr id="info_link_srv_realm_area">
						<th>분야</th>
						<td>
							<select id="info_link_srv_realm" name="info_link_srv_realm" class="inp select10" >
								<option value="자연">자연</option>
								<option value="주택">주택</option>
								<option value="지역인구">지역인구</option>
								<option value="안전">안전</option>
								<option value="생활편의교통">생활편의교통</option>
								<option value="교육">교육</option>
								<option value="복지문화">복지문화</option>
							</select>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
	<div id="checkView" style="display:none;">
		<div  class="sgisSendPopupArea">
			<div class="pcont sgis">
				<p class="t01" id="sendTitle">SGIS+로 전송 신청이 접수 되었습니다.</p>
				<ul id="sendStatus" class="pstatusList sts02">
					<li class="al">전송신청</li>
					<li class="ac">검토중</li>
					<li class="ar">전송완료</li>
				</ul>
			</div>
		</div>
	</div>
	
	
	
	<div class="sgisSendPopup pBtnBox">
		<button type="button"  id="applyBtn"  class="pSgisBtn" style="display:none;">신청</button>
		<button type="button"  id="sendCancelBtn" class="pSgisBtn" style="display:none;">전송취소</button>
		<button type="button"  id="retrySendBtn" class="pSgisBtn" style="display:none;">재전송</button>
		<button type="button"  id="cancelBtn">취소</button>
	</div>
	
</div>


<!-- 디운로드 팝업창 -->
<div id="downloadPopup" style="display:none;">
	<div id="fileDownloadArea" >
		<div><p id='fileCnt'><p></div>
		<div  class="downloadPopupArea">
			<div class="pcont sgis">
				<table class="fileDownloadTable">
					<colgroup>
						<col width="400"/>
						<col width=""/>
					</colgroup>
				</table>
			</div>
			<div class="popBtnBox">
				<button type="button"  id="downloadBtn">다운로드</button>
				<button type="button"  id="downloadCancelBtn">취소</button>
			</div>
		</div>
	</div>
</div>

<!-- 지도보기 팝업창 -->
<div id="mapPopup" style="display:none;">
	<div id="commonMap" style="height:550px;"></div>
	<div class="popBtnBox">
		<button type="button"  id="mapCancelBtn">확인</button>
	</div>
</div>
