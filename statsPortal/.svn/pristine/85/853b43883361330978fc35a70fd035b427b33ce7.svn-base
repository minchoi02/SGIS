<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
</script>
<div class="shadow"></div>
<div class="quickBox step01" style="top: 70px;">
	<div class="subj">
			<h2>인구피라미드</h2>
		</div>
		<div class="expendBox">
			<ul class="pyraul ul-area" id="prntMenuList">
				<li data-type="1"><a href="javascript:void(0)">전국 인구추계 피라미드 </a></li>
				<li data-type="2"><a href="javascript:void(0)">시도 인구추계 피라미드 </a></li>
				<li data-type="3"><a href="javascript:void(0)">연도별 인구추계 피라미드 </a></li>
			</ul>
			<ol class="stat-infor">
				<li><a href="#" onclick="javascript:$pyramidLeftMenu.reportDataSet();">보고서 보기</a></li>
				<li><a href="#" class="map_sizing" onclick="javascript:$pyramidLeftMenu.doMaxSize(1);"">전체 화면 확대</a></li>
			</ol>
		</div>
		<!-- <div class="btnBottom" style="background-color: white;">
            <span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
        </div> -->
		<div class="bottom"><a href="javascript:void(0)" class="buttom stepClose on" data-closeidx="1">닫기</a></div><!--20년수정반영-->
	</div>
	
	<div class="nav-sidebar" style="top: 70px;">
		<ul class="pyramid nav-list">
			<li data-type="1" id="submenu_1"><a href="javascript:void(0) " title="전국 인구 추계 피라미드"><span>전국 인구<br/>추계피라미드</span></a></li>
			<li data-type="2" id="submenu_2"><a href="javascript:void(0) " title="시도 인구 추계 피라미드"><span>시도 인구<br/>추계피라미드</span></a></li>
			<li data-type="3" id="submenu_3"><a href="javascript:void(0) " title="연도별 인구 추계 피라미드"><span>연도별 인구<br/>추계피라미드</span></a></li>
		</ul>
		<div class="stepPrevBtn" style="position:absolute;bottom:71px;left:0;width:74px;height:56px;text-align:center;margin:auto;">
			<img src="../../jsp/pyramid/include/images/img_list_btn.png"/>
		</div>
	</div>
	
	<div id="label-list">
		<div class="quickBox step02" id="labellist_1" style="top: 70px;">
			<div class="subj ">
				<h2>전국 인구 추계 피라미드 선택</h2>
				<!-- <a class="stepPrevBtn" href="javascript:void(0);"></a> -->
			</div>
			<div class="normalBox">
				<div class="stepBox">
					<p class="on">기준연도
						<select title="기준연도" class="mainIndex_year" id="baseYear">
						</select>
					</p>
					<p class="on">인구추계</p>
					<ul class="dbTypeCk">
						<li><input type="radio" name="a" id="a1" value="M" data-elenm="중위" checked="checked"/><label for="b1" class="mr20 on">중위</label></li>
						<li><input type="radio" name="a" id="a2" value="H" data-elenm="고위"/><label for="b1" class="mr20">고위</label></li>
						<li><input type="radio" name="a" id="a3" value="L" data-elenm="저위"/><label for="b1" class="mr20">저위</label></li>
					</ul>
				</div>
			</div>
			<div class="btnBottom">
	            <span class="logo"><img src="/img/pic/pic_logo01.gif" alt="통계청" /></span>
	        </div>
			<div class="bottom "><a href="javascript:void(0) " class="stepClose" data-closeidx="1">닫기</a></div>
		</div>
		
		<div class="quickBox step02" id="labellist_2" style="top: 70px;">
			<div class="subj ">
				<h2>시도 인구 추계 피라미드 선택</h2>
				<a class="stepPrevBtn" href="javascript:void(0);"></a>
			</div>
			<div class="normalBox">
				<div class="stepBox">
					<p class="on">비교연도
						<select title="비교연도" class="mainIndex_year" id="comparisonYear">
						</select>
					</p>
					<ul class="dbTypeCk">
						<li>
							<span>· 비교지역1</span>
							<select title="비교지역1" name="mainIndex_year" id="areaSel1" class="area_select" data-boxid="box1" data-classnm="areanm1">
							</select>
						</li>
						<li>
							<span>· 비교지역2</span>
							<select title="비교지역2" name="mainIndex_year" id="areaSel2" class="area_select" data-boxid="box2" data-classnm="areanm2">
							</select>
						</li>
						<li>
							<span>· 비교지역3</span>
							<select title="비교지역3" name="mainIndex_year" id="areaSel3" class="area_select" data-boxid="box3" data-classnm="areanm3">
							</select>
						</li>
					</ul>
				</div>
			</div>
			<div class="bottom "><a href="javascript:void(0) " class="stepClose" data-closeidx="1">닫기</a></div>
		</div>
		
		<div class="quickBox step03" id="labellist_3" style="top: 70px;">
			<div class="subj ">
				<h2>연도별 인구 추계 피라미드 선택</h2>
				<a class="stepPrevBtn" href="javascript:void(0);"></a>
			</div>
			<div class="normalBox">
				<div class="stepBox">
					<p class="on">인구추계</p>
					<ul class="dbTypeCk">
						<li><input type="radio" name="a" id="a1" value="M" data-elenm="중위" checked="checked"/><label for="b1" class="mr20 on">중위</label></li>
						<li><input type="radio" name="a" id="a2" value="H" data-elenm="고위"/><label for="b1" class="mr20">고위</label></li>
						<li><input type="radio" name="a" id="a3" value="L" data-elenm="저위"/><label for="b1" class="mr20">저위</label></li>
					</ul>
					
					<p class="on">비교연도
					<ul class="dbTypeCk">
						<li>
							<span>· 비교연도1</span>
							<select title="비교연도1" id="yearSel1" class="mainIndex_year" data-boxid="box1" data-yearid="1">
							</select>
						</li>
						<li>
							<span>· 비교연도2</span>
							<select title="비교연도2" id="yearSel2" class="mainIndex_year" data-boxid="box2" data-yearid="2">
							</select>
						</li>
						<li>
							<span>· 비교연도3</span>
							<select title="비교연도3" id="yearSel3" class="mainIndex_year" data-boxid="box3" data-yearid="3">
							</select>
							<div style="display: inline-block;width: 40px;height: 20px;margin-left:10px;">
								<span> 표시</span><input id="disp3" type="checkbox" checked="checked" style="left:0px !important; position:relative !important;">
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="bottom "><a href="javascript:void(0) " class="stepClose" data-closeidx="1">닫기</a></div>
		</div>
		
	</div>
	
</html>