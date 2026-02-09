package todo.model;

import todo.model.beans.BookDataBean;

public class DatabaseData implements ILoadData{
	
	@Override
	public BookDataBean[] BookDataBeanGet() {
		
		try {
			
			return BookDataListDAO.findAll().toArray(BookDataBean[]::new);
		}catch(Exception e) {
			
			System.out.println("例外が発生しましたが、問題なく継続できました。");
			return new BookDataBean[0];
		}
	}
}