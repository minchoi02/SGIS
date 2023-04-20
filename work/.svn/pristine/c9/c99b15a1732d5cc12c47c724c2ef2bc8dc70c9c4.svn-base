package kostat.lbdms.ServiceAPI.common.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashSet;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SecurityUtil {

	 public SecurityUtil()
	    {
	    }

	    /**
	     * 
	     * @param query
	     * @return
	     */
	    public static Boolean checkValidSql(String query)
	    {
	    	//LOGGER.info("checkValidSql string query["+query+"]");
	    	
	        String sqlSieve = "'\";:#\\/*";
	        boolean result = true;
	        StringBuffer violatedBy = new StringBuffer();
	        for(int i = 0; i < query.length(); i++)
	        {
	            for(int j = 0; j < sqlSieve.length(); j++)
	                if(query.charAt(i) == sqlSieve.charAt(j))
	                    violatedBy.append(sqlSieve.charAt(j));

	        }

	        if(violatedBy.length() > 0)
	        {
	            LOGGER.warn((new StringBuilder()).append(" checkValidSQL( ").append(query).append(" )").toString());
	            result = false;
	        }
	        if(!result || query.indexOf("--") > 0)
	        {
	            LOGGER.warn((new StringBuilder()).append(" checkValidSQL( ").append(query).append(" ) is Null!!!").toString());
	            result = false;
	        }
	        return Boolean.valueOf(result);
	    }

	    /**
	     * 
	     * @param arg
	     * @return
	     */
	    public static Boolean checkValidSql(Object arg)
	    {
	    	
	    	//LOGGER.info("checkValidSql Object start ---------------------------------------------------------");
	    	
	        String sqlSieve = "'\";:#\\/*";
	        boolean chkVal = false;
	        boolean result = true;
	        int queryColumnsQueryListLength = 0;
	        StringBuffer violatedByQuery = new StringBuffer();
	        StringBuffer violatedBySort = new StringBuffer();
	        StringBuffer violatedByOrder = new StringBuffer();
	        Class beanClass = arg.getClass();
	        Method methods[] = beanClass.getMethods();
	        Method targetMethodGetQuery = null;
	        Method targetMethodGetSort = null;
	        Method targetMethodGetOrder = null;
	        
	        Method arr$[] = methods;
	        int len$ = arr$.length;
	        int i$ = 0;
	       /* do
	        {
	            if(i$ >= len$)
	                break;
	            Method method = arr$[i$];
	            LOGGER.warn("method name : " + method.getName());
	            i$++;
	        } while(true);*/
	        //------------------------------------------------
	        arr$ = methods;
	        len$ = arr$.length;
	        i$ = 0;
	        do
	        {
	        	if(i$ >= len$)
	        		break;
	        	Method method = arr$[i$];
	        	
	        	if(method.getName().equals("getQuery"))
	            {
	                targetMethodGetQuery = method;
	                chkVal = true;
	                break;
	            }
	        	i$++;
	        } while(true);
	        //------------------------------------------------
	        arr$ = methods;
	        len$ = arr$.length;
	        i$ = 0;
	        do
	        {
	            if(i$ >= len$)
	                break;
	            Method method = arr$[i$];
	            if(method.getName().equals("getSort"))
	            {
	                targetMethodGetSort = method;
	                chkVal = true;
	                break;
	            }
	            i$++;
	        } while(true);
	        //------------------------------------------------
	        arr$ = methods;
	        len$ = arr$.length;
	        i$ = 0;
	        do
	        {
	        	if(i$ >= len$)
	        		break;
	        	Method method = arr$[i$];
	        	if(method.getName().equals("getOrder"))
	        	{
	        		targetMethodGetOrder = method;
	        		chkVal = true;
	        		break;
	        	}
	        	i$++;
	        } while(true);
	       
	        //------------------------------------------------
	        
	        if(!chkVal)
	            return Boolean.valueOf(result);
	        
	        String queryColumnsQueryList[] = null;
	        String queryQueryList = null;
	        String sortQueryList = null;
	        String orderQueryList = null;
	        int jnx;
	        try
	        {
	            //orderColumnsQueryList = (String[])(String[])targetMethodGetOrderColumns.invoke(arg, new Object[0]);
	            queryQueryList = (String)targetMethodGetQuery.invoke(arg, new Object[0]);
	            sortQueryList = (String)targetMethodGetSort.invoke(arg, new Object[0]);
	            orderQueryList = (String)targetMethodGetOrder.invoke(arg, new Object[0]);
	            
	            /*LOGGER.info((new StringBuilder()).append("### queryQueryList : ").append(ToStringBuilder.reflectionToString(queryQueryList, ToStringStyle.MULTI_LINE_STYLE)).toString());
	            LOGGER.info((new StringBuilder()).append("### sortQueryList : " ).append(ToStringBuilder.reflectionToString(sortQueryList, ToStringStyle.MULTI_LINE_STYLE)).toString());
	            LOGGER.info((new StringBuilder()).append("### orderQueryList : ").append(ToStringBuilder.reflectionToString(orderQueryList, ToStringStyle.MULTI_LINE_STYLE)).toString());*/
	            /*if(orderColumnsQueryList != null)
	             * 
	            {
	                orderColumnsQueryListLength = orderColumnsQueryList.length;
	                if(LOGGER.isDebugEnabled())
	                    LOGGER.debug((new StringBuilder()).append("### orderColumnsqueryList Length : ").append(orderColumnsQueryListLength).toString());
	                for(jnx = 0; jnx < orderColumnsQueryListLength; jnx++)
	                {
	                    String query = orderColumnsQueryList[jnx];
	                    for(int bnx = 0; bnx < query.length(); bnx++)
	                    {
	                        for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	                            if(query.charAt(bnx) == sqlSieve.charAt(cnx))
	                                violatedByOrderColumns.append(sqlSieve.charAt(cnx));

	                    }

	                }

	            }*/
	            //LOGGER.warn("==============================================================1");
	            if(StringUtils.isNotEmpty(queryQueryList)){
	            	queryColumnsQueryList = queryQueryList.split(";");
	            	queryColumnsQueryListLength = queryColumnsQueryList.length;
	            	if(queryColumnsQueryListLength > 0)
	            	{
	            		for(jnx = 0; jnx<queryColumnsQueryListLength; jnx++ ){
	            			String tary[] = queryColumnsQueryList[jnx].split(":");
	            			if(tary.length > 1){

	            				// 조회조건 및 예외대상(검증,데이터수정 query) syntax 목록 미존재시 이상문자 체크!!
	            				if( !whiteSynSet.contains(tary[0].toUpperCase())){
	            					
			            			String query = tary[1];
//			            			LOGGER.info("1 query"+ query);
			            			for(int bnx = 0; bnx < query.length(); bnx++)
			            			{
			            				for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
			            					if(query.charAt(bnx) == sqlSieve.charAt(cnx)){
			            						if(query.length()>1&&!query.substring(bnx, bnx+2).equals("\\_")) {
				            						violatedByQuery.append(sqlSieve.charAt(cnx));
				            						LOGGER.warn("1 이상문자 포함!!!" + query.charAt(bnx));
			            						}
			            					}
			            			}
			            			
	            				}
	            			}
	           			}
	            			
	            	}
	            }
	            
	            if(violatedByQuery.length() > 0)
		        {
		            LOGGER.warn(" violatedByQuery checkValidSQL( ) false -> SQL Injection Query ", violatedByQuery.toString());
		            result = false;
		        }
	            //LOGGER.warn("==============================================================2");
	            
	            
	            /*if(StringUtils.isNotEmpty(queryQueryList))
	            {
	                String query = queryQueryList;
	                for(int bnx = 0; bnx < query.length(); bnx++)
	                {
	                    for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	                        if(query.charAt(bnx) == sqlSieve.charAt(cnx))
	                            violatedByQuery.append(sqlSieve.charAt(cnx));

	                }

	            }*/
	            
	            // sort
	            if(StringUtils.isNotEmpty(sortQueryList))
	            {
	            	String query = sortQueryList;
	            	//LOGGER.info("2 query"+ query);
	            	for(int bnx = 0; bnx < query.length(); bnx++)
	            	{
	            		for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	            			if(query.charAt(bnx) == sqlSieve.charAt(cnx)){
	            				violatedBySort.append(sqlSieve.charAt(cnx));
	            				LOGGER.warn("sort 이상문자 포함!!!" + query.charAt(bnx));
	            			}
	            		
	            	}
	            	
	            }
	            if(violatedBySort.length() > 0)
		        {
		            LOGGER.warn(" violatedBySort checkValidSQL( ) false -> SQL Injection Sort", violatedBySort.toString());
		            result = false;
		        }
	            //LOGGER.warn("==============================================================3");
	            
	            // order
	            if(StringUtils.isNotEmpty(orderQueryList))
	            {
	                String query = orderQueryList;
	                //LOGGER.info("3 query"+ query);
	                for(int bnx = 0; bnx < query.length(); bnx++)
	                {
	                    for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	                        if(query.charAt(bnx) == sqlSieve.charAt(cnx)){
	                        	violatedByOrder.append(sqlSieve.charAt(cnx));
	                    		LOGGER.warn("order 이상문자 포함!!!" + query.charAt(bnx));
	                        }

	                }
	            }
		        if(violatedByOrder.length() > 0)
		        {
		            LOGGER.warn(" violatedByOrder checkValidSQL( ) false -> SQL Injection Order", violatedByOrder.toString());
		            result = false;
		        }
		        //LOGGER.warn("==============================================================4");
		        
	        }
	        catch(IllegalAccessException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(IllegalArgumentException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(InvocationTargetException e)
	        {
	            LOGGER.error(e);
	        }
	        
	        
	        /*int e = 0;
	        do
	        {
	            if(e >= orderColumnsQueryListLength)
	                break;
	            String query = orderColumnsQueryList[e];
	            if(StringUtils.isNotEmpty(query) && (!result || query.indexOf("--") > 0))
	            {
	                LOGGER.warn((new StringBuilder()).append(" checkValidSQL( ").append(query).append(" ) is Null!!!").toString());
	                result = false;
	                break;
	            }
	            e++;
	        } while(true);*/
	        
	      
	        if(StringUtils.isNotEmpty(queryQueryList) && (!result || queryQueryList.indexOf("--") > 0))
	        {
	            LOGGER.warn((new StringBuilder()).append(" queryQueryList checkValidSQL( ").append(queryQueryList).append(" ) is Null!!!").toString());
	            result = false;
	        }
	        if(StringUtils.isNotEmpty(sortQueryList) && (!result || sortQueryList.indexOf("--") > 0))
	        {
	        	LOGGER.warn((new StringBuilder()).append(" sortQueryList checkValidSQL( ").append(sortQueryList).append(" ) is Null!!!").toString());
	        	result = false;
	        }
	        if(StringUtils.isNotEmpty(sortQueryList) && StringUtils.isNotEmpty(orderQueryList) && (!result || orderQueryList.indexOf("--") > 0))
	        {
	        	LOGGER.warn((new StringBuilder()).append(" orderQueryList checkValidSQL( ").append(orderQueryList).append(" ) is Null!!!").toString());
	        	result = false;
	        }
	        
//	        LOGGER.info("checkValidSql end ---------------------------------------------------------" + result);
	        
	        return Boolean.valueOf(result);
	    }


	    //******************************************************************************************************************************

	    
	    
	    //******************************************************************************************************************************
	    /**
	     * 
	     * @param str
	     * @return
	     *//*
	    public static String escapeForWebEditor(String str)
	    {
	    	
	        if(str == null)
	            return null;
	        Pattern pattern1 = Pattern.compile("<script([^>]*)>|&lt;script([^&gt;]*)&gt;|</script>|&lt;/script&gt;|<object([^>]*)>|&lt;object([^&gt;]*)&gt;|</object>|&lt;/object&gt;|<iframe([^>]*)>|&lt;iframe([^&gt;]*)&gt;|</iframe>|&lt;/iframe&gt;", 2);
	        Matcher m = pattern1.matcher(str);
	        StringBuffer sb = new StringBuffer();
	        for(; m.find(); m.appendReplacement(sb, ""))
	        {
	            String token = m.group();
	            if(LOGGER.isDebugEnabled())
	                LOGGER.debug((new StringBuilder()).append("### Escaped String : ").append(token).toString());
	        }

	        m.appendTail(sb);
	        return sb.toString();
	    }
	    
	    *//**
	     * 
	     * @param arg
	     * @param getterColumnNameMethod
	     * @return
	     *//*
	    public static Boolean checkValidSql(Object arg, String getterColumnNameMethod)
	    {
	        String sqlSieve = "'\";:#\\/*";
	        boolean result = true;
	        StringBuffer violatedByColumnName = new StringBuffer();
	        Class beanClass = arg.getClass();
	        Method methods[] = beanClass.getMethods();
	        Method targetMethodGetColumnName = null;
	        if(StringUtils.isNotEmpty(getterColumnNameMethod))
	        {
	            Method arr$[] = methods;
	            int len$ = arr$.length;
	            int i$ = 0;
	            do
	            {
	                if(i$ >= len$)
	                    break;
	                Method method = arr$[i$];
	                if(method.getName().equals(getterColumnNameMethod))
	                {
	                    targetMethodGetColumnName = method;
	                    break;
	                }
	                i$++;
	            } while(true);
	        }
	        String orderColumnsQueryList = null;
	        try
	        {
	            orderColumnsQueryList = (String)targetMethodGetColumnName.invoke(arg, new Object[0]);
	            if(LOGGER.isDebugEnabled())
	                LOGGER.debug((new StringBuilder()).append("### orderColumnsqueryList : ").append(ToStringBuilder.reflectionToString(orderColumnsQueryList, ToStringStyle.MULTI_LINE_STYLE)).toString());
	            if(StringUtils.isNotEmpty(orderColumnsQueryList))
	            {
	                for(int bnx = 0; bnx < orderColumnsQueryList.length(); bnx++)
	                {
	                    for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	                        if(orderColumnsQueryList.charAt(bnx) == sqlSieve.charAt(cnx))
	                            violatedByColumnName.append(sqlSieve.charAt(cnx));

	                }

	            }
	        }
	        catch(IllegalAccessException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(IllegalArgumentException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(InvocationTargetException e)
	        {
	            LOGGER.error(e);
	        }
	        if(violatedByColumnName.length() > 0)
	        {
	            LOGGER.warn(" checkValidSQL( ) false -> SQL Injection OrderColumns ");
	            result = false;
	        }
	        if(StringUtils.isNotEmpty(orderColumnsQueryList) && (!result || orderColumnsQueryList.indexOf("--") > 0))
	        {
	            LOGGER.warn((new StringBuilder()).append(" checkValidSQL( ").append(orderColumnsQueryList).append(" ) is Null!!!").toString());
	            result = false;
	        }
	        return Boolean.valueOf(result);
	    }

	    */
	   /* *//**
	     * 
	     * @param arg
	     * @param strArrayColumnName
	     * @return
	     *//*
	    public static Boolean checkStringArrayValidSql(Object arg, String strArrayColumnName)
	    {
	        String sqlSieve = "'\";:#\\/*";
	        boolean result = true;
	        int strArrayColumnsQueryListLength = 0;
	        StringBuffer violatedByOrderColumns = new StringBuffer();
	        Class beanClass = arg.getClass();
	        Method methods[] = beanClass.getMethods();
	        Method targetMethodGetOrderColumns = null;
	        if(StringUtils.isNotEmpty(strArrayColumnName))
	        {
	            Method arr$[] = methods;
	            int len$ = arr$.length;
	            int i$ = 0;
	            do
	            {
	                if(i$ >= len$)
	                    break;
	                Method method = arr$[i$];
	                if(method.getName().equals(strArrayColumnName))
	                {
	                    targetMethodGetOrderColumns = method;
	                    break;
	                }
	                i$++;
	            } while(true);
	        }
	        String orderColumnsQueryList[] = null;
	        int jnx;
	        try
	        {
	            orderColumnsQueryList = (String[])(String[])targetMethodGetOrderColumns.invoke(arg, new Object[0]);
	            if(LOGGER.isDebugEnabled())
	                LOGGER.debug((new StringBuilder()).append("### orderColumnsqueryList : ").append(ToStringBuilder.reflectionToString(orderColumnsQueryList, ToStringStyle.MULTI_LINE_STYLE)).toString());
	            if(orderColumnsQueryList != null)
	            {
	                strArrayColumnsQueryListLength = orderColumnsQueryList.length;
	                if(LOGGER.isDebugEnabled())
	                    LOGGER.debug((new StringBuilder()).append("### strArrayColumnsqueryList Length : ").append(strArrayColumnsQueryListLength).toString());
	                for(jnx = 0; jnx < strArrayColumnsQueryListLength; jnx++)
	                {
	                    String query = orderColumnsQueryList[jnx];
	                    for(int bnx = 0; bnx < query.length(); bnx++)
	                    {
	                        for(int cnx = 0; cnx < sqlSieve.length(); cnx++)
	                            if(query.charAt(bnx) == sqlSieve.charAt(cnx))
	                                violatedByOrderColumns.append(sqlSieve.charAt(cnx));

	                    }

	                }

	            }
	        }
	        catch(IllegalAccessException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(IllegalArgumentException e)
	        {
	            LOGGER.error(e);
	        }
	        catch(InvocationTargetException e)
	        {
	            LOGGER.error(e);
	        }
	        if(violatedByOrderColumns.length() > 0)
	        {
	            LOGGER.warn(" checkValidSQL( ) false -> SQL Injection strArrayColumnArray ");
	            result = false;
	        }
	        int e = 0;
	        do
	        {
	            if(e >= strArrayColumnsQueryListLength)
	                break;
	            String query = orderColumnsQueryList[e];
	            if(StringUtils.isNotEmpty(query) && (!result || query.indexOf("--") > 0))
	            {
	                LOGGER.warn((new StringBuilder()).append(" checkValidSQL( ").append(query).append(" ) is Null!!!").toString());
	                result = false;
	                break;
	            }
	            e++;
	        } while(true);
	        return Boolean.valueOf(result);
	    }*/

	    private static final Logger LOGGER = LogManager.getLogger();

	    private static final HashSet whiteSynSet;
	    static{
		    whiteSynSet = new HashSet();
			whiteSynSet.add("JOB_SETUP_SEQ");
			whiteSynSet.add("JOB_STEP_NO");
			whiteSynSet.add("PROGRS_ODR");
			whiteSynSet.add("COLUMNS");
			whiteSynSet.add("SRCH_ROW_ID");
			whiteSynSet.add("PROGRS_ODR");
	    }
}
