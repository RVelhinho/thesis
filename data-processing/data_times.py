import pandas as pd

def create_all_time_map_file(df):
    df_new = df.loc[:,['total_time_map']]
    df_new.to_csv(f"./datasets-participants-time/all_time_map.csv", index = False)
    return

def create_all_time_calendar_file(df):
    df_new = df.loc[:,['total_time_calendar']]
    df_new.to_csv(f"./datasets-participants-time/all_time_calendar.csv", index = False)
    return

def create_conditions_time_map_file(df):
    df_new = df.loc[:,['condition','total_time_map']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.to_csv(f"./datasets-participants-time/conditions_time_map.csv", index = False)
    return

def create_conditions_time_calendar_file(df):
    df_new = df.loc[:,['condition','total_time_calendar']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.to_csv(f"./datasets-participants-time/conditions_time_calendar.csv", index = False)
    return

def create_clusters_time_map_file(df):
    df_new = df.loc[:,['Cluster','total_time_map']]
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-time/clusters_time_map.csv", index = False)
    return

def create_clusters_time_calendar_file(df):
    df_new = df.loc[:,['Cluster','total_time_calendar']]
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-time/clusters_time_calendar.csv", index = False)
    return

def create_conditions_clusters_time_map_file(df):
    df_new = df.loc[:,['condition','Cluster','total_time_map']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-time/conditions_clusters_time_map.csv", index = False)
    return

def create_conditions_clusters_time_calendar_file(df):
    df_new = df.loc[:,['condition','Cluster','total_time_calendar']]
    df_new.loc[(df_new['condition'] == 1), 'condition'] = 'Map Anchor'
    df_new.loc[(df_new['condition'] == 2), 'condition'] = 'Calendar Anchor'
    df_new.loc[(df_new['condition'] == 3), 'condition'] = 'No Anchor'
    df_new.loc[(df_new['Cluster'] == 0), 'Cluster'] = 'Cluster 1'
    df_new.loc[(df_new['Cluster'] == 1), 'Cluster'] = 'Cluster 2'
    df_new.to_csv(f"./datasets-participants-time/conditions_clusters_time_calendar.csv", index = False)
    return

def create_times_files():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    create_all_time_map_file(df)
    create_all_time_calendar_file(df)
    create_conditions_time_map_file(df)
    create_conditions_time_calendar_file(df)
    create_clusters_time_map_file(df)
    create_clusters_time_calendar_file(df)
    create_conditions_clusters_time_map_file(df)
    create_conditions_clusters_time_calendar_file(df)
    

if __name__ == '__main__':
    create_times_files()