# AlwaysPublishPortfolio
常時公開のポートフォリオになります。<br>
以下ポートフォリオの詳細を記載いたします。<br>

＜2_C++(VisualStudio)＞<br>
　〇2_workSpace_MFC_Direct2D<br>
　　①1_SideViewGameSample<br>
　　　・ゲームエンジンを使わず、低レイヤーからC++で構築した<br>
　　　・AI を活用しつつ、自分で設計・統合・デバッグを行った<br>
　　　・衝突判定や物理挙動は理解した上で実装した<br>

＜3_Java(eclipse)＞<br>
　〇1_workspace_ServletAndJSP<br>
　　①1_書籍検索アプリ<br>
　　　・サーブレット/JSPを使用して構築した<br>
　　　・MVCモデルを意識して、特にコントローラ―の処理が複雑にならないように努めた<br>
　　　・JavaBeansの設計を取り入れて、JSPでBeanを利用しやすくなるように設計した<br>
      ・SQLインジェクション対策の為、テキストボックスで<br>入力された検索ワードを<br>
        そのままクエリのWHERE句に使用するのではなく、全件をC#プログラム内の<br>
        コレクションへと格納した後、C#プログラム内での検索メソッドを介して<br>
        結果を出力するように設計した<br>
        →不正文字列を入れ込む余地が無い(「bookName = 'DB版田中A太郎';」にて<br>
          検索し、無効であることを確認)<br>

　〇2_workspace_JavaFX<br>
　　①1_RockPaperScissors<br>
　　　・SpringBoot等のフレームワークを使わず、JavaFXと標準Javaを使用して構築した<br>
      ・書籍検索アプリよりも単純な構造でMVCモデルを意識し、書籍検索アプリよりも<br>
        単純な設計を目指した<br>
      ・一部じゃんけんの手のボタンを押すことでイベントが発火する、イベント駆動型の<br>
        設計を取り入れた<br>
