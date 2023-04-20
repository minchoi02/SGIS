package kostat.lbdms.ServiceAPI.controller.service;

import java.util.HashMap;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import kostat.lbdms.ServiceAPI.common.web.rest.RestService;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.Command;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RequestKey;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.RestResultChecker;
import kostat.lbdms.ServiceAPI.common.web.rest.constant.ResultKey;
import kostat.lbdms.ServiceAPI.exception.rest.SystemFailException;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**  
* <pre>
* Resource 관련 REST 호출 서비스
* </pre>
*
* @author        Admin
* @since         2015. 10. 20. 오후 2:18:53
* @version         1.0
* @see
* <pre>
*  ==========  개정이력( Modification Information )  ==========  
* 
*     수정일             수정자                         수정내용
*  ------------    ------------     -------------------------------
*   2015.09.11.      Admin                        최초생성
*  </pre>
*/

@Component
public class AnalysisCommandClient {
	

	@Autowired
	private RestService restService;
	
	
	/**
	 * 공간분석 가능 여부 체크
	 * @param String ( tableName ) 대상 테이블 
	 * @param String ( userId ) 사용자 아이디
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject isGeometryAnalysisable( String tableName, String userId ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("TABLE_NAME", tableName);
		parameters.put("USER_ID", userId);
		parameters.put("RESPONSE", true);
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.GEO_ANALYSIS, Command.GEOMETRY_YN2, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * Geometry 타입을 조회한다
	 * @param String ( tableName ) 테이블명
	 * @param String ( schema ) 스키마
	 * @param String ( searchType ) GeometryType { POLYGON | POINT }
	 * @param String ( userId ) 사용자 아이디 
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject getGeometryType( String tableName, String schema, String searchType, String userId ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put("TABLE_NAME", tableName);
		parameters.put("USER_ID", userId);
		parameters.put("SCHEMA", schema);
		
		parameters.put("SEARCH_TYPE", searchType);
		parameters.put("RESPONSE", true);
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.GEO_ANALYSIS, Command.GEOMERTY_TYPE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}

	/**
	 * <pre>
	 * 통계분석 보고서 저장
	 * </pre>
	 * @param String ( result_table_schema ) 결과 테이블 스키마 명
	 * @param String ( result_table )        결과 테이블 명
	 * @param String ( data_table )          보고서 사용 데이터
	 * @param String ( variable )            보고서 변수
	 * @param String ( user_id )             사용자 아이디
	 * @param String ( category1 )           출처
	 * @param String ( category2 )           테마
	 * @param String ( category3 )           태그
	 * @param String ( category4 )           단계
	 * @param String ( description )         보고서 설명
	 * @param String ( file_name )           보고서 파일 명
	 * @param String ( resource_id )         분석 이미지 리소스 아이디
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject saveReport( 
			String data_table,
			String variable,
			String user_id,
			String category1,
			String category2,
			String category3,
			String category4,
			String description,
			String file_name,
			String resource_ids,
			JSONObject table,
			String download_apply ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		parameters.put( "DATA_TABLE", 				data_table );  
		parameters.put( "VARIABLE", 				StringUtils.defaultString( variable, StringUtils.EMPTY ) );
		parameters.put( RequestKey.USER_ID, 		user_id );
		
		parameters.put( "CATEGORY1", 				StringUtils.defaultString( category1, StringUtils.EMPTY ) );
		parameters.put( "CATEGORY2", 				StringUtils.defaultString( category2, StringUtils.EMPTY ) );
		parameters.put( "CATEGORY3",				StringUtils.defaultString( category3, StringUtils.EMPTY ) );
		parameters.put( RequestKey.CATEGORY4, 		StringUtils.defaultString( category4, StringUtils.EMPTY ) );
		
		parameters.put( "DESCRIPTION", 				StringUtils.defaultString( description, StringUtils.EMPTY ) );
		parameters.put( "FILE_NAME", 				file_name );
		parameters.put( RequestKey.RESOURCE_ID, 	StringUtils.defaultString( resource_ids, StringUtils.EMPTY ) );
		parameters.put( RequestKey.TABLE, 			table );
		
		parameters.put( "DOWNLOAD_APPLY", 			download_apply );
		
		res = restService.call( Command.ANALYSIS, Command.STAT_ANALYSIS, Command.STAT_REPORT, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 통계분석 데이터 선택 및 조건 조회
	 * </pre>
	 * @param String ( data_table ) data 테이블명
	 * @param String ( data_table_schema ) data 테이블 schema
	 * @param String ( user_id ) 사용자 아이디 
	 * @param JSONArray ( condition_list ) 조건리스트
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject createTempTable( 
			String resource_id,
			String data_table,
			String data_table_schema,
			String user_id,
			JSONArray condition_list ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESOURCE_ID", resource_id );
		parameters.put( "DATA_TABLE", data_table );
		parameters.put( "DATA_TABLE_SCHEMA", data_table_schema );
		parameters.put( RequestKey.USER_ID, user_id );	
		
		if(condition_list != null && condition_list.size() > 0){
			parameters.put( "WHERE_STATEMENT", condition_list );
		}
		
		res = restService.call( Command.ANALYSIS, Command.STAT_ANALYSIS, Command.STAT_DATA_CONDITION, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 통계분석 분석 통계 조회
	 * </pre>
	 * @param String ( exists ) 그룹여부
	 * @param String ( column ) 그룹지을 컬럼 
	 * @param String ( user_id ) 사용자아이디
	 * @param String ( data_table ) 조회할테이블명
	 * @param String ( variable ) 사용할 변수
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject getStatDataList(
			String exists,
			String column,
			String user_id,
			String data_table,
			String data_table_schema,
			String variable,
			int limit,
			int offset ) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		JSONObject group = new JSONObject();
		group.put("EXISTS", exists);
		group.put("COLUMN", (column == null ? "" : column) );
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "GROUP", group );
		parameters.put( RequestKey.USER_ID, user_id );		
		parameters.put( "DATA_TABLE", data_table );		
		parameters.put( "DATA_TABLE_SCHEMA", data_table_schema);
		parameters.put( "VARIABLE", (variable == null ? "" : variable) );
		parameters.put( "OFFSET",  String.valueOf( offset ) );
		parameters.put( "LIMIT", String.valueOf( limit )  );
		
//		Backbone Collection client mode 로 사용하기 때문에 페이징 파라미터 보내지 않음
//		parameters.put( RequestKey.LIMIT, limit );
//		parameters.put( RequestKey.OFFSET, offset );
		
		res = restService.call( Command.ANALYSIS, Command.STAT_ANALYSIS, Command.STAT_MAKE_DATA, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			String result = res.getString( ResultKey.RESULT );
			
			if( !result.equalsIgnoreCase( ResultKey.WARNNING ) ){
				throw new SystemFailException( RestResultChecker.getMessage(res) );
			}
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 통계분석 저장
	 * </pre>
	 * @param String ( group ) 그룹 시작 태그
	 * @param String ( exists ) 그룹 변수 true/false 
	 * @param String ( column ) 그룹 변수 컬럼 (exists가 tre일 경우 필수)
	 * @param String ( user_id ) 사용자 아이디
	 * @param String ( data_table ) 리터 받은 테이블 명
	 * @param String ( data_table_schema ) 리턴 받은 테이블 스키마 명
	 * @param String ( result_Table ) 저장할 테이블 명
	 * @param String ( result_table_schema ) 저장할 테이블의 스키마 명
	 * @param String ( variable ) 분석 변수
	 * @param String ( description ) resource 설명
	 * @param String ( category1 ) 출처
	 * @param String ( category2 ) 테마
	 * @param String ( category3 ) 태그
	 * @param String ( statistics ) 통계선택변수(MIN,MAX,....)
	 * 
	 * @return JSONObject 
	 * @throws SystemFailException
	 */
	public JSONObject statResultSave(
			String exists, 
			String column, 
			String user_id,
			String data_table,
			String data_table_schema,
			String result_table,
			String result_table_schema,
			String variable,
			String description, 
			String category1, 
			String category2, 
			String category3, 
			String statistics,
			String download_apply
			) throws SystemFailException{
		
		JSONObject res = new JSONObject();
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		
		JSONObject group = new JSONObject();
		group.put( "EXISTS", StringUtils.defaultString(exists,"") );
		group.put( "COLUMN", StringUtils.defaultString(column,"") );
		
		parameters.put( "GROUP", group );
		parameters.put( RequestKey.USER_ID, user_id );
		parameters.put( "DATA_TABLE", StringUtils.defaultString(data_table,"") );
		parameters.put( "DATA_TABLE_SCHEMA", StringUtils.defaultString(data_table_schema,"") );
		parameters.put( "RESULT_TABLE", result_table );
		parameters.put( "RESULT_TABLE_SCHEMA", result_table_schema );
		parameters.put( "VARIABLE", StringUtils.defaultString(variable,""));
		parameters.put( "DESCRIPTION", StringUtils.defaultString(description,"") );
		parameters.put( "CATEGORY1", StringUtils.defaultString(category1,"") );
		parameters.put( "CATEGORY2", StringUtils.defaultString(category2,"") );
		parameters.put( "CATEGORY3", StringUtils.defaultString(category3,"") );
		parameters.put( "STATISTICS", StringUtils.defaultString(statistics,"") );
		parameters.put( "DOWNLOAD_APPLY", download_apply );
				
		res = restService.call( Command.ANALYSIS, Command.STAT_ANALYSIS, Command.STAT_RESULT_SAVE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		
		return res;
	}
	
	/**
	 * <pre>
	 * 분석 스크립트를 실행한다
	 * </pre>
	 * @param String ( actionId )
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject startScriptAction( String actionId ) throws SystemFailException{
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.ACTION_ID, actionId );
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.SCRIPT_CRUD, Command.START, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}

	/**
	 * <pre>
	 * 스크립트 상세보기
	 * </pre>
	 * @param resourceId
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject readScript(String resourceId) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( RequestKey.RESOURCE_ID, resourceId );
		
		JSONObject res = restService.call( Command.ANALYSIS, Command.SCRIPT_CRUD, Command.READ, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약조건 상세 보기
	 * </pre>
	 * @param String ( restrictionCd ) 제한 조건 코드 명
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject detailRestriction(String restrictionCd) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESTRICTION_CD", restrictionCd );
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.DETAIL_RESTRICTION_CODE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약조건 수정
	 * </pre>
	 * @param String ( restrictionCd ) 제약조건 코드
	 * @param String ( user1 ) 운영자 operator 1, 0
	 * @param String ( user2 ) 통계청사용자 1, 0
	 * @param String ( user3 ) 타기관사용자 1, 0 
	 * @param String ( user4 ) 운영자 admin 1, 0
	 * @param String ( reserve ) 제한 조건 값 ( analysis_limit : 데이터 제한 건수 | analysis_area : 영역 검사 여부 TRUE/FALSE 
	 * @param String ( description ) 설명 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject updateRestriction( HashMap<String,Object> params ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( params );
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.UPDATE_RESTRICTION_CODE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약 조건 테이블 조회
	 * </pre>
	 * @param String ( schemaName )	스키마 명
	 * @param String ( tableName )		테이블 명
	 * @param String ( restrictionCd )	제약조건 코드
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject selectRestrictionTable(
			String restrictionCd,
			String schemaName, 
			String tableName ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RESTRICTION_CD", restrictionCd );
		if ( !StringUtils.isEmpty( schemaName ) ){
			parameters.put( "SCHEMA_NAME", schemaName );
		}
		if ( !StringUtils.isEmpty( tableName ) ){
			parameters.put( "TABLE_NAME", tableName);
		}
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.SELECT_RESTRICTION_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약조건 추가
	 * </pre>
	 * @param String ( restrictionCd )	제약조건 코드
	 * @param String ( schemaName )	스키마 명
	 * @param String ( tableName )		테이블 명
	 * @param String ( resourceId ) 리소스 아이디
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject insertRestrictionTable( HashMap<String,Object> params ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( params );
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.INSERT_RESTRICTION_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약조건 테이블 수정
	 * </pre>
	 * @param String ( restrictionCd )	제약조건 코드
	 * @param String ( schemaName )	스키마 명
	 * @param String ( tableName )		테이블 명
	 * @param String ( resourceId ) 리소스 아이디
	 * @param String ( rid ) rid
	 * @return JSONObject	 
	 * @return
	 * @throws SystemFailException
	 */
	public JSONObject updateRestrictionTable(
			HashMap<String,Object> params  ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.putAll( params );
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.UPDATE_RESTRICTION_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
	/**
	 * <pre>
	 * 데이터 분석 제약조건 테이블 삭제
	 * </pre>
	 * @param String ( rid ) 
	 * @return JSONObject
	 * @throws SystemFailException
	 */
	public JSONObject deleteRestrictionTable( String[] rid ) throws SystemFailException {
		
		HashMap<String,Object> parameters = new HashMap<String,Object>();
		parameters.put( "RID", StringUtils.join( rid, ",") );
		
		JSONObject res = restService.call( Command.RESTRICTION, Command.CRUD, Command.DELETE_RESTRICTION_TABLE, parameters );
		
		if ( !RestResultChecker.isSuccess(res) ){
			throw new SystemFailException( RestResultChecker.getMessage(res) );
		}
		return res;
	}
	
//	
//	//=============================================
//	
//	/**
//	 * 나의 데이터 분석
//	 * @param myDataAnalysis
//	 * @param userid
//	 * @param condition_list
//	 * @return JSONObject
//	 * @throws SystemFailException
//	 */
//	public JSONObject dataAnalysis( 
//			MyDataAnalysis myDataAnalysis,
//			String userid,
//			JSONArray condition_list ) throws SystemFailException{
//		
//		JSONObject res = new JSONObject();
//		
//		HashMap<String,Object> parameters = new HashMap<String,Object>();
//		
//		// 1.공통영역 - 데이터불러오기/데이터 조건선택
//		parameters.put( "DATA_TABLE", myDataAnalysis.getData_name() );
//		parameters.put( "DATA_TABLE_SCHEMA", myDataAnalysis.getData_table_schema() );
//		parameters.put( "RESOURCE_ID", myDataAnalysis.getResource_id() );
//		parameters.put( RequestKey.USER_ID, userid );
//		
// 	    //{pos_col_infos:[{pos_method:XY, pos_columns:pos_x,pos_y},{pos_method:행정구역코드, pos_columns:adm_cd},{pos_method:GEOMETRY, pos_columns:geom}]}
//
//		parameters.put("POS_COL_INFOS",  myDataAnalysis.getPos_column_desc());
//		
//		// 2-1.행정경계
//		if( "1".equals(myDataAnalysis.getSelstep()) ){
//			
//			/** 분석단위 is 집계구 */
//			if("totaloa".equals(myDataAnalysis.getAdmType())){
//				
//				JSONArray tmpList = new JSONArray();
//				JSONObject oaJSO = new JSONObject();
//				
//				HashMap<String,Object> tParam = new HashMap<String,Object>();
//				tParam.put("adm_dr_cd" , myDataAnalysis.getDong());	// 동 code
//				
//				List<MyMapVO> oaList = myMapService.retrieveOaList(tParam);
//				for( int i =0; i < oaList.size(); i++ ){
//					MyMapVO myMapVO = oaList.get(i);
//					oaJSO.put("XCD", myMapVO.getX_code());
//					oaJSO.put("YCD", myMapVO.getY_code());
//					oaJSO.put("SHAPLEN", myMapVO.getShape_leng());
//					oaJSO.put("SHAPARE", myMapVO.getShape_area());
//					
//					tmpList.add( JSONArray.fromObject(oaJSO));
//				}
//				
//				parameters.put("TOTALOA", tmpList);
//			}
//			
//			parameters.put("ADMTYPE", myDataAnalysis.getAdmType());
//			parameters.put("SIDO", myDataAnalysis.getSido() );
//			parameters.put("SGG",  myDataAnalysis.getSgg() );
//			parameters.put("DONG", myDataAnalysis.getDong() );
//		}
//		
//		// 2-2.임의영역
//		if( "2".equals(myDataAnalysis.getSelstep()) ){
//			//parameter.put("array", json.getJSONArray("area"));
//			//parameter.put("array", json.getJSONArray("area"));
//			
//		} 
//		// 2-3.사용자경계
//		if( "3".equals(myDataAnalysis.getSelstep()) ){
//			//parameter.put("array", json.getJSONArray("area"));
//			//parameter.put("array", json.getJSONArray("area"));
//		}
//		
//		// 3. 데이터조건선택 
//		if(condition_list != null && !condition_list.isEmpty()){
//			parameters.put( "WHERE_STATEMENT", condition_list );
//		}
//		
//		// 4.결과 산출방식
//		JSONObject rcJSO = new JSONObject();
//		rcJSO.put("RESULT_MODE", myDataAnalysis.getRm() );
//		if ( "count".equals(myDataAnalysis.getRm()) ) {
//			rcJSO.put("RESULT_COLUMN", "*");
//			
//		} else {
//			rcJSO.put("RESULT_COLUMN", StringEscapeUtils.escapeSql(myDataAnalysis.getSumfield()) );
//			
//		}				
//		parameters.put("RESULT_CALCULATION", rcJSO);
//
//		System.out.println(" parameters >>>>>> " + parameters);
//
//		
//		
//		
//		
//		
//		res = restService.call(Command.ANALYSIS, Command.GEO_ANALYSIS, Command.DATA_CONDITION, parameters);
//		
//		
//		// system command call!!!
//		//res = restService.call( Command.ANALYSIS, Command.STAT_ANALYSIS, Command.STAT_DATA_CONDITION, parameters );
//		
//		// databoard view ( chart data, table data)
//		if( res.has("LIST")){
//			
//		}
//		
//		
////		if ( !RestResultChecker.isSuccess(res) ){
////			throw new SystemFailException( RestResultChecker.getMessage(res) );
////		}
//		
//		return res;
//	}
//	
//	/**
//	 * 경계영역 리소스 데이터 찾기
//	 * @param user_id
//	 * @param limit
//	 * @param offset
//	 * @param category4
//	 * @param extraParams
//	 * @return
//	 * @throws SystemFailException
//	 */
//	public ListTypeResult<List<ResourceVO>>  selectCategorize( 
//			String user_id, 
//			int limit, 
//			int offset,
//			String category4,
//			HashMap<String,Object> extraParams ) throws PSQLException{
//		
//		ListTypeResult<List<ResourceVO>>  res = new ListTypeResult<List<ResourceVO>>();
//		
//		HashMap<String,Object> parameters = new HashMap<String,Object>();
//		if ( user_id != null ){
//			parameters.put( RequestKey.USER_ID, user_id );
//		}
//		parameters.put( RequestKey.LIMIT, limit );
//		parameters.put( RequestKey.OFFSET, offset );
//		parameters.put( RequestKey.CATEGORY4 , category4 );
//		
//		parameters.putAll( extraParams );
//		
//				
//		res = mapper.selectAdmAnalysisList(parameters);
//		
//		return res;
//	}

}
