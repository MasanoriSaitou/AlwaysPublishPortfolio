#Streamlit の機能(UI)を使うためのインポート st.title()やst.write()などが使える  
import streamlit as st
#CSV を読み込んだり、データを扱うためのライブラリ
import pandas as pd
#グラフ描画ライブラリ
import matplotlib.pyplot as plt
#pandasの表データ型DataFrameを使用
from pandas import DataFrame
#typingモジュールからOptional(Nullになる可能性のあるデータ)やリストが使える
from typing import Optional, List
#Streamlit には SessionStateという、データ保持領域がある。
import streamlit as st
#データ保持領域に変数readCntがなければ新規で作る
if "readCnt" not in st.session_state:
    st.session_state.readCnt = -1

#ソフトのタイトル
st.title("CSV データ可視化ツール")

#CSV ファイルをアップロードする UI
uploaded_file :Optional[st.runtime.uploaded_file_manager.UploadedFile] = \
    st.file_uploader("CSV をアップロードしてください", type="csv")

#ファイルがアップロードされたときだけ処理を進める　→Streamlit はページを何度も再実行する仕組みなので、この条件がないとエラーになる。
if uploaded_file is not None:

    #アップロードされた CSV を pandas の DataFrame として読み込む
    df :DataFrame = pd.read_csv(uploaded_file)
    #データの先頭5行を表示  df.head()は最初の5行の抽出、st.write() は何でも表示できる万能関数
    st.write("データプレビュー", df.head())

    #インポートファイルの数値列だけを抽出し、 列名のリストに変換する
    #例)["売上", "利益", "数量"]
    numeric_cols:List[str] = df.select_dtypes(include="number").columns.tolist()
    #数値列が一つでもあればTrue、数値列がない CSV（例：名前・住所だけ）だと False になる。
    if numeric_cols: 

        #プルダウンメニューを作る。ユーザーがグラフにしたい列を選ぶことができ、その結果をcolに
        col:str = st.selectbox("グラフ化する列を選択", numeric_cols)
        #matplotlib の図と軸を作成 →subplots()は
        #Axes（描画領域）に折れ線グラフを描き、Figure（図全体）を Streamlit に表示する 
        fig, ax = plt.subplots() #型:Tuple[Figure, Axes]
        #選んだ列の値を折れ線グラフで描画(アップロードされたデータ=dfの中身)
        ax.plot(df[col])
        #matplotlib の図を Streamlit に表示
        st.pyplot(fig)
    else:

        #数値列がない CSV の場合に警告を表示
        st.warning("数値列がありません")
else:

    #インポートされていないうちは以下を表示
    st.session_state.readCnt += 1
    st.warning("ファイルをインポートしてください　　　　　ファイル読み込み回数："+str(st.session_state.readCnt))