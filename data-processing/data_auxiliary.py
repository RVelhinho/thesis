import os
import numpy as np
import pandas as pd

######################################################
################ AUXILIARY FUNCTIONS #################
######################################################

def format_sequential_map_hovers(df):
    df.loc[(df['type_of_interaction'] == 'Map Circle Enter') & (df['type_of_interaction'].shift() == 'Map Circle Enter'), 'type_of_interaction'] ='Map Circle Enter Sequential'
    return df

def format_str_to_date(df):
    df['time_stamp'] = pd.to_datetime(df['time_stamp'], format='%Y-%m-%dT%H:%M:%S.%f%z')
    df['time_stamp_diff'] = df['time_stamp'].diff(periods=1).dt.total_seconds() * 1000
    return df

def remove_not_hovers_less_than_100ms(df):
    condition_1 = (df['time_stamp_diff'] > 100) & (~df['type_of_interaction'].isin(('Calendar Circle Enter', 'Calendar Circle Leave','Map Circle Enter','Map Circle Enter Sequential','Map Circle Leave','Visualization Start First Task', 'Visualization End First Task', 'Visualization Start Second Task', 'Visualization End Second','Map Enter View', 'Calendar Enter View', 'Overview Enter View')))
    condition_2 = df['type_of_interaction'].isin(('Calendar Circle Enter', 'Calendar Circle Leave','Map Circle Enter','Map Circle Enter Sequential','Map Circle Leave','Visualization Start First Task', 'Visualization End First Task', 'Visualization Start Second Task', 'Visualization End Second','Map Enter View', 'Calendar Enter View', 'Overview Enter View'))
    df = df.loc[(condition_1) | (condition_2)]
    return df

def remove_hovers_less_than_100ms(df):
    condition_1 = (df['time_stamp_diff'] > 100) & (df['type_of_interaction'].isin(('Calendar Circle Leave','Map Circle Leave')))
    condition_2 = ~df['type_of_interaction'].isin(('Calendar Circle Leave','Map Circle Leave'))
    df = df.loc[(condition_1) | (condition_2)]
    condition_3 = (df['type_of_interaction'] == 'Map Circle Enter') & ((df['type_of_interaction'].shift(periods=-1) == 'Map Circle Leave') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Enter Sequential') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Click Add') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Click Remove'))
    condition_4 = df['type_of_interaction'] != 'Map Circle Enter'
    df = df.loc[(condition_3 | condition_4)]
    condition_5 = (df['type_of_interaction'] == 'Calendar Circle Enter') & ((df['type_of_interaction'].shift(periods=-1) == 'Calendar Circle Leave') | (df['type_of_interaction'].shift(periods=-1) == 'Calendar Circle Click Add') | (df['type_of_interaction'].shift(periods=-1) == 'Calendar Circle Click Remove'))
    condition_6 = df['type_of_interaction'] != 'Calendar Circle Enter'
    df = df.loc[(condition_5 | condition_6)]
    condition_7 = (df['type_of_interaction'] == 'Map Circle Enter Sequential') & ((df['type_of_interaction'].shift(periods=-1) == 'Map Circle Leave') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Enter Sequential') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Click Add') | (df['type_of_interaction'].shift(periods=-1) == 'Map Circle Click Remove'))
    condition_8 = df['type_of_interaction'] != 'Map Circle Enter Sequential'
    df = df.loc[(condition_7 | condition_8)]
    return df