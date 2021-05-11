# -*- coding: utf-8 -*-
"""
Created on Tue May 11 13:13:02 2021

@author: prash
"""


import pandas as pd
import pickle
import sys

model = pickle.load(open('knn_model.pkl','rb'))
users_combined_rating_pivot = pd.read_csv("users_combined_rating_pivot.csv")


def predict(str):
    book = str
    distances, indices = model.kneighbors(users_combined_rating_pivot.loc[users_combined_rating_pivot['bookTitle']==book,:].values[:,1:].reshape(1,-1), n_neighbors = 6)
    list_books = []
    for i in range(1, len(distances.flatten())):
        book_name = users_combined_rating_pivot.iloc[indices.flatten()[i]][0]
        list_books.append(book_name)
    print(list_books)
    sys.stdout.flush()

if __name__ == '__main__':
    str = sys.argv[1]
    predict(str)