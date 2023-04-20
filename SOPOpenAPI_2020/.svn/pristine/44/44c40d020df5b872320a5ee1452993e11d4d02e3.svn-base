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
public enum PopulationIndexFieldDefineEnum implements IIndexFieldDefine
{		
	sido_cd				(0, TextField.class),  
    sgg_cd				(1, TextField.class),  
	emdong_cd			(2, TextField.class),  
    family_id			(3, TextField.class),  
	family_no			(4, TextField.class),  
    family_div			(5, TextField.class),  
	native_foreign_div	(6, TextField.class),  
    gender				(7, TextField.class),  
	age					(8, TextField.class),  
    mrg_state			(9, TextField.class),  
	edu_level			(10, TextField.class), 
    study_level			(11, TextField.class), 
	tot_reg_cd			(12, TextField.class), 
    base_reg_cd			(13, TextField.class), 
	//pt 					(14, Point.class),
	censusyear			(14, TextField.class);

	private int fieldIndex;
	private Store fieldStore;
	private Class<? extends Field> fieldClass;
	
	private Class fieldValueType;
	
	private PopulationIndexFieldDefineEnum( int index )
	{
		this(index, Field.Store.YES, StringField.class, String.class);
	}
	
	private PopulationIndexFieldDefineEnum( int index, Class<? extends Field> clz)
	{
		this(index, Field.Store.YES, clz, String.class);
	}
	
	private PopulationIndexFieldDefineEnum( int index, Store store, Class<? extends Field> clz, Class valueType )
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
