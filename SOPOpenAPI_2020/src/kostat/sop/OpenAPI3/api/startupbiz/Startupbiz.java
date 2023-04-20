package kostat.sop.OpenAPI3.api.startupbiz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.ibatis.exceptions.PersistenceException;
import org.apache.ibatis.session.SqlSession;

import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.exception.NotSupportFormatException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.OpenAPI3.common.controller.AbsAuthAPI;
import kostat.sop.OpenAPI3.common.controller.Properties;
import kostat.sop.OpenAPI3.exception.ApiException;
import kostat.sop.OpenAPI3.exception.ApiException.COMM_ERR_CODE;
import kostat.sop.OpenAPI3.exception.DurianSQLException;
import kostat.sop.OpenAPI3.exception.NoResultException;

/**
* 창업지원 API 통계청 센서스 정보중 사업체 통계를 조회하기 위한 API
* 
* <pre>
* input : company.json/xml
* output : json/xml
* Table : SRV_DT_SEARCHPPLTN, SRV_PG_CORPCENSUS, SRV_DT_SEARCHRESID, SRV_DT_SEARCHAPARTPRICE, SRV_DT_SEARCHCORP, SRV_DT_SEARCHCORP
* </pre>
* 
* <pre>
* <b>History:</b> 
* 심홍헌, 1.0, 2014/09/24 초기 작성
* </pre>
* 
* @author 심홍헌
* @version 1.0, 2014/09/24 메서드 추가
* @see None
*/

public class Startupbiz extends AbsAuthAPI< List >
{
	private static final Log logger = LogFactory.getLog( Startupbiz.class );

	@Override
	public String getApiId()
	{
		return "API_0601";
	}

	@Override
	public HttpMethod getHttpMethod()
	{
		return HttpMethod.GET;
	}

	@Override
	public List executeAPI( HttpServletRequest req, HttpServletResponse res, String trId ) throws AbsException
	{
		httpSession = req.getSession();

		List result = null;
		HashMap resultmap = new HashMap< >();
		try
		{
			logger.info( "START Query - ApiID[" + this.getApiId() + "] " );

			Map mapParameter = getParameterMap( req );
			logger.info( "Query INFO - ApiID[" + getApiId() + "] IP : " + getClientIp( req ) + ", Info : " + mapParameter.toString() );
			_checkNullParameterValue( mapParameter );

			optimizeParameterMap( mapParameter );

			String strFormat = _getViewType( req, res );

			if( !( strFormat.equals( "json" ) || strFormat.equals( "xml" ) ) )
			{
				throw new NotSupportFormatException( "Not Support Format[" + strFormat + "]" );
			}

			result = makeAdm_cd( mapParameter, session );

			if( result.size() == 0 )
			{
				throw new NoResultException();
			}

			logger.info( "END Query - TXID[" + getApiId() + "] " );

			if( logger.isDebugEnabled() )
			{
				logger.debug( "[ result = " + result + " ]" );
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
			throw new ApiException( "입력값을 체크 해 주세요", COMM_ERR_CODE.ERR_PARAM );
		}
		catch( Exception e )
		{
//			e.printStackTrace();
			logger.error( e );
			throw new ApiException( "서버에서 처리 중 에러가 발생하였습니다.", COMM_ERR_CODE.EXECUTE_FAILE );
		}
		return result;
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

	@Override
	protected void optimizeParameterMap( Map mapParameter ) throws Exception
	{
	}

	private List makeAdm_cd( Map mapParameter, SqlSession session )
	{
		String ppl_type = (String) mapParameter.get( OptionParam.ppl_type.name() );
		String ppl_gender = (String) mapParameter.get( OptionParam.ppl_gender.name() );
		String ppl_age = (String) mapParameter.get( OptionParam.ppl_age.name() );
		String house_type = (String) mapParameter.get( OptionParam.house_type.name() );
		String apartprice = (String) mapParameter.get( OptionParam.apartprice.name() );
		//		String apartprice = null;
		String corp_cnt = (String) mapParameter.get( OptionParam.corp_cnt.name() );
		String rate_change = (String) mapParameter.get( OptionParam.rate_change.name() );
		String theme_cd = (String) mapParameter.get( OptionParam.theme_cd.name() );
		String adm_cd = (String) mapParameter.get( OptionParam.adm_cd.name() );

		if( !( adm_cd.length() == 2 || adm_cd.length() == 5 ) )
		{
			throw new ApiException( "동코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
		}

		mapParameter.put( "year", Properties.getDefult_bnd_year() );

		List ppl_list = null;
		List house_list = null;
		List apartprice_list = null;
		List corp_cnt_list = null;
		List rate_change_list = null;
		//상위 30프로가 몇개인지 세기위해 존재한다
		//서울시 리스트가 20개이면 * 0.3을 하여 6이 된다 
		int datacount = 0;
		//창업지윈 API는 검색 조건이 총 4개다 여기서 줄어들수도 있다
		//4개가 다 검색되는지 아니면 1,2개가 들어온건지 확인하기위한 count다
		int listcount = 0;
		// 상위 30% 지역중 중복되는 지역만 뽑기위한 map이다
		//키는 동코드이고 4개의 검색 리스트중에 곂치는 동코드가 있을때만 1씩 증가시킨다.
		HashMap totalresult = new HashMap();

		//최종 리턴할 리스트다 동코드와 행정동명이 들어간다.
		List adm_list = new ArrayList< String >();

		//결론 : 1. 최대 4개의 쿼리를 돌려서 소팅된 지역 리스트를 받는다
		//       2. 리스트의 상위 30%를 구한다. * 0.3
		//       3. 상위 30% 끼리 비교하여 곂치는 동코드가 있는지 확인한다. AND조건이므로 곂치는 경우가 없다면 검색결과 없음을 리턴한다.
		//       4. listcount 가 3이면 검색조건이 세개인거다. totalresult에서 값이 3인 동코드를 찾는다.
		//       5. 일치하는 동코드만 추리고 해당 동코드의 행정동명을 검색하여 붙인다음 리턴한다. 

		if( ppl_age == null )
		{
			ppl_age = "1,2,3,4,5,6,7,8";
		}
		StringBuffer ppl_sql_buffer = new StringBuffer();

		if( ppl_type != null )
		{
			if( ppl_type.equals( "1" ) )
			{//거주인구
				//괄호
				ppl_sql_buffer.append( "(" );
				if( ppl_gender != null )
				{
					if( ppl_gender.equals( "1" ) )
					{//남자
						String ppl_age_list[] = ppl_age.split( "," );
						for( int i = 0; i < ppl_age_list.length; i++ )
						{
							if( ppl_age_list[i].equals( "1" ) )
							{
								ppl_sql_buffer.append( "teenage_less_than_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "2" ) )
							{
								ppl_sql_buffer.append( "teenage_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "3" ) )
							{
								ppl_sql_buffer.append( "twenty_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "4" ) )
							{
								ppl_sql_buffer.append( "thirty_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "5" ) )
							{
								ppl_sql_buffer.append( "forty_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "6" ) )
							{
								ppl_sql_buffer.append( "fifty_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "7" ) )
							{
								ppl_sql_buffer.append( "sixty_male_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "8" ) )
							{
								ppl_sql_buffer.append( "seventy_more_than_male_ppltn +" );
							}
							else
							{//나이코드 에러리턴
								throw new ApiException( "인구연령코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
							}
						}
					}
					else if( ppl_gender.equals( "2" ) )
					{//여자
						String ppl_age_list[] = ppl_age.split( "," );
						for( int i = 0; i < ppl_age_list.length; i++ )
						{
							if( ppl_age_list[i].equals( "1" ) )
							{
								ppl_sql_buffer.append( "teenage_less_than_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "2" ) )
							{
								ppl_sql_buffer.append( "teenage_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "3" ) )
							{
								ppl_sql_buffer.append( "twenty_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "4" ) )
							{
								ppl_sql_buffer.append( "thirty_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "5" ) )
							{
								ppl_sql_buffer.append( "forty_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "6" ) )
							{
								ppl_sql_buffer.append( "fifty_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "7" ) )
							{
								ppl_sql_buffer.append( "sixty_fem_ppltn +" );
							}
							else if( ppl_age_list[i].equals( "8" ) )
							{
								ppl_sql_buffer.append( "seventy_more_than_fem_ppltn +" );
							}
							else
							{//나이코드 에러리턴
								throw new ApiException( "인구연령코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
							}
						}
					}
					else
					{ //남녀코드 에러리턴
						throw new ApiException( "인구성별코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
					}
				}
				else
				{//남녀 전체
					String ppl_age_list[] = ppl_age.split( "," );
					for( int i = 0; i < ppl_age_list.length; i++ )
					{
						if( ppl_age_list[i].equals( "1" ) )
						{
							ppl_sql_buffer.append( "teenage_less_than_fem_ppltn + teenage_less_than_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "2" ) )
						{
							ppl_sql_buffer.append( "teenage_fem_ppltn + teenage_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "3" ) )
						{
							ppl_sql_buffer.append( "twenty_fem_ppltn + twenty_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "4" ) )
						{
							ppl_sql_buffer.append( "thirty_fem_ppltn + thirty_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "5" ) )
						{
							ppl_sql_buffer.append( "forty_fem_ppltn + forty_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "6" ) )
						{
							ppl_sql_buffer.append( "fifty_fem_ppltn + fifty_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "7" ) )
						{
							ppl_sql_buffer.append( "sixty_fem_ppltn + sixty_male_ppltn +" );
						}
						else if( ppl_age_list[i].equals( "8" ) )
						{
							ppl_sql_buffer.append( "seventy_more_than_fem_ppltn + seventy_more_than_male_ppltn +" );
						}
						else
						{//나이코드 에러리턴
							throw new ApiException( "인구연령코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
						}
					}
				}
				ppl_sql_buffer.deleteCharAt( ppl_sql_buffer.length() - 1 );
				ppl_sql_buffer.append( ") pplsum, sido_cd||sgg_cd||emdong_cd as adm_cd" );

				mapParameter.put( "ppl_sql", ppl_sql_buffer.toString() );

				ppl_list = session.selectList( "startupbiz.startupbizppl", mapParameter );
				listcount++;

			}
			else if( ppl_type.equals( "2" ) )
			{//직장인구
				ppl_list = session.selectList( "startupbiz.startupbizwoker", mapParameter );
				listcount++;
			}
			else
			{
				throw new ApiException( "인구유형코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
			}
		}

		if( house_type != null )
		{
			StringBuffer house_sql_buffer = new StringBuffer();
			house_sql_buffer.append( "(" );
			String house_type_list[] = house_type.split( "," );
			for( int i = 0; i < house_type_list.length; i++ )
			{
				if( house_type_list[i].equals( "1" ) )
				{
					house_sql_buffer.append( "detach_house_family_cnt +" );
				}
				else if( house_type_list[i].equals( "2" ) )
				{
					house_sql_buffer.append( "apart_family_cnt +" );
				}
				else if( house_type_list[i].equals( "3" ) )
				{
					house_sql_buffer.append( "row_house_family_cnt +" );
				}
				else if( house_type_list[i].equals( "4" ) )
				{
					house_sql_buffer.append( "effi_apart_family_cnt +" );
				}
				else if( house_type_list[i].equals( "5" ) )
				{
					house_sql_buffer.append( "dom_soc_fac_family_cnt +" );
				}
				else
				{//가구타입 에러리턴
					throw new ApiException( "주택유형코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
				}
			}
			house_sql_buffer.deleteCharAt( house_sql_buffer.length() - 1 );
			house_sql_buffer.append( ") housesum, sido_cd||sgg_cd||emdong_cd as adm_cd" );

			mapParameter.put( "house_sql", house_sql_buffer.toString() );

			house_list = session.selectList( "startupbiz.startupbizhouse", mapParameter );
			listcount++;
		}

		if( apartprice != null )
		{
			if( !( apartprice.equals( "1" ) || apartprice.equals( "2" ) || apartprice.equals( "3" ) ) )
			{
				throw new ApiException( "아파트 시세정도 코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
			}
			apartprice_list = session.selectList( "startupbiz.startupbizapartprice", mapParameter );
			listcount++;
		}

		if( theme_cd != null )
		{
			if( theme_cd.length() != 4 )
			{
				throw new ApiException( "테마코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
			}
		}

		if( corp_cnt == null && rate_change == null && theme_cd != null )
			throw new ApiException( "업종별 사업장 수나 증감을 선택해주세요", COMM_ERR_CODE.ERR_PARAM );

		if( corp_cnt != null )
		{
			if( !( corp_cnt.equals( "1" ) || corp_cnt.equals( "2" ) ) )
			{
				throw new ApiException( "업종별 사업장 코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
			}
			corp_cnt_list = session.selectList( "startupbiz.startupbizcorpcnt", mapParameter );
			listcount++;
		}

		if( rate_change != null )
		{
			if( !( rate_change.equals( "1" ) || rate_change.equals( "2" ) ) )
			{
				throw new ApiException( "사업체 수 증감 코드를 확인하세요", COMM_ERR_CODE.ERR_PARAM );
			}
			rate_change_list = session.selectList( "startupbiz.startupbizcorprate", mapParameter );
			listcount++;
		}

		//인구리스트가 있나 없나 확인하고 있으면 상위 30%만 뽑아서 카운팅 한다
		//totalresult map에 동코드별로 카운트를 저장하고 중복이 있을 시 값을 더한다
		if( ppl_list != null )
		{
			//세종시는 시군구가 1개라서 0.3 곱하고 반올림하면 0이 나온다.
			//예외케이스 이므로 그냥 1로 간다
			if( ppl_list.size() > 1 )
			{
				datacount = (int) Math.round( ppl_list.size() * 0.3 );
			}
			else
			{
				datacount = ppl_list.size();
			}
			//data를 카운팅 하는 부분 Map totalresult에는 동코드를 키값으로 하고 value 데이타는 동코드가 중복될경우 1을 늘려준다 
			for( int i = 0; i < datacount; i++ )
			{
				HashMap resultmap = (HashMap) ppl_list.get( i );
				if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
				{
					totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
				}
				else
				{
					totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
				}
			}
		}

		if( house_list != null )
		{
			if( datacount == 0 )
			{
				if( house_list.size() > 1 )
				{
					datacount = (int) Math.round( house_list.size() * 0.3 );
				}
				else
				{
					datacount = house_list.size();
				}
			}
			if( house_list.size() >= datacount )
			{
				for( int i = 0; i < datacount; i++ )
				{
					HashMap resultmap = (HashMap) house_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
			else
			{
				for( int i = 0; i < house_list.size(); i++ )
				{
					HashMap resultmap = (HashMap) apartprice_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
		}

		if( apartprice_list != null )
		{

			int top_cnt = 0;
			int middle_cnt = 0;
			//상위 중위 하위 검색법이다
			//상위는 30% 중위는 70%까지 하위는 70부터 나머지다.
			if( apartprice_list.size() > 1 )
			{
				top_cnt = (int) Math.round( apartprice_list.size() * 0.3 );
				middle_cnt = (int) Math.round( apartprice_list.size() * 0.7 );
			}

			if( datacount == 0 )
			{

				if( apartprice_list.size() > 1 )
				{
					if( apartprice.equals( "1" ) )
					{
						datacount = top_cnt;
					}
					else if( apartprice.equals( "2" ) )
					{
						datacount = middle_cnt - top_cnt;
					}
					else if( apartprice.equals( "3" ) )
					{
						datacount = apartprice_list.size() - middle_cnt;
					}
				}
				else
				{
					//list_cnt가 한개이니 반목문 돌때  top_cnt,middle_cnt 가 문제가 된다 한번이라도 돌도록 다 0으로 바꾼다
					//세종시 전용
					if( apartprice.equals( "1" ) )
					{
						datacount = apartprice_list.size();
					}
					else if( apartprice.equals( "2" ) )
					{
						top_cnt = 0;
						datacount = apartprice_list.size();
					}
					else if( apartprice.equals( "3" ) )
					{
						middle_cnt = 0;
						datacount = apartprice_list.size();
					}
				}
			}

			if( apartprice.equals( "1" ) )
			{
				//상위 검색이니 30%까지
				for( int i = 0; i < top_cnt; i++ )
				{
					HashMap resultmap = (HashMap) apartprice_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
			else if( apartprice.equals( "2" ) )
			{
				//중위 검색이니 30~70까지
				for( int i = top_cnt; i < middle_cnt; i++ )
				{
					HashMap resultmap = (HashMap) apartprice_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
			else if( apartprice.equals( "3" ) )
			{
				//하위 검색이니 70부터 나머지까지다
				for( int i = middle_cnt; i < apartprice_list.size(); i++ )
				{
					HashMap resultmap = (HashMap) apartprice_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
		}

		if( corp_cnt_list != null )
		{
			if( datacount == 0 )
			{

				if( corp_cnt_list.size() > 1 )
				{
					datacount = (int) Math.round( corp_cnt_list.size() * 0.3 );
				}
				else
				{
					datacount = corp_cnt_list.size();
				}

			}
			if( corp_cnt_list.size() >= datacount )
			{
				for( int i = 0; i < datacount; i++ )
				{
					HashMap resultmap = (HashMap) corp_cnt_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
			else
			{
				for( int i = 0; i < corp_cnt_list.size(); i++ )
				{
					HashMap resultmap = (HashMap) corp_cnt_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
		}

		if( rate_change_list != null )
		{
			if( datacount == 0 )
			{
				if( rate_change_list.size() > 1 )
				{
					datacount = (int) Math.round( rate_change_list.size() * 0.3 );
				}
				else
				{
					datacount = rate_change_list.size();
				}
			}

			if( rate_change_list.size() >= datacount )
			{
				for( int i = 0; i < datacount; i++ )
				{
					HashMap resultmap = (HashMap) rate_change_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
			else
			{
				for( int i = 0; i < rate_change_list.size(); i++ )
				{
					HashMap resultmap = (HashMap) corp_cnt_list.get( i );
					if( totalresult.containsKey( resultmap.get( "adm_cd" ) ) )
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), (int) totalresult.get( resultmap.get( "adm_cd" ) ) + 1 );
					}
					else
					{
						totalresult.put( (String) resultmap.get( "adm_cd" ), 1 );
					}
				}
			}
		}

		//totalresult에 저장된 값을 꺼내와서 확인한다.
		Iterator keys = totalresult.keySet().iterator();
		while( keys.hasNext() )
		{
			String key = (String) keys.next();
			//꺼내온 값이 listcount와 동일하면 결과를 adm_list에 저장한다.
			if( (int) totalresult.get( key ) == listcount )
			{
				if( adm_cd.length() == 5 )
				{
					adm_list.add( key );
				}
				else if( adm_cd.length() == 2 )
				{
					adm_list.add( key.substring( 0, 5 ) );
				}
			}
		}

		logger.debug( "datacount : " + datacount );

		if( adm_list.size() != 0 )
		{
			HashMap adm_map = new HashMap< >();
			adm_map.put( "adm_cd_list", adm_list );
			adm_map.put( "year", Properties.getDefult_bnd_year() );

			adm_list = session.selectList( "startupbiz.get_adm_nm", adm_map );
		}

		return adm_list;
	}

	@Override
	protected String getQueryStr()
	{
		return null;
	}

	enum MustParam
	{
	}

	enum OptionParam
	{
		accessToken,
		ppl_type,
		ppl_gender,
		ppl_age,
		house_type,
		apartprice,
		theme_cd,
		corp_cnt,
		rate_change,
		adm_cd
	}

}
