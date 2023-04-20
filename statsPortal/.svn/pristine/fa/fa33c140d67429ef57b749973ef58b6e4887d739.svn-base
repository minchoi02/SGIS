<!-- 2017.12.12 [개발팀] 접근성 시정조치 - 불필요한 태그 삭제 -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<script src='/js/plugins/jquery.form.js'></script> <!-- 2017.12.12 [개발팀] 접근성 조치  -->


    <%   
		response.setHeader("Cache-Control","no-store");   
		response.setHeader("Pragma","no-cache");   
		response.setDateHeader("Expires",0);   
		if (request.getProtocol().equals("HTTP/1.1")) response.setHeader("Cache-Control", "no-cache");
		
		String ss_school_grade = session.getAttribute("ss_school_grade")==null?"":(String)session.getAttribute("ss_school_grade"); //mng_s 20210802
		String ss_grant_state  = session.getAttribute("ss_grant_state")==null?"":(String)session.getAttribute("ss_grant_state"); //mng_s 20210802
		String ss_page_info    = session.getAttribute("ss_page_info")==null?"":(String)session.getAttribute("ss_page_info"); //mng_s 20210802
		String ss_member_id    = session.getAttribute("member_id")==null?"":(String)session.getAttribute("member_id");
		
		String param_ss_school_grade = request.getParameter("param_ss_school_grade")==null? "E":request.getParameter("param_ss_school_grade"); //파라미터가 널일 경우 초등(E)를 디폴트로 세팅한다. 그렇지 않으면 쿼리에서 문제가 생김 
		session.setAttribute("ss_school_grade", param_ss_school_grade);//세션방식에서 파라미터로 변경
		ss_school_grade = param_ss_school_grade; //세션방식에서 파라미터로 변경
	%>
	
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8" />
	<meta name="format-detection" content="telephone=no" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<title>SGIS 에듀</title>
	
	<link rel="stylesheet" href="/sgis_edu/resource/css/base_gallery.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/common.css">
    <link rel="stylesheet" href="/sgis_edu/resource/css/teach.css">
    
    <link rel="shortcut icon" href="/sgis_edu/resource/images/favicon.ico">
	<script type="text/javascript" src="/sgis_edu/resource/js/common.js?ver=123"></script>
	
	<%
		String style_sg = "";
		if("E".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		} else if ("M".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/mid.css\">";
		} else if ("H".equals(ss_school_grade)) {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/high.css\">";
		} else {
			style_sg = "<link rel=\"stylesheet\" href=\"/sgis_edu/resource/css/ele.css\">";
		}
	%>
	<%= style_sg %>
	
	
	<script type="text/javascript">
		function hideDialogDivShowList() {
			$("#dialogDiv").hide();
			$("#resultGalleryList").show();

		}
		
	</script>
</head>
<script type="text/javascript" src="/js/edu_gallery/galleryAdd.js"></script>
<script type="text/javascript" src="/js/edu_gallery/galleryEtc.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="/sample2/include/css/edu_gallery_pop.css" /> -->



<body>

	<div class="sub write">
        <div class="lnb">
            <h2 class="menuTi"><a onclick="javascript:hideDialogDivShowList();" >가르치는 지도</a></h2>
            
            <h3 class="lnbTi">교안 만들기</h3>
        </div>
        <main>
            <section class="flexWrap">
              <form id="gallerySaveForm" method="post" enctype="multipart/form-data">
            
                <article class="mapWrap" id="mapArea" >
                    <!-- 파일 첨부 후 removeClass on -->
                    <div class="btnWrap btnAtchWrap on" id="div_image_add_btn">
                        <button type="button" onclick="$galleryAdd.selectBookMarkList();" class="btn fromSgis">SGIS에서 파일 불러오기</button>
                        <button type="button" class="btn fromPc" onclick="fileEvent('#imgFile')">내 컴퓨터에서 파일 불러오기</button>
                        <span id="viewText"></span>
						<span id="preViewImage" style="display:none;"><img id="target" src="#" width="260px" height="150px" /></span>
						<input type="file" name="preView" class="hidden" id="imgFile" onchange="$galleryAdd.imageUploadAndEdit();" />
                    </div>
                    
                    <div class="map" style="text-align:center;" id="div_mapImage">
                        <img id="mapImage" style="text-align:center;max-width:100%;max-height:100%;" />
                    </div>
                    
                    
                    <div class="gcSlideArea" id="gcSlideArea" style="display:none;"></div>
                    <div class="gicobox" style="display:none;">
						<div class="ico" >
							<p>아이콘</p>
							<ul>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico01.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico02.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico03.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico04.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico05.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico06.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico07.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico08.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico09.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico10.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico11.png" /></a></li>
								<li><a><img class="imgIcon" src="/img/ico/ico_gico12.png" /></a></li>
							</ul>
						</div>
						<div class="talkArea">
							<p>말풍선</p>
							<ul>	
								<li><a><img class="imgTextArea" src="/img/ico/ico_mal01.png" /></a></li>
								<li><a><img class="imgTextArea" src="/img/ico/ico_mal02.png" /></a></li>
							</ul>
						</div>
					</div>

                    <!-- 파일 첨부 후 addClass on -->
                    <div class="editWrap " id="div_sticker">
                        <button type="button" class="refresh" onClick="$galleryAdd.removeIconAll();">새로고침</button>
                        <span>지도 위에 아이콘을 드래그하세요</span>
                        <span id="iconList">
                        <a style="margin-left: 35px;"><img class="imgIcon" src="/sgis_edu/resource/images/icon_stk01.png" style="opacity: .5;" /></a>
                        <a style="margin-left: 35px;"><img class="imgIcon" src="/sgis_edu/resource/images/icon_stk02.png" style="opacity: .5;" /></a>
                        </span>
                        <a  id="talkAreaList" style="margin-left: 35px;"><img class="imgTextArea" src="/sgis_edu/resource/images/icon_stk03.png" style="opacity: .5;" /></a>
                    </div>

                    <!-- 파일 첨부 후 addClass on -->
                    <!-- 
                    <div class="map">
                        <img src="../resource/images/img_teachTest.png">
                        <div class="stk stk01" style="top:10%; left:50%"> <button type="button" class="btn btnDel">삭제</button></div>
                        <div class="stk stk02" style="top:20%; left:50%"> <button type="button" class="btn btnDel">삭제</button></div>
                        <div class="stk stk03" style="top:50%; left:50%">
                            <textarea rows="8" maxlength="90" placeholder="메모를 입력하세요."></textarea>
                            <button type="button" class="btn btnDel">삭제</button>
                        </div>
                    </div>
                     -->
                </article>
                
                <article>
                    
                        <fieldset>
                            <ul>
                                <li>
                                    <label class="formTi">타이틀</label>
                                    <input type="text" id="gallery_title" name="title" maxlength="100" placeholder="타이틀을 입력하세요."> 
                                </li>
                                <li>
                                    <label class="formTi">설명</label>
                                    <textarea rows="10" id="applicationContent" name="applicationContent" placeholder="설명을 입력하세요."></textarea>
                                </li>
                                <li>
                                    <label class="formTi">해쉬태그</label>
                                    <!-- <input type="text" id="hashTag" placeholder="해쉬태그를 입력하세요."> -->
                                    <input type="text" id="kwrd" placeholder="해쉬태그를 입력하세요."> 
                                </li>
                                <li>
                                    <label class="formTi">비밀번호 <i>댓글작성을 위한 비밀번호</i></label>
                                    <input type="password" id="teach_pwd" placeholder="4자 (숫자,영문 가능)"> 
                                </li>
                                <li>
                                    <label class="formTi">공개여부</label>
                                    <input type="radio" value="Y" class="radio" name="private" id="yes" checked><label for="yes">공개</label>
                                    <input type="radio" value="N" class="radio" name="private" id="no" ><label for="no">비공개</label>
                                </li>
                            </ul>
                        </fieldset>
                    
                </article>
                
              
                
            </section>
            <div class="btnRight">
                <button type="button" onclick="$galleryAdd.gallerySaveForm2()" class="btn btnN01">미리보기</button>
                <button type="button" class="btn btnN02" onclick="$galleryAdd.gallerySaveForm()">저장하기</button>
                <!-- <a href="javascript:void(0)" class="btnGtype on" onclick="$galleryAdd.gallerySaveForm()">교안 생성하기</a> -->
            </div>
        </main>
    </div>
	
	</form>



    <div class="popup imgAtch" id="gallery_bookmark_pop">
        <section>
            <article>
                <em class="popTi">교안 이미지 등록</em>
                <div class="row">
                    <i class="txt">SGIS 나의 갤러리에 등록한  이미지를  첨부하는 서비스입니다.<br/>
                        여러 장이 등록된 갤러리의 경우 첫 번째 이미지만 불러옵니다.
                    </i>
                </div>
            </article>
            <article>
                <em>갤러리 목록</em>
                <div class="tbl">
                    <table id="bookMarkList2">
                        <colgroup>
                            <col width="15%">
                            <col width="">
                            <col width="18%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>이미지</th>
                            <th>갤러리명</th>
                            <th>날짜</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr class="on"> <!-- 선택시 on 클래스 -->
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                            <tr>
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                            <tr>
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
            <article>
                <div class="row">
                    <em>즐겨찾기 목록</em>
                    <button type="button" class="btn btnS02 btnArr"><a href="/view/gallery/resultGallery">갤러리 바로가기</a></button>
                </div>
                <div class="tbl">
                    <table id="bookMarkList">
                        <colgroup>
                            <col width="15%">
                            <col width="">
                            <col width="18%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>이미지</th>
                                <th>즐겨찾기명</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                            <tr>
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                            <tr>
                                <td><div class="imgWrap"><img src=""></div></td>
                                <td class="title">노령화 지수</td>
                                <td class="date">2020.06.30</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </article>
            <div class="btnWrap">
                <button type="button" class="btn btnN01 close">취소</button>
                <button type="button" class="btn btnN02" id="reg_chosen_img">선택한 이미지 등록하기</button>
            </div>
            <button type="button" class="btn btnClose close">닫기</button>
        </section>
    </div>


	<!-- 미리보기 팝업 -->
	<div class="popup preview" id="preview_popup" style="z-index:20005;">
		<!-- 
        <section class="sub view private">
            <div class="lnb">
                <h2 class="menuTi"><a">가르치는 지도</a></h2>
                <h3 class="lnbTi">우리나라 인구변화를 알아보자!</h3>
                <p>우리나라는 ‘50년대 후반부터 인구가 급격히 늘어났으며 최근에는 성장률이 감소하고 있다. 특히 최근 저출산과 고령화로 인구 구성에 큰 변화를 겪고 있다. 우리나라 인구구성의 변화를 인구피라미드로 알아보자.</p>
                <div class="hashTagWrap">
                    <i class="hashTag">인구변화</i>
                    <i class="hashTag">인구변화</i>
                    <i class="hashTag">인구변화</i>
                    <i class="hashTag">인구변화</i>
                    <i class="hashTag">인구변화</i>
                    <i class="hashTag">인구변화</i>
                </div>
            </div>
            <main>
                <section class="flexWrap">
                    <article class="mapWrap">
                        <div class="map">
                            <img src="./resource/images/img_teachTest.png">
                            <div class="stk stk01" style="top:10%; left:50%"></div>
                            <div class="stk stk02" style="top:20%; left:50%"></div>
                            <div class="stk stk03" style="top:50%; left:50%">
                                <p>입력한 메모가 출력되는 곳입니다.</p>
                            </div>
                            <button class="btn cmntBtn">댓글보기 <span>0</span></button>
                        </div>
                    </article>
                </section>
            </main>
            <button type="button" class="btn btnClose">닫기</button>
        </section>
         -->
    </div>







				
				<!-- 교안 등록 화면 시작 -->
				<!-- edu gallery pop 3 start-->
				<!-- <form id="gallerySaveForm" method="post" enctype="multipart/form-data"> -->
					<div id="galleryWritePop" class="dialogGtype" style="display: none;">
						<div class="popGalleryCreateRela">
							<div class="popGalleryCreate">
								<div class="gcLeft">
									<div class="topForm">
										<a href="javascript:void(0)" onclick="penCross(this, '.gicobox')" class="btnPen">연필</a>
									</div>
									<div class="gcMap">
										<div id="mapArea" style="background-image: url('/img/pic/pic_testmap02.jpg');background-size: 100% 100%;"></div>
											
										<div class="gicobox">
											<div class="ico" id="iconList">
												<p>아이콘</p>
												<ul>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico01.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico02.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico03.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico04.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico05.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico06.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico07.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico08.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico09.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico10.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico11.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgIcon" src="/img/ico/ico_gico12.png" alt="아이콘" /></a></li>
												</ul>
											</div>
											<div class="talkArea" id="talkAreaList">
												<p>말풍선</p>
												<ul>
													<li><a href="javascript:void(0)"><img
															class="imgTextArea ui-draggable" src="/img/ico/ico_mal01.png" alt="아이콘" /></a></li>
													<li><a href="javascript:void(0)"><img
															class="imgTextArea ui-draggable" src="/img/ico/ico_mal02.png" alt="아이콘" /></a></li>
												</ul>
											</div>
										</div>
									</div>
									<div class="gcSlideBox" style="width:500px;height:67px;">
										<div style="display: none;">
										</div>
										<!-- 
										<div class="gcSlideArea" id="gcSlideArea">
										</div>
										 -->
										<a href="javascript:void(0)" class="gcPrev"><img
											src="/img/ico/ico_left02.png" alt="이전" /></a> <a
											href="javascript:void(0)" class="gcNext"><img
											src="/img/ico/ico_right02.png" alt="다음" /></a>
									</div>
									
									<a href="javascript:void(0)" class="gadd" onclick="gadd();$galleryAdd.selectBookMarkList();">맵추가</a>
									
									<!-- 로컬파일등록 -->
									<!-- <a class="imgView" onclick="fileEvent('#imgFile')"> -->
									<a class="gadd2" onclick="fileEvent('#imgFile')">
										<span id="viewText">이미지 첨부하기</span>
										<span id="preViewImage" style="display:none;"><img id="target" src="#" width="260px" height="150px" /></span>
									</a>
									<input type="file" name="preView" class="hidden" id="imgFile" onchange="$galleryAdd.imageUploadAndEdit();" />
									
									
									
								</div>
								
								
								<div class="useSide" style="display:none;">
									<div class="topForm">
										<input id="gallery_title99" name="title" type="text" value="" title="제목을 입력하세요"
											placeholder="제목을 입력하세요." maxlength="100"/>
									</div>
									<div class="contForm">
										<textarea id="applicationContent" name="applicationContent"
											placeholder="내용을 입력하세요.(1000자)"></textarea>
									</div>
									<div class="hashTag">
										<input id="hashTag" type="text" class="tags" value="" title="해시태그" />
									</div>
									
									
									<!-- 설문조사 주석처리  등록시 해당 객체가 없으면 오류가 나서 hidden으로 넘김 지우면 않됨-->
									<input id="survey_surv_end_dt" type="hidden"  title="마감시간 설정" />
									<input name="surveySubject" type="hidden" placeholder="설문제목" title="설문제목" />
									<input type="hidden" name="ansDetail"  placeholder="항목 입력" value=""  title="항목 입력"/>
									
									
									
									<div class="josaListEtcBox">
										<a href="javascript:void(0)" class="btnGtype on" onclick="$galleryAdd.gallerySaveForm()">교안 생성하기</a> 
										<a href="javascript:void(0)" class="btnGtype01" onclick="javascript:$galleryAdd.writeGalleryHide();$galleryAdd.deleteCaptureImage();">취소</a>
									</div>
								</div>
								
								
							</div>
							<a href="javascript:$galleryAdd.writeGalleryHide();$galleryAdd.deleteCaptureImage();"
								class="rightClose"><img src="/img/ico/ico_close06.png" alt="닫기" /></a>
						</div>
					</div>
				</form>
				
				<!-- gallery pop 3 end-->

				<input type="hidden" id="hidden_ss_school_grade" value="<%=param_ss_school_grade%>">
			
</body>
</html>