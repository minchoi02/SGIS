
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 대시보드 > 중·장년층
	* File Name		: middlDash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<div class="row">
	<div class="col col-4" style="height: 640px;">
		<div class="panel" id="exportingMap">
			<div class="panel-header">
				<h5>지도</h5>
				<span class="tag tag-bg-1 tag_year">0000년</span>
				<span class="tag tag-bg-3 tag_title txt_over">불러오는 중</span>
				<button type="button" title="이미지 저장" class="btn-download btn-absol-right downloadBtn"></button>
			</div>
			<div class="panel-body Map totSurvMap" id="mapArea">
				<div class="mapContents" id="mapRgn_3" style="height: 588px;"></div><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			</div>
		</div>
	</div>

	<div class="col col-8 p-0 middlDash-panel">
		<div class="col col-6">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-1">
					<b>중<br />·<br />장<br />년<br />층<br />인<br />구
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart1,middlChart2" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart1,middlChart2" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-1 middlChart2_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart1"></div>
									<div class="col col-7" id="middlChart2"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col col-6">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-2">
					<b>경<br />제<br />활<br />동
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="middlChart3,middlChart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart3,middlChart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart3,middlChart4" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-2 middlChart4_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart3"></div>
									<div class="col col-7" id="middlChart4"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col col-8 mt-05 p-0 middlDash-panel">
		<div class="col col-6">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-3">
					<b>근<br />로<br />및<br />사<br />업<br />소<br />득
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="middlChart5,middlChart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart5,middlChart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart5,middlChart6" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-3 middlChart6_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart5"></div>
									<div class="col col-7" id="middlChart6"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col col-6">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-4">
					<b>금<br />융<br />권<br />대<br />출<br />잔<br />액
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="middlChart7,middlChart8" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart7,middlChart8" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart7,middlChart8" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-4 middlChart8_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart7"></div>
									<div class="col col-7" id="middlChart8"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col col-8 mt-05 p-0 middlDash-panel">
		<div class="col col-6">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-5">
					<b>주<br />택<br />소<br />유
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="middlChart9,middlChart10" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart9,middlChart10" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart9,middlChart10" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-5 middlChart10_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart9"></div>
									<div class="col col-7" id="middlChart10"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col col-6 ">
			<div class="panel panel-hori" style="height: 210px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
				<div class="panel-titles bg-type-6">
					<b>연<br />금<br />가<br />입
					</b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="middlChart11,middlChart12" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="middlChart11,middlChart12" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="middlChart11,middlChart12" onclick="javascript: return false;"></a>
									</div>
									<div class="card-title">
										<h4 class="icon-6 middlChart12_title"></h4>
									</div>
								</div>
								<div class="card-body">
									<div class="col col-5" id="middlChart11"></div>
									<div class="col col-7" id="middlChart12"></div>
								</div>
							</div>
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