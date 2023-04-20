package kostat.sop.ServiceAPI.api.common;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kostat.sop.ServiceAPI.api.common.mapper.CommonDao;
import kostat.sop.ServiceAPI.common.controller.AbsAuth;
import kostat.sop.ServiceAPI.common.util.Success;
import kostat.sop.ServiceAPI.exception.ApiException;

import org.apache.log4j.Logger;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

/**   
 *
 * @ClassName: GetAPIMClass
 * @Description： 
 *
 * @author KSY
 * @date：2018.08.06
 * @version V1.0      
 *    
 */
public class NewMakeZipFile extends AbsAuth<Success> {

	private static final Logger logger = Logger.getLogger(NewMakeZipFile.class);
	
	@Resource
	private CommonDao commonDao;
	
	@Override
	public String getApiId() {
		return "common_newmakefile";
	}

	@Override
	public HttpMethod getHttpMethod() {
		return HttpMethod.POST;
	}
	
	@Override
	public String getWorkNm() {
		return "생성";
	}
	

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Success executeAPI(HttpServletRequest req, HttpServletResponse res, String trId) throws AbsException {
		
		Map paramMap = getParameterMap(req);
		
		/**
		 * sgis_census_id : 1-통계자료
		 * 
		 * sgis_census_data_id
		 * 0-집계구별통계(인구) :
		 *      in_01(교육정도별인구) in_02(성연령별인구) in_03(성_혼인상태별인구)
		 *      in_04(인구총괄(총인구)) in_05(인구총괄(평균나이)) in_06(인구총괄(인구밀도))
		 *      in_07(인구총괄(노령화지수)) in_08(인구총괄(노년부양비)) in_09(인구총괄(유년부양비))
		 * 
		 * 1-집계구별통계(가구)
		 *      ga_01(점유형태별가구) ga_02(세대구성별가구) ga_03(가구총괄)
		 * 
		 * 2-집계구별통계(주택)
		 *      ho_01(건축년도별주택) ho_03(주택유형별주택) ho_04(연건평별주택) ho_05(주택총괄_총주택(거처)수)
		 * 
		 * 3-집계구별통계(사업체)
		 *      cp_02(산업분류별(9차_대분류)_종사자수) cp_04(산업분류별(9차_대분류)_사업체수) cp_06(산업분류별(9차_대분류)_총괄사업체수)
		 *      cp_01(산업분류별(8차_대분류)_종사자수) cp_03(산업분류별(8차_대분류)_사업체수) cp_05(산업분류별(8차_대분류)_총괄사업체수)
		 */
		
		String baseYear = (String) paramMap.get("SGIS_CENSUS_YEAR");
		String census_output_area_year = (String) paramMap.get("CENSUS_OUTPUT_AREA_YEAR");
		//String sgis_census_id = (String) paramMap.get("SGIS_CENSUS_ID");
		String sgis_census_data_id = (String) paramMap.get("SGIS_CENSUS_DATA_ID");
		String sgis_census_detail_data_id = (String) paramMap.get("SGIS_CENSUS_DETAIL_DATA_ID");
		String sgis_census_sido_id = (String) paramMap.get("SGIS_CENSUS_SIDO");
		String sgis_census_sigungu_id = (String) paramMap.get("SGIS_CENSUS_SIGUNGU");
		
		if(!"00000".equals(sgis_census_sigungu_id)) sgis_census_sido_id = "00";
		else sgis_census_sido_id = sgis_census_sido_id.substring(4);
		
		try {
			Map mapParameter = new HashMap();
			mapParameter.put("census_output_area_year", census_output_area_year);
			mapParameter.put("baseYear", baseYear);
			mapParameter.put("sgis_census_sido_id", sgis_census_sido_id);
			mapParameter.put("sgis_census_sigungu_id", sgis_census_sigungu_id);
			List result_sigungu = commonDao.sigungu(mapParameter);
			
			for(int k = 0; k < result_sigungu.size(); k++) {
				
				HashMap data_sigungu = (HashMap)result_sigungu.get(k);
				
				String sigunguCd = (String) data_sigungu.get("SGIS_CENSUS_SIGUNGU");//sgis_census_sigungu
				//String sigungu_nm = (String) data_sigungu.get("sigungu_nm");
				//String sido_nm = (String) data_sigungu.get("sido_nm");
				String sigunguNm = "";
				String sigunguCd1 = (String) data_sigungu.get("SGIS_CENSUS_SIGUNGU");
				if(!"00000".equals(sigunguCd)) {
					mapParameter.put("totRegCd", sigunguCd);
					//if(sigungu_nm != null && sigungu_nm != "") sigunguNm = "(" + sido_nm + " " + sigungu_nm + ")";
					//else sigunguNm = "(" + sido_nm + ")";
					sigunguCd += "_";
				}
				else {
					sigunguCd = "";
					sigunguCd1 = "00";
				}
				
				String txt1 = census_output_area_year + "년기준_";
				if(sigunguCd != "") txt1 = "";
				
				/**
				 * TODO : 파일경로 및 파일명
				 */
				//집계구별 통계(사업체)
				String txt = "";
				if(Integer.parseInt(baseYear) < 2006) txt = "8차_대분류";
				else txt = "9차_대분류";
				//String cpDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_cp\\oa_cp_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 ~ 2016
				String cpDir = "/DATA/docs/statsPotal/upload" + "/census/new_txt_data_" + census_output_area_year + "/oa_cp/oa_cp_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 ~ 2016
				
				
				//String cpBemDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_cp\\oa_cp_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 ~ 2016
				//String cpBnuDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_cp\\oa_cp_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 ~ 2016
				//String toFaDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_cp\\oa_cp_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 ~ 2016
				
				File createCpBemDir = new File(cpDir);
				if(!createCpBemDir.isDirectory()) createCpBemDir.mkdirs();
				//File createCpBnuDir = new File(cpBnuDir);
				//if(!createCpBnuDir.isDirectory()) createCpBnuDir.mkdirs();
				//File createToFaDir = new File(toFaDir);
				//if(!createToFaDir.isDirectory()) createToFaDir.mkdirs();
				
				String cpBemFileName = txt1 + sigunguCd + baseYear + "년_산업분류별(" + txt + ")_종사자수" + sigunguNm + ".txt";//2000 ~ 2016
				String cpBnuFileName = txt1 + sigunguCd + baseYear + "년_산업분류별(" + txt + ")_사업체수" + sigunguNm + ".txt";//2000 ~ 2016
				String toFaFileName = txt1 + sigunguCd + baseYear + "년_산업분류별(" + txt + ")_총괄사업체수" + sigunguNm + ".txt";//2000 ~ 2016
				
				/*
				String cpBem = cpDir + "\\" + cpBemFileName;
				String cpBnu = cpDir + "\\" + cpBnuFileName;
				String toFa = cpDir + "\\" + toFaFileName;
				*/
				String cpBem = cpDir + "/" + cpBemFileName;
				String cpBnu = cpDir + "/" + cpBnuFileName;
				String toFa = cpDir + "/" + toFaFileName;
				
				
				//집계구별 통계(주택)
				//String gunYyyyDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ho\\oa_ho_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				String gunYyyyDir = "/DATA/docs/statsPotal/upload" + "/census/new_txt_data_" + census_output_area_year + "/oa_ho/oa_ho_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				
				
				
				//String juYuDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ho\\oa_ho_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String sizeDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ho\\oa_ho_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toHoDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ho\\oa_ho_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				
				File createGunYyyyDir = new File(gunYyyyDir);
				if(!createGunYyyyDir.isDirectory()) createGunYyyyDir.mkdirs();
				//File createJuYuDir = new File(juYuDir);
				//if(!createJuYuDir.isDirectory()) createJuYuDir.mkdirs();
				//File createSizeDir = new File(sizeDir);
				//if(!createSizeDir.isDirectory()) createSizeDir.mkdirs();
				//File createToHoDir = new File(toHoDir);
				//if(!createToHoDir.isDirectory()) createToHoDir.mkdirs();
				
				String gunYyyyFileName = "";
				if(Integer.parseInt(baseYear) >= 2015) gunYyyyFileName = txt1 + sigunguCd + baseYear + "년_노후년수별주택" + sigunguNm + ".txt";//2015 2016
				else gunYyyyFileName = txt1 + sigunguCd + baseYear + "년_건축년도별주택" + sigunguNm + ".txt";//2000 2005 2010
				String juYuFileName = txt1 + sigunguCd + baseYear + "년_주택유형별주택" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String sizeFileName = txt1 + sigunguCd + baseYear + "년_연건평별주택" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toHoFileName = txt1 + sigunguCd + baseYear + "년_주택총괄_총주택(거처)수" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				
				/*
				String gunYyyy = gunYyyyDir + "\\" + gunYyyyFileName;
				String juYu = gunYyyyDir + "\\" + juYuFileName;
				String size = gunYyyyDir + "\\" + sizeFileName;
				String toHo = gunYyyyDir + "\\" + toHoFileName;
				*/
				String gunYyyy = gunYyyyDir + "/" + gunYyyyFileName;
				String juYu = gunYyyyDir + "/" + juYuFileName;
				String size = gunYyyyDir + "/" + sizeFileName;
				String toHo = gunYyyyDir + "/" + toHoFileName;
								
				
				
				//집계구별 통계(가구)
				//String gabuJumDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ga\\oa_ga_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				String gabuJumDir = "/DATA/docs/statsPotal/upload" + "/census/new_txt_data_" + census_output_area_year + "/oa_ga/oa_ga_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				
				//String gabuSedaDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ga\\oa_ga_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toGaDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_ga\\oa_ga_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				
				File createGabuJumDir = new File(gabuJumDir);
				if(!createGabuJumDir.isDirectory()) createGabuJumDir.mkdirs();
				//File createGabuSedaDir = new File(gabuSedaDir);
				//if(!createGabuSedaDir.isDirectory()) createGabuSedaDir.mkdirs();
				//File createToGaDir = new File(toGaDir);
				//if(!createToGaDir.isDirectory()) createToGaDir.mkdirs();
				
				String gabuJumFileName = txt1 + sigunguCd + baseYear + "년_점유형태별가구" + sigunguNm + ".txt";//2000 2005 2010
				String gabuSedaFileName = txt1 + sigunguCd + baseYear + "년_세대구성별가구" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toGaFileName = txt1 + sigunguCd + baseYear + "년_가구총괄" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				
				/*
				String gabuJum = gabuJumDir + "\\" + gabuJumFileName;
				String gabuSeda = gabuJumDir + "\\" + gabuSedaFileName;
				String toGa = gabuJumDir + "\\" + toGaFileName;
				*/
				String gabuJum = gabuJumDir + "/" + gabuJumFileName;
				String gabuSeda = gabuJumDir + "/" + gabuSedaFileName;
				String toGa = gabuJumDir + "/" + toGaFileName;
				
				//집계구별 통계(인구)
				//String eduDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				String eduDir = "/DATA/docs/statsPotal/upload" + "/census/new_txt_data_" + census_output_area_year + "/oa_in/oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				
				
				
				//String inguDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String marryDir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010
				//String toIn001Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toIn002Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toIn003Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toIn004Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toIn005Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				//String toIn006Dir = "C:\\DATA\\docs\\statsPotal\\upload" + "\\census\\new_txt_data_" + census_output_area_year + "\\oa_in\\oa_in_" + sigunguCd1 + "_" + baseYear + "_" + census_output_area_year;//2000 2005 2010 2015 2016
				
				File createEduDir = new File(eduDir);
				if(!createEduDir.isDirectory()) createEduDir.mkdirs();
				//File createInguDir = new File(inguDir);
				//if(!createInguDir.isDirectory()) createInguDir.mkdirs();
				//File createMarryDir = new File(marryDir);
				//if(!createMarryDir.isDirectory()) createMarryDir.mkdirs();
				//File createToIn001Dir = new File(toIn001Dir);
				//if(!createToIn001Dir.isDirectory()) createToIn001Dir.mkdirs();
				//File createToIn002Dir = new File(toIn002Dir);
				//if(!createToIn002Dir.isDirectory()) createToIn002Dir.mkdirs();
				//File createToIn003Dir = new File(toIn003Dir);
				//if(!createToIn003Dir.isDirectory()) createToIn003Dir.mkdirs();
				//File createToIn004Dir = new File(toIn004Dir);
				//if(!createToIn004Dir.isDirectory()) createToIn004Dir.mkdirs();
				//File createToIn005Dir = new File(toIn005Dir);
				//if(!createToIn005Dir.isDirectory()) createToIn005Dir.mkdirs();
				//File createToIn006Dir = new File(toIn006Dir);
				//if(!createToIn006Dir.isDirectory()) createToIn006Dir.mkdirs();
				
				String eduFileName = txt1 + sigunguCd + baseYear + "년_교육정도별인구" + sigunguNm + ".txt";//2000 2005 2010
				String inguFileName = txt1 + sigunguCd + baseYear + "년_성연령별인구" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String marryFileName = txt1 + sigunguCd + baseYear + "년_성_혼인상태별인구" + sigunguNm + ".txt";//2000 2005 2010
				String toIn001FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(총인구)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toIn002FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(평균나이)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toIn003FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(인구밀도)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toIn004FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(노령화지수)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toIn005FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(노년부양비)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				String toIn006FileName = txt1 + sigunguCd + baseYear + "년_인구총괄(유년부양비)" + sigunguNm + ".txt";//2000 2005 2010 2015 2016
				
				/*
				String edu = eduDir + "\\" + eduFileName;
				String ingu = eduDir + "\\" + inguFileName;
				String marry = eduDir + "\\" + marryFileName;
				String toIn001 = eduDir + "\\" + toIn001FileName;
				String toIn002 = eduDir + "\\" + toIn002FileName;
				String toIn003 = eduDir + "\\" + toIn003FileName;
				String toIn004 = eduDir + "\\" + toIn004FileName;
				String toIn005 = eduDir + "\\" + toIn005FileName;
				String toIn006 = eduDir + "\\" + toIn006FileName;
				*/
				String edu = eduDir + "/" + eduFileName;
				String ingu = eduDir + "/" + inguFileName;
				String marry = eduDir + "/" + marryFileName;
				String toIn001 = eduDir + "/" + toIn001FileName;
				String toIn002 = eduDir + "/" + toIn002FileName;
				String toIn003 = eduDir + "/" + toIn003FileName;
				String toIn004 = eduDir + "/" + toIn004FileName;
				String toIn005 = eduDir + "/" + toIn005FileName;
				String toIn006 = eduDir + "/" + toIn006FileName;
				
				/**
				 * TODO : 집계구별 통계(사업체)
				 */
				//********************************************************************
				//**** 산업분류별(종사자수)*******************************************
				//********************************************************************
				/** 2000 ~ 2016 */
				if(sgis_census_data_id.equals("3") && (sgis_census_detail_data_id.indexOf("cp_01") > -1 || sgis_census_detail_data_id.indexOf("cp_02") > -1)) {
					BufferedWriter fw_cpBem = new BufferedWriter(new FileWriter(cpBem, false));
					StringBuilder str_cpBem = null;
					
					mapParameter.put("type", "cp_bem");
					List result_cpBem = commonDao.cpFile(mapParameter);
					
					str_cpBem = new StringBuilder();
					str_cpBem.append("base_year^tot_oa_cd^item^value");
					fw_cpBem.write(str_cpBem.toString());
					fw_cpBem.newLine();
					fw_cpBem.flush();
					for(int i = 0; i < result_cpBem.size(); i++) {
						str_cpBem = new StringBuilder();
						HashMap data = (HashMap)result_cpBem.get(i);
						str_cpBem.append(data.get("base_year"));
						str_cpBem.append("^");
						str_cpBem.append(data.get("tot_reg_cd"));
						str_cpBem.append("^");
						str_cpBem.append(data.get("gbn"));
						str_cpBem.append("^");
						str_cpBem.append(data.get("cnt"));
						fw_cpBem.write(str_cpBem.toString());
						fw_cpBem.newLine();
						fw_cpBem.flush();
					}
					fw_cpBem.close();
				}
				//********************************************************************
				//**** 산업분류별(종사자수)*******************************************
				//********************************************************************
				
				//********************************************************************
				//**** 산업분류별(사업체수)*******************************************
				//********************************************************************
				/** 2000 ~ 2016 */
				if(sgis_census_data_id.equals("3") && (sgis_census_detail_data_id.indexOf("cp_03") > -1 || sgis_census_detail_data_id.indexOf("cp_04") > -1)) {
					BufferedWriter fw_cpBnu = new BufferedWriter(new FileWriter(cpBnu, false));
					StringBuilder str_cpBnu = null;
					
					mapParameter.put("type", "cp_bnu");
					List result_cpBnu = commonDao.cpFile(mapParameter);
					
					str_cpBnu = new StringBuilder();
					str_cpBnu.append("base_year^tot_oa_cd^item^value");
					fw_cpBnu.write(str_cpBnu.toString());
					fw_cpBnu.newLine();
					fw_cpBnu.flush();
					for(int i = 0; i < result_cpBnu.size(); i++) {
						str_cpBnu = new StringBuilder();
						HashMap data = (HashMap)result_cpBnu.get(i);
						str_cpBnu.append(data.get("base_year"));
						str_cpBnu.append("^");
						str_cpBnu.append(data.get("tot_reg_cd"));
						str_cpBnu.append("^");
						str_cpBnu.append(data.get("gbn"));
						str_cpBnu.append("^");
						str_cpBnu.append(data.get("cnt"));
						fw_cpBnu.write(str_cpBnu.toString());
						fw_cpBnu.newLine();
						fw_cpBnu.flush();
					}
					fw_cpBnu.close();
				}
				//********************************************************************
				//**** 산업분류별(사업체수)*******************************************
				//********************************************************************
				
				//********************************************************************
				//**** 총괄사업체수 **************************************************
				//********************************************************************
				/** 2000 ~ 2016 */
				if(sgis_census_data_id.equals("3") && (sgis_census_detail_data_id.indexOf("cp_05") > -1 || sgis_census_detail_data_id.indexOf("cp_06") > -1)) {
					BufferedWriter fw_toFa = new BufferedWriter(new FileWriter(toFa, false));
					StringBuilder str_toFa = null;
					
					List result_toFa = commonDao.toFaFile(mapParameter);
					
					str_toFa = new StringBuilder();
					str_toFa.append("base_year^tot_oa_cd^item^value");
					fw_toFa.write(str_toFa.toString());
					fw_toFa.newLine();
					fw_toFa.flush();
					for(int i = 0; i < result_toFa.size(); i++) {
						str_toFa = new StringBuilder();
						HashMap data = (HashMap)result_toFa.get(i);
						str_toFa.append(data.get("base_year"));
						str_toFa.append("^");
						str_toFa.append(data.get("tot_reg_cd"));
						str_toFa.append("^");
						str_toFa.append(data.get("gbn"));
						str_toFa.append("^");
						str_toFa.append(data.get("cnt"));
						fw_toFa.write(str_toFa.toString());
						fw_toFa.newLine();
						fw_toFa.flush();
					}
					fw_toFa.close();
				}
				//********************************************************************
				//**** 총괄사업체수 **************************************************
				//********************************************************************
				
				/**
				 * TODO : 집계구별 통계(주택)
				 */
				//********************************************************************
				//**** 노후년수별주택 ************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("2") && sgis_census_detail_data_id.indexOf("ho_01") > -1) {
						BufferedWriter fw_gunYyyy = new BufferedWriter(new FileWriter(gunYyyy, false));
						StringBuilder str_gunYyyy = null;
						
						if(Integer.parseInt(baseYear) < 2015) mapParameter.put("type", "ho_yr");
						else mapParameter.put("type", "ho_pr");
						List result_gunYyyy = commonDao.gunYyyyFile(mapParameter);
						
						str_gunYyyy = new StringBuilder();
						str_gunYyyy.append("base_year^tot_oa_cd^item^value");
						fw_gunYyyy.write(str_gunYyyy.toString());
						fw_gunYyyy.newLine();
						fw_gunYyyy.flush();
						for(int i = 0; i < result_gunYyyy.size(); i++) {
							str_gunYyyy = new StringBuilder();
							HashMap data = (HashMap)result_gunYyyy.get(i);
							str_gunYyyy.append(data.get("base_year"));
							str_gunYyyy.append("^");
							str_gunYyyy.append(data.get("tot_reg_cd"));
							str_gunYyyy.append("^");
							str_gunYyyy.append(data.get("gbn"));
							str_gunYyyy.append("^");
							str_gunYyyy.append(data.get("cnt"));
							fw_gunYyyy.write(str_gunYyyy.toString());
							fw_gunYyyy.newLine();
							fw_gunYyyy.flush();
						}
						fw_gunYyyy.close();
					}
				}
				//********************************************************************
				//**** 노후년수별주택 ************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 주택유형별주택 ************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("2") && sgis_census_detail_data_id.indexOf("ho_03") > -1) {
						BufferedWriter fw_juYu = new BufferedWriter(new FileWriter(juYu, false));
						StringBuilder str_juYu = null;
						
						List result_juYu = commonDao.juYuFile(mapParameter);
						
						str_juYu = new StringBuilder();
						str_juYu.append("base_year^tot_oa_cd^item^value");
						fw_juYu.write(str_juYu.toString());
						fw_juYu.newLine();
						fw_juYu.flush();
						for(int i = 0; i < result_juYu.size(); i++) {
							str_juYu = new StringBuilder();
							HashMap data = (HashMap)result_juYu.get(i);
							str_juYu.append(data.get("base_year"));
							str_juYu.append("^");
							str_juYu.append(data.get("tot_reg_cd"));
							str_juYu.append("^");
							str_juYu.append(data.get("gbn"));
							str_juYu.append("^");
							str_juYu.append(data.get("cnt"));
							fw_juYu.write(str_juYu.toString());
							fw_juYu.newLine();
							fw_juYu.flush();
						}
						fw_juYu.close();
					}
				}
				//********************************************************************
				//**** 주택유형별주택 ************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 연건평별주택 **************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("2") && sgis_census_detail_data_id.indexOf("ho_04") > -1) {
						BufferedWriter fw_size = new BufferedWriter(new FileWriter(size, false));
						StringBuilder str_size = null;
						
						List result_size = commonDao.sizeFile(mapParameter);
						
						str_size = new StringBuilder();
						str_size.append("base_year^tot_oa_cd^item^value");
						fw_size.write(str_size.toString());
						fw_size.newLine();
						fw_size.flush();
						for(int i = 0; i < result_size.size(); i++) {
							str_size = new StringBuilder();
							HashMap data = (HashMap)result_size.get(i);
							str_size.append(data.get("base_year"));
							str_size.append("^");
							str_size.append(data.get("tot_reg_cd"));
							str_size.append("^");
							str_size.append(data.get("gbn"));
							str_size.append("^");
							str_size.append(data.get("cnt"));
							fw_size.write(str_size.toString());
							fw_size.newLine();
							fw_size.flush();
						}
						fw_size.close();
					}
				}
				//********************************************************************
				//**** 연건평별주택 **************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 주택총괄_총주택(거처)수 ***************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("2") && sgis_census_detail_data_id.indexOf("ho_05") > -1) {
						BufferedWriter fw_toHo = new BufferedWriter(new FileWriter(toHo, false));
						StringBuilder str_toHo = null;
						
						List result_toHo = commonDao.toFile(mapParameter);
						
						str_toHo = new StringBuilder();
						str_toHo.append("base_year^tot_oa_cd^item^value");
						fw_toHo.write(str_toHo.toString());
						fw_toHo.newLine();
						fw_toHo.flush();
						for(int i = 0; i < result_toHo.size(); i++) {
							str_toHo = new StringBuilder();
							HashMap data = (HashMap)result_toHo.get(i);
							str_toHo.append(baseYear);
							str_toHo.append("^");
							str_toHo.append(data.get("adm_cd"));
							str_toHo.append("^");
							str_toHo.append("to_ho_001");
							str_toHo.append("^");
							str_toHo.append(data.get("tot_house"));
							fw_toHo.write(str_toHo.toString());
							fw_toHo.newLine();
							fw_toHo.flush();
						}
						fw_toHo.close();
					}
				}
				//********************************************************************
				//**** 주택총괄_총주택(거처)수 ***************************************
				//********************************************************************
				
				/**
				 * TODO : 집계구별 통계(가구)
				 */
				//********************************************************************
				//**** 점유형태별가구 ************************************************
				//********************************************************************
				if(baseYear.length() == 4 && ("2000*2005*2010").indexOf(baseYear) > -1) { /** 2000 2005 2010 */
					if(sgis_census_data_id.equals("1") && sgis_census_detail_data_id.indexOf("ga_01") > -1) {
						BufferedWriter fw_gabuJum = new BufferedWriter(new FileWriter(gabuJum, false));
						StringBuilder str_gabuJum = null;
						
						List result_gabuJum = commonDao.gabuJumFile(mapParameter);
						
						str_gabuJum = new StringBuilder();
						str_gabuJum.append("base_year^tot_oa_cd^item^value");
						fw_gabuJum.write(str_gabuJum.toString());
						fw_gabuJum.newLine();
						fw_gabuJum.flush();
						for(int i = 0; i < result_gabuJum.size(); i++) {
							str_gabuJum = new StringBuilder();
							HashMap data = (HashMap)result_gabuJum.get(i);
							str_gabuJum.append(data.get("base_year"));
							str_gabuJum.append("^");
							str_gabuJum.append(data.get("tot_reg_cd"));
							str_gabuJum.append("^");
							str_gabuJum.append(data.get("gbn"));
							str_gabuJum.append("^");
							str_gabuJum.append(data.get("cnt"));
							fw_gabuJum.write(str_gabuJum.toString());
							fw_gabuJum.newLine();
							fw_gabuJum.flush();
						}
						fw_gabuJum.close();
					}
				}
				//********************************************************************
				//**** 점유형태별가구 ************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 세대구성별가구 ************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("1") && sgis_census_detail_data_id.indexOf("ga_02") > -1) {
						BufferedWriter fw_gabuSeda = new BufferedWriter(new FileWriter(gabuSeda, false));
						StringBuilder str_gabuSeda = null;
						
						List result_gabuSeda = commonDao.gabuSedaFile(mapParameter);
						
						str_gabuSeda = new StringBuilder();
						str_gabuSeda.append("base_year^tot_oa_cd^item^value");
						fw_gabuSeda.write(str_gabuSeda.toString());
						fw_gabuSeda.newLine();
						fw_gabuSeda.flush();
						for(int i = 0; i < result_gabuSeda.size(); i++) {
							str_gabuSeda = new StringBuilder();
							HashMap data = (HashMap)result_gabuSeda.get(i);
							str_gabuSeda.append(data.get("base_year"));
							str_gabuSeda.append("^");
							str_gabuSeda.append(data.get("tot_reg_cd"));
							str_gabuSeda.append("^");
							str_gabuSeda.append(data.get("gbn"));
							str_gabuSeda.append("^");
							str_gabuSeda.append(data.get("cnt"));
							fw_gabuSeda.write(str_gabuSeda.toString());
							fw_gabuSeda.newLine();
							fw_gabuSeda.flush();
						}
						fw_gabuSeda.close();
					}
				}
				//********************************************************************
				//**** 세대구성별가구 ************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 가구총괄 ******************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("1") && sgis_census_detail_data_id.indexOf("ga_03") > -1) {
						BufferedWriter fw_toGa = new BufferedWriter(new FileWriter(toGa, false));
						StringBuilder str_toGa = null;
						
						List result_toGa = commonDao.toFile(mapParameter);
						
						str_toGa = new StringBuilder();
						str_toGa.append("base_year^tot_oa_cd^item^value");
						fw_toGa.write(str_toGa.toString());
						fw_toGa.newLine();
						fw_toGa.flush();
						for(int i = 0; i < result_toGa.size(); i++) {
							str_toGa = new StringBuilder();
							HashMap data = (HashMap)result_toGa.get(i);
							str_toGa.append(baseYear);
							str_toGa.append("^");
							str_toGa.append(data.get("adm_cd"));
							str_toGa.append("^");
							str_toGa.append("to_ga_001");
							str_toGa.append("^");
							str_toGa.append(data.get("tot_family"));
							fw_toGa.write(str_toGa.toString());
							fw_toGa.newLine();
							fw_toGa.flush();
							
							str_toGa = new StringBuilder();
							str_toGa.append(baseYear);
							str_toGa.append("^");
							str_toGa.append(data.get("adm_cd"));
							str_toGa.append("^");
							str_toGa.append("to_ga_002");
							str_toGa.append("^");
							str_toGa.append(data.get("avg_fmember_cnt"));
							fw_toGa.write(str_toGa.toString());
							fw_toGa.newLine();
							fw_toGa.flush();
						}
						fw_toGa.close();
					}
				}
				//********************************************************************
				//**** 가구총괄 ******************************************************
				//********************************************************************
				
				/**
				 * TODO : 집계구별 통계(인구)
				 */
				//********************************************************************
				//**** 교육정도별인구 ************************************************
				//********************************************************************
				if(baseYear.length() == 4 && ("2000*2005*2010").indexOf(baseYear) > -1) { /** 2000 2005 2010 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_01") > -1) {
						BufferedWriter fw_edu = new BufferedWriter(new FileWriter(edu, false));
						StringBuilder str_edu = null;
						
						List result_edu = commonDao.eduFile(mapParameter);
						
						str_edu = new StringBuilder();
						str_edu.append("base_year^tot_oa_cd^item^value");
						fw_edu.write(str_edu.toString());
						fw_edu.newLine();
						fw_edu.flush();
						for(int i = 0; i < result_edu.size(); i++) {
							str_edu = new StringBuilder();
							HashMap data = (HashMap)result_edu.get(i);
							str_edu.append(data.get("base_year"));
							str_edu.append("^");
							str_edu.append(data.get("tot_reg_cd"));
							str_edu.append("^");
							str_edu.append(data.get("gbn"));
							str_edu.append("^");
							str_edu.append(data.get("cnt"));
							fw_edu.write(str_edu.toString());
							fw_edu.newLine();
							fw_edu.flush();
						}
						fw_edu.close();
					}
				}
				//********************************************************************
				//**** 교육정도별인구 ************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 성연령별인구 **************************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_02") > -1) {
						BufferedWriter fw_ingu = new BufferedWriter(new FileWriter(ingu, false));
						StringBuilder str_ingu = null;
						
						List result_ingu = commonDao.inguFile(mapParameter);
						
						str_ingu = new StringBuilder();
						str_ingu.append("base_year^tot_oa_cd^item^value");
						fw_ingu.write(str_ingu.toString());
						fw_ingu.newLine();
						fw_ingu.flush();
						for(int i = 0; i < result_ingu.size(); i++) {
							str_ingu = new StringBuilder();
							HashMap data = (HashMap)result_ingu.get(i);
							str_ingu.append(data.get("base_year"));
							str_ingu.append("^");
							str_ingu.append(data.get("tot_reg_cd"));
							str_ingu.append("^");
							str_ingu.append(data.get("gbn"));
							str_ingu.append("^");
							str_ingu.append(data.get("cnt"));
							fw_ingu.write(str_ingu.toString());
							fw_ingu.newLine();
							fw_ingu.flush();
						}
						fw_ingu.close();
					}
				}
				//********************************************************************
				//**** 성연령별인구 **************************************************
				//********************************************************************
				
				//********************************************************************
				//**** 성_혼인상태별인구 *********************************************
				//********************************************************************
				if(baseYear.length() == 4 && ("2000*2005*2010").indexOf(baseYear) > -1) { /** 2000 2005 2010 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_03") > -1) {
						BufferedWriter fw_marry = new BufferedWriter(new FileWriter(marry, false));
						StringBuilder str_marry = null;
						
						List result_marry = commonDao.marryFile(mapParameter);
						
						str_marry = new StringBuilder();
						str_marry.append("base_year^tot_oa_cd^item^value");
						fw_marry.write(str_marry.toString());
						fw_marry.newLine();
						fw_marry.flush();
						for(int i = 0; i < result_marry.size(); i++) {
							str_marry = new StringBuilder();
							HashMap data = (HashMap)result_marry.get(i);
							str_marry.append(data.get("base_year"));
							str_marry.append("^");
							str_marry.append(data.get("tot_reg_cd"));
							str_marry.append("^");
							str_marry.append(data.get("gbn"));
							str_marry.append("^");
							str_marry.append(data.get("cnt"));
							fw_marry.write(str_marry.toString());
							fw_marry.newLine();
							fw_marry.flush();
						}
						fw_marry.close();
					}
				}
				//********************************************************************
				//**** 성_혼인상태별인구 *********************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(총인구) **********************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_04") > -1) {
						BufferedWriter fw_toIn001 = new BufferedWriter(new FileWriter(toIn001, false));
						StringBuilder str_toIn001 = null;
						
						List result_toIn001 = commonDao.toFile(mapParameter);
						
						str_toIn001 = new StringBuilder();
						str_toIn001.append("base_year^tot_oa_cd^item^value");
						fw_toIn001.write(str_toIn001.toString());
						fw_toIn001.newLine();
						fw_toIn001.flush();
						for(int i = 0; i < result_toIn001.size(); i++) {
							str_toIn001 = new StringBuilder();
							HashMap data = (HashMap)result_toIn001.get(i);
							str_toIn001.append(baseYear);
							str_toIn001.append("^");
							str_toIn001.append(data.get("adm_cd"));
							str_toIn001.append("^");
							str_toIn001.append("to_in_001");
							str_toIn001.append("^");
							str_toIn001.append(data.get("tot_ppltn"));
							fw_toIn001.write(str_toIn001.toString());
							fw_toIn001.newLine();
							fw_toIn001.flush();
						}
						fw_toIn001.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(총인구) **********************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(평균나이) ********************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_05") > -1) {
						BufferedWriter fw_toIn002 = new BufferedWriter(new FileWriter(toIn002, false));
						StringBuilder str_toIn002 = null;
						
						List result_toIn002 = commonDao.toFile(mapParameter);
						
						str_toIn002 = new StringBuilder();
						str_toIn002.append("base_year^tot_oa_cd^item^value");
						fw_toIn002.write(str_toIn002.toString());
						fw_toIn002.newLine();
						fw_toIn002.flush();
						for(int i = 0; i < result_toIn002.size(); i++) {
							str_toIn002 = new StringBuilder();
							HashMap data = (HashMap)result_toIn002.get(i);
							str_toIn002.append(baseYear);
							str_toIn002.append("^");
							str_toIn002.append(data.get("adm_cd"));
							str_toIn002.append("^");
							str_toIn002.append("to_in_002");
							str_toIn002.append("^");
							str_toIn002.append(data.get("tot_ppltn"));
							fw_toIn002.write(str_toIn002.toString());
							fw_toIn002.newLine();
							fw_toIn002.flush();
						}
						fw_toIn002.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(평균나이) ********************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(인구밀도) ********************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_06") > -1) {
						BufferedWriter fw_toIn003 = new BufferedWriter(new FileWriter(toIn003, false));
						StringBuilder str_toIn003 = null;
						
						List result_toIn003 = commonDao.toFile(mapParameter);
						
						str_toIn003 = new StringBuilder();
						str_toIn003.append("base_year^tot_oa_cd^item^value");
						fw_toIn003.write(str_toIn003.toString());
						fw_toIn003.newLine();
						fw_toIn003.flush();
						for(int i = 0; i < result_toIn003.size(); i++) {
							str_toIn003 = new StringBuilder();
							HashMap data = (HashMap)result_toIn003.get(i);
							str_toIn003.append(baseYear);
							str_toIn003.append("^");
							str_toIn003.append(data.get("adm_cd"));
							str_toIn003.append("^");
							str_toIn003.append("to_in_003");
							str_toIn003.append("^");
							str_toIn003.append(data.get("tot_ppltn"));
							fw_toIn003.write(str_toIn003.toString());
							fw_toIn003.newLine();
							fw_toIn003.flush();
						}
						fw_toIn003.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(인구밀도) ********************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(노령화지수) ******************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_07") > -1) {
						BufferedWriter fw_toIn004 = new BufferedWriter(new FileWriter(toIn004, false));
						StringBuilder str_toIn004 = null;
						
						List result_toIn004 = commonDao.toFile(mapParameter);
						
						str_toIn004 = new StringBuilder();
						str_toIn004.append("base_year^tot_oa_cd^item^value");
						fw_toIn004.write(str_toIn004.toString());
						fw_toIn004.newLine();
						fw_toIn004.flush();
						for(int i = 0; i < result_toIn004.size(); i++) {
							str_toIn004 = new StringBuilder();
							HashMap data = (HashMap)result_toIn004.get(i);
							str_toIn004.append(baseYear);
							str_toIn004.append("^");
							str_toIn004.append(data.get("adm_cd"));
							str_toIn004.append("^");
							str_toIn004.append("to_in_004");
							str_toIn004.append("^");
							str_toIn004.append(data.get("tot_ppltn"));
							fw_toIn004.write(str_toIn004.toString());
							fw_toIn004.newLine();
							fw_toIn004.flush();
						}
						fw_toIn004.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(노령화지수) ******************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(노년부양비) ******************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_08") > -1) {
						BufferedWriter fw_toIn005 = new BufferedWriter(new FileWriter(toIn005, false));
						StringBuilder str_toIn005 = null;
						
						List result_toIn005 = commonDao.toFile(mapParameter);
						
						str_toIn005 = new StringBuilder();
						str_toIn005.append("base_year^tot_oa_cd^item^value");
						fw_toIn005.write(str_toIn005.toString());
						fw_toIn005.newLine();
						fw_toIn005.flush();
						for(int i = 0; i < result_toIn005.size(); i++) {
							str_toIn005 = new StringBuilder();
							HashMap data = (HashMap)result_toIn005.get(i);
							str_toIn005.append(baseYear);
							str_toIn005.append("^");
							str_toIn005.append(data.get("adm_cd"));
							str_toIn005.append("^");
							str_toIn005.append("to_in_005");
							str_toIn005.append("^");
							str_toIn005.append(data.get("tot_ppltn"));
							fw_toIn005.write(str_toIn005.toString());
							fw_toIn005.newLine();
							fw_toIn005.flush();
						}
						fw_toIn005.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(노년부양비) ******************************************
				//********************************************************************
				
				//********************************************************************
				//**** 인구총괄(유년부양비) ******************************************
				//********************************************************************
				if(baseYear.length() == 4 && (("2000*2005*2010*2015*2016").indexOf(baseYear) > -1 || Integer.parseInt(baseYear) > 2016)) { /** 2000 2005 2010 2015 2016 */
					if(sgis_census_data_id.equals("0") && sgis_census_detail_data_id.indexOf("in_09") > -1) {
						BufferedWriter fw_toIn006 = new BufferedWriter(new FileWriter(toIn006, false));
						StringBuilder str_toIn006 = null;
						
						List result_toIn006 = commonDao.toFile(mapParameter);
						
						str_toIn006 = new StringBuilder();
						str_toIn006.append("base_year^tot_oa_cd^item^value");
						fw_toIn006.write(str_toIn006.toString());
						fw_toIn006.newLine();
						fw_toIn006.flush();
						for(int i = 0; i < result_toIn006.size(); i++) {
							str_toIn006 = new StringBuilder();
							HashMap data = (HashMap)result_toIn006.get(i);
							str_toIn006.append(baseYear);
							str_toIn006.append("^");
							str_toIn006.append(data.get("adm_cd"));
							str_toIn006.append("^");
							str_toIn006.append("to_in_005");
							str_toIn006.append("^");
							str_toIn006.append(data.get("tot_ppltn"));
							fw_toIn006.write(str_toIn006.toString());
							fw_toIn006.newLine();
							fw_toIn006.flush();
						}
						fw_toIn006.close();
					}
				}
				//********************************************************************
				//**** 인구총괄(유년부양비) ******************************************
				//********************************************************************
			
			}
			
			return new Success(true,"DOWNLOAD SUCCESS!");
		} 
		 catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException("서버에서 처리 중 에러가 발생하였습니다.\n현상이 반복될 경우 고객센터((02)2012-9114)로 문의하시기 바랍니다.");
		}
		
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getMustParameter() throws AbsException {
		return MustParam.class;
	}

	@SuppressWarnings("rawtypes")
	@Override
	public Class getOptionParameter() throws AbsException {
		return OptionParam.class;
	}
	
	private enum MustParam {
	}
	
	private enum OptionParam {
		SGIS_CENSUS_YEAR
		, CENSUS_OUTPUT_AREA_YEAR
		, SGIS_CENSUS_ID
		, SGIS_CENSUS_DATA_ID
		, SGIS_CENSUS_DETAIL_DATA_ID
		, SGIS_CENSUS_SIDO
		, SGIS_CENSUS_SIGUNGU
	}
	
}