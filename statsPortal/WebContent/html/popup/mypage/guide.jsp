<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<META http-equiv="Expires" content="-1">
	<META http-equiv="Pragma" content="no-cache">
	<META http-equiv="Cache-Control" content="No-Cache">
	
	<script type="text/javascript" src="/publish_2018/include/plugin/jquery-1.11.3.min.js"></script>
	<link rel="stylesheet" href="/html/popup/mypage/resources/css/base.css">
	<link rel="stylesheet" href="/html/popup/mypage/resources/css/common.css">
	
	<style type="text/css">
		@page{size:auto;margin:8mm 4mm 2mm 4mm;}
		@media print{
			title{display:none;}
			body{margin:0;width:100%;height:100%;overflow:visible;}
			#popMain{width:100%;height:100%;overflow:visible;}
			#aside{display:none;}
			#section{float:left;width:100%;height:100%;overflow:visible;}
		}
	</style>
	
	<title>나의데이터 상세 이용가이드</title>
	
	<script type="text/javascript">
		function printArea(){
			$("title").text("");
			window.print();
			
			$("title").text("나의데이터 상세 이용가이드");
			return false;
		}
		
		
		function fileDown(){
			var link = document.createElement("a");
			link.setAttribute("download", "guide.pdf");
			link.href = "/upload/myData/sample/guide.pdf";
			
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
		
	</script>
</head>
	<body>
		<iframe id="fileDown" style="display:none;"></iframe>
		<main id="popMain" style="margin-top:-20px;">
			<aside id="aside">
				<h1>나의데이터<br />상세 이용가이드
					<a onclick="javascript:printArea();" style="background: url(/img/ico/ico_toolbars.png) no-repeat -187px top;margin-left:20px;
						position:absolute;width:30px;height:30px;background-color:white;border-radius:20px;"></a>
					<a onclick="javascript:fileDown();" style="background: url(/img/ico/ico_toolbars.png) no-repeat -41px -30px;margin-left:60px;
						position:absolute;width:30px;height:30px;background-color:white;border-radius:20px;"></a>
				</h1>
				<div id="leftDiv">
					<strong><a href="#title1" onclick="javascript:titleClick(1);">나의 데이터를 POI로 표출하기</a></strong>
					<ul>
						<li class="step1 on"><a href="#1">1. 엑셀 양식 다운로드와 파일 업로드 및 편집</a></li>
						<li class="step2"><a href="#2">2. 나의 데이터를 POI로 표출하기</a></li>
						<li class="step3"><a href="#3">3. 지도표출 설정</a></li>
						<li class="step4"><a href="#4">4. 저장</a></li>
					</ul>
					<strong><a href="#title2" onclick="javascript:titleClick(2);">나의 데이터를 색상지도로 표출하기</a></strong>
					<ul>
						<li class="step5"><a href="#5">1. 시도 집계 예제보기와 파일 업로드</a></li>
						<li class="step6"><a href="#6">2. 나의 데이터를 색상지도로 표출하기</a></li>
						<li class="step7"><a href="#7">3. 지도표출 설정</a></li>
						<li class="step8"><a href="#8">4. 저장</a></li>
					</ul>
					<strong><a href="#title3" onclick="javascript:titleClick(3);">대화형통계지도에서 표출하기</a></strong>
					<ul>
						<li class="step9"><a href="#9">1. 대화형통계지도 메뉴에서 나의 데이터 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회하기</a></li>
						<li class="step10"><a href="#10">2. 데이터 시각화 적용 유형 설정, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;데이터 표출 정보 설정</a></li>
						<li class="step11"><a href="#11">3. 열지도 (가중치 컬럼)</a></li>
						<li class="step12"><a href="#12">4. 그룹화 컬럼 선택</a></li>
					</ul>
				</div>
			</aside>
			<section id="section">
				<h2 id="title1">나의 데이터를 POI로 표출하기</h2>
				<strong id="1">엑셀 양식 다운로드와 파일 업로드 및 편집<br/></strong>
				<img class="myImg" src="./resources/images/img1.png">
				<ul>
					<li>1. <span class="fw">[엑셀양식다운로드]</span> 버튼을 클릭해서 파일을 다운로드 받습니다.</li>
					<li>2. <span class="fw">[파일찾기]</span> 버튼을 클릭해서 다운로드 받은 파일을 선택합니다.</li>
					<li>3. 파일을 선택하면 화면에 파일 내용이 조회됩니다.</li>
					<li>4. 조회된 내용은 <span class="fw">[필드]</span>를 클릭해서 내용을 입력하여 수정할 수 있으며 <span class="fw">[추가(행)]</span>,<span class="fw">[삭제(행)]</span> 버튼을 클릭하면 행을 추가하거나 삭제할 수 있습니다.</li>
				</ul>
				<div style="margin-top: -15px;">
					<p style="margin-left: 20px;color: red;font-weight: bold;">※1회당 업로드 제한 : 3500 row / 10 column (엑셀, CSV, TXT)</p>
					<p style="margin-left: 296px;color: red;font-weight: bold;">(총 100MB)</p>
				</div>
				
				<strong id="2" style="page-break-before:always;">나의 데이터를 POI로 표출하기 (주소 필드 선택)<br/></strong>
				<img class="myImg" src="./resources/images/img2.png">
				<ul>
					<li>1. <span class="fw">[나의 데이터를 POI로 표출하기]</span> 버튼을 클릭하면 지오코딩 방식을 선택할 수 있는 팝업창이 열립니다.</li>
					<li>2. 지오코딩은 X,Y좌표, 주소, 행정동 코드로 수행할 수 있습니다. <span class="fw">[주소 필드 선택]</span> 버튼을 클릭합니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img3.png">
				<ul>
					<li>3. 주소 데이터가 들어있는 필드 <span class="fw">[E]</span> 를 선택한 후 <span class="fw">[확인]</span> 버튼을 클릭하면 지오코딩이 수행됩니다.</li>
				</ul>
				<strong id="3" style="page-break-before:always;">지도표출설정<br/></strong>
				<img class="myImg" src="./resources/images/img4.png">
				<ul>
					<li>1. 지오코딩이 완료되면 필드 B 결과필드에 O,X로 결과가 입력되고 지오코딩 결과 필드가 생성됩니다.</li>
					<li>2. <span class="fw">[지도표출설정]</span> 버튼을 클릭하면 지도표출 정보를 설정할 수 있는 팝업창이 열립니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img5.png">
				<ul>
					<li>3. <span class="fw">[1.표출 데이터 설정]</span>, <span class="fw">[2.툴팁 표출설정(다중선택)]</span>, <span class="fw">[3.데이터 시각화 적용 유형]</span> 을 선택한 후 <span class="fw">[미리보기]</span> 버튼을 클릭하면 설정된 표출정보가 지도에 적용됩니다. 열지도를 제외한 위치표시, 버블지도 마커를 클릭하면 설정된 표출정보를 확인할 수 있습니다.</li>
				</ul>
				<strong id="4" style="page-break-before:always;">저장<br/></strong>
				<img class="myImg" src="./resources/images/img6.png">
				<ul>
					<li>1. <span class="fw">[저장]</span> 버튼을 클릭하면 팝업창이 열립니다. 제목을 입력한 후 <span class="fw">[저장]</span> 버튼을 클릭하면 설정된 데이터가 나의 데이터에 저장됩니다.<br/>※ 단, '나의데이터 체험하기'에서는 저장이 되지 않으니 정식사용을 위해서는 로그인후 '나의데이터'를 이용하시기 바랍니다.</li>
				</ul>
				<h2 id="title2">나의 데이터를 색상지도로 표출하기</h2>
				<strong id="5">시도 집계 예제보기와 파일 업로드<br/></strong>
				<img class="myImg" src="./resources/images/img7.png">
				<ul>
					<li>1. <span class="fw">[시도집계예제보기]</span> 버튼을 클릭해서 파일을 다운로드 받습니다.</li>
					<li>2. <span class="fw">[파일찾기]</span> 버튼을 클릭해서 다운로드 받은 파일을 선택합니다.</li>
					<li>3. 파일을 선택하면 화면에 파일 내용이 조회됩니다.</li>
					<li>4. 조회된 내용은 <span class="fw">[필드]</span>를 클릭해서 내용을 입력하여 수정할 수 있으며 <span class="fw">[추가(행)]</span>,<span class="fw">[삭제(행)]</span> 버튼을 클릭하면 행을 추가하거나 삭제할 수 있습니다.</li>
				</ul>
				<strong id="6">나의 데이터를 색상지도로 표출하기<br/></strong>
				<img class="myImg" src="./resources/images/img8.png">
				<ul>
					<li>1. <span class="fw">[나의 데이터를 색상지도로 표출하기]</span> 버튼을 클릭하면 집계 정보를 설정할 수 있는 팝업창이 열립니다. 집계레벨(시도,시군구,읍면동,집계구)을 선택하고 주소가 들어있는 필드 <span class="fw">[D]</span> 를 선택하고 집계할 데이터가 들어있는 필드 <span class="fw">[E]</span> 를 선택한 후 <span class="fw">[확인]</span> 버튼을 클릭하면 선택된 해당 정보로 데이터가 집계됩니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img9.png">
				<ul>
					<li>2. 설정한 정보로 집계된 데이터가 화면에 조회됩니다. 노란색 바탕의 필드는 데이터 수정이 불가하며 하얀색 바탕의 필드는 클릭해서 입력하면 데이터 수정이 가능합니다.</li>
					<li>3. <span class="fw">[지도표출설정]</span> 버튼을 클릭하면 지도표출 정보를 설정할 수 있는 팝업창이 열립니다.</li>
				</ul>
				<strong id="7">지도표출설정<br/></strong>
				<img class="myImg" src="./resources/images/img10.png">
				<ul>
					<li>1. <span class="fw">[1.표출 데이터 설정]</span>, <span class="fw">[2.툴팁 표출설정(다중선택)]</span>, <span class="fw">[3.데이터 시각화 적용 유형]</span> 을 선택한 후 <span class="fw">[미리보기]</span> 버튼을 클릭하면 설정된 표출정보가 지도에 적용됩니다. 색상지도는 지도위에 마우스오버, 버블지도는 마커를 클릭하면 설정된 표출정보를 확인할 수 있습니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img11.png">
				<ul>
					<li>2. <span class="fw">[3.데이터 시각화 적용 유형]</span> 을 버블지도로 선택한 후 <span class="fw">[미리보기]</span> 버튼을 클릭하면 버블지도가 조회됩니다.</li>
				</ul>
				<strong id="8">저장<br/></strong>
				<img class="myImg" src="./resources/images/img12.png">
				<ul>
					<li>1. <span class="fw">[저장]</span> 버튼을 클릭하면 팝업창이 열립니다. 제목을 입력한 후 <span class="fw">[저장]</span> 버튼을 클릭하면 설정된 데이터가 나의 데이터에 저장됩니다.<br/>※ 단, '나의데이터 체험하기'에서는 저장이 되지 않으니 정식사용을 위해서는 로그인후 '나의데이터'를 이용하시기 바랍니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img13.png">
				<ul>
					<li>2. 저장된 데이터는 나의 데이터 목록에서 바로 확인할 수 있습니다. <span class="fw">[지도보기]</span> 버튼을 클릭하면 지도에서 데이터를 조회할 수 있고 <span class="fw">[다운로드]</span> 버튼을 클릭하면 데이터가 다운로드 됩니다. <span class="fw">[데이터편집]</span> 버튼을 클릭하면 데이터를 편집하는 화면으로 이동됩니다. <span class="fw">[삭제]</span> 버튼을 클릭해서 데이터를 삭제할 수 있습니다.</li>
				</ul>
				<h2 id="title3">나의 데이터를 대화형통계지도에서 표출하기</h2>
				<strong id="9">대화형통계지도 메뉴에서 나의 데이터 조회하기<br/></strong>
				<img class="myImg" src="./resources/images/img14.png">
				<ul>
					<li>1. 대화형 통계지도 화면에서 나의 데이터 메뉴를 선택하면 저장된 나의 데이터 목록이 화면 왼쪽 메뉴에 조회됩니다. 데이터 제목을 클릭하면 해당 데이터가 지도에서 조회됩니다.</li>
					<li>2. <span class="fw">[데이터보드]</span> 버튼을 클릭하면 데이터보드 창이 열립니다.</li>
				</ul>
				<strong id="10">데이터 시각화 적용 유형 설정, 데이터 표출 정보 설정<br/></strong>
				<img class="myImg" src="./resources/images/img15.png">
				<ul>
					<li>1. <span class="fw">[조회 방식 설정]</span> 에서 POI보기, 열지도, 버블지도를 클릭하면 조회 방식 변경이 가능합니다.</li>
					<li>2. <span class="fw">[데이터표출설정(선택)]</span>, <span class="fw">[툴팁설정(다중)]</span>을 선택한 후 <span class="fw">[적용]</span> 버튼을 클릭하면 설정된 표출정보가 지도에 적용됩니다. POI, 버블지도는 마커를 클릭하면 설정된 표출정보를 확인할 수 있습니다.</li>
				</ul>
				<strong id="11" style="page-break-before:always;">열지도 (가중치 컬럼)<br/></strong>
				<img class="myImg" src="./resources/images/img16.png">
				<ul>
					<li>1. <span class="fw">[조회 방식 설정]</span> 에서 열지도를 선택하면 열지도 유형으로 지도에 조회됩니다.</li>
				</ul>
				<img class="myImg" src="./resources/images/img17.png">
				<ul>
					<li>2. <span class="fw">[열지도 가중치 컬럼 선택]</span>에서 가중치 옵션을 적용할 컬럼을 선택한 후 <span class="fw">[적용]</span> 버튼을 클릭하면 가중치 옵션이 적용된 열지도가 지도에서 조회됩니다. 버블지도 유형일 경우에도 동일하게 가중치 옵션을 적용할 수 있습니다..</li>
				</ul>
				<strong id="12" style="page-break-before:always;">그룹화 컬럼 선택<br/></strong>
				<img class="myImg" src="./resources/images/img18.png">
				<ul>
					<li>1. 그룹화 옵션은 같은 값을 가진 데이터를 같은 색깔로 나타내는 기능입니다. 그룹화를 적용할 컬럼을 선택한 후 <span class="fw">[그룹]</span> 버튼을 클릭하면 지도에 그룹화가 적용된 데이터가 조회됩니다.</li>
				</ul>
			</section>
		</main>
		<script type="text/javascript">
			$("section").scroll(function(e){
				for (var i = 1; i <= 12; i++) {
					var num = $("section strong:nth-of-type("+ i +")").offset().top - 20;
					eval("var ps" + i + "=" + num);
					
					if( i==5 && eval("ps"+i) <= 38 ){
						eval("var ps" + i + "=" + 0);
					}
					
					if( i==9 && eval("ps"+i) <= 36 ){
						eval("var ps" + i + "=" + 0);
					}
					
					if(eval("ps" + i)<=0){
						$("aside ul li").removeClass("on");
						$(".step" + i).addClass("on");
					}else if(i==12&&ps12<=560){
						$("aside ul li").removeClass("on");
						$(".step12").addClass("on");
					}
				}
			});
			
			function titleClick( num ){
				if( num == 1 ){
					$("#popMain li").removeClass("on");
					$(".step1").addClass("on");
				} else if( num == 2 ){
					$("#popMain li").removeClass("on");
					$(".step5").addClass("on");
				} else if( num == 3 ){
					$("#popMain li").removeClass("on");
					$(".step9").addClass("on");
				}
			};
			
		</script>
	</body>
</html>