import numpy as np
import pandas as pd


def faster_than_100ms(df):
    df['timestamp_diff'] = df['timestamp'].diff(period=1,axis=0)
    faster_df = df[df['timestamp_dif']<100]
    return faster_df

def time_counter(df):
    '''
    Get total time for entire interaction
    '''
    df_total = df.copy(deep=False)
    total_time_counter = 0
    for index, row in df_total.iterrows():
        if df_total.loc[index, 'type'] != '' and  df_total.loc[index, 'type'] != 'Visualization Start Interaction' and index != 0:
            total_time_counter += df_total.loc[index, 'timestamp'] - df_total.loc[str(int(index) - 1), 'timestamp']
    print(total_time_counter)
    '''
    Get total time for interaction in Map
    '''
    total_time_map_counter = 0
    df_map = df.filter(like='Map')
    for index, row in df_map.iterrows():
        if df_map.loc[index, 'type'] != '' and  df_map.loc[index, 'type'] != 'Visualization Start Interaction' and index != 0:
            total_time_map_counter += df_map.loc[index, 'timestamp'] - df_map.loc[str(int(index) - 1), 'timestamp']
    print(total_time_map_counter)
    '''
    Get total time for interaction in Calendar
    '''
    total_time_calendar_counter = 0
    df_calendar = df.filter(like='Calendar')
    for index, row in df_calendar.iterrows():
        if df_calendar.loc[index, 'type'] != '' and  df_calendar.loc[index, 'type'] != 'Visualization Start Interaction' and index != 0:
            total_time_calendar_counter += df_calendar.loc[index, 'timestamp'] - df_calendar.loc[str(int(index) - 1), 'timestamp']
    print(total_time_calendar_counter)
    '''
    Get total time for interaction in List
    '''
    total_time_list_counter = 0
    df_list = df.filter(like='Overview')
    for index, row in df_list.iterrows():
        if df_list.loc[index, 'type'] != '' and  df_list.loc[index, 'type'] != 'Visualization Start Interaction' and index != 0:
            total_time_list_counter += df_list.loc[index, 'timestamp'] - df_list.loc[str(int(index) - 1), 'timestamp']
    print(total_time_list_counter)
    df['total_time'] = total_time_counter
    df['total_time_map'] = total_time_map_counter
    df['total_time_calendar'] = total_time_calendar_counter
    df['total_time_list'] = total_time_list_counter
    return df
  

def click_counter(df):
    df_total = df.copy(deep=False)
    df_map = df.filter(like='Map')
    df_calendar = df.filter(like='Calendar')
    df_list = df.filter(like='Overview')
    df['total_clicks'] = df_total.loc[(df_total['type'].str.contains('Click'))].shape[0]
    df['total_clicks_circles'] = df_total.loc[(df_total['type'].str.contains('Click')) & (df_total['type'].str.contains('Circle'))].shape[0]
    df['total_clicks_circles_add'] = df_total.loc[(df_total['type'].str.contains('Click')) & (df_total['type'].str.contains('Circle')) & (df_total['type'].str.contains('Add'))].shape[0]
    df['total_clicks_circles_remove'] = df_total.loc[(df_total['type'].str.contains('Click')) & (df_total['type'].str.contains('Circle')) & (df_total['type'].str.contains('Remove'))].shape[0]
    df['total_clicks_circles_map'] = df_map.loc[(df_map['type'].str.contains('Click'))].shape[0]
    df['total_clicks_circles_map_add'] = df_map.loc[(df_map['type'].str.contains('Click')) & (df_map['type'].str.contains('Circle')) & (df_map['type'].str.contains('Add'))].shape[0]
    df['total_clicks_circles_map_remove'] = df_map.loc[(df_map['type'].str.contains('Click')) & (df_map['type'].str.contains('Circle')) & (df_map['type'].str.contains('Remove'))].shape[0]
    df['total_clicks_circles_calendar'] = df_calendar.loc[(df_calendar['type'].str.contains('Click'))].shape[0]
    df['total_clicks_circles_calendar_add'] = df_calendar.loc[(df_calendar['type'].str.contains('Click')) & (df_calendar['type'].str.contains('Circle')) & (df_calendar['type'].str.contains('Add'))].shape[0]
    df['total_clicks_circles_calendar_remove'] = df_calendar.loc[(df_calendar['type'].str.contains('Click')) & (df_calendar['type'].str.contains('Circle')) & (df_calendar['type'].str.contains('Remove'))].shape[0]
    df['total_clicks_circles_list'] = df_list.loc[(df_list['type'].str.contains('Click'))].shape[0]
    df['total_clicks_circles_list_remove_single'] = df_list.loc[(df_list['type'].str.contains('Click')) & (df_list['type'].str.contains('Remove'))].shape[0]
    df['total_clicks_circles_list_remove_all'] = df_list.loc[(df_list['type'].str.contains('Click')) & (df_list['type'].str.contains('Remove'))].shape[0]
    df['total_clicks_circles_list_sort_button'] = df_list.loc[(df_list['type'].str.contains('Click')) & (df_list['type'].str.contains('Sort')) & (df_list['type'].str.contains('Open'))].shape[0]
    df['total_clicks_circles_list_sort_option'] = df_list.loc[(df_list['type'].str.contains('Click')) & (df_list['type'].str.contains('Sort')) & (df_list['type'].str.contains('Option'))].shape[0]
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

def process_data():
    thesis_df = pd.read_excel('my_data.xls', 'my_data', index_col=None, na_values=['NA'])
    '''
    Does all other processing functions here
    '''
    faster_than_100ms(thesis_df)
    time_counter(thesis_df)
    click_counter(thesis_df)
    hover_counter(thesis_df)
    '''
    Adds new line to final csv
    '''
    return

if __name__ == '__main__':
    process_data()
    
