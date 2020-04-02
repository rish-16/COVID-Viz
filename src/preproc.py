import numpy as np
import pandas as pd
import json, os
from pprint import pprint
from utils import Tempest, Mutant, Geocoder

tp = Tempest()
data = tp.get_json_records("../data/JSON/corona2020_2561gens.json")
sequences = tp.get_fasta_records("../data/FASTA/corona2020_2561gens_aligned.fasta")

for i in range(len(data['data'])):
    for j in range(len(sequences)):
        if data['data'][i]['covv_virus_name'] == sequences[j]['header'].strip(">"):
            try:
                del data['data'][i]['aligned_seqeunce']
            except:
                pass
            data['data'][i]['aligned_sequence'] = sequences[j]['sequence']

tp.save_dict(data, "../data/JSON/corona2020_2561gens.json")