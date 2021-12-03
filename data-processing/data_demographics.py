import pandas as pd
import numpy as np

def create_all_gender_file(df):
    data = {'gender': ['Male', 'Female'], 'total': [0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['gender']== 'Male'),'total'] = df[(df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['gender']== 'Female'),'total'] = df[(df['gender'] == 'Feminino')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/all_gender.csv", index = False)
    return
    
def create_all_age_file(df): 
    data = {'age': ['<18', '18-24','25-39', '40-60','>60'], 'total': [0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['age']== '<18'),'total'] = df[(df['age'] < 18)].shape[0]
    df_new.loc[(df_new['age']== '18-24'),'total'] = df[(df['age'] >= 18) & (df['age'] <= 24)].shape[0]
    df_new.loc[(df_new['age']== '25-39'),'total'] = df[(df['age'] >= 25) & (df['age'] <= 39)].shape[0]
    df_new.loc[(df_new['age']== '40-60'),'total'] = df[(df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['age']== '>60'),'total'] = df[(df['age'] > 60)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/all_age.csv", index = False)
    return

def create_all_education_file(df): 
    data = {'education': ['High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate', 'Other'], 'total': [0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['education']== 'High School'),'total'] = df[ (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['education']== 'Bachelor\'s Degree'),'total'] = df[  (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['education']== 'Master\'s Degree'),'total'] = df[   (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['education']== 'Doctorate'),'total'] = df[  (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['education']== 'Other'),'total'] = df[ (df['education'] == 'Outro')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/all_education.csv", index = False)
    return

def create_conditions_file(df):
    data = {'condition': ['Map Anchor','Calendar Anchor','No Anchor'],'total': [0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['condition']== 'Map Anchor') ,'total'] = df[(df['condition'] == 1)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') ,'total'] = df[(df['condition'] == 2)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') ,'total'] = df[(df['condition'] == 3)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_distribution.csv", index = False)
    return

def create_conditions_clusters_file(df):
    data = {'condition': ['Map Anchor','Map Anchor','Calendar Anchor','Calendar Anchor','No Anchor','No Anchor'],'cluster':['Cluster 1', 'Cluster 2','Cluster 1', 'Cluster 2','Cluster 1', 'Cluster 2'],'total': [0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['cluster'] == 'Cluster 1') ,'total'] = df[(df['condition'] == 1) & (df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['cluster'] == 'Cluster 1'),'total'] = df[(df['condition'] == 2) & (df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['cluster'] == 'Cluster 1'),'total'] = df[(df['condition'] == 3) & (df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['cluster'] == 'Cluster 2') ,'total'] = df[(df['condition'] == 1) & (df['Cluster'] == 1)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['cluster'] == 'Cluster 2'),'total'] = df[(df['condition'] == 2) & (df['Cluster'] == 1)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['cluster'] == 'Cluster 2'),'total'] = df[(df['condition'] == 3) & (df['Cluster'] == 1)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_clusters_distribution.csv", index = False)
    return

def create_conditions_gender_file(df):
    data = {'condition': ['Map Anchor','Map Anchor','Calendar Anchor','Calendar Anchor','No Anchor','No Anchor'], 'gender': ['Male', 'Female','Male', 'Female','Male', 'Female'], 'total': [0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['gender']== 'Male'),'total'] = df[(df['condition'] == 1) & (df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['gender']== 'Female'),'total'] = df[(df['condition'] == 1) & (df['gender'] == 'Feminino')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['gender']== 'Male'),'total'] = df[(df['condition'] == 2) & (df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['gender']== 'Female'),'total'] = df[(df['condition'] == 2) & (df['gender'] == 'Feminino')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['gender']== 'Male'),'total'] = df[(df['condition'] == 3) & (df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['gender']== 'Female'),'total'] = df[(df['condition'] == 3) & (df['gender'] == 'Feminino')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_gender.csv", index = False)
    return
    
def create_conditions_age_file(df): 
    data = {'condition': ['Map Anchor','Map Anchor','Map Anchor','Map Anchor','Map Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','No Anchor','No Anchor','No Anchor','No Anchor','No Anchor'], 'age': ['<18', '18-24','25-39', '40-60','>60','<18', '18-24','25-39', '40-60','>60','<18', '18-24','25-39', '40-60','>60'], 'total': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['age']== '<18'),'total'] = df[(df['condition'] == 1) & (df['age'] < 18)].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['age']== '18-24'),'total'] = df[(df['condition'] == 1) & (df['age'] >= 18) & (df['age'] <= 24)].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['age']== '25-39'),'total'] = df[(df['condition'] == 1) & (df['age'] >= 25) & (df['age'] <= 39)].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['age']== '40-60'),'total'] = df[(df['condition'] == 1) & (df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['age']== '>60'),'total'] = df[(df['condition'] == 1) & (df['age'] > 60)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['age']== '<18'),'total'] = df[(df['condition'] == 2) & (df['age'] < 18)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['age']== '18-24'),'total'] = df[(df['condition'] == 2) & (df['age'] >= 18) & (df['age'] <= 24)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['age']== '25-39'),'total'] = df[(df['condition'] == 2) & (df['age'] >= 25) & (df['age'] <= 39)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['age']== '40-60'),'total'] = df[(df['condition'] == 2) & (df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['age']== '>60'),'total'] = df[(df['condition'] == 2) & (df['age'] > 60)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['age']== '<18'),'total'] = df[(df['condition'] == 3) & (df['age'] < 18)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['age']== '18-24'),'total'] = df[(df['condition'] == 3) & (df['age'] >= 18) & (df['age'] <= 24)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['age']== '25-39'),'total'] = df[(df['condition'] == 3) & (df['age'] >= 25) & (df['age'] <= 39)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['age']== '40-60'),'total'] = df[(df['condition'] == 3) & (df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['age']== '>60'),'total'] = df[(df['condition'] == 3) & (df['age'] > 60)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_age.csv", index = False)
    return

def create_conditions_education_file(df): 
    data = {'condition': ['Map Anchor','Map Anchor','Map Anchor','Map Anchor','Map Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','Calendar Anchor','No Anchor','No Anchor','No Anchor','No Anchor','No Anchor'], 'education': ['High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate','Other','High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate','Other','High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate','Other'], 'total': [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['education']== 'High School'),'total'] = df[(df['condition'] == 1) & (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['education']== 'Bachelor\'s Degree'),'total'] = df[(df['condition'] == 1)  & (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['education']== 'Master\'s Degree'),'total'] = df[(df['condition'] == 1)  & (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['education']== 'Doctorate'),'total'] = df[(df['condition'] == 1)  & (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['condition']== 'Map Anchor') & (df_new['education']== 'Other'),'total'] = df[(df['condition'] == 1) & (df['education'] == 'Outro')].shape[0]
   
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['education']== 'High School'),'total'] = df[(df['condition'] == 2) & (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['education']== 'Bachelor\'s Degree'),'total'] = df[(df['condition'] == 2)  & (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['education']== 'Master\'s Degree'),'total'] = df[(df['condition'] == 2)  & (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['education']== 'Doctorate'),'total'] = df[(df['condition'] == 2)  & (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['condition']== 'Calendar Anchor') & (df_new['education']== 'Other'),'total'] = df[(df['condition'] == 2) & (df['education'] == 'Outro')].shape[0]
    
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['education']== 'High School'),'total'] = df[(df['condition'] == 3) & (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['education']== 'Bachelor\'s Degree'),'total'] = df[(df['condition'] == 3)  & (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['education']== 'Master\'s Degree'),'total'] = df[(df['condition'] == 3)  & (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['education']== 'Doctorate'),'total'] = df[(df['condition'] == 3)  & (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['condition']== 'No Anchor') & (df_new['education']== 'Other'),'total'] = df[(df['condition'] == 3) & (df['education'] == 'Outro')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_education.csv", index = False)
    return

def create_clusters_file(df):
    data = {'cluster': ['Cluster 1','Cluster 2'],'total': [0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['cluster']== 'Cluster 1') ,'total'] = df[(df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') ,'total'] = df[(df['Cluster'] == 1)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/clusters_distribution.csv", index = False)
    return

def create_clusters_gender_file(df):
    data = {'cluster': ['Cluster 1','Cluster 1','Cluster 2','Cluster 2'],'gender':['Male', 'Female', 'Male', 'Female'],'total': [0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['gender'] == 'Male') ,'total'] = df[(df['Cluster'] == 0) & (df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['gender'] == 'Female') ,'total'] = df[(df['Cluster'] == 0) & (df['gender'] == 'Feminino')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['gender'] == 'Male') ,'total'] = df[(df['Cluster'] == 1) & (df['gender'] == 'Masculino')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['gender'] == 'Female') ,'total'] = df[(df['Cluster'] == 1) & (df['gender'] == 'Feminino')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/clusters_gender.csv", index = False)
    return

def create_clusters_age_file(df):
    data = {'cluster': ['Cluster 1','Cluster 1','Cluster 1','Cluster 1','Cluster 1','Cluster 2','Cluster 2','Cluster 2','Cluster 2','Cluster 2'],'age':['<18','18-24','25-39','40-60','>60','<18','18-24','25-39','40-60','>60'],'total': [0,0,0,0,0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['age'] == '<18') ,'total'] = df[(df['Cluster'] == 0) & (df['age'] < 18)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['age'] == '18-24') ,'total'] = df[(df['Cluster'] == 0) & (df['age'] >= 18) & (df['age'] <= 24 )].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['age'] == '25-39') ,'total'] = df[(df['Cluster'] == 0) & (df['age'] >= 25) & (df['age'] <= 39 )].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['age'] == '40-60') ,'total'] = df[(df['Cluster'] == 0) & (df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['age'] == '>60') ,'total'] = df[(df['Cluster'] == 0) & (df['age'] > 60)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['age'] == '<18') ,'total'] = df[(df['Cluster'] == 1) & (df['age'] < 18)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['age'] == '18-24') ,'total'] = df[(df['Cluster'] == 1) & (df['age'] >= 18) & (df['age'] <= 24 )].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['age'] == '25-39') ,'total'] = df[(df['Cluster'] == 1) & (df['age'] >= 25) & (df['age'] <= 39 )].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['age'] == '40-60') ,'total'] = df[(df['Cluster'] == 1) & (df['age'] >= 40) & (df['age'] <= 60)].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['age'] == '>60') ,'total'] = df[(df['Cluster'] == 1) & (df['age'] > 60)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/clusters_age.csv", index = False)
    return

def create_clusters_education_file(df):
    data = {'cluster': ['Cluster 1','Cluster 1','Cluster 1','Cluster 1','Cluster 1','Cluster 2','Cluster 2','Cluster 2','Cluster 2','Cluster 2'],'education': ['High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate','Other','High School', 'Bachelor\'s Degree','Master\'s Degree', 'Doctorate','Other'],'total': [0,0,0,0,0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['education'] == 'High School') ,'total'] = df[(df['Cluster'] == 0) & (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['education'] == 'Bachelor\'s Degree') ,'total'] = df[(df['Cluster'] == 0) & (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['education'] == 'Master\'s Degree') ,'total'] = df[(df['Cluster'] == 0) & (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['education'] == 'Doctorate') ,'total'] = df[(df['Cluster'] == 0) & (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 1') & (df_new['education'] == 'Other') ,'total'] = df[(df['Cluster'] == 0) & (df['education'] == 'Outro')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['education'] == 'High School') ,'total'] = df[(df['Cluster'] == 1) & (df['education'] == 'Ensino Secundário')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['education'] == 'Bachelor\'s Degree') ,'total'] = df[(df['Cluster'] == 1) & (df['education'] == 'Licenciatura')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['education'] == 'Master\'s Degree') ,'total'] = df[(df['Cluster'] == 1) & (df['education'] == 'Mestrado')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['education'] == 'Doctorate') ,'total'] = df[(df['Cluster'] == 1) & (df['education'] == 'Doutoramento')].shape[0]
    df_new.loc[(df_new['cluster']== 'Cluster 2') & (df_new['education'] == 'Other') ,'total'] = df[(df['Cluster'] == 1) & (df['education'] == 'Outro')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/clusters_education.csv", index = False)
    return

def create_all_glasses_file(df):
    data = {'glasses': ['Yes','No'],'total': [0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['glasses']== 'Yes') ,'total'] = df[(df['Glasses'] == 'Yes')].shape[0]
    df_new.loc[(df_new['glasses']== 'No') ,'total'] = df[(df['Glasses'] == 'No')].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/all_glasses.csv", index = False)
    return

def create_conditions_glasses_file(df):
    data = {'condition': ['Map Anchor','Map Anchor', 'Calendar Anchor','Calendar Anchor', 'No Anchor','No Anchor'],'glasses': ['Yes','No','Yes','No','Yes','No'],'total': [0,0,0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['glasses']== 'Yes') & (df_new['condition'] == 'Map Anchor') ,'total'] = df[(df['Glasses'] == 'Yes') & (df['condition'] == 1)].shape[0]
    df_new.loc[(df_new['glasses']== 'No') & (df_new['condition'] == 'Map Anchor') ,'total'] = df[(df['Glasses'] == 'No') & (df['condition'] == 1)].shape[0]
    df_new.loc[(df_new['glasses']== 'Yes') & (df_new['condition'] == 'Calendar Anchor') ,'total'] = df[(df['Glasses'] == 'Yes') & (df['condition'] == 2)].shape[0]
    df_new.loc[(df_new['glasses']== 'No') & (df_new['condition'] == 'Calendar Anchor')  ,'total'] = df[(df['Glasses'] == 'No') & (df['condition'] == 2)].shape[0]
    df_new.loc[(df_new['glasses']== 'Yes') & (df_new['condition'] == 'No Anchor')  ,'total'] = df[(df['Glasses'] == 'Yes') & (df['condition'] == 3) ].shape[0]
    df_new.loc[(df_new['glasses']== 'No') & (df_new['condition'] == 'No Anchor')  ,'total'] = df[(df['Glasses'] == 'No') & (df['condition'] == 3)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/conditions_glasses.csv", index = False)
    return

def create_clusters_glasses_file(df):
    data = {'cluster': ['Cluster 1','Cluster 1', 'Cluster 2','Cluster 2'],'glasses': ['Yes','No','Yes','No'],'total': [0,0,0,0]}
    df_new = pd.DataFrame(data)
    df_new.loc[(df_new['glasses']== 'Yes') & (df_new['cluster'] == 'Cluster 1') ,'total'] = df[(df['Glasses'] == 'Yes') & (df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['glasses']== 'No') & (df_new['cluster'] == 'Cluster 1') ,'total'] = df[(df['Glasses'] == 'No') & (df['Cluster'] == 0)].shape[0]
    df_new.loc[(df_new['glasses']== 'Yes') & (df_new['cluster'] == 'Cluster 2') ,'total'] = df[(df['Glasses'] == 'Yes') & (df['Cluster'] == 2)].shape[0]
    df_new.loc[(df_new['glasses']== 'No') & (df_new['cluster'] == 'Cluster 2')  ,'total'] = df[(df['Glasses'] == 'No') & (df['Cluster'] == 2)].shape[0]
    df_new.to_csv(f"./datasets-participants-demographics/clusters_glasses.csv", index = False)
    return


def create_demographics_files():
    pd.set_option('display.max_rows', None)
    df = pd.read_csv(f"./datasets-participants-clustering/kmeans_2_clustered.csv", sep=',')
    create_all_gender_file(df)
    create_all_age_file(df)
    create_all_education_file(df)
    create_conditions_file(df)
    create_conditions_gender_file(df)
    create_conditions_age_file(df)
    create_conditions_education_file(df)
    create_clusters_file(df)
    create_clusters_gender_file(df)
    create_clusters_age_file(df)
    create_clusters_education_file(df)
    # create_all_glasses_file(df)
    # create_conditions_glasses_file(df)
    # create_clusters_glasses_file(df)
    create_conditions_clusters_file(df)
    



if __name__ == '__main__':
    create_demographics_files()
    