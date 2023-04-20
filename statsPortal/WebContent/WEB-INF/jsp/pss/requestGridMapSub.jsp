<%@ page language="java" contentType="text/html;charset=utf-8" %>
<%@page import="java.math.BigDecimal"%>
<%@page import="kr.co.offton.jdf.util.StringUtil"%>
<%@page import="kr.co.offton.jdf.db.RecordModel"%>
<%@page import="kr.co.offton.jdf.db.DbManager"%>
<%@page import="kr.co.offton.pdf.basis.GeneralBroker"%>

<ul class="code_wrap" id="sgis_map_name_btn_ul">
  <li>
    <span class="tag" id="selectMapBox1" style="display: none;">
      <label for="selectMapBox1">가아</label><button class="btn_close_02" type="button" onclick="mapSelectcode(1);" >닫기</button>
    </span>
    <span class="tag" id="selectMapBox2" style="display: none;">
      <label for=selectMapBox2"">다아</label><button class="btn_close_02" type="button" onclick="mapSelectcode(2);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox3" style="display: none;">
      <label for="selectMapBox3">라아</label><button class="btn_close_02" type="button" onclick="mapSelectcode(3);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox4" style="display: none;">
      <label for="selectMapBox4">마아</label><button class="btn_close_02" type="button" onclick="mapSelectcode(4);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox5" style="display: none;">
      <label for="selectMapBox5">가사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(5);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox6" style="display: none;">
      <label for="selectMapBox6">나사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(6);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox7" style="display: none;">
      <label for="selectMapBox7">다사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(7);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox8" style="display: none;">
      <label for="selectMapBox8">라사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(8);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox9" style="display: none;">
      <label for="selectMapBox9">마사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(9);">닫기</button>
    </span>
    <span class="tag  " id="selectMapBox10" style="display: none;">
      <label for="selectMapBox10">바사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(10);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox11" style="display: none;">
      <label for="selectMapBox11">사사</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(11);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox12" style="display: none;">
      <label for="selectMapBox12">나바</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(12);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox13" style="display: none;">
      <label for="selectMapBox13">다바</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(13);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox14" style="display: none;">
      <label for="selectMapBox14">라바</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(14);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox15" style="display: none;">
      <label for="selectMapBox15">마바</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(15);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox16" style="display: none;">
      <label for="selectMapBox16">나마</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(16);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox17" style="display: none;">
      <label for="selectMapBox17">다마</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(17);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox18" style="display: none;">
      <label for="selectMapBox18">라마</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(18);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox19" style="display: none;">
      <label for="selectMapBox19">마마</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(19);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox20" style="display: none;">
      <label for="selectMapBox20">가라</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(20);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox21" style="display: none;">
      <label for="selectMapBox21">나라</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(21);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox22" style="display: none;">
      <label for="selectMapBox22">다라</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(22);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox23" style="display: none;">
      <label for="selectMapBox23">라라</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(23);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox24" style="display: none;">
      <label for="selectMapBox24">마라</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(24);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox25" style="display: none;">
      <label for="selectMapBox25">가다</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(25);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox26" style="display: none;">
      <label for="selectMapBox26">나다</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(26);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox27" style="display: none;">
      <label for="selectMapBox27">다다</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(27);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox28" style="display: none;">
      <label for="selectMapBox28">라다</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(28);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox29" style="display: none;">
      <label for="selectMapBox29">나나</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(29);">닫기</button>
    </span>
    <span class="tag" id="selectMapBox30" style="display: none;">
      <label for="selectMapBox30">다나</label> <button class="btn_close_02" type="button" onclick="mapSelectcode(30);">닫기</button>
    </span>
    <span id="selectMapBox0" style="display: bolock;">
      	<div class="coment mt8 mb5">※ 아래의 지도에서 격자를 선택해 주세요.</div>
    </span>
    <span class="tag" id="selectMapBox99" style="border-color: blue;color: blue;display: none;" onclick="mapSelectcode(99);">
      <label for="selectMapBox99">전체삭제</label> 
    </span>
  </li>
</ul>
 <script type="text/javascript">
   function mapSelectOff(i) {
     $('#selectMapBox' + i).hide();
     $('#map_code' + i).removeClass("activeClass");
     $('#map_code_color' + i).removeClass("activeClassColor");
   };
 </script>