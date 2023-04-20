<%
/**************************************************************************************************************************
* Program Name  : 구인정보 상세   
* File Name     : vjJobInfoDetail.jsp
* Comment       : 
* History       : 
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.util.Map" %>
<%@ page import="java.text.DecimalFormat" %>
<%@ page import="java.math.BigDecimal" %>
<%@ page import="java.text.NumberFormat" %>
<script src="${pageContext.request.contextPath}/js/workRoad/viewJobs/vjJobInfoDetail.js"></script>
<style>
   	#vjJobInfoDetail {
   		height: 100%;
   	}
   	#vjJobInfoDetail .popBox {/* 팝업용도가 아닌 데이터보드에 끼워넣기하는 경우 처리될 사항 - 테두리제거, 사이즈 Full */
   	    left: 0px;
	    top: 0px;
	    margin-left: 0px;
	    width: 100%;
	    height: 100%;
	    border: 0;
    }
    #vjJobInfoDetail #vjChartContents { 
    	display: none;
    	margin-top: 15px; 
        text-align: right;
    }
    #vjJobInfoDetail .jab-data-table thead th:nth-of-type(4) { width: 0px; }
    
    #vjJobInfoDetail #vjLifeEnvInfo {
        font-family: 'Nanum Gothic';
	    font-size: 13px;
	    line-height: 22px;
	    box-sizing: border-box;
	    padding: 0 9px;
	    text-align: center;
	    letter-spacing: -1px;
	    color: #fff;
	    border: 1px solid #03a9f4;
	    border-radius: 2px;
	    background: #03a9f4;
	    cursor: pointer;
	}
</style>

<div class="workRoad" id="vjJobInfoDetail">
	<div class="popBox job-data-popup-view wrmScrollable">
		<!-- <div class="cont-box" id="vjTitle">
			<article>
	 			<h3>선택한 구인정보 상세보기<span class="enter-prise empha">강</span></h3>
	 		</article>
	 	</div>
	 	<div class="cont-box wrmScrollable" id="vjContents"> -->
	 	<div class="cont-box">
	 		<article>
	 			<h3>
	 				선택한 구인정보 상세보기
	 				<!-- <span class="enter-prise empha">강</span> -->
	 			</h3>
	 			<input type="hidden" id="vjLabrrCnt" value='<c:out value="${data.labrr_cnt}"/>'/>
	 			<input type="hidden" id="vjIndustClassCd" value='<c:out value="${data.indust_class}"/>'/>
	 			<div class="job-data view">
	 				<dl> 
	 					<dt>회사명</dt>
	 					<dd>
	 						<a href="#" id="vjJobInfoDetail_CorpNm"><span style="cursor:pointer;"><c:out value="${data.corp_nm}"/>&nbsp&nbsp</span> </a>
	 						<%-- <c:out value="${data.corp_nm}"/>&nbsp&nbsp --%>
	 						<c:choose>
	 							<c:when test="${data.jo_data_div == 'W'}">
									<img src = "/images/workRoad/logo_worknet.png" class="certi-img" style="cursor:pointer" id="vj_jo_data_key"/>
	 							</c:when>
	 							<c:when test="${data.jo_data_div == 'I'}">
									<img src = "/images/workRoad/logo_incruit.png" class="certi-img" style="cursor:pointer" id="vj_incruit_jo_data_key"/>
	 							</c:when>
	 							<c:when test="${data.jo_data_div == 'S'}">
									<img src = "/images/workRoad/logo_saramin.png" class="certi-img" style="cursor:pointer" id="vj_saramin_jo_data_key"/>
	 							</c:when>
	 							<c:otherwise>
	 							</c:otherwise>
	 						</c:choose>
	 						<!-- 2020.05.14[주형식] 일자리보기(내주변일자리) 사람인 정보 추가 (84~86 Line) END -->
	 					</dd>
	 				</dl>
	 				<dl>
	 					<dt>대표자명</dt>
	 					<dd>
	 						<c:set var="data_main_nm_check1" value="''" />
	 						<c:choose>
	 							<c:when test="${data.main_nm == null || data.main_nm == '' || data.main_nm == data_main_nm_check1 || data.main_nm == ' '}">
	 								-
	 							</c:when>
	 							<c:otherwise>
	 								<c:out value="${data.main_nm}"/>
	 							</c:otherwise>
	 						</c:choose>
	 					</dd>
	 					<dt>근로자수</dt>
	 					<dd>
	 						<c:choose>
	 							<c:when test="${data.labrr_cnt == null || data.labrr_cnt == '' || data.labrr_cnt == 0}">
	 								-
	 							</c:when>
	 							<c:otherwise>
	 								<fmt:formatNumber value="${data.labrr_cnt}" pattern="#,###" /> 명
	 							</c:otherwise>
	 						</c:choose>
	 					</dd>
	 				</dl>
	 				<dl> 
	 					<dt>자본금</dt>
	 					<dd>
	 						<c:choose>
	 							<c:when test="${data.cap == null || data.cap == '' || data.cap == 0}">
	 								-
	 							</c:when>
	 							<c:otherwise>
	 								<fmt:formatNumber value="${data.cap}" pattern="#,###" />
	 							</c:otherwise>
	 						</c:choose>
	 					</dd>
	 					<dt>연매출액</dt>
	 					<dd>
	 						<c:choose>
	 							<c:when test="${data.year_sales == null || data.year_sales == '' || data.year_sales == 0}">
	 								-
	 							</c:when>
	 							<c:otherwise>
	 								<fmt:formatNumber value="${data.year_sales}" pattern="#,###" />
	 							</c:otherwise>
	 						</c:choose>
	 					</dd>
	 				</dl>
	 				<dl> 
	 					<dt>업종</dt>
	 					<dd><c:out value="${data.indust_class_nm}"/></dd>
	 				</dl>
	 				<dl> 
	 					<dt>주요사업내용</dt>
	 					<dd>
	 						<c:set var="data_main_biz_content_check1" value="''" />
	 						<c:choose>
	 							<c:when test="${data.main_biz_content == null || data.main_biz_content == '' || data.main_biz_content == data_main_biz_content_check1 || data.main_biz_content == ' '}">
	 								-
	 							</c:when>
	 							<c:otherwise>
	 								<c:out value="${data.main_biz_content}"/>
	 							</c:otherwise>
	 						</c:choose>
	 					</dd>
	 				</dl>
	 				<dl> 
	 					<dt>회사주소</dt>
	 					<dd>
	 						<c:out value="${data.corp_addr}"/>
	 						<!-- <span class="point-label bg-box" >생활환경 종합</span> -->
	 					</dd>
	 				</dl>
	 				<dl> 
	 					<dt>홈페이지</dt>
	 					<dd>
	 						<c:set var="data_corp_hpage_check1" value="\"\"" />
	 						<c:set var="data_corp_hpage_check2" value="''" />
	 						<c:set var="data_corp_hpage_check3" value="' '" />
	 						<c:set var="data_corp_hpage_check4" value="http://" />
	 						<c:set var="data_corp_hpage_check5" value="https://" />
	 						<c:choose>
	 							<c:when test="${data.corp_hpage == null || data.corp_hpage == '' || data.corp_hpage == data_corp_hpage_check1 || data.corp_hpage == data_corp_hpage_check2 || data.corp_hpage == data_corp_hpage_check3}">
	 								-
	 							</c:when>
	 							<c:when test="${fn:indexOf(data.corp_hpage,data_corp_hpage_check4) < 0 && fn:indexOf(data.corp_hpage,data_corp_hpage_check5) < 0}">
	 								<a href="http://<c:out value="${data.corp_hpage}"/>" style="color: blue" target="_blank">
			 							<c:out value="${data.corp_hpage}"/>
			 						</a>
	 							</c:when>
	 							<c:otherwise>
	 								<a href="<c:out value="${data.corp_hpage}"/>" style="color: blue" target="_blank">
			 							<c:out value="${data.corp_hpage}"/>
			 						</a>
	 							</c:otherwise>
	 						</c:choose>
						</dd>
	 				</dl>
	 				<dl> 
	 					<dt>기업형태</dt>
	 					<dd><c:out value="${data.entrprs_type_nm}"/></dd>
	 				</dl>
	 			</div>
	 			<div class="jab-data-table">
	 				<table border="1" summary="채용정보 목록">
	 					<colgroup>
	 						<col class="subject">
	 						<col class="work">
	 						<col class="dday">
	 						<col class="statis-view">
	 					</colgroup>
	 					<thead>
	 						<tr>
	 							<th scope="col">모집내용</th>
	 							<th scope="col">근무조건</th>
	 							<th scope="col">등록일/마감일</th>
	 							<th scope="col"></th>
	 						</tr>
	 					</thead>
	 					<tbody>
	 						<tr>
	 							<td>
	 								<div class="subject"> 
	 									<span class="accent">
	 									<%-- <span class="point"><a href="#">상시</a></span> --%>
	 									<!-- 20200717 [주형식 ]lt gt <> 변환되도록 수정 START -->
	 									<a href="#" id="vjJobInfoList_RecruNm"><span style="cursor: pointer;"><c:out value="${data.recru_nm}" escapeXml="false"/></span> </a>
<%-- 	 									<a href="#" id="vjJobInfoList_RecruNm"><span style="cursor: pointer;"><c:out value="${data.recru_nm}" /></span> </a> --%>
	 									<%-- <a href="#" id="vjJobInfoList_RecruNm"><span style="cursor: initial;"><c:out value="${data.recru_nm}"/></span> </a> --%>
	 									<!-- 20200717 [주형식 ]lt gt <> 변환되도록 수정 END --> 
	 									</span>
	 									<p class="details">
	 										<em>
	 											<c:out value="${data.career_nm}"/>
	 											<span>|</span>
	 											<c:out value="${data.acdmcr_nm}"/>
	 										</em>
	 										<span class="area">근무지 : <c:out value="${data.work_addr}"/></span>
	 										<span class="sub" id="vjLifeEnvInfo" title="시군구 별로 생활환경정보를 지표화하여 균등하게 3등분 후 높음/보통/낮음 등의 상/중/하 정도로 표기됩니다.
※ 지표에 대한 자세한 정보는 ‘살고싶은 우리동네’ 서비스에서 확인 가능합니다.">생활환경 종합</span> 
	 									</p>
	 								</div>
	 							</td>
	 							<td>
	 								<div class="work">
	 									<c:set var="data_wage_type_class" value="" />
	 									<c:choose>
				 							<c:when test="${data.wage_type == 'H'}">
				 								<c:set var="data_wage_type_class" value="hourly-pay" />
				 							</c:when>
				 							<c:when test="${data.wage_type == 'D'}">
				 								<c:set var="data_wage_type_class" value="dayly-pay" />
				 							</c:when>
				 							<c:when test="${data.wage_type == 'M'}">
				 								<c:set var="data_wage_type_class" value="salary" />
				 							</c:when>
				 							<c:when test="${data.wage_type == 'Y'}">
				 								<c:set var="data_wage_type_class" value="annual-income" />
				 							</c:when>
				 						</c:choose>
	 									<span class="point-label <c:out value='${data_wage_type_class}'/>">
	 										<c:out value="${data.wage_type_nm}"/>
	 									</span>
	 									<p class="details">
	 										<em>
	 											<fmt:formatNumber value="${data.salary}" pattern="#,###" /> 원
	 										</em>
	 									</p>
	 									<%-- <p class="details"> <em><fmt:formatNumber value="${dat.salary}" pattern="#,###"/></em> </p> --%>
	 									<p class="details">
	 										<em>
	 											<c:out value="${data.work_type_nm}"/>
	 											<span>|</span>
	 											<c:out value="${data.emplym_type_nm}"/>
	 										</em>
	 										<%-- <span class="time"><c:out value="${data.work_time}"/></span> --%>
	 									</p>
	 								</div>
	 							</td>
	 							<td>
	 								<div class="dday">
	 									<p>
											<c:catch var="data_reg_dt_exception">
												<fmt:parseDate var="dateString" value="${data.reg_dt}" pattern="yyyyMMdd" />
												<fmt:formatDate value="${dateString}" pattern="yy/MM/dd" /> 등록
											</c:catch> 
											<c:if test="${data_reg_dt_exception != null}" >
												<c:out value="${data.reg_dt}"/>
											</c:if>
	 									</p>
	 								</div>
	 								<div class="mday">
	 									<p>
	 										<!-- 채용시까지 --> 
	 										<span>
	 											<c:catch var="data_clos_dt_exception">
													<fmt:parseDate var="dateString" value="${data.clos_dt}" pattern="yyyyMMdd" />
													<fmt:formatDate value="${dateString}" pattern="yy/MM/dd" /> 마감
												</c:catch> 
												<c:if test="${data_clos_dt_exception != null}" >
													<c:out value="${data.clos_dt}"/>
												</c:if>
	 										</span>
	 									</p>
	 								</div>
	 							</td>
								<td>
									<input type="hidden" id="jo_data_div" value="${data.jo_data_div}">
									<input type="hidden" id="jo_data_key" value="${data.jo_data_key}">
									<input type="hidden" id="sido_cd" value="${data.sido_cd}">
									<input type="hidden" id="sgg_cd" value="${data.sgg_cd}">
									<input type="hidden" id="emdong_cd" value="${data.emdong_cd}">
									<input type="hidden" id="sido_nm" value="${data.sido_nm}">
									<input type="hidden" id="sgg_nm" value="${data.sgg_nm}">
                                    <input type="hidden" id="emdong_nm" value="${data.emdong_nm}">
                                    <input type="hidden" id="corp_nm" value="${data.corp_nm}">
								</td>	 							
	 						</tr>
	 					</tbody>
	 				</table>
	 			</div>
	 			<div class="status-btns ">
	 				<a href="#" class="details" title="" id="vjChart1">종사자 규모별 소득 현황</a>
	 				<a href="#" class="details" title="" id="vjChart2">해당 업종 일자리 추이</a>
	 				<a href="#" class="details" title="" id="vjChart3">업종별 연령별 평균소득 현황</a>
	 				<a href="#" class="details" title="" id="vjChart4">업종별 연령별 중위소득 현황</a>
	 			</div>
	 		</article>
	 		<article>
		 		<div class="" id="vjChartContents">
		 			<div class="view-tab">
						<a href="javascript:void(0)" class="on">선택한 회사 상세 정보로 통계 보기</a>
					</div>
					<div class="job-offer-graph">
						<div class="charts" id="vjChart"></div>
					</div>
                    <div>
                        <span id="vjExplanation1"></span>
                        <span id="vjExplanation2"></span>
                        <span id="vjExplanation3"></span>
                        <span id="vjExplanation4"></span>
                    </div>
                    <div>
                    
                    	<!-- mng_s 20201030 이진호, 설명문구 추가 -->
                        <span id="vjSource99" style="float: left; margin-top: -10px; display: none;"></span><br>
                        <!-- mng_e 20201030 이진호 -->
                        
                        <span id="vjSource1"></span>
                    </div>
				</div>
	 		</article>
	 	</div>		 		 	
	 </div>
 </div>