package kostat.sop.ServiceAPI.api.catchmentArea;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.controller.Properties;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.ServiceAPI.exception.DurianSQLException;
import kostat.sop.ServiceAPI.exception.NoResultException;

public class getGridSrvAreaDataBoardList extends AbsQuery<HashMap<String, Object>>{

		
		private static final Log logger = LogFactory.getLog( getGridSrvAreaDataBoardList.class );

		@Resource( name = "srvArea_security_mode" )
		private String SECURITY_MODE;
		
		@Override
		public String getApiId()
		{
			return "API_202010";
		}
		
		@Override
		public HttpMethod getHttpMethod()
		{
			return HttpMethod.POST;
		}
		
		@Override
		public HashMap<String, Object> executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
		{
			httpSession = req.getSession();

			HashMap<String, Object> resultMap = new HashMap<>();
			List result = null;
			List<String> grdz = null;
			List<Double> grdAeaz = null;
			
			try
			{
				logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

				Map mapParameter = getParameterMap( req );
				logger.info( "Query INFO - ApiID[" + getApiId() + "] Info : " + mapParameter.toString() );
				_checkNullParameterValue( mapParameter );

				optimizeParameterMap( mapParameter );
				
				String strFormat = _getViewType( req, res );

				if( strFormat.equals( "geojson" ) || strFormat.equals( "kml" ) )
				{
					throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
				}
				
				// 1.행정구역 구하기
				StringBuffer sb = new StringBuffer();
				StringBuffer sbSgg = new StringBuffer();
				result = session.selectList("catchmentArea.selectIntersectingSggList", mapParameter );
				if(result != null && result.size() > 0)
				{
					String sido_cd = "";
					String sido_nm = "";
					String sgg_nm = "";
					String prev_cd = "";
					for(int i = 0; i < result.size(); i++) {					
						Map rstMap = (Map)result.get(i);
						sido_cd = StringUtil.isNullToString(rstMap.get("sido_cd"));
						sido_nm = StringUtil.isNullToString(rstMap.get("sido_nm"));
						sgg_nm = StringUtil.isNullToString(rstMap.get("sgg_nm"));
						
						if(i == 0) {
							prev_cd = sido_cd;
							sb.append(sido_nm);
						}
						
						if(prev_cd.equals(sido_cd)) {
							sbSgg.append(", " + sgg_nm);
						}else {
							String tmpStr = sbSgg.toString();
							if(tmpStr != null && tmpStr.length() > 2) {
								sb.append("(" + tmpStr.substring(2) + ")");
							}				
							
							sbSgg.setLength(0);
							
							prev_cd = sido_cd;
							sb.append(", " + sido_nm);
							sbSgg.append(", " + sgg_nm);
						}
					}
					
					if(sbSgg.length() > 0) {
						String tmpStr = sbSgg.toString();
						if(tmpStr != null && tmpStr.length() > 2) {
							sb.append("(" + tmpStr.substring(2) + ")");
						}							
					}					
				}
				resultMap.put("itgSgg", sb.toString());
				
				// 2.중첩 그리드 목록 구하기
				grdz = session.selectList("catchmentArea.selectGridList", mapParameter );
				int grdzCnt = 0;
				if(grdz != null && grdz.size() > 0){
					grdzCnt = grdz.size();
					//mapParameter.put("areaz", grdz.toArray(new String[grdz.size()]));
				}
				resultMap.put("grdzCnt", grdzCnt);
				
				// 3.그리드 면적 구하기
				grdAeaz = session.selectList("catchmentArea.selectGridAreaList", mapParameter );
				double grdAea = 0.0;
				if(grdAeaz != null && grdAeaz.size() > 0){
					grdAea = (Double)grdAeaz.get(0);
				}
				resultMap.put("grdAea", grdAea);
				
				Map rtnMap = null;
				HashMap kwMap = new HashMap();
				kwMap.put("grid_num", grdzCnt);
				kwMap.put("grid_area", grdAea);
				//kwMap.put("base_year", StringUtil.isNullToString(mapParameter.get("base_year")));				

				if(("pops").equals(mapParameter.get("statType"))) {//인구
					//result = session.selectList( "catchmentArea.selectGridSrvAreaGridPopsAllList", mapParameter );
					result = session.selectList( "catchmentArea.selectPopsList", mapParameter );					
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "base_year");
						kwMap.put("kw_gridCd", "grid_cd");
						kwMap.put("kw_org", "ppltn_cnt");
						kwMap.put("kw_sca", "bsca");
						kwMap.put("grid_level", mapParameter.get("grid_level"));
						//kwMap.put("rt_col_tot_byGrid", "ppltn_cnt");
						kwMap.put("rt_col_tot_byYear", "tot_sum_ppltn_cnt");
						kwMap.put("rt_col_avg", "tot_avg_ppltn_cnt");
						
						rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "Y");	
					}					
				}else if(("family").equals(mapParameter.get("statType"))) {//가구
					//result = session.selectList( "catchmentArea.selectGridSrvAreaGridFamilyAllList", mapParameter );
					result = session.selectList( "catchmentArea.selectFamilyList", mapParameter );
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "base_year");
						kwMap.put("kw_gridCd", "grid_cd");
						kwMap.put("kw_org", "family_cnt");
						kwMap.put("kw_sca", "family_bsca");
						kwMap.put("grid_level", mapParameter.get("grid_level"));
						//kwMap.put("rt_col_tot_byGrid", "family_cnt");
						kwMap.put("rt_col_tot_byYear", "tot_sum_family_cnt");
						kwMap.put("rt_col_avg", "tot_avg_family_cnt");
						
						rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "Y");	
					}					
				}else if(("house").equals(mapParameter.get("statType"))) {//주택
					//result = session.selectList( "catchmentArea.selectGridSrvAreaGridHouseAllList", mapParameter );
					result = session.selectList( "catchmentArea.selectHouseList", mapParameter );
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "base_year");
						kwMap.put("kw_gridCd", "grid_cd");
						kwMap.put("kw_org", "resid_cnt");
						kwMap.put("kw_sca", "bsca");
						kwMap.put("grid_level", mapParameter.get("grid_level"));
						//kwMap.put("rt_col_tot_byGrid", "resid_cnt");
						kwMap.put("rt_col_tot_byYear", "tot_sum_resid_cnt");
						kwMap.put("rt_col_avg", "tot_avg_resid_cnt");
						
						rtnMap = ServiceAreaBSCA.bscaT02(result, 5, kwMap, "Y");	
					}
				//SGIS4_생활권역 시작	
				}else if(("copr").equals(mapParameter.get("statType")) || ("employee").equals(mapParameter.get("statType"))) {//사업체 종사자
				//SGIS4_생활권역 끝	
					//result = session.selectList( "catchmentArea.selectGridSrvAreaGridCoprAllList", mapParameter );
					result = session.selectList( "catchmentArea.selectCoprList", mapParameter );
					if(result != null && result.size() > 0){						
						kwMap.put("kw_year", "base_year");
						kwMap.put("kw_gridCd", "grid_cd");
						kwMap.put("grid_level", mapParameter.get("grid_level"));
						
						String grdstatType = StringUtil.isNullToString(mapParameter.get("grdstatType"));
						if("copr".equals(grdstatType)) {
							kwMap.put("kw_org", "copr_cnt");
							kwMap.put("kw_sca", "copr_bsca");
							//kwMap.put("rt_col_tot_byGrid", "copr_cnt");
							kwMap.put("rt_col_tot_byYear", "tot_sum_copr_cnt");
							kwMap.put("rt_col_avg", "tot_avg_copr_cnt");							
						}else {
							kwMap.put("kw_org", "employee_cnt");
							kwMap.put("kw_sca", "employee_bsca");
							//kwMap.put("rt_col_tot_byGrid", "employee_cnt");
							kwMap.put("rt_col_tot_byYear", "tot_sum_employee_cnt");
							kwMap.put("rt_col_avg", "tot_avg_employee_cnt");							
						}

						rtnMap = ServiceAreaBSCA.bscaT02(result, 3, kwMap, "Y");	
					}					
				}else {//공시지가 (미공개, 현재 bsca 테이블 아님)
					result = session.selectList( "catchmentArea.selectGridSrvAreaGridOlnlpAllList", mapParameter );
				}
				
				//resultMap.put("gridStat", result);
				if(rtnMap != null && rtnMap.get("byYear") != null) {
					resultMap.put("gridStat", (List)rtnMap.get("byYear"));
				}else {
					resultMap.put("gridStat", null);
				}				

				if( resultMap.size() == 0 )
				{
					throw new NoResultException();
				}

				logger.info( "END Query - TXID[" + getApiId() + "] " );

				if( logger.isDebugEnabled() )
				{
					logger.debug( "[ result = " + resultMap + " ]" );
				}
			}
			catch( PersistenceException e )
			{
				logger.error( e );
				throw new DurianSQLException( "SQL ERROR" );
			}
			catch( ApiException e )
			{
				logger.error( e );
				throw e;
			}
			catch( IllegalArgumentException e )
			{
				logger.error( e );
				throw new ApiException( "입력값을 체크 해 주세요.", COMM_ERR_CODE.ERR_PARAM );
			}
			catch( Exception e )
			{
				logger.error(e);
				throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
			}
			return resultMap;
		}

		@Override
		public Class getMustParameter() throws AbsException
		{
			return MustParam.class;
		}

		@Override
		public Class getOptionParameter() throws AbsException
		{
			return OptionParam.class;
		}

		protected void optimizeParameterMap( Map mapParameter )
		{
			mapParameter.put("byYear", "Y");
			mapParameter.put("securityGb", SECURITY_MODE);

			if(mapParameter.containsKey("ageFromCd")) {				
				String ageFromCd = StringUtil.isNullToString(mapParameter.get("ageFromCd"));
				String ageToCd = StringUtil.isNullToString(mapParameter.get("ageToCd"));
				
				if(!"".equals(ageFromCd)){
					if(!"".equals(ageToCd) && !ageFromCd.equals(ageToCd)) {
						mapParameter.put("isRangeSch", "Y");
					} else {
						mapParameter.put("isRangeSch", "N");
					}
				}								
			}
			
			if(mapParameter.containsKey("householdType")) {
				if(mapParameter.get("householdType") != null) {
					String householdType[] = mapParameter.get("householdType").toString().split(",");				
					if(householdType.length > 0) {
						mapParameter.put("household_type", householdType);
					}
				}
			}
			
			if(mapParameter.containsKey("rd_resid_type")) {
				if(mapParameter.get("rd_resid_type") != null) {
					String rdResidType[] = mapParameter.get("rd_resid_type").toString().split(",");				
					if(rdResidType.length > 0) {
						mapParameter.put("rd_resid_type", rdResidType);
					}
				}
			}
			
			if(mapParameter.containsKey("house_area_cd")) {
				if(mapParameter.get("house_area_cd") != null) {
					String houseAreaCd[] = mapParameter.get("house_area_cd").toString().split(",");				
					if(houseAreaCd.length > 0) {
						mapParameter.put("house_area_cd", houseAreaCd);
					}
				}
			}
			
			if(!mapParameter.containsKey("bord_base_year")) {
				mapParameter.put("bord_base_year", Properties.getDefult_bnd_year());
			}
			
			// 사전생성된 격자번호 사용 여부
			mapParameter.put("isUseGeneratedGridNumber", "N");
			if(mapParameter.containsKey("sufid") && mapParameter.containsKey("rangeCd")) {
				String sufid = StringUtil.isNullToString(mapParameter.get("sufid"));
				String rangeCd = StringUtil.isNullToString(mapParameter.get("rangeCd"));
				if(!"".equals(sufid) && !"".equals(rangeCd) ){
					mapParameter.put("isUseGeneratedGridNumber", "Y");
				}								
			}
			
			//SGIS4_생활권역 시작
			if(("copr").equals(mapParameter.get("statType")) || ("employee").equals(mapParameter.get("statType"))) {
				if(mapParameter.containsKey("isLifeBiz")){
					String isLifeBiz = StringUtil.isNullToString(mapParameter.get("isLifeBiz"));
					if(!"Y".equals(isLifeBiz)) {
						mapParameter.put("isLifeBiz", "N");
					}
				}else{
					mapParameter.put("isLifeBiz", "N");
				}
				
				if(mapParameter.containsKey("ksic_3_cd")){
					String ksic_3_cd = StringUtil.isNullToString(mapParameter.get("ksic_3_cd"));					
					if(ksic_3_cd.length() == 1) {
						mapParameter.put("isMainCl", "Y");
					}
				}
			}
			//SGIS4_생활권역 끝
		}
		
		@Override
		protected String getQueryStr()
		{
			return null;
		}
		enum MustParam
		{
			classDeg
		}

		enum OptionParam
		{
			accessToken,
			base_year,
			bord_base_year,
			grid_level,
			area,
			radius,
			statType,
			srvAreaType,
			gender,
			//ageCd,
			ageFromCd,
			ageToCd,
			householdType,
			rd_resid_type,
			const_year,
			house_area_cd,
			ksic_3_cd,
			//SGIS4_생활권역 시작
			isLifeBiz,
			//SGIS4_생활권역 끝				
			grdstatType,
			sufid,
			rangeCd
		}
}
