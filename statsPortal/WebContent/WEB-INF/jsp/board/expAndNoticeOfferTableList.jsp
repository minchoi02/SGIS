<%
/**************************************************************************************************************************
* Program Name  : 설명과 공지 상세화면 JSP  
* File Name     : qnaAndRequest.jsp
* Comment       : 
* History       : 네이버시스템 이동형 2015-10-27
*
**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
    <head>
		<meta charset="utf-8">
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		
		<script src="/js/common/includeHead.js"></script>
		<script src="/js/common/common.js"></script>

		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/common.css">
		<!--알림마당 컨텐츠 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/contents.css">
		<!--게시판 css 추가-->
		<link rel="stylesheet" type="text/css" href="/publish_2018/include/css/board.css">
		<script src='/js/plugins/jquery.form.js'></script>
		<script src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
		
		<script src="/js/board/jquery.paging.js"></script>
		<script src="/js/board/holder.js"></script>
		<script src='/js/plugins/ckeditor/ckeditor.js'></script>
		<script src='/js/plugins/google_recaptcha.js'></script>
		
		<title>알림마당|통계지리정보서비스</title>
		
		<script>
			var menuType = 'table';
		</script>
		
		<script type="text/javascript">
	        $(document).ready(function(){
	        	srvLogWrite('A0', '14', '02', '03', '', '');
	        });
	    </script> 
    </head>
    <body>
        <div id="wrap">
            <!-- header // -->
			<header>
				<!-- Top Include -->
				<jsp:include page="/view/common/includeSearch"></jsp:include>
			</header>
			
			<!--contents-->
			<div id="container" class="sub">
				<%@include file="/jsp/board/includeLeftMenu.jsp" %>
				<div id="content">
					<div id="title-area">
						<ul class="location">
						<!-- 190314 방민정 수정 시작 -->
							<li><a href="/view/view/index"><img src="/images/common/location_home.gif"/></a></li>
							<li><a href="/view/board/sopBoardMain">알림마당</a></li>
							<li><a href="/view/board/expAndNotice">자료 시점 현황</a></li>
							<li><a href="/view/board/expAndNoticeOfferTableList"><em>SGIS플러스 서비스 자료 시점 현황</em></a></li>
						<!-- 190314 방민정 수정 끝 -->
						</ul>
						<h1 class="sub-title">SGIS플러스 서비스 자료 시점 현황</h1>
						<p align="right" class="required" style="font-weight: bolder">('21.10. 현재)</p>
					</div>
					<div id="contents" class="view" style="width : 100%;">
						<!--board 시작-->
						<div id="board-type">
							<!-- board list -->
							<div id="board-thema" class="list mt57" style="margin-top : -0.1%;">
								<div id="offer-status-list">
									<table class="board-list" >
										<caption>SGIS플러스 서비스 자료 시점현황</caption>
										<colgroup>
											<col style="width:55px">
											<col style="width:175px">
											<col style="width:110px" >
											<col style="width:140px">
											<col style="width:110px">
											<col style="width:210px">
										</colgroup>
										<thead>
											<tr>
												<th>번호</th>
												<th>자료명</th>
												<th>산출자료 시점</th>
												<th>업데이트 주기</th>
												<th>원데이터 출처</th>
												<th>비 고<br/>(활용 서비스)</th>
											</tr>
										</thead>
										<tbody>
												<tr>
		<td>1</td>
		<td>행정구역경계(시도)
		</td>
		<td rowspan="4">2021.6.</td>
		<td rowspan="4">연간</td>
		<td rowspan="4">통계청</td>
		<td rowspan="4">공통 활용</td>
	</tr>
	<tr>
		<td>2</td>
		<td>행정구역경계(시군구)
		</td>
	</tr>
	<tr>
		<td>3</td>
		<td>행정구역경계(읍면동)
		</td>
	</tr>
	<tr>
		<td>4</td>
		<td>행정구역경계(집계구)</td>
	</tr>
	<tr>
		<td>5</td>
		<td>인구주택총조사결과(등록센서스)
		</td>
		<td>2020.11.</td>
		<td>연간</td>
		<td rowspan="4">통계청</td>
		<td rowspan="4">공통 활용</td>
	</tr>
	<tr>
		<td>6</td>
		<td>인구주택총조사결과(표본항목)
		</td>
		<td>2015.11.1.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>7</td>
		<td>전국사업체조사결과</td>
		<td>2019.12.31.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>8</td>
		<td>농림어업총조사결과</td>
		<td>2020.12.</td>
		<td>연간</td>
	</tr>
	<tr>
		<td>9</td>
		<td>주택실거래가</td>
		<td>2020.1.1.～<br/>2020.12.31.</td>
		<td>연간</td>
		<td>국토교통부</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>10</td>
		<td>공시지가</td>
		<td>2020</td>
		<td>연간</td>
		<td>국토교통부</td>
		<td>살고싶은 우리동네,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>11</td>
		<td>버스정류장 위치 정보</td>
		<td>2021.7.</td>
		<td>연간</td>
		<td>교통안전공단</td>
		<td rowspan="2">대화형 통계지도,<br/>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>12</td>
		<td>지하철 승하차 현황</td>
		<td>2020.1.1.～<br/>2020.12.31.</td>
		<td>연간</td>
		<td>철도 노선별<br/>관리 기관</td>
	</tr>
	<tr>
		<td>13</td>
		<td>상권정보</td>
		<td>2015년</td>
		<td>미정</td>
		<td>중소벤처기업부</td>
		<td>우리동네 생활업종</td>
	</tr>
	<tr>
		<td>14</td>
		<td>대기오염도</td>
		<td>2019.1.～<br/>2019.12.</td>
		<td>연간</td>
		<td>국립환경과학원</td>
		<td>살고싶은 우리 동네,<br/>통계주제도</td>
	</tr>
	<tr>
		<td>15</td>
		<td>화재안전지수(등급)</td>
		<td>2020년</td>
		<td rowspan="2">연간</td>
		<td rowspan="2">행정안전부</td>
		<td rowspan="6">살고싶은 우리동네</td>
	</tr>
	<tr>
		<td>16</td>
		<td>교통안전지수(등급)</td>
		<td>2019년</td>	
	</tr>
	<tr>
		<td>17</td>
		<td>녹지비율</td>
		<td>2020.02.</td>
		<td>'20년 공표예정</td>
		<td>환경부</td>
	</tr>
	<tr>
		<td>18</td>
		<td>학 구 도<br/>(교원1인당학생수)</td>
		<td>2019.9.</td>
		<td>반기</td>
		<td>교육시설환경<br/>연구센터</td>
	</tr>
	<tr>
		<td>19</td>
		<td>체감온도</td>
		<td>2018.11.1.～<br/>2019.3.31.</td>
		<td rowspan="2">연간</td>
		<td rowspan="2">기상청</td>
	</tr>
	<tr>
		<td>20</td>
		<td>불쾌지수</td>
		<td>2019.6.1.～<br/>2019.9.30.</td>
	</tr>
	<!-- mng_s 20200925 김건민 정보 추가 -->
	<tr>
		<td>21</td>
		<td>학교 기본정보</td>
		<td>2020</td>
		<td>연간</td>
		<td>학교알리미</td>
		<td>살고싶은 우리동네</td>
	</tr>
	<tr>
		<td>22</td>
		<td>아파트 관리비정보</td>
		<td>2019</td>
		<td>연간</td>
		<td>국토교통부</td>
		<td>살고싶은 우리동네</td>
	</tr>
	<!-- mng_e 20200925 김건민 -->
	<tr>
		<td>23</td>
		<td>교통사고</td>
		<td>2019년</td>
		<td rowspan="3">연간</td>
		<td>도로교통공단</td>
		<td rowspan="3">통계주제도</td>
		
	</tr>
	<tr>
		<td>24</td>
		<td>기초생활수급자</td>
		<td>2019.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>25</td>
		<td>문화재분포현황</td>
		<td>2020.12.</td>
		<td>문화재청</td>
	</tr>
	<tr>
		<td>26</td>
		<td>주민등록인구</td>
		<td>2020.12.</td>
		<td>연간</td>
		<td>행정안전부</td>
		<td>살고싶은 우리동네,<br/>통계주제도</td>
	</tr>
	<tr>
		<td>27</td>
		<td>인구이동통계</td>
		<td>2020.12.</td>
		<td rowspan="2">연간</td>
		<td>통계청</td>
		<td rowspan="29">통계주제도</td>
	</tr>
	<tr>
		<td>28</td>
		<td>시군구별 외국인<br/>주민 현황</td>
		<td>2020.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>29</td>
		<td>자동차 등록대수</td>
		<td>2019.12.</td>
		<td rowspan="30">연간</td>
		<td>국토교통부</td>
	</tr>
	<tr>
		<td>30</td>
		<td>주택의 매매가격 상승률</td>
		<td>2018.12.</td>
		<td>한국감정원</td>
		
	</tr>
	<tr>
		<td>31</td>
		<td>의료기관 병상수, 의사수</td>
		<td>2019.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>32</td>
		<td>65세 이상 장기요양<br/>급여자 현황</td>
		<td>2019.12.</td>
		<td>국민건강관리<br>공단</td>		
	</tr>
	<tr>
		<td>33</td>
		<td>등록 장애인수</td>
		<td>2020.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>34</td>
		<td>장애인 고용률</td>
		<td>2017.12.</td>
		<td>한국장애인고용<br>공단</td>
	</tr>
	<tr>
		<td>35</td>
		<td>평생교육기관</td>
		<td>2020.12.</td>
		<td>한국교육개발원</td>
	</tr>
	<tr>
		<td>36</td>
		<td>도서관 분포현황</td>
		<td>2020.12.</td>
		<td>문화체육관광부</td>
	</tr>
	<tr>
		<td>37</td>
		<td>교원 1인당 학생수</td>
		<td>2020.12.</td>
		<td>한국교육개발원</td>
	</tr>
	<tr>
		<td>38</td>
		<td>EQ-5D 지표</td>
		<td>2019.12.</td>
		<td rowspan="2">보건복지부</td>
	</tr>
	<tr>
		<td>39</td>
		<td>어린이집/직장어린이집<br/>현황</td>
		<td>2020.12.</td>
	</tr>
	<tr>
		<td>40</td>
		<td>요양기관수 현황</td>
		<td>2020.12.</td>
		<td>국민건강보험<br/>공단</td>
	</tr>
	<tr>
		<td>41</td>
		<td>인구천명당 사설학원 수</td>
		<td>2020.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>42</td>
		<td>취업자 수</td>
		<td>2020.12.</td>
		<td rowspan="3">통계청</td>
	</tr>
	<tr>
		<td>43</td>
		<td>고용률</td>
		<td>2020.12.</td>
	</tr>
	<tr>
		<td>44</td>
		<td>실업률</td>
		<td>2020.12.</td>
	</tr>
	<tr>
		<td>45</td>
		<td>재정자립도 현황</td>
		<td>2020.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>46</td>
		<td>폐기물 배출량</td>
		<td>2018.12.</td>
		<td>통계청(e지방)</td>
	</tr>
	<tr>
		<td>47</td>
		<td>화재사고 발생건수</td>
		<td>2020.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>48</td>
		<td>범죄 발생건수</td>
		<td>2020.12.</td>
		<td>경찰청</td>
	</tr>
	<tr>
		<td>49</td>
		<td>음주율, 흡연율</td>
		<td>2020.12.</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>50</td>
		<td>화학물질 배출량</td>
		<td>2018.12.</td>
		<td>환경부</td>
		
	</tr>
	<tr>
		<td>51</td>
		<td>119안전센터 1개당<br/>담당주민 수</td>
		<td>2019.12.</td>
		<td>행정안전부</td>
	</tr>
	<tr>
		<td>52</td>
		<td>재배면적 변화</td>
		<td>2021.</td>
		<td>통계청</td>
		
	</tr>
	<tr>
		<td>53</td>
		<td>지진발생 분포지역</td>
		<td rowspan="3">2019.08.</td>
		<td>기상청</td>
	</tr>
	<tr>
		<td>54</td>
		<td>미세먼지대기오염도</td>
		<td rowspan="2">국립환경과학원</td>
	</tr>
	<tr>
		<td>55</td>
		<td>일산화탄소대기오염도</td>
	</tr>
	<tr>
		<td>57</td>
		<td>귀농어귀촌인통계</td>
		<td>2020.11.</td>
		<td>연간</td>
		<td>통계청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>58</td>
		<td>소방관서 접근현황</td>
		<td>2020.8.</td>
		<td>연간</td>
		<td>소방청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>59</td>
		<td>생활안전사고 출동건수</td>
		<td>2020.12.</td>
		<td>연간</td>
		<td>소방청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>60</td>
		<td>무더위쉼터현황</td>
		<td>2021.7.</td>
		<td>연간</td>
		<td>행정안전부</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>61</td>
		<td>응급의료시설현황</td>
		<td>2020.8.</td>
		<td>연간</td>
		<td>보건복지부</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>62</td>
		<td>개인 카드<br>사용금액현황</td>
		<td>2021.09</td>
		<td>분기</td>
		<td>통계청,KCB</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>63</td>
		<td>전통시장현황</td>
		<td>2019.11.</td>
		<td>연간</td>
		<td>소상공인시장<br>진흥공단</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>64</td>
		<td>경찰관서 접근 현황</td>
		<td>2020.8.</td>
		<td>연간</td>
		<td>경찰청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>65</td>
		<td>전기차 충전소 현황</td>
		<td>2020.9.</td>
		<td>연간</td>
		<td>한국환경공단</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>66</td>
		<td>고용동향</td>
		<td rowspan="3">매월</td>
		<td rowspan="3">매월</td>
		<td rowspan="3">통계청</td>
		<td rowspan="3">분석지도</td>
	</tr>
	<tr>
		<td>67</td>
		<td>산업활동동향</td>
	</tr>
	<tr>
		<td>68</td>
		<td>소비자물가동향</td>
	</tr>
	<tr>
		<td rowspan="2">69</td>
		<td rowspan="2">인구동향</td>
		<td>매월</td>
		<td>매월</td>
		<td rowspan="2">통계청</td>
		<td>분석지도</td>
	</tr>
	<tr>
		<td>2019.12.</td>
		<td style="display:none"></td>
		<td>연간</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>70</td>
		<td>어린이집 분포 현황</td>
		<td>2020.12.</td>
		<td>연간</td>
		<td>보건복지부</td>
		<td>정책통계지도<br/>(‘19년 5월 업데이트)</td>
	</tr>
	<tr>
		<td>71</td>
		<td>민방위대피시설 분포 현황</td>
		<td>2020.</td>
		<td>미정</td>
		<td>행정안전부</td>
		<td rowspan="11">정책통계지도<br/>(‘19년 10월 업데이트)</td>
	</tr>
	<tr>
		<td>72</td>
		<td>어린이보호구역 분포 현황</td>
		<td>2019.12.</td>
		<td>연간</td>
		<td>경찰청<br/></td>
	</tr>
	<tr>
		<td>73</td>
		<td>도서관 운영 현황</td>
		<td  rowspan="8">2020</td>
		<td rowspan="8">비정기</td>
		<td  rowspan="8">지자체,<br/>공공데이터포털</td>
	</tr>
	<tr>
		<td>74</td>
		<td>도서관별 도서보유 현황</td>
	</tr>
	<tr>
		<td>75</td>
		<td>자전거보관소 분포현황</td>
	</tr>
	<tr>
		<td>76</td>
		<td>공공자전거 분포 현황</td>

	</tr>
	<tr>
		<td>77</td>
		<td>박물관미술관 분포현황</td>
	</tr>
	<tr>
		<td>78</td>
		<td>도시공원 분포 현황</td>
	</tr>
	<tr>
		<td>79</td>
		<td>무인민원발급기 설치 현황</td>
	</tr>
	<tr>
		<td>80</td>
		<td>CCTV 분포현황</td>
	</tr>
	<tr>
		<td>81</td>
		<td>재해위험지구 분포현황</td>
		<td>2021.6.30</td>
		<td>연간</td>
		<td>행정안전부<br/>국민재난안전포털</td>
	</tr>
	<tr>
		<td>82</td>
		<td>장래인구추계</td>
		<td>2020.11.</td>
		<td>1년</td>
		<td>통계청</td>
		<td>인구피라미드</td>
	</tr>
	<tr>
		<td>83</td>
		<td>지역간 고령화현황</td>
		<td>2020.11.</td>
		<td rowspan="6">1년</td>
		<td rowspan="6">통계청</td>
		<td rowspan="8">고령화 현황보기</td>
	</tr>
	<tr>
		<td>84</td>
		<td>거처의 종류별 가구</td>
		<td>2020.11.</td>
	</tr>
	<tr>
		<td>85</td>
		<td>국민기초 일반 수급자수</td>
		<td>2020</td>
	</tr>
	<tr>
		<td>86</td>
		<td>생활비 마련방법</td>
		<td>2019.12.</td>
	</tr>
	<tr>
		<td>87</td>
		<td>산업별 종사현황</td>
		<td>2015.11.1.</td>
	</tr>
	<tr>
		<td>88</td>
		<td>복지시설 위치</td>
		<td>2019.12.</td>
	</tr>
	<tr>
		<td>89</td>
		<td>노인 주거 복지시설<br/>노인 의료 복지시설<br/>노인 여가 복지시설<br/>재가 노인 복지시설</td>
		<td>2020.06.</td>
		<td>1년</td>
		<td>보건복지부</td>
	</tr>
	<tr>
		<td>90</td>
		<td>향후 자녀와 동거의향</td>
		<td>2017.12.</td>
		<td>1년</td>
		<td>통계청</td>
	</tr>
	<tr>
		<td>91</td>
		<td>인구/가구/사회/주택/종교/<br>사업체 비율</td>
		<td>2018.12.</td>
		<td>1년, 5년, 15년</td>
		<td>통계청</td>
		<td>지방의 변화보기</td>
	</tr>
	<tr>
		<td>92</td>
		<td>성씨 및 본관 인구</td>
		<td>2015.12.</td>
		<td>15년</td>
		<td>통계청</td>
		<td>성씨분포</td>
	</tr>
	<tr>
		<td>93</td>
		<td>지자체인허가통계</td>
		<td>2021</td>
		<td>분기</td>
		<td>한국지역정보<br>개발원</td>
		<td>우리동네생활업종</td>
	</tr>
	<tr>
		<td>94</td>
		<td>코로나19 발생 현황</td>
		<td>매일</td>
		<td>매일</td>
		<td>질병관리청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>95</td>
		<td>지역별 암발생 현황</td>
		<td>2019.11.</td>
		<td>1년</td>
		<td>국민건강보험<br/>공단</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>96</td>
		<td>지역별 감염병 발생 현황</td>
		<td>2020.7.</td>
		<td>1년</td>
		<td>질병관리청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>97</td>
		<td>지역별 기온 및 강수량  현황</td>
		<td>2019.6.</td>
		<td>1년</td>
		<td>기상청</td>
		<td>통계주제도</td>
	</tr>
	<tr>
		<td>98</td>
		<td>공영자전거 운영 현황</td>
		<td>2019.10.</td>
		<td>1년</td>
		<td>행정안전부</td>
		<td>통계주제도</td>
	</tr>
										</tbody>
									</table>
								</div>
							</div>
							<!-- //board list끝 -->
						</div>
						<!--//board  끝-->
					</div>
				</div>
			</div>
			<!--//contents-->
            <!-- footer// -->
		    <footer id="footer">
		    	<!-- Bottom Include -->
				<jsp:include page="/view/common/includeBottom"></jsp:include>
		    </footer>
        </div>
    </body>
</html>