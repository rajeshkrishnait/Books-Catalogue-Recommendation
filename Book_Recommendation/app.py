# -*- coding: utf-8 -*-
"""
Created on Tue May 11 14:50:59 2021

@author: prash
"""

import pandas as pd
from flask import Flask, request, render_template
import pickle
import json

app = Flask(__name__)
model = pickle.load(open('knn_model.pkl','rb'))
users_combined_rating_pivot = pd.read_csv("users_combined_rating_pivot.csv")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
def predict():
    isbn_number = request.form['book ISBN']
    distances, indices = model.kneighbors(users_combined_rating_pivot.loc[users_combined_rating_pivot['ISBN']==isbn_number,:].values[:,1:].reshape(1,-1), n_neighbors = 6)
    list_books = []
    for i in range(0, len(distances.flatten())):
        #if i == 0:
            #print('Recommendations for {0}:\n'.format(get_book_name(users_combined_rating_pivot.index[query_index])))
        if i>0:
            book_num = users_combined_rating_pivot.iloc[indices.flatten()[i]][0]
            #book_name = get_book_name(book_num)
            #print('{0}: {1}-{2}, with distance of {3}:'.format(i, book_name, book_num, distances.flatten()[i]))
            list_books.append(book_num)
    json_file = json.dumps(list_books)
    # print(json_file)
    return render_template("index.html", recommended_text="Recommended book isbn number are {}".format(list_books))


if __name__ == '__main__':
    app.run(debug=True)