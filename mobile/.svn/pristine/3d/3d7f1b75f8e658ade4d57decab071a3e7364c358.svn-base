package egovframework.sgis.map.command;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotEmpty;

import egovframework.sgis.cmmn.util.PagedListHolder;

public class CommunityPoiCommand extends PagedListHolder{
	private String cmmnty_map_id;
	@NotEmpty(message="제목은 필수항목 입니다.")
	@Size(max=33,message="제목은 최대 33글자까지 작성하실 수 있습니다")
	private String title;
	@NotEmpty(message="위치명은 필수항목 입니다.")
	@Size(max=66,message="위치명은 최대 66글자까지 작성하실 수 있습니다")
	private String reg_lc;
	@NotEmpty(message="의견은 필수항목 입니다.")
	@Size(max=200,message="의견은 최대 200글자까지 작성하실 수 있습니다")
	private String opinion_state;
	@NotEmpty(message="아이콘은 필수항목 입니다.")
	private String symbol;
	@NotEmpty(message="위치를 선택해주세요")
	private String loc_x;
	@NotEmpty(message="위치를 선택해주세요")
	private String loc_y;
	private String usr_id;
	private String cmmnty_poi_id;
	private String cmmnty_usr_data_pt_id;
	private String geom;
	private String id;
	private String pw;
	
	public String getCmmnty_map_id() {
		return cmmnty_map_id;
	}
	public void setCmmnty_map_id(String cmmnty_map_id) {
		this.cmmnty_map_id = cmmnty_map_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getReg_lc() {
		return reg_lc;
	}
	public void setReg_lc(String reg_lc) {
		this.reg_lc = reg_lc;
	}
	public String getOpinion_state() {
		return opinion_state;
	}
	public void setOpinion_state(String opinion_state) {
		this.opinion_state = opinion_state;
	}
	public String getSymbol() {
		return symbol;
	}
	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}
	public String getLoc_x() {
		return loc_x;
	}
	public void setLoc_x(String loc_x) {
		this.loc_x = loc_x;
	}
	public String getLoc_y() {
		return loc_y;
	}
	public void setLoc_y(String loc_y) {
		this.loc_y = loc_y;
	}
	public String getUsr_id() {
		return usr_id;
	}
	public void setUsr_id(String usr_id) {
		this.usr_id = usr_id;
	}
	public String getCmmnty_poi_id() {
		return cmmnty_poi_id;
	}
	public void setCmmnty_poi_id(String cmmnty_poi_id) {
		this.cmmnty_poi_id = cmmnty_poi_id;
	}
	public String getCmmnty_usr_data_pt_id() {
		return cmmnty_usr_data_pt_id;
	}
	public void setCmmnty_usr_data_pt_id(String cmmnty_usr_data_pt_id) {
		this.cmmnty_usr_data_pt_id = cmmnty_usr_data_pt_id;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
}
