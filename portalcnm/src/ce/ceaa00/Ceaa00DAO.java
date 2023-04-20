package ce.ceaa00;

import java.math.BigDecimal;

import kr.co.offton.jdf.db.RecordModel;
import kr.co.offton.jdf.util.StringUtil;
import kr.co.offton.pdf.basis.GeneralDAO;
import kr.co.offton.pdf.basis.LData;

public class Ceaa00DAO extends GeneralDAO{

	private int resultFlag = -1;

    public Ceaa00DAO()
    {
        super();
    }

    //list
    public String getListSql(LData lData) {

		StringBuffer sql = new StringBuffer(1024);

		/*******************************/
		/* 센서스 안내문 */
		/*******************************/
		if(lData.getString("PARAM").equals("INFORMATION")) {
			sql.append(" select sgis_census_info_word  ");
			sql.append("	        , sgis_census_info_name as sgis_census_return_call ");
			sql.append("		from sgis_census_info			");

		/*******************************/
		/* 대상구분 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CODE")) {
			sql.append(" select sgis_census_id 	\n");
			sql.append("	        , sgis_census_code_name 	\n");
			sql.append("        from sgis_census_code		\n");
			sql.append(" order by sgis_census_id 		\n");
			
		
		/*******************************/
		/* 대상구분 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CATEGORY_CODE")) {
			sql.append(" select lclas_cl, lclas_nm, sclas_cl, sclas_nm 	\n");
			sql.append("        from sgis_census_category_code			\n");
			sql.append("        where lclas_cl = :lclas_cl				\n");
			sql.append(" order by sclas_cl 		\n");
			
			

		/*******************************/
		/* 대상자료 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("DATA_CODE")) {
			sql.append(" select sgis_census_data_id 	\n");
			sql.append("					, sgis_census_name 		\n");
			sql.append("					, sgis_census_location 	\n");
			sql.append("				from sgis_census_data 		\n");
			sql.append("		where sgis_census_id = :sgis_census_id  	\n");
			sql.append("					    and sgis_census_public_yn in ('Y','S')	\n");
			sql.append("		order by sgis_census_data_id	\n");

		/*******************************/
		/* 대상자료별 신청 가능 년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_YEAR")) {
			
			/*//년도 맥스값이 아니라 시도 시군구를 가져올때 년도 조건을 맥스값으로 한다.
			if ( "2".equals(lData.getString("sgis_census_id")) &&  (   "0".equals(lData.getString("sgis_census_data_id")) 
					                                                || "1".equals(lData.getString("sgis_census_data_id")) 
					                                                || "2".equals(lData.getString("sgis_census_data_id")) 
					                                                || "3".equals(lData.getString("sgis_census_data_id")) 
					                                               )  ) { 
				//2통계지역경계==>0센서스용 행정구역경계(전체)
				//				1센서스용 행정구역경계(시도)
				//				2센서스용 행정구역경계(시군구)
				//				3센서스용 행정구역경계(읍면동)
				//일 경우에만 년도가 있는것을 가져오고 나머지는 맥스값을 가져온다. 왜냐하면 나머지는 매년 최신으로 갱신된 값을 사용하기 때문이다.
				sql.append(" select sgis_census_year 	\n");
				sql.append("					, sgis_census_req_year 	\n");
				sql.append("	       from sgis_census_year_code a, sgis_census_req_year_code b 		\n");
				sql.append("		where a.sgis_census_id = :sgis_census_id	 	\n");
				sql.append("				 and a.sgis_census_data_id = :sgis_census_data_id	 	\n");
				sql.append("		         and b.sgis_census_req_id(+) = :sgis_census_req_id		 \n");
				sql.append("		         and a.sgis_census_id = b.sgis_census_id(+) 	\n");
				sql.append("		         and a.sgis_census_data_id = b.sgis_census_data_id(+) 	\n");
				sql.append("				 and a.sgis_census_year = b.sgis_census_req_year(+)		\n");
				sql.append("				 and b.sgis_census_req_y_use_che(+)='Y'   \n");
				sql.append("	order by sgis_census_year desc		\n");
			} else {
				sql.append(" select max(sgis_census_year) sgis_census_year	\n");
				sql.append("					, max(sgis_census_req_year) sgis_census_req_year	\n");
				sql.append("	       from sgis_census_year_code a, sgis_census_req_year_code b 		\n");
				sql.append("		where a.sgis_census_id = :sgis_census_id	 	\n");
				sql.append("				 and a.sgis_census_data_id = :sgis_census_data_id	 	\n");
				sql.append("		         and b.sgis_census_req_id(+) = :sgis_census_req_id		 \n");
				sql.append("		         and a.sgis_census_id = b.sgis_census_id(+) 	\n");
				sql.append("		         and a.sgis_census_data_id = b.sgis_census_data_id(+) 	\n");
				sql.append("				 and a.sgis_census_year = b.sgis_census_req_year(+)		\n");
				sql.append("				 and b.sgis_census_req_y_use_che(+)='Y'   \n");
				sql.append("	order by sgis_census_year desc		\n");
			}
			*/
			
			/* backup 20140527 원래 년도 불러오던 소스
			sql.append(" select sgis_census_year 	\n");
			sql.append("					, sgis_census_req_year 	\n");
			sql.append("	       from sgis_census_year_code a, sgis_census_req_year_code b 		\n");
			sql.append("		where a.sgis_census_id = :sgis_census_id	 	\n");
			sql.append("				 and a.sgis_census_data_id = :sgis_census_data_id	 	\n");
			sql.append("		         and b.sgis_census_req_id(+) = :sgis_census_req_id		 \n");
			sql.append("		         and a.sgis_census_id = b.sgis_census_id(+) 	\n");
			sql.append("		         and a.sgis_census_data_id = b.sgis_census_data_id(+) 	\n");
			sql.append("				 and a.sgis_census_year = b.sgis_census_req_year(+)		\n");
			sql.append("				 and b.sgis_census_req_y_use_che(+)='Y'   \n");
			sql.append("	order by sgis_census_year desc		\n");
			*/
			
			
			sql.append("	select sgis_census_year                                             	\n");
			sql.append("	from (                                                              	\n");
			sql.append("		select sgis_census_year, count(*) from  sgis_census_sigungu_data	\n");
			sql.append("		where sgis_census_id= :sgis_census_id                               \n");
			sql.append("		and sgis_census_data_id= :sgis_census_data_id                       \n");
			sql.append("		group by sgis_census_year                                       	\n");
			sql.append("	)                                                                   	\n");
			sql.append("	order by sgis_census_year desc	                                    	\n");
			
			// 2017.11.03 [개발팀] 추가 START
			/*******************************/
			/* 대상자료별 신청 가능 년도 */
			/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DETAIL_DATA_ID")) {
				int sgisCensusDataId = Integer.parseInt(lData.getString("sgis_census_data_id"));
				int sgisCensusYear = Integer.parseInt(lData.getString("sgis_census_year"));
				
				sql.append("	select sgis_census_detail_data_id, sgis_census_detail_data_nm          	\n");
				sql.append("	from sgis_census_detail_data_code		                            	\n");
				
				switch(sgisCensusDataId) {
				case 0:
					sql.append("	where sgis_census_detail_data_id like 'in%'							\n");
					break;
				
				case 1:
					sql.append("	where sgis_census_detail_data_id like 'ga%'							\n");
					break;
				
				case 2:
					sql.append("	where sgis_census_detail_data_id like 'ho%'							\n");
					break;
				
				case 3:
					sql.append("	where sgis_census_detail_data_id like 'cp%'							\n");
					break;
				default:
					sql.append("	where 1 = 1															\n");
					break;
				}
				
				sql.append("	and ");
				sql.append(sgisCensusYear);
				sql.append(" >= sgis_census_detail_data_start_baseyear 									\n");
				sql.append("	and ");
				sql.append(sgisCensusYear);
				sql.append(" <= sgis_census_detail_data_end_baseyear 									\n");
					
			
					
			// 2017.11.03 [개발팀] 추가 END
			
		/*******************************/
		/* 대상자료별 신청 가능 시도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_SIDO")) {
			/*
			if ( "2".equals(lData.getString("sgis_census_id")) &&  (   "0".equals(lData.getString("sgis_census_data_id")) 
                    || "1".equals(lData.getString("sgis_census_data_id")) 
                    || "2".equals(lData.getString("sgis_census_data_id")) 
                    || "3".equals(lData.getString("sgis_census_data_id")) 
                   )  ) { 
				sql.append(" select base_year, sido_cd, sido_nm ,objectid, sido_nm_eng	\n");
				sql.append("	       from srv_bnd_sido_pg_hst 		\n");
				sql.append("		where base_year = :base_year	 	\n");
				sql.append("	order by sido_cd 		\n");
			} else {
				sql.append(" select base_year, sido_cd, sido_nm ,objectid, sido_nm_eng	\n");
				sql.append("	       from srv_bnd_sido_pg_hst 		\n");
				//sql.append("		where base_year = :base_year	 	\n");
				sql.append("		where base_year = (select max(base_year) from srv_bnd_sido_pg_hst)	 	\n");
				sql.append("	order by sido_cd 		\n");
			}
			*/
			
			/*
			sql.append("		select sgis_census_sido, sido_nm                 							    \n");
			sql.append("		from (                                                                    		\n");
			sql.append("			select sgis_census_sido, sido_nm, count(*) from  sgis_census_sigungu_data	\n");
			sql.append("			where sgis_census_id = :sgis_census_id                                    	\n");
			sql.append("			and sgis_census_data_id = :sgis_census_data_id                              \n");
			sql.append("			and sgis_census_year = :base_year                                           \n");
			sql.append("			group by sgis_census_sido, sido_nm                                       	\n");
			sql.append("		)                                                                         		\n");
			sql.append("		order by sido_nm                                                 		\n");
			*/
			
			/*
			if ( "2013".equals(lData.getString("base_year"))) { //세종시 특별센서스
				//sql.append("	select 0 as rr, '00' as sgis_census_sido, '전국'  as sido_nm		    \n");
				//sql.append("	  from   dual                							    \n");
				//sql.append("	union all                							    \n");
				sql.append("		select rownum as rr, sgis_census_sido, sido_nm           							    \n");
				sql.append("		from (             							    \n");
				sql.append("			select sgis_census_sido, sido_nm                 							    \n");
				sql.append("			from (                                                                    		\n");
				sql.append("				select sgis_census_sido, sido_nm, count(*) from  sgis_census_sigungu_data	\n");
				sql.append("				where sgis_census_id = :sgis_census_id                                    	\n");
				sql.append("				and sgis_census_data_id = :sgis_census_data_id                              \n");
				sql.append("				and sgis_census_year = :base_year                                           \n");
				sql.append("				 and sgis_census_sido <> '00'                                           \n");
				sql.append("				group by sgis_census_sido, sido_nm                                       	\n");
				sql.append("			)                                                                         		\n");
				sql.append("		order by sido_nm                                                 		\n");
				sql.append("		)                                              		\n");
			} else {
				sql.append("	select 0 as rr, '00' as sgis_census_sido, '전국'  as sido_nm		    \n");
				sql.append("	  from   dual                							    \n");
				sql.append("	union all                							    \n");
				sql.append("		select rownum as rr, sgis_census_sido, sido_nm           							    \n");
				sql.append("		from (             							    \n");
				sql.append("			select sgis_census_sido, sido_nm                 							    \n");
				sql.append("			from (                                                                    		\n");
				sql.append("				select sgis_census_sido, sido_nm, count(*) from  sgis_census_sigungu_data	\n");
				sql.append("				where sgis_census_id = :sgis_census_id                                    	\n");
				sql.append("				and sgis_census_data_id = :sgis_census_data_id                              \n");
				sql.append("				and sgis_census_year = :base_year                                           \n");
				sql.append("				 and sgis_census_sido <> '00'                                           \n");
				sql.append("				group by sgis_census_sido, sido_nm                                       	\n");
				sql.append("			)                                                                         		\n");
				sql.append("		order by sido_nm                                                 		\n");
				sql.append("		)                                              		\n");
			}
			*/
			sql.append("	select 0 as rr, '00' as sgis_census_sido, '전국'  as sido_nm		    \n");
			sql.append("	  from   dual                							    \n");
			sql.append("	union all                							    \n");
			sql.append("		select rownum as rr, sgis_census_sido, sido_nm           							    \n");
			sql.append("		from (             							    \n");
			sql.append("			select sgis_census_sido, sido_nm                 							    \n");
			sql.append("			from (                                                                    		\n");
			sql.append("				select sgis_census_sido, sido_nm, count(*) from  sgis_census_sigungu_data	\n");
			sql.append("				where sgis_census_id = :sgis_census_id                                    	\n");
			sql.append("				and sgis_census_data_id = :sgis_census_data_id                              \n");
			sql.append("				and sgis_census_year = :base_year                                           \n");
			sql.append("				 and sgis_census_sido <> '00'                                           \n");
			sql.append("				group by sgis_census_sido, sido_nm                                       	\n");
			sql.append("			)                                                                         		\n");
			sql.append("		order by sido_nm                                                 		\n");
			sql.append("		)                                              		\n");
			
			

		/*******************************/
		/* 대상자료별 신청 가능 시군구 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_SIGUNGU")) {
			
			/*
			if ( "2".equals(lData.getString("sgis_census_id")) &&  (   "0".equals(lData.getString("sgis_census_data_id")) 
                    || "1".equals(lData.getString("sgis_census_data_id")) 
                    || "2".equals(lData.getString("sgis_census_data_id")) 
                    || "3".equals(lData.getString("sgis_census_data_id")) 
                   )  ) { 
				sql.append(" select base_year, sigungu_cd, sigungu_nm, objectid, sigungu_nm_eng  	\n");
				sql.append("	       from srv_bnd_sigungu_pg_hst 		\n");
				sql.append("		where base_year = :base_year	 	\n");
				sql.append("		  and sigungu_cd like :sido_cd || '%'	 	\n");
				sql.append("	order by sigungu_cd 		\n");
			} else {
				sql.append(" select base_year, sigungu_cd, sigungu_nm, objectid, sigungu_nm_eng  	\n");
				sql.append("	       from srv_bnd_sigungu_pg_hst 		\n");
				sql.append("		where base_year = (select max(base_year) from srv_bnd_sido_pg_hst)	 	\n");
				sql.append("		  and sigungu_cd like :sido_cd || '%'	 	\n");
				sql.append("	order by sigungu_cd 		\n");
			}
			*/
			
			/*
			sql.append("	select sgis_census_sigungu, sigungu_nm                                             	\n");
			sql.append("	from (                                                                             	\n");
			sql.append("	    select sgis_census_sigungu, sigungu_nm, count(*) from  sgis_census_sigungu_data	\n");
			sql.append("	    where sgis_census_id 	= :sgis_census_id                                      	\n");
			sql.append("	    and sgis_census_data_id = :sgis_census_data_id                                 	\n");
			sql.append("	    and sgis_census_year 	= :base_year                                           	\n");
			sql.append("	    and sgis_census_sido 	= :sido_cd                                             	\n");
			sql.append("	    group by sgis_census_sigungu, sigungu_nm                                       	\n");
			sql.append("	)                                                                                  	\n");
			sql.append("	order by sigungu_nm                                                       	\n");
			*/
			
			/*
			if ( "2013".equals(lData.getString("base_year"))) { //세종시 특별센서스
				//sql.append("	select 0 as rr, '00000' as sgis_census_sigungu, '전체'  as sigungu_nm		    \n");
				//sql.append("	  from   dual                							    \n");
				//sql.append("	union all                							    \n");
				sql.append("	select rownum as rr, sgis_census_sigungu, sigungu_nm           			   		\n");
				sql.append("	from (             							    \n");
				sql.append("		select sgis_census_sigungu, sigungu_nm                                             	\n");
				sql.append("		from (                                                                             	\n");
				sql.append("	    	select sgis_census_sigungu, sigungu_nm, count(*) from  sgis_census_sigungu_data	\n");
				sql.append("	    	where sgis_census_id 	= :sgis_census_id                                      	\n");
				sql.append("	    	and sgis_census_data_id = :sgis_census_data_id                                 	\n");
				sql.append("	    	and sgis_census_year 	= :base_year                                           	\n");
				sql.append("	    	and sgis_census_sido 	= :sido_cd                                             	\n");
				sql.append("			and sgis_census_sigungu <> '00000'                                           \n");
				sql.append("	    	group by sgis_census_sigungu, sigungu_nm                                       	\n");
				sql.append("		)                                                                                  	\n");
				sql.append("		order by sigungu_nm                                                       	\n");
				sql.append("	  )                                              		\n");
				
			} else {
				sql.append("	select 0 as rr, '00000' as sgis_census_sigungu, '전체'  as sigungu_nm		    \n");
				sql.append("	  from   dual                							    \n");
				sql.append("	union all                							    \n");
				sql.append("	select rownum as rr, sgis_census_sigungu, sigungu_nm           			   		\n");
				sql.append("	from (             							    \n");
				sql.append("		select sgis_census_sigungu, sigungu_nm                                             	\n");
				sql.append("		from (                                                                             	\n");
				sql.append("	    	select sgis_census_sigungu, sigungu_nm, count(*) from  sgis_census_sigungu_data	\n");
				sql.append("	    	where sgis_census_id 	= :sgis_census_id                                      	\n");
				sql.append("	    	and sgis_census_data_id = :sgis_census_data_id                                 	\n");
				sql.append("	    	and sgis_census_year 	= :base_year                                           	\n");
				sql.append("	    	and sgis_census_sido 	= :sido_cd                                             	\n");
				sql.append("			and sgis_census_sigungu <> '00000'                                           \n");
				sql.append("	    	group by sgis_census_sigungu, sigungu_nm                                       	\n");
				sql.append("		)                                                                                  	\n");
				sql.append("		order by sigungu_nm                                                       	\n");
				sql.append("	  )                                              		\n");
				
			}
			*/
			
			sql.append("	select 0 as rr, '00000' as sgis_census_sigungu, '전체'  as sigungu_nm		    \n");
			sql.append("	  from   dual                							    \n");
			sql.append("	union all                							    \n");
			sql.append("	select rownum as rr, sgis_census_sigungu, sigungu_nm           			   		\n");
			sql.append("	from (             							    \n");
			sql.append("		select sgis_census_sigungu, sigungu_nm                                             	\n");
			sql.append("		from (                                                                             	\n");
			sql.append("	    	select sgis_census_sigungu, sigungu_nm, count(*) from  sgis_census_sigungu_data	\n");
			sql.append("	    	where sgis_census_id 	= :sgis_census_id                                      	\n");
			sql.append("	    	and sgis_census_data_id = :sgis_census_data_id                                 	\n");
			sql.append("	    	and sgis_census_year 	= :base_year                                           	\n");
			sql.append("	    	and sgis_census_sido 	= :sido_cd                                             	\n");
			sql.append("			and sgis_census_sigungu <> '00000'                                           \n");
			sql.append("	    	group by sgis_census_sigungu, sigungu_nm                                       	\n");
			sql.append("		)                                                                                  	\n");
			sql.append("		order by sigungu_nm                                                       	\n");
			sql.append("	  )                                              		\n");
			
			
		
		/*******************************/
		/* 대상자료별 신청 가능 년도 개별업로드 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_YEAR_SUPPLY")) {
			
			sql.append("	select sgis_census_year                                             	\n");
			sql.append("	from (                                                              	\n");
			sql.append("		select sgis_census_year, count(*) from  sgis_census_supply_plan		\n");
			sql.append("		where sgis_census_id= :sgis_census_id                               \n");
			sql.append("		and sgis_census_data_id= :sgis_census_data_id                       \n");
			sql.append("		group by sgis_census_year                                       	\n");
			sql.append("	)                                                                   	\n");
			sql.append("	order by sgis_census_year desc	                                    	\n");
			
			
			
		/*******************************/
		/* 대상자료별 신청 가능 시도 개별업로드*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_SIDO_SUPPLY")) {
			
			sql.append("		select sgis_census_sido, sido_nm                 							    \n");
			sql.append("		from (                                                                    		\n");
			sql.append("			select sgis_census_sido, sido_nm, count(*) from  sgis_census_supply_plan	\n");
			sql.append("			where sgis_census_id = :sgis_census_id                                    	\n");
			sql.append("			and sgis_census_data_id = :sgis_census_data_id                              \n");
			sql.append("			and sgis_census_year = :base_year                                           \n");
			sql.append("			group by sgis_census_sido, sido_nm                                       	\n");
			sql.append("		)                                                                         		\n");
			sql.append("		order by sido_nm                                                 		\n");
		
		/*******************************/
		/* 파일명 체크 개별업로드*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_FILE_SUPPLY")) {
			
			sql.append("		select sgis_census_file, sgis_census_dir                 							    \n");
			sql.append("		from  sgis_census_supply_plan	\n");
			sql.append("			where sgis_census_id = :sgis_census_id                                    	\n");
			sql.append("			and sgis_census_data_id = :sgis_census_data_id                              \n");
			sql.append("			and sgis_census_year = :sgis_census_year                                           \n");
			sql.append("			and sgis_census_sido = :sgis_census_sido                                           \n");
			sql.append("			and sgis_census_sigungu = :sgis_census_sigungu                                           \n");
			

		/*******************************/
		/* 대상자료별 신청 가능 시군구 개별업로드*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_AVAILABLE_SIGUNGU_SUPPLY")) {
			
			sql.append("	select sgis_census_sigungu, sigungu_nm                                             	\n");
			sql.append("	from (                                                                             	\n");
			sql.append("	    select sgis_census_sigungu, sigungu_nm, count(*) from  sgis_census_supply_plan	\n");
			sql.append("	    where sgis_census_id 	= :sgis_census_id                                      	\n");
			sql.append("	    and sgis_census_data_id = :sgis_census_data_id                                 	\n");
			sql.append("	    and sgis_census_year 	= :base_year                                           	\n");
			sql.append("	    and sgis_census_sido 	= :sido_cd                                             	\n");
			sql.append("	    group by sgis_census_sigungu, sigungu_nm                                       	\n");
			sql.append("	)                                                                                  	\n");
			sql.append("	order by sigungu_nm                                                       	\n");
			
		
		/*******************************/
		/* 개별업로드 dup 체크*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("SINGLE_UPLOAD_DUP_CHK")) {
			
			sql.append("	select top 1 sgis_census_id                                             	\n");
			sql.append("	from sgis_census_sigungu_data												\n");
			sql.append("	    where sgis_census_id 	= :sgis_census_id                               \n");
			sql.append("	    and sgis_census_data_id = :sgis_census_data_id                          \n");
			sql.append("	    and sgis_census_year 	= :sgis_census_year                             \n");
			sql.append("	    and sgis_census_sido 	= :sgis_census_sido                             \n");
			sql.append("	    and sgis_census_sigungu = :sgis_census_sigungu                          \n");
			
		
		/*******************************/
		/* 센서스 전체자료 리스트 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DATA")) {
			sql.append("	select sgis_census_data_id			\n");
			sql.append("	        , sgis_census_name as sgis_census_data_name		\n");
			sql.append("	        , sgis_census_public_format 		\n");
			sql.append("			, sgis_census_public_yn		\n");
			sql.append("	        , decode(sgis_census_public_yn,'Y','공개','N','비공개','제한') sgis_census_public_yn_name 	\n");
			sql.append("	        , sgis_census_location 	\n");
			sql.append("	        , sgis_census_price 	\n");
			sql.append("	    from sgis_census_data a 	\n");
			sql.append("	where sgis_census_id = :sgis_census_id		");

		/*******************************/
		/* 센서스 전체자료 리스트 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DATA2")) {
			sql.append(" select a.sgis_census_id 		\n");
			sql.append("			, a.sgis_census_data_id		\n");
			sql.append("	        , b.sgis_census_code_name as sgis_census_id_name			\n");
			sql.append("	        , a.sgis_census_name 		\n");
			sql.append("	        , sgis_census_public_format 	\n");
			sql.append("	        , sgis_census_public_yn 		\n");
			sql.append("	        , sgis_census_location 		\n");
			sql.append("	        , sgis_census_price 		\n");
			sql.append("	   from sgis_census_data a, sgis_census_code b		\n");
			sql.append("	where a.sgis_census_id = b.sgis_census_id			\n");
			sql.append("				and a.sgis_census_id like '%' || :sgis_census_id || '%' 		\n");
			sql.append("				and a.sgis_census_data_id like '%' || :sgis_census_data_id || '%' 		\n");
			sql.append(" order by a.sgis_census_id, a.sgis_census_data_id		\n");

		/*******************************/
		/* 센서스 자료별 대상년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DATA_YEAR")) {
			sql.append(" select sgis_census_year 		\n");
			sql.append("		from sgis_census_year_code			\n");
			sql.append("		 where sgis_census_id = :sgis_census_id	 					\n");
			sql.append("				and sgis_census_data_id = :sgis_census_data_id	\n");
			sql.append(" order by sgis_census_year desc		\n");

		/*******************************/
		/* 센서스 자료별 대상년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DATA_YEAR2")) {
			sql.append(" select sgis_census_year 		\n");
			sql.append("			, sgis_census_file 		\n");
			sql.append("		from sgis_census_year_code			\n");
			sql.append("		 where sgis_census_id = :r_sgis_census_id	 					\n");
			sql.append("				and sgis_census_data_id = :r_sgis_census_data_id	\n");
			sql.append(" order by sgis_census_year desc		\n");

		/*******************************/
		/* 센서스 개인 승인, 반려건 자료리스트 */
		/*******************************/
		/* 20140523 김준하 주석처리==> 자료다운로드 부분을 뷰에서 쿼리로 수정함.
		} else if(lData.getString("PARAM").equals("CENSUS_DOWN_DATA")) {
			String sc_userkey = lData.getString("sc_userkey");
			sql.append(" select a.sgis_census_req_id,							\n");
			sql.append("        b.sgis_census_id,								\n");
			sql.append("        b.sgis_census_code_name,							\n");
			sql.append("        b.sgis_census_data_id,							\n");
			sql.append("        b.sgis_census_name as sgis_census_data_name,				\n");
			sql.append("        b.sgis_census_location,							\n");
			sql.append("        a.sgis_census_req_year,							\n");
			sql.append("        to_char(sgis_census_req_y_s_d,'yyyy-mm-dd') sgis_census_req_y_s_d ,		\n");
			sql.append("        to_char(sgis_census_req_y_e_d,'yyyy-mm-dd') sgis_census_req_y_e_d ,		\n");
			sql.append("        b.sgis_census_file								\n");
			sql.append("   from sgis_census_req_v a,							\n"); // 신청 
			sql.append("        sgis_census_data_v b							\n"); // 자료제공
			sql.append("  where a.sgis_census_id = b.sgis_census_id						\n");
			sql.append("    and a.sgis_census_data_id = b.sgis_census_data_id				\n");
			sql.append("    and a.sgis_census_req_year = b.sgis_census_year				\n");
			sql.append("    and a.sgis_census_req_status= 'A'						\n");
			sql.append("    and a.sgis_census_req_y_use_che = 'Y'						\n");
			sql.append("    and a.sgis_member_key = "+sc_userkey+"						\n");			
			sql.append("    and trunc(sysdate) between to_date(a.sgis_census_req_y_s_d) and to_date(a.sgis_census_req_y_e_d)	\n");
			sql.append("  order by a.sgis_census_req_id desc, a.sgis_census_req_year desc		\n");
		*/
		/*******************************/
		/* 센서스 개인 승인, 반려건 자료리스트 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DOWN_DATA")) {
			String sc_userkey = lData.getString("sc_userkey");
			sql.append(" select a.sgis_census_data_id, (select  d.sgis_census_name from sgis_census_data d where a.sgis_census_id = d.sgis_census_id and a.sgis_census_data_id = d.sgis_census_data_id) sgis_census_data_name ,	\n");
			sql.append("        a.sgis_census_id, (select  c.sgis_census_code_name from sgis_census_code c where a.sgis_census_id = c.sgis_census_id ) sgis_census_code_name ,                                            	\n");
			sql.append("        a.sgis_census_req_file,                                                                                                                                                                   	\n");
			sql.append("        a.sgis_census_req_id,                                                                                                                                                                     	\n");
			sql.append("        a.sgis_census_req_status,                                                                                                                                                                 	\n");
			sql.append("        a.sgis_census_req_company,                                                                                                                                                                	\n");
			sql.append("        a.sgis_census_req_tel,                                                                                                                                                                    	\n");
			sql.append("        a.sgis_census_req_goal,                                                                                                                                                                   	\n");
			sql.append("        to_char(a.sgis_census_req_app_date,'yyyy-mm-dd') sgis_census_req_app_date ,                                                                                                                                                               	\n");
			sql.append("        a.sgis_census_req_reject,                                                                                                                                                                 	\n");
			sql.append("        a.create_user,                                                                                                                                                                            	\n");
			sql.append("        to_char(a.create_date,'yyyy-mm-dd') create_date,                                                                                                                                                                            	\n");
			sql.append("        a.last_update_user,                                                                                                                                                                       	\n");
			sql.append("        to_char(a.last_update_date,'yyyy-mm-dd') last_update_date,                                                                                                                                                                       	\n");
			sql.append("        a.sgis_member_key,                                                                                                                                                                        	\n");
			sql.append("        a.sgis_census_req_sosok,                                                                                                                                                                  	\n");
			sql.append("        a.sgis_census_req_mokjuk,                                                                                                                                                                 	\n");
			sql.append("        a.sgis_census_req_email,                                                                                                                                                                  	\n");
			sql.append("        a.sgis_census_req_kwaje,                                                                                                                                                                  	\n");
			sql.append("        a.sgis_census_req_gyulje,                                                                                                                                                                 	\n");
			sql.append("        b.sgis_census_req_sido,                                                                                                                                                                   	\n");
			sql.append("        b.sgis_census_req_sigungu,                                                                                                                                                                	\n");
			sql.append("        b.sgis_census_req_year,                                                                                                                                                                   	\n");
			sql.append("        to_char(b.sgis_census_app_date,'yyyy-mm-dd') sgis_census_app_date,                                                                                                                                                                   	\n");
			sql.append("        to_char(b.sgis_census_req_y_s_d,'yyyy-mm-dd') sgis_census_req_y_s_d ,                                                                                                                                                               	\n");
			sql.append("        to_char(b.sgis_census_req_y_e_d,'yyyy-mm-dd') sgis_census_req_y_e_d ,                                                                                                                                                                  	\n");
			sql.append("        b.sgis_census_req_y_use_che    ,  e.sgis_census_dir, e.sgis_census_file                                                                                                                                                           	\n");
			sql.append("   from sgis_census_req a,                                                                                                                                                                        	\n");
			sql.append("        sgis_census_req_year_code b,                                                                                                                                                              	\n");
			sql.append("  		sgis_census_sigungu_data e                                                                                                                                                                      	\n");
			sql.append("  where a.sgis_census_req_id = b.sgis_census_req_id                                                                                                                                               	\n");
			sql.append("    and a.sgis_census_id= b.sgis_census_id                                                                                                                                                        	\n");
			sql.append("    and a.sgis_census_data_id = b.sgis_census_data_id                                                                                                                                             	\n");
			sql.append(" and e.sgis_census_id = b.sgis_census_id                                                                                                                                                          	\n");
			sql.append(" and e.sgis_census_data_id=b.sgis_census_data_id                                                                                                                                                  	\n");
			sql.append(" and e.sgis_census_year  =b.sgis_census_req_year                                                                                                                                                  	\n");
			sql.append(" and e.sgis_census_sido=b.sgis_census_req_sido                                                                                                                                                    	\n");
			sql.append(" and e.sgis_census_sigungu = b.sgis_census_req_sigungu                                                                                                                                            	\n");
			sql.append(" and a.sgis_census_req_status= 'A'                                                                                                                                                                	\n");
			sql.append(" -- and b.sgis_census_req_y_use_che = 'Y'                                                                                                                                                         	\n");
			sql.append(" and a.sgis_member_key = " + sc_userkey + "                                                                                                                                                                 	\n");
			sql.append("  and trunc(sysdate) between to_date(b.sgis_census_req_y_s_d) and to_date(b.sgis_census_req_y_e_d)                                                                                                	\n");
			sql.append(" order by  a.sgis_census_req_id desc, a.sgis_census_id,  a.sgis_census_data_id, b.sgis_census_req_year                                                                                                         	\n");

			
			
		/*******************************/
		/* 센서스 개인 신청 상세정보 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_INFO")) {
			sql.append(" select a.sgis_census_id	\n");
			sql.append("		        , b.sgis_census_code_name 	\n");
			sql.append("		        , a.sgis_census_data_id 	\n");
			sql.append("		        , c.sgis_census_name sgis_census_data_name 	\n");
			sql.append("		        , sgis_census_req_company 	\n");
			
			sql.append("		        , sgis_census_req_email 	\n");
			sql.append("		        , sgis_census_req_sosok 	\n");
			sql.append("		        , sgis_census_req_mokjuk 	\n");
			sql.append("		        , sgis_census_req_kwaje 	\n");
			
			sql.append("		        , sgis_census_req_tel 		\n");
			sql.append("		        , sgis_census_req_goal 		\n");
			sql.append("		        , sgis_census_req_file 		\n");
			sql.append("		        , sgis_census_req_status 	\n");
			sql.append("				, sgis_census_req_reject		\n");
			sql.append("				, sgis_census_location		\n");
			sql.append("				, to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date		\n");
			
			sql.append("				, d.sgis_census_req_year as sgis_census_req_year		\n");
			//sql.append("				, d.sgis_census_req_sido, decode(d.sgis_census_req_sido, '00', '전국', (Select top 1 sido_nm from srv_bnd_sido_pg_hst where base_year= d.sgis_census_req_year and sido_cd=d.sgis_census_req_sido ) ) sido_nm		\n");
			sql.append("				, d.sgis_census_req_sido, decode(d.sgis_census_req_sido, '00', '전국', (Select top 1 sido_nm from sgis_census_sigungu_data where sgis_census_year= d.sgis_census_req_year and sgis_census_sido=d.sgis_census_req_sido ) ) sido_nm		\n");
			//sql.append("				, d.sgis_census_req_sigungu, decode(d.sgis_census_req_sigungu, '00000', '전체',  (Select top 1 sigungu_nm from srv_bnd_sigungu_pg_hst where base_year= d.sgis_census_req_year and sigungu_cd = d.sgis_census_req_sigungu )) sigungu_nm		\n");
			sql.append("				, d.sgis_census_req_sigungu, decode(d.sgis_census_req_sigungu, '00000', '전체',  (Select top 1 sigungu_nm from sgis_census_sigungu_data where sgis_census_year= d.sgis_census_req_year and sgis_census_sigungu = d.sgis_census_req_sigungu )) sigungu_nm		\n");
			
			sql.append("		    from sgis_census_req a, sgis_census_code b, sgis_census_data c, sgis_census_req_year_code d	\n");
			sql.append("	where a.sgis_census_req_id = :sgis_census_req_id 						\n");
			sql.append("		        and a.sgis_census_id = b.sgis_census_id 				\n");
			sql.append("				and a.sgis_census_id = c.sgis_census_id					\n");
			sql.append("		        and a.sgis_census_data_id = c.sgis_census_data_id		\n");
			
			sql.append("		        and a.sgis_census_req_id = d.sgis_census_req_id			\n");
			sql.append("		        and a.sgis_census_id = d.sgis_census_id					\n");
			sql.append("		        and a.sgis_census_data_id = d.sgis_census_data_id		\n");

		/*******************************/
		/* 센서스 개인 신청 상세정보 수정 20100218 이태경  */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_INFO_MOD")) {
			sql.append(" select a.sgis_census_id	\n");
			sql.append("		        , b.sgis_census_code_name 	\n");
			sql.append("		        , a.sgis_census_data_id 	\n");
			sql.append("		        , c.sgis_census_name sgis_census_data_name 	\n");
			sql.append("		        , sgis_census_req_company 	\n");
			sql.append("		        , sgis_census_req_tel 		\n");
			sql.append("		        , sgis_census_req_goal 		\n");
			sql.append("		        , sgis_census_req_file 		\n");
			sql.append("		        , sgis_census_req_status 	\n");
			sql.append("				, sgis_census_req_reject		\n");
			sql.append("				, sgis_census_location		\n");
			sql.append("				, to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date		\n");
			sql.append("		    from sgis_census_req a, sgis_census_code b, sgis_census_data c 	\n");
			sql.append("	where sgis_census_req_id = :sgis_census_req_id 		\n");
			sql.append("		        and a.sgis_census_id = b.sgis_census_id 		\n");
			sql.append("				and a.sgis_census_id = c.sgis_census_id			\n");
			sql.append("		        and a.sgis_census_data_id = c.sgis_census_data_id		\n");
			sql.append("		        and rownum = 1		\n");
			
		/*******************************/
		/* 센서스 개인 신청가능  대상년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_AVAILABLE_YEAR")) {
			sql.append(" select sgis_census_req_year from sgis_census_req_year_code	\n");
			sql.append("		where sgis_census_req_id = :sgis_census_req_id		\n");
			sql.append("					and sgis_census_req_y_use_che = 'Y' 	\n");
			sql.append("	order by sgis_census_req_year desc		\n");
			
		/*******************************/
		/* 센서스 개인 신청가능  대상년도 GROUP 이태경 20100217*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_AVAILABLE_YEAR_GROUP")) {
			sql.append(" select sgis_census_req_year from sgis_census_req_year_code	\n");
			sql.append("  where sgis_census_req_id = :sgis_census_req_id		\n");
			sql.append("    and sgis_census_id = :sgis_census_id		\n");
			sql.append("    and sgis_census_data_id = :sgis_census_data_id		\n");
			sql.append("    and sgis_census_req_y_use_che = 'Y' 	\n");
			sql.append("   order by sgis_census_req_year desc		\n");			

		/*******************************/
		/* 센서스 개인 신청  대상년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_YEAR")) {
			sql.append(" select sgis_census_req_year, sgis_census_req_sido, sgis_census_req_sigungu 	\n");
			sql.append(" 		from sgis_census_req_year_code						\n");
			sql.append("		where sgis_census_req_id = :sgis_census_req_id		\n");
			sql.append("					and sgis_census_req_y_use_che = 'Y' 	\n");
			sql.append("	order by sgis_census_req_year desc		\n");

		/*******************************/
		/* 센서스 개인 신청 정보 리스트 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY")) {
			sql.append(" select  sgis_census_req_id		\n");
			sql.append("				, a.sgis_census_id			\n");
			sql.append("  	        , b.sgis_census_code_name 	\n");
			sql.append("  	        , a.sgis_census_data_id 	\n");
			sql.append("  	        , c.sgis_census_name sgis_census_data_name 	\n");
			sql.append("  	        , to_char(create_date,'yyyy-mm-dd') create_date 	\n");
			sql.append("				, sgis_census_req_status			\n");
			sql.append("  	        , decode(sgis_census_req_status, 'S', '신청', 'A', '승인', 'B', '반려') sgis_census_req_status_name		\n");
			sql.append("  	        , to_char(sgis_census_req_app_date,'yyyy-mm-dd') sgis_census_req_app_date		\n");
			sql.append("  	    from sgis_census_req a, sgis_census_code b, sgis_census_data c 		\n");
			sql.append("		where a.sgis_member_key = :sc_userkey 		\n");
			sql.append("	  	        and a.sgis_census_id = b.sgis_census_id 		\n");
			sql.append("	  	        and b.sgis_census_id = c.sgis_census_id 		\n");
			sql.append("	  	        and a.sgis_census_data_id = c.sgis_census_data_id		\n");
			sql.append("	order by sgis_census_req_id desc	\n");
			
			
			
		/*******************************/
		/* 센서스 개인 신청 정보 리스트 (GROUP) 이태경 20100217*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_GROUP")) {


		    sql.append("    select sgis_census_req_id                                                           \n");
		    sql.append("          ,sgis_census_req_status_name                                                    \n");                 
		    sql.append("          ,sgis_census_req_status                                          \n");
		    sql.append("          ,to_char(create_date, 'yyyy-mm-dd') create_date                    \n");
		    sql.append("          ,to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date          \n");
		    sql.append("      from (SELECT sgis_census_req_id                                              \n");
		    sql.append("              ,sgis_census_req_status                  \n");
		    sql.append("              ,create_date   \n");
		    sql.append("              ,decode(sgis_census_req_status , 'S', '신청', 'A', '승인', 'B', '반려') sgis_census_req_status_name  \n");
		    sql.append("              , sgis_census_req_app_date  \n");
		    sql.append("          FROM SGIS_CENSUS_REQ A, SGIS_CENSUS_CODE B, SGIS_CENSUS_DATA C  \n");
		    sql.append("         WHERE A.SGIS_MEMBER_KEY = :sc_userkey   \n");
		    sql.append("           AND A.SGIS_CENSUS_ID = B.SGIS_CENSUS_ID  \n");
		    sql.append("           AND B.SGIS_CENSUS_ID = C.SGIS_CENSUS_ID  \n");
		    sql.append("           AND A.SGIS_CENSUS_DATA_ID = C.SGIS_CENSUS_DATA_ID  \n");
		    sql.append("           AND (A.sgis_census_req_reject <> 'ZZ' or A.sgis_census_req_reject is null)  \n");
		    sql.append("         group by sgis_census_req_id,  \n");
		    sql.append("                  CREATE_DATE,  \n");
		    sql.append("                  SGIS_CENSUS_REQ_STATUS,  \n");
		    sql.append("                  SGIS_CENSUS_REQ_APP_DATE  \n");
		    sql.append("         ORDER BY SGIS_CENSUS_REQ_ID DESC)  \n");
		    

		/*******************************/
		/* 센서스 개인 신청시 sequence */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_MAXNUM")) {
			sql.append(" select nvl(max(sgis_census_req_id)+1,0) maxnum from sgis_census_req");
		/*******************************/
		/* 센서스 신청 자료 개수 이태경 20100218 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_REQ_DATA_CNT")) {
			sql.append(" select to_char(count(*)) cnt from sgis_census_req where sgis_census_req_id = :sgis_census_req_id ");

		/*******************************/
		/* 센서스 승인, 반려후 수정권한여부 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("ISEDIT")) {
			sql.append(" select sgis_census_req_status from sgis_census_req where sgis_census_req_id = :sgis_census_req_id	");

		/*******************************/
		/* 센서스 요청관리 리스트 (관리자) */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_LIST")) {
			sql.append(" select sgis_census_req_id		\n");
			sql.append("	        , a.sgis_census_id 		\n");
			sql.append("	        , b.sgis_census_code_name 		\n");
			sql.append("	        , a.sgis_census_data_id 		\n");
			sql.append("	        , c.sgis_census_name sgis_census_data_name 	\n");
			sql.append("	        , to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date 		\n");
			sql.append("			, to_char(a.create_date, 'yyyy-mm-dd') create_date 		\n");
			sql.append("	        , sgis_census_req_status 		\n");
			sql.append("	        , decode(sgis_census_req_status,'S','신청','A','승인','B','반려') sgis_census_req_status_name 		\n");
			sql.append("	        , a.sgis_member_key 		\n");
			sql.append("	        , sgis_name 		\n");
			sql.append("	        , sgis_member_id 		\n");
			sql.append("	     from sgis_census_req a, sgis_census_code b, sgis_census_data c, sgis_member_info d 	\n");
			sql.append("	    where a.sgis_census_id = b.sgis_census_id 		\n");
			sql.append("		        and a.sgis_census_id = c.sgis_census_id 		\n");
			sql.append("		        and a.sgis_census_data_id = c.sgis_census_data_id 		\n");
			sql.append("		        and a.sgis_member_key = d.sgis_member_key 	\n");
			//sql.append("				and (sgis_member_id like '%' || :search_input || '%' or sgis_name like '%' || :search_input || '%') 	\n");
			sql.append("   and (b.member_id like '%' || :search_input || '%' or b.member_nm like '%' || :search_input || '%') 	\n");

			if(!StringUtil.isEmpty(lData.getString("search_sel2"))) {	//승인상태
				sql.append("		and sgis_census_req_status = :search_sel2 		\n");
			}
			if(!StringUtil.isEmpty(lData.getString("sgis_census_id"))) {	//자료구분
				sql.append("		 and a.sgis_census_id = :sgis_census_id 		\n");
			}
			if(!StringUtil.isEmpty(lData.getString("sgis_census_data_id"))) {	//대상자료
				sql.append("		 and a.sgis_census_data_id = :sgis_census_data_id 		\n");
			}

			sql.append("	order by a.create_date desc, sgis_census_req_id desc, sgis_name		\n");

		/*******************************/
		/* 센서스 요청관리 리스트 그룹(관리자) 20100218 이태경*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_GROUP_LIST")) {
			
			/*
			// 20150615 원본
			
			
			sql.append("select a.sgis_census_req_id ,							\n");				
			sql.append("       a.sgis_census_req_status, \n");
			sql.append("       to_char(a.create_date, 'yyyy-mm-dd') create_date,        \n");                
			sql.append("       a.sgis_census_req_status,\n");
			sql.append("       to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date,        \n");
			sql.append("       a.sgis_member_key,         \n");
			sql.append("       b.sgis_name,         \n");
			sql.append("       b.sgis_member_id \n");
			sql.append("  from sgis_census_req a,  \n");
			sql.append("       sgis_member_info b,  \n");
	        sql.append("        (SELECT SA.SGIS_CENSUS_REQ_ID , SA.SGIS_CENSUS_ID , MAX(SA.SGIS_CENSUS_DATA_ID) SGIS_CENSUS_DATA_ID ,SA.SGIS_MEMBER_KEY \n");
	        sql.append("           FROM SGIS_CENSUS_REQ SA,                                                                                                \n");
	        sql.append("                (SELECT SGIS_CENSUS_REQ_ID ,MAX(SGIS_CENSUS_ID) SGIS_CENSUS_ID \n");
	        sql.append("                   FROM SGIS_CENSUS_REQ \n");
	        sql.append("                  GROUP BY SGIS_CENSUS_REQ_ID) SB \n");
	        sql.append("          WHERE SA.SGIS_CENSUS_REQ_ID = SB.SGIS_CENSUS_REQ_ID \n");
	        sql.append("            AND SA.SGIS_CENSUS_ID = SB.SGIS_CENSUS_ID \n"); 
	        sql.append("          GROUP BY SA.SGIS_CENSUS_REQ_ID, SA.SGIS_CENSUS_ID,SA.SGIS_MEMBER_KEY ) C \n");
			sql.append(" where a.sgis_census_req_id = c.sgis_census_req_id \n");
			sql.append("   and a.sgis_census_id = c.sgis_census_id \n");
			sql.append("   and a.sgis_census_data_id = c.sgis_census_data_id \n");
			sql.append("   and c.sgis_member_key = b.sgis_member_key   \n");
			sql.append("   and (a.sgis_census_req_reject <> 'ZZ' or a.sgis_census_req_reject is Null)  \n");
			sql.append("   and (sgis_member_id like '%' || :search_input || '%' or sgis_name like '%' || :search_input || '%') 	\n");
			if(!StringUtil.isEmpty(lData.getString("search_sel2"))) {	//승인상태
				sql.append("		and a.sgis_census_req_status = :search_sel2 		\n");
			}
			sql.append("	order by a.create_date desc, sgis_census_req_id desc, sgis_name		\n");
			*/
			
			
			//SOP용
			/*sql.append("select a.sgis_census_req_id ,							\n");				
			sql.append("       a.sgis_census_req_status, \n");
			sql.append("       to_char(a.create_date, 'yyyy-mm-dd') create_date,        \n");                
			sql.append("       a.sgis_census_req_status,\n");
			sql.append("       to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date,        \n");
			sql.append("       a.sgis_member_key,         \n");
			sql.append("       b.member_nm as sgis_name,         \n");
			sql.append("       b.member_id as sgis_member_id \n");
			sql.append("  from sgis_census_req a,  \n");
			sql.append("       srv_dt_memberinfo b,  \n");
	        sql.append("        (SELECT SA.SGIS_CENSUS_REQ_ID , SA.SGIS_CENSUS_ID , MAX(SA.SGIS_CENSUS_DATA_ID) SGIS_CENSUS_DATA_ID ,SA.SGIS_MEMBER_KEY \n");
	        sql.append("           FROM SGIS_CENSUS_REQ SA,                                                                                                \n");
	        sql.append("                (SELECT SGIS_CENSUS_REQ_ID ,MAX(SGIS_CENSUS_ID) SGIS_CENSUS_ID \n");
	        sql.append("                   FROM SGIS_CENSUS_REQ \n");
	        sql.append("                  GROUP BY SGIS_CENSUS_REQ_ID) SB \n");
	        sql.append("          WHERE SA.SGIS_CENSUS_REQ_ID = SB.SGIS_CENSUS_REQ_ID \n");
	        sql.append("            AND SA.SGIS_CENSUS_ID = SB.SGIS_CENSUS_ID \n"); 
	        sql.append("          GROUP BY SA.SGIS_CENSUS_REQ_ID, SA.SGIS_CENSUS_ID,SA.SGIS_MEMBER_KEY ) C \n");
			sql.append(" where a.sgis_census_req_id = c.sgis_census_req_id \n");
			sql.append("   and a.sgis_census_id = c.sgis_census_id \n");
			sql.append("   and a.sgis_census_data_id = c.sgis_census_data_id \n");
			sql.append("   and c.sgis_member_key = b.member_id   \n");
			sql.append("   and (a.sgis_census_req_reject <> 'ZZ' or a.sgis_census_req_reject is Null)  \n");
			sql.append("   and (b.member_id like '%' || :search_input || '%' or b.member_nm like '%' || :search_input || '%') 	\n");
			if(!StringUtil.isEmpty(lData.getString("search_sel2"))) {	//승인상태
				sql.append("		and a.sgis_census_req_status = :search_sel2 		\n");
			}
			sql.append("	order by a.create_date desc, sgis_census_req_id desc, sgis_name		\n");*/
			
			sql.append("SELECT  DISTINCT a.SGIS_CENSUS_REQ_ID ,\n"); 
			sql.append("		MAX(a.SGIS_CENSUS_DATA_ID) SGIS_CENSUS_DATA_ID , \n");
			sql.append("		a.SGIS_MEMBER_KEY , \n");
			sql.append("		to_char(a.create_date, 'yyyy-mm-dd') CREATE_DATE , \n");
			sql.append("		a.SGIS_CENSUS_REQ_STATUS ,\n");
			sql.append("		to_char(A.SGIS_CENSUS_REQ_APP_DATE, 'yyyy-mm-dd') SGIS_CENSUS_REQ_APP_DATE ,\n");
			sql.append("		b.MEMBER_NM as sgis_name ,\n");         
			sql.append("		b.MEMBER_ID as sgis_member_id \n");  
			sql.append("FROM SGIS_CENSUS_REQ a,  SRV_DT_MEMBERINFO b \n");
			sql.append("WHERE  a.SGIS_MEMBER_KEY = b.MEMBER_ID \n"); 
			sql.append("AND   (a.SGIS_CENSUS_REQ_REJECT <> 'ZZ' or a.SGIS_CENSUS_REQ_REJECT is Null) \n");
			sql.append("   and (b.member_id like '%' || :search_input || '%' or b.member_nm like '%' || :search_input || '%') 	\n");
			if(!StringUtil.isEmpty(lData.getString("search_sel2"))) {	//승인상태
				sql.append("		and a.sgis_census_req_status = :search_sel2 		\n");
			}
			sql.append("GROUP BY \n"); 
			sql.append("		a.SGIS_CENSUS_REQ_ID ,\n");
			sql.append("		a.SGIS_MEMBER_KEY ,\n");
			sql.append("		a.CREATE_DATE ,\n");
			sql.append("		a.SGIS_CENSUS_REQ_STATUS ,\n"); 
			sql.append("		a.SGIS_CENSUS_REQ_APP_DATE ,\n");
			sql.append("		b.member_nm ,\n");
			sql.append("		b.member_id \n");
			sql.append("		ORDER BY a.SGIS_CENSUS_REQ_ID DESC \n");
			
		/*******************************/
		/* 센서스 요청관리 리스트 그룹(관리자) 과장님 결재  */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_GROUP_LIST_GYULJE")) {
			sql.append("select a.sgis_census_req_id ,							\n");				
			sql.append("       a.sgis_census_req_status, \n");
			sql.append("       to_char(a.create_date, 'yyyy-mm-dd') create_date,        \n");                
			sql.append("       a.sgis_census_req_status,\n");
			sql.append("       to_char(sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date,        \n");
			sql.append("       a.sgis_member_key,         \n");
			sql.append("       b.member_nm as sgis_name,         \n");
			sql.append("       b.member_id as sgis_member_id \n");
			sql.append("	   , a.sgis_census_req_gyulje 		\n");
			sql.append("  from sgis_census_req a,  \n");
			sql.append("       srv_dt_memberinfo b,  \n");
	        sql.append("        (SELECT SA.SGIS_CENSUS_REQ_ID , SA.SGIS_CENSUS_ID , MAX(SA.SGIS_CENSUS_DATA_ID) SGIS_CENSUS_DATA_ID ,SA.SGIS_MEMBER_KEY \n");
	        sql.append("           FROM SGIS_CENSUS_REQ SA,                                                                                                \n");
	        sql.append("                (SELECT SGIS_CENSUS_REQ_ID ,MAX(SGIS_CENSUS_ID) SGIS_CENSUS_ID \n");
	        sql.append("                   FROM SGIS_CENSUS_REQ \n");
	        sql.append("                  GROUP BY SGIS_CENSUS_REQ_ID) SB \n");
	        sql.append("          WHERE SA.SGIS_CENSUS_REQ_ID = SB.SGIS_CENSUS_REQ_ID \n");
	        sql.append("            AND SA.SGIS_CENSUS_ID = SB.SGIS_CENSUS_ID \n"); 
	        sql.append("          GROUP BY SA.SGIS_CENSUS_REQ_ID, SA.SGIS_CENSUS_ID,SA.SGIS_MEMBER_KEY ) C \n");
			sql.append(" where a.sgis_census_req_id = c.sgis_census_req_id \n");
			sql.append("   and a.sgis_census_id = c.sgis_census_id \n");
			sql.append("   and a.sgis_census_data_id = c.sgis_census_data_id \n");
			sql.append("   and c.sgis_member_key = b.member_id   \n");
			sql.append("   and (a.sgis_census_req_reject <> 'ZZ' or a.sgis_census_req_reject is Null)  \n");
			//sql.append("   and (sgis_member_id like '%' || :search_input || '%' or sgis_name like '%' || :search_input || '%') 	\n");
			sql.append("   and (b.member_id like '%' || :search_input || '%' or b.member_nm like '%' || :search_input || '%') 	\n");
			
			if(!StringUtil.isEmpty(lData.getString("search_sel2"))) {	//승인상태
				sql.append("		and a.sgis_census_req_status = :search_sel2 		\n");
			}
			
			if(!StringUtil.isEmpty(lData.getString("sgis_census_gyulje"))) {
				if(lData.getString("sgis_census_gyulje").equals("A")) {
					sql.append("	and sgis_census_req_gyulje = 'A' 		\n"); //결재는 A 이다.
				} else if (lData.getString("sgis_census_gyulje").equals("X")) {
					sql.append("	and (sgis_census_req_gyulje is NULL or sgis_census_req_gyulje = '' )		\n"); //미처리는 '' 이거나 NULL 이다
				}
			}
			
			if(!StringUtil.isEmpty(lData.getString("sgis_census_req_y_s_d"))) {
				sql.append("	and a.create_date between  :sgis_census_req_y_s_d  and :sgis_census_req_y_e_d		\n");
			}
			
			sql.append("	order by a.create_date desc, sgis_census_req_id desc, sgis_name		\n");
			
		/*******************************/
		/* 센서스 요청 승인된 리스트 (관리자) */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPROVE_LIST")) {
			// 2018. 02. 08 mng_s
			sql.append(" select	\n");
			sql.append(" 	A.*	\n");
			sql.append(" 	, case when A.sgis_census_detail_data_id is not null 	\n");
			sql.append(" 		then A.sgis_census_data_name || ' - ' || B.sgis_census_detail_data_nm 	\n");
			sql.append(" 		else A.sgis_census_data_name	\n");
			sql.append(" 		end sgis_census_detail_data_nm	\n");
			sql.append(" from	\n");
			sql.append(" (	\n");
			// 2018. 02. 08 mng_e
			
			sql.append(" select distinct a.sgis_census_req_id 			\n");
			sql.append("	        , a.sgis_census_id 		\n");
			sql.append("	        , d.sgis_census_code_name 		\n");
			sql.append("			, a.sgis_census_data_id			\n");
			sql.append("	        , e.sgis_census_name as sgis_census_data_name 		\n");
			sql.append("	        , sgis_census_req_year 		\n");
			sql.append("	        , to_char(sgis_census_req_app_date,'yyyy-mm-dd') sgis_census_req_app_date 		\n");
			sql.append("	        , to_char(sgis_census_app_date,'yyyy-mm-dd') sgis_census_app_date 		\n");
			sql.append("	        , to_char(sgis_census_req_y_s_d,'yyyy-mm-dd') sgis_census_req_y_s_d 		\n");
			sql.append("	        , to_char(sgis_census_req_y_e_d,'yyyy-mm-dd') sgis_census_req_y_e_d 		\n");
			sql.append("	        , sgis_census_req_y_use_che 		\n");
			
			//sql.append("	        , sgis_member_id 		\n");
			//sql.append("	        , sgis_name 		\n");
			sql.append("       		,b.member_nm as sgis_name         \n");
			sql.append("       		,b.member_id as sgis_member_id \n");
			
			// 2018. 02. 08 mng_s
			sql.append("       		, c.sgis_census_detail_data_id \n");
			// 2018. 02. 08 mng_e
			
			sql.append("        from sgis_census_req with (nolock) a, srv_dt_memberinfo  with (nolock) b, sgis_census_req_year_code with (nolock) c 		\n");
			sql.append("	                , sgis_census_code with (nolock) d, sgis_census_data with (nolock) e 		\n");
			sql.append("	where sgis_census_req_status = 'A' 		\n");	//승인된것만 가져옴
			sql.append("					and sgis_census_req_y_use_che = 'Y' 		\n");	//사용된 년도만 가져옴
			sql.append("				    and a.sgis_member_key = b.member_id 		\n");
			sql.append("				    and a.sgis_census_req_id = c.sgis_census_req_id 	\n");
			sql.append("				    and a.sgis_census_id = c.sgis_census_id 		\n");
			sql.append("					and a.sgis_census_data_id= c.sgis_census_data_id 	\n");
			sql.append("			    	and a.sgis_census_id = d.sgis_census_id 		\n");
			sql.append("				    and a.sgis_census_id = e.sgis_census_id 		\n");
			sql.append("				    and a.sgis_census_data_id = e.sgis_census_data_id 		\n");

			if(!StringUtil.isEmpty(lData.getString("search_sel"))) {
				if(lData.getString("search_sel").equals("id")) {
					//sql.append("	and (sgis_member_id like '%' || :search_input || '%' or sgis_name like '%' || :search_input || '%') 		\n");
					sql.append("   and (b.member_id like '%' || :search_input || '%' or b.member_nm like '%' || :search_input || '%') 	\n");
				}
			}
			sql.append("	order by sgis_census_req_id desc, sgis_census_req_year desc limit 1, 1000	\n");

			// 2018. 02. 08 mng_s
			sql.append("	) A	\n");
			sql.append("	left outer join sgis_census_detail_data_code B	\n");
			sql.append("	on A.sgis_census_detail_data_id = B.sgis_census_detail_data_id limit 1,1000	\n");
			// 2018. 02. 08 mng_e
			
		/*******************************/
		/* 센서스 개인 신청 상세정보2 (관리자) */
	    /* 아이티밴드 속도개선 20220627     */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_INFO2")) {
			sql.append("				select  a.*                                                                                                                 \n");
			sql.append("				      , B.sgis_census_detail_data_nm                                                                                        \n");         
			sql.append("					  , decode(C.sido_nm,'00','전국',C.sido_nm) as sido_nm                                                                   \n");          
			sql.append("					  ,  decode(D.sigungu_nm,'0000',' 전체',D.sigungu_nm)  as sigungu_nm                                                     \n");
			sql.append("				from(                                                                                                                       \n");
			sql.append("					 select a.*                                                                                                             \n");
			sql.append("					        ,b.sgis_census_code_name                                                                                        \n");
			sql.append("					        , c.sgis_census_name sgis_census_data_name                                                                      \n");
			sql.append("					        , c.sgis_census_location                                                                                        \n");
			sql.append("					        , d.member_nm as sgis_name 		                                                                                \n");           
			sql.append("					        , d.member_id as sgis_member_id 	                                                                            \n");
			sql.append("					 from (                                                                                                                 \n");
			sql.append("							  select distinct  a.sgis_census_id 		                                                                    \n");                               
			sql.append("							       , a.sgis_census_data_id 		                                                                            \n");                   
			sql.append("							       , a.census_output_area_year 		                                                                        \n");                   
			sql.append("							       , to_char(a.create_date, 'yyyy-mm-dd') create_date 		                                                \n");                   
			sql.append("							       , to_char(a.sgis_census_req_app_date, 'yyyy-mm-dd') sgis_census_req_app_date 		                    \n");                       
			sql.append("							       , a.sgis_census_req_status 		                                                                        \n");                   
			sql.append("							       , decode(a.sgis_census_req_status,'S','신청','A','승인','B','반려') sgis_census_req_status_name 		        \n");                   
			sql.append("							       , a.sgis_member_key 		                                                                                \n");                   
			sql.append("							       , b.sgis_census_req_sido                                                                                 \n");                   
			sql.append("							       , b.sgis_census_req_sigungu                                                                              \n");                   
			sql.append("							       , a.sgis_census_req_company 		                                                                        \n");                   
			sql.append("							       , a.sgis_census_req_tel 		                                                                            \n");                   
			sql.append("							       , a.sgis_census_req_file 		                                                                        \n");                       
			sql.append("								   , a.sgis_census_req_goal			                                                                        \n");                   
			sql.append("								   , a.sgis_census_req_reject			                                                                    \n");                       
			sql.append("								   , a.sgis_census_req_email 	                                                                            \n");                       
			sql.append("								   , a.sgis_census_req_sosok 	                                                                            \n");                       
			sql.append("								   , a.sgis_census_req_mokjuk 	                                                                            \n");                   
			sql.append("								   , a.sgis_census_req_kwaje 	                                                                            \n");                       
			sql.append("								   , b.sgis_census_req_year as sgis_census_req_year		                                                    \n");                   
			sql.append("								   , b.sgis_census_detail_data_id 	                                                                        \n");                   
			sql.append("								   , a.sgis_census_req_gyulje 	                                                                            \n");                   
			sql.append("							    from sgis_census_req a                                                                                      \n");
			sql.append("							    inner join sgis_census_req_year_code b                                                                      \n");
			sql.append("							            on a.sgis_census_req_id = :sgis_census_req_id                                                       \n");
			sql.append("							           and a.sgis_census_req_id = b.sgis_census_req_id                                                      \n");
			sql.append("							           and a.sgis_census_id = b.sgis_census_id                                                              \n");
			sql.append("							           and a.sgis_census_data_id = b.sgis_census_data_id	                                                \n");
			sql.append("					   )a                                                                                                                   \n");
			sql.append("					   inner join sgis_census_code b                                                                                        \n");
			sql.append("					           on a.sgis_census_id = b.sgis_census_id                                                                       \n");
			sql.append("					   inner join sgis_census_data c                                                                                        \n");
			sql.append("					           on a.sgis_census_id = c.sgis_census_id                                                                       \n");
			sql.append("					          and a.sgis_census_data_id = c.sgis_census_data_id                                                             \n");
			sql.append("					   inner join srv_dt_memberinfo d                                                                                       \n");
			sql.append("					           on a.sgis_member_key = d.member_id		                                                                    \n");
			sql.append("				)a                                                                                                                          \n");
			sql.append("				  left outer join  sgis_census_detail_data_code B                                                                           \n");       
			sql.append("				  			on A.sgis_census_detail_data_id = B.sgis_census_detail_data_id                                                  \n");       
			sql.append("				  left outer join (                                                                                                         \n");       
			sql.append("							select distinct sgis_census_year, sido_nm, sgis_census_sido  from sgis_census_sigungu_data                      \n");       
			sql.append("				  ) C  on  C.sgis_census_year= A.sgis_census_req_year and C.sgis_census_sido=A.sgis_census_req_sido                         \n");       
			sql.append("				  left outer join (                                                                                                         \n");       
			sql.append("						select distinct sgis_census_year, sigungu_nm, sgis_census_sigungu  from sgis_census_sigungu_data                    \n");       
			sql.append("				  ) D  on  D.sgis_census_year= A.sgis_census_req_year and D.sgis_census_sigungu= A.sgis_census_req_sigungu                  \n");

		/*******************************/
		/* 센서스 개인 신청 상세정보3 (관리자)*/
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_ST_ED_YEAR")) {
			sql.append(" select sgis_census_req_year 		\n");
			sql.append("			, to_char(sgis_census_req_y_s_d, 'yyyy-mm-dd') sgis_census_req_y_s_d 		\n");
			sql.append("			, to_char(sgis_census_req_y_e_d, 'yyyy-mm-dd') sgis_census_req_y_e_d 		\n");
			sql.append("			, sgis_census_req_y_use_che			\n");
			sql.append("		from sgis_census_req_year_code			\n");
			sql.append("	where sgis_census_req_id = :sgis_census_req_id 		\n");
			sql.append("	order by sgis_census_req_year desc		\n");
			
		/*******************************/
		/* 센서스 개인 신청 리스트별 시작, 종료일 GROUP 20100218  이태경 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_ST_ED_YEAR_GROUP")) {
			sql.append(" select A.*, B.sgis_census_detail_data_nm \n");
			sql.append(" from (  \n");
			sql.append(" select sgis_census_req_year 		\n");
			sql.append("			, a.sgis_census_id			\n");
			sql.append("			, a.sgis_census_data_id			\n");
			sql.append("			, to_char(sgis_census_req_y_s_d, 'yyyy-mm-dd') sgis_census_req_y_s_d 		\n");
			sql.append("			, to_char(sgis_census_req_y_e_d, 'yyyy-mm-dd') sgis_census_req_y_e_d 		\n");
			sql.append("			, sgis_census_req_y_use_che			\n");
			sql.append("			, b.sgis_census_code_name			\n");
			sql.append("			,  c.sgis_census_name			\n");
			
			//sql.append("			, a.sgis_census_req_sido, decode(a.sgis_census_req_sido, '00', '전국', (Select top 1 sido_nm from srv_bnd_sido_pg_hst where base_year= a.sgis_census_req_year and sido_cd=a.sgis_census_req_sido ) ) sido_nm		\n");
			//sql.append("			, a.sgis_census_req_sigungu, decode(a.sgis_census_req_sigungu, '00000', '전체',  (Select top 1 sigungu_nm from srv_bnd_sigungu_pg_hst where base_year= a.sgis_census_req_year and sigungu_cd = a.sgis_census_req_sigungu )) sigungu_nm		\n");
			sql.append("			, a.sgis_census_req_sido, decode(a.sgis_census_req_sido, '00', '전국', (Select top 1 sido_nm from sgis_census_sigungu_data where sgis_census_year= a.sgis_census_req_year and sgis_census_sido=a.sgis_census_req_sido ) ) sido_nm		\n");
			sql.append("			, a.sgis_census_req_sigungu, decode(a.sgis_census_req_sigungu, '00000', '전체',  (Select top 1 sigungu_nm from sgis_census_sigungu_data where sgis_census_year= a.sgis_census_req_year and sgis_census_sigungu = a.sgis_census_req_sigungu )) sigungu_nm		\n");
			sql.append("			, a.sgis_census_detail_data_id		\n");

			// 2018. 01. 04 mng_s
			sql.append("		    , a.detail_data_seq 	\n");
			// 2018. 01. 04 mng_e
			
			sql.append("		from sgis_census_req_year_code a,  sgis_census_code b,  sgis_census_data c 			\n");
			sql.append("	where a.sgis_census_id = b.sgis_census_id	\n");
			sql.append("	  and a.sgis_census_data_id = c.sgis_census_data_id 		\n");
			sql.append("	  and a.sgis_census_id = c.sgis_census_id 		\n");
			sql.append("	  and sgis_census_req_id = :sgis_census_req_id 		\n");
			sql.append("	order by sgis_census_req_year desc		\n");	
			sql.append(" ) A \n");
			sql.append(" left outer join \n");
			sql.append(" (select * from sgis_census_detail_data_code \n");
			sql.append(" ) B \n");
			sql.append(" on A.sgis_census_detail_data_id = B.sgis_census_detail_data_id		\n");


		/*******************************/
		/* 센서스 자료 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_DATA_INFO")) {
			sql.append(" select  a.sgis_census_name ");
			sql.append("			, b.sgis_census_code_name sgis_census_id_name		");
			sql.append("	        , sgis_census_public_format ");
			sql.append("	        , sgis_census_public_yn ");
			sql.append("	        , sgis_census_location ");
			sql.append("	        , sgis_census_price ");
			sql.append("	    from sgis_census_data a, sgis_census_code b ");
			sql.append("	where a.sgis_census_id = :selected_sgis_census_id ");
			sql.append("			    and a.sgis_census_data_id = :selected_sgis_census_data_id	");
			sql.append("				and a.sgis_census_id = b.sgis_census_id");
		
		/*******************************/
		/* 시군구 데이터 년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("SIGUNGU_DATA_YEAR")) {
			sql.append(" select distinct sgis_census_year 			\n");
			sql.append("		 from sgis_census_sigungu_data		\n");
			sql.append("		order by sgis_census_year desc		\n");
			
		/*******************************/
		/* 센서스경계자료제공 데이터 카운트 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_COUNT_DATA")) {
			sql.append(" select count(*) count_data 			\n");
			sql.append("	from sgis_census_sigungu_data		\n");
			sql.append("	where sgis_census_id = :sgis_census_id		\n");
			sql.append("	and sgis_census_data_id = :sgis_census_data_id		\n");
			sql.append("	and sgis_census_year = :sgis_census_year		\n");
			
		/*******************************/
		/* 센서스경계자료제공 데이터 카운트 년도 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("SIGUNGU_DETAIL_DATA_YEAR")) {
			sql.append(" select distinct sgis_census_year 			\n");
			sql.append("		 from sgis_census_sigungu_data		\n");
			sql.append("	where sgis_census_id = :sgis_census_id		\n");
			sql.append("	and sgis_census_data_id = :sgis_census_data_id		\n");
			sql.append("		order by sgis_census_year desc		\n");
				
		/*******************************/
		/* 센서스경계자료제공 데이터 상세 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("SIGUNGU_DETAIL_DATA_RESULT")) {
			sql.append(" select sgis_census_year, sgis_census_meaning, sgis_census_file 			\n");
			sql.append("	from sgis_census_sigungu_data		\n");
			sql.append("	where sgis_census_id = :sgis_census_id		\n");
			sql.append("	and sgis_census_data_id = :sgis_census_data_id		\n");
			sql.append("	and sgis_census_year = :sgis_census_year		\n");
			sql.append("	and sgis_census_meaning like '%' || :search_word	|| '%'	\n");
			
		/*******************************/
		/* 센서스경계자료제공 데이터 상세 */
		/*******************************/
		} else if(lData.getString("PARAM").equals("CENSUS_REQ_EXCEL")) {
			//sql.append("	select req_id, dt , nm 제공기관, a1 || ' ' || a2 || ' ' || a3 as gbn , su_t 건수, s1 통계자료, s2 통계지역경계, s3 센서스지도, mok 요청목적,												\n");
			
			
			//sql.append("	select '0'  req_id,  '2015-07-22' dt, '네이버 테스트'    nm        , '[통계지역경계]' gbn , '1'      su_t   , '0'   s1   ,'1'       s2     , '0'     s3    , '002001' mok ,          '1' b1 , '0' b2, '0' b3, '네이버 테스트' goal, '001002'   sosok        from dual												\n");
			
			
			sql.append("	select ''||req_id  req_id, ''||dt dt, ''||nm 	nm	  , a1 || ' ' || a2 || ' ' || a3 as gbn , ''||su_t 	su_t   , ''||s1    s1   , ''||s2      s2     , ''||s3      s3    , mok ,												\n");
			sql.append("	  ''||decode(mok, '002001', su_t, 0) as b1 , ''||decode(mok, '002002', su_t, 0) as b2, ''||decode(mok, '002003', su_t, 0) as b3, goal, sosok                                                	\n");
			sql.append("	from (                                                                                                                                                                          	\n");
			sql.append("	    select req_id, dt, nm, case when s1 > 0 then '[통계자료]' else '' end a1,                                                                                                     		\n");
			sql.append("	    case when s2 > 0 then '[통계지역경계]' else '' end a2,                                                                                                                        		\n");
			sql.append("	    case when s3 > 0 then '[센서스지도]' else '' end a3, su_t, s1, s2, s3, mok, goal, sosok                                                                                       		\n");
			sql.append("	    from (                                                                                                                                                                      	\n");
			
			//sql.append("	        select sgis_census_req_id as req_id, max(create_date) as dt, max(sgis_census_req_company) as nm, sum(cnt1+cnt2+cnt3) as su_t,                              	\n");
			//sql.append("	             sum(cnt1) as s1,sum(cnt2) as s2,sum(cnt3) as s3, max(sgis_census_req_mokjuk) as mok, max(sgis_census_req_goal) as goal, max(sgis_census_req_sosok) as sosok        	\n");
			sql.append("	        select sgis_census_req_id as req_id, max(create_date) as dt, max(sgis_census_req_company) as nm,  ((case when sum(cnt1) > 0 then '1' else '0' end) + (case when sum(cnt2) > 0 then '1' else '0' end) + (case when sum(cnt3) > 0 then '1' else '0' end) ) as su_t,                       \n");        
			sql.append("                 case when sum(cnt1) > 0 then '1' else '0' end as s1,  case when sum(cnt2) > 0 then '1' else '0' end as s2,  case when sum(cnt3) > 0 then '1' else '0' end as s3, max(sgis_census_req_mokjuk) as mok, max(sgis_census_req_goal) as goal, max(sgis_census_req_sosok) as sosok        \n");
			
			sql.append("	        from (                                                                                                                                                                  	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, sgis_census_id as c1, '' as c2, '' as c3, 1 as cnt1, 0 as cnt2, 0 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			//sql.append("	            where sgis_census_req_app_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='1' and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	                union all                                                                                                                                                       	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, sgis_census_id as c2, '' as c3, 0 as cnt1, 1 as cnt2, 0 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			//sql.append("	            where sgis_census_req_app_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='2'  and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	                union all                                                                                                                                                       	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, '' as c2, sgis_census_id as c3, 0 as cnt1, 0 as cnt2, 1 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='3'  and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	        )                                                                                                                                                                       	\n");
			sql.append("	        group by sgis_census_req_id                                                                                                                                             	\n");
			sql.append("	    )                                                                                                                                                                           	\n");
			sql.append("	)                                                                                                                                                                               	\n");
			
			/*******************************/
			/* 센서스경계자료제공 데이터 상세 20220706 수정 김흥교 */
			/*******************************/
		}else if(lData.getString("PARAM").equals("CENSUS_REQ_EXCEL2")) {
			sql.append("	select    to_char(req_id) as req_id                                                                                                                                                            \n");
			sql.append("	        , to_char(dt) as dt                                                                                                                                                                    \n");
			sql.append("	        , to_char(nm) as nm	                                                                                                                                                                   \n");
			sql.append("	        , a1 || '' || a2 || '' || a3|| '' || a4|| '' || a5 as gbn                                                                                                                              \n");
			sql.append("	        , to_char(su_t) as su_t                                                                                                                                                                \n");
			sql.append("	        , to_char(s1) as s1                                                                                                                                                                    \n");
			sql.append("	        , to_char(s2) as s2                                                                                                                                                                    \n");
			sql.append("	        , to_char(s3) as s3                                                                                                                                                                    \n");
			sql.append("	        , to_char(s4) as s4                                                                                                                                                                    \n");
			sql.append("	        , to_char(s5) as s5                                                                                                                                                                    \n");
			sql.append("	        , mok                                                                                                                                                                                  \n");
			sql.append("	        , to_char(decode(mok, '002001', su_t, 0)) as b1                                                                                                                                        \n");
			sql.append("	        , to_char(decode(mok, '002002', su_t, 0)) as b2                                                                                                                                        \n");
			sql.append("	        , to_char(decode(mok, '002003', su_t, 0)) as b3                                                                                                                                        \n");
			sql.append("	        , goal                                                                                                                                                                                 \n");
			sql.append("	        , sosok                                                	                                                                                                                               \n");
			sql.append("	from (                                                                                                                                                                          	           \n");
			sql.append("	    	select   req_id                                                                                                                                                                        \n");
			sql.append("	    	       , dt                                                                                                                                                                            \n");
			sql.append("	    	       , nm                                                                                                                                                                            \n");
			sql.append("	    	       , case when s1 > 0 then '[통계자료]' else '' end a1                                                                                                                             \n");
			sql.append("	    	       , case when s2 > 0 then '[통계지역경계]' else '' end a2                                                                                                                         \n");
			sql.append("	    	       , case when s3 > 0 then '[세종시특별센서스]' else '' end a3                                                                                                                     \n");
			sql.append("	    	       , case when s4 > 0 then '[격자통계자료]' else '' end a4                                                                                                                         \n");
			sql.append("	    	       , case when s5 > 0 then '[격자경계]' else '' end a5                                                                                                                             \n");
			sql.append("	               , su_t                                                                                                                                                                          \n");
			sql.append("	               , s1                                                                                                                                                                            \n");
			sql.append("	               , s2                                                                                                                                                                            \n");
			sql.append("	               , s3                                                                                                                                                                            \n");
			sql.append("	               , s4                                                                                                                                                                            \n");
			sql.append("	               , s5                                                                                                                                                                            \n");
			sql.append("	               , mok                                                                                                                                                                           \n");
			sql.append("	               , goal                                                                                                                                                                          \n");
			sql.append("	               , sosok                                                                                       		                                                                           \n");
			sql.append("	    from (                                                                                                                                                                      	           \n");
			sql.append("	        select   sgis_census_req_id as req_id                                                                                                                                                  \n");
			sql.append("	               , max(create_date) as dt                                                                                                                                                        \n");
			sql.append("	               , max(sgis_census_req_company) as nm                                                                                                                                            \n");
			sql.append("	               , ((case when sum(cnt1) > 0 then '1' else '0' end) + (case when sum(cnt2) > 0 then '1' else '0' end) + (case when sum(cnt3) > 0 then '1' else '0' end) ) as su_t                \n");
			sql.append("	               , case when sum(cnt1) > 0 then '1' else '0' end as s1                                                                                                                           \n");
			sql.append("	               , case when sum(cnt2) > 0 then '1' else '0' end as s2                                                                                                                           \n");
			sql.append("	               , case when sum(cnt3) > 0 then '1' else '0' end as s3                                                                                                                           \n");
			sql.append("	               , case when sum(cnt4) > 0 then '1' else '0' end as s4                                                                                                                           \n");
			sql.append("	               , case when sum(cnt5) > 0 then '1' else '0' end as s5                                                                                                                           \n");
			sql.append("	               , max(sgis_census_req_mokjuk) as mok, max(sgis_census_req_goal) as goal                                                                                                         \n");
			sql.append("	               , max(sgis_census_req_sosok) as sosok                                                                                                                                           \n");
			sql.append("	        from (                                                                                                                                                                  	           \n");
			sql.append("		            select   sgis_census_req_id, create_date, sgis_census_req_company, sgis_census_id as c1, '' as c2, '' as c3, 1 as cnt1, 0 as cnt2, 0 as cnt3, 0 as cnt4, 0 as cnt5             \n");	
			sql.append("		                   , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	       \n");
			sql.append("		            from sgis_census_req                                                                                                                                                	       \n");
			sql.append("		            where create_date like :what_year || '%'                                                                                                	                                   \n");
			sql.append("		            and sgis_census_id='1' and sgis_census_req_status='A'                                                                                                                          \n");                   	
			sql.append("		            union all                                                                                                                                                       	           \n");
			sql.append("		            select   sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, sgis_census_id as c2, '' as c3, 0 as cnt1, 1 as cnt2, 0 as cnt3, 0 as cnt4, 0 as cnt5             \n");	
			sql.append("		                   , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	       \n");
			sql.append("		            from sgis_census_req                                                                                                                                                	       \n");
			sql.append("		            where create_date like :what_year || '%'                                                                                                	                                   \n");
			sql.append("		            and sgis_census_id='2'  and sgis_census_req_status='A'                                                                                                                         \n");                    	
			sql.append("		            union all                                                                                                                                                       	           \n");
			sql.append("		            select   sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, '' as c2, sgis_census_id as c3, 0 as cnt1, 0 as cnt2, 1 as cnt3, 0 as cnt4, 0 as cnt5             \n");	
			sql.append("		                   , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	       \n");
			sql.append("		            from sgis_census_req                                                                                                                                                	       \n");
			sql.append("		            where create_date like :what_year || '%'                                                                                                	                                   \n");
			sql.append("		            and sgis_census_id='4'  and sgis_census_req_status='A'                                                                                                                         \n");
			sql.append("		            union all                                                                                                                                                       	           \n");
			sql.append("		            select   sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, '' as c2, sgis_census_id as c3, 0 as cnt1, 0 as cnt2, 0 as cnt3, 1 as cnt4, 0 as cnt5             \n");	
			sql.append("		                   , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	       \n");
			sql.append("		            from sgis_census_req                                                                                                                                                	       \n");
			sql.append("		            where create_date like :what_year || '%'                                                                                                	                                   \n");
			sql.append("		            and sgis_census_id='7'  and sgis_census_req_status='A'                                                                                                                         \n");
			sql.append("		            union all                                                                                                                                                       	           \n");
			sql.append("		            select  sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, '' as c2, sgis_census_id as c3, 0 as cnt1, 0 as cnt2, 0 as cnt3, 0 as cnt4, 1 as cnt5              \n");
			sql.append("		                  , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	       \n");
			sql.append("		            from sgis_census_req                                                                                                                                                	       \n");
			sql.append("		            where create_date like :what_year || '%'                                                                                                	                                   \n");
			sql.append("		            and sgis_census_id='8'  and sgis_census_req_status='A'                                                                                                                         \n");
			sql.append("	        	)                                                                                                                                                                       	       \n");
			sql.append("	        group by sgis_census_req_id                                                                                                                                             	           \n");
			sql.append("	    )                                                                                                                                                                           	           \n");
			sql.append("	)                                                                                                                                                                               	           \n");
			
			
		} else if(lData.getString("PARAM").equals("CENSUS_REQ_ANALYSIS")) {
			sql.append(" select  					 								     \n");
			sql.append(" 	''||sum(NVL(cnt01,0)) as Sum01, 							     \n");
			sql.append(" 	''||sum(NVL(cnt02,0)) as Sum02, 							     \n");
			sql.append(" 	''||sum(NVL(cnt03,0)) as Sum03, 							     \n");
			sql.append(" 	''||sum(NVL(cnt04,0)) as Sum04, 							     \n");
			sql.append(" 	''||sum(NVL(cnt05,0)) as Sum05, 							     \n");
			sql.append(" 	''||sum(NVL(cnt06,0)) as Sum06, 							     \n");
			sql.append(" 	''||sum(NVL(cnt07,0)) as Sum07, 							     \n");
			sql.append(" 	''||sum(NVL(cnt08,0)) as Sum08, 							     \n");
			sql.append(" 	''||sum(NVL(cnt09,0)) as Sum09, 							     \n");
			sql.append(" 	''||sum(NVL(cnt10,0)) as Sum10, 							     \n");
			sql.append(" 	''||sum(NVL(cnt11,0)) as Sum11, 							     \n");
			sql.append(" 	''||sum(NVL(cnt12,0)) as Sum12  							     \n");
			sql.append(" from ( 														 \n");
			sql.append("     select dt, sosok,					 					     \n");
			sql.append("        case when dt == '01' then sum(NVL(su_t,0)) else 0 end cnt01,  \n");
			sql.append("        case when dt == '02' then sum(NVL(su_t,0)) else 0 end cnt02,  \n");
			sql.append("        case when dt == '03' then sum(NVL(su_t,0)) else 0 end cnt03,  \n");
			sql.append("        case when dt == '04' then sum(NVL(su_t,0)) else 0 end cnt04,  \n");
			sql.append("        case when dt == '05' then sum(NVL(su_t,0)) else 0 end cnt05,  \n");
			sql.append("        case when dt == '06' then sum(NVL(su_t,0)) else 0 end cnt06,  \n");
			sql.append("        case when dt == '07' then sum(NVL(su_t,0)) else 0 end cnt07,  \n");
			sql.append("        case when dt == '08' then sum(NVL(su_t,0)) else 0 end cnt08,  \n");
			sql.append("        case when dt == '09' then sum(NVL(su_t,0)) else 0 end cnt09,  \n");
			sql.append("        case when dt == '10' then sum(NVL(su_t,0)) else 0 end cnt10,  \n");
			sql.append("        case when dt == '11' then sum(NVL(su_t,0)) else 0 end cnt11,  \n");
			sql.append("        case when dt == '12' then sum(NVL(su_t,0)) else 0 end cnt12   \n");
			sql.append("	 from ( 													 \n");
			sql.append("	        select sgis_census_req_id, substr(max(create_date),6,2) as dt, max(sgis_census_req_sosok) as sosok ,                       \n");        
			sql.append("                 ((case when sum(cnt1) > 0 then '1' else '0' end) + (case when sum(cnt2) > 0 then '1' else '0' end) + (case when sum(cnt3) > 0 then '1' else '0' end) ) as su_t         \n");
			sql.append("	        from (                                                                                                                                                                  	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, sgis_census_id as c1, '' as c2, '' as c3, 1 as cnt1, 0 as cnt2, 0 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='1' and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	                union all                                                                                                                                                       	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, sgis_census_id as c2, '' as c3, 0 as cnt1, 1 as cnt2, 0 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='2'  and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	                union all                                                                                                                                                       	\n");
			sql.append("	            select sgis_census_req_id, create_date, sgis_census_req_company, '' as c1, '' as c2, sgis_census_id as c3, 0 as cnt1, 0 as cnt2, 1 as cnt3             	\n");
			sql.append("	                , sgis_census_req_mokjuk, sgis_census_req_goal, sgis_census_req_sosok                                                                                           	\n");
			sql.append("	            from sgis_census_req                                                                                                                                                	\n");
			sql.append("	            where create_date like :what_year || '%'                                                                                                	\n");
			sql.append("	            and sgis_census_id='3'  and sgis_census_req_status='A'                                                                                                                                             	\n");
			sql.append("	        	)                                                                                                                                                                      	\n");
			sql.append("	        group by sgis_census_req_id                                                                                                                                             	\n");
			sql.append("	    )					                                                                                                                                                            \n");
			sql.append("	group by sosok, dt                                                                                                                                                            		\n");
			sql.append("	)                                                                                                                                                                               	\n");
			sql.append(" group by sosok 				 \n");
			
		}
		
		return sql.toString();
    }

    //insert
    public int insert(LData lData) throws Exception {

    	StringBuffer isql = new StringBuffer(1024);
    	StringBuffer sql = new StringBuffer(1024);
    	RecordModel rm = null;

    	try {

    		/*******************************/
    		/* 센서스 신청 등록 */
    		/*******************************/
    		if(lData.getString("PARAM").equals("CENSUS_APPLY")) {

    			isql.append("	insert into sgis_census_req		\n");
    			isql.append("				( 	\n");
    			isql.append("				    sgis_census_req_id 		\n");
    			isql.append("					, sgis_census_data_id			\n");
    			isql.append("					, sgis_census_id			\n");
    			isql.append("				    , sgis_member_key 		\n");
    			isql.append("				    , sgis_census_req_status 		\n");
    			isql.append("				    , sgis_census_req_company 		\n");
    			isql.append("				    , sgis_census_req_tel 		\n");
    			isql.append("				    , sgis_census_req_goal 		\n");
    			isql.append("				    , sgis_census_req_file 		\n");
    			isql.append("				    , create_user 		\n");
    			isql.append("				    , create_date 		\n");
    			isql.append("				    , last_update_user 		\n");
    			isql.append("				    , last_update_date 		\n");
    			
    			isql.append("				    , sgis_census_req_sosok 		\n");
    			isql.append("				    , sgis_census_req_mokjuk 		\n");
    			isql.append("				    , sgis_census_req_kwaje 		\n");
    			isql.append("				    , sgis_census_req_email 		\n");
    			
    			// 2018. 01. 04 mng_s
    			isql.append("				    , detail_data_seq 		\n");
    			// 2018. 01. 04 mng_e
    			
    			//isql.append("				    , sgis_census_req_reject 		\n");
    			isql.append("				) 		\n");
    			isql.append("				values 		\n");
    			isql.append("				( 		\n");
    			isql.append("					:sgis_census_req_id		\n");
    			isql.append("					, :sgis_census_data_id 		\n");
    			isql.append("					, :sgis_census_id 		\n");
    			isql.append("					, :sc_userkey				\n");
    			isql.append("					, 'S'			\n");							//S : 신청, A : 승인, B : 반려
    			isql.append("					, :sgis_census_req_company		\n");
    			isql.append("					, :sgis_census_req_tel				\n");
    			isql.append("					, :sgis_census_req_goal			\n");
    			isql.append("					, :fileName				\n");
    			isql.append("					, :sc_userkey	 		\n");
    			isql.append("					, sysdate		\n");
    			isql.append("					, :sc_userkey			\n");
    			isql.append("					, sysdate 		\n");
    			
    			isql.append("				    , :sgis_census_req_sosok 		\n");
    			isql.append("				    , :sgis_census_req_mokjuk 		\n");
    			isql.append("				    , :sgis_census_req_kwaje 		\n");
    			isql.append("				    , :sgis_census_req_email 		\n");
    			
    			// 2018. 01. 04 mng_s
    			isql.append("				    , :detail_data_seq 		\n");
    			// 2018. 01. 04 mng_e
    			
    			//isql.append("					, :sgis_census_req_reject			\n");
    			isql.append("				)		\n");

    			dbmgr.prepareStatement(isql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

			/*******************************/
    		/* 센서스 신청 년도 등록 */
    		/*******************************/
    		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_YEAR")) {

    			isql.append(" insert into sgis_census_req_year_code		\n");
    			isql.append("	( 	\n");
    			isql.append("		sgis_census_req_year			\n");
    			isql.append("		, sgis_census_id			\n");
    			isql.append("		, sgis_census_data_id			\n");
    			isql.append("		, sgis_census_req_id			\n");
    			isql.append("		, sgis_census_req_y_use_che		\n");
    			isql.append("		, sgis_census_req_sido		\n");
    			isql.append("		, sgis_census_req_sigungu		\n");
    			
    			// 2018. 01. 04 mng_s
    			isql.append("		, detail_data_seq 		\n");
    			// 2018. 01. 04 mng_e
    			
    			isql.append("	) 		\n");
    			isql.append("	values 		\n");
    			isql.append("	( 		\n");
    			isql.append("		:years		\n");
    			isql.append("		, :sgis_census_id 		\n");
    			isql.append("		, :sgis_census_data_id	 \n");
    			isql.append("		, :sgis_census_req_id 		\n");
    			isql.append("		, :inUse 		\n");
    			isql.append("		, :sido 		\n");
    			isql.append("		, :sigungu 		\n");
    			
    			// 2018. 01. 04 mng_s
    			isql.append("		, :detail_data_seq 		\n");
    			// 2018. 01. 04 mng_e
    			
    			isql.append("	)		\n");

    			dbmgr.prepareStatement(isql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    			
    		
			/*******************************/
    		/* 최신자료갱신 */
    		/*******************************/
    		} else if(lData.getString("PARAM").equals("RELOAD_DATA")) {

    			isql.append(" insert into sgis_census_year_code ( sgis_census_id, sgis_census_data_id, sgis_census_year, sgis_census_file )			\n");
    			isql.append(" (																									\n");
    			isql.append("			select distinct sgis_census_id, sgis_census_data_id, sgis_census_year,''              	\n");
    			isql.append("			from sgis_census_sigungu_data                                                         	\n");
    			isql.append("			group by sgis_census_id, sgis_census_data_id, sgis_census_year                        	\n");
    			isql.append("			having (sgis_census_id || sgis_census_data_id || sgis_census_year)                    	\n");
    			isql.append("			not in (                                                                              	\n");
    			isql.append("			    select sgis_census_id || sgis_census_data_id || sgis_census_year from             	\n");
    			isql.append("			    (                                                                                 	\n");
    			isql.append("			        select  sgis_census_id, sgis_census_data_id, sgis_census_year, count(*) as cnt	\n");
    			isql.append("			        from sgis_census_year_code                                                    	\n");
    			isql.append("			        group by sgis_census_id, sgis_census_data_id, sgis_census_year                	\n");
    			isql.append("			    )                                                                                 	\n");
    			isql.append("			)                                                                                     	\n");
    			isql.append(" )																									\n");

    			dbmgr.prepareStatement(isql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

    			
			/*******************************/
    		/* 센서스 신청 년도 및 시작, 종료일자 등록 */
    		/*******************************/
    		} else if(lData.getString("PARAM").equals("CENSUS_APPLY_ST_ED_YEAR")) {

    			String[] sgis_census_req_year = lData.getString("sgis_census_req_year").split(",");
    			String[] sgis_census_id = lData.getString("sgis_census_id").split(",");
    			String[] sgis_census_data_id = lData.getString("sgis_census_data_id").split(",");
    			String[] inUse = lData.getString("inUse").split(",");
    			String[] sgis_census_req_y_s_d = lData.getString("sgis_census_req_y_s_d").split(",");
    			String[] sgis_census_req_y_e_d = lData.getString("sgis_census_req_y_e_d").split(",");
    			
    			String[] sgis_census_sido_id = lData.getString("sgis_census_sido_id").split(",");
    			String[] sgis_census_sigungu_id = lData.getString("sgis_census_sigungu_id").split(",");
    			String[] sgis_census_detail_data_id = lData.getString("sgis_census_detail_data_id").split(",");
    			
    			//년도 및 게시일자 처리
				for(int i=0; i < sgis_census_req_year.length; i++) {

					isql.delete(0, isql.length());

					isql.append(" insert into sgis_census_req_year_code 	\n");
					isql.append("	( 				\n");
					isql.append("		sgis_census_req_year			\n");
					isql.append("		, sgis_census_req_id 		\n");
					isql.append("		, sgis_census_id 		\n");
					isql.append("		, sgis_census_data_id 		\n");
					isql.append("		, sgis_census_req_y_s_d 		\n");
					isql.append("		, sgis_census_req_y_e_d 		\n");

					if(lData.getString("approve_status").equals("A")) {	//승인일경우 승인일자
						isql.append("	, sgis_census_app_date 		\n");
					}
					isql.append("		, sgis_census_req_y_use_che 		\n");
					
					isql.append("		, sgis_census_req_sido 		\n");
					isql.append("		, sgis_census_req_sigungu 		\n");
					isql.append("		, sgis_census_detail_data_id 		\n");
					
					// 2018. 01. 04 mng_s
	    			isql.append("		, detail_data_seq 		\n");
	    			// 2018. 01. 04 mng_e
					
					isql.append("	) 		\n");
					isql.append("	values 		\n");
					isql.append("	( 	\n");
					isql.append("	'"+sgis_census_req_year[i]+"' 		\n");
					isql.append("		, :sgis_census_req_id 		\n");
					isql.append("		, '"+sgis_census_id[i]+"' 		\n");
					isql.append("		, '"+sgis_census_data_id[i]+"' 		\n");
					isql.append("		, '"+sgis_census_req_y_s_d[i]+"' 		\n");
					isql.append("		, '"+sgis_census_req_y_e_d[i]+"' 		\n");

					if(lData.getString("approve_status").equals("A")) {	//승인일경우 승인일자
						isql.append("	, sysdate 		\n");
					}
					isql.append("	, '"+inUse[i]+"' 	\n");
					
					isql.append("	, '"+sgis_census_sido_id[i]+"' 	\n");
					isql.append("	, '"+sgis_census_sigungu_id[i]+"' 	\n");
					
					// 2018. 01. 24 mng_s
					if(sgis_census_detail_data_id.length < (i + 1)) {
						isql.append("	, '' 	\n");
					} else {
						isql.append("	, '"+sgis_census_detail_data_id[i]+"' 	\n");
					}
					// 2018. 01. 24 mng_e
					
					// 2018. 01. 04 mng_s
					isql.append("	, '"+i+"'	\n");
	    			// 2018. 01. 04 mng_e
					
					isql.append("	) 	\n");

					dbmgr.prepareStatement(isql.toString(), lData);
	    			resultFlag = dbmgr.executeUpdate();
				}
    		}

    		
    		

    		
    	} catch(Exception e) {
    	}
    	return resultFlag;
    }

    //update
    public int update(LData lData) throws Exception {

    	StringBuffer usql = new StringBuffer(1024);
    	StringBuffer sql = new StringBuffer(1024);
    	RecordModel rm = null;

    	try {

    		/*******************************/
    		/* 센서스 신청 수정 */
    		/*******************************/
	    	if(lData.getString("PARAM").equals("CENSUS_EDIT")) {
	    		usql.append(" update sgis_census_req set 	\n");
	    		usql.append("			sgis_census_req_company = :sgis_census_req_company 	\n");
	    		usql.append("		, sgis_census_req_tel = :sgis_census_req_tel 		\n");
	    		usql.append("		, sgis_census_req_goal = :sgis_census_req_goal 		\n");
	    		usql.append("		, last_update_user = :sc_userkey 		\n");
	    		usql.append("		, last_update_date = sysdate 		\n");
	    		usql.append("		, sgis_census_req_reject = :sgis_census_req_reject 		\n");

				if(!StringUtil.isEmpty(lData.getString("fileName"))) {
					usql.append("		, sgis_census_req_file = :fileName 	\n");
				}

				usql.append("		where sgis_census_req_id = :sgis_census_req_id			\n");

    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

    		/*******************************/
    		/* 센서스 신청 승인, 반려 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_CENSUS_APPLY_STATUS")) {
	    		usql.append(" update sgis_census_req 	\n");
	    		usql.append("			set sgis_census_req_status = :approve_status		\n");

				//if(lData.getString("approve_status").equals("B")) {
					usql.append("			, sgis_census_req_reject = :refuse		\n");
				//}
				usql.append("				, sgis_census_req_app_date = sysdate		\n");
				usql.append("		where sgis_census_req_id  = :sgis_census_req_id	\n");

    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    			
			/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_CENSUS_APPLY_STATUS_DATE")) {
	    		usql.append(" update sgis_census_req_year_code 	\n");
	    		usql.append(" set \n");
	    		usql.append(" sgis_census_app_date=sysdate \n");
	    		usql.append(" ,sgis_census_req_y_s_d=sysdate \n");
	    		usql.append(" ,sgis_census_req_y_e_d=sysdate+7 \n");
	    		usql.append(" where sgis_census_req_id = :sgis_census_req_id \n");
    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    		/* 센서스 신청 과장님 결재 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_CENSUS_APPLY_APPROVAL")) {
	    		usql.append(" update sgis_census_req 	\n");
	    		usql.append("			set sgis_census_req_gyulje = 'A'		\n");
	    		usql.append("		where sgis_census_req_id  = :sgis_census_req_id	\n");

    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

			/*******************************/
    		/* 센서스 신청 과장님 결재 취소 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_CENSUS_APPLY_APPROVAL_CANCEL")) {
	    		usql.append(" update sgis_census_req 	\n");
	    		usql.append("			set sgis_census_req_gyulje = ''		\n");
	    		usql.append("		where sgis_census_req_id  = :sgis_census_req_id	\n");

    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    			
    		/*******************************/
    		/* 센서스 승인 게시, 종료일자 수정 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_ST_ED")) {

	    		String[] list_sgis_census_req_y_s_d = lData.getString("r_sgis_census_req_y_s_d").split(",");
	    		String[] list_sgis_census_req_y_e_d = lData.getString("r_sgis_census_req_y_e_d").split(",");
	    		String[] list_sgis_census_id = lData.getString("r_sgis_census_id").split(",");
	    		String[] list_sgis_census_data_id = lData.getString("r_sgis_census_data_id").split(",");
	    		String[] list_sgis_census_req_id = lData.getString("r_sgis_census_req_id").split(",");
	    		String[] list_sgis_census_req_year = lData.getString("r_sgis_census_req_year").split(",");
	    		String[] list_inUse = lData.getString("inUse").split(",");

				for(int i=0; i < list_sgis_census_req_id.length; i++) {

					if(list_inUse[i].equals("Y")) {	//체크된 것만 수정
						usql.append("		update sgis_census_req_year_code	set	\n");
						usql.append("					sgis_census_req_y_s_d = to_date('"+list_sgis_census_req_y_s_d[i]+"'	)	\n");
						usql.append("					, sgis_census_req_y_e_d = to_date('"+list_sgis_census_req_y_e_d[i]+"')	\n");
						usql.append("		where sgis_census_req_id	 = '"+list_sgis_census_req_id[i]+"'		\n");
						usql.append("						and sgis_census_id = '"+list_sgis_census_id[i]+"' 		\n");
						usql.append("						and sgis_census_data_id = '"+list_sgis_census_data_id[i]+"' 	\n");
						usql.append("						and sgis_census_req_year = '"+ list_sgis_census_req_year[i]+"'	 	\n");

			  			dbmgr.prepareStatement(usql.toString(), lData);
		    			resultFlag = dbmgr.executeUpdate();
					}
				}
	    	
			/*******************************/
    		/* 센서스 자료신청 전화번호 회원정보에 반영 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("UPDATE_MEMBER_INFO_TEL")) {
	    		usql.append(" update sgis_member_info 								\n");
	    		//usql.append("		set sgis_mobile_phone = AESEncrypt(:sgis_mobile_phone , 'sgis')		\n");
	    		usql.append("		set sgis_telephone = AESEncrypt(:sgis_telephone , 'sgis')		\n");
				usql.append("	where sgis_member_id  = :sgis_member_id				\n");
				
    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    			
			/*******************************/
    		/* 센서스 자료신청 결재 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("APPROVAL_DATA")) {
	    		usql.append(" update sgis_census_req 										\n");
	    		usql.append("		set sgis_census_req_gyulje = 'A'						\n");
				usql.append("	where sgis_census_req_id  = :sgis_census_req_id				\n");
				
    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    		
    			
			/*******************************/
    		/* 센서스 자료신청 결재취소 처리 */
    		/*******************************/
	    	} else if(lData.getString("PARAM").equals("APPROVAL_CANCEL_DATA")) {
	    		usql.append(" update sgis_census_req 										\n");
	    		usql.append("		set sgis_census_req_gyulje = ''						\n"); //sgis_census_req_gyulje ==> A:결재, '':결재취소
				usql.append("	where sgis_census_req_id  = :sgis_census_req_id				\n");
				
    			dbmgr.prepareStatement(usql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();
    		
	    	}

    	} catch(Exception e) {
    	}

    	return resultFlag;
    }

    //remove
    public int delete(LData lData) throws Exception {

    	StringBuffer sql = new StringBuffer(1024);
    	RecordModel rm = null;

    	try {

    		/*******************************/
    		/* 센서스 등록 년도 삭제 */
    		/*******************************/
    		if(lData.getString("PARAM").equals("REMOVE_CENSUS_REQ_YEAR_CODE")) {
    			sql.append("delete from sgis_census_req_year_code			\n");
    			sql.append("  where sgis_census_id = :sgis_census_id 		\n");
    			sql.append("			and sgis_census_data_id = :sgis_census_data_id 		\n");
    			sql.append("			and sgis_census_req_id = :sgis_census_req_id 		\n");

    			dbmgr.prepareStatement(sql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

    		/*******************************/
    		/* 센서스 등록 년도 삭제 */
    		/*******************************/
    		} else if(lData.getString("PARAM").equals("REMOVE_CENSUS_REQ_YEAR_CODE2")) {
    			sql.append(" delete from sgis_census_req_year_code 	\n");
    			sql.append("	where sgis_census_req_id  = :sgis_census_req_id	\n");

    			dbmgr.prepareStatement(sql.toString(), lData);
    			resultFlag = dbmgr.executeUpdate();

			/*******************************/
			/* 센서스자료신청 삭제                            */
			/*******************************/
			} else if(lData.getString("PARAM").equals("REMOVE_CENSUS_REQ")) {
				sql.append(" delete from sgis_census_req 	\n");
				sql.append("	where sgis_census_req_id  = :sgis_census_req_id	\n");
	
				dbmgr.prepareStatement(sql.toString(), lData);
				resultFlag = dbmgr.executeUpdate();    			

			/*******************************/
    		/* 센서스 등록 년도 다중삭제 */
    		/*******************************/
    		} else if(lData.getString("PARAM").equals("REMOVE_CENSUS_REQ_YEAR_CODE3")) {
	    		String[] list_sgis_census_req_y_s_d = lData.getString("r_sgis_census_req_y_s_d").split(",");
	    		String[] list_sgis_census_req_y_e_d = lData.getString("r_sgis_census_req_y_e_d").split(",");
	    		String[] list_sgis_census_id = lData.getString("r_sgis_census_id").split(",");
	    		String[] list_sgis_census_data_id = lData.getString("r_sgis_census_data_id").split(",");
	    		String[] list_sgis_census_req_id = lData.getString("r_sgis_census_req_id").split(",");
	    		String[] list_sgis_census_req_year = lData.getString("r_sgis_census_req_year").split(",");
	    		String[] list_inUse = lData.getString("inUse").split(",");

				for(int i=0; i < list_sgis_census_req_id.length; i++) {

					if(list_inUse[i].equals("Y")) {	//체크된 것만 비표시

						sql.append(" update sgis_census_req_year_code set sgis_census_req_y_use_che = 'N'		\n");
						sql.append("		where sgis_census_req_id	 = '"+list_sgis_census_req_id[i]+"'		\n");
						sql.append("						and sgis_census_id = '"+list_sgis_census_id[i]+"' 	\n");
						sql.append("						and sgis_census_data_id = '"+list_sgis_census_data_id[i]+"' 	\n");
						sql.append("						and sgis_census_req_year = '"+ list_sgis_census_req_year[i]+"' 	\n");

		    			dbmgr.prepareStatement(sql.toString(), lData);
		    			resultFlag = dbmgr.executeUpdate();
					}
				}
    		}

    	} catch(Exception e) {
    	}

    	return resultFlag;
    }
}
