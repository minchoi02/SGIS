
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 대시보드 > 신혼부부
	* File Name		: newlyDash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<div class="row">
	<div class="col col-4" style="height: 640px;"><!--  배천규 수정  20221214  -->
		<div class="panel" id="exportingMap">
			<div class="panel-header">
				<h5>지도</h5>
				<span class="tag tag-bg-1 tag_year">0000년</span>
				<span class="tag tag-bg-3 tag_title txt_over">불러오는 중</span>
				<button type="button" title="이미지 저장" class="btn-download btn-absol-right downloadBtn"></button>
			</div>
			<div class="panel-body Map totSurvMap" id="mapArea">
				<div class="mapContents" id="mapRgn_3" style="height: 588px;"></div><!--  배천규 수정  20221214  -->
			</div>
		</div>
	</div>

	<div class="col col-8">
		<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			<div class="panel-titles bg-type-1">
				<b>주<br />요<br />특<br />징
				</b>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col col-4">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 newlyChart1_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart1" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart1" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart1" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart1"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 newlyChart2_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart2" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart2" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart2" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart2"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 newlyChart3_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart3" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart3"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel panel-hori mt-05" style="height: 210px"><!--  배천규 수정  20221214  -->
			<div class="panel-titles bg-type-2">
				<b> 주<br />택<br />상<br />황
				</b>
			</div>
			<div class="panel-body border-color-2">
				<div class="row">
					<div class="col col-6">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-2 newlyChart4_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart4" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart4" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart4" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart4"></div>
						</div>
					</div>
					<div class="col col-6 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-2 newlyChart5_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart5" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart5" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart5" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart5"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="panel panel-hori  mt-05" style="height: 210px"><!--  배천규 수정  20221214  -->
			<div class="panel-titles bg-type-3">
				<b>경<br />제<br />상<br />황
				</b>
			</div>
			<div class="panel-body border-color-3">
				<div class="row">
					<div class="col col-6">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 newlyChart6_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart6" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart6"></div>
						</div>
					</div>
					<div class="col col-6 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 newlyChart7_title"></h4>
								</div>
								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="newlyChart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="newlyChart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="newlyChart7" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="newlyChart7"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- // row -->
<div class="row">
	<div class="col col-6" style="height: 197px; width: 60%;">
		<div class="panel panel-ay">
			<div class="card">
				<div class="card-header">
					<div class="card-title">
						<h4 class="regnChart_title"></h4>
					</div>
					<div class="util-group">
						<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="regnChart" onclick="javascript: return false;"></a>
					</div>
				</div>
				<div class="card-body" id="regnChart"></div>
			</div>
		</div>
	</div>
	<div class="col col-6" style="height: 197px; width: 40%;">
		<div class="panel panel-ay">
			<div class="card">
				<div class="card-header">
					<div class="card-title">
						<h4 class="tmsrChart_title"></h4>
					</div>
					<div class="util-group">
						<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="tmsrChart" onclick="javascript: return false;"></a>
					</div>
				</div>
				<div class="card-body" id="tmsrChart"></div>
			</div>
		</div>
	</div>
</div>