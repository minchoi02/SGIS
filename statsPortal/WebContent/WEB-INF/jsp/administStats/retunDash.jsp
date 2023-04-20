
<%
	/**************************************************************************************************************************
	* Program Name	: 행정통계시각화 > 대시보드 > 귀농·귀어·귀촌
	* File Name		: retunDash.jsp
	* Comment		:
	* History		:
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<div class="row">
	<div class="col col-4" style="height: 616px;"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
		<div class="panel" id="exportingMap">
			<div class="panel-header">
				<h5>지도</h5>
				<span class="tag tag-bg-1 tag_year">0000년</span>
				<span class="tag tag-bg-3 tag_title txt_over">불러오는 중</span>
				<button type="button" title="이미지 저장" class="btn-download btn-absol-right downloadBtn"></button>
			</div>
			<div class="panel-body Map totSurvMap" id="mapArea">
				<div class="mapContents" id="mapRgn_3" style="height: 565px;"></div><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			</div>
		</div>
	</div>

	<div class="col col-8">
		<div class="panel panel-hori" style="height: 202px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			<div class="panel-titles bg-type-1">
				<b>가<br />구<br />현<br />황
				</b>
			</div>
			<div class="panel-body">
				<div class="row">
					<div class="col col-4">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 retunChart1_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart1" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart1" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart1" style="min-width: 325px !important"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 retunChart2_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart2" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart2" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart2" style="min-width: 325px !important;"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-1 retunChart3_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart3" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart3" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart3" style="min-width: 325px !important;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="panel panel-hori  mt-05" style="height: 202px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			<div class="panel-titles bg-type-3">

				<b>인<br />구<br />현<br />황
				</b>
			</div>
			<div class="panel-body border-color-3">
				<div class="row">
					<div class="col col-4">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 retunChart6_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="retunChart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart6" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart6" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart6"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 retunChart7_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="retunChart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart7" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart7" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart7"></div>
						</div>
					</div>
					<div class="col col-4 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-3 retunChart8_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-1" title="지표설명" data-chart-id="retunChart8" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart8" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart8" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart8"></div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="panel panel-hori mt-05" style="height: 202px"><!--  레이아웃변경으로인한 세로폭 수정 배천규  20221214  -->
			<div class="panel-titles bg-type-2">
				<b>주<br />요<br />특<br />성
				</b>
			</div>
			<div class="panel-body border-color-2">
				<div class="row">
					<div class="col col-6">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-2 retunChart4_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart4" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart4" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart4"></div>
						</div>
					</div>
					<div class="col col-6 bdl-1">
						<div class="card">
							<div class="card-header">
								<div class="card-title">
									<h4 class="icon-2 retunChart5_title"></h4>
								</div>

								<div class="util-group">
									<a href="#" class="btn-util-2" target="_blank" data-chart-id="retunChart5" onclick="javascript: return false;"></a>
									<a href="#" class="btn-util-4" title="이미지 저장" data-chart-id="retunChart5" onclick="javascript: return false;"></a>
								</div>
							</div>
							<div class="card-body" id="retunChart5"></div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
<!-- // row -->
<div class="row">
	<div class="col col-6" style="height: 197px">
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
	<div class="col col-6" style="height: 197px">
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

<div style="padding-top: 8px;">
	<p style="font-family: 'NanumSquare';font-size: 14px;font-weight: 700;">
		※ 수치가 공개되지 않는 통계자료(비밀보호(x)) 는 차트 상에서 0으로 표시됩니다. 실제 수치가 '0'인지 비공개인지 여부는 통계표에서 확인하실 수 있습니다.
	</p>
</div>