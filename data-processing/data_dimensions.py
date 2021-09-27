import pandas as pd

def create_all_dimensions_file(df):
    df_new = df.loc[:,['Internal','PowerfulOthers','Chance']]
    df_new.to_csv(f"./datasets-participants-dimensions/all_dimensions.csv", index = False)
    return

def create_conditions_dimensions_file(df):
    df_new = df.loc[:,['Internal','PowerfulOthers','Chance','condition']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.to_csv(f"./datasets-participants-dimensions/conditions_dimensions.csv", index = False)
    return 

def create_clusters_dimensions_file(df):
    df_new = df.loc[:,['Internal','PowerfulOthers','Chance','Cluster']]
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-dimensions/clusters_dimensions.csv", index = False)
    return 

def create_conditions_clusters_dimensions_file(df):
    df_new = df.loc[:,['Internal','PowerfulOthers','Chance','condition','Cluster']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-dimensions/conditions_clusters_dimensions.csv", index = False)
    return 

def create_dimensions_files():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    create_all_dimensions_file(df)
    create_conditions_dimensions_file(df)
    create_clusters_dimensions_file(df)
    create_conditions_clusters_dimensions_file(df)
    
    
if __name__ == '__main__':
    create_dimensions_files()