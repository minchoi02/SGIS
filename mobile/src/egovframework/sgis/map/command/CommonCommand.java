package egovframework.sgis.map.command;

import egovframework.sgis.cmmn.util.PagedListHolder;

public class CommonCommand extends PagedListHolder{
	private String id;
	private String type;
	private String member_id;
	private String replace_member_id;
	private String bnd_year;

	private String cmmnty_align; // 정렬  기준 변경 cmmnty_align 박은식 20200708
	private String title; // POI LIST 검색 title 박은식 20200709
	private String cmmnty_poi_id; // POI LIST 삭제 key 박은식 20200902
	
	private String from_ce;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setMember_id(String member_id) {
		this.member_id = member_id;
	}
	public String getBnd_year() {
		return bnd_year;
	}
	public void setBnd_year(String bnd_year) {
		this.bnd_year = bnd_year;
	}
	public String getReplace_member_id() {
		return replace_member_id;
	}
	public void setReplace_member_id(String replace_member_id) {
		this.replace_member_id = replace_member_id;
	}
	/** 정렬  기준 변경 cmmnty_align getter setter 
	 *  작성자 : 박은식 
	 *  작성일 : 20200708
	 *  
	 *  추가 start */
	public String getCmmnty_align() {
		return cmmnty_align;
	}
	public void setCmmnty_align(String cmmnty_align) {
		this.cmmnty_align = cmmnty_align;
	}
	/** 추가 end */
	
	/** POI LIST 검색 title getter setter 
	 *  작성자 : 박은식 
	 *  작성일 : 20200709
	 *  
	 *  추가 start */
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	/** 추가 end */
	/** POI LIST 삭제 cmmnty_poi_id getter setter 
	 *  작성자 : 박은식 
	 *  작성일 : 20200902
	 *  
	 *  추가 start */
	public String getCmmnty_poi_id() {
		return cmmnty_poi_id;
	}
	public void setCmmnty_poi_id(String cmmnty_poi_id) {
		this.cmmnty_poi_id = cmmnty_poi_id;
	}
	/** 추가 end */
	public String getFrom_ce() {
		return from_ce;
	}
	public void setFrom_ce(String from_ce) {
		this.from_ce = from_ce;
	}
	
}
