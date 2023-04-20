package kostat.lbdms.ServiceAPI.common.web.exception;

import java.io.Serializable;

public class FileSystemException extends BaseException implements Serializable  {
	
	private static final long serialVersionUID = -6449286202470940649L;

	public FileSystemException(){
		super();
	}
	
	public FileSystemException(Throwable cause)
	{
		super(cause);
	}
	
	public FileSystemException( String message ) {
		super( message );
	}

	@Override
	public String getMessage() {
		return super.getMessage();
	}
	

}
