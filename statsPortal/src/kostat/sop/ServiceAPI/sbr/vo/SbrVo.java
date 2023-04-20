package kostat.sop.ServiceAPI.sbr.vo;

import java.util.List;

public class SbrVo {
	
	
	private String adm_cd;
	private String adm_cd2;
	private String adm_nm;
	private String y;
	private String x;
	
	private String sido_cd;
	private String sigungu_cd;
	private String dong_cd;
	private String year;
	private String area;
	private List year_list;
	
	private String kisc_cd_1 = "0";
	private String kisc_cd_2 = "00";
	
	private String biz_cd;
	private String cnd_cd;
	private String bord_type = "1";
	private String mode ="";
	
	private String detail_search_theme = "";
	
	private String bnd_grid;
	private String gender;
	private String area_type;
	private String low_search;
	private String age_from;
	private String age_to;
	private String bnd_year;
	private String zoom;
	private String is_zoom_lvl4;
	private String is_non_self;
	private String adm_length;
	private String statType;
	
	
	private String edu_level;
	private String mrg_state;
	
	private String edu_level_list[];
	private String mrg_state_list[];
	
	
	private List<?> admCdList;
	private List<?> optionList;
	
	private String category = "1";
	
	private String comNm="";
	
	private String odoor_crop_cd;
	private String fac_crop_cd;
	private String acre_sz_to;
	private String acre_sz_from;
	
	private String isOne = "N";
	
	//페이징
	
	private String pageNumber = "0";
	private String startNumber = "0";
	private String endNumber = "0";
	
	
	private String order ="1";
	private String orderType ="1";
	
	private String areaInfo ="1";
	private String b_year = "";
	private String c_year = "";
	private String d_year = "";
	
	private String selectColumn = "";
	
	
	private String house_type = "";
	private String rd_const_year ="";
	private String household_type[] = null;
	
	
	private String other_type ="";
	
	private String oga_div = "1";
	private String bord_point = "";
	
	
	private String chartMode = "1";
	
	private String chsu= "10";
	
	private String comPanyType;
	private String lndType;
	private String ymageType;
	private String openCloseType;
	private String bizType;
	private String signelBizCode1;
	private String signelBizCode2;
	private String signelOder;
	
	private List signelList = null;
	
	
	
	private String settingValue1;
	private String settingValue2;
	private String settingValue3;
	


	
	public String getSettingValue1() {
		return settingValue1;
	}

	public void setSettingValue1(String settingValue1) {
		this.settingValue1 = settingValue1;
	}

	public String getSettingValue2() {
		return settingValue2;
	}

	public void setSettingValue2(String settingValue2) {
		this.settingValue2 = settingValue2;
	}

	public String getSettingValue3() {
		return settingValue3;
	}

	public void setSettingValue3(String settingValue3) {
		this.settingValue3 = settingValue3;
	}

	public String getSignelOder() {
		return signelOder;
	}

	public void setSignelOder(String signelOder) {
		this.signelOder = signelOder;
	}

	public String getSignelBizCode1() {
		return signelBizCode1;
	}

	public void setSignelBizCode1(String signelBizCode1) {
		this.signelBizCode1 = signelBizCode1;
	}

	public String getSignelBizCode2() {
		return signelBizCode2;
	}

	public void setSignelBizCode2(String signelBizCode2) {
		this.signelBizCode2 = signelBizCode2;
	}

	public List getSignelList() {
		return signelList;
	}

	public void setSignelList(List signelList) {
		this.signelList = signelList;
	}

	public String getComPanyType() {
		return comPanyType;
	}

	public void setComPanyType(String comPanyType) {
		this.comPanyType = comPanyType;
	}

	public String getLndType() {
		return lndType;
	}

	public void setLndType(String lndType) {
		this.lndType = lndType;
	}

	public String getYmageType() {
		return ymageType;
	}

	public void setYmageType(String ymageType) {
		this.ymageType = ymageType;
	}

	public String getOpenCloseType() {
		return openCloseType;
	}

	public void setOpenCloseType(String openCloseType) {
		this.openCloseType = openCloseType;
	}

	public String getBizType() {
		return bizType;
	}

	public void setBizType(String bizType) {
		this.bizType = bizType;
	}



	public String getChsu() {
		return chsu;
	}

	public void setChsu(String chsu) {
		this.chsu = chsu;
	}

	public String getChartMode() {
		return chartMode;
	}

	public void setChartMode(String chartMode) {
		this.chartMode = chartMode;
	}

	public String getBord_point() {
		return bord_point;
	}

	public void setBord_point(String bord_point) {
		this.bord_point = bord_point;
	}

	public String getOga_div() {
		return oga_div;
	}

	public void setOga_div(String oga_div) {
		this.oga_div = oga_div;
	}

	public String getOther_type() {
		return other_type;
	}

	public void setOther_type(String other_type) {
		this.other_type = other_type;
	}

	public String[] getHousehold_type() {
		return household_type;
	}

	public void setHousehold_type(String[] household_type) {
		this.household_type = household_type;
	}

	public String getRd_const_year() {
		return rd_const_year;
	}

	public void setRd_const_year(String rd_const_year) {
		this.rd_const_year = rd_const_year;
	}

	public String getHouse_type() {
		return house_type;
	}

	public void setHouse_type(String house_type) {
		this.house_type = house_type;
	}

	public String getSelectColumn() {
		return selectColumn;
	}

	public void setSelectColumn(String selectColumn) {
		this.selectColumn = selectColumn;
	}

	public String getB_year() {
		return b_year;
	}

	public void setB_year(String b_year) {
		this.b_year = b_year;
	}

	public String getAreaInfo() {
		return areaInfo;
	}

	public void setAreaInfo(String areaInfo) {
		this.areaInfo = areaInfo;
	}


	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getStartNumber() {
		return startNumber;
	}

	public void setStartNumber(String startNumber) {
		this.startNumber = startNumber;
	}

	public String getEndNumber() {
		return endNumber;
	}

	public void setEndNumber(String endNumber) {
		this.endNumber = endNumber;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	public String getIsOne() {
		return isOne;
	}

	public void setIsOne(String isOne) {
		this.isOne = isOne;
	}

	public String getOdoor_crop_cd() {
		return odoor_crop_cd;
	}

	public void setOdoor_crop_cd(String odoor_crop_cd) {
		this.odoor_crop_cd = odoor_crop_cd;
	}

	public String getFac_crop_cd() {
		return fac_crop_cd;
	}

	public void setFac_crop_cd(String fac_crop_cd) {
		this.fac_crop_cd = fac_crop_cd;
	}

	public String getAcre_sz_to() {
		return acre_sz_to;
	}

	public void setAcre_sz_to(String acre_sz_to) {
		this.acre_sz_to = acre_sz_to;
	}

	public String getAcre_sz_from() {
		return acre_sz_from;
	}

	public void setAcre_sz_from(String acre_sz_from) {
		this.acre_sz_from = acre_sz_from;
	}

	public String getComNm() {
		return comNm;
	}

	public void setComNm(String comNm) {
		this.comNm = comNm;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public List<?> getOptionList() {
		return optionList;
	}

	public void setOptionList(List<?> optionList) {
		this.optionList = optionList;
	}

	public List<?> getAdmCdList() {
		return admCdList;
	}

	public void setAdmCdList(List<?> admCdList) {
		this.admCdList = admCdList;
	}

	public String getKisc_cd_1() {
		return kisc_cd_1;
	}

	public void setKisc_cd_1(String kisc_cd_1) {
		this.kisc_cd_1 = kisc_cd_1;
	}

	public String getKisc_cd_2() {
		return kisc_cd_2;
	}

	public void setKisc_cd_2(String kisc_cd_2) {
		this.kisc_cd_2 = kisc_cd_2;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public List getYear_list() {
		return year_list;
	}

	public void setYear_list(List year_list) {
		this.year_list = year_list;
	}

	public String getStatType() {
		return statType;
	}

	public void setStatType(String statType) {
		this.statType = statType;
	}

	public String getAdm_length() {
		return adm_length;
	}

	public void setAdm_length(String adm_length) {
		this.adm_length = adm_length;
	}

	
	public String getBnd_grid() {
		return bnd_grid;
	}

	public void setBnd_grid(String bnd_grid) {
		this.bnd_grid = bnd_grid;
	}

	public String[] getEdu_level_list() {
		return edu_level_list;
	}

	public void setEdu_level_list(String[] edu_level_list) {
		this.edu_level_list = edu_level_list;
	}

	public String[] getMrg_state_list() {
		return mrg_state_list;
	}

	public void setMrg_state_list(String[] mrg_state_list) {
		this.mrg_state_list = mrg_state_list;
	}

	public String getEdu_level() {
		return edu_level;
	}

	public void setEdu_level(String edu_level) {
		this.edu_level = edu_level;
	}

	public String getMrg_state() {
		return mrg_state;
	}

	public void setMrg_state(String mrg_state) {
		this.mrg_state = mrg_state;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getArea_type() {
		return area_type;
	}

	public void setArea_type(String area_type) {
		this.area_type = area_type;
	}

	public String getLow_search() {
		return low_search;
	}

	public void setLow_search(String low_search) {
		this.low_search = low_search;
	}

	public String getAge_from() {
		return age_from;
	}

	public void setAge_from(String age_from) {
		this.age_from = age_from;
	}

	public String getAge_to() {
		return age_to;
	}

	public void setAge_to(String age_to) {
		this.age_to = age_to;
	}

	public String getBnd_year() {
		return bnd_year;
	}

	public void setBnd_year(String bnd_year) {
		this.bnd_year = bnd_year;
	}

	public String getZoom() {
		return zoom;
	}

	public void setZoom(String zoom) {
		this.zoom = zoom;
	}

	public String getIs_zoom_lvl4() {
		return is_zoom_lvl4;
	}

	public void setIs_zoom_lvl4(String is_zoom_lvl4) {
		this.is_zoom_lvl4 = is_zoom_lvl4;
	}

	public String getIs_non_self() {
		return is_non_self;
	}

	public void setIs_non_self(String is_non_self) {
		this.is_non_self = is_non_self;
	}

	public String getDetail_search_theme() {
		return detail_search_theme;
	}

	public void setDetail_search_theme(String detail_search_theme) {
		this.detail_search_theme = detail_search_theme;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getAdm_cd2() {
		return adm_cd2;
	}

	public void setAdm_cd2(String adm_cd2) {
		this.adm_cd2 = adm_cd2;
	}

	public String getBord_type() {
		return bord_type;
	}

	public void setBord_type(String bord_type) {
		this.bord_type = bord_type;
	}

	public String getBiz_cd() {
		return biz_cd;
	}

	public void setBiz_cd(String biz_cd) {
		this.biz_cd = biz_cd;
	}

	public String getCnd_cd() {
		return cnd_cd;
	}

	public void setCnd_cd(String cnd_cd) {
		this.cnd_cd = cnd_cd;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getSido_cd() {
		return sido_cd;
	}

	public void setSido_cd(String sido_cd) {
		this.sido_cd = sido_cd;
	}

	public String getSigungu_cd() {
		return sigungu_cd;
	}

	public void setSigungu_cd(String sigungu_cd) {
		this.sigungu_cd = sigungu_cd;
	}

	public String getDong_cd() {
		return dong_cd;
	}

	public void setDong_cd(String dong_cd) {
		this.dong_cd = dong_cd;
	}

	private String b_theme_cd;

	public String getB_theme_cd() {
		return b_theme_cd;
	}

	public void setB_theme_cd(String b_theme_cd) {
		this.b_theme_cd = b_theme_cd;
	}

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

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getC_year() {
		return c_year;
	}

	public void setC_year(String c_year) {
		this.c_year = c_year;
	}

	public String getD_year() {
		return d_year;
	}

	public void setD_year(String d_year) {
		this.d_year = d_year;
	}

}