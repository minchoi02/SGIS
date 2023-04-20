/**
 * 2010-4-12
 */
package kostat.sop.ServiceAPI.common.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.CRC32;
import java.util.zip.CheckedInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**   
 *
 * @ClassName: ZipUtils
 * @Description： 
 * Copyright (c) 2014 by NeighborSystem    
 * @author xuliguo   
 * @date：2014年11月14日 下午7:46:21    
 * @version V1.0      
 *  
 * Modification  History:
 * Date         Author        Version        Discription
 * -----------------------------------------------------------------------------------
 * 2014年11月14日      xuliguo        1.0             
 */
public class ZipUtils {

	public static final String EXT = ".zip";
	private static final int BUFFER = 1024;

	/**
	 * 文件 解压缩
	 * 
	 * @param srcPath
	 *            源文件路径
	 * 
	 * @throws Exception
	 */
//	public static void decompress(String srcPath) throws FileNotFoundException, IOException {
//		File srcFile = new File(srcPath);
//		decompress(srcFile);
//	}

	/**
	 * 解压缩
	 * 
	 * @param srcFile
	 * @throws Exception
	 */
	public static void decompress(File srcFile) throws FileNotFoundException, IOException {
		String basePath = srcFile.getParent();		
		String zipFileName=srcFile.getName().replaceAll(".zip", "");
		//window
		//decompress(srcFile, basePath+'\\'+zipFileName);
		//linux
		decompress(srcFile, basePath+'/'+zipFileName);
	}

	/**
	 * 解压缩
	 * 
	 * @param srcFile
	 * @param destFile
	 * @throws Exception
	 */
	public static void decompress(File srcFile, File destFile) throws FileNotFoundException, IOException {
		CheckedInputStream cis = new CheckedInputStream(new FileInputStream(
				srcFile), new CRC32());
		ZipInputStream zis = null;
		try {
			 zis = new ZipInputStream(cis);
			decompress(destFile, zis);
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} finally {
			zis.close();
		}
	}

	/**
	 * 解压缩
	 * 
	 * @param srcFile
	 * @param destPath
	 * @throws Exception
	 */
	public static void decompress(File srcFile, String destPath) throws FileNotFoundException, IOException {
		if(destPath != null && !"".equals(destPath)) {
			destPath = Security.cleanXss(destPath); //외부 입력값 필터링 
		}
		File path= new File(destPath);
		if(!path.exists()){
			fileProber(path);
		}
		decompress(srcFile, new File(destPath));
	}

	/**
	 * 文件 解压缩
	 * 
	 * @param srcPath
	 *            源文件路径
	 * @param destPath
	 *            目标文件路径
	 * @throws Exception
	 */
	public static void decompress(String srcPath, String destPath) throws FileNotFoundException, IOException {
		if(srcPath != null && !"".equals(srcPath)) {
			srcPath = Security.cleanXss(srcPath); //외부 입력값 필터링 
		}
		File srcFile = new File(srcPath);
		decompress(srcFile, destPath);
	}

	/**
	 * 文件 解压缩
	 * 
	 * @param destFile
	 *            目标文件
	 * @param zis
	 *            ZipInputStream
	 * @throws Exception
	 */
	private static void decompress(File destFile, ZipInputStream zis)
			throws FileNotFoundException, IOException {
		ZipEntry entry = null;
		while ((entry = zis.getNextEntry()) != null) {
			// 文件
			String dir = destFile.getPath() + File.separator + entry.getName();
			if(dir != null && !"".equals(dir)) {
				dir = Security.cleanXss(dir); //외부 입력값 필터링 
			}
			File dirFile = new File(dir);
			
			// 文件检查
			fileProber(dirFile);
 			if (entry.isDirectory()) {
 				//시큐어코딩(2016-12-05) 중요한 자원에 대한 잘못된 권한 설정(File)
 				dirFile.setExecutable(false, true);
 				dirFile.setReadable(true);
 				dirFile.setWritable(false, true);
 				
 				dirFile.mkdirs();
 			} else {
 				decompressFile(dirFile, zis);
 			}
 			zis.closeEntry();
 		}
 	}

	/**
	 * 文件探针
	 * 
	 * 
	 * 当父目录不存在时，创建目录！
	 * 
	 * 
	 * @param dirFile
	 */
	private static void fileProber(File dirFile) {
		File parentFile = dirFile.getParentFile();
		if (!parentFile.exists()) {
			// 递归寻找上级目录
//			fileProber(parentFile);
			
			//시큐어코딩(2016-12-05) 중요한 자원에 대한 잘못된 권한 설정(File)
			parentFile.setExecutable(false, true);
			parentFile.setReadable(true);
			parentFile.setWritable(false, true);
			
			parentFile.mkdir();
		}

	}
	/**
	 * 文件解压缩
	 * 
	 * @param destFile
	 *            目标文件
	 * @param zis
	 *            ZipInputStream
	 * @throws Exception
	 */
	private static void decompressFile(File destFile, ZipInputStream zis)
			throws FileNotFoundException, IOException {
		BufferedOutputStream bos = null;
		try {
			bos = new BufferedOutputStream(new FileOutputStream(destFile));
			int count;
			byte data[] = new byte[BUFFER];
			while ((count = zis.read(data, 0, BUFFER)) != -1) {
				bos.write(data, 0, count);
			}
		} catch (FileNotFoundException e) {
			throw e;
		} catch (IOException e) {
			throw e;
		} finally {
			bos.close();
		}
	}

}

