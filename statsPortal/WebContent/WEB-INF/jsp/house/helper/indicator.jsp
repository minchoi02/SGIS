<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="help-indicator" class="House_Index_Info" style="display:none;">
	<div class="ContBox">
		<h1>지표현황</h1>
		<a href="javascript:void(0);" onclick="$('#help-indicator').hide();" class="BtnClose">창닫기</a>
		<ul class="Tab">
			<li><a href="#" class="M_on" data-id="HML0001">자연</a></li>
			<li><a href="#" data-id="HML0002">주택</a></li>
			<li><a href="#" data-id="HML0003">지역 인구</a></li>
			<li><a href="#" data-id="HML0004">안전</a></li>
			<li><a href="#" data-id="HML0005">생활 편의 교통</a></li>
			<li><a href="#" data-id="HML0006">교육</a></li>
			<li><a href="#" data-id="HML0007">복지 문화</a></li>
		</ul>
		<table>
			<thead>
				<tr>
					<th scope="col">지표</th>
					<th scope="col">지표 내용</th>
					<th scope="col">데이터 레벨</th>
					<th scope="col">자료출처</th>
					<th scope="col">유의사항</th>
					<th scope="col">지표 설명글</th>
				</tr>
			</thead>
			<tbody data-id="HML0001">
				<tr>
					<td scope="row">대기오염도</td>
					<td>미세먼지, 이산화질소 시도별 등급</td>
					<td>시도, 시군구</td>
					<td>환경과학원 대기오염도(2019년)</td>
					<td>환경과학원에서 제공하는 일부 지역만 이용 가능합니다.</td>
					<td>
						대기오염도는 쾌적한 삶을 살기 위해 자연환경이 좋은 지역을 구분할 수 있는 지표 입니다. 대기오염도는 미세먼지와 이산화질소(NO₂)에 의한 오염정도를 나타내는 지표로써, 행정구역 별(시도)로 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 출처 : 환경과학원 미세먼지월별대기오염도(2019년), 이산화질소월별대기오염도(2019년)
						<br />
						<span style="color:#f63;">※</span> 10등급에 가까울 수록 대기오염도가 낮습니다.
					</td>
				</tr>
				<tr>
					<td scope="row">생활날씨</td>
					<td>체감온도(11월-3월), 불쾌지수(6월-9월) 시도별 등급</td>
					<td>시도, 시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>기상청 체감온도(2018년~2019년) 불쾌지수(2019년)</td>
					<!--  mng_e 20171030_김건민  -->
					<td>기상청에서 제공하는 일부 지역만 이용 가능합니다.</td>
					<td>
						생활날씨는 쾌적한 삶을 살기 위해 자연환경이 좋은 지역을 구분할 수 있는 지표 입니다. 체감온도지수와 불쾌지수로 나타낼 수 있으며, 행정구역 별(시도)로 보실 수 있습니다.
						<br /><br />
						<!--  mng_s 20171030_김건민  -->
						<span style="color:#f63;">※</span> 출처 : 기상청 체감온도(2018년 11월~2019년 3월), 불쾌지수(2019년 6월~9월)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 체감온도는 외부에 있는 사람이나 동물이 바람과 한기에 노출된 피부로부터 열을 빼앗길 때 느끼는 추운 정도를 나타내는 지수입니다. 겨울철(11월-3월)에 측정하며, 높을수록 겨울철에 따뜻하다는 의미 입니다.
						<br />
						<span style="color:#f63;">※</span> 불쾌지수란 기온과 습도의 조합으로 사람이 느끼는 온도를 표현한 것으로 온습도지수(THI)라고도 합니다. 여름철(6월-9월)에 측정하며, 낮을수록 여름철에 쾌적합니다.
						<br />
						<span style="color:#f63;">※</span> 10등급에 가까울 수록 생활날씨가 좋습니다.
					</td>
				</tr>
				<tr>
					<td scope="row">녹지비율</td>
					<td>토지피복도 비율</td>
					<td>읍면동</td>
					<td>환경부 토지피복도(2020년)</td>
					<td>-</td>
					<td>
						녹지비율은 쾌적한 삶을 살기 위해 자연환경과 밀접한 관련이 있는 녹지(산림, 초지) 비율을 통해 자연환경 수준을 확인할 수 있는 지표입니다. 녹지란 토지에서 산림과 초지를 의미하며 녹지비율은 토지에서 산림과 초지가 차지하는 비율을 의미합니다. 행정구역별 면적 대비 녹지(산림, 초지)가 차지하는 면적 비율을 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 출처 : 환경부 토지피복도(2020년 2월 기준)
						<br />
						<span style="color:#f63;">※</span> 산출식 : ((산림 면적 + 초지 면적) / 행정구역 면적) * 100
						<br />
						* 산림 : 수목이 집단적으로 생육하고 있는 토지
						<br />
						** 초지 : 초본식물(줄기가 목질이 아닌 식물)로 덮인 토지
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0002" style="display:none;">
				<tr>
					<td scope="row">공동주택비율</td>
					<td>총주택중 아파트, 연립, 다세대 비율</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 등록센서스(2020년)</td>
					<td>-</td>
					<td>
						공동주택비율은 전체 주택 중에 공동주택에 해당하는 비율을 확인할 수 있는 지표입니다. 공동주택이란 하나의 건물에서 여러세대가 생활할 수 있는 주택으로 아파트, 연립주택, 다세대주택을 의미합니다. 2020 등록센서스 총 주택 대비 공동주택(아파트, 연립, 다세대)에 해당하는 주택 유형 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : (아파트, 연립, 다세대 주택 수 / 총 주택 수) * 100
						<br />
						<span style="color:#f63;">※</span> 총주택수 : 단독주택, 공동주택(아파트, 연립주택, 다세대주택, 비거주용 건물내 주택)
					</td>
				</tr>
				<tr>
					<td scope="row">주거면적</td>
					<td>1인당 주거 연면적</td>
					<td>읍면동</td>
					<td>인구주택총조사(2015년)</td>
					<td>총 인구에서 외국인, 기숙사, 군부대 거주자는 제외</td>
					<td>
						주거면적은 주택수준을 확인하기 위해 1인당 살고있는 주거 면적을 확인할 수 있는 지표입니다. 2015 인구주택총조사 총 인구 대비 주거 연면적을 행정구역 별로 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 출처 : 통계청 인구주택총조사(2015년)
						<br />
						<span style="color:#f63;">※</span> 산출식 : 주거 연면적 / 총 인구
					</td>
				</tr>
				<tr>
					<td scope="row">노후주택비율</td>
					<td>건축연도 20년 이상(1998년 이전)경과 주택비율</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 등록센서스(2020년)</td>
					<td>-</td>
					<td>
						노후주택비율은 주택의 노후화 수준을 확인할 수 있는 지표입니다. 노후주택은 건축된지 20년 이상 경과된 주택을 의미하며, 노후주택 비율은 전체 주택 중에 노후주택이 차지하는 비율로, 2020 등록센서스 총 주택 대비 20년도 이상 노후 주택 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : (건축 연도 20년이상 주택 수 / 총 주택 수) * 100
					</td>
				</tr>
				<tr>
					<td scope="row">자가점유비율</td>
					<td>점유형태 중 자가점유 비율</td>
					<td>시군구</td>
					<td>인구주택총조사(2015년)</td>
					<td>-</td>
					<td>
						자가점유비율은 가구 수에 비해 주택 수가 얼마나 여유있는지 아니면 부족한지를 확인할 수 있는 지표입니다. 일반 가구 중 자신이 소유한 주택에서 자신이 살고 있는 주택의 비율을 의미하며, 2015 인구주택총조사 총 주택 대비 자가점유 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 인구주택총조사(2015년)
						<br />
						<span style="color:#f63;">※</span> 산출식 : (자가점유 가구 수 / 총 가구 수 ) * 100
					</td>
				</tr>
				<tr>
					<td scope="row">공시지가</td>
					<td>주거용 토지의 단위면적(1㎡)당 가격</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>국토교통부 공시지가(2020년)</td>
					<td>-</td>
					<td>
						공시지가를 확인할 수 있는 지표로써 면적(1㎡당) 대비 주거용(단독, 연립, 다세대, 아파트) 토지 가격을 행정구역 별로 보실 수 있습니다.
						<br /><br />
						<span style="color:#f63;">※</span> 출처 : 국토교통부 공시지가(2020년1월 1일)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 토지 가격 / 토지 면적
						<br />
						<span style="color:#f63;">※</span> 주거용 토지(단독, 연립, 다세대, 아파트) 기준
					</td>
				</tr>
				<tr>
					<td scope="row">면적당 아파트 가격</td>
					<td>면적(1㎡당) 대비 아파트 실거래 가격</td>
					<td>읍면동</td>
					<td>국토교통부 주택실거래가(2018년, 2019년)</td>
					<td>국토교통부에서 제공하는 자료로, 2018년1월1일~2019년12월31일 사이에 실거래가 일어나지 않은 지역은 값이 없을 수 도 있습니다.</td>
					<td>
						면적당 아파트 가격을 확인할 수 있는 지표로써 아파트 실거래가격을 바탕으로 아파트 면적(1㎡당) 대비 가격을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 국토교통부 주택실거래가(2018년1월1일~2019년12월31일)
						<br />
						<span style="color:#f63;">※</span> 산출식 : 아파트 가격 / 아파트 면적
					</td>
				</tr>
				<tr>
					<td scope="row">단독주택비율</td>
					<td>총 주택 중 단독주택 비율</td>
					<td>읍면동</td>
					<td>통계청 등록센서스(2020년)</td>
					<td>-.</td>
					<td>
						단독주택비율은 전체 주택 중에 단독주택에 해당하는 비율을 확인할 수 있는 지표입니다. 단독주택은 한 가구가 생활 할 수 있도록 건축된 일반 단독주택과 여러 가구가 살 수 있도록 설계된 다가구 단독주택을 말합니다.  2020 인구주택총조사 총주택대비 단독주택에 해당하는 주택 유형 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 인구주택총조사 (2020년)
						<br />
						<span style="color:#f63;">※</span> 산출식 : (단독주택수 / 총주택수)*100
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0003" style="display:none;">
				<tr>
					<td scope="row">청장년인구비율</td>
					<td>총 인구 중 15-64세 인구(생산가능인구) 비율</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 등록센서스(2020년)</td>
					<td>-</td>
					<td>
						청장년인구는 생산가능인구로써 15세~64세까지 인구를 의미하며 청장년인구비율을 확인할 수 있는 지표입니다. 2020 등록센서스 총 인구 대비 청장년인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년)<br />
						<!--  mng_e 20171030_김건민  -->
						<span style="color:#f63;">※</span> 산출식 : (15세-64세 인구 / 총 인구) * 100
					</td>
				</tr>
				<tr>
					<td scope="row">혈연가구 비율</td>
					<td>총 가구 중 2세대(부부+자녀) 이상 가구 비율</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 등록센서스(2020년)</td>
					<td>-</td>
					<td>
						지역 인구의 세대유형 중 2세대(부부+자녀 등) 이상으로 구성된 가구 비율을 확인할 수 있는 지표 입니다. 2020 등록센서스 총 가구 대비 2세대 이상의 가구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년)<br />
						<!--  mng_e 20171030_김건민  -->
						<span style="color:#f63;">※</span> 산출식 : (2세대 이상 가구수 수 / 총 가구 수) * 100
					</td>
				</tr>
				<tr>
					<td scope="row">사업체 종사자 비율</td>
					<td>지역 인구 대비 사업체 종사자 비율</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 등록센서스(2020년)<br />통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						지역인구 대비 사업체에 종사하고 있는 인구(직장인구)의 비율을 확인할 수 있는 지표입니다. 2020 등록센서스 총 인구 대비 사업체에 종사하는 인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년), 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : (사업체 종사자 수 / 인구) * 100
					</td>
				</tr>
				<tr>
					<td scope="row">순유입인구 비율</td>
					<td>시군구별 순이동률(전입-전출)</td>
					<td>시군구</td>
					<td>통계청 국내인구이동통계(2020년)</td>
					<td>-</td>
					<td>
						순유입인구비율은 지역인구의 이동현황 정도를 확인할 수 있는 지표입니다. 2020 주민등록인구 대비 인구의 순이동자(전입-전출) 비율을 행정구역 별(시군구)로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 국내인구이동통계(2020년)
						<br />
						<span style="color:#f63;">※</span> 산출식 : 순이동률 = (순이동자수 / 연앙인구) * 100 (= 전입률 - 전출률)
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 전입률 : (전입자수 / 연앙인구) * 100
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 전출률 : (전출자수 / 연앙인구) * 100
						<br />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 주민등록연앙인구 : 해당연초와 연말인구 평균
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0004" style="display:none;">
				<tr>
					<td scope="row">화재 안전</td>
					<td>화재 안전지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 화재 안전 지수(2019년)</td>
					<td>-</td>
					<td>
						화재사고 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 화재안전지수를 바탕으로 화재안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 화재안전 수준을 나타내는 화재안전지수(등급)를 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 화재 안전지수(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				<tr>
					<td scope="row">교통사고 안전</td>
					<td>교통 안전지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 교통 안전 지수(2019년)</td>
					<td>-</td>
					<td>
						교통사고 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 교통사고안전지수를 바탕으로 교통안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 교통안전 수준을 나타내는 교통사고안전지수(등급)를 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 교통 안전 등급(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				<tr>
					<td scope="row">범죄 안전</td>
					<td>범죄 안전지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 범죄 안전지수(2019년)</td>
					<td>-</td>
					<td>
						범죄 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 범죄안전지수를 바탕으로 범죄안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 범죄안전 수준을 나타내는 범죄안전지수(등급)를 보실 수 있습니다.<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 범죄 안전지수(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				<tr>
					<td scope="row">안전사고</td>
					<td>안전 사고지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 안전 사고지수(2019년)</td>
					<td>-</td>
					<td>
						안전사고 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 안전사고지수를 바탕으로 안전사고에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 안전사고 수준을 나타내는 안전사고지수(등급)를 보실 수 있습니다.<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 안전 사고지수(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				<!-- 
				2017.02.10 삭제됨
				<tr>
					<td scope="row">자살 안전</td>
					<td>자살 안전지수(등급)</td>
					<td>시군구</td>
					<td>행정안전부 자살 안전지수(2015년)</td>
					<td>-</td>
					<td>
						자살 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 자살안전지수를 바탕으로 자살안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 자살안전 수준을 나타내는 자살안전지수(등급)를 보실 수 있습니다.<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 자살 안전지수(2015년 기준)
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				 -->
				<tr>
					<td scope="row">감염병 안전</td>
					<td>감염병 안전지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 감염병 안전지수(2019년)</td>
					<td>-</td>
					<td>
						감염병 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 감염병안전지수를 바탕으로 감염병안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 감염병안전 수준을 나타내는 감염병안전지수(등급)를 보실 수 있습니다.<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 감염병 안전지수(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
				<tr>
					<td scope="row">자연재해 안전</td>
					<td>자연재해 안전지수(등급)</td>
					<td>시군구</td>
					<!--  mng_s 20171030_김건민  -->
					<td>행정안전부 자연재해 안전지수(2019년)</td>
					<td>-</td>
					<td>
						자연재해 위험지역을 1~5등급으로 구분하여 발표한 행정안전부 자연재해 안전지수를 바탕으로 자연재해 안전에 대한 수준을 확인할 수 있는 지표입니다. 행정구역 별(시군구) 자연재해안전 수준을 나타내는 자연재해안전지수(등급)를 보실 수 있습니다.<br /><br />

						<span style="color:#f63;">※</span> 출처 : 행정안전부 자연재해 안전지수(2019년 기준)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 1등급(좋음) ~ 5등급(나쁨)
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0005" style="display:none;">
				<tr>
					<td scope="row">편의시설 수</td>
					<td>공공기관(중앙 및 지방행정기관, 주민센터, 경찰서, 우체국 등), 은행, 주차장 수</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						편의시설은 편리한 삶을 살기 위해 생활편의시설이 많은 지역을 확인할 수 있는 지표입니다. 생활 편의에 관련된 사업체 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 편의시설 : 행정기관(시청, 주민센터 등), 우체국, 경찰서, 소방서, 은행, 주차장
					</td>
				</tr>
				<tr>
					<td scope="row">쇼핑시설 수</td>
					<td>대형 종합소매업, 백화점 수, 슈퍼마켓, 체인화 편의점</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						쇼핑시설은 편리한 삶을 살기 위해 쇼핑시설이 많은 지역을 확인할 수 있는 지표입니다. 쇼핑에 관련된 사업체 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 쇼핑시설 : 백화점, 중대형마트, 편의점, 슈퍼마켓
					</td>
				</tr>
				<tr>
					<td scope="row">잡화점 수</td>
					<td>식료품점 수</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						잡화점은 편리한 삶을 살기 위해 잡화점이 많은 지역을 확인할 수 있는 지표입니다. 관련 사업체 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />
						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 쇼핑시설 : 식료품점
					</td>
				</tr>
				<tr>
					<td scope="row">외식시설 수</td>
					<td>음식점업 수</td>
					<td>읍면동</td>
					<!--  mng_s 20171030_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						외식시설은 편리한 삶을 살기 위해 외식시설이 많은 지역을 확인할 수 있는 지표입니다. 외식과 관련된 음식점 사업체 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 외식시설 : 한식, 중식, 일식, 분식, 서양식, 제과점, 패스트푸드, 치킨, 호프 및 간이주점, 카페, 기타외국식
					</td>
				</tr>
				<tr>
					<td scope="row">대중교통 이용률</td>
					<td>대중교통 이용자 비율</td>
					<td>시군구</td>
					<!--  mng_s 20180307_김건민  -->
					<td>인구주택총조사<br />(2015년 표본조사)</td>
					<!-- mng_s 20200922 김건민 문구 수정 -->
					<!--<td>2010년 인구주택총조사 10%표본 자료로서 2015년 행정구역 경계와 상이 할 수 있습니다.</td> -->
					<td>2015년 인구주택총조사 20%표본 자료로서<br />2020년 행정구역<br />경계와 상이 할 수<br /> 있습니다.</td>
					<!-- mng_e 20200922 김건민 -->
					<td>
						대중교통 이용률은 생활편의와 관련된 대중교통을 이용하는 정도를 확인할 수 있는 지표입니다. 대중교통(버스, 전철, 지하철, 기차)으로 통근통학하는 12세 이상 인구에 대한 비율을 행정구역 별(시군구)로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 인구주택총조사(2015년 표본조사)<br />
						<!--  mng_e 20171030_김건민  -->
						<span style="color:#f63;">※</span> 산출식 : (12세 이상 통근통학인구 중 버스 및 전철, 지하철, 기차 이용자 수 / 12세 이상 인구) * 100
					</td>
				</tr>
<!-- 				<tr> -->
<!-- 					<td scope="row">대중교통 접근성</td> -->
<!-- 					<td>버스 정류장 수, 지하철 역 수</td> -->
<!-- 					<td>읍면동</td> -->
<!-- 					<td>국토교통부 버스정류장 위치 현황(2011년, 2016년)<br />지자체 지하철 현황(2015년)</td> -->
<!-- 					<td>일부지역의 경우 현재 버스 정류장 정보가 일치하지 않을 수 있으므로 유의하여 주시기 바랍니다.</td> -->
<!-- 					<td> -->
<!-- 						대중교통 접근성은 생활편의와 관련된 대중교통이 잘되어 있는 지역을 확인할 수 있는 지표로써 행정구역 내의 버스 정류장 수, 지하철 역 수를 보실 수 있습니다. -->
<!-- 						<br /><br /> -->

<!-- 						<span style="color:#f63;">※</span> 출처 : 국토교통부 버스정류장 위치현황(2011년, 2016년6월), 지자체 지하철 현황(2015년) -->
<!-- 					</td> -->
<!-- 				</tr> -->
			</tbody>
			<tbody data-id="HML0006" style="display:none;">
				<tr>
					<td scope="row">교원 1인당 학생 수 </td>
					<td>초중고대 교원 1인당 학생 수 </td>
					<td>시군구</td>
					<td>한국교육개발원 교육통계연구센터 <br />교원 1인당 학생 수 현황(2019년)</td>
					<td>-</td>
					<td>
						교원 1인당 학생 수는 초중고, 대학교 교원 1인당 학생 수를 확인할 수 있는 지표입니다. 초중고 교원 1인이 담당하는 학생 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 한국교육개발원 교육통계연구센터, 교원 1인당 학생 수 현황(2019년)
						<br />
						<span style="color:#f63;">※</span> 산출식 : 총 학생 수 / 교원 수
					</td>
				</tr>
				<tr>
					<td scope="row">고등교육기관 수</td>
					<td>전문대 이상 고등교육기관 수 </td>
					<td>시군구</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						고등교육기관은 전문대학교 이상의 교육기관으로 지역 내 고등교육기관 현황을 확인할 수 있는 지표입니다. 전문대 이상의 고등교육기관 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 고등교육기관 : 전문대, 대학, 일반 대학원
					</td>
				</tr>
				<tr>
					<td scope="row">학원 수</td>
					<td>학원 수</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						학원은 지역내 교육과 관련된 학원 현황을 확인할 수 있는 지표입니다. 행정구역 별 학원 수를 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 학원 : 교습학원, 어학원, 예체능학원, 컴퓨터학원
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0007" style="display:none;">
				<tr>
					<td scope="row">유치원 및 보육시설</td>
					<td>보육시설 기관 대비 5세 이하 인구</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 등록센서스(2020년)<br />통계청 전국사업체조사(2019년)</td>
					<td>수치가 낮을 수록 유아 인구 대비 지역 내 유치원 및 보육시설이 많음을 알 수 있습니다.</td>
					<td>
						유치원 및 보육시설은 지역별 유아에 대한 복지 수준을 확인할 수 있는 지표입니다.
						<br />
						5세 이하의 유아를 위한 교육시설을 의미하며, 유치원 및 보육시설 대비 5세 이하 인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년), 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : 5세 이하 인구 / 보육시설 및 유아교육 시설 수   
					</td>
				</tr>
				<tr>
					<td scope="row">병의원 및 약국</td>
					<td>병의원(종합병원) 및 의약품 판매업 대비 총 인구</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 등록센서스(2020년)<br />통계청 전국사업체조사(2019년)</td>
					<td>수치가 낮을 수록 인구 대비 지역 내 병의원 및 약국시설이 많음을 알 수 있습니다.</td>
					<td>
						병의원 및 약국은 편리한 삶과 관련된 복지시설 중 의료수준이 좋은 지역을 확인할 수 있는 지표입니다. 병의원, 약국 대비 인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />
						
						<span style="color:#f63;">※</span> 통계청 등록센서스(2020년), 통계청 전국사업체조사(2019년)
						<!--  mng_e 20180307_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : (총 인구 / (병원 수 + 약국 수))
					</td>
				</tr>
				<tr>
					<td scope="row">노인복지시설</td>
					<td>노인 복지시설 대비 65세 이상 노인 인구</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 등록센서스(2020년)<br />통계청 전국사업체조사(2019년)</td>
					<td>수치가 낮을 수록 노인 인구 대비 지역 내 노인복지시설이 많음을 알 수 있습니다.</td>
					<td>
						노인복지시설은 65세 이상 노인의 복지 수준을 고려하기 위한 지표입니다. 노인복지시설 대비 65세 이상 인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년), 통계청 전국사업체조사(2019년)
						<!--  mng_e 20171030_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : 65세 이상 인구 / 노인복지 시설운영업 사업체 수
					</td>
				</tr>
				<tr>
					<td scope="row">사회복지시설</td>
					<td>사회 복지시설 대비 총 인구</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 등록센서스(2020년)<br />통계청 전국사업체조사(2019년)</td>	
					<td>수치가 낮을 수록 인구 대비 지역 내 사회복지시설이 많음을 알 수 있습니다.</td>
					<td>
						사회복지시설은 지역별 사회복지 수준을 확인할 수 있는 지표입니다. 사회복지시설 대비 인구 비율을 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 등록센서스(2020년), 통계청 전국사업체조사(2019년)
						<!--  mng_e 20180307_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 산출식 : 총 인구 / 사회복지 서비스업 사업체 수
					</td>
				</tr>
				<tr>
					<td scope="row">문화시설 수</td>
					<td>문화 기반시설 수</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						문화시설은 지역별 문화시설 수준을 확인할 수 있는 지표입니다. 극장 영화관 등의 문화시설 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20180307_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 문화체육시설 : 극장, 영화관, 박물관, 사적지, 식물원, 동물원, 자연공원, 유원지, 테마파크
					</td>
				</tr>
				<tr>
					<td scope="row">체육시설 수</td>
					<td>체육 기반시설 수</td>
					<td>읍면동</td>
					<!--  mng_s 20180307_김건민  -->
					<td>통계청 전국사업체조사(2019년)</td>
					<td>-</td>
					<td>
						체육시설은 지역별 체육시설 수준을 확인할 수 있는 지표입니다. 체육공원 스포츠 서비스업 등의 체육시설 수를 행정구역 별로 보실 수 있습니다.
						<br /><br />

						<span style="color:#f63;">※</span> 출처 : 통계청 전국사업체조사(2019년)
						<!--  mng_e 20180307_김건민  -->
						<br />
						<span style="color:#f63;">※</span> 문화체육시설 : 체육공원, 스포츠 서비스업(헬스클럽, 수영장 등)
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="Blackbg">&nbsp;</div>
</div>
<script>
$("#help-indicator .Tab>li>a").click(function(){
	$("#help-indicator .Tab>li>a").removeClass("M_on");
	$(this).addClass("M_on");
	$("#help-indicator tbody").hide();
	$("#help-indicator tbody[data-id="+$(this).data("id")+"]").show();
	return false;
});
</script>