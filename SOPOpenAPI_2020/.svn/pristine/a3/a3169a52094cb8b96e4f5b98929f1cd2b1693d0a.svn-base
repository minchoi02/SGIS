package kostat.sop.OpenAPI3.search.index;

import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.document.Field.Store;

import com.neighborsystem.lucene.index.handler.IIndexFieldDefine;

/**
 * 
 * @author neighbor21
 *
 */
public enum IndexFieldDefineEnum implements IIndexFieldDefine
{	
	id	            			(0, TextField.class),  
	sufid						(1, TextField.class), 
	addr_type	    			(2, TextField.class),  
	sido_nm		    			(3, TextField.class),  
	sido_syn	    			(4, TextField.class),  
	sido_cd		    			(5, TextField.class),  
	sgg_nm		    			(6, TextField.class),  
	sgg_syn		    			(7, TextField.class),  
	sgg_cd		    			(8, TextField.class),  
	adm_nm						(9, TextField.class), 
	adm_cd						(10, TextField.class),
	leg_nm						(11, TextField.class),
	leg_cd						(12, TextField.class),
	road_nm						(13, TextField.class),
	road_cd		    			(14, TextField.class), 
	emdong_syn	    			(15, StringField.class), 
	ri_nm		    			(16, TextField.class),
	ri_syn		    			(17, TextField.class), 
	ri_cd		    			(18, TextField.class),
	bd_main_nm	    			(19, TextField.class),
	bd_main_nm_syn	    		(20, TextField.class), 
	bd_sub_nm					(21, TextField.class),
	road_nm_main_no	    		(22, TextField.class),
	road_nm_sub_no      		(23, TextField.class),
	pcl		    				(24, TextField.class),
	x		    				(25, TextField.class),
	y		    				(26, TextField.class);
		
	private int fieldIndex;
	private Store fieldStore;
	private Class<? extends Field> fieldClass;
	
	private Class fieldValueType;
	
	private IndexFieldDefineEnum( int index )
	{
		this(index, Field.Store.YES, StringField.class, String.class);
	}
	
	private IndexFieldDefineEnum( int index, Class<? extends Field> clz)
	{
		this(index, Field.Store.YES, clz, String.class);
	}
	
	private IndexFieldDefineEnum( int index, Store store, Class<? extends Field> clz, Class valueType )
	{
		this.fieldIndex = index;
		this.fieldStore = store;
		this.fieldClass = clz;
		this.fieldValueType = valueType;
	}
	
	@Override
	public int columIndex()
	{
		return fieldIndex;
	}

	@Override
	public String fieldName()
	{
		return name();
	}

	@Override
	public Store fieldStore()
	{
		return fieldStore;
	}

	@Override
	public Class<? extends Field> fieldClass()
	{
		return fieldClass;
	}

	@Override
	public Class fieldValueType()
	{
		return fieldValueType;
	}

}
