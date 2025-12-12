import pandas as pd
from datetime import date

df2019 = pd.read_csv('Merger-Data - 2019.csv')
df2020 = pd.read_csv('Merger-Data - 2020.csv')
df2021 = pd.read_csv('Merger-Data - 2021.csv')
df2022 = pd.read_csv('Merger-Data - 2022.csv')
df2023 = pd.read_csv('Merger-Data - 2023.csv')
df2024 = pd.read_csv('Merger-Data - 2024.csv')
df2025 = pd.read_csv('Merger-Data - 2025.csv')

frams = [df2019, df2020, df2021, df2022, df2023, df2024, df2025]

mergers = pd.concat(frams)

today = date.today()

mergers.to_csv('mergers_' + str(today) + '.csv')
