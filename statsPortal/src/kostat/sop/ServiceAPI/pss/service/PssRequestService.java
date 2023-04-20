package kostat.sop.ServiceAPI.pss.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kostat.sop.ServiceAPI.pss.vo.PssVo;

public interface PssRequestService {
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCategoryCode(Map<String, Object> mapParameter) throws SQLException;
	
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusCode(Map<String, Object> mapParameter) throws SQLException;
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusData(Map<String, Object> mapParameter) throws SQLException;
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusYear(Map<String, Object> mapParameter) throws SQLException;
	
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusDetail(Map<String, Object> mapParameter) throws SQLException;
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusSido(Map<String, Object> mapParameter) throws SQLException;
	
	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List selectCensusSigungu(Map<String, Object> mapParameter) throws SQLException;


	/**
	 * 카테고리 코드 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List<Object> selectCodeList(HashMap<String, Object> map);
	
	

	/**
	 * 시도코드 리스트 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public List<Object> selectAreaCodeList(HashMap<String, Object> map);
	
	/**
	 * 시도코드 리스트 조회
	 * 
	 * @param mapParameter
	 *		lclas_cl : 분류코드 (nullable)
	 * @exception Exception
	 */
	public Map<String, String> savePssData(PssVo pssVo) throws Exception;

}
