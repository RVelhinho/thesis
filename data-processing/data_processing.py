import os
import numpy as np
import pandas as pd
import datetime

from data_auxiliary import format_sequential_map_hovers, format_str_to_date, remove_not_hovers_less_than_100ms,remove_hovers_less_than_100ms

######################################################
######## MAIN PROCESSES FOR CSV CREATION #############
######################################################

def create_count_csv(df, id):
    df = df.iloc[[0]][['identifier', 'condition', 'task_1', 'task_2', 'total_time','total_time_map', 'total_time_calendar','total_time_overview', 'total_circle_clicks','total_circle_clicks_add','total_circle_clicks_remove', 'total_circle_clicks_map','total_circle_clicks_map_add','total_circle_clicks_map_remove', 'total_circle_clicks_calendar','total_circle_clicks_calendar_add', 'total_circle_clicks_calendar_remove', 'total_remove_single_clicks', 'total_remove_all_clicks', 'total_sort_open_clicks', 'total_sort_option_clicks', 'total_circle_hovers', 'total_circle_hovers_map', 'total_circle_hovers_calendar', 'map_circle_hover', 'map_circle_click_add', 'map_circle_click_remove', 'calendar_circle_hover','calendar_circle_click_add', 'calendar_circle_click_remove', 'overview_remove_single', 'overview_remove_all', 'overview_sort_open', 'overview_sort_option']]
    writeHeader = True if id == 1 else False
    df.to_csv('./datasets-participants-count/all_interactions_count.csv', mode='a', header=writeHeader, index = False)

######################################################
########## CSV FILE COLUMNS PREPARATION ##############
######################################################

def verify_interactions(df, participantId):
    if df.iloc[0, df.columns.get_loc('type_of_interaction')] != 'Visualization Start First Task':
        print(f'{participantId} | Visualization Start First Task not available!')
        exit(1)
    if (df['type_of_interaction'] == 'Visualization End First Task').any() == False:
        print(f'{participantId} | Visualization End First Task not available!')
        exit(1)
    if (df['type_of_interaction'] == 'Visualization Start Second Task').any() == False:
        print(f'{participantId} | Visualization Start Second Task not available!')
        exit(1)
    if df.iloc[-1, df.columns.get_loc('type_of_interaction')] != 'Visualization End Second Task':
        print(f'{participantId} | Visualization End Second Task not available!')
        exit(1)
    if (df[df['type_of_interaction'] == 'Visualization Start First Task'].shape[0] > 1):
        print(f'{participantId} | More than a single Visualization Start First Task!')
        exit(1)
    if (df[df['type_of_interaction'] == 'Visualization End First Task'].shape[0] > 1):
        print(f'{participantId} | More than a single Visualization End First Task!')
        exit(1)
    if (df[df['type_of_interaction'] == 'Visualization Start Second Task'].shape[0] > 1):
        print(f'{participantId} | More than a single Visualization Start Second Task!')
        exit(1)
    if (df[df['type_of_interaction'] == 'Visualization End Second Task'].shape[0] > 1):
        print(f'{participantId} | More than a single Visualization End Second Task!')
        exit(1)
    if ((df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0])):
        print(f'{participantId} | Visualization Start First Task not in the right order!')
        exit(1)
    if ((df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0])):
        print(f'{participantId} | Visualization End First Task not in the right order!')
        exit(1)
    if ((df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0] >= df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0])):
        print(f'{participantId} | Visualization Start Second Task not in the right order!')
        exit(1)
    if ((df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization Start First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization End First Task'].tolist()[0]) | (df.index[df['type_of_interaction'] == 'Visualization End Second Task'].tolist()[0] <= df.index[df['type_of_interaction'] == 'Visualization Start Second Task'].tolist()[0])):
        print(f'{participantId} | Visualization End Second Task not in the right order!')
        exit(1)
    return

def csv_time_format(df):
    df_total = df.copy(deep=False)
    total_time_counter = 0
    total_time_map_counter = 0
    total_time_calendar_counter = 0
    total_time_overview_counter = 0
    for index, row in df_total.iterrows():
        if df_total.loc[index, 'type_of_interaction'] == 'Visualization End Second Task':
            break
        elif df_total.loc[index, 'type_of_interaction'] == 'Visualization End First Task':
            continue
        elif df_total.loc[index, 'type_of_interaction'] == 'Visualization Start Second Task':
            continue
        elif df_total.loc[index, 'type_of_interaction'] == 'Visualization Start First Task':
            continue
        elif 'Overview' in df_total.loc[index, 'type_of_interaction'] and  df_total.loc[index, 'type_of_interaction'] != 'Visualization Start Interaction' and index != 0:
            total_time_counter += df_total.loc[index, 'time_stamp_diff'] 
            total_time_overview_counter += df_total.loc[index, 'time_stamp_diff'] 
        elif 'Map' in df_total.loc[index, 'type_of_interaction'] and  df_total.loc[index, 'type_of_interaction'] != 'Visualization Start Interaction' and index != 0:
            total_time_counter += df_total.loc[index, 'time_stamp_diff'] 
            total_time_map_counter += df_total.loc[index, 'time_stamp_diff'] 
        elif 'Calendar' in df_total.loc[index, 'type_of_interaction'] and  df_total.loc[index, 'type_of_interaction'] != 'Visualization Start Interaction' and index != 0:
            total_time_counter += df_total.loc[index, 'time_stamp_diff'] 
            total_time_calendar_counter += df_total.loc[index, 'time_stamp_diff'] 
    total_time_counter /= 1000
    total_time_map_counter /= 1000
    total_time_calendar_counter /= 1000
    total_time_overview_counter /= 1000
    df_total['total_time'] = round(total_time_counter, 2)
    df_total['total_time_map'] = round(total_time_map_counter,2)
    df_total['total_time_calendar'] = round(total_time_calendar_counter,2)
    df_total['total_time_overview'] = round(total_time_overview_counter,2)
    return df_total
  
def csv_path_format(df):
    df_path = df[(df['type_of_interaction'] != 'Overview Enter View') & (df['type_of_interaction'] != 'Map Enter View') & (df['type_of_interaction'] != 'Calendar Enter View')]
    map_circle_hover_to_map_circle_add = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Click Add')].shape[0]
    map_circle_hover_to_map_circle_remove = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Click Remove')].shape[0]
    map_circle_hover_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    map_circle_hover_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    map_circle_hover_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    map_circle_hover_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    map_circle_hover_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['map_circle_hover'] = '0' + '-' + str(map_circle_hover_to_map_circle_add) + '-' +str(map_circle_hover_to_map_circle_remove) + '-' + str(map_circle_hover_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(map_circle_hover_to_overview_remove_single) + '-' + str(map_circle_hover_to_overview_remove_all) + '-' + str(map_circle_hover_to_overview_sort_open)  + '-' + str(map_circle_hover_to_overview_sort_option)
    
    
    map_circle_add_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    map_circle_add_to_map_circle_remove = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Click Remove')].shape[0]
    map_circle_add_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    map_circle_add_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    map_circle_add_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    map_circle_add_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    map_circle_add_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['map_circle_click_add'] = str(map_circle_add_to_map_circle_hover) + '-' + '0' + '-' +str(map_circle_add_to_map_circle_remove) + '-' + str(map_circle_add_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(map_circle_add_to_overview_remove_single) + '-' + str(map_circle_add_to_overview_remove_all) + '-' + str(map_circle_add_to_overview_sort_open)  + '-' + str(map_circle_add_to_overview_sort_option)
    
    map_circle_remove_to_map_circle_add = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Click Add')].shape[0]
    map_circle_remove_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    map_circle_remove_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    map_circle_remove_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    map_circle_remove_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    map_circle_remove_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    map_circle_remove_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Map Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['map_circle_click_remove'] = str(map_circle_remove_to_map_circle_hover) + '-' + str(map_circle_remove_to_map_circle_add) + '-' + '0' + '-' + str(map_circle_remove_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(map_circle_remove_to_overview_remove_single) + '-' + str(map_circle_remove_to_overview_remove_all) + '-' + str(map_circle_remove_to_overview_sort_open)  + '-' + str(map_circle_remove_to_overview_sort_option)
    
    calendar_circle_hover_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    calendar_circle_hover_to_calendar_circle_add = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Click Add')].shape[0]
    calendar_circle_hover_to_calendar_circle_remove = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Click Remove')].shape[0]
    calendar_circle_hover_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    calendar_circle_hover_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    calendar_circle_hover_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    calendar_circle_hover_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Hover') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['calendar_circle_hover'] = str(calendar_circle_hover_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + '0' + '-' + str(calendar_circle_hover_to_calendar_circle_add) + '-' + str(calendar_circle_hover_to_calendar_circle_remove) + '-' + str(calendar_circle_hover_to_overview_remove_single) + '-' + str(calendar_circle_hover_to_overview_remove_all) + '-' + str(calendar_circle_hover_to_overview_sort_open)  + '-' + str(calendar_circle_hover_to_overview_sort_option)
    
    calendar_circle_add_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    calendar_circle_add_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    calendar_circle_add_to_calendar_circle_remove = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Click Remove')].shape[0]
    calendar_circle_add_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    calendar_circle_add_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    calendar_circle_add_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    calendar_circle_add_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Add') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['calendar_circle_click_add'] = str(calendar_circle_add_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(calendar_circle_add_to_calendar_circle_hover) + '-' + '0' + '-' + str(calendar_circle_add_to_calendar_circle_remove) + '-' + str(calendar_circle_add_to_overview_remove_single) + '-' + str(calendar_circle_add_to_overview_remove_all) + '-' + str(calendar_circle_add_to_overview_sort_open)  + '-' + str(calendar_circle_add_to_overview_sort_option)
    
    calendar_circle_remove_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    calendar_circle_remove_to_calendar_circle_add = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Click Add')].shape[0]
    calendar_circle_remove_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    calendar_circle_remove_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    calendar_circle_remove_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    calendar_circle_remove_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    calendar_circle_remove_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Calendar Circle Click Remove') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['calendar_circle_click_remove'] = str(calendar_circle_remove_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(calendar_circle_remove_to_calendar_circle_hover) + '-' + str(calendar_circle_remove_to_calendar_circle_add) + '-' + '0' + '-' + str(calendar_circle_remove_to_overview_remove_single) + '-' + str(calendar_circle_remove_to_overview_remove_all) + '-' + str(calendar_circle_remove_to_overview_sort_open)  + '-' + str(calendar_circle_remove_to_overview_sort_option)
    
    overview_remove_single_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    overview_remove_single_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    overview_remove_single_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    overview_remove_single_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    overview_remove_single_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['overview_remove_single'] = str(overview_remove_single_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_remove_single_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + '0' + '-' + str(overview_remove_single_to_overview_remove_all) + '-' + str(overview_remove_single_to_overview_sort_open)  + '-' + str(overview_remove_single_to_overview_sort_option)
    
    overview_remove_all_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove All Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    overview_remove_all_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove All Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    overview_remove_all_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove All Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    overview_remove_all_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove All Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    overview_remove_all_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Overview Remove All Button Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['overview_remove_all'] = str(overview_remove_all_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_remove_all_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_remove_all_to_overview_remove_single) + '-' + '0' + '-' + str(overview_remove_all_to_overview_sort_open)  + '-' + str(overview_remove_all_to_overview_sort_option)
    
    overview_sort_open_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    overview_sort_open_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    overview_sort_open_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    overview_sort_open_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    overview_sort_open_to_overview_sort_option = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Option Click')].shape[0]
    df['overview_sort_open'] = str(overview_sort_open_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_sort_open_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_sort_open_to_overview_remove_single) + '-' + str(overview_sort_open_to_overview_remove_all) + '-' +  '0'  + '-' + str(overview_sort_open_to_overview_sort_option)
    
    overview_sort_option_to_calendar_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Option Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Calendar Circle Hover')].shape[0]
    overview_sort_option_to_map_circle_hover = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Option Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Map Circle Hover')].shape[0]
    overview_sort_option_to_overview_remove_single = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Option Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove Button Click')].shape[0]
    overview_sort_option_to_overview_remove_all = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Option Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Remove All Button Click')].shape[0]
    overview_sort_option_to_overview_sort_open = df_path.loc[(df_path['type_of_interaction'] == 'Overview Sort Option Click') & (df_path['type_of_interaction'].shift(periods = -1) == 'Overview Sort Click')].shape[0]
    df['overview_sort_option'] = str(overview_sort_option_to_map_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_sort_option_to_calendar_circle_hover) + '-' + '0' + '-' + '0' + '-' + str(overview_sort_option_to_overview_remove_single) + '-' + str(overview_sort_option_to_overview_remove_all) + '-' +  str(overview_sort_option_to_overview_sort_open)  + '-' + '0'
    return df

def csv_count_format(df):
    df['total_circle_clicks'] = df.loc[(df['type_of_interaction'].str.contains('Click'))].shape[0]
    df['total_circle_clicks_add'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Add'))].shape[0]
    df['total_circle_clicks_remove']  = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Remove'))].shape[0]
    df['total_circle_clicks_map'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Map'))].shape[0]
    df['total_circle_clicks_map_add'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Map')) & (df['type_of_interaction'].str.contains('Add'))].shape[0]
    df['total_circle_clicks_map_remove'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Map')) & (df['type_of_interaction'].str.contains('Remove'))].shape[0]
    df['total_circle_clicks_calendar'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Calendar'))].shape[0]
    df['total_circle_clicks_calendar_add'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Calendar')) & (df['type_of_interaction'].str.contains('Add'))].shape[0]
    df['total_circle_clicks_calendar_remove'] = df.loc[(df['type_of_interaction'].str.contains('Click')) & (df['type_of_interaction'].str.contains('Calendar')) & (df['type_of_interaction'].str.contains('Remove'))].shape[0]
    df['total_remove_single_clicks'] = df.loc[(df['type_of_interaction'] == 'Overview Remove Button Click')].shape[0]
    df['total_remove_all_clicks'] = df.loc[(df['type_of_interaction'] == 'Overview Remove All Button Click')].shape[0]
    df['total_sort_open_clicks'] = df.loc[(df['type_of_interaction'] == 'Overview Sort Click')].shape[0]
    df['total_sort_option_clicks'] = df.loc[(df['type_of_interaction'] == 'Overview Sort Option Click')].shape[0]
    df['total_circle_hovers'] = df.loc[(df['type_of_interaction'].str.contains('Hover'))].shape[0]
    df['total_circle_hovers_map'] = df.loc[(df['type_of_interaction'].str.contains('Hover')) & (df['type_of_interaction'].str.contains('Map'))].shape[0]
    df['total_circle_hovers_calendar'] = df.loc[(df['type_of_interaction'].str.contains('Hover')) & (df['type_of_interaction'].str.contains('Calendar'))].shape[0]
    return df

def hover_counter(df):
    df_total = df.copy(deep=False)
    df_map = df.filter(like='Map')
    df_calendar = df.filter(like='Calendar')
    df['total_hovers'] = df_total.loc[(df_total['type'].str.contains('Hover'))].shape[0]
    df['total_hovers_map'] = df_map.loc[(df_map['type'].str.contains('Hover'))].shape[0]
    df['total_hovers_calendar'] = df_calendar.loc[(df_calendar['type'].str.contains('Hover'))].shape[0]
    return df

def add_new_to_csv():
    return

######################################################
######## SEQUENCE OF FORMATTING PROCESSES ############
######################################################

def remove_sequential_duplicates(df):
    condition_1 = (df['type_of_interaction'] != df['type_of_interaction'].shift()) & ((df['type_of_interaction'].isin(('Calendar Enter View', 'Map Enter View','Overview Enter View','Overview Remove All Button Click','Overview Sort Option Click'))) | (df['idiom'] == 'Visualization'))
    condition_2 = (~df['type_of_interaction'].isin(('Calendar Enter View', 'Map Enter View','Overview Enter View','Overview Remove All Button Click','Overview Sort Option Click'))) & (df['idiom'] != 'Visualization')
    df = df.loc[(condition_1) | (condition_2)]
    return df

def faster_than_100ms(df):
    df = format_sequential_map_hovers(df)
    df = format_str_to_date(df)
    df = remove_not_hovers_less_than_100ms(df)
    df = remove_hovers_less_than_100ms(df)
    return df

def transform_hovers(df):
    df = df.replace({'type_of_interaction': {'Calendar Circle Enter': 'Calendar Circle Hover', 'Map Circle Enter': 'Map Circle Hover', 'Map Circle Enter Sequential': 'Map Circle Hover'}})
    df = df[(df['type_of_interaction'] != 'Calendar Circle Leave') & (df['type_of_interaction'] != 'Map Circle Leave')]
    df['time_stamp'] = pd.to_datetime(df['time_stamp'], format='%Y-%m-%dT%H:%M:%S.%f%z')
    df['time_stamp_diff'] = df['time_stamp'].diff(periods=1).dt.total_seconds() * 1000
    df = df.loc[(df['time_stamp_diff'] > 100 & (~df['type_of_interaction'].isin(('Visualization Start First Task', 'Visualization End First Task', 'Visualization Start Second Task', 'Visualization End Second', 'Map Enter View', 'Calendar Enter View', 'Overview Enter View')))) | (df['type_of_interaction'].isin(('Visualization Start First Task', 'Visualization End First Task', 'Visualization Start Second Task', 'Visualization End Second','Map Enter View', 'Calendar Enter View', 'Overview Enter View')))]
    return df

######################################################
################ MAIN FUNCTION #######################
######################################################

def process_data():
    pd.set_option('display.max_rows', None)
    for i in range(1, len(os.listdir('./datasets-participants'))):
        thesis_df = pd.read_csv(f"./datasets-participants/{i}_interaction_log_processed.csv", sep=';')
        thesis_df.columns = [c.lower() for c in thesis_df.columns]
        thesis_df.columns = [c.replace(' ', '_') for c in thesis_df.columns]
        verify_interactions(thesis_df, i)
        thesis_df = remove_sequential_duplicates(thesis_df)
        thesis_df = faster_than_100ms(thesis_df)
        thesis_df = transform_hovers(thesis_df)
        thesis_df['time_stamp_diff'] = thesis_df['time_stamp_diff'].fillna(0)
        thesis_count_df = thesis_df.copy(deep=False)
        thesis_count_df = csv_time_format(thesis_count_df)
        thesis_count_df = csv_path_format(thesis_count_df)
        thesis_count_df = csv_count_format(thesis_count_df)
        create_count_csv(thesis_count_df, i)
    '''
    Does all other processing functions here
    '''
    # faster_than_100ms(thesis_df)
    # time_counter(thesis_df)
    # click_counter(thesis_df)
    # hover_counter(thesis_df)
    '''
    Adds new line to final csv
    '''
    return

if __name__ == '__main__':
    process_data()
    
