package kostat.sop.ServiceAPI.pss.vo;

import java.util.Arrays;

public class PssVo {
	
	private String sgis_userkey = "";
	private String sec_reg_time = "";

	private String[] sgis_census_data_id = null;
	private String[] sgis_census_id = null;
	private String sgis_census_req_company = "";
	private String sgis_census_req_tel = "";
	private String sgis_census_req_goal = "";
	private String sgis_census_req_id = "";

	private String sgis_census_req_sosok = "";
	private String sgis_census_req_mokjuk = "";
	private String census_output_area_year = "";	
	private String sgis_census_req_kwaje = "";
	private String sgis_census_req_email = "";

	
	private String[] sgis_census_detail_data_id = null;
	private String[] census_output_data_type_new = null;
	private String[] sgis_census_req_map_level = null;
	private String sgis_census_level_area_check = null;
	private String[] sgis_census_req_map_code = null; 
	
	private String[] inUse = null;
	private String[] years = null;
	private String[] sido = null;
	private String[] sigungu = null;
	private String aT = "";
	private String formName = "";
	private String fileName = "";
	private String old_census_file = "";
	private int resultFlag =  0;
	
	
	private String[] sgis_census_year_id_new = null;
	private String[] sgis_census_data_id_new = null;
	private String[] sgis_census_sido_id_new = null;
	private String[] sgis_census_sigungu_id_new = null;
	private String[] sgis_census_id_new = null;
	private String[] census_output_area_dts_year_new = null;
	private String[] sgis_census_detail_data_id_new = null;
	
	private String sgis_census_req_tel_1 ="";
	private String sgis_census_req_tel_2 ="";
	private String sgis_census_req_tel_3 ="";

	private String email_id = "";
	private String email_addr = "";
	
	private String sgis_census_req_sosok_nm ="";
	private String sgis_census_req_mokjuk_nm = "";
	
	private String param_userkey = "";
	
	
	
	public String getSgis_census_req_sosok_nm() {
		return sgis_census_req_sosok_nm;
	}

	public String getParam_userkey() {
		return param_userkey;
	}

	public void setParam_userkey(String param_userkey) {
		this.param_userkey = param_userkey;
	}

	public void setSgis_census_req_sosok_nm(String sgis_census_req_sosok_nm) {
		this.sgis_census_req_sosok_nm = sgis_census_req_sosok_nm;
	}

	public String getSgis_census_req_mokjuk_nm() {
		return sgis_census_req_mokjuk_nm;
	}

	public void setSgis_census_req_mokjuk_nm(String sgis_census_req_mokjuk_nm) {
		this.sgis_census_req_mokjuk_nm = sgis_census_req_mokjuk_nm;
	}

	public String getEmail_id() {
		return email_id;
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public String getEmail_addr() {
		return email_addr;
	}

	public void setEmail_addr(String email_addr) {
		this.email_addr = email_addr;
	}

	public String getSgis_census_req_tel_1() {
		return sgis_census_req_tel_1;
	}

	public void setSgis_census_req_tel_1(String sgis_census_req_tel_1) {
		this.sgis_census_req_tel_1 = sgis_census_req_tel_1;
	}

	public String getSgis_census_req_tel_2() {
		return sgis_census_req_tel_2;
	}

	public void setSgis_census_req_tel_2(String sgis_census_req_tel_2) {
		this.sgis_census_req_tel_2 = sgis_census_req_tel_2;
	}

	public String getSgis_census_req_tel_3() {
		return sgis_census_req_tel_3;
	}

	public void setSgis_census_req_tel_3(String sgis_census_req_tel_3) {
		this.sgis_census_req_tel_3 = sgis_census_req_tel_3;
	}

	public String[] getSgis_census_detail_data_id_new() {
		return sgis_census_detail_data_id_new;
	}

	public void setSgis_census_detail_data_id_new(String[] sgis_census_detail_data_id_new) {
		this.sgis_census_detail_data_id_new = sgis_census_detail_data_id_new;
	}

	public String[] getCensus_output_area_dts_year_new() {
		return census_output_area_dts_year_new;
	}

	public void setCensus_output_area_dts_year_new(String[] census_output_area_dts_year_new) {
		this.census_output_area_dts_year_new = census_output_area_dts_year_new;
	}

	public String[] getSgis_census_data_id_new() {
		return sgis_census_data_id_new;
	}

	public void setSgis_census_data_id_new(String[] sgis_census_data_id_new) {
		this.sgis_census_data_id_new = sgis_census_data_id_new;
	}

	public String[] getSgis_census_sido_id_new() {
		return sgis_census_sido_id_new;
	}

	public void setSgis_census_sido_id_new(String[] sgis_census_sido_id_new) {
		this.sgis_census_sido_id_new = sgis_census_sido_id_new;
	}

	public String[] getSgis_census_sigungu_id_new() {
		return sgis_census_sigungu_id_new;
	}

	public void setSgis_census_sigungu_id_new(String[] sgis_census_sigungu_id_new) {
		this.sgis_census_sigungu_id_new = sgis_census_sigungu_id_new;
	}

	public String[] getSgis_census_id_new() {
		return sgis_census_id_new;
	}

	public void setSgis_census_id_new(String[] sgis_census_id_new) {
		this.sgis_census_id_new = sgis_census_id_new;
	}

	public String[] getSgis_census_year_id_new() {
		return sgis_census_year_id_new;
	}

	public void setSgis_census_year_id_new(String[] sgis_census_year_id_new) {
		this.sgis_census_year_id_new = sgis_census_year_id_new;
	}

	public String getSec_reg_time() {
		return sec_reg_time;
	}

	public void setSec_reg_time(String sec_reg_time) {
		this.sec_reg_time = sec_reg_time;
	}

	public String getSgis_userkey() {
		return sgis_userkey;
	}

	public void setSgis_userkey(String sgis_userkey) {
		this.sgis_userkey = sgis_userkey;
	}

	private String census_output_area_dts_year[] = null;

	public String[] getSgis_census_data_id() {
		return sgis_census_data_id;
	}

	public void setSgis_census_data_id(String[] sgis_census_data_id) {
		this.sgis_census_data_id = sgis_census_data_id;
	}

	public String[] getSgis_census_id() {
		return sgis_census_id;
	}

	public void setSgis_census_id(String[] sgis_census_id) {
		this.sgis_census_id = sgis_census_id;
	}

	public String getSgis_census_req_company() {
		return sgis_census_req_company;
	}

	public void setSgis_census_req_company(String sgis_census_req_company) {
		this.sgis_census_req_company = sgis_census_req_company;
	}

	public String getSgis_census_req_tel() {
		return sgis_census_req_tel;
	}

	public void setSgis_census_req_tel(String sgis_census_req_tel) {
		this.sgis_census_req_tel = sgis_census_req_tel;
	}

	public String getSgis_census_req_goal() {
		return sgis_census_req_goal;
	}

	public void setSgis_census_req_goal(String sgis_census_req_goal) {
		this.sgis_census_req_goal = sgis_census_req_goal;
	}

	public String getSgis_census_req_id() {
		return sgis_census_req_id;
	}

	public void setSgis_census_req_id(String sgis_census_req_id) {
		this.sgis_census_req_id = sgis_census_req_id;
	}

	public String getSgis_census_req_sosok() {
		return sgis_census_req_sosok;
	}

	public void setSgis_census_req_sosok(String sgis_census_req_sosok) {
		this.sgis_census_req_sosok = sgis_census_req_sosok;
	}

	public String getSgis_census_req_mokjuk() {
		return sgis_census_req_mokjuk;
	}

	public void setSgis_census_req_mokjuk(String sgis_census_req_mokjuk) {
		this.sgis_census_req_mokjuk = sgis_census_req_mokjuk;
	}

	public String getCensus_output_area_year() {
		return census_output_area_year;
	}

	public void setCensus_output_area_year(String census_output_area_year) {
		this.census_output_area_year = census_output_area_year;
	}

	public String getSgis_census_req_kwaje() {
		return sgis_census_req_kwaje;
	}

	public void setSgis_census_req_kwaje(String sgis_census_req_kwaje) {
		this.sgis_census_req_kwaje = sgis_census_req_kwaje;
	}

	public String getSgis_census_req_email() {
		return sgis_census_req_email;
	}

	public void setSgis_census_req_email(String sgis_census_req_email) {
		this.sgis_census_req_email = sgis_census_req_email;
	}

	public String[] getSgis_census_detail_data_id() {
		return sgis_census_detail_data_id;
	}

	public void setSgis_census_detail_data_id(String[] sgis_census_detail_data_id) {
		this.sgis_census_detail_data_id = sgis_census_detail_data_id;
	}

	public String[] getCensus_output_data_type_new() {
		return census_output_data_type_new;
	}

	public void setCensus_output_data_type_new(String[] census_output_data_type_new) {
		this.census_output_data_type_new = census_output_data_type_new;
	}

	public String[] getSgis_census_req_map_level() {
		return sgis_census_req_map_level;
	}

	public void setSgis_census_req_map_level(String[] sgis_census_req_map_level) {
		this.sgis_census_req_map_level = sgis_census_req_map_level;
	}

	public String getSgis_census_level_area_check() {
		return sgis_census_level_area_check;
	}

	public void setSgis_census_level_area_check(String sgis_census_level_area_check) {
		this.sgis_census_level_area_check = sgis_census_level_area_check;
	}

	public String[] getSgis_census_req_map_code() {
		return sgis_census_req_map_code;
	}

	public void setSgis_census_req_map_code(String[] sgis_census_req_map_code) {
		this.sgis_census_req_map_code = sgis_census_req_map_code;
	}

	public String[] getInUse() {
		return inUse;
	}

	public void setInUse(String[] inUse) {
		this.inUse = inUse;
	}

	public String[] getYears() {
		return years;
	}

	public void setYears(String[] years) {
		this.years = years;
	}

	public String[] getSido() {
		return sido;
	}

	public void setSido(String[] sido) {
		this.sido = sido;
	}

	public String[] getSigungu() {
		return sigungu;
	}

	public void setSigungu(String[] sigungu) {
		this.sigungu = sigungu;
	}

	public String getaT() {
		return aT;
	}

	public void setaT(String aT) {
		this.aT = aT;
	}

	public String getFormName() {
		return formName;
	}

	public void setFormName(String formName) {
		this.formName = formName;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	
	public int getResultFlag() {
		return resultFlag;
	}

	public void setResultFlag(int resultFlag) {
		this.resultFlag = resultFlag;
	}

	public String[] getCensus_output_area_dts_year() {
		return census_output_area_dts_year;
	}

	public void setCensus_output_area_dts_year(String[] census_output_area_dts_year) {
		this.census_output_area_dts_year = census_output_area_dts_year;
	}

	public String getOld_census_file() {
		return old_census_file;
	}

	public void setOld_census_file(String old_census_file) {
		this.old_census_file = old_census_file;
	}

	@Override
	public String toString() {
		return "PssVo [sgis_userkey=" + sgis_userkey + ", sec_reg_time=" + sec_reg_time + ", sgis_census_data_id="
				+ Arrays.toString(sgis_census_data_id) + ", sgis_census_id=" + Arrays.toString(sgis_census_id)
				+ ", sgis_census_req_company=" + sgis_census_req_company + ", sgis_census_req_tel="
				+ sgis_census_req_tel + ", sgis_census_req_goal=" + sgis_census_req_goal + ", sgis_census_req_id="
				+ sgis_census_req_id + ", sgis_census_req_sosok=" + sgis_census_req_sosok + ", sgis_census_req_mokjuk="
				+ sgis_census_req_mokjuk + ", census_output_area_year=" + census_output_area_year
				+ ", sgis_census_req_kwaje=" + sgis_census_req_kwaje + ", sgis_census_req_email="
				+ sgis_census_req_email + ", sgis_census_detail_data_id=" + Arrays.toString(sgis_census_detail_data_id)
				+ ", census_output_data_type_new=" + Arrays.toString(census_output_data_type_new)
				+ ", sgis_census_req_map_level=" + Arrays.toString(sgis_census_req_map_level)
				+ ", sgis_census_level_area_check=" + sgis_census_level_area_check + ", sgis_census_req_map_code="
				+ Arrays.toString(sgis_census_req_map_code) + ", inUse=" + Arrays.toString(inUse) + ", years="
				+ Arrays.toString(years) + ", sido=" + Arrays.toString(sido) + ", sigungu=" + Arrays.toString(sigungu)
				+ ", aT=" + aT + ", formName=" + formName + ", fileName=" + fileName + ", old_census_file="
				+ old_census_file + ", resultFlag=" + resultFlag + ", sgis_census_year_id_new="
				+ Arrays.toString(sgis_census_year_id_new) + ", sgis_census_data_id_new="
				+ Arrays.toString(sgis_census_data_id_new) + ", sgis_census_sido_id_new="
				+ Arrays.toString(sgis_census_sido_id_new) + ", sgis_census_sigungu_id_new="
				+ Arrays.toString(sgis_census_sigungu_id_new) + ", sgis_census_id_new="
				+ Arrays.toString(sgis_census_id_new) + ", census_output_area_dts_year_new="
				+ Arrays.toString(census_output_area_dts_year_new) + ", sgis_census_detail_data_id_new="
				+ Arrays.toString(sgis_census_detail_data_id_new) + ", sgis_census_req_tel_1=" + sgis_census_req_tel_1
				+ ", sgis_census_req_tel_2=" + sgis_census_req_tel_2 + ", sgis_census_req_tel_3="
				+ sgis_census_req_tel_3 + ", email_id=" + email_id + ", email_addr=" + email_addr
				+ ", census_output_area_dts_year=" + Arrays.toString(census_output_area_dts_year) + "]";
	}

	
	
	
	
}
