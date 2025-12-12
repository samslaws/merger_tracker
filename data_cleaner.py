from datetime import date
import numpy as np
import pandas as pd

def clean_merger_data(x):
 # load in raw csv
    df = pd.read_csv(x)

# create columns indicating whether or not locations are inside or outside the US (city, state vs city, country)
    df['loc_2_state_bool'] = df['firm_state_2'].isnull()
    df['loc_1_state_bool'] = df['firm_state_1'].isnull()

    final_firm_location_2 = []

    df['firm_city_2'] = df['firm_city_2'].astype(str)
    df['firm_state_2'] = df['firm_state_2'].astype(str)
    df['firm_country_2'] = df['firm_country_2'].astype(str)
    
    df['firm_city_1'] = df['firm_city_1'].astype(str)
    df['firm_state_1'] = df['firm_state_1'].astype(str)
    df['firm_country_1'] = df['firm_country_1'].astype(str)
    
    # concatenate the locations for display
    for index, row in df.iterrows():
        if row['loc_2_state_bool'] == False:
            final_locationa = row['firm_city_2'] + ', ' + row['firm_state_2']
            final_firm_location_2.append(final_locationa)
        else:
            final_locationb = row['firm_city_2'] + ', ' + row['firm_country_2']
            final_firm_location_2.append(final_locationb)
    
    final_firm_location_1 = []
    
    for index, row in df.iterrows():
        if row['loc_1_state_bool'] == False:
            final_locationa = row['firm_city_1'] + ', ' + row['firm_state_1']
            final_firm_location_1.append(final_locationa)
        else:
            final_locationb = row['firm_city_1'] + ', ' + row['firm_country_1']
            final_firm_location_1.append(final_locationb)
    
    # add concatenated locations to dataframe
    df['final_firm_location_2'] = final_firm_location_2
    df['final_firm_location_1'] = final_firm_location_1
    df['index1'] = df.index
    df['count'] = len(df)
    
    # select final columns for display
    final_df = df[['index1', 'link', 'report_date', 'firm_name_1', 'final_firm_location_1', 'firm_size_1', 'firm_name_2', 'final_firm_location_2', 'firm_size_2', 'merge_date', 'firm_city_1', 'firm_state_1', "firm_city_2", "firm_state_2"]]
    
    # export final csv
    today = date.today()
    final_df.to_csv('final_df-' + str(today) + '.csv', index=False)

print('Enter your file:')
x = input()
clean_merger_data(x)
