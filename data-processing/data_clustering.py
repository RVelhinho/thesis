# import required libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.datasets import make_blobs
from sklearn.preprocessing import MinMaxScaler
from sklearn.cluster import KMeans
import hdbscan

# Generate dataset

dataset = make_blobs(n_samples=200,centers=4,n_features=2,cluster_std=1.6,random_state=50)
points = dataset[0]
df = pd.DataFrame(points, columns=['X', 'Y'])

scaler = MinMaxScaler()
scaler.fit(df[['X']])
df['X'] = scaler.transform(df['X'])
print(df)


