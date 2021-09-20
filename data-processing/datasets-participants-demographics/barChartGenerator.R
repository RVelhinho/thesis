setwd("/Users/ricardo/dev/thesis/data-processing/datasets-participants-demographics")
library(ggplot2)
library(hrbrthemes)
library(viridis)

all_time_map_data <- read.csv("../datasets-participants-demographics/all_time_map.csv")
all_time_calendar_data <- read.csv("../datasets-participants-demographics/all_time_calendar.csv")
conditions_time_map_data <- read.csv("../datasets-participants-demographics/conditions_time_map.csv")
conditions_time_calendar_data <- read.csv("../datasets-participants-demographics/conditions_time_calendar.csv")
clusters_time_map_data <- read.csv("../datasets-participants-demographics/clusters_time_map.csv")
clusters_time_calendar_data <- read.csv("../datasets-participants-demographics/clusters_time_calendar.csv")
conditions_clusters_time_map_data <- read.csv("../datasets-participants-demographics/conditions_clusters_time_map.csv")
conditions_clusters_time_calendar_data <- read.csv("../datasets-participants-demographics/conditions_clusters_time_calendar.csv")
all_time_map_df <- data.frame(all_time_map_data)
all_time_calendar_df <- data.frame(all_time_calendar_data)
conditions_time_map_df <- data.frame(conditions_time_map_data)
conditions_time_calendar_df <- data.frame(conditions_time_calendar_data)
clusters_time_map_df <- data.frame(clusters_time_map_data)
clusters_time_calendar_df <- data.frame(clusters_time_calendar_data)
conditions_clusters_time_map_df <- data.frame(conditions_clusters_time_map_data)
conditions_clusters_time_calendar_df <- data.frame(conditions_clusters_time_calendar_data)

ggplot(all_time_map_df, aes(y=total_time_map)) + 
  geom_boxplot(fill="#438025",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic()

ggplot(all_time_calendar_df, aes(y=total_time_calendar)) + 
  geom_boxplot(fill="#438025",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic()

ggplot(conditions_time_map_df, aes(group=condition, x=condition, color=condition,y=total_time_map)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4) + scale_color_manual(values=c("#999999","#E69F00", "#56B4E9")) +theme_classic() 

ggplot(conditions_time_calendar_df, aes(group=condition, x=condition, color=condition,y=total_time_calendar)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4) + scale_color_manual(values=c("#999999","#E69F00", "#56B4E9")) +theme_classic() 

ggplot(clusters_time_map_df, aes(group=Cluster, x=Cluster, color=Cluster,y=total_time_map)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4) + scale_color_manual(values=c("#E69F00", "#56B4E9")) +theme_classic() 

ggplot(clusters_time_calendar_df, aes(group=Cluster,x=Cluster, color=Cluster,y=total_time_calendar)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4) + scale_color_manual(values=c("#E69F00", "#56B4E9")) +theme_classic() 

ggplot(conditions_clusters_time_map_df, aes( x=condition, color=Cluster,y=total_time_map)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() 

ggplot(conditions_clusters_time_calendar_df, aes( x=condition, color=Cluster,y=total_time_calendar)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() 



all_gender_data <- read.csv("../datasets-participants-demographics/all_gender.csv")
all_age_data <- read.csv("../datasets-participants-demographics/all_age.csv")
all_education_data <- read.csv("../datasets-participants-demographics/all_education.csv")
conditions_gender_data <- read.csv("../datasets-participants-demographics/conditions_gender.csv")
conditions_age_data <- read.csv("../datasets-participants-demographics/conditions_age.csv")
conditions_education_data <- read.csv("../datasets-participants-demographics/conditions_education.csv")
clusters_distribution_data <- read.csv("../datasets-participants-demographics/clusters_distribution.csv")
clusters_gender_data <- read.csv("../datasets-participants-demographics/clusters_gender.csv")
clusters_age_data <- read.csv("../datasets-participants-demographics/clusters_age.csv")
clusters_education_data <- read.csv("../datasets-participants-demographics/clusters_education.csv")
all_gender_df <- data.frame(all_gender_data)
all_age_df <- data.frame(all_age_data)
all_education_df <- data.frame(all_education_data)
conditions_gender_df <- data.frame(conditions_gender_data)
conditions_age_df <- data.frame(conditions_age_data)
conditions_education_df <- data.frame(conditions_education_data)
clusters_distribution_df <- data.frame(clusters_distribution_data)
clusters_gender_df <- data.frame(clusters_gender_data)
clusters_age_df <- data.frame(clusters_age_data)
clusters_education_df <- data.frame(clusters_education_data)

ggplot(all_gender_df, aes(as.factor(1),fill=gender, y=total, label=total)) + geom_bar(position="stack",width=0.4, stat="identity") + geom_text(data=subset(all_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(),axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))
ggplot(all_age_df, aes(as.factor(1),fill=age, y=total, label=total)) + geom_col(position="stack", width=0.4) + geom_text(data=subset(all_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(),axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#4debe3","#4dd3eb","#4db1eb","#4d91eb","#4d67eb"),limits = c("<18", "18-24", "25-39", "40-60", ">60"))
ggplot(all_education_df, aes(as.factor(1),fill=education, y=total, label=total)) + geom_col(position="stack", width=0.4) + geom_text(vjust="inward",hjust="inward",data=subset(all_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(), axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#4bdb7b","#45d153","#3fa633","#438025","#3b6119"),limits = c("High School", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"))
                                                                                                                                                                                                  


ggplot(conditions_gender_df, aes(fill=gender, y=total, x=condition, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x = element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)), axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))+ xlab('Condition')
ggplot(conditions_age_df, aes(fill=age, y=total, x=condition, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_blank(),legend.text = element_blank(), axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#4debe3","#4dd3eb","#4db1eb","#4d91eb","#4d67eb"),limits = c("<18", "18-24", "25-39", "40-60", ">60"))+  xlab('Condition')
ggplot(conditions_education_df, aes(fill=education, y=total, x=condition, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#4bdb7b","#45d153","#3fa633","#438025","#3b6119"),limits = c("High School", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"))+  xlab('Condition') 


ggplot(clusters_distribution_df, aes(fill=cluster,x=cluster, y=total)) + geom_bar(stat = "identity") + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Cluster',values=c("#4bdb7b","#45d153"))+  xlab('Cluster')


ggplot(clusters_gender_df, aes(fill=gender, y=total, x=cluster, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x = element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)), axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))+ xlab('Cluster')
ggplot(clusters_age_df, aes(fill=age, y=total, x=cluster, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_blank(),legend.text = element_blank(), axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#4debe3","#4dd3eb","#4db1eb","#4d91eb","#4d67eb"))+  xlab('Cluster')
ggplot(clusters_education_df, aes(fill=education, y=total, x=cluster, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#4bdb7b","#45d153","#3fa633","#438025","#3b6119"))+  xlab('Cluster') 

