import pandas as pd

def get_interaction_cols(df):
    df['total_interactions_map'] = df['total_circle_clicks_map'] + df['total_circle_hovers_map'] 
    df['total_interactions_calendar'] = df['total_circle_clicks_calendar'] + df['total_circle_hovers_calendar']
    return df

def create_all_interactions_map_file(df):
    df_new = df.loc[:,['total_interactions_map']]
    df_new.to_csv(f"./datasets-participants-interactions/all_interactions_map.csv", index = False)
    return

def create_all_interactions_calendar_file(df):
    df_new = df.loc[:,['total_interactions_calendar']]
    df_new.to_csv(f"./datasets-participants-interactions/all_interactions_calendar.csv", index = False)
    return

def create_conditions_interactions_map_file(df):
    df_new = df.loc[:,['condition','total_interactions_map']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.to_csv(f"./datasets-participants-interactions/conditions_interactions_map.csv", index = False)
    return

def create_conditions_interactions_calendar_file(df):
    df_new = df.loc[:,['condition','total_interactions_calendar']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.to_csv(f"./datasets-participants-interactions/conditions_interactions_calendar.csv", index = False)
    return

def create_clusters_interactions_map_file(df):
    df_new = df.loc[:,['Cluster','total_interactions_map']]
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-interactions/clusters_interactions_map.csv", index = False)
    return

def create_clusters_interactions_calendar_file(df):
    df_new = df.loc[:,['Cluster','total_interactions_calendar']]
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-interactions/clusters_interactions_calendar.csv", index = False)
    return

def create_conditions_clusters_interactions_map_file(df):
    df_new = df.loc[:,['condition','Cluster','total_interactions_map']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-interactions/conditions_clusters_interactions_map.csv", index = False)
    return

def create_conditions_clusters_interactions_calendar_file(df):
    df_new = df.loc[:,['condition','Cluster','total_interactions_calendar']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-interactions/conditions_clusters_interactions_calendar.csv", index = False)
    return

def create_interactions_files():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    df_new = get_interaction_cols(df)
    create_all_interactions_map_file(df_new)
    create_all_interactions_calendar_file(df_new)
    create_conditions_interactions_map_file(df_new)
    create_conditions_interactions_calendar_file(df_new)
    create_clusters_interactions_map_file(df_new)
    create_clusters_interactions_calendar_file(df_new)
    create_conditions_clusters_interactions_map_file(df_new)
    create_conditions_clusters_interactions_calendar_file(df_new)
    
if __name__ == '__main__':
    create_interactions_files()