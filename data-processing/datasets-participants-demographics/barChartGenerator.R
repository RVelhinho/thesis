setwd("/Users/ricardo/dev/thesis/data-processing/datasets-participants-demographics")
library(ggplot2)
library(hrbrthemes)
library(viridis)

all_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/all_network.csv")
all_top_5_interactions_df <- data.frame(all_top_5_interactions_data)
ggplot(all_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(all_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#BABFBA", "Overview Remove All" = "#6AB4FF", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

map_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_map_network.csv")
map_top_5_interactions_df <- data.frame(map_top_5_interactions_data)
ggplot(map_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(map_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#6AB4FF", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

calendar_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_calendar_network.csv")
calendar_top_5_interactions_df <- data.frame(calendar_top_5_interactions_data)
ggplot(calendar_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(calendar_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#48C490", "Overview Remove All" = "#48C490", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

none_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_none_network.csv")
none_top_5_interactions_df <- data.frame(none_top_5_interactions_data)
ggplot(none_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(none_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#BABFBA", "Overview Remove All" = "#6AB4FF", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

c1_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/clusters_1_network.csv")
c1_top_5_interactions_df <- data.frame(c1_top_5_interactions_data)
ggplot(c1_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(c1_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#48C490", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

c2_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/clusters_2_network.csv")
c2_top_5_interactions_df <- data.frame(c2_top_5_interactions_data)
ggplot(c2_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(c2_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#BABFBA", "Overview Remove All" = "#6AB4FF", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

map_c1_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_map_clusters_1_network.csv")
map_c1_top_5_interactions_df <- data.frame(map_c1_top_5_interactions_data)
ggplot(map_c1_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(map_c1_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#6AB4FF", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

map_c2_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_map_clusters_2_network.csv")
map_c2_top_5_interactions_df <- data.frame(map_c2_top_5_interactions_data)
ggplot(map_c2_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(map_c2_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#6AB4FF", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

calendar_c1_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_calendar_clusters_1_network.csv")
calendar_c1_top_5_interactions_df <- data.frame(calendar_c1_top_5_interactions_data)
ggplot(calendar_c1_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=ifelse(score>0.07,paste0(sprintf("%f", score),""),""))) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(calendar_c1_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#6AB4FF", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#6AB4FF", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

calendar_c2_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_calendar_clusters_2_network.csv")
calendar_c2_top_5_interactions_df <- data.frame(calendar_c2_top_5_interactions_data)
ggplot(calendar_c2_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(calendar_c2_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#48C490", "Overview Remove All" = "#48C490", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

none_c1_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_none_clusters_1_network.csv")
none_c1_top_5_interactions_df <- data.frame(none_c1_top_5_interactions_data)
ggplot(none_c1_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(none_c1_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#48C490", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()

none_c2_top_5_interactions_data <- read.csv("../datasets-participants-network/top-5-interactions/conditions_none_clusters_2_network.csv")
none_c2_top_5_interactions_df <- data.frame(none_c2_top_5_interactions_data)
ggplot(none_c2_top_5_interactions_df, aes(as.factor(1),fill=interaction,x=reorder(interaction, score), y=score, label=score)) + geom_bar(stat = "identity", width = 0.6) + geom_text(data=subset(none_c2_top_5_interactions_df,score != 0),colour= '#ffffff',size = 6, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.y=element_text(size=15),plot.title=element_text(face='bold',size=18,margin = margin(t = 0, r = 0, b = 20, l = 0)),axis.title.x=element_blank(),axis.title.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(), panel.grid.minor = element_blank(), panel.grid.major.y = element_blank())+  scale_fill_manual(name='Interaction',values=c("Map Circle Hover" = "#48C490", "Map Circle Click Add" = "#48C490", "Map Circle Click Remove" = "#48C490","Calendar Circle Hover" = "#6AB4FF", "Calendar Circle Click Add" = "#6AB4FF", "Calendar Circle Click Remove" = "#6AB4FF", "Overview Remove Single" = "#48C490", "Overview Remove All" = "#BABFBA", "Overview Sort Open" = "#BABFBA", "Overview Sort Option" = "#BABFBA"))+ggtitle('Top 5 Interactions on Pagerank')+ coord_flip()


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
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic() + ylab('Total Time Map')

ggplot(all_time_calendar_df, aes(y=total_time_calendar)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic() + ylab('Total Time Calendar')

ggplot(conditions_time_map_df, aes(group=condition, x=condition,y=total_time_map)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Total Time Map') 

ggplot(conditions_time_calendar_df, aes(group=condition, x=condition,y=total_time_calendar)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) +theme_classic()  +xlab('Condition')+ylab('Total Time Calendar')

ggplot(clusters_time_map_df, aes(group=Cluster, x=Cluster,y=total_time_map)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) +theme_classic() +xlab('Cluster') + ylab('Total Time Map')

ggplot(clusters_time_calendar_df, aes(group=Cluster,x=Cluster,y=total_time_calendar)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic()  +xlab('Cluster') +ylab('Total Time Calendar')

ggplot(conditions_clusters_time_map_df, aes( x=condition, color=Cluster,y=total_time_map)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  + scale_color_manual(values=c("#36ebab","#1e7557")) + theme_classic()   +xlab('Condition')+ylab('Total Time Map')

ggplot(conditions_clusters_time_calendar_df, aes( x=condition, color=Cluster,y=total_time_calendar)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  + scale_color_manual(values=c("#36ebab","#1e7557")) +theme_classic()  +xlab('Condition')+ylab('Total Time Calendar')

all_dimensions_data <- read.csv("../datasets-participants-demographics/all_dimensions.csv")
conditions_dimensions_data <- read.csv("../datasets-participants-demographics/conditions_dimensions.csv")
clusters_dimensions_data <- read.csv("../datasets-participants-demographics/clusters_dimensions.csv")
conditions_clusters_dimensions_data <- read.csv("../datasets-participants-demographics/conditions_clusters_dimensions.csv")

all_dimensions_df <- data.frame(all_dimensions_data)
conditions_dimensions_df <- data.frame(conditions_dimensions_data)
clusters_dimensions_df <- data.frame(clusters_dimensions_data)
conditions_clusters_dimensions_df <- data.frame(conditions_clusters_dimensions_data)

ggplot(all_dimensions_df, aes(y=Internal)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic() + ylab('Internal')

ggplot(all_dimensions_df, aes(y=PowerfulOthers)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic() + ylab('Powerful Others')

ggplot(all_dimensions_df, aes(y=Chance)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4) + theme_classic() + ylab('Chance')

ggplot(conditions_dimensions_df, aes(group=condition, x=condition,y=Internal)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Internal') 

ggplot(conditions_dimensions_df, aes(group=condition, x=condition,y=PowerfulOthers)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Powerful Others') 

ggplot(conditions_dimensions_df, aes(group=condition, x=condition,y=Chance)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Chance') 

ggplot(clusters_dimensions_df, aes(group=Cluster, x=Cluster,y=Internal)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Internal') 

ggplot(clusters_dimensions_df, aes(group=Cluster, x=Cluster,y=PowerfulOthers)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Powerful Others') 

ggplot(clusters_dimensions_df, aes(group=Cluster, x=Cluster,y=Chance)) + 
  geom_boxplot(color="#bad9d0",outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +xlab('Condition') +ylab('Chance') 

ggplot(conditions_clusters_dimensions_df, aes(x=condition,color=Cluster,y=Internal)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic() +  scale_color_manual(values=c("#36ebab","#1e7557"))+xlab('Condition') +ylab('Internal') 

ggplot(conditions_clusters_dimensions_df, aes(x=condition,color=Cluster,y=PowerfulOthers)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic()+  scale_color_manual(values=c("#36ebab","#1e7557")) +xlab('Condition') +ylab('Powerful Others') 

ggplot(conditions_clusters_dimensions_df, aes(x=condition,color=Cluster,y=Chance)) + 
  geom_boxplot(outlier.colour="red", outlier.shape=8,
               outlier.size=4)  +theme_classic()+  scale_color_manual(values=c("#36ebab","#1e7557")) +xlab('Condition') +ylab('Chance') 

all_gender_data <- read.csv("../datasets-participants-demographics/all_gender.csv")
all_age_data <- read.csv("../datasets-participants-demographics/all_age.csv")
all_education_data <- read.csv("../datasets-participants-demographics/all_education.csv")
conditions_distribution_data <- read.csv("../datasets-participants-demographics/conditions_distribution.csv")
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
conditions_distribution_df <- data.frame(conditions_distribution_data)
conditions_gender_df <- data.frame(conditions_gender_data)
conditions_age_df <- data.frame(conditions_age_data)
conditions_education_df <- data.frame(conditions_education_data)
clusters_distribution_df <- data.frame(clusters_distribution_data)
clusters_gender_df <- data.frame(clusters_gender_data)
clusters_age_df <- data.frame(clusters_age_data)
clusters_education_df <- data.frame(clusters_education_data)

ggplot(all_gender_df, aes(as.factor(1),fill=gender, y=total, label=total)) + geom_bar(position="stack",width=0.4, stat="identity") + geom_text(data=subset(all_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(),axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))
ggplot(all_age_df, aes(as.factor(1),fill=age, y=total, label=total)) + geom_col(position="stack", width=0.4) + geom_text(data=subset(all_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(),axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#e6ed82","#dbe36b","#d2db4f","#b8c229","#a3ad13"),limits = c("<18", "18-24", "25-39", "40-60", ">60"))
ggplot(all_education_df, aes(as.factor(1),fill=education, y=total, label=ifelse(total>1,paste0(sprintf("%d", total),""),""))) + geom_col(position="stack", width=0.4) + geom_text(vjust="inward",hjust="inward",data=subset(all_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "right",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.title.x=element_blank(), axis.text.x=element_blank(),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#a7db81","#91d162","#7dc449","#5fab27","#468f10"),limits = c("High School", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"))
                                                                                                                                                                                                  


ggplot(conditions_gender_df, aes(fill=gender, y=total, x=condition, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x = element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)), axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))+ xlab('Condition')
ggplot(conditions_age_df, aes(fill=age, y=total, x=condition, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_blank(),legend.text = element_blank(), axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#e6ed82","#dbe36b","#d2db4f","#b8c229","#a3ad13"),limits = c("<18", "18-24", "25-39", "40-60", ">60"))+  xlab('Condition')
ggplot(conditions_education_df, aes(fill=education, y=total, x=condition, label=ifelse(total>1,paste0(sprintf("%d", total),""),""))) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(conditions_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#a7db81","#91d162","#7dc449","#5fab27","#468f10"),limits = c("High School", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"))+  xlab('Condition') 


ggplot(conditions_distribution_df, aes(as.factor(1),fill=condition,x=condition, y=total, label=total)) + geom_bar(stat = "identity",fill="#bad9d0") + geom_text(data=subset(conditions_distribution_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())+  xlab('Condition')
ggplot(clusters_distribution_df, aes(x=cluster, y=total, label=total)) + geom_bar(stat = "identity", fill="#bad9d0")+ geom_text(data=subset(clusters_distribution_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  +  xlab('Cluster')


ggplot(clusters_gender_df, aes(fill=gender, y=total, x=cluster, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_gender_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x = element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)), axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank()) + scale_fill_manual(name='Gender',values=c("#ebc14d","#eb9c4d"))+ xlab('Cluster')
ggplot(clusters_age_df, aes(fill=age, y=total, x=cluster, label=total)) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_age_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_blank(),legend.text = element_blank(), axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Age',values=c("#e6ed82","#dbe36b","#d2db4f","#b8c229","#a3ad13"))+  xlab('Cluster')
ggplot(clusters_education_df, aes(fill=education, y=total, x=cluster, label=ifelse(total>1,paste0(sprintf("%d", total),""),""))) + geom_bar(position="stack",width=0.8, stat="identity") + geom_text(data=subset(clusters_education_df,total != 0),colour= '#ffffff',size = 8, position = position_stack(vjust = 0.5)) + theme_bw()+ theme(legend.position = "none",legend.title=element_text(size=18, face='bold'),legend.text = element_text(size=15),axis.text.x=element_text(size=15),axis.title.x=element_text(face='bold',size=18,margin = margin(t = 20, r = 0, b = 0, l = 0)),axis.ticks.x=element_blank(),axis.title.y=element_blank(),axis.text.y=element_blank(), axis.ticks.y=element_blank(),panel.border = element_blank(),panel.grid.major = element_blank(), panel.grid.minor = element_blank())  + scale_fill_manual(name='Education',values=c("#a7db81","#91d162","#7dc449","#5fab27","#468f10"),limits = c("High School", "Bachelor's Degree", "Master's Degree", "Doctorate", "Other"))+  xlab('Cluster') 

