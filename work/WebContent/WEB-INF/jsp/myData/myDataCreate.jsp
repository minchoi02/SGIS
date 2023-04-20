<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SGISwork</title>
<!-- <link rel="stylesheet" type="text/css" href="/css/body/body.css" /> -->
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/mypage/mypage.css" />

<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/includeHead.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/myData/myDataCreate.js"></script>

<!-- mng_s 2019. 06. 03 j.h.Seok -->
<script>
	$(document).ready(
		function() {
			$log.srvLogWrite("Z0", "03", "01", "01", "", "");
	});
</script>
<!-- mng_e 2019. 06. 03 j.h.Seok -->
</head>
<body>

	<style>
	.dataStepBox .stepList{margin:0 auto;margin-top:25px;position:relative;width:1150px;height:50px;overflow:hidden;}
	.dataStepBox .stepList li{position:relative;z-index:2;float:left;width:382px;height:48px;border-radius:24px;border-top-left-radius:0;border-bottom-left-radius:0;border:1px solid #d6d4d5;background:#f2f2f2;border-left:0;}
	.dataStepBox .stepList li:first-child{border-left:1px solid #d6d4d5;border-top-left-radius:24px;border-bottom-left-radius:24px;}
	.dataStepBox .stepList li.etc01{position:absolute;left:300px;width:500px;top:0;z-index:1;display:none;}
	.dataStepBox .stepList li.etc02{position:absolute;left:300px;width:500px;top:0;z-index:1;}
	.dataStepBox .stepList.step02 li.etc01{width:500px;left:200px;background:#3d62e8;display:block;}
	.dataStepBox .stepList.step02 li.etc02{width:500px;left:500px;}
	.dataStepBox .stepList.step03 li.etc01{width:500px;left:200px;background:#3d62e8;display:block;}
	.dataStepBox .stepList.step03 li.etc02{width:500px;left:500px;background:#3d62e8;}
	.dataStepBox .stepList li .t01{margin-top:7px;float:left;width:126px;height:33px;border-radius:17px;border:1px solid #d5d5d5;background:#fff;line-height:33px;text-align:center;font-size:12px;color:#3d62e8;margin-left:7px;}
	.dataStepBox .stepList li .t02{margin-top:7px;float:left;height:35px;line-height:35px;color:#000;font-weight:bold;font-size:18px;margin-left:20px;}
	.dataStepBox .stepList li .ico{margin-right:7px;margin-top:7px;float:right;width:35px;height:35px;overflow:hidden;background:url(../../img/common/bg_stepico.png);}
	.dataStepBox .stepList li.on{background:#3d62e8;}
	.dataStepBox .stepList li.on .t01{}
	.dataStepBox .stepList li.on .t02{color:#fff;}
	.dataStepBox .stepList li.on .ico{background:url(../../img/common/bg_stepico_on.png)}
	.dataStepBox ul {display: block !important;}
	.dataStepBox .stepList li:nth-child(0){z-index:10;}
	.dataStepBox .stepList li:nth-child(1){z-index:9;}
	.dataStepBox .stepList li:nth-child(2){z-index:8;}
	.dataStepBox .stepList li:nth-child(3){z-index:7;}
	.inpSelectorSelect {width : 400px; height : 30px; padding-left : 5px;}
	</style>
	<jsp:include page="/view/common/includeHeader"></jsp:include>
	<div class="wrap">
		<div class="subConentWrap">
			<div class="subTitleWrap">
				<div class="subTitle">
					<p class="home">지오코딩 ></p>
					<h1>지오코딩 실행</h1>
					<h2>POI 데이터를 생성하고 관리 할 수 있습니다.</h2>
				</div>
			</div>

			<!-- contents start  -->
			<form id="dataForm" method="POST" enctype="multipart/form-data">
			<div class="container" id="stepForm_1">

				<div class="wTableBox">
					<table class="wTable">
						<!--
						<tr>
							<th>신규</th>
							<td><input type="checkbox"  class="chkEtc" name="chk_new" id="chk_new" value="Y"/></td>
						</tr>
						  -->					
						<tr>
							<th>테이블명</th>
							<td>
								<select class="inpSelectorSelect" name="table_name" id="table_name">
									<option value="geocoding_addr_tbl" selected>지오코딩 - 단일필드</option>
									<option value="geocoding_buld_nobase_tbl">지오코딩 도로주소 - 지하 제외</option>
									<option value="geocoding_buld_nobase_sbd_tbl">지오코딩 도로주소  - 지하, 건물부명 제외</option>
									<option value="geocoding_buld_tbl">도로주소  - 지하, 건물부명 포함</option>
									<option value="geocoding_jibun_pcl_tbl">지오코딩 지번 - 본번/부번 결합(PCL)</option>
									<option value="geocoding_jibun_nori_pcl_tbl">지오코딩 지번 - 본번/부번 결합(PCL), 리없음</option>
									<option value="geocoding_jibun_tbl">지오코딩 지번 - 본번/부번 분리, 리존재</option>
									<option value="saupche_0">사업체 전처리 - 기초데이터</option>
								</select>
							</td>
						</tr>
						<!-- 
0						<tr>
							<th>첫줄을 헤더로 변경</th>
							<td><input type="checkbox" class="chkEtc" name="header" id="show_headerCheck01"/></td>
						</tr>	 -->
						<tr>
							<th>구분자</th>
							<td>
								<select class="inpSelector" name="delimiter" id="delimiter">
									<option value="|" selected>|</option>
									<option value=",">,</option>
									<option value=";">;</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>파일명</th>
							<td>
							<span id="show_output_file_name"></span>
							<span id="oneFileZone">
							<input type="file" name="oneFile" id="oneFile"> 
							</span>
							</td>
						</tr>										
					</table>
				</div>
				<div id="textPreView" style="display: none;" class="preViewDiv">
					<textarea class="textarea" rows="10" style="margin: 20px 32px 0px 32px; padding: 10px; width: 1130px; height: 130px;"></textarea>
				</div>
				<div class="btnBox">
					<a href="javascript:void(0)" class="prevButton" id="prevStep_1">이전</a>
					<a href="javascript:void(0)" class="nextButton" id="nextStep_1">데이터 업로드</a>
				</div>


			</div>


			</form>
		</div>
	
		<style>
			/* .partForm{
				text-align:center;
				margin:0 auto 20px auto;
				width:320;height:35px;padding:25px 0;
				border-top:1px solid #d5d5d5;
				border-bottom:1px solid #d5d5d5;
			} */
			
			.partForm > ul{
				width : 100%;
				height : auto;
			}
			.partForm > ul > li{
				width:50%;height:auto;float:left;
			}
			
			.partForm>ul>li>span{
				font-weight:bold;
				float:left;
				height:35px;
				line-height:35px;
				width:160px;
				text-align:center;
				font-size:15px;
				color:#333;
				}
				
			.modalInp{
				height:33px;
				width: calc( 40% );
				border:1px solid #e5e5e5;
				padding:0 10px;
				overflow:hidden;
				margin-right: 10px;
    			margin-left: 10px;
			}
			
			.fileBox>ul>li{
				margin-bottom:10px;
			}	
		</style>
		

		<!-- DataFormText -->
		

	</div>
	<!-- footer -->
	<jsp:include page="/view/common/includeFooter"></jsp:include>


</body>
</html>