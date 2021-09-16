import pandas as pd
import numpy as np

def create_gender_file(df, condition):
    data = {'Masculino': [0], 'Feminino': [0]}
    df_new = pd.DataFrame(data)
    df_new['Masculino'] = df[df['gender'] == 'Masculino'].shape[0]
    df_new['Feminino'] = df[df['gender'] == 'Feminino'].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/gender_{condition}.csv", index = False)
    return
    
def create_age_file(df, condition): 
    data = {'<24':  [0], '24-39':  [0], '40-60': [0], '>60': [0]}
    df_new = pd.DataFrame(data)
    df_new['<24'] = df[df['age'] < 24].shape[0]
    df_new['24-39'] = df[(df['age'] >= 24) & (df['age'] < 40)].shape[0]
    df_new['40-60'] = df[(df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new['>60'] = df[(df['age'] > 60)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/age_{condition}.csv", index = False)
    return

def create_education_file(df, condition): 
    data = {'Ensino Secundário': [0], 'Licenciatura': [0], 'Mestrado':0, 'Doutoramento': [0], 'Outro': [0]}
    df_new = pd.DataFrame(data)
    df_new['Ensino Secundário'] = df[df['education'] == 'Ensino Secundário'].shape[0]
    df_new['Licenciatura'] = df[df['education'] == 'Licenciatura'].shape[0]
    df_new['Mestrado'] = df[df['education'] == 'Mestrado'].shape[0]
    df_new['Doutoramento'] = df[df['education'] == 'Doutoramento'].shape[0]
    df_new['Outro'] = df[df['education'] == 'Outro'].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/education_{condition}.csv", index = False)
    return

def create_demographics_files():
     pd.set_option('display.max_rows', None)
     df = pd.read_csv(f"./datasets-participants-count/all_interactions_count_shuffled_trimmed.csv", sep=',')
     df_cond_map = df[df['condition'] == 1]
     df_cond_calendar = df[df['condition'] == 2]
     df_cond_none = df[df['condition'] == 3]
     df_gender = df[['gender']]
     create_gender_file(df_gender, 'all')
     df_age = df[['age']]
     create_age_file(df_age, 'all')
     df_education = df[['education']]
     create_education_file(df_education, 'all')
     
     df_gender = df_cond_map[['gender']]
     create_gender_file(df_gender, 'map')
     df_age = df_cond_map[['age']]
     create_age_file(df_age, 'map')
     df_education = df_cond_map[['education']]
     create_education_file(df_education, 'map')
     
     df_gender = df_cond_calendar[['gender']]
     create_gender_file(df_gender, 'calendar')
     df_age = df_cond_calendar[['age']]
     create_age_file(df_age, 'calendar')
     df_education = df_cond_calendar[['education']]
     create_education_file(df_education, 'calendar')

     df_gender = df_cond_none[['gender']]
     create_gender_file(df_gender, 'none')
     df_age = df_cond_none[['age']]
     create_age_file(df_age, 'none')
     df_education = df_cond_none[['education']]
     create_education_file(df_education, 'none')



if __name__ == '__main__':
    create_demographics_files()
    