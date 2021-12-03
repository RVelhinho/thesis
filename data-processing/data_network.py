import pandas as pd
import math


def create_network(df,fileName):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    interaction_list_traduction={'map_circle_hover': 'MapCircleHover','map_circle_click_add': 'MapCircleClickAdd','map_circle_click_remove': 'MapCircleClickRemove','calendar_circle_hover': 'CalendarCircleHover','calendar_circle_click_add': 'CalendarCircleClickAdd','calendar_circle_click_remove': 'CalendarCircleClickRemove','overview_remove_single':'OverviewRemoveSingle','overview_remove_all':'OverviewRemoveAll','overview_sort_open': 'OverviewSortOpen','overview_sort_option': 'OverviewSortOption'}
    interaction_values = {'map_circle_hover':[0,0,0,0,0,0,0,0,0,0],'map_circle_click_add':[0,0,0,0,0,0,0,0,0,0],'map_circle_click_remove':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_hover':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_click_add':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_click_remove':[0,0,0,0,0,0,0,0,0,0],'overview_remove_single':[0,0,0,0,0,0,0,0,0,0],'overview_remove_all':[0,0,0,0,0,0,0,0,0,0],'overview_sort_open':[0,0,0,0,0,0,0,0,0,0],'overview_sort_option':[0,0,0,0,0,0,0,0,0,0]}
    for index, row in df.iterrows():
        for key, value in interaction_values.items():
            node_interaction_values = df.loc[index, key].split('-')
            for i in range (len(node_interaction_values)):
                value[i] += int(node_interaction_values[i])              
    fo = open(f"./datasets-participants-network/{fileName}_network.csv", "a")
    for key, value in interaction_values.items():
        for i in range (len(value)):
            value[i] = math.ceil(value[i]  /df.shape[0])
        sum = 0
        for i in range (len(value)):
            sum += value[i]
        if sum != 0:
            fo.write( interaction_list_traduction[key] )
            for i in range (len(value)):
                    for j in range(value[i]):
                        fo.write(',' + interaction_list_traduction[interaction_list[i]] )   
            fo.write('\n') 
    fo.close()

def create_networks():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    create_network(df,'all')
    df_condition_map = df[(df['condition'] == 1)]
    create_network(df_condition_map,'condition_map')
    df_condition_calendar = df[(df['condition'] == 2)]
    create_network(df_condition_calendar,'condition_calendar')
    df_condition_none = df[(df['condition'] == 3)]
    create_network(df_condition_none,'condition_none')
    df_cluster_1 = df[(df['Cluster'] == 0)]
    create_network(df_cluster_1,'cluster_1')
    df_cluster_2 = df[(df['Cluster'] == 1)]
    create_network(df_cluster_2,'cluster_2')
    df_condition_map_cluster_1 = df[(df['condition'] == 1) & (df['Cluster'] == 0)]
    create_network(df_condition_map_cluster_1,'condition_map_cluster_1')
    df_condition_calendar_cluster_1 = df[(df['condition'] == 2) & (df['Cluster'] == 0)]
    create_network(df_condition_calendar_cluster_1,'condition_calendar_cluster_1')
    df_condition_none_cluster_1 = df[(df['condition'] == 3) & (df['Cluster'] == 0)]
    create_network(df_condition_none_cluster_1,'condition_none_cluster_1')
    df_condition_map_cluster_2 = df[(df['condition'] == 1) & (df['Cluster'] == 1)]
    create_network(df_condition_map_cluster_2,'condition_map_cluster_2')
    df_condition_calendar_cluster_2 = df[(df['condition'] == 2) & (df['Cluster'] == 1)]
    create_network(df_condition_calendar_cluster_2,'condition_calendar_cluster_2')
    df_condition_none_cluster_2 = df[(df['condition'] == 3) & (df['Cluster'] == 1)]
    create_network(df_condition_none_cluster_2,'condition_none_cluster_2')
    
    
if __name__ == '__main__':
    create_networks()
    