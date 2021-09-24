import pandas as pd

def create_top_5_interactions():
    # All Network
    data = {'interaction': ['Calendar Circle Hover','Map Circle Hover','Calendar Circle Click Add','Map Circle Click Add','Overview Remove All'],'score': [0.2213,0.1705,0.1247,0.1071,0.0923]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/all_network.csv", index = False)
    # Condition Map Network
    data = {'interaction': ['Map Circle Hover','Calendar Circle Hover','Map Circle Click Add','Overview Remove Single','Calendar Circle Click Add'],'score': [0.2631,0.1780,0.1712,0.1120,0.0945]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_map_network.csv", index = False)
    # Condition Calendar Network
    data = {'interaction': ['Calendar Circle Hover','Calendar Circle Click Add','Map Circle Hover','Overview Remove Single','Overview Remove All'],'score': [0.2880,0.2061,0.1577,0.1188,0.0728]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_calendar_network.csv", index = False)
    # Condition None Network
    data = {'interaction': ['Calendar Circle Hover','Map Circle Hover','Map Circle Click Add','Calendar Circle Click Add','Overview Remove All'],'score': [0.1954,0.1829,0.1198,0.1068,0.0850]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_none_network.csv", index = False)
    # Cluster 1 Network
    data = {'interaction': ['Calendar Circle Hover','Map Circle Hover','Calendar Circle Click Add','Map Circle Click Add','Overview Remove Single',],'score': [0.2406,0.1562,0.1318,0.1114,0.1065]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/clusters_1_network.csv", index = False)
    # Cluster 2 Network
    data = {'interaction': ['Calendar Circle Hover','Map Circle Hover','Calendar Circle Click Add','Map Circle Click Add','Overview Remove All'],'score': [0.2108,0.1914,0.1301,0.1183,0.0946]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/clusters_2_network.csv", index = False)
    # Condition Map Cluster 1 Network
    data = {'interaction': ['Map Circle Hover','Map Circle Click Add','Overview Remove Single','Calendar Circle Click Add','Calendar Circle Hover'],'score': [0.3395,0.2251,0.1316,0.1195,0.1153]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_map_clusters_1_network.csv", index = False)
    # Condition Map Cluster 2 Network
    data = {'interaction': ['Map Circle Hover','Calendar Circle Hover','Map Circle Click Add','Overview Remove Single','Calendar Circle Click Add'],'score': [0.2631,0.1780,0.1712,0.1120,0.0945]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_map_clusters_2_network.csv", index = False)
    # Condition Calendar Cluster 1 Network
    data = {'interaction': ['Calendar Circle Hover','Calendar Circle Click Add','Overview Remove Single','Map Circle Hover', 'Calendar Circle Click Remove'],'score': [0.4050,0.3082,0.1224,0.0561,0.0432]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_calendar_clusters_1_network.csv", index = False)
    # Condition Calendar Cluster 2 Network
    data = {'interaction': ['Calendar Circle Hover','Calendar Circle Click Add','Map Circle Hover','Overview Remove Single','Overview Remove All'],'score': [0.2816,0.2002,0.1744,0.1304,0.0801]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_calendar_clusters_2_network.csv", index = False)
    # Condition None Cluster 1 Network
    data = {'interaction': ['Map Circle Hover','Calendar Circle Hover','Map Circle Click Add','Overview Remove Single','Calendar Circle Click Add'],'score': [0.2031,0.1711,0.1575,0.1172,0.0893]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_none_clusters_1_network.csv", index = False)
    # Condition Calendar Cluster 2 Network
    data = {'interaction': ['Calendar Circle Hover','Map Circle Hover','Calendar Circle Click Add','Map Circle Click Add','Overview Remove Single'],'score': [0.2288,0.1894,0.1426,0.1237,0.0698]}
    df_new = pd.DataFrame(data)
    df_new.to_csv(f"./datasets-participants-network/top-5-interactions/conditions_none_clusters_2_network.csv", index = False)
    return


if __name__ == '__main__':
    pd.set_option('display.max_rows', None)
    create_top_5_interactions()