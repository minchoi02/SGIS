package egovframework.sgis.map.model;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class CommunityVO{
	private final static Log logger = LogFactory.getLog(CommunityVO.class);
	
	/** 소통지도 식별번호 */
	private String cmmnty_map_id;
	/** 소통지도 이름 */
	private String cmmnty_map_nm;
	/** 소통지도 설명 */
	private String intrcn;
	/** 소통지도 개설자 */
	private String usr_id;
	/** 소통지도 생성일 */
	private String reg_date;
	/** 소통지도 종료 날짜 */
	private String prid_estbs_end_date;
	/** 소통지도 참여승인여부 */
	private String cmmnty_partcptn_grant_yn;
	/** 행정동 코드 */
	private String adm_cd;
	/** 소통지도 메인 사진 위치 */
	private String path_nm;
	/** 소통지도 메인 사진 저장 이름 */
	private String save_file_nm;
	/** 소통지도 게시물 개수 */
	private String poi_cnt;
	/** 소통지도 참여자수 */
	private String join_cnt;
	/** 
	 * 등록 가능 여부
	 * Y : 가능
	 * W : 승인대기
	 **/
	private String regist_yn;
	/** 
	 * 참여 반려 여부
	 * D : 반려
	 * A : 승인
	 **/
	private String approval_distinct;
	/** 등록 심볼*/
	private String reg_symbol;
	/** 통계맵 리스트 json*/
	private String mapListJson;
	private String custom_symbol_group_id;
	/** 마이데이터*/
	private String mydata;
	private String from_ce;
	
	
	
	public String getReg_symbol() {
		return reg_symbol;
	}
	public void setReg_symbol(String reg_symbol) {
		this.reg_symbol = reg_symbol;
	}
	public String getCmmnty_map_id() {
		return cmmnty_map_id;
	}
	public void setCmmnty_map_id(String cmmnty_map_id) {
		this.cmmnty_map_id = cmmnty_map_id;
	}
	public String getCmmnty_map_nm() {
		return cmmnty_map_nm;
	}
	public void setCmmnty_map_nm(String cmmnty_map_nm) {
		this.cmmnty_map_nm = cmmnty_map_nm;
	}
	public String getIntrcn() {
		return intrcn;
	}
	public void setIntrcn(String intrcn) {
		this.intrcn = intrcn;
	}
	public String getUsr_id() {
		return usr_id;
	}
	public void setUsr_id(String usr_id) {
		this.usr_id = usr_id;
	}
	public String getReg_date() {
		return reg_date;
	}
	public void setReg_date(String reg_date) {
		this.reg_date = reg_date;
	}
	public String getPrid_estbs_end_date() {
		return prid_estbs_end_date;
	}
	public void setPrid_estbs_end_date(String prid_estbs_end_date) {
		this.prid_estbs_end_date = prid_estbs_end_date;
	}
	public String getCmmnty_partcptn_grant_yn() {
		return cmmnty_partcptn_grant_yn;
	}
	public void setCmmnty_partcptn_grant_yn(String cmmnty_partcptn_grant_yn) {
		this.cmmnty_partcptn_grant_yn = cmmnty_partcptn_grant_yn;
	}
	
	public String getPath_nm() {
		return path_nm;
	}
	public void setPath_nm(String path_nm) {
		this.path_nm = path_nm;
	}
	public String getSave_file_nm() {
		return save_file_nm;
	}
	public void setSave_file_nm(String save_file_nm) {
		this.save_file_nm = save_file_nm;
	}
	public String getPoi_cnt() {
		return poi_cnt;
	}
	public void setPoi_cnt(String poi_cnt) {
		this.poi_cnt = poi_cnt;
	}
	public String getJoin_cnt() {
		return join_cnt;
	}
	public void setJoin_cnt(String join_cnt) {
		this.join_cnt = join_cnt;
	}
	public String getRegist_yn() {
		return regist_yn;
	}
	public void setRegist_yn(String regist_yn) {
		this.regist_yn = regist_yn;
	}
	public String getApproval_distinct() {
		return approval_distinct;
	}
	public void setApproval_distinct(String approval_distinct) {
		this.approval_distinct = approval_distinct;
	}
	public String getAdm_cd() {
		return adm_cd;
	}
	public void setAdm_cd(String adm_cd) {
		this.adm_cd = adm_cd;
	}
	public String getMapListJson() {
		return mapListJson;
	}
	public void setMapListJson(Object mapListJson) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			this.mapListJson = mapper.writeValueAsString(mapListJson);
		} catch (JsonProcessingException e) {
			logger.error(e);
		}
	}
	public String getCustom_symbol_group_id() {
		return custom_symbol_group_id;
	}
	public void setCustom_symbol_group_id(String custom_symbol_group_id) {
		this.custom_symbol_group_id = custom_symbol_group_id;
	}
	public String getMydata() {
		return mydata;
	}
	public void setMydata(String mydata) {
		this.mydata = mydata;
	}
	public String getFrom_ce() {
		return from_ce;
	}
	public void setFrom_ce(String from_ce) {
		this.from_ce = from_ce;
	}
}
