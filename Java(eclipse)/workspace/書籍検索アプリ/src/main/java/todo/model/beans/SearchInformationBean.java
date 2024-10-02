//仕様④パッケージ化をする
package todo.model.beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

//仕様①クラスを「public」指定する
//仕様③「java.io.Serializable」インターフェースを実装(implements)する
public class SearchInformationBean implements Serializable{

	private static final long serialVersionUID = 1L;
	
	//仕様⑥メンバ変数は全てprivateにする
	private List<BookDataBean> searchResultList; //検索結果
	private Integer selectNo; //どの番号が選択されたのか
	private String keyWord;  //入力されたキーワード
	private String pushedButton;   //押下されたボタン
	private String pushedRadio;  //選択されたラジオボタン
	private Boolean isButtonPush;  //検索ボタンが押下されたか
	private String pushedButtonCopy;  //押されたボタンのコピー
	
	//仕様⑤各プロパティに対するアクセサーが定義されている
	//※eclipseには自動的にアクセサーを作ってくれる機能がある
	//「右クリック」⇒「ソース」⇒「getterおよびsetterの生成」
	public List<BookDataBean> getSearchResultList() {
		return searchResultList;
	}
	public void setSearchResultList(List<BookDataBean> searchResultList) {
		this.searchResultList = searchResultList;
	}
	public Integer getSelectNo() {
		return selectNo;
	}
	public void setSelectNo(Integer selectNo) {
		this.selectNo = selectNo;
	}
	public String getKeyWord() {
		return keyWord;
	}
	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}
	public String getPushedButton() {
		return pushedButton;
	}
	public void setPushedButton(String pushedButton) {
		this.pushedButton = pushedButton;
	}
	public String getPushedRadio() {
		return pushedRadio;
	}
	public void setPushedRadio(String pushedRadio) {
		this.pushedRadio = pushedRadio;
	}
	public Boolean getIsButtonPush() {
		return isButtonPush;
	}
	public void setIsButtonPush(Boolean isButtonPush) {
		this.isButtonPush = isButtonPush;
	}
	public String getPushedButtonCopy() {
		return pushedButtonCopy;
	}
	public void setPushedButtonCopy(String pushedButtonCopy) {
		this.pushedButtonCopy = pushedButtonCopy;
	}
	
	//仕様②引数なし「コンストラクタ」を定義する
	public SearchInformationBean() {
	
		initializeField();
	}
	public SearchInformationBean(List<BookDataBean> searchResultList, //検索結果
		Integer selectNo, //どの番号が選択されたのか
		String keyWord,  //入力されたキーワード
		String pushedButton,   //押下されたボタン
		String pushedRadio,  //選択されたラジオボタン
		Boolean isButtonPush) {  //検索ボタンが押下されたか

		initializeField(searchResultList,selectNo,keyWord,pushedButton,pushedRadio,
			isButtonPush);
	}
	
	private void initializeField() {
		
		searchResultList = new ArrayList<BookDataBean>(); //検索結果
		selectNo = null; //どの番号が選択されたのか
		keyWord = "";  //入力されたキーワード
		pushedButton = "";   //押下されたボタン
		pushedRadio = "";  //選択されたラジオボタン
		isButtonPush = false;  //検索ボタンが押下されたか
		pushedButtonCopy = pushedButton;
	}

	private void initializeField(List<BookDataBean> searchResultList, //検索結果
		Integer selectNo, //どの番号が選択されたのか
		String keyWord,  //入力されたキーワード
		String pushedButton,   //押下されたボタン
		String pushedRadio,  //選択されたラジオボタン
		Boolean isButtonPush) {  //検索ボタンが押下されたか
		
		this.searchResultList = searchResultList;
		this.selectNo = selectNo;
		this.keyWord = keyWord;
		this.pushedButton = pushedButton;
		this.pushedRadio = pushedRadio;
		this.isButtonPush = isButtonPush;
		this.pushedButtonCopy = pushedButton;
	}
}