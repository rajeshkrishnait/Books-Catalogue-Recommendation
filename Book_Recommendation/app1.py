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
    isbn_number = str
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
    print(list_books)
    sys.stdout.flush()

if __name__ == '__main__':
    str = sys.argv[1]
    predict(str)