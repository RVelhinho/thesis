import pandas as pd


def create_all_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/all_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_map_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_map_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_calendar_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_calendar_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_none_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_none_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()

def create_cluster_1_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/cluster_1_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_cluster_2_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/cluster_2_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_map_cluster_1_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_map_cluster_1_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_calendar_cluster_1_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_calendar_cluster_1_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_none_cluster_1_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_none_cluster_1_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_map_cluster_2_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_map_cluster_2_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_calendar_cluster_2_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_calendar_cluster_2_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()
    
def create_condition_none_cluster_2_network(df):
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    fo = open("./datasets-participants-network/condition_none_cluster_2_network.csv", "a")
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    for index, row in df.iterrows():
        for el in interaction_list:
            node_interaction_list = df.loc[index, el].split('-')
            network_interaction_list = el
            found_edge = False
            for i in range (len(node_interaction_list)):
                if int(node_interaction_list[i]) > 0:
                    found_edge = True
                    for j in range (0, int(node_interaction_list[i])):
                        network_interaction_list += ',' + interaction_list[i]
            if found_edge is True:
                fo.write( network_interaction_list + '\n')
    fo.close()

def create_networks():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    create_all_network(df)
    df_condition_map = df[(df['condition'] == 1)]
    create_condition_map_network(df_condition_map)
    df_condition_calendar = df[(df['condition'] == 2)]
    create_condition_calendar_network(df_condition_calendar)
    df_condition_none = df[(df['condition'] == 3)]
    create_condition_none_network(df_condition_none)
    df_cluster_1 = df[(df['Cluster'] == 0)]
    create_cluster_1_network(df_cluster_1)
    df_cluster_2 = df[(df['Cluster'] == 1)]
    create_cluster_2_network(df_cluster_2)
    df_condition_map_cluster_1 = df[(df['condition'] == 1) & (df['Cluster'] == 0)]
    create_condition_map_cluster_1_network(df_condition_map_cluster_1)
    df_condition_calendar_cluster_1 = df[(df['condition'] == 2) & (df['Cluster'] == 0)]
    create_condition_calendar_cluster_1_network(df_condition_calendar_cluster_1)
    df_condition_none_cluster_1 = df[(df['condition'] == 3) & (df['Cluster'] == 0)]
    create_condition_none_cluster_1_network(df_condition_none_cluster_1)
    df_condition_map_cluster_2 = df[(df['condition'] == 1) & (df['Cluster'] == 1)]
    create_condition_map_cluster_2_network(df_condition_map_cluster_2)
    df_condition_calendar_cluster_2 = df[(df['condition'] == 2) & (df['Cluster'] == 1)]
    create_condition_calendar_cluster_2_network(df_condition_calendar_cluster_2)
    df_condition_none_cluster_2 = df[(df['condition'] == 3) & (df['Cluster'] == 1)]
    create_condition_none_cluster_2_network(df_condition_none_cluster_2)
    
    
if __name__ == '__main__':
    create_networks()
    