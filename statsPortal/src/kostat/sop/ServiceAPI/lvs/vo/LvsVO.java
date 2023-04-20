package kostat.sop.ServiceAPI.lvs.vo;

import java.util.ArrayList;


public class LvsVO   implements Cloneable {
	
	private String board2Kind ; // 보드2 종류 인구가구
	private String boardType ;   //보드종류	
	private String baseYear ;   //경계기준년도
	private String queryYear ;   //데이터조회년도 (데이터가존재하는 최근년도)	
	private String thisYear ;   //조회년도
	private String lastYear ;   //비교년도
	private String viewCd ;     //조회모드
	private String regionCd ;   //조회행정구역코드
	private String sidoCd ;     //시도코드
	private String sggCd;       //시군구코드 
	private String emdongCd ;   //읍면동코드
	private String infoDiv ;    //읍면동검색코드  2 시군구 3읍면동
	private String subDiv ;    //읍면동 기준하위 코드 검색
	private String datakind ;  // 데이터종류
	private String datakindNm ;  // 데이터종류명
	private String seekCd ;  // 테마필드명	
	private String orderCd ;      //정렬기준 코드
	private String orderMethod;    //정렬방법
	private String unit ;
	private String boardLen ="new" ; 

	private ArrayList<String> list = new ArrayList<>();  // 지표리스트
	private ArrayList<String> yearList = new ArrayList<>();  //년도리스트
	
	
    @Override
    public LvsVO clone() throws CloneNotSupportedException {
        return (LvsVO) super.clone();
    }
	
	public String getBoard2Kind() {
		return board2Kind;
	}
	public void setBoard2Kind(String board2Kind) {
		this.board2Kind = board2Kind;
	}
	public String getBoardType() {
		return boardType;
	}
	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}
	public String getBaseYear() {
		return baseYear;
	}
	public void setBaseYear(String baseYear) {
		this.baseYear = baseYear;
	}
	public String getQueryYear() {
		return queryYear;
	}
	public void setQueryYear(String queryYear) {
		this.queryYear = queryYear;
	}
	public String getThisYear() {
		return thisYear;
	}
	public void setThisYear(String thisYear) {
		this.thisYear = thisYear;
	}
	public String getLastYear() {
		return lastYear;
	}
	public void setLastYear(String lastYear) {
		this.lastYear = lastYear;
	}
	public String getViewCd() {
		return viewCd;
	}
	public void setViewCd(String viewCd) {
		this.viewCd = viewCd;
	}
	public String getRegionCd() {
		return regionCd;
	}
	public void setRegionCd(String regionCd) {
		this.regionCd = regionCd;
	}
	public String getSidoCd() {
		return sidoCd;
	}
	public void setSidoCd(String sidoCd) {
		this.sidoCd = sidoCd;
	}
	public String getSggCd() {
		return sggCd;
	}
	public void setSggCd(String sggCd) {
		this.sggCd = sggCd;
	}
	public String getEmdongCd() {
		return emdongCd;
	}
	public void setEmdongCd(String emdongCd) {
		this.emdongCd = emdongCd;
	}
	
	public String getInfoDiv() {
		return infoDiv;
	}
	
	public void setInfoDiv(String infoDiv) {
		this.infoDiv = infoDiv;
	}
	
	public String getSubDiv() {
		return subDiv;
	}

	public void setSubDiv(String subDiv) {
		this.subDiv = subDiv;
	}

	public String getDatakind() {
		return datakind;
	}

	public void setDatakind(String datakind) {
		this.datakind = datakind;
	}
	
	public String getDatakindNm() {
		return datakindNm;
	}

	public void setDatakindNm(String datakindNm) {
		this.datakindNm = datakindNm;
	}

	public String getSeekCd() {
		return seekCd;
	}

	public void setSeekCd(String seekCd) {
		this.seekCd = seekCd;
	}

	public String getOrderCd() {
		return orderCd;
	}

	public void setOrderCd(String orderCd) {
		this.orderCd = orderCd;
	}

	public String getOrderMethod() {
		return orderMethod;
	}

	public void setOrderMethod(String orderMethod) {
		this.orderMethod = orderMethod;
	}

	public ArrayList<String> getList() {
		return list;
	}
	public void setList(ArrayList<String> list) {
		this.list = list;
	}
	public ArrayList<String> getYearList() {
		return yearList;
	}
	public void setYearList(ArrayList<String> yearList) {
		this.yearList = yearList;
	}
	
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
		
	
	

	public String getBoardLen() {
		return boardLen;
	}

	public void setBoardLen(String boardLen) {
		this.boardLen = boardLen;
	}
	

	public void setEmdongLen() {
		if(this.getBaseYear().toString().equals("2021")) {
			this.boardLen= "old";
		} else {
			this.boardLen= "new";			
		}
	}


	@Override
	public String toString() {
		return "LvsVO [board2Kind=" + board2Kind + ", boardType=" + boardType + ", baseYear=" + baseYear + ", thisYear="
				+ thisYear + ", lastYear=" + lastYear + ", viewCd=" + viewCd + ", regionCd=" + regionCd + ", sidoCd="
				+ sidoCd + ", sggCd=" + sggCd + ", emdongCd=" + emdongCd + ", infoDiv=" + infoDiv + ", subDiv=" + subDiv
				+ ", datakind=" + datakind + ", seekCd=" + seekCd + ", orderCd=" + orderCd + ", orderMethod="
				+ orderMethod + ", unit=" + unit + ", list=" + list + ", yearList=" + yearList + "]";
	}
	
	

}
