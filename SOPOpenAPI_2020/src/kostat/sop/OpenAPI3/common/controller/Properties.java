package kostat.sop.OpenAPI3.common.controller;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.session.SqlSessionFactory;

public class Properties {
	private static final Log logger = LogFactory.getLog(Properties.class);
	
	public static List area_type_list = null;
	public static List low_search_list = null;
	public static List year_list = null;
	public static List bnd_year_list = null;
	public static List oga_div_list = null;
	public static List house_type_list = null;
	public static List const_year_list = null;
	public static List gender_list = null;
	public static List edu_level_list = null;
	public static List study_level_list = null;
	public static List household_type_list = null;
	public static List company_year_list = null;
	public static List bnd_cd_list = null;
	public static SqlSessionFactory sqlSessionFactory = null;
	public static String defult_bnd_year = null;
	public static String java_script_file_path = null;
	public static String data_portal_service_key;
	public static String data_portal_secret_key;
	
	
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory를 설정한다. 
	 */
	public void setSqlSessionFactory(SqlSessionFactory factory) {
		sqlSessionFactory = factory;
	}
	/**
	 * DB 세션을 위한 Mybatis SqlSessionFactory 를 얻는다.
	 * 
	 * @return sqlSessionFactory DB 세션을 위한 Factory Object
	 */
//	public static synchronized SqlSessionFactory getSqlSessionFactory() {
//		return sqlSessionFactory;
//	}
	
	
	public static String getJava_script_file_path() {
		return java_script_file_path;
	}
	public void setJava_script_file_path(String java_script_file_path) {
		Properties.java_script_file_path = java_script_file_path;
	}
	public static List getHousehold_type_list() {
		return household_type_list;
	}
	public void setHousehold_type_list(List household_type_list) {
		Properties.household_type_list = household_type_list;
	}
	public static String getDefult_bnd_year() {
		return defult_bnd_year;
	}
	public static List getCompany_year_list() {
		return company_year_list;
	}
	public void setCompany_year_list(List company_year_list) {
		Properties.company_year_list = company_year_list;
	}
	public void setDefult_bnd_year(String defult_bnd_year) {
		Properties.defult_bnd_year = defult_bnd_year;
	}
	public static List getArea_type_list() {
		return area_type_list;
	}
	public void setArea_type_list(List area_type_list) {
		Properties.area_type_list = area_type_list;
	}
	public static List getLow_search_list() {
		return low_search_list;
	}
	public void setLow_search_list(List low_search_list) {
		Properties.low_search_list = low_search_list;
	}
	public static List getYear_list() {
		return year_list;
	}
	public void setYear_list(List year_list) {
		Properties.year_list = year_list;
	}
	public static List getBnd_year_list() {
		return bnd_year_list;
	}
	public void setBnd_year_list(List bnd_year_list) {
		Properties.bnd_year_list = bnd_year_list;
	}
	public static List getOga_div_list() {
		return oga_div_list;
	}
	public void setOga_div_list(List oga_div_list) {
		Properties.oga_div_list = oga_div_list;
	}
	public static List getHouse_type_list() {
		return house_type_list;
	}
	public void setHouse_type_list(List house_type_list) {
		Properties.house_type_list = house_type_list;
	}
	public static List getConst_year_list() {
		return const_year_list;
	}
	public void setConst_year_list(List const_year_list) {
		Properties.const_year_list = const_year_list;
	}
	public static List getGender_list() {
		return gender_list;
	}
	public void setGender_list(List gender_list) {
		Properties.gender_list = gender_list;
	}
	public static List getEdu_level_list() {
		return edu_level_list;
	}
	public void setEdu_level_list(List edu_level_list) {
		Properties.edu_level_list = edu_level_list;
	}
	public static List getStudy_level_list() {
		return study_level_list;
	}
	public void setStudy_level_list(List study_level_list) {
		Properties.study_level_list = study_level_list;
	}
	public static List getBnd_cd_list() {
		return bnd_cd_list;
	}
	public void setBnd_cd_list(List bnd_cd_list) {
		Properties.bnd_cd_list = bnd_cd_list;
	}
	public static String getData_portal_service_key()
	{
		return data_portal_service_key;
	}
	public void setData_portal_service_key( String data_portal_service_key )
	{
		Properties.data_portal_service_key = data_portal_service_key;
	}
	public static String getData_portal_secret_key()
	{
		return data_portal_secret_key;
	}
	public void setData_portal_secret_key( String data_portal_secret_key )
	{
		Properties.data_portal_secret_key = data_portal_secret_key;
	}
	
	
}
