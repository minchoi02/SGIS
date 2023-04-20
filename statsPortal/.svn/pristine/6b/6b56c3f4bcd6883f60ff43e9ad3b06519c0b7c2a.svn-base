
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 대시보드 > 주택소유
	* File Name		: houseDash.jsp
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

	<div class="col col-8 p-0">
		<div class="col col-8">
			<div class="panel panel-hori" style="height: 215px">
				<div class="panel-titles bg-type-1">
					<b>개<br />인<br />기<br />준<br /></b>
				</div>
				<div class="panel-body">
					<div class="row">
						<div class="col col-6">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-1 houseChart1_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart1" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart1" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart1" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart1"></div>
							</div>
						</div>
						<div class="col col-6 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-1 houseChart2_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart2" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart2" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart2" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart2"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col col-4">
			<div class="panel panel-hori" style="height: 215px">
				<div class="panel-titles bg-type-2">
					<b>가<br />구<br />기<br />준
					</b>
				</div>
				<div class="panel-body border-color-2">
					<div class="row">
						<div class="col col-12">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-2 houseChart3_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart3" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart3" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart3" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart3"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col col-8">
		<div class="panel panel-hori type-multi mt-05" style="height: 420px"><!--  배천규 수정  20221214  -->
			<div class="panel-titles bg-type-4">
				<div class="clear_ti">
					<b> 가<br />구<br />기<br />준<br /> <br /> 주<br />택<br />소<br />유<br />율
					</b>
				</div>
			</div>
			<div class="panel-body border-color-2">
				<div class="row">
					<div class="col col-12 bd-b">
						<div class="col col-6">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-3 houseChart4_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart4" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart4" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart4"></div>
							</div>
						</div>
						<div class="col col-6 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-3 houseChart5_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart5" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart5" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart5"></div>
							</div>
						</div>
					</div>
					<div class="col col-12">
						<div class="col col-6">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-3 houseChart6_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart6" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart6" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart6"></div>
							</div>
						</div>
						<div class="col col-6 bdl-1">
							<div class="card">
								<div class="card-header">
									<div class="card-title">
										<h4 class="icon-3 houseChart7_title"></h4>
									</div>

									<div class="util-group">
										<a href="#" class="btn-util-1" title="지표설명" data-chart-id="houseChart7" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-2" target="_blank" data-chart-id="houseChart7" onclick="javascript: return false;"></a>
										<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="houseChart7" onclick="javascript: return false;"></a>
									</div>
								</div>
								<div class="card-body" id="houseChart7"></div>
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