package todo.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import todo.model.beans.BookDataBean;

public class CompositeLoadData implements ILoadData {

    private final List<ILoadData> loaders;

    public CompositeLoadData(ILoadData... loaders) {
    	
        this.loaders = Arrays.asList(loaders);
    }

    @Override
    public BookDataBean[] BookDataBeanGet() {
    	
        List<BookDataBean> result = new ArrayList<>();

        for (ILoadData loader : loaders) {
        	
            BookDataBean[] data = loader.BookDataBeanGet();
            if (data != null) {
            	
                result.addAll(Arrays.asList(data));
            }
        }

        return result.toArray(BookDataBean[]::new);
    }
}