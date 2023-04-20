package kostat.lbdms.ServiceAPI.common.web.core;

import java.io.Serializable;
import java.util.List;


/**  
 * <pre>
 * DAO interface
 * </pre>
 *
 * @author		Admin
 * @since 		2015. 10. 20. 오후 2:18:53
 * @version 	    1.0
 * @see
 * <pre>
 *  ==========  개정이력( Modification Information )  ==========  
 * 
 *     수정일             수정자                         수정내용
 *  ------------    ------------     -------------------------------
 *   2015.10.20.      Admin				        최초생성
 *
 *</pre>
 */
public interface IDAO<T, ID extends Serializable > {
    	/**
	 * 
	 * @param id
	 * @return
	 */
	T selectById( ID id );
	/**
	 * 
	 * @return
	 */
	List<T> selectAll();
	 
	/**
	 * 
	 * @param entity
	 * @return
	 */
	int insert( T entity );
	/**
	 * 
	 * @param entity
	 * @return
	 */
	int update( T entity );
	/**
	 * 
	 * @param entity
	 * @return
	 */
	int delete( T entity );
	/**
	 * 
	 * @param id
	 * @return
	 */
	int deleteById( ID id );
	/**
	 * 
	 * @param ids
	 * @return
	 */
	int deleteByIds( ID[] ids );
}
