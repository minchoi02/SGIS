
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jsp/includes/taglib.jsp"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<title>SGIS plus mobile</title>
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
 -->
<meta id="_csrf" name="_csrf" content = "${_csrf.token} }"/>
<meta id="_csrf_header" name="_csrf_header" content = "${_csrf.headerName}"/>
  
<!--header 추가 시작 -->

<script src="${ctx }/resources/plugins/sop/mobile/sop-mobile.js"></script>
<script src="${ctx }/resources/plugins/durian-v2.0.js"></script>
<%-- <script src="${ctx }/resources/m2020/js/common/common.js"></script>
 --%>
<%-- <%@ include file="/WEB-INF/jsp/includes/includeHeaderFile.jsp" %>--%>
<%--  <%@include file="/WEB-INF/jsp/m2019/includes/includeHeaderFile.jsp" %> --%>
 <%@ include file="/WEB-INF/jsp/m2021/includes/includeMapHeader.jsp" %>

<link rel="stylesheet" href="${ctx }/resources/m2020/css/subpage.css" />
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />

<!--header 추가  끝-->
<%--  <script src="${ctx }/resources/m2021\js\catchmentArea\catchmentAreaMapAPI.js"></script>
 --%>
<script src="${ctx }/resources/m2021\js\catchmentArea\catchmentAreaMap.js"></script>
<script src="${ctx }/resources/plugins/colorpicker/js/jquery.wheelcolorpicker.js"></script>
<script src="${ctx }/resources/plugins/colorpicker/js/jquery.xcolor.js"></script>

<script> var contextPath = "/mobile"; var tilePath = "https://sgisapi.kostat.go.kr";</script>

<link rel="shortcut icon" href="${ctx }/resources/m2020/images/common/n_favicon.png"/>
<!-- 20210806 M -->
<link rel="stylesheet" href="${ctx }/resources/m2020/plugins/swiper.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/style.css" />
<link rel="stylesheet" href="${ctx }/resources/m2021/css/catchmentArea/map.css" />
<script src="${ctx }/resources/m2020/js/jquery-1.12.0.min.js"></script>
<script src="${ctx }/resources/m2020/plugins/Swiper-3.3.1/js/swiper.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2020/plugins/jquery.touchSwipe.min.js" type="text/javascript"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/common.js"></script>
<script src="${ctx }/resources/m2021/js/catchmentArea/map.js"></script>
<script src="${ctx }/resources/m2021/js/common/common.js"></script>
<!-- kakao api -->
<script src="${ctx }/resources/plugins/kakao_script_api.js"></script>
<script src="${ctx }/resources/m2020/plugins/swiper.min.js"></script>
</head>

<body>
   <!-- begin::wrap -->
	<div class="wrap">

      <!-- begin::header -->
      <div id="header">
         <header class="header">
            <!-- <div class="logo"><img src="./resources/m2021/images/logo.png" alt="SGIS plus 통계지리정보서비스"></div> -->
            <div class="logo"><p>생활권역 통계지도</p></div>
            <div>
               <!-- <a href="#n" class="btn-search"><img src="./resources/m2021/images/i_search.png" alt="검색"></a> -->
               <a href="#n" class="btn-menu"><img src="${ctx }/resources/m2021/images/i_menu.png" alt="메뉴"></a>
            </div>
         </header>
         <nav class="nav">
            <div class="bg-blue">
               <div class="d-flex justify-content-between align-items-center">
                  <div class="logo"><img src="${ctx }/resources/m2021/images/logo.png" alt="SGIS plus 통계지리정보서비스"></div>
                  <a href="#n" class="btn-close"><img src="${ctx }/resources/m2021/images/i_close.png" alt="닫기"></a>
               </div>
               <ul class="gnb">
                  <li>
                     <a href="#n">
                        <span>통계 주제도</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="통계 주제도"></span>
                     </a>
                     <ul class="sub-gnb">
                        <li><a href="#n">인구와 가구</a></li>
                        <li><a href="#n">주거와 교통</a></li>
                        <li><a href="#n">노동과 경제</a></li>
                        <li><a href="#n">환경과 안전</a></li>
                        <li><a href="#n">복지와 문화</a></li>
                        <li><a href="#n"></a></li>
                     </ul>
                  </li>
                  <li>
                     <a href="#n">
                        <span>내 주변 통계</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="내 주변 통계"></span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span>My 통계로</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="My 통계로"></span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span class="on">생활권역 통계지도</span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span class="on">총조사 시각화 지도</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="총조사 시각화 지도"></span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span class="on">행정통계 시각화 지도</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="행정통계 시각화 지도"></span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span>일자리 맵</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="일자리 맵"></span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span>지역 현안 소통 지도</span>
                     </a>
                  </li>
                  <li>
                     <a href="#n">
                        <span>살고 싶은 우리 동네</span>
                        <span><img src="${ctx }/resources/m2021/images/i_menu--arrow.png" alt="살고 싶은 우리 동네"></span>
                     </a>
                  </li>
               </ul>
            </div>
            <div class="search">
               <ul class="search__list">
                  <li><a href="#n">공지사항</a></li>
                  <li><a href="#n">용어설명</a></li>
                  <li><a href="#n">서비스소개</a></li>
               </ul>
               <div class="search__form">
                  <input type="text" class="form-input" placeholder="검색어 입력">
                  <button type="button" class="search__btn"><img src="${ctx }/resources/m2021/images/i_search--form.png" alt="검색"></button>
               </div>
            </div>
            <div class="info">
               <a href="#n">PC버전</a>
               <p>Copyright ⓒStatistics Korea. All Rights Reserved.</p>
            </div>
         </nav>
      </div>
      <!-- end::header -->

      <!-- begin::sub menu -->
      <div class="navi">
            <div class="d-flex align-items-center">
               <a href="#n" class="home"><img src="${ctx }/resources/m2021/images/i_home.png" alt="홈"></a>
               <div class="path">
                  <a href="#n">
                     <span>생활권역 통계지도</span>
                     <span><img src="${ctx }/resources/m2021/images/i_select--ui.png" alt="생활권역 통계지도"></span>
                  </a>
               </div>
            </div>
      </div>
      <!-- end::sub menu -->

      <!-- begin::main -->
      <div class="main">

         <!-- begin::container -->
         <div class="container">

            <!-- begin::MAP -->
            <div class="map">
               <div class="map__above d-flex justify-content-between align-items-center">
                  <p id = "currentMapMyLocation_name">대전광역시 서구 둔산동</p>
                  <div class="map__above__btn d-flex justify-content-between align-items-center">
                     <button type="button" class="btn__location" id = "catchmentareamyLocation"><img src="${ctx }/resources/m2021/images/map/i_map.png" alt="내 위치 찾기"></button>
                     <a href="#n" class="btn__option"><img src="${ctx }/resources/m2021/images/map/i_option.png" alt="조회"></a>
                  </div>
               </div>
               
               <div class = "mapArea" style=" position: fixed; top: 140px; width: 100%;">
			  		 <div id="map"></div>
			   </div>
               <div class="map__below" style = "height : 90px;"  >
                  <div>
                      <div class="d-flex justify-content-between align-items-end" style = "z-index : 400;">
                         <div class="map__spot">
                           <div class="map__spot__tooltip">
                              <span>버튼 클릭 후 지도에서 위치를 선택할 수 있어요.</span>
                              <button type="button" class="map__spot--close"><img src="${ctx }/resources/m2021/images/map/i_close--spot.png" alt="Close"></button>
                           </div>
                           <button type="button" class="btn__spot">지도에서 지점 선택</button>
                        </div>
                        <div class="map__zoom">
                           <button type="button" class="btn__zoom btn__zoom--in"><img src="${ctx }/resources/m2021/images/map/i_zoom--in.png" alt="Zoom In"></button>
                           <p>읍면동</p>
                           <button type="button" class="btn__zoom btn__zoom--out"><img src="${ctx }/resources/m2021/images/map/i_zoom--out.png" alt="Zoom Out"></button>
                        </div>
                      </div>
 					
                     <!-- s::하단 메뉴 -->
                     <!-- 1) -->
                     <div class="map__search" >
                        <div class="map__slideup">
                           <div>
                              <button type="button" class="btn-slideup"><span></span></button>
                           </div>
                           <!-- 1) -->
                           <p>지점 선택</p>
                           <h3>통계를 조회할 지점을 선택해 주세요.</h3>
                        </div>
                         <!-- s::검색결과 전 -->
                        <form action="">
                           <div class="map__form">
                              <div class="map__form__above">
                                 <div class="map__form__btn">
                                    <button type="button" class="on">검색</button>
                                    <button type="button">시설 유형 선택</button>
                                 </div>
                                 <p>
                                    현재 선택된 지도의 <span>시·군·구</span>에서만 조회됩니다.<br>
                                    시설명 또는 도로명주소를 입력해 주세요.
                                 </p>
                                 <input type="text" class="form-input" placeholder="검색어 입력(예. 통계청 또는 청사로 189)" title="검색어를 입력해주세요">
                                 <p class="notice"><img src="${ctx }/resources/m2021/images/i_notice--red.png" alt="검색어를 입력해주세요"> 검색어를 입력해 주세요.</p>
                              </div>
                              <div class="map__form__below">
                                 <p class="notice"><img src="${ctx }/resources/m2021/images/i_notice--gray.png" alt="데이터 출처 : 국가관심지점(국토교통부 국토정보플랫폼)"> 데이터 출처 : 국가관심지점(국토교통부 국토정보플랫폼)</p>
                                 <button type="button" class="map__form__search">검색</button>
                              </div>
                           </div>
                        </form>
                        <!-- e::검색결과 전 -->
                     </div>
                     <!-- e::하단 메뉴 -->
                  </div>
               </div>
            </div>
            <!-- end::MAP -->

         </div>   
         <!-- end::container -->
      </div>
      <!-- end::main -->

   </div>
   <!-- end::wrap -->

   <!-- s::fillter -->
   <div class="option">
      <form action="">
         <div class="option__wrap">
            <div class="option__header d-flex justify-content-between">
               <h3>생활권역 통계지도 조회 조건</h3>
               <a href="#n" class="map__option--close"><img src="${ctx }/resources/m2021/images/i_close--option.png" alt="Close"></a>
            </div>
            <div class="option__body">
               <div class="option__container">
                  <h4>광역시·도 선택</h4>
                  <div class="sido-group" id = "sido">
                     <button type="button" class="option__btn">서울특별시</button>
                     <button type="button"  class="option__btn">광주광역시</button>
                     <button type="button" class="option__btn">대구광역시</button>
                     <button type="button" class="option__btn">대전광역시</button>
                     <button type="button" class="option__btn">부산광역시</button>
                     <button type="button" class="option__btn">울산광역시</button>
                     <button type="button" class="option__btn">인천광역시</button>
                     <button type="button" class="option__btn">강원도</button>
                     <button type="button" class="option__btn">경기도</button>
                     <button type="button" class="option__btn">경상남도</button>
                     <button type="button" class="option__btn">경상북도</button>
                     <button type="button" class="option__btn">전라남도</button>
                     <button type="button" class="option__btn">전라북도</button>
                     <button type="button" class="option__btn">충청남도</button>
                     <button type="button" class="option__btn">충청북도</button>
                     <button type="button" class="option__btn">세종특별자치시</button>
                     <button type="button" class="option__btn">제주특별자치도</button>
                  </div>
               </div>
               <div class="option__container btn-group2">
                  <h4>시·군·구 선택</h4>
                  <div class="option__content d-flex justify-content-start">
                     <button type="button" class="option__btn">대덕구</button>
                     <button type="button" class="option__btn">동구</button>
                     <button type="button" class="option__btn">서구</button>
                     <button type="button" class="option__btn">유성구</button>
                     <button type="button" class="option__btn">중구</button>
                     <button type="button" class="option__btn">네글자구</button>
                  </div>
               </div>
               <div class="option__container">
                  <h4>읍·면·동 선택</h4>
                  <div class="option__content">
                     <select name="" id="" class="form-select">
                        <option value="">읍·면·동 선택</option>
                     </select>
                     <p class="my-5px">광역시·도와 시·군·구까지는 필수 선택이며, 읍·면·동은 필요하신 경우에만 선택해 주세요.</p>
                  </div>
               </div>
               <p class="option__text">
                  <img src="${ctx }/resources/m2021/images/map/img_info.png" alt="생활권역 통계지도 유의 사항">
                  생활권역 통계지도 유의 사항
               </p>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel">초기화</button>
               <button type="button" class="btn btn__submit" >적용</button>
            </div>
         </div>
      </form>
   </div>
   <!-- e::fillter -->

   <!-- begin::MODAL -->
      <!-- s::위치 정보 동의 -->
      <div class="modal location__agree">
         <div class="modal__header">
            <h3 class="modal__tit">위치정보 조회 허용</h3>
         </div>
         <div class="modal__body">
            <img src="${ctx }/resources/m2021/images/map/img_location.png" alt="‘생활권역 통계지도’는 도로 정보를 활용한 생활권역의 통계자료를 제공하는 서비스입니다. ">
            <p>
               ‘생활권역 통계지도’는 도로 정보를 활용한<br>
               생활권역의 통계자료를 제공하는 서비스입니다. 
            </p>
            <p>
               현재 위치에서 생활권역 통계지도를<br>
               확인하고자 하시는 경우<br>
               <b>내 위치 조회</b>를 허용해 주세요.
               <span>(허용 시 SGIS플러스 모바일 전체 적용)</span>
            </p>
         </div>
         <div class="btn__wrap d-flex justify-content-between">
            <button type="button" class="btn btn__cancel" id = "mylocationcancel">취소</button>
            <button type="button" class="btn btn__submit" id = "mylocationaccept" >허용</button>
         </div>
      </div>
      <!-- e::위치 정보 동의 -->
      <!-- s::지도에서 지점 선택 -->
      <div class="modal point__select">
         <form action="">
            <div class="modal__header">
               <h3 class="modal__tit">지점 선택</h3>
            </div>
            <div class="modal__body">
               <p>생활권역 통계정보를 조회할 지점의 주소 또는 시설을 선택해 주십시오.</p>
               <div class="point__con point__address">
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" id="radio01" name="radio" title="주소를 선택해주세요">
                     <label for="radio01">
                        <span></span>
                        <p>주소 선택</p>
                     </label>
                  </div>
                  <dl>
                     <dt>도로명</dt>
                     <dd>서울특별시 구로구 구로동로 148</dd>
                  </dl>
                  <dl>
                     <dt>지번</dt>
                     <dd>서울특별시 구로구 구로동 80</dd>
                  </dl>
               </div>
               <div class="point__con point__facility">
                  <div class="point__radio d-flex">
                     <input type="radio" class="form-radio" id="radio02" name="radio" title="시설을 선택해주세요">
                     <label for="radio02">
                        <span></span>
                        <p>시설 선택</p>
                     </label>
                  </div>
                  <ul class="point__list">
                     <li><a href="#n">서울연희미용고등학교</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                     <li><a href="#n">검색된 시설이 없습니다.</a></li>
                  </ul>
               </div>
            </div>
            <div class="btn__wrap d-flex justify-content-between">
               <button type="button" class="btn btn__cancel">취소</button>
               <button type="button" class="btn btn__submit">허용</button>
            </div>
         </form>
      </div>
      <!-- e::지도에서 지점 선택 -->
   <!-- end::MODAL -->
</body>
</html>