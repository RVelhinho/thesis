# import required libraries
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import hdbscan

# Initialization
pd.set_option('display.max_rows', None)
df = pd.read_csv(f"./datasets-participants-count/all_interactions_count.csv", sep=',')
data = df[['total_circle_hovers_map', 'total_circle_hovers_calendar']]

# Apply hdbscan to our data
clusterer = hdbscan.HDBSCAN()
clusterer.fit(data)
print(clusterer.labels_.max())

# Add StandardScaler to the preprocessing pipeline
preprocessor = Pipeline(
        [
            ("scaler", StandardScaler()),
            # ("pca", PCA(n_components=2, random_state=42)),
        ]
    )

# Add KMeans to the clustering pipeline
clusterer = Pipeline(
       [
           (
               "kmeans",
               KMeans(
                   n_clusters=2,
                   init="random",
                   n_init=100,
                   max_iter=300,
               ),
           ),
       ]
    )

# Merge both preprocessing and clustering pipelines
pipe = Pipeline(
        [
            ("preprocessor", preprocessor),
            ("clusterer", clusterer)
        ]
    )

# Apply StandardScaler and KMeans to our data
preprocessed_data = pipe["preprocessor"].transform(data)
predicted_labels = pipe["clusterer"]["kmeans"].labels_


# Apply StandardScaler to our data
scaler = StandardScaler()
scaled_features = scaler.fit_transform(data)

# Compute the elbow method for the chosen amount of clusters
def compute_elbow_plot():
    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, n_clusters=2,init="random", n_init=100, max_iter=300)
        kmeans.fit(scaled_features)
        sse.append(kmeans.inertia_)

# Compute the silhouette score for the chosen amount of clusters
def compute_silhouette_score():
    silhouette_coefficients = []
    for k in range(2, 11):
        kmeans = KMeans(n_clusters=k, n_clusters=2,init="random", n_init=100, max_iter=300)
        kmeans.fit(scaled_features)
        score = silhouette_score(scaled_features, kmeans.labels_)
        silhouette_coefficients.append(score)


