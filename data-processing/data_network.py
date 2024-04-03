import pandas as pd
import math


# Sabendo que o ficheiro kmeans_2_clustered.csv contem, para cada row (utilizador), colunas relativas às interações
# E cada coluna relativa a uma interação tem um valor em cadeia de caracteres que representa o número de vezes que a ação foi feita por cada utilizador imediatamente após a ação descrita nessa coluna
# Eu assumo sempre a mesma lista de acções para efeitos de análise, ou seja, a ordem das acções é sempre a mesma
# A lista [map_circle_hover,map_circle_click_add,map_circle_click_remove,calendar_circle_hover,calendar_circle_click_add,calendar_circle_click_remove,overview_remove_single,overview_remove_all,overview_sort_open,overview_sort_option] tem 10 elementos
# Como podemos ver, a ação map_circle_hover é a primeira ação, a ação map_circle_click_add é a segunda ação, e assim sucessivamente
# O valor de cada coluna é uma cadeia de caracteres com 10 elementos separados por '-'
# Cada elemento representa o número de vezes que a ação foi feita por cada utilizador imediatamente após a ação descrita nessa coluna
# O valor de cada elemento é um número inteiro
# (E.g.: map_circle_hover -> 0-1-0-0-0-0-0-0-0-0 significa que o utilizador tem uma action diretamente após o map_circle_hover feita para o map_circle_click_add)

def create_network(df,fileName):
    # Filtrar o ficheiro que contem os dados de interação por cada utilizador para obter apenas as colunas que interessam
    # Vamos percorrer este df e somar os valores de interação para cada interação mais tarde no interaction_values
    df = df[['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']]
    
    # Array auxiliar para guardar os valores de interação (Serve apenas ajudar na tradução)
    interaction_list = ['map_circle_hover','map_circle_click_add','map_circle_click_remove','calendar_circle_hover','calendar_circle_click_add','calendar_circle_click_remove','overview_remove_single','overview_remove_all','overview_sort_open','overview_sort_option']
    # Dicionário para traduzir os valores de interação para o nome da interação
    interaction_list_traduction={'map_circle_hover': 'MapCircleHover','map_circle_click_add': 'MapCircleClickAdd','map_circle_click_remove': 'MapCircleClickRemove','calendar_circle_hover': 'CalendarCircleHover','calendar_circle_click_add': 'CalendarCircleClickAdd','calendar_circle_click_remove': 'CalendarCircleClickRemove','overview_remove_single':'OverviewRemoveSingle','overview_remove_all':'OverviewRemoveAll','overview_sort_open': 'OverviewSortOpen','overview_sort_option': 'OverviewSortOption'}
    
    # Dicionário para efeitos de percorrer o dataframe e somar os valores de interação (este é o mais importante porque é onde vao ser guardados os valores de interação para cada interação)
    interaction_values = {'map_circle_hover':[0,0,0,0,0,0,0,0,0,0],'map_circle_click_add':[0,0,0,0,0,0,0,0,0,0],'map_circle_click_remove':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_hover':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_click_add':[0,0,0,0,0,0,0,0,0,0],'calendar_circle_click_remove':[0,0,0,0,0,0,0,0,0,0],'overview_remove_single':[0,0,0,0,0,0,0,0,0,0],'overview_remove_all':[0,0,0,0,0,0,0,0,0,0],'overview_sort_open':[0,0,0,0,0,0,0,0,0,0],'overview_sort_option':[0,0,0,0,0,0,0,0,0,0]}
    # Para cada linha do dataframe
    for index, row in df.iterrows():
        # Para cada interação
        for key, value in interaction_values.items():
            # Obter os valores de interação para cada interação (E.g.: index = 0 sendo a primeira row, key = map_circle_hover sendo a primeira interação, irá retornar 0-1-0-0-0-0-0-0-0-0 para node_interaction_values)
            node_interaction_values = df.loc[index, key].split('-')
            # Para cada valor de interação (ou seja, se node_interaction_values = 0-1-0-0-0-0-0-0-0-0, vamos percorrer cada valor ligado por '-')
            for i in range (len(node_interaction_values)):
                # Somar o valor para a interação (E.g.: interaction_values['map_circle_hover'][1] += 1 porque o valor de node_interaction_values[1] é 1 significa que o utilizador fez a ação map_circle_click_add imediatamente após a ação map_circle_hover)
                value[i] += int(node_interaction_values[i])
    
    # Escrever os valores de interação para cada interação num ficheiro csv
    fo = open(f"./datasets-participants-network/{fileName}_network.csv", "a")

    # Para cada interação
    for key, value in interaction_values.items()
        # Para cada valor de interação (E.g.: percorrer o array [0,1,0,0,0,0,0,0,0,0])
        for i in range (len(value)):
            # Dividir o valor de interação pelo número de utilizadores (E.g.: 1/10 = 0.1, arredondar para cima = 1). Isto permite-nos saber quantos utilizadores fizeram a ação imediatamente após a ação descrita na interação através da média
            value[i] = math.ceil(value[i]  /df.shape[0])
        
        # Somar os valores de interação para cada interação (E.g.: 0+1+0+0+0+0+0+0+0+0 = 1)
        sum = 0
        for i in range (len(value)):
            sum += value[i]

        # Se a soma for diferente de 0, então escrever no ficheiro csv
        # Isto permite-nos saber se a interação foi feita por algum utilizador. Se a soma for 0, então a interação não foi feita por nenhum utilizador e não é necessário escrever no ficheiro csv
        if sum != 0:
            fo.write( interaction_list_traduction[key] )
            # Para cada valor de interação (E.g.: percorrer o array [0,1,0,0,0,0,0,0,0,0]). O i vai permitir percorrer a lista de interações
            # Porque se temos 10 interações no array, então vamos percorrer 10 vezes para escrever no ficheiro csv
            for i in range (len(value)): 
                    # Se o valor de interação for diferente de 0, então escrever no ficheiro csv (E.g.: se o valor de interação for 1, então escrever ',MapCircleClickAdd' no ficheiro csv imediatamente após a interação MapCircleHover estar no inicio da linha)
                    # Se o valor for 5, então escrever ',MapCircleClickAdd,MapCircleClickAdd,MapCircleClickAdd,MapCircleClickAdd,MapCircleClickAdd' no ficheiro csv imediatamente após a interação MapCircleHover estar no inicio da linha
                    # Isto permite-nos saber quantos utilizadores em média fizeram a ação imediatamente após a ação descrita na interação
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
    