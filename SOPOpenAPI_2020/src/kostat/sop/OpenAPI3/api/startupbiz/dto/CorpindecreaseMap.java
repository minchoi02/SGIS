package kostat.sop.OpenAPI3.api.startupbiz.dto;

import java.util.List;

public class CorpindecreaseMap {
	private String year; 
	private String adm_cd; 
	private List theme_list;
	
	
	public String getAdm_cd() {
		return adm_cd;
	}
	public void setAdm_cd(String adm_cd) {
		this.adm_cd = adm_cd;
	}
//	public String getData_year() {
//		return data_year;
//	}
//	public void setData_year(String data_year) {
//		this.data_year = data_year;
//	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public List getTheme_list() {
		return theme_list;
	}
	public void setTheme_list(List theme_list) {
		this.theme_list = theme_list;
	}
}
