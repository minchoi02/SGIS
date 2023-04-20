package kostat.sop.OpenAPI3.api.startupbiz.dto;

import java.util.List;

public class CorpdistsummaryMap {
	private String adm_cd; 
	private String adm_nm; 
	private List theme_list;
	
	public String getAdm_cd() {
		return adm_cd;
	}
	public void setAdm_cd(String adm_cd) {
		this.adm_cd = adm_cd;
	}
	public String getAdm_nm() {
		return adm_nm;
	}
	public void setAdm_nm(String adm_nm) {
		this.adm_nm = adm_nm;
	}
	public List getTheme_list() {
		return theme_list;
	}
	public void setTheme_list(List theme_list) {
		this.theme_list = theme_list;
	}
	
}
