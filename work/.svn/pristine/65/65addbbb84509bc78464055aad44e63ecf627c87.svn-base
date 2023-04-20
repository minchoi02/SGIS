package kostat.lbdms.ServiceAPI.common.web.core.service;


import java.io.Serializable;
import java.util.List;


/**  
 * <pre>
 * Service interface 
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
public interface IService<T, ID extends Serializable>  {
    	 T findById( ID id );
	 
	 List<T> findAll();
	 
	 int add( T entity );
	 
	 int modify( T entity );
	 
	 int remove( T entity );
	 
	 int removeById( ID id );
	 
	 int removeByIds( ID[] ids );
}
