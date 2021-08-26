# import required libraries
import pandas as pd
from sklearn import cluster
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from kneed import KneeLocator
import matplotlib.pyplot as plt
import hdbscan

def cluster_with_hdbscan(data):
    # Apply hdbscan to our data
    clusterer = hdbscan.HDBSCAN()
    clusterer.fit(data)
    print("Running Hdbscan...\n")
    print(f"The samples will have the following labels:\n{clusterer.labels_}\n")
    print(f"The total amount of clusters will be {clusterer.labels_.max() + 1}\n")
    return clusterer.labels_
    
# Apply StandardScaler to our data
def scale_features(features):
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    return scaled_features

# Compute the elbow method for the chosen amount of clusters
def compute_elbow_plot(features, total_inits, total_iter):
    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k,init="random", n_init=total_inits, max_iter=total_iter)
        kmeans.fit(features), 
        sse.append(kmeans.inertia_)
    plt.style.use("fivethirtyeight")
    plt.plot(range(1, 11), sse)
    plt.xticks(range(1, 11))
    plt.xlabel("Number of Clusters")
    plt.ylabel("SSE")
    plt.show()
    kl = KneeLocator(range(1, 11), sse, curve="convex", direction="decreasing")
    print(f"The elbow is located at x={kl.elbow}\n")

# Compute the silhouette score for the chosen amount of clusters
def compute_silhouette_score(features, total_inits, total_iter):
    silhouette_coefficients = []
    for k in range(2, 11):
        kmeans = KMeans(n_clusters=k,init="random", n_init=total_inits, max_iter=total_iter)
        kmeans.fit(features)
        score = silhouette_score(features, kmeans.labels_)
        silhouette_coefficients.append(score)
    plt.style.use("fivethirtyeight")
    plt.plot(range(2, 11), silhouette_coefficients)
    plt.xticks(range(2, 11))
    plt.xlabel("Number of Clusters")
    plt.ylabel("Silhouette Coefficient")
    plt.show()


def cluster_data():
    # Initialization
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/participants-personality.csv", sep=',')
    print("")
    alg = input("Which algorithm do you want to run?\n")
    print("")
    if (alg == 'hdbscan'):
        total_traits = int(input("How many features do you want for clustering?\n"))
        print("")
        cluster_traits = []
        for i in range(1,total_traits+1):
            trait = input(f"Which feature will be number {i}?\n")
            print("")
            cluster_traits.append(trait)
        data = df[cluster_traits]
        scaled_data = scale_features(data)
        predicted_labels = cluster_with_hdbscan(scaled_data)
        df['Cluster'] = predicted_labels
        df.to_csv('./datasets-participants-clustering/hdbscan_clustered.csv', index = False)
    elif (alg == 'kmeans'):
        total_traits = int(input("How many features do you want for clustering?\n"))
        print("")
        cluster_traits = []
        for i in range(1,total_traits+1):
            trait = input(f"Which feature will be number {i}?\n")
            print("")
            cluster_traits.append(trait)
        data = df[cluster_traits]
        total_clusters = int(input("How many clusters do you want?\n"))
        print("")
        total_inits = int(input("How many initializations do you want?\n"))
        print("")
        total_iter = int(input("What is the max amount of iterations allowed?\n"))
        print("")
        # Add StandardScaler to the preprocessing pipeline
        preprocessor = Pipeline([("scaler", StandardScaler())])
        # Add KMeans to the clustering pipeline
        clusterer = Pipeline([("kmeans",KMeans(n_clusters=total_clusters,init="random",n_init=total_inits,max_iter=total_iter))])
        # Merge both preprocessing and clustering pipelines
        pipe = Pipeline([("preprocessor", preprocessor),("clusterer", clusterer)])
        # Apply StandardScaler and KMeans to our data
        pipe.fit(data)
        preprocessed_data = pipe["preprocessor"].fit_transform(data)
        predicted_labels = pipe["clusterer"]["kmeans"].labels_
        converge_iter = pipe["clusterer"]["kmeans"].n_iter_
        lowest_sse = pipe["clusterer"]["kmeans"].inertia_
        df['Cluster'] = predicted_labels  
        print(f"The samples will have the following labels:{predicted_labels}\n")
        print(f"The silhouette score for {total_clusters} is {silhouette_score(preprocessed_data, predicted_labels)}\n")
        print(f"The lowest sum of the squared error (SSE) is {lowest_sse}\n")
        print(f"The number of iterations required to converge was {converge_iter}\n")
        df.to_csv(f"./datasets-participants-clustering/kmeans_{total_clusters}_clustered.csv", index = False)
    elif (alg == 'silhouette'):
        total_traits = int(input("How many features do you want for clustering?\n"))
        print("")
        cluster_traits = []
        for i in range(1,total_traits+1):
            trait = input(f"Which feature will be number {i}?\n")
            print("")
            cluster_traits.append(trait)
        data = df[cluster_traits]
        scaled_data = scale_features(data)
        total_inits = int(input("How many initializations do you want?\n"))
        print("")
        total_iter = int(input("What is the max amount of iterations allowed?\n"))
        print("")
        compute_silhouette_score(scaled_data,total_inits,total_iter)
    elif (alg == 'elbow'):
        total_traits = int(input("How many features do you want for clustering?\n"))
        print("")
        cluster_traits = []
        for i in range(1,total_traits+1):
            trait = input(f"Which feature will be number {i}?\n")
            print("")
            cluster_traits.append(trait)
        data = df[cluster_traits]
        scaled_data = scale_features(data)
        total_inits = int(input("How many initializations do you want?\n"))
        print("")
        total_iter = int(input("What is the max amount of iterations allowed?\n"))
        print("")
        compute_elbow_plot(scaled_data,total_inits, total_iter)
       

if __name__ == '__main__':
    cluster_data()
    