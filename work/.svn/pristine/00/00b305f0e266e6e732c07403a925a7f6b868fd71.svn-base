package kostat.lbdms.ServiceAPI.controller.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kostat.lbdms.ServiceAPI.controller.model.rest.Execute;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Service
public interface MyDataService {
    
	/**
	 * 나의데이터 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getMyDataList(Map mapParameter) throws SQLException;
	
	/**
	 * TEXT, CSV , EXCEL 읽기
	 * @param List<MultipartFile> list,String data_type,String delimiter,String charsets,int startLine, int endLine
	 * @return List
	 * @exception IOException
	 */
	public List getMetaData(List<MultipartFile> list,String data_type,String delimiter,String charsets,int startLine, int endLine)throws IOException;
	
	/**
	 * TEXT, CSV , EXCEL 테이블 생성 컬럼 없이
	 * @param HttpServletResponse response,
		InputStream inputStream,
		String data_type,
		String output_table_name,
		String description,
		String header,
		String delimiter,
		String target_agent,
		String user_id,
		String encoding_type
	 * @return void
	 * @exception IOException
	 */
	public void createTable(HttpServletResponse response,
		InputStream inputStream,
		String data_type,
		String output_table_name,
		String description,
		String header,
		String delimiter,
		String target_agent,
		String user_id,
		String encoding_type
		) throws SystemFailException;
	/**
	 * TEXT, CSV , EXCEL 테이블 생성 컬럼 있음
	 * @param HttpServletResponse response,
		InputStream inputStream,
		String data_type,
		String output_table_name,
		String description,
		String header,
		String delimiter,
		String target_agent,
		String user_id,
		String encoding_type,
		org.json.JSONArray columnGridData
	 * @return void
	 * @exception IOException
	 */
	public void createTableWithColumns(
		HttpServletResponse response,
		InputStream inputStream,
		String data_type,
		String output_table_name,
		String description,
		String header,
		String delimiter,
		String target_agent,
		String user_id,
		String encoding_type,
		org.json.JSONArray columnGridData) throws SystemFailException;
	
	/**
	 * SHP 파일 테이블 생성
	 * @param HttpServletResponse response,
		InputStream[] inputStreamArray,
		String data_type,
		String output_table_name,
		String description,
		String user_id,
		String encode_type
	 * @return void
	 * @exception 
	 */
	public void createTableByAgent(HttpServletResponse response,
		InputStream[] inputStreamArray,
		String data_type,
		String output_table_name,
		String description,
		String user_id,
		String encode_type,
		String shp_coord_by_geom);
	/**
	 * 한글로 또는 지정한 컬럼명 입력
	 * @param JSONArray columnGridData , int resource_id
	 * @return 
	 * @exception SQLException
	 */
	public void updateKorColumnGridData(org.json.JSONArray columnGridData, int resource_id)throws SQLException,org.json.JSONException;
	
	/**
	 * korColumnDesc가 없을때 생성 하기
	 * @param String schema , String data_nm)
	 * @return JSONArray
	 * @exception 
	 */
	public org.json.JSONArray createKorColumnGridData(String schema , String data_nm,String resource_id);
	
	
	
	/**
	 * 컬럼 id 검증기
	 * @param String schema , String data_nm)
	 * @return JSONArray
	 * @exception 
	 */
	public boolean columnIdValidate(String columnName);
	/**
	 * 한글로 지정된 이름 입력
	 * @param String subject
	 * @return 
	 * @exception SQLException
	 */
	public void updateKorSubject(Map<String,Object> map)throws SQLException;
	
	/**
	 * 리소스 테이블 id 가져오기
	 * @param HashMap<String,Object> parameterMap
	 * @return int
	 * @exception SQLException
	 */
	public int selectResourceId2(HashMap<String,Object> parameterMap) throws SQLException;
	
	/**
	 * 테이블 내용 미리보기 조회
	  * @param String ( userId ) 사용자 아이디
	  * @param String ( schema ) 스키마
	  * @param String ( tableName ) 테이블 명
	  * @param int    ( limit ) 조회할 개수
	  * @return 테이블 내용
	  * @throws SystemFailException
	 */
	public JSONObject previewTable(String userId, String schema, String tableName, int limit, int offset, String sort_column, String sort_type, String resourceId, String storageTypeCd) throws SQLException,org.json.JSONException;
	
	/**
	 * 메인화면 대시보드 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardList(Map mapParameter) throws SQLException;
	
	/**
	 * 메인화면 대시보드 설정 정보를 가져온다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public List getDashBoardOptList(Map mapParameter) throws SQLException;
	
	/**
	 * 메인화면 대시보드 정보를 업데이트한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int updateDashBoardOpt(Map mapParameter) throws SQLException;
	
	/**
	 * 메인보드 대시화면정보 최초 생성을 수행한다.
	 * @param mapParameter
	 * @exception Exception
	 */
	public int insertDashBoardOpt(Map mapParameter) throws SQLException;
	
	
	
	/**
	 * 주소 지오코딩 변환
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject mapping(Map paramMap)throws SystemFailException;
	/**
	 * xy 변환
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject coordinateChange(Map paramMap)throws SystemFailException;
	
	/**
	 * geom 변환
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject coordinateChangeByGeom(Map paramMap)throws SystemFailException;
	/**
	 * admCd 변환
	 * @param mapParameter
	 * @exception Exception
	 */
	public JSONObject bndChange(Map paramMap)throws SystemFailException;
	
	
	/**
	 * 프로세스 진행 현황
	 * @param String execute_id
	 * @exception Exception
	 */
	public JSONObject findByExecuteProcess(String execute_id) throws SystemFailException;
	
	
	/**
	 * 리소스 테이블과 생성 스키마 검색
	 * @param Map paramMAp
	 * @exception Exception
	 */
	public Map<String,Object> selectResourceInfo(Map<String,Object> paramMap) throws SQLException;
	
	/**
	 * 리소스 테이블과 속성검색
	 * @param Map paramMAp
	 * @exception Exception
	 */
	public List<Map<String,Object>> selectColumnsDataType(Map<String,Object> paramMap) throws SQLException;
	
	
	/**
	 * getColumn
	 * @param Map paramMAp
	 * @exception Exception
	 */
	public List<Map<String, Object>> getColumns(Map<String, Object> paramMap) throws SQLException;
	
	/**
	 * 지오코딩 결과 조회
	 * @param String id, String start, String display, String status
	 * @return 
	 * @exception SQLException
	 */
	public Map getModifyResultByPg(String id)throws SQLException,JSONException;
	
	/**
	 * 데이터 수정
	 * @param Map paramMap
	 * @return 
	 * @exception SQLException
	 */
	public void updateRecordColumnData(Map<String,Object> paramMap,String schema , String data_nm,String rid) throws SQLException;
	
	/**
	 * 데이터 검색 
	 * @param Map paramMap user_id, resource_id
	 * @return 
	 * @exception SQLException
	 */
	public Map searchMyDataInfo(Map paramMap) throws SQLException;
	
	/**
	 * 나의 데이터 조건 검색 
	 * @param Map paramMap schema, data_nm , jsonArray jArray
	 * @return 
	 * @exception SQLException
	 */
	public Map conditionList (String schema ,String data_nm , org.json.JSONArray jArray ) throws org.json.JSONException;
	
	/**
	 * 테이블 변경
	 * @param Map paramMap 
	 * @return 
	 * @exception SQLException
	 */
	public Map modifyTable(HttpServletRequest request) throws SQLException, JSONException;
	
	/**
	 * 제목 변경
	 * @param Map paramMap 
	 * @return 
	 * @exception SQLException
	 */
	public Map<String,Object> saveData(Map<String,Object> paramMap) throws SQLException;
	
	/**
	 * 데이터 삭제
	 * @param String[] data_id 
	 * @return Map
	 * @exception SQLException
	 */
	public Map<String,Object> deleteMyDataList(String [] data_ids ,String schema) throws SQLException;
	
	/**
	 * dropTable
	 * @param 
	 * @return 
	 * @exception SQLException
	 */
	public void dropTable(Map<String,Object> paramMap) throws SQLException;
	/**
	 * 데이터 존재 유무 확인
	 * @param String[] data_id 
	 * @return Map
	 * @exception SQLException
	 */
	public int dataNameExists (String schema, String copy_nm) throws SQLException;
	
	/**
	 * 데이터 복사
	 * @param Map map (user_id, schema , copy_nm , oriName) 
	 * @return Map (생성된 resource_id)
	 * @exception SQLException
	 */
	public Map<String,Object> copyData(Map<String,Object> paramMap) throws SQLException;
	
	/**
	 * 데이터 다운로드 (다운로드 할수 있게 생성을 호출 하고 리턴으로 생성 데이터에 대한 정보를 전달한다)
	 * @param String schema ,  JSONArray
	 * @return Zip
	 * @exception JSONException
	 */
	public String downLoadFileInfo(String schema , org.json.JSONArray jsonArray)throws JSONException , SQLException;
	
	/**
	 * 즐겨찾기
	 * @param String yn ,  String data_id
	 * @return 
	 * @exception SQLException
	 */
	public void favorite(String yn , String data_id)throws SQLException;
	
	/**
	 * 공유
	 * @param String yn ,  String data_id
	 * @return 
	 * @exception SQLException
	 */
	public void share(String yn , String data_id,String inst_seq)throws SQLException;
	
	/**
	 * 시퀀스명 리턴
	 * @param String schema , String data_nm
	 * @return 
	 * @exception SQLException
	 */
	public String getTableSequence(String schema , String data_nm) throws SQLException;
	
	
	/**
	 * 타입 리턴
	 * @param String data_nm , String user_id , String spacialColumn
	 * @return 
	 * @exception SQLException
	 */
	public String getColumnType(String data_nm, String user_id , String spacialColumn) throws SQLException;
	
	
}
